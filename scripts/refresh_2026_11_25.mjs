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

// Keep M/I's current FHA and ARM dates identical in the source data used by both
// the server-rendered cards and the client-side comparison.
for (const id of ['mi-home-sweet-fha', 'mi-home-sweet-arm']) {
  Object.assign(byId(id), {
    checked,
    end: '2026-12-01',
    close: '2026-12-31',
    deadlineType: 'Contract deadline',
    access: 'Current official M/I Homes financing page reviewed November 25',
  });
}

for (const id of [
  'mattamy-black-friday-fha-arm-nov29',
  'mattamy-black-friday-closing-nov29',
  'mattamy-black-friday-appliances-nov30',
]) {
  byId(id).checked = checked;
  byId(id).access = 'Current official promotion and legal terms reviewed November 25';
}

Object.assign(byId('eastwood-big-red-bow-rates-dec31'), {
  checked,
  access: 'Full current official Specials page reviewed November 25',
});
Object.assign(byId('eastwood-big-red-bow-design-dec31'), {
  checked,
  access: 'Full current official Specials page reviewed November 25',
});

Object.assign(byId('eastwood-charlotte-closing-costs'), {
  c: 'Chasewood · Enclave at Riverdale',
  offer: 'Chasewood up to $5,000 closing costs · Enclave at Riverdale up to $3,500',
  detail: 'Eastwood\'s current official Specials page advertises up to $5,000 toward closing costs on select Chasewood homes and a separate up-to-$3,500 closing-cost panel for select Enclave at Riverdale homes. The prior broad Robinson Oaks and Carrington tiers are no longer reproduced on the current page and are not carried forward. The page does not publish a promotional rate, APR, loan type, score, down payment, contract deadline, closing deadline, exact eligible-home list or stacking rule for these two panels. No omitted term is inferred.',
  checked,
  amount: 5000,
  loan: 'No promotional rate, APR, loan type, score or down-payment requirement stated',
  lender: 'Current panels do not identify a required lender',
  terms: 'Select Chasewood and Enclave at Riverdale homes · deadlines, eligible homes and stacking unavailable',
  access: 'Full current official Specials page reviewed November 25',
  extraSources: [],
});

Object.assign(byId('eastwood-charlotte-move-in-package'), {
  c: '8 Charlotte-area communities',
  offer: 'Refrigerator + washer/dryer + blinds package',
  detail: 'Eastwood\'s current official Specials page advertises a move-in package consisting of a side-by-side refrigerator, washer and dryer, and window blinds on select homes in eight Charlotte-area communities: Norman Creek Townhomes, Caldwell Forest, Ashton Park, Bryton Crossing Townhomes, Blythe Mill Townhomes, Norman Creek, Harrisburg Village Townhomes and Robinson Oaks. The page does not publish a dollar value, lender requirement, loan condition, contract deadline, closing deadline or stacking rule; those fields remain unavailable rather than inferred.',
  checked,
  terms: 'Select homes at 8 Charlotte-area communities · value, deadline and stacking unavailable',
  access: 'Full current official Specials page reviewed November 25',
});

Object.assign(byId('eastwood-charlotte-free-blinds'), {
  c: 'Chasewood · Blythe Mill Townhomes',
  detail: 'Eastwood\'s current official Specials page advertises free window blinds on select homes at Chasewood in Charlotte and Blythe Mill Townhomes in Waxhaw. Rone Creek is no longer listed in this standalone blinds panel. The page does not publish a retail value, lender or loan requirement, contract deadline, closing deadline, eligibility by homesite or stacking rule; those fields remain unavailable rather than inferred.',
  checked,
  terms: 'Select homes at two communities · value, deadline and stacking unavailable',
  access: 'Full current official Specials page reviewed November 25',
});

Object.assign(byId('eastwood-big-red-bow-package-dec31'), {
  c: 'Founders Landing 55+',
  offer: 'Refrigerator + washer/dryer package',
  detail: 'Eastwood\'s current Big Red Bow panel offers a side-by-side refrigerator, washer and dryer on select homes at Founders Landing 55+ purchased by December 31, 2026. Robinson Oaks and window blinds are not listed in this panel today and are not carried forward. The public panel does not publish a dollar value, lender requirement, loan condition, closing deadline or stacking rule.',
  checked,
  terms: 'Purchase by Dec. 31 · select Founders Landing homes · package value and stacking unavailable',
  access: 'Full current official Specials page reviewed November 25',
});

Object.assign(byId('eastwood-big-red-bow-bryton-dec31'), {
  checked,
  offer: 'Below-market-rate panel + separate refrigerator, washer/dryer and blinds panel',
  detail: 'Eastwood\'s current official Specials page lists Bryton Crossing Townhomes in both its Charlotte below-market-rate panel and its separate eight-community refrigerator, washer/dryer and blinds package panel. Because the current page does not expressly state that the two promotions stack, this record preserves them as separate available panels rather than promising a combined benefit. Exact rate, APR, lender, loan type, score, down payment, package value, closing deadline, eligible homesites and stacking terms remain unavailable.',
  terms: 'Purchase by Dec. 31 for the rate panel · separate package panel · stacking and exact financing terms unavailable',
  access: 'Full current official Specials page reviewed November 25',
});

