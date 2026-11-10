import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-09.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-10.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const checked = '2026-11-10';
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

mark('true-preferred-lender-credit', 'Full current official FAQ reviewed November 10');
mark('drb-charlotte-fha-arm-current', 'Current official regional directory and full financing disclosure reviewed November 10');
mark('drb-charlotte-community-status-current', 'Current official regional directory reviewed November 10');
mark('pulte-mallard-park-arm', 'Current official Mallard Park inventory cards and financing disclosures reviewed November 10');
mark('pulte-mallard-park-choice-20k', 'Current official Mallard Park inventory cards reviewed November 10');
mark('david-weekley-anniversary-40k-november', 'Full current official promotion and legal terms reviewed November 10');
mark('meritage-national-sales-event-nov15', 'Full current official promotion and legal terms reviewed November 10');
for (const id of ['eastwood-charlotte-closing-costs','eastwood-charlotte-move-in-package','eastwood-charlotte-free-blinds','eastwood-big-red-bow-rates-dec31','eastwood-big-red-bow-design-dec31','eastwood-big-red-bow-package-dec31','eastwood-big-red-bow-ashton-blythe-dec31','eastwood-big-red-bow-bryton-dec31']) mark(id, 'Full current official Specials page reviewed November 10');
for (const id of ['smith-charlotte-arm-current','smith-charlotte-fixed-current','smith-charlotte-hometown-heroes-1500']) mark(id, 'Current official Charlotte market page reviewed November 10');

const lennar = get('lennar-black-friday-nov2-nov8-rate');
lennar.checked = checked;
lennar.access = 'Current official promotion page reviewed November 10; expired November 8 terms remain displayed and no replacement is posted';

const insertBefore = (id, item) => {
  if (data.offers.some((offer) => offer.id === item.id)) return;
  const at = data.offers.findIndex((offer) => offer.id === id);
  data.offers.splice(at < 0 ? data.offers.length : at, 0, item);
};

insertBefore('mi-house-to-sell', {
  id: 'mi-holiday-of-homes-closing-dec1', b: 'M/I Homes', c: 'Select Charlotte-area homes', city: 'Charlotte metro, NC', counties: ['Mecklenburg','Cabarrus','Union','York'],
  offer: 'Up to 3% of base price toward allowable closing costs', tags: ['closing'], kind: 'official',
  source: 'https://www.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/holiday-of-homes', sourceName: 'M/I Homes',
  detail: "M/I Homes' current official Holiday of Homes page advertises up to 3% of base price toward eligible buyer costs when financing through M/I Financial. Permitted uses include allowable closing costs, prepaids, discount points, rate-lock extensions, a rate buydown, HOA dues and capital-contribution fees. Home-inspection, radon-inspection and other purchaser-elected transaction fees are excluded, and the credit cannot reduce the home price. Contracts must be written by December 1, 2026 and homes must close by December 31. The seller contribution remains subject to lender limits of 3% to 6%, loan-program down-payment requirements and upfront mortgage-insurance premiums. The public page does not publish a note rate, APR, minimum score, complete eligible-home list or stacking rule; those terms remain unavailable. The direct page timed out during full-page retrieval, so the record is based on current official-page text indexed November 10 rather than third-party reporting.",
  checked, published: null, start: null, end: '2026-12-01', close: '2026-12-31', rate: null, apr: null, amount: null,
  loan: 'May fund closing costs, prepaids, points, rate-lock extension, rate buydown, HOA dues or capital contribution; rate and APR unavailable',
  lender: 'M/I Financial, LLC required', flags: [],
  terms: 'Contract by Dec. 1 · close by Dec. 31 · up to 3% of base price · lender/agency contribution limits apply',
  access: 'Current official Holiday of Homes page text indexed November 10; direct full-page retrieval timed out', extraSources: [],
  deadlineType: 'Contract deadline', tag: 'closing'
});

