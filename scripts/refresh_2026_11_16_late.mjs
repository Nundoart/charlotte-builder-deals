import fs from 'node:fs';

const offersPath = new URL('../research/offers-2026-11-16.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(offersPath, 'utf8'));
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const checked = '2026-11-16';

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

const lennar = get('lennar-fall-super-sale');
Object.assign(lennar, {
  c: 'Charlotte-area move-in-ready inventory',
  offer: '122 move-in-ready / quick move-in homes · exact current incentive terms unavailable',
  tags: ['status'],
  source: 'https://www.lennar.com/new-homes/north-carolina/charlotte',
  detail: "Lennar's current official Charlotte market page no longer displays the prior Black Friday headline. It reports 122 move-in-ready and quick move-in homes across the Charlotte area and says builder incentives such as rate buydowns and closing-cost assistance may be available on select homes when using Lennar Mortgage. The page does not publish a current universal discount, note rate, APR, eligible-address list, contract deadline, closing deadline, credit score, down payment, points or stacking rule. The expired November 9-15 campaign remains in history and is not applied to current inventory.",
  checked,
  rate: null,
  apr: null,
  amount: null,
  loan: 'Current market page does not publish a replacement loan type, note rate, APR, score or down payment',
  lender: 'Lennar Mortgage is optional to purchase; the page says select builder financing incentives may require it',
  terms: '122 move-in-ready / quick move-in homes · exact rate, credit, eligibility and deadline unavailable',
  access: 'Current official Charlotte market page reviewed late November 16; prior Black Friday headline absent',
  deadlineType: 'Status checked',
  tag: 'status'
});

const drh = get('drhorton-charlotte-community-status');
Object.assign(drh, {
  offer: 'Community update · 30 communities · current inventory 263 homes · Falls Cove Sold Out',
  detail: "D.R. Horton's current official Charlotte inventory reports 30 communities and 263 homes for sale, up from 257 in the earlier November 16 review. An earlier official regional page displayed a conflicting 336-home total; that historical discrepancy remains documented in Daily Review, while the live status card leads with the current indexed inventory. Anderson Street Townhomes, Kingman Townhomes and Oak Grove Hill remain Now Selling; Sonoma Hills and Reedy Creek Preserve remain Final Opportunities; Cardinal Creek remains New Model Open; Brandon Creek remains New Phase Now Selling; Ashenwood Commons remains Coming Soon; and Falls Cove remains Sold Out. Ashenwood still lacks a street number, so no map pin is added.",
  checked,
  terms: '30 communities · 263 current inventory homes · Falls Cove Sold Out · Ashenwood Coming Soon',
  access: 'Current indexed official Charlotte inventory reviewed late November 16; prior builder-count conflict preserved in Daily Review'
});

const winecoff = get('smith-winecoff-current-16k');
Object.assign(winecoff, {
  offer: '4.75% 5/1 ARM on select homes · APR and qualification terms unavailable',
  tags: ['rate'],
  source: 'https://www.smithdouglas.com/communities/charlotte-nc',
  detail: "Smith Douglas Homes' current Charlotte market directory labels Winecoff Now Selling and now advertises a 4.75% 5/1 ARM on select homes instead of the earlier up-to-$16,000 community headline. The current directory does not publish a matching APR, loan program, lender, minimum score, down payment, adjustment index, margin, caps, eligible-home list, contract deadline, closing deadline or stacking rule. Older community-page amounts and 4.99% disclosures are not used to fill the current headline's gaps.",
  checked,
  rate: 4.75,
  apr: null,
  amount: null,
  loan: '5/1 ARM · loan program, adjustment details, score and down payment unavailable',
  lender: 'Current headline does not identify a required lender',
  terms: 'Now Selling · select homes · APR, qualification terms, deadlines and stacking unavailable',
  access: 'Current official Charlotte market directory reviewed late November 16; older community-page conflict flagged',
  tag: 'rate'
});

const rowe = get('smith-rowe-current-9k');
Object.assign(rowe, {
  detail: "Smith Douglas Homes' current Charlotte market directory labels Rowe Crossing Grand Opening and advertises up to $9,000 in closing costs. Separate current official Newton inventory cards advertise up to $16,000 on selected Rowe Crossing quick move-ins. These are preserved as separate builder-published offers and are not added together. Neither current source publishes a matching contract deadline, closing deadline, required lender, loan type, note rate, APR, credit score, down payment or stacking rule.",
  checked,
  access: 'Current official Charlotte market directory and Newton inventory reviewed late November 16; separate amounts preserved by scope',
  extraSources: [
    {
      name: 'Rowe Crossing current inventory',
      url: 'https://www.smithdouglas.com/homes/charlotte-nc/newton',
      note: 'Official current inventory cards separately advertise up to $16,000 on selected quick move-ins'
    }
  ]
});

upsert({
  id: 'smith-rowe-current-inventory-16k',
  b: 'Smith Douglas Homes',
  c: 'Rowe Crossing · select quick move-in homes',
  city: 'Newton, NC',
  counties: ['Catawba'],
  offer: 'Up to $16,000 toward closing costs on selected inventory homes',
  tags: ['closing'],
  kind: 'official',
  source: 'https://www.smithdouglas.com/homes/charlotte-nc/newton',
  sourceName: 'Smith Douglas Homes',
  detail: 'Current official Newton inventory cards advertise up to $16,000 in closing costs on selected Rowe Crossing quick move-ins, including 1711 and 1723 Rankin Avenue and 608, 616 and 620 Rowe Crossing Drive. The separate market-directory headline advertises up to $9,000 at the community level; the site preserves the two scopes separately and does not add them. Current lender, loan, rate, APR, score, down payment, contract deadline, closing deadline and stacking rules are unavailable.',
  checked,
  published: null,
  start: null,
  end: null,
  close: null,
  rate: null,
  apr: null,
  amount: 16000,
  loan: 'Current inventory cards do not publish financing conditions',
  lender: 'Current inventory cards do not identify a required lender',
  flags: ['move'],
  terms: 'Selected quick move-ins · up to $16,000 · eligibility, deadlines and stacking unavailable',
  access: 'Current official Newton inventory cards reviewed late November 16',
  extraSources: [],
  deadlineType: 'Offer deadline',
  tag: 'closing'
});

const ember = get('smith-ember-current-upgrades-15k');
Object.assign(ember, {
  offer: 'Official pages conflict: half off upgrades up to $15,000 or $20,000',
  detail: "Smith Douglas Homes' current Charlotte market directory advertises half off upgrades up to $20,000 at Ember Glen, while the builder's current Charlotte-city directory and community header display half off upgrades up to $15,000. Because the official pages conflict, the site publishes both figures and does not choose a higher value. Current eligible homes, discount calculation, lender requirement, financing conditions, contract and closing deadlines and stacking rules remain unavailable; an expired footer is not reused.",
  checked,
  amount: null,
  terms: 'Grand Opening · official current pages show $15,000 and $20,000 caps · exact applicable cap and legal terms unavailable',
  access: 'Current official market and city directories reviewed late November 16; conflicting builder amounts flagged',
  extraSources: [
    {
      name: 'Smith Douglas Charlotte market directory',
      url: 'https://www.smithdouglas.com/communities/charlotte-nc',
      note: 'Current directory displays half off upgrades up to $20,000'
    },
    {
      name: 'Smith Douglas Charlotte city directory',
      url: 'https://www.smithdouglas.com/communities/charlotte-nc/charlotte',
      note: 'Current city directory displays half off upgrades up to $15,000'
    }
  ]
});

upsert({
  id: 'smith-cedar-current-21k',
  b: 'Smith Douglas Homes',
  c: 'Cedar Meadows · select inventory homes',
  city: 'Monroe, NC',
  counties: ['Union'],
  offer: 'Up to $21,000 toward closing costs on selected inventory homes',
  tags: ['closing'],
  kind: 'official',
  source: 'https://www.smithdouglas.com/communities/charlotte-nc/monroe/cedar-meadows',
  sourceName: 'Smith Douglas Homes',
  detail: "Cedar Meadows' current official community page and inventory cards advertise up to $21,000 in closing costs on selected inventory homes, including 343, 361 and 367 Lively Crescent. The page's detailed legal paragraph still states a September 30 contract deadline and is treated as stale, so it is not used as current eligibility language. Current lender, loan, rate, APR, score, down payment, contract and closing deadlines and stacking rules are unavailable.",
  checked,
  published: null,
  start: null,
  end: null,
  close: null,
  rate: null,
  apr: null,
  amount: 21000,
  loan: 'Current inventory headline does not publish financing conditions',
  lender: 'Current headline does not identify a required lender',
  flags: ['move'],
  terms: 'Selected inventory homes · up to $21,000 · current legal deadline, eligibility and stacking unavailable',
  access: 'Current official Cedar Meadows page and inventory cards reviewed late November 16; expired footer flagged',
  extraSources: [],
  deadlineType: 'Offer deadline',
  tag: 'closing'
});

for (const id of [
  'mattamy-14-days-fha-arm-nov22', 'mattamy-14-days-closing-nov22',
  'mi-holiday-of-homes-closing-dec1', 'pulte-mallard-park-arm',
  'david-weekley-anniversary-40k-november', 'david-weekley-preferred-lender-5k',
  'true-preferred-lender-credit', 'eastwood-big-red-bow-rates-dec31',
  'eastwood-big-red-bow-design-dec31', 'eastwood-big-red-bow-package-dec31',
  'eastwood-big-red-bow-ashton-blythe-dec31', 'eastwood-big-red-bow-bryton-dec31',
  'smith-charlotte-community-status-current', 'smith-charlotte-arm-current',
  'smith-charlotte-fixed-current', 'smith-ember-current-inventory-15k',
  'smith-dawson-vip-package-current', 'smith-paw-vip-pricing-current'
]) {
  get(id).checked = checked;
}

const report = {
  checked_at: '2026-11-16T23:56:25-05:00',
  summary: "Late November 16 verification found four material current-source changes. Lennar's market page no longer supports the Black Friday headline and now reports 122 move-in-ready/quick move-in homes; exact replacement incentive terms remain unavailable. D.R. Horton's indexed inventory increased from 257 to 263 homes across 30 communities. Smith Douglas now displays a 4.75% 5/1 ARM headline at Winecoff without matching APR or qualification terms, separate $9,000 community-level and $16,000 inventory-level Rowe Crossing closing-cost headlines, conflicting $15,000 and $20,000 Ember Glen upgrade caps on current official directories, and up to $21,000 on selected Cedar Meadows inventory. Missing or conflicting legal terms are flagged instead of inferred. Mattamy, Pulte, M/I, Taylor Morrison, Meritage, DRB, David Weekley, Eastwood and True Homes were rechecked without another supported rate or status change. No source-supported location change was found; the map remains at 32 verified builder-linked pins. Public social discovery remained login-gated or produced no newly dated Charlotte terms complete enough to publish.",
  items: [
    {
      id: 'lennar-current-inventory-late-nov16', builder: 'Lennar', community: 'Charlotte market', change: 'changed',
      offer: '122 move-in-ready / quick move-in homes; Black Friday headline removed',
      details: 'The current market page no longer supports the prior Black Friday headline. It says select financing incentives may exist with Lennar Mortgage but publishes no exact current rate, APR, universal credit, deadline or qualification terms.',
      source: 'https://www.lennar.com/new-homes/north-carolina/charlotte', source_name: 'Lennar',
      evidence: 'Current official market page reviewed late November 16.', checked_date: checked, deadline: null
    },
    {
      id: 'drhorton-inventory-late-nov16', builder: 'D.R. Horton', community: 'Charlotte market', change: 'changed',
      offer: '30 communities · 263 current inventory homes',
      details: 'The official indexed inventory increased from 257 to 263 homes. Current status labels remain unchanged, including Falls Cove Sold Out and Ashenwood Commons Coming Soon.',
      source: 'https://www.drhorton.com/north-carolina/charlotte/inventory', source_name: 'D.R. Horton',
      evidence: 'Current official inventory reviewed late November 16.', checked_date: checked, deadline: null
    },
    {
      id: 'smith-community-offers-late-nov16', builder: 'Smith Douglas Homes', community: 'Winecoff · Rowe Crossing · Ember Glen · Cedar Meadows', change: 'changed',
      offer: 'New rate headline, separate closing-cost scopes and conflicting upgrade caps',
      details: 'Winecoff now shows 4.75% 5/1 ARM without APR or qualifications. Rowe Crossing separately shows up to $9,000 at the community level and $16,000 on selected inventory. Ember Glen current official directories conflict at $15,000 versus $20,000 for half-off upgrades. Cedar Meadows selected inventory shows up to $21,000. The amounts are not combined and stale footers are not reused.',
      source: 'https://www.smithdouglas.com/communities/charlotte-nc', source_name: 'Smith Douglas Homes',
      evidence: 'Current official market, city, community and inventory pages reviewed late November 16.', checked_date: checked, deadline: null
    },
    {
      id: 'source-sweep-late-nov16', builder: 'Tracked Charlotte builders', community: 'Rates, credits, communities and public social', change: 'unchanged',
      offer: 'No other supported rate, sold-out-status or map change',
      details: 'Mattamy, Pulte, M/I, Taylor Morrison, Meritage, DRB, David Weekley, Eastwood and True Homes were rechecked. Current terms were preserved only where supported; missing fields remain unavailable. No newly dated public builder social post supplied complete Charlotte terms beyond current official website disclosures.',
      source: 'https://mattamyhomes.com/north-carolina/charlotte/promos/nov', source_name: 'Official builder pages',
      evidence: 'Current official pages and targeted public social discovery reviewed late November 16.', checked_date: checked, deadline: null
    }
  ]
};

const reportIndex = reviews.reports.findIndex((item) => item.checked_at === report.checked_at);
if (reportIndex >= 0) reviews.reports[reportIndex] = report;
else reviews.reports.push(report);

fs.writeFileSync(offersPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
