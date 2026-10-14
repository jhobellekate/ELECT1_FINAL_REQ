/*JavaScript Features
filter - they just click a button - JavaScript event occurs ↓ 
Resources array is filtered - Matching cards are rendered in the DOM
filters through search works by checking whether the text match any name or provider
then it filters it further by clicking the button for each category
for example:
user types "cisco" or chooses a category -> filterResources() -> resources are filtered
showResources(filtered) -> matching cards are displayed
Feature 2: Dark / Light Mode
Add a theme toggle in the navigation bar.*/
/*Category 1 — Networking
Category 2 — Cybersecurity
Category 3 — Programming
Category 4 — Cloud Computing
Category 5 — Linux and Systems Administration
Category 6 — IT and Data*/
/*Every resource will be represented as a card containing:
Resource Name 
Provider 
Credential Type 
Category 
Difficulty Level 
Short Description 
Cost Information (optional) 
Official Link*/

/*resources in an array of objects. ito yung sinasalpak sa directory.
resources
├── Resource object 1
├── Resource object 2
├── Resource object 3
└── ...*/
const resources = [
  {
    name: "CompTIA Network+",
    provider: "CompTIA",
    type: "Certification",
    category: "Networking",
    level: "Intermediate",
    description: "Covers networking concepts, infrastructure, troubleshooting, and network security basics.",
    cost: "Paid exam. Check the official site for current fees.",
    link: "https://www.comptia.org/certifications/network"
  },
  {
    name: "CompTIA Security+",
    provider: "CompTIA",
    type: "Certification",
    category: "Cybersecurity",
    level: "Intermediate",
    description: "Covers core cybersecurity skills such as threats, risk management, and security operations.",
    cost: "Paid exam. Check the official site for current fees.",
    link: "https://www.comptia.org/certifications/security"
  },
  {
    name: "CompTIA Linux+",
    provider: "CompTIA",
    type: "Certification",
    category: "Linux and Systems Administration",
    level: "Intermediate",
    description: "Covers Linux system management, security, scripting, and troubleshooting.",
    cost: "Paid exam. Check the official site for current fees.",
    link: "https://www.comptia.org/certifications/linux"
  },
  {
    name: "Cisco Certified Network Associate (CCNA)",
    provider: "Cisco",
    type: "Certification",
    category: "Networking",
    level: "Intermediate",
    description: "Covers network fundamentals, IP connectivity, network access, and automation basics.",
    cost: "Paid exam. Check the official site for current fees.",
    link: "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html"
  },
  {
    name: "Introduction to Cybersecurity",
    provider: "Cisco Networking Academy",
    type: "Digital Badge",
    category: "Cybersecurity",
    level: "Beginner",
    description: "A short course about cyber threats, staying safe online, and careers in cybersecurity.",
    cost: "Free to start. Check the official site for details.",
    link: "https://skillsforall.com"
  },
  {
    name: "Cisco Certified Support Technician (CCST) Networking",
    provider: "Cisco",
    type: "Certification",
    category: "Networking",
    level: "Beginner",
    description: "Validates foundational networking knowledge including networking concepts, devices, protocols, troubleshooting, and basic security.",
    cost: "Paid exam. Check the official Cisco site for current fees.",
    link: "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/support-technician/index.html"
  },
  {
    name: "Cisco Certified Network Professional (CCNP) Enterprise",
    provider: "Cisco",
    type: "Certification",
    category: "Networking",
    level: "Advanced",
    description: "Validates advanced skills in enterprise network architecture, infrastructure, routing, switching, automation, and network assurance.",
    cost: "Paid exams. Check the official Cisco site for current exam requirements and fees.",
    link: "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccnp-enterprise/index.html"
  },
  {
    name: "Certified in Cybersecurity (CC)",
    provider: "ISC2",
    type: "Certification",
    category: "Cybersecurity",
    level: "Beginner",
    description: "An entry-level certification for people starting a career in cybersecurity.",
    cost: "Check the official site for current exam details.",
    link: "https://www.isc2.org/certifications/cc"
  },
  {
    name: "Google Cybersecurity Certificate",
    provider: "Google (Coursera)",
    type: "Course Certificate",
    category: "Cybersecurity",
    level: "Beginner",
    description: "A beginner program about security concepts, tools, and how to protect networks and data.",
    cost: "Subscription-based. Check Coursera for current pricing.",
    link: "https://www.coursera.org/professional-certificates/google-cybersecurity"
  },
  {
    name: "Cloud Digital Leader",
    provider: "Google Cloud",
    type: "Certification",
    category: "Cloud Computing",
    level: "Beginner",
    description: "Covers cloud basics and how Google Cloud products help solve problems.",
    cost: "Paid exam. Check the official site for current fees.",
    link: "https://cloud.google.com/learn/certification/cloud-digital-leader"
  },
  {
    name: "Google IT Support Certificate",
    provider: "Google (Coursera)",
    type: "Course Certificate",
    category: "IT and Data",
    level: "Beginner",
    description: "A beginner program covering troubleshooting, networking, operating systems, and security.",
    cost: "Subscription-based. Check Coursera for current pricing.",
    link: "https://www.coursera.org/professional-certificates/google-it-support"
  },
  {
    name: "Google Data Analytics Certificate",
    provider: "Google (Coursera)",
    type: "Course Certificate",
    category: "IT and Data",
    level: "Beginner",
    description: "Learn how to collect, clean, and analyze data using spreadsheets, SQL, and more.",
    cost: "Subscription-based. Check Coursera for current pricing.",
    link: "https://www.coursera.org/professional-certificates/google-data-analytics"
  },
  {
    name: "PCEP - Certified Entry-Level Python Programmer",
    provider: "Python Institute",
    type: "Certification",
    category: "Programming",
    level: "Beginner",
    description: "Tests basic Python skills such as variables, loops, functions, and data types.",
    cost: "Paid exam. Check the official site for current fees.",
    link: "https://pythoninstitute.org/pcep"
  },
  {
    name: "CS50x: Introduction to Computer Science",
    provider: "Harvard University",
    type: "Course Certificate",
    category: "Programming",
    level: "Beginner",
    description: "A well-known introductory course covering C, Python, SQL, and web programming.",
    cost: "Free to learn. Certificate options may vary.",
    link: "https://cs50.harvard.edu/x/"
  },
  {
    name: "Responsive Web Design",
    provider: "freeCodeCamp",
    type: "Course Certificate",
    category: "Programming",
    level: "Beginner",
    description: "Learn HTML and CSS by building projects. Great for practicing web development.",
    cost: "Free.",
    link: "https://www.freecodecamp.org/learn"
  },
  {
    name: "AWS Certified Cloud Practitioner",
    provider: "Amazon Web Services",
    type: "Certification",
    category: "Cloud Computing",
    level: "Beginner",
    description: "Covers basic cloud concepts, AWS services, security, and pricing.",
    cost: "Paid exam. Check the official site for current fees.",
    link: "https://aws.amazon.com/certification/certified-cloud-practitioner/"
  },
  {
    name: "AWS Certified Solutions Architect - Associate",
    provider: "Amazon Web Services",
    type: "Certification",
    category: "Cloud Computing",
    level: "Intermediate",
    description: "Validates the ability to design secure, resilient, high-performing, and cost-effective applications and architectures on AWS.",
    cost: "Paid exam. Check the official AWS site for current fees.",
    link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
  },
  {
    name: "AWS Certified Developer - Associate",
    provider: "Amazon Web Services",
    type: "Certification",
    category: "Cloud Computing",
    level: "Intermediate",
    description: "Covers developing, testing, deploying, and debugging cloud-based applications using AWS services.",
    cost: "Paid exam. Check the official AWS site for current fees.",
    link: "https://aws.amazon.com/certification/certified-developer-associate/"
  },
  {
    name: "AWS Certified CloudOps Engineer - Associate",
    provider: "Amazon Web Services",
    type: "Certification",
    category: "Cloud Computing",
    level: "Intermediate",
    description: "Validates technical skills for deploying, managing, operating, and maintaining workloads on AWS.",
    cost: "Paid exam. Check the official AWS site for current fees.",
    link: "https://aws.amazon.com/certification/certified-cloudops-engineer-associate/"
  },
  {
    name: "Fortinet Certified Fundamentals (FCF) in Cybersecurity",
    provider: "Fortinet",
    type: "Certification",
    category: "Cybersecurity",
    level: "Beginner",
    description: "Introduces cybersecurity fundamentals, security concepts, threats, attack techniques, and foundational security knowledge.",
    cost: "Training may be available through Fortinet's training platform; Check the official site for current fees.",
    link: "https://training.fortinet.com/"
  },
  {
    name: "Microsoft Azure Fundamentals (AZ-900)",
    provider: "Microsoft",
    type: "Certification",
    category: "Cloud Computing",
    level: "Beginner",
    description: "Introduces cloud concepts and core Microsoft Azure services.",
    cost: "Paid exam. Free learning materials are available on Microsoft Learn.",
    link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/"
  },
  {
    name: "Microsoft Azure Data Fundamentals (DP-900)",
    provider: "Microsoft",
    type: "Certification",
    category: "IT and Data",
    level: "Beginner",
    description: "Introduces core data concepts such as databases, analytics, and data services on Azure.",
    cost: "Paid exam. Free learning materials are available on Microsoft Learn.",
    link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-fundamentals/"
  },
  {
    name: "Linux Essentials",
    provider: "Linux Professional Institute (LPI)",
    type: "Certification",
    category: "Linux and Systems Administration",
    level: "Beginner",
    description: "Covers Linux basics like the command line, files, users, and open source concepts.",
    cost: "Paid exam. Check the official site for current fees.",
    link: "https://www.lpi.org/our-certifications/linux-essentials-overview/"
  },
  {
    name: "Linux Foundation Certified System Administrator (LFCS)",
    provider: "The Linux Foundation",
    type: "Certification",
    category: "Linux and Systems Administration",
    level: "Intermediate",
    description: "A hands-on exam that tests real system administration tasks on Linux.",
    cost: "Paid exam. Check the official site for current fees.",
    link: "https://training.linuxfoundation.org/certification/linux-foundation-certified-sysadmin-lfcs/"
  },
  {
    name: "Red Hat Certified Engineer in Enterprise Linux (RHCE)",
    provider: "Red Hat",
    type: "Certification",
    category: "Linux and Systems Administration",
    level: "Advanced",
    description: "Builds on Linux administration and validates advanced enterprise Linux skills including automation and system management.",
    cost: "Paid performance-based exam. RHCSA is required for the current Enterprise Linux path.",
    link: "https://www.redhat.com/en/services/certification/rhce"
  },
];

