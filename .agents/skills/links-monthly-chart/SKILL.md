---
name: links-monthly-chart
description: Query the project's Neon Postgres database (DATABASE_URL from .env.local) for short links created in the past 12 months and export a PNG bar chart of links created per month. Use whenever the user asks for link creation stats, monthly/yearly link growth, a chart or graph of links over time, usage trends, or an image/report of how many links were created, even if they don't mention charts, PNGs or the database explicitly.
---

# Links created per month chart

Produces a PNG bar chart: x axis = each of the last 12 calendar months (including the current one), y axis = number of rows created in `short_links` that month. Months with no links show as zero.

## Run

```bash
python3 .agents/skills/links-monthly-chart/scripts/plot_links_per_month.py [--output PATH] [--env-file PATH]
```

- Defaults: `--env-file .env.local`, `--output links-created-last-12-months.png` (relative to the current directory).
- Run from the repo root so the default env file is found.
- If the script reports missing modules, install them: `python3 -m pip install psycopg2-binary matplotlib`.

## Notes

- The script reads `DATABASE_URL` from the env file itself; never print or echo the value (it is a secret). Report only the output path and the monthly counts.
- Read-only: it issues a single `SELECT` against `short_links.created_at` and groups by UTC month.
- Neon may need a moment to wake from scale-to-zero; a connection error on first try is worth one retry.
- After running, tell the user where the PNG was saved and summarise the counts (total and busiest month).
