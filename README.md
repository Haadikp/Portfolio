# Hadi K P: academic portfolio

## Critique of the old site

1. **It positioned you as a job seeker, not a faculty member.** The title tag, hero and footer said "Data Scientist & Software Engineer" with an "Available for opportunities" badge, while your actual role (Assistant Professor and Placement Coordinator at SAFI) was buried in a timeline card. A hiring committee or recruiter lands on the wrong identity first.
2. **The sections an academic audience looks for were missing.** There was no Teaching, Publications, Research interests, Placement, or Google Scholar link. Teaching appeared only as one 4-word card ("UGC NET qualified educator").
3. **The visual style worked against credibility and accessibility.** A dark neon gradient theme, floating "antigravity" cards that move away from the mouse, gradient-clipped text and blobs read as a developer template. There was no `prefers-reduced-motion` support, no visible focus styles, and the hamburger had no `aria-expanded`.
4. **Self-rated skill bars (Python 80%, Java 40%) undermine you.** Percentages have no reference point, and "Java 40%" sits beside a job where you taught the Java lab.
5. **Weak technical foundations.** Alpine.js was loaded but never used, AOS was loaded render-blocking in `<head>`, roughly 1,000 lines of inline CSS, no meta description or Open Graph tags (blank WhatsApp/LinkedIn previews), no lazy-loading on images, image paths with spaces, and a footer still saying © 2025.

## Folder structure

```
your-repo/
├── index.html
├── style.css
├── script.js
├── favicon.svg            ← new
├── favicon-32x32.png      ← from your old site (optional)
├── apple-touch-icon.png   ← from your old site (optional)
├── site.webmanifest       ← from your old site (optional)
└── Images/
    ├── Hadi K P.png
    ├── Resume.pdf
    ├── Job_analyzer_AI.png
    ├── Result2-webpg.png
    ├── home page.png
    └── Image_colorization_using_gans.mp4
```

The `Images/` filenames are the same as on your old site, so you don't need to rename anything. Folder and file names are **case-sensitive** on GitHub Pages: `Images` is not the same as `images`.

## Before you push: fill in the TODOs

Search `index.html` for `TODO`. In order of importance:

1. **SITE URL**: already set to `https://haadikp.github.io/Portfolio/` (matches the `Haadikp/Portfolio` repo). Change the 3 places in `<head>` only if you move to a custom domain.
2. **RESEARCH INTERESTS** (About section): one sentence.
3. **SAFI COURSES** (Teaching): the actual paper titles you teach.
4. **PLACEMENT ROLE / STUDENT ACHIEVEMENTS**: real, verifiable items only.
5. **GOOGLE SCHOLAR** (Contact): uncomment once you have a profile.
6. **PUBLICATIONS**: the section is hidden until you remove `hidden` from its `<section>` tag and uncomment its nav link.

Also recommended: compress `Hadi K P.png` and the three project screenshots (use https://squoosh.app, export WebP or JPG at ~1280px wide, under 200 KB each). PNG screenshots are usually 1–3 MB each.

## Push to GitHub Pages

### Option A: update your existing portfolio repo (command line)

```bash
cd path/to/your-repo
# copy the new index.html, style.css, script.js, favicon.svg into this folder (overwrite the old index.html)
git add index.html style.css script.js favicon.svg
git commit -m "Redesign portfolio"
git push
```

Pages republishes within 1–2 minutes. Hard-refresh (Ctrl+Shift+R) to bypass the cache.

### Option B: new repo, no command line

1. On github.com, click **New repository**. Name it `haadikp.github.io` if you want the site at `https://haadikp.github.io/`, or any name (e.g. `portfolio`) for `https://haadikp.github.io/portfolio/`. Set it to **Public**, then **Create repository**.
2. Click **uploading an existing file**. Drag in `index.html`, `style.css`, `script.js`, `favicon.svg`, and the whole `Images` folder. Click **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main** and folder to **/ (root)**. Click **Save**.
4. Wait 1–2 minutes and refresh the Pages settings page; it shows "Your site is live at …". Put that exact URL into the 3 SITE URL spots in `index.html` and commit again.

### Check the link preview

After the site is live, paste the URL into https://www.linkedin.com/post-inspector/ to confirm the title, description and photo appear. WhatsApp caches previews, so test with a URL you haven't shared before, or add `?v=2` to the end.

## What was tested

- HTML: W3C Nu validator and html-validate, no errors.
- Accessibility: axe-core (WCAG 2 A/AA + best practice), 0 violations in light and dark themes at 390px and 1366px widths.
- Contrast: lowest pair is 5.4:1 (accent text on the grey section background, light theme); AA needs 4.5:1.
- Keyboard: Tab reaches the skip link first; the menu opens/closes with Enter and Escape; the video dialog closes on Escape and returns focus to its button.
- No horizontal scrolling at 390px. Theme choice persists after reload.
- Not tested: real devices, Safari/iOS (Chromium only), and with your real images, which weren't uploaded.
