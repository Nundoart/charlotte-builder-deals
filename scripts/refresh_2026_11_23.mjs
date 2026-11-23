import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-21.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-23.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

data.reviewed = '2026-11-23';
data.method = 'Current official builder pages and current search-indexed official builder listings only. Third-party claims are excluded; unavailable terms are not inferred. Official-source verification completed November 23, 2026.';

const byId = new Map(data.offers.map((offer) => [offer.id, offer]));
if (byId.size !== data.offers.length) throw new Error('Duplicate offer IDs detected');

const get = (id) => {
  const offer = byId.get(id);
  if (!offer) throw new Error(`Missing offer: ${id}`);
  return offer;
};
const verify = (id, access) => {
  const offer = get(id);
  offer.checked = '2026-11-23';
  if (access) offer.access = access;
  return offer;
};

// Taylor Morrison published a new November 23–December 15 finance window.
Object.assign(verify('taylor-charlotte-qmi-3875-arm-nov14'), {
  id: 'taylor-charlotte-qmi-3875-arm-dec15',
  start: '2026-11-23',
  end: '2026-12-15',
  close: '2026-12-31',
  offer: '3.875% Conventional 7/6 ARM · 5.218% APR',
  terms: 'Contract Nov. 23–Dec. 15 · close by Dec. 31 · 20% down and 780-score illustration · owner-occupied · no stacking',
  detail: "Taylor Morrison's current Charlotte promotion advertises a 3.875% Conventional 7/6 ARM with a 5.218% APR on select Charlotte-area quick move-in homes. The legal illustration assumes a $500,000 purchase price, $400,000 loan, 20% down and a 780 median credit score. The initial rate is fixed for 84 months, then may adjust every six months using the 30-day average SOFR index plus a 2.75% margin. Later adjustments are capped at one percentage point every six months, with a maximum lifetime rate of 8.875%. Eligible owner-occupied conventional contracts must be entered November 23 through December 15, 2026 and close by December 31. Buyers must pre-apply with Taylor Morrison Home Funding before submitting an offer and use the seller-selected closing agent. The offer may not be combined unless the purchase-agreement incentive addendum expressly allows it.",
  access: 'Full current official Charlotte promotion and legal terms reviewed November 23'
});

Object.assign(verify('taylor-charlotte-qmi-arm-nov30'), {
  id: 'taylor-charlotte-qmi-arm-dec15',
  start: '2026-11-23',
  end: '2026-12-15',
  close: '2027-01-15',
  offer: '3.25% year 1 · 4.25% years 2–7 Conventional 7/6 ARM · 5.49% APR · up to $7,000',
  terms: 'Contract Nov. 23–Dec. 15 · close by Jan. 15, 2027 · 20% down and 780-score illustration · up to $7,000 · no stacking',
  detail: "Taylor Morrison's current Charlotte promotion advertises a Conventional 7/6 ARM with a temporary payment buydown: 3.25% in year one and a 4.25% note rate for years two through seven, with a 5.49% APR. The legal illustration assumes a $500,000 purchase price, $400,000 loan, 20% down and a 780 median credit score. After 84 months the rate may adjust every six months using the 30-day average SOFR index plus a 2.75% margin, with a 9.25% lifetime maximum. Seller may contribute up to $7,000 toward the temporary buydown, discount points, eligible HOA dues, closing costs or prepaids. Eligible owner-occupied quick move-in contracts must be entered November 23 through December 15, 2026 and close by January 15, 2027. Taylor Morrison Home Funding and the seller-selected closing agent are required; no general stacking is allowed unless expressly documented.",
  access: 'Full current official Charlotte promotion and legal terms reviewed November 23'
});

