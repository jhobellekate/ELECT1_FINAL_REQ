CPE Learning Hub: Your Guide to Skills, Certifications, and Career Paths
1. Proposed Website Title
CPE Learning Hub: Your Guide to Skills, Certifications, and Career Paths# CPE Learning Hub


**Explore Your Path. Build Your Skills. Shape Your Future.**


CPE Learning Hub is a single-page educational website for Computer Engineering students. It helps students explore technical certifications, courses and digital badges, compare career paths, and build a personal learning roadmap that is saved in their own browser.


## Problem and audience


Students who want to start earning certifications often do not know which ones exist, how they differ, or what to learn first. The website puts this information in one place.


Intended users:


- Computer Engineering, IT and related engineering students
- Beginners interested in networking, cybersecurity, programming, embedded systems and cloud computing
- Students preparing for internships or future technical work


## Features implemented


- Responsive navigation bar with a collapsible menu on small screens
- Light and dark theme toggle (the choice is remembered)
- Home section with tagline, quick-access buttons, featured certifications and career path shortcuts
- Credential types section (certification, course certificate, digital badge)
- Certification directory with cards, live search (name, provider, description, skills) and filters for category, credential type, difficulty level, career path and provider. Search and filters work together, and the result count updates.
- "No results" message and a "Reset all filters" button
- Certification details pop-up: provider, description, level, skills, career relevance, prerequisites (when known), suggested next steps, cost note and official link
- Skills and Career Paths overview for six paths: Networking, Cybersecurity, Programming, Cloud Computing, Embedded Systems and IoT
- Career Path Explorer form with a dropdown, skill-level radio buttons and checkboxes, plus validation messages for required fields
- Roadmap generator that compares selected skills (and skills from completed credentials) with the path's typical skills, lists skills you have and skill gaps, and builds an ordered list of steps with prerequisite notes
- Step checklist with a live progress bar
- Progress, form answers and theme saved with `localStorage`, with safe handling of missing, damaged or outdated saved data
- Learning Resources section with official links grouped by career path
- About section


## Technologies


HTML5, CSS3 (custom properties, flexbox, grid, media queries), JavaScript (DOM, events, array methods, `localStorage`), Git and GitHub. No frameworks and no backend.


## Run it locally


1. Download or clone the repository.
2. Put your certificate image in the `images/` folder as `fortinet_cert.png` (or change the file name in `index.html`).
3. Open `index.html` in a browser, or use the Live Server extension in VS Code.


The site loads every file from relative paths, so no build step or internet connection is needed to run it (the official links need internet).


## File structure and feature ownership


| File | What it does | Owner |
| --- | --- | --- |
| `index.html` | Page structure, section anchors, form, containers | (add name) |
| `css/style.css` | Theme, layout, cards, forms, responsive styles | (add name) |
| `js/script.js` | Shared helpers, theme toggle, mobile menu, start-up | (add name) |
| `js/resources-data.js` | Resource records (certifications, courses, badges) | (add name) |
| `js/career-data.js` | Skills, career paths, learning steps, official links | (add name) |
| `js/directory.js` | Cards, search, filters, details pop-up | (add name) |
| `js/roadmap.js` | Career overview, form, roadmap, checklist, progress, `localStorage` | (add name) |
| `images/` | Certificate image and any images with permission | (add name) |


### Adding a resource


Copy one object in `js/resources-data.js`, give it a new unique `id`, and fill in `name`, `provider`, `type`, `category`, `level`, `description`, `cost`, `link`, `skills`, `careerPaths` and `prerequisites`. Use skill ids from `SKILLS` and path ids from `CAREER_PATHS` in `js/career-data.js`. Never change an existing `id`, because saved checklists use it.


## Git workflow


- `main` always holds the working version.
- Create one branch per task, for example `feature/directory-filters` or `fix/roadmap-progress`.
- Commit small changes with clear messages.
- Open a pull request into `main` and ask a teammate to review it.
- Merge only after the page runs without console errors.


## Sources


