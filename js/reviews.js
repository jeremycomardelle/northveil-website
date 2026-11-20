/**
 * Customer reviews, shown under the videos section.
 *
 * NORTHVEIL_REVIEWS: add only REAL reviews from real buyers (for example from the Amazon listing once it is
 * live, with the reviewer's OK to quote them). Invented reviews presented as real are deceptive advertising
 * and are against FTC rules and Amazon's terms.
 *   { name: "Patrick M.", rating: 5, text: "The review text, exactly as the customer wrote it." }
 *
 * NORTHVEIL_SAMPLE_REVIEWS: invented text used ONLY as a layout preview while NORTHVEIL_REVIEWS is empty.
 * Every sample card is stamped "Sample review" and the heading reads "What Wildcat owners say.", so
 * nobody mistakes them for real customers. They disappear automatically as soon as one real review is added above, and should be
 * deleted before the Wildcat launches.
 */
const NORTHVEIL_REVIEWS = [
];

const NORTHVEIL_SAMPLE_REVIEWS = [
  { name: "Alex R.", rating: 5, text: "Finally a music player that just plays music. Eight buttons, a scroll wheel, and zero notifications." },
  { name: "Dana K.", rating: 5, text: "Pairs with my Bluetooth headphones in seconds and the battery lasts all week. I leave my phone at home on runs now." },
  { name: "Marcus T.", rating: 5, text: "FLAC files sound incredible on this thing. No ads, no algorithm, just my own library." },
  { name: "Priya S.", rating: 5, text: "The scroll wheel feels great and it fits in my pocket. I didn't know how much I missed owning my music." },
];

function renderNorthveilReviews() {
  const grid = document.getElementById("reviewGrid");
  if (!grid) return;

  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };

  const isSample = NORTHVEIL_REVIEWS.length === 0;
  const reviews = isSample ? NORTHVEIL_SAMPLE_REVIEWS : NORTHVEIL_REVIEWS;

  if (isSample) {
    const title = document.getElementById("reviewTitle");
    if (title) title.textContent = "What Wildcat owners say.";
  }

  grid.append(...reviews.map((review) => {
    const rating = Math.max(0, Math.min(5, Math.round(review.rating)));
    const card = make("figure", isSample ? "review-card review-card--sample" : "review-card");
    if (isSample) card.append(make("span", "review-tag", "Sample review"));
    const stars = make("div", "review-stars", "★".repeat(rating) + "☆".repeat(5 - rating));
    stars.setAttribute("role", "img");
    stars.setAttribute("aria-label", `${rating} out of 5 stars`);
    const quote = make("blockquote", "review-text", review.text);
    const name = make("figcaption", "review-name", `— ${review.name}`);
    card.append(stars, quote, name);
    return card;
  }));
}

document.addEventListener("DOMContentLoaded", renderNorthveilReviews);
