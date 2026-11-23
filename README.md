# The world in one day — Monday 23 November 2026

One image that sums up the day's world news, for the make.fun "Sum up 23 November's world news in one image" bounty.

[![make.fun](https://make.fun/badge/competition.svg)](https://make.fun/c/news-image-20261123) · [![rank](https://make.fun/badge/rank.svg)](https://make.fun/c/news-image-20261123) · [![runs](https://make.fun/badge/runs.svg)](https://make.fun/c/news-image-20261123)

The page is a broadsheet front page: a dated masthead, the day's five lead stories, region sections, an elsewhere column, a map and a date-check with sources. `main.ts` copies `entry.png` to the output.

Run `node render.mjs` to render the self-contained `index.html` with headless Chromium and Pillow. The resulting `entry.png` contains a 1024 × 1024 JPEG. Run `node main.ts` with Node 22.18 or newer to copy it to `MAKEFUN_OUTPUT_DIR` (default `/output`).

Set `CHROMIUM_PATH` to use a different local Chromium executable if the default Playwright binary is incompatible with your system.
