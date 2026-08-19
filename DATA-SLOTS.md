# DATA SLOTS — what I still need from you

Everything on the page is driven by **`src/content.js`**. Edit that one file and reload.

**Press `S` on the page** to outline every slotted element in place, labelled with its ID.

In `content.js`: `✅ REAL` = taken from lighteninglives.in or the physical kit, verified.
`🟠 SLOT-nn` = invented, must be replaced.

Most of the page is now real. What follows is what is still fabricated.

---

## Blocking — the page makes claims it cannot currently support

| Slot | Where | What I need |
|---|---|---|
| **SLOT-12** | Performance | Sensitivity, specificity, concordance and re-collection rate — each with its n and reference method, plus the study to cite. The four figures on the page are invented. |
| **SLOT-13** | Performance | Real accreditations and certificate numbers. `NABL M(EL)T-0000` is a placeholder and must not ship. |
| **SLOT-11** | Test menu | The **disorders are real** — sickle cell, α/β thalassaemia, SMA and DMD are named on your site; haemophilia/coagulation and pharmacogenomics were confirmed as in-scope by you on 2026-08-19. The **codes, turnaround times, methods and throughput are invented.** |
| **SLOT-11b** | Test menu | Confirm the **coagulation** scope. The card is written for haemophilia A and B; if the panel also covers von Willebrand or other factor deficiencies, widen the indication line rather than the title. |
| **SLOT-11c** | Test menu | Confirm **which drug genes** the pharmacogenomic panel reports. The ladder draws CYP2D6 because copy number is the clearest thing to show; the card is written to the panel, not to one gene. |
| **SLOT-05** | Spec strip | The headline numbers. `CE / IVD` is real — it is printed on the kit. Sample and turnaround are not. |
| **SLOT-06 / 07** | Specimen | Confirm the logistics claims: ambient transport, ordinary post, exempt-specimen rules. Regulatory-adjacent. |
| **SLOT-08 / 09** | Assay | The real platform description and pipeline. Currently generic. |
| **SLOT-08b** | Assay | The seven loci the variant ladder and its index name. Every gene, variant and disease association is real and standard, and every disorder is already on the company's own menu — but confirm this is the exact locus set the signed-out panel reports, and swap in the lab's preferred variant nomenclature. Each locus links to the menu card that reports it — keep the two in step if either changes. |

## Important

| Slot | Where | What I need |
|---|---|---|
| SLOT-03 | Hero | Approve the positioning line. The disorders it names are real. |
| SLOT-14 | Performance | Samples reported to date. |
| SLOT-15 | Workflow | Confirm the five steps and their day counts. |
| SLOT-17 | Reach | States, collection points, partner facilities, workers trained. **Deliberately showing `0`** so nobody mistakes a placeholder for a real number. Five states are already listed from your own impact stories. |
| SLOT-18 | Impact | The four narratives are yours, taken from your Impact Stories page. Confirm they are cleared for a clinician-facing page and that no family is re-identifiable. **Now set as testimonials:** the outcome sentence of each note is pulled out and set large. Nothing is invented — the pull line is verbatim from your own text — but it does give each note far more prominence, so re-check the consent position. If you have *real, consented quotes* from families, they would be stronger still and drop straight into the `pull` field in `src/content.js`. |
| SLOT-21 | Collaborators | **Done for now** — I extracted all 13 logos from the montage on your Partnerships page and they are live in `assets/partners/`. They are raster crops on white, shown on paper plates. Send vector originals when you have them and they drop straight in. |
| SLOT-22 | Team | **Dr. Vivek Sharma, Chief Business & Strategy Advisor** exists on your team page but that block is *commented out*, so I left him off. His photo is already downloaded, and his bio is now captured verbatim in a comment in `src/content.js` — re-enabling him is a one-line change. |
| SLOT-24 | Team | Selecting any core-team face now opens their record. The six bios are verbatim from your own `-details.php` pages. **Two corrections to check:** your team page lists "Mr. Jyothi Vislavath" but the bio on the detail page reads "Ms. Jyothi Vislavath" — I have used **Ms.**; and Mehraj Begum's role is now the full "Admin & Operations Executive". The Patron and the two Advisory Board members have no detail page, so they have no record to open — send bios and they get the same treatment. |
| SLOT-25 | Specimen card | The 3D kit is now matched to the photographs in `ref_images/`. The barcode is a **real Code 128-B symbol** encoding `SCM/294609` — it would actually scan. Confirm the REF (`10538018`), LOT (`18231173`) and expiry (`2029-12`) are the values you want shown publicly, since they are printed legibly on the card back. The handwritten patient name on the real card is **deliberately not reproduced**. |
| SLOT-19 | Contact form | A form endpoint. **The form is deliberately inert** — it submits nowhere, so no enquiry data can leak before you decide where it should go. |
| SLOT-02 | Footer | LLPIN. |
| ~~SLOT-20~~ | Contact | **Done** — real LinkedIn, YouTube and X URLs plus the WhatsApp link are pulled from your site and live on the page. |
| SLOT-23 | Capabilities | **"Free home sampling"** is written on your About page but commented out. Confirm it is a live service and I will add it as a sixth capability — the copy is already in `content.js`. |