Object.assign(verify('taylor-charlotte-fixed-nov30'), {
  id: 'taylor-charlotte-fixed-dec15',
  start: '2026-11-23',
  end: '2026-12-15',
  close: '2027-08-30',
  offer: '5.49% Conventional fixed · 5.60% APR · up to $6,000 toward closing / points / HOA',
  terms: 'Contract Nov. 23–Dec. 15 · close by Aug. 30, 2027 · 20% down and 780-score illustration · minimum $225,000 loan',
  detail: "Taylor Morrison's current Charlotte promotion advertises a 5.49% Conventional 30-year fixed rate with a 5.60% APR and an extended nine-month rate lock on select to-be-built homes. The legal illustration assumes a $500,000 purchase price, $400,000 loan, 20% down and a 780 median credit score; the minimum loan amount is $225,000. Seller may contribute up to $6,000 toward discount points, eligible HOA dues, closing costs or prepaids. Eligible owner-occupied contracts must be entered November 23 through December 15, 2026 and close by August 30, 2027. Taylor Morrison Home Funding and the seller-selected closing agent are required. The legal terms say the offer may be added only where a separate purchase-agreement incentive addendum permits it.",
  access: 'Full current official Charlotte promotion and legal terms reviewed November 23'
});

Object.assign(verify('taylor-charlotte-qmi-price-dec31'), {
  start: '2026-11-23',
  end: '2026-12-31',
  close: '2026-12-31',
  deadlineType: 'Closing deadline',
  terms: 'Up to $50,000 already reflected in price · new contracts from Nov. 23 · close by Dec. 31 · no lender requirement',
  detail: "Taylor Morrison's current Charlotte promotion identifies price reductions of up to $50,000 on select quick move-in homes. The reductions are already reflected in advertised prices and are not an additional cash credit. Cash and financed buyers may qualify with any lender; active contracts written before November 23 are excluded. Eligible homes must close by December 31, 2026. The public legal text does not state a separate contract-end date or general stacking rule, so those terms remain unavailable.",
  access: 'Full current official Charlotte promotion and legal terms reviewed November 23'
});

verify('taylor-coves-flex-cash-nov30', 'Current official community promotion reviewed November 23');
verify('taylor-charlotte-community-status', 'Current official Charlotte market directory and two sold-out community pages reviewed November 23');

// The November 22 Lennar and Mattamy windows remain published only as ended legal periods.
for (const id of [
  'lennar-black-friday-nov16-nov22-rate',
  'mattamy-14-days-fha-arm-nov22',
  'mattamy-14-days-closing-nov22'
]) verify(id, 'Official promotion page reviewed November 23; advertised contract period ended November 22 and no replacement was verified');

// M/I contract dates remain December 1 / December 31 and are shared by static and client cards.
for (const id of ['mi-home-sweet-fha', 'mi-home-sweet-arm', 'mi-holiday-of-homes-closing-dec1']) {
  verify(id, 'Full current official M/I Charlotte financing page and legal terms reviewed November 23');
}

// D.R. Horton no longer reproduces the prior numeric FHA/VA ARM terms on a current Charlotte page.
for (const id of ['drhorton-charlotte-fha-arm-dec31', 'drhorton-charlotte-va-arm-dec31']) {
  const offer = verify(id, 'Current official Charlotte pages reviewed November 23; prior numeric rate and APR are no longer reproduced');
  offer.kind = 'unavailable';
  offer.offer = `Unavailable: prior ${offer.offer} no longer reproduced`;
  offer.end = null;
  offer.close = null;
  offer.terms = 'Current Charlotte pages advertise limited-time special-interest-rate opportunities, but exact rate, APR, lender conditions and deadlines are unavailable';
}

Object.assign(verify('drhorton-charlotte-community-status'), {
  offer: 'Community update · 30 inventory communities · 261 inventory homes · regional directory 350 homes · Falls Cove Sold Out',
  terms: '30 inventory communities · 261 inventory homes · broader regional directory 350 homes · Falls Cove Sold Out · Ashenwood Commons Coming Soon',
  detail: "D.R. Horton's current Charlotte inventory directory reports 30 communities and 261 homes for sale. Its separate regional directory reports 350 homes, labels Falls Cove Sold Out and Ashenwood Commons Coming Soon, and lists other active and final-opportunity communities. The site presents both official counts because they come from different builder directories; neither is inferred to represent sales. Community map locations remain based on builder-published addresses.",
  access: 'Current official Charlotte inventory and regional directories reviewed November 23'
});

