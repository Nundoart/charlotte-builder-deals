import fs from 'node:fs';

const offersPath = new URL('../research/offers-2026-11-11.json', import.meta.url);
const reviewsPath = new URL('../research/reviews.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(offersPath, 'utf8'));
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));
const checked = '2026-11-11';

function get(id) {
  const offer = data.offers.find((item) => item.id === id);
  if (!offer) throw new Error(`Missing offer ${id}`);
  return offer;
}

const pulte = get('pulte-mallard-park-arm');
pulte.offer = '4.990% Conventional 7/6 ARM · 5.968%–5.998% APR · up to $20,000 savings on rate-tagged homes';
pulte.detail = "Pulte's current official Mallard Park inventory displays a 4.990% Conventional 7/6 ARM on select quick move-ins, with published homesite APRs from 5.968% to 5.998% and up to $20,000 in price savings on current rate-tagged homes. The rate is fixed for seven years and then adjusts every six months. A separate current listing shows $27,500 in price savings without an advertised rate, so that amount is not combined with the mortgage offer. The financing disclosure identifies a Pulte Mortgage Builder Forward Commitment, uses a 780 FICO and 20% down Conventional illustration, and says available incentives may be applied toward closing costs and discount points. Pulte Mortgage is required for the BFC rate but not to purchase. A contract deadline, closing deadline, adjustment caps, index and margin, owner-occupancy rule and stacking terms remain unavailable.";
pulte.checked = checked;
pulte.access = 'Current official Mallard Park community and homesite financing cards reviewed late November 11';
pulte.extraSources = [
  {name:'Mallard Park',url:'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379',note:'Official community inventory page'},
  {name:'Mallard Park Landis homesite 07100',url:'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379/landis-700229/1153474',note:'Current official homesite card publishes 5.998% APR and $20,000 savings'}
];

const smith = get('smith-charlotte-inventory-475-arm-55-fixed');
smith.c = 'Select Sunset Meadows, Dawson Landing and Catawba Trace inventory homes';
smith.city = 'Charlotte metro, NC';
smith.counties = ['Mecklenburg','Catawba'];
smith.source = 'https://www.smithdouglas.com/homes/charlotte-nc';
smith.detail = "Smith Douglas' current Charlotte-market inventory pages label three specific inventory homes—4236 Ruth Creek Court in Sunset Meadows, 5975 Old Plank Road in Dawson Landing and 2312 Painted Trail in Catawba Trace—as eligible for a 4.75% 5/1 ARM or 5.5% 30-year fixed rate. The pages' legal footer only discloses the separate 4.99% ARM and 4.99% fixed programs, so this site does not infer an APR, loan type for the fixed rate, lender requirement, score, down payment, points, adjustment terms, deadline, closing-cost credit or stacking rule for the 4.75%/5.5% labels. Buyers should obtain the homesite-specific disclosure before relying on either rate.";
smith.checked = checked;
smith.terms = 'Three named inventory homes · APR, score, down payment, lender, deadlines, points and stacking unavailable';
smith.access = 'Current official Charlotte-market inventory cards rechecked late November 11; no matching legal disclosure is published';
smith.extraSources = [
  {name:'Google Maps directions',community:'Sunset Meadows · Now Selling',url:'https://www.google.com/maps/search/?api=1&query=35.330947824268%2C-80.872231760688',note:'Exact coordinate linked by Smith Douglas Homes'},
  {name:'Google Maps directions',community:'Dawson Landing · Grand Opening',url:'https://www.google.com/maps/search/?api=1&query=35.286996%2C-80.899913',note:'Exact coordinate linked by Smith Douglas Homes'},
  {name:'Catawba Trace inventory home',url:'https://www.smithdouglas.com/homes/charlotte-nc',note:'Current official inventory card for 2312 Painted Trail carries the 4.75% ARM / 5.5% fixed labels; the separate Catawba Trace community pin is already mapped from the builder-published address'}
];

for (const id of ['lennar-black-friday-nov9-nov15-rate','meritage-national-sales-event-nov15','mattamy-14-days-fha-arm-nov22','mattamy-14-days-closing-nov22','mi-home-sweet-fha','mi-home-sweet-arm','mi-holiday-of-homes-closing-dec1','smith-charlotte-community-status-current','david-weekley-anniversary-40k-november']) {
  get(id).checked = checked;
}