insertBefore('mattamy-tbb-closing-costs-oct31', {
  id: 'mattamy-14-days-fha-arm-nov22', b: 'Mattamy Homes', c: 'Select Charlotte quick move-in homes', city: 'Charlotte metro, NC', counties: ['Mecklenburg','Union','York'],
  offer: '4.75% FHA 5/1 ARM · 6.43% APR', tags: ['rate'], kind: 'official',
  source: 'https://mattamyhomes.com/north-carolina/charlotte/promos/nov', sourceName: 'Mattamy Homes',
  detail: "Mattamy Homes' current 14 Days of Savings promotion advertises a 4.75% starting rate and 6.43% APR on a 30-year FHA 5/1 ARM for select Charlotte quick move-in homes. The illustration uses a $472,000 purchase price, $463,450 loan, 3.5% down, 640 median credit score, owner occupancy and upfront FHA mortgage-insurance premium. The initial rate applies for 60 months, then may adjust annually using the 30-Day Average Treasury Rate index plus a 2.00% margin, with 1% first and annual caps and a 5% lifetime cap to a 9.75% maximum. Contracts must be signed November 9–22 and close by December 31, 2026. The rate is available only while the locked pool of funds remains. Buyers must pre-apply before submitting an offer, finance through Mattamy Home Funding and use the seller-selected closing agent. Rewrites, transfers and prior canceled contracts are excluded; no stacking except where expressly written in the purchase addendum.",
  checked, published: null, start: '2026-11-09', end: '2026-11-22', close: '2026-12-31', rate: 4.75, apr: 6.43, amount: null,
  loan: '30-year FHA 5/1 ARM · 3.5% down and 640 median score illustration · owner occupied · annual adjustments after month 60',
  lender: 'Mattamy Home Funding + seller-selected closing agent required', flags: ['move'],
  terms: 'Contract Nov. 9–22 · close by Dec. 31 · select QMI homes · pool of funds · pre-apply before offer · no general stacking',
  access: 'Full current official promotion and legal terms reviewed November 10', extraSources: [],
  deadlineType: 'Contract deadline', tag: 'rate'
});

insertBefore('mattamy-tbb-closing-costs-oct31', {
  id: 'mattamy-14-days-closing-nov22', b: 'Mattamy Homes', c: 'Select Charlotte quick move-in homes', city: 'Charlotte metro, NC', counties: ['Mecklenburg','Union','York'],
  offer: 'Up to 4% of purchase price toward closing costs, prepaids, points or temporary buydown', tags: ['closing','rate'], kind: 'official',
  source: 'https://mattamyhomes.com/north-carolina/charlotte/promos/nov', sourceName: 'Mattamy Homes',
  detail: "Under Mattamy Homes' current 14 Days of Savings legal terms, the seller may contribute up to 4% of total purchase price toward closing costs, prepaids, discount points and/or a temporary buydown on select Charlotte quick move-in homes. Contracts must be signed November 9–22 and close by December 31, 2026. Buyers must pre-apply before submitting an offer, finance through Mattamy Home Funding and use the seller-selected closing agent. Maximum seller-contribution and underwriting limits apply. The public page does not publish an address-level credit amount, so no dollar value is inferred. Rewrites, transfers and prior canceled contracts are excluded; the offer cannot be combined except where expressly allowed in the purchase addendum.",
  checked, published: null, start: '2026-11-09', end: '2026-11-22', close: '2026-12-31', rate: 4.75, apr: 6.43, amount: null,
  loan: 'Closing contribution may fund prepaids, points, closing costs or temporary buydown; FHA ARM terms published separately',
  lender: 'Mattamy Home Funding + seller-selected closing agent required', flags: ['move'],
  terms: 'Contract Nov. 9–22 · close by Dec. 31 · up to 4% · select QMI homes · exact dollars unavailable · no general stacking',
  access: 'Full current official promotion and legal terms reviewed November 10', extraSources: [],
  deadlineType: 'Contract deadline', tag: 'closing'
});

