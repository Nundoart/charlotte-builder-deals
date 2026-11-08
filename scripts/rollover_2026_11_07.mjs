import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-06.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-07.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const checked = '2026-11-07';

data.reviewed = checked;

function get(id) {
  const offer = data.offers.find((item) => item.id === id);
  if (!offer) throw new Error(`Missing offer ${id}`);
  return offer;
}

const reviewedIds = new Set([
  'true-preferred-lender-credit',
  'drb-charlotte-flex-cash-dec31',
  'pulte-hometown-heroes', 'pulte-west-end-heights-arm',
  'pulte-galloway-riverstone-arm', 'pulte-mallard-park-arm', 'pulte-mallard-park-choice-20k',
  'lennar-black-friday-nov2-nov8-rate', 'lennar-fall-super-sale',
  'mi-home-sweet-fha', 'mi-home-sweet-arm', 'mi-home-sweet-closing', 'mi-house-to-sell',
  'david-weekley-anniversary-40k-november', 'david-weekley-preferred-lender-5k',
  'david-weekley-hometown-heroes-2500', 'david-weekley-westwood-hometown-heroes-2500',
  'david-weekley-whitley-design-20k', 'david-weekley-charlotte-community-status',
  'eastwood-charlotte-closing-costs', 'eastwood-charlotte-move-in-package',
  'eastwood-charlotte-free-blinds', 'eastwood-big-red-bow-rates-dec31',
  'eastwood-big-red-bow-design-dec31', 'eastwood-big-red-bow-package-dec31',
  'eastwood-big-red-bow-ashton-blythe-dec31', 'eastwood-big-red-bow-bryton-dec31',
  'mattamy-tbb-closing-costs-oct31', 'mattamy-design-options', 'mattamy-hometown-heroes',
  'meritage-national-sales-event-nov15', 'meritage-closing-ready-guarantee',
  'meritage-charlotte-move-in-package',
  'smith-charlotte-arm-current', 'smith-charlotte-fixed-current',
  'smith-charlotte-hometown-heroes-1500',
  'drhorton-charlotte-community-status',
  'taylor-charlotte-qmi-arm-nov30', 'taylor-charlotte-fixed-nov30',
  'taylor-charlotte-qmi-price-dec31', 'taylor-charlotte-hoa-dec31',
  'taylor-charlotte-community-status'
]);
for (const offer of data.offers) if (reviewedIds.has(offer.id)) offer.checked = checked;

const miFha = get('mi-home-sweet-fha');
miFha.end = '2026-11-08';
miFha.close = '2026-12-31';
miFha.terms = 'New contracts Oct. 11–Nov. 8 · close by Dec. 31 · select homes · owner-occupied · 640 minimum score · 3.5% down · apply within 48 hours';
miFha.detail = "M/I Homes' current Home Sweet Savings page advertises a 5.25% rate and 6.039% APR on a 30-year fixed FHA loan for select homes financed through M/I Financial. The published illustration uses a $350,000 sales price, 3.5% down, a minimum 640 credit score and owner occupancy. The buyer must apply within 48 hours of signing. New contracts must be written October 11 through November 8, 2026 and close by December 31. The rate is subject to change and is not guaranteed until locked; rewrites, transfers and cancellations are excluded. A complete eligible-home/address list and stacking rules remain unavailable.";
miFha.access = 'Full current official Home Sweet Savings promotion and legal disclosure reviewed November 7';

const miArm = get('mi-home-sweet-arm');
miArm.offer = 'Expired: 4.875% Conventional 7/6 ARM · 5.763% APR';
miArm.end = '2026-10-31';
miArm.close = '2026-11-30';
miArm.terms = 'Advertised contract window ended Oct. 31 · close by Nov. 30 · 20% down · owner-occupied · apply within 48 hours';
miArm.detail = "M/I Homes' current Home Sweet Savings page still reproduces the 4.875% Conventional 7/6 ARM disclosure, but its controlling contract deadline was October 31, 2026. Because that deadline has passed, the offer is retained only in audit history and hidden from the active comparison. The prior terms required M/I Financial, 20% down, owner occupancy, a loan application within 48 hours and closing by November 30. No replacement ARM window was published on the current page.";
miArm.access = 'Current official promotion page reviewed November 7; controlling ARM deadline is October 31';

