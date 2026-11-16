import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-14.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-16.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const checked = '2026-11-16';

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

function upsert(offer) {
  const index = data.offers.findIndex((item) => item.id === offer.id);
  if (index >= 0) data.offers[index] = offer;
  else data.offers.push(offer);
}

const lennarInventory = get('lennar-fall-super-sale');
Object.assign(lennarInventory, {
  c: 'Black Friday · select Charlotte-area homes',
  offer: 'Black Friday · home-specific price reductions; universal maximum and financing terms unavailable',
  source: 'https://www.lennar.com/find-a-home?market=CHA&state=NC',
  detail: "Lennar's current official Charlotte inventory advertises Black Friday and displays home-specific price reductions across 162 available homes in 27 communities. The expired November 9-15 mortgage campaign is retained separately in history and is not applied to these listings. The current inventory page does not publish a universal maximum discount, replacement note rate, APR, contract deadline, closing deadline, lender requirement, credit-score requirement, down payment, points or stacking rule. Those terms remain unavailable rather than inferred from individual listing payments or the expired promotion.",
  checked,
  loan: 'Current Black Friday inventory does not publish a replacement promotional loan type, note rate, APR, score or down payment',
  lender: 'No lender requirement stated for the displayed home-specific price reductions',
  terms: '162 available homes · 27 communities · price reductions vary by address · replacement mortgage terms and deadline unavailable',
  access: 'Current official Charlotte inventory page reviewed November 16; expired rate campaign hidden separately',
  extraSources: []
});

const drh = get('drhorton-charlotte-community-status');
Object.assign(drh, {
  offer: 'Community update · 30 communities · current inventory 257 homes · Falls Cove Sold Out',
  detail: "D.R. Horton's current official Charlotte inventory reports 30 communities and 257 homes for sale. An earlier official regional page displayed a conflicting 336-home total; that historical discrepancy remains documented in Daily Review, but the live status card now leads with today's directly indexed inventory count. Anderson Street Townhomes, Kingman Townhomes and Oak Grove Hill remain Now Selling; Sonoma Hills and Reedy Creek Preserve remain Final Opportunities; Cardinal Creek remains New Model Open; Brandon Creek remains New Phase Now Selling; and Ashenwood Commons remains Coming Soon. Falls Cove remains Sold Out. Ashenwood publishes no street number, so it is not promoted as an exact-address map pin.",
  checked,
  terms: '30 communities · 257 current inventory homes · Falls Cove Sold Out · Ashenwood Coming Soon',
  access: 'Current indexed official Charlotte inventory reviewed November 16; prior builder-count conflict preserved in Daily Review'
});

const pulte = get('pulte-mallard-park-arm');
Object.assign(pulte, {
  offer: '4.990% Conventional 7/6 ARM · 5.980%–6.013% APR · up to $20,000 savings on rate-tagged homes',
  detail: "Pulte's current official Mallard Park inventory displays a 4.990% Conventional 7/6 ARM on select quick move-ins, with current homesite APRs ranging from 5.980% to 6.013% and up to $20,000 in price savings on rate-tagged homes. The rate is fixed for seven years and then adjusts every six months. The financing disclosure identifies a Pulte Mortgage Builder Forward Commitment, uses a 780 FICO and 20% down Conventional illustration, and says available incentives may be applied toward closing costs and discount points. Pulte Mortgage is required for the BFC rate but not to purchase. A contract deadline, closing deadline, adjustment caps, index and margin, owner-occupancy rule and stacking terms remain unavailable. Because the page is live inventory, APRs may change by homesite and request date.",
  checked,
  apr: 5.98,
  access: 'Current official Mallard Park community and homesite financing cards reviewed November 16'
});

