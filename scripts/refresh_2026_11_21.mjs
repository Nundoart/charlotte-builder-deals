import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-20.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-21.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

data.reviewed = '2026-11-21';
data.method = 'Current official builder pages and current search-indexed official builder listings only. Third-party claims are excluded; unavailable terms are not inferred. Official-source verification completed November 21, 2026.';

const byId = new Map(data.offers.map((offer) => [offer.id, offer]));
if (byId.size !== data.offers.length) throw new Error('Duplicate offer IDs detected');

const verify = (id, access) => {
  const offer = byId.get(id);
  if (!offer) throw new Error(`Missing offer: ${id}`);
  offer.checked = '2026-11-21';
  if (access) offer.access = access;
  return offer;
};

Object.assign(verify('mi-home-sweet-fha'), {
  end: '2026-12-01',
  close: '2026-12-31',
  deadlineType: 'Contract deadline',
  terms: 'Contract Nov. 9–Dec. 1 · close by Dec. 31 · select QMI · 640 minimum score · 3.5% down · no rewrites or transfers',
  detail: "M/I Homes' current official Lower Monthly Payments page advertises a 5.25% fixed rate with a 6.039% APR on a 30-year FHA loan for select Charlotte-area quick move-in homes. The illustration uses a $350,000 sales price, $337,750 base loan amount, $343,660 financed amount including 1.75% upfront mortgage insurance, 3.5% down and a 640 minimum credit score. The program applies to new contracts written on or after November 9 and by December 1, 2026; homes must close by December 31. Buyers must finance through M/I Financial, occupy the home as a primary residence, apply within 48 hours of contract signing and satisfy FHA county loan limits. Cancellations, rewrites and transfers are excluded.",
  access: 'Full current official M/I Charlotte financing page and legal terms reviewed November 21'
});

Object.assign(verify('mi-home-sweet-arm'), {
  end: '2026-12-01',
  close: '2026-12-31',
  deadlineType: 'Contract deadline',
  terms: 'Contract by Dec. 1 · close by Dec. 31 · select QMI · 20% down illustration · adjusts after 84 months · no rewrites or transfers',
  detail: "M/I Homes' current official Lower Monthly Payments page advertises a 4.875% Conventional 7/6 ARM with a 5.763% APR on select Charlotte-area quick move-in homes. The illustration assumes 20% down. The rate is fixed for 84 payments, then adjusts every six months using the 30-day average SOFR index plus a 2.75% margin. The first adjustment may move by up to five percentage points; later six-month adjustments are capped at one point, with a 2.75% lifetime minimum and 9.875% lifetime maximum. The program applies to new contracts through December 1, 2026 and requires closing by December 31, financing through M/I Financial, primary occupancy and a mortgage application within 48 hours. Cancellations, rewrites and transfers are excluded. The current legal text does not state a universal minimum credit score, so it remains unavailable.",
  access: 'Full current official M/I Charlotte financing page and legal terms reviewed November 21'
});

for (const id of [
  'mi-holiday-of-homes-closing-dec1',
  'lennar-black-friday-nov16-nov22-rate',
  'mattamy-14-days-fha-arm-nov22',
  'mattamy-14-days-closing-nov22',
  'pulte-mallard-park-arm',
  'pulte-mallard-park-choice-20k',
  'eastwood-big-red-bow-rates-dec31',
  'eastwood-big-red-bow-design-dec31',
  'eastwood-big-red-bow-package-dec31',
  'eastwood-big-red-bow-bow-bucks-21k',
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
  'smith-charlotte-community-status-current',
  'smith-charlotte-inventory-475-arm-55-fixed',
  'smith-charlotte-arm-current',
  'drhorton-charlotte-community-status',
  'true-preferred-lender-credit',
  'true-charlotte-community-status-current',
  'david-weekley-charlotte-40k-current',
  'david-weekley-preferred-lender-5k',
  'david-weekley-charlotte-city-status-nov20',
  'meritage-charlotte-flex-cash-current-nov20',
  'taylor-coves-flex-cash-nov30'
]) verify(id);

fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
