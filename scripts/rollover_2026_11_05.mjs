import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-04.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-05.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const checked = '2026-11-05';

data.reviewed = checked;
for (const offer of data.offers) {
  if (offer.kind === 'official' && (!offer.end || offer.end >= checked)) offer.checked = checked;
}

function get(id) {
  const offer = data.offers.find((item) => item.id === id);
  if (!offer) throw new Error(`Missing offer ${id}`);
  return offer;
}

if (!data.offers.some((item) => item.id === 'lennar-black-friday-nov2-nov8-rate')) {
  const index = data.offers.findIndex((item) => item.id === 'lennar-fall-super-sale');
  data.offers.splice(index, 0, {
    id: 'lennar-black-friday-nov2-nov8-rate',
    b: 'Lennar',
    c: 'Black Friday Sales Event · select greater-Charlotte homes',
    city: 'Charlotte metro · NC & SC',
    counties: [],
    offer: '3.990% FHA 5/1 ARM · 7.053% APR',
    tags: ['rate'],
    kind: 'official',
    source: 'https://www.lennar.com/new-homes/north-carolina/charlotte/promo/gallen_blackfriday26',
    sourceName: 'Lennar',
    detail: "Lennar's current Charlotte Black Friday Sales Event advertises a 3.990% FHA 5/1 ARM with a 7.053% APR on select greater-Charlotte homes. The rate is fixed for the first five years and may adjust annually beginning in year six. Buyers must sign a purchase agreement November 2–8, 2026, close by November 24 and finance through Lennar Mortgage. Lennar does not publish a closing-cost credit with this current window; the prior up-to-$7,500 credit was not renewed. The complete eligible-home list, down payment, credit score, adjustment caps, owner-occupancy condition and stacking rule are unavailable on the current promotion page and are not inferred.",
    checked,
    published: null,
    start: '2026-11-02',
    end: '2026-11-08',
    close: '2026-11-24',
    rate: 3.99,
    apr: 7.053,
    amount: null,
    loan: 'FHA 5/1 ARM · fixed first five years · annual adjustment beginning year six · other qualification terms unavailable',
    lender: 'Lennar Mortgage required',
    flags: ['move'],
    terms: 'Purchase agreement Nov. 2–8 · close by Nov. 24 · select greater-Charlotte homes · no current closing-cost credit published',
    access: 'Full current official promotion page and disclosure reviewed November 5',
    extraSources: [{
      name: 'Lennar Charlotte',
      url: 'https://www.lennar.com/new-homes/north-carolina/charlotte',
      note: 'Current Charlotte regional inventory and community page'
    }],
    deadlineType: 'Contract deadline',
    tag: 'rate'
  });
}

const retiredEastwood = [
  'eastwood-fixed-fha',
  'eastwood-fixed-conventional',
  'eastwood-fixed-va',
  'eastwood-charlotte-399-headline',
  'eastwood-enclave-riverdale-599-headline'
];
for (const id of retiredEastwood) {
  const offer = get(id);
  offer.kind = 'historical';
  offer.offer = `Unavailable: prior ${offer.offer}`;
  offer.checked = checked;
  offer.access = 'Prior official terms retained for history; current Eastwood Specials page reviewed November 5 no longer publishes this exact rate/APR';
  offer.detail = `${offer.detail} This exact rate or APR is no longer reproduced on Eastwood's current Specials page as of November 5, 2026, so it has been removed from the live comparison and retained only as historical evidence. Eastwood's current Big Red Bow promotion states only that below-market financing is available in listed communities; exact current rates and APRs are unavailable.`;
}

