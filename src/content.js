/* =====================================================================
   LIGHTENING LIVES — CONTENT SOURCE OF TRUTH
   ---------------------------------------------------------------------
   Everything the page renders comes from this file. Edit here, reload.

   LEGEND
     ✅ CONFIRMED  — verified fact. Safe to keep.
     🟠 SLOT-nn    — PLACEHOLDER. Invented. MUST be replaced before launch.

   Every 🟠 slot is listed as a checklist in /DATA-SLOTS.md.
   Press  S  on the page to outline every slotted element in situ.
   ===================================================================== */

window.LL_CONTENT = {

  /* ---------------------------------------------------------------- */
  brand: {
    name: 'Lightening Lives',                        // ✅ CONFIRMED
    legal: 'Lightening Lives LLP',                   // ✅ CONFIRMED
    email: 'admin@lighteninglives.in',               // ✅ CONFIRMED
    phone: '+91 91825 88191',                        // ✅ CONFIRMED
    city: 'Hyderabad 500068, Telangana, India',      // ✅ CONFIRMED
    addressFull: 'Plot 00, Road 00, Sample Layout, Hyderabad 500068', // 🟠 SLOT-01 full postal address
    cin: 'AAA-0000',                                 // 🟠 SLOT-02 LLP identification number
    nav: ['Assays', 'Performance', 'Workflow', 'About', 'Contact']
  },

  /* --- SCENE 1 · HERO ---------------------------------------------- */
  hero: {
    eyebrow: 'Genetic & molecular diagnostics · Hyderabad',   // ✅
    // The one line the whole page hangs on.
    line1: 'One drop',
    line2: 'of blood',
    line3: 'is enough.',
    // 🟠 SLOT-03 approved positioning statement (max ~180 chars)
    standfirst:
      'Dried–blood–spot genetic screening built for the places cold chains do not reach. ' +
      'Newborn panels, haemoglobinopathies and carrier testing — at a price a district ' +
      'hospital can actually run at population scale.',
    ctaPrimary:   { label: 'Request a test kit', href: '#contact' },
    ctaSecondary: { label: 'Download assay menu', href: '#slot-assay-menu-pdf' }, // 🟠 SLOT-04 PDF
    // The spec strip a lab director reads before anything else.
    specs: [                                          // 🟠 SLOT-05 all four values
      { k: 'Sample',       v: '60',   u: 'µL' },
      { k: 'Turnaround',   v: '48',   u: 'h' },
      { k: 'Cold chain',   v: 'None', u: '' },
      { k: 'Stability',    v: '90',   u: 'days' }
    ]
  },

  /* --- SCENE 2 · THE SPECIMEN (10⁻³ m) ------------------------------ */
  specimen: {
    scale: '10⁻³ m',
    kicker: 'The specimen',
    head: 'A card, a postbox, a result.',
    // 🟠 SLOT-06 confirm the real logistics claims — these are the buying argument
    body: 'Collection is a heel-prick onto filter paper. The card dries at ambient ' +
          'temperature, travels by ordinary post, and stays analytically viable for ' +
          '90 days. No phlebotomist, no centrifuge, no −20 °C, no courier contract.',
    points: [                                         // 🟠 SLOT-07 each claim
      { t: 'No venipuncture',   d: 'Heel or finger prick. A trained ASHA worker can collect it.' },
      { t: 'No cold chain',     d: 'Ambient transport. Removes the single largest rural failure point.' },
      { t: 'Ordinary post',     d: 'Cards ship in a paper mailer under standard exempt-specimen rules.' },
      { t: 'Five spots',        d: 'Enough material to re-run and to archive without a recall.' }
    ]
  },

  /* --- SCENE 3 · THE ASSAY (10⁻⁹ m) --------------------------------- */
  assay: {
    scale: '10⁻⁹ m',
    kicker: 'The assay',
    head: 'We read the variant, not the symptom.',
    // 🟠 SLOT-08 replace with the real platform description
    body: 'Eluate from a single 3 mm punch runs a multiplexed amplification panel. ' +
          'Calling is automated against a curated variant set, with every positive ' +
          'orthogonally confirmed before a report is signed out.',
    stack: [                                          // 🟠 SLOT-09 real platform stack
      { step: '01', t: 'Punch & elute',      d: '3 mm disc, single-tube extraction' },
      { step: '02', t: 'Multiplex amplify',  d: 'Targeted panel, closed-tube' },
      { step: '03', t: 'Call & curate',      d: 'Automated calling, curated variant set' },
      { step: '04', t: 'Orthogonal confirm', d: 'Every positive re-tested by a second method' }
    ],
    variantCallout: {                                 // 🟠 SLOT-10 the illustrative variant
      label: 'HBB c.20A>T',
      note: 'The sickle variant. One base out of three billion.'
    }
  },

  /* --- SCENE 4 · ASSAY MENU ----------------------------------------- */
  menu: {
    kicker: 'Assay menu',
    head: 'What you can order.',
    // 🟠 SLOT-11 THE ENTIRE CATALOGUE — every field below is invented.
    note: 'Placeholder catalogue. Replace with the signed-off menu.',
    items: [
      { code: 'LL-NBS-07', name: 'Newborn screening panel',
        indication: 'Universal newborn screening, 7 conditions',
        sample: 'DBS · 3 spots', tat: '48 h', method: 'Multiplex PCR + immunoassay',
        throughput: '384 / run', flag: 'Most ordered' },
      { code: 'LL-HBP-01', name: 'Haemoglobinopathy panel',
        indication: 'Sickle cell disease, β-thalassaemia, HbE',
        sample: 'DBS · 2 spots', tat: '48 h', method: 'HPLC + confirmatory PCR',
        throughput: '192 / run', flag: '' },
      { code: 'LL-CAR-12', name: 'Carrier screening — 12 gene',
        indication: 'Pre-marital and pre-conception counselling',
        sample: 'DBS · 2 spots', tat: '5 d', method: 'Targeted NGS',
        throughput: '96 / run', flag: '' },
      { code: 'LL-IEM-24', name: 'Inborn errors of metabolism',
        indication: 'Symptomatic neonate, expanded metabolic',
        sample: 'DBS · 3 spots', tat: '72 h', method: 'MS/MS',
        throughput: '240 / run', flag: '' },
      { code: 'LL-G6PD-01', name: 'G6PD deficiency',
        indication: 'Pre-primaquine screening, neonatal jaundice',
        sample: 'DBS · 1 spot', tat: '24 h', method: 'Quantitative enzymatic',
        throughput: '384 / run', flag: 'Fastest' },
      { code: 'LL-PND-03', name: 'Prenatal confirmatory',
        indication: 'At-risk couple, chorionic villus / amniotic',
        sample: 'CVS / AF', tat: '7 d', method: 'Sanger + fragment analysis',
        throughput: '48 / run', flag: '' }
    ]
  },

  /* --- SCENE 5 · PERFORMANCE ---------------------------------------- */
  validation: {
    kicker: 'Analytical performance',
    head: 'Numbers, with their denominators.',
    // 🟠 SLOT-12 every figure below is invented — replace with validation-study data
    disclaimer: 'Placeholder figures. Replace with validation-study data and cite the study.',
    stats: [
      { v: '99.4', u: '%',  k: 'Sensitivity',        d: 'vs. HPLC reference, n = 2,480' },
      { v: '99.8', u: '%',  k: 'Specificity',        d: 'vs. HPLC reference, n = 2,480' },
      { v: '99.6', u: '%',  k: 'Concordance',        d: 'Split-sample, two sites' },
      { v: '0.4',  u: '%',  k: 'Re-collection rate', d: 'Inadequate-specimen returns' }
    ],
    accreditations: [                                 // 🟠 SLOT-13 real accreditations + numbers
      'NABL M(EL)T-0000', 'ICMR registered', 'ISO 15189:2022', 'EQAS participant'
    ],
    runNote: 'Reported to date',
    runValue: '1,24,860',                             // 🟠 SLOT-14 samples run to date
    runUnit: 'samples'
  },

  /* --- SCENE 6 · WORKFLOW ------------------------------------------- */
  workflow: {
    kicker: 'How you run it',
    head: 'Five steps, one postbox.',
    steps: [                                          // 🟠 SLOT-15 confirm each step + timing
      { n: '01', t: 'Request kits',   d: 'Tell us volume and panel. Kits ship free.',        time: 'Day 0' },
      { n: '02', t: 'Collect',        d: 'Heel or finger prick onto the card. Air-dry 3 h.', time: 'Day 1' },
      { n: '03', t: 'Post',           d: 'Paper mailer, ordinary post, prepaid.',            time: 'Day 1' },
      { n: '04', t: 'We run it',      d: 'Batch runs daily. Positives confirmed twice.',     time: 'Day 3' },
      { n: '05', t: 'Signed report',  d: 'PDF + HL7 to your LIS. Counselling on request.',   time: 'Day 3' }
    ]
  },

  /* --- SCENE 7 · WHY / HOW / WHAT ----------------------------------- */
  circle: {
    kicker: 'Why we are priced the way we are',
    head: 'Why, then how, then what.',
    // ✅ The Golden Circle framing is the company's own. 🟠 SLOT-16 approve final wording.
    rings: [
      { r: 'Why',
        t: 'We believe the status quo deserves challenging.',
        d: 'The burden of genetic disorders in India is enormous and unevenly carried. ' +
           'Accessibility, sampling, turnaround and cost are the barriers — not the science.' },
      { r: 'How',
        t: 'By making the test robust, simple and cheap.',
        d: 'Sampling that any trained worker can perform, transport that needs no ' +
           'infrastructure, and reporting fast enough to change management.' },
      { r: 'What',
        t: 'Screening a district can afford to run on everyone.',
        d: 'Early detection institutes treatment in time, and opens the door to ' +
           'genetic counselling, carrier screening and prenatal diagnosis.' }
    ]
  },

  /* --- SCENE 8 · REACH ---------------------------------------------- */
  reach: {
    kicker: 'Reach',
    head: 'Where the cards come from.',
    // 🟠 SLOT-17 every figure invented
    stats: [
      { v: '11',      k: 'Districts covered' },
      { v: '340',     k: 'Collection points' },
      { v: '62',      k: 'Partner facilities' },
      { v: '1,180',   k: 'Workers trained' }
    ],
    quote: {                                          // 🟠 SLOT-18 real, consented quote
      text: 'We were sending samples 300 km and waiting three weeks. Now the card ' +
            'goes out with the afternoon post and the report is back before the ' +
            'mother is discharged.',
      who: 'Placeholder Name',
      role: 'Medical Officer, Placeholder District Hospital'
    }
  },

  /* --- SCENE 9 · CONTACT -------------------------------------------- */
  contact: {
    kicker: 'Request a kit',
    head: 'Tell us the volume. We will send the cards.',
    body: 'Kits are free. We will come back within one working day with a ' +
          'panel recommendation, a per-sample price and a collection schedule.',
    fields: [
      { n: 'name',     l: 'Name',                 t: 'text',   req: true },
      { n: 'org',      l: 'Hospital / laboratory', t: 'text',  req: true },
      { n: 'email',    l: 'Email',                t: 'email',  req: true },
      { n: 'phone',    l: 'Phone',                t: 'tel',    req: false },
      { n: 'volume',   l: 'Samples per month',    t: 'text',   req: false },
      { n: 'panel',    l: 'Panel of interest',    t: 'select', req: false }
    ],
    // 🟠 SLOT-19 form endpoint — currently inert, submits nowhere
    endpoint: '',
    submit: 'Request kits'
  }
};