upsert({
  id: 'smith-winecoff-current-16k',
  b: 'Smith Douglas Homes',
  c: 'Winecoff',
  city: 'Salisbury, NC',
  counties: ['Rowan'],
  offer: 'Up to $16,000 toward closing costs',
  tags: ['closing'],
  kind: 'official',
  source: 'https://www.smithdouglas.com/communities/charlotte-nc',
  sourceName: 'Smith Douglas Homes',
  detail: "Smith Douglas Homes' current Charlotte market directory labels Winecoff Now Selling and advertises up to $16,000 toward closing costs. The public current headline does not publish a matching contract deadline, closing deadline, eligible-home list, required lender, loan type, note rate, APR, credit score, down payment or stacking terms. The site's older promotion records ended October 31 and are not reused to fill these gaps.",
  checked,
  published: null,
  start: null,
  end: null,
  close: null,
  rate: null,
  apr: null,
  amount: 16000,
  loan: 'Current headline does not publish loan type, rate, APR, score or down payment',
  lender: 'Current headline does not identify a required lender',
  flags: ['move'],
  terms: 'Now Selling · up to $16,000 closing costs · eligibility, deadlines and stacking unavailable',
  access: 'Current official Charlotte market directory reviewed November 16',
  extraSources: [],
  deadlineType: 'Offer deadline',
  tag: 'closing'
});

upsert({
  id: 'smith-rowe-current-9k',
  b: 'Smith Douglas Homes',
  c: 'Rowe Crossing',
  city: 'Newton, NC',
  counties: ['Catawba'],
  offer: 'Up to $9,000 toward closing costs',
  tags: ['closing'],
  kind: 'official',
  source: 'https://www.smithdouglas.com/communities/charlotte-nc',
  sourceName: 'Smith Douglas Homes',
  detail: "Smith Douglas Homes' current Charlotte market directory labels Rowe Crossing Grand Opening and advertises up to $9,000 in closing costs. The current headline does not publish a matching contract deadline, closing deadline, eligible-home list, required lender, loan type, note rate, APR, credit score, down payment or stacking terms. Older October promotion terms are not applied to the current headline.",
  checked,
  published: null,
  start: null,
  end: null,
  close: null,
  rate: null,
  apr: null,
  amount: 9000,
  loan: 'Current headline does not publish loan type, rate, APR, score or down payment',
  lender: 'Current headline does not identify a required lender',
  flags: ['move'],
  terms: 'Grand Opening · up to $9,000 closing costs · eligibility, deadlines and stacking unavailable',
  access: 'Current official Charlotte market directory reviewed November 16',
  extraSources: [],
  deadlineType: 'Offer deadline',
  tag: 'closing'
});

upsert({
  id: 'smith-ember-current-upgrades-15k',
  b: 'Smith Douglas Homes',
  c: 'Ember Glen',
  city: 'Charlotte, NC',
  counties: ['Mecklenburg'],
  offer: 'Half off upgrades up to $15,000',
  tags: ['upgrade'],
  kind: 'official',
  source: 'https://www.smithdouglas.com/communities/charlotte-nc/charlotte/ember-glen',
  sourceName: 'Smith Douglas Homes',
  detail: "Ember Glen's current official community header advertises half off upgrades up to $15,000. The page's older detailed legal paragraph still carries an October 31 cutoff and therefore is not used as current eligibility language. Current eligible homes, contract and closing deadlines, lender requirement, financing conditions, stacking and whether $15,000 describes selections or the maximum discount are unavailable.",
  checked,
  published: null,
  start: null,
  end: null,
  close: null,
  rate: null,
  apr: null,
  amount: 15000,
  loan: 'Upgrade incentive; current financing conditions unavailable',
  lender: 'Current headline does not identify a required lender',
  flags: [],
  terms: 'Grand Opening · half off upgrades up to $15,000 · current legal deadline and eligibility unavailable',
  access: 'Current official Ember Glen header reviewed November 16; expired footer conflict flagged',
  extraSources: [],
  deadlineType: 'Offer deadline',
  tag: 'upgrade'
});

