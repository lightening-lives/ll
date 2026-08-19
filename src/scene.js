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
  // Flagged BEFORE anything renders. Set later (in the scroll section) it would
  // land after the reveal transitions had already been started from opacity 0,
  // so the static fallback briefly animated the very thing it exists to avoid.
  if (REDUCED) document.body.classList.add('no-motion');
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
      <p class="datakey text-mute">${esc(s.k)}</p>
      <p class="figure-num text-chalk text-[1.6rem] mt-1.5 leading-none">${esc(s.v)}<span
         class="figure-unit text-lumen ml-1 align-baseline">${esc(s.u)}</span></p>
    </div>`).join('');

  // Specimen claims. "No venipuncture" is a STATEMENT, not a machine label, so
  // it is set in the sans voice (`.claim`) rather than the mono HUD. DESIGN.md
  // reserves IBM Plex Mono for data: IDs, specs, table heads, eyebrows.
  $('#specimenPoints').innerHTML = C.specimen.points.map((p) => `
    <div class="bg-void p-5">
      <dt class="claim text-chalk">${esc(p.t)}</dt>
      <dd class="text-sm text-mute mt-2">${esc(p.d)}</dd>
    </div>`).join('');

  // assay pipeline
  $('#assayStack').innerHTML = C.assay.stack.map((s) => `
    <li class="flex gap-4 py-3 border-b border-line">
      <span class="code text-probe pt-0.5 shrink-0">${esc(s.step)}</span>
      <span><span class="text-chalk text-sm">${esc(s.t)}</span>
        <span class="text-mute text-sm"> — ${esc(s.d)}</span></span>
    </li>`).join('');

  // the catalogue — the section a lab director screenshots
  $('#assayGrid').innerHTML = C.menu.items.map((a) => `
    <article class="assay-card p-6 flex flex-col">
      <div class="flex items-start justify-between gap-3">
        <span class="code text-lumen">${esc(a.code)}</span>
        ${a.flag ? `<span class="credential text-probe border border-probe/40 px-2.5 py-1">${esc(a.flag)}</span>` : ''}
      </div>
      <h3 class="font-display text-[1.6rem] leading-[1.05] text-chalk mt-4">${esc(a.name)}</h3>
      <p class="text-sm text-mute mt-2 flex-1">${esc(a.indication)}</p>
      <dl class="mt-6 grid grid-cols-2 gap-y-3 gap-x-4 rule-t pt-4">
        <div><dt class="datakey text-mute">Sample</dt><dd class="text-sm text-chalk mt-1">${esc(a.sample)}</dd></div>
        <div><dt class="datakey text-mute">Turnaround</dt><dd class="${/^[\d.]/.test(a.tat) ? 'figure-num' : 'credential'} text-lumen text-sm mt-1">${esc(a.tat)}</dd></div>
        <div><dt class="datakey text-mute">Method</dt><dd class="text-sm text-chalk mt-1 min-h-[2.6em]">${esc(a.method)}</dd></div>
        <div><dt class="datakey text-mute">Throughput</dt><dd class="figure-num text-chalk text-sm mt-1">${esc(a.throughput)}</dd></div>
      </dl>
    </article>`).join('');

  // performance figures — always with their denominator
  $('#statGrid').innerHTML = C.validation.stats.map((s) => `
    <div class="bg-void p-6">
      <p class="figure-num text-probe text-[clamp(2rem,4.5vw,3rem)] leading-none">${esc(s.v)}<span
         class="figure-unit text-mute ml-1">${esc(s.u)}</span></p>
      <p class="datakey text-chalk mt-3">${esc(s.k)}</p>
      <p class="meta text-mute mt-1.5">${esc(s.d)}</p>
    </div>`).join('');

  $('#accreditations').innerHTML = C.validation.accreditations.map((a) =>
    `<span class="chip credential text-mute">${esc(a)}</span>`).join('');

  // workflow track
  $('#workflowTrack').innerHTML = C.workflow.steps.map((s) => `
    <article class="wf-step shrink-0 w-[78vw] sm:w-[42vw] lg:w-[26vw] min-h-[15.5rem]
                    flex flex-col bg-ink border border-line p-7">
      <div class="flex items-baseline justify-between">
        <span class="figure-num text-lumen text-[2.5rem] leading-none">${esc(s.n)}</span>
        <span class="code text-probe">${esc(s.time)}</span>
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
    `<li class="chip credential text-lumen">${esc(c)}</li>`).join('');

  $('#governance').innerHTML = [C.provenance.patron, ...C.provenance.advisors].map((p) => `
    <div class="gov">
      ${p.img ? `<img class="gov__face" src="${esc(p.img)}" alt="${esc(p.name)}"
                      width="446" height="520" loading="lazy" decoding="async">` : ''}
      <span class="gov__body">
        <span class="role text-probe block">${esc(p.role)}</span>
        <span class="font-display text-[clamp(1.25rem,1.9vw,1.6rem)] leading-[1.12] text-chalk block mt-2">${esc(p.name)}</span>
      </span>
    </div>`).join('');

  /* --- core team, with an expanding record row -----------------------
     Each face is a real <button>. Selecting one opens a full-width panel
     directly beneath ITS OWN ROW of the grid, so nothing is covered, the
     neighbours do not move sideways, and on a narrow screen the same code
     degrades to a plain accordion. Bios are verbatim from the company's
     own -details.php pages.
     ------------------------------------------------------------------ */
  const teamList = $('#teamList');

  teamList.innerHTML = C.provenance.team.map((t, i) => `
    <li class="team-cell">
      <button type="button" class="team-btn" data-i="${i}"
              aria-expanded="false" aria-controls="teamBio"
              aria-label="More details about ${esc(t.name)}, ${esc(t.role)}">
        ${t.img ? `<img class="face" src="${esc(t.img)}" alt=""
                       width="446" height="520" loading="lazy" decoding="async">` : ''}
        <span class="team-name">${esc(t.name)}</span>
        <span class="team-role">${esc(t.role)}</span>
        <span class="team-cue hud" aria-hidden="true">
          <span class="team-cue__x"></span>More details</span>
      </button>
    </li>`).join('');

  const bioPanel = el('li', 'team-bio');
  bioPanel.id = 'teamBio';
  bioPanel.hidden = true;
  bioPanel.setAttribute('role', 'region');
  bioPanel.setAttribute('tabindex', '-1');
  bioPanel.innerHTML = '<div class="team-bio__clip"><div class="team-bio__inner"></div></div>';

  const bioClip = bioPanel.firstElementChild;
  // six buttons referenced #teamBio, but the panel was only inserted on the
  // first click — an invalid IDREF for the whole pre-interaction life of the page
  teamList.appendChild(bioPanel);

  let openTeam = -1;

  // the resolved column count, straight from the grid itself — no breakpoint
  // list to keep in sync with the CSS
  const teamCols = () =>
    getComputedStyle(teamList).gridTemplateColumns.split(' ').filter(Boolean).length || 1;

  const teamBtns  = () => $$('.team-btn', teamList);
  const teamCells = () => $$('.team-cell', teamList);

  // Height is animated against the MEASURED content rather than with the
  // 0fr → 1fr grid trick: this panel is itself a grid item of a nested grid,
  // where the fr resolves against zero free space and collapses to ~3px.
  const clipTo = (px) => { bioClip.style.height = px; };

  function markButtons(i) {
    teamBtns().forEach((b, j) => {
      b.setAttribute('aria-expanded', String(j === i));
      b.closest('.team-cell').classList.toggle('is-open', j === i);
    });
  }

  // slot the panel in at the END OF THAT PERSON'S ROW, so the record opens
  // underneath the face rather than shunting the neighbours sideways
  function slotPanel(i) {
    const cells = teamCells();
    const rowEnd = (Math.floor(i / teamCols()) + 1) * teamCols();
    teamList.insertBefore(bioPanel, cells[rowEnd] || null);
  }

  /* Bring the opened record into view — but only if it is not already there.
     The panel opens BELOW the row that was clicked, so on a face near the
     foot of the window the record expands straight off the bottom. Scrolls
     by the minimum needed, and never pushes the top of the record under the
     fixed bar: if the record is taller than the window, its beginning wins. */
  function keepRecordInView(targetH) {
    const navH = $('.nav').offsetHeight;
    const pad = 20;
    const top = bioPanel.getBoundingClientRect().top;
    const bottom = top + targetH;
    const roomTop = top - (navH + pad);              // how far we may scroll down
    let delta = 0;
    if (bottom > window.innerHeight - pad) delta = Math.min(bottom - (window.innerHeight - pad), roomTop);
    else if (roomTop < 0)                  delta = roomTop;
    if (Math.abs(delta) < 3) return;                 // already comfortably in view
    window.scrollBy({ top: delta, behavior: REDUCED ? 'instant' : 'smooth' });
  }

  function closeTeam(focusBack) {
    if (openTeam < 0) return;
    const btn = teamBtns()[openTeam];
    if (btn && focusBack) btn.focus();
    openTeam = -1;
    markButtons(-1);
    bioPanel.classList.remove('is-open');

    if (REDUCED) { clipTo('0px'); bioPanel.hidden = true; return; }
    clipTo(bioClip.scrollHeight + 'px');       // pin the current height first
    void bioClip.offsetHeight;
    clipTo('0px');
    const done = (e) => {
      if (e.propertyName !== 'height') return;
      bioClip.removeEventListener('transitionend', done);
      if (openTeam < 0) bioPanel.hidden = true;
    };
    bioClip.addEventListener('transitionend', done);
  }

  function openTeamAt(i) {
    const t = C.provenance.team[i];
    if (!t) return;
    const swapping = openTeam > -1;

    bioPanel.querySelector('.team-bio__inner').innerHTML = `
      <div class="team-bio__grid">
        ${t.img ? `<img class="team-bio__face" src="${esc(t.img)}" alt="${esc(t.name)}"
                        width="446" height="520" decoding="async">` : ''}
        <div class="team-bio__body">
          <p class="role text-probe">${esc(t.role)}</p>
          <h4 class="team-bio__name">${esc(t.name)}</h4>
          <p class="team-bio__text">${esc(t.bio)}</p>
        </div>
        <button type="button" class="team-bio__close" aria-label="Close record">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;

    bioPanel.setAttribute('aria-label', t.name + ' — record');
    bioPanel.hidden = false;
    if (!swapping) clipTo('0px');
    slotPanel(i);
    markButtons(i);
    openTeam = i;

    if (REDUCED) {
      bioPanel.classList.add('is-open');
      clipTo('auto');
      // still has to be brought into view — the record opens below the row,
      // so a face near the foot of the window expands straight off-screen
      keepRecordInView(bioClip.getBoundingClientRect().height);
      return;
    }

    // Pin the current height as an explicit px, force the reflow, then set the
    // target. Deliberately NOT deferred to requestAnimationFrame: rAF is paused
    // in a background tab, which would leave the record stuck shut.
    clipTo(bioClip.getBoundingClientRect().height + 'px');
    void bioClip.offsetHeight;
    bioPanel.classList.add('is-open');
    const targetH = bioClip.scrollHeight;
    clipTo(targetH + 'px');
    keepRecordInView(targetH);

    const done = (e) => {
      if (e.propertyName !== 'height') return;
      bioClip.removeEventListener('transitionend', done);
      // release to auto so a resize or a font swap cannot clip the record
      if (openTeam > -1) clipTo('auto');
    };
    bioClip.addEventListener('transitionend', done);
  }

  teamList.addEventListener('click', (e) => {
    const close = e.target.closest('.team-bio__close');
    if (close) { closeTeam(true); return; }
    const btn = e.target.closest('.team-btn');
    if (!btn) return;
    const i = Number(btn.dataset.i);
    if (i === openTeam) closeTeam(true); else openTeamAt(i);
  });

  teamList.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openTeam > -1) { e.stopPropagation(); closeTeam(true); }
  });

  // the column count changes at every breakpoint, so an open panel has to be
  // re-slotted or it ends up stranded mid-row
  let teamResize;
  window.addEventListener('resize', () => {
    if (openTeam < 0) return;
    clearTimeout(teamResize);
    teamResize = setTimeout(() => slotPanel(openTeam), 140);
  });

  /* --- the collaborator wall ------------------------------------------
     Thirteen identical cards letterboxed every mark into the same box, so a
     6.5:1 wordmark (Tata Trusts) rendered at a fraction of the height of a
     square emblem — the exact "grey smudge" failure DESIGN.md set out to fix.
     Each cell now spans according to its logo's MEASURED aspect ratio, so
     every mark is reproduced at its own proportion. The column counts (2/4/8)
     are chosen so the 16 spanned units fill each breakpoint exactly.
     ------------------------------------------------------------------- */
  /* Equal AREA, not equal height: w = u·√ar, h = u/√ar. Every mark therefore
     occupies the same amount of ink at its own true proportion — the Tata
     Trusts wordmark comes out near its native 285×44 and CCMB near its native
     117×143, with no letterboxing anywhere. A ruled grid could not do this;
     it is also what stops the section reading as one bright slab. */
  /* Tailwind's logo-cloud caps every mark to one height, which works there
     because their logos are all pre-normalised to 158×48. Ours run 0.75:1 to
     9.2:1, so a single cap renders the tall emblems (CCMB, Blood Warriors)
     tiny while the wordmarks fill their cells. The cap scales with the mark's
     own aspect instead, which balances them optically inside a uniform grid. */
  $('#collabGrid').innerHTML = C.collaborators.items.map((o) => {
    const ar = o.ar || 1;
    const cap = ar >= 3.5 ? '2.2rem' : ar >= 2 ? '2.7rem' : ar >= 1.2 ? '3.4rem' : '4.3rem';
    return `
    <li class="cloud__cell" style="--cap:${cap}" data-slot="logo: ${esc(o.n)}">
      <img src="${esc(o.logo)}" alt="${esc(o.n)}${o.d ? ' — ' + esc(o.d) : ''}"
           loading="lazy" decoding="async">
    </li>`;
  }).join('');

  // Impact — given testimonial weight. The `pull` line is the outcome sentence
  // lifted verbatim from the company's own case note and set large; the setup
  // follows underneath. Nothing is presented as a patient's own speech.
  // The first card leads full-width, the remaining three sit in a row.
  $('#storyGrid').innerHTML = C.stories.items.map((st, i) => `
    <article class="story${i === 0 ? ' story--lead md:col-span-3' : ''}">
      <p class="story__pull">${esc(st.pull)}</p>
      <div class="story__note">
        <h3 class="story__t">${esc(st.t)}</h3>
        <p class="story__d">${esc(st.d)}</p>
      </div>
      <footer class="story__foot">
        <span class="meta text-mute">Case note · ${esc(st.place)}</span>
        <span class="code text-lumen border border-line px-2.5 py-1">${esc(st.cond)}</span>
      </footer>
    </article>`).join('');

  $('#stateList').innerHTML = C.reach.states.map((n) =>
    `<li class="chip credential text-chalk">${esc(n)}</li>`).join('');

  // reach
  $('#reachGrid').innerHTML = C.reach.stats.map((s) => `
    <div class="bg-void p-6">
      <p class="figure-num text-lumen text-[clamp(2rem,5vw,3.25rem)] leading-none">${esc(s.v)}</p>
      <p class="datakey text-mute mt-3">${esc(s.k)}</p>
    </div>`).join('');

  // contact form
  $('#formFields').innerHTML = C.contact.fields.map((f) => {
    const control = f.t === 'select'
      ? `<select id="f-${f.n}" name="${f.n}">${C.menu.items
          .map((a) => `<option>${esc(a.name)}</option>`).join('')}<option>Not sure yet</option></select>`
      : `<input id="f-${f.n}" name="${f.n}" type="${f.t}" ${f.req ? 'required' : ''} autocomplete="on">`;
    return `<div class="field ${f.n === 'org' || f.n === 'panel' ? 'sm:col-span-2' : ''}">
        <label class="field__label block mb-1.5" for="f-${f.n}">${esc(f.l)}${f.req ? ' *' : ''}</label>
        ${control}
      </div>`;
  }).join('');

  $('#kitForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // 🟠 SLOT-19 still needs an endpoint. The visitor is told what to do next
    // rather than being shown the build's own to-do list.
    $('#formNote').textContent = C.contact.endpoint
      ? 'Sending…'
      : 'This form is not connected yet — please email ' + C.brand.email + ' and we will reply the same day.';
    $('#formNote').style.color = 'var(--color-deep)';
  });

  /* --- the inheritance machine (interactive) --------------------------
     Direction 15 of the design catalogue, rebuilt in this page's own
     vocabulary: the four possible children are WELLS on a plate, which is
     the hero object of the whole site. Colour is never the only channel —
     each outcome also carries its genotype and a written label, and the
     rings differ in kind (dashed / half / solid), not just in hue.
     ------------------------------------------------------------------- */
  const INH = C.inheritance;
  const ALLELES = { AA: ['A', 'A'], AS: ['A', 'S'], SS: ['S', 'S'] };
  const GENO_TEXT = { AA: 'A/A', AS: 'A/S', SS: 'S/S' };
  const parents = ['AS', 'AS'];                     // two carriers, the case that matters

  $('#inhControls').innerHTML = INH.parentLabels.map((lab, p) => `
    <fieldset class="inh-set">
      <legend class="hud text-mute">${esc(lab)}</legend>
      <div class="inh-opts" role="group" aria-label="${esc(lab)} genotype">
        ${INH.options.map((o) => `
          <button type="button" class="inh-opt" data-p="${p}" data-g="${o.g}"
                  aria-pressed="${String(o.g === parents[p])}">${esc(o.label)}</button>`).join('')}
      </div>
    </fieldset>`).join('');

  const inhCta = $('#inhCta');
  inhCta.textContent = INH.cta.label;
  inhCta.href = INH.cta.href;

  $('#inhOdds').innerHTML = ['AA', 'AS', 'SS'].map((k) => `
    <div class="inh-odd bg-void p-5" data-g="${k}">
      <dt class="credential text-mute">${esc(INH.outcomeLabels[k])}</dt>
      <dd class="inh-odd__v figure-num" id="inhPc-${k}">—</dd>
    </div>`).join('');

  const inhKids = $('#inhChildren');
  const inhHead = $('#inhHeadline'), inhBody = $('#inhBody');

  function inhUpdate() {
    const a = ALLELES[parents[0]], b = ALLELES[parents[1]];
    const kids = [], count = { AA: 0, AS: 0, SS: 0 };
    a.forEach((x) => b.forEach((y) => {
      const g = (x === 'S' && y === 'S') ? 'SS' : (x === 'A' && y === 'A') ? 'AA' : 'AS';
      kids.push(g); count[g]++;
    }));

    inhKids.innerHTML = kids.map((g, i) => `
      <li class="inh-child" data-g="${g}" style="--i:${i}">
        <span class="inh-well" aria-hidden="true"><span class="inh-well__bore"></span></span>
        <span class="inh-child__geno figure-num">${GENO_TEXT[g]}</span>
        <span class="inh-child__label">${esc(INH.outcomeLabels[g])}</span>
      </li>`).join('');

    inhKids.classList.remove('is-in');
    void inhKids.offsetHeight;                    // commit the from-state
    inhKids.classList.add('is-in');

    ['AA', 'AS', 'SS'].forEach((k) => {
      $('#inhPc-' + k).textContent = (count[k] / 4 * 100) + '%';
    });

    const R = INH.readouts;
    if (count.SS === 0 && count.AS === 0)      { inhHead.textContent = R.none.h;         inhBody.textContent = R.none.b; }
    else if (count.SS === 0)                   { inhHead.textContent = R.carriersOnly.h; inhBody.textContent = R.carriersOnly.b; }
    else if (count.SS === 4)                   { inhHead.textContent = R.all.h;          inhBody.textContent = R.all.b; }
    else {
      inhHead.textContent = (count.SS / 4 * 100) + '% of children affected, ' +
                            (count.AS / 4 * 100) + '% carriers.';
      inhBody.textContent = R.mixed.b;
    }
  }

  $('#inhControls').addEventListener('click', (e) => {
    const btn = e.target.closest('.inh-opt');
    if (!btn) return;
    const p = Number(btn.dataset.p);
    parents[p] = btn.dataset.g;
    $$('.inh-opt[data-p="' + p + '"]').forEach((o) =>
      o.setAttribute('aria-pressed', String(o === btn)));
    inhUpdate();
  });

  inhUpdate();

  /* ---------- nav state ------------------------------------------------
     `is-stuck` (the bar's own scrim) and `is-lit` (the inverted palette over
     the closing paper section) used to be ScrollTriggers registered below the
     reduced-motion early return — so a visitor with "reduce motion" on kept
     the dark-ground palette over the bone contact section, where the wordmark
     measures about 1.1:1 and the links about 2:1. They are plain observers now,
     which also removes a GSAP dependency from something purely presentational.
     ------------------------------------------------------------------- */
  const navBar = $('.nav');
  const hasIO = 'IntersectionObserver' in window;

  // `is-stuck` rides a 40px sentinel at the top of the document rather than a
  // per-frame scroll listener
  if (hasIO) {
    const sentinel = el('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:40px;pointer-events:none';
    document.body.prepend(sentinel);
    new IntersectionObserver(
      ([e]) => navBar.classList.toggle('is-stuck', !e.isIntersecting),
      { threshold: 0 }
    ).observe(sentinel);
  } else {
    const onScrollNav = () => navBar.classList.toggle('is-stuck', window.scrollY > 40);
    onScrollNav();
    window.addEventListener('scroll', onScrollNav, { passive: true });
  }

  // `is-lit` flips the whole bar's palette once the paper section reaches it
  const litSection = $('#contact');
  if (litSection && hasIO) {
    new IntersectionObserver(
      ([e]) => document.body.classList.toggle('is-lit', e.isIntersecting),
      { rootMargin: '-35% 0px 0px 0px', threshold: 0 }
    ).observe(litSection);
  }

  /* ---------- the sheet, below 768 ------------------------------------
     The bar's link count used to step 7 → 6 → 4 → 0 across xl/lg/md/mobile,
     so a phone got a 16,000px document with no way through it but scrolling.
     Five links fit one row from 768px up; below that they open as a sheet.
     -------------------------------------------------------------------- */
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');

  const setNavOpen = (open) => {
    navBar.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () =>
      setNavOpen(!navBar.classList.contains('is-open')));

    // picking a section closes it — the jump itself is handled below
    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) setNavOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || !navBar.classList.contains('is-open')) return;
      setNavOpen(false);
      navToggle.focus();
    });

    document.addEventListener('click', (e) => {
      if (navBar.classList.contains('is-open') && !navBar.contains(e.target)) setNavOpen(false);
    });

    // rotating a phone past the breakpoint must not strand the open state
    const wide = window.matchMedia('(min-width: 52rem)');
    const onWide = (m) => { if (m.matches) setNavOpen(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else wide.addListener(onWide);                       // older WebKit
  }

  /* ---------- which section you are in ---------------------------------
     The HUD rail reports a percentage, which is a distance, not a place. The
     marker names the place. "Last section whose top has passed the reading
     line" rather than an intersection test, because the five nav targets do
     not tile the document — #provenance has to stay lit through the two
     sections that follow it, and a band observer would go dark there.
     -------------------------------------------------------------------- */
  const spy = [...(navLinks ? navLinks.querySelectorAll('a[href^="#"]') : [])]
    .map((a) => ({ a, el: document.getElementById(a.getAttribute('href').slice(1)) }))
    .filter((t) => t.el);

  if (spy.length) {
    let active = -1;
    const readSpy = () => {
      const line = navBar.offsetHeight + window.innerHeight * 0.28;
      let idx = -1;
      for (let i = 0; i < spy.length; i++) {
        if (spy[i].el.getBoundingClientRect().top > line) break;   // targets are in page order
        idx = i;
      }
      if (idx === active) return;
      active = idx;
      spy.forEach((t, i) => {
        if (i === idx) t.a.setAttribute('aria-current', 'location');
        else t.a.removeAttribute('aria-current');
      });
    };
    let queued = false;
    const onSpy = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; readSpy(); });
    };
    window.addEventListener('scroll', onSpy, { passive: true });
    window.addEventListener('resize', onSpy);
    readSpy();
  }

  /* ---------- in-page navigation --------------------------------------
     Anchor jumps were landing short or long. Two causes, both about the
     document changing height WHILE the smooth scroll is in flight:

       · webfonts swap in (Fraunces and Plex are display=swap), which
         re-flows every heading on the page, and
       · lazy images below the fold decode as you pass them.

     Either one moves the target after the browser has already committed to
     a destination. So the jump is computed against a MEASURED nav height
     rather than a hard-coded 7.5rem, and then re-verified once the scroll
     settles, correcting silently if the target has drifted.
     ------------------------------------------------------------------- */
  const navEl = $('.nav');
  const docEl = document.documentElement;

  const syncNavH = () => docEl.style.setProperty('--nav-h', navEl.offsetHeight + 'px');
  syncNavH();
  window.addEventListener('resize', syncNavH);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncNavH);

  // the gap left between the bar and whatever you jumped to
  const anchorGap = () => navEl.offsetHeight + 24;
  const maxScroll = () => Math.max(0, docEl.scrollHeight - window.innerHeight);
  const targetY = (el) =>
    Math.min(maxScroll(), Math.max(0,
      Math.round(el.getBoundingClientRect().top + window.scrollY - anchorGap())));

  // up to three instant nudges after the smooth scroll has stopped
  function settleOn(el) {
    let tries = 0;
    const check = () => {
      const drift = Math.round(el.getBoundingClientRect().top - anchorGap());
      // a target pinned against either end of the document can never reach
      // zero drift; retrying it just burns frames
      const clamped = (window.scrollY <= 0 && drift < 0) ||
                      (window.scrollY >= maxScroll() - 1 && drift > 0);
      if (Math.abs(drift) > 2 && !clamped && tries++ < 3) {
        window.scrollTo({ top: targetY(el), behavior: 'instant' });
        setTimeout(check, 80);
      }
    };
    setTimeout(check, 60);
  }

  function goToSection(el, smooth) {
    window.scrollTo({ top: targetY(el), behavior: smooth ? 'smooth' : 'instant' });
    if (!smooth) { settleOn(el); return; }
    let fired = false;
    const done = () => {
      if (fired) return;
      fired = true;
      window.removeEventListener('scrollend', done);
      clearTimeout(fallback);
      settleOn(el);
    };
    window.addEventListener('scrollend', done);          // Chrome/Firefox
    const fallback = setTimeout(done, 900);              // everywhere else
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.hasAttribute('download') || a.target === '_blank') return;
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const el = document.getElementById(id) || (id === 'top' ? $('#top') : null);
    if (!el) return;
    e.preventDefault();
    goToSection(el, !REDUCED);
    if (location.hash.slice(1) !== id) history.pushState(null, '', '#' + id);
  });

  // a URL that arrives WITH a hash gets the same treatment: the browser's own
  // jump happens before the fonts have swapped, so it is always short
  const initialHash = location.hash.slice(1);
  if (initialHash) {
    const el = document.getElementById(initialHash);
    if (el) {
      const reposition = () => goToSection(el, false);
      window.addEventListener('load', reposition);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(reposition);
      setTimeout(reposition, 300);
    }
  }
  window.addEventListener('hashchange', () => {
    const el = document.getElementById(location.hash.slice(1));
    if (el) goToSection(el, !REDUCED);
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

  /* --- the specimen card's print ------------------------------------
     The barcode on the old card was a repeating-linear-gradient: every bar
     the same width, which is the one thing a real barcode never is. This
     encodes the actual specimen ID as Code 128-B — start, data, modulo-103
     check digit, stop — so the bars are a genuine, scannable symbol.
     Pattern table is the standard one: each digit is an element width in
     modules, alternating bar/space, beginning on a bar.
     ------------------------------------------------------------------ */
  const CODE128 = (
    '212222 222122 222221 121223 121322 131222 122213 122312 132212 221213 ' +
    '221312 231212 112232 122132 122231 113222 123122 123221 223211 221132 ' +
    '221231 213212 223112 312131 311222 321122 321221 312212 322112 322211 ' +
    '212123 212321 232121 111323 131123 131321 112313 132113 132311 211313 ' +
    '231113 231311 112133 112331 132131 113123 113321 133121 313121 211331 ' +
    '231131 213113 213311 213131 311123 311321 331121 312113 312311 332111 ' +
    '314111 221411 431111 111224 111422 121124 121421 141122 141221 112214 ' +
    '112412 122114 122411 142112 142211 241211 221114 413111 241112 134111 ' +
    '111242 121142 121241 114212 124112 124211 411212 421112 421211 212141 ' +
    '214121 412121 111143 111341 131141 114113 114311 411113 411311 113141 ' +
    '114131 311141 411131 211412 211214 211232 2331112').split(' ');

  function code128b(text) {
    const vals = [104];                                  // Start B
    for (let i = 0; i < text.length; i++) {
      const v = text.charCodeAt(i) - 32;                 // Code B: ASCII 32–126
      vals.push(v >= 0 && v < 95 ? v : 0);
    }
    let sum = 104;
    for (let i = 1; i < vals.length; i++) sum += vals[i] * i;
    vals.push(sum % 103);                                // modulo-103 check
    vals.push(106);                                      // Stop
    return vals.map((v) => CODE128[v]).join('');
  }

  function barcodeSVG(text) {
    const pat = code128b(text);
    const QZ = 10, H = 100;                              // quiet zone, in modules
    let x = QZ, bar = true, rects = '';
    for (let i = 0; i < pat.length; i++) {
      const w = Number(pat[i]);
      if (bar) rects += '<rect x="' + x + '" y="0" width="' + w + '" height="' + H + '"/>';
      x += w; bar = !bar;
    }
    return '<svg viewBox="0 0 ' + (x + QZ) + ' ' + H + '" preserveAspectRatio="none" ' +
           'shape-rendering="crispEdges" aria-hidden="true">' +
           '<rect width="100%" height="100%" fill="#fff"/>' +
           '<g fill="#111">' + rects + '</g></svg>';
  }

  const KIT = C.specimen.card;
  $('#dbsCode').innerHTML = barcodeSVG(KIT.barcode);
  $('#dbsId').textContent = KIT.idPrefix + ' / ' + KIT.serial;

  // the regulatory block printed on the BACK of the real card. The symbols are
  // the ISO 15223-1 marks a diagnostic kit actually carries.
  const glyph = (d, extra) =>
    '<svg class="dbs__glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.7" aria-hidden="true">' + (extra || '') + d + '</svg>';

  $('#dbsReg').innerHTML =
    '<span class="dbs__reg-row"><span class="dbs__reg-key">REF</span>' +
      '<span class="dbs__reg-val">' + esc(KIT.ref) + '</span></span>' +
    '<span class="dbs__reg-row"><span class="dbs__reg-key">LOT</span>' +
      '<span class="dbs__reg-val">' + esc(KIT.lot) + '</span></span>' +
    '<span class="dbs__reg-row">' +
      glyph('<path d="M7 3h10M7 21h10M7 3v3l5 5 5-5V3M7 21v-3l5-5 5 5v3"/>') +
      '<span class="dbs__reg-val">' + esc(KIT.expiry) + '</span></span>' +
    '<span class="dbs__reg-marks">' +
      '<span class="dbs__ce">CE</span>' +
      '<span class="dbs__ivd">IVD</span>' +
      glyph('<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>' +
            '<text x="12" y="15" font-size="9" stroke="none" fill="currentColor" ' +
            'text-anchor="middle" font-family="monospace">2</text>') +
      glyph('<path d="M3 5h7a2 2 0 012 2v12a2 2 0 00-2-2H3zM21 5h-7a2 2 0 00-2 2v12a2 2 0 012-2h7z"/>') +
    '</span>';

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

  // deliberately near-illegible instrument texture (see DESIGN.md), so it is
  // hidden from assistive tech rather than exposed as 6.7px text at 1.8:1
  $('#plateCols').setAttribute('aria-hidden', 'true');
  $('#plateRows').setAttribute('aria-hidden', 'true');
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

  /* The variant ladder — 44 base pairs carrying seven marked loci.

     It used to flare exactly one rung, the sickle base, which sold the section
     short: one gene, one disorder, one company. Every locus in C.assay.loci is
     now drawn as a REAL structural difference in the helix — a substituted
     base, a run of hollow deleted ones, a segment whose twist runs backwards,
     a rung carried twice at depth — so the geometry teaches the four classes
     of change the panel actually reads. Colour only says which family it is.

     The twist is accumulated rather than computed as `i * TWIST`, because an
     inversion has to be able to wind the helix the other way for the length of
     the segment and then hand the ladder back the way it found it. */
  const helix = $('#helix');
  const RUNGS = 44, TWIST = 17;
  const LOCI = C.assay.loci;

  // rung index → { the locus that owns it, its position in the list, the
  // offset inside the locus } — so a locus of any span is one lookup
  const ownerOf = new Map();
  LOCI.forEach((L, li) => {
    for (let k = 0; k < L.span; k++) ownerOf.set(L.at + k, { L: L, li: li, k: k });
  });

  const locusRungs = LOCI.map(() => []);
  let twist = 0;
  for (let i = 0; i < RUNGS; i++) {
    const o = ownerOf.get(i);
    const r = el('div', 'rung' + (o ? ' is-locus is-' + o.L.kind : ''));
    // --rung-step is a clamp() on vmin, so the ladder fits a 280px phone band
    // and a 1080px desktop stage off one rule (see input.css)
    r.style.top = `calc(var(--rung-step) * ${(i - (RUNGS - 1) / 2).toFixed(1)})`;
    r.style.transform = `rotateY(${twist.toFixed(1)}deg)`;
    // the tag has to undo this rotation to stay facing the camera
    r.style.setProperty('--rot', twist.toFixed(1));
    if (o) r.dataset.fam = o.L.fam;
    r.appendChild(el('div', 'rung__bar'));
    r.appendChild(el('div', 'rung__node rung__node--a'));
    r.appendChild(el('div', 'rung__node rung__node--b'));

    if (o && o.L.kind === 'dup') {                 // the second copy, further back
      const ghost = el('div', 'rung__ghost');
      ghost.appendChild(el('div', 'rung__bar'));
      ghost.appendChild(el('div', 'rung__node rung__node--a'));
      ghost.appendChild(el('div', 'rung__node rung__node--b'));
      r.appendChild(ghost);
    }
    if (o && o.k === 0) {                          // label the head of the run
      const tag = el('div', 'locus__tag');
      tag.appendChild(el('span', 'locus__key', String(o.li + 1).padStart(2, '0')));
      tag.appendChild(document.createTextNode(o.L.gene));
      r.appendChild(tag);
    }
    if (o) locusRungs[o.li].push(r);

    // an inversion winds the other way for its whole span, then hands back
    twist += (o && o.L.kind === 'inv') ? -TWIST : TWIST;
    helix.appendChild(r);
  }

  /* The keyed index — and the instrument's control surface.

     A list that looks like a legend IS a legend until something tells you
     otherwise, so every row is a real <button>: pointer, keyboard and screen
     reader all drive the same state. Rendered twice — once for the right
     gutter at lg and up, once inline under the copy below that — but only ever
     ONE is in the accessibility tree, because the utility hiding the other
     uses `display: none`. Ids are prefixed per copy so the two renders cannot
     collide on `aria-controls`. */
  const IDX = C.assay.index;
  const idxRow = (pre) => (L, i) => `
    <li class="vidx__item" data-fam="${esc(L.fam)}" data-kind="${esc(L.kind)}">
      <button type="button" class="vidx__row" data-locus="${i}"
              id="${pre}-b${i}" aria-expanded="false" aria-controls="${pre}-d${i}">
        <span class="vidx__mark" aria-hidden="true"></span>
        <span class="vidx__text">
          <span class="vidx__gene code"><span
             class="vidx__key">${String(i + 1).padStart(2, '0')}</span>${esc(L.gene)}&nbsp;${esc(L.variant)}</span>
          <span class="vidx__cond">${esc(L.condition)}</span>
          <span class="vidx__class">${esc(C.assay.famLabels[L.fam])} · ${esc(C.assay.kindLabels[L.kind])}</span>
        </span>
        <span class="vidx__chev" aria-hidden="true"></span>
      </button>
      <div class="vidx__detail" id="${pre}-d${i}" role="region"
           aria-labelledby="${pre}-b${i}" hidden>
        <div class="vidx__detail-in">
          <p class="vidx__what">${esc(L.what)}</p>
          <a class="vidx__link hud" href="${esc(IDX.menuHref)}"><span
             class="code">${esc(L.menu)}</span> ${esc(IDX.menuLabel)}</a>
        </div>
      </div>
    </li>`;
  const idxHTML = (pre) =>
    `<p class="eyebrow text-probe">${esc(IDX.title)}</p>` +
    `<p class="vidx__hint meta">${esc(IDX.hint)}</p>` +
    `<ul class="vidx__list">${LOCI.map(idxRow(pre)).join('')}</ul>` +
    `<p class="vidx__note meta text-mute max-w-[46ch]">${esc(IDX.note)}</p>`;
  $('#variantIndex').innerHTML = idxHTML('vg');
  $('#variantIndexFlow').innerHTML = idxHTML('vf');

  /* ---------- the inspector -------------------------------------------
     Selecting a locus has to coexist with a scroll-scrubbed camera, and the
     usual way — disable the ScrollTrigger, take the element over, re-enable —
     hard-cuts on release, because the playhead never moved while it was off.

     So the two never touch the same value. The scroll timeline writes the
     CAMERA (`--cam-*`); the inspector writes an OFFSET on top of it
     (`--ins-*`); the transform in input.css is the sum. Both can run at once,
     release is just an ease of the offset back to zero, and nothing has to be
     disabled, reverted or re-synced.

     Two levels of selection:
       hover / focus  soft — the ladder dims to the one locus, nothing moves.
                      Cheap enough to fire on every mouse move, and it is what
                      tells you the list is a control at all.
       click / Enter  locked — the ladder swings that locus face-on and centres
                      it, and the row opens on what the change actually is.

     The swing is lg-and-up only. Below that the scene is not pinned, so the
     ladder is halfway up the document by the time you reach the list, and
     swinging something you cannot see is worse than not swinging it — there
     the row simply opens. Reduced motion gets the same treatment.
     -------------------------------------------------------------------- */
  const assayEl = $('#assay');
  const wide = window.matchMedia('(min-width: 64rem)');
  const rowsFor = (i) => $$('.vidx__row[data-locus="' + i + '"]');
  const INSPECT_Z = 150;
  let hovered = null, locked = null, lockedAt = 0;

  const camVar = (k) => parseFloat(getComputedStyle(helix).getPropertyValue(k)) || 0;

  const paint = () => {
    const on = locked != null ? locked : hovered;
    assayEl.classList.toggle('is-inspecting', on != null);
    locusRungs.forEach((rs, i) => rs.forEach((r) => r.classList.toggle('is-sel', i === on)));
    $$('.vidx__item').forEach((li) => {
      const i = +li.querySelector('.vidx__row').dataset.locus;
      li.classList.toggle('is-sel', i === on);
      li.classList.toggle('is-open', i === locked);
    });
  };

  const setDetail = (i, open) => {
    rowsFor(i).forEach((b) => {
      b.setAttribute('aria-expanded', String(open));
      const d = document.getElementById(b.getAttribute('aria-controls'));
      if (!d) return;
      gsap.killTweensOf(d);
      if (open) {
        d.hidden = false;
        gsap.fromTo(d, { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: REDUCED ? 0 : 0.34, ease: 'power2.out' });
      } else {
        gsap.to(d, { height: 0, opacity: 0, duration: REDUCED ? 0 : 0.24, ease: 'power2.in',
          onComplete() { d.hidden = true; gsap.set(d, { clearProps: 'height,opacity' }); } });
      }
    });
  };

  const swing = (i) => {
    if (REDUCED || !wide.matches) return;
    const L = LOCI[i];
    const rot = parseFloat(locusRungs[i][0].style.getPropertyValue('--rot')) || 0;
    // --rung-step is registered as a <length>, so it computes to real px here
    const step = parseFloat(getComputedStyle(helix).getPropertyValue('--rung-step')) || 10;
    // the locus is face-on when camera + rung twist lands on a whole turn; take
    // the nearest one, so the ladder never spins more than half a revolution
    const total = camVar('--cam-ry') + rot;
    gsap.to(helix, {
      '--ins-ry': Math.round(total / 360) * 360 - total,
      '--ins-rx': -camVar('--cam-rx'),
      '--ins-z':  INSPECT_Z - camVar('--cam-z'),
      // and slide it so the locus itself, not the middle of the ladder, is centred
      '--ins-y':  -camVar('--cam-y') - (L.at + (L.span - 1) / 2 - (RUNGS - 1) / 2) * step,
      duration: 0.85, ease: 'power3.inOut', overwrite: true
    });
  };

  const unswing = () => {
    if (REDUCED) return;
    gsap.to(helix, { '--ins-ry': 0, '--ins-rx': 0, '--ins-z': 0, '--ins-y': 0,
      duration: 0.55, ease: 'power2.inOut', overwrite: true });
  };

  const release = () => {
    if (locked == null) return;
    const i = locked;
    locked = null;
    setDetail(i, false);
    unswing();
    paint();
  };

  const lock = (i) => {
    if (locked === i) { release(); return; }
    if (locked != null) setDetail(locked, false);
    locked = i;
    lockedAt = window.scrollY;
    setDetail(i, true);
    swing(i);
    paint();
  };

  $$('.vidx__row').forEach((btn) => {
    const i = +btn.dataset.locus;
    btn.addEventListener('click', () => lock(i));
    btn.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch') return;      // a tap is a click, not a hover
      hovered = i; paint();
    });
    btn.addEventListener('pointerleave', () => { hovered = null; paint(); });
    btn.addEventListener('focus', () => { hovered = i; paint(); });
    btn.addEventListener('blur',  () => { hovered = null; paint(); });
    // the list is one widget: arrows walk it, Home/End jump, Escape lets go
    btn.addEventListener('keydown', (e) => {
      const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      const peers = $$('.vidx__row', btn.closest('.vidx__list'));
      let to = null;
      if (step) to = peers[(i + step + peers.length) % peers.length];
      else if (e.key === 'Home') to = peers[0];
      else if (e.key === 'End') to = peers[peers.length - 1];
      else if (e.key === 'Escape') { release(); return; }
      if (!to) return;
      e.preventDefault();
      to.focus();
    });
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') release(); });
  document.addEventListener('pointerdown', (e) => {
    if (locked != null && !e.target.closest('.vidx')) release();
  });
  // scrolling is the other way of saying "done" — and it is the only one that
  // matters on a phone, where there is no outside to click
  window.addEventListener('scroll', () => {
    if (locked != null && Math.abs(window.scrollY - lockedAt) > 24) release();
  }, { passive: true });

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
  // The descent, then the ascent. Bottoming out at the base pair and coming
  // straight back to a family — the inheritance odds, then the four case notes —
  // is what closes the loop the section order now tells.
  const SCALES = [
    ['hero', '10⁰ m'], ['specimen', '10⁻³ m'], ['assay', '10⁻⁹ m'],
    ['inheritance', '10⁰ m'], ['stories', '10⁰ m'],
    ['menu', '10⁻⁶ m'], ['performance', '10⁻³ m'], ['workflow', '10⁰ m'],
    ['capabilities', '10⁰ m'], ['provenance', '10⁰ m'], ['collaborators', '10³ m'],
    ['reach', '10⁵ m'], ['contact', '10⁰ m']
  ];

  if (REDUCED) {
    // Collapse every scrub scene to a static, fully readable end-state.
    // Layout is handled by `body.no-motion` in CSS; only the values that
    // a tween would otherwise have produced are set here.
    // body.no-motion is already set at the top; CSS holds --lumen-level at 0.45
    $('#runCounter').textContent = C.validation.runValue;
    scaleRead.textContent = '10⁰ m';
    // the camera tween never runs here, so the ladder is parked square-on —
    // every locus readable, nothing withheld. --cam-* default to 0 anyway;
    // this only leans it enough to read as an object rather than a diagram.
    helix.style.setProperty('--cam-rx', '-4');
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
    // POSITIVE rotateX, and the sign is the whole point. The flap is hinged at
    // its top edge with the printed face toward the camera, so opening it the
    // way a hand does means lifting the free BOTTOM edge toward the viewer and
    // folding it up over the crease. In CSS that is +deg: the free edge maps to
    // +Z (toward you). The old -132 sent it the other way — straight back
    // THROUGH the card body, which read as the flap starting behind the card
    // and swinging round to the front, and drove the flap (z:4) into the body
    // (z:2.5) on the first frame of the open.
    .fromTo('#dbsFlap', { rotateX: 0, z: 4 },
      { rotateX: 152, z: 4, ease: 'none', duration: 0.55 }, 0.30)
    .fromTo('#specimen .scene-layer > div > div',
      { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', duration: 0.28 }, 0.05);

  /* ---- 3 · the ladder turns, and each locus ignites as it comes round.

     Two camera moves, not one. Below lg the ladder lives in a 42svh band with
     a 280px floor, so the wide travel (220px of Y and 730px of Z) would swing
     half the loci straight out of a clipped box; the narrow move is scaled to
     the band it is actually inside. gsap.matchMedia owns both, so a rotate or
     a devtools resize rebuilds the right one and reverts the other. */
  const assayCamera = {
    wide:   { rotateY: [-30, 430], rotateX: [12, -4], z: [-560, 170], y: [120, -100],
              // pinned, so the ladder is on screen for the whole scrub and the
              // loci can ignite one at a time right across it
              flare: [0.10, 0.62] },
    narrow: { rotateY: [-24, 392], rotateX: [10, -3], z: [-300,  80], y: [ 56,  -56],
              // flowed, the band scrolls out of view around 70% of the runway.
              // The flares are pulled into the front third so every locus lights
              // while its rung is still visible; by the time the reader reaches
              // the index under the copy, the whole ladder is already read.
              flare: [0.04, 0.34] }
  };

  gsap.matchMedia().add(
    { wide: '(min-width: 64rem)', narrow: '(max-width: 63.99rem)' },
    (ctx) => {
      const cam = ctx.conditions.wide ? assayCamera.wide : assayCamera.narrow;
      const tl = gsap.timeline({ scrollTrigger: scrub('#assay') });
      // the CAMERA only — never the transform itself. input.css sums it with
      // the inspector's --ins-* offset, which is what lets a visitor take hold
      // of the ladder mid-scrub without either side having to be switched off
      tl.fromTo('#helix',
        { '--cam-ry': cam.rotateY[0], '--cam-rx': cam.rotateX[0],
          '--cam-z': cam.z[0], '--cam-y': cam.y[0] },
        { '--cam-ry': cam.rotateY[1], '--cam-rx': cam.rotateX[1],
          '--cam-z': cam.z[1], '--cam-y': cam.y[1],
          ease: 'none', duration: 1 }, 0);

      // one flare per locus, evenly spaced down the runway. The rungs and the
      // index row share a single tween because they share the same --flare —
      // the geometry and its legend cannot drift out of step.
      const [flareAt, flareSpan] = cam.flare;
      const gap = flareSpan / Math.max(1, LOCI.length - 1);
      LOCI.forEach((L, i) => {
        const targets = locusRungs[i].concat($$('[data-locus="' + i + '"]'));
        tl.fromTo(targets, { '--flare': 0 },
          { '--flare': 1, ease: 'none', duration: Math.min(0.1, gap) },
          flareAt + i * gap);
      });
    });

  // ---- 4 · catalogue cards tilt up into place
  gsap.utils.toArray('.assay-card').forEach((card, i) => {
    gsap.fromTo(card,
      { rotateX: -22, y: 46, opacity: 0, transformOrigin: '50% 100%' },
      { rotateX: 0, y: 0, opacity: 1, duration: 0.7, delay: (i % 3) * 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
  });

  // ---- 4b · the collaborator field warms up
  // Not a fade: the slides are already visible at rest (the plate sits at 32%
  // bone), and what animates is the LIGHT on them. Staggered along the field so
  // it reads as an instrument warming up rather than as another section fade.
  // --reveal has initial-value 1, so if this never runs the field is simply lit.
  gsap.fromTo('#collaborators .cloud__cell',
    { '--reveal': 0 },
    { '--reveal': 1, duration: 0.7, ease: 'power2.out',
      stagger: { each: 0.035, from: 'start' },
      scrollTrigger: { trigger: '#collaborators', start: 'top 78%', once: true } });

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
