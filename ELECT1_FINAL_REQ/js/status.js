// DownStatus API integration for live service health checks.


var DOWNSTATUS_API = "https://isitdownstatus.com/api/v1";
var monitoredServices = [];
var monitoredServicesPromise = null;
var RESOURCE_STATUS_SLUGS = {
  amazonwebservices: "aws",
  googlecloud: "google",
  microsoftazure: "azure"
};


function initServiceStatus() {
  document.getElementById("status-form").addEventListener("submit", function (event) {
    event.preventDefault();
    checkServiceStatus();
  });


  loadServiceCatalog();
  loadActiveOutages();
}


function requestStatusApi(url) {
  return fetch(url).then(function (response) {
    if (!response.ok) {
      if (response.status === 404) throw new Error("Service not found. Choose a listed service or check the slug.");
      throw new Error("The status service returned an error.");
    }
    return response.json();
  }).then(function (result) {
    if (!result || result.ok !== true) {
      throw new Error(result && result.error ? result.error : "The status response was invalid.");
    }
    return result;
  });
}


function loadServiceCatalog() {
  monitoredServicesPromise = requestStatusApi(DOWNSTATUS_API + "/services?limit=500").then(function (result) {
    monitoredServices = Array.isArray(result.data) ? result.data : [];
    var suggestions = document.getElementById("status-services");
    monitoredServices.forEach(function (service) {
      var option = document.createElement("option");
      option.value = service.name;
      suggestions.appendChild(option);
    });
  }).catch(function () {
    setStatusMessage("Service suggestions are unavailable. You can still enter a service slug.", true);
  });
  return monitoredServicesPromise;
}


function loadActiveOutages() {
  requestStatusApi(DOWNSTATUS_API + "/outages?status=ongoing&limit=5").then(function (result) {
    var outages = Array.isArray(result.data) ? result.data : [];
    var list = document.getElementById("outage-list");
    var message = document.getElementById("outage-message");
    list.textContent = "";


    if (outages.length === 0) {
      message.textContent = "No active issues are listed right now.";
      return;
    }


    message.textContent = "";
    outages.forEach(function (outage) {
      var item = document.createElement("li");
      var link = document.createElement("a");
      var service = outage.service || {};
      link.textContent = service.name || service.slug || "Unknown service";
      link.href = safeStatusPageUrl(service.status_page_url, service.slug);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      item.appendChild(link);


      var detail = document.createElement("p");
      var description = outage.description || "Ongoing incident";
      detail.textContent = description + " · Started " + formatStatusDate(outage.started_at);
      item.appendChild(detail);
      list.appendChild(item);
    });
  }).catch(function () {
    var message = document.getElementById("outage-message");
    message.textContent = "Current issues could not be loaded. Try again later.";
    message.classList.add("error");
  });
}


function checkServiceStatus() {
  var input = document.getElementById("status-service");
  var button = document.getElementById("status-submit");
  var result = document.getElementById("status-result");
  var query = input.value.trim();


  if (!query) return;


  var service = findMonitoredService(query);
  var slug = service ? service.slug : makeServiceSlug(query);
  button.disabled = true;
  button.textContent = "Checking...";
  result.hidden = true;
  setStatusMessage("Checking " + query + "...", false);


  requestStatusApi(DOWNSTATUS_API + "/status/" + encodeURIComponent(slug)).then(function (response) {
    renderServiceStatus(response.data);
    setStatusMessage("Status check complete.", false);
  }).catch(function (error) {
    setStatusMessage(error.message || "Could not check this service. Try its listed name or slug.", true);
  }).then(function () {
    button.disabled = false;
    button.textContent = "Check status";
  });
}


