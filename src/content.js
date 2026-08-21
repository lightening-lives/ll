/* =====================================================================
   LIGHTENING LIVES — CONTENT SOURCE OF TRUTH
   ---------------------------------------------------------------------
   LEGEND
     ✅ REAL — taken from lighteninglives.in or the physical kit. Verified.
     🟠 SLOT-nn — INVENTED placeholder. Must be replaced before launch.

   Checklist of every 🟠 slot: /DATA-SLOTS.md
   Press  S  on the page to outline every slotted element in situ.
   ===================================================================== */

window.LL_CONTENT = {

  brand: {
    name: 'Lightening Lives',                          // ✅
    legal: 'Lightening Lives LLP',                     // ✅
    tagline: 'Every Life Matters',                     // ✅ from the kit + logo
    email: 'admin@lighteninglives.in',                 // ✅
    phone: '+91 91825 88191',                          // ✅
    city: 'Hyderabad, Secunderabad – 500076, Telangana, India',   // ✅ client, 2026-08-22
    addressFull: 'Sree Sai Nilayam, 4-9-7, MBD Complex, HMT Nagar, Nacharam',  // ✅ client, 2026-08-22
    cin: 'AAA-0000',                                   // 🟠 SLOT-02 LLPIN
    // ✅ both pulled from the live site
    mark: 'assets/brand/mark.png',                     // the sun symbol alone,
                                                       // lettering stripped so it
                                                       // survives at nav size
    lockup: 'assets/brand/lockup-on-light.png',        // full lockup, for paper
    whatsapp: 'https://wa.me/919182588191',            // ✅ live on the site
    social: [                                          // ✅ real URLs, pulled from the site
      { k: 'LinkedIn', href: 'https://www.linkedin.com/in/lightening-lives-llp-32a12b392/' },
      { k: 'YouTube',  href: 'https://www.youtube.com/@LighteningLivesLLP' },
      { k: 'X',        href: 'https://x.com/LivesLlp85686' }
    ]
  },

  /* --- 1 · HERO ----------------------------------------------------- */
  hero: {
    line1: 'Genetic answers',
    line2: 'every family',
    line3: 'can afford.',
    // ✅ Title and positioning line are the client's own copy, supplied
    // 2026-08-20. Affordability now leads the headline itself rather than
    // waiting for the deck. The disorders named here still match the test menu
    // and the variant ladder — if one of the three changes, change all three.
    // Note: haemophilia is NOT named in this line although the coagulation
    // panel is still carded in the menu and drawn in the ladder (locus 04).
    standfirst:
      'Dried blood spot screening for haemoglobinopathies and musculopathies '
      + 'including Sickle Cell Anaemia, Thalassaemia, Spinal Muscular Atrophy '
      + 'and Duchenne Muscular Dystrophy along with pharmacogenetics in broad '
      + 'aspects. Affordable, and built for all the people.',
    // Labels are bound into index.html by `data-ll`; the hrefs live in the
    // markup, so both buttons still go somewhere if the script never runs.
    ctaPrimary:   { label: 'Contact us', href: '#contact' },
    ctaSecondary: { label: 'See our common tests', href: '#menu' }
  },

  /* --- 2 · THE SPECIMEN --------------------------------------------- */
  specimen: {
    scale: '10⁻³ m',
    kicker: 'The specimen',
    head: 'A card that makes the difference!',
    // ✅ client copy, 2026-08-20.
    body: 'Collection is a finger or heel prick onto a single spot specialised card. ' +
          'The card dries for a second at room temperature and travels by ordinary ' +
          'post to reach us. No phlebotomist, no centrifuge, no cold chain, nothing ' +
          'sophisticated absolutely!',
    // ✅ client copy, 2026-08-20. 'Ordinary post' was struck in the same pass —
    // the claim is still made once, in `body` above, which is where it belongs:
    // it is a fact about the journey, not a third thing the method removes.
    points: [
      { t: 'No venipuncture', d: 'A finger prick. Not a trained health worker, but you… yes, YOU can collect it.' },
      { t: 'No cold chain',   d: 'Room temperature transport removes the largest rural failure point and the COST ofcourse!' },
      { t: 'Barcoded',        d: 'Every card carries its own unique specimen ID. No identity revealed, no issues of understanding handwriting, secrecy maintained.' }
    ],
    // ✅ every value below is read off the physical kit in ref_images/.
    // The barcode is a REAL Code 128-B encoding of `barcode` — scene.js encodes
    // it properly rather than faking bars with a repeating gradient.
    card: {
      // The CSIR–CCMB co-brand is no longer printed on the kit — confirmed by
      // the client. The flap now carries the sun mark and the brand alone.
      brand: 'Lightening Lives',
      tagline: 'Every Life Matters',
      idPrefix: 'SCM',
      serial: '294609',                 // ✅ the serial printed under the barcode
      barcode: 'SCM/294609',            // ✅ what the bars actually encode
      // ✅ the regulatory row printed on the BACK of the real card
      ref: '10538018',
      lot: '18231173',
      expiry: '2029-12',
      // The back of the real card also carries a HANDWRITTEN patient name, age and
      // collection date. That is identifying patient data and is deliberately NOT
      // reproduced — the card renders a blank ruled write-on area instead.
      writeOnLabel: 'Name / Age / Sex · Date'
    }
  },

  /* --- 3 · THE ASSAY ------------------------------------------------ */
  assay: {
    scale: '10⁻⁹ m',
    kicker: 'The assay',
    head: 'We read the variant, not the symptom.',
    // ✅ client copy, 2026-08-20. The orthogonal-confirmation claim was dropped
    // from both the body and the pipeline in the same pass — the page no longer
    // states anywhere that positives are re-tested by a second method.
    body: 'A single punch from the dried blood spot is utilised to run against a ' +
          'targeted panel. We read three kinds of change: a base substituted, exons ' +
          'missing, a segment inverted, and many more.',
    stack: [
      { step: '01', t: 'Punch & proceed',    d: 'Single disc, single-tube multiplex reaction' },
      { step: '02', t: 'Targeted amplify',   d: 'Closed-tube molecular panel' },
      { step: '03', t: 'Call & curate',      d: 'Substitution, copy-number and star-allele calls in one set' }
    ],

    /* --- the loci the helix actually carries -----------------------------
       The scene used to flare exactly one rung — the sickle base — which sold
       the section short: it read as a sickle-cell company. The ladder now
       carries one locus per disorder family on the menu, and each is drawn as
       a REAL structural difference in the helix rather than as a coloured dot:

         sub  substitution   one base swapped, the rung flares
         del  deletion       the rungs go hollow — bases that should be there
         inv  inversion      the twist reverses for the length of the segment
         dup  duplication    the rung is doubled, offset in depth

       So the geometry teaches the genetics instead of decorating it, and
       colour is never the only channel (DESIGN.md). Fields:
         at    first rung index the locus sits on (0 – 43)
         span  how many rungs it occupies
         kind  sub | del | inv | dup  → the geometry AND the class caption
         fam   haem | coag | neuro | pgx → the one accent colour it may use

       ✅ Every gene, variant and disease association below is real, standard
          and sits inside the company's confirmed scope — haemoglobinopathies,
          coagulation, neuromuscular and pharmacogenomics. Each `menu` field is
          the card in the menu section that reports it; keep the two in step.
       ✅ Reviewed by the client 2026-08-20: locus 05 renamed to the exon 7 and
          exon 8 deletion, and locus 07 (CYP2D6 ×N) struck from the ladder.
       -------------------------------------------------------------------- */
    loci: [
      { at: 3,  span: 1, kind: 'sub', fam: 'haem',
        gene: 'HBB',    variant: 'c.20A>T',        condition: 'Sickle cell anaemia',
        what: 'One base of the β-globin gene swapped, A to T. Two copies of it and ' +
              'the red cell stiffens into a sickle.',
        menu: 'LL-SCA-01' },
      { at: 8,  span: 1, kind: 'sub', fam: 'haem',
        gene: 'HBB',    variant: 'c.92+5G>C',      condition: 'Beta thalassaemia',
        what: 'A base at a splice site, so β-globin is mis-spliced and barely made. ' +
              'The commonest β-thalassaemia allele in India.',
        menu: 'LL-THAL-02' },
      { at: 13, span: 3, kind: 'del', fam: 'haem',
        gene: 'HBA2',   variant: '−α3.7 deletion', condition: 'Alpha thalassaemia',
        what: 'Not a base change at all — 3.7 kb of α-globin is simply gone. Copy ' +
              'number, not sequence, is the answer here.',
        menu: 'LL-THAL-02' },
      { at: 20, span: 3, kind: 'inv', fam: 'coag',
        gene: 'F8',     variant: 'intron 22 inv',  condition: 'Haemophilia A',
        what: 'A segment of factor VIII flipped end to end. Around 45% of severe ' +
              'haemophilia A, and sequencing alone will not see it.',
        menu: 'LL-COAG-03' },
      { at: 27, span: 2, kind: 'del', fam: 'neuro',
        gene: 'SMN1',   variant: 'exon 7 and exon 8 deletion', condition: 'Spinal muscular atrophy',
        what: 'Both copies of SMN1 exon 7 absent. About 95% of spinal muscular ' +
              'atrophy is this one deletion.',
        menu: 'LL-SMA-04' },
      { at: 32, span: 3, kind: 'del', fam: 'neuro',
        gene: 'DMD',    variant: 'exon 45–50 del', condition: 'Duchenne muscular dystrophy',
        what: 'Whole exons missing from dystrophin, clustered in one hotspot. ' +
              'Whether the reading frame survives decides the severity.',
        menu: 'LL-DMD-05' }
      // The CYP2D6 ×N duplication locus was removed by the client on 2026-08-20.
      // No locus on the ladder is `kind: 'dup'` or `fam: 'pgx'` any more — the
      // labels below are kept so either can be restored without touching scene.js.
    ],
    // the second channel: what KIND of change it is, and which family it sits in
    kindLabels: { sub: 'Substitution', del: 'Deletion',
                  inv: 'Inversion',    dup: 'Duplication' },
    famLabels:  { haem: 'Haemoglobin',   coag: 'Coagulation',
                  neuro: 'Neuromuscular', pgx: 'Pharmacogenomic' },
    index: {
      title: 'Variant index',
      // The affordance has to be stated. Nothing about a strand of DNA says
      // "you can turn this", and nothing about a small ring says "point at me",
      // so the scene says both — and says the right one for the input in use.
      hint: 'Drag to turn the strand · point at a marker to read it',
      hintNarrow: 'Tap a variant to see what the change is',
      listLabel: 'All six variants',
      listLabelOpen: 'Hide the list',
      // ✅ the sickle figure is real: HBB c.20A>T is one base of ~3.1 Gb
      note: 'One base out of three billion, a missing exon, an inverted intron. ' +
            'Three classes of change, one dried blood spot punch.'
      // The per-variant "LL-… → See the test" link was removed by the client on
      // 2026-08-20. The `menu` field on each locus above is retained purely as a
      // cross-reference: it records which menu card reports that locus, so the
      // ladder and the menu can still be kept in step by hand.
    }
  },

  /* --- 4 · THE INHERITANCE MACHINE  (interactive) --------------------
     Ported from direction 15 of the design catalogue on `chores/designs`.
     Autosomal-recessive Punnett odds, made playable. The four outcomes are
     computed in scene.js from the two selected parent genotypes — nothing
     here is a lookup table of pre-written results.
     ------------------------------------------------------------------- */
  inheritance: {
    scale: '10⁰ m',
    kicker: 'What a carrier result means',
    head: 'Love brought them together. Genetics changed the odds. Four possible children.',
    // ✅ client copy, 2026-08-20. It replaced the line that told the reader the
    // control was interactive ("Set both parents and the odds redraw"), so the
    // affordance now rests on the two labelled parent selectors alone.
    body: 'Two silent carriers, looked perfectly healthy until their genes told ' +
          'another story. They never knew they were carriers—until a child ' +
          'changed everything.',
    parentLabels: ['Parent 1', 'Parent 2'],
    options: [                                   // ✅ standard AR genotype language
      { g: 'AA', label: 'Normal' },
      { g: 'AS', label: 'Carrier' },
      { g: 'SS', label: 'Affected' }
    ],
    outcomeLabels: { AA: 'Unaffected', AS: 'Carrier', SS: 'Affected' },
    childrenLabel: 'Each child, independently',
    // ✅ clinically accurate for autosomal recessive inheritance
    readouts: {
      none: { h: 'No child inherits the variant.',
              b: 'Neither parent carries it, so it cannot be passed on.' },
      carriersOnly: {
        h: 'No child is affected — but the variant travels on.',
        b: 'Carriers are healthy and usually never find out. That is how a condition ' +
           'stays hidden in a family for generations, until two carriers meet.' },
      all: { h: 'Every child is affected.',
             b: 'Both parents have two copies, so every child inherits two. Screening ' +
                'before conception is the only point at which this changes.' },
      mixed: {
        b: 'Each pregnancy carries these same odds independently — a healthy first ' +
           'child changes nothing about the second. This is the case a carrier test ' +
           'finds before anyone is pregnant.' }
    },
    cta: { label: 'Talk to us about screening', href: '#contact' },
    disclaimer: 'Autosomal recessive inheritance, as in sickle cell anaemia, beta ' +
                'thalassaemia and spinal muscular atrophy. Illustrative — not a ' +
                'substitute for genetic counselling.'
  },

  /* --- 6 · WHAT WE TEST FOR ----------------------------------------- */
  menu: {
    kicker: 'Most requested tests',
    head: 'The tests we are asked for most.',
    // The menu below is a SELECTION, not the catalogue — the lab runs more than
    // it shows here. Saying so in the header is what stops a lab or a district
    // programme reading eight cards as the whole of what we can do and leaving.
    // The deck now leads on the two FAMILIES rather than on the disorders, so
    // the section reads as a discipline with a long menu behind it.
    deck: 'What you see here is just a glimpse. Our DNA menu goes much further, with customised panels built around the needs of every programme.',

    /* --- the two umbrella families, glossed once ------------------------
       ✅ "Haemoglobinopathies" and "musculopathies" are the company's own
       words — they appear verbatim in Jyothi Vislavath's bio further down
       this file. Naming them clinically is what a lab director expects; the
       plain gloss under each is what a district health officer or an NGO
       field lead needs. Neither audience is asked to look anything up.

       Haemophilia is a COAGULATION disorder — not a haemoglobinopathy, and
       not a musculopathy. The third row keeps that honest rather than filing
       it under the wrong umbrella to make the pattern tidier. The three rows
       map onto `assay.famLabels` above (haem · coag+pgx · neuro), so the
       variant ladder and the menu tell the same story.
       -------------------------------------------------------------------- */
    families: [
      { t: 'Haemoglobinopathies',
        d: 'Disorders of haemoglobin — sickle cell anaemia, alpha and beta thalassaemia.' },
      { t: 'Musculopathies',
        d: 'Disorders of muscle and nerve — spinal muscular atrophy and Duchenne muscular dystrophy.' },
      { t: 'Coagulation & drug response',
        d: 'Haemophilia and other factor deficiencies, and pharmacogenomic metaboliser status.' }
    ],
    // ✅ Codes, sample volumes, turnaround, method and throughput are the
    //    client's own figures, supplied 2026-08-20:
    //      · 1 spot for every test except alpha/beta thalassaemia, which needs 3
    //      · 24 h turnaround throughout, except SMA at 48 h
    //      · targeted molecular panel is the method for every test
    //      · 1,200 samples a day of throughput
    //    The codes are still carried here as stable keys but are NO LONGER shown
    //    on the cards — removed by the client in the same pass.
    // 🟠 SLOT-11b confirm the coagulation scope. The card is written for
    //    haemophilia A and B; if the panel also covers von Willebrand or other
    //    factor deficiencies, widen the indication rather than the title.
    // 🟠 SLOT-11c confirm which drug genes the pharmacogenomic panel reports.
    items: [
      { code: 'LL-SCA-01', name: 'Sickle cell anaemia',
        indication: 'Patient diagnosis, carrier and family screening',
        sample: 'DBS · 1 spot', tat: '24 h', method: 'Targeted molecular panel',
        throughput: '1,200 / day', flag: 'Most ordered' },
      { code: 'LL-THAL-02', name: 'Alpha & beta thalassaemia',
        indication: 'Patient diagnosis and carrier screening',
        sample: 'DBS · 3 spots', tat: '24 h', method: 'Targeted molecular panel',
        throughput: '1,200 / day', flag: '' },
      { code: 'LL-COAG-03', name: 'Haemophilia & coagulation disorders',
        indication: 'Diagnosis in a symptomatic child, and carrier testing for mothers and sisters',
        sample: 'DBS · 1 spot', tat: '24 h', method: 'Targeted molecular panel',
        throughput: '1,200 / day', flag: '' },
      { code: 'LL-SMA-04', name: 'Spinal muscular atrophy',
        indication: 'Symptomatic child, and carrier testing for at-risk couples',
        sample: 'DBS · 1 spot', tat: '48 h', method: 'Targeted molecular panel',
        throughput: '1,200 / day', flag: '' },
      { code: 'LL-DMD-05', name: 'Duchenne muscular dystrophy',
        indication: 'Symptomatic child, and maternal carrier testing',
        sample: 'DBS · 1 spot', tat: '24 h', method: 'Targeted molecular panel',
        throughput: '1,200 / day', flag: '' },
      { code: 'LL-PGX-06', name: 'Pharmacogenomics',
        indication: 'Metaboliser status before treatment, so the first dose is the right one',
        sample: 'DBS · 1 spot', tat: '24 h', method: 'Targeted molecular panel',
        throughput: '1,200 / day', flag: '' },
      // Prenatal was struck from this card by the client on 2026-08-20 — newborn
      // screening only, so the sample is a dried spot like every other test here.
      { code: 'LL-NBS-07', name: 'Newborn screening',
        indication: 'Screening at birth, so intervention starts before symptoms do',
        sample: 'DBS · 1 spot', tat: '24 h', method: 'Targeted molecular panel',
        throughput: '1,200 / day', flag: '' },
      { code: 'LL-CUS-08', name: 'Customised community panels',
        indication: 'Tailored molecular testing for specific community needs',
        sample: 'DBS · 1 spot', tat: '24 h', method: 'Targeted molecular panel',
        throughput: '1,200 / day', flag: 'Programmes' }
    ],

    /* --- the closing card: the menu does not end here --------------------
       The grid stays flat — eight cards, one shape — and gains a ninth cell
       that is deliberately NOT a product. It names only families that are not
       already carded above: repeating prenatal/newborn (LL-PNS-07) or the
       customised panels (LL-CUS-08) would make the company look smaller, not
       wider.

       🟠 SLOT-26 — this list is assembled from the company's OWN material:
       "inborn errors of metabolism" is in the core offer in PRODUCT.md, and
       "genetic disorders and NCDs" is the wording of the R&D pillar below.
       Confirm and extend it — this is the line that tells a programme with an
       unusual requirement that it is worth asking.
       -------------------------------------------------------------------- */
    more: {
      eyebrow: 'Beyond these',
      t: 'A much wider DNA menu.',
      d: 'These are the tests NGOs, district programmes and laboratories ask us ' +
         'for most. The menu is longer — inborn errors of metabolism, ' +
         'non-communicable and complex-disease panels, and other single-gene ' +
         'and carrier tests. Tell us what your programme needs.',
      cta: { label: 'Ask for the full menu', href: '#contact' }
    }
  },

  /* --- 7 · PERFORMANCE ---------------------------------------------- */
  validation: {
    kicker: 'Analytical performance',
    head: 'Numbers, with their denominators.',
    // 🟠 SLOT-12 sensitivity, specificity and concordance are STILL INVENTED.
    // The re-collection rate and the running total below are the client's own
    // figures, supplied 2026-08-20.
    disclaimer: 'Sensitivity, specificity and concordance are placeholder figures pending the validation study.',
    stats: [
      { v: '99.4', u: '%', k: 'Sensitivity',        d: 'vs. reference method — validation study in progress' },
      { v: '99.8', u: '%', k: 'Specificity',        d: 'vs. reference method — validation study in progress' },
      { v: '99.6', u: '%', k: 'Concordance',        d: 'Split-sample, two sites' },
      { v: '0.2',  u: '%', k: 'Re-collection rate', d: 'Repeat testing on inadequate-specimen returns' }
    ],
    // ✅ ICMR validated is the one credential the client asked to stand here.
    // ISO 15189 and EQAS participation were struck on 2026-08-20.
    // 🟠 SLOT-13 — the NABL registration number is NOT yet issued. Do not ship a
    // placeholder one: a malformed M(EL)T number reads as a forged credential to
    // exactly the procurement audience this section is for. Add it here when real.
    accreditations: ['ICMR validated'],
    runNote: 'Reported to date',
    runValue: '2,00,000',                               // ✅ client figure, 2026-08-20
    // the total is cumulative and the counter animates up to it, so the unit
    // line carries the tense: it is not a closed book, it is still being added to
    runUnit: 'samples and counting…'
  },

  /* --- 8 · WORKFLOW ------------------------------------------------- */
  workflow: {
    kicker: 'How you run it',
    head: '5 steps, one stamp.',
    steps: [                                            // 🟠 SLOT-15 confirm steps + timings
      { n: '01', t: 'Request kits',  d: 'Tell us volume and panel. Kits ship free.',       time: 'Day 0' },
      { n: '02', t: 'Collect',       d: 'Finger or heel prick onto the card. Air-dry.',    time: 'Day 1' },
      { n: '03', t: 'Post',          d: 'Paper mailer, ordinary post, prepaid.',           time: 'Day 1' },
      { n: '04', t: 'We run it',     d: 'Batch runs daily.',                               time: 'Day 3' },
      { n: '05', t: 'Signed report', d: 'Report to you. Genetic counselling on request.',  time: 'Day 3' }
    ]
  },

  /* --- 9 · WHAT IT COSTS ------------------------------------------
     The page could argue analytical performance, logistics, scope and people,
     and never once said what it costs — while "very affordable" is the single
     strongest thing this company has for the two audiences it is targeting
     hardest. An NGO and a district health officer both arrive with this
     question and neither of them is going to email to find out.

     No figure, by decision (2026-08-20): a published per-sample price goes
     stale, and in a procurement conversation a stale number is worse than no
     number. So the section ARGUES the cost instead of asserting it — the same
     dried spot that removes the phlebotomist, the centrifuge, the cold chain
     and the courier is the reason the price is what it is. Every one of those
     four is already claimed and explained in the Specimen section above, so
     this reads as the conclusion of an argument the reader has already
     followed rather than as a fresh boast.
     ------------------------------------------------------------------- */
  access: {
    kicker: 'What it costs',
    head: 'Priced so a programme can include everyone.',
    body: 'Cost is a design decision here, not a discount. A dried blood spot ' +
          'collection needs no phlebotomist, no centrifuge, no cold chain and no ' +
          'courier — so the cost of reaching one more village is close to the ' +
          'cost of a stamp.',
    // ✅ SLOT-27 resolved 2026-08-20. All three claims the section used to make
    // were struck by the client — "One price per sample", the unverified "No cost
    // to the family", and finally "Kits ship free". The section is now the
    // argument alone, which is the strongest part of it anyway. Free kits are
    // still promised in workflow step 01, and the per-sample quote still reaches
    // the reader through `contact.body` and the form note.
    // Adding a claim back is just pushing an object into this array — the grid
    // renders itself from it, and disappears when it is empty.
    points: []
  },

  /* --- 10 · CAPABILITIES --------------------------------------------- */
  capabilities: {
    kicker: 'Beyond the assay',
    head: 'What else we can do for you!',
    // ✅ Every pillar and sub-item below is verbatim scope from the company's
    // own Solutions & Services page. Wording tightened, substance unchanged.
    pillars: [
      { n: '01', t: 'Genetic & molecular testing',
        d: 'Affordable screening panels for patients, carriers, newborns and whole communities.',
        items: [
          ['Patient screening', 'Sickle cell anaemia, alpha and beta thalassaemia, SMA, DMD'],
          ['Family & carrier screening', 'For couples and families at risk of the above'],
          ['Prenatal & newborn screening', 'Preventing recurrence, ensuring timely intervention'],
          ['Customised panels', 'Tailored molecular testing for specific community needs']
        ] },
      { n: '02', t: 'Preventive & community health',
        d: 'Awareness camps and counselling that prevent disorders rather than only detect them.',
        items: [
          ['Awareness & screening programmes', 'On-site testing, including tribal and rural communities'],
          ['Genetic counselling', 'Helping families understand results and make informed choices'],
          ['Pre-marital & pre-conception screening', 'Preventing transmission of genetic conditions']
        ] },
      { n: '03', t: 'Research & development',
        d: 'Rapid, robust kits for genetic disorders and NCDs, plus access to Biobank research data.',
        items: [
          ['Protocol development', 'Simplified methods for low-resource labs and hospitals'],
          ['Kit development & validation', 'Affordable, rapid molecular diagnostic kits']
        ] },
      { n: '04', t: 'Training & capacity building',
        d: 'Workshops and skill-building so a local lab can run this itself.',
        items: [
          ['Hands-on workshops', 'Molecular and cellular technique training for health workers'],
          ['Skill development', 'Building capacity for local labs to adopt robust methods'],
          ['Knowledge sharing', 'Talks for medical and scientific professionals, and communities']
        ] },
      { n: '05', t: 'Partnerships & consultancy',
        d: 'Collaboration and expert guidance for hospitals, NGOs and public health programmes.',
        items: [
          ['Hospital & NGO partnerships', 'Extending affordable testing to underserved areas'],
          ['Diagnostic lab consultancy', 'Helping labs set up and optimise molecular diagnostics'],
          ['Public health programmes', 'Supporting large-scale screening initiatives'],
          ['Projects & grants consultancy', 'Goals, sustainability, budget, manpower, lab setup, feasibility']
        ] }
    ],
    // 🟠 SLOT-23 "Free home sampling" is written on your site but COMMENTED OUT.
    // Confirm it is a live service and I will add it as a sixth capability.
    homeSampling: {
      t: 'Free home sampling',
      d: 'Home sample collection by trained professionals, so patients do not travel.'
    }
  },

  /* --- 11 · PROVENANCE  (replaces the Golden Circle section) ---------- */
  provenance: {
    kicker: 'Who is behind the assay',
    // ✅ client copy, 2026-08-20.
    head: 'Behind every assay is a story, a purpose, and the people who dared to build it.',
    deck: 'Meet our founders.',
    // ✅ Every credential below is stated on the company's own About page.
    // ✅ the site's own portrait — it shows both founders together
    portrait: 'assets/people/founders.jpg',
    portraitAlt: 'Dr. Giriraj Ratan Chandak and Mrs. Nidhi Chandak',
    founder: {
      name: 'Dr. Giriraj Ratan Chandak',
      role: 'Founder',
      bio: 'Physician, scientist and medical researcher in molecular diagnostics and ' +
           'genetic disorders. Former Chief Scientist at CSIR–Centre for Cellular and ' +
           'Molecular Biology, Hyderabad, and a founding faculty member and former ' +
           'Director of the Centre for DNA Fingerprinting and Diagnostics (CDFD). ' +
           'He led the vision for the Sickle Cell Anaemia Elimination Mission across ' +
           'underserved populations in several states.',
      credentials: [
        'Sir J.C. Bose Fellowship',
        'Fellow of all four Indian National Science Academies',
        'Fellow of The World Academy of Sciences',
        'Former Director, CDFD'
      ]
    },
    cofounder: {
      name: 'Mrs. Nidhi Chandak',
      role: 'Co-Founder',
      bio: 'MSc in Operations Research and PG Diploma in Computer Applications. ' +
           'Leads statistical data management and operations, and works directly ' +
           'with patients, families and support groups.'
    },
    patron: { name: 'Dr. D. Nageshwar Reddy', role: 'Patron · Founder, AIG Hospitals',
              img: 'assets/people/d-nageshwar-reddy.jpg' },
    advisors: [                                          // ✅
      { name: 'Prof. Kalyanaraman Kumaran', role: 'Advisory Board',
        img: 'assets/people/kalyanaraman-kumaran.jpg' },
      { name: 'Prof. G.V. Krishnaveni',     role: 'Advisory Board',
        img: 'assets/people/gv-krishnaveni.jpg' }
    ],
    // 🟠 SLOT-22 Dr. Vivek Sharma, Chief Business & Strategy Advisor, exists on the
    // live team page but is COMMENTED OUT there, so he is left off. Say the word
    // and he goes back in — his photo is already at assets/people/ if you want it.
    // His bio is captured verbatim here so re-enabling him is a one-line change:
    //   { name: 'Dr. Vivek Sharma', role: 'Chief Business & Strategy Advisor',
    //     img: 'assets/people/vivek-sharma.jpg', bio:
    //       'Dr. Vivek Sharma is a social scientist and marketing strategist with over ' +
    //       '27 years of experience in public health. He blends demographic research with ' +
    //       'social marketing to drive the total market approach across health sectors ' +
    //       'including reproductive health, child health, sanitation, non-communicable ' +
    //       'disease, TB and HIV/AIDS. He holds a PhD in Demography from IIPS, Mumbai.' },
    //
    // ✅ names, roles, photos AND bios — every bio below is verbatim from the
    // company's own -details.php page for that person, lightly trimmed for length.
    team: [
      { name: 'Mr. Abhishek Chandak',    role: 'Head, Finance',
        img: 'assets/people/abhishek-chandak.jpg',
        bio: 'Abhishek is a seasoned, award-winning finance leader with over 20 years ' +
             'of diversified experience across multinational organisations including ' +
             'PwC, GE, Wipro, SenecaGlobal and Fourth Frontier. He has held leadership ' +
             'positions spanning audit & assurance, manufacturing, and industrial ' +
             'IT & ITES sectors, as well as start-ups. He was adjudged MSME CFO of the ' +
             'Year by CII – Southern Region in 2021, in recognition of his contributions ' +
             'at SenecaGlobal IT Services.' },

      { name: 'Ms. Manisha Arumalla',    role: 'Scientific Officer',
        img: 'assets/people/manisha-arumalla.jpg',
        bio: 'Manisha is a molecular and cell biologist with an MSc in Human Genetics ' +
             'and Genomics from the University of Barcelona. Her expertise spans a wide ' +
             'range of molecular and cell biology techniques, with a strong background ' +
             'in protein engineering. She spent over seven years at CSIR–CCMB working ' +
             'closely with Dr. G.R. Chandak on genomic research into complex diseases, ' +
             'and developed her expertise in experimental design, project planning and ' +
             'team management.' },

      { name: 'Ms. Punyasri PSKDB',      role: 'Technical Officer',
        img: 'assets/people/punyasri-pskdb.jpg',
        bio: 'Punyasri holds a BSc in Microbiology, Genetics and Chemistry, and an MSc ' +
             'in Nutrition — a scientific foundation that drives her work in genetic ' +
             'screening, in organising awareness campaigns and field activities, and in ' +
             'setting up and running experiments with exceptional accuracy, precision ' +
             'and consistency. With over 7 years in the field, she plays a key role in ' +
             'keeping the diagnostic processes at Lightening Lives reliable and efficient.' },

      // ✅ corrected: the live site's own bio reads "Ms. Jyothi Vislavath"
      { name: 'Ms. Jyothi Vislavath',    role: 'Technical Officer',
        img: 'assets/people/jyothi-vislavath.jpg',
        bio: 'Jyothi is a Biotechnology graduate with over 9 years of experience in ' +
             'molecular diagnostics, specialising in patient counselling, genetic ' +
             'testing and clinical reporting. She has worked across both government and ' +
             'private healthcare, contributing to affordable, robust diagnostic methods ' +
             'for haemoglobinopathies and musculopathies. Her near-zero error rate in ' +
             'testing is one of her defining professional strengths.' },

      { name: 'Ms. Mehraj Begum',        role: 'Admin & Operations Executive',
        img: 'assets/people/mehraj-begum.jpg',
        bio: 'Mehraj holds a degree in commerce and manages the company’s administrative ' +
             'operations. She ensures the smooth and efficient management of company ' +
             'resources, and oversees critical areas such as keeping materials available ' +
             'for experiments, social media, and organising investor and stakeholder ' +
             'meetings — a vital role in maintaining operational efficiency.' },

      { name: 'Mr. Pruthvi Bellamkonda', role: 'Accounts Executive',
        img: 'assets/people/pruthvi-bellamkonda.jpg',
        bio: 'Pruthvi oversees day-to-day financial operations to keep workflows smooth ' +
             'and uninterrupted. He holds an MBA specialising in Finance and HR from ' +
             'SK University, Anantapur — a combination that fuels both an analytical ' +
             'approach to numbers and a people-first mindset. He focuses on maintaining ' +
             'strong working relationships to keep projects moving efficiently.' }
    ]
  },

  /* --- 12 · COLLABORATORS -------------------------------------------- */
  collaborators: {
    kicker: 'Collaborations',
    head: 'We work with the same ethos.',
    // ✅ Every organisation below appears on the company's Partnerships page.
    // 🟠 SLOT-21 supply an individual SVG/PNG per collaborator — see DATA-SLOTS.md.
    // ✅ each logo extracted from the montage on the live Partnerships page.
    // 🟠 SLOT-21 these are raster crops — send vector originals when you have them.
    // 🟠 SLOT-21 — the files in assets/partners/mono/ are generated from the
    // colour originals alongside them: luminance drives alpha, so the white
    // paper drops out and the ink becomes white. That lets every mark sit
    // DIRECTLY on the dark ground with no plate behind it. A light-on-dark
    // logo (Tata Steel Foundation) survives as a knockout, which still reads.
    // `ar` is measured AFTER trimming to true ink bounds, so equal-area sizing
    // is optical rather than dependent on each crop's stray padding.
    // Regenerate both if a source logo is replaced.
    note: 'Marks are monochrome from your own montage. Vector originals would sharpen them.',
    // One flat list — the category headings were more taxonomy than the reader needed.
    items: [
      { n: 'CSIR–CCMB', d: 'Centre for Cellular & Molecular Biology',
        logo: 'assets/partners/mono/csir-ccmb.png', ar: 0.797 },
      { n: 'Atal Incubation Centre', d: 'CCMB',
        logo: 'assets/partners/mono/atal-incubation-centre.png', ar: 3.148 },
      { n: 'Nucleome', d: 'Genomics',
        logo: 'assets/partners/mono/nucleome.png', ar: 1.488 },
      { n: 'Tata Trusts', d: '',
        logo: 'assets/partners/mono/tata-trusts.png', ar: 9.2 },
      { n: 'Tata Steel Foundation', d: '',
        logo: 'assets/partners/mono/tata-steel-foundation.png', ar: 2.094 },
      { n: 'Manasthya Foundation', d: 'Healing Minds, Transforming Lives',
        logo: 'assets/partners/mono/manasthya-foundation.png', ar: 1.023 },
      { n: 'Thalassemia & Sickle Cell Society', d: 'TSCS',
        logo: 'assets/partners/mono/thalassemia-sickle-cell-society.png', ar: 4.389 },
      { n: 'Cure SMA India', d: 'Hope Beyond Boundaries',
        logo: 'assets/partners/mono/cure-sma-india.png', ar: 2.083 },
      { n: 'Sickle Cell Saksham Rajasthan Foundation', d: '',
        logo: 'assets/partners/mono/sickle-cell-saksham-rajasthan.png', ar: 0.933 },
      { n: 'IAMD', d: 'Because Life is Special',
        logo: 'assets/partners/mono/iamd.png', ar: 2.098 },
      { n: 'Blood Warriors', d: '',
        logo: 'assets/partners/mono/blood-warriors.png', ar: 0.754 },
      { n: 'IDO', d: 'Indigenous Development Organization',
        logo: 'assets/partners/mono/ido.png', ar: 1.95 },
      { n: 'NASCO', d: '',
        logo: 'assets/partners/mono/nasco.png', ar: 4.543 }
    ]
  },

  /* --- 5 · IMPACT --------------------------------------------------- */
  stories: {
    kicker: 'Impact',
    head: 'What early detection actually changes.',
    // The "Four case notes from our own records, de-identified" line was struck
    // by the client on 2026-08-20 and the element removed from index.html.
    // ✅ All four narratives are the company's own, from the Impact Stories page.
    //
    // These are NOT quotes. They are case notes the company wrote in the third
    // person, so nothing here is presented as a patient's own speech. The `pull`
    // line on each is the OUTCOME sentence lifted VERBATIM out of that same
    // narrative and set large — testimonial weight, nothing invented. `d` carries
    // the remaining setup, with the pulled sentence removed so it never repeats.
    //
    // 🟠 SLOT-18 confirm consent and de-identification before publishing.
    items: [
      { place: 'Madhya Pradesh', cond: 'DMD',
        t: 'Early diagnosis changed a child’s life',
        pull: 'Timely diagnosis let the family start supportive therapy early, ' +
              'and join patient support groups.',
        d: 'A 3-year-old boy in a tribal village showed muscle weakness. His family ' +
           'had no access to specialist hospitals and assumed it was nutritional. ' +
           'Through an NGO they reached an affordable molecular test, and he was ' +
           'diagnosed with Duchenne muscular dystrophy.' },

      { place: 'Chhattisgarh', cond: 'SMA',
        t: 'Protecting the future of a family',
        pull: 'With genetic counselling they made an informed decision that ' +
              'prevented recurrence. Today they have a healthy child.',
        d: 'A tribal couple lost their first child to spinal muscular atrophy without ' +
           'ever knowing the cause. During a second pregnancy, carrier testing showed ' +
           'both parents carried the SMA mutation.' },

      // ✅ rewritten by the client, 2026-08-20
      { place: 'Odisha', cond: 'SCA',
        t: 'Breaking the cycle of silent carriers',
        pull: 'Because sometimes, breaking a generational cycle begins with ' +
              'knowing what you carry.',
        d: 'A young couple came to us after watching children in their extended ' +
           'family struggle with severe anaemia and repeated health complications. ' +
           'For years, the family had accepted it as fate, never knowing that a ' +
           'hidden genetic condition could be silently passed from one generation ' +
           'to the next. Testing revealed that both were carriers of sickle cell ' +
           'anaemia, despite appearing completely healthy. For the first time, fear ' +
           'gave way to understanding—and knowledge offered them the power to make ' +
           'informed choices for their future children.' },

      // ✅ rewritten by the client, 2026-08-20
      { place: 'Jharkhand', cond: 'DMD',
        t: 'Knowledge at the right time',
        pull: 'Early diagnosis brought clarity, and knowledge gave the family a ' +
              'chance to prepare for the road ahead.',
        d: 'A mother brought her 6-year-old daughter to a local health camp, hoping ' +
           'for answers to her growing muscle weakness. Genetic testing revealed DMD ' +
           'at an early stage, giving the family a chance to understand the condition ' +
           'and plan timely care. The mother’s carrier testing was also positive, ' +
           'uncovering a risk she had never known she carried.' }
    ]
  },

  /* --- 13 · CONTACT ------------------------------------------------- */
  contact: {
    // The eyebrow is a plain noun label like every other section's; the
    // headline is the one place the page says its own name. "Bring the light"
    // is the brand's double meaning — to bring light, to lighten a burden — on
    // the only section set in light, which is what the whole scroll set up.
    // The previous head ("Tell us the volume. We will send the cards.") was a
    // supplier sentence on the payoff section; the body and the submit button
    // still carry that practical detail.
    kicker: 'Start here',
    head: 'Bring the light to your programme.',
    body: 'Let us know what you’re looking for and we will come back with a panel ' +
          'recommendation, a per-sample price and a collection schedule — whether ' +
          'you are a laboratory, a hospital, an NGO or a district programme.',
    // The form is Typeform. `typeform` is the form ID from its public URL
    // (https://form.typeform.com/to/<id>). Until it is set the button falls
    // back to a pre-addressed email, so the page never offers a dead control.
    typeform: '',                                       // 🟠 SLOT-19 Typeform form ID
    // The three things the body copy promises, set out as steps so the reader
    // knows what the click costs and what comes back before they commit.
    steps: [
      { t: 'Tell us about your programme',
        d: 'Who you are, roughly how many samples a month, and which disorders matter to you. About two minutes; no patient identifiers.' },
      { t: 'We come back within one working day',
        d: 'A panel recommendation, a per-sample price and a collection schedule, written for your volume.' },
      { t: 'Cards are on their way',
        d: 'Collection cards, return packaging and a one-page collection guide, by ordinary post.' }
    ],
    submit: 'Request a kit',
    duration: 'Takes about two minutes',
    note: 'Opens a short form. Prefer email? Write to admin@lighteninglives.in'
  }
};
