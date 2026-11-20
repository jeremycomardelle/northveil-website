# Northveil Technologies — Wildcat Website

A small marketing site for **Wildcat**, the digital music player from Northveil Technologies. Static HTML/CSS/JS — no build step, no framework, deployed to Azure Static Web Apps.

## Local development

No dependencies to install. Serve the folder with any static file server, e.g.:

```bash
npx serve .
```

Then open the printed `localhost` URL. (Opening `index.html` directly via `file://` will NOT load the CSS/JS correctly — always use a local server.)

## Adding real content

The site currently ships with placeholder/illustrated graphics since no product photography exists yet. Everything is built to be swapped in easily:

- **Product photos** — drop images into `assets/images/`. The hero currently shows a "Banner image coming soon" placeholder (`.hero-placeholder` in `index.html`); see "Hero banner" below to swap in a photo.
- **Videos** — two cards under "Escape the Rat Race. Be a wildcat.". Edit `js/videos.js`. Add an entry to the `NORTHVEIL_VIDEOS` array for each video (YouTube ID or a self-hosted file dropped into `assets/videos/`). Leave it empty and the site automatically shows "coming soon" placeholder cards.
- **Amazon store link** — once the Amazon storefront is live, set `AMAZON_STORE_URL` at the top of `js/products.js`. The header button, the Shop by Product dropdown, the lineup tiles and the footer link then all open it in a new tab. Until it is set the store buttons stay "Coming Soon" and product links just go to the lineup. To send a product to its own listing, set `amazonUrl` on it in `js/products.js`.
- **Social links** — update the Instagram/YouTube/Facebook/LinkedIn URLs in the footer and the "Get Notified" section of `index.html`.
- **Deals banner** — the green holiday ticker above the header is the `.deal-bar` block in the shared header (see "Shared header and footer"). Edit the items in `.deal-bar__set`; `js/main.js` repeats them to fill the bar and scrolls them to the left (static if the visitor prefers reduced motion). Change the color with `--deal-green` in `css/style.css`; delete the block to remove it.
- **Hero banner** — a short full-bleed banner (no text on it) sized so "The Northveil lineup" is visible when the page opens. It shows a "Banner image coming soon" placeholder. For a photo, drop it in `assets/images/` and change the hero to `<section class="hero hero--photo" style="--hero-image:url(assets/images/hero.jpg)">`; adjust the height with `.hero { height: ... }` in `css/style.css`.
- **Pearl white theme** — every section below the hero, down to the footer, has the `pearl` class (see "pearl theme" in `css/style.css`). Remove that class from any section to put it back on black. The footer is black.
- **Shop by Product lineup** — compact tiles in `#lineup`, five across on a laptop; each links to that product on Amazon (see "Amazon store link"). The same six products are in the header's "Shop by Product" dropdown and in `js/products.js` (used by the links and search). Links carry a `data-amazon-product="<id>"` attribute. Swap a tile's icon for a product photo when photography exists, and update its status pill (e.g. "Coming soon" → "Available now"). To add a product: add it to `js/products.js`, add a tile in `index.html`, and add a link in the header dropdown.
- **About Us / FAQs** — their own pages: `about-us/index.html` (`/about-us`) and `questions/index.html` (`/questions`). FAQ items are picked up by search automatically.
- **Shared header and footer** — the deals ticker, header (with the Shop by Product dropdown) and footer are repeated verbatim in `index.html`, `about-us/index.html` and `questions/index.html`. Change them in all three. All links in them are root-absolute (`/about-us`, `/#lineup`, ...) so they work from any page.
- **Header search / account** — search is a client-side index of the products (`js/products.js`), pages and FAQs (built in `js/main.js`, nothing to configure; new FAQ items are picked up automatically). The account icon opens a menu pointing to Amazon orders and warranty support because the site has no accounts.
- **Company phone number** — a commented-out `tel:` line sits in the footer's Contact column; uncomment it and fill in the number.
- **Copy/colors/fonts** — all copy lives directly in `index.html`; the design system (colors, fonts, spacing) is defined as CSS variables at the top of `css/style.css`.

## Deployment (Azure Static Web Apps)

This repo deploys via GitHub Actions (`.github/workflows/azure-static-web-apps.yml`) using the `Azure/static-web-apps-deploy` action. It pushes the site as-is with no build step.

**One-time setup** (see repo description / setup notes for the exact steps used) — you need an Azure Static Web App resource in the `northveil` resource group with its deployment token stored as the `AZURE_STATIC_WEB_APPS_API_TOKEN` GitHub secret. Once that's set, every push to `main` deploys automatically, and pull requests get their own preview environment.

## Project structure

```
index.html                  Home page (banner, lineup, videos, notify) + policy overlay
about-us/index.html         About Us page (/about-us)
questions/index.html        FAQs page (/questions)
css/style.css                Design system + all styles
js/main.js                   Deals ticker, nav, search, account menu, scroll reveal, FAQ accordion, Amazon link wiring
js/products.js                Amazon store URL + product catalog (links + search)
js/videos.js                 Video lineup config (see above)
assets/images/                Drop product photography here
assets/videos/                Drop self-hosted video files here
staticwebapp.config.json      Azure Static Web Apps routing (clean URLs for /about-us, /questions)
.github/workflows/            CI/CD to Azure
```
