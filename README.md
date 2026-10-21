CPE Learning Hub: Your Guide to Skills, Certifications, and Career Paths


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


## Limitations


- Roadmaps are educational suggestions. They are not official career advice and do not guarantee a job or a certification result.
- Difficulty levels and the order of learning steps are the team's own estimates.
- Fees, exam codes and entry requirements change. Prerequisites are left empty unless a reliable source supports them, so always confirm on the official site.
- Links should be re-checked before each release because providers move their pages.
- Data is stored only in the browser, so progress does not move between devices and is lost if the browser data is cleared.
- The directory covers a sample of popular resources, not every certification.


