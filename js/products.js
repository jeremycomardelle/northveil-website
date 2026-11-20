/**
 * Northveil Amazon store + product catalog. Used by the shop links and the header search.
 *
 * AMAZON_STORE_URL: paste the Amazon storefront link here once it is live. Every shop link then points
 * to it: the header button, the Shop by Product dropdown, the lineup tiles and the footer link. Until
 * then those links stay as "coming soon" placeholders.
 *
 * To send a product to its own Amazon listing instead, set `amazonUrl` on that product below.
 */
const AMAZON_STORE_URL = ""; // e.g. "https://www.amazon.com/shops/northveiltech"

const NORTHVEIL_PRODUCTS = [
  {
    id: "dmp",
    name: "Wildcat DMP",
    tile: "DMP",
    description: "Our distraction-free digital music player. 8 buttons, a scroll wheel, Bluetooth 5.3, zero bloatware.",
    terms: "dmp digital music player mp3 wildcat bluetooth",
    amazonUrl: "",
  },
  {
    id: "armband",
    name: "Armband",
    tile: "Armband",
    description: "A running and biking armband and holster, made to carry the Wildcat wherever you move.",
    terms: "arm band holster running biking run bike gym",
    amazonUrl: "",
  },
  {
    id: "headphones",
    name: "Headphones",
    tile: "Headphones",
    description: "Listening gear to pair with your Wildcat.",
    terms: "earbuds headset audio listening",
    amazonUrl: "",
  },
  {
    id: "cases",
    name: "Cases",
    tile: "Cases",
    description: "Cases, screen protectors, and chargers to keep your Wildcat protected and powered.",
    terms: "case screen protector charger protection accessories",
    amazonUrl: "",
  },
  {
    id: "clothes",
    name: "Clothes",
    tile: "Clothes",
    description: "Northveil apparel, for the people who carry the gear.",
    terms: "apparel shirt tee hoodie hat merch",
    amazonUrl: "",
  },
  {
    id: "bundles",
    name: "Bundle Deals",
    tile: "Bundle Deals",
    description: "Bundles that pair the Wildcat with the gear it works best with.",
    terms: "bundle bundles package deals set kit save",
    amazonUrl: "",
  },
];
