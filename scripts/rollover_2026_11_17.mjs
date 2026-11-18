import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-16.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-17.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const checked = '2026-11-17';

data.reviewed = checked;

function get(id) {
  const offer = data.offers.find((item) => item.id === id);
  if (!offer) throw new Error(`Missing offer ${id}`);
  return offer;
}

function upsert(offer) {
  const index = data.offers.findIndex((item) => item.id === offer.id);
  if (index >= 0) data.offers[index] = offer;
  else data.offers.push(offer);
}

Object.assign(get('lennar-fall-super-sale'), {
  c: 'Charlotte-area move-in-ready inventory',
  offer: 'Black Friday inventory CTA · 122 broad-market QMI · exact financing terms unavailable',
  source: 'https://www.lennar.com/new-homes/north-carolina/charlotte',
  detail: "Lennar's current official Charlotte market page reports 122 move-in-ready and quick move-in homes across the broad market, while the current Charlotte-city inventory filter displays a Black Friday call-to-action alongside 18 homes in three communities and current Homes of the Week price reductions. The expired November 9-15 mortgage campaign remains in history and is not applied to current inventory. Current pages do not publish a universal discount, replacement note rate, APR, eligible-address list, contract deadline, closing deadline, credit score, down payment, points or stacking rule. Lennar Mortgage may be required for some builder financing incentives, but is not required to purchase.",
  checked,
  loan: 'Current inventory pages do not publish a replacement loan type, note rate, APR, score or down payment',
  lender: 'Lennar Mortgage is optional to purchase; select financing incentives may require it',
  terms: '122 broad-market QMI · Charlotte-city filter shows 18 homes / 3 communities · Black Friday CTA · exact rate, credit and deadline unavailable',
  access: 'Current official Charlotte market, city-filter and Homes of the Week pages reviewed November 17',
  extraSources: [
    {
      name: 'Lennar Homes of the Week',
      url: 'https://www.lennar.com/new-homes/north-carolina/charlotte/home-of-the-week',
      note: 'Current official home-specific price reductions; universal financing terms unavailable'
    }
  ]
});

Object.assign(get('drb-charlotte-fha-arm-current'), {
  offer: 'Unavailable: prior 4.99% FHA 5/1 ARM · 6.679% APR no longer reproduced',
  kind: 'historical',
  end: '2026-11-16',
  detail: "DRB Homes' Charlotte directory no longer reproduces the 4.99% FHA 5/1 ARM and 6.679% APR disclosure that was visible on November 16. Because the current official source does not support those terms, the record is retained only for audit history and hidden from the active comparison. The site does not infer cancellation or the loss of terms already secured by a buyer. Current rate, APR, lender, underwriting, adjustment terms, eligible homes and deadlines are unavailable.",
  checked,
  rate: null,
  apr: null,
  loan: 'Current DRB Charlotte directory does not publish a promotional loan structure',
  lender: 'Current lender requirement unavailable',
  flags: [],
  terms: 'No longer reproduced on current official directory · current rate, APR, eligibility and deadline unavailable',
  access: 'Full current official Charlotte directory reviewed November 17; prior financing disclosure absent',
  deadlineType: 'Last reproduced'
});

Object.assign(get('drb-charlotte-community-status-current'), {
  offer: 'Community update · River Point now listed for sale · Leigh Park Final Opportunity · Withrow Heights Coming Soon',
  detail: "DRB's current Charlotte directory lists active communities including Bell Glen, Odell Park, Greenway Overlook, Brook Run, River Point Single Family Homes, Farms at Bellingham, Lakeside Glen, River District Townhomes, Michaux Gardens, Miller Farm, McBride and River District Single Family Homes. River Point is now listed with pricing and floorplans rather than a Coming Soon label. Leigh Park remains Final Opportunity. Withrow Heights remains Coming Soon and still says Opening Fall 2026; the site preserves that builder label rather than inferring an opening. No Charlotte-region DRB community is labeled sold out on the reviewed directory.",
  checked,
  terms: 'Current official directory · River Point active · Leigh Park Final Opportunity · Withrow Heights Coming Soon · no sold-out DRB community identified',
  access: 'Full current official Charlotte directory reviewed November 17',
  extraSources: get('drb-charlotte-community-status-current').extraSources.map((source) =>
    source.community === 'River Point · Coming Soon'
      ? {...source, community: 'River Point · Now Selling', note: 'Exact address published by DRB Homes; current directory lists pricing and floorplans'}
      : source
  )
});

