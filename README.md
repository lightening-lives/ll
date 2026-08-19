# Lightening Lives — "Darkfield"

A scroll-driven 3D site for Lightening Lives LLP: affordable dried-blood-spot genetic
and molecular screening, Hyderabad. This surface is aimed at **clinicians, labs and
hospitals** — the people who order the assay.

## Run it

```bash
npm run dev      # tailwind --watch + http-server on :4173
```

Or separately:

```bash
npm run css:watch
npm run serve            # http://127.0.0.1:4173
npm run build            # minified css for production
```

No build step beyond Tailwind. GSAP is vendored in `vendor/` — no CDN, no network at runtime.

## Where things live

| File | What it is |
|---|---|
| `src/content.js` | **All copy and data.** The only file you need to edit. `✅ REAL` vs `🟠 SLOT-nn`. |
| `DATA-SLOTS.md` | Checklist of every placeholder still owed, grouped by risk. |
| `index.html` | Structure only. Text is bound from `content.js` via `data-ll="path.to.value"`. |
| `assets/` | Brand marks, people portraits and collaborator logos, all pulled from the live site. |
| `src/input.css` | Tailwind v4 `@theme` tokens + the 3D scene system. |
| `src/scene.js` | Content binding, 3D geometry construction, GSAP scroll orchestration. |
| `DESIGN.md` | The visual world, the aesthetic risk, and the rules. |
| `PRODUCT.md` | Product truth and labelled assumptions. |

## Two keys worth knowing

- **`S`** on the page outlines every unfilled data slot in place, labelled with its ID.
- **`?motion=off`** forces the reduced-motion path so you can QA it without changing OS settings.

## Content provenance

Most of the page is now the company's real content, read from lighteninglives.in
(about, services, team, partnerships, impact stories, contact) and from photographs of
the physical collection kit. `src/content.js` marks every value `✅ REAL` or `🟠 SLOT-nn`.

`ref_images/` is **gitignored** — it contains kit photographs, one of which carries an
identifiable patient name alongside a specimen ID. See DATA-SLOTS.md.

## Technical notes

Depth is real CSS `transform-style: preserve-3d` with a scroll-driven camera — **not WebGL**.
Deliberate: the audience includes lab staff on mid-range Android hardware, and every word
on the page stays selectable, indexable and reachable by a screen reader at every depth.
Total runtime JS is ~120 KB of vendored GSAP plus one orchestration file.

All scrub timelines are normalised to `duration: 1` so timeline positions read directly as
scroll fractions. Copy layers are never given a positive `translateZ` — perspective scales
them and crops the text; only geometry enters Z.