insertBefore('smith-charlotte-arm-current', {
  id: 'smith-charlotte-community-status-current', b: 'Smith Douglas Homes', c: 'Charlotte market communities', city: 'Charlotte metro, NC', counties: ['Mecklenburg','Union','Gaston','Catawba','Rowan','Iredell'],
  offer: 'Community update · 8 selling/grand opening · 4 coming soon · 2 sold out', tags: ['status'], kind: 'official',
  source: 'https://www.smithdouglas.com/communities/charlotte-nc', sourceName: 'Smith Douglas Homes',
  detail: "Smith Douglas Homes' current Charlotte market page lists 14 communities. Dawson Landing, Rowe Crossing, Catawba Trace, Winecoff, Paw Creek, Ember Glen, Cedar Meadows and Sunset Meadows are Grand Opening or Now Selling. Rogers Pond, Vistas at Cramerton, Miranda Road and Highland Grove are Coming Soon. Country Club Village and Hickory Glen are labeled Sold Out. The site preserves these builder labels without inferring construction completion or availability at individual homesites. Builder-linked directions for the four Coming Soon communities and Country Club Village are included as exact map points; the separate Hickory Glen pin remains on the map from its builder-published address.",
  checked, published: null, start: null, end: null, close: null, rate: null, apr: null, amount: null,
  loan: 'Community-status record only', lender: 'Not applicable', flags: [],
  terms: 'Official market page · 14 communities · Country Club Village and Hickory Glen sold out · four communities coming soon',
  access: 'Full current official Charlotte market page reviewed November 10',
  extraSources: [
    {name:'Google Maps directions',community:'Rogers Pond · Coming Soon',url:'https://www.google.com/maps/search/?api=1&query=34.913629661467%2C-80.731695349147',note:'Exact coordinate linked by Smith Douglas Homes'},
    {name:'Google Maps directions',community:'Miranda Road · Coming Soon',url:'https://www.google.com/maps/search/?api=1&query=35.333804671263%2C-80.874960935561',note:'Exact coordinate linked by Smith Douglas Homes'},
    {name:'Google Maps directions',community:'Vistas at Cramerton · Coming Soon',url:'https://www.google.com/maps/search/?api=1&query=35.219435816716%2C-81.0736440166',note:'Exact coordinate linked by Smith Douglas Homes'},
    {name:'Google Maps directions',community:'Highland Grove · Coming Soon',url:'https://www.google.com/maps/search/?api=1&query=35.592259835637%2C-80.983461920519',note:'Exact coordinate linked by Smith Douglas Homes'},
    {name:'Google Maps directions',community:'Country Club Village · Sold Out',url:'https://www.google.com/maps/search/?api=1&query=35.696837349918%2C-80.462763678307',note:'Exact coordinate linked by Smith Douglas Homes'}
  ],
  deadlineType: 'Status checked', tag: 'status'
});