function refreshResourceStatus(resourceId) {
  var resource = getResourceById(resourceId);
  var statusRow = document.querySelector(".resource-status-row");
  var label = document.getElementById("resource-status-label");
  var value = document.getElementById("resource-status-value");
  var button = document.querySelector(".refresh-resource-status");
  if (!resource || !statusRow || !label || !value || !button) return;


  statusRow.dataset.resourceId = resourceId;
  button.disabled = true;
  button.textContent = "Checking...";
  label.textContent = "Checking " + resource.provider + "...";
  value.textContent = "Checking";
  value.className = "status-pill";


  var serviceCatalogReady = monitoredServicesPromise || Promise.resolve();
  serviceCatalogReady.then(function () {
    var providerKey = normalizeServiceQuery(resource.provider);
    var service = findMonitoredService(resource.provider) || findMonitoredService(resource.name);
    var slug = service ? service.slug : RESOURCE_STATUS_SLUGS[providerKey] || makeServiceSlug(resource.provider);
    return requestStatusApi(DOWNSTATUS_API + "/status/" + encodeURIComponent(slug));
  }).then(function (response) {
    if (statusRow.dataset.resourceId !== resourceId) return;
    var data = response.data;
    var status = data.status.toLowerCase();
    label.textContent = "Live status for " + data.name;
    value.textContent = status;
    value.className = "status-pill " + (status === "operational" || status === "degraded" || status === "down" ? status : "");
  }).catch(function () {
    if (statusRow.dataset.resourceId !== resourceId) return;
    label.textContent = "Live status is unavailable for " + resource.provider + ".";
    value.textContent = "Unavailable";
    value.className = "status-pill unavailable";
  }).then(function () {
    if (statusRow.dataset.resourceId === resourceId) {
      button.disabled = false;
      button.textContent = "Refresh";
    }
  });
}


function findMonitoredService(query) {
  var normalized = normalizeServiceQuery(query);
  var slug = makeServiceSlug(query);
  for (var i = 0; i < monitoredServices.length; i++) {
    var service = monitoredServices[i];
    if (normalizeServiceQuery(service.name || "") === normalized || normalizeServiceQuery(service.slug || "") === normalized || service.slug === slug) {
      return service;
    }
  }
  return null;
}


function normalizeServiceQuery(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}


function makeServiceSlug(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}


function renderServiceStatus(data) {
  if (!data || !data.name || !data.status) {
    throw new Error("The status service returned incomplete data.");
  }


  var result = document.getElementById("status-result");
  var status = data.status.toLowerCase();
  var statusValue = document.getElementById("status-value");
  document.getElementById("status-category").textContent = data.category || "Service";
  document.getElementById("status-name").textContent = data.name;
  statusValue.textContent = status;
  statusValue.className = "status-pill " + (status === "operational" || status === "degraded" || status === "down" ? status : "");
  document.getElementById("status-detail").textContent = getStatusDescription(status);
  document.getElementById("status-reports-hour").textContent = Number(data.report_count_1h) || 0;
  document.getElementById("status-reports-day").textContent = Number(data.report_count_24h) || 0;
  document.getElementById("status-official").textContent = formatOfficialIndicator(data.official_indicator);
  document.getElementById("status-updated").textContent = "Updated " + formatStatusDate(data.updated_at);
  document.getElementById("status-source-link").href = safeStatusPageUrl(data.status_page_url, data.slug);
  result.hidden = false;
}


function getStatusDescription(status) {
  if (status === "operational") return "No widespread service issue is currently reported.";
  if (status === "degraded") return "Elevated reports or a minor official incident may affect some users.";
  if (status === "down") return "Significant reports or an official incident indicate a possible widespread outage.";
  return "The service returned status: " + status + ".";
}


function formatOfficialIndicator(indicator) {
  if (!indicator) return "No active official incident";
  if (indicator === "none") return "None";
  return indicator.charAt(0).toUpperCase() + indicator.slice(1);
}


function formatStatusDate(value) {
  if (!value) return "time unavailable";
  var date = new Date(value);
  return isNaN(date.getTime()) ? "time unavailable" : date.toLocaleString();
}


function safeStatusPageUrl(url, slug) {
  try {
    var parsed = new URL(url);
    if (parsed.protocol === "https:" && parsed.hostname === "isitdownstatus.com") return parsed.href;
  } catch (error) { }
  return "https://isitdownstatus.com/en/status/" + encodeURIComponent(slug || "");
}


function setStatusMessage(message, isError) {
  var element = document.getElementById("status-message");
  element.textContent = message;
  element.classList.toggle("error", isError);
}

