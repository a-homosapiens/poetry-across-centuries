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
    var other = mode === "teacher" ? "Student" : "Teacher";
    document.querySelectorAll("[data-mode-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", "Switch to " + other + " Mode");
      btn.title = "Switch to " + other + " Mode";
    });
    try { localStorage.setItem("cxc-mode", mode); } catch (e) {}
  }

  var savedMode = "student";
  try { savedMode = localStorage.getItem("cxc-mode") || "student"; } catch (e) {}
  applyMode(savedMode);

  document.querySelectorAll("[data-mode-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var current = body.classList.contains("mode-teacher") ? "teacher" : "student";
      applyMode(current === "teacher" ? "student" : "teacher");
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
