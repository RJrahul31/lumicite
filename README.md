# Lumicite

Marketing website for **Lumicite** — AI-search visibility for professional firms.

A single static page (`index.html`) built with semantic HTML, CSS, and a little
vanilla JavaScript. No build step, no framework.

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```bash
npx serve .
```

## Structure

```
index.html          # the entire page (styles inline)
site.webmanifest    # PWA manifest
assets/
  favicon/          # favicons (ico, svg, png sizes)
  og-image.png      # social share image (1200×630)
```

## Deployment

Hosted on **Netlify**, connected to this repository. Every push to `main`
deploys automatically. Publish directory: repo root (`.`).
