// roadmap.js
// Career path overview, Career Path Explorer form, roadmap, checklist, progress and localStorage.


var STORAGE_KEY = "cpeLearningHub.roadmap";
var STORAGE_VERSION = 1; // change this number if the saved data format changes


var currentPlan = null;  // { version, pathId, level, skills, credentials, done }
var currentSteps = [];   // the steps shown in the roadmap right now


// ---------- Setup ----------
function initRoadmap() {
  fillPathSelect();
  renderCareerPaths();
  renderLearningLinks();
  showChecklists("", [], []);


  document.getElementById("path-select").addEventListener("change", function () {
    showChecklists(this.value, [], []);
    clearErrors();
  });
  document.getElementById("explorer-form").addEventListener("submit", handleSubmit);
  document.getElementById("clear-form-btn").addEventListener("click", clearAll);
  document.getElementById("reset-roadmap").addEventListener("click", clearAll);
  document.getElementById("roadmap-steps").addEventListener("change", handleStepToggle);


  // "Plan this path" buttons in the career path cards
  document.addEventListener("click", function (event) {
    var planBtn = event.target.closest(".plan-path-btn");
    if (planBtn) {
      document.getElementById("path-select").value = planBtn.dataset.path;
      showChecklists(planBtn.dataset.path, [], []);
      clearErrors();
      document.getElementById("explorer").scrollIntoView({ behavior: "smooth" });
    }
  });


  // restore the saved roadmap (if there is one)
  var saved = loadSavedPlan();
  if (saved) {
    currentPlan = saved;
    restoreForm(saved);
    renderRoadmap();
  }
}


// ---------- Career paths and learning resources (static content) ----------
function renderCareerPaths() {
  var html = "";
  CAREER_PATHS.forEach(function (path) {
    var skillItems = path.skills.map(function (s) { return "<li>" + getSkillLabel(s) + "</li>"; }).join("");


    var certItems = "";
    path.resourceIds.forEach(function (id) {
      var r = getResourceById(id);
      if (r && r.type === "Certification") {
        certItems += '<li><button type="button" class="link-btn details-btn" data-id="' + r.id + '">' + r.name + "</button></li>";
      }
    });
    if (certItems === "") certItems = "<li>No certifications listed yet.</li>";


    html += '<article class="about-box">' +
      "<h3>" + path.name + "</h3>" +
      "<p>" + path.description + "</p>" +
      "<h4>Typical skills</h4><ul>" + skillItems + "</ul>" +
      "<h4>Useful certifications</h4><ul>" + certItems + "</ul>" +
      '<div class="form-buttons">' +
        '<button type="button" class="btn plan-path-btn" data-path="' + path.id + '">Plan this path</button>' +
        '<button type="button" class="btn btn-outline filter-path-btn" data-path="' + path.id + '">See in directory</button>' +
      "</div></article>";
  });
  document.getElementById("path-list").innerHTML = html;
}


function renderLearningLinks() {
  var html = "";
  CAREER_PATHS.forEach(function (path) {
    var items = (path.links || []).map(function (l) {
      return '<li><a href="' + l.url + '" target="_blank" rel="noopener noreferrer">' + l.title + "</a>: " + l.description + "</li>";
    }).join("");
    if (items === "") return;
    html += '<article class="about-box"><h3>' + path.name + "</h3><ul>" + items + "</ul></article>";
  });
  document.getElementById("resource-links").innerHTML = html;
}


// ---------- The form ----------
function fillPathSelect() {
  var html = '<option value="">Select a career path</option>';
  CAREER_PATHS.forEach(function (p) {
    html += '<option value="' + p.id + '">' + p.name + "</option>";
  });
  document.getElementById("path-select").innerHTML = html;
}


// Shows the skill and credential checkboxes for the chosen path
function showChecklists(pathId, chosenSkills, chosenCreds) {
  var skillBox = document.getElementById("skill-checklist");
  var credBox = document.getElementById("credential-checklist");
  var path = getPathById(pathId);


  if (!path) {
    skillBox.innerHTML = '<p class="hint">Choose a career path to see its skill checklist.</p>';
    credBox.innerHTML = '<p class="hint">Choose a career path to see related credentials.</p>';
    return;
  }


  var skillHTML = "";
  path.skills.forEach(function (s) {
    var checked = chosenSkills.indexOf(s) !== -1 ? " checked" : "";
    skillHTML += '<label><input type="checkbox" name="skills" value="' + s + '"' + checked + "> " + getSkillLabel(s) + "</label>";
  });
  skillBox.innerHTML = skillHTML;


  var credHTML = "";
  path.resourceIds.forEach(function (id) {
    var r = getResourceById(id);
    if (!r) return;
    var checked = chosenCreds.indexOf(id) !== -1 ? " checked" : "";
    credHTML += '<label><input type="checkbox" name="credentials" value="' + id + '"' + checked + "> " + r.name + "</label>";
  });
  credBox.innerHTML = credHTML !== "" ? credHTML : '<p class="hint">No credentials listed for this path.</p>';
}


function getChecked(name) {
  var boxes = document.querySelectorAll('input[name="' + name + '"]:checked');
  var values = [];
  boxes.forEach(function (box) { values.push(box.value); });
  return values;
}


