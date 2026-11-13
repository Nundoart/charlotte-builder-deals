import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-11.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-12.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const checked = '2026-11-12';
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

// Taylor Morrison restarted its Charlotte financing windows on November 12.
const taylorArm = get('taylor-charlotte-qmi-arm-nov30');
Object.assign(taylorArm, {
  start: '2026-11-12',
  end: '2026-11-22',
  close: '2027-01-08',
  checked,
  detail: "Taylor Morrison's current Charlotte quick-move-in offer combines a temporary buydown with a Conventional 7/6 ARM: 3.25% in year one and a 4.25% note rate for years two through seven, with a 5.49% APR. The 30-year example uses a $500,000 purchase price, $400,000 loan, 20% down, a 780 median credit score and owner occupancy. After 84 payments the rate may reset every six months using 30-day average SOFR plus a 2.75% margin, with a five-point first-adjustment cap, one-point later semiannual cap and 9.25% lifetime maximum. Seller also agrees to pay up to $7,000 toward the temporary buydown fund, discount points, up to one year of HOA dues, closing costs or prepaids. Contracts must be signed November 12-22, 2026 and close by January 8, 2027. Buyers must pre-apply and finance through Taylor Morrison Home Funding and use the seller-selected closing agent. Exact eligible homes and stacking outside an express addendum are unavailable.",
  terms: 'Contract Nov. 12-22 · close by Jan. 8, 2027 · up to $7,000 closing / points / HOA · select quick move-in homes',
  access: 'Full current official Charlotte promotion and legal terms reviewed November 12'
});

const taylorFixed = get('taylor-charlotte-fixed-nov30');
Object.assign(taylorFixed, {
  start: '2026-11-12',
  end: '2026-11-22',
  close: '2027-07-31',
  checked,
  detail: "Taylor Morrison's current Charlotte offer advertises a 5.49% rate with a 5.60% APR on a 30-year Conventional fixed mortgage for select to-be-built homes, plus up to $6,000 at closing toward a temporary buydown fund, discount points, up to one year of HOA dues, closing costs or prepaids. The rate includes a nine-month lock. The example uses a $500,000 purchase price, $400,000 loan amount, 20% down, a 780 credit score and owner occupancy; the minimum loan amount is $225,000. Purchase agreements must be signed November 12-22, 2026 and eligible homes must close by July 31, 2027. Buyers must pre-apply and finance through Taylor Morrison Home Funding and use the seller's designated closing agent. The pool is limited, and stacking is available only where expressly allowed by addendum. Exact eligible homes and points are unavailable.",
  terms: 'Contract Nov. 12-22 · close by July 31, 2027 · up to $6,000 closing / points / HOA · minimum $225,000 loan',
  access: 'Full current official Charlotte promotion and legal terms reviewed November 12'
});

const taylorPrice = get('taylor-charlotte-qmi-price-dec31');
Object.assign(taylorPrice, {
  start: '2026-11-12',
  checked,
  detail: "Taylor Morrison's current Charlotte promotion identifies price reductions of up to $50,000 on select quick move-in homes. The reductions are already reflected in the advertised prices rather than an additional cash credit. Cash and financed buyers may qualify with any lender; active contracts written before November 12 are excluded. Eligible homes must close by December 31, 2026. The current inventory list may show larger historical price differences on individual homes, but the legal promotion disclosure supports only the up-to-$50,000 program claim, which is what this comparison publishes. The public terms do not publish a separate contract deadline or stacking rule, so those remain unavailable.",
  terms: 'Up to $50,000 already reflected in price · effective for new contracts from Nov. 12 · close by Dec. 31 · separate contract deadline unavailable',
  access: 'Full current official Charlotte promotion and legal terms reviewed November 12'
});

mark('taylor-charlotte-hoa-dec31', 'Full current official Charlotte promotion and legal terms reviewed November 12');