/*access html elements through the DOM*/
const resourceList = document.getElementById("resource-list");
/*the assigned ID forda search box, to allow JS to read what the user types*/
const searchInput = document.getElementById("search-input");
/*returns multiple matching elements from the CSS selector, hence the use of querySelectorAll.
filter buttons are the buttons sa directory. there are a lot of filter buttons with the same class*/
const filterButtons = document.querySelectorAll(".filter-btn");
/*this is the assigned ID for the defualt result when user searches for a subkect that is not included in the current list of category*/
const noResults = document.getElementById("no-results");
/* access the theme toggle button at the header to attach click event listener and change text*/
const themeButton = document.getElementById("theme-toggle");
/*let kasi ito na yung filter na pede mapalitan depende sa naclick ng user. naka default sa "all"*/
let selectedCategory = "All";

/*display logic. reusable block to represent the array of resources that should be displayed*/
function showResources(list) {
  resourceList.innerHTML = ""; /*clears it muna*/
  if (list.length === 0) {
    noResults.style.display = "block"; /*shows the no result message if zero yung list*/
  } else {
    noResults.style.display = "none"; /*hides the no result message if it is not empty*/
  }

  /*for loop to display the resources
  create article - assign class - build inner html - append article to resourceLIst - card appears on the page*/
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const card = document.createElement("article"); /*creates new element in memory*/
    card.className = "card"; /*assigns class*/
    card.innerHTML =
      "<h3>" + item.name + "</h3>" +
      "<p class='provider'>" + item.provider + "</p>" +
      "<ul class='details'>" +
        "<li><strong>Credential Type:</strong> " + item.type + "</li>" +
        "<li><strong>Category:</strong> " + item.category + "</li>" +
        "<li><strong>Difficulty:</strong> " + item.level + "</li>" +
      "</ul>" +
      "<p class='description'>" + item.description + "</p>" +
      "<p class='cost'><strong>Cost:</strong> " + item.cost + "</p>" +
      "<a class='btn' href='" + item.link + "' target='_blank' rel='noopener'>Visit Official Page</a>";
    resourceList.appendChild(card); /*inserts the newly created card into the resource list "document.getElementById("resource-list")"*/
  }
}

