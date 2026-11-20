/**
 * Checkout page behavior. Reads ?product=<id> (ids live in js/products.js), fills the order summary,
 * and keeps the URL in sync when the product is changed. Nothing here submits data anywhere — the
 * order button stays disabled until a payment processor is connected (see README, "Checkout").
 */
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("coProduct");
  if (!select) return;

  const title = document.getElementById("checkoutTitle");
  const status = document.getElementById("coStatus");
  const description = document.getElementById("coDescription");
  const qty = document.getElementById("coQty");
  const subtotal = document.getElementById("coSubtotal");
  const total = document.getElementById("coTotal");
  const form = document.getElementById("checkoutForm");

  NORTHVEIL_PRODUCTS.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.name;
    select.append(opt);
  });

  const money = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  const find = (id) => NORTHVEIL_PRODUCTS.find((p) => p.id === id) || NORTHVEIL_PRODUCTS[0];

  const render = () => {
    const product = find(select.value);
    const count = Math.min(10, Math.max(1, parseInt(qty.value, 10) || 1));
    title.textContent = `Checkout: ${product.name}`;
    document.title = `Checkout: ${product.name} — Northveil Technologies`;
    status.textContent = product.status;
    description.textContent = product.description;
    if (typeof product.price === "number") {
      subtotal.textContent = money(product.price * count);
      total.textContent = money(product.price * count);
    } else {
      subtotal.textContent = "Pricing at launch";
      total.textContent = "—";
    }
  };

  select.value = find(new URLSearchParams(location.search).get("product")).id;
  render();

  select.addEventListener("change", () => {
    history.replaceState(null, "", northveilCheckoutUrl(select.value));
    render();
  });
  qty.addEventListener("input", render);
  form.addEventListener("submit", (e) => e.preventDefault());
});
