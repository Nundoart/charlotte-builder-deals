import fs from 'node:fs';

const offersPath = new URL('../research/offers-2026-11-23.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(offersPath, 'utf8'));
const checked = '2026-11-25';

const byId = (id) => {
  const offer = data.offers.find((item) => item.id === id);
  if (!offer) throw new Error(`Missing offer: ${id}`);
  return offer;
};

data.reviewed = checked;

// Preserve the exact M/I contract and closing dates across the source data that
// feeds both the static cards and the client-side comparison.
for (const id of ['mi-home-sweet-fha', 'mi-home-sweet-arm']) {
  Object.assign(byId(id), {
    checked,
    end: '2026-12-01',
    close: '2026-12-31',
    access: 'Current official M/I Homes financing page reverified late November 25',
  });
}

const lennarId = 'lennar-black-friday-nov23-nov29-rate';
const lennarOffer = {
  id: lennarId,
  b: 'Lennar',
  c: 'Black Friday Sales Event · select greater-Charlotte homes',
  city: 'Charlotte metro · NC & SC',
  counties: [],
  offer: '4.375% FHA 5/1 ARM · 7.454% APR + up to $7,500 closing costs',
  tags: ['rate', 'closing'],
  kind: 'official',
  source: 'https://www.lennar.com/new-homes/north-carolina/charlotte/promo/gallen_blackfriday26',
  sourceName: 'Lennar',
  detail: 'Lennar\'s current Charlotte Black Friday offer advertises a 4.375% FHA 5/1 adjustable-rate mortgage with a 7.454% APR plus up to $7,500 toward closing costs on select greater-Charlotte homes. The initial rate is fixed for five years and may adjust annually beginning in year six. The published illustration uses a $320,000 home price, at least 3.5% down, a 680 minimum credit score, owner occupancy and applicable FHA loan limits. Buyers must sign and deliver a purchase agreement from November 23 through November 29, 2026, close and fully fund by January 25, 2027, and finance through Lennar Mortgage. The closing credit excludes prepaids and remains subject to legal seller-contribution limits, including North Carolina\'s 3% affiliated-lender limit. The rate and credit cannot be combined with another promotion, are subject to limited funds and may change or be withdrawn.',
  checked,
  published: null,
  start: '2026-11-23',
  end: '2026-11-29',
  close: '2027-01-25',
  rate: 4.375,
  apr: 7.454,
  amount: 7500,
  loan: 'FHA 5/1 ARM · 3.5% down · 680 minimum score · owner occupied · adjusts annually after year five',
  lender: 'Lennar Mortgage required for the rate and closing-cost credit; not required to purchase',
  flags: ['move'],
  terms: 'Contract Nov. 23–29 · close and fund by Jan. 25, 2027 · select homes · limited funds · no stacking',
  access: 'Current official Charlotte promotion surface and published builder terms reviewed late November 25',
  extraSources: [
    {
      name: 'Lennar Charlotte market',
      url: 'https://www.lennar.com/new-homes/north-carolina/charlotte',
      note: 'Current official market page links the active Black Friday offer and reports current inventory',
    },
  ],
  deadlineType: 'Contract deadline',
  tag: 'rate',
};
const existingLennarIndex = data.offers.findIndex((item) => item.id === lennarId);
if (existingLennarIndex >= 0) data.offers[existingLennarIndex] = lennarOffer;
else data.offers.push(lennarOffer);

Object.assign(byId('lennar-charlotte-community-status-nov23'), {
  checked,
  detail: 'Lennar\'s current official Charlotte market page reports 23 communities and 153 available homes and links the active November 23–29 Black Friday promotion. The market counts are current builder-directory snapshots, not sales totals. The current financing and closing-cost terms are listed separately so the status card does not duplicate the promotion.',
  terms: '23 communities · 153 available homes · active Black Friday terms listed separately',
  access: 'Current official Charlotte market directory and offer surface reviewed late November 25',
});

Object.assign(byId('david-weekley-charlotte-city-status-nov20'), {
  checked,
  offer: 'Community update · 3 Now Selling · 3 Coming Soon · 1 Final Opportunities',
  detail: 'David Weekley\'s current official Charlotte directory labels Central Living at Craig, The River District – Excursion Collection and Westwood Reserve as Now Selling; Brightside Townes, McAlpine Place and The Retreat at Steele Creek as Coming Soon; and The River District – Pioneer Collection as Final Opportunities. No Charlotte-city community on the current directory is labeled Sold Out, and none is inferred from absence.',
  terms: '3 Now Selling · 3 Coming Soon · 1 Final Opportunities · no Sold Out label in the current Charlotte-city directory',
  access: 'Current official Charlotte directory reviewed late November 25',
});

Object.assign(byId('drhorton-charlotte-community-status'), {
  checked,
  offer: 'Community update · 30 inventory communities · 258 inventory homes · regional directory 350 homes · Falls Cove Sold Out',
  detail: 'D.R. Horton\'s current Charlotte inventory directory reports 30 communities and 258 homes for sale. Its separate regional directory reports 350 homes, labels Falls Cove Sold Out and Ashenwood Commons Coming Soon, and lists other Now Selling, New Model Open and Final Opportunities communities. Both official counts are preserved because the builder presents them on different directory views; neither is treated as a sales total. Community map locations remain based on builder-published addresses.',
  terms: '30 inventory communities · 258 inventory homes · broader regional directory 350 homes · Falls Cove Sold Out · Ashenwood Commons Coming Soon',
  access: 'Current official Charlotte inventory and regional status directories reviewed late November 25',
});

Object.assign(byId('pulte-mallard-park-arm'), {
  checked,
  offer: '4.990% Conventional 7/6 ARM · 5.968%–6.013% APR · up to $20,000 savings',
  detail: 'Pulte\'s current official Mallard Park inventory displays a 4.990% Conventional 7/6 ARM on select quick move-ins. Current homesite examples range from 5.968% to 6.013% APR, with price savings of up to $20,000. The rate is fixed for seven years and then adjusts every six months. Pulte\'s financing disclosure identifies a Pulte Mortgage Builder Forward Commitment, a 780 FICO illustration and application of available incentives toward closing costs and discount points. Pulte Mortgage is required for the BFC rate but not to purchase. A universal contract deadline, closing deadline, adjustment caps, index, margin, owner-occupancy rule and stacking terms remain unavailable.',
  apr: 5.968,
  terms: 'Select quick move-ins · current APR varies by homesite from 5.968% to 6.013% · Pulte Mortgage/BFC · deadlines and stacking unavailable',
  access: 'Current official Mallard Park inventory and financing disclosures reviewed late November 25',
});
byId('pulte-mallard-park-choice-20k').checked = checked;

Object.assign(byId('tripointe-charlotte-community-status-nov20'), {
  checked,
  offer: 'Community update · 15 available communities · 68 available homes',
  detail: 'Tri Pointe\'s current official Charlotte market directory reports 15 available communities, 68 available homes and 37 ready-to-build floorplans. The directory labels current communities such as Amplitude, Ellis Townes and Grahym at Southbridge as Now Selling and Southmont as Coming Soon. It does not publish a complete sold-out-community history, so no sold-out status is inferred from absence.',
  terms: '15 available communities · 68 available homes · 37 ready-to-build floorplans',
  access: 'Current official Charlotte market directory reviewed late November 25',
});

Object.assign(byId('drb-charlotte-fha-arm-current'), {
  kind: 'official',
  offer: '4.99% FHA 5/1 ARM · 6.679% APR',
  detail: 'DRB Homes\' current official Charlotte regional financing disclosure advertises a 4.99% FHA 5/1 ARM with a 6.679% APR through Acrisure Mortgage on select homes. The published illustration uses a $400,000 price, $392,755 loan, 3.5% down and a 640 FICO score. The initial rate is fixed for five years, then adjusts annually using the one-year Treasury CMT plus a 2% margin. The first and periodic adjustment caps are one percentage point and the lifetime cap is five percentage points, for a 9.99% maximum rate. The builder-funded government-loan commitment is subject to funds, full underwriting approval and a completed rate lock. Buyers must close before the forward commitment expires, but the public disclosure does not state that expiration date, a contract deadline, exact eligible homes or stacking terms; those fields remain unavailable.',
  checked,
  end: null,
  close: null,
  rate: 4.99,
  apr: 6.679,
  amount: null,
  loan: 'FHA 30-year 5/1 ARM · 3.5% down and 640 FICO illustration · annual adjustments after year five',
  lender: 'Acrisure Mortgage required for the advertised forward-commitment rate',
  terms: 'Select homes · subject to funds, full approval and rate lock · commitment expiration, contract deadline and stacking unavailable',
  access: 'Full current official Charlotte regional page and restored financing disclosure reviewed late November 25',
  deadlineType: 'Offer deadline',
});

Object.assign(byId('true-preferred-lender-credit'), {
  kind: 'historical',
  source: 'https://www.truehomes.com/faqs',
  offer: 'Unavailable: prior $2,000 preferred-lender credit no longer reproduced',
  detail: 'True Homes\' current official FAQ financing paragraph lists preferred-lender benefits but no longer reproduces the prior $2,000 lender credit toward closing costs or cash to close. Removal from the current page is not proof of cancellation or loss of a benefit already secured by a buyer. Current credit amount, eligible communities, lender requirement, note rate, APR, loan type, score, down payment, contract deadline, closing deadline and stacking terms are unavailable. The prior amount is retained only in audit history and excluded from the live comparison.',
  checked,
  rate: null,
  apr: null,
  amount: null,
  loan: 'Current promotional loan terms unavailable',
  lender: 'Current offer-specific preferred-lender requirement unavailable',
  terms: 'Prior $2,000 paragraph no longer reproduced · current amount and deadlines unavailable',
  access: 'Full current official FAQ financing paragraph reviewed late November 25; prior credit text absent',
  deadlineType: 'Last reproduced',
});

for (const id of [
  'mattamy-black-friday-fha-arm-nov29',
  'mattamy-black-friday-closing-nov29',
  'mattamy-black-friday-appliances-nov30',
  'eastwood-charlotte-closing-costs',
  'eastwood-charlotte-move-in-package',
  'eastwood-charlotte-free-blinds',
  'eastwood-charlotte-appliance-package-11-current',
  'eastwood-big-red-bow-rates-dec31',
  'eastwood-big-red-bow-design-dec31',
  'eastwood-big-red-bow-package-dec31',
  'eastwood-big-red-bow-bryton-dec31',
  'smith-charlotte-community-status-current',
  'smith-paw-vip-pricing-current',
  'true-charlotte-community-status-current',
  'drb-charlotte-community-status-current',
  'taylor-charlotte-qmi-arm-dec15',
  'taylor-charlotte-fixed-dec15',
  'taylor-charlotte-qmi-3875-arm-dec15',
  'tripointe-charlotte-399-first-year',
  'tripointe-fha-4000-321-nov30',
  'tripointe-conventional-4490-321-nov30',
]) {
  byId(id).checked = checked;
}

const ids = data.offers.map((offer) => offer.id);
if (ids.length !== new Set(ids).size) throw new Error('Duplicate offer IDs after late November 25 refresh');
fs.writeFileSync(offersPath, `${JSON.stringify(data, null, 2)}\n`);

const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const reportId = '2026-11-25T23:57:15-05:00';
reviews.reports = reviews.reports.filter((report) => report.checked_at !== reportId);
reviews.reports.push({
  checked_at: reportId,
  title: 'Late November 25 builder-source refresh',
  summary: 'Lennar opened a new November 23–29 Charlotte Black Friday window at 4.375% / 7.454% APR with up to $7,500 closing costs. DRB restored a 4.99% FHA 5/1 ARM / 6.679% APR disclosure, while True Homes no longer reproduces its prior $2,000 lender-credit paragraph. David Weekley changed McAlpine Place to Coming Soon, D.R. Horton inventory moved from 259 to 258 homes, Tri Pointe moved from 16 to 15 available communities, and Pulte Mallard Park homesite APR examples now span 5.968%–6.013%. M/I dates remain December 1 contract and December 31 closing on both FHA and ARM cards.',
  items: [
    {id:lennarId,builder:'Lennar',community:'Greater Charlotte',change:'changed',offer:'4.375% FHA 5/1 ARM · 7.454% APR + up to $7,500 closing costs',details:'New November 23–29 purchase-agreement window; close and fully fund by January 25, 2027. Lennar Mortgage, 3.5% down, 680 minimum score and owner occupancy apply.',source:lennarOffer.source,source_name:'Lennar',evidence:'Current official Charlotte market offer surface and published builder terms reviewed.',checked_date:checked,deadline:'Contract 2026-11-29; close/fund 2027-01-25',publication_date:null,compared_to:'Prior November 16–22 Lennar window'},
    {id:'david-weekley-charlotte-city-status-nov20',builder:'David Weekley Homes',community:'Charlotte city communities',change:'changed',offer:'3 Now Selling · 3 Coming Soon · 1 Final Opportunities',details:'McAlpine Place is now Coming Soon; Central Living at Craig, River District Excursion and Westwood Reserve remain Now Selling. No current Charlotte-city directory card is labeled Sold Out.',source:'https://www.davidweekleyhomes.com/new-homes/nc/charlotte/charlotte',source_name:'David Weekley Homes',evidence:'Current official directory reviewed.',checked_date:checked,deadline:null,publication_date:null,compared_to:'Prior 4 Now Selling · 2 Coming Soon · 1 Final Opportunities'},
    {id:'drhorton-charlotte-community-status',builder:'D.R. Horton',community:'Charlotte market',change:'changed',offer:'30 inventory communities · 258 inventory homes',details:'Inventory count decreased by one; regional directory still reports 350 homes, Falls Cove Sold Out and Ashenwood Commons Coming Soon.',source:'https://www.drhorton.com/north-carolina/charlotte/inventory',source_name:'D.R. Horton',evidence:'Current official inventory and regional directories reviewed.',checked_date:checked,deadline:null,publication_date:null,compared_to:'Prior 259 inventory homes'},
    {id:'tripointe-charlotte-community-status-nov20',builder:'Tri Pointe Homes',community:'Charlotte market',change:'changed',offer:'15 available communities · 68 available homes · 37 floorplans',details:'Available-community count decreased from 16 to 15; the official directory still reports 68 homes and 37 ready-to-build floorplans.',source:'https://www.tripointehomes.com/find-your-home/nc/charlotte',source_name:'Tri Pointe Homes',evidence:'Current official market directory reviewed.',checked_date:checked,deadline:null,publication_date:null,compared_to:'Prior 16 available communities'},
    {id:'pulte-mallard-park-arm',builder:'Pulte Homes',community:'Mallard Park',change:'changed',offer:'4.990% Conventional 7/6 ARM · 5.968%–6.013% APR',details:'Current homesite examples now span 5.968%–6.013% APR and show up to $20,000 in savings. Universal deadlines and stacking terms remain unavailable.',source:'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379',source_name:'Pulte Homes',evidence:'Current official community inventory and financing disclosure reviewed.',checked_date:checked,deadline:null,publication_date:null,compared_to:'Prior narrower APR range'},
    {id:'drb-charlotte-fha-arm-current',builder:'DRB Homes',community:'Select Charlotte-region homes',change:'changed',offer:'4.99% FHA 5/1 ARM · 6.679% APR',details:'The current regional disclosure again publishes the Acrisure Mortgage FHA 5/1 ARM. The illustration uses 3.5% down and a 640 FICO score; the exact forward-commitment expiration, contract deadline, eligible homes and stacking terms remain unavailable.',source:'https://www.drbhomes.com/drbhomes/find-your-home/communities/north-carolina/charlotte',source_name:'DRB Homes',evidence:'Full current official regional page and restored financing disclosure reviewed.',checked_date:checked,deadline:'Close before an unspecified forward-commitment expiration',publication_date:null,compared_to:'Prior historical/unavailable rate record'},
    {id:'true-preferred-lender-credit',builder:'True Homes',community:'Eligible communities unspecified',change:'changed',offer:'Prior $2,000 preferred-lender credit no longer reproduced',details:'The current FAQ financing paragraph lists preferred-lender benefits but omits the prior credit. Removal is not treated as proof of cancellation; current amount, eligibility, financing terms and deadlines are unavailable and the card is excluded from the live comparison.',source:'https://www.truehomes.com/faqs',source_name:'True Homes',evidence:'Full current official FAQ financing paragraph reviewed; prior credit text absent.',checked_date:checked,deadline:null,publication_date:null,compared_to:'Prior active $2,000 credit card'},
    {id:'mi-static-client-consistency-nov25-late',builder:'M/I Homes',community:'Charlotte metro',change:'unchanged',offer:'5.25% FHA fixed / 4.875% Conventional 7/6 ARM · up to 3% closing costs',details:'Both financing cards retain the December 1 contract deadline and December 31 closing deadline; static and client filtering use the same source record.',source:'https://www.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/home-sweet-savings-2026',source_name:'M/I Homes',evidence:'Current official terms reverified.',checked_date:checked,deadline:'Contract 2026-12-01; close 2026-12-31',publication_date:null,compared_to:'Earlier November 25 review'},
  ],
});
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
