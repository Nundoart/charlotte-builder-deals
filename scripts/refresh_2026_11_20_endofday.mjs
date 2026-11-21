import fs from 'node:fs';

const snapshotPath = new URL('../research/offers-2026-11-20.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));

data.reviewed = '2026-11-20';
data.method = 'Current official builder pages and current search-indexed official builder listings only. Third-party claims are excluded; unavailable terms are not inferred. End-of-day official-source verification completed November 20, 2026.';

// McAlpine Place moved from Coming Soon to Now Selling. The current replacement
// status record below already reflects that change, so remove the superseded
// duplicate instead of letting two official rows conflict in the comparison.
data.offers = data.offers.filter((offer) => offer.id !== 'david-weekley-charlotte-community-status');

const byId = new Map(data.offers.map((offer) => [offer.id, offer]));
const verify = (id, access) => {
  const offer = byId.get(id);
  if (!offer) throw new Error(`Missing offer: ${id}`);
  offer.checked = '2026-11-20';
  if (access) offer.access = access;
};

for (const id of [
  'lennar-black-friday-nov16-nov22-rate',
  'mattamy-14-days-fha-arm-nov22',
  'mattamy-14-days-closing-nov22',
  'mi-home-sweet-fha',
  'mi-home-sweet-arm',
  'mi-holiday-of-homes-closing-dec1',
  'drhorton-charlotte-community-status',
  'pulte-mallard-park-arm',
  'pulte-mallard-park-choice-20k',
  'eastwood-big-red-bow-rates-dec31',
  'eastwood-big-red-bow-design-dec31',
  'eastwood-big-red-bow-package-dec31',
  'eastwood-big-red-bow-bow-bucks-21k',
  'eastwood-charlotte-closing-costs',
  'eastwood-charlotte-move-in-package',
  'meritage-charlotte-flex-cash-current-nov20',
  'true-preferred-lender-credit',
  'true-charlotte-community-status-current',
  'smith-charlotte-community-status-current',
  'smith-charlotte-arm-current',
  'smith-charlotte-inventory-475-arm-55-fixed',
  'smith-ember-current-upgrades-15k',
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
  'tripointe-charlotte-community-status-nov20',
  'david-weekley-charlotte-40k-current',
  'david-weekley-preferred-lender-5k',
  'david-weekley-whitley-design-20k',
  'david-weekley-river-district-finished-basement',
  'david-weekley-charlotte-city-status-nov20',
  'taylor-coves-flex-cash-nov30'
]) verify(id);

verify(
  'david-weekley-charlotte-city-status-nov20',
  'Current official Charlotte directory reviewed November 20; obsolete McAlpine Place Coming Soon record removed'
);
verify(
  'drhorton-charlotte-community-status',
  'Current official Charlotte inventory and regional directory reviewed November 20; inventory page reports 30 communities and 264 homes'
);
verify(
  'true-charlotte-community-status-current',
  'Current official True Homes community pages and Home Finder availability state reviewed November 20'
);

fs.writeFileSync(snapshotPath, `${JSON.stringify(data, null, 2)}\n`);