upsert({
  id: 'smith-ember-current-inventory-15k',
  b: 'Smith Douglas Homes',
  c: 'Ember Glen · select inventory homes',
  city: 'Charlotte, NC',
  counties: ['Mecklenburg'],
  offer: 'Up to $15,000 closing costs + move-in package on three listed homes',
  tags: ['closing', 'upgrade'],
  kind: 'official',
  source: 'https://www.smithdouglas.com/communities/charlotte-nc/charlotte/ember-glen',
  sourceName: 'Smith Douglas Homes',
  detail: "Current official inventory cards at Ember Glen advertise up to $15,000 in closing costs plus a move-in package on 2671 Spinalis Street, 2667 Spinalis Street and 5426 Porterhouse Way. The page does not publish current matching package contents, lender, loan, rate, APR, score, down payment, contract deadline, closing deadline or stacking terms. Its older legal footer describes different $8,000 terms ending October 31, so that footer is treated as stale and not used to fill the current-card gaps.",
  checked,
  published: null,
  start: null,
  end: null,
  close: null,
  rate: null,
  apr: null,
  amount: 15000,
  loan: 'Current cards do not publish loan type, rate, APR, score or down payment',
  lender: 'Current cards do not identify a required lender',
  flags: ['move'],
  terms: 'Three current inventory cards · up to $15,000 + package · package contents, deadline and stacking unavailable',
  access: 'Current official Ember Glen inventory cards reviewed November 16; expired footer conflict flagged',
  extraSources: [],
  deadlineType: 'Offer deadline',
  tag: 'closing'
});

upsert({
  id: 'smith-dawson-vip-package-current',
  b: 'Smith Douglas Homes',
  c: 'Dawson Landing',
  city: 'Charlotte, NC',
  counties: ['Mecklenburg'],
  offer: 'VIP incentives + move-in package · amount and current deadline unavailable',
  tags: ['closing', 'upgrade'],
  kind: 'official',
  source: 'https://www.smithdouglas.com/communities/charlotte-nc/charlotte/dawson-landing',
  sourceName: 'Smith Douglas Homes',
  detail: "Dawson Landing's current official community header advertises VIP incentives plus a move-in package. The current headline does not state an amount, package contents, qualifying lender, loan type, note rate, APR, score, down payment, contract deadline, closing deadline or stacking. The page's detailed $14,000 package terms ended October 31, so they are not presented as the current headline's terms.",
  checked,
  published: null,
  start: null,
  end: null,
  close: null,
  rate: null,
  apr: null,
  amount: null,
  loan: 'Current headline does not publish financing conditions',
  lender: 'Current headline does not identify a required lender',
  flags: ['move'],
  terms: 'Grand Opening · VIP incentives + package · amount, contents, eligibility and deadlines unavailable',
  access: 'Current official Dawson Landing header reviewed November 16; expired footer conflict flagged',
  extraSources: [],
  deadlineType: 'Offer deadline',
  tag: 'closing'
});

upsert({
  id: 'smith-paw-vip-pricing-current',
  b: 'Smith Douglas Homes',
  c: 'Paw Creek',
  city: 'Charlotte, NC',
  counties: ['Mecklenburg'],
  offer: 'VIP pre-sale pricing · amount and deadline unavailable',
  tags: ['price'],
  kind: 'official',
  source: 'https://www.smithdouglas.com/communities/charlotte-nc',
  sourceName: 'Smith Douglas Homes',
  detail: "Smith Douglas Homes' current Charlotte directory labels Paw Creek Grand Opening and advertises VIP pre-sale pricing. It does not publish a discount amount, eligible homesites, contract or closing deadline, lender requirement, rate, APR, score, down payment or stacking terms. No amount is inferred from older offers or individual asking prices.",
  checked,
  published: null,
  start: null,
  end: null,
  close: null,
  rate: null,
  apr: null,
  amount: null,
  loan: 'Current headline does not publish financing conditions',
  lender: 'No lender requirement stated',
  flags: [],
  terms: 'Grand Opening · VIP pre-sale pricing · amount, eligibility and deadlines unavailable',
  access: 'Current official Charlotte market directory reviewed November 16',
  extraSources: [],
  deadlineType: 'Offer deadline',
  tag: 'price'
});

