import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-17.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-18.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
data.reviewed = '2026-11-18';

const byId = new Map(data.offers.map((offer) => [offer.id, offer]));

Object.assign(byId.get('lennar-fall-super-sale'), {
  id: 'lennar-black-friday-nov16-nov22-rate',
  c: 'Black Friday Sales Event · select greater-Charlotte homes',
  offer: '4.375% FHA 5/1 ARM · 7.454% APR + up to $7,500 closing costs',
  tags: ['rate', 'closing'],
  source: 'https://www.lennar.com/new-homes/north-carolina/charlotte/promo/gallen_blackfriday26',
  detail: "Lennar's current official Charlotte Black Friday page advertises a 4.375% FHA 5/1 ARM with a 7.454% APR plus up to $7,500 toward closing costs on select greater-Charlotte homes. The rate is fixed for the first five years, then adjusts annually beginning in year six. Buyers must sign from November 16 through November 22, 2026 and close by January 25, 2027. Both incentives require financing through Lennar Mortgage. The official public summary does not publish the minimum score, down-payment assumption, adjustment index, margin, caps, points, eligible-home list or complete stacking rules; those terms remain unavailable.",
  checked: '2026-11-18',
  start: '2026-11-16',
  end: '2026-11-22',
  close: '2027-01-25',
  rate: 4.375,
  apr: 7.454,
  amount: 7500,
  loan: 'FHA 5/1 ARM · fixed for 60 months, then adjusts annually · score, down payment, index, margin and caps unavailable',
  lender: 'Lennar Mortgage, LLC required for rate and closing-cost offers',
  flags: ['move'],
  terms: 'Contract Nov. 16–22 · close by Jan. 25 · select greater-Charlotte homes · rate and payment may increase',
  access: 'Full current official Lennar promotion reviewed November 18',
  deadlineType: 'Contract deadline',
  tag: 'rate'
});

Object.assign(byId.get('mi-home-sweet-fha'), {
  checked: '2026-11-18',
  apr: 6.039,
  offer: '5.25% FHA fixed · 6.039% APR',
  detail: "M/I Homes' current official Lower Monthly Payments page advertises a 5.25% fixed rate with a 6.039% APR on a 30-year FHA loan for select Charlotte-area quick move-in homes. The illustration uses a $350,000 sales price, $337,750 base loan amount, $343,660 financed amount including the 1.75% upfront MIP, 3.5% down and a 640 minimum score. The program applies to new contracts written on or after November 9, 2026; homes must close by December 31. Financing through M/I Financial is required, buyers must apply within 48 hours, and the home must be a primary residence. The page also publishes a separate Conventional 7/6 ARM and up-to-3% closing-cost option, recorded separately.",
  access: 'Fresh current official-page indexed disclosure reviewed November 18; direct full-page retrieval was unavailable'
});

Object.assign(byId.get('mi-home-sweet-arm'), {
  c: 'Lower Monthly Payments · select Charlotte-area quick move-in homes',
  offer: '4.875% Conventional 7/6 ARM · 5.763% APR',
  kind: 'official',
  source: 'https://www.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/lower-monthly-payments-2026',
  detail: "M/I Homes' current official Lower Monthly Payments page again publishes a 4.875% Conventional 7/6 ARM with a 5.763% APR on select Charlotte-area quick move-in homes. The ARM is fixed for the first 84 months and may adjust every six months thereafter. The illustration assumes a $500,000 sales price, $400,000 loan, 20% down, 780 minimum score, primary residence and a $900 origination fee. The page requires new contracts on or after November 9, 2026, closing by December 31, financing through M/I Financial and a mortgage application within 48 hours. Index, margin, adjustment caps, points and the complete eligible-home list remain unavailable on the public summary.",
  checked: '2026-11-18',
  start: '2026-11-09',
  end: null,
  close: '2026-12-31',
  rate: 4.875,
  apr: 5.763,
  loan: 'Conventional 7/6 ARM · 20% down · 780 minimum score · primary residence · $900 origination fee',
  lender: 'M/I Financial, LLC required; application within 48 hours',
  flags: ['move'],
  terms: 'New contracts from Nov. 9 · close by Dec. 31 · select quick move-ins · rate may adjust after 84 months',
  access: 'Fresh current official-page indexed disclosure reviewed November 18; direct full-page retrieval was unavailable',
  deadlineType: 'Closing deadline',
  tag: 'rate'
});