const report = {
  checked_at: '2026-11-11T23:56:21-05:00',
  summary: "Late November 11 verification expanded Smith Douglas' homesite-specific 4.75% ARM / 5.5% fixed labels to Catawba Trace in addition to Sunset Meadows and Dawson Landing. Pulte's current Mallard Park APR range now reaches 5.998% on homesite 07100, so the comparison range was widened from 5.968%-5.992% to 5.968%-5.998%. Lennar, Meritage, Mattamy, M/I Homes, David Weekley and current Smith community statuses were reverified with no other advertised changes. The existing Catawba Trace builder-published map location already covers the added Smith community, so the map remains at 28 exact locations. D.R. Horton remains access-blocked; DRB and Taylor Morrison retain their last complete check dates rather than being advanced on incomplete evidence. No usable dated social-only incentive was recovered.",
  items: [
    {id:'pulte-mallard-park-arm',builder:'Pulte Homes',community:'Mallard Park',change:'changed',offer:'4.990% Conventional 7/6 ARM · 5.968%–5.998% APR',details:'The current Landis homesite 07100 card publishes 5.998% APR with $20,000 savings. The comparison range was widened; rate, lender conditions and unavailable deadline fields are otherwise unchanged.',source:'https://www.pulte.com/homes/north-carolina/charlotte/charlotte/mallard-park-211379/landis-700229/1153474',source_name:'Pulte Homes',evidence:'Current official homesite and community inventory cards reviewed late November 11.',checked_date:checked,deadline:null},
    {id:'smith-charlotte-inventory-475-arm-55-fixed',builder:'Smith Douglas Homes',community:'Sunset Meadows / Dawson Landing / Catawba Trace',change:'changed',offer:'4.75% 5/1 ARM OR 5.5% 30-year fixed',details:'The current Charlotte-market inventory now carries the labels at 2312 Painted Trail in Catawba Trace as well as the two previously recorded homes. Matching APR, lender, score, down payment, points and deadlines remain unavailable.',source:'https://www.smithdouglas.com/homes/charlotte-nc',source_name:'Smith Douglas Homes',evidence:'Current official Charlotte-market inventory cards reviewed late November 11.',checked_date:checked,deadline:null},
    {id:'deadline-check-late-nov11',builder:'Lennar / Meritage / Mattamy / M/I Homes',community:'Charlotte-area deadline review',change:'unchanged',offer:'No advertised deadline or term change',details:'Lennar remains through November 15; Meritage remains through November 15; Mattamy remains through November 22; M/I Homes remains through December 1. No unsupported extension or replacement was published.',source:'https://www.lennar.com/new-homes/north-carolina/charlotte/promo/gallen_blackfriday26',source_name:'Official builder pages',evidence:'Current official pages and legal disclosures rechecked late November 11.',checked_date:checked,deadline:'Next contract deadlines: 2026-11-15'},
    {id:'source-access-late-nov11',builder:'D.R. Horton / DRB Homes / Taylor Morrison',community:'Charlotte market',change:'inaccessible',offer:'No newer complete terms established',details:'D.R. Horton remained access-blocked. DRB and Taylor Morrison did not expose a newer dependable complete disclosure in this late pass. Prior source-backed records and their last complete check dates were preserved.',source:'https://www.drhorton.com/north-carolina/charlotte',source_name:'Official builder pages',evidence:'Direct retrieval and official-source search attempts late November 11.',checked_date:checked,deadline:null},
    {id:'social-check-late-nov11',builder:'Tracked Charlotte builders',community:'Public social pages',change:'unchanged',offer:'No usable dated social-only incentive verified',details:'Targeted public social discovery did not produce a dated builder post with complete terms beyond the current official site disclosures. Login-gated, undated and third-party-only claims were excluded.',source:'https://www.facebook.com/',source_name:'Public Facebook/Instagram search',evidence:'Late November 11 public search; unusable material excluded.',checked_date:checked,deadline:null}
  ]
};

reviews.reports.push(report);
fs.writeFileSync(offersPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(reviewsPath, `${JSON.stringify(reviews, null, 2)}\n`);