Certification information links to the official provider websites listed in `js/resources-data.js` and `js/career-data.js`: Cisco, CompTIA, ISC2, Google, Google Cloud, Amazon Web Services, Microsoft, IBM, Harvard CS50, freeCodeCamp, Python Institute, Linux Professional Institute, The Linux Foundation, Arduino, ETA International and others. Some links go to a provider's main training or certification page instead of one exact page, because providers often change their addresses.


## Limitations


- Roadmaps are educational suggestions. They are not official career advice and do not guarantee a job or a certification result.
- Difficulty levels and the order of learning steps are the team's own estimates.
- Fees, exam codes and entry requirements change. Prerequisites are left empty unless a reliable source supports them, so always confirm on the official site.
- Links should be re-checked before each release because providers move their pages.
- Data is stored only in the browser, so progress does not move between devices and is lost if the browser data is cleared.
- The directory covers a sample of popular resources, not every certification.




2. Website Concept
CPE Learning Hub is an interactive educational website designed to help Computer Engineering students explore technical certifications, identify career opportunities, and develop the skills needed for their chosen career paths.
The website will provide a certification directory containing information about credentials related to networking, cybersecurity, programming, embedded systems, cloud computing, electronics, and other Computer Engineering fields. Users will be able to search for certifications, filter them by category, difficulty level, career path, and provider, and view detailed information about each credential.
One of the main features will be the Career Path Explorer, where users can select their preferred career path, assess their current skill level, identify skills they already possess, and indicate which certifications they have completed. Based on their answers, the website will generate a suggested learning roadmap containing relevant skills to develop, certifications to consider, and recommended next steps.
The website will also include interactive checklists that allow users to track completed learning activities and certifications they have earned.
The purpose of CPE Learning Hub is to make technical learning and career planning more organized and accessible. It addresses the difficulty students may experience when deciding which skills to learn, which certifications are relevant to their goals, and what steps they should take to prepare for a technical career.
The website will be more than a static information page because it will include JavaScript-based search, filtering, interactive forms, personalized roadmap generation, and progress tracking.
3. Website Category
Primary Category: Information and Educational Website
Additional Categories: Technology Website, Student Learning Platform, and Career Development Website.
4. Target Users
The intended users are:
Computer Engineering students.
Information Technology and related engineering students.
Beginners interested in technical certifications.
Students exploring careers in networking and cybersecurity.
Learners interested in programming, embedded systems, and cloud computing.
Students preparing for internships or future technical employment.
The website is designed for these users because it provides organized certification information and a structured way to identify learning goals. It can help students understand which skills are relevant to different career paths and plan their next learning activities based on their current knowledge.
PART C – WEBSITE FEATURES
The proposed website will include the following major features.
1. Homepage and Career Categories
The homepage will introduce CPE Learning Hub, explain its purpose, and display featured certifications, popular technical fields, and shortcuts to the main sections.
2. Certification Directory
Users will be able to browse a collection of technical certifications and search for specific credentials.
The directory will include filtering options for category, difficulty level, career path, and certification provider.
3. Certification Details
Each certification will have a detailed view containing its provider, difficulty level, category, description, skills covered, career relevance, prerequisites where known, and suggested next steps.
4. Career Path Explorer
Users will complete an interactive form to select their preferred career path, rate their current skill level, identify relevant skills they already have, and indicate which certifications they have completed.
The website will use these selections to suggest an appropriate learning pathway.
5. Personalized Certification Roadmap
The website will generate a suggested sequence of learning steps and relevant certifications based on the user's selected career path, current skill level, existing skills, and completed credentials.
The roadmap will help users identify what they may want to learn or pursue next.
6. Skill Prerequisite System
The website will identify skills commonly associated with selected career paths and certifications. It will distinguish between skills users report having and skills they may need to develop.
This feature will help users understand the knowledge they should work on before pursuing more advanced learning opportunities.
7. Learning Checklist and Progress Tracking
Users will be able to check off completed learning steps and certifications. A progress indicator will show how much of their suggested roadmap they have completed.
Browser local storage may be used to preserve selections and progress between visits.
8. Recommended Certifications and Resources
The website will suggest certifications based on users' selected career paths, skill levels, interests, and completed credentials. It may also provide links to official certification pages and relevant learning resources.


