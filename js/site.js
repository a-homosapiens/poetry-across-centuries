/* Cross-Century Conversation — shared behaviour
   Theme (day/night) and Edition (student/teacher) persist across pages. */
(function () {
  "use strict";
  var root = document.documentElement;
  var body = document.body;

  /* ---- Edition (student / teacher) ---- */
  function applyMode(mode) {
    body.classList.remove("mode-student", "mode-teacher");
    body.classList.add(mode === "teacher" ? "mode-teacher" : "mode-student");
    document.querySelectorAll("[data-mode-btn]").forEach(function (btn) {
      var btnMode = btn.getAttribute("data-mode-btn");
      var isCurrent = btnMode === mode;
      btn.setAttribute("aria-pressed", String(isCurrent));
      /* Title always describes the mode a click will land on: the other
         mode if this button is the active one (mobile shows only this
         button), or this button's own mode if it's the inactive one. */
      var resultMode = isCurrent ? (mode === "teacher" ? "student" : "teacher") : btnMode;
      btn.title = "Switch to " + (resultMode === "teacher" ? "Teacher" : "Student") + " Mode";
    });
    try { localStorage.setItem("cxc-mode", mode); } catch (e) {}
  }

  var savedMode = "student";
  try { savedMode = localStorage.getItem("cxc-mode") || "student"; } catch (e) {}
  applyMode(savedMode);

  document.querySelectorAll("[data-mode-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-mode-btn");
      var current = body.classList.contains("mode-teacher") ? "teacher" : "student";
      /* On mobile only the active button is visible, so clicking it
         must toggle to the other mode rather than re-apply itself. */
      if (target === current) target = target === "teacher" ? "student" : "teacher";
      applyMode(target);
    });
  });

  /* ---- Theme (day / night) ---- */
  function currentTheme() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("cxc-theme", theme); } catch (e) {}
    document.querySelectorAll("[data-theme-btn]").forEach(function (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to day mode" : "Switch to night mode");
    });
  }

  document.querySelectorAll("[data-theme-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  });
})();
