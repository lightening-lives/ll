# DESIGN — "Darkfield"

The visual world for Lightening Lives. Named after **darkfield microscopy**, where the
specimen is lit against a black ground so that its structure glows. It is the only imaging
mode where you see the thing *because* of the darkness around it.

## Why this world
Three things had to be true at once.

1. **The name is the concept.** "Lightening Lives" means both *to bring light* and *to
   lighten a burden*. A page that begins in near-darkness and physically resolves into
   light as you scroll performs the brand instead of describing it. The last section is
   the only one on warm paper-white — that is the payoff, not a style change.
2. **The audience is clinical.** Lab directors trust instruments, not marketing. So the
   chrome is an instrument readout: a fixed depth/scale HUD, monospaced specimen labels,
   figures set as data. Warmth is rationed and deliberate.
3. **The subject supplies the third dimension.** Scroll is a descent through *scale* —
   10⁰ (the patient) → 10⁻³ (the drop) → 10⁻⁹ (the base pair) → back out to the report.
   The Z axis carries meaning here, so 3D is argument, not decoration.

## The aesthetic risk
**The page opens at roughly 6% illumination — near-black, one lit well on a dark plate,
hairline type — and stays dark for four full scenes.** Every competitor in Indian diagnostics opens
on white with a blue gradient and a smiling clinician. This one opens in a darkroom.

*Justification:* the risk is legible rather than arbitrary. Darkness is the working
condition of the actual lab (darkfield, gel imaging, fluorescence), so it reads as
insider-credible to the clinical audience rather than merely moody. And it is the only
way to make the brand's own promise structural: you cannot show light being brought
without first showing the dark. The page earns its ending.

*Guardrail:* body copy never drops below 4.5:1 against its own ground, and the HUD is
always legible. `prefers-reduced-motion` holds a mid illumination rather than travelling
the arc; `prefers-contrast: more` holds it LOW, because light text on a dark ground gains
contrast as the ground darkens.

*How the lightening is built.* Two layers, and the split matters. A **neutral** value lift
raises the whole ground from `#05080c` to about `#191a16` across the scroll — that is what
reads as "the lights coming up". A **small, localised** gold radial sits on top as the
light source itself. An earlier version did the whole lift with wide gold at 16% and the
ground screened to `#292412` — unmistakably brown. Warmth has to be the source, not the
filter; the ground itself must stay neutral or the page reads as sepia, not as light.
The ground is also no longer one flat value. It travels **cool → neutral graphite**
down the document — `oklch(11.0% .020 260)` at the top settling to `oklch(13.6% .009 244)`
at the foot — carried on `html` so the gradient stops resolve against the whole document
rather than the viewport. The temperature moves through *blue*, never through gold: the
sepia failure above is what happens when warmth becomes the filter instead of the source.
On top of that sits **film grain** at 3.5% — a flat black field reads as an empty div, a
grained one reads as an exposure — and a set of translucent per-section grounds so the
page has rhythm instead of reading as one sheet. The section tints must stay translucent:
an opaque band would occlude `.illum` and kill the lightening mechanic outright.

Measured, worst case (lightest ground + full illumination lift + grain at its cap):
secondary text holds **5.44:1** at the top and **5.25:1** at the foot; primary text is
above 14:1 throughout. Both clear the 4.5:1 AA floor.

## The hero — the plate, and one well on it

Two earlier attempts failed in the same way. The first was an SVG teardrop with gradients:
it read as an icon, because that is what it was — a flat shape pretending to be an object.
The second was a solid of revolution, sliced: ~40 contour discs in real Z following a
teardrop profile. Truer to how a specimen is actually imaged, but it read as a pile of
rings rather than as a drop, and no amount of tuning fixed that.

The hero is now **the object the assay actually runs on**: an SBS microplate, 8 × 12,
raking away from the camera, with a single drop hanging over one well.

Three reasons it works where the drop alone did not:

1. **A plate is a plane, and planes are what CSS 3D is genuinely good at.** Every well
   foreshortens correctly, so the tilt reads as depth without any tricks. Stacked discs
   have to *imply* a volume; a plane just is one.
2. **It says the whole business in one image.** Ninety-six wells is population screening.
   One of them is lit, and that is the child you found. Scale and the individual, in the
   same frame, which is exactly the company's claim.
3. **The narrative has cause and effect.** As you scroll the deck opens from raking to
   near-flat, the drop walks down into the lit well and is absorbed, and only then does
   the well burn up to full. The drop is consumed by the assay — it does not sit on the
   deck like a sticker.

The run is deliberately partial: the tail columns are still empty, because a real plate
mid-run is never full. Rows A–H and columns 1–12 are engraved on the skirt at a size that
is near-illegible on purpose — at a raking angle that is instrument texture, not
information.

### Four things this cost, worth writing down

- **`filter: blur()` inside a `preserve-3d` chain is a trap.** A blurred element is
  rasterised into a flattened layer and clipped to a hard rectangle. The drop's halo
  painted a visible light-box behind it. Every glow here is a multi-stop radial gradient
  instead — softer stops cost nothing and composite correctly in 3D.
- **The deck slab is opaque, so real-Z well bores are simply invisible behind it,** and at
  a raking angle a near-parallel plane ~10px back z-fights and prints dark dashes across
  the wells. Real Z is kept where it actually shows — the laminated edge of the stock. The
  depth *inside* a well is done with light: a lit far wall, a shadowed near wall. That is
  what you see in the real thing anyway.
- **96 sibling `preserve-3d` contexts on one plane get sorted against each other.** Only
  the ignited well has anything standing out of the deck, so only it gets a 3D context.
- **The drop must not lean with the plate.** The deck's in-plane rotation lives in
  `--plate-spin`; the drop and the light cone counter-rotate by the same variable so they
  stay upright under gravity while the plate turns.

Everything the timeline drives is a registered `@property` number — `--plate-tilt`,
`--plate-spin`, `--fall`, `--ignite` — with initial values that resolve to a *finished*
composition. If the script never runs, the hero is still a lit plate with a drop over it.

## The specimen card — matched to the physical kit

Everything printed on the card is now read off the photographs in `ref_images/`.

- **The barcode is a real one.** It was a `repeating-linear-gradient`: every bar the same
  width, which is the single thing a barcode never is — it read as hatching. `scene.js`
  now carries the standard Code 128 pattern table and encodes the specimen ID properly
  (Start B, data, modulo-103 check digit, Stop) into SVG bars. `SCM/294609` renders as a
  symbol that would actually scan, and it re-encodes if the ID in `content.js` changes.
- **The print is legible.** The specimen ID was clamped to 11px at a card width of
  290px. The card is wider now and the ID is set at up to 15px in near-black — on the
  real kit it is the most prominent thing on the front, and it should be here too.
- **The stock is white.** The old values were cream and read as a manila coupon.
- **The window is a different material.** The filter paper is matte and fibrous against
  the coated stock around it, the guide ring is a proper SVG dashed circle rather than a
  CSS border, and the dried spot is flat and lopsided with a darker chromatographic rim —
  it was a glossy sphere, which is not what a dried stain looks like.
- **The regulatory row is on the back**, where it is on the real card: REF, LOT, expiry,
  CE, IVD and the do-not-reuse mark, as ISO 15223-1 symbols.

Two deliberate omissions. The real card's back carries a **handwritten patient name, age
and collection date**; that is identifying patient data and is not reproduced — the card
shows the blank write-on area instead. And the **CSIR–CCMB co-brand is no longer printed
on the kit** (confirmed by the client), so the flap carries the sun mark and the brand
alone. CCMB remains where it belongs, in Collaborations.

## The collaborators — a logo cloud

