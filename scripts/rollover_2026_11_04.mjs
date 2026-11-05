import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-03.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-04.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const checked = '2026-11-04';

data.reviewed = checked;
for (const offer of data.offers) {
  if (offer.kind === 'official' && (!offer.end || offer.end >= checked)) offer.checked = checked;
}

function get(id) {
  const offer = data.offers.find((item) => item.id === id);
  if (!offer) throw new Error(`Missing offer ${id}`);
  return offer;
}

const fixed = get('taylor-charlotte-fixed-nov30');
fixed.offer = '5.49% Conventional fixed · 5.60% APR · up to $6,000 toward closing / points / HOA';
fixed.tags = ['rate', 'closing'];
fixed.amount = 6000;
fixed.detail = "Taylor Morrison's current Charlotte offer advertises a 5.49% rate with a 5.60% APR on a 30-year Conventional fixed mortgage for select to-be-built homes, plus up to $6,000 at closing toward a temporary buydown fund, discount points, up to one year of HOA dues, closing costs or prepaids. The rate includes a nine-month lock. The example uses a $500,000 purchase price, $400,000 loan amount, 20% down, a 780 credit score and owner occupancy; the minimum loan amount is $225,000. Purchase agreements must be signed November 1–30, 2026 and eligible homes must close by July 31, 2027. Buyers must pre-apply and finance through Taylor Morrison Home Funding and use the seller's designated closing agent. The pool is limited, and stacking is available only where expressly allowed by addendum. Exact eligible homes and points are unavailable.";
fixed.terms = 'Contract Nov. 1–30 · close by July 31, 2027 · up to $6,000 closing / points / HOA · minimum $225,000 loan';
fixed.access = 'Full current official Charlotte promotion and legal terms reviewed November 4';

if (!data.offers.some((item) => item.id === 'taylor-charlotte-qmi-arm-nov30')) {
  const index = data.offers.findIndex((item) => item.id === 'taylor-charlotte-fixed-nov30');
  data.offers.splice(index, 0, {
    id: 'taylor-charlotte-qmi-arm-nov30',
    b: 'Taylor Morrison',
    c: 'Select Charlotte quick move-in homes',
    city: 'Charlotte metro, NC',
    counties: ['Mecklenburg', 'Cabarrus'],
    offer: '3.25% year 1 · 4.25% years 2–7 Conventional 7/6 ARM · 5.49% APR · up to $7,000',
    tags: ['rate', 'closing'],
    kind: 'official',
    source: 'https://www.taylormorrison.com/make-moves/charlotte',
    sourceName: 'Taylor Morrison',
    detail: "Taylor Morrison's current Charlotte quick-move-in offer combines a temporary buydown with a Conventional 7/6 ARM: 3.25% in year one and a 4.25% note rate for years two through seven, with a 5.49% APR. The 30-year example uses a $500,000 purchase price, $400,000 loan, 20% down, 780 median credit score and owner occupancy. After 84 payments the rate may reset every six months using 30-day average SOFR plus a 2.75% margin, with a five-point first-adjustment cap, one-point later semiannual cap and 9.25% lifetime maximum. Seller also agrees to pay up to $7,000 toward the temporary buydown fund, discount points, up to one year of HOA dues, closing costs or prepaids. Contracts must be signed November 1–30 and close by December 31, 2026. Buyers must pre-apply and finance through Taylor Morrison Home Funding and use the seller-selected closing agent. Exact eligible homes and stacking outside an express addendum are unavailable.",
    checked,
    published: null,
    start: '2026-11-01',
    end: '2026-11-30',
    close: '2026-12-31',
    rate: 4.25,
    apr: 5.49,
    amount: 7000,
    loan: 'Conventional 7/6 ARM · 20% down and 780 score example · owner occupied · 3.25% temporary first-year buydown',
    lender: 'Taylor Morrison Home Funding + seller-designated closing agent required',
    flags: ['move'],
    terms: 'Contract Nov. 1–30 · close by Dec. 31 · up to $7,000 closing / points / HOA · select quick move-in homes',
    access: 'Full current official Charlotte promotion and legal terms reviewed November 4',
    extraSources: [],
    deadlineType: 'Contract deadline',
    tag: 'rate'
  });
}