const taylorStatus = get('taylor-charlotte-community-status');
Object.assign(taylorStatus, {
  source: 'https://www.taylormorrison.com/nc/charlotte',
  offer: 'Community update · 8 selling · 3 final opportunities · 6 coming soon · 2 sold out',
  tags: ['status'],
  detail: "Taylor Morrison's current Charlotte market directory lists eight for-sale communities as Now Selling or New Lots Now Selling: Terraces at the Exchange, Fincastle Glen, Indian Trail Townhomes, Ridge at Sugar Creek, Senata at Research Park, The Coves on Lake Wylie Towns, River Falls and The Coves on Lake Wylie. Esplanade at Northgate, Stafford at Langtree and Tramore are Final Opportunity communities. Austin Village, Esplanade at Lake Hickory, Estates at Tramore, Patterson Grove, Ridge at Creek Park and Terraces at Waverly are Coming Soon. Estates at Sugar Creek is labeled Sold Out, and Taylor Morrison's separate Village at North Reach page also labels that community Sold Out. Exact builder-published locations for Esplanade at Northgate, Tramore and Estates at Tramore were added to the map. These status labels do not imply that every home qualifies for a separate financing promotion.",
  checked,
  terms: 'Current Charlotte market directory · 8 selling · 3 final opportunities · 6 coming soon · 2 sold out',
  access: 'Current official Charlotte directory, sold-out pages and community directions reviewed November 12',
  extraSources: [
    {name:'Google Maps directions',community:'The Coves on Lake Wylie · Now Selling',url:'https://www.google.com/maps/search/?api=1&query=22308+Sweetheart+Lane%2C+Charlotte%2C+NC+28278',note:'Exact community address published by Taylor Morrison'},
    {name:'Google Maps directions',community:'Senata at Research Park · New Lots Now Selling',url:'https://www.google.com/maps/search/?api=1&query=2017+Hawksworth+Lane%2C+Charlotte%2C+NC+28262',note:'Exact community address published by Taylor Morrison'},
    {name:'Google Maps directions',community:'Esplanade at Northgate · Final Opportunity',url:'https://www.google.com/maps/search/?api=1&query=209+Northgate+Boulevard%2C+Indian+Trail%2C+NC+28079',note:'Exact community address published by Taylor Morrison'},
    {name:'Google Maps directions',community:'Tramore · Final Opportunity',url:'https://www.google.com/maps/search/?api=1&query=3010+Tramore+Drive%2C+Harrisburg%2C+NC+28075',note:'Exact community address published by Taylor Morrison'},
    {name:'Google Maps directions',community:'Estates at Tramore · Coming Soon',url:'https://www.google.com/maps/search/?api=1&query=Hickory+Ridge+Road+%26+Grady+Harris+Road%2C+Harrisburg%2C+NC+28075',note:'Exact community intersection published by Taylor Morrison'},
    {name:'Estates at Sugar Creek',url:'https://www.taylormorrison.com/nc/charlotte/indian-land-sc/estates-at-sugar-creek',note:'Official community page labels the community Sold Out'},
    {name:'Village at North Reach',url:'https://www.taylormorrison.com/nc/charlotte/charlotte/village-at-north-reach',note:'Official community page labels the community Sold Out'}
  ]
});

// Pulte's live community inventory now exposes a different current APR spread.
const pulte = get('pulte-mallard-park-arm');
Object.assign(pulte, {
  offer: '4.990% Conventional 7/6 ARM · 5.980%–6.013% APR · up to $20,000 savings on rate-tagged homes',
  detail: "Pulte's current official Mallard Park inventory displays a 4.990% Conventional 7/6 ARM on select quick move-ins, with live community-page APRs ranging from 5.980% to 6.013% and up to $20,000 in price savings on current rate-tagged homes. The rate is fixed for seven years and then adjusts every six months. The financing disclosure identifies a Pulte Mortgage Builder Forward Commitment, uses a 780 FICO and 20% down Conventional illustration, and says available incentives may be applied toward closing costs and discount points. Pulte Mortgage is required for the BFC rate but not to purchase. A contract deadline, closing deadline, adjustment caps, index and margin, owner-occupancy rule and stacking terms remain unavailable. Because the page is live inventory, APRs may change by homesite and request date.",
  apr: 5.98,
  checked,
  access: 'Current official Mallard Park community and homesite financing cards reviewed November 12',
  extraSources: [
    {name:'Mallard Park',url:'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379',note:'Current official community inventory page publishes the 5.980%-6.013% live APR spread'},
    {name:'Mallard Park Landis homesite 07100',url:'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379/landis-700229/1153474',note:'Official homesite card publishes 5.998% APR and $20,000 savings'}
  ]
});
mark('pulte-mallard-park-choice-20k', 'Current official Mallard Park inventory cards reviewed November 12');