### The 13 collaborators — all logos now in place

CSIR–CCMB · Atal Incubation Centre · Nucleome · Tata Trusts · Tata Steel Foundation ·
Manasthya Foundation · Thalassemia & Sickle Cell Society · Cure SMA India ·
Sickle Cell Saksham Rajasthan Foundation · IAMD · Blood Warriors · IDO · NASCO

Shown as one flat grid, logo leading. Reordering is just reordering the array in
`content.js`.

### Imagery now pulled from your site

All of this is live on the page, taken from lighteninglives.in:

- **Founders' portrait** — the joint photograph of Dr. and Mrs. Chandak.
- **Six core team portraits**, plus the patron and both advisory board members.
- **The full lockup in the nav**, in light- and dark-lettered variants that swap when the
  page turns to paper. The sun symbol alone is printed on the kit card.
  **Two things worth commissioning:** a *horizontal* lockup (sun at left, name beside it)
  so the bar can be half its current height and stay readable on phones; and a *vector*
  version with a flat single-colour variant, for favicons and anything monochrome.
- **All 13 collaborator logos**, cropped out of your montage individually.

Photography is treated to sit on a dark ground: desaturated and contrast-lifted at rest,
full colour on hover. If you would rather they were full colour throughout, it is one
line in `src/input.css`.

---

## What I found on your site that was still missing

Added this pass:

- **The entire Solutions & Services page** — all five pillars and their sixteen sub-services.
  This was the biggest gap. For a lab evaluating you, *Diagnostic lab consultancy*,
  *Protocol development for low-resource labs* and *Training & capacity building* say you are
  a partner, not just a kit vendor. It is now the "Capabilities" section.
- **Real social URLs and the WhatsApp link.** WhatsApp matters for Indian B2B and was
  buried on your site; it is now a first-class contact channel.

Deliberately still excluded, with reasons:

| Item | Why not |
|---|---|
| Golden Circle / "Why Lightening Lives?" | Your call, and I agree for this audience. |
| Map | Your call. It located an office; it told a buyer nothing. |
| The three short testimonials | Named individuals discussing family medical care, generic wording, no evidence of consent. The four full impact narratives do the job far better. |
| "Watch a Story" | I could find no video behind it. |
| The five service photographs | Generic Western lab stock — blue-tinted, white models. Wrong for a company serving tribal and rural India, and your own team photos are more credible than any of it. If you want service imagery, photograph the actual field work. |
| "Accuracy in Finding" | A claim with no number behind it. The Performance section does this properly once you supply real figures. |
| Lorem Ipsum card | Placeholder Latin, still live on your homepage. |

## Two things you should act on

**Patient data — urgent.** `ref_images/IMG_4109.jpg` shows a handwritten patient name, age
and sex together with the specimen ID on a card that is also barcoded. That is identifiable
patient data. I have added `ref_images/` to `.gitignore` so it cannot be pushed, and used
the photographs only as design reference. Nothing identifiable appears on the page: the
specimen ID on the 3D card renders as `SCM / ▮▮▮▮▮▮`. Please store the originals somewhere
access-controlled and send de-identified shots if you want real kit photography on the site.

**Regulatory review.** SLOT-11, 12 and 13 are diagnostic performance claims. They should be
signed off by whoever owns your regulatory copy, not only marketing.
