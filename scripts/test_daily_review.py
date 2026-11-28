"""Regression checks for review-only rendering; all writes use a temporary tree."""
import json
import re
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]


class DailyReviewTests(unittest.TestCase):
    def test_default_preserves_sources_archives_and_other_pages(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            for name in ('scripts', 'research', 'dist'):
                (root / name).mkdir()
            shutil.copy2(ROOT / 'scripts/build_daily_review.py', root / 'scripts')
            for name in ('reviews.json', 'offers-2026-11-01.json'):
                shutil.copy2(ROOT / 'research' / name, root / 'research' / name)
            for name in ('index.html', 'sitemap.xml', 'compare-townhomes.html'):
                shutil.copy2(ROOT / 'dist' / name, root / 'dist' / name)
            protected = {p: p.read_bytes() for directory in ('research', 'dist')
                         for p in (root / directory).iterdir()}
            command = [sys.executable, str(root / 'scripts/build_daily_review.py')]
            subprocess.run(command, check=True, capture_output=True)
            first = (root / 'dist/daily-review.html').read_bytes()
            subprocess.run(command, check=True, capture_output=True)
            self.assertEqual(first, (root / 'dist/daily-review.html').read_bytes())
            for path, original in protected.items():
                self.assertEqual(original, path.read_bytes(), str(path))
            reports = json.loads((root / 'research/reviews.json').read_text())['reports']
            for report in reports:
                self.assertIn(report['checked_at'].encode(), first)

    def test_mi_contract_deadlines_match_static_and_client_cards(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            for name in ('scripts', 'research', 'dist'):
                (root / name).mkdir()
            shutil.copy2(ROOT / 'scripts/build_daily_review.py', root / 'scripts')
            for name in ('reviews.json', 'offers-2026-11-23.json'):
                shutil.copy2(ROOT / 'research' / name, root / 'research' / name)
            for name in ('index.html', 'sitemap.xml'):
                shutil.copy2(ROOT / 'dist' / name, root / 'dist' / name)

            snapshot = json.loads((root / 'research/offers-2026-11-23.json').read_text())
            ids = [offer['id'] for offer in snapshot['offers']]
            self.assertEqual(len(ids), len(set(ids)), 'Offer IDs must remain unique')
            expected = {'mi-home-sweet-fha', 'mi-home-sweet-arm'}
            mi = {offer['id']: offer for offer in snapshot['offers'] if offer['id'] in expected}
            self.assertEqual(expected, set(mi))
            for offer in mi.values():
                self.assertEqual('2026-12-01', offer['end'])
                self.assertEqual('2026-12-31', offer['close'])
                self.assertEqual('Contract deadline', offer['deadlineType'])

            subprocess.run(
                [sys.executable, str(root / 'scripts/build_daily_review.py'), '--refresh-comparison'],
                check=True,
                capture_output=True,
            )
            index = (root / 'dist/index.html').read_text()
            client_match = re.search(r'const deals=(\[.*?\]);\nconst \$=', index, re.S)
            self.assertIsNotNone(client_match)
            client_offers = json.loads(client_match.group(1))
            client_ids = [offer['id'] for offer in client_offers]
            client = {offer['id']: offer for offer in client_offers if offer['id'] in expected}
            self.assertEqual(expected, set(client))
            for offer_id in expected:
                self.assertEqual('2026-12-01', client[offer_id]['end'])
                card = re.search(
                    rf'<article id="offer-{offer_id}".*?</article>',
                    index,
                    re.S,
                )
                self.assertIsNotNone(card)
                self.assertIn('Contract deadline: 2026-12-01', card.group(0))

            taylor_expected = {
                'taylor-charlotte-qmi-3875-arm-dec15',
                'taylor-charlotte-qmi-arm-dec15',
                'taylor-charlotte-fixed-dec15',
            }
            taylor = {offer['id']: offer for offer in snapshot['offers'] if offer['id'] in taylor_expected}
            self.assertEqual(taylor_expected, set(taylor))
            for offer in taylor.values():
                self.assertEqual('2026-12-15', offer['end'])
                self.assertEqual('Contract deadline', offer['deadlineType'])
                self.assertEqual(1, len(re.findall(rf'id="offer-{re.escape(offer["id"])}"', index)))

            self.assertNotIn('offer-lennar-black-friday-nov16-nov22-rate', index)
            self.assertNotIn('offer-mattamy-14-days-fha-arm-nov22', index)
            self.assertNotIn('offer-drhorton-charlotte-fha-arm-dec31', index)
            self.assertNotIn('drhorton-charlotte-fha-arm-dec31', client_ids)
            self.assertNotIn('drhorton-charlotte-va-arm-dec31', client_ids)
            self.assertEqual(1, index.count('id="offer-david-weekley-charlotte-city-status-nov20"'))

            mattamy_expected = {
                'mattamy-black-friday-fha-arm-nov29',
                'mattamy-black-friday-closing-nov29',
                'mattamy-black-friday-appliances-nov30',
            }
            mattamy = {offer['id']: offer for offer in client_offers if offer['id'] in mattamy_expected}
            self.assertEqual(mattamy_expected, set(mattamy))
            for offer_id in mattamy_expected:
                self.assertEqual(1, client_ids.count(offer_id))
                self.assertEqual(1, index.count(f'id="offer-{offer_id}"'))
            self.assertEqual('2026-11-29', mattamy['mattamy-black-friday-fha-arm-nov29']['end'])
            self.assertEqual('2026-11-29', mattamy['mattamy-black-friday-closing-nov29']['close'])
            self.assertEqual('2026-11-30', mattamy['mattamy-black-friday-appliances-nov30']['end'])
            self.assertEqual('2026-12-31', mattamy['mattamy-black-friday-appliances-nov30']['close'])

            self.assertIn('Reviewed November 27, 2026', index)
            self.assertIn("function isExpired(d,at=today()){return d.kind!=='official'||(!!d.end&&d.end<at)}", index)

            lennar = next(o for o in snapshot['offers'] if o['id'] == 'lennar-black-friday-nov23-nov29-rate')
            self.assertEqual('2026-11-29', lennar['end'])
            self.assertEqual('2027-01-25', lennar['close'])
            self.assertEqual(4.375, lennar['rate'])
            self.assertEqual(7.454, lennar['apr'])

            self.assertEqual(1, client_ids.count('lennar-black-friday-nov23-nov29-rate'))
            self.assertEqual(1, index.count('id="offer-lennar-black-friday-nov23-nov29-rate"'))

            weekley_status = next(o for o in snapshot['offers'] if o['id'] == 'david-weekley-charlotte-city-status-nov20')
            self.assertIn('4 Now Selling', weekley_status['offer'])
            self.assertIn('3 Coming Soon', weekley_status['offer'])

            dr_status = next(o for o in snapshot['offers'] if o['id'] == 'drhorton-charlotte-community-status')
            self.assertIn('44 inventory homes', dr_status['offer'])
            self.assertIn('5 Charlotte-city inventory communities · 44 inventory homes · broader regional directory 350 homes', index)

            tri_status = next(o for o in snapshot['offers'] if o['id'] == 'tripointe-charlotte-community-status-nov20')
            self.assertIn('15 available communities', tri_status['offer'])
            self.assertIn('67 available homes', tri_status['offer'])

            drb_rate = next(o for o in snapshot['offers'] if o['id'] == 'drb-charlotte-fha-arm-current')
            self.assertEqual('official', drb_rate['kind'])
            self.assertEqual(4.99, drb_rate['rate'])
            self.assertEqual(6.679, drb_rate['apr'])

            true_credit = next(o for o in snapshot['offers'] if o['id'] == 'true-preferred-lender-credit')
            self.assertEqual('historical', true_credit['kind'])
            self.assertNotIn('offer-true-preferred-lender-credit', index)

            mi_cards = [o for o in snapshot['offers'] if o['id'] in {'mi-home-sweet-fha', 'mi-home-sweet-arm'}]
            self.assertEqual(2, len(mi_cards))
            self.assertTrue(all(o['end'] == '2026-12-01' and o['close'] == '2026-12-31' for o in mi_cards))
            self.assertEqual(1, client_ids.count('eastwood-charlotte-appliance-package-11-current'))
            self.assertEqual(1, index.count('id="offer-eastwood-charlotte-appliance-package-11-current"'))
            meritage_history = next(
                offer for offer in client_offers
                if offer['id'] == 'meritage-charlotte-flex-cash-current-nov20'
            )
            self.assertEqual('historical', meritage_history['kind'])
            self.assertEqual('2026-10-31', meritage_history['end'])
            self.assertNotIn('offer-meritage-charlotte-flex-cash-current-nov20', index)
            self.assertEqual(1, client_ids.count('smith-paw-vip-pricing-current'))
            self.assertEqual(1, index.count('id="offer-smith-paw-vip-pricing-current"'))
            self.assertIn('Up to $16,000 closing costs + move-in package', index)
            self.assertEqual(1, client_ids.count('eastwood-charlotte-move-in-package'))
            self.assertEqual('7 Charlotte-area communities', next(
                offer['c'] for offer in client_offers
                if offer['id'] == 'eastwood-charlotte-move-in-package'
            ))

            lennar_status = next(
                offer for offer in client_offers
                if offer['id'] == 'lennar-charlotte-community-status-nov23'
            )
            self.assertIn('116 move-in-ready', lennar_status['offer'])
            self.assertNotIn('153 available homes', lennar_status['offer'])

            drb_status = next(
                offer for offer in client_offers
                if offer['id'] == 'drb-charlotte-community-status-current'
            )
            self.assertIn('Withrow Heights actively listed', drb_status['offer'])
            self.assertNotIn('Withrow Heights Coming Soon', drb_status['offer'])
            self.assertIn('Withrow Heights · Active listing', index)

            pulte = next(
                offer for offer in client_offers
                if offer['id'] == 'pulte-mallard-park-arm'
            )
            self.assertIn('5.968%–6.013% APR', pulte['offer'])
            self.assertEqual(5.968, pulte['apr'])

            for offer_id in {
                'eastwood-blythe-flex1000-nov26',
                'eastwood-laurelbrook-norman-flex5000-nov26',
                'eastwood-carrington-fence-nov26',
                'smith-ember-presale',
                'smith-winecoff-presale',
                'smith-rowe-presale',
                'smith-cedar-meadows-presale',
                'smith-catawba-trace-presale',
                'smith-catawba-trace-inventory',
            }:
                self.assertEqual(1, client_ids.count(offer_id))
                self.assertEqual(1, index.count(f'id="offer-{offer_id}"'))

            for offer_id in {
                'smith-ember-presale', 'smith-winecoff-presale',
                'smith-rowe-presale', 'smith-cedar-meadows-presale',
                'smith-catawba-trace-presale', 'smith-catawba-trace-inventory',
            }:
                self.assertEqual('2026-11-30', next(
                    offer['end'] for offer in client_offers if offer['id'] == offer_id
                ))

            true_status = next(
                offer for offer in client_offers
                if offer['id'] == 'true-charlotte-community-status-current'
            )
            self.assertIn('no offer-specific rate', true_status['loan'])
            self.assertNotIn('current $2,000 preferred-lender credit', true_status['loan'])

            self.assertEqual(1, client_ids.count('david-weekley-charlotte-city-status-nov20'))
            self.assertEqual(1, client_ids.count('mi-home-sweet-fha'))
            self.assertEqual(1, client_ids.count('mi-home-sweet-arm'))


if __name__ == '__main__':
    unittest.main()
