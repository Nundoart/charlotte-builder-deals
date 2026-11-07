import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-05.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-06.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const checked = '2026-11-06';

data.reviewed = checked;

function get(id) {
  const offer = data.offers.find((item) => item.id === id);
  if (!offer) throw new Error(`Missing offer ${id}`);
  return offer;
}

const reviewedIds = new Set([
  'lennar-black-friday-nov2-nov8-rate', 'lennar-fall-super-sale',
  'pulte-mallard-park-arm', 'pulte-mallard-park-choice-20k',
  'david-weekley-preferred-lender-5k', 'david-weekley-hometown-heroes-2500',
  'david-weekley-westwood-hometown-heroes-2500', 'david-weekley-whitley-design-20k',
  'david-weekley-charlotte-community-status',
  'eastwood-charlotte-closing-costs', 'eastwood-charlotte-move-in-package',
  'eastwood-charlotte-free-blinds', 'eastwood-big-red-bow-rates-dec31',
  'eastwood-big-red-bow-design-dec31', 'eastwood-big-red-bow-package-dec31',
  'eastwood-big-red-bow-ashton-blythe-dec31', 'eastwood-big-red-bow-bryton-dec31',
  'mattamy-tbb-closing-costs-oct31', 'mattamy-design-options', 'mattamy-hometown-heroes',
  'meritage-national-sales-event-nov15', 'true-preferred-lender-credit',
  'smith-charlotte-arm-current', 'smith-charlotte-fixed-current',
  'smith-ember-5345-porterhouse-price-nov2', 'drhorton-charlotte-community-status',
  'taylor-charlotte-qmi-arm-nov30', 'taylor-charlotte-fixed-nov30',
  'taylor-charlotte-qmi-price-dec31', 'taylor-charlotte-hoa-dec31',
  'taylor-charlotte-community-status'
]);
for (const offer of data.offers) if (reviewedIds.has(offer.id)) offer.checked = checked;

if (!data.offers.some((item) => item.id === 'david-weekley-anniversary-40k-november')) {
  const index = data.offers.findIndex((item) => item.id === 'david-weekley-preferred-lender-5k');
  data.offers.splice(index, 0, {
    id: 'david-weekley-anniversary-40k-november',
    b: 'David Weekley Homes',
    c: 'Select Charlotte-area quick move-in homes',
    city: 'Charlotte metro, NC',
    counties: ['Mecklenburg', 'Union', 'York'],
    offer: '7% of final sales price · maximum $40,000 home discount OR financing incentive',
    tags: ['price', 'closing', 'rate'],
    kind: 'official',
    source: 'https://www.davidweekleyhomes.com/promo/50th-anniversary-charlotte',
    sourceName: 'David Weekley Homes',
    detail: "David Weekley's current Half a Century of Home Sweet Home program offers one incentive equal to 7% of the final sales price, capped at $40,000, on select Charlotte-area quick move-in homes. The incentive may be used either as a home discount or as a financing incentive; the alternatives are not additive. Purchase agreements must be signed November 1–December 6, 2026 and eligible homes must close by December 22. Financing-incentive use requires Grace Home Lending and is subject to lender and regulatory seller-contribution limits. The offer must be presented before signing, excludes prior contracts, lot premiums and options, and cannot be combined with another offer. The public terms do not publish a note rate, APR, loan type, term, minimum score, down payment or complete eligible-home list, so those fields remain unavailable. The headline language is broader than the financing disclosure, so lender requirements for the pure discount path should be confirmed with the builder.",
    checked,
    published: null,
    start: '2026-11-01',
    end: '2026-12-06',
    close: '2026-12-22',
    rate: null,
    apr: null,
    amount: 40000,
    loan: 'Financing incentive may fund rate buydown or allowable closing costs; exact loan terms unavailable',
    lender: 'Grace Home Lending required for financing-incentive use; discount-path lender condition should be confirmed',
    flags: ['move'],
    terms: 'Contract Nov. 1–Dec. 6 · close by Dec. 22 · select quick move-ins · 7% capped at $40,000 · one alternative use · not combinable',
    access: 'Full current official promotion and controlling disclosures reviewed November 6',
    extraSources: [],
    deadlineType: 'Contract deadline',
    tag: 'price'
  });
}