const miClosing = get('mi-home-sweet-closing');
miClosing.end = '2026-11-08';
miClosing.close = '2026-12-31';
miClosing.terms = 'Contract by Nov. 8 · close by Dec. 31 · M/I Financial required · up to 3% of base price · lender/agency limits apply';
miClosing.detail = "M/I Homes' current Home Sweet Savings page offers up to 3% of base price toward allowable buyer costs when financing through M/I Financial. Allowed uses include closing costs, prepaids, discount points, rate-lock extensions, rate buydown, HOA dues and capital contribution fees; inspections and purchaser-elected transaction fees are excluded, and the credit cannot reduce the home price. Contracts must be written by November 8, 2026 and homes must close by December 31. The published contribution remains subject to lender limits of 3% to 6%, loan-program down payment requirements and mortgage-insurance rules. Exact dollars vary by home/community.";
miClosing.access = 'Full current official Home Sweet Savings promotion and legal disclosure reviewed November 7';

const mattamyDesign = get('mattamy-design-options');
mattamyDesign.offer = 'Expired: 50% off design options · advertised window ended Nov. 6';
mattamyDesign.detail = "Mattamy's Your Home Your Way page still displays a 50%-off design-options headline, but the controlling legal terms limit eligible contracts to October 1–November 6, 2026. The deadline has passed, so the design offer is retained only in audit history and hidden from the active comparison. Eligible homes had to close by April 30, 2027. The legal wording references different community caps but does not clearly distinguish maximum eligible design spend from free-option value; no guaranteed dollar savings are inferred, and no replacement design-offer window was found on the current page.";
mattamyDesign.terms = 'Expired Nov. 6 · eligible close by Apr. 30, 2027 · 50% off design options · exact maximum savings unclear';
mattamyDesign.access = 'Full current official page reviewed November 7; controlling design-offer deadline has passed';

const drbFlex = get('drb-charlotte-flex-cash-dec31');
Object.assign(drbFlex, {
  c: 'Select Charlotte-region inventory homes',
  offer: 'Up to $25,000 Flex Cash + refrigerator, washer/dryer and blinds package',
  kind: 'official',
  source: 'https://www.drbhomes.com/drbhomes/find-your-home/communities/north-carolina/charlotte/leigh-park/overview',
  checked,
  end: '2026-12-31',
  amount: 25000,
  loan: 'Flex Cash may fund closing costs, discount points, temporary buydown, design options or price reduction; lender-specific limits apply',
  lender: 'Lender choice is unrestricted; a DRB-approved settlement agent is required',
  terms: 'New contracts Sept. 24–Dec. 31 · up to $25,000 by community tier · approved settlement agent required · Flex Cash and package may combine; no other promotion stacking',
  detail: "DRB Homes' current Leigh Park page publishes the controlling Charlotte-region program: new contracts signed September 24–December 31, 2026 may receive tiered Flex Cash and an appliance/blinds package on named inventory homes. The maximum is $25,000 at Farms at Bellingham; up to $20,000 at Bell Glen, eligible Lakeside Glen 40-foot single-family homes, Leigh Park, McBride, Michaux Gardens, Odell Park and River District; and up to $15,000 at Miller Farm. Brook Run, Greenway Overlook, eligible River Point single-family homes and Withrow Heights receive only the package. Flex Cash may be applied to actual closing costs, design selections, permanent discount points, temporary payment reduction, price reduction or a combination, subject to lender and legal limits. The package consists of a specified GE refrigerator, washer, dryer and two-inch faux-wood blinds. Buyers may choose any lender, but must present the advertisement before contract and use a DRB-approved settlement agent. Flex Cash and the package may be combined with each other, but not with other promotions. Exact home eligibility and exact incentive by address remain subject to availability and contract.",
  access: 'Full current official Leigh Park promotion and controlling legal terms reviewed November 7',
  extraSources: [
    {name: 'Leigh Park', url: 'https://www.drbhomes.com/drbhomes/find-your-home/communities/north-carolina/charlotte/leigh-park/overview', note: 'Current official promotion, legal terms and Final Opportunity status'},
    {name: 'Google Maps directions', community: 'Leigh Park · Final Opportunity', url: 'https://www.google.com/maps/search/?api=1&query=2209+Gladwyne+Place%2C+Charlotte%2C+NC+28269', note: 'Exact sales-office address published by DRB Homes'},
    {name: 'DRB Charlotte communities', url: 'https://www.drbhomes.com/drbhomes/find-your-home/communities/north-carolina/charlotte', note: 'Current regional directory and financing disclosure'}
  ]
});

