#!/usr/bin/env python3
"""
Download royalty-free candidate photos from Pexels for every slot in images.json,
then compress them to WebP in responsive sizes.

Pexels licence: free for commercial use, no attribution required
(https://www.pexels.com/license/). Credits are still saved to credits.csv.

Setup:
  pip install requests pillow
  export PEXELS_API_KEY=your_key   # free key: https://www.pexels.com/api/
Run:
  python fetch_images.py            # 3 candidates per slot -> candidates/ + contact-sheet.html
  python fetch_images.py --pick picks.json   # compress the chosen photo per slot -> public/images/
"""
import csv, io, json, os, sys, argparse
import requests
from PIL import Image

API = "https://api.pexels.com/v1/search"
SIZES = [480, 800, 1200, 1600]
HERO_KB, BODY_KB = 120, 70

def search(query, orientation, n, key):
    r = requests.get(API, headers={"Authorization": key},
                     params={"query": query, "orientation": orientation, "per_page": n, "size": "large"}, timeout=30)
    r.raise_for_status()
    return r.json().get("photos", [])

def save_webp(img, path, width, max_kb):
    im = img.copy()
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    for q in (80, 75, 70, 65, 60, 55, 50):
        buf = io.BytesIO()
        im.save(buf, "WEBP", quality=q, method=6)
        if buf.tell() / 1024 <= max_kb or q == 50:
            open(path, "wb").write(buf.getvalue())
            return im.size, round(buf.tell() / 1024)

def fetch_candidates(slots, key, n):
    os.makedirs("candidates", exist_ok=True)
    rows, cards = [], []
    for s in slots:
        photos, seen = [], set()
        for q in s.get("queries", [s["query"]]):
            for p in search(q, s["orientation"], n, key):
                if p["id"] not in seen:
                    seen.add(p["id"]); photos.append(p)
            if len(photos) >= n * 2: break
        photos = photos[: n * 2]
        for i, p in enumerate(photos, 1):
            name = f'{s["slot"]}-{i}'
            data = requests.get(p["src"]["large2x"], timeout=60).content
            Image.open(io.BytesIO(data)).convert("RGB").save(f"candidates/{name}.jpg", quality=85)
            rows.append([name, s["slot"], p["id"], p["url"], p["photographer"], p["photographer_url"]])
            cards.append(f'<figure><img src="candidates/{name}.jpg" loading="lazy"><figcaption><b>{name}</b> — {s["page"]}<br><i>{s.get("placement","")}</i><br>'
                         f'<a href="{p["url"]}">Pexels #{p["id"]}</a> by {p["photographer"]}</figcaption></figure>')
        print(f'{s["slot"]}: {len(photos)} candidates')
    with open("credits.csv", "w", newline="") as f:
        csv.writer(f).writerows([["candidate", "slot", "pexels_id", "url", "photographer", "photographer_url"]] + rows)
    open("contact-sheet.html", "w").write(
        "<!doctype html><meta charset=utf-8><title>Pick images</title><style>body{font:14px sans-serif;display:grid;"
        "grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px;padding:16px}img{width:100%;height:200px;"
        "object-fit:cover}</style>" + "".join(cards))
    print("Open contact-sheet.html, choose one per slot, write picks.json like {\"home-hero\": \"home-hero-2\", ...}")

def compress_picks(slots, picks):
    out = "public/images"
    os.makedirs(out, exist_ok=True)
    manifest = []
    for s in slots:
        cand = picks.get(s["slot"])
        if not cand: continue
        img = Image.open(f"candidates/{cand}.jpg").convert("RGB")
        max_kb = HERO_KB if s.get("hero") else BODY_KB
        files = []
        for w in [w for w in SIZES if w <= s["width"]]:
            (fw, fh), kb = save_webp(img, f'{out}/{s["slot"]}-{w}.webp', w, max_kb if w == s["width"] else max_kb * 0.6)
            files.append({"file": f'/images/{s["slot"]}-{w}.webp', "width": fw, "height": fh, "kb": kb})
        if s.get("og_image"):
            w, h = img.size; tw = min(w, round(h * 1200 / 630)); th = round(tw * 630 / 1200)
            og = img.crop(((w - tw) // 2, (h - th) // 2, (w - tw) // 2 + tw, (h - th) // 2 + th)).resize((1200, 630), Image.LANCZOS)
            og.save(f'{out}/{s["slot"]}-og.jpg', "JPEG", quality=78, optimize=True, progressive=True)
            files.append({"file": f'/images/{s["slot"]}-og.jpg', "width": 1200, "height": 630, "og": True})
        manifest.append({**s, "files": files})
        print(s["slot"], [f["kb"] for f in files], "KB")
    json.dump(manifest, open(f"{out}/manifest.json", "w"), indent=2)

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--pick"); ap.add_argument("--n", type=int, default=3)
    a = ap.parse_args()
    slots = json.load(open("images.json"))
    if a.pick:
        compress_picks(slots, json.load(open(a.pick)))
    else:
        key = os.environ.get("PEXELS_API_KEY") or sys.exit("Set PEXELS_API_KEY first")
        fetch_candidates(slots, key, a.n)
