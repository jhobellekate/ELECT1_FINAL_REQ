// directory.js
// Certification directory: cards, search, filters and the details pop-up.


var selectedCategory = "All"; // changed by the category buttons

var PROVIDER_LOGOS = {
  "Cisco": "cisco_logo.png",
  "Cisco Networking Academy": "cisco_netacad_logo.png",
  "CompTIA": "comptia_logo.png",
  "ISC2": "isc2_logo.png",
  "Google Cloud": "google_cloud_logo.png",
  "Amazon Web Services": "AWS_logo.png",
  "Microsoft": "microsoft_logo.png",
  "IBM": "IBM_logo.png",
  "Google": "google_logo.png",
  "Harvard CS50": "harvard_cs50_logo.png",
  "freeCodeCamp": "freecodecamp_logo.png",
  "Python Institute": "python_institute_logo.png",
  "Linux Professional Institute (LPI)": "linux_logo.png",
  "The Linux Foundation": "linux_logo.png",
  "Arduino": "arduino_logo.png",
  "ETA International": "eta_int_logo.png"
};


// ---------- Setup ----------
function initDirectory() {
  fillFilterDropdowns();
  renderFeatured();
  renderHomePaths();
  applyFilters();


  // search box: filter every time the user types
  document.getElementById("search-input").addEventListener("input", applyFilters);


  // category buttons
  var buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      selectedCategory = button.dataset.category;
      buttons.forEach(function (b) { b.classList.remove("active"); });
      button.classList.add("active");
      applyFilters();
    });
  });


  // dropdown filters
  ["type-filter", "level-filter", "path-filter", "provider-filter"].forEach(function (id) {
    document.getElementById(id).addEventListener("change", applyFilters);
  });


  document.getElementById("reset-filters").addEventListener("click", resetFilters);


  // close button and clicking outside the dialog
  var dialog = document.getElementById("detail-dialog");
  document.getElementById("detail-close").addEventListener("click", function () {
    closeDetails();
  });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      closeDetails();
    }
  });


  // One click listener for every button that opens details or filters by path.
  // This also works for buttons made later by other files (roadmap.js).
  document.addEventListener("click", function (event) {
    var detailsBtn = event.target.closest(".details-btn");
    if (detailsBtn) {
      openDetails(detailsBtn.dataset.id);
      return;
    }
    var refreshStatusBtn = event.target.closest(".refresh-resource-status");
    if (refreshStatusBtn) {
      refreshResourceStatus(refreshStatusBtn.dataset.id);
      return;
    }
    var pathBtn = event.target.closest(".filter-path-btn");
    if (pathBtn) {
      filterByPath(pathBtn.dataset.path);
    }
  });
}


// Fill the dropdowns with the values found in the data
function fillFilterDropdowns() {
  var types = [];
  var levels = [];
  var providers = [];


  RESOURCES.forEach(function (r) {
    if (types.indexOf(r.type) === -1) types.push(r.type);
    if (levels.indexOf(r.level) === -1) levels.push(r.level);
    if (providers.indexOf(r.provider) === -1) providers.push(r.provider);
  });


  levels.sort(function (a, b) { return LEVELS.indexOf(a) - LEVELS.indexOf(b); });
  providers.sort();


  fillSelect("type-filter", "All types", types.map(function (t) { return { value: t, text: t }; }));
  fillSelect("level-filter", "All levels", levels.map(function (l) { return { value: l, text: l }; }));
  fillSelect("provider-filter", "All providers", providers.map(function (p) { return { value: p, text: p }; }));
  fillSelect("path-filter", "All career paths", CAREER_PATHS.map(function (p) { return { value: p.id, text: p.name }; }));
}


function fillSelect(selectId, allText, options) {
  var html = '<option value="All">' + allText + "</option>";
  options.forEach(function (o) {
    html += '<option value="' + o.value + '">' + o.text + "</option>";
  });
  document.getElementById(selectId).innerHTML = html;
}


// ---------- Filtering ----------
function getFilters() {
  return {
    search: document.getElementById("search-input").value.trim().toLowerCase(),
    category: selectedCategory,
    type: document.getElementById("type-filter").value,
    level: document.getElementById("level-filter").value,
    path: document.getElementById("path-filter").value,
    provider: document.getElementById("provider-filter").value
  };
}


// Returns true only if the resource passes ALL the filters (search and filters combine)
function matchesFilters(resource, f) {
  if (f.category !== "All" && resource.category !== f.category) return false;
  if (f.type !== "All" && resource.type !== f.type) return false;
  if (f.level !== "All" && resource.level !== f.level) return false;
  if (f.provider !== "All" && resource.provider !== f.provider) return false;


  if (f.path !== "All") {
    var paths = resource.careerPaths || [];
    if (paths.indexOf(f.path) === -1) return false;
  }


  if (f.search !== "") {
    var skillNames = (resource.skills || []).map(getSkillLabel).join(" ");
    var text = (resource.name + " " + resource.provider + " " + (resource.description || "") + " " + skillNames).toLowerCase();
    if (text.indexOf(f.search) === -1) return false;
  }


  return true;
}


function applyFilters() {
  var f = getFilters();
  var results = RESOURCES.filter(function (r) {
    return matchesFilters(r, f);
  });


  renderCards(results);


  document.getElementById("result-count").textContent =
    "Showing " + results.length + " of " + RESOURCES.length + " resources";
  document.getElementById("no-results").style.display = results.length === 0 ? "block" : "none";
}