Object.assign(get('pulte-mallard-park-arm'), {
  offer: '4.990% Conventional 7/6 ARM · 5.997%–5.998% APR · up to $20,000 savings',
  detail: "Pulte's current official Mallard Park inventory displays a 4.990% Conventional 7/6 ARM on select quick move-ins, with currently visible homesite APRs of 5.997% and 5.998% and up to $20,000 in price savings. The rate is fixed for seven years and then adjusts every six months. Pulte's financing disclosure identifies a Pulte Mortgage Builder Forward Commitment, a 780 FICO illustration and application of available incentives toward closing costs and discount points. Pulte Mortgage is required for the BFC rate but not to purchase. A contract deadline, closing deadline, adjustment caps, index and margin, owner-occupancy rule and stacking terms remain unavailable.",
  checked,
  apr: 5.997,
  terms: 'Select quick move-ins · Pulte Mortgage/BFC · 780 FICO illustration · deadlines, adjustment formula and stacking unavailable',
  access: 'Current official Mallard Park inventory and financing disclosures reviewed November 17'
});

Object.assign(get('mi-home-sweet-fha'), {
  c: 'Lower Monthly Payments · select Charlotte-area quick move-in homes',
  offer: '5.25% FHA fixed · 6.040% APR',
  source: 'https://proddamintegration.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/lower-monthly-payments-2026',
  detail: "M/I Homes' current official Lower Monthly Payments page advertises a 5.25% rate and 6.040% APR on a 30-year fixed FHA loan for select Charlotte-area quick move-in homes. The program applies to eligible new contracts written after November 9, 2026. The published example uses a $343,660 financed amount including 1.75% upfront FHA mortgage insurance, 3.5% down and a minimum 640 score. Buyers must occupy the home as a primary residence, apply with M/I Financial within 48 hours and close by December 31. Cancellations, rewrites and transfers are excluded. The page does not publish a contract-end date, complete eligible-address list or stacking rule beyond agency seller-contribution limits.",
  checked,
  start: '2026-11-09',
  end: null,
  close: '2026-12-31',
  apr: 6.04,
  loan: '30-year FHA fixed · 3.5% down · 640 minimum FICO · primary residence · apply within 48 hours',
  lender: 'M/I Financial required',
  terms: 'New contracts after Nov. 9 · close by Dec. 31 · select QMI · no rewrites or transfers · contract-end date unavailable',
  access: 'Fresh official integration-host page indexed November 17; production URL remains inaccessible',
  extraSources: []
});

Object.assign(get('mi-home-sweet-arm'), {
  offer: 'Unavailable: prior 4.875% Conventional 7/6 ARM · 5.763% APR not on current production offer',
  kind: 'historical',
  end: '2026-11-16',
  detail: "M/I Homes' production URL for the prior Home Sweet Savings ARM is unavailable, and the current official Lower Monthly Payments page publishes only the separate 5.25% FHA fixed offer. The 4.875% Conventional 7/6 ARM and 5.763% APR remain visible only on an alternate integration-host page. They are therefore retained for audit history and removed from the active comparison rather than represented as current production terms.",
  checked,
  rate: null,
  apr: null,
  loan: 'Prior alternate-host Conventional 7/6 ARM terms retained only in history',
  lender: 'Current production eligibility unavailable',
  flags: [],
  terms: 'Production page unavailable · current official offer page does not reproduce the ARM · do not rely on prior rate',
  access: 'Current Lower Monthly Payments page reviewed November 17; prior ARM production URL unavailable',
  extraSources: [],
  deadlineType: 'Last reproduced'
});

