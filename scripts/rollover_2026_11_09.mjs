import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-07.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-09.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const checked = '2026-11-09';

data.reviewed = checked;

function get(id) {
  const offer = data.offers.find((item) => item.id === id);
  if (!offer) throw new Error(`Missing offer ${id}`);
  return offer;
}

function checkedToday(id, access) {
  const offer = get(id);
  offer.checked = checked;
  if (access) offer.access = access;
}

const lennar = get('lennar-black-friday-nov2-nov8-rate');
lennar.offer = 'Expired: 3.990% FHA 5/1 ARM · 7.053% APR';
lennar.detail = "Lennar's official Charlotte promotion page still reproduces the 3.990% FHA 5/1 ARM and 7.053% APR disclosure, but the controlling contract window ended November 8, 2026. The offer is therefore retained in audit history and hidden from the active comparison. The prior terms required Lennar Mortgage, a purchase agreement dated November 2–8, 2026 and closing by November 24, 2026. No replacement Charlotte offer was posted on the official page when checked November 9.";
lennar.terms = 'Advertised contract window ended Nov. 8 · prior closing deadline Nov. 24 · Lennar Mortgage required · no replacement posted';
lennar.checked = checked;
lennar.access = 'Current official promotion page reviewed November 9; controlling contract deadline has passed';

for (const id of ['mi-home-sweet-fha', 'mi-home-sweet-closing']) {
  const offer = get(id);
  offer.offer = offer.offer.startsWith('Expired:') ? offer.offer : `Expired: ${offer.offer}`;
  offer.checked = checked;
  offer.access = 'Official incentive URL reviewed November 9; it now resolves to a generic incentive-list page and publishes no replacement terms';
}
get('mi-home-sweet-fha').detail = "M/I Homes' previously published Home Sweet Savings disclosure set a November 8, 2026 contract deadline for the 5.25% FHA fixed rate and 6.039% APR. On November 9 the official URL resolves only to a generic Consumer Incentive List page and no replacement Charlotte terms are published. The former offer is retained in audit history and hidden from the active comparison; its prior illustration used M/I Financial, a $350,000 sales price, 3.5% down, minimum 640 score, owner occupancy, application within 48 hours and closing by December 31.";
get('mi-home-sweet-fha').terms = 'Advertised contract window ended Nov. 8 · official URL now generic · no replacement rate or APR published';
get('mi-home-sweet-closing').detail = "M/I Homes' previously published Home Sweet Savings disclosure offered up to 3% of base price toward allowable costs with M/I Financial for contracts through November 8 and closings by December 31. On November 9 the official URL resolves only to a generic Consumer Incentive List page and publishes no replacement Charlotte terms. The former credit is retained in audit history and hidden from the active comparison.";
get('mi-home-sweet-closing').terms = 'Advertised contract window ended Nov. 8 · official URL now generic · no replacement credit published';
checkedToday('mi-home-sweet-arm', 'Official incentive URL reviewed November 9; prior ARM deadline remains expired and no replacement is published');

const drbFlex = get('drb-charlotte-flex-cash-dec31');
drbFlex.offer = 'Unavailable: prior up to $25,000 Flex Cash + appliance/blinds package';
drbFlex.end = '2026-11-08';
drbFlex.detail = "DRB Homes' official Leigh Park page no longer publishes the tiered Flex Cash or appliance-and-blinds promotion that appeared during the November 7 review. Because the current source no longer supports those terms, the record is retained only for audit history and hidden from the active comparison as of November 9. The site does not infer that the offer was canceled or that a particular buyer lost contracted benefits; it reports only that the public terms are unavailable.";
drbFlex.terms = 'No longer published on the current official page · withdrawal/expiration date unavailable · confirm directly with DRB';
drbFlex.checked = checked;
drbFlex.access = 'Current official Leigh Park page reviewed November 9; prior promotion terms are no longer present';

checkedToday('drb-charlotte-fha-arm-current', 'Current official regional directory and full financing disclosure reviewed November 9');
checkedToday('drb-charlotte-community-status-current', 'Current official regional directory and community pages reviewed November 9');
checkedToday('pulte-mallard-park-arm', 'Current official Mallard Park inventory cards and financing disclosures reviewed November 9');
checkedToday('pulte-mallard-park-choice-20k', 'Current official Mallard Park inventory cards reviewed November 9');
checkedToday('mattamy-tbb-closing-costs-oct31', 'Full current official page and legal disclosure reviewed November 9');
checkedToday('mattamy-design-options', 'Current headline and controlling expired legal terms reviewed November 9');
checkedToday('meritage-national-sales-event-nov15', 'Full current official promotion and legal terms reviewed November 9');
for (const id of ['eastwood-charlotte-closing-costs','eastwood-charlotte-move-in-package','eastwood-charlotte-free-blinds','eastwood-big-red-bow-rates-dec31','eastwood-big-red-bow-design-dec31','eastwood-big-red-bow-package-dec31','eastwood-big-red-bow-ashton-blythe-dec31','eastwood-big-red-bow-bryton-dec31']) checkedToday(id, 'Full current official Specials page reviewed November 9');

