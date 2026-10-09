#!/usr/bin/env python3
"""Plot short links created per month over the past 12 months to a PNG."""
import argparse
import os
import sys
from datetime import date

try:
    import matplotlib

    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    import psycopg2
except ImportError as e:
    sys.exit(f"Missing module ({e.name}). Run: python3 -m pip install psycopg2-binary matplotlib")

QUERY = """
SELECT date_trunc('month', created_at AT TIME ZONE 'UTC')::date AS month, count(*)
FROM short_links
WHERE created_at >= (date_trunc('month', now() AT TIME ZONE 'UTC') - interval '11 months') AT TIME ZONE 'UTC'
GROUP BY 1
"""


def read_database_url(path):
    if os.environ.get("DATABASE_URL"):
        return os.environ["DATABASE_URL"]
    try:
        with open(path) as f:
            for line in f:
                line = line.strip()
                if line.startswith("DATABASE_URL="):
                    return line.split("=", 1)[1].strip().strip("'\"")
    except FileNotFoundError:
        pass
    sys.exit(f"DATABASE_URL not found in {path}")


def last_12_months():
    today = date.today()
    y, m = today.year, today.month
    months = []
    for _ in range(12):
        months.append(date(y, m, 1))
        m -= 1
        if m == 0:
            y, m = y - 1, 12
    return months[::-1]


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--env-file", default=".env.local")
    p.add_argument("--output", default="links-created-last-12-months.png")
    args = p.parse_args()

    conn = psycopg2.connect(read_database_url(args.env_file))
    try:
        with conn.cursor() as cur:
            cur.execute(QUERY)
            counts = {row[0]: row[1] for row in cur.fetchall()}
    finally:
        conn.close()

    months = last_12_months()
    values = [counts.get(m, 0) for m in months]
    labels = [m.strftime("%b %Y") for m in months]

    fig, ax = plt.subplots(figsize=(11, 6))
    bars = ax.bar(labels, values, color="#4f46e5")
    ax.bar_label(bars, padding=3)
    ax.set_xlabel("Month")
    ax.set_ylabel("Links created")
    ax.set_title("Links created per month (past 12 months)")
    ax.yaxis.get_major_locator().set_params(integer=True)
    ax.set_ylim(0, max(values + [1]) * 1.15)
    plt.setp(ax.get_xticklabels(), rotation=45, ha="right")
    fig.tight_layout()
    fig.savefig(args.output, dpi=150)

    for l, v in zip(labels, values):
        print(f"{l}: {v}")
    print(f"Total: {sum(values)}\nSaved: {os.path.abspath(args.output)}")


if __name__ == "__main__":
    main()