Object.assign(get('eastwood-charlotte-closing-costs'), {
  c: 'Current Charlotte-area closing-cost panels',
  offer: 'Up to $5,000 closing costs · Robinson Oaks up to $7,500 · Carrington up to $10,000 or $3,500 in separate panels',
  detail: "Eastwood's current official Specials page advertises up to $5,000 toward closing costs on select quick move-in homes at 12 Charlotte-area communities: Chasewood, Bryton Crossing Townhomes, Caldwell Forest, Rone Creek, Rock Creek, Blythe Mill Townhomes, Robinson Oaks, Founders Landing, The Fairways at Springlake, Waterford Commons, The Greens at Springlake and Norman Creek. Meadows at Laurelbrook and Harrisburg Village Townhomes no longer appear in this $5,000 panel. A separate current panel advertises up to $7,500 at Robinson Oaks. Carrington appears in two separate current panels—up to $10,000 and up to $3,500—and the site does not add or assume they stack. An Eastwood preferred lender is required. Rate, APR, loan type, score, contract deadline, closing deadline, exact eligible-address lists and stacking terms are unavailable.",
  checked,
  terms: 'Preferred lender required · $5,000 panel now lists 12 Charlotte-area communities · separate Robinson Oaks and Carrington tiers · deadlines unavailable',
  access: 'Full current official Specials page reviewed November 17'
});

Object.assign(get('eastwood-charlotte-move-in-package'), {
  checked,
  access: 'Full current official Specials page reviewed November 17; current community participation preserved'
});

Object.assign(get('smith-charlotte-inventory-475-arm-55-fixed'), {
  c: 'Select Sunset Meadows, Dawson Landing, Catawba Trace and Winecoff inventory homes',
  offer: '4.75% 5/1 ARM OR 5.5% 30-year fixed · APR and full qualification terms unavailable',
  detail: "Smith Douglas' current official inventory pages label four specific homes—4236 Ruth Creek Court in Sunset Meadows, 6011 Old Plank Road in Dawson Landing, 2312 Painted Trail in Catawba Trace and 628 Cooley Drive in Winecoff—as eligible for a 4.75% 5/1 ARM or a separate 5.5% 30-year fixed option. Dawson eligibility moved from 5975 to 6011 Old Plank Road. The public pages do not publish a matching APR, loan type for the fixed rate, lender requirement, score, down payment, points, adjustment terms, deadline, closing-cost credit or stacking rule. Older 4.99% legal disclosures are not used to fill these gaps.",
  checked,
  terms: 'Four named inventory homes · APR, score, down payment, lender, deadlines, points and stacking unavailable',
  access: 'Current official market inventory and community pages reviewed November 17',
  extraSources: [
    ...get('smith-charlotte-inventory-475-arm-55-fixed').extraSources,
    {
      name: 'Dawson Landing',
      url: 'https://www.smithdouglas.com/communities/charlotte-nc/charlotte/dawson-landing',
      note: 'Current official inventory card identifies 6011 Old Plank Road as 4.75% ARM / 5.5% fixed eligible'
    },
    {
      name: 'Winecoff',
      url: 'https://www.smithdouglas.com/communities/charlotte-nc/salisbury/winecoff',
      note: 'Current official inventory card identifies 628 Cooley Drive as 4.75% ARM / 5.5% fixed eligible'
    }
  ]
});