data.offers.push({
  id: 'drhorton-charlotte-special-rate-current-nov23',
  b: 'D.R. Horton',
  c: 'Select Charlotte-area homes',
  city: 'Charlotte metro, NC',
  counties: ['Mecklenburg', 'Iredell', 'Gaston', 'Union', 'York'],
  offer: 'Limited-time special interest rate · exact rate and APR unavailable',
  tags: ['rate'],
  kind: 'official',
  source: 'https://www.drhorton.com/north-carolina/charlotte/huntersville/oak-grove-hill?sat=open',
  sourceName: 'D.R. Horton',
  detail: "Current D.R. Horton Charlotte community pages display a limited-time special-interest-rate opportunity on select homes and a separate conventional ARM promotion, but the reviewed public pages do not reproduce a numeric note rate, APR, lender requirement, credit-score threshold, down payment, contract deadline, closing deadline or stacking rules. Those terms are marked unavailable rather than carried forward from older disclosures.",
  checked: '2026-11-23', published: null, start: null, end: null, close: null,
  rate: null, apr: null, amount: null,
  loan: 'Current Charlotte pages reference special-interest-rate and conventional ARM opportunities; exact program unavailable',
  lender: 'Unavailable on reviewed current page',
  flags: ['move'],
  terms: 'Select homes · current special-rate opportunity · exact rate, APR, lender, score, down payment and deadlines unavailable',
  access: 'Current official Charlotte community page reviewed November 23',
  extraSources: [{name: 'D.R. Horton Charlotte', url: 'https://www.drhorton.com/north-carolina/charlotte', note: 'Current regional community and status directory'}],
  deadlineType: 'Offer deadline', tag: 'rate'
});

data.offers.push({
  id: 'lennar-charlotte-community-status-nov23',
  b: 'Lennar',
  c: 'Charlotte market communities',
  city: 'Charlotte metro · NC & SC',
  counties: [],
  offer: 'Community update · 23 communities · 153 available homes',
  tags: ['status'], kind: 'official',
  source: 'https://www.lennar.com/new-homes/north-carolina/charlotte', sourceName: 'Lennar',
  detail: "Lennar's current official Charlotte market page reports 23 communities and 153 available homes. It still links to the Black Friday promotion whose legal contract window ended November 22, so that financing card is hidden from the current comparison and no replacement terms are inferred. The community count is a current builder-directory snapshot, not a sales count.",
  checked: '2026-11-23', published: null, start: null, end: null, close: null,
  rate: null, apr: null, amount: null, loan: 'Community-status record only', lender: 'Not applicable',
  flags: [], terms: '23 communities · 153 available homes · no current replacement financing window verified',
  access: 'Current official Charlotte market directory reviewed November 23', extraSources: [],
  deadlineType: 'Status checked', tag: 'status'
});

data.offers.push({
  id: 'eastwood-charlotte-community-status-nov23',
  b: 'Eastwood Homes', c: 'Charlotte division communities', city: 'Charlotte metro · NC & SC', counties: [],
  offer: 'Community update · 24 communities · 100 move-in-ready homes · 158 floorplan options',
  tags: ['status'], kind: 'official', source: 'https://www.eastwoodhomes.com/division/charlotte', sourceName: 'Eastwood Homes',
  detail: "Eastwood Homes' current Charlotte division page reports 24 communities, 100 move-in-ready homes and 158 floorplan options. It labels communities such as Bryton Crossing, Caldwell Forest and Enclave at Riverdale Now Selling, while Johnston Park Townhomes, Byrds Landing Townhomes and Alexander Landing are Coming Soon. The reviewed directory does not publish a complete sold-out history, so none is inferred from absence.",
  checked: '2026-11-23', published: null, start: null, end: null, close: null,
  rate: null, apr: null, amount: null, loan: 'Community-status record only', lender: 'Not applicable',
  flags: [], terms: '24 communities · 100 move-in-ready homes · 158 floorplan options · current Now Selling and Coming Soon labels',
  access: 'Current official Charlotte division directory reviewed November 23', extraSources: [],
  deadlineType: 'Status checked', tag: 'status'
});