const drhStatus = get('drhorton-charlotte-community-status');
drhStatus.offer = 'Community update · 30 communities · official home-count conflict: 246 vs. 336 · Falls Cove Sold Out · Ashenwood Coming Soon';
drhStatus.detail = "D.R. Horton's official Charlotte inventory results now report 30 communities and 246 homes, while its regional Charlotte page separately displays 336 homes for sale. Because the builder's current official pages conflict, the site preserves both figures instead of choosing one. The regional page labels Anderson Street Townhomes, Kingman Townhomes and Oak Grove Hill as Now Selling; Sonoma Hills and Reedy Creek Preserve as Final Opportunities; Cardinal Creek as New Model Open; and Ashenwood Commons in Monroe as Coming Soon. The Wallace Springs page identifies Falls Cove as Sold Out. Ashenwood's official address is only 'Waxhaw Hwy, Monroe, NC 28112'; because no street number is published, it is not promoted as an exact-address map pin.";
drhStatus.terms = '30 communities · 246 homes on inventory page / 336 homes on regional page · Falls Cove Sold Out · Ashenwood Coming Soon';
drhStatus.access = 'Current official Charlotte inventory and regional indexed results, Ashenwood Commons and Falls Cove pages reviewed November 5; conflicting builder counts preserved';

const smithArm = get('smith-charlotte-arm-current');
smithArm.detail = "Smith Douglas continues to advertise Ridgeland Mortgage's 4.99% FHA/VA 5/1 ARM with a 6.636% APR on select Charlotte-area homes after the separate October 31 cash-incentive deadline passed. The initial rate is fixed for five years and may adjust every 12 months after month 60 through month 120, with a maximum one-percentage-point annual increase. The fully indexed rate uses the daily one-year Treasury index plus a 1.75% margin. Published eligibility requires owner occupancy, a minimum 660 FICO and maximum 96.5% loan-to-value ratio. Ridgeland Mortgage is required. The current public disclosure does not state a contract deadline, closing deadline, complete eligible-homesite list, later adjustment caps beyond month 120, lifetime cap or stacking rule, so those fields remain unavailable. Dawson Landing, Paw Creek and Ember Glen are Grand Opening; Sunset Meadows is Now Selling; Miranda Road and Rogers Pond are Coming Soon. Hickory Glen is source-conflicted: its current community page headline and body say Final Opportunity with one move-in-ready home remaining, while structured page data and the regional directory say Sold Out. The site preserves the conflict rather than guessing availability.";
smithArm.access = 'Current official regional directory, Hickory Glen page, community pages and financing disclosure reviewed November 5; conflicting Hickory Glen labels preserved';
smithArm.extraSources = smithArm.extraSources.map((source) => source.name === 'Hickory Glen'
  ? {...source, note: 'Official page headline/body say one final move-in-ready home remains; structured page data and regional directory say Sold Out'}
  : source.community === 'Hickory Glen · Sold Out'
    ? {...source, community: 'Hickory Glen · status conflict'}
    : source);

const smithSunset = get('smith-sunset');
smithSunset.detail = smithSunset.detail.replace(
  'Hickory Glen is now consistently labeled Sold Out on both its community page and the current Charlotte directory.',
  'Hickory Glen is source-conflicted: its current community-page headline and body say one final move-in-ready home remains, while structured page data and the regional directory say Sold Out.'
);
smithSunset.extraSources = smithSunset.extraSources.map((source) => source.name === 'Hickory Glen'
  ? {...source, note: 'Official community page and regional directory currently publish conflicting availability labels'}
  : source);

