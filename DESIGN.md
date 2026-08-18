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
**The page opens at roughly 6% illumination — near-black, one luminous drop, hairline
type — and stays dark for four full scenes.** Every competitor in Indian diagnostics opens
on white with a blue gradient and a smiling clinician. This one opens in a darkroom.

*Justification:* the risk is legible rather than arbitrary. Darkness is the working
condition of the actual lab (darkfield, gel imaging, fluorescence), so it reads as
insider-credible to the clinical audience rather than merely moody. And it is the only
way to make the brand's own promise structural: you cannot show light being brought
without first showing the dark. The page earns its ending.

*Guardrail:* body copy never drops below 4.5:1 against its own ground, the HUD is always
legible, and `prefers-reduced-motion` and `prefers-contrast: more` both lift the floor.

## Technical position — real DOM in real 3D, no WebGL
All depth is CSS `transform-style: preserve-3d` with a scroll-driven camera, not three.js.
Deliberate: this company's reach depends on mid-range Android hardware and thin bandwidth.
A WebGL build would ship ~600 KB and put every word inside a canvas — unselectable,
unindexable, invisible to screen readers. Here the type stays real text at every depth.
Total JS is ~120 KB of vendored GSAP and one orchestration file.

## Tokens
**Colour** — derived from what you physically see in a molecular lab, not from a generator.
| Token | Value | Origin |
|---|---|---|
| `void` | `oklch(13% .012 250)` | darkfield ground |
| `ink` / `slab` | `oklch(17/23% .014 250)` | instrument housing |
| `lumen` | `oklch(80% .15 72)` | transmitted light through a dried blood spot — PRIMARY |
| `serum` | `oklch(58% .17 30)` | whole blood; structural, rationed |
| `probe` | `oklch(82% .14 170)` | FAM/SYBR fluorophore — data + positive states |
| `bone` | `oklch(95% .012 85)` | filter paper — the final light |

**Type** — two voices, because the company has two.
- **Fraunces** (variable, low WONK) — the human voice. Mission lines, section leads. Warm
  high-contrast serif; chosen over Bodoni because the warmth matters more than the hauteur.
- **IBM Plex Mono** — the data voice. HUD, specimen IDs, specs, table heads, eyebrows.
- **IBM Plex Sans** — body. Humanist, holds up small, wide language coverage.

**Motion** — scrub-linked only; nothing autoplays. Every scene is driven by scroll position
so the visitor is the camera operator. Reduced-motion collapses all scrub to static end-states.

## Rules
- Never a stock photo of a smiling clinician.
- Figures are set in mono and always carry their unit and their denominator.
- The `lumen` glow is a light source, never a decorative gradient — it always has an origin.
- Nothing rounded past 4px except the drop itself. This is instrumentation.
