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
            for name in ('reviews.json', 'offers-2026-11-21.json'):
                shutil.copy2(ROOT / 'research' / name, root / 'research' / name)
            for name in ('index.html', 'sitemap.xml'):
                shutil.copy2(ROOT / 'dist' / name, root / 'dist' / name)

            snapshot = json.loads((root / 'research/offers-2026-11-21.json').read_text())
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
            client = {offer['id']: offer for offer in json.loads(client_match.group(1)) if offer['id'] in expected}
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


if __name__ == '__main__':
    unittest.main()
