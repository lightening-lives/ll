/* =====================================================================
   TEMPORARY — live ground switcher, 2026-08-19.
   Drives the nine candidate grounds from preview/index.html against the
   REAL page, so a client can be shown the decision rather than a swatch.

   Self-contained on purpose: it injects its own stylesheet and renders its
   UI inside a shadow root, so nothing here touches the site's CSS and the
   site's CSS cannot reach in. It lives under preview/ because src/input.css
   already excludes that directory from Tailwind's source scan.

   TO REMOVE AFTER SIGN-OFF:
     1. delete the <script src="./preview/ground-switcher.js"> tag in index.html
     2. rm -rf preview/
     3. bake the chosen values into src/input.css (@theme + the html gradient
        + .nav.is-stuck), then npm run build
   ===================================================================== */
(() => {
  'use strict';

  /* The candidate set, verbatim from preview/index.html. `L` is per-token
     lightness; every token in a family shares the ground's hue and chroma. */
  const GROUNDS = [
    { id: 'darkfield', name: 'Darkfield',       sub: 'as built',             fam: 'instrument',
      top: 'oklch(11% 0.020 260)',   bot: 'oklch(13.6% 0.009 244)', h: 250, c: 0.012,
      L: { void: 13, ink: 17, slab: 23, line: 33, mute: 64, chalk: 93 }, chip: '#05080c',
      risk: 'At 11% lightness the hue is invisible, so it reads as plain black.' },

    { id: 'petrol',    name: 'Petrol',          sub: 'cyanotype',            fam: 'instrument',
      top: 'oklch(15% 0.038 212)',   bot: 'oklch(18.5% 0.026 206)', h: 210, c: 0.030,
      L: { void: 16, ink: 20, slab: 26, line: 35, mute: 66, chalk: 93 }, chip: '#001114',
      risk: 'Probe green sits closer to this ground than to the current one — it loses separation.' },

    { id: 'violet',    name: 'Crystal violet',  sub: 'Gram stain',           fam: 'instrument',
      top: 'oklch(15% 0.040 318)',   bot: 'oklch(19% 0.028 310)',   h: 315, c: 0.030,
      L: { void: 16, ink: 20, slab: 26, line: 36, mute: 67, chalk: 93 }, chip: '#120916',
      risk: 'Purple-black is the house colour of every crypto and AI landing page.' },

    { id: 'slate',     name: 'Lifted slate',    sub: 'same hue, lights up',  fam: 'instrument',
      top: 'oklch(19.5% 0.016 250)', bot: 'oklch(23.5% 0.012 244)', h: 250, c: 0.014,
      L: { void: 20, ink: 24, slab: 30, line: 39, mute: 69, chalk: 94 }, chip: '#11171c',
      risk: 'Spends part of the payoff — the descent to the bone section has less distance to travel.' },

    { id: 'umber',     name: 'Umber',           sub: 'the wordmark',         fam: 'brand',
      top: 'oklch(15% 0.036 42)',    bot: 'oklch(18.5% 0.026 38)',  h: 42,  c: 0.028,
      L: { void: 16, ink: 20, slab: 26, line: 35, mute: 66, chalk: 94 }, chip: '#170905',
      risk: 'A warm ground stops the gold reading as transmitted light.' },

    { id: 'oxblood',   name: 'Oxblood',         sub: 'the tagline',          fam: 'brand',
      top: 'oklch(14.5% 0.042 29)',  bot: 'oklch(18% 0.030 26)',    h: 28,  c: 0.032,
      L: { void: 16, ink: 20, slab: 26, line: 35, mute: 66, chalk: 94 }, chip: '#190806',
      risk: 'On-the-nose for a blood diagnostics company. Read it at high lumen before committing.' },

    { id: 'leaf',      name: 'Leaf shadow',     sub: 'the foliage',          fam: 'brand',
      top: 'oklch(15% 0.034 133)',   bot: 'oklch(18% 0.024 128)',   h: 131, c: 0.026,
      L: { void: 16, ink: 20, slab: 26, line: 35, mute: 66, chalk: 93 }, chip: '#091005',
      risk: 'Green ground plus gold drifts toward "sustainability brand" if the chroma creeps up.' },

    { id: 'darkroom',  name: 'Darkroom',        sub: 'safelight',            fam: 'brand',
      top: 'oklch(15% 0.020 55)',    bot: 'oklch(18% 0.014 50)',    h: 52,  c: 0.016,
      L: { void: 16, ink: 20, slab: 26, line: 35, mute: 66, chalk: 94 }, chip: '#130b07',
      risk: 'Gold becomes native to the ground, so "transmitted light" stops reading as light.' },

    { id: 'bone',      name: 'Bone',            sub: 'inverted',             fam: 'inverted',
      top: 'oklch(96% 0.010 85)',    bot: 'oklch(93% 0.014 80)',    h: 85,  c: 0.012,
      L: { void: 95, ink: 92, slab: 88, line: 78, mute: 46, chalk: 20 }, chip: '#f2eee6',
      risk: 'Gold falls to 1.47:1 and green to 1.52:1 — both unusable as text, fills only.' }
  ];

  const FAMS = [
    ['instrument', 'Instrument'],
    ['brand',      'From the mark'],
    ['inverted',   'Inverted']
  ];

  const KEY = 'll-ground';
  /* The ground a first-time viewer lands on. Deliberately NOT GROUNDS[0]: the
     array order is the review order (instrument → brand → inverted) and the
     ‹ › stepping and the grouped dropdown both read from it, so reordering it
     to change the default would quietly change the walkthrough. Name the
     default instead and leave the running order alone. */
  const DEFAULT_ID = 'slate';
  const root = document.documentElement;

  /* -------------------------------------------------------------------
     The overrides. Written unlayered and injected last, so they outrank
     everything the built stylesheet puts in @layer base / @layer utilities
     at equal specificity. Only what the ground actually owns is touched:
     the six tokens, the document gradient, the stuck-nav scrim, the section
     tints, and the two fixed atmosphere layers whose hue is hard-coded.
     ------------------------------------------------------------------- */
  const sheet = document.createElement('style');
  sheet.id = 'gs-overrides';
  sheet.textContent = `
    html {
      background:
        linear-gradient(180deg, var(--gs-top) 0, var(--gs-bot) 100%),
        var(--color-void);
    }

    .nav.is-stuck { background-color: var(--gs-scrim); }

    /* section grounds keep their measured lightness and alpha; only the hue
       travels with the ground, so the translucency contract still holds */
    #specimen, #assay            { background: oklch(38% 0.055 var(--gs-h) / .055); }
    #inheritance                 { background: oklch(38% 0.045 var(--gs-h) / .040); }
    #stories                     { background: oklch(38% 0.030 var(--gs-h) / .028); }
    #performance, #capabilities  { background: oklch(40% 0.020 var(--gs-h) / .022); }
    #collaborators               { background: oklch(40% 0.016 var(--gs-h) / .018); }

    /* the neutral lift and the vignette are the ground seen through the
       atmosphere — both were pinned at hue 250 and have to follow it */
    .illum {
      background:
        radial-gradient(72vmax 52vmax at 50% 38%,
          oklch(83% 0.16 88 / calc(var(--lumen-level) * 0.06)) 0%, transparent 62%),
        linear-gradient(oklch(72% 0.02 var(--gs-h) / calc(var(--lumen-level) * 0.05)),
                        oklch(72% 0.02 var(--gs-h) / calc(var(--lumen-level) * 0.05)));
    }
    .vignette {
      background: radial-gradient(120vmax 85vmax at 50% 45%,
        transparent 20%,
        oklch(8% 0.01 var(--gs-h) / calc(0.85 - var(--lumen-level) * 0.8)) 100%);
    }

    /* Inverted ground: the atmosphere has to subtract rather than add, or the
       screen blend simply disappears against paper. */
    html[data-gs-invert] .illum { display: none; }
    html[data-gs-invert] .vignette {
      background: radial-gradient(120vmax 85vmax at 50% 45%,
        transparent 30%,
        oklch(70% 0.03 var(--gs-h) / calc(0.30 - var(--lumen-level) * 0.26)) 100%);
      mix-blend-mode: multiply;
    }
    html[data-gs-invert] .grain { mix-blend-mode: multiply; opacity: .05; }
    html[data-gs-invert] #specimen,
    html[data-gs-invert] #assay,
    html[data-gs-invert] #inheritance,
    html[data-gs-invert] #stories,
    html[data-gs-invert] #performance,
    html[data-gs-invert] #capabilities,
    html[data-gs-invert] #collaborators { background: oklch(45% 0.03 var(--gs-h) / .05); }
  `;
  document.head.append(sheet);

  const token = (g, n) => `oklch(${g.L[n]}% ${g.c} ${g.h})`;

  function apply(g) {
    for (const k of ['void', 'ink', 'slab', 'line', 'mute', 'chalk']) {
      root.style.setProperty(`--color-${k}`, token(g, k));
    }
    root.style.setProperty('--gs-top', g.top);
    root.style.setProperty('--gs-bot', g.bot);
    root.style.setProperty('--gs-h', String(g.h));
    root.style.setProperty('--gs-scrim', `oklch(${g.L.void}% ${g.c} ${g.h} / .92)`);
    root.toggleAttribute('data-gs-invert', g.fam === 'inverted');
    root.dataset.gsGround = g.id;

    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute('content', g.chip);

    try { localStorage.setItem(KEY, g.id); } catch { /* private mode */ }
  }

  /* -------------------------------------------------------------------
     The control. Shadow-rooted so the site's reset, its `.hud` voice and
     its focus ring can neither style it nor be styled by it.
     ------------------------------------------------------------------- */
  const host = document.createElement('div');
  host.id = 'gs-host';
  host.style.cssText = 'position:fixed;inset:auto 0 0 0;z-index:2147483000;pointer-events:none';
  const sr = host.attachShadow({ mode: 'open' });

  sr.innerHTML = `
    <style>
      :host { all: initial; }
      *, *::before, *::after { box-sizing: border-box; }

      .bar {
        pointer-events: auto;
        position: absolute; left: 50%; bottom: max(1rem, env(safe-area-inset-bottom));
        transform: translateX(-50%);
        display: flex; align-items: center; gap: .5rem;
        padding: .4rem .45rem .4rem .5rem;
        max-width: calc(100vw - 1.5rem);
        background: color-mix(in oklab, #0c0e11 88%, transparent);
        border: 1px solid #2a3037;
        border-radius: 3px;
        box-shadow: 0 1rem 2.5rem -0.75rem rgb(0 0 0 / .7);
        backdrop-filter: blur(14px) saturate(140%);
        font: 500 .8125rem/1.35 "IBM Plex Sans Condensed", "IBM Plex Sans", ui-sans-serif, sans-serif;
        color: #e6e9ec;
        transition: opacity .18s ease, transform .22s cubic-bezier(.2,.7,.3,1);
      }
      :host([hidden-bar]) .bar { opacity: 0; transform: translate(-50%, 130%); pointer-events: none; }

      .tag {
        font-size: .625rem; letter-spacing: .12em; text-transform: uppercase;
        color: #676d74; padding-left: .25rem; white-space: nowrap;
      }
      @media (max-width: 33rem) { .tag { display: none; } }

      .chip {
        width: 1.35rem; height: 1.35rem; flex: none; border-radius: 2px;
        border: 1px solid rgb(255 255 255 / .18);
      }

      select {
        appearance: none;
        font: inherit; letter-spacing: .04em;
        color: #e6e9ec; background: #191d22;
        border: 1px solid #333a41; border-radius: 2px;
        padding: .38rem 1.85rem .38rem .6rem;
        min-width: 11rem; max-width: 14rem;
        cursor: pointer;
        background-image: linear-gradient(45deg, transparent 50%, #8b9197 50%),
                          linear-gradient(135deg, #8b9197 50%, transparent 50%);
        background-position: right 0.85rem center, right 0.55rem center;
        background-size: .3rem .3rem, .3rem .3rem;
        background-repeat: no-repeat;
      }
      select:hover { border-color: #4a525a; }
      optgroup { background: #14171b; color: #8b9197; font-style: normal; }
      option   { background: #14171b; color: #e6e9ec; }

      button {
        font: inherit; color: #b9bfc5; background: #191d22;
        border: 1px solid #333a41; border-radius: 2px;
        width: 1.75rem; height: 1.75rem; flex: none;
        display: grid; place-items: center; cursor: pointer; padding: 0;
        transition: color .12s ease, border-color .12s ease;
      }
      button:hover { color: #f2c02a; border-color: #4a525a; }
      button svg { width: .6rem; height: .6rem; fill: none; stroke: currentColor; stroke-width: 1.75; }

      .keys {
        font-family: "IBM Plex Mono", ui-monospace, monospace;
        font-size: .625rem; color: #5b6167; letter-spacing: .05em;
        padding-right: .2rem; white-space: nowrap;
      }
      @media (max-width: 46rem) { .keys { display: none; } }

      /* the collapsed handle — a client sees the page, not the harness */
      .cuff {
        pointer-events: auto;
        position: absolute; right: 1rem; bottom: max(1rem, env(safe-area-inset-bottom));
        display: flex; align-items: center; gap: .4rem;
        padding: .35rem .55rem;
        background: color-mix(in oklab, #0c0e11 82%, transparent);
        border: 1px solid #2a3037; border-radius: 3px;
        backdrop-filter: blur(14px);
        font: 600 .625rem/1 "IBM Plex Sans Condensed", ui-sans-serif, sans-serif;
        letter-spacing: .12em; text-transform: uppercase; color: #8b9197;
        cursor: pointer;
        opacity: 0; transform: translateY(130%); transition: opacity .18s ease, transform .22s cubic-bezier(.2,.7,.3,1);
      }
      :host([hidden-bar]) .cuff { opacity: 1; transform: none; }
      .cuff:hover { color: #f2c02a; border-color: #4a525a; }
      .cuff .chip { width: .85rem; height: .85rem; }

      :focus-visible { outline: 2px solid #f2c02a; outline-offset: 2px; }

      @media (prefers-reduced-motion: reduce) {
        .bar, .cuff { transition: none; }
      }
    </style>

    <div class="bar" role="group" aria-label="Ground preview">
      <span class="tag">Ground</span>
      <span class="chip" id="chip" aria-hidden="true"></span>
      <select id="sel" aria-label="Ground colour"></select>
      <button id="prev" type="button" aria-label="Previous ground" title="Previous ground  [">
        <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M7.5 1.5 3 6l4.5 4.5"/></svg>
      </button>
      <button id="next" type="button" aria-label="Next ground" title="Next ground  ]">
        <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 1.5 9 6l-4.5 4.5"/></svg>
      </button>
      <span class="keys">[ ]&nbsp;&nbsp;G</span>
      <button id="hide" type="button" aria-label="Hide the switcher" title="Hide the switcher  G">
        <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7"/></svg>
      </button>
    </div>

    <button class="cuff" id="show" type="button" title="Show the ground switcher  G">
      <span class="chip" id="cuffchip" aria-hidden="true"></span>Ground
    </button>
  `;

  const $ = (s) => sr.getElementById(s);
  const sel = $('sel');

  for (const [fam, label] of FAMS) {
    const grp = document.createElement('optgroup');
    grp.label = label;
    for (const g of GROUNDS.filter((x) => x.fam === fam)) {
      const o = document.createElement('option');
      o.value = g.id;
      o.textContent = `${g.name} — ${g.sub}`;
      grp.append(o);
    }
    sel.append(grp);
  }

  function select(id) {
    const g = GROUNDS.find((x) => x.id === id)
           || GROUNDS.find((x) => x.id === DEFAULT_ID) || GROUNDS[0];
    apply(g);
    sel.value = g.id;
    /* the cost line rides along as the select's tooltip — the trade-off is the
       whole point of the exercise and should never be more than a hover away */
    sel.title = `${g.name} — ${g.sub}\n\nCost: ${g.risk}`;
    /* the chip carries the ground itself — but at 13% lightness every dark
       candidate reads as the same black square, so the ground's hue is banded
       underneath it at a lightness you can actually see */
    const paint = `linear-gradient(160deg, ${g.top}, ${g.bot})`;
    const band = `inset 0 -0.28rem 0 oklch(62% ${Math.max(0.09, g.c * 4).toFixed(3)} ${g.h})`;
    for (const el of [$('chip'), $('cuffchip')]) {
      el.style.background = paint;
      el.style.boxShadow = band;
    }
  }

  const step = (d) => {
    const i = GROUNDS.findIndex((g) => g.id === sel.value);
    select(GROUNDS[(i + d + GROUNDS.length) % GROUNDS.length].id);
  };

  sel.addEventListener('change', () => select(sel.value));
  $('prev').addEventListener('click', () => step(-1));
  $('next').addEventListener('click', () => step(1));

  const toggle = (on) => {
    host.toggleAttribute('hidden-bar', !on);
    if (on) sel.focus({ preventScroll: true });
  };
  $('hide').addEventListener('click', () => toggle(false));
  $('show').addEventListener('click', () => toggle(true));

  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.composedPath()[0];
    if (t instanceof HTMLElement &&
        (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    if (e.key === '[') { step(-1); e.preventDefault(); }
    else if (e.key === ']') { step(1); e.preventDefault(); }
    else if (e.key === 'g' || e.key === 'G') { toggle(host.hasAttribute('hidden-bar')); e.preventDefault(); }
  });

  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch { /* private mode */ }
  select(saved && GROUNDS.some((g) => g.id === saved) ? saved : DEFAULT_ID);

  document.body.append(host);
})();