Object.assign(byId.get('mi-holiday-of-homes-closing-dec1'), {
  c: 'Lower Monthly Payments · select Charlotte-area homes',
  source: 'https://www.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/lower-monthly-payments-2026',
  checked: '2026-11-18',
  detail: "M/I Homes' current official Lower Monthly Payments page advertises up to 3% of base price toward allowable closing costs when financing through M/I Financial. Contracts must be written by December 1, 2026 and homes must close by December 31. The contribution may vary by home and community, remains subject to lender and agency limits, and does not replace the buyer's required down payment or upfront mortgage-insurance premium. The page does not publish a universal dollar cap, exact eligible-home list or stacking rule; those terms remain unavailable.",
  access: 'Fresh current official-page indexed disclosure reviewed November 18; direct full-page retrieval was unavailable',
  extraSources: []
});

Object.assign(byId.get('drhorton-charlotte-community-status'), {
  offer: 'Community update · 30 communities · current inventory 262 homes · Falls Cove Sold Out',
  detail: "D.R. Horton's current official Charlotte inventory reports 30 communities and 262 homes for sale. Anderson Street Townhomes, Kingman Townhomes and Oak Grove Hill remain Now Selling; Sonoma Hills and Reedy Creek Preserve remain Final Opportunities; Cardinal Creek remains New Model Open; Brandon Creek remains New Phase Now Selling; Ashenwood Commons remains Coming Soon; and Falls Cove remains Sold Out. Ashenwood still lacks a street number, so no map pin is added.",
  checked: '2026-11-18',
  terms: '30 communities · 262 current inventory homes · Falls Cove Sold Out · Ashenwood Coming Soon',
  access: 'Current official Charlotte inventory and regional directory reviewed November 18'
});

Object.assign(byId.get('eastwood-big-red-bow-rates-dec31'), {
  c: '16 Charlotte-area communities',
  detail: "Eastwood's current Big Red Bow event advertises below-market interest rates on select homes at 16 Charlotte-area communities: Ashton Park, Blythe Mill Townhomes, Bryton Crossing Townhomes, Caldwell Forest, Carrington, Enclave at Riverdale, Harrisburg Village Townhomes, Norman Creek, Norman Creek Townhomes, Robinson Oaks, Rone Creek, The Enclave at Laurelbrook, The Fairways at Springlake, The Greens at Springlake, The Meadows at Laurelbrook and Waterford Commons. Buyers must purchase by December 31, 2026. The public panel does not publish the note rate, APR, loan type, lender, minimum score, down payment, closing deadline, points or stacking rule; those terms remain unavailable.",
  checked: '2026-11-18',
  terms: 'Purchase by Dec. 31 · select homes at 16 named communities · financing details unavailable',
  access: 'Full current official Specials page reviewed November 18'
});

const commonTriPointe = {
  b: 'Tri Pointe Homes',
  city: 'Charlotte metro · NC & SC',
  counties: [],
  kind: 'official',
  sourceName: 'Tri Pointe Homes',
  checked: '2026-11-18',
  published: null,
  close: '2026-12-30',
  lender: 'Tri Pointe Connect required',
  flags: ['move'],
  extraSources: [],
  deadlineType: 'Contract deadline'
};