Object.assign(get('smith-winecoff-current-16k'), {
  c: 'Winecoff · final homesites',
  offer: 'Up to $20,000 closing costs on selected homes · other listed homes show $16,000',
  tags: ['closing'],
  source: 'https://www.smithdouglas.com/communities/charlotte-nc/salisbury/winecoff',
  detail: "Winecoff's current official community page says qualified buyers can receive up to $20,000 toward closing costs with the preferred lender. Current inventory cards show $20,000 at 634 and 640 Cooley Drive, $16,000 at 664 and 670 Cooley Drive, and a separate 4.75% 5/1 ARM / 5.5% fixed label at 628 Cooley Drive. The page does not publish a current matching contract deadline, closing deadline, APR, credit score, down payment, points or stacking terms. Its older October 31 legal footer is not reused as current eligibility language.",
  checked,
  rate: null,
  apr: null,
  amount: 20000,
  loan: 'Preferred-lender closing credit; rate options on separate selected inventory home',
  lender: 'Preferred lender required for the closing-cost credit',
  flags: ['move'],
  terms: 'Now Selling / final homesites · selected homes show $20,000 or $16,000 · current deadline, APR and stacking unavailable',
  access: 'Full current official Winecoff community and inventory page reviewed November 17',
  deadlineType: 'Offer deadline',
  tag: 'closing'
});

Object.assign(get('smith-ember-current-upgrades-15k'), {
  offer: 'Half off upgrades up to $20,000',
  detail: "Ember Glen's current official community header and current Charlotte-city directory now both advertise half off upgrades up to $20,000. The prior $15,000/$20,000 conflict is resolved in the current pages. Current eligible homes, calculation method, lender requirement, financing conditions, contract and closing deadlines and stacking rules remain unavailable; the expired October 31 legal footer is not reused.",
  checked,
  amount: 20000,
  terms: 'Grand Opening · half off upgrades up to $20,000 · current eligibility, deadline and stacking unavailable',
  access: 'Full current official Ember Glen page and Charlotte-city directory reviewed November 17',
  extraSources: [
    {
      name: 'Smith Douglas Charlotte city directory',
      url: 'https://www.smithdouglas.com/communities/charlotte-nc/charlotte',
      note: 'Current directory also displays half off upgrades up to $20,000'
    }
  ]
});

Object.assign(get('smith-ember-current-inventory-15k'), {
  c: 'Ember Glen · select inventory homes',
  offer: 'Up to $15,000 closing costs + move-in package on four listed homes',
  detail: "Current official inventory cards at Ember Glen advertise up to $15,000 in closing costs plus a move-in package on 2671 and 2667 Spinalis Street, 5426 Porterhouse Way and 2655 Spinalis Street. The page does not publish current matching package contents, lender, loan, rate, APR, score, down payment, contract deadline, closing deadline or stacking terms. Its older legal footer ended October 31 and is not used to fill the current-card gaps.",
  checked,
  terms: 'Four current inventory cards · up to $15,000 + package · package contents, deadline and stacking unavailable',
  access: 'Full current official Ember Glen inventory page reviewed November 17'
});

Object.assign(get('smith-charlotte-community-status-current'), {
  checked,
  access: 'Current official 14-community Charlotte market directory and 6-community Charlotte-city directory reviewed November 17'
});

upsert({
  id: 'tripointe-charlotte-399-first-year',
  b: 'Tri Pointe Homes',
  c: 'Value of Now · select Charlotte move-in-ready homes',
  city: 'Charlotte metro · NC & SC',
  counties: ['Mecklenburg', 'York'],
  offer: '3.990% first-year Conventional fixed rate · 5.554% APR',
  tags: ['rate'],
  kind: 'official',
  source: 'https://www.tripointehomes.com/promotion/nc/charlotte/the-value-of-now-sales-event-charlotte-special-rate',
  sourceName: 'Tri Pointe Homes',
  detail: "Tri Pointe's current official Charlotte promotion offers a 3.990% first-year rate with a 5.554% APR through a 1/0 temporary buydown on a 30-year Conventional fixed loan. The underlying note rate is 4.990% for the full term; the first-year payment is subsidized by one percentage point. The illustration uses a $459,990 price, $367,992 loan, 20% down, owner occupancy, 780 score and $21,482 in builder-paid points and fees. Buyers must purchase an eligible list-price home between October 28 and December 31, finance through Tri Pointe Connect and use the incentive at closing. Existing contracts, cash redemption and stacking are excluded; unused amounts are forfeited.",
  checked,
  published: null,
  start: '2026-10-28',
  end: '2026-12-31',
  close: null,
  rate: 3.99,
  apr: 5.554,
  amount: 21482,
  loan: '30-year Conventional fixed · 1/0 temporary buydown · 4.990% note rate · 20% down · 780 score illustration · owner occupied',
  lender: 'Tri Pointe Connect required',
  flags: ['move'],
  terms: 'Contract by Dec. 31 · select list-price move-in-ready homes · no existing contracts, cash redemption or stacking · closing deadline unavailable',
  access: 'Full current official promotion and legal disclosure reviewed November 17',
  extraSources: [
    {
      name: 'Google Maps directions',
      community: 'Camryn at Southbridge · Now Selling',
      url: 'https://www.google.com/maps/search/?api=1&query=221+Landy+Street%2C+Fort+Mill%2C+SC+29708',
      note: 'Exact available-home address published on the current official promotion page'
    }
  ],
  deadlineType: 'Contract deadline',
  tag: 'rate'
});