for (const id of [
  'eastwood-big-red-bow-rates-dec31', 'eastwood-big-red-bow-design-dec31',
  'eastwood-big-red-bow-package-dec31', 'eastwood-big-red-bow-bow-bucks-21k',
  'tripointe-charlotte-399-first-year', 'tripointe-fha-4000-321-nov30',
  'tripointe-conventional-4490-321-nov30', 'tripointe-millstone-40k-current',
  'tripointe-seven-oaks-50k', 'tripointe-ascend-55k', 'tripointe-bellflower-40k',
  'tripointe-context-30k', 'tripointe-grahym-30k', 'tripointe-amplitude-7500',
  'tripointe-ross-farms-65k-current', 'tripointe-ellis-townes-25k-current',
  'tripointe-camryn-30k-current', 'tripointe-old-town-village-10k-current',
  'tripointe-charlotte-community-status-nov20',
  'smith-charlotte-community-status-current', 'smith-charlotte-inventory-475-arm-55-fixed',
  'smith-charlotte-arm-current', 'true-preferred-lender-credit',
  'true-charlotte-community-status-current', 'david-weekley-anniversary-40k-november',
  'david-weekley-preferred-lender-5k', 'david-weekley-charlotte-city-status-nov20',
  'meritage-charlotte-flex-cash-current-nov20', 'pulte-mallard-park-arm',
  'pulte-mallard-park-choice-20k', 'pulte-hometown-heroes',
  'drb-charlotte-community-status-current'
]) verify(id);

const ids = data.offers.map((offer) => offer.id);
if (ids.length !== new Set(ids).size) throw new Error('Duplicate offer IDs after refresh');
fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);