function readForm() {
  var levelInput = document.querySelector('input[name="level"]:checked');
  return {
    pathId: document.getElementById("path-select").value,
    level: levelInput ? levelInput.value : "",
    skills: getChecked("skills"),
    credentials: getChecked("credentials")
  };
}


// Returns true if the form is OK. Shows messages when it is not.
function validateForm(data) {
  clearErrors();
  var ok = true;


  if (!getPathById(data.pathId)) {
    document.getElementById("path-error").textContent = "Please choose a career path.";
    document.getElementById("path-select").setAttribute("aria-invalid", "true");
    ok = false;
  }
  if (LEVELS.indexOf(data.level) === -1) {
    document.getElementById("level-error").textContent = "Please select your current skill level.";
    ok = false;
  }


  if (!ok) {
    showFormMessage("Please fix the highlighted fields and try again.", true);
    var firstError = document.querySelector(".error-msg:not(:empty)");
    if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  return ok;
}


function clearErrors() {
  document.getElementById("path-error").textContent = "";
  document.getElementById("level-error").textContent = "";
  document.getElementById("path-select").removeAttribute("aria-invalid");
  showFormMessage("", false);
}


function showFormMessage(text, isError) {
  var box = document.getElementById("form-message");
  box.textContent = text;
  box.className = isError ? "form-message error" : "form-message";
}


function handleSubmit(event) {
  event.preventDefault();
  var data = readForm();
  if (!validateForm(data)) return;


  // keep old checkmarks only if the user is still on the same path
  var oldDone = currentPlan && currentPlan.pathId === data.pathId ? currentPlan.done : [];


  currentPlan = {
    version: STORAGE_VERSION,
    pathId: data.pathId,
    level: data.level,
    skills: data.skills,
    credentials: data.credentials,
    done: oldDone
  };


  renderRoadmap();
  document.getElementById("roadmap").scrollIntoView({ behavior: "smooth" });
}


// Puts saved answers back into the form
function restoreForm(plan) {
  document.getElementById("path-select").value = plan.pathId;
  showChecklists(plan.pathId, plan.skills, plan.credentials);
  var radio = document.querySelector('input[name="level"][value="' + plan.level + '"]');
  if (radio) radio.checked = true;
}


// ---------- Matching: skill gaps and steps ----------
function createRoadmap(plan) {
  var path = getPathById(plan.pathId);


  // Skills the student has = skills they checked + skills from credentials they completed
  var known = plan.skills.slice();
  plan.credentials.forEach(function (id) {
    var r = getResourceById(id);
    if (!r) return;
    (r.skills || []).forEach(function (s) {
      if (known.indexOf(s) === -1) known.push(s);
    });
  });


  var have = [];
  var gaps = [];
  path.skills.forEach(function (s) {
    if (known.indexOf(s) !== -1) {
      have.push(s);
    } else {
      gaps.push(s);
    }
  });


  // Keep a step only if it is not already completed AND it teaches at least one skill gap
  var steps = path.steps.filter(function (step) {
    if (step.resourceId && plan.credentials.indexOf(step.resourceId) !== -1) return false;
    return step.teaches.some(function (s) { return gaps.indexOf(s) !== -1; });
  });


  return { path: path, known: known, have: have, gaps: gaps, steps: steps };
}


// ---------- Showing the roadmap ----------
function renderRoadmap() {
  var result = createRoadmap(currentPlan);
  currentSteps = result.steps;


  // remove saved checkmarks for steps that are no longer in the list
  currentPlan.done = currentPlan.done.filter(function (id) {
    return currentSteps.some(function (s) { return s.id === id; });
  });


  document.getElementById("roadmap-empty").hidden = true;
  document.getElementById("roadmap-output").hidden = false;


  document.getElementById("roadmap-title").textContent = result.path.name + " roadmap (" + currentPlan.level + ")";
  document.getElementById("roadmap-summary").textContent =
    "You have " + result.have.length + " of " + result.path.skills.length +
    " typical skills for this path. These steps are suggestions to help you plan, not official requirements.";


  document.getElementById("skills-have").innerHTML = listItems(result.have, "No skills selected yet.");
  document.getElementById("skills-gap").innerHTML = listItems(result.gaps, "No gaps found. Nice work!");


  var stepsHTML = "";
  var earlierTaught = []; // skills taught by steps before the current one


  result.steps.forEach(function (step, index) {
    stepsHTML += stepHTML(step, index, result.known, earlierTaught);
    step.teaches.forEach(function (s) { earlierTaught.push(s); });
  });
  document.getElementById("roadmap-steps").innerHTML = stepsHTML;


  var note = document.getElementById("roadmap-note");
  if (result.steps.length === 0) {
    note.textContent = "You already cover every skill listed for this path. A good next step is a project, or exploring another path.";
  } else {
    note.textContent = "";
  }


  updateProgress();
  savePlan();
}


function listItems(ids, emptyText) {
  if (ids.length === 0) return "<li>" + emptyText + "</li>";
  return ids.map(function (id) { return "<li>" + getSkillLabel(id) + "</li>"; }).join("");
}


function stepHTML(step, index, known, earlierTaught) {
  var resource = step.resourceId ? getResourceById(step.resourceId) : null;
  var title = resource ? resource.name : (step.title || "Learning step");
  var kind = resource ? resource.type : "Activity";
  var isDone = currentPlan.done.indexOf(step.id) !== -1;


  // prerequisite notes
  var needsHTML = "";
  (step.needs || []).forEach(function (s) {
    var status;
    if (known.indexOf(s) !== -1) {
      status = "you have this";
    } else if (earlierTaught.indexOf(s) !== -1) {
      status = "covered in an earlier step";
    } else {
      status = "not covered yet, so review it first";
    }
    needsHTML += "<li>" + getSkillLabel(s) + " (" + status + ")</li>";
  });
  if (resource && resource.prerequisites && resource.prerequisites.length > 0) {
    resource.prerequisites.forEach(function (p) {
      needsHTML += "<li>" + p + "</li>";
    });
  }


  // below the student's level? then it is a review step
  var reviewTag = "";
  if (LEVELS.indexOf(step.level) < LEVELS.indexOf(currentPlan.level)) {
    reviewTag = '<span class="badge badge-soft">Quick review</span>';
  }


  var teaches = step.teaches.map(getSkillLabel).join(", ");


  var buttons = "";
  if (resource) {
    buttons += '<button type="button" class="btn details-btn" data-id="' + resource.id + '">View details</button>';
  }
  var link = resource ? resource.link : step.link;
  if (link) {
    buttons += '<a class="btn btn-outline" href="' + link + '" target="_blank" rel="noopener noreferrer">Official link</a>';
  }


  return '<li class="step-item' + (isDone ? " done" : "") + '">' +
    '<input type="checkbox" id="step-' + step.id + '" data-step="' + step.id + '"' + (isDone ? " checked" : "") + ">" +
    '<div class="step-body">' +
      '<label for="step-' + step.id + '" class="step-title">Step ' + (index + 1) + ": " + title + "</label>" +
      '<p class="badge-row"><span class="badge">' + kind + '</span><span class="badge">' + step.level + "</span>" + reviewTag + "</p>" +
      (step.note ? "<p>" + step.note + "</p>" : "") +
      "<p><strong>Skills you will build:</strong> " + teaches + "</p>" +
      (needsHTML !== "" ? '<p><strong>Builds on:</strong></p><ul class="needs-list">' + needsHTML + "</ul>" : "") +
      '<div class="form-buttons">' + buttons + "</div>" +
    "</div></li>";
}


// ---------- Checklist and progress ----------
function handleStepToggle(event) {
  var box = event.target;
  if (!box.dataset || !box.dataset.step || !currentPlan) return;


  var id = box.dataset.step;
  var position = currentPlan.done.indexOf(id);


  if (box.checked && position === -1) {
    currentPlan.done.push(id);
  } else if (!box.checked && position !== -1) {
    currentPlan.done.splice(position, 1);
  }


  box.closest(".step-item").classList.toggle("done", box.checked);
  updateProgress();
  savePlan();
}


function updateProgress() {
  var total = currentSteps.length;
  var done = currentPlan ? currentPlan.done.length : 0;
  var percent = total === 0 ? 100 : Math.round((done / total) * 100);


  document.getElementById("progress-fill").style.width = percent + "%";
  document.getElementById("progress-bar").setAttribute("aria-valuenow", percent);


  if (total === 0) {
    document.getElementById("progress-text").textContent = "No steps needed right now.";
  } else {
    document.getElementById("progress-text").textContent =
      done + " of " + total + " steps completed (" + percent + "%)";
  }
}


// ---------- localStorage ----------
function savePlan() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentPlan));
  } catch (error) {
    // storage can be blocked (private mode). The site still works, it just will not remember.
  }
}


