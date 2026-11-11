import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-10.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-11.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const checked = '2026-11-11';
data.reviewed = checked;

function get(id) {
  const offer = data.offers.find((item) => item.id === id);
  if (!offer) throw new Error(`Missing offer ${id}`);
  return offer;
}

function mark(id, access) {
  const offer = get(id);
  offer.checked = checked;
  if (access) offer.access = access;
}

function insertBefore(id, item) {
  if (data.offers.some((offer) => offer.id === item.id)) return;
  const at = data.offers.findIndex((offer) => offer.id === id);
  data.offers.splice(at < 0 ? data.offers.length : at, 0, item);
}

// Lennar replaced the expired November 2-8 disclosure with a new November 9-15 window.
insertBefore('lennar-black-friday-nov2-nov8-rate', {
  id: 'lennar-black-friday-nov9-nov15-rate', b: 'Lennar', c: 'Black Friday Sales Event · select greater-Charlotte homes', city: 'Charlotte metro · NC & SC', counties: [],
  offer: '4.375% FHA 5/1 ARM · 7.408% APR + up to $7,500 closing costs', tags: ['rate','closing'], kind: 'official',
  source: 'https://www.lennar.com/new-homes/north-carolina/charlotte/promo/gallen_blackfriday26', sourceName: 'Lennar',
  detail: "Lennar's current Charlotte Black Friday page advertises a 4.375% FHA 5/1 ARM with a 7.408% APR plus up to $7,500 toward closing costs on select greater-Charlotte homes. The initial rate is fixed for five years and may adjust annually beginning in year six. Buyers must sign the purchase agreement November 9-15, 2026, close by January 25, 2027 and finance through Lennar Mortgage. The public page does not publish a minimum credit score, down payment, example loan amount, adjustment index, margin, caps, eligible-address list, points or stacking rules; those fields remain unavailable.",
  checked, published: null, start: '2026-11-09', end: '2026-11-15', close: '2027-01-25', rate: 4.375, apr: 7.408, amount: 7500,
  loan: 'FHA 5/1 ARM · fixed first five years · annual adjustment beginning year six · other qualification terms unavailable',
  lender: 'Lennar Mortgage required', flags: ['move'],
  terms: 'Contract Nov. 9-15 · close by Jan. 25, 2027 · select homes · up to $7,500 closing costs · score, down payment and stacking unavailable',
  access: 'Full current official promotion page and dated disclosure reviewed November 11', extraSources: [
    {name:'Lennar Charlotte',url:'https://www.lennar.com/new-homes/north-carolina/charlotte',note:'Current regional page lists 129 move-in-ready homes and 14 Charlotte-area cities/neighborhoods'}
  ], deadlineType: 'Contract deadline', tag: 'rate'
});

const oldLennar = get('lennar-black-friday-nov2-nov8-rate');
oldLennar.checked = checked;
oldLennar.access = 'Current official promotion URL reviewed November 11; page now contains the replacement November 9-15 offer';

// M/I's full current official page now carries both rate offers through December 1.
const miFha = get('mi-home-sweet-fha');
Object.assign(miFha, {
  offer: '5.25% FHA fixed · 6.039% APR', kind: 'official',
  source: 'https://proddamintegration.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/home-sweet-savings-2026',
  detail: "M/I Homes' current Home Sweet Savings page advertises a 5.25% rate and 6.039% APR on a 30-year fixed FHA loan for select Charlotte-area homes. The published example uses a $350,000 sales price, $337,750 base loan, $343,660 financed amount including 1.75% upfront mortgage insurance, 3.5% down and a minimum 640 score. Buyers must occupy the home as a primary residence, apply with M/I Financial within 48 hours of signing, contract by December 1, 2026 and close by December 31. The program applies to new contracts written on or after October 29 and excludes cancellations, rewrites and transfers. Rate lock, qualification, FHA county limits and fund availability apply; stacking beyond agency seller-contribution limits is unavailable.",
  checked, start: '2026-10-29', end: '2026-12-01', close: '2026-12-31',
  loan: '30-year FHA fixed · 3.5% down · 640 minimum FICO · primary residence · apply within 48 hours',
  lender: 'M/I Financial required',
  terms: 'Contract by Dec. 1 · close by Dec. 31 · select homes · new contracts from Oct. 29 · no rewrites or transfers',
  access: 'Full current official promotion and legal terms reviewed November 11',
  extraSources: [{name:'M/I Holiday of Homes',url:'https://www.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/holiday-of-homes',note:'Current official companion page confirms December 1 contract and December 31 closing deadlines'}]
});