for (const id of ['eastwood-big-red-bow-ashton-blythe-dec31', 'eastwood-big-red-bow-bow-bucks-21k']) {
  const offer = byId(id);
  offer.kind = 'historical';
  offer.checked = checked;
  offer.offer = `Unavailable: prior ${offer.offer}`;
  offer.detail = `The prior panel is not reproduced on Eastwood's current official Specials page as of November 25, 2026. Its earlier wording is retained only for audit history and is excluded from the current comparison. Current amount, eligibility, lender conditions, financing terms and deadlines are unavailable.`;
  offer.access = 'Current official Specials page reviewed November 25; prior panel not reproduced';
}

if (!data.offers.some((item) => item.id === 'eastwood-charlotte-appliance-package-11-current')) {
  data.offers.push({
    id: 'eastwood-charlotte-appliance-package-11-current',
    b: 'Eastwood Homes',
    c: '11 Charlotte-area communities',
    city: 'Charlotte metro · NC & SC',
    counties: [],
    offer: 'Refrigerator + washer/dryer package',
    tags: ['upgrade'],
    kind: 'official',
    source: 'https://www.eastwoodhomes.com/special-offers',
    sourceName: 'Eastwood Homes',
    detail: 'Eastwood\'s current official Specials page advertises a side-by-side refrigerator, washer and dryer on select homes in 11 Charlotte-area communities: Waterford Commons, Bryton Crossing Townhomes, The Fairways at Springlake, Rone Creek, Enclave at Riverdale, Carrington, The Greens at Springlake, The Meadows at Laurelbrook, The Enclave at Laurelbrook, Chasewood and Rock Creek. Window blinds are not included in this 11-community panel. The page does not publish a dollar value, lender or loan requirement, contract deadline, closing deadline, exact homesites or stacking rule.',
    checked,
    published: null,
    start: null,
    end: null,
    close: null,
    rate: null,
    apr: null,
    amount: null,
    loan: 'No financing requirement stated',
    lender: 'No lender requirement stated',
    flags: ['move'],
    terms: 'Select homes at 11 communities · refrigerator, washer and dryer · no blinds in this panel · value and deadlines unavailable',
    access: 'Full current official Specials page reviewed November 25',
    extraSources: [],
    deadlineType: 'Offer deadline',
    tag: 'upgrade',
  });
}

Object.assign(byId('smith-paw-vip-pricing-current'), {
  c: 'Paw Creek · 5418 Starfall Way · Lot 3',
  offer: 'Up to $16,000 closing costs + move-in package',
  tags: ['closing', 'upgrade'],
  source: 'https://www.smithdouglas.com/homes/charlotte-nc/charlotte/paw-creek/5418-starfall-way',
  detail: 'Smith Douglas Homes\' current official listing for 5418 Starfall Way, Lot 3 at Paw Creek advertises up to $16,000 in closing costs plus a move-in package. The home is shown as available February 2027. The page promotes Ridgeland Mortgage for qualification and says preferred-lender customers may receive closing-cost assistance, but the offer headline does not publish a promotional note rate, APR, minimum score, down payment, contract deadline, closing deadline, package contents, allocation rules or stacking terms. Those fields remain unavailable.',
  checked,
  end: null,
  close: null,
  rate: null,
  apr: null,
  amount: 16000,
  loan: 'FHA, VA, Conventional or USDA options mentioned; offer-specific rate, APR, score and down payment unavailable',
  lender: 'Ridgeland Mortgage promoted; offer-specific affiliated-lender requirement is not stated in the headline',
  terms: '5418 Starfall Way, Lot 3 · available Feb. 2027 · up to $16,000 + package · deadlines and package contents unavailable',
  access: 'Current official home listing reviewed November 25',
  deadlineType: 'Offer deadline',
  tag: 'closing',
});

Object.assign(byId('smith-charlotte-community-status-current'), {
  checked,
  access: 'Current official Charlotte market and Charlotte-city directories reviewed November 25',
});

Object.assign(byId('meritage-charlotte-flex-cash-current-nov20'), {
  kind: 'historical',
  source: 'https://www.meritagehomes.com/promotion/9996433',
  offer: 'Expired: prior up to $25,000 Flex Cash toward closing costs, rate reduction or both',
  detail: 'Meritage\'s located official legal terms limited this prior Flex Cash promotion to contracts from October 7 through October 31, 2026, with eligible homes closing by December 20, 2026. The promotion URL now returns unavailable, and no current official replacement with matching terms was located on November 25. The record is retained for audit history and excluded from the current comparison.',
  checked,
  start: '2026-10-07',
  end: '2026-10-31',
  close: '2026-12-20',
  terms: 'Historical contract window Oct. 7–31 · close by Dec. 20 · current replacement unavailable',
  access: 'Official legal terms located and checked November 25; promotion URL now unavailable',
});

