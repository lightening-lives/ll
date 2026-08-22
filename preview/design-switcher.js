/* =====================================================================
   TEMPORARY — live design switcher, 2026-08-22.
   Two decisions, driven against the REAL page rather than against swatches:

     GROUND  fourteen candidates — the nine that were reviewed on 2026-08-19,
             plus a light family, because the page has only ever been argued
             on a dark ground and the question "should this be a light site?"
             had no way to be asked.
     TYPE    eight pairings — the display / sans / mono / condensed set, which
             is four tokens and therefore switchable in one go.

   Grew out of preview/ground-switcher.js (git mv, so the history follows).
   Self-contained on purpose: it injects its own stylesheet and renders its
   UI inside a shadow root, so nothing here touches the site's CSS and the
   site's CSS cannot reach in. It lives under preview/ because src/input.css
   already excludes that directory from Tailwind's source scan.

   TO REMOVE AFTER SIGN-OFF:
     1. delete the <script src="./preview/design-switcher.js"> tag in index.html
     2. rm -rf preview/
     3. bake the chosen values into src/input.css (@theme + the html gradient
        + .nav.is-stuck) and the chosen font link into index.html <head>,
        then npm run build
   ===================================================================== */
(() => {
  'use strict';

  /* =====================================================================
     1 · GROUNDS
     `L` is per-token lightness; every token in a family shares the ground's
     hue and chroma, so a candidate is one hue decision and six lightness
     decisions rather than six unrelated colours.
     ===================================================================== */
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

    { id: 'slate',     name: 'Lifted slate',    sub: 'as built',             fam: 'instrument',
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

    /* ---------------------------------------------------------------
       LIGHT GROUNDS
       Every one of these inverts the six-token ladder — `void` becomes the
       lightest value and `chalk` the darkest — and swaps the accent set
       (see ACC_LIGHT). Without that swap the review is dishonest: gold
       measures 1.47:1 on paper and the eyebrow above every section on the
       page is `text-lumen`, so a light ground would be shown to you with
       fourteen invisible section labels and read as a bug rather than as a
       candidate.

       `mute` is held at or below 46% and `chalk` at or below 20% on all
       five, which is what keeps secondary text above 4.5:1 on the lightest
       ground in the set.

       The one cost they share is at the FOOT of the page: #contact and the
       footer are `bg-bone` at 95%, and that section exists to be the
       lights coming up. On Lab white (97%) the payoff inverts — the page
       gets very slightly darker at the moment it should get lighter — and
       on Filter paper it disappears entirely. Newsprint and Mist are the
       two that keep it, which is the argument for them over the other
       three, not their hue.
       --------------------------------------------------------------- */
    { id: 'bone',      name: 'Filter paper',    sub: 'the closing section',  fam: 'light',
      top: 'oklch(96% 0.010 85)',    bot: 'oklch(93% 0.014 80)',    h: 85,  c: 0.012,
      L: { void: 95, ink: 92, slab: 88, line: 78, mute: 46, chalk: 20 }, chip: '#f2eee6',
      risk: 'The whole page becomes the payoff, so the payoff stops existing — #contact no longer arrives anywhere.' },

    { id: 'labwhite',  name: 'Lab white',       sub: 'cool, neutral',        fam: 'light',
      top: 'oklch(98% 0.004 250)',   bot: 'oklch(95.5% 0.006 250)', h: 250, c: 0.006,
      L: { void: 97, ink: 94, slab: 90, line: 80, mute: 45, chalk: 18 }, chip: '#f8f9fb',
      risk: 'The most neutral and the most anonymous — nothing in it is this company. Also inverts the closing payoff.' },

    { id: 'manila',    name: 'Manila',          sub: 'the specimen envelope', fam: 'light',
      top: 'oklch(94% 0.026 78)',    bot: 'oklch(91% 0.032 74)',    h: 78,  c: 0.026,
      L: { void: 93, ink: 90, slab: 86, line: 76, mute: 44, chalk: 20 }, chip: '#f0e6d2',
      risk: 'Warm enough that the gold stops separating from the ground — check the CTA and the rail before committing.' },

    { id: 'mist',      name: 'Mist',            sub: 'cool grey',            fam: 'light',
      top: 'oklch(93% 0.010 230)',   bot: 'oklch(90% 0.014 228)',   h: 230, c: 0.014,
      L: { void: 92, ink: 88, slab: 84, line: 74, mute: 44, chalk: 19 }, chip: '#e5e9ee',
      risk: 'Reads clinical rather than institutional. Keeps the bone payoff, and keeps the slate hue the brand already owns.' },

    { id: 'newsprint', name: 'Newsprint',       sub: 'the document',         fam: 'light',
      top: 'oklch(90% 0.020 95)',    bot: 'oklch(87% 0.026 92)',    h: 95,  c: 0.020,
      L: { void: 89, ink: 86, slab: 82, line: 72, mute: 42, chalk: 18 }, chip: '#e3ddcc',
      risk: 'The darkest light ground, so it keeps the closing payoff — at the price of looking printed rather than lit.' }
  ];

  const GROUND_FAMS = [
    ['instrument', 'Instrument'],
    ['brand',      'From the mark'],
    ['light',      'Light grounds']
  ];

  /* Accents are not part of the six-token ladder — they are the same three
     colours on every dark candidate, and a different three on every light
     one. Gold at 83% is 1.47:1 on paper; `deep` in the shipped theme is the
     precedent for what an accent becomes once it has to be read ON paper. */
  const ACC_DARK  = { lumen: 'oklch(83% 0.160 88)',  probe: 'oklch(80% 0.170 148)', alarm: 'oklch(70% 0.160 33)' };
  const ACC_LIGHT = { lumen: 'oklch(52% 0.140 78)',  probe: 'oklch(48% 0.130 150)', alarm: 'oklch(50% 0.190 30)' };

  /* =====================================================================
     2 · TYPE
     Four tokens — display, sans, mono, cond — plus the optical corrections
     that have to travel with them. Tracking is NOT a property of the page,
     it is a property of the face: -0.022em is right for Fraunces at heading
     size and visibly wrong on Instrument Serif, which is already narrow.
     A pairing that changed only the family names would be a rigged test.

     `w` is the display weight. The shipped `h1,h2,h3` rule hard-codes 400,
     which is a Fraunces decision — a grotesque at 400 has no display voice
     at all, so the sans pairings raise it.

     `g` is the Google Fonts query, fetched only when the pairing is first
     selected. Null means the face is already in index.html's <head>, so
     "as built" and "Plex alone" cost nothing to preview.
     ===================================================================== */
  const SANS_UI = 'ui-sans-serif, system-ui, sans-serif';
  const MONO_UI = 'ui-monospace, SFMono-Regular, monospace';

  const TYPES = [
    { id: 'plex', name: 'Fraunces + Plex', sub: 'as built', fam: 'built', g: null,
      display: '"Fraunces", ui-serif, Georgia, serif',
      sans:    `"IBM Plex Sans", ${SANS_UI}`,
      mono:    `"IBM Plex Mono", ${MONO_UI}`,
      cond:    `"IBM Plex Sans Condensed", "IBM Plex Sans", ${SANS_UI}`,
      w: 400, t: { display: -0.035, head: -0.022, title: -0.015 },
      risk: 'The only pairing with both a real condensed chrome face and an optical-size axis on the display face. Every alternative below gives up one or the other.' },

    { id: 'source', name: 'Source Serif + Source Sans', sub: 'the journal', fam: 'serif',
      g: 'family=Source+Serif+4:opsz,wght@8..60,300..700&family=Source+Sans+3:wght@300..700&family=Source+Code+Pro:wght@400;500',
      display: '"Source Serif 4", ui-serif, Georgia, serif',
      sans:    `"Source Sans 3", ${SANS_UI}`,
      mono:    `"Source Code Pro", ${MONO_UI}`,
      cond:    `"Source Sans 3", ${SANS_UI}`,
      w: 500, t: { display: -0.028, head: -0.018, title: -0.012 },
      risk: 'A real superfamily designed for scientific publishing — the safest and most institutional choice, and the one with the least personality at heading size. No condensed cut, so the nav loses its separate voice.' },

    { id: 'newsreader', name: 'Newsreader + Public Sans', sub: 'the bulletin', fam: 'serif',
      g: 'family=Newsreader:opsz,wght@6..72,300..700&family=Public+Sans:wght@300..700&family=IBM+Plex+Mono:wght@400;500',
      display: '"Newsreader", ui-serif, Georgia, serif',
      sans:    `"Public Sans", ${SANS_UI}`,
      mono:    `"IBM Plex Mono", ${MONO_UI}`,
      cond:    `"Public Sans", ${SANS_UI}`,
      w: 400, t: { display: -0.026, head: -0.016, title: -0.010 },
      risk: 'Warmer and more readable than Fraunces at small display sizes, and much plainer at 76px — the hero gives up most of its character.' },

    { id: 'literata', name: 'Literata + Inter', sub: 'the reader', fam: 'serif',
      g: 'family=Literata:opsz,wght@7..72,300..700&family=Inter:wght@300..700&family=JetBrains+Mono:wght@400;500',
      display: '"Literata", ui-serif, Georgia, serif',
      sans:    `"Inter", ${SANS_UI}`,
      mono:    `"JetBrains Mono", ${MONO_UI}`,
      cond:    `"Inter", ${SANS_UI}`,
      w: 400, t: { display: -0.024, head: -0.015, title: -0.010 },
      risk: 'Built for screen reading at body size, so it is sturdy where Fraunces is elegant. Wide — the 12ch headings will run longer and may reflow to an extra line.' },

    { id: 'spectral', name: 'Spectral + Inter Tight', sub: 'the dispatch', fam: 'serif',
      g: 'family=Spectral:wght@300;400;500;600&family=Inter+Tight:wght@300..700&family=IBM+Plex+Mono:wght@400;500',
      display: '"Spectral", ui-serif, Georgia, serif',
      sans:    `"Inter Tight", ${SANS_UI}`,
      mono:    `"IBM Plex Mono", ${MONO_UI}`,
      cond:    `"Inter Tight", ${SANS_UI}`,
      w: 400, t: { display: -0.026, head: -0.016, title: -0.010 },
      risk: 'No optical-size axis, so the 76px hero and the 25px card titles are drawn at the same contrast — the hero looks slightly under-set.' },

    { id: 'instrument', name: 'Instrument Serif + Inter', sub: 'high contrast', fam: 'serif',
      g: 'family=Instrument+Serif:ital@0;1&family=Inter:wght@300..700&family=IBM+Plex+Mono:wght@400;500',
      display: '"Instrument Serif", ui-serif, Georgia, serif',
      sans:    `"Inter", ${SANS_UI}`,
      mono:    `"IBM Plex Mono", ${MONO_UI}`,
      cond:    `"Inter", ${SANS_UI}`,
      w: 400, t: { display: -0.018, head: -0.008, title: -0.004 },
      risk: 'One weight, no optical sizing, and very high stroke contrast — spectacular at 76px, thin and fragile at the 25px card titles. The hero is paid for by every heading below it.' },

    { id: 'archivo', name: 'Archivo + Inter', sub: 'swiss clinical', fam: 'sans',
      g: 'family=Archivo:wght@400..800&family=Archivo+Narrow:wght@500;600&family=Inter:wght@300..700&family=IBM+Plex+Mono:wght@400;500',
      display: `"Archivo", ${SANS_UI}`,
      sans:    `"Inter", ${SANS_UI}`,
      mono:    `"IBM Plex Mono", ${MONO_UI}`,
      cond:    `"Archivo Narrow", "Archivo", ${SANS_UI}`,
      w: 600, t: { display: -0.032, head: -0.026, title: -0.018 },
      risk: 'Keeps a condensed chrome voice, which most of these lose. Drops the editorial register entirely: the page stops looking like a document and starts looking like a product.' },

    { id: 'plexonly', name: 'Plex alone', sub: 'no serif at all', fam: 'sans', g: null,
      display: `"IBM Plex Sans", ${SANS_UI}`,
      sans:    `"IBM Plex Sans", ${SANS_UI}`,
      mono:    `"IBM Plex Mono", ${MONO_UI}`,
      cond:    `"IBM Plex Sans Condensed", "IBM Plex Sans", ${SANS_UI}`,
      w: 600, t: { display: -0.030, head: -0.024, title: -0.016 },
      risk: 'One superfamily doing all four jobs. Cheapest to ship — nothing new loads, and the page drops a whole font file — and the flattest: the hero and the card titles now differ only in size.' }
  ];

  const TYPE_FAMS = [
    ['built', 'As built'],
    ['serif', 'Serif display'],
    ['sans',  'Sans display']
  ];

  const GKEY = 'll-ground', TKEY = 'll-type';
  /* The pair a first-time viewer lands on. Deliberately NOT [0] of either
     array: the arrays are in REVIEW order (instrument → brand → light, and
     built → serif → sans) and the ‹ › stepping and the grouped dropdowns
     both read from them, so reordering to change the default would quietly
     change the walkthrough. Name the defaults and leave the order alone. */
  const GROUND_DEFAULT = 'slate';
  const TYPE_DEFAULT   = 'plex';
  const root = document.documentElement;

  /* -------------------------------------------------------------------
     The overrides. Written unlayered and injected last, so they outrank
     everything the built stylesheet puts in @layer base / @layer utilities
     at equal specificity. Only what these two decisions actually own is
     touched: the six ground tokens, the three accents, the four font
     tokens, the display weight, the document gradient, the stuck-nav
     scrim, the section tints, and the two fixed atmosphere layers whose
     hue is hard-coded.
     ------------------------------------------------------------------- */
  const sheet = document.createElement('style');
  sheet.id = 'ds-overrides';
  sheet.textContent = `
    html {
      background:
        linear-gradient(180deg, var(--ds-top) 0, var(--ds-bot) 100%),
        var(--color-void);
    }

    .nav.is-stuck { background-color: var(--ds-scrim); }

    /* The one colour on the page that is neither a token nor part of a 3D
       object: src/input.css:1502 sets the nav links to a literal
       oklch(74% 0.012 250), on the argument that --color-mute is too dim
       at 11px. Correct on the ground it was written for, and 1.6:1 on paper
       — so on a light candidate the whole nav would read as broken rather
       than as a colour decision, which is the same trap as the gold. It
       follows the ground here, at the lightness its own argument implies:
       lifted away from mute in the same direction the ground is dark. */
    .nav a:not(.nav__cta):not(.nav__mark) { color: var(--ds-nav); }

    /* The shipped rule hard-codes 400, which is a Fraunces decision. Only
       the weight is restated — the family, the leading and the tracking all
       still come from the tokens this script writes. */
    h1, h2, h3 { font-weight: var(--ds-display-weight, 400); }

    /* section grounds keep their measured lightness and alpha; only the hue
       travels with the ground, so the translucency contract still holds */
    #specimen, #assay            { background: oklch(38% 0.055 var(--ds-h) / .055); }
    #inheritance                 { background: oklch(38% 0.045 var(--ds-h) / .040); }
    #stories                     { background: oklch(38% 0.030 var(--ds-h) / .028); }
    #performance, #capabilities  { background: oklch(40% 0.020 var(--ds-h) / .022); }
    #collaborators               { background: oklch(40% 0.016 var(--ds-h) / .018); }

    /* the neutral lift and the vignette are the ground seen through the
       atmosphere — both were pinned at hue 250 and have to follow it */
    .illum {
      background:
        radial-gradient(72vmax 52vmax at 50% 38%,
          oklch(83% 0.16 88 / calc(var(--lumen-level) * 0.06)) 0%, transparent 62%),
        linear-gradient(oklch(72% 0.02 var(--ds-h) / calc(var(--lumen-level) * 0.05)),
                        oklch(72% 0.02 var(--ds-h) / calc(var(--lumen-level) * 0.05)));
    }
    .vignette {
      background: radial-gradient(120vmax 85vmax at 50% 45%,
        transparent 20%,
        oklch(8% 0.01 var(--ds-h) / calc(0.85 - var(--lumen-level) * 0.8)) 100%);
    }

    /* Light ground: the atmosphere has to subtract rather than add, or the
       screen blend simply disappears against paper. */
    html[data-ds-light] .illum { display: none; }
    html[data-ds-light] .vignette {
      background: radial-gradient(120vmax 85vmax at 50% 45%,
        transparent 30%,
        oklch(70% 0.03 var(--ds-h) / calc(0.30 - var(--lumen-level) * 0.26)) 100%);
      mix-blend-mode: multiply;
    }
    html[data-ds-light] .grain { mix-blend-mode: multiply; opacity: .05; }
    html[data-ds-light] #specimen,
    html[data-ds-light] #assay,
    html[data-ds-light] #inheritance,
    html[data-ds-light] #stories,
    html[data-ds-light] #performance,
    html[data-ds-light] #capabilities,
    html[data-ds-light] #collaborators { background: oklch(45% 0.03 var(--ds-h) / .05); }

    /* THE PAPER SURFACES.
       #contact and the footer are bg-bone — they are light on EVERY
       candidate, including the dark ones, because being light is their whole
       job. That means they are the two places on the page that read void
       as "the dark end of the ladder" rather than as the ground: the heading
       is text-void, the Request-a-kit button is bg-void text-bone, and
       body.is-lit :focus-visible outlines in var(--color-void).

       Invert the ladder and that assumption inverts with it — the first
       light ground rendered the closing section as paper type on paper, and
       a dead CTA in the middle of it. Rather than restate each utility, the
       token is redefined on the two surfaces themselves: every one of them
       resolves var(--color-void) at its own use site, so one declaration
       fixes colour, background, border and outline together. On paper the
       dark end of the ladder is chalk, which is what this says. */
    html[data-ds-light] [data-lit],
    html[data-ds-light] footer.bg-bone { --color-void: var(--color-chalk); }
  `;
  document.head.append(sheet);

  const token = (g, n) => `oklch(${g.L[n]}% ${g.c} ${g.h})`;

  function applyGround(g) {
    for (const k of ['void', 'ink', 'slab', 'line', 'mute', 'chalk']) {
      root.style.setProperty(`--color-${k}`, token(g, k));
    }
    const acc = g.fam === 'light' ? ACC_LIGHT : ACC_DARK;
    for (const k of ['lumen', 'probe', 'alarm']) {
      root.style.setProperty(`--color-${k}`, acc[k]);
    }
    root.style.setProperty('--ds-top', g.top);
    root.style.setProperty('--ds-bot', g.bot);
    root.style.setProperty('--ds-h', String(g.h));
    root.style.setProperty('--ds-scrim', `oklch(${g.L.void}% ${g.c} ${g.h} / .92)`);
    root.style.setProperty('--ds-nav', `oklch(${g.fam === 'light' ? 40 : 74}% ${g.c} ${g.h})`);
    root.toggleAttribute('data-ds-light', g.fam === 'light');
    root.dataset.dsGround = g.id;

    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute('content', g.chip);

    try { localStorage.setItem(GKEY, g.id); } catch { /* private mode */ }
  }

  /* The webfont for a pairing is fetched the first time it is selected and
     then left in the document — stepping back and forth through the list is
     the whole point of the control, and re-adding the link each time would
     re-run the swap and flash the page. */
  const loaded = new Set();
  function loadFaces(p) {
    if (!p.g || loaded.has(p.id)) return;
    loaded.add(p.id);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${p.g}&display=swap`;
    document.head.append(link);
  }

  function applyType(p) {
    loadFaces(p);
    root.style.setProperty('--font-display', p.display);
    root.style.setProperty('--font-sans',    p.sans);
    root.style.setProperty('--font-mono',    p.mono);
    root.style.setProperty('--font-cond',    p.cond);
    root.style.setProperty('--ds-display-weight', String(p.w));
    root.style.setProperty('--tracking-display', `${p.t.display}em`);
    root.style.setProperty('--tracking-head',    `${p.t.head}em`);
    root.style.setProperty('--tracking-title',   `${p.t.title}em`);
    root.dataset.dsType = p.id;
    try { localStorage.setItem(TKEY, p.id); } catch { /* private mode */ }
  }

  /* -------------------------------------------------------------------
     The control. Shadow-rooted so the site's reset, its `.hud` voice and
     its focus ring can neither style it nor be styled by it — which now
     matters more than it did, because the type dropdown is changing the
     font tokens the site's own chrome reads from.
     ------------------------------------------------------------------- */
  const host = document.createElement('div');
  host.id = 'ds-host';
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
        display: flex; flex-wrap: wrap; align-items: center; justify-content: center;
        gap: .4rem .5rem;
        padding: .4rem .45rem;
        width: max-content; max-width: calc(100vw - 1.5rem);
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

      /* one dropdown and its label/chip/steppers travel together when the
         bar wraps — a select stranded from its own label is unreadable */
      .field { display: flex; align-items: center; gap: .4rem; }

      .tag {
        font-size: .625rem; letter-spacing: .12em; text-transform: uppercase;
        color: #676d74; padding-left: .25rem; white-space: nowrap;
      }
      @media (max-width: 40rem) { .tag { display: none; } }

      .rule { width: 1px; align-self: stretch; background: #2a3037; }
      @media (max-width: 52rem) { .rule { display: none; } }

      .chip {
        width: 1.35rem; height: 1.35rem; flex: none; border-radius: 2px;
        border: 1px solid rgb(255 255 255 / .18);
      }
      /* the type chip is a specimen, not a swatch — it is set in the
         pairing's own display face, so the dropdown shows the decision */
      .spec {
        display: grid; place-items: center;
        font-size: .95rem; line-height: 1; letter-spacing: -.02em;
        color: #f2c02a; background: #191d22; overflow: hidden;
      }

      select {
        appearance: none;
        font: inherit; letter-spacing: .04em;
        color: #e6e9ec; background: #191d22;
        border: 1px solid #333a41; border-radius: 2px;
        padding: .38rem 1.85rem .38rem .6rem;
        min-width: 10.5rem; max-width: 14rem;
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
      /* the steppers are a convenience the keyboard already covers; below
         the width where the two fields stop fitting side by side they are
         the first thing to go */
      @media (max-width: 46rem) { .step { display: none; } }

      .reset { width: auto; padding: 0 .5rem; font-size: .625rem;
               letter-spacing: .12em; text-transform: uppercase; }

      .keys {
        font-family: "IBM Plex Mono", ui-monospace, monospace;
        font-size: .625rem; color: #5b6167; letter-spacing: .05em;
        padding-right: .2rem; white-space: nowrap;
      }
      @media (max-width: 62rem) { .keys { display: none; } }

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

    <div class="bar" role="group" aria-label="Design preview">
      <div class="field">
        <span class="tag">Ground</span>
        <span class="chip" id="gchip" aria-hidden="true"></span>
        <select id="gsel" aria-label="Ground colour"></select>
        <button class="step" id="gprev" type="button" aria-label="Previous ground" title="Previous ground  [">
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M7.5 1.5 3 6l4.5 4.5"/></svg>
        </button>
        <button class="step" id="gnext" type="button" aria-label="Next ground" title="Next ground  ]">
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 1.5 9 6l-4.5 4.5"/></svg>
        </button>
      </div>

      <span class="rule" aria-hidden="true"></span>

      <div class="field">
        <span class="tag">Type</span>
        <span class="chip spec" id="tchip" aria-hidden="true">Aa</span>
        <select id="tsel" aria-label="Type pairing"></select>
        <button class="step" id="tprev" type="button" aria-label="Previous type pairing" title="Previous pairing  ,">
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M7.5 1.5 3 6l4.5 4.5"/></svg>
        </button>
        <button class="step" id="tnext" type="button" aria-label="Next type pairing" title="Next pairing  .">
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 1.5 9 6l-4.5 4.5"/></svg>
        </button>
      </div>

      <span class="rule" aria-hidden="true"></span>

      <div class="field">
        <span class="keys">[ ]&nbsp;&nbsp;, .&nbsp;&nbsp;R&nbsp;&nbsp;G</span>
        <button class="reset" id="reset" type="button" title="Back to what is built  R">Reset</button>
        <button id="hide" type="button" aria-label="Hide the switcher" title="Hide the switcher  G">
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 2.5l7 7M9.5 2.5l-7 7"/></svg>
        </button>
      </div>
    </div>

    <button class="cuff" id="show" type="button" title="Show the design switcher  G">
      <span class="chip" id="cuffchip" aria-hidden="true"></span>Preview
    </button>
  `;

  const $ = (s) => sr.getElementById(s);
  const gsel = $('gsel'), tsel = $('tsel');

  /* Both dropdowns are built the same way, from the same shape of record —
     `{ id, name, sub, fam }` — so the grouping only had to be written once. */
  function fill(sel, items, fams) {
    for (const [fam, label] of fams) {
      const grp = document.createElement('optgroup');
      grp.label = label;
      for (const it of items.filter((x) => x.fam === fam)) {
        const o = document.createElement('option');
        o.value = it.id;
        o.textContent = `${it.name} — ${it.sub}`;
        grp.append(o);
      }
      sel.append(grp);
    }
  }
  fill(gsel, GROUNDS, GROUND_FAMS);
  fill(tsel, TYPES, TYPE_FAMS);

  function selectGround(id) {
    const g = GROUNDS.find((x) => x.id === id)
           || GROUNDS.find((x) => x.id === GROUND_DEFAULT) || GROUNDS[0];
    applyGround(g);
    gsel.value = g.id;
    /* the cost line rides along as the select's tooltip — the trade-off is the
       whole point of the exercise and should never be more than a hover away */
    gsel.title = `${g.name} — ${g.sub}\n\nCost: ${g.risk}`;
    /* the chip carries the ground itself — but at 13% lightness every dark
       candidate reads as the same black square, so the ground's hue is banded
       underneath it at a lightness you can actually see */
    const paint = `linear-gradient(160deg, ${g.top}, ${g.bot})`;
    const band = `inset 0 -0.28rem 0 oklch(62% ${Math.max(0.09, g.c * 4).toFixed(3)} ${g.h})`;
    for (const el of [$('gchip'), $('cuffchip')]) {
      el.style.background = paint;
      el.style.boxShadow = band;
    }
  }

  function selectType(id) {
    const p = TYPES.find((x) => x.id === id)
           || TYPES.find((x) => x.id === TYPE_DEFAULT) || TYPES[0];
    applyType(p);
    tsel.value = p.id;
    tsel.title = `${p.name} — ${p.sub}\n\nCost: ${p.risk}`;
    $('tchip').style.fontFamily = p.display;
    $('tchip').style.fontWeight = String(p.w);
  }

  const step = (sel, items, pick, d) => {
    const i = items.findIndex((x) => x.id === sel.value);
    pick(items[(i + d + items.length) % items.length].id);
  };
  const stepGround = (d) => step(gsel, GROUNDS, selectGround, d);
  const stepType   = (d) => step(tsel, TYPES,   selectType,   d);

  gsel.addEventListener('change', () => selectGround(gsel.value));
  tsel.addEventListener('change', () => selectType(tsel.value));
  $('gprev').addEventListener('click', () => stepGround(-1));
  $('gnext').addEventListener('click', () => stepGround(1));
  $('tprev').addEventListener('click', () => stepType(-1));
  $('tnext').addEventListener('click', () => stepType(1));

  const reset = () => { selectGround(GROUND_DEFAULT); selectType(TYPE_DEFAULT); };
  $('reset').addEventListener('click', reset);

  const toggle = (on) => {
    host.toggleAttribute('hidden-bar', !on);
    if (on) gsel.focus({ preventScroll: true });
  };
  $('hide').addEventListener('click', () => toggle(false));
  $('show').addEventListener('click', () => toggle(true));

  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.composedPath()[0];
    if (t instanceof HTMLElement &&
        (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    if      (e.key === '[') { stepGround(-1); e.preventDefault(); }
    else if (e.key === ']') { stepGround(1);  e.preventDefault(); }
    else if (e.key === ',') { stepType(-1);   e.preventDefault(); }
    else if (e.key === '.') { stepType(1);    e.preventDefault(); }
    else if (e.key === 'r' || e.key === 'R') { reset(); e.preventDefault(); }
    else if (e.key === 'g' || e.key === 'G') { toggle(host.hasAttribute('hidden-bar')); e.preventDefault(); }
  });

  let savedG = null, savedT = null;
  try { savedG = localStorage.getItem(GKEY); savedT = localStorage.getItem(TKEY); } catch { /* private mode */ }
  selectGround(savedG && GROUNDS.some((g) => g.id === savedG) ? savedG : GROUND_DEFAULT);
  selectType(savedT && TYPES.some((p) => p.id === savedT) ? savedT : TYPE_DEFAULT);

  document.body.append(host);
})();