const miArm = get('mi-home-sweet-arm');
Object.assign(miArm, {
  offer: '4.875% Conventional 7/6 ARM · 5.763% APR', kind: 'official',
  source: 'https://proddamintegration.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/home-sweet-savings-2026',
  detail: "M/I Homes' current Home Sweet Savings page advertises a 4.875% rate and 5.763% APR on a 30-year Conventional 7/6 ARM for select Charlotte quick-move-in homes. The initial rate is fixed for seven years with 20% down. After 84 payments it may adjust every six months using the 30-day average SOFR index plus a 2.75% margin; the first adjustment can move up to five percentage points, later adjustments up to one point, with a 2.75% lifetime minimum and 9.875% lifetime maximum. Buyers must occupy the home as a primary residence, apply with M/I Financial within 48 hours, contract by December 1, 2026 and close by December 31. The minimum credit score, example purchase price and stacking rules are not published.",
  checked, start: '2026-10-29', end: '2026-12-01', close: '2026-12-31',
  loan: '30-year Conventional 7/6 ARM · 20% down · primary residence · apply within 48 hours · minimum score unavailable',
  lender: 'M/I Financial required',
  terms: 'Contract by Dec. 1 · close by Dec. 31 · select quick move-ins · no rewrites or transfers · score unavailable',
  access: 'Full current official promotion and legal terms reviewed November 11',
  extraSources: [{name:'M/I Holiday of Homes',url:'https://www.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/holiday-of-homes',note:'Current companion promotion page'}]
});

mark('mi-holiday-of-homes-closing-dec1', 'Full current Holiday of Homes page and current companion financing terms reviewed November 11');
const miClosing = get('mi-holiday-of-homes-closing-dec1');
miClosing.extraSources = [{name:'Home Sweet Savings',url:'https://proddamintegration.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/home-sweet-savings-2026',note:'Current official page also publishes the same 3% closing-cost terms and December deadlines'}];

// New Smith Douglas inventory labels are published without a matching legal disclosure.
insertBefore('smith-charlotte-community-status-current', {
  id: 'smith-charlotte-inventory-475-arm-55-fixed', b: 'Smith Douglas Homes', c: 'Select Sunset Meadows and Dawson Landing inventory homes', city: 'Charlotte, NC', counties: ['Mecklenburg'],
  offer: '4.75% 5/1 ARM OR 5.5% 30-year fixed · APR and qualification terms unavailable', tags: ['rate'], kind: 'official',
  source: 'https://www.smithdouglas.com/homes/charlotte-nc/charlotte', sourceName: 'Smith Douglas Homes',
  detail: "Smith Douglas' current Charlotte inventory page labels two specific inventory homes—4236 Ruth Creek Court in Sunset Meadows and 5975 Old Plank Road in Dawson Landing—as eligible for a 4.75% 5/1 ARM or 5.5% 30-year fixed rate. The page's legal footer only discloses the separate 4.99% ARM and 4.99% fixed programs, so this site does not infer an APR, loan type for the fixed rate, lender requirement, score, down payment, points, adjustment terms, deadline, closing-cost credit or stacking rule for the 4.75%/5.5% labels. Buyers should obtain the homesite-specific disclosure before relying on either rate.",
  checked, published: null, start: null, end: null, close: null, rate: 4.75, apr: null, amount: null,
  loan: '5/1 ARM or 30-year fixed · loan type and qualification terms unavailable beyond inventory labels',
  lender: 'Unavailable for these homesite-specific labels', flags: ['move'],
  terms: 'Two named inventory homes · APR, score, down payment, lender, deadlines, points and stacking unavailable',
  access: 'Current official inventory cards reviewed November 11; no matching legal disclosure is published',
  extraSources: [
    {name:'Google Maps directions',community:'Sunset Meadows · Now Selling',url:'https://www.google.com/maps/search/?api=1&query=35.330947824268%2C-80.872231760688',note:'Exact coordinate linked by Smith Douglas Homes'},
    {name:'Google Maps directions',community:'Dawson Landing · Grand Opening',url:'https://www.google.com/maps/search/?api=1&query=35.286996%2C-80.899913',note:'Exact coordinate linked by Smith Douglas Homes'}
  ], deadlineType: 'Offer deadline', tag: 'rate'
});

for (const id of ['mattamy-14-days-fha-arm-nov22','mattamy-14-days-closing-nov22']) mark(id, 'Full current official promotion and legal terms reviewed November 11');
mark('meritage-national-sales-event-nov15', 'Full current official promotion and legal terms reviewed November 11');
mark('true-preferred-lender-credit', 'Full current official FAQ reviewed November 11');
for (const id of ['pulte-mallard-park-arm','pulte-mallard-park-choice-20k']) mark(id, 'Current official Mallard Park inventory cards and financing disclosures reviewed November 11');
for (const id of ['eastwood-charlotte-closing-costs','eastwood-charlotte-move-in-package','eastwood-charlotte-free-blinds','eastwood-big-red-bow-rates-dec31','eastwood-big-red-bow-design-dec31','eastwood-big-red-bow-package-dec31','eastwood-big-red-bow-ashton-blythe-dec31','eastwood-big-red-bow-bryton-dec31']) mark(id, 'Full current official Specials page reviewed November 11');
for (const id of ['smith-charlotte-arm-current','smith-charlotte-fixed-current','smith-charlotte-community-status-current']) mark(id, 'Current official Charlotte inventory and community pages reviewed November 11');
for (const id of ['david-weekley-anniversary-40k-november','david-weekley-preferred-lender-5k','david-weekley-hardy-pond-design-20k']) mark(id, 'Current official Charlotte market and promotion pages reviewed November 11');