const eastwoodClosing = get('eastwood-charlotte-closing-costs');
eastwoodClosing.c = 'Charlotte-area communities · Robinson Oaks · Carrington';
eastwoodClosing.offer = 'Up to $5,000 closing costs · Robinson Oaks up to $7,500 · Carrington panels show up to $10,000 and $3,500';
eastwoodClosing.amount = 10000;
eastwoodClosing.terms = 'Preferred lender required · Carrington current panels separately show up to $10,000 and $3,500 · do not add together · deadlines unavailable';
eastwoodClosing.detail = "Eastwood's current official Specials page advertises up to $5,000 toward closing costs at named communities across its Charlotte and other regional divisions. Ten Charlotte-area communities are shown: Chasewood, Bryton Crossing Townhomes, Caldwell Forest, Rone Creek, Rock Creek, Blythe Mill Townhomes, Harrisburg Village Townhomes, The Meadows at Laurelbrook, Robinson Oaks and Founders Landing 55+. A separate current panel advertises up to $7,500 at Robinson Oaks. Carrington now appears in two separate current panels—one advertising up to $10,000 and another advertising up to $3,500. The site preserves both builder-published figures and does not add or assume they stack. Eastwood's preferred lender is required. The page does not publish a promotional rate, APR, loan type, credit-score requirement, contract deadline, closing deadline, eligible-address list for each tier or stacking rule.";
eastwoodClosing.access = 'Full current official Eastwood Specials page reviewed November 6; conflicting Carrington panels preserved';

const mattamyDesign = get('mattamy-design-options');
mattamyDesign.offer = '50% off design options · advertised “up to $30,000” cap interpretation unavailable';
mattamyDesign.amount = null;
mattamyDesign.detail = "Mattamy's Your Home Your Way page advertises 50% off eligible design options, up to $30,000, on select to-be-built homes. The current legal wording references different community caps but does not clearly distinguish the maximum eligible design spend from the maximum free-option value, so the site does not convert the headline into a guaranteed dollar discount. The controlling contract window is October 1–November 6, 2026 and eligible homes must close by April 30, 2027. The design incentive is available to cash and financed buyers regardless of lender and is distinct from the financing incentive. A complete eligible-homesite list and exact maximum savings by home remain unavailable.";
mattamyDesign.terms = 'Contract Oct. 1–Nov. 6 · final advertised day · 50% off design options · exact maximum dollar savings unclear · close by Apr. 30, 2027';
mattamyDesign.access = 'Full current official promotion page and controlling legal terms reviewed November 6; ambiguous cap not converted into guaranteed savings';

const drhStatus = get('drhorton-charlotte-community-status');
drhStatus.offer = 'Community update · 30 communities · official inventory pages conflict at 245–249 homes; regional page shows 336 · Falls Cove Sold Out';
drhStatus.detail = "D.R. Horton's current official Charlotte inventory results conflict with each other: page one reports 249 homes, page two reports 248 and another current event-filtered page reports 245, while the regional Charlotte page separately displays 336 homes for sale. Because the builder's own current pages disagree, the site preserves the range and regional count rather than choosing one. The regional page labels Anderson Street Townhomes, Kingman Townhomes and Oak Grove Hill as Now Selling; Sonoma Hills and Reedy Creek Preserve as Final Opportunities; Cardinal Creek as New Model Open; and Ashenwood Commons in Monroe as Coming Soon. The current Sherrills Ford-area page and Falls Cove page identify Falls Cove as Sold Out. Ashenwood publishes no street number, so it is not promoted as an exact-address map pin.";
drhStatus.terms = '30 communities · 245–249 homes across current inventory pages / 336 homes on regional page · Falls Cove Sold Out · Ashenwood Coming Soon';
drhStatus.access = 'Current official Charlotte inventory pages, regional page and Falls Cove status reviewed November 6; conflicting builder counts preserved';

const smithArm = get('smith-charlotte-arm-current');
smithArm.detail = "Smith Douglas continues to advertise Ridgeland Mortgage's 4.99% FHA/VA 5/1 ARM with a 6.636% APR on select Charlotte-area homes. The initial rate is fixed for five years and may adjust every 12 months after month 60 through month 120, with a maximum one-percentage-point annual increase. The fully indexed rate uses the daily one-year Treasury index plus a 1.75% margin. Published eligibility requires owner occupancy, a minimum 660 FICO and maximum 96.5% loan-to-value ratio. Ridgeland Mortgage is required. The current public disclosure does not state a contract deadline, closing deadline, complete eligible-homesite list, later adjustment caps beyond month 120, lifetime cap or stacking rule. Dawson Landing, Paw Creek and Ember Glen are Grand Opening; Sunset Meadows is Now Selling; Miranda Road and Rogers Pond are Coming Soon. Hickory Glen's current community page and regional directory now both label the community Sold Out; older descriptive copy mentioning a final home is treated as stale rather than current availability.";
smithArm.access = 'Current official regional directory, Hickory Glen page, inventory and financing disclosures reviewed November 6';
smithArm.extraSources = smithArm.extraSources.map((source) => source.name === 'Hickory Glen'
  ? {...source, note: 'Current official community page and regional directory both label Hickory Glen Sold Out; older final-home copy is stale'}
  : source.community === 'Hickory Glen · status conflict'
    ? {...source, community: 'Hickory Glen · Sold Out'}
    : source);