const taylorStatus = get('taylor-charlotte-community-status');
taylorStatus.detail = "Taylor Morrison's official community pages list The Coves on Lake Wylie as now selling and show available homes, while Senata at Research Park states that available homes are ready now. The builder publishes the Coves community location at 22308 Sweetheart Lane and Senata's current community location at 2017 Hawksworth Lane; both are included as map pins. These location records do not imply that every home qualifies for the separate financing or price promotions.";
taylorStatus.extraSources = [
  {name: 'Google Maps directions', community: 'The Coves on Lake Wylie', url: 'https://www.google.com/maps/search/?api=1&query=22308+Sweetheart+Lane%2C+Charlotte%2C+NC+28278', note: 'Exact community address published by Taylor Morrison'},
  {name: 'Senata at Research Park', url: 'https://www.taylormorrison.com/nc/charlotte/charlotte/senata-at-research-park', note: 'Official page states available homes are ready now'},
  {name: 'Google Maps directions', community: 'Senata at Research Park', url: 'https://www.google.com/maps/search/?api=1&query=2017+Hawksworth+Lane%2C+Charlotte%2C+NC+28262', note: 'Current exact community address published by Taylor Morrison'}
];

if (!data.offers.some((item) => item.id === 'drb-charlotte-fha-arm-current')) {
  const index = data.offers.findIndex((item) => item.id === 'pulte-hometown-heroes');
  data.offers.splice(index, 0, {
    id: 'drb-charlotte-fha-arm-current', b: 'DRB Homes', c: 'Select Charlotte-region homes', city: 'Charlotte metro · NC & SC',
    counties: ['Mecklenburg', 'York', 'Iredell', 'Gaston'],
    offer: '4.99% FHA 5/1 ARM · 6.679% APR', tags: ['rate'], kind: 'official',
    source: 'https://www.drbhomes.com/drbhomes/find-your-home/communities/north-carolina/charlotte', sourceName: 'DRB Homes',
    detail: "DRB Homes' current Charlotte directory publishes an Acrisure Mortgage illustration for a 30-year FHA 5/1 ARM at 4.99% with a 6.679% APR. The rate is fixed for five years, then may adjust annually using the one-year Treasury CMT plus a 2.00% margin, with 1% first and periodic caps, a 5% lifetime cap and 9.99% maximum rate. The illustration uses a $400,000 sales price, 3.5% down, $392,755 loan amount and minimum 640 FICO; exceptions may apply for lower scores. It is a builder-paid forward commitment for government loans only and is subject to fund availability, full approval, rate lock and closing before the commitment expires. The public page does not publish the forward-commitment expiration date, complete eligible-home list, exact funded amount or stacking rule, so those terms remain unavailable.",
    checked, published: null, start: null, end: null, close: null, rate: 4.99, apr: 6.679, amount: null,
    loan: '30-year FHA 5/1 ARM · 3.5% down illustration · owner/property approval required',
    lender: 'Acrisure Mortgage · full approval and rate lock required', flags: [],
    terms: 'Minimum 640 FICO · government loans only · forward-commitment funds and expiration not published · exact eligible homes unavailable',
    access: 'Current official regional directory and full financing disclosure reviewed November 7', extraSources: [],
    deadlineType: 'Offer deadline', tag: 'rate'
  });
}

