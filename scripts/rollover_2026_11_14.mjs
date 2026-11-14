import fs from 'node:fs';

const sourcePath = new URL('../research/offers-2026-11-12.json', import.meta.url);
const targetPath = new URL('../research/offers-2026-11-14.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const checked = '2026-11-14';

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

const drh = get('drhorton-charlotte-community-status');
Object.assign(drh, {
  offer: 'Community update · 30 communities · official pages show 261 versus 336 homes · Falls Cove Sold Out',
  detail: "D.R. Horton's current official Charlotte inventory page reports 30 communities and 261 homes for sale, while the regional Charlotte page separately displays 336 homes for sale. Because the builder's own current pages disagree, the site preserves both figures rather than choosing one. The regional page labels Anderson Street Townhomes, Kingman Townhomes and Oak Grove Hill as Now Selling; Sonoma Hills and Reedy Creek Preserve as Final Opportunities; Cardinal Creek as New Model Open; Brandon Creek as New Phase Now Selling; and Ashenwood Commons in Monroe as Coming Soon. The current Falls Cove page identifies that community as Sold Out. Ashenwood publishes no street number, so it is not promoted as an exact-address map pin.",
  checked,
  terms: '30 communities · 261 homes on inventory page / 336 on regional page · Falls Cove Sold Out · Ashenwood Coming Soon',
  access: 'Current indexed official inventory and regional pages reviewed November 14; the conflicting builder counts are preserved'
});

const mattamyRate = get('mattamy-14-days-fha-arm-nov22');
Object.assign(mattamyRate, {
  checked,
  access: 'Full current official promotion and legal terms reviewed November 14'
});

const mattamyClosing = get('mattamy-14-days-closing-nov22');
Object.assign(mattamyClosing, {
  offer: 'All closing costs covered, capped at 4% of purchase price · may include up to $1,176 HOA dues',
  detail: "Mattamy Homes' current 14 Days of Savings headline says all closing costs are covered, including lender, title, government, appraisal and credit-report fees. The controlling legal terms cap the seller contribution at 4% of total purchase price and permit it to fund those closing costs, prepaids, discount points, a temporary buydown and up to one year of HOA dues capped at $1,176. Contracts must be signed November 9–22 and close by December 31, 2026. Buyers must pre-apply before submitting an offer, finance through Mattamy Home Funding and use the seller-selected closing agent. Maximum seller-contribution and underwriting limits apply. No address-level dollar amount is published, so none is inferred. Rewrites, transfers and prior canceled contracts are excluded; the offer cannot be combined except where expressly allowed in the purchase addendum.",
  checked,
  loan: 'Closing contribution may fund lender/title/government/appraisal/credit-report fees, prepaids, points, temporary buydown or up to $1,176 HOA dues; FHA ARM terms published separately',
  terms: 'Contract Nov. 9–22 · close by Dec. 31 · headline says all closing costs, legally capped at 4% · HOA dues capped at $1,176 · no general stacking',
  access: 'Full current official promotion headline and controlling legal terms reviewed November 14'
});

mark('lennar-black-friday-nov9-nov15-rate', 'Full current official promotion page and dated disclosure reviewed November 14');
mark('meritage-national-sales-event-nov15', 'Full current official promotion and legal terms reviewed November 14');
mark('pulte-mallard-park-arm', 'Current official Mallard Park community financing cards reviewed November 14');
mark('pulte-mallard-park-choice-20k', 'Current official Mallard Park inventory cards reviewed November 14');
mark('mi-home-sweet-fha', 'Current official integration-host financing terms and companion production page reviewed November 14');
mark('mi-home-sweet-arm', 'Current official integration-host financing terms and companion production page reviewed November 14');
mark('mi-holiday-of-homes-closing-dec1', 'Current official Holiday of Homes and companion financing terms reviewed November 14');
mark('true-preferred-lender-credit', 'Current official FAQ and preferred-lender financing page reviewed November 14');
mark('smith-charlotte-inventory-475-arm-55-fixed', 'Current official Charlotte-market inventory cards reviewed November 14; matching legal terms remain unavailable');
mark('smith-charlotte-community-status-current', 'Current official 14-community Charlotte directory reviewed November 14');
mark('smith-charlotte-arm-current', 'Current official Charlotte directory and financing disclosure reviewed November 14');
mark('smith-charlotte-fixed-current', 'Current official Charlotte directory and financing disclosure reviewed November 14');
mark('drb-charlotte-fha-arm-current', 'Current official Charlotte directory and full financing disclosure reviewed November 14');
mark('drb-charlotte-community-status-current', 'Current official regional directory and community pages reviewed November 14');
mark('david-weekley-anniversary-40k-november', 'Full current official promotion and legal terms reviewed November 14');
mark('david-weekley-preferred-lender-5k', 'Current official Charlotte market offer reviewed November 14');
mark('david-weekley-hardy-pond-design-20k', 'Full current official Hardy Pond promotion reviewed November 14');
mark('eastwood-charlotte-closing-costs', 'Full current official Specials page reviewed November 14');
mark('eastwood-charlotte-move-in-package', 'Full current official Specials page reviewed November 14');
mark('eastwood-charlotte-free-blinds', 'Full current official Specials page reviewed November 14');
mark('eastwood-big-red-bow-rates-dec31', 'Full current official Specials page reviewed November 14');
mark('eastwood-big-red-bow-design-dec31', 'Full current official Specials page reviewed November 14');
mark('eastwood-big-red-bow-package-dec31', 'Full current official Specials page reviewed November 14');
mark('eastwood-big-red-bow-ashton-blythe-dec31', 'Full current official Specials page reviewed November 14');
mark('eastwood-big-red-bow-bryton-dec31', 'Full current official Specials page reviewed November 14');
mark('taylor-charlotte-community-status', 'Current official Charlotte market directory reviewed November 14; financing page timed out, so rate records retain their November 12 check date');

reviews.reports.push({
  checked_at: '2026-11-14T00:01:47-05:00',
  summary: "November 14 verification found two buyer-facing changes. D.R. Horton's official Charlotte inventory increased from 252 to 261 homes across 30 communities, while its separate regional page still reports 336; both builder figures remain displayed. Mattamy's current 14 Days of Savings headline now says all closing costs are covered, while the controlling terms retain a 4% purchase-price cap and specify that the allocation may include up to one year of HOA dues capped at $1,176. Lennar, Meritage, Mattamy's separate to-be-built offer, M/I Homes, Pulte, Smith Douglas, DRB, David Weekley, Eastwood and True Homes were rechecked without another supported term change. Taylor Morrison's community statuses were current, but its financing page timed out, so the November 12 rate check dates were preserved. No source-supported map change was found; the map remains at 32 verified location links. No newly dated public social-only offer was usable.",
  items: [
    {
      id: 'drhorton-charlotte-community-status', builder: 'D.R. Horton', community: 'Charlotte market', change: 'changed',
      offer: '30 communities · 261 inventory homes versus 336 regional homes',
      details: "The official inventory count increased from 252 to 261. The separate official regional page still reports 336, so both figures remain published. Current Final Opportunities, Coming Soon and Sold Out labels are unchanged.",
      source: 'https://www.drhorton.com/north-carolina/charlotte/inventory', source_name: 'D.R. Horton',
      evidence: 'Current indexed official inventory and regional pages reviewed November 14.', checked_date: checked, deadline: null
    },
    {
      id: 'mattamy-14-days-closing-nov22', builder: 'Mattamy Homes', community: 'Select Charlotte quick move-in homes', change: 'changed',
      offer: 'All closing costs covered, legally capped at 4% · HOA allocation capped at $1,176',
      details: "The current headline says all closing costs are covered, but the legal maximum remains 4% of total purchase price. Eligible uses now expressly include lender, title, government, appraisal and credit-report fees, prepaids, points, temporary buydown and up to one year of HOA dues capped at $1,176. Contract November 9–22; close by December 31.",
      source: 'https://mattamyhomes.com/north-carolina/charlotte/promos/nov', source_name: 'Mattamy Homes',
      evidence: 'Full current official headline and legal terms reviewed November 14.', checked_date: checked, deadline: 'Contract 2026-11-22; close 2026-12-31'
    },
    {
      id: 'nov15-deadline-check', builder: 'Lennar / Meritage Homes / Mattamy Homes', community: 'Charlotte-area deadline review', change: 'unchanged',
      offer: 'Three current offers remain on their final advertised contract day November 15',
      details: "Lennar's 4.375% FHA ARM and $7,500 credit, Meritage's up-to-$30,000 Flex Cash, and Mattamy's separate to-be-built up-to-4% closing-cost offer remain supported through November 15. No extension was inferred.",
      source: 'https://www.lennar.com/new-homes/north-carolina/charlotte/promo/gallen_blackfriday26', source_name: 'Official builder pages',
      evidence: 'Current official Lennar, Meritage and Mattamy pages reviewed November 14.', checked_date: checked, deadline: 'Contract 2026-11-15'
    },
    {
      id: 'source-sweep-nov14', builder: 'Tracked Charlotte builders', community: 'Rates, credits and community status', change: 'unchanged',
      offer: 'No other supported term or map change',
      details: 'Pulte, M/I Homes, Smith Douglas, DRB, David Weekley, Eastwood and True Homes were rechecked. Taylor Morrison community labels remain current, but its financing page timed out; those rate records retain November 12 as their last complete check.',
      source: 'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379', source_name: 'Official builder pages',
      evidence: 'Current official pages reviewed November 14; unavailable fields and failed access were not guessed.', checked_date: checked, deadline: null
    },
    {
      id: 'social-check-nov14', builder: 'Tracked Charlotte builders', community: 'Public social pages', change: 'unchanged',
      offer: 'No usable dated social-only incentive verified',
      details: 'Targeted public Facebook and Instagram discovery did not produce a dated Charlotte builder post with complete terms beyond the current official website disclosures. Login-gated, undated and third-party-only claims were excluded.',
      source: 'https://www.facebook.com/', source_name: 'Public Facebook/Instagram search',
      evidence: 'Targeted public social discovery November 14.', checked_date: checked, deadline: null
    }
  ]
});

fs.writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
