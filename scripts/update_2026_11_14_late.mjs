import fs from 'node:fs';

const offersPath = new URL('../research/offers-2026-11-14.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(offersPath, 'utf8'));
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const checked = '2026-11-14';

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
  offer: 'Community update · 30 communities · official pages show 258 versus 336 homes · Falls Cove Sold Out',
  detail: "D.R. Horton's current official Charlotte inventory page reports 30 communities and 258 homes for sale. The builder's separate regional Charlotte page displayed 336 homes in the earlier November 14 review. Because the builder's own same-day pages disagree, the site preserves both figures and their evidence rather than choosing one. The regional page labels Anderson Street Townhomes, Kingman Townhomes and Oak Grove Hill as Now Selling; Sonoma Hills and Reedy Creek Preserve as Final Opportunities; Cardinal Creek as New Model Open; Brandon Creek as New Phase Now Selling; and Ashenwood Commons in Monroe as Coming Soon. The current Falls Cove page identifies that community as Sold Out. Ashenwood publishes no street number, so it is not promoted as an exact-address map pin.",
  checked,
  terms: '30 communities · 258 homes on inventory page / 336 on earlier same-day regional page · Falls Cove Sold Out · Ashenwood Coming Soon',
  access: 'Current indexed official inventory reviewed late November 14; earlier same-day regional count retained with its official source because the builder pages conflict'
});

const pulte = get('pulte-mallard-park-arm');
Object.assign(pulte, {
  offer: '4.990% Conventional 7/6 ARM · 5.968%–6.013% APR · up to $20,000 savings on rate-tagged homes',
  detail: "Pulte's current official Mallard Park inventory displays a 4.990% Conventional 7/6 ARM on select quick move-ins, with live homesite APRs ranging from 5.968% to 6.013% and up to $20,000 in price savings on current rate-tagged homes. The rate is fixed for seven years and then adjusts every six months. The financing disclosure identifies a Pulte Mortgage Builder Forward Commitment, uses a 780 FICO and 20% down Conventional illustration, and says available incentives may be applied toward closing costs and discount points. Pulte Mortgage is required for the BFC rate but not to purchase. A contract deadline, closing deadline, adjustment caps, index and margin, owner-occupancy rule and stacking terms remain unavailable. Because the page is live inventory, APRs may change by homesite and request date.",
  checked,
  apr: 5.968,
  access: 'Current official Mallard Park community and homesite financing cards reviewed late November 14'
});
pulte.extraSources = [
  {
    name: 'Mallard Park',
    url: 'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379',
    note: 'Current official community inventory page publishes the 4.990% ARM and live 5.997%-6.013% APR examples'
  },
  {
    name: 'Mallard Park Landis homesite 07000',
    url: 'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379/landis-700229/1153484',
    note: 'Official homesite card publishes 5.983% APR and $20,000 savings'
  },
  {
    name: 'Mallard Park Carson homesite 03100',
    url: 'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379/carson-700228/1155775',
    note: 'Official homesite card publishes 5.968% APR and $20,000 savings'
  }
];

const hoa = get('taylor-charlotte-hoa-dec31');
Object.assign(hoa, {
  offer: 'Prior separate $2,772 HOA program no longer displayed',
  tags: [],
  kind: 'historical',
  detail: "Taylor Morrison's current Charlotte promotion no longer displays the previously saved standalone one-year HOA program capped at $2,772. HOA dues remain a permitted use inside the builder's separate quick-move-in and to-be-built financing allocations, but that does not support continued publication of the standalone program. No cancellation date or replacement eligibility is inferred; current standalone deadline, lender and stacking terms are unavailable.",
  checked,
  access: 'Full current official Charlotte promotion reviewed November 14; standalone $2,772 program absent, so it is hidden from the live comparison'
});