if (!data.offers.some((item) => item.id === 'drb-charlotte-community-status-current')) {
  const index = data.offers.findIndex((item) => item.id === 'pulte-hometown-heroes');
  data.offers.splice(index, 0, {
    id: 'drb-charlotte-community-status-current', b: 'DRB Homes', c: 'Charlotte regional communities', city: 'Charlotte metro · NC & SC',
    counties: ['Mecklenburg', 'York', 'Iredell', 'Gaston'],
    offer: 'Community update · Leigh Park Final Opportunity · River Point and Withrow Heights Coming Soon', tags: ['status'], kind: 'official',
    source: 'https://www.drbhomes.com/drbhomes/find-your-home/communities/north-carolina/charlotte', sourceName: 'DRB Homes',
    detail: "DRB's current Charlotte directory lists active communities including Bell Glen, Odell Park, Greenway Overlook, Brook Run, Farms at Bellingham, Lakeside Glen, River District Townhomes, Michaux Gardens, Miller Farm, McBride and River District Single Family Homes. Leigh Park is labeled Final Opportunity with two move-in-ready homes shown. River Point Single Family Homes and Withrow Heights are labeled Coming Soon and publish Fall 2026 opening language; because November has arrived, the site preserves the builder's label rather than inferring an opening. Exact builder-published addresses for Leigh Park, River Point and Withrow Heights are included on the map.",
    checked, published: null, start: null, end: null, close: null, rate: null, apr: null, amount: null,
    loan: 'Not applicable', lender: 'Not applicable', flags: [],
    terms: 'Current official directory and community pages · no sold-out Charlotte-region DRB community identified in this review',
    access: 'Current official regional directory and community pages reviewed November 7',
    extraSources: [
      {name: 'Leigh Park', url: 'https://www.drbhomes.com/drbhomes/find-your-home/communities/north-carolina/charlotte/leigh-park/overview', note: 'Final Opportunity with two move-in-ready homes'},
      {name: 'Google Maps directions', community: 'Leigh Park · Final Opportunity', url: 'https://www.google.com/maps/search/?api=1&query=2209+Gladwyne+Place%2C+Charlotte%2C+NC+28269', note: 'Exact sales-office address published by DRB Homes'},
      {name: 'River Point Single Family Homes', url: 'https://www.drbhomes.com/drbhomes/find-your-home/communities/north-carolina/charlotte/river-point-single-family-homes/overview', note: 'Coming Soon / Opening Fall 2026'},
      {name: 'Google Maps directions', community: 'River Point · Coming Soon', url: 'https://www.google.com/maps/search/?api=1&query=6104+Upriver+Road%2C+Charlotte%2C+NC+28278', note: 'Exact sales-office address published by DRB Homes'},
      {name: 'Withrow Heights', url: 'https://www.drbhomes.com/drbhomes/find-your-home/communities/north-carolina/charlotte/withrow-heights/overview', note: 'Coming Soon / Opening Fall 2026'},
      {name: 'Google Maps directions', community: 'Withrow Heights · Coming Soon', url: 'https://www.google.com/maps/search/?api=1&query=2427+Wallflower+Court%2C+Charlotte%2C+NC+28262', note: 'Exact sales-office address published by DRB Homes'}
    ],
    deadlineType: 'Status checked', tag: 'status'
  });
}

if (!data.offers.some((item) => item.id === 'taylor-coves-flex-cash-nov30')) {
  const index = data.offers.findIndex((item) => item.id === 'taylor-charlotte-community-status');
  data.offers.splice(index, 0, {
    id: 'taylor-coves-flex-cash-nov30', b: 'Taylor Morrison', c: 'The Coves on Lake Wylie', city: 'Charlotte, NC', counties: ['Mecklenburg'],
    offer: 'Up to $10,500 golf-cart voucher, Flex Cash OR financing incentive', tags: ['price', 'closing', 'rate', 'upgrade'], kind: 'official',
    source: 'https://www.taylormorrison.com/nc/charlotte/charlotte/the-coves-on-lake-wylie', sourceName: 'Taylor Morrison',
    detail: "Taylor Morrison's current Coves on Lake Wylie page offers one incentive of up to $10,500 on select to-be-built or quick-move-in homes. Buyers may choose a golf-cart voucher, eligible options, a quick-move-in price reduction, lot-premium credit or financing/closing-cost assistance; the alternatives are not additive. The non-financing voucher and Flex Cash paths are available to cash buyers and borrowers using any lender. Financing uses—including temporary buydown funds, discount points, up to one year of HOA dues, closing costs or prepaids—require Taylor Morrison Home Funding and the seller-selected closing agent. New purchase agreements must be written by November 30, 2026 and eligible homes must close by May 31, 2027. Exact amounts vary by home and buyer selections, and stacking is limited to what is expressly stated in the addendum.",
    checked, published: null, start: '2026-06-26', end: '2026-11-30', close: '2027-05-31', rate: null, apr: null, amount: 10500,
    loan: 'Financing path may fund temporary buydown, points, HOA dues, closing costs or prepaids; exact rate/APR unavailable',
    lender: 'Any lender for voucher/Flex Cash; Taylor Morrison Home Funding and seller-selected closing agent required for financing use',
    flags: ['move'], terms: 'Contract by Nov. 30 · close by May 31, 2027 · one alternative use up to $10,500 · select TBB/QMI homes',
    access: 'Full current official community promotion and legal disclosure reviewed November 7',
    extraSources: [
      {name: 'Google Maps directions', community: 'The Coves on Lake Wylie', url: 'https://www.google.com/maps/search/?api=1&query=22308+Sweetheart+Lane%2C+Charlotte%2C+NC+28278', note: 'Exact community address published by Taylor Morrison'}
    ],
    deadlineType: 'Contract deadline', tag: 'price'
  });
}

