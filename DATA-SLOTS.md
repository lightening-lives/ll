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
| **SLOT-12** | Performance | Sensitivity, specificity and concordance — each with its n and reference method, plus the study to cite. **Three figures, not four:** the re-collection rate is now yours (0.2%), and the running total is now yours (2,00,000). These three are still invented and the red note under the heading now says exactly that. |
| **SLOT-13** | Performance | Anything beyond **ICMR validated**, which is now the single credential shown — NABL in particular, with its certificate number. `NABL M(EL)T-0000` was a placeholder and is not on the page. ISO 15189 and EQAS participation were struck on your instruction. |
| **SLOT-11b** | Test menu | Confirm the **coagulation** scope. The card is written for haemophilia A and B; if the panel also covers von Willebrand or other factor deficiencies, widen the indication line rather than the title. |
| **SLOT-11c** | Test menu | Confirm **which drug genes** the pharmacogenomic panel reports. The card is written to the panel, not to one gene — and CYP2D6 no longer appears anywhere on the page, since you struck it from the variant ladder. |

Resolved by your 2026-08-20 pass: **SLOT-03** (hero), **SLOT-06 / 07** (specimen),
**SLOT-08 / 08b / 09** (assay, pipeline and locus set), **SLOT-11** (codes, sample,
turnaround, method, throughput), **SLOT-14** (samples reported), **SLOT-27** (cost).

### Cut in your second round, same day

- **The variant index stays as it was.** It was cut and then reinstated in the same
  round, so the gutter readout, the point-at-a-marker interaction, the leader rule
  and the full list are all still there, along with the strand's own position.
- **"Ordinary post"** dropped from the specimen claims. The claim is still made once,
  in the paragraph above them.
- **"Kits ship free"** dropped from *What it costs*, which was the last of its three
  claims — the section is now the argument alone. Free kits are still promised in
  workflow step 01. The grid removes itself rather than ruling off an empty box;
  pushing a `{ t, d }` back into `access.points` brings it back.
- **The running total now reads *2,00,000 samples and counting…*.**

## Important

| Slot | Where | What I need |
|---|---|---|
| ~~SLOT-03~~ | Hero | **Done** — replaced wholesale with your own copy. The headline is now *Genetic answers / every family / can afford.* and affordability leads the page rather than waiting for the deck. Note that haemophilia is no longer named in the standfirst although the coagulation panel is still carded in the menu and drawn on the ladder. |
| **SLOT-26** | Test menu | The **wider catalogue**. The menu now closes on a card that says the eight test cards are a selection, and names *inborn errors of metabolism*, *non-communicable and complex-disease panels* and *other single-gene and carrier tests*. Those three are inferred from your own material — the core offer in PRODUCT.md and the "genetic disorders and NCDs" wording on your R&D pillar. **Send me the real list** and I will name it properly. This is the line that tells a programme with an unusual requirement it is worth asking. |
| ~~SLOT-14~~ | Performance | **Done** — 2,00,000 samples reported to date. The counter animates to it. |
| SLOT-15 | Workflow | Confirm the five steps and their day counts. The heading is now *5 steps, one courier!*, but step 03 still reads "paper mailer, ordinary post, prepaid" — tell me which of the two is right and I will make them agree. |
| ~~SLOT-17~~ | Reach | **Section deleted** on your instruction — the heading, the empty stat grid and the five-state list are all gone, and the footer index no longer links to it. The five states still appear as the datelines on the impact case notes. |
| SLOT-18 | Impact | Two of the four narratives are now your rewritten versions (Odisha and Jharkhand), and the "de-identified" note under the heading was struck on your instruction. **Consent is still the open question** — with that note gone, nothing on the page tells a reader these are de-identified case notes rather than named patients. Confirm the consent position. |
| SLOT-21 | Collaborators | **Done for now** — I extracted all 13 logos from the montage on your Partnerships page and they are live in `assets/partners/`. They are raster crops on white, shown on paper plates. Send vector originals when you have them and they drop straight in. |
| SLOT-22 | Team | **Dr. Vivek Sharma, Chief Business & Strategy Advisor** exists on your team page but that block is *commented out*, so I left him off. His photo is already downloaded, and his bio is now captured verbatim in a comment in `src/content.js` — re-enabling him is a one-line change. |
| SLOT-24 | Team | Selecting any core-team face now opens their record. The six bios are verbatim from your own `-details.php` pages. **Two corrections to check:** your team page lists "Mr. Jyothi Vislavath" but the bio on the detail page reads "Ms. Jyothi Vislavath" — I have used **Ms.**; and Mehraj Begum's role is now the full "Admin & Operations Executive". The Patron and the two Advisory Board members have no detail page, so they have no record to open — send bios and they get the same treatment. |
| SLOT-25 | Specimen card | The 3D kit is now matched to the photographs in `ref_images/`. The barcode is a **real Code 128-B symbol** encoding `SCM/294609` — it would actually scan. Confirm the REF (`10538018`), LOT (`18231173`) and expiry (`2029-12`) are the values you want shown publicly, since they are printed legibly on the card back. The handwritten patient name on the real card is **deliberately not reproduced**. |
| SLOT-19 | Contact form | The **Typeform form ID** (`contact.typeform` in `src/content.js`, from `https://form.typeform.com/to/<id>`). Until it is set, the Request-a-kit button opens a pre-addressed email instead. |
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

## This pass (2026-08-20) — what your brief changed

Nothing was invented. Four things were reframed:

- **Two families lead now.** *Haemoglobinopathies* and *musculopathies* are named as the
  organising categories, each glossed once in plain words in a strip above the test cards.
  Haemophilia sits in a third row — *Coagulation & drug response* — because it is a
  coagulation disorder and filing it under either umbrella would be wrong.
- **Affordability became a section.** "What it costs" now sits between Workflow and
  Capabilities. It carries no rupee figure by decision, and argues the price from the
  method instead: no phlebotomist, no centrifuge, no cold chain, no courier. See SLOT-27.
- **The menu stops claiming to be the catalogue.** A ninth, dashed cell closes the grid —
  "A much wider DNA menu" — and the deck says outright that the cards are a selection.
  See SLOT-26.
- **The form stopped being addressed to labs only.** "Hospital / laboratory" is now
  "Organisation" plus an explicit type, so an NGO or a district programme can see itself
  in it. The type also reaches us in the enquiry.

## What I found on your site that was still missing

Added in the previous pass:

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