const drhStatus = get('drhorton-charlotte-community-status');
drhStatus.offer = 'Community update · 30 communities · official home-count conflict: 245 vs. 334 · Falls Cove Sold Out · Ashenwood Coming Soon';
drhStatus.detail = drhStatus.detail.replaceAll('244 homes', '245 homes');
drhStatus.terms = drhStatus.terms.replace('244 homes', '245 homes');
drhStatus.access = 'Current official Charlotte inventory, regional, Ashenwood Commons and Falls Cove pages reviewed; conflicting builder counts preserved';

const smithArm = get('smith-charlotte-arm-current');
smithArm.detail = "Smith Douglas continues to advertise Ridgeland Mortgage's 4.99% FHA/VA 5/1 ARM with a 6.636% APR on select Charlotte-area homes after the separate October 31 cash-incentive deadline passed. The initial rate is fixed for five years and may adjust every 12 months after month 60 through month 120, with a maximum one-percentage-point annual increase. The fully indexed rate uses the daily one-year Treasury index plus a 1.75% margin. Published eligibility requires owner occupancy, a minimum 660 FICO and maximum 96.5% loan-to-value ratio. Ridgeland Mortgage is required. The current public disclosure does not state a contract deadline, closing deadline, complete eligible-homesite list, later adjustment caps beyond month 120, lifetime cap or stacking rule, so those fields remain unavailable. Dawson Landing, Paw Creek and Ember Glen are Grand Opening; Sunset Meadows is Now Selling; Miranda Road and Rogers Pond are Coming Soon; and Hickory Glen is now consistently labeled Sold Out on both its community page and the current Charlotte directory.";
smithArm.access = 'Current official regional directory, community pages, inventory listings and financing disclosure reviewed November 4';
smithArm.extraSources = smithArm.extraSources.filter((source) => source.name !== 'Hickory Glen' && source.name !== 'Rogers Pond');
smithArm.extraSources.push(
  {
    name: 'Hickory Glen',
    url: 'https://www.smithdouglas.com/communities/charlotte-nc/charlotte/hickory-glen',
    note: 'Official community page and current Charlotte directory both label Hickory Glen Sold Out'
  },
  {
    name: 'Google Maps directions',
    community: 'Hickory Glen · Sold Out',
    url: 'https://www.google.com/maps/search/?api=1&query=6020+Jasmine+Branch+Road%2C+Charlotte%2C+NC+28216',
    note: 'Exact community address published by Smith Douglas Homes'
  },
  {
    name: 'Rogers Pond',
    url: 'https://www.smithdouglas.com/communities/charlotte-nc/waxhaw/rogers-pond',
    note: 'Official page labels Rogers Pond Coming Soon'
  },
  {
    name: 'Google Maps directions',
    community: 'Rogers Pond · Coming Soon',
    url: 'https://www.google.com/maps/search/?api=1&query=8624+Old+Waxhaw+Monroe+Road%2C+Waxhaw%2C+NC+28173',
    note: 'Exact community address published by Smith Douglas Homes'
  }
);

const smithSunset = get('smith-sunset');
smithSunset.detail = smithSunset.detail.replace(
  'Hickory Glen remains source-conflicted: the regional directory says Final Opportunities while its individual community page says Sold Out, so the site flags both statements rather than guessing.',
  'Hickory Glen is now consistently labeled Sold Out on both its community page and the current Charlotte directory.'
);
smithSunset.extraSources = smithSunset.extraSources.map((source) => source.name === 'Rogers Pond'
  ? {...source, url: 'https://www.smithdouglas.com/communities/charlotte-nc/waxhaw/rogers-pond', note: 'Official page lists the Waxhaw community as Coming Soon'}
  : source.name === 'Hickory Glen'
    ? {...source, note: 'Official page and current Charlotte directory both list Hickory Glen as Sold Out'}
    : source);