const newOffers = [
  {
    ...commonTriPointe,
    id: 'tripointe-fha-4000-321-nov30',
    c: 'Camryn at Southbridge · Context at Oakhurst · Seven Oaks · Amplitude · Grahym at Southbridge',
    offer: '4.000% first year · 7.631% APR · FHA 3/2/1 temporary buydown',
    tags: ['rate'],
    source: 'https://www.tripointehomes.com/promotion/nc/charlotte/the-value-of-now-sales-event-camryn-ay-southbridge-rate',
    detail: "Tri Pointe's current official community promotion pages advertise a 4.000% first-year rate with a 7.631% APR on an FHA 30-year fixed loan using a 3/2/1 temporary buydown at Camryn at Southbridge, Context at Oakhurst, Seven Oaks, Amplitude and Grahym at Southbridge. The underlying note rate is 7.000%: payments use 4.000% in year one, 5.000% in year two, 6.000% in year three and 7.000% thereafter. The public illustration uses owner occupancy, 3.5% down and a 680 score. Buyers must contract by November 30 and close by December 30, finance through Tri Pointe Connect, and select an eligible homesite while supplies last. Existing contracts are excluded; the offer cannot be combined, and unused incentive is forfeited.",
    start: null,
    end: '2026-11-30',
    rate: 4,
    apr: 7.631,
    amount: null,
    loan: 'FHA 30-year fixed with 3/2/1 temporary buydown · 7.000% note rate · 3.5% down and 680 score illustrated',
    terms: 'Contract by Nov. 30 · close by Dec. 30 · owner-occupied illustration · eligible homesites · no existing contracts or stacking',
    access: 'Current official Camryn, Seven Oaks, Amplitude and Grahym rate disclosures plus Charlotte directory reviewed November 18',
    tag: 'rate'
  },
  {
    ...commonTriPointe,
    id: 'tripointe-conventional-4490-321-nov30',
    c: 'Ascend · Ross Farms',
    offer: '4.490% first year · 8.127%–8.134% APR · Conventional 3/2/1 temporary buydown',
    tags: ['rate'],
    source: 'https://www.tripointehomes.com/promotion/nc/charlotte/the-value-of-now-sales-event-ascend-rate',
    detail: "Tri Pointe's current official Ascend and Ross Farms pages advertise a 4.490% first-year rate on a Conventional 30-year fixed loan using a 3/2/1 temporary buydown. The APR is 8.134% at Ascend and 8.127% at Ross Farms; the underlying note rate is 7.490%. Ross Farms' illustration uses owner occupancy, 10% down and a 740 score. Buyers must contract by November 30 and close by December 30, use Tri Pointe Connect and select an eligible home while supplies last. Existing contracts are excluded; the offer cannot be combined, and unused incentive is forfeited.",
    start: null,
    end: '2026-11-30',
    rate: 4.49,
    apr: 8.127,
    amount: null,
    loan: 'Conventional 30-year fixed with 3/2/1 temporary buydown · 7.490% note rate · 10% down and 740 score illustrated at Ross Farms',
    terms: 'Contract by Nov. 30 · close by Dec. 30 · eligible homes · no existing contracts or stacking',
    access: 'Current official Ascend and Ross Farms rate disclosures reviewed November 18',
    extraSources: [{name:'Ross Farms rate disclosure',url:'https://www.tripointehomes.com/promotion/nc/charlotte/the-value-of-now-sales-event-ross-farms-rate',note:'Official 4.490% / 8.127% APR terms'}],
    tag: 'rate'
  },
  ...[
    ['tripointe-seven-oaks-50k','Seven Oaks · move-in-ready or to-be-built homesites',50000,'https://www.tripointehomes.com/promotion/nc/charlotte/the-value-of-now-sales-event-seven-oaks'],
    ['tripointe-ascend-55k','Ascend · move-in-ready or ready-to-build homesites',55000,'https://www.tripointehomes.com/promotion/nc/charlotte/the-value-of-now-sales-event-ascend-flex'],
    ['tripointe-bellflower-40k','Bellflower · move-in-ready or to-be-built homesites',40000,'https://www.tripointehomes.com/promotion/nc/charlotte/the-value-of-now-sales-event-Bellflower-flex'],
    ['tripointe-context-30k','Context at Oakhurst · move-in-ready or to-be-built homesites',30000,'https://www.tripointehomes.com/promotion/nc/charlotte/the-value-of-now-sales-event-context-at-oakhurst'],
    ['tripointe-grahym-30k','Grahym at Southbridge · move-in-ready or to-be-built homesites',30000,'https://www.tripointehomes.com/promotion/nc/charlotte/the-value-of-now-sales-event-grahym-at-southbridge'],
    ['tripointe-amplitude-7500','Amplitude · move-in-ready homesites',7500,'https://www.tripointehomes.com/promotion/nc/charlotte/the-value-of-now-sales-event-amplitude-7500-closing-credit']
  ].map(([id,c,amount,source]) => ({
    ...commonTriPointe,
    id,
    c,
    offer: `Up to $${amount.toLocaleString('en-US')} closing credit · choose eligible rate, price, closing-cost, move-in or design uses`,
    tags: ['closing','price','upgrade'],
    source,
    detail: `Tri Pointe's current official promotion offers up to $${amount.toLocaleString('en-US')} in closing credit on eligible list-price homesites. Depending on the community, buyers may allocate the capped credit among a special mortgage rate, price reduction, specified non-recurring closing costs, eligible design-studio selections and/or a builder-selected move-in package. Contracts must be written by December 30, 2026 while supplies last, and financing must use Tri Pointe Connect. Existing contracts are excluded. The credit excludes taxes, insurance, mortgage installments and other prepaids; unused amounts are forfeited. A note rate, APR, score, down payment and separate closing deadline are not published for this credit.`,
    start: '2026-10-01',
    end: '2026-12-30',
    close: null,
    rate: null,
    apr: null,
    amount,
    loan: 'Loan type, note rate, APR, score and down payment unavailable; certain programs may not qualify',
    terms: 'Contract by Dec. 30 · list-price eligible homesites · select uses only · no existing contracts · unused credit forfeited',
    access: 'Full current official promotion and legal disclosure reviewed November 18',
    deadlineType: 'Contract deadline',
    tag: 'closing'
  }))
];