const report = {
  checked_at: '2026-11-10T00:04:17-05:00',
  summary: "November 10 verification added M/I Homes' Holiday of Homes closing credit through December 1 and Mattamy Homes' new 4.75% FHA 5/1 ARM / 6.43% APR plus up to 4% closing assistance through November 22. Smith Douglas now lists 14 Charlotte-market communities: eight selling or grand opening, four coming soon and two sold out; five status pins were added from builder-linked coordinates. Lennar still shows only its expired November 8 promotion. DRB, Pulte, David Weekley, Meritage, Eastwood, True Homes and current Smith financing records were reverified. D.R. Horton and Taylor Morrison direct pages were inaccessible, so their prior check dates were preserved rather than advanced. No usable new dated social incentive was verified.",
  items: [
    {id:'mi-holiday-of-homes-closing-dec1',builder:'M/I Homes',community:'Select Charlotte-area homes',change:'new',offer:'Up to 3% of base price toward allowable closing costs',details:'Contract by December 1 and close by December 31. M/I Financial required. Rate, APR, minimum score and exact eligible homes are unavailable.',source:'https://www.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/holiday-of-homes',source_name:'M/I Homes',evidence:'Current official-page text indexed November 10; direct full-page retrieval timed out.',checked_date:checked,deadline:'Contract deadline: 2026-12-01'},
    {id:'mattamy-14-days-fha-arm-nov22',builder:'Mattamy Homes',community:'Select Charlotte quick move-in homes',change:'new',offer:'4.75% FHA 5/1 ARM · 6.43% APR',details:'Contracts November 9–22; close by December 31. 3.5% down and 640 median score illustration; owner occupied; Mattamy Home Funding and selected closing agent required.',source:'https://mattamyhomes.com/north-carolina/charlotte/promos/nov',source_name:'Mattamy Homes',evidence:'Full official promotion and legal terms reviewed November 10.',checked_date:checked,deadline:'Contract deadline: 2026-11-22'},
    {id:'mattamy-14-days-closing-nov22',builder:'Mattamy Homes',community:'Select Charlotte quick move-in homes',change:'new',offer:'Up to 4% toward closing costs, prepaids, points or temporary buydown',details:'Same November 9–22 contract window and December 31 closing deadline. Exact dollars are unavailable and no general stacking is allowed.',source:'https://mattamyhomes.com/north-carolina/charlotte/promos/nov',source_name:'Mattamy Homes',evidence:'Full official promotion and legal terms reviewed November 10.',checked_date:checked,deadline:'Contract deadline: 2026-11-22'},
    {id:'smith-charlotte-community-status-current',builder:'Smith Douglas Homes',community:'Charlotte market',change:'changed',offer:'8 selling/grand opening · 4 coming soon · 2 sold out',details:'Country Club Village and Hickory Glen are sold out. Rogers Pond, Vistas at Cramerton, Miranda Road and Highland Grove are coming soon. Five builder-linked map points were added.',source:'https://www.smithdouglas.com/communities/charlotte-nc',source_name:'Smith Douglas Homes',evidence:'Full current official market page and linked map coordinates reviewed November 10.',checked_date:checked,deadline:'Status checked: 2026-11-10'},
    {id:'lennar-black-friday-nov2-nov8-rate',builder:'Lennar',community:'Select Greater Charlotte homes',change:'unchanged',offer:'Expired: 3.990% FHA 5/1 ARM · 7.053% APR',details:'The official page still displays only the November 2–8 contract window. No replacement Charlotte offer is posted.',source:lennar.source,source_name:'Lennar',evidence:'Current official promotion page reviewed November 10.',checked_date:checked,deadline:'Expired: 2026-11-08'},
    {id:'source-access-nov10',builder:'D.R. Horton / Taylor Morrison',community:'Charlotte market',change:'inaccessible',offer:'Direct current pages unavailable',details:'D.R. Horton returned 403 and Taylor Morrison timed out. Previously supported records retain their earlier last-checked dates; no new claim or deadline was inferred.',source:'https://www.drhorton.com/north-carolina/charlotte',source_name:'Official builder pages',evidence:'Direct retrieval attempts November 10.',checked_date:checked,deadline:null},
    {id:'social-check-nov10',builder:'Tracked Charlotte builders',community:'Public social pages',change:'unchanged',offer:'No new dated social incentive verified',details:'Targeted public Instagram and Facebook searches for the new Mattamy and M/I campaigns returned no usable dated post. No social-only claim was published.',source:'https://www.facebook.com/',source_name:'Public Facebook/Instagram search',evidence:'Targeted public search completed November 10; login-gated or undated material excluded.',checked_date:checked,deadline:null}
  ]
};

const same = reviews.reports.findIndex((item) => item.checked_at === report.checked_at);
if (same >= 0) reviews.reports[same] = report;
else reviews.reports.push(report);
fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