// Keeps only the values that really exist in our data
function cleanList(list, allowed) {
  if (!Array.isArray(list)) return [];
  return list.filter(function (item) { return allowed.indexOf(item) !== -1; });
}


function loadSavedPlan() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;


    var data = JSON.parse(raw);
    var path = data ? getPathById(data.pathId) : null;


    if (!data || data.version !== STORAGE_VERSION || !path || LEVELS.indexOf(data.level) === -1) {
      throw new Error("Saved data is outdated or damaged");
    }


    return {
      version: STORAGE_VERSION,
      pathId: data.pathId,
      level: data.level,
      skills: cleanList(data.skills, path.skills),
      credentials: cleanList(data.credentials, path.resourceIds),
      done: Array.isArray(data.done) ? data.done.filter(function (id) { return typeof id === "string"; }) : []
    };
  } catch (error) {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) { }
    showFormMessage("Your saved roadmap could not be loaded, so it was cleared. Please generate it again.", true);
    return null;
  }
}


function clearAll() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) { }
  currentPlan = null;
  currentSteps = [];


  document.getElementById("explorer-form").reset();
  showChecklists("", [], []);
  clearErrors();


  document.getElementById("roadmap-output").hidden = true;
  document.getElementById("roadmap-empty").hidden = false;
}