/*filter logic. handles the searching and category filter.
determines which resources match the user's selections -> passes the matching list to the above function*/
function filterResources() {
  const searchText = searchInput.value.toLowerCase(); /*para inde sya case sensitive*/

  /*array method to create a new array containing only the elements that matches the selected category AND search text*/
  const filtered = resources.filter(function (item) {
    const matchesCategory = (selectedCategory === "All" || item.category === selectedCategory);
    const matchesSearch =
      item.name.toLowerCase().includes(searchText) ||
      item.provider.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  showResources(filtered); /*send the new array to showResources to be displayed*/
}

/*filter button event loop -> adds a click event listener*/
for (let i = 0; i < filterButtons.length; i++) {
  filterButtons[i].addEventListener("click", function () {
    selectedCategory = this.dataset.category; /*so JS knows which category to filter*/
    for (let j = 0; j < filterButtons.length; j++) {
      filterButtons[j].classList.remove("active"); /*all active classes are removed*/
    }
    this.classList.add("active"); /*the clicled button receives active*/

    filterResources();
  });
}

/*event listener forda search input*/
searchInput.addEventListener("input", filterResources);

/*event listener forda themed change event*/
themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode"); /*access the body element in HTML ->
  adds/removes class dark-mode to de/activate body.light-mode in CSS*/
  if (document.body.classList.contains("dark-mode")) {
    themeButton.textContent = "🌙 Dark Mode";
  } else {
    themeButton.textContent = "☀️ Light Mode";
  }
});

showResources(resources); /*all resources are displayed when the page first loads*/