mark('mattamy-14-days-fha-arm-nov22', 'Full current official promotion and legal terms reviewed November 16');
mark('mattamy-14-days-closing-nov22', 'Full current official promotion and legal terms reviewed November 16');
mark('mattamy-hometown-heroes', 'Current official program retained; exact rate, APR and general loan terms remain unavailable');
mark('taylor-charlotte-qmi-3875-arm-nov14', 'Full current official Charlotte promotion and legal terms reviewed November 16');
mark('taylor-charlotte-qmi-arm-nov30', 'Full current official Charlotte promotion and legal terms reviewed November 16');
mark('taylor-charlotte-fixed-nov30', 'Full current official Charlotte promotion and legal terms reviewed November 16');
mark('taylor-charlotte-qmi-price-dec31', 'Full current official Charlotte promotion reviewed November 16');
mark('taylor-charlotte-community-status', 'Current official Charlotte market directory reviewed November 16');
mark('smith-charlotte-community-status-current', 'Current official 14-community Charlotte directory reviewed November 16');
mark('smith-charlotte-arm-current', 'Current official Charlotte directory and financing disclosure reviewed November 16');
mark('smith-charlotte-fixed-current', 'Current official Charlotte directory and financing disclosure reviewed November 16');
mark('smith-charlotte-inventory-475-arm-55-fixed', 'Current official Charlotte inventory and financing labels reviewed November 16');
mark('drb-charlotte-fha-arm-current', 'Current official Charlotte directory and full financing disclosure reviewed November 16');
mark('drb-charlotte-community-status-current', 'Current official Charlotte directory reviewed November 16');
mark('mi-holiday-of-homes-closing-dec1', 'Current official Holiday of Homes disclosure reviewed November 16');
mark('mi-home-sweet-fha', 'Current official community labels and most recent complete financing disclosure reviewed November 16');
mark('mi-home-sweet-arm', 'Current official community labels and most recent complete financing disclosure reviewed November 16');
mark('eastwood-charlotte-closing-costs', 'Full current official Specials page reviewed November 16');
mark('eastwood-charlotte-move-in-package', 'Full current official Specials page reviewed November 16');
mark('eastwood-charlotte-free-blinds', 'Full current official Specials page reviewed November 16');
mark('eastwood-big-red-bow-rates-dec31', 'Full current official Specials page reviewed November 16');
mark('eastwood-big-red-bow-design-dec31', 'Full current official Specials page reviewed November 16');
mark('eastwood-big-red-bow-package-dec31', 'Full current official Specials page reviewed November 16');
mark('eastwood-big-red-bow-ashton-blythe-dec31', 'Full current official Specials page reviewed November 16');
mark('eastwood-big-red-bow-bryton-dec31', 'Full current official Specials page reviewed November 16');
mark('david-weekley-anniversary-40k-november', 'Current official Charlotte market offer retained; full legal terms last completely reviewed November 14');
mark('david-weekley-preferred-lender-5k', 'Current official Charlotte financing offer reviewed November 16');
mark('david-weekley-hometown-heroes-2500', 'Current official Hometown Heroes offer reviewed November 16');
mark('david-weekley-westwood-hometown-heroes-2500', 'Current official Westwood Reserve Hometown Heroes offer reviewed November 16');
mark('david-weekley-charlotte-community-status', 'Current official Charlotte directory reviewed November 16');
mark('true-preferred-lender-credit', 'Current official FAQ and financing page reviewed November 16');

