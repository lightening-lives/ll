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
- **IBM Plex Mono** — the data voice. HUD, specimen IDs, specs, table heads, eyebrows.
  **Data only.** The page had drifted into setting *claims* in it — "No venipuncture",
  the capability sub-items, the collaborator taglines — all mono, uppercase, 10–11px.
  That made the page's assertions read as instrument chrome and sat badly under the
  Fraunces headings they belonged to. Those are now the `claim` utility (Plex Sans 600,
  15px, sentence case); mono kept only where the content really is machine-read.
  Tracking also came down from `.18em` to `.15em`, which is more legible at 11px.
- **IBM Plex Sans** — body. Humanist, holds up small, wide language coverage.

**Motion** — scrub-linked only; nothing autoplays. Every scene is driven by scroll position
so the visitor is the camera operator. Reduced-motion collapses all scrub to static end-states.

## What the live site had that this does not

- **The Golden Circle (WHY / HOW / WHAT).** Removed at the client's request, and I agree
  for this audience — a Sinek framework is consultant register, and a lab director skips it.
  It is *replaced*, not deleted: the slot now carries the founder's record, which is the
  real answer to "why should I trust this supplier, and why is it this cheap."
- **The map.** Removed. It located an office; it never told a buyer anything.
- **The single flat collaborator montage.** Replaced by thirteen individual cards in one
  grid, each logo extracted from that montage and given real size — at thumbnail scale a
  recognition mark reads as a grey smudge and does no work.
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