const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
reviews.reports.push({
  checked_at: '2026-11-23T00:00:17-05:00',
  summary: 'November 23 official-source refresh: Taylor Morrison opened three replacement finance windows through December 15. Lennar and Mattamy November 22 windows ended with no verified replacement and are hidden by default. D.R. Horton inventory changed to 261 homes across 30 inventory communities; its older numeric FHA/VA ARM disclosures are no longer reproduced, so exact current rate terms are marked unavailable. M/I December 1 contract deadlines remain intact. Other established builders were rechecked with no material incentive or community-status change.',
  items: [
    {id:'taylor-charlotte-qmi-3875-arm-dec15',builder:'Taylor Morrison',community:'Select Charlotte quick move-in homes',change:'changed',offer:'3.875% Conventional 7/6 ARM · 5.218% APR',details:'New official contract window November 23–December 15; close by December 31. Illustration uses 20% down and 780 median score; Taylor Morrison Home Funding and seller-selected closing agent required.',source:'https://www.taylormorrison.com/make-moves/charlotte',source_name:'Taylor Morrison',evidence:'Full current official promotion and legal terms reviewed.',checked_date:'2026-11-23',deadline:'Contract 2026-12-15; close 2026-12-31',publication_date:null,compared_to:'November 21 published comparison.'},
    {id:'taylor-charlotte-qmi-arm-dec15',builder:'Taylor Morrison',community:'Select Charlotte quick move-in homes',change:'changed',offer:'3.25% year one · 4.25% years two–seven · 5.49% APR · up to $7,000',details:'New official contract window November 23–December 15; close by January 15, 2027. Affiliated lender and seller-selected closing agent required.',source:'https://www.taylormorrison.com/make-moves/charlotte',source_name:'Taylor Morrison',evidence:'Full current official promotion and legal terms reviewed.',checked_date:'2026-11-23',deadline:'Contract 2026-12-15; close 2027-01-15',publication_date:null,compared_to:'November 21 published comparison.'},
    {id:'taylor-charlotte-fixed-dec15',builder:'Taylor Morrison',community:'Select Charlotte to-be-built homes',change:'changed',offer:'5.49% Conventional fixed · 5.60% APR · up to $6,000',details:'New official contract window November 23–December 15; close by August 30, 2027. Minimum loan $225,000; affiliated lender and seller-selected closing agent required.',source:'https://www.taylormorrison.com/make-moves/charlotte',source_name:'Taylor Morrison',evidence:'Full current official promotion and legal terms reviewed.',checked_date:'2026-11-23',deadline:'Contract 2026-12-15; close 2027-08-30',publication_date:null,compared_to:'November 21 published comparison.'},
    {id:'lennar-black-friday-nov16-nov22-rate',builder:'Lennar',community:'Select greater-Charlotte homes',change:'expired',offer:'Prior 4.375% FHA 5/1 ARM and $7,500 credit window ended',details:'Official legal window ended November 22. Current market page still links to the ended page; no replacement terms verified.',source:'https://www.lennar.com/new-homes/north-carolina/charlotte/promo/gallen_blackfriday26',source_name:'Lennar',evidence:'Official promotion and market pages reviewed.',checked_date:'2026-11-23',deadline:'Expired 2026-11-22',publication_date:null,compared_to:'November 21 published comparison.'},
    {id:'mattamy-14-days-fha-arm-nov22',builder:'Mattamy Homes',community:'Select Charlotte quick move-in homes',change:'expired',offer:'Prior 4.75% FHA 5/1 ARM and up-to-4% closing-cost window ended',details:'Official legal window ended November 22. No replacement Charlotte promotion was verified.',source:'https://mattamyhomes.com/north-carolina/charlotte/promos/nov',source_name:'Mattamy Homes',evidence:'Official promotion page and legal terms reviewed.',checked_date:'2026-11-23',deadline:'Expired 2026-11-22',publication_date:null,compared_to:'November 21 published comparison.'},
    {id:'drhorton-charlotte-community-status',builder:'D.R. Horton',community:'Charlotte regional communities',change:'changed',offer:'30 inventory communities · 261 inventory homes; broader directory 350 homes',details:'Official inventory and regional directories publish different current scopes. Falls Cove remains Sold Out and Ashenwood Commons Coming Soon.',source:'https://www.drhorton.com/north-carolina/charlotte/inventory',source_name:'D.R. Horton',evidence:'Current official inventory and regional directories reviewed.',checked_date:'2026-11-23',deadline:null,publication_date:null,compared_to:'November 21 count of 264 inventory homes.'},
    {id:'drhorton-charlotte-special-rate-current-nov23',builder:'D.R. Horton',community:'Select Charlotte-area homes',change:'changed',offer:'Current limited-time special rate; numeric terms unavailable',details:'Current official pages advertise a rate opportunity but do not reproduce the prior numeric FHA/VA rates or complete legal terms. Exact values are not carried forward.',source:'https://www.drhorton.com/north-carolina/charlotte/huntersville/oak-grove-hill?sat=open',source_name:'D.R. Horton',evidence:'Current official community page reviewed.',checked_date:'2026-11-23',deadline:null,publication_date:null,compared_to:'Older numeric rate records.'},
    {id:'mi-home-sweet-fha',builder:'M/I Homes',community:'Select Charlotte quick move-in homes',change:'unchanged',offer:'5.25% FHA fixed · 6.039% APR',details:'Contract by December 1 and close by December 31 remain current. Static and client cards use the same dates.',source:'https://www.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/lower-monthly-payments-2026',source_name:'M/I Homes',evidence:'Full current official page and legal terms reviewed.',checked_date:'2026-11-23',deadline:'Contract 2026-12-01; close 2026-12-31',publication_date:null,compared_to:'November 21 published comparison.'},
    {id:'coverage-established-builders-nov23',builder:'Established coverage',community:'Charlotte metro',change:'unchanged',offer:'Eastwood, Tri Pointe, Smith Douglas, True Homes, David Weekley, Meritage, Pulte and DRB rechecked',details:'Current official offer and community pages did not support a material incentive or status change beyond the records listed above. Missing deadlines and qualification terms remain unavailable.',source:'https://www.eastwoodhomes.com/special-offers',source_name:'Official builder pages',evidence:'Current official pages and indexed official listings reviewed November 23.',checked_date:'2026-11-23',deadline:null,publication_date:null,compared_to:'November 21 published comparison.'}
  ]
});
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