const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const report = {
  checked_at: '2026-11-05T23:59:07-05:00',
  summary: 'November 5 final verification added Lennar’s new 3.990% FHA 5/1 ARM / 7.053% APR window through November 8. Five older Eastwood exact-rate cards were removed from the live comparison because the current builder page no longer reproduces those rates or APRs; current Big Red Bow terms remain. D.R. Horton’s two official Charlotte surfaces now conflict at 246 versus 336 homes. Hickory Glen’s official Smith Douglas sources again conflict between one final home and Sold Out, so the map and comparison flag the conflict. Mattamy’s separate design-options deadline remains November 6. No new dated Charlotte social offer was verified.',
  items: [
    {
      id: 'lennar-black-friday-nov2-nov8-rate', builder: 'Lennar', community: 'Select greater-Charlotte homes', change: 'new',
      offer: '3.990% FHA 5/1 ARM · 7.053% APR',
      details: 'Purchase agreement November 2–8; close by November 24. Lennar Mortgage is required. The previous $7,500 closing-cost credit is not shown in the current window and was not carried forward.',
      source: 'https://www.lennar.com/new-homes/north-carolina/charlotte/promo/gallen_blackfriday26', source_name: 'Lennar', evidence: 'official · Full current promotion and disclosure reviewed November 5.', checked_date: checked, deadline: 'Contract deadline: 2026-11-08'
    },
    {
      id: 'eastwood-current-rate-verification', builder: 'Eastwood Homes', community: 'Charlotte-area communities', change: 'changed',
      offer: 'Exact current rate/APR unavailable · Big Red Bow below-market financing remains',
      details: 'Five older exact-rate cards were moved to historical because the current builder Specials page no longer reproduces those rates or APRs. Current Big Red Bow closing-cost, design and home-package claims remain where the builder page supports them.',
      source: 'https://www.eastwoodhomes.com/special-offers', source_name: 'Eastwood Homes', evidence: 'official · Current Specials page reviewed November 5; unavailable exact terms were not guessed.', checked_date: checked, deadline: 'Big Red Bow contract deadline: 2026-12-31'
    },
    {
      id: 'drhorton-charlotte-community-status', builder: 'D.R. Horton', community: 'Charlotte-area inventory', change: 'changed',
      offer: '30 communities · 246 homes on inventory results / 336 on regional page',
      details: 'The two current official D.R. Horton surfaces conflict, so both totals are preserved. Current builder labels include Now Selling, Final Opportunities, New Model Open and Coming Soon communities; Falls Cove remains Sold Out.',
      source: 'https://www.drhorton.com/north-carolina/charlotte/inventory', source_name: 'D.R. Horton', evidence: 'official · Current builder inventory and regional indexed results reviewed November 5.', checked_date: checked, deadline: 'Status checked: 2026-11-05'
    },
    {
      id: 'smith-hickory-glen-status-conflict', builder: 'Smith Douglas Homes', community: 'Hickory Glen · 6020 Jasmine Branch Road, Charlotte', change: 'changed',
      offer: 'Status conflict · page says one final home; directory/structured data say Sold Out',
      details: 'The exact-address map pin and comparison now flag the official source conflict instead of asserting availability. The builder page headline and body say Final Opportunity with one move-in-ready home remaining, while its structured status and Charlotte directory say Sold Out.',
      source: 'https://www.smithdouglas.com/communities/charlotte-nc/charlotte/hickory-glen', source_name: 'Smith Douglas Homes', evidence: 'official · Current individual page and regional directory reviewed November 5.', checked_date: checked, deadline: 'Status checked: 2026-11-05'
    },
    {
      id: 'mattamy-design-options-nov6', builder: 'Mattamy Homes', community: 'Select Charlotte to-be-built homes', change: 'unchanged',
      offer: 'Up to $30,000 design-center spend / up to $15,000 free options',
      details: 'The current official terms remain unchanged and require a contract by November 6 and closing by April 30, 2027. Mattamy’s separate up-to-4% closing-cost offer runs through November 15 and requires Mattamy Home Funding plus the seller-selected closing agent.',
      source: 'https://mattamyhomes.com/north-carolina/charlotte/promos/to-be-built', source_name: 'Mattamy Homes', evidence: 'official · Current promotion and legal terms reviewed November 5.', checked_date: checked, deadline: 'Contract deadline: 2026-11-06'
    }
  ]
};

if (!reviews.reports.some((item) => item.checked_at === report.checked_at)) reviews.reports.push(report);
fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
