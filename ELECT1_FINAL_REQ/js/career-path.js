var SKILLS = [
  { id: "networking-basics", label: "Networking basics" },
  { id: "ip-addressing", label: "IP addressing and subnetting" },
  { id: "routing-switching", label: "Routing and switching" },
  { id: "network-security-basics", label: "Network security basics" },
  { id: "security-fundamentals", label: "Security fundamentals" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "hardware-basics", label: "Computer hardware basics" },
  { id: "linux-basics", label: "Linux basics" },
  { id: "command-line", label: "Command line" },
  { id: "system-administration", label: "System administration" },
  { id: "python-basics", label: "Python basics" },
  { id: "c-programming", label: "C programming" },
  { id: "problem-solving", label: "Problem solving" },
  { id: "web-basics", label: "HTML, CSS and JavaScript basics" },
  { id: "cloud-concepts", label: "Cloud concepts" },
  { id: "cloud-services", label: "Core cloud services" },
  { id: "data-analysis", label: "Data analysis" },
  { id: "circuits-basics", label: "Basic circuits" },
  { id: "digital-electronics", label: "Digital electronics" },
  { id: "microcontrollers", label: "Microcontrollers" },
  { id: "sensors-iot", label: "Sensors and IoT basics" }
];


var CAREER_PATHS = [
  {
    id: "networking",
    name: "Networking",
    description: "Design, set up and fix the networks that connect computers, servers and devices.",
    skills: ["networking-basics", "ip-addressing", "routing-switching", "troubleshooting", "network-security-basics"],
    resourceIds: ["cisco-skills-for-all", "ccst-networking", "ccna", "comptia-network-plus", "comptia-a-plus", "google-it-support"],
    steps: [
      { id: "net-1", resourceId: "cisco-skills-for-all", level: "Beginner", teaches: ["networking-basics"], needs: [],
        note: "A free way to learn the basic ideas before taking an exam." },
      { id: "net-2", resourceId: "ccst-networking", level: "Beginner", teaches: ["networking-basics", "ip-addressing", "troubleshooting"], needs: [],
        note: "A good first networking certification." },
      { id: "net-3", title: "Practice IP addressing and subnetting", level: "Beginner", teaches: ["ip-addressing"], needs: ["networking-basics"],
        note: "Solve subnetting problems by hand, then check them in a simulator such as Cisco Packet Tracer.",
        link: "https://www.netacad.com/" },
      { id: "net-4", resourceId: "ccna", level: "Intermediate", teaches: ["routing-switching", "network-security-basics"], needs: ["networking-basics", "ip-addressing"],
        note: "CompTIA Network+ is a vendor-neutral option that covers similar ground." },
      { id: "net-5", title: "Build and document a small lab network", level: "Intermediate", teaches: ["routing-switching", "troubleshooting"], needs: ["ip-addressing"],
        note: "Use a simulator. Draw the topology, set up the devices and write down how you fixed any problems." }
    ],
    links: [
      { title: "Cisco Networking Academy", url: "https://www.netacad.com/", description: "Courses and labs on networking." },
      { title: "Skills for All", url: "https://skillsforall.com/", description: "Free self-paced Cisco courses." },
      { title: "CompTIA Network+", url: "https://www.comptia.org/certifications/network", description: "Official page for Network+." }
    ]
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description: "Protect systems, networks and data from attacks and misuse.",
    skills: ["security-fundamentals", "network-security-basics", "networking-basics", "linux-basics", "command-line"],
    resourceIds: ["isc2-cc", "ccst-networking", "ccst-cybersecurity", "lpi-linux-essentials", "comptia-security-plus", "google-cybersecurity", "comptia-network-plus", "comptia-linux-plus"],
    steps: [
      { id: "cyber-1", resourceId: "isc2-cc", level: "Beginner", teaches: ["security-fundamentals", "network-security-basics"], needs: [],
        note: "An entry-level certification to learn the main security ideas." },
      { id: "cyber-2", resourceId: "ccst-networking", level: "Beginner", teaches: ["networking-basics"], needs: [],
        note: "Security work depends on knowing how networks behave." },
      { id: "cyber-3", resourceId: "lpi-linux-essentials", level: "Beginner", teaches: ["linux-basics", "command-line"], needs: [],
        note: "Many security tools run on Linux." },
      { id: "cyber-4", resourceId: "comptia-security-plus", level: "Intermediate", teaches: ["security-fundamentals", "network-security-basics"], needs: ["networking-basics"],
        note: "Check CompTIA's site for the recommended experience before you register." },
      { id: "cyber-5", title: "Do beginner hands-on security labs", level: "Beginner", teaches: ["security-fundamentals", "command-line"], needs: [],
        note: "Use only legal practice sites and your own lab machines.",
        link: "https://tryhackme.com/" }
    ],
    links: [
      { title: "ISC2 Certified in Cybersecurity", url: "https://www.isc2.org/certifications/cc", description: "Official page for the CC certification." },
      { title: "CompTIA Security+", url: "https://www.comptia.org/certifications/security", description: "Official page for Security+." },
      { title: "TryHackMe", url: "https://tryhackme.com/", description: "Guided hands-on security labs for beginners." }
    ]
  },
  {
    id: "programming",
    name: "Programming",
    description: "Write software, from small scripts to full applications and websites.",
    skills: ["problem-solving", "python-basics", "c-programming", "web-basics"],
    resourceIds: ["pcep-python", "cs50x", "freecodecamp-responsive-web"],
    steps: [
      { id: "prog-1", resourceId: "pcep-python", level: "Beginner", teaches: ["python-basics", "problem-solving"], needs: [],
        note: "Python is a friendly first language." },
      { id: "prog-2", resourceId: "cs50x", level: "Beginner", teaches: ["c-programming", "problem-solving"], needs: [],
        note: "A big course. Plan several weeks for it." },
      { id: "prog-3", resourceId: "freecodecamp-responsive-web", level: "Beginner", teaches: ["web-basics"], needs: [],
        note: "Good practice for HTML and CSS." },
      { id: "prog-4", title: "Build a small project", level: "Intermediate", teaches: ["problem-solving", "web-basics"], needs: ["python-basics"],
        note: "For example a quiz app or a to-do list. Put the code on GitHub." }
    ],
    links: [
      { title: "CS50x", url: "https://cs50.harvard.edu/x/", description: "Harvard's introduction to computer science." },
      { title: "Python Tutorial", url: "https://docs.python.org/3/tutorial/", description: "The official Python tutorial." },
      { title: "MDN Learn Web Development", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development", description: "Guides for HTML, CSS and JavaScript." },
      { title: "freeCodeCamp", url: "https://www.freecodecamp.org/", description: "Free coding lessons and projects." }
    ]
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    description: "Run and manage applications and services on cloud platforms.",
    skills: ["cloud-concepts", "cloud-services", "networking-basics", "linux-basics", "command-line"],
    resourceIds: ["google-cloud-digital-leader", "aws-cloud-practitioner", "azure-fundamentals", "gcloud-skills-boost-badges", "aws-skill-builder-badges", "ibm-skillsbuild", "ccst-networking", "lpi-linux-essentials", "comptia-linux-plus", "lfcs"],
    steps: [
      { id: "cloud-1", resourceId: "google-cloud-digital-leader", level: "Beginner", teaches: ["cloud-concepts"], needs: [],
        note: "Explains what the cloud is and why organizations use it." },
      { id: "cloud-2", resourceId: "ccst-networking", level: "Beginner", teaches: ["networking-basics"], needs: [],
        note: "Cloud services are built on networks." },
      { id: "cloud-3", resourceId: "lpi-linux-essentials", level: "Beginner", teaches: ["linux-basics", "command-line"], needs: [],
        note: "Most cloud servers run Linux." },
      { id: "cloud-4", resourceId: "aws-cloud-practitioner", level: "Beginner", teaches: ["cloud-concepts", "cloud-services"], needs: ["cloud-concepts"],
        note: "Microsoft Azure Fundamentals (AZ-900) is another beginner option." },
      { id: "cloud-5", resourceId: "gcloud-skills-boost-badges", level: "Intermediate", teaches: ["cloud-services"], needs: ["cloud-concepts"],
        note: "Hands-on labs help you remember the services." }
    ],
    links: [
      { title: "Google Cloud Skills Boost", url: "https://www.cloudskillsboost.google/", description: "Labs, courses and badges." },
      { title: "AWS Skill Builder", url: "https://skillbuilder.aws/", description: "Official AWS training." },
      { title: "Microsoft Learn", url: "https://learn.microsoft.com/training/", description: "Free Azure learning paths." }
    ]
  },
  {
    id: "embedded",
    name: "Embedded Systems",
    description: "Program small computers and microcontrollers that live inside devices.",
    skills: ["circuits-basics", "digital-electronics", "c-programming", "microcontrollers", "problem-solving"],
    resourceIds: ["eta-ceta", "cs50x", "arduino-fundamentals"],
    steps: [
      { id: "emb-1", title: "Review basic circuits", level: "Beginner", teaches: ["circuits-basics"], needs: [],
        note: "Study Ohm's law, resistors and LEDs.",
        link: "https://www.khanacademy.org/science/electrical-engineering" },
      { id: "emb-2", resourceId: "eta-ceta", level: "Beginner", teaches: ["circuits-basics", "digital-electronics"], needs: [],
        note: "An optional certification for electronics fundamentals." },
      { id: "emb-3", resourceId: "cs50x", level: "Beginner", teaches: ["c-programming", "problem-solving"], needs: [],
        note: "Microcontrollers are often programmed in C or C++." },
      { id: "emb-4", resourceId: "arduino-fundamentals", level: "Beginner", teaches: ["microcontrollers", "digital-electronics"], needs: ["circuits-basics"],
        note: "A beginner-friendly way to start with microcontrollers." },
      { id: "emb-5", title: "Build a small sensor project", level: "Intermediate", teaches: ["microcontrollers", "c-programming"], needs: ["circuits-basics"],
        note: "For example a temperature display. Take photos and write notes for your portfolio." }
    ],
    links: [
      { title: "Arduino Docs", url: "https://docs.arduino.cc/learn/", description: "Tutorials and reference for Arduino boards." },
      { title: "Raspberry Pi Projects", url: "https://projects.raspberrypi.org/", description: "Step-by-step project guides." },
      { title: "Khan Academy Electrical Engineering", url: "https://www.khanacademy.org/science/electrical-engineering", description: "Free lessons on circuits and electronics." }
    ]
  },
  {
    id: "iot",
    name: "Internet of Things (IoT)",
    description: "Connect sensors and devices to networks and cloud services.",
    skills: ["networking-basics", "sensors-iot", "microcontrollers", "python-basics", "cloud-concepts"],
    resourceIds: ["ccst-networking", "arduino-fundamentals", "cisco-intro-iot", "pcep-python", "google-cloud-digital-leader", "cisco-skills-for-all"],
    steps: [
      { id: "iot-1", resourceId: "ccst-networking", level: "Beginner", teaches: ["networking-basics"], needs: [],
        note: "Connected devices need a good grasp of networking." },
      { id: "iot-2", resourceId: "arduino-fundamentals", level: "Beginner", teaches: ["microcontrollers"], needs: [],
        note: "Learn how to read sensors and control outputs." },
      { id: "iot-3", resourceId: "cisco-intro-iot", level: "Beginner", teaches: ["sensors-iot", "networking-basics"], needs: [],
        note: "Introduces how IoT systems fit together." },
      { id: "iot-4", resourceId: "pcep-python", level: "Beginner", teaches: ["python-basics"], needs: [],
        note: "Python is widely used for IoT scripts and data handling." },
      { id: "iot-5", resourceId: "google-cloud-digital-leader", level: "Beginner", teaches: ["cloud-concepts"], needs: [],
        note: "IoT data often ends up in the cloud." },
      { id: "iot-6", title: "Build a sensor-to-dashboard project", level: "Intermediate", teaches: ["sensors-iot", "microcontrollers"], needs: ["networking-basics"],
        note: "Read a sensor, send the data over a network and show it on a simple page." }
    ],
    links: [
      { title: "Arduino Docs", url: "https://docs.arduino.cc/learn/", description: "Tutorials for boards and sensors." },
      { title: "Raspberry Pi Projects", url: "https://projects.raspberrypi.org/", description: "Project guides that include sensors." },
      { title: "Skills for All", url: "https://skillsforall.com/", description: "Free Cisco courses, including networking topics." }
    ]
  }
];



