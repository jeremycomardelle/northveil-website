# Northveil Technologies — Wildcat Website

A single-page marketing site for **Wildcat**, the digital music player from Northveil Technologies. Static HTML/CSS/JS — no build step, no framework, deployed to Azure Static Web Apps.

## Local development

No dependencies to install. Serve the folder with any static file server, e.g.:

```bash
npx serve .
```

Then open the printed `localhost` URL. (Opening `index.html` directly via `file://` will NOT load the CSS/JS correctly — always use a local server.)

## Adding real content

The site currently ships with placeholder/illustrated graphics since no product photography exists yet. Everything is built to be swapped in easily:

- **Product photos** — drop images into `assets/images/`. The hero currently shows a "Picture coming soon" placeholder (`.hero-placeholder` in `index.html`); replace it with an `<img>` once photography is ready.
- **Videos** — edit `js/videos.js`. Add an entry to the `NORTHVEIL_VIDEOS` array for each video (YouTube ID or a self-hosted file dropped into `assets/videos/`). Leave it empty and the site automatically shows "coming soon" placeholder cards.
- **Amazon store link** — once the Amazon storefront is live, set `AMAZON_STORE_URL` at the top of `js/main.js`. Every "Shop on Amazon" button re-enables automatically.
- **Social links** — update the Instagram/YouTube/Facebook/LinkedIn URLs in the footer and the "Get Notified" section of `index.html`.
- **Deals banner** — the slim bar above the header is the `.deal-bar` block at the top of `index.html`. Edit its text and link whenever there's a promotion; delete the block to remove it.
- **Hero banner** — full-width and light by default, with a "Picture coming soon" placeholder on the right. For a full-bleed lifestyle photo instead (e.g. someone outside wearing the DMP), drop it in `assets/images/` and change the hero to `<section class="hero hero--photo" style="--hero-image:url(assets/images/hero.jpg)">`. Text and buttons switch to light-on-dark automatically and the placeholder is hidden.
- **Pearl white theme** — every section below the hero, through the footer, has the `pearl` class (see "pearl theme" in `css/style.css`). Remove that class from any section to put it back on black.
- **Shop by Product lineup** — the cards in `#lineup`. Swap each card's icon for a product photo when photography exists, and update the status pill (e.g. "Coming soon" → "Available now").
- **Header search / account** — search is a client-side index of the lineup cards, sections and FAQs (built in `js/main.js`, nothing to configure; new FAQ items are picked up automatically). The account icon opens a menu pointing to Amazon orders and warranty support because the site has no accounts.
- **Company phone number** — a commented-out `tel:` line sits in the footer's Contact column; uncomment it and fill in the number.
- **Copy/colors/fonts** — all copy lives directly in `index.html`; the design system (colors, fonts, spacing) is defined as CSS variables at the top of `css/style.css`.

## Deployment (Azure Static Web Apps)

This repo deploys via GitHub Actions (`.github/workflows/azure-static-web-apps.yml`) using the `Azure/static-web-apps-deploy` action. It pushes the site as-is with no build step.

**One-time setup** (see repo description / setup notes for the exact steps used) — you need an Azure Static Web App resource in the `northveil` resource group with its deployment token stored as the `AZURE_STATIC_WEB_APPS_API_TOKEN` GitHub secret. Once that's set, every push to `main` deploys automatically, and pull requests get their own preview environment.

## Project structure

```
index.html                  Single-page site
css/style.css                Design system + all styles
js/main.js                   Nav, search, account menu, scroll reveal, FAQ accordion, Amazon link config
js/videos.js                 Video lineup config (see above)
assets/images/                Drop product photography here
assets/videos/                Drop self-hosted video files here
staticwebapp.config.json      Azure Static Web Apps routing config
.github/workflows/            CI/CD to Azure
```
