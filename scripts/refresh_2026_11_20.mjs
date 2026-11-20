import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-18.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-20.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
data.reviewed = '2026-11-20';

const byId = new Map(data.offers.map((offer) => [offer.id, offer]));
const verified = (id, access) => {
  const offer = byId.get(id);
  if (!offer) throw new Error(`Missing offer: ${id}`);
  offer.checked = '2026-11-20';
  if (access) offer.access = access;
  return offer;
};

for (const id of [
  'lennar-black-friday-nov16-nov22-rate',
  'mi-home-sweet-fha',
  'mi-home-sweet-arm',
  'mi-holiday-of-homes-closing-dec1',
  'tripointe-charlotte-399-first-year',
  'tripointe-fha-4000-321-nov30',
  'tripointe-conventional-4490-321-nov30',
  'tripointe-seven-oaks-50k',
  'tripointe-ascend-55k',
  'tripointe-bellflower-40k',
  'tripointe-context-30k',
  'tripointe-grahym-30k',
  'tripointe-amplitude-7500',
  'eastwood-big-red-bow-rates-dec31',
  'eastwood-big-red-bow-design-dec31',
  'eastwood-big-red-bow-package-dec31',
  'eastwood-big-red-bow-ashton-blythe-dec31',
  'eastwood-big-red-bow-bryton-dec31',
  'true-preferred-lender-credit',
  'smith-charlotte-community-status-current',
  'smith-charlotte-arm-current',
  'smith-ember-current-upgrades-15k',
  'taylor-coves-flex-cash-nov30',
  'david-weekley-preferred-lender-credit',
  'david-weekley-hardy-pond-design-20k',
  'pulte-mallard-park-qmi-arm',
  'pulte-hometown-heroes'
]) {
  if (byId.has(id)) verified(id);
}

Object.assign(verified('lennar-black-friday-nov16-nov22-rate'), {
  access: 'Full current official Lennar Charlotte promotion reviewed November 20'
});

Object.assign(verified('drhorton-charlotte-community-status'), {
  offer: 'Community update · 30 communities · current inventory 264 homes · Falls Cove Sold Out',
  detail: "D.R. Horton's current official Charlotte inventory reports 30 communities and 264 homes for sale. Anderson Street Townhomes, Kingman Townhomes and Oak Grove Hill remain Now Selling; Sonoma Hills and Reedy Creek Preserve remain Final Opportunities; Cardinal Creek remains New Model Open; Brandon Creek remains New Phase Now Selling; Ashenwood Commons remains Coming Soon; and Falls Cove remains Sold Out. Ashenwood still lacks a street number, so no map pin is added.",
  terms: '30 communities · 264 current inventory homes · Falls Cove Sold Out · Ashenwood Coming Soon',
  access: 'Current official Charlotte inventory and regional directory reviewed November 20'
});

Object.assign(verified('smith-charlotte-community-status-current'), {
  detail: "Smith Douglas Homes' current Charlotte market page lists 14 communities. Dawson Landing, Rowe Crossing, Catawba Trace, Winecoff, Paw Creek, Ember Glen, Cedar Meadows and Sunset Meadows are Grand Opening or Now Selling. Rogers Pond, Vistas at Cramerton, Miranda Road and Highland Grove are Coming Soon. Country Club Village and Hickory Glen are labeled Sold Out. The Charlotte-city directory independently confirms Paw Creek as Grand Opening and Now Selling, Miranda Road as Coming Soon, and Hickory Glen as Sold Out. Builder labels are preserved without inferring availability at individual homesites.",
  access: 'Current official Charlotte market and Charlotte-city directories reviewed November 20'
});

const common = {
  city: 'Charlotte metro · NC & SC',
  counties: [],
  kind: 'official',
  checked: '2026-11-20',
  published: null,
  start: null,
  close: null,
  flags: ['move'],
  extraSources: [],
  deadlineType: 'Offer deadline'
};

