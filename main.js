/* ==========================================================
   Galaxy Portfolio — shared behaviour
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Icon set (injected into <i data-icon="..."> ) ---------- */
  const S = 'fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"';
  const F = 'fill="currentColor"';
  const ICONS = {
    search: `<g ${S}><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></g>`,
    home: `<g ${F}><path d="M12 2.6 1.6 12.2h3.1V21h5.6v-6.2h3.4V21h5.6v-8.8h3.1z"/></g>`,
    grid: `<g ${F}><rect x="3" y="3" width="8" height="12" rx="2"/><rect x="13" y="3" width="8" height="7" rx="2"/><rect x="3" y="17" width="8" height="4" rx="2"/><rect x="13" y="12" width="8" height="9" rx="2"/></g>`,
    gear: `<g ${F}><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/></g>`,
    user: `<g ${F}><circle cx="12" cy="7.5" r="5"/><path d="M3.5 21c0-4.2 3.8-6.6 8.5-6.6s8.5 2.4 8.5 6.6z"/></g>`,
    right: `<g ${S}><path d="M4 12h15M13 5l7 7-7 7"/></g>`,
    down: `<g ${S}><path d="M12 4v15M5 13l7 7 7-7"/></g>`,
    plus: `<g ${S} stroke-width="3.4"><path d="M12 3.5v17M3.5 12h17"/></g>`,
    close: `<g ${S}><path d="M5 5l14 14M19 5 5 19"/></g>`,
    mail: `<g ${S} stroke-width="2.2"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7.5 8 6 8-6"/></g>`,
    chat: `<g ${S} stroke-width="2.2"><path d="M4 5h16v11H11l-5 4v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/></g>`,
    pin: `<g ${S} stroke-width="2.2"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.6"/></g>`,
    logo: `<g ${F}><path d="M3 21 12 3l4 7.5-2.4 1.6L12 9 7.4 18.2 12 21z"/><path d="M13.5 21 21 12.5v8.5z" opacity=".75"/></g>`
  };

  document.querySelectorAll("i[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (!ICONS[name]) return;
    el.outerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
  });

  /* ---------- Search → simple site navigation ---------- */
  const form = document.getElementById("site-search");
  if (form) {
    const input = form.querySelector("input");
    const routes = [
      { page: "index.html", keys: ["home", "beranda", "หน้าแรก", "landing", "start", "เริ่ม"] },
      { page: "about.html", keys: ["about", "me", "skill", "education", "experience", "contact", "ติดต่อ", "ประวัติ", "ทักษะ", "เกี่ยวกับ", "ฉัน", "ผม"] },
      { page: "mywork.html", keys: ["work", "project", "portfolio", "design", "web", "app", "ผลงาน", "โปรเจกต์", "โปรเจค", "งาน"] }
    ];
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = input.value.trim().toLowerCase();
      if (!q) return;
      const hit = routes.find((r) => r.keys.some((k) => q.includes(k) || k.includes(q)));
      if (hit) {
        window.location.href = hit.page;
      } else {
        form.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "translateX(0)" }],
          { duration: 260 }
        );
        input.select();
      }
    });
  }

  /* ---------- Scroll button ---------- */
  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.getAttribute("data-scroll"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ---------- Reveal on scroll + skill bars ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("in");
          en.target.querySelectorAll(".bar i[data-w]").forEach((b) => (b.style.width = b.dataset.w + "%"));
          io.unobserve(en.target);
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => {
      el.classList.add("in");
      el.querySelectorAll(".bar i[data-w]").forEach((b) => (b.style.width = b.dataset.w + "%"));
    });
  }

  /* ---------- Gentle parallax on floating decorations ---------- */
  const floaters = document.querySelectorAll("[data-depth]");
  if (floaters.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener(
      "mousemove",
      (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        floaters.forEach((el) => {
          const d = parseFloat(el.dataset.depth) || 6;
          el.style.translate = `${(x * d).toFixed(1)}px ${(y * d).toFixed(1)}px`;
        });
      },
      { passive: true }
    );
  }

  /* ---------- Work filter + modal (mywork.html) ---------- */
  const chips = document.querySelectorAll(".chip[data-filter]");
  const works = document.querySelectorAll(".work[data-cat]");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("on"));
      chip.classList.add("on");
      const f = chip.dataset.filter;
      works.forEach((w) => w.classList.toggle("hide", f !== "all" && !w.dataset.cat.split(" ").includes(f)));
    });
  });

  const modal = document.getElementById("work-modal");
  if (modal) {
    const art = modal.querySelector(".m-art .art");
    const title = modal.querySelector("h3");
    const desc = modal.querySelector(".m-desc");
    const tags = modal.querySelector(".tags");
    const link = modal.querySelector(".m-link");

    const open = (data) => {
      art.className = "art " + data.art;
      title.textContent = data.title;
      desc.textContent = data.desc;
      tags.innerHTML = data.tags.split(",").map((t) => `<span class="tag">${t.trim()}</span>`).join("");
      link.setAttribute("href", data.link || "#");
      if (typeof modal.showModal === "function") modal.showModal();
      else modal.setAttribute("open", "");
    };

    document.querySelectorAll("[data-open]").forEach((el) => {
      el.addEventListener("click", () => {
        open({
          art: el.dataset.art,
          title: el.dataset.title,
          desc: el.dataset.desc,
          tags: el.dataset.tags,
          link: el.dataset.link
        });
      });
    });
    modal.querySelector(".close").addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

    // open from hash e.g. mywork.html#p3
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const el = document.querySelector(`[data-id="${hash}"]`);
      if (el) setTimeout(() => el.click(), 350);
    }
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