upsert({
  id: 'tripointe-millstone-40k-current',
  b: 'Tri Pointe Homes',
  c: 'Millstone · move-in-ready or ready-to-build homesites',
  city: 'Cramerton, NC',
  counties: ['Gaston'],
  offer: 'Up to $40,000 closing credit · choose rate buydown, price reduction, closing costs or design options',
  tags: ['closing', 'price', 'upgrade'],
  kind: 'official',
  source: 'https://www.tripointehomes.com/promotion/nc/charlotte/the-value-of-now-sales-event-Millstone',
  sourceName: 'Tri Pointe Homes',
  detail: "Tri Pointe's current official Millstone promotion offers up to $40,000 in closing credit on eligible list-price move-in-ready or ready-to-build homesites. Buyers may allocate the capped credit among a special mortgage rate, price reduction, specified non-recurring closing costs and eligible design-studio selections. Contracts must be written October 1 through December 30, 2026, while supplies last, and financing must use Tri Pointe Connect. Existing contracts are excluded. The credit excludes taxes, insurance, mortgage installments and other prepaids; unused amounts are forfeited. A note rate, APR, score, down payment and closing deadline are not published.",
  checked,
  published: null,
  start: '2026-10-01',
  end: '2026-12-30',
  close: null,
  rate: null,
  apr: null,
  amount: 40000,
  loan: 'Loan type, note rate, APR, score and down payment unavailable; certain programs may not qualify',
  lender: 'Tri Pointe Connect required',
  flags: ['move'],
  terms: 'Contract by Dec. 30 · list-price eligible homesites · select uses only · no existing contracts · unused credit forfeited',
  access: 'Full current official promotion and legal disclosure reviewed November 17',
  extraSources: [
    {
      name: 'Google Maps directions',
      community: 'Millstone · Now Selling',
      url: 'https://www.google.com/maps/search/?api=1&query=709+Bowery+Place%2C+Cramerton%2C+NC+28032',
      note: 'Exact available-home address published on the current official promotion page'
    }
  ],
  deadlineType: 'Contract deadline',
  tag: 'closing'
});