// D.R. Horton's two official surfaces continue to conflict, but the live inventory count changed.
const drh = get('drhorton-charlotte-community-status');
Object.assign(drh, {
  offer: 'Community update · 30 communities · official pages show 252 versus 336 homes · Falls Cove Sold Out',
  detail: "D.R. Horton's current official Charlotte inventory page reports 30 communities and 252 homes for sale, while the regional Charlotte page separately displays 336 homes for sale. Because the builder's own current pages disagree, the site preserves both figures rather than choosing one. The regional page labels Anderson Street Townhomes, Kingman Townhomes and Oak Grove Hill as Now Selling; Sonoma Hills and Reedy Creek Preserve as Final Opportunities; Cardinal Creek as New Model Open; Brandon Creek as New Phase Now Selling; and Ashenwood Commons in Monroe as Coming Soon. The current Falls Cove page identifies that community as Sold Out. Ashenwood publishes no street number, so it is not promoted as an exact-address map pin.",
  checked,
  terms: '30 communities · 252 homes on inventory page / 336 on regional page · Falls Cove Sold Out · Ashenwood Coming Soon',
  access: 'Current indexed official inventory and regional pages reviewed November 12; direct retrieval remains 403 and the conflicting builder counts are preserved'
});

for (const id of [
  'lennar-black-friday-nov9-nov15-rate',
  'meritage-national-sales-event-nov15',
  'mattamy-14-days-fha-arm-nov22',
  'mattamy-14-days-closing-nov22',
  'mi-home-sweet-fha',
  'mi-home-sweet-arm',
  'mi-holiday-of-homes-closing-dec1',
  'true-preferred-lender-credit',
  'smith-charlotte-inventory-475-arm-55-fixed',
  'smith-charlotte-community-status-current',
  'smith-charlotte-arm-current',
  'smith-charlotte-fixed-current',
  'drb-charlotte-fha-arm-current',
  'drb-charlotte-community-status-current',
  'david-weekley-anniversary-40k-november',
  'eastwood-big-red-bow-rates-dec31',
  'eastwood-big-red-bow-design-dec31',
  'eastwood-big-red-bow-package-dec31',
  'eastwood-big-red-bow-ashton-blythe-dec31',
  'eastwood-big-red-bow-bryton-dec31',
  'eastwood-charlotte-free-blinds'
]) mark(id);