The live site's flat montage went through three failed shapes before this one: identical
cards (which letterboxed marks running from 0.75:1 to 9.2:1), an aspect-sized ruled wall
of bone plates (the second-largest light area on the page, and not the payoff), and dimmed
slides (the same plates, muddier). Every one of them needed a plate, because the source
logos are raster crops with **white paper baked in**. The design could not be fixed while
the assets stayed wrong.

`assets/partners/mono/` is generated from those originals: luminance drives alpha, so the
paper drops out and the ink becomes white, then each file is trimmed to its true ink
bounds. A light-on-dark logo (Tata Steel Foundation, white type in a blue box) survives as
a knockout, which still reads.

On that footing the section is a **logo-cloud grid built on the page's own ruled-panel
idiom** — the one already used by the spec strip, the specimen claims, the performance
figures, the inheritance odds and the reach grid: a **1px gap over `--color-line`** draws
the rules, and the cells sit on **`--color-void`**, darker than the ground, with only the
hairlines light. Hovering a cell lifts it to `--color-ink`, the same move the assay cards
make, and takes its mark to full opacity.

A first pass had this backwards — 2px gaps and cells tinted *lighter* with white — and the
block read as a foreign grey slab dropped onto the page. Getting it consistent was purely
a matter of adopting the idiom already in the stylesheet rather than inventing a second
one. The panel and cell colours are now byte-identical to `#reachGrid` and `.spec-strip`.

The marks are the monochrome set — the dark-page equivalent of the pattern's usual
`-gray-900` logo variants. The one authored motion moment is a 35ms stagger on `--reveal`,
a registered `@property` with `initial-value: 1`, so the grid is simply lit if the script
never runs.

Three departures from the reference pattern, each for a reason:

- **Square corners, not `rounded-2xl`.** DESIGN.md: *nothing rounded past 4px except the
  drop and the wells. This is instrumentation.*
- **The height cap scales with each mark's aspect** (2.2rem for a wordmark, 4.3rem for a
  tall emblem) rather than one `max-h-12` for all. That pattern normally ships logos
  pre-normalised to a single 158×48 box; ours are not, so a single cap left CCMB and Blood
  Warriors tiny while the wordmarks filled their cells.
- **The trailing cell spans the remainder**, so the block stays rectangular at every
  column count instead of ending on a ragged half-row. Verified 4 / 3 / 2 columns with the
  last cell spanning 4 / 3 / 2.

*Not kept:* a version that swapped each mark to its original colours on hover. The colour
art was un-composited from its paper cleanly enough, but seven of the thirteen logos have
dark ink that disappears on a dark ground, so colour needed a lit plate behind it — which
reintroduced the plate this section spent three attempts removing.

## Core team — the record opens in place

Six real bios, verbatim from the company's own `-details.php` pages, behind a click.
The panel is a grid item spanning every column, slotted in at the end of the clicked
face's *own row*: nothing overlays the page, no neighbour shifts sideways, and at one or
two columns the same markup is simply an accordion. The column count is read back off
`grid-template-columns` at runtime rather than duplicated as a breakpoint list in JS.

Height is animated against the **measured** content. The fashionable `0fr → 1fr`
grid-rows trick was tried first and fails here: the panel is itself a grid item of a
nested grid, so the `fr` resolves against zero free space and the row settles at ~3px.
The reveal is also **not** deferred to `requestAnimationFrame` — rAF is paused in a
background tab, which would leave the record stuck shut.

## The order, and why Impact moved

Impact used to sit near the foot of the page, after the collaborators. It now runs
directly after the assay scene, with the Inheritance Machine between them:

> …the variant (10⁻⁹) → **what that variant means for your children** (10⁰) →
> **the families it happened to** (10⁰) → the test menu (10⁻⁶) → performance…

Three reasons this is better than where it was, and better than moving Impact alone:

1. **It completes the loop the site already claims.** The descent bottoms out at the
   base pair, and the shortest possible way back up is to a family. Bottoming out and
   then going to a price list is an anticlimax.
2. **The interactive earns the emotional turn.** "We read the variant" is a capability
   claim. Setting two parents to *carrier* and watching one well in four light up is the
   consequence of that claim, performed by the reader rather than asserted at them. The
   case notes then land on a reader who has just worked out the odds themselves.
3. **It costs the commercial spine one section, not its position.** The test menu and
   the performance figures still sit in the top half, still above the workflow. A lab
   director scrolling for the menu passes two sections instead of none — and both are
   short, unpinned, and skimmable.

The trade to be aware of: a visitor who came only for the catalogue now meets two
human-facing sections first. If that proves wrong for the audience, moving Impact and
the Inheritance Machine to sit *after* Performance is a two-block cut in `index.html`
plus two entries in the `SCALES` array — nothing else depends on the order.

## Impact — testimonial weight, without inventing speech

> **Correction, after review.** The first build of this component broke the very rule
> stated below: it wrapped the pulled sentence in a `<blockquote>` and hung a 4.5rem gold
> open-quote over it. A reader — and a screen reader, which announces "blockquote" —
> takes that as a patient speaking. It is a `<p>` with a short gold rule now. The rule
> was right; the implementation contradicted it.


These are **case notes the company wrote in the third person**, not patient quotes, and
they must never be dressed as quotes: putting words in a patient's mouth is not a style
choice for a diagnostics company. So the card lifts the *outcome sentence* out of the
note verbatim and sets it large in Fraunces, with the setup following underneath in the
body voice and a `CASE NOTE · MADHYA PRADESH` attribution line. Every word on the card is
the company's own. The first note leads full-width; the other three sit in a row.

If real consented quotes ever arrive, they drop into the same `pull` field and the
component needs no change.

## The Inheritance Machine

Ported from direction 15 of the catalogue on `chores/designs` and rebuilt in this page's
vocabulary rather than pasted in. The catalogue version drew the four possible children
as flat SVG squares. Here they are **wells** — the hero object of the whole site — so the
interactive reads as part of the instrument instead of as a widget someone bolted on.

Colour is never the only channel: each outcome carries its genotype (`A/S`), its name
(*Carrier*), and a ring that differs in *kind* — dashed for unaffected, half-charged for
carrier, solid and lit for affected. The odds are computed from the two selected parent
genotypes, not looked up, and the readout is `aria-live="polite"`.

## Scroll budget

Pinned scenes cost the visitor time, so each one has to earn its runway. Currently
hero 1.7 screens, specimen 1.9, assay 1.7, workflow 2.4 — about 7.7 screens of pinned
scrolling, down from 11. The assay scene was the worst offender at 3 full screens for one
rotating helix; a scene that shows a single idea does not need three screens to show it.

## Technical position — real DOM in real 3D, no WebGL
All depth is CSS `transform-style: preserve-3d` with a scroll-driven camera, not three.js.
Deliberate: this company's reach depends on mid-range Android hardware and thin bandwidth.
A WebGL build would ship ~600 KB and put every word inside a canvas — unselectable,
unindexable, invisible to screen readers. Here the type stays real text at every depth.
Total JS is ~120 KB of vendored GSAP and one orchestration file.

## Tokens
**Colour** — anchored to the company's own mark (a gold sun with green leaves), and
justified by what you physically see in a molecular lab. The two agree, which is lucky:
the gold reads as light transmitted through a dried blood spot, and the green as a
fluorophore. `serum` is structural only — it fails contrast as text, so `alarm` and
`deep` carry any red that has to be read.
| Token | Value | Origin |
|---|---|---|
| `void` | `oklch(13% .012 250)` | darkfield ground |
| `ink` / `slab` | `oklch(17/23% .014 250)` | instrument housing |
| `lumen` | `oklch(83% .16 88)` | the brand's own gold, read as transmitted light — PRIMARY |
| `serum` | `oklch(58% .17 30)` | whole blood; structural only, never text |
| `alarm` | `oklch(70% .16 33)` | warning text on dark (7.0:1) |
| `deep`  | `oklch(48% .18 30)` | accent text on paper (6.2:1) |
| `probe` | `oklch(80% .17 148)` | the brand's leaf green, also a real SYBR/FAM emission |
| `bone` | `oklch(95% .012 85)` | filter paper — the final light |