const smithSunset = get('smith-sunset');
smithSunset.detail = smithSunset.detail.replace(
  'Hickory Glen is source-conflicted: its current community-page headline and body say one final move-in-ready home remains, while structured page data and the regional directory say Sold Out.',
  'Hickory Glen is now consistently labeled Sold Out on its current community page and regional directory; older final-home copy is treated as stale.'
);
smithSunset.extraSources = smithSunset.extraSources.map((source) => source.name === 'Hickory Glen'
  ? {...source, note: 'Current official community page and regional directory label Hickory Glen Sold Out'}
  : source);

const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const report = {
  checked_at: '2026-11-06T23:59:34-05:00',
  summary: 'November 6 final verification added David Weekley’s new 7%-of-final-price incentive capped at $40,000 through December 6. Eastwood’s current Specials page now shows separate Carrington closing-cost panels for up to $10,000 and $3,500; both are preserved without assuming they stack. Mattamy’s design offer remains on its final advertised contract day, but ambiguous cap wording is no longer presented as guaranteed dollar savings. D.R. Horton’s own current inventory pages conflict at 245–249 homes while its regional page shows 336. Hickory Glen is now consistently labeled Sold Out; its exact-address map pin was updated. No new dated Charlotte social offer was verified.',
  items: [
    {
      id: 'david-weekley-anniversary-40k-november', builder: 'David Weekley Homes', community: 'Select Charlotte-area quick move-in homes', change: 'new',
      offer: '7% of final sales price · maximum $40,000 home discount OR financing incentive',
      details: 'Contracts November 1–December 6; close by December 22. Grace Home Lending is required for financing-incentive use. The alternatives are not additive, and the offer excludes prior contracts, options and lot premiums. Exact rate, APR, loan and eligible-home details are unavailable.',
      source: 'https://www.davidweekleyhomes.com/promo/50th-anniversary-charlotte', source_name: 'David Weekley Homes', evidence: 'official · Full current promotion and disclosures reviewed November 6.', checked_date: checked, deadline: 'Contract deadline: 2026-12-06'
    },
    {
      id: 'eastwood-carrington-closing-panels', builder: 'Eastwood Homes', community: 'Carrington · Stanley, NC', change: 'changed',
      offer: 'Separate current panels show up to $10,000 and up to $3,500 closing costs',
      details: 'Eastwood’s preferred lender is required. Because the builder page does not explain the relationship between the two panels, the comparison preserves both figures and does not add them together. Contract and closing deadlines are unavailable.',
      source: 'https://www.eastwoodhomes.com/special-offers', source_name: 'Eastwood Homes', evidence: 'official · Full current Specials page reviewed November 6.', checked_date: checked, deadline: 'Deadline unavailable'
    },
    {
      id: 'mattamy-design-options', builder: 'Mattamy Homes', community: 'Blair Place · Bratton Pointe · Waxhaw Landing · Westfall', change: 'changed',
      offer: '50% off design options · exact maximum dollar savings unclear',
      details: 'November 6 is the final advertised contract day; eligible homes must close by April 30, 2027. Current cap wording does not clearly distinguish design spend from free-option value, so the comparison no longer presents a guaranteed maximum dollar discount.',
      source: 'https://mattamyhomes.com/north-carolina/charlotte/promos/to-be-built', source_name: 'Mattamy Homes', evidence: 'official · Full current promotion and legal terms reviewed November 6.', checked_date: checked, deadline: 'Contract deadline: 2026-11-06'
    },
    {
      id: 'drhorton-charlotte-community-status', builder: 'D.R. Horton', community: 'Charlotte-area inventory', change: 'changed',
      offer: '30 communities · 245–249 homes across current inventory pages / 336 on regional page',
      details: 'The builder’s own current pages disagree, so all counts are preserved instead of choosing one. Falls Cove remains Sold Out and Ashenwood Commons remains Coming Soon.',
      source: 'https://www.drhorton.com/north-carolina/charlotte/inventory', source_name: 'D.R. Horton', evidence: 'official · Current inventory, regional and community pages reviewed November 6.', checked_date: checked, deadline: 'Status checked: 2026-11-06'
    },
    {
      id: 'smith-hickory-glen-sold-out', builder: 'Smith Douglas Homes', community: 'Hickory Glen · 6020 Jasmine Branch Road, Charlotte', change: 'changed',
      offer: 'Sold Out · map pin updated',
      details: 'The current community page and regional directory both label Hickory Glen Sold Out. Older final-home descriptive copy is treated as stale and is not used to claim availability.',
      source: 'https://www.smithdouglas.com/communities/charlotte-nc/charlotte/hickory-glen', source_name: 'Smith Douglas Homes', evidence: 'official · Current community page and regional directory reviewed November 6.', checked_date: checked, deadline: 'Status checked: 2026-11-06'
    }
  ]
};

if (!reviews.reports.some((item) => item.checked_at === report.checked_at)) reviews.reports.push(report);
fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