const newTaylor = {
  id: 'taylor-charlotte-qmi-3875-arm-nov14',
  b: 'Taylor Morrison',
  c: 'Select Charlotte quick move-in homes',
  city: 'Charlotte metro, NC',
  counties: ['Mecklenburg', 'Cabarrus'],
  offer: '3.875% Conventional 7/6 ARM · 5.218% APR',
  tags: ['rate'],
  kind: 'official',
  source: 'https://www.taylormorrison.com/make-moves/charlotte',
  sourceName: 'Taylor Morrison',
  detail: "Taylor Morrison separately advertises a 3.875% note rate with a 5.218% APR on a 30-year Conventional 7/6 ARM for select Charlotte quick move-in homes. The published illustration uses a $500,000 purchase price, $400,000 loan, 20% down, 780 median credit score and owner occupancy. The rate is fixed for 84 months and may then adjust every six months using 30-day average SOFR plus a 2.75% margin. The later-adjustment cap is one percentage point and the lifetime cap is five points, for a maximum rate of 8.875%; the first-adjustment cap is not stated. Buyers must pre-apply and finance through Taylor Morrison Home Funding and use the seller-selected closing agent. Contracts must be signed November 10-30 and close by December 31, 2026. Limited funds apply. The builder does not state a temporary buydown or attach the separate $7,000 allocation to this offer, so neither is inferred.",
  checked,
  published: null,
  start: '2026-11-10',
  end: '2026-11-30',
  close: '2026-12-31',
  rate: 3.875,
  apr: 5.218,
  amount: null,
  loan: 'Conventional 7/6 ARM · 30 years · 20% down and 780 score example · owner occupied · first-adjustment cap unavailable',
  lender: 'Taylor Morrison Home Funding + seller-designated closing agent required',
  flags: ['move'],
  terms: 'Contract Nov. 10-30 · close by Dec. 31 · limited funds · no separate credit or temporary buydown inferred',
  access: 'Full current official Charlotte promotion and legal terms reviewed November 14',
  extraSources: [],
  deadlineType: 'Contract deadline',
  tag: 'rate'
};
const existingTaylorIndex = data.offers.findIndex((item) => item.id === newTaylor.id);
if (existingTaylorIndex >= 0) data.offers[existingTaylorIndex] = newTaylor;
else data.offers.push(newTaylor);

mark('taylor-charlotte-qmi-arm-nov30', 'Full current official Charlotte promotion and legal terms reviewed November 14');
mark('taylor-charlotte-fixed-nov30', 'Full current official Charlotte promotion and legal terms reviewed November 14');
mark('taylor-charlotte-qmi-price-dec31', 'Full current official Charlotte promotion and legal terms reviewed November 14');
mark('taylor-charlotte-community-status', 'Current official Charlotte market directory reviewed November 14');
mark('pulte-mallard-park-choice-20k', 'Current official Mallard Park inventory cards reviewed late November 14');
mark('meritage-national-sales-event-nov15', 'Full current official promotion and legal terms reviewed late November 14');
mark('mattamy-14-days-fha-arm-nov22', 'Full current official promotion and legal terms reviewed late November 14');
mark('mattamy-14-days-closing-nov22', 'Full current official promotion and legal terms reviewed late November 14');
mark('smith-charlotte-community-status-current', 'Current official Charlotte directory reviewed late November 14');
mark('smith-charlotte-arm-current', 'Current official Charlotte directory and financing disclosure reviewed late November 14');
mark('smith-charlotte-inventory-475-arm-55-fixed', 'Current official Charlotte inventory and financing labels reviewed late November 14');
mark('mi-home-sweet-fha', 'Current official integration-host disclosure and production community labels reviewed late November 14');
mark('mi-home-sweet-arm', 'Current official integration-host disclosure and production community labels reviewed late November 14');
mark('mi-holiday-of-homes-closing-dec1', 'Current official Holiday of Homes disclosure reviewed late November 14');
mark('true-preferred-lender-credit', 'Current official FAQ reviewed late November 14');
mark('eastwood-big-red-bow-rates-dec31', 'Full current official Specials page reviewed late November 14');
mark('eastwood-big-red-bow-design-dec31', 'Full current official Specials page reviewed late November 14');
mark('eastwood-big-red-bow-package-dec31', 'Full current official Specials page reviewed late November 14');
mark('eastwood-big-red-bow-ashton-blythe-dec31', 'Full current official Specials page reviewed late November 14');
mark('eastwood-big-red-bow-bryton-dec31', 'Full current official Specials page reviewed late November 14');
mark('david-weekley-preferred-lender-5k', 'Current official Charlotte offer reviewed late November 14');
mark('david-weekley-hardy-pond-design-20k', 'Full current official Hardy Pond promotion reviewed late November 14');
mark('drb-charlotte-community-status-current', 'Current official Charlotte directory reviewed late November 14');