const mapSource = (community, address, note = 'Exact community address published by the builder') => ({
  name: 'Google Maps directions',
  community,
  url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address).replace(/%20/g, '+')}`,
  note
});

const newOffers = [
  {
    ...common,
    id: 'meritage-charlotte-flex-cash-current-nov20',
    b: 'Meritage Homes',
    c: 'Select Charlotte-area homes',
    offer: 'Up to $25,000 Flex Cash toward closing costs, interest-rate reduction or both',
    tags: ['closing', 'rate'],
    source: 'https://www.meritagehomes.com/state/nc/charlotte?sqmi=1',
    sourceName: 'Meritage Homes',
    detail: "Meritage's current official Charlotte directory advertises up to $25,000 in Flex Cash on select homes, usable to reduce the interest rate, closing costs or both. The currently visible public Charlotte page does not publish a promotional note rate, APR, loan type, minimum score, down payment, eligible-home list, lender/title requirement, contract deadline, closing deadline or stacking rules. Those fields remain unavailable rather than carrying forward the expired November 15 terms from the prior event.",
    end: null,
    rate: null,
    apr: null,
    amount: 25000,
    loan: 'Rate buydown permitted; note rate, APR, loan type, score and down payment unavailable',
    lender: 'Current public Charlotte page does not identify a required lender or title company',
    terms: 'Select Charlotte-area homes · current deadline, lender conditions, eligible homes and stacking unavailable',
    access: 'Current official Charlotte directory reviewed November 20; current legal detail link was not exposed in the public page text',
    tag: 'closing'
  },
  {
    ...common,
    id: 'eastwood-big-red-bow-bow-bucks-21k',
    b: 'Eastwood Homes',
    c: 'Academy Park · select new homes',
    city: 'Charlotte, NC',
    counties: ['Mecklenburg'],
    offer: 'Up to $21,000 Bow Bucks toward closing costs or a rate buydown',
    tags: ['closing', 'rate'],
    source: 'https://www.eastwoodhomes.com/special-offers',
    sourceName: 'Eastwood Homes',
    detail: "Eastwood's current official Specials page adds up to $21,000 in Bow Bucks on select new homes at Academy Park. The credit may be used toward closing costs or a rate buydown, and the home must be purchased by December 31, 2026. The public panel does not publish the note rate, APR, loan type, lender, minimum score, down payment, closing deadline, exact homesites, allocation limits or stacking rules; those fields remain unavailable.",
    end: '2026-12-31',
    rate: null,
    apr: null,
    amount: 21000,
    loan: 'Rate buydown permitted; note rate, APR, loan type, score and down payment unavailable',
    lender: 'Current public panel does not identify a required lender',
    terms: 'Purchase by Dec. 31 · select Academy Park homes · current financing and stacking details unavailable',
    access: 'Full current official Eastwood Specials page reviewed November 20',
    tag: 'closing'
  },
  {
    ...common,
    id: 'tripointe-ross-farms-65k-current',
    b: 'Tri Pointe Homes',
    c: 'Ross Farms · selected homes',
    city: 'Charlotte, NC',
    counties: ['Mecklenburg'],
    offer: 'Up to $65,000 closing credit · eligible rate, price, closing-cost, move-in or design uses',
    tags: ['closing', 'price', 'upgrade'],
    source: 'https://www.tripointehomes.com/promotion/nc/charlotte',
    sourceName: 'Tri Pointe Homes',
    detail: "Tri Pointe's current official Charlotte promotions directory advertises up to $65,000 in closing credit at Ross Farms. The directory says the credit may be applied to eligible builder-paid closing costs, a special low mortgage rate, price reduction, a luxury move-in package and/or Design Studio options. The current directory does not expose the credit's contract or closing deadline, note rate, APR, score, down payment, exact eligible homes or complete stacking rules. Tri Pointe Connect is required where the credit is used for financing; all other unavailable fields remain explicit.",
    end: null,
    rate: null,
    apr: null,
    amount: 65000,
    loan: 'Loan type, note rate, APR, score and down payment unavailable',
    lender: 'Tri Pointe Connect required for financing uses',
    terms: 'Selected Ross Farms homes · current deadline and full eligibility unavailable · unused amounts subject to builder terms',
    access: 'Current official Charlotte promotions directory and Ross Farms community page reviewed November 20',
    extraSources: [mapSource('Ross Farms · Now Selling', '9412 Community House Rd, Charlotte, NC 28277')],
    tag: 'closing'
  },
  ...[
    ['tripointe-ellis-townes-25k-current', 'Ellis Townes', 'Charlotte, NC', ['Mecklenburg'], 25000, '6013 Curie Lane, Charlotte, NC 28216'],
    ['tripointe-camryn-30k-current', 'Camryn at Southbridge', 'Fort Mill, SC', ['York'], 30000, '135 Landy St, Fort Mill, SC 29715'],
    ['tripointe-old-town-village-10k-current', 'Old Town Village', 'Waxhaw, NC', ['Union'], 10000, '224 Old Town Village Rd, Waxhaw, NC 28173']
  ].map(([id, community, city, counties, amount, address]) => ({
    ...common,
    id,
    b: 'Tri Pointe Homes',
    c: `${community} · selected homes`,
    city,
    counties,
    offer: `Up to $${amount.toLocaleString('en-US')} closing credit · choose eligible rate, price, closing-cost or design uses`,
    tags: ['closing', 'price', 'upgrade'],
    source: 'https://www.tripointehomes.com/promotion/nc/charlotte',
    sourceName: 'Tri Pointe Homes',
    detail: `Tri Pointe's current official Charlotte promotions directory advertises up to $${amount.toLocaleString('en-US')} in closing credit at ${community}. The directory says the credit may be allocated among eligible builder-paid closing costs, a special low mortgage rate, price reduction and/or Design Studio options. The current public directory does not expose the credit's contract or closing deadline, note rate, APR, score, down payment, exact eligible homes or complete stacking rules. Tri Pointe Connect is required where the credit is used for financing; unavailable fields remain explicit.`,
    end: null,
    rate: null,
    apr: null,
    amount,
    loan: 'Loan type, note rate, APR, score and down payment unavailable',
    lender: 'Tri Pointe Connect required for financing uses',
    terms: `${community} selected homes · current deadline and full eligibility unavailable`,
    access: `Current official Charlotte promotions directory and ${community} community page reviewed November 20`,
    extraSources: [mapSource(`${community} · Now Selling`, address)],
    tag: 'closing'
  })),
  {
    ...common,
    id: 'tripointe-charlotte-community-status-nov20',
    b: 'Tri Pointe Homes',
    c: 'Charlotte market communities',
    offer: 'Community update · 16 available communities · 68 available homes',
    tags: ['status'],
    source: 'https://www.tripointehomes.com/find-your-home/nc/charlotte',
    sourceName: 'Tri Pointe Homes',
    detail: "Tri Pointe's current official Charlotte market directory reports 16 available communities, 68 available homes and 37 ready-to-build floorplans. The directory labels current communities such as Amplitude, Ellis Townes and Grahym at Southbridge as Now Selling. It does not publish a complete sold-out-community history, so no sold-out status is inferred from absence.",
    end: null,
    rate: null,
    apr: null,
    amount: null,
    loan: 'Community-status record only',
    lender: 'Not applicable',
    terms: '16 available communities · 68 available homes · 37 ready-to-build floorplans',
    access: 'Current official Charlotte market directory reviewed November 20',
    tag: 'status'
  },
  {
    ...common,
    id: 'david-weekley-charlotte-40k-current',
    b: 'David Weekley Homes',
    c: 'Select Charlotte-area move-in-ready homes',
    city: 'Charlotte metro, NC',
    counties: ['Mecklenburg', 'Union', 'Cabarrus', 'York'],
    offer: 'Up to $40,000 in limited-time savings on select move-in-ready homes',
    tags: ['price', 'closing'],
    source: 'https://www.davidweekleyhomes.com/new-homes/nc/charlotte/charlotte',
    sourceName: 'David Weekley Homes',
    detail: "David Weekley's current official Charlotte market and quick-move-in directories advertise up to $40,000 in limited-time savings on select move-in-ready homes. The current public directory text does not expose the allocation choices, contract deadline, closing deadline, lender requirement, eligible-home list, note rate, APR, score, down payment or stacking rules. Those terms are marked unavailable instead of reusing the expired October anniversary-event details.",
    end: null,
    rate: null,
    apr: null,
    amount: 40000,
    loan: 'Financing details unavailable on the current public directory',
    lender: 'Current public directory does not identify a required lender for this offer',
    terms: 'Select move-in-ready homes · current deadline, allocation and financing terms unavailable',
    access: 'Current official Charlotte market and quick-move-in directories reviewed November 20',
    tag: 'price'
  },
  {
    ...common,
    id: 'david-weekley-whitley-design-20k',
    b: 'David Weekley Homes',
    c: 'Whitley Preserve – Park Collection · to-be-built homes',
    city: 'Mint Hill, NC',
    counties: ['Mecklenburg'],
    offer: 'Half off up to $40,000 in Design Center / flex options · maximum $20,000 discount',
    tags: ['upgrade'],
    source: 'https://www.davidweekleyhomes.com/promo/design-it-your-way-whitley-preserve-park-collection',
    sourceName: 'David Weekley Homes',
    detail: "David Weekley's current official Whitley Preserve – Park Collection page offers half off up to $40,000 in Design Center selections and flex options, capped at a $20,000 discount, on eligible to-be-built homes purchased through December 31, 2026. Selections must be made through the Charlotte Design Center, lot premiums are excluded, the offer must be presented before contract, and it cannot be combined with another offer or used on a prior contract.",
    end: '2026-12-31',
    rate: null,
    apr: null,
    amount: 20000,
    loan: 'No financing condition stated',
    lender: 'No lender requirement stated',
    terms: 'Purchase by Dec. 31 · to-be-built Whitley Preserve Park home · no stacking · lot premiums excluded',
    access: 'Full current official promotion and legal terms reviewed November 20',
    tag: 'upgrade'
  },
  {
    ...common,
    id: 'david-weekley-river-district-finished-basement',
    b: 'David Weekley Homes',
    c: 'The River District – Excursion Collection · Biscoe Basement floorplan',
    city: 'Charlotte, NC',
    counties: ['Mecklenburg'],
    offer: 'Complimentary finished basement package · value capped at $32,000',
    tags: ['upgrade'],
    source: 'https://www.davidweekleyhomes.com/promo/biscoe-basement-the-river-district',
    sourceName: 'David Weekley Homes',
    detail: "David Weekley's current official promotion offers a complimentary finished-basement package, capped at $32,000, on the Biscoe Basement floorplan at select homesites in The River District – Excursion Collection. Buyers must purchase between November 13 and December 31, 2026. The offer is not valid on prior contracts and cannot be combined with another offer; costs above the cap are the buyer's responsibility.",
    start: '2026-11-13',
    end: '2026-12-31',
    rate: null,
    apr: null,
    amount: 32000,
    loan: 'No financing condition stated',
    lender: 'No lender requirement stated',
    terms: 'Contract Nov. 13–Dec. 31 · Biscoe Basement floorplan · selected homesites · no stacking',
    access: 'Full current official promotion and legal terms reviewed November 20',
    tag: 'upgrade'
  },
  {
    ...common,
    id: 'david-weekley-charlotte-city-status-nov20',
    b: 'David Weekley Homes',
    c: 'Charlotte city communities',
    city: 'Charlotte, NC',
    counties: ['Mecklenburg'],
    offer: 'Community update · 4 Now Selling · 2 Coming Soon · 1 Final Opportunities',
    tags: ['status'],
    source: 'https://www.davidweekleyhomes.com/new-homes/nc/charlotte/charlotte',
    sourceName: 'David Weekley Homes',
    detail: "David Weekley's current official Charlotte directory labels Central Living at Craig, McAlpine Place, The River District – Excursion Collection and Westwood Reserve as Now Selling; Brightside Townes and The Retreat at Steele Creek as Coming Soon; and The River District – Pioneer Collection as Final Opportunities. No Charlotte-city community on the current directory is labeled Sold Out, and none is inferred from absence.",
    end: null,
    rate: null,
    apr: null,
    amount: null,
    loan: 'Community-status record only',
    lender: 'Not applicable',
    terms: '4 Now Selling · 2 Coming Soon · 1 Final Opportunities',
    access: 'Current official Charlotte directory reviewed November 20',
    tag: 'status'
  }
];

for (const offer of newOffers) {
  if (byId.has(offer.id)) Object.assign(byId.get(offer.id), offer);
  else data.offers.push(offer);
}

fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
