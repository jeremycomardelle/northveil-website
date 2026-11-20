/**
 * Northveil product catalog — the single source for the checkout page and the header search.
 *
 * The lineup tiles and the "Shop by Product" dropdown are plain HTML (index.html and the shared header);
 * they link to /checkout?product=<id>, where <id> is one of the ids below.
 *
 * Add `price` (in dollars, e.g. 129) to a product once pricing is set and the checkout summary
 * starts showing real subtotals.
 */
const NORTHVEIL_PRODUCTS = [
  {
    id: "dmp",
    name: "Wildcat DMP",
    tile: "DMP",
    status: "Launching this holiday",
    description: "Our distraction-free digital music player. 8 buttons, a scroll wheel, Bluetooth 5.3, zero bloatware.",
    terms: "dmp digital music player mp3 wildcat bluetooth",
  },
  {
    id: "armband",
    name: "Armband",
    tile: "Armband",
    status: "In development",
    description: "A running and biking armband and holster, made to carry the Wildcat wherever you move.",
    terms: "arm band holster running biking run bike gym",
  },
  {
    id: "headphones",
    name: "Headphones",
    tile: "Headphones",
    status: "Coming soon",
    description: "Listening gear to pair with your Wildcat.",
    terms: "earbuds headset audio listening",
  },
  {
    id: "cases",
    name: "Cases",
    tile: "Cases",
    status: "In development",
    description: "Cases, screen protectors, and chargers to keep your Wildcat protected and powered.",
    terms: "case screen protector charger protection accessories",
  },
  {
    id: "clothes",
    name: "Clothes",
    tile: "Clothes",
    status: "Coming soon",
    description: "Northveil apparel, for the people who carry the gear.",
    terms: "apparel shirt tee hoodie hat merch",
  },
  {
    id: "bundles",
    name: "Bundle Deals",
    tile: "Bundle Deals",
    status: "Coming soon",
    description: "Bundles that pair the Wildcat with the gear it works best with.",
    terms: "bundle bundles package deals set kit save",
  },
];

const northveilCheckoutUrl = (id) => `/checkout?product=${encodeURIComponent(id)}`;
