// JS/script.js — Superhuman Design System
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // NAV SCROLL BEHAVIOR
  // =========================================================================
  const nav = document.getElementById("site-nav");
  const banner = document.querySelector(".announcement-banner");

  function updateNav() {
    if (!nav) return;
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector(".hero")?.offsetHeight || 600;

    if (scrollY > heroHeight * 0.15) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  // =========================================================================
  // HERO FLOATING PANELS (Randomized Positions)
  // =========================================================================
  const heroPanelsContainer = document.getElementById("hero-panels-container");
  if (heroPanelsContainer && window.innerWidth >= 900) {
    // Pool of panel data — add or remove items freely
    const panelData = [
      {
        label: "Software Engineering",
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg>',
      },
      {
        label: "Video Editing",
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>',
      },
      {
        label: "Unreal Engine",
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
      },
      {
        label: "JavaScript",
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
      },
      {
        label: "After Effects",
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>',
      },
      {
        label: "UX Design",
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>',
      },
      {
        label: "Game Prototyping",
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4M15 13h.01M18 11h.01"/></svg>',
      },
    ];

    // Pick a random subset (4-6 panels)
    const count = Math.min(Math.floor(Math.random() * 3) + 4, panelData.length);
    const shuffled = [...panelData].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);

    // Generate and place panels
    selected.forEach((panel, index) => {
      const div = document.createElement("div");
      div.className = "hero-panel";

      // Random position: left side (0-40%) or right side (55-92%)
      // Random vertical position: 10% - 85%
      const isLeft = Math.random() > 0.4;
      const leftPct = isLeft ? Math.random() * 30 + 2 : Math.random() * 30 + 55;
      const topPct = Math.random() * 70 + 10;

      // Stagger float animation delays so they don't move in sync
      const floatDelay = (index * 1.3) % 6;

      div.style.left = leftPct + "%";
      div.style.top = topPct + "%";
      div.style.animationDelay = floatDelay + "s";

      // Entrance animation
      div.style.opacity = "0";
      div.style.animation = `fadeSlideUp 0.6s ease ${0.6 + index * 0.15}s both, float 6s ease-in-out ${floatDelay}s infinite`;

      div.innerHTML = panel.svg + " " + panel.label;
      heroPanelsContainer.appendChild(div);
    });
  }

  // =========================================================================
  // SECTION REVEAL (Intersection Observer)
  // =========================================================================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });

  // =========================================================================
  // WORKS TAB SWITCHER
  // =========================================================================
  const tabs = document.querySelectorAll(".works-tab");
  const panels = {
    frogpos: document.getElementById("panel-frogpos"),
    prepaview: document.getElementById("panel-prepaview"),
    chatbot: document.getElementById("panel-chatbot"),
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      // Deactivate all tabs
      tabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
        t.setAttribute("tabindex", "-1");
      });

      // Hide all panels
      Object.values(panels).forEach((panel) => {
        if (panel) panel.classList.remove("active");
      });

      // Activate target
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      tab.setAttribute("tabindex", "0");
      if (panels[target]) panels[target].classList.add("active");
    });
  });

  // Keyboard navigation for the tablist (ARIA tabs pattern)
  const tabList = document.querySelector(".works-tabs");
  if (tabList) {
    tabList.addEventListener("keydown", (e) => {
      const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
      if (!keys.includes(e.key)) return;
      const current = document.activeElement;
      if (!current || !current.classList.contains("works-tab")) return;

      e.preventDefault();
      const tabArray = Array.from(tabs);
      let index = tabArray.indexOf(current);

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        index = (index + 1) % tabArray.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        index = (index - 1 + tabArray.length) % tabArray.length;
      } else if (e.key === "Home") {
        index = 0;
      } else if (e.key === "End") {
        index = tabArray.length - 1;
      }

      const next = tabArray[index];
      next.focus();
      next.click();
    });
  }

  // =========================================================================
  // AUDIO SYSTEM
  // =========================================================================
  const audio = document.getElementById("bg-music");
  const audioToggle = document.getElementById("audio-toggle");
  const audioDot = document.getElementById("audio-status-dot");
  const audioText = document.getElementById("audio-text");

  if (audio && audioToggle) {
    audio.volume = 0.1;

    audioToggle.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().catch(() => {
          // Autoplay may be blocked; silently ignore
        });
        audioDot.classList.add("active");
        audioText.innerText = "Music On";
      } else {
        audio.pause();
        audioDot.classList.remove("active");
        audioText.innerText = "Music Off";
      }
    });
  }

  // =========================================================================
  // THEME TOGGLE (dark / light / system)
  // =========================================================================
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement;

  function getPreferredTheme() {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist !== false) localStorage.setItem("theme", theme);
  }

  if (themeToggle) {
    // Initial paint follows stored preference, else the system preference.
    applyTheme(getPreferredTheme(), false);

    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });

    // Follow system preference changes until the user chooses explicitly.
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        const stored = localStorage.getItem("theme");
        if (stored !== "dark" && stored !== "light") {
          applyTheme(e.matches ? "dark" : "light", false);
        }
      });
  }

  // =========================================================================
  // CONTACT FORM (composes a mailto link)
  // =========================================================================
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("cf-name").value.trim();
      const email = document.getElementById("cf-email").value.trim();
      const message = document.getElementById("cf-message").value.trim();
      if (!name || !message) return;

      const subject = `Portfolio inquiry from ${name}`;
      const body =
        (email ? `Email: ${email}\n\n` : "") +
        `Message:\n${message}`;

      const href =
        "mailto:giannoriega4everything@gmail.com" +
        `?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = href;
    });
  }

  // =========================================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
