/**
 * Northveil site config + behavior.
 *
 * Flip AMAZON_STORE_URL once the Amazon store is live to automatically
 * enable every "Shop on Amazon" button across the page.
 */
const AMAZON_STORE_URL = ""; // e.g. "https://www.amazon.com/shops/northveiltech"

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // Wire up Amazon CTAs once a URL is set.
  if (AMAZON_STORE_URL) {
    document.querySelectorAll("#amazonBtnHero, #amazonBtnHeader").forEach((btn) => {
      btn.href = AMAZON_STORE_URL;
      btn.target = "_blank";
      btn.rel = "noopener";
      btn.removeAttribute("aria-disabled");
      btn.classList.remove("is-disabled");
      btn.querySelector("small") && (btn.querySelector("small").textContent = "");
    });
  }

  // Sticky header shadow/blur on scroll.
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav toggle.
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const open = navLinks.style.display === "flex";
    navLinks.style.display = open ? "none" : "flex";
    navLinks.style.flexDirection = "column";
    navLinks.style.alignItems = "flex-start";
    navLinks.style.position = "absolute";
    navLinks.style.top = "100%";
    navLinks.style.right = "0";
    navLinks.style.left = "auto";
    navLinks.style.width = "min(55vw, 190px)";
    navLinks.style.background = "rgba(11,10,8,0.97)";
    navLinks.style.padding = "20px 24px";
    navLinks.style.gap = "18px";
    navLinks.style.textAlign = "left";
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      if (window.innerWidth <= 720) navLinks.style.display = "none";
    })
  );

  // Scroll-reveal animations.
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));

  // FAQ accordion.
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove("is-open");
      });
      item.classList.toggle("is-open", !isOpen);
    });
  });
});