**Type** — two voices, because the company has two.
- **Fraunces** (variable, low WONK) — the human voice. Mission lines, section leads. Warm
  high-contrast serif; chosen over Bodoni because the warmth matters more than the hauteur.
- **IBM Plex Mono** — the data voice. **Machine-read only**: the HUD rail readout,
  datakeys, codes, figures.
- **IBM Plex Sans** — body, and every small human-read role below.
- **IBM Plex Sans Condensed** — the *chrome* voice: nav, section eyebrows, buttons.

### Why the chrome left the mono voice

The chrome was IBM Plex Mono at 12px / .14em, and it was the page's weakest type: a
seven-item nav in wide monospace, and section eyebrows that are editorial phrases set as
though a machine printed them. Nine treatments were rendered side by side on the real
ground — mono heavier and tighter, Plex Sans, Fraunces uppercase, Archivo, Space Grotesk,
Archivo Narrow, and sentence-case variants of each.

**IBM Plex Sans Condensed at 14px/600 won on three counts.** It is the most legible of
the set. It is the only candidate already inside the Plex superfamily, so it adds a role
rather than a fourth voice — Archivo looked marginally crisper but could not clear
"do not introduce a family without a role it alone can perform." And its narrower set
width buys the nav room that a 14px normal-width face would not.

The **HUD rail keeps mono**, because it is the one piece of chrome that really is a live
machine readout. That is the whole rule in one exception.

*Cost:* one extra font request. The nav is also fluid now — `clamp()` on size and gap,
and the link count steps 7 → 6 → 4 → 0 across xl/lg/md/mobile. At a flat 14px the bar
overflowed its own box by 73px at 1024 and 101px at 768.

### The small-type role scale

One 11px uppercase mono utility (`hud`) had ended up carrying **ten different jobs**:
section eyebrows, nav, a person's title, an award, an accreditation, a table head, a
specimen code, a button, a form label and a footnote. Everything small therefore looked
identical, nothing small was comfortable to read, and — worst of it — *names were being
set as though they were part numbers*. "Sir J.C. Bose Fellowship", "Patron · Founder,
AIG Hospitals" and "Madhya Pradesh" all rendered as 11px uppercase monospace.

The split is by **voice**, not by size. Mono means a machine reads it back: a code, a
key, a measurement. Sans means a person reads it: a name, a title, an award, a place.

| Role | Face | Size | Case | Tracking | Carries |
|---|---|---|---|---|---|
| `hud` / `eyebrow` | **Condensed** | 14px | UPPER | .10em | eyebrows, nav, buttons |
| `datakey` | Mono | 11.5px | UPPER | .12em | definition-list and spec-column heads |
| `code` | Mono | 12.5px | as-set | .04em | `LL-SCA-01`, `DMD`, `SCM / 294609`, `Day 0` |
| `role` | Sans 600 | 13px | Sentence | .005em | a person's title |
| `credential` | Sans 500 | 13px | Sentence | 0 | an award, an accreditation, a state |
| `claim` | Sans 600 | 15px | Sentence | −.004em | an assertion — "No venipuncture" |
| `meta` | Sans 400 | 12.5px | Sentence | .01em | attributions and footnotes |

Light-on-dark is compensated on all three perceptual axes, so each role runs slightly
larger, slightly looser in leading, and one step heavier than the same role would be on
paper. `.chip` is the one shared container for `credential` pills, so an award, an
accreditation and a place name are the same object everywhere on the page.

