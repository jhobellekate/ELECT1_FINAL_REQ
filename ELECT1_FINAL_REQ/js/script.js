// script.js
// Shared helpers, the theme toggle, the mobile menu and the start-up code.
// Directory code lives in directory.js. Career and roadmap code lives in roadmap.js.


var THEME_KEY = "cpeLearningHub.theme";


// ---------- Shared helper functions (used by directory.js and roadmap.js) ----------
function getResourceById(id) {
  for (var i = 0; i < RESOURCES.length; i++) {
    if (RESOURCES[i].id === id) return RESOURCES[i];
  }
  return null;
}


function getPathById(id) {
  for (var i = 0; i < CAREER_PATHS.length; i++) {
    if (CAREER_PATHS[i].id === id) return CAREER_PATHS[i];
  }
  return null;
}


// If a skill id is not found, show the id so nothing breaks
function getSkillLabel(id) {
  for (var i = 0; i < SKILLS.length; i++) {
    if (SKILLS[i].id === id) return SKILLS[i].label;
  }
  return id;
}


// ---------- Theme toggle ----------
function setTheme(isDark) {
  var button = document.getElementById("theme-toggle");
  document.body.classList.toggle("dark-mode", isDark);
  button.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  button.setAttribute("aria-pressed", isDark ? "true" : "false");
}


function initTheme() {
  var savedTheme = null;
  try {
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (error) { }


  setTheme(savedTheme === "dark");


  document.getElementById("theme-toggle").addEventListener("click", function () {
    var goDark = !document.body.classList.contains("dark-mode");
    setTheme(goDark);
    try {
      localStorage.setItem(THEME_KEY, goDark ? "dark" : "light");
    } catch (error) { }
  });
}


// ---------- Mobile menu ----------
function initMenu() {
  var button = document.getElementById("menu-toggle");
  var links = document.getElementById("nav-links");


  button.addEventListener("click", function () {
    var isOpen = links.classList.toggle("open");
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });


  // close the menu after choosing a link
  links.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      links.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    }
  });
}


// ---------- Return to top ----------
function initBackToTop() {
  var button = document.getElementById("back-to-top");

  function updateVisibility() {
    button.hidden = window.scrollY < 300;
  }

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();

  button.addEventListener("click", function () {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });
}


// ---------- Start everything once the page is ready ----------
document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initMenu();
  initBackToTop();
  initDirectory();
  initRoadmap();
  initServiceStatus();
});
