import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const page = new URL('./index.html', import.meta.url);
const output = fileURLToPath(new URL('./entry.png', import.meta.url));
const screenshot = '/tmp/entry.png';
const chromium = process.env.CHROMIUM_PATH ?? (existsSync('/tmp/news23-browser') ? '/tmp/news23-browser' : '/home/opencode/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome');

execFileSync(chromium, [
  '--headless=new',
  '--no-sandbox',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1024,1024',
  `--screenshot=${screenshot}`,
  page.href,
], { stdio: 'inherit' });

execFileSync('python3', ['-c', `
from pathlib import Path
from PIL import Image
import sys

source, output = map(Path, sys.argv[1:])
with Image.open(source) as image:
    assert image.size == (1024, 1024), image.size
    print(f"{source}: {image.width}x{image.height} {image.format}, {source.stat().st_size:,} bytes")
    image.convert("RGB").save(output, "JPEG", quality=84, optimize=True, subsampling=0)

with Image.open(output) as image:
    size = output.stat().st_size
    assert image.format == "JPEG" and image.size == (1024, 1024) and size < 1024**2
    print(f"{output.name}: {image.width}x{image.height} {image.format}, {size:,} bytes")
`, screenshot, output], { stdio: 'inherit' });