Form labels are the one place the table above does **not** apply: a person fills a form
in, so `.field__label` is sans 600 / 13px, not the mono chrome voice.

Two exceptions worth stating, because both look like violations:
- `#inhOdds` is a `<dl>`, so its `<dt>`s "should" be `datakey`. They are `credential`
  instead, because the same three words — Unaffected / Carrier / Affected — appear as
  captions on the well tiles two inches away. Matching the neighbour beats obeying the
  rule literally; one word must not render two ways on one screen.
- Section eyebrows are editorial phrases in the mono voice, which reads against "mono
  means a machine reads it back". They stay mono because the committed world defines the
  page chrome as an instrument readout, and the eyebrow is chrome, not content. `hud` is
  therefore better read as *the chrome voice* than as *the machine voice*.

The only type below 11.5px is the **simulated print on the 3D objects** — the kit's REF,
LOT and write-on label, and the plate skirt's row/column engraving. Those are photographs
of objects rather than interface text, and both are now `aria-hidden`.

**Motion** — scrub-linked only; nothing autoplays. Every scene is driven by scroll position
so the visitor is the camera operator. Reduced-motion collapses all scrub to static end-states.

## What the live site had that this does not

- **The Golden Circle (WHY / HOW / WHAT).** Removed at the client's request, and I agree
  for this audience — a Sinek framework is consultant register, and a lab director skips it.
  It is *replaced*, not deleted: the slot now carries the founder's record, which is the
  real answer to "why should I trust this supplier, and why is it this cheap."
- **The map.** Removed. It located an office; it never told a buyer anything.
- **The single flat collaborator montage.** Replaced — see *The collaborator wall* below.
- **Lorem Ipsum.** The live "Free home sampling" card still ships placeholder Latin.
- **The three short testimonials.** Dropped in favour of the four full impact narratives,
  which are specific, clinical, and far more persuasive. Those narratives now *carry*
  testimonial weight without pretending to be quotes — see **Impact** below.

## Hierarchy of faces

Three treatments, and the processing is the hierarchy — not the pixel count:

| Who | Size | Treatment |
|---|---|---|
| Founders | largest, own column | `grayscale(.34)` |
| Patron & advisory board | 100×120 in a gold-ruled card | `grayscale(.18)` — the least processed on the page |
| Core team | 199×232 grid | `grayscale(.42)` |

The core team occupies more pixels, but the senior names carry the gold rule and the
truest colour. Desaturation is deliberately mild: heavy processing looked good on a
calibrated screen and turned people into smudges on everything else.

## The masthead

Sun symbol at 44px, then the name set in Fraunces, then the tagline in the mono voice.
The supplied logo is a **stacked** lockup — sun above, name curved around it, tagline
below — and measured at 44/56/72/96px its curved lettering does not resolve below about
72px, which is far taller than a navigation bar should be. So the bar uses the **symbol**
and sets the name in type beside it, where it is crisp at any size and sits in the page's
own typographic voice rather than fighting it.

44px is not arbitrary: it is the measured floor at which the figure inside the sun still
reads. At 32px the symbol degrades into a plain yellow disc.

The symbol was isolated from the lockup by stripping bright, low-saturation pixels —
which removes the white lettering while keeping the saturated sun and the dark figure —
then re-cropping on solid pixels only. The full lockup is used once, in the footer, where
there is room for its lettering to work.

Worth commissioning: a **horizontal lockup** (sun at left, name beside it), which would
let the real logo do this job instead of a symbol plus type, and a **vector** version with
a flat single-colour variant for favicons and anything monochrome.

## Rules
- Never a stock photo of a smiling clinician.
- Figures are set in mono and always carry their unit and their denominator.
- The `lumen` glow is a light source, never a decorative gradient — it always has an origin.
- Nothing rounded past 4px except the drop and the wells. This is instrumentation.
