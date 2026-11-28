import fs from 'node:fs';

const offersPath = new URL('../research/offers-2026-11-23.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(offersPath, 'utf8'));
const checked = '2026-11-27';
const byId = (id) => {
  const row = data.offers.find((offer) => offer.id === id);
  if (!row) throw new Error(`Missing offer ${id}`);
  return row;
};

data.reviewed = checked;
data.method = 'Current official builder pages and current search-indexed official builder listings only. Third-party claims are excluded; unavailable terms are not inferred. Official-source verification completed November 27, 2026.';

// Preserve the corrected M/I contract/closing dates in the single source data
// used by both the static cards and the client-side comparison.
for (const id of ['mi-home-sweet-fha', 'mi-home-sweet-arm', 'mi-holiday-of-homes-closing-dec1']) {
  Object.assign(byId(id), {
    checked,
    end: '2026-12-01',
    close: '2026-12-31',
    deadlineType: 'Contract deadline',
    access: 'Current official M/I Homes Charlotte incentive terms reverified November 27',
  });
}

// The complete live Mallard Park inventory includes additional homesites that
// retain the previously published 5.968% lower APR example.
Object.assign(byId('pulte-mallard-park-arm'), {
  checked,
  offer: '4.990% Conventional 7/6 ARM · 5.968%–6.013% APR · up to $20,000 savings',
  detail: 'Pulte\'s current official Mallard Park inventory displays a 4.990% Conventional 7/6 ARM on select quick move-ins. Current visible homesite examples span 5.968% to 6.013% APR, with intermediate examples at 5.997%, 5.998% and 6.012%, and show up to $20,000 in savings. The rate is fixed for seven years and then adjusts every six months. Pulte Mortgage is required for the Builder Forward Commitment rate but not to purchase. A universal contract deadline, closing deadline, adjustment caps, index, margin, owner-occupancy rule and stacking terms remain unavailable.',
  apr: 5.968,
  terms: 'Select quick move-ins · visible APR range 5.968%–6.013% · Pulte Mortgage/BFC · deadlines and stacking unavailable',
  access: 'Current official Mallard Park inventory and financing disclosures reviewed November 27',
});
Object.assign(byId('pulte-mallard-park-choice-20k'), {
  checked,
  access: 'Current official Mallard Park inventory cards reviewed November 27',
});

// Official directories changed their inventory and phase labels. Keep the
// broad regional D.R. Horton count distinct from the Charlotte-city inventory
// view, and keep sold-out labels only where the builder expressly publishes one.
Object.assign(byId('drhorton-charlotte-community-status'), {
  checked,
  offer: 'Community update · 5 Charlotte-city inventory communities · 44 inventory homes · regional directory 350 homes · Falls Cove Sold Out',
  detail: 'D.R. Horton\'s current Charlotte-city inventory directory reports five communities and 44 homes for sale. Its separate Charlotte regional directory reports 350 homes, labels Falls Cove Sold Out and Ashenwood Commons Coming Soon, and lists other Now Selling, New Model Open and Final Opportunities communities. Both official counts are preserved because the builder presents them on different directory views; neither is treated as a sales total. Community map locations remain based on builder-published addresses.',
  terms: '5 Charlotte-city inventory communities · 44 inventory homes · broader regional directory 350 homes · Falls Cove Sold Out · Ashenwood Commons Coming Soon',
  access: 'Current official Charlotte-city inventory and regional status directories reviewed November 27',
});

Object.assign(byId('david-weekley-charlotte-city-status-nov20'), {
  checked,
  offer: 'Community update · 4 Now Selling · 3 Coming Soon · no current Final Opportunities or Sold Out label',
  detail: 'David Weekley\'s current official Charlotte directory labels Central Living at Craig, McAlpine Place, The River District – Excursion Collection and Westwood Reserve as Now Selling. Brightside Townes, The Retreat at Steele Creek and the new phase of The River District – Pioneer Collection are Coming Soon. The current Charlotte-city directory does not label any community Final Opportunities or Sold Out; neither status is inferred from absence.',
  terms: '4 Now Selling · 3 Coming Soon · no current Final Opportunities or Sold Out label in the Charlotte-city directory',
  access: 'Current official Charlotte directory and current community pages reviewed November 27',
});

Object.assign(byId('tripointe-charlotte-community-status-nov20'), {
  checked,
  offer: 'Community update · 15 available communities · 67 available homes',
  detail: 'Tri Pointe\'s current official Charlotte market directory reports 15 available communities, 67 available homes and 37 ready-to-build floorplans. The directory labels current communities such as Amplitude, Ellis Townes and Grahym at Southbridge as Now Selling and Southmont as Coming Soon. It does not publish a complete sold-out-community history, so no sold-out status is inferred from absence.',
  terms: '15 available communities · 67 available homes · 37 ready-to-build floorplans',
  access: 'Current official Charlotte market directory reviewed November 27',
});

Object.assign(byId('taylor-charlotte-community-status'), {
  checked,
  access: 'Current official Charlotte market directory and builder-labeled sold-out community pages reviewed November 27',
});

// Current promotions retained after re-checking their full official terms.
for (const id of [
  'mattamy-black-friday-fha-arm-nov29',
  'mattamy-black-friday-closing-nov29',
  'mattamy-black-friday-appliances-nov30',
  'eastwood-big-red-bow-rates-dec31',
  'eastwood-charlotte-closing-costs',
  'eastwood-charlotte-move-in-package',
  'eastwood-charlotte-appliance-package-11-current',
  'eastwood-blythe-flex1000-nov26',
  'eastwood-laurelbrook-norman-flex5000-nov26',
  'eastwood-carrington-fence-nov26',
  'david-weekley-preferred-lender-5k',
  'david-weekley-anniversary-40k-november',
  'david-weekley-hardy-pond-design-20k',
  'david-weekley-river-district-finished-basement',
  'tripointe-charlotte-399-first-year',
  'tripointe-fha-4000-321-nov30',
  'tripointe-conventional-4490-321-nov30',
  'tripointe-millstone-40k-current',
  'tripointe-seven-oaks-50k',
  'tripointe-ascend-55k',
  'tripointe-bellflower-40k',
  'tripointe-context-30k',
  'tripointe-grahym-30k',
  'tripointe-amplitude-7500',
  'tripointe-ross-farms-65k-current',
  'tripointe-ellis-townes-25k-current',
  'tripointe-camryn-30k-current',
  'tripointe-old-town-village-10k-current',
  'true-charlotte-community-status-current',
]) byId(id).checked = checked;

Object.assign(byId('true-charlotte-community-status-current'), {
  loan: 'Community-status record only; current financing page publishes loan products and rate-lock features but no offer-specific rate, APR, credit or deadline',
  detail: 'True Homes\' current official Charlotte pages label Duke\'s Ridge, Village at Reedy Creek Townhomes, Hoover Townes and Clark Village Townhomes as Now Selling and publish exact Charlotte addresses. The current financing page describes More Life Mortgage, Conventional, FHA, VA, USDA and down-payment-assistance products, adjustable-rate options, rate locks and float-down features, but does not publish a current promotional rate, APR, dollar credit or deadline. Broader live-lot and sold-out counts remain unavailable rather than inferred.',
  access: 'Current official Charlotte pages and financing page reviewed November 27',
});

const ids = data.offers.map((offer) => offer.id);
if (ids.length !== new Set(ids).size) throw new Error('Duplicate offer IDs');
for (const id of ['mi-home-sweet-fha', 'mi-home-sweet-arm', 'david-weekley-charlotte-city-status-nov20']) {
  if (ids.filter((candidate) => candidate === id).length !== 1) throw new Error(`Duplicate or missing ${id}`);
}
fs.writeFileSync(offersPath, `${JSON.stringify(data, null, 2)}\n`);

const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const reportId = '2026-11-27T23:59:10-05:00';
reviews.reports = reviews.reports.filter((report) => report.checked_at !== reportId);
reviews.reports.push({
  checked_at: reportId,
  title: 'November 27 comparison and community-status refresh',
  summary: 'Published the November 27 official-source review. Pulte Mallard Park now reflects the complete visible 5.968%–6.013% APR range; D.R. Horton now distinguishes five Charlotte-city inventory communities and 44 inventory homes from its 350-home regional directory; David Weekley now shows four Now Selling and three Coming Soon Charlotte-city communities; and Tri Pointe now reports 67 available homes. M/I FHA and ARM cards retain the exact December 1 contract and December 31 closing dates in both static and client data. Eastwood\'s Carrington fence panel remains current on the live Specials page.',
  items: [
    {id:'pulte-mallard-park-arm',builder:'Pulte Homes',community:'Mallard Park',change:'changed',offer:'4.990% 7/6 ARM · visible 5.968%–6.013% APR',details:'The full current homesite list includes a 5.968% APR example as well as 5.997%, 5.998%, 6.012% and 6.013% examples. Universal dates and stacking remain unavailable.',source:'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379',source_name:'Pulte Homes',evidence:'Current official inventory and financing disclosures reviewed.',checked_date:checked,deadline:null,publication_date:null,compared_to:'Incomplete November 26 visible range of 5.998%–6.013%'},
    {id:'drhorton-charlotte-community-status',builder:'D.R. Horton',community:'Charlotte market',change:'changed',offer:'5 Charlotte-city inventory communities · 44 inventory homes; 350 homes in regional directory',details:'The current official inventory view and broader regional directory use different scopes. Falls Cove remains explicitly Sold Out and Ashenwood Commons remains Coming Soon.',source:'https://www.drhorton.com/north-carolina/charlotte/charlotte/inventory',source_name:'D.R. Horton',evidence:'Current official city inventory and regional directory results reviewed.',checked_date:checked,deadline:null,publication_date:null,compared_to:'Prior 30-community/258-home inventory snapshot'},
    {id:'david-weekley-charlotte-city-status-nov20',builder:'David Weekley Homes',community:'Charlotte city',change:'changed',offer:'4 Now Selling · 3 Coming Soon',details:'McAlpine Place is now shown as Now Selling, and the new Pioneer Collection phase is Coming Soon. The current Charlotte-city directory no longer labels a Final Opportunities community.',source:'https://www.davidweekleyhomes.com/new-homes/nc/charlotte/charlotte',source_name:'David Weekley Homes',evidence:'Current official directory and community pages reviewed.',checked_date:checked,deadline:null,publication_date:null,compared_to:'3 Now Selling · 3 Coming Soon · 1 Final Opportunities'},
    {id:'tripointe-charlotte-community-status-nov20',builder:'Tri Pointe Homes',community:'Charlotte market',change:'changed',offer:'15 communities · 67 available homes · 37 floorplans',details:'The current official directory reports one fewer available home than the prior snapshot; no sold-out history is inferred from absence.',source:'https://www.tripointehomes.com/find-your-home/nc/charlotte',source_name:'Tri Pointe Homes',evidence:'Current official market directory reviewed.',checked_date:checked,deadline:null,publication_date:null,compared_to:'15 communities · 68 available homes · 37 floorplans'},
    {id:'mi-static-client-consistency-nov27',builder:'M/I Homes',community:'Charlotte metro',change:'unchanged',offer:'5.25% FHA fixed / 4.875% Conventional 7/6 ARM · up to 3% closing costs',details:'Both financing cards and the matching closing-cost card use one source record with a December 1 contract deadline and December 31 closing deadline. No duplicate M/I cards were added.',source:'https://www.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/home-sweet-savings-2026',source_name:'M/I Homes',evidence:'Current official terms reverified and static/client output checked.',checked_date:checked,deadline:'Contract 2026-12-01; close 2026-12-31',publication_date:null,compared_to:'Existing corrected M/I records'},
  ],
});
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
