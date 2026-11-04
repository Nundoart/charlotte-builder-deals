import fs from 'node:fs';

const offersPath = new URL('../research/offers-2026-11-03.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(offersPath, 'utf8'));
const byId = new Map(data.offers.map((offer) => [offer.id, offer]));

const update = (id, patch) => {
  const offer = byId.get(id);
  if (!offer) throw new Error(`Missing offer: ${id}`);
  Object.assign(offer, patch, { checked: '2026-11-03' });
};

update('mattamy-design-options', {
  offer: '50% off design options · up to $30,000 maximum',
  detail: "Mattamy's renewed Your Home Your Way promotion offers 50% off eligible design options on select to-be-built homes, with maximum builder incentives of $30,000 at Blair Place, $25,000 at Westfall and $20,000 at Bratton Pointe and Waxhaw Landing. The controlling contract window is October 1–November 6, 2026 and eligible homes must close by April 30, 2027. The design incentive is available to cash and financed buyers regardless of lender and is distinct from the financing incentive. The public terms do not publish a complete eligible-homesite list or stacking rule, so those items remain unavailable.",
  end: '2026-11-06',
  terms: 'Contract Oct. 1–Nov. 6 · 50% off design options · maximum varies by community · close by Apr. 30, 2027',
  access: 'Full current official promotion page and controlling legal terms reviewed',
});

update('mattamy-tbb-closing-costs-oct31', {
  detail: "Mattamy's renewed Your Home Your Way promotion provides up to 4% of the total purchase price toward closing costs on select to-be-built homes at Blair Place, Bratton Pointe, Waxhaw Landing and Westfall. Eligible uses may include discount points and a temporary buydown fund. Contracts must be entered October 1–November 6, 2026 and eligible homes must close by April 30, 2027. Buyers must pre-apply before submitting an offer, finance through Mattamy Home Funding and use the seller-selected closing agent. Maximum seller-contribution and underwriting limits apply; the offer generally cannot be combined except where expressly stated in the purchase-agreement addendum. The public terms do not publish a specific rate, APR, loan type, credit score, down payment or eligible-homesite list, so those remain unavailable.",
  end: '2026-11-06',
  terms: 'Up to 4% of purchase price · contract Oct. 1–Nov. 6 · close by Apr. 30, 2027 · select to-be-built homes',
  access: 'Full current official promotion and controlling legal terms reviewed',
});

update('mattamy-hometown-heroes', {
  detail: "Mattamy's current Hometown Heroes page offers a $2,000 incentive on select greater-Charlotte homes for qualifying active-duty military, veterans, firefighters, law-enforcement officers, EMTs, paramedics and teachers. Proof of eligibility is required, and the program is limited to one incentive per household. The controlling legal terms state that qualifying purchase agreements must be signed from October 24, 2024 through December 31, 2027. The page does not publish a promotional rate, APR, closing deadline or complete stacking rules; some transactions may require designated lenders or closing agents, but none is named in the public offer.",
  end: '2027-12-31',
  terms: 'Eligible military, veterans, first responders and teachers · proof required · one incentive per household · contract by Dec. 31, 2027',
  access: 'Full current official promotion page and controlling legal terms reviewed',
});

update('mi-home-sweet-fha', {
  detail: "M/I Homes' current Home Sweet Savings promotion advertises a 5.25% rate with a 6.039% APR on a 30-year fixed FHA loan for select quick move-in homes. The official example uses a $350,000 sales price, $337,750 base loan amount, 1.75% financed upfront mortgage insurance, 3.5% down and a 640 minimum credit score. The home must be the buyer's primary residence, the buyer must apply within 48 hours of signing, and the new contract must be written from October 29 through December 1, 2026. The eligible home must close by December 31. The rate is offered through M/I Financial, is subject to qualification and the available rate-lock pool, and is not guaranteed until locked. The page separately advertises a closing-cost contribution; whether it stacks with this rate is not stated.",
  start: '2026-10-29',
  end: '2026-12-01',
  close: '2026-12-31',
  terms: 'Contract Oct. 29–Dec. 1 · apply within 48 hours · close by Dec. 31 · select quick move-ins',
  access: 'Full current official promotion and dated legal terms reviewed; page access is intermittent',
});

update('mi-home-sweet-arm', {
  detail: "M/I Homes' renewed Home Sweet Savings promotion advertises a 4.875% rate with a 5.763% APR on a 30-year Conventional 7/6 adjustable-rate mortgage for select quick move-in homes. The rate is fixed for the first seven years; after 84 payments it adjusts every six months. The first adjustment can move by up to five percentage points and later adjustments by up to one point. The index is 30-day average SOFR plus a 2.75% margin, with a 2.75% lifetime floor and 9.875% lifetime cap. The example requires 20% down, owner occupancy, qualification through M/I Financial and a loan application within 48 hours of signing. New contracts must be written by December 1, 2026 and close by December 31. A minimum credit score is not published. The page separately advertises a closing-cost contribution; whether it stacks with this rate is not stated.",
  start: '2026-10-29',
  end: '2026-12-01',
  close: '2026-12-31',
  terms: 'Contract by Dec. 1 · apply within 48 hours · close by Dec. 31 · select quick move-ins',
  access: 'Full current official promotion and dated legal terms reviewed; page access is intermittent',
});

update('mi-home-sweet-closing', {
  detail: "M/I Homes' current Home Sweet Savings promotion offers up to 3% of the home's base price toward allowable buyer costs when financing through M/I Financial. The contribution may cover allowable closing costs, prepaids, discount points, rate-lock extensions, a rate buydown, HOA dues and capital-contribution fees. It cannot cover purchaser-elected inspection fees or reduce the home price. The amount varies by home and community and remains subject to lender limits of 3% to 6%. The current headline requires contracts by December 1, 2026. The credit paragraph does not separately state a closing deadline or whether this contribution stacks with either advertised Home Sweet Savings rate, so both remain unavailable.",
  end: '2026-12-01',
  close: null,
  terms: 'Up to 3% of base price · contract by Dec. 1 · separate credit closing deadline and stacking unavailable',
  access: 'Full current official promotion and dated legal terms reviewed; page access is intermittent',
});

update('meritage-national-sales-event-nov15', {
  detail: "Meritage's current National Sales Event offers up to $30,000 in Flex Cash on eligible Charlotte-area homes. The credit may be used toward closing costs, a below-market interest rate or both. The purchase agreement must be entered into and accepted between November 2 and November 15, 2026, and the home must close on or before December 20. MTH Mortgage and Carefree Title are required for the incentive. Total financing-linked credits and incentives are capped at 3% of base price plus any lot or unit premium, and the terms state that the promotion cannot be combined with other promotions. The public terms do not publish a note rate, APR, loan type, minimum score, down payment, points or complete eligible-home list, so those fields remain unavailable.",
  terms: 'Contract Nov. 2–15 · close by Dec. 20 · up to $30,000 · financing-linked credits capped at 3% · no combination with other promotions',
});

update('drb-charlotte-flex-cash-dec31', {
  kind: 'historical',
  offer: 'Unavailable: prior up to $25,000 Flex Cash + appliance package not reverified',
  detail: "DRB's current McBride inventory page no longer displays the previously captured Flex Cash or appliance-and-blinds terms, and current official-domain searches did not reproduce them. The prior page advertised tiered Flex Cash up to $25,000 and a December 31 contract deadline, but that claim is now retained only in audit history and removed from the active comparison. This does not prove cancellation; it means current official support is unavailable. Rate, APR, lender, loan type, credit score, down payment, eligible-home list, package value and current deadline remain unavailable.",
  rate: null,
  apr: null,
  amount: null,
  end: null,
  close: null,
  loan: 'Prior financing uses are historical; current loan and buydown terms unavailable',
  lender: 'Current lender and settlement-agent requirements unavailable',
  terms: 'Current official page does not reproduce prior Flex Cash or appliance terms · unavailable rather than guessed',
  access: 'Current official McBride inventory page and targeted official-domain searches reviewed; prior promotion not reproduced',
});

update('drhorton-charlotte-community-status', {
  offer: 'Community update · 30 communities · official home-count conflict: 244 vs. 334 · Falls Cove Sold Out · Ashenwood Coming Soon',
  detail: "D.R. Horton's official Charlotte inventory page now lists 30 communities and 244 homes, while its regional page separately displays 334 homes for sale. Because the builder's two official pages conflict, the site preserves both figures instead of choosing one. The regional page labels Anderson Street Townhomes, Kingman Townhomes and Oak Grove Hill as Now Selling; Sonoma Hills and Reedy Creek Preserve as Final Opportunities; Cardinal Creek as New Model Open; and Ashenwood Commons in Monroe as Coming Soon. The Wallace Springs page identifies Falls Cove as Sold Out. Ashenwood's official address is only 'Waxhaw Hwy, Monroe, NC 28112'; because no street number is published, it is not promoted as an exact-address map pin.",
  terms: '30 communities · 244 homes on inventory page / 334 homes on regional page · Falls Cove Sold Out · Ashenwood Coming Soon',
  access: 'Current official Charlotte inventory, regional, Ashenwood Commons and Wallace Springs pages reviewed; conflicting builder counts preserved',
  extraSources: [
    ...byId.get('drhorton-charlotte-community-status').extraSources.filter((source) => source.name !== 'Ashenwood Commons'),
    {
      name: 'Ashenwood Commons',
      url: 'https://www.drhorton.com/north-carolina/charlotte/monroe/ashenwood-commons',
      note: 'Official page labels the community Coming Soon and publishes only Waxhaw Hwy, Monroe, NC 28112 without a street number',
    },
  ],
});

const additions = [
  {
    id: 'taylor-charlotte-fixed-nov30', b: 'Taylor Morrison', c: 'Select Charlotte to-be-built homes',
    city: 'Charlotte metro, NC', counties: ['Mecklenburg', 'Cabarrus'],
    offer: '5.49% Conventional fixed · 5.60% APR', tags: ['rate'], kind: 'official',
    source: 'https://www.taylormorrison.com/make-moves/charlotte', sourceName: 'Taylor Morrison',
    detail: "Taylor Morrison's current Charlotte offer advertises a 5.49% rate with a 5.60% APR on a 30-year Conventional fixed mortgage for select to-be-built homes. The rate includes a nine-month lock. The example uses a $500,000 purchase price, $400,000 loan amount, 20% down, a 780 credit score and owner occupancy; the minimum loan amount is $225,000. Purchase agreements must be signed November 1–30, 2026 and eligible homes must close by July 31, 2027. Buyers must pre-apply and finance through Taylor Morrison Home Funding and use the seller's designated closing agent. The pool is limited, and stacking is available only where expressly allowed by addendum. Exact eligible homes and points are unavailable.",
    checked: '2026-11-03', published: null, start: '2026-11-01', end: '2026-11-30', close: '2027-07-31',
    rate: 5.49, apr: 5.60, amount: null,
    loan: 'Conventional · 30-year fixed · 20% down · 780 score example · owner occupied · 9-month lock',
    lender: 'Taylor Morrison Home Funding + seller-designated closing agent required', flags: ['move'],
    terms: 'Contract Nov. 1–30 · close by July 31, 2027 · minimum $225,000 loan · select to-be-built homes',
    access: 'Full current official Charlotte promotion and legal terms reviewed', extraSources: [],
    deadlineType: 'Contract deadline', tag: 'rate',
  },
  {
    id: 'taylor-charlotte-qmi-price-dec31', b: 'Taylor Morrison', c: 'Select Charlotte quick move-in homes',
    city: 'Charlotte metro, NC', counties: ['Mecklenburg', 'Cabarrus'],
    offer: 'Already-applied price reductions up to $50,000', tags: ['price'], kind: 'official',
    source: 'https://www.taylormorrison.com/make-moves/charlotte', sourceName: 'Taylor Morrison',
    detail: "Taylor Morrison's current Charlotte promotion identifies price reductions of up to $50,000 on select quick move-in homes. The reductions are already reflected in the advertised prices rather than an additional cash credit. Cash and financed buyers may qualify with any lender; active contracts written before November 1 are excluded. Eligible homes must close by December 31, 2026. The public terms do not publish a contract deadline, complete eligible-home list or stacking rule, so those remain unavailable.",
    checked: '2026-11-03', published: null, start: '2026-11-01', end: '2026-12-31', close: '2026-12-31',
    rate: null, apr: null, amount: 50000, loan: 'Cash or financed purchase; no lender requirement', lender: 'Any lender', flags: ['move'],
    terms: 'Up to $50,000 already reflected in price · close by Dec. 31 · contract deadline and exact eligible homes unavailable',
    access: 'Full current official Charlotte promotion and legal terms reviewed', extraSources: [],
    deadlineType: 'Closing deadline', tag: 'price',
  },
  {
    id: 'taylor-charlotte-hoa-dec31', b: 'Taylor Morrison', c: 'Select Charlotte-area communities',
    city: 'Charlotte metro, NC', counties: ['Mecklenburg', 'Cabarrus'],
    offer: 'Up to one year of HOA dues · maximum $2,772', tags: ['closing'], kind: 'official',
    source: 'https://www.taylormorrison.com/make-moves/charlotte', sourceName: 'Taylor Morrison',
    detail: "Taylor Morrison's current Charlotte promotion offers up to one year of homeowners-association dues, capped at $2,772, on select homes. Cash and financed buyers may qualify with any lender. Purchase agreements must be signed October 1–December 31, 2026 and eligible homes must close by September 30, 2027. The incentive is also limited to 3% of the purchase price. The exact eligible homes and stacking permission are unavailable.",
    checked: '2026-11-03', published: null, start: '2026-10-01', end: '2026-12-31', close: '2027-09-30',
    rate: null, apr: null, amount: 2772, loan: 'Cash or financed purchase; no lender requirement', lender: 'Any lender', flags: [],
    terms: 'Contract Oct. 1–Dec. 31 · close by Sep. 30, 2027 · maximum $2,772 and 3% purchase-price cap',
    access: 'Full current official Charlotte promotion and legal terms reviewed', extraSources: [],
    deadlineType: 'Contract deadline', tag: 'closing',
  },
  {
    id: 'taylor-charlotte-community-status', b: 'Taylor Morrison', c: 'Charlotte-area community status',
    city: 'Charlotte, NC', counties: ['Mecklenburg'],
    offer: 'Community update · The Coves on Lake Wylie and Senata at Research Park currently selling',
    tags: [], kind: 'official', source: 'https://www.taylormorrison.com/nc/charlotte/charlotte/the-coves-on-lake-wylie', sourceName: 'Taylor Morrison',
    detail: "Taylor Morrison's official community pages list The Coves on Lake Wylie as selling from its Charlotte sales center and show available homes, while Senata at Research Park states that available homes are ready now. The builder publishes exact community addresses at 22308 Sweetheart Lane for The Coves and 5003 Sunnybrae Place for Senata; both are included as map pins. These location records do not imply that every home in either community qualifies for the separate financing or price promotions.",
    checked: '2026-11-03', published: null, start: null, end: null, close: null, rate: null, apr: null, amount: null,
    loan: 'Community-status record only', lender: 'Not applicable to the status record', flags: [],
    terms: 'Exact builder-published community locations · promotion eligibility must be confirmed separately',
    access: 'Current official community and directions pages reviewed',
    extraSources: [
      { name: 'Google Maps directions', community: 'The Coves on Lake Wylie', url: 'https://www.google.com/maps/search/?api=1&query=22308+Sweetheart+Lane%2C+Charlotte%2C+NC+28278', note: 'Exact community address published by Taylor Morrison' },
      { name: 'Senata at Research Park', url: 'https://www.taylormorrison.com/nc/charlotte/charlotte/senata-at-research-park', note: 'Official page states available homes are ready now' },
      { name: 'Google Maps directions', community: 'Senata at Research Park', url: 'https://www.google.com/maps/search/?api=1&query=5003+Sunnybrae+Place%2C+Charlotte%2C+NC+28262', note: 'Exact community address published by Taylor Morrison' },
    ],
    deadlineType: 'Offer deadline', tag: 'status',
  },
];

for (const addition of additions) {
  if (byId.has(addition.id)) Object.assign(byId.get(addition.id), addition);
  else data.offers.push(addition);
}

fs.writeFileSync(offersPath, JSON.stringify(data, null, 2) + '\n');

const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const checkedAt = '2026-11-03T23:59:04-05:00';
reviews.reports = reviews.reports.filter((report) => report.checked_at !== checkedAt);
const changeById = new Map([
  ['mattamy-design-options', 'changed'],
  ['mattamy-tbb-closing-costs-oct31', 'changed'],
  ['mattamy-hometown-heroes', 'changed'],
  ['mi-home-sweet-fha', 'changed'],
  ['mi-home-sweet-arm', 'changed'],
  ['mi-home-sweet-closing', 'changed'],
  ['taylor-charlotte-fixed-nov30', 'new'],
  ['taylor-charlotte-qmi-price-dec31', 'new'],
  ['taylor-charlotte-hoa-dec31', 'new'],
  ['taylor-charlotte-community-status', 'new'],
  ['drb-charlotte-flex-cash-dec31', 'inaccessible'],
  ['drhorton-charlotte-community-status', 'changed'],
  ['meritage-national-sales-event-nov15', 'unchanged'],
]);
const reportItems = [...changeById].map(([id, change]) => {
  const offer = data.offers.find((item) => item.id === id);
  return {
    id: offer.id, builder: offer.b, community: offer.c, change, offer: offer.offer,
    details: offer.detail, source: offer.source, source_name: offer.sourceName,
    evidence: `${offer.kind} · ${offer.access}`, checked_date: offer.checked,
    deadline: offer.end ? `${offer.deadlineType || 'Deadline'}: ${offer.end}` : null,
  };
});
reviews.reports.push({
  checked_at: checkedAt,
  summary: 'Late November 3 verification reconciled current official terms into the live comparison. Mattamy design and closing offers now run through November 6, with Heroes through December 31, 2027. M/I Home Sweet Savings financing and closing-cost terms now run through December 1. Three current Taylor Morrison incentives and two exact-address community pins were added. DRB Flex Cash was removed from the active comparison because its current page no longer reproduces the offer. D.R. Horton now reports 30 communities and conflicting official home totals of 244 versus 334, adds Ashenwood Commons as Coming Soon and retains Falls Cove as Sold Out. All unavailable fields remain explicitly unavailable.',
  items: reportItems,
});
fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2) + '\n');
