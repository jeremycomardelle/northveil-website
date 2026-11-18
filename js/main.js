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

  // Header search: a small client-side index of products, sections and FAQs.
  const searchForm = document.getElementById("siteSearch");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const searchToggle = document.getElementById("searchToggle");

  const sectionEntries = [
    { label: "Videos", id: "videos", terms: "watch walkthrough" },
    { label: "About Us", id: "about", terms: "who northveil company mission represent" },
    { label: "Get notified", id: "notify", terms: "launch instagram follow amazon" },
  ].map((s) => ({ label: s.label, group: "Section", el: document.getElementById(s.id), terms: s.terms }));

  const searchIndex = [
    ...Array.from(document.querySelectorAll(".product-card")).map((el) => ({
      label: el.querySelector("h3").textContent.trim(),
      group: "Product",
      el,
      terms: (el.dataset.terms || "") + " " + el.querySelector("p").textContent,
    })),
    ...sectionEntries,
    ...Array.from(document.querySelectorAll(".faq-item")).map((el) => ({
      label: el.querySelector(".faq-q").childNodes[0].textContent.trim(),
      group: "FAQ",
      el,
      terms: el.querySelector(".faq-a").textContent,
    })),
  ].filter((entry) => entry.el);

  const closeSearchResults = () => {
    searchResults.hidden = true;
    searchResults.replaceChildren();
  };

  const goToResult = (entry) => {
    closeSearchResults();
    searchInput.value = "";
    searchInput.blur();
    if (window.innerWidth <= 720) {
      searchForm.classList.remove("is-open");
      searchToggle.setAttribute("aria-expanded", "false");
    }
    if (entry.group === "FAQ") {
      document.querySelectorAll(".faq-item.is-open").forEach((i) => i !== entry.el && i.classList.remove("is-open"));
      entry.el.classList.add("is-open");
    }
    entry.el.scrollIntoView({ behavior: "smooth", block: entry.group === "Section" ? "start" : "center" });
    if (entry.group !== "Section") {
      entry.el.classList.remove("search-flash");
      void entry.el.offsetWidth; // restart the animation
      entry.el.classList.add("search-flash");
    }
  };

  const findMatches = (query) => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return [];
    return searchIndex
      .filter((entry) => {
        const haystack = `${entry.label} ${entry.terms}`.toLowerCase();
        return tokens.every((t) => haystack.includes(t));
      })
      .sort((a, b) => {
        const score = (e) => (tokens.every((t) => e.label.toLowerCase().includes(t)) ? 0 : 1);
        return score(a) - score(b);
      })
      .slice(0, 6);
  };

  const renderSearch = () => {
    const query = searchInput.value.trim();
    searchResults.replaceChildren();
    if (!query) {
      searchResults.hidden = true;
      return;
    }
    const matches = findMatches(query);
    if (!matches.length) {
      const empty = document.createElement("p");
      empty.className = "search-empty";
      empty.textContent = "No matches. Try “Wildcat”, “armband”, or “Bluetooth”.";
      searchResults.append(empty);
    }
    matches.forEach((entry) => {
      const btn = document.createElement("button");
      btn.type = "button";
      const label = document.createElement("span");
      label.textContent = entry.label;
      const group = document.createElement("small");
      group.textContent = entry.group;
      btn.append(label, group);
      btn.addEventListener("click", () => goToResult(entry));
      searchResults.append(btn);
    });
    searchResults.hidden = false;
  };

  searchInput.addEventListener("input", renderSearch);
  searchInput.addEventListener("focus", renderSearch);
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const [first] = findMatches(searchInput.value.trim());
    if (first) goToResult(first);
    else renderSearch();
  });
  searchToggle.addEventListener("click", () => {
    const open = searchForm.classList.toggle("is-open");
    searchToggle.setAttribute("aria-expanded", String(open));
    searchToggle.setAttribute("aria-label", open ? "Close search" : "Open search");
    if (open) searchInput.focus();
    else closeSearchResults();
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#siteSearch") && !e.target.closest("#searchToggle")) closeSearchResults();
  });

  // Account menu. The site has no accounts, so it points to Amazon orders and warranty support.
  const accountBtn = document.getElementById("accountBtn");
  const accountMenu = document.getElementById("accountMenu");
  const setAccountMenu = (open) => {
    accountMenu.hidden = !open;
    accountBtn.setAttribute("aria-expanded", String(open));
  };
  accountBtn.addEventListener("click", () => setAccountMenu(accountMenu.hidden));
  accountMenu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setAccountMenu(false);
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".account")) setAccountMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!accountMenu.hidden) {
      setAccountMenu(false);
      accountBtn.focus();
    }
    if (!searchResults.hidden) closeSearchResults();
  });

  // Policy overlay. Links use data-policy-link="<key>"; #<key>-policy deep links open it on load.
  const policyDialog = document.getElementById("policyDialog");
  const policyTitle = document.getElementById("policyDialogTitle");
  const policyBody = policyDialog.querySelector(".policy-dialog__body");
  const policies = policyDialog.querySelectorAll("[data-policy]");
  let policyReturnFocus = null;

  const openPolicy = (key) => {
    const match = policyDialog.querySelector(`[data-policy="${key}"]`);
    if (!match) return;
    policies.forEach((p) => (p.hidden = p !== match));
    policyTitle.textContent = match.dataset.title;
    policyBody.scrollTop = 0;
    if (!policyDialog.open) {
      policyReturnFocus = document.activeElement;
      policyDialog.showModal();
    }
    document.body.classList.add("is-policy-open");
    history.replaceState(null, "", `#${key}-policy`);
  };

  policyDialog.addEventListener("close", () => {
    document.body.classList.remove("is-policy-open");
    if (/-policy$/.test(location.hash)) history.replaceState(null, "", location.pathname + location.search);
    if (policyReturnFocus) policyReturnFocus.focus();
  });

  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-policy-link]");
    if (link) {
      e.preventDefault();
      openPolicy(link.dataset.policyLink);
    } else if (e.target.closest("[data-policy-close]") || e.target === policyDialog) {
      policyDialog.close();
    }
  });

  const openPolicyFromHash = () => {
    const m = location.hash.match(/^#(\w+)-policy$/);
    if (m) openPolicy(m[1]);
  };
  window.addEventListener("hashchange", openPolicyFromHash);
  openPolicyFromHash();
});