for (const id of [
  'drhorton-charlotte-community-status',
  'david-weekley-anniversary-40k-november',
  'david-weekley-preferred-lender-5k',
  'true-charlotte-lender-credit',
  'pulte-mallard-park-499-arm-current',
  'lennar-charlotte-community-status-nov23',
]) {
  const offer = data.offers.find((item) => item.id === id);
  if (offer) offer.checked = checked;
}

const ids = data.offers.map((offer) => offer.id);
if (ids.length !== new Set(ids).size) throw new Error('Duplicate offer IDs after November 25 refresh');
fs.writeFileSync(offersPath, `${JSON.stringify(data, null, 2)}\n`);

const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const reportId = '2026-11-25T00:00:30-05:00';
reviews.reports = reviews.reports.filter((report) => report.checked_at !== reportId);
reviews.reports.push({
  checked_at: reportId,
  title: 'November 25 builder-source refresh',
  summary: 'Eastwood changed the participating communities in its current blinds, appliance-package and closing-cost panels; Smith Douglas added a current Paw Creek home with up to $16,000 in closing costs plus a move-in package. Meritage\'s located $25,000 Flex Cash terms are explicitly historical and were removed from the current comparison. M/I and Mattamy dates and qualifications remain unchanged, with the M/I static and client cards kept identical.',
  items: [
    {id:'eastwood-charlotte-current-panels-nov25',builder:'Eastwood Homes',community:'Charlotte division',change:'changed',offer:'Current rate, closing-cost and appliance-package participation reconciled',details:'Rate panel remains 16 communities. Blinds-only panel now lists Chasewood and Blythe Mill; the appliance-and-blinds package lists 8 communities; a separate no-blinds appliance package lists 11; Chasewood shows up to $5,000 closing costs and Enclave at Riverdale up to $3,500. Two prior event panels are no longer reproduced and were moved to history.',source:'https://www.eastwoodhomes.com/special-offers',source_name:'Eastwood Homes',evidence:'Full current official Specials page reviewed.',checked_date:checked,deadline:'Rate and Founders Landing event panels run through 2026-12-31; other panel deadlines unavailable',publication_date:null,compared_to:'2026-11-24 review'},
    {id:'smith-paw-vip-pricing-current',builder:'Smith Douglas Homes',community:'Paw Creek · 5418 Starfall Way',change:'changed',offer:'Up to $16,000 closing costs + move-in package',details:'Current official home listing; available February 2027. Offer-specific rate, APR, deadline, package contents and stacking terms are not published.',source:'https://www.smithdouglas.com/homes/charlotte-nc/charlotte/paw-creek/5418-starfall-way',source_name:'Smith Douglas Homes',evidence:'Current official home listing reviewed.',checked_date:checked,deadline:null,publication_date:null,compared_to:'Prior current Paw Creek VIP-pricing card'},
    {id:'meritage-charlotte-flex-cash-current-nov20',builder:'Meritage Homes',community:'Select Charlotte-area homes',change:'expired',offer:'Prior up to $25,000 Flex Cash',details:'Located official legal terms limit the promotion to October 7–31 contracts and December 20 closing. No current replacement with matching terms was located; card moved to history.',source:'https://www.meritagehomes.com/promotion/9996433',source_name:'Meritage Homes',evidence:'Official legal terms checked; promotion URL now unavailable.',checked_date:checked,deadline:'Historical contract end 2026-10-31; close 2026-12-20',publication_date:null,compared_to:'Previously labeled current with unavailable deadline'},
    {id:'mi-home-sweet-fha-arm-nov25',builder:'M/I Homes',community:'Charlotte metro',change:'unchanged',offer:'5.25% FHA fixed / 4.875% Conventional 7/6 ARM · up to 3% closing costs',details:'Contract by December 1 and close by December 31 remain current. Both server-rendered and client-side cards use the same dates.',source:'https://www.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/lower-monthly-payments-2026',source_name:'M/I Homes',evidence:'Current official financing page reviewed.',checked_date:checked,deadline:'Contract 2026-12-01; close 2026-12-31',publication_date:null,compared_to:'2026-11-24 review'},
    {id:'mattamy-black-friday-nov25',builder:'Mattamy Homes',community:'Select Charlotte quick move-in homes',change:'unchanged',offer:'4.75% FHA 5/1 ARM / 6.43% APR plus separate capped closing-cost and appliance offers',details:'Financing and 4%-capped closing-cost assistance remain November 23–29 with November 29 closing. Appliance package remains November 23–30 contracts and December 31 closing.',source:'https://mattamyhomes.com/north-carolina/charlotte/promos/black-friday',source_name:'Mattamy Homes',evidence:'Current official promotion and legal terms reviewed.',checked_date:checked,deadline:'Financing contract/close 2026-11-29; appliance contract 2026-11-30, close 2026-12-31',publication_date:null,compared_to:'2026-11-24 review'},
  ],
});
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