const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const report = {
  checked_at: '2026-11-07T23:55:29-05:00',
  summary: 'November 7 verification corrected M/I Homes deadlines, restored DRB Flex Cash after current full terms were found, added DRB’s current 4.99% FHA 5/1 ARM disclosure, added Taylor Morrison’s $10,500 Coves on Lake Wylie offer and three DRB map locations, and expired Mattamy’s November 6 design-offer window. Lennar’s 3.990% FHA 5/1 ARM remains active through November 8. No usable new dated social offer was found; social pages were login-gated or unavailable.',
  items: [
    {id: 'mi-home-sweet-correction', builder: 'M/I Homes', community: 'Select Charlotte-area quick move-in homes', change: 'changed', offer: '5.25% FHA fixed · 6.039% APR + up to 3% closing costs · contract by Nov. 8', details: 'The official page sets November 8—not December 1—as the contract deadline for the FHA and closing-cost offers. The separate 4.875% ARM window ended October 31 and is now hidden.', source: 'https://www.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/home-sweet-savings-2026', source_name: 'M/I Homes', evidence: 'official · Full current promotion and legal disclosures reviewed November 7.', checked_date: checked, deadline: 'Contract deadline: 2026-11-08'},
    {id: 'drb-flex-cash-restored', builder: 'DRB Homes', community: 'Select Charlotte-region inventory homes', change: 'changed', offer: 'Up to $25,000 Flex Cash + appliance/blinds package', details: 'Current official terms were found on the Leigh Park page. Community tiers, permitted uses, lender choice, required settlement agent and stacking restrictions are now published. Deadline is December 31.', source: 'https://www.drbhomes.com/drbhomes/find-your-home/communities/north-carolina/charlotte/leigh-park/overview', source_name: 'DRB Homes', evidence: 'official · Full current promotion and legal terms reviewed November 7.', checked_date: checked, deadline: 'Contract deadline: 2026-12-31'},
    {id: 'drb-charlotte-fha-arm-current', builder: 'DRB Homes', community: 'Select Charlotte-region homes', change: 'new', offer: '4.99% FHA 5/1 ARM · 6.679% APR', details: 'Acrisure Mortgage; 30-year FHA 5/1 ARM, 3.5% down illustration, minimum 640 FICO. Forward-commitment expiration and eligible-home list are not published.', source: 'https://www.drbhomes.com/drbhomes/find-your-home/communities/north-carolina/charlotte', source_name: 'DRB Homes', evidence: 'official · Current regional financing disclosure reviewed November 7.', checked_date: checked, deadline: 'Deadline unavailable'},
    {id: 'taylor-coves-flex-cash-nov30', builder: 'Taylor Morrison', community: 'The Coves on Lake Wylie', change: 'new', offer: 'Up to $10,500 golf-cart voucher, Flex Cash OR financing incentive', details: 'One alternative use, not additive. Contract by November 30 and close by May 31, 2027. Financing use requires Taylor Morrison Home Funding and the selected closing agent.', source: 'https://www.taylormorrison.com/nc/charlotte/charlotte/the-coves-on-lake-wylie', source_name: 'Taylor Morrison', evidence: 'official · Full current community promotion and disclosure reviewed November 7.', checked_date: checked, deadline: 'Contract deadline: 2026-11-30'},
    {id: 'mattamy-design-options', builder: 'Mattamy Homes', community: 'Blair Place · Bratton Pointe · Waxhaw Landing · Westfall', change: 'changed', offer: 'Expired: 50% off design options · advertised window ended Nov. 6', details: 'The page still displays the headline, but its controlling legal contract window has ended. It is retained in audit history and removed from the active comparison.', source: 'https://mattamyhomes.com/north-carolina/charlotte/promos/to-be-built', source_name: 'Mattamy Homes', evidence: 'official · Current page and controlling legal terms reviewed November 7.', checked_date: checked, deadline: 'Expired: 2026-11-06'},
    {id: 'lennar-black-friday-nov2-nov8-rate', builder: 'Lennar', community: 'Select Greater Charlotte homes', change: 'unchanged', offer: '3.990% FHA 5/1 ARM · 7.053% APR', details: 'Still active for purchase agreements through November 8 and closing by November 24. Lennar Mortgage is required.', source: 'https://www.lennar.com/new-homes/north-carolina/charlotte/promo/gallen_blackfriday26', source_name: 'Lennar', evidence: 'official · Current promotion page reviewed November 7.', checked_date: checked, deadline: 'Contract deadline: 2026-11-08'}
  ]
};

const existingReport = reviews.reports.findIndex((item) => item.checked_at === report.checked_at);
if (existingReport >= 0) reviews.reports[existingReport] = report;
else reviews.reports.push(report);
fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