const mapSources = {
  'tripointe-seven-oaks-50k': ['Seven Oaks · Now Selling', '316 Ardmore Dr, Belmont, NC 28012'],
  'tripointe-ascend-55k': ['Ascend · Now Selling', '14018 Meera Lane, Charlotte, NC 28277'],
  'tripointe-bellflower-40k': ['Bellflower · Now Selling', '3013 Circles End, Charlotte, NC 28226'],
  'tripointe-context-30k': ['Context at Oakhurst · Now Selling', '6008 Pivot Ct, Charlotte, NC 28205'],
  'tripointe-grahym-30k': ['Grahym at Southbridge · Now Selling', '467 Nash St, Fort Mill, SC 29708'],
  'tripointe-amplitude-7500': ['Amplitude · Now Selling', '6311 Haller St, Charlotte, NC 28215']
};
for (const offer of newOffers) {
  const pin = mapSources[offer.id];
  if (!pin) continue;
  offer.extraSources = [{
    name: 'Google Maps directions',
    community: pin[0],
    url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pin[1]).replace(/%20/g, '+')}`,
    note: 'Exact available-home address published on the current official promotion page'
  }];
}

newOffers.push({
  id: 'true-charlotte-community-status-current',
  b: 'True Homes',
  c: 'Charlotte city communities',
  city: 'Charlotte, NC',
  counties: ['Mecklenburg'],
  offer: 'Community update · 4 official Charlotte community pages currently label Now Selling',
  tags: [],
  kind: 'official',
  source: 'https://www.truehomes.com/new-construction-homes/nc/charlotte',
  sourceName: 'True Homes',
  detail: "True Homes' current official Charlotte pages label Duke's Ridge, Village at Reedy Creek Townhomes, Hoover Townes and Clark Village Townhomes as Now Selling and publish exact Charlotte addresses for each. The separate Home Finder was displaying a live syncing notice during this review, so a broader live-lot count and any unlisted or sold-out True Homes communities are unavailable rather than inferred. No new sold-out notice was found on the four current Charlotte community pages.",
  checked: '2026-11-18',
  published: null,
  start: null,
  end: null,
  close: null,
  rate: null,
  apr: null,
  amount: null,
  loan: 'Community-status record only; current $2,000 preferred-lender credit is listed separately',
  lender: 'Not applicable to the status record',
  flags: ['move'],
  terms: '4 Charlotte community pages labeled Now Selling · broader Home Finder inventory unavailable while syncing',
  access: 'Current official Charlotte directory, four community pages and Home Finder reviewed November 18',
  extraSources: [
    {name:"Duke's Ridge",url:'https://www.truehomes.com/new-home-communities/dukes-ridge',note:'Official Now Selling page',community:"Duke's Ridge · Now Selling"},
    {name:'Google Maps directions',url:'https://www.google.com/maps/search/?api=1&query=2932+Smithcliff+Rd%2C+Charlotte%2C+NC+28208',note:'Exact community address published by True Homes',community:"Duke's Ridge · Now Selling"},
    {name:'Village at Reedy Creek Townhomes',url:'https://www.truehomes.com/new-home-communities/village-at-reedy-creek-townhomes',note:'Official Now Selling page',community:'Village at Reedy Creek Townhomes · Now Selling'},
    {name:'Google Maps directions',url:'https://www.google.com/maps/search/?api=1&query=11720+Avocet+St%2C+Charlotte%2C+NC+28215',note:'Exact community address published by True Homes',community:'Village at Reedy Creek Townhomes · Now Selling'},
    {name:'Hoover Townes',url:'https://www.truehomes.com/new-home-communities/hoover-townhomes',note:'Official Now Selling page',community:'Hoover Townes · Now Selling'},
    {name:'Google Maps directions',url:'https://www.google.com/maps/search/?api=1&query=2237+Friendship+Fern+Road%2C+Charlotte%2C+NC+28213',note:'Exact community address published by True Homes',community:'Hoover Townes · Now Selling'},
    {name:'Clark Village',url:'https://www.truehomes.com/new-home-communities/clark-village-townhomes',note:'Official Now Selling page',community:'Clark Village Townhomes · Now Selling'},
    {name:'Google Maps directions',url:'https://www.google.com/maps/search/?api=1&query=2306+Jons+Creek+Lane%2C+Charlotte%2C+NC+28213',note:'Exact community address published by True Homes',community:'Clark Village Townhomes · Now Selling'},
    {name:'True Homes Home Finder',url:'https://homefinder.truehomesusa.com/',note:'Displayed syncing-in-progress notice during review'}
  ],
  deadlineType: 'Offer deadline',
  tag: 'status'
});

data.offers.push(...newOffers);
fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