const report = {
  checked_at: '2026-11-11T00:04:25-05:00',
  summary: "November 11 verification added Lennar's replacement 4.375% FHA 5/1 ARM / 7.408% APR and up to $7,500 closing-cost offer through November 15. M/I Homes' current full disclosure now supports a 5.25% FHA fixed rate / 6.039% APR and a 4.875% Conventional 7/6 ARM / 5.763% APR through December 1, so both were restored to the active comparison with their complete published conditions. Smith Douglas inventory now labels two homes for a 4.75% 5/1 ARM or 5.5% fixed rate; because no matching legal disclosure is published, APR and qualification fields are explicitly unavailable. Sunset Meadows and Dawson Landing were added as builder-linked map points. Mattamy, Meritage, Pulte, David Weekley, Eastwood, True Homes and Smith's established records were reverified. DRB was last fully checked November 10; D.R. Horton remains access-blocked and Taylor Morrison's current page could not be reliably reverified, so their prior check dates were preserved. No usable dated social-only incentive was found.",
  items: [
    {id:'lennar-black-friday-nov9-nov15-rate',builder:'Lennar',community:'Select greater-Charlotte homes',change:'new',offer:'4.375% FHA 5/1 ARM · 7.408% APR + up to $7,500 closing costs',details:'Contract November 9-15 and close by January 25, 2027. Lennar Mortgage required; score, down payment and adjustment details unavailable.',source:'https://www.lennar.com/new-homes/north-carolina/charlotte/promo/gallen_blackfriday26',source_name:'Lennar',evidence:'Full current official promotion page reviewed November 11.',checked_date:checked,deadline:'Contract deadline: 2026-11-15'},
    {id:'mi-home-sweet-fha',builder:'M/I Homes',community:'Select Charlotte-area homes',change:'changed',offer:'5.25% FHA fixed · 6.039% APR',details:'Restored as current: contract by December 1, close by December 31, 3.5% down, 640 minimum score, primary residence, M/I Financial application within 48 hours.',source:miFha.source,source_name:'M/I Homes',evidence:'Full current official promotion and legal terms reviewed November 11.',checked_date:checked,deadline:'Contract deadline: 2026-12-01'},
    {id:'mi-home-sweet-arm',builder:'M/I Homes',community:'Select Charlotte quick move-in homes',change:'changed',offer:'4.875% Conventional 7/6 ARM · 5.763% APR',details:'Restored as current: contract by December 1, close by December 31, 20% down, primary residence and M/I Financial required; minimum score unavailable.',source:miArm.source,source_name:'M/I Homes',evidence:'Full current official promotion and legal terms reviewed November 11.',checked_date:checked,deadline:'Contract deadline: 2026-12-01'},
    {id:'smith-charlotte-inventory-475-arm-55-fixed',builder:'Smith Douglas Homes',community:'Sunset Meadows / Dawson Landing',change:'new',offer:'4.75% 5/1 ARM OR 5.5% 30-year fixed',details:'Official inventory labels support the rates on two homes, but no matching legal disclosure publishes APR, lender, score, down payment, points or deadlines. Two builder-linked map points added.',source:'https://www.smithdouglas.com/homes/charlotte-nc/charlotte',source_name:'Smith Douglas Homes',evidence:'Current official inventory cards reviewed November 11.',checked_date:checked,deadline:null},
    {id:'source-access-nov11',builder:'D.R. Horton / Taylor Morrison',community:'Charlotte market',change:'inaccessible',offer:'Current complete terms unavailable',details:'D.R. Horton returned 403. Taylor Morrison search surfaces returned older October terms rather than a dependable current disclosure. Previously supported records retain their earlier check dates; no claim was advanced or guessed.',source:'https://www.drhorton.com/north-carolina/charlotte',source_name:'Official builder pages',evidence:'Direct retrieval and official-source search attempts November 11.',checked_date:checked,deadline:null},
    {id:'social-check-nov11',builder:'Tracked Charlotte builders',community:'Public social pages',change:'unchanged',offer:'No usable dated social-only incentive verified',details:'Targeted public Facebook and Instagram searches returned irrelevant or login-gated material. No social-only claim was published.',source:'https://www.facebook.com/',source_name:'Public Facebook/Instagram search',evidence:'Targeted public search completed November 11; login-gated and undated material excluded.',checked_date:checked,deadline:null}
  ]
};

const same = reviews.reports.findIndex((item) => item.checked_at === report.checked_at);
if (same >= 0) reviews.reports[same] = report;
else reviews.reports.push(report);
fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
