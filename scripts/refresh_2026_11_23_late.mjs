import fs from 'node:fs';

const offersPath = new URL('../research/offers-2026-11-23.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(offersPath, 'utf8'));

const checked = '2026-11-23';
const removeIds = new Set([
  'mattamy-black-friday-fha-arm-nov29',
  'mattamy-black-friday-closing-nov29',
  'mattamy-black-friday-appliances-nov30',
]);
data.offers = data.offers.filter((offer) => !removeIds.has(offer.id));

data.offers.push(
  {
    id: 'mattamy-black-friday-fha-arm-nov29',
    b: 'Mattamy Homes',
    c: 'Black Friday · select Charlotte quick move-in homes',
    city: 'Charlotte metro, NC',
    counties: ['Mecklenburg', 'Union', 'York'],
    offer: '4.75% FHA 5/1 ARM · 6.43% APR',
    tags: ['rate'], kind: 'official',
    source: 'https://mattamyhomes.com/north-carolina/charlotte/promos/black-friday',
    sourceName: 'Mattamy Homes',
    detail: 'Mattamy Homes\' Black Friday promotion advertises a 4.75% starting rate and 6.43% APR on a 30-year FHA 5/1 ARM for select Charlotte quick move-in homes. The illustration uses a $472,000 purchase price, $463,450 loan, 3.5% down, a 640 median credit score, owner occupancy and upfront FHA mortgage insurance. The initial rate applies for 60 months, then may adjust annually using the 30-Day Average Treasury Rate index plus a 2.00% margin, with 1% first and annual caps and a 5% lifetime cap to 9.75%. Contracts must be entered November 23–29, 2026 and the eligible home must close by November 29. Buyers must pre-apply before submitting an offer, finance through Mattamy Home Funding and use the seller-selected closing agent. Rewrites, transfers and prior canceled contracts are excluded; no stacking is allowed except where expressly written in the purchase addendum.',
    checked, published: null, start: '2026-11-23', end: '2026-11-29', close: '2026-11-29',
    rate: 4.75, apr: 6.43, amount: null,
    loan: '30-year FHA 5/1 ARM · 3.5% down and 640 median score illustration · owner occupied · annual adjustments after month 60',
    lender: 'Mattamy Home Funding + seller-selected closing agent required',
    flags: ['move'],
    terms: 'Contract Nov. 23–29 · close by Nov. 29 · select QMI homes · 640 score and 3.5% down illustration · pre-apply before offer',
    access: 'Full current official promotion and legal terms reviewed November 23',
    extraSources: [], deadlineType: 'Contract deadline', tag: 'rate',
  },
  {
    id: 'mattamy-black-friday-closing-nov29',
    b: 'Mattamy Homes',
    c: 'Black Friday · select Charlotte quick move-in homes',
    city: 'Charlotte metro, NC',
    counties: ['Mecklenburg', 'Union', 'York'],
    offer: 'All closing costs covered, legally capped at 4% of purchase price · up to $1,176 HOA dues',
    tags: ['closing', 'rate'], kind: 'official',
    source: 'https://mattamyhomes.com/north-carolina/charlotte/promos/black-friday',
    sourceName: 'Mattamy Homes',
    detail: 'Mattamy\'s Black Friday headline says all closing costs are covered, including lender, title, government, appraisal and credit-report fees. The controlling legal terms cap the seller contribution at 4% of total purchase price and permit it to fund those costs, prepaids, discount points, a temporary buydown and up to one year of HOA dues capped at $1,176. Contracts must be entered November 23–29, 2026 and the home must close by November 29. Buyers must pre-apply before submitting an offer, finance through Mattamy Home Funding and use the seller-selected closing agent. Maximum contribution and underwriting limits apply; rewrites, transfers, prior canceled contracts and general stacking are excluded.',
    checked, published: null, start: '2026-11-23', end: '2026-11-29', close: '2026-11-29',
    rate: 4.75, apr: 6.43, amount: null,
    loan: 'Closing contribution may fund lender/title/government/appraisal/credit-report fees, prepaids, points, temporary buydown or up to $1,176 HOA dues',
    lender: 'Mattamy Home Funding + seller-selected closing agent required',
    flags: ['move'],
    terms: 'Contract Nov. 23–29 · close by Nov. 29 · headline says all closing costs, legally capped at 4% · HOA dues capped at $1,176',
    access: 'Full current official promotion and legal terms reviewed November 23',
    extraSources: [], deadlineType: 'Contract deadline', tag: 'closing',
  },
  {
    id: 'mattamy-black-friday-appliances-nov30',
    b: 'Mattamy Homes',
    c: 'Black Friday · select Charlotte quick move-in homes',
    city: 'Charlotte metro, NC',
    counties: ['Mecklenburg', 'Union', 'York'],
    offer: 'Washer + dryer + refrigerator package · $3,796 estimated retail value',
    tags: ['upgrade'], kind: 'official',
    source: 'https://mattamyhomes.com/north-carolina/charlotte/promos/black-friday',
    sourceName: 'Mattamy Homes',
    detail: 'Mattamy\'s separate Black Friday appliance incentive provides a refrigerator, washer and dryer package with an estimated retail value of $3,796 on eligible new Charlotte quick move-in contracts entered November 23–30, 2026 that close by December 31. The appliance incentive is distinct from the financing offer, is available to cash or financed buyers and does not require Mattamy Home Funding. Published appliance models may be substituted, and the package cannot be exchanged for cash or other options. Rewrites, transfers and prior canceled contracts are excluded.',
    checked, published: null, start: '2026-11-23', end: '2026-11-30', close: '2026-12-31',
    rate: null, apr: null, amount: 3796,
    loan: 'Cash or financed purchase; no loan type, rate, APR, score or down-payment condition stated',
    lender: 'No affiliated-lender requirement for the appliance incentive',
    flags: ['move'],
    terms: 'Contract Nov. 23–30 · close by Dec. 31 · select QMI homes · specified appliances · no cash substitution',
    access: 'Full current official promotion and legal terms reviewed November 23',
    extraSources: [], deadlineType: 'Contract deadline', tag: 'upgrade',
  },
);

const drh = data.offers.find((offer) => offer.id === 'drhorton-charlotte-community-status');
if (!drh) throw new Error('Missing D.R. Horton community status');
Object.assign(drh, {
  offer: 'Community update · 30 inventory communities · 259 inventory homes · regional directory 350 homes · Falls Cove Sold Out',
  terms: '30 inventory communities · 259 inventory homes · broader regional directory 350 homes · Falls Cove Sold Out · Ashenwood Commons Coming Soon',
  detail: 'D.R. Horton\'s current Charlotte inventory directory reports 30 communities and 259 homes for sale. Its separate regional directory reports 350 homes, labels Falls Cove Sold Out and Ashenwood Commons Coming Soon, and lists other active and final-opportunity communities. The site presents both official counts because they come from different builder directories; neither is inferred to represent sales. Community map locations remain based on builder-published addresses.',
  access: 'Current official Charlotte inventory directory reviewed late November 23; regional status directory reviewed November 23',
  checked,
});

const ids = data.offers.map((offer) => offer.id);
if (ids.length !== new Set(ids).size) throw new Error('Duplicate offer IDs after late refresh');
fs.writeFileSync(offersPath, `${JSON.stringify(data, null, 2)}\n`);

const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const reportId = '2026-11-23T23:55:56-05:00';
reviews.reports = reviews.reports.filter((report) => report.checked_at !== reportId);
reviews.reports.push({
  checked_at: reportId,
  title: 'Late November 23 builder-source refresh',
  summary: 'Mattamy launched a November 23–29 Black Friday FHA ARM and closing-cost window plus a separate appliance package through November 30. D.R. Horton inventory moved from 261 to 259 homes. M/I dates and all other established records remained supported.',
  items: [
    {id:'mattamy-black-friday-fha-arm-nov29',builder:'Mattamy Homes',community:'Select Charlotte quick move-ins',change:'new',offer:'4.75% FHA 5/1 ARM · 6.43% APR',details:'Contract Nov. 23–29 and close by Nov. 29; 3.5% down, 640-score illustration, owner occupancy, Mattamy Home Funding and seller-selected closing agent required.',source:'https://mattamyhomes.com/north-carolina/charlotte/promos/black-friday',source_name:'Mattamy Homes',evidence:'Current official promotion and legal terms.',checked_date:checked,deadline:'2026-11-29',publication_date:null,compared_to:'Expired Nov. 22 window.'},
    {id:'mattamy-black-friday-closing-nov29',builder:'Mattamy Homes',community:'Select Charlotte quick move-ins',change:'new',offer:'All closing costs covered, legally capped at 4%',details:'May include specified closing costs, prepaids, points, temporary buydown and up to $1,176 HOA dues; contract and close by Nov. 29.',source:'https://mattamyhomes.com/north-carolina/charlotte/promos/black-friday',source_name:'Mattamy Homes',evidence:'Current official promotion and legal terms.',checked_date:checked,deadline:'2026-11-29',publication_date:null,compared_to:'Expired Nov. 22 window.'},
    {id:'mattamy-black-friday-appliances-nov30',builder:'Mattamy Homes',community:'Select Charlotte quick move-ins',change:'new',offer:'Washer, dryer and refrigerator package · $3,796 estimated value',details:'Contract Nov. 23–30 and close by Dec. 31; cash or financed buyers; no affiliated-lender requirement.',source:'https://mattamyhomes.com/north-carolina/charlotte/promos/black-friday',source_name:'Mattamy Homes',evidence:'Current official promotion and legal terms.',checked_date:checked,deadline:'2026-11-30',publication_date:null,compared_to:'No active appliance-package card.'},
    {id:'drhorton-charlotte-community-status',builder:'D.R. Horton',community:'Charlotte-area inventory',change:'changed',offer:'30 inventory communities · 259 homes',details:'Official inventory count decreased from 261 to 259; no rate figures were inferred.',source:'https://www.drhorton.com/north-carolina/charlotte/inventory',source_name:'D.R. Horton',evidence:'Current official inventory directory.',checked_date:checked,deadline:null,publication_date:null,compared_to:'Earlier November 23 snapshot.'},
    {id:'mi-home-sweet-fha-arm-late-check',builder:'M/I Homes',community:'Charlotte metro',change:'unchanged',offer:'5.25% FHA fixed / 4.875% Conventional 7/6 ARM',details:'Contract by Dec. 1 and close by Dec. 31 remain current; static and client cards stay aligned.',source:'https://www.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/lower-monthly-payments-2026',source_name:'M/I Homes',evidence:'Current official financing page.',checked_date:checked,deadline:'2026-12-01',publication_date:null,compared_to:'Earlier November 23 snapshot.'},
  ],
});
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);


