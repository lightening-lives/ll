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
    city: 'Hyderabad – 500068, Telangana, India',      // ✅
    addressFull: 'D 306, Sy. No. 117, Indu Aranya Pallavi Apts, GSI SR, ' +
                 'Bandlaguda, Hayath Nagar, Ranga Reddy',              // ✅
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
    eyebrow: 'Genetic & molecular diagnostics · Hyderabad',   // ✅
    line1: 'One drop',
    line2: 'of blood',
    line3: 'is enough.',
    // 🟠 SLOT-03 approve the positioning line. Disorders named are ✅ real.
    standfirst:
      'Dried–blood–spot screening for sickle cell anaemia, thalassaemia, SMA and ' +
      'Duchenne muscular dystrophy — built to reach tribal and rural communities ' +
      'that conventional diagnostics never reaches.',
    ctaPrimary:   { label: 'Request a test kit', href: '#contact' },
    ctaSecondary: { label: 'See the test menu', href: '#menu' },
    specs: [                                            // 🟠 SLOT-05 all four values
      { k: 'Sample',     v: '1',    u: 'spot' },
      { k: 'Turnaround', v: '48',   u: 'h' },
      { k: 'Cold chain', v: 'None', u: '' },
      { k: 'Marking',    v: 'CE',   u: 'IVD' }          // ✅ CE/IVD is on the real card
    ]
  },

  /* --- 2 · THE SPECIMEN --------------------------------------------- */
  specimen: {
    scale: '10⁻³ m',
    kicker: 'The specimen',
    head: 'A card, a postbox, a result.',
    // 🟠 SLOT-06 confirm the logistics claims — these are regulatory-adjacent.
    body: 'Collection is a finger or heel prick onto a single filter-paper spot. ' +
          'The card dries at ambient temperature and travels by ordinary post. ' +
          'No phlebotomist, no centrifuge, no cold chain, no courier contract.',
    points: [                                           // 🟠 SLOT-07 each claim
      { t: 'No venipuncture', d: 'A finger prick. A trained health worker can collect it.' },
      { t: 'No cold chain',   d: 'Ambient transport removes the largest rural failure point.' },
      { t: 'Ordinary post',   d: 'Ships in a paper mailer under exempt-specimen rules.' },
      { t: 'Barcoded',        d: 'Every card carries its own specimen ID. No names travel.' }
    ],
    // ✅ all of this is printed on the real kit
    card: {
      partner: 'CSIR–CCMB',
      brand: 'Lightening Lives',
      tagline: 'Every Life Matters',
      idPrefix: 'SCM',
      marks: 'CE · IVD · REF 10538018'
    }
  },

  /* --- 3 · THE ASSAY ------------------------------------------------ */
  assay: {
    scale: '10⁻⁹ m',
    kicker: 'The assay',
    head: 'We read the variant, not the symptom.',
    // 🟠 SLOT-08 replace with the real platform description
    body: 'A single punch from the dried spot is eluted and run against a targeted ' +
          'panel. Calling is automated against a curated variant set, and every ' +
          'positive is confirmed by a second method before a report is signed out.',
    stack: [                                            // 🟠 SLOT-09 real platform stack
      { step: '01', t: 'Punch & elute',      d: 'Single disc, single-tube extraction' },
      { step: '02', t: 'Targeted amplify',   d: 'Closed-tube molecular panel' },
      { step: '03', t: 'Call & curate',      d: 'Automated calling, curated variant set' },
      { step: '04', t: 'Orthogonal confirm', d: 'Every positive re-tested by a second method' }
    ],
    variantCallout: {                                   // ✅ HBB c.20A>T is the sickle variant
      label: 'HBB c.20A>T',
      note: 'The sickle variant. One base out of three billion.'
    }
  },

  /* --- 4 · WHAT WE TEST FOR ----------------------------------------- */
  menu: {
    kicker: 'What we test for',
    head: 'The disorders, and the tests.',
    // ✅ Every DISORDER below is named on the company's own site.
    // 🟠 SLOT-11 the codes, turnaround times, methods and throughput are INVENTED.
    note: 'Disorders are real. Codes, turnaround and methods are placeholder — replace with the signed-off menu.',
    items: [
      { code: 'LL-SCA-01', name: 'Sickle cell anaemia',
        indication: 'Patient diagnosis, carrier and family screening',
        sample: 'DBS · 1 spot', tat: '48 h', method: 'Targeted molecular panel',
        throughput: '384 / run', flag: 'Most ordered' },
      { code: 'LL-THAL-02', name: 'Alpha & beta thalassaemia',
        indication: 'Patient diagnosis and carrier screening',
        sample: 'DBS · 1 spot', tat: '48 h', method: 'HPLC + confirmatory molecular',
        throughput: '192 / run', flag: '' },
      { code: 'LL-SMA-03', name: 'Spinal muscular atrophy',
        indication: 'Symptomatic child, and carrier testing for at-risk couples',
        sample: 'DBS · 1 spot', tat: '72 h', method: 'Copy-number molecular assay',
        throughput: '96 / run', flag: '' },
      { code: 'LL-DMD-04', name: 'Duchenne muscular dystrophy',
        indication: 'Symptomatic child, and maternal carrier testing',
        sample: 'DBS · 1 spot', tat: '72 h', method: 'Deletion/duplication analysis',
        throughput: '96 / run', flag: '' },
      { code: 'LL-PNS-05', name: 'Prenatal & newborn screening',
        indication: 'Preventing recurrence, ensuring timely intervention',
        sample: 'DBS / CVS / AF', tat: '5 d', method: 'Targeted confirmatory',
        throughput: '48 / run', flag: '' },
      { code: 'LL-CUS-06', name: 'Customised community panels',
        indication: 'Tailored molecular testing for specific community needs',
        sample: 'DBS · 1 spot', tat: 'On scope', method: 'Built to the programme',
        throughput: 'By programme', flag: 'Programmes' }
    ]
  },

  /* --- 5 · PERFORMANCE ---------------------------------------------- */
  validation: {
    kicker: 'Analytical performance',
    head: 'Numbers, with their denominators.',
    // 🟠 SLOT-12 EVERY FIGURE BELOW IS INVENTED.
    disclaimer: 'Placeholder figures. Replace with validation-study data and cite the study.',
    stats: [
      { v: '99.4', u: '%', k: 'Sensitivity',        d: 'vs. reference method, n = 0,000' },
      { v: '99.8', u: '%', k: 'Specificity',        d: 'vs. reference method, n = 0,000' },
      { v: '99.6', u: '%', k: 'Concordance',        d: 'Split-sample, two sites' },
      { v: '0.4',  u: '%', k: 'Re-collection rate', d: 'Inadequate-specimen returns' }
    ],
    accreditations: ['NABL M(EL)T-0000', 'ICMR registered', 'ISO 15189', 'EQAS participant'], // 🟠 SLOT-13
    runNote: 'Reported to date',
    runValue: '1,24,860',                               // 🟠 SLOT-14
    runUnit: 'samples'
  },

  /* --- 6 · WORKFLOW ------------------------------------------------- */
  workflow: {
    kicker: 'How you run it',
    head: 'Five steps, one postbox.',
    steps: [                                            // 🟠 SLOT-15 confirm steps + timings
      { n: '01', t: 'Request kits',  d: 'Tell us volume and panel. Kits ship free.',       time: 'Day 0' },
      { n: '02', t: 'Collect',       d: 'Finger or heel prick onto the card. Air-dry.',    time: 'Day 1' },
      { n: '03', t: 'Post',          d: 'Paper mailer, ordinary post, prepaid.',           time: 'Day 1' },
      { n: '04', t: 'We run it',     d: 'Batch runs daily. Positives confirmed twice.',    time: 'Day 3' },
      { n: '05', t: 'Signed report', d: 'Report to you. Genetic counselling on request.',  time: 'Day 3' }
    ]
  },

  /* --- 7 · CAPABILITIES --------------------------------------------- */
  capabilities: {
    kicker: 'Beyond the assay',
    head: 'What else we can do for your laboratory.',
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

  /* --- 7 · PROVENANCE  (replaces the Golden Circle section) ---------- */
  provenance: {
    kicker: 'Who is behind the assay',
    head: 'Built by the people who built the mission.',
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
    team: [                                              // ✅ names, roles and photos
      { name: 'Mr. Abhishek Chandak',    role: 'Head, Finance',
        img: 'assets/people/abhishek-chandak.jpg' },
      { name: 'Ms. Manisha Arumalla',    role: 'Scientific Officer',
        img: 'assets/people/manisha-arumalla.jpg' },
      { name: 'Ms. Punyasri PSKDB',      role: 'Technical Officer',
        img: 'assets/people/punyasri-pskdb.jpg' },
      { name: 'Mr. Jyothi Vislavath',    role: 'Technical Officer',
        img: 'assets/people/jyothi-vislavath.jpg' },
      { name: 'Ms. Mehraj Begum',        role: 'Admin & Operations',
        img: 'assets/people/mehraj-begum.jpg' },
      { name: 'Mr. Pruthvi Bellamkonda', role: 'Accounts Executive',
        img: 'assets/people/pruthvi-bellamkonda.jpg' }
    ]
  },

  /* --- 8 · COLLABORATORS -------------------------------------------- */
  collaborators: {
    kicker: 'Collaborations',
    head: 'We work with the same ethos.',
    // ✅ Every organisation below appears on the company's Partnerships page.
    // 🟠 SLOT-21 supply an individual SVG/PNG per collaborator — see DATA-SLOTS.md.
    // ✅ each logo extracted from the montage on the live Partnerships page.
    // 🟠 SLOT-21 these are raster crops — send vector originals when you have them.
    note: 'Logos extracted from your montage. Vector originals preferred when available.',
    // One flat list — the category headings were more taxonomy than the reader needed.
    items: [
      { n: 'CSIR–CCMB', d: 'Centre for Cellular & Molecular Biology',
        logo: 'assets/partners/csir-ccmb.png' },
      { n: 'Atal Incubation Centre', d: 'CCMB',
        logo: 'assets/partners/atal-incubation-centre.png' },
      { n: 'Nucleome', d: 'Genomics',
        logo: 'assets/partners/nucleome.png' },
      { n: 'Tata Trusts', d: '',
        logo: 'assets/partners/tata-trusts.png' },
      { n: 'Tata Steel Foundation', d: '',
        logo: 'assets/partners/tata-steel-foundation.png' },
      { n: 'Manasthya Foundation', d: 'Healing Minds, Transforming Lives',
        logo: 'assets/partners/manasthya-foundation.png' },
      { n: 'Thalassemia & Sickle Cell Society', d: 'TSCS',
        logo: 'assets/partners/thalassemia-sickle-cell-society.png' },
      { n: 'Cure SMA India', d: 'Hope Beyond Boundaries',
        logo: 'assets/partners/cure-sma-india.png' },
      { n: 'Sickle Cell Saksham Rajasthan Foundation', d: '',
        logo: 'assets/partners/sickle-cell-saksham-rajasthan.png' },
      { n: 'IAMD', d: 'Because Life is Special',
        logo: 'assets/partners/iamd.png' },
      { n: 'Blood Warriors', d: '',
        logo: 'assets/partners/blood-warriors.png' },
      { n: 'IDO', d: 'Indigenous Development Organization',
        logo: 'assets/partners/ido.png' },
      { n: 'NASCO', d: '',
        logo: 'assets/partners/nasco.png' }
    ]
  },

  /* --- 9 · IMPACT --------------------------------------------------- */
  stories: {
    kicker: 'Impact',
    head: 'What early detection actually changes.',
    // ✅ All four narratives are the company's own, from the Impact Stories page.
    // 🟠 SLOT-18 confirm consent and de-identification before publishing.
    items: [
      { place: 'Madhya Pradesh', cond: 'DMD',
        t: 'Early diagnosis changed a child’s life',
        d: 'A 3-year-old boy in a tribal village showed muscle weakness. His family ' +
           'had no access to specialist hospitals and assumed it was nutritional. ' +
           'Through an NGO they reached an affordable molecular test, and he was ' +
           'diagnosed with Duchenne muscular dystrophy. Timely diagnosis let the ' +
           'family start supportive therapy early and join patient support groups.' },
      { place: 'Chhattisgarh', cond: 'SMA',
        t: 'Protecting the future of a family',
        d: 'A tribal couple lost their first child to spinal muscular atrophy without ' +
           'ever knowing the cause. During a second pregnancy, carrier testing showed ' +
           'both parents carried the SMA mutation. With genetic counselling they made ' +
           'an informed decision that prevented recurrence. Today they have a healthy child.' },
      { place: 'Odisha', cond: 'SCA',
        t: 'Breaking the cycle of silent carriers',
        d: 'A young couple came to us after seeing breathing difficulty, muscle ' +
           'weakness, severe anaemia and repeated infections in two children in their ' +
           'extended family. Testing revealed both were carriers of sickle cell ' +
           'anaemia — breaking a generational cycle the community thought was fate.' },
      { place: 'Jharkhand', cond: 'DMD',
        t: 'Knowledge at the right time',
        d: 'A mother brought her 6-year-old daughter to a local health camp. The girl ' +
           'was diagnosed with DMD at an early stage, and the mother’s carrier ' +
           'testing was positive. The family received counselling and could make ' +
           'informed choices for future pregnancies.' }
    ]
  },

  /* --- 10 · REACH --------------------------------------------------- */
  reach: {
    kicker: 'Reach',
    head: 'Where the cards come from.',
    stats: [                                            // 🟠 SLOT-17 every figure invented
      { v: '0',  k: 'States covered' },
      { v: '0',  k: 'Collection points' },
      { v: '0',  k: 'Partner facilities' },
      { v: '0',  k: 'Workers trained' }
    ],
    // ✅ these five states are named in the company's own impact stories
    states: ['Madhya Pradesh', 'Chhattisgarh', 'Odisha', 'Jharkhand', 'Telangana']
  },

  /* --- 11 · CONTACT ------------------------------------------------- */
  contact: {
    kicker: 'Request a kit',
    head: 'Tell us the volume. We will send the cards.',
    body: 'Kits are free. We will come back with a panel recommendation, a per-sample ' +
          'price and a collection schedule.',
    fields: [
      { n: 'name',   l: 'Name',                   t: 'text',   req: true },
      { n: 'org',    l: 'Hospital / laboratory',  t: 'text',   req: true },
      { n: 'email',  l: 'Email',                  t: 'email',  req: true },
      { n: 'phone',  l: 'Phone',                  t: 'tel',    req: false },
      { n: 'volume', l: 'Samples per month',      t: 'text',   req: false },
      { n: 'panel',  l: 'Panel of interest',      t: 'select', req: false }
    ],
    endpoint: '',                                       // 🟠 SLOT-19 form endpoint
    submit: 'Request kits'
  }
};