const lateReport = {
  checked_at: '2026-11-14T23:55:43-05:00',
  summary: "Late November 14 verification found three live-comparison changes. Taylor Morrison separately advertises a 3.875% Conventional 7/6 ARM at 5.218% APR for contracts November 10-30 and December 31 closings; it is not a replacement for the existing 4.25% ARM. The builder's prior standalone $2,772 HOA program is absent from the recovered current promotion and is now hidden from the live comparison rather than guessed as continuing. Pulte's live Mallard Park APR range expanded to 5.968%-6.013%. D.R. Horton's indexed Charlotte inventory changed again to 258 homes across 30 communities, while the earlier same-day official regional count remains 336. Lennar's exact-rate promo URL now redirects to its Charlotte page while the market still advertises Black Friday; the earlier same-day full disclosure remains dated November 14 and no extension or withdrawal is inferred. Meritage, Mattamy, M/I, Smith Douglas, DRB, David Weekley, Eastwood and True Homes were rechecked without another supported term change. No source-supported map change was found; the map remains at 32 verified location links. No newly dated usable social-only incentive was verified.",
  items: [
    {
      id: 'taylor-charlotte-qmi-3875-arm-nov14', builder: 'Taylor Morrison', community: 'Select Charlotte quick move-in homes', change: 'new',
      offer: '3.875% Conventional 7/6 ARM · 5.218% APR',
      details: 'Separate current program: contracts November 10-30, close December 31. 20% down, 780 score and owner-occupancy illustration; fixed 84 months then six-month SOFR-plus-2.75 resets. Taylor Morrison Home Funding, preapplication and seller closing agent required. First-adjustment cap unavailable; no separate $7,000 credit inferred.',
      source: 'https://www.taylormorrison.com/make-moves/charlotte', source_name: 'Taylor Morrison',
      evidence: 'Full current official promotion and legal terms reviewed November 14.', checked_date: checked, deadline: 'Contract 2026-11-30; close 2026-12-31'
    },
    {
      id: 'taylor-charlotte-hoa-dec31', builder: 'Taylor Morrison', community: 'Charlotte-area standalone HOA program', change: 'inaccessible',
      offer: 'Prior standalone $2,772 HOA program removed from live comparison',
      details: 'The recovered current promotion no longer displays the standalone program. HOA dues remain an eligible use inside separate financing allocations, but current standalone eligibility and deadline are unavailable and were not inferred.',
      source: 'https://www.taylormorrison.com/make-moves/charlotte', source_name: 'Taylor Morrison',
      evidence: 'Full current official promotion reviewed and searched November 14; historical row retained outside the live comparison.', checked_date: checked, deadline: 'Historical deadline not reconfirmed'
    },
    {
      id: 'pulte-mallard-park-arm', builder: 'Pulte Homes', community: 'Mallard Park', change: 'changed',
      offer: '4.990% Conventional 7/6 ARM · 5.968%-6.013% APR',
      details: 'Current community and homesite cards publish a wider live APR spread than the earlier review, with up to $20,000 savings on rate-tagged homes. Contract and closing deadlines, ARM index/margin/caps and stacking remain unavailable.',
      source: 'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379', source_name: 'Pulte Homes',
      evidence: 'Current official community and homesite cards reviewed November 14.', checked_date: checked, deadline: null
    },
    {
      id: 'drhorton-charlotte-community-status', builder: 'D.R. Horton', community: 'Charlotte market', change: 'changed',
      offer: '30 communities · 258 inventory homes versus 336 earlier same-day regional homes',
      details: 'The official indexed inventory count moved from 259 to 258. The separate earlier same-day regional count remains 336, so both builder figures and their source context remain published. Current Final Opportunities, Coming Soon and Sold Out labels are unchanged.',
      source: 'https://www.drhorton.com/north-carolina/charlotte/inventory', source_name: 'D.R. Horton',
      evidence: 'Current official inventory excerpt and earlier same-day official regional evidence reviewed November 14.', checked_date: checked, deadline: null
    },
    {
      id: 'lennar-late-access-nov14', builder: 'Lennar', community: 'Select greater-Charlotte homes', change: 'inaccessible',
      offer: 'Exact-rate promo URL redirects; market still advertises Black Friday',
      details: 'The earlier same-day official disclosure supports the November 9-15 4.375% FHA 5/1 ARM, 7.408% APR and up to $7,500 closing costs. The late-night promo URL now redirects to the market page, which still carries a Black Friday offer link. No extension, replacement or early withdrawal is inferred.',
      source: 'https://www.lennar.com/new-homes/north-carolina/charlotte', source_name: 'Lennar',
      evidence: 'Current market page and promo redirect checked late November 14; exact terms retain the earlier November 14 full-page verification.', checked_date: checked, deadline: 'Contract 2026-11-15; close 2027-01-25'
    },
    {
      id: 'source-sweep-nov14-late', builder: 'Tracked Charlotte builders', community: 'Rates, credits, community status and public social', change: 'unchanged',
      offer: 'No other supported term, sold-out-status or map change',
      details: 'Meritage, Mattamy, M/I Homes, Smith Douglas, DRB, David Weekley, Eastwood and True Homes were rechecked. Missing fields remain unavailable. No newly dated public builder social post supplied complete terms beyond current official website disclosures.',
      source: 'https://www.meritagehomes.com/promotion/10077261', source_name: 'Official builder pages',
      evidence: 'Current official builder pages and targeted public social discovery reviewed November 14.', checked_date: checked, deadline: null
    }
  ]
};

const reportIndex = reviews.reports.findIndex((report) => report.checked_at === lateReport.checked_at);
if (reportIndex >= 0) reviews.reports[reportIndex] = lateReport;
else reviews.reports.push(lateReport);

fs.writeFileSync(offersPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
