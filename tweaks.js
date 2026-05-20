/* ===== Clockchain — Tweaks Panel ===== */
(() => {
  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "green",
    "theme": "dark",
    "kinetic": "subtle",
    "roadmap": "vertical"
  }/*EDITMODE-END*/;

  const OPTIONS = {
    accent:  [["green","Gold"],["duo","Gold + Blue"],["luxe","Amber"]],
    theme:   [["dark","Dark"],["light","Light Luxe"]],
    kinetic: [["subtle","Subtle"],["aggressive","Aggressive"]],
    roadmap: [["vertical","Sticky Year"],["horizontal","Timeline"]]
  };

  const state = { ...DEFAULTS };

  const apply = () => {
    const r = document.documentElement;
    if (state.accent === "green") r.removeAttribute("data-accent");
    else r.setAttribute("data-accent", state.accent);

    if (state.theme === "dark") r.removeAttribute("data-theme");
    else r.setAttribute("data-theme", state.theme);

    if (state.kinetic === "subtle") r.removeAttribute("data-kinetic");
    else r.setAttribute("data-kinetic", state.kinetic);

    if (state.roadmap === "vertical") r.removeAttribute("data-roadmap");
    else r.setAttribute("data-roadmap", state.roadmap);
  };
  apply();

  // Tag words with index for staggered animation
  document.querySelectorAll(".kinetic-title .word").forEach((w, i) => {
    w.style.setProperty("--wi", i);
  });

  // Build panel
  const panel = document.createElement("aside");
  panel.className = "tweaks-panel";
  panel.setAttribute("aria-label", "Tweaks");
  panel.innerHTML = `
    <div class="tw-head">
      <div class="tw-title">Tweaks</div>
      <button class="tw-close" aria-label="Close">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    ${Object.keys(OPTIONS).map((k) => `
      <div class="tw-section" data-key="${k}">
        <div class="tw-label">${labelFor(k)}</div>
        <div class="tw-seg">
          ${OPTIONS[k].map(([v, label]) => `<button data-v="${v}">${label}</button>`).join("")}
        </div>
      </div>
    `).join("")}
  `;
  document.body.appendChild(panel);

  function labelFor(k) {
    return ({ accent: "Accent palette", theme: "Theme", kinetic: "Hero kinetics", roadmap: "Roadmap layout" })[k];
  }

  function syncButtons() {
    panel.querySelectorAll(".tw-section").forEach((sec) => {
      const k = sec.dataset.key;
      sec.querySelectorAll("button").forEach((b) => {
        b.classList.toggle("active", b.dataset.v === state[k]);
      });
    });
  }
  syncButtons();

  panel.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-v]");
    if (btn) {
      const k = btn.parentElement.parentElement.dataset.key;
      const v = btn.dataset.v;
      state[k] = v;
      apply();
      syncButtons();
      try {
        window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
      } catch (_) {}
      return;
    }
    if (e.target.closest(".tw-close")) {
      panel.classList.remove("open");
      try {
        window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
      } catch (_) {}
    }
  });

  // Host protocol
  window.addEventListener("message", (e) => {
    const d = e && e.data;
    if (!d || !d.type) return;
    if (d.type === "__activate_edit_mode") panel.classList.add("open");
    if (d.type === "__deactivate_edit_mode") panel.classList.remove("open");
  });

  try {
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
  } catch (_) {}
})();