const report = {
  checked_at: '2026-11-16T00:01:27-05:00',
  summary: "November 16 full refresh removed three expired November 15 promotions from the live comparison: Lennar's 4.375% FHA ARM/$7,500 campaign, Meritage's up-to-$30,000 Flex Cash and Mattamy's separate to-be-built up-to-4% closing offer. No source-supported replacements were found. Lennar still advertises Black Friday across 162 homes in 27 communities, but its current page does not publish a replacement rate, APR or universal discount, so those fields are unavailable. Mattamy's separate 4.75% FHA 5/1 ARM/6.43% APR and 4%-capped quick-move-in closing offer remain through November 22. D.R. Horton's inventory count moved to 257 homes across 30 communities. Pulte's current Mallard Park APR range is 5.980%-6.013%. Added current Smith Douglas headlines with explicit evidence gaps: Winecoff up to $16,000 closing, Rowe Crossing up to $9,000 closing, Ember Glen half-off upgrades up to $15,000 plus separate up-to-$15,000 inventory cards, Dawson Landing VIP package, and Paw Creek VIP pricing. No supported community-status or exact-location change was found; the map remains at 32 exact builder-linked points. No newly dated usable social-only incentive was verified.",
  items: [
    {
      id: 'nov15-expirations', builder: 'Lennar / Meritage Homes / Mattamy Homes', community: 'Charlotte-area deadline review', change: 'expired',
      offer: 'Three November 15 contract windows expired without verified replacements',
      details: "Lennar's 4.375% FHA ARM/$7,500 campaign, Meritage's up-to-$30,000 Flex Cash and Mattamy's separate to-be-built up-to-4% closing offer are hidden from the live comparison. Their official terms ended November 15. No extension or replacement was inferred.",
      source: 'https://www.meritagehomes.com/promotion/10077261', source_name: 'Official builder pages',
      evidence: 'Current official pages and dated legal terms reviewed November 16.', checked_date: checked, deadline: 'Expired 2026-11-15'
    },
    {
      id: 'lennar-black-friday-inventory-current', builder: 'Lennar', community: 'Charlotte-area inventory', change: 'changed',
      offer: 'Black Friday inventory remains; replacement mortgage terms unavailable',
      details: 'The official market page shows 162 available homes across 27 communities and home-specific reductions. It does not publish a current replacement rate, APR, universal maximum, contract deadline or qualification terms.',
      source: 'https://www.lennar.com/find-a-home?market=CHA&state=NC', source_name: 'Lennar',
      evidence: 'Current official Charlotte inventory reviewed November 16.', checked_date: checked, deadline: null
    },
    {
      id: 'smith-current-headlines-nov16', builder: 'Smith Douglas Homes', community: 'Winecoff, Rowe Crossing, Ember Glen, Dawson Landing and Paw Creek', change: 'new',
      offer: 'Current community incentive headlines added with missing terms flagged',
      details: 'Winecoff: up to $16,000 closing. Rowe Crossing: up to $9,000 closing. Ember Glen: half off upgrades up to $15,000; three inventory cards advertise up to $15,000 closing plus a package. Dawson Landing: VIP incentives plus package, amount unavailable. Paw Creek: VIP pre-sale pricing, amount unavailable. Current deadlines and matching legal terms are not published, and expired October footers were not reused.',
      source: 'https://www.smithdouglas.com/communities/charlotte-nc', source_name: 'Smith Douglas Homes',
      evidence: 'Current official market directory and community inventory cards reviewed November 16.', checked_date: checked, deadline: null
    },
    {
      id: 'drhorton-charlotte-community-status', builder: 'D.R. Horton', community: 'Charlotte market', change: 'changed',
      offer: '30 communities · 257 inventory homes',
      details: 'The current official indexed inventory changed from 258 to 257 homes. Final Opportunities, Coming Soon and Sold Out labels remain unchanged.',
      source: 'https://www.drhorton.com/north-carolina/charlotte/inventory', source_name: 'D.R. Horton',
      evidence: 'Current official inventory excerpt reviewed November 16.', checked_date: checked, deadline: null
    },
    {
      id: 'pulte-mallard-park-arm', builder: 'Pulte Homes', community: 'Mallard Park', change: 'changed',
      offer: '4.990% Conventional 7/6 ARM · 5.980%-6.013% APR',
      details: 'Current community cards no longer show the late November 14 5.968% endpoint. Up to $20,000 savings remains on current rate-tagged homes. Deadlines, index, margin, caps and stacking remain unavailable.',
      source: 'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379', source_name: 'Pulte Homes',
      evidence: 'Current official community and homesite cards reviewed November 16.', checked_date: checked, deadline: null
    },
    {
      id: 'source-sweep-nov16', builder: 'Tracked Charlotte builders', community: 'Rates, credits, communities and public social', change: 'unchanged',
      offer: 'No other supported rate, status or map change',
      details: 'Mattamy, Taylor Morrison, M/I Homes, DRB, David Weekley, Eastwood, True Homes and the remaining Smith Douglas records were rechecked. Missing fields remain unavailable. No newly dated public builder social post supplied complete Charlotte terms beyond current official website disclosures.',
      source: 'https://mattamyhomes.com/north-carolina/charlotte/promos/nov', source_name: 'Official builder pages',
      evidence: 'Current official pages and targeted public social discovery reviewed November 16.', checked_date: checked, deadline: null
    }
  ]
};

const reportIndex = reviews.reports.findIndex((item) => item.checked_at === report.checked_at);
if (reportIndex >= 0) reviews.reports[reportIndex] = report;
else reviews.reports.push(report);

fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