const report = {
  checked_at: '2026-11-12T23:56:21-05:00',
  summary: "November 12 verification found three material builder changes. Taylor Morrison restarted its Charlotte ARM and fixed-rate programs for contracts signed November 12-22, with ARM closings due January 8, 2027 and fixed-rate closings due July 31, 2027; its market directory also now supports eight selling, three final-opportunity, six coming-soon and two sold-out communities. Three exact Taylor Morrison locations were added to the map. D.R. Horton's live inventory count changed to 252 homes while its regional page still shows 336, so both official figures remain displayed. Pulte's live Mallard Park APR spread changed to 5.980%-6.013%. Lennar, Meritage, Mattamy, M/I Homes, Smith Douglas, DRB, David Weekley, Eastwood and True Homes were rechecked without other supported term changes. No new dated public social-only offer was usable.",
  items: [
    {id:'taylor-charlotte-qmi-arm-nov30',builder:'Taylor Morrison',community:'Select Charlotte quick move-in homes',change:'changed',offer:'3.25% year 1 · 4.25% years 2-7 Conventional 7/6 ARM · 5.49% APR · up to $7,000',details:'New contract window November 12-22; close by January 8, 2027. Taylor Morrison Home Funding and the seller-selected closing agent remain required.',source:'https://www.taylormorrison.com/make-moves/charlotte',source_name:'Taylor Morrison',evidence:'Full current official Charlotte promotion and legal terms reviewed November 12.',checked_date:checked,deadline:'Contract deadline: 2026-11-22'},
    {id:'taylor-charlotte-fixed-nov30',builder:'Taylor Morrison',community:'Select Charlotte to-be-built homes',change:'changed',offer:'5.49% Conventional fixed · 5.60% APR · up to $6,000',details:'New contract window November 12-22; close by July 31, 2027. The published 20% down, 780 score and $225,000 minimum-loan example remains.',source:'https://www.taylormorrison.com/make-moves/charlotte',source_name:'Taylor Morrison',evidence:'Full current official Charlotte promotion and legal terms reviewed November 12.',checked_date:checked,deadline:'Contract deadline: 2026-11-22'},
    {id:'taylor-charlotte-community-status',builder:'Taylor Morrison',community:'Charlotte market',change:'changed',offer:'8 selling · 3 final opportunities · 6 coming soon · 2 sold out',details:'Added exact map locations for Esplanade at Northgate, Tramore and Estates at Tramore. Estates at Sugar Creek and Village at North Reach are labeled Sold Out.',source:'https://www.taylormorrison.com/nc/charlotte',source_name:'Taylor Morrison',evidence:'Current official market directory, status pages and directions reviewed November 12.',checked_date:checked,deadline:null},
    {id:'drhorton-charlotte-community-status',builder:'D.R. Horton',community:'Charlotte market',change:'changed',offer:'30 communities · 252 homes on inventory page / 336 on regional page',details:'The current builder inventory count moved to 252; the official regional page still shows 336, so the discrepancy remains visible. Direct page access remains 403.',source:'https://www.drhorton.com/north-carolina/charlotte/inventory',source_name:'D.R. Horton',evidence:'Current indexed official pages reviewed November 12.',checked_date:checked,deadline:null},
    {id:'pulte-mallard-park-arm',builder:'Pulte Homes',community:'Mallard Park',change:'changed',offer:'4.990% Conventional 7/6 ARM · 5.980%-6.013% APR',details:'Current live inventory cards show the revised homesite APR spread and up to $20,000 savings. Contract and closing deadlines remain unavailable.',source:'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379',source_name:'Pulte Homes',evidence:'Current official community and homesite financing cards reviewed November 12.',checked_date:checked,deadline:null},
    {id:'deadline-check-nov12',builder:'Lennar / Meritage / Mattamy / M/I Homes',community:'Charlotte-area deadline review',change:'unchanged',offer:'No additional advertised deadline change',details:'Lennar and Meritage remain through November 15, Mattamy through November 22 and M/I Homes through December 1. No unsupported extension was published.',source:'https://www.lennar.com/new-homes/north-carolina/charlotte/promo/gallen_blackfriday26',source_name:'Official builder pages',evidence:'Current official pages rechecked November 12.',checked_date:checked,deadline:'Next contract deadlines: 2026-11-15'},
    {id:'social-check-nov12',builder:'Tracked Charlotte builders',community:'Public social pages',change:'unchanged',offer:'No usable dated social-only incentive verified',details:'Targeted public Facebook and Instagram discovery did not establish a new dated Charlotte offer beyond the current official-site disclosures. Login-gated, undated and third-party-only claims were excluded.',source:'https://www.facebook.com/',source_name:'Public Facebook/Instagram search',evidence:'Targeted public discovery completed November 12; unusable material excluded.',checked_date:checked,deadline:null}
  ]
};

reviews.reports.push(report);
fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
