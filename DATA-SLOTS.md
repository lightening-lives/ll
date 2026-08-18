# DATA SLOTS — what I still need from you

Everything on the page is driven by **`src/content.js`**. Edit that one file and reload;
you never need to touch the markup.

**On the page, press `S`** to outline every slotted element in place, labelled with its
slot ID. Press again to hide.

Legend in `content.js`: `✅ CONFIRMED` = verified, safe to keep · `🟠 SLOT-nn` = invented.

---

## Blocking — the page makes claims it cannot currently support

| Slot | Where | What I need |
|---|---|---|
| **SLOT-11** | Assay menu | The real catalogue. All 6 assays are invented — codes, names, indications, sample types, TATs, methods and throughputs. This is the section your buyers will screenshot, so it has to be exact. |
| **SLOT-12** | Performance | Sensitivity, specificity, concordance and re-collection rate, each with its n and its reference method. Plus the study to cite. Currently invented. |
| **SLOT-13** | Performance | Real accreditations and their certificate numbers (NABL / ICMR / ISO / EQAS). Do not ship the placeholders. |
| **SLOT-05** | Spec strip | The four headline numbers: sample volume, turnaround, cold-chain requirement, card stability. |
| **SLOT-06 / 07** | Specimen | Confirm the logistics claims — ambient transport, 90-day stability, ordinary post under exempt-specimen rules. These are regulatory-adjacent. |

## Important — content is placeholder but the claim is low-risk

| Slot | Where | What I need |
|---|---|---|
| SLOT-03 | Hero | Approved positioning statement, ~180 characters. |
| SLOT-04 | Hero | The assay-menu PDF to link. Currently an empty anchor. |
| SLOT-08 / 09 | Assay | Real platform description and the four pipeline steps. |
| SLOT-10 | Assay | The illustrative variant. Currently `HBB c.20A>T`. |
| SLOT-14 | Performance | Samples reported to date. |
| SLOT-15 | Workflow | Confirm the five steps and their day counts. |
| SLOT-16 | Why/How/What | Sign-off on the wording. The Golden Circle framing is yours; the phrasing is mine. |
| SLOT-17 | Reach | Districts, collection points, partner facilities, workers trained. |
| SLOT-18 | Reach | A real, consented quote with name and role. **Written consent required** — this is a clinician speaking about patient care. |

## Administrative

| Slot | Where | What I need |
|---|---|---|
| SLOT-01 | Contact | Full postal address of the laboratory. |
| SLOT-02 | Footer | LLPIN. |
| SLOT-19 | Contact form | A form endpoint. **The form is deliberately inert** — it submits nowhere and stores nothing, so no enquiry data can leak before you have decided where it should go. |

---

## Two things I want to flag

**Patient data.** Nothing on this page carries a patient identifier, and the specimen card
in the 3D scene has its ID field redacted to blocks on purpose. If you send me real kit
photography for the asset slots, send it de-identified — the reference shots I have seen
carry a patient name and specimen ID and must not reach a public branch.

**Regulatory review.** SLOT-11, 12 and 13 are diagnostic performance claims. They should
go past whoever signs off your regulatory copy before this is public, not just marketing.