const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const report = {
  checked_at: '2026-11-04T23:56:21-05:00',
  summary: 'Late November 4 verification added Taylor Morrison’s current Charlotte quick-move-in 7/6 ARM with a first-year temporary buydown and up to $7,000, and reconciled its to-be-built fixed-rate offer with the separate up-to-$6,000 financing-linked credit. D.R. Horton’s official inventory count increased from 244 to 245 homes while its regional page still reports 334. Smith Douglas now consistently labels Hickory Glen Sold Out; Rogers Pond remains Coming Soon. Two exact builder-published Smith Douglas addresses were added to the color-coded map. Other current builder terms and deadline-sensitive offers were rechecked; unavailable fields remain explicitly unavailable.',
  items: [
    {
      id: 'taylor-charlotte-qmi-arm-nov30', builder: 'Taylor Morrison', community: 'Select Charlotte quick move-in homes', change: 'new',
      offer: '3.25% year 1 · 4.25% years 2–7 Conventional 7/6 ARM · 5.49% APR · up to $7,000',
      details: 'Current November 1–30 contracts; close by December 31. Taylor Morrison Home Funding and the seller-selected closing agent are required. The example uses 20% down and a 780 score; resets begin after year seven. The $7,000 may fund the temporary buydown, points, up to one year of HOA dues, closing costs or prepaids.',
      source: 'https://www.taylormorrison.com/make-moves/charlotte', source_name: 'Taylor Morrison', evidence: 'official · Full current Charlotte promotion and legal terms reviewed November 4.', checked_date: checked, deadline: 'Contract deadline: 2026-11-30'
    },
    {
      id: 'taylor-charlotte-fixed-nov30', builder: 'Taylor Morrison', community: 'Select Charlotte to-be-built homes', change: 'changed',
      offer: '5.49% fixed · 5.60% APR · up to $6,000 closing / points / HOA',
      details: 'The existing nine-month-lock offer now includes the separately disclosed financing-linked credit in the live comparison. Contracts run November 1–30 and eligible homes must close by July 31, 2027. Pre-application, Taylor Morrison Home Funding and the seller-selected closing agent are required.',
      source: 'https://www.taylormorrison.com/make-moves/charlotte', source_name: 'Taylor Morrison', evidence: 'official · Full current Charlotte promotion and legal terms reviewed November 4.', checked_date: checked, deadline: 'Contract deadline: 2026-11-30'
    },
    {
      id: 'drhorton-charlotte-community-status', builder: 'D.R. Horton', community: 'Charlotte-area inventory', change: 'changed',
      offer: '30 communities · 245 homes on inventory page / 334 on regional page',
      details: 'The official inventory count increased by one home. The two current D.R. Horton pages still conflict, so both counts are preserved rather than choosing one. Falls Cove remains Sold Out and Ashenwood Commons remains Coming Soon.',
      source: 'https://www.drhorton.com/north-carolina/charlotte/inventory', source_name: 'D.R. Horton', evidence: 'official · Current search-indexed official inventory and community pages reviewed November 4; direct page access returned 403.', checked_date: checked, deadline: 'Status checked: 2026-11-04'
    },
    {
      id: 'smith-hickory-glen-sold-out', builder: 'Smith Douglas Homes', community: 'Hickory Glen · 6020 Jasmine Branch Road, Charlotte', change: 'changed',
      offer: 'Sold Out · prior status conflict resolved',
      details: 'The current Charlotte directory and the individual community page now both label Hickory Glen Sold Out. Rogers Pond remains Coming Soon at 8624 Old Waxhaw Monroe Road in Waxhaw. Both exact builder-published locations were added to the map.',
      source: 'https://www.smithdouglas.com/communities/charlotte-nc/charlotte/hickory-glen', source_name: 'Smith Douglas Homes', evidence: 'official · Current city directory and individual community pages reviewed November 4.', checked_date: checked, deadline: 'Status checked: 2026-11-04'
    }
  ]
};

if (!reviews.reports.some((item) => item.checked_at === report.checked_at)) reviews.reports.push(report);
fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