if (!data.offers.some((item) => item.id === 'david-weekley-hardy-pond-design-20k')) {
  const insertAt = data.offers.findIndex((item) => item.id === 'david-weekley-whitley-design-20k');
  data.offers.splice(insertAt, 0, {
    id: 'david-weekley-hardy-pond-design-20k', b: 'David Weekley Homes', c: 'Hardy Pond · to-be-built homes', city: 'Rock Hill, SC', counties: ['York'],
    offer: '50% off up to $40,000 in design/flex options · maximum $20,000 discount', tags: ['upgrade'], kind: 'official',
    source: 'https://www.davidweekleyhomes.com/promo/design-it-your-way-hardy-pond', sourceName: 'David Weekley Homes',
    detail: "David Weekley's official Hardy Pond promotion offers half off up to $40,000 in eligible Design Center selections and flex options, for a maximum $20,000 discount, on to-be-built homes contracted November 1–December 31, 2026. Selections must be made through the David Weekley Homes Design Center in Charlotte, the buyer pays any amount above the incentive, and the offer is not valid with another promotion or a previously written contract. The public terms do not publish a closing deadline, eligible-lot list, lender requirement, rate, APR, down payment or credit-score requirement; those details remain unavailable.",
    checked, published: null, start: '2026-11-01', end: '2026-12-31', close: null, rate: null, apr: null, amount: 20000,
    loan: 'Not a financing offer; rate, APR, loan terms and closing deadline unavailable', lender: 'No lender requirement published for this design incentive', flags: [],
    terms: 'Contract Nov. 1–Dec. 31 · to-be-built Hardy Pond homes · Charlotte Design Center · no stacking · maximum discount $20,000',
    access: 'Full current official promotion and legal terms reviewed November 9',
    extraSources: [
      {name: 'Hardy Pond', url: 'https://www.davidweekleyhomes.com/new-homes/nc/charlotte/rock-hill/hardy-pond', note: 'Official Now Selling community page'},
      {name: 'Google Maps directions', community: 'Hardy Pond · Now Selling', url: 'https://www.google.com/maps/search/?api=1&query=597+Cape+Cod+Way%2C+Rock+Hill%2C+SC+29732', note: 'Exact model-home address published by David Weekley Homes'}
    ],
    deadlineType: 'Contract deadline', tag: 'upgrade'
  });
}

const report = {
  checked_at: '2026-11-09T00:00:59-05:00',
  summary: "November 9 rollover expired Lennar's and M/I Homes' November 8 contract windows because no official replacements were posted. DRB Homes' previously published Flex Cash terms are no longer present on the current page and were removed from the active comparison; its 4.99% FHA 5/1 ARM remains supported. David Weekley's Hardy Pond design incentive was added to the live comparison with its exact builder-published map location. Mattamy, Meritage, Pulte, Eastwood and current DRB community statuses were reverified. No usable new dated social incentive was found.",
  items: [
    {id:'lennar-black-friday-nov2-nov8-rate',builder:'Lennar',community:'Select Greater Charlotte homes',change:'expired',offer:'Expired: 3.990% FHA 5/1 ARM · 7.053% APR',details:'The controlling contract window ended November 8. The official page still shows the expired disclosure and no replacement Charlotte offer.',source:lennar.source,source_name:'Lennar',evidence:'Current official promotion page reviewed November 9.',checked_date:checked,deadline:'Expired: 2026-11-08'},
    {id:'mi-home-sweet-rollover',builder:'M/I Homes',community:'Select Charlotte-area homes',change:'expired',offer:'Expired: 5.25% FHA fixed + up to 3% closing costs',details:'The published contract deadline was November 8. The official URL now resolves to a generic incentive-list page and publishes no replacement rate, APR or credit.',source:get('mi-home-sweet-fha').source,source_name:'M/I Homes',evidence:'Official incentive URL reviewed November 9.',checked_date:checked,deadline:'Expired: 2026-11-08'},
    {id:'drb-charlotte-flex-cash-dec31',builder:'DRB Homes',community:'Select Charlotte-region inventory homes',change:'inaccessible',offer:'Prior up to $25,000 Flex Cash terms no longer published',details:'The official Leigh Park page no longer displays the tiered Flex Cash or appliance/blinds legal terms. The record is hidden from the active comparison rather than carried forward without current support.',source:drbFlex.source,source_name:'DRB Homes',evidence:'Current official community page reviewed November 9.',checked_date:checked,deadline:'Current public availability: unavailable'},
    {id:'david-weekley-hardy-pond-design-20k',builder:'David Weekley Homes',community:'Hardy Pond · Rock Hill, SC',change:'new',offer:'50% off up to $40,000 selections · maximum $20,000 discount',details:'To-be-built contracts November 1–December 31; Charlotte Design Center required; no stacking. Closing deadline and financing terms are not published. Added 597 Cape Cod Way as an exact builder-published map pin.',source:'https://www.davidweekleyhomes.com/promo/design-it-your-way-hardy-pond',source_name:'David Weekley Homes',evidence:'Full official promotion, legal terms and community address reviewed November 9.',checked_date:checked,deadline:'Contract deadline: 2026-12-31'},
    {id:'drb-charlotte-fha-arm-current',builder:'DRB Homes',community:'Select Charlotte-region homes',change:'unchanged',offer:'4.99% FHA 5/1 ARM · 6.679% APR',details:'Acrisure Mortgage; minimum 640 FICO and 3.5% down illustration. The forward-commitment expiration and exact eligible homes remain unavailable.',source:get('drb-charlotte-fha-arm-current').source,source_name:'DRB Homes',evidence:'Current official regional disclosure reviewed November 9.',checked_date:checked,deadline:'Deadline unavailable'},
    {id:'social-check-nov9',builder:'Tracked Charlotte builders',community:'Public social pages',change:'unchanged',offer:'No new dated social incentive verified',details:'Targeted public searches did not produce a usable, dated builder social post with complete current Charlotte terms. No social-only claim was promoted.',source:'https://www.facebook.com/',source_name:'Public Facebook/Instagram search',evidence:'Targeted public search completed November 9; login-gated or undated material excluded.',checked_date:checked,deadline:null}
  ]
};

const same = reviews.reports.findIndex((item) => item.checked_at === report.checked_at);
if (same >= 0) reviews.reports[same] = report;
else reviews.reports.push(report);

fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