function resetFilters() {
  selectedCategory = "All";
  document.getElementById("search-input").value = "";
  ["type-filter", "level-filter", "path-filter", "provider-filter"].forEach(function (id) {
    document.getElementById(id).value = "All";
  });
  document.querySelectorAll(".filter-btn").forEach(function (b) {
    b.classList.toggle("active", b.dataset.category === "All");
  });
  applyFilters();
}


// Used by the "See in directory" buttons and the career path chips
function filterByPath(pathId) {
  resetFilters();
  document.getElementById("path-filter").value = pathId;
  applyFilters();
  document.getElementById("directory").scrollIntoView({ behavior: "smooth" });
}


// ---------- Cards ----------
function cardHTML(resource) {
  var logo = PROVIDER_LOGOS[resource.provider];
  return '<article class="card">' +
    '<div class="card-heading">' +
      (logo ? '<img class="card-logo" src="images/' + logo + '" alt="' + resource.provider + ' logo">' : "") +
      "<h3>" + resource.name + "</h3>" +
    "</div>" +
    '<p class="provider">' + resource.provider + "</p>" +
    '<ul class="details">' +
      "<li><strong>Type:</strong> " + resource.type + "</li>" +
      "<li><strong>Category:</strong> " + resource.category + "</li>" +
      "<li><strong>Level:</strong> " + resource.level + "</li>" +
    "</ul>" +
    '<button type="button" class="btn details-btn" data-id="' + resource.id + '">View details</button>' +
    "</article>";
}


function renderCards(list) {
  var html = "";
  list.forEach(function (r) {
    html += cardHTML(r);
  });
  document.getElementById("resource-list").innerHTML = html;
}


function renderFeatured() {
  var html = "";
  FEATURED_IDS.forEach(function (id) {
    var r = getResourceById(id);
    if (r) html += cardHTML(r);
  });
  document.getElementById("featured-list").innerHTML = html;
}


// Career path links on the home page
function renderHomePaths() {
  var html = "";
  CAREER_PATHS.forEach(function (p) {
    html += '<button type="button" class="chip filter-path-btn" data-path="' + p.id + '">' + p.name + "</button>";
  });
  document.getElementById("home-paths").innerHTML = html;
}


// ---------- Details pop-up ----------
// Finds the step that comes after this resource in each career path
function getNextSteps(resourceId) {
  var next = [];
  CAREER_PATHS.forEach(function (path) {
    for (var i = 0; i < path.steps.length; i++) {
      if (path.steps[i].resourceId === resourceId && path.steps[i + 1]) {
        var step = path.steps[i + 1];
        var resource = step.resourceId ? getResourceById(step.resourceId) : null;
        var name = resource ? resource.name : step.title;
        var text = name + " (" + path.name + " path)";
        if (next.indexOf(text) === -1) next.push(text);
      }
    }
  });
  return next;
}


function listHTML(items, emptyText) {
  if (!items || items.length === 0) {
    return "<p>" + emptyText + "</p>";
  }
  return "<ul>" + items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
}


function openDetails(id) {
  var r = getResourceById(id);
  if (!r) return; // unknown id: do nothing instead of crashing


  var skills = (r.skills || []).map(getSkillLabel);
  var paths = (r.careerPaths || []).map(function (pid) {
    var p = getPathById(pid);
    return p ? p.name : pid;
  });
  var nextSteps = getNextSteps(r.id);


  var html =
    '<h3 id="detail-title">' + r.name + "</h3>" +
    '<p class="provider">' + r.provider + "</p>" +
    '<p class="badge-row"><span class="badge">' + r.type + '</span><span class="badge">' + r.category +
    '</span><span class="badge">' + r.level + "</span></p>" +
    '<div class="resource-status-row" aria-live="polite">' +
      '<div><strong>Provider status</strong><p id="resource-status-label">Checking ' + r.provider + "...</p></div>" +
      '<span id="resource-status-value" class="status-pill">Checking</span>' +
      '<button type="button" class="btn btn-outline refresh-resource-status" data-id="' + r.id + '" aria-label="Refresh provider status">Refresh</button>' +
    "</div>" +
    "<p>" + (r.description || "No description available.") + "</p>" +
    "<h4>Skills covered</h4>" + listHTML(skills, "Skills are not listed for this resource.") +
    "<h4>Career relevance</h4>" + listHTML(paths, "Not linked to a specific career path yet.") +
    "<h4>Prerequisites</h4>" + listHTML(r.prerequisites, "No prerequisites are listed here. Check the official site for entry requirements.") +
    "<h4>Suggested next steps</h4>" + listHTML(nextSteps, "No next step is suggested yet.") +
    "<h4>Cost</h4><p>" + (r.cost || "Check the official site for current fees.") + "</p>";


  if (r.link) {
    html += '<p><a class="btn" href="' + r.link + '" target="_blank" rel="noopener noreferrer">Visit official site</a></p>';
  }


  document.getElementById("detail-content").innerHTML = html;


  var dialog = document.getElementById("detail-dialog");
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", ""); // older browsers
  }
  refreshResourceStatus(r.id);
}


function closeDetails() {
  var dialog = document.getElementById("detail-dialog");
  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}