const lateReport = {
  checked_at: '2026-11-17T23:56:19-05:00',
  summary: 'November 17 late refresh published to the main comparison. Current official sources produced material changes: M/I now publishes 5.25% FHA fixed at 6.040% APR for eligible post-November-9 contracts closing by December 31; its prior ARM remains only on an alternate host and was removed from the active comparison. Pulte Mallard Park now shows 5.997%-5.998% APR on 4.990% 7/6 ARM inventory. Smith Douglas moved Dawson 4.75% ARM / 5.5% fixed eligibility to 6011 Old Plank Road, raised the current Ember Glen upgrade headline to $20,000, and shows selected Winecoff homes at $20,000 or $16,000 closing costs. DRB no longer reproduces its prior 4.99%/6.679% disclosure, so that rate is now history only; River Point is now listed for sale. Tri Pointe current, fully disclosed Charlotte rate and Millstone credit programs were added. Lennar current inventory again carries a Black Friday CTA but no universal replacement rate/APR, so exact financing terms remain unavailable. Eastwood removed Meadows at Laurelbrook and Harrisburg Village from its $5,000 closing-cost panel. Expired Lennar and Meritage windows remain historical. Map pins were refreshed from current builder-published addresses, including two Tri Pointe locations.',
  items: [
    {
      change: 'new', builder: 'Tri Pointe Homes', community: 'Select Charlotte move-in-ready homes',
      offer: '3.990% first-year Conventional fixed rate · 5.554% APR',
      details: 'Current 1/0 temporary buydown. Underlying note rate 4.990% for 30 years; illustration uses 20% down, 780 score, owner occupancy and $21,482 builder-paid points/fees. Tri Pointe Connect required. Contract by December 31; closing deadline unavailable. No existing contracts, cash redemption or stacking.',
      evidence: 'Full official promotion and legal disclosure reviewed November 17.',
      deadline: 'Contract deadline 2026-12-31',
      source: 'https://www.tripointehomes.com/promotion/nc/charlotte/the-value-of-now-sales-event-charlotte-special-rate', source_name: 'Tri Pointe Homes', checked_date: checked
    },
    {
      change: 'new', builder: 'Tri Pointe Homes', community: 'Millstone · Cramerton, NC',
      offer: 'Up to $40,000 closing credit to allocate among listed uses',
      details: 'Eligible list-price move-in-ready or ready-to-build homesites. Tri Pointe Connect required. Credit may fund a rate buydown, price reduction, specified non-recurring closing costs or eligible design options; unused amounts are forfeited. Exact rate/APR, score, down payment and closing deadline unavailable.',
      evidence: 'Full official promotion and legal disclosure reviewed November 17.',
      deadline: 'Contract deadline 2026-12-30',
      source: 'https://www.tripointehomes.com/promotion/nc/charlotte/the-value-of-now-sales-event-Millstone', source_name: 'Tri Pointe Homes', checked_date: checked
    },
    {
      change: 'changed', builder: 'M/I Homes', community: 'Select Charlotte-area quick move-ins',
      offer: '5.25% FHA fixed · 6.040% APR',
      details: 'New current Lower Monthly Payments page applies to eligible contracts after November 9. M/I Financial, 3.5% down, 640 minimum score, primary residence, application within 48 hours and closing by December 31. Contract-end date and complete eligible-home list unavailable. The old 4.875% ARM is not on the current offer page and was removed from active comparison.',
      evidence: 'Fresh official integration-host page indexed November 17; production page inaccessible.',
      deadline: 'Close by 2026-12-31; contract-end date unavailable',
      source: 'https://proddamintegration.mihomes.com/new-homes/north-carolina/charlotte-metro/incentives/lower-monthly-payments-2026', source_name: 'M/I Homes', checked_date: checked
    },
    {
      change: 'changed', builder: 'Pulte Homes', community: 'Mallard Park',
      offer: '4.990% Conventional 7/6 ARM · 5.997%-5.998% APR',
      details: 'Current homesite APR range changed. Select inventory shows up to $20,000 savings. Pulte Mortgage/BFC and 780-score illustration; contract/closing dates, adjustment formula and stacking remain unavailable.',
      evidence: 'Current official community inventory and financing disclosure reviewed November 17.',
      deadline: null,
      source: 'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379', source_name: 'Pulte Homes', checked_date: checked
    },
    {
      change: 'changed', builder: 'Smith Douglas Homes', community: 'Ember Glen',
      offer: 'Half off upgrades up to $20,000',
      details: 'Current community header and Charlotte-city directory now agree on the $20,000 cap. Current inventory separately shows up to $15,000 closing costs plus a move-in package on four homes. Current deadlines, package legal terms and stacking remain unavailable.',
      evidence: 'Full current official community and city-directory pages reviewed November 17.',
      deadline: null,
      source: 'https://www.smithdouglas.com/communities/charlotte-nc/charlotte/ember-glen', source_name: 'Smith Douglas Homes', checked_date: checked
    },
    {
      change: 'changed', builder: 'Smith Douglas Homes', community: 'Winecoff',
      offer: 'Up to $20,000 closing costs on selected homes; other listings show $16,000',
      details: 'Current page says qualified preferred-lender buyers can receive up to $20,000. Two listed homes show $20,000, two show $16,000, and a separate inventory home shows 4.75% ARM / 5.5% fixed eligibility. Current APR, score, down payment, deadline and stacking unavailable.',
      evidence: 'Full current official Winecoff community and inventory page reviewed November 17.',
      deadline: null,
      source: 'https://www.smithdouglas.com/communities/charlotte-nc/salisbury/winecoff', source_name: 'Smith Douglas Homes', checked_date: checked
    },
    {
      change: 'changed', builder: 'Smith Douglas Homes', community: 'Dawson Landing · 6011 Old Plank Road',
      offer: '4.75% 5/1 ARM or 5.5% 30-year fixed eligibility moved to this home',
      details: 'Current inventory card moved the dual-rate label from 5975 to 6011 Old Plank Road. APR, lender, score, down payment, points, deadline and stacking are not published for these labels.',
      evidence: 'Full current official Dawson Landing inventory page reviewed November 17.',
      deadline: null,
      source: 'https://www.smithdouglas.com/communities/charlotte-nc/charlotte/dawson-landing', source_name: 'Smith Douglas Homes', checked_date: checked
    },
    {
      change: 'changed', builder: 'DRB Homes', community: 'Charlotte region',
      offer: 'Prior 4.99% FHA 5/1 ARM · 6.679% APR no longer reproduced',
      details: 'The current Charlotte directory contains neither the prior rate nor APR disclosure. It is now history only; absence is not proof of cancellation. River Point is now listed with pricing/floorplans, Leigh Park remains Final Opportunity and Withrow Heights remains Coming Soon.',
      evidence: 'Full official Charlotte directory reviewed and searched November 17.',
      deadline: null,
      source: 'https://www.drbhomes.com/drbhomes/find-your-home/communities/north-carolina/charlotte', source_name: 'DRB Homes', checked_date: checked
    },
    {
      change: 'changed', builder: 'Eastwood Homes', community: 'Charlotte closing-cost panels',
      offer: '$5,000 panel now lists 12 Charlotte-area communities',
      details: 'Meadows at Laurelbrook and Harrisburg Village Townhomes no longer appear in the $5,000 panel. Robinson Oaks retains a separate up-to-$7,500 panel; Carrington retains separate $10,000 and $3,500 panels. Preferred lender required; deadlines and stacking unavailable.',
      evidence: 'Full current official Specials page reviewed November 17.',
      deadline: null,
      source: 'https://www.eastwoodhomes.com/special-offers', source_name: 'Eastwood Homes', checked_date: checked
    },
    {
      change: 'changed', builder: 'Lennar', community: 'Charlotte inventory',
      offer: 'Black Friday CTA returned; exact universal financing terms unavailable',
      details: 'Broad market reports 122 QMI; Charlotte-city filter shows 18 homes across three communities. Current pages display address-specific price reductions but no replacement universal rate, APR, maximum credit, deadline, score, down payment or stacking rule.',
      evidence: 'Current official market, city-filter and Homes of the Week pages reviewed November 17.',
      deadline: null,
      source: 'https://www.lennar.com/new-homes/north-carolina/charlotte', source_name: 'Lennar', checked_date: checked
    }
  ]
};

if (!reviews.reports.some((report) => report.checked_at === lateReport.checked_at)) {
  reviews.reports.push(lateReport);
}

fs.writeFileSync(targetPath, JSON.stringify(data, null, 2) + '\n');
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2) + '\n');
console.log(`Wrote ${data.offers.length} offers and appended ${lateReport.items.length} findings`);
