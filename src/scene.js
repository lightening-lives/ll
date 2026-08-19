/* =====================================================================
   DARKFIELD — scene orchestration
   Binds content.js into the page, builds the 3D geometry, and drives
   every scene from scroll position. Nothing here autoplays.
   ===================================================================== */
(function () {
  'use strict';

  const C = window.LL_CONTENT;
  // ?motion=off forces the reduced-motion path so it can be QA'd on any machine
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
                  /(^|[?&])motion=off(&|$)/.test(location.search);
  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const get = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), C);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // stand-in mark until a real logo file lands in the slot
  const initials = (n) => n.replace(/[^A-Za-z ]/g, ' ').split(/\s+/)
    .filter(w => w && !/^(and|the|of|for|centre|center)$/i.test(w))
    .slice(0, 3).map(w => w[0].toUpperCase()).join('');

  /* ---------- 1 · bind simple text nodes ---------------------------- */
  $$('[data-ll]').forEach((node) => {
    const v = get(node.getAttribute('data-ll'));
    if (typeof v === 'string' || typeof v === 'number') node.textContent = v;
  });

  $('#year').textContent = '2026';                       // 🟠 static: page build year
  const em = $('#cEmail'), ph = $('#cPhone');
  em.textContent = C.brand.email; em.href = 'mailto:' + C.brand.email;
  ph.textContent = C.brand.phone; ph.href = 'tel:' + C.brand.phone.replace(/\s/g, '');
  $('#cWhats').href = C.brand.whatsapp;
  $('#cSocial').innerHTML = C.brand.social.map((x) =>
    `<a class="underline underline-offset-4 decoration-1" target="_blank" rel="noopener"
        href="${esc(x.href)}">${esc(x.k)}</a>`).join('');

  /* ---------- 2 · render the repeating content ----------------------- */

  // hero spec strip
  $('#specStrip').innerHTML = C.hero.specs.map((s) => `
    <div>
      <p class="hud text-mute">${esc(s.k)}</p>
      <p class="figure-num text-chalk text-[1.6rem] mt-1.5 leading-none">${esc(s.v)}<span
         class="text-lumen text-[.8rem] ml-1 align-baseline">${esc(s.u)}</span></p>
    </div>`).join('');

  // specimen claims
  $('#specimenPoints').innerHTML = C.specimen.points.map((p) => `
    <div class="bg-void p-4">
      <dt class="hud text-lumen">${esc(p.t)}</dt>
      <dd class="text-sm text-mute mt-1.5">${esc(p.d)}</dd>
    </div>`).join('');

  // assay pipeline
  $('#assayStack').innerHTML = C.assay.stack.map((s) => `
    <li class="flex gap-4 py-3 border-b border-line">
      <span class="hud text-probe pt-0.5 shrink-0">${esc(s.step)}</span>
      <span><span class="text-chalk text-sm">${esc(s.t)}</span>
        <span class="text-mute text-sm"> — ${esc(s.d)}</span></span>
    </li>`).join('');

  // the catalogue — the section a lab director screenshots
  $('#assayGrid').innerHTML = C.menu.items.map((a) => `
    <article class="assay-card p-6 flex flex-col">
      <div class="flex items-start justify-between gap-3">
        <span class="hud text-lumen">${esc(a.code)}</span>
        ${a.flag ? `<span class="hud text-probe border border-probe/40 px-2 py-0.5">${esc(a.flag)}</span>` : ''}
      </div>
      <h3 class="font-display text-[1.6rem] leading-[1.05] text-chalk mt-4">${esc(a.name)}</h3>
      <p class="text-sm text-mute mt-2 flex-1">${esc(a.indication)}</p>
      <dl class="mt-6 grid grid-cols-2 gap-y-3 gap-x-4 rule-t pt-4">
        <div><dt class="hud text-mute">Sample</dt><dd class="text-sm text-chalk mt-0.5">${esc(a.sample)}</dd></div>
        <div><dt class="hud text-mute">Turnaround</dt><dd class="figure-num text-lumen text-sm mt-0.5">${esc(a.tat)}</dd></div>
        <div><dt class="hud text-mute">Method</dt><dd class="text-sm text-chalk mt-0.5 min-h-[2.6em]">${esc(a.method)}</dd></div>
        <div><dt class="hud text-mute">Throughput</dt><dd class="figure-num text-chalk text-sm mt-0.5">${esc(a.throughput)}</dd></div>
      </dl>
    </article>`).join('');

  // performance figures — always with their denominator
  $('#statGrid').innerHTML = C.validation.stats.map((s) => `
    <div class="bg-void p-6">
      <p class="figure-num text-probe text-[clamp(2rem,4.5vw,3rem)] leading-none">${esc(s.v)}<span
         class="text-[.9rem] text-mute ml-0.5">${esc(s.u)}</span></p>
      <p class="hud text-chalk mt-3">${esc(s.k)}</p>
      <p class="text-xs text-mute mt-1">${esc(s.d)}</p>
    </div>`).join('');

  $('#accreditations').innerHTML = C.validation.accreditations.map((a) =>
    `<span class="hud text-mute border border-line px-3 py-1.5">${esc(a)}</span>`).join('');

  // workflow track
  $('#workflowTrack').innerHTML = C.workflow.steps.map((s) => `
    <article class="wf-step shrink-0 w-[78vw] sm:w-[42vw] lg:w-[26vw] min-h-[15.5rem]
                    flex flex-col bg-ink border border-line p-7">
      <div class="flex items-baseline justify-between">
        <span class="figure-num text-lumen text-[2.5rem] leading-none">${esc(s.n)}</span>
        <span class="hud text-probe">${esc(s.time)}</span>
      </div>
      <h3 class="font-display text-[1.75rem] text-chalk mt-auto pt-8">${esc(s.t)}</h3>
      <p class="text-sm text-mute mt-2">${esc(s.d)}</p>
    </article>`).join('');

  const fi = $('#foundersImg');
  fi.src = C.provenance.portrait; fi.alt = C.provenance.portraitAlt;

  // capabilities — the full Solutions & Services scope, which the page was missing
  $('#pillarList').innerHTML = C.capabilities.pillars.map((p) => `
    <article class="pillar">
      <span class="pillar__n figure-num">${esc(p.n)}</span>
      <div class="pillar__head">
        <h3 class="font-display text-[clamp(1.35rem,2.4vw,1.95rem)] leading-[1.1] text-chalk">${esc(p.t)}</h3>
        <p class="text-sm text-mute mt-2.5">${esc(p.d)}</p>
      </div>
      <ul class="pillar__items">
        ${p.items.map(([t, d]) => `
          <li><span class="pillar__t">${esc(t)}</span><span class="pillar__d">${esc(d)}</span></li>`).join('')}
      </ul>
    </article>`).join('');

  // provenance — the founder's record is the strongest thing on this page
  $('#founderCreds').innerHTML = C.provenance.founder.credentials.map((c) =>
    `<li class="hud text-lumen border border-line px-3 py-1.5">${esc(c)}</li>`).join('');

  $('#governance').innerHTML = [C.provenance.patron, ...C.provenance.advisors].map((p) => `
    <div class="gov">
      ${p.img ? `<img class="gov__face" src="${esc(p.img)}" alt="${esc(p.name)}"
                      width="446" height="520" loading="lazy" decoding="async">` : ''}
      <span class="gov__body">
        <span class="hud text-lumen block">${esc(p.role)}</span>
        <span class="font-display text-[clamp(1.25rem,1.9vw,1.6rem)] leading-[1.12] text-chalk block mt-2">${esc(p.name)}</span>
      </span>
    </div>`).join('');

  $('#teamList').innerHTML = C.provenance.team.map((t) => `
    <li>
      ${t.img ? `<img class="face" src="${esc(t.img)}" alt="${esc(t.name)}"
                     width="446" height="520" loading="lazy" decoding="async">` : ''}
      <p class="text-sm text-chalk mt-3 leading-[1.25]">${esc(t.name)}</p>
      <p class="hud text-mute mt-1">${esc(t.role)}</p>
    </li>`).join('');

  // collaborators — one flat grid, logo leading
  $('#collabGrid').innerHTML = C.collaborators.items.map((o) => `
    <li class="collab" data-slot="logo: ${esc(o.n)}">
      <span class="collab__plate">${o.logo
        ? `<img src="${esc(o.logo)}" alt="${esc(o.n)} logo" loading="lazy" decoding="async">`
        : `<span class="collab__mono">${esc(initials(o.n))}</span>`}</span>
      <span class="collab__name">${esc(o.n)}</span>
      ${o.d ? `<span class="collab__desc">${esc(o.d)}</span>` : ''}
    </li>`).join('');

  // impact — the company's own narratives
  $('#storyGrid').innerHTML = C.stories.items.map((st) => `
    <article class="story">
      <div class="flex items-center justify-between gap-3">
        <span class="hud text-probe">${esc(st.place)}</span>
        <span class="hud text-lumen border border-line px-2 py-0.5">${esc(st.cond)}</span>
      </div>
      <h3 class="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.1] text-chalk mt-5">${esc(st.t)}</h3>
      <p class="text-sm text-mute mt-3">${esc(st.d)}</p>
    </article>`).join('');

  $('#stateList').innerHTML = C.reach.states.map((n) =>
    `<li class="hud text-chalk border border-line px-3 py-1.5">${esc(n)}</li>`).join('');

  // reach
  $('#reachGrid').innerHTML = C.reach.stats.map((s) => `
    <div class="bg-void p-6">
      <p class="figure-num text-lumen text-[clamp(2rem,5vw,3.25rem)] leading-none">${esc(s.v)}</p>
      <p class="hud text-mute mt-3">${esc(s.k)}</p>
    </div>`).join('');

  // contact form
  $('#formFields').innerHTML = C.contact.fields.map((f) => {
    const control = f.t === 'select'
      ? `<select id="f-${f.n}" name="${f.n}">${C.menu.items
          .map((a) => `<option>${esc(a.name)}</option>`).join('')}<option>Not sure yet</option></select>`
      : `<input id="f-${f.n}" name="${f.n}" type="${f.t}" ${f.req ? 'required' : ''} autocomplete="on">`;
    return `<div class="field ${f.n === 'org' || f.n === 'panel' ? 'sm:col-span-2' : ''}">
        <label class="hud block mb-1" for="f-${f.n}">${esc(f.l)}${f.req ? ' *' : ''}</label>
        ${control}
      </div>`;
  }).join('');

  $('#kitForm').addEventListener('submit', (e) => {
    e.preventDefault();
    $('#formNote').textContent = C.contact.endpoint
      ? 'Sending…'
      : 'Form is inert by design — SLOT-19 still needs an endpoint.';
    $('#formNote').style.color = 'var(--color-deep)';
  });

  /* ---------- 3 · build the 3D geometry ------------------------------ */

  // specimen field behind the hero drop
  const field = $('#speckField');
  const SPECKS = window.innerWidth < 700 ? 60 : 140;
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647; // deterministic
  for (let i = 0; i < SPECKS; i++) {
    const z = -1500 + rnd() * 1450;
    const sp = el('span', 'speck');
    const size = 1 + rnd() * 2.6;
    sp.style.cssText =
      `left:${(rnd() * 118 - 9).toFixed(2)}%;top:${(rnd() * 118 - 9).toFixed(2)}%;` +
      `width:${size}px;height:${size}px;transform:translateZ(${z.toFixed(0)}px);` +
      `opacity:${(0.14 + (1 + z / 1500) * 0.5).toFixed(2)};` +
      `background:${rnd() > 0.78 ? 'var(--color-probe)' : 'var(--color-lumen)'}`;
    field.appendChild(sp);
  }

  // laminate the card so its edge has depth when it turns
  const cardEl = $('#dbsCard'), PLIES = 4;
  for (let i = 0; i < PLIES; i++) {
    const ply = el('span', 'dbs__ply');
    const t = (i + 1) / (PLIES + 1);                       // 0 → 1 through the stock
    ply.style.transform = `translateZ(calc(var(--dbs-t) * ${(0.5 - t).toFixed(3)}))`;
    cardEl.insertBefore(ply, cardEl.querySelector('.dbs__body'));
  }

  /* The assay plate — the object the whole business runs on.
     8 × 12 wells on one tilted plane. Most carry a sample; one came back
     positive and is lit, with a drop hanging over it. Planes foreshorten
     correctly in CSS 3D, so the tilt reads as real depth. */
  const grid = $('#plateGrid');
  const PLATE_PLIES = 3, ROWS = 8, COLS = 12;
  const INDEX_R = 2, INDEX_C = 5;              // the lit well — C6, near centre

  // laminate the stock so the plate has an edge when it turns nearly side-on
  const deck = $('#plateDeck');
  for (let i = 1; i <= PLATE_PLIES; i++) {
    const ply = el('div', 'plate__ply');
    ply.style.transform = `translateZ(calc(var(--plate-t) * ${(-i / PLATE_PLIES).toFixed(3)}))`;
    deck.insertBefore(ply, deck.firstChild);
  }

  $('#plateCols').innerHTML =
    Array.from({ length: COLS }, (_, i) => `<span>${i + 1}</span>`).join('');
  $('#plateRows').innerHTML =
    Array.from({ length: ROWS }, (_, i) => `<span>${'ABCDEFGH'[i]}</span>`).join('');

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const isIndex = r === INDEX_R && c === INDEX_C;
      // a real run is never a full plate: the tail columns are still empty
      const loaded = isIndex || rnd() > 0.16 + (c / COLS) * 0.5;
      const w = el('div', 'well' + (isIndex ? ' is-index' : loaded ? ' is-loaded' : ''));
      w.style.setProperty('--f', rnd().toFixed(2));   // per-well fill variation
      w.innerHTML = '<span class="well__ring"><span class="well__bore"></span></span>';
      if (isIndex) {
        w.insertAdjacentHTML('afterbegin', '<span class="well__pool"></span>');
        w.insertAdjacentHTML('beforeend',
          '<span class="well__beam"></span>' +
          '<div class="drop-rig"><div class="drop" id="heroDrop">' +
            '<span class="drop__halo"></span>' +
            '<span class="drop__form"><span class="drop__lit"></span></span>' +
            '<span class="drop__spec"></span>' +
          '</div></div>');
      }
      grid.appendChild(w);
    }
  }

  // the double helix — 46 base pairs, one of them the variant
  const helix = $('#helix');
  const RUNGS = 42, STEP = 12.5, TWIST = 17, VARIANT = 25;
  for (let i = 0; i < RUNGS; i++) {
    const r = el('div', 'rung' + (i === VARIANT ? ' is-variant' : ''));
    r.style.top = (i * STEP - (RUNGS * STEP) / 2) + 'px';
    r.style.transform = `rotateY(${i * TWIST}deg)`;
    r.appendChild(el('div', 'rung__bar'));
    r.appendChild(el('div', 'rung__node rung__node--a'));
    r.appendChild(el('div', 'rung__node rung__node--b'));
    helix.appendChild(r);
  }

  /* ---------- 4 · handoff aid: press S to reveal data slots ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 's' || e.key === 'S') {
      const t = e.target.tagName;
      if (t === 'INPUT' || t === 'SELECT' || t === 'TEXTAREA') return;
      document.body.classList.toggle('show-slots');
    }
  });

  /* ---------- 5 · scroll orchestration ------------------------------- */
  const root = document.documentElement;
  const railFill = $('#railFill'), scaleRead = $('#scaleRead'), pctRead = $('#pctRead');

  // The descent, then the ascent: patient → base pair → population → patient.
  const SCALES = [
    ['hero', '10⁰ m'], ['specimen', '10⁻³ m'], ['assay', '10⁻⁹ m'],
    ['menu', '10⁻⁶ m'], ['performance', '10⁻³ m'], ['workflow', '10⁰ m'],
    ['capabilities', '10⁰ m'], ['provenance', '10⁰ m'], ['collaborators', '10³ m'],
    ['stories', '10⁴ m'], ['reach', '10⁵ m'], ['contact', '10⁰ m']
  ];

  if (REDUCED) {
    // Collapse every scrub scene to a static, fully readable end-state.
    // Layout is handled by `body.no-motion` in CSS; only the values that
    // a tween would otherwise have produced are set here.
    document.body.classList.add('no-motion');   // holds --lumen-level at 0.45 in CSS
    $('#runCounter').textContent = C.validation.runValue;
    scaleRead.textContent = '10⁰ m';
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ---- global: illumination, depth rail, scale readout
  ScrollTrigger.create({
    trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true,
    onUpdate(self) {
      const p = self.progress;
      root.style.setProperty('--lumen-level', (0.06 + Math.pow(p, 1.35) * 0.94).toFixed(3));
      railFill.style.height = (p * 100).toFixed(1) + '%';
      pctRead.textContent = String(Math.round(p * 100)).padStart(2, '0') + '%';
    }
  });

  SCALES.forEach(([id, label]) => {
    ScrollTrigger.create({
      trigger: '#' + id, start: 'top center', end: 'bottom center',
      onToggle(self) { if (self.isActive) scaleRead.textContent = label; }
    });
  });

  const nav = $('.nav');
  ScrollTrigger.create({ start: 40, end: 'max',
    onToggle: (s) => nav.classList.toggle('is-stuck', s.isActive) });
  ScrollTrigger.create({ trigger: '#contact', start: 'top 60%', end: 'bottom top',
    onToggle: (s) => document.body.classList.toggle('is-lit', s.isActive) });

  const scrub = (trigger, extra) => Object.assign({
    trigger, start: 'top top', end: 'bottom bottom', scrub: 0.6
  }, extra || {});

  // ---- 1 · hero: the depth field dollies past; the type stays flat and crisp.
  // Only #heroDepth enters Z — putting type in perspective scales and crops it.
  // The plate opens from raking to near-flat, the drop walks down to the lit
  // well, and only then does the well ignite — cause before effect.
  gsap.timeline({ scrollTrigger: scrub('#hero') })
    .fromTo('#heroDepth', { z: 0 }, { z: 340, ease: 'none', duration: 1 }, 0)
    .fromTo('#plate',
      { '--plate-tilt': 62, '--plate-spin': -9, y: '4%', scale: 0.92 },
      { '--plate-tilt': 36, '--plate-spin': -2.5, y: '-4%', scale: 1.14,
        ease: 'none', duration: 1 }, 0)
    .fromTo('#plate', { '--fall': 0 },
      { '--fall': 1, ease: 'none', duration: 0.55 }, 0)
    // never fully dark: the lit well IS the hero image, so it is already
    // burning at rest and only blooms as the drop lands
    .fromTo('#plate', { '--ignite': 0.42 },
      { '--ignite': 1, ease: 'none', duration: 0.34 }, 0.4)
    .to('#heroType', { y: -90, opacity: 0, ease: 'none', duration: 0.38 }, 0.56);

  // ---- 2 · the specimen card turns to face you
  gsap.timeline({ scrollTrigger: scrub('#specimen') })
    .fromTo('#dbsCard',
      { rotateY: -62, rotateX: 26, z: -420, scale: 0.92 },
      { rotateY: 16, rotateX: -7, z: 130, scale: 1, ease: 'none', duration: 1 }, 0)
    .fromTo('#dbsFlap', { rotateX: 0, z: 4 },
      { rotateX: -132, z: 4, ease: 'none', duration: 0.55 }, 0.30)
    .fromTo('#specimen .scene-layer > div > div',
      { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', duration: 0.28 }, 0.05);

  // ---- 3 · the helix turns; the variant flares as it comes round
  gsap.timeline({ scrollTrigger: scrub('#assay') })
    .fromTo('#helix',
      { rotateY: -30, rotateX: 12, z: -560, y: 120 },
      { rotateY: 430, rotateX: -4, z: 170, y: -100, ease: 'none', duration: 1 }, 0)
    .fromTo('#variantCallout', { opacity: 0, x: -18 },
      { opacity: 1, x: 0, ease: 'none', duration: 0.14 }, 0.46);

  // ---- 4 · catalogue cards tilt up into place
  gsap.utils.toArray('.assay-card').forEach((card, i) => {
    gsap.fromTo(card,
      { rotateX: -22, y: 46, opacity: 0, transformOrigin: '50% 100%' },
      { rotateX: 0, y: 0, opacity: 1, duration: 0.7, delay: (i % 3) * 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
  });

  // ---- 5 · the running total counts up once
  const runTarget = Number(String(C.validation.runValue).replace(/[^\d]/g, '')) || 0;
  const counter = { v: 0 };
  gsap.to(counter, {
    v: runTarget, duration: 2.2, ease: 'power2.out',
    scrollTrigger: { trigger: '#performance', start: 'top 70%', once: true },
    onUpdate() { $('#runCounter').textContent = Math.round(counter.v).toLocaleString('en-IN'); }
  });

  // ---- 6 · workflow rides sideways on a 3D track
  const track = $('#workflowTrack');
  const trackShift = () => Math.max(0, track.scrollWidth - window.innerWidth + 40);
  const lane = $('.wf-lane');
  gsap.timeline({ scrollTrigger: scrub('#workflow', {
      invalidateOnRefresh: true,
      onUpdate: (self) => lane.style.setProperty('--wf-progress', self.progress.toFixed(3))
    }) })
    .fromTo(track, { x: 0 }, { x: () => -trackShift(), ease: 'none', duration: 1 }, 0);
  gsap.utils.toArray('.wf-step').forEach((s, i) => {
    gsap.fromTo(s, { rotateY: 26, z: -160 }, {
      rotateY: -12, z: 0, ease: 'none',
      scrollTrigger: { trigger: '#workflow', start: 'top top', end: 'bottom bottom', scrub: 0.6 }
    });
  });

  // Lazy images finish loading AFTER window.load, each one changing document
  // height. Without this, every pinned scene keeps stale start/end positions
  // and the whole scroll choreography drifts.
  let refreshPending;
  const refreshSoon = () => {
    clearTimeout(refreshPending);
    refreshPending = setTimeout(() => ScrollTrigger.refresh(), 120);
  };
  window.addEventListener('load', refreshSoon);
  document.querySelectorAll('img').forEach((img) => {
    if (img.complete) return;
    img.addEventListener('load', refreshSoon, { once: true });
    img.addEventListener('error', refreshSoon, { once: true });
  });
})();
