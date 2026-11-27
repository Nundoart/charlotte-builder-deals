import fs from 'node:fs';

const offersPath = new URL('../research/offers-2026-11-23.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(offersPath, 'utf8'));
const checked = '2026-11-26';
const byId = (id) => {
  const row = data.offers.find((offer) => offer.id === id);
  if (!row) throw new Error(`Missing offer ${id}`);
  return row;
};
const upsert = (row) => {
  const index = data.offers.findIndex((offer) => offer.id === row.id);
  if (index === -1) data.offers.push(row); else data.offers[index] = row;
};
const base = (id, builder, community, source, offer, tags, amount = null) => ({
  id, b: builder, c: community, city: 'Charlotte metro · NC & SC', counties: [], offer,
  tags, kind: 'official', source, sourceName: builder, detail: '', checked,
  published: null, start: null, end: null, close: null, rate: null, apr: null,
  amount, loan: 'Offer-specific loan terms unavailable', lender: 'Lender requirement unavailable',
  flags: [], terms: '', access: 'Full current official builder source reviewed November 26',
  extraSources: [], deadlineType: 'Offer deadline', tag: tags[0] || 'status',
});

data.reviewed = checked;
data.method = 'Current official builder pages and current search-indexed official builder listings only. Third-party claims are excluded; unavailable terms are not inferred. Official-source verification completed November 26, 2026.';

// One source record feeds both static and client-side M/I cards. Preserve the
// exact current contract and closing dates on both financing options and the
// matching closing-cost card.
for (const id of ['mi-home-sweet-fha', 'mi-home-sweet-arm', 'mi-holiday-of-homes-closing-dec1']) {
  Object.assign(byId(id), {
    checked,
    end: '2026-12-01',
    close: '2026-12-31',
    deadlineType: 'Contract deadline',
    access: 'Current official indexed M/I Homes Charlotte incentive terms reverified November 26',
  });
}

Object.assign(byId('lennar-black-friday-nov23-nov29-rate'), {
  checked,
  detail: 'Lennar\'s current official Charlotte Black Friday page advertises a 4.375% FHA 5/1 adjustable-rate mortgage with a 7.454% APR plus up to $7,500 toward closing costs on select greater-Charlotte homes. The initial rate is fixed for five years and may adjust annually beginning in year six. Buyers must sign and deliver a purchase agreement from November 23 through November 29, 2026, close by January 25, 2027, and finance through Lennar Mortgage. The retrieved current page does not publish the full loan term, index, margin, adjustment caps, down-payment requirement, minimum score, owner-occupancy requirement, credit-specific eligibility or stacking rule; those fields remain unavailable rather than inferred.',
  loan: 'FHA 5/1 ARM · fixed five years then adjusts annually · full scenario terms unavailable',
  lender: 'Lennar Mortgage required for the advertised rate and closing-cost headline',
  terms: 'Contract Nov. 23–29 · close by Jan. 25, 2027 · select homes · credit-specific terms and stacking unavailable',
  access: 'Current official Charlotte promotion page reviewed November 26',
});
Object.assign(byId('lennar-charlotte-community-status-nov23'), {
  checked,
  offer: 'Community update · 116 move-in-ready and quick-move-in homes',
  detail: 'Lennar\'s current official Charlotte market page reports 116 move-in-ready and quick-move-in homes. The prior 153-home snapshot is no longer published. A current total community count was not reproduced in the reviewed page, so it is unavailable rather than carried forward. These are builder-directory inventory snapshots, not sales totals.',
  terms: '116 move-in-ready and quick-move-in homes · current total community count unavailable',
  access: 'Current official Charlotte market page reviewed November 26',
});

Object.assign(byId('drb-charlotte-fha-arm-current'), {checked, access: 'Current official Charlotte regional page and financing disclosure reviewed November 26'});
const drbStatus = byId('drb-charlotte-community-status-current');
Object.assign(drbStatus, {
  checked,
  offer: 'Community update · River Point and Withrow Heights actively listed · Leigh Park Final Opportunity',
  detail: 'DRB\'s current Charlotte directory lists River Point and Withrow Heights with active pricing and available-home information rather than a Coming Soon label. Withrow Heights currently shows pricing from $319,900. Leigh Park remains Final Opportunity. No Charlotte-region DRB community is labeled Sold Out on the reviewed directory; absence is not treated as proof of availability.',
  terms: 'Current official directory · River Point active · Withrow Heights active/priced · Leigh Park Final Opportunity · no sold-out DRB label identified',
  access: 'Full current official Charlotte directory and community pages reviewed November 26',
});
for (const source of drbStatus.extraSources || []) {
  if (source.name === 'Withrow Heights') source.note = 'Current active community page with pricing from $319,900';
  if (source.community === 'Withrow Heights · Coming Soon') source.community = 'Withrow Heights · Active listing';
  if (source.note === 'Coming Soon / Opening Fall 2026' && source.name === 'Withrow Heights') source.note = 'Current active community page with pricing from $319,900';
}

Object.assign(byId('pulte-mallard-park-arm'), {
  checked,
  offer: '4.990% Conventional 7/6 ARM · 5.998%–6.013% APR · up to $20,000 savings',
  detail: 'Pulte\'s current official Mallard Park inventory displays a 4.990% Conventional 7/6 ARM on select quick move-ins. Current visible homesite examples span 5.998% to 6.013% APR and show up to $20,000 in savings. The rate is fixed for seven years and then adjusts every six months. Pulte Mortgage is required for the Builder Forward Commitment rate but not to purchase. A universal contract deadline, closing deadline, adjustment caps, index, margin, owner-occupancy rule and stacking terms remain unavailable.',
  apr: 5.998,
  terms: 'Select quick move-ins · visible APR range 5.998%–6.013% · Pulte Mortgage/BFC · deadlines and stacking unavailable',
  access: 'Current official Mallard Park inventory and financing disclosure reviewed November 26',
});
byId('pulte-mallard-park-choice-20k').checked = checked;

Object.assign(byId('true-charlotte-community-status-current'), {
  checked,
  loan: 'Community-status record only; no current offer-specific rate, APR, credit or deadline published',
  detail: 'True Homes\' current official Charlotte pages label Duke\'s Ridge, Village at Reedy Creek Townhomes, Hoover Townes and Clark Village Townhomes as Now Selling and publish exact Charlotte addresses. The separate Home Finder was displaying a live syncing notice, so broader live-lot and sold-out counts are unavailable rather than inferred. The current financing page describes More Life Mortgage, loan products and rate-lock options but does not publish a current Charlotte promotional rate, APR, dollar credit or deadline.',
  access: 'Current official Charlotte pages, financing page and Home Finder state reviewed November 26',
});
byId('true-preferred-lender-credit').checked = checked;

// Eastwood current scopes and newly published, unquantified-condition panels.
Object.assign(byId('eastwood-big-red-bow-rates-dec31'), {
  checked,
  detail: 'Eastwood\'s current Big Red Bow event advertises below-market interest rates on select homes at 16 Charlotte-area communities, including nine eligible Blythe Mill Townhomes homes in the current panel. Buyers must purchase by December 31, 2026. The public panel does not publish the note rate, APR, loan type, lender, minimum score, down payment, closing deadline, points or stacking rule.',
  access: 'Full current official Specials page reviewed November 26',
});
Object.assign(byId('eastwood-charlotte-move-in-package'), {
  checked, c: '7 Charlotte-area communities',
  detail: 'Eastwood\'s current official Specials page advertises a side-by-side refrigerator, washer and dryer, and window blinds on select homes in seven Charlotte-area communities: Caldwell Forest, Ashton Park, Bryton Crossing Townhomes, Blythe Mill Townhomes, Norman Creek, Harrisburg Village Townhomes and Robinson Oaks. Norman Creek Townhomes is no longer listed in this panel. Dollar value, lender, loan conditions, deadlines and stacking remain unavailable.',
  terms: 'Select homes at 7 Charlotte-area communities · value, deadline and stacking unavailable',
  access: 'Full current official Specials page reviewed November 26',
});
Object.assign(byId('eastwood-charlotte-appliance-package-11-current'), {
  checked, c: '9 Charlotte-area communities',
  detail: 'Eastwood\'s current official Specials page advertises a side-by-side refrigerator, washer and dryer without blinds on select homes in nine Charlotte-area communities: Waterford Commons, Bryton Crossing Townhomes, The Fairways at Springlake, Rone Creek, Enclave at Riverdale, Carrington, The Greens at Springlake, Chasewood and Rock Creek. Both Laurelbrook communities are no longer listed in this panel. Dollar value, lender, loan conditions, deadlines and stacking remain unavailable.',
  terms: 'Select homes at 9 communities · refrigerator, washer and dryer · no blinds · value and deadlines unavailable',
  access: 'Full current official Specials page reviewed November 26',
});
for (const row of [
  {...base('eastwood-blythe-flex1000-nov26','Eastwood Homes','Blythe Mill Townhomes','https://www.eastwoodhomes.com/special-offers','Up to $1,000 Flex Cash',['closing','rate'],1000), detail:'Eastwood\'s current Specials page advertises up to $1,000 Flex Cash at Blythe Mill Townhomes. The panel permits use toward allowable closing costs, an interest-rate buydown or HOA dues. It does not publish eligible homes, lender, loan type, rate, APR, score, down payment, contract or closing dates, or stacking rules.', terms:'Up to $1,000 · closing costs, rate buydown or HOA dues · lender, dates and stacking unavailable'},
  {...base('eastwood-laurelbrook-norman-flex5000-nov26','Eastwood Homes','Norman Creek Townhomes · Meadows and Enclave at Laurelbrook','https://www.eastwoodhomes.com/special-offers','Up to $5,000 Flex Cash',['closing','rate'],5000), detail:'Eastwood\'s current Specials page advertises up to $5,000 Flex Cash at Norman Creek Townhomes, The Meadows at Laurelbrook and The Enclave at Laurelbrook. The panel permits use toward allowable closing costs, an interest-rate buydown or HOA dues. It does not publish eligible homes, lender, loan type, rate, APR, score, down payment, contract or closing dates, or stacking rules.', terms:'Up to $5,000 · closing costs, rate buydown or HOA dues · lender, dates and stacking unavailable'},
  {...base('eastwood-carrington-fence-nov26','Eastwood Homes','Carrington · select ready homes','https://www.eastwoodhomes.com/special-offers','Backyard aluminum fence + one gate',['upgrade']), detail:'Eastwood\'s current Specials page advertises a backyard aluminum fence with one gate on select ready homes at Carrington. The panel does not publish a dollar value, exact eligible homes, contract or closing deadline, lender condition or stacking rule.', terms:'Select Carrington ready homes · dollar value, dates, lender and stacking unavailable'},
]) upsert(row);

// Smith Douglas current legal terms: inventory and presale scopes stay separate.
const smithCommon = {
  checked, end: '2026-11-30', deadlineType: 'Contract deadline',
  lender: 'Preferred lender, partner title company and closing attorney required',
  loan: 'Closing-cost/design incentive; rate, APR, loan type, score and down payment unavailable',
  access: 'Full current official community page and legal terms reviewed November 26',
};
for (const [id, offer, amount, detail] of [
  ['smith-ember-current-inventory-15k','Up to $15,000 closing costs + blinds/base appliance package',15000,'Select Ember Glen inventory homes qualify for up to $15,000 toward closing costs plus blinds and a base refrigerator, washer and dryer.'],
  ['smith-winecoff-current-16k','Up to $20,000 closing costs on selected inventory homes',20000,'Selected Winecoff inventory homes qualify for up to $20,000 toward closing costs; other current cards show lower amounts.'],
  ['smith-rowe-current-inventory-16k','Up to $16,000 closing costs on selected inventory homes',16000,'Selected Rowe Crossing inventory homes qualify for up to $16,000 toward closing costs.'],
  ['smith-cedar-current-21k','Up to $21,000 closing costs on selected inventory homes',21000,'Selected Cedar Meadows inventory homes qualify for up to $21,000 toward closing costs.'],
]) Object.assign(byId(id), smithCommon, {offer, amount, detail: `${detail} A contract is required by November 30, 2026. Preferred lender, partner title company and closing attorney are required; approval applies, prior contracts are excluded and the offer cannot be combined. Rate, APR, loan type, score, down payment and closing deadline are unavailable.`, terms: `Contract by Nov. 30 · ${offer} · preferred lender/title/attorney · no prior contracts or combining`});

const smithPresales = [
  ['smith-ember-presale','Ember Glen','https://www.smithdouglas.com/communities/charlotte-nc/charlotte/ember-glen','Up to $8,000 closing costs + blinds/base appliances + half-off options up to $20,000',20000],
  ['smith-winecoff-presale','Winecoff','https://www.smithdouglas.com/communities/charlotte-nc/salisbury/winecoff','Up to $9,000 closing costs + half-off options up to $30,000',30000],
  ['smith-rowe-presale','Rowe Crossing','https://www.smithdouglas.com/communities/charlotte-nc/newton/rowe-crossing','Up to $9,000 closing costs + half-off options up to $20,000',20000],
  ['smith-cedar-meadows-presale','Cedar Meadows','https://www.smithdouglas.com/communities/charlotte-nc/monroe/cedar-meadows','Up to $12,000 closing costs + half-off options up to $30,000',30000],
  ['smith-catawba-trace-presale','Catawba Trace','https://www.smithdouglas.com/communities/charlotte-nc/catawba/catawba-trace','Up to $9,000 closing costs + half-off options up to $22,000',22000],
];
for (const [id, community, source, offer, amount] of smithPresales) {
  const row = {...base(id,'Smith Douglas Homes',community,source,offer,['closing','upgrade'],amount), ...smithCommon};
  row.city = community === 'Ember Glen' ? 'Charlotte, NC' : community === 'Winecoff' ? 'Salisbury, NC' : community === 'Rowe Crossing' ? 'Newton, NC' : community === 'Cedar Meadows' ? 'Monroe, NC' : 'Catawba, NC';
  row.detail = `Smith Douglas' current official ${community} legal terms advertise ${offer.toLowerCase()} for presale buyers. A contract is required by November 30, 2026. Preferred lender, partner title company and closing attorney are required; approval applies, prior contracts are excluded and the offer cannot be combined. Rate, APR, loan type, score, down payment and closing deadline are unavailable.`;
  row.terms = `Contract by Nov. 30 · ${offer} · preferred lender/title/attorney · no prior contracts or combining`;
  upsert(row);
}
upsert({...base('smith-catawba-trace-inventory','Smith Douglas Homes','Catawba Trace · select inventory homes','https://www.smithdouglas.com/communities/charlotte-nc/catawba/catawba-trace','Up to $16,000 closing costs on selected inventory homes',['closing'],16000), ...smithCommon, city:'Catawba, NC', detail:'Selected Catawba Trace inventory homes qualify for up to $16,000 toward closing costs. A contract is required by November 30, 2026. Preferred lender, partner title company and closing attorney are required; approval applies, prior contracts are excluded and the offer cannot be combined. Rate, APR, loan type, score, down payment and closing deadline are unavailable.', terms:'Contract by Nov. 30 · up to $16,000 inventory closing costs · preferred lender/title/attorney · no prior contracts or combining'});
Object.assign(byId('smith-ember-current-upgrades-15k'), {checked, end:'2026-11-30', deadlineType:'Contract deadline', terms:'Presale component · contract by Nov. 30 · half off options up to $20,000 · not additive to the separate presale card', access:'Full current official Ember Glen page and legal terms reviewed November 26'});
Object.assign(byId('smith-charlotte-community-status-current'), {checked, offer:'Community update · 8 selling/grand opening · 4 coming soon · 2 sold out · 35 available homes', terms:'14 communities · 35 available homes · 8 selling/grand opening · 4 coming soon · Country Club Village and Hickory Glen Sold Out', access:'Current official Charlotte market directory and inventory count reviewed November 26'});
byId('smith-paw-vip-pricing-current').checked = checked;

for (const id of [
  'mattamy-black-friday-fha-arm-nov29','mattamy-black-friday-closing-nov29','mattamy-black-friday-appliances-nov30',
  'david-weekley-charlotte-city-status-nov20','drhorton-charlotte-community-status','tripointe-charlotte-community-status-nov20',
  'taylor-charlotte-qmi-arm-dec15','taylor-charlotte-fixed-dec15','taylor-charlotte-qmi-3875-arm-dec15',
  'tripointe-charlotte-399-first-year','tripointe-fha-4000-321-nov30','tripointe-conventional-4490-321-nov30',
]) byId(id).checked = checked;

const ids = data.offers.map((offer) => offer.id);
if (ids.length !== new Set(ids).size) throw new Error('Duplicate offer IDs');
if (data.offers.filter((offer) => ['mi-home-sweet-fha','mi-home-sweet-arm'].includes(offer.id)).length !== 2) throw new Error('Duplicate or missing M/I cards');
if (data.offers.filter((offer) => offer.id === 'david-weekley-charlotte-city-status-nov20').length !== 1) throw new Error('Duplicate Weekley status');
fs.writeFileSync(offersPath, `${JSON.stringify(data, null, 2)}\n`);

const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const reportId = '2026-11-26T23:56:30-05:00';
reviews.reports = reviews.reports.filter((report) => report.checked_at !== reportId);
reviews.reports.push({
  checked_at: reportId,
  title: 'Late November 26 comparison and map refresh',
  summary: 'Published the detailed November 26 source review into the comparison and map. DRB now shows Withrow Heights as an active priced community rather than Coming Soon. Lennar now reports 116 move-in-ready/quick-move-in homes, Pulte Mallard Park current visible APR examples span 5.998%–6.013%, Smith Douglas November 30 inventory and presale deadlines are reconciled, Eastwood package scopes and three new incentive panels are current, and True Homes no longer implies an active $2,000 credit. M/I FHA and ARM cards retain the exact December 1 contract and December 31 closing dates in both static and client data.',
  items: [
    {id:'drb-charlotte-community-status-current',builder:'DRB Homes',community:'Withrow Heights',change:'changed',offer:'Active listing with pricing from $319,900',details:'Official directory and community page no longer label Withrow Heights Coming Soon. The exact-address map pin now uses the active-listing label.',source:drbStatus.source,source_name:'DRB Homes',evidence:'Current official directory and community page reviewed.',checked_date:checked,deadline:null,publication_date:null,compared_to:'Prior Coming Soon label'},
    {id:'lennar-charlotte-community-status-nov23',builder:'Lennar',community:'Charlotte market',change:'changed',offer:'116 move-in-ready and quick-move-in homes',details:'The current market page no longer reproduces the prior 153-home snapshot; a current total community count is unavailable.',source:'https://www.lennar.com/new-homes/north-carolina/charlotte',source_name:'Lennar',evidence:'Current official Charlotte market page reviewed.',checked_date:checked,deadline:null,publication_date:null,compared_to:'Prior 153 available homes'},
    {id:'pulte-mallard-park-arm',builder:'Pulte Homes',community:'Mallard Park',change:'changed',offer:'4.990% 7/6 ARM · visible 5.998%–6.013% APR',details:'Current visible homesite examples no longer reproduce the prior 5.968% lower bound. Universal dates and stacking remain unavailable.',source:'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379',source_name:'Pulte Homes',evidence:'Current official inventory result reviewed.',checked_date:checked,deadline:null,publication_date:null,compared_to:'Prior visible 5.968%–6.013% range'},
    {id:'smith-nov30-current-terms',builder:'Smith Douglas Homes',community:'Ember Glen, Winecoff, Rowe Crossing, Cedar Meadows and Catawba Trace',change:'changed',offer:'Current inventory and presale packages · contract by November 30',details:'Current legal terms reconcile each separate inventory and presale amount. Preferred lender/title/attorney, approval, no prior contracts and no combining apply; closing dates and complete loan terms remain unavailable.',source:'https://www.smithdouglas.com/communities/charlotte-nc',source_name:'Smith Douglas Homes',evidence:'Full current official community legal terms reviewed.',checked_date:checked,deadline:'Contract 2026-11-30; close unavailable',publication_date:null,compared_to:'Prior stale or unavailable deadlines'},
    {id:'eastwood-specials-nov26',builder:'Eastwood Homes',community:'Charlotte-area specials',change:'changed',offer:'Updated appliance scopes + new $1,000/$5,000 Flex Cash and Carrington fence panels',details:'All three new panels publish incomplete financing/date conditions, which remain flagged unavailable. Big Red Bow lower-rate panel still names 16 communities and a December 31 purchase date without a rate or APR.',source:'https://www.eastwoodhomes.com/special-offers',source_name:'Eastwood Homes',evidence:'Full current official Specials page reviewed.',checked_date:checked,deadline:'Big Red Bow purchase 2026-12-31; new panel deadlines unavailable',publication_date:null,compared_to:'November 25 scopes'},
    {id:'mi-static-client-consistency-nov26',builder:'M/I Homes',community:'Charlotte metro',change:'unchanged',offer:'5.25% FHA fixed / 4.875% Conventional 7/6 ARM · up to 3% closing costs',details:'Both financing cards and the matching closing-cost card use one source record with a December 1 contract deadline and December 31 closing deadline. No duplicate M/I cards were added.',source:'https://www.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/home-sweet-savings-2026',source_name:'M/I Homes',evidence:'Current official indexed terms reverified and static/client output checked.',checked_date:checked,deadline:'Contract 2026-12-01; close 2026-12-31',publication_date:null,compared_to:'Existing corrected M/I records'},
  ],
});
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
