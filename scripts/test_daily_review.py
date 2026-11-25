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

            self.assertIn('Reviewed November 25, 2026', index)
            self.assertIn("function isExpired(d,at=today()){return d.kind!=='official'||(!!d.end&&d.end<at)}", index)
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
            self.assertEqual('8 Charlotte-area communities', next(
                offer['c'] for offer in client_offers
                if offer['id'] == 'eastwood-charlotte-move-in-package'
            ))


if __name__ == '__main__':
    unittest.main()
