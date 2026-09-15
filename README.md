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

- **Product photos** — drop images into `assets/images/` and swap the hero `<svg>` illustration in `index.html` (or add an `<img>` alongside it) once photography is ready.
- **Videos** — edit `js/videos.js`. Add an entry to the `NORTHVEIL_VIDEOS` array for each video (YouTube ID or a self-hosted file dropped into `assets/videos/`). Leave it empty and the site automatically shows "coming soon" placeholder cards.
- **Amazon store link** — once the Amazon storefront is live, set `AMAZON_STORE_URL` at the top of `js/main.js`. Every "Shop on Amazon" button re-enables automatically.
- **Social links** — update the Instagram/YouTube/Facebook/LinkedIn URLs in the footer and the "Get Notified" section of `index.html`.
- **Copy/colors/fonts** — all copy lives directly in `index.html`; the design system (colors, fonts, spacing) is defined as CSS variables at the top of `css/style.css`.

## Deployment (Azure Static Web Apps)

This repo deploys via GitHub Actions (`.github/workflows/azure-static-web-apps.yml`) using the `Azure/static-web-apps-deploy` action. It pushes the site as-is with no build step.

**One-time setup** (see repo description / setup notes for the exact steps used) — you need an Azure Static Web App resource in the `northveil` resource group with its deployment token stored as the `AZURE_STATIC_WEB_APPS_API_TOKEN` GitHub secret. Once that's set, every push to `main` deploys automatically, and pull requests get their own preview environment.

## Project structure

```
index.html                  Single-page site
css/style.css                Design system + all styles
js/main.js                   Nav, scroll reveal, FAQ accordion, Amazon link config
js/videos.js                 Video lineup config (see above)
assets/images/                Drop product photography here
assets/videos/                Drop self-hosted video files here
staticwebapp.config.json      Azure Static Web Apps routing config
.github/workflows/            CI/CD to Azure
```
