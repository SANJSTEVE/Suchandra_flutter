# Requirements Document

## Introduction

An interactive single-page portfolio website for Flutter developer Suchandra Mondal. The site presents professional experience, skills, projects, and education through a glassmorphism dark-themed UI inspired by the existing bento HTML template. It is built with a Next.js (App Router) frontend and a minimal Express.js backend that serves a resume PDF download endpoint. All resume content is driven from a single JSON file. The site supports dark/light theming, scroll-triggered animations, and a contact form — with no external UI libraries.

## Glossary

- **Portfolio_App**: The Next.js frontend application running inside `flutter_portfolio/frontend/`
- **API_Server**: The Express.js backend running inside `flutter_portfolio/backend/`
- **Resume_JSON**: The single source-of-truth JSON file at `flutter_portfolio/frontend/data/resume.json` containing all developer profile data
- **Bento_Grid**: The CSS grid layout of glassmorphism cards used in the hero section
- **Glass_Card**: A UI card styled with `backdrop-filter: blur`, semi-transparent background, and a subtle border — matching the existing HTML template aesthetic
- **Theme_Engine**: The client-side module responsible for reading, applying, and persisting the active color theme
- **Animation_Engine**: The client-side module using `IntersectionObserver` to trigger entrance animations on scroll
- **Nav**: The sticky top navigation bar with smooth-scroll links
- **Contact_Form**: The client-side form in the Contact section with validation
- **Resume_PDF**: The file `flutter_portfolio/Suchandra Mondal.pdf` served by the API_Server for download

---

## Requirements

### Requirement 1: Data Layer — Single JSON Source of Truth

**User Story:** As a developer maintaining the portfolio, I want all resume content stored in one JSON file, so that I can update any section without touching component code.

#### Acceptance Criteria

1. THE Portfolio_App SHALL load all displayable content (name, title, summary, skills, experience, education, projects, stats, contact links) exclusively from Resume_JSON.
2. WHEN Resume_JSON is updated, THE Portfolio_App SHALL reflect the changes on the next page load without any component code modifications.
3. THE Resume_JSON SHALL contain the following top-level keys: `personal`, `summary`, `skills`, `experience`, `education`, `projects`, `stats`, and `certifications`.
4. IF a required top-level key is missing from Resume_JSON, THEN THE Portfolio_App SHALL render the corresponding section with an empty state rather than throwing a runtime error.

---

### Requirement 2: Bento Grid Hero Section

**User Story:** As a visitor, I want to see a visually striking bento-grid hero section when I land on the page, so that I immediately understand who Suchandra is and what he does.

#### Acceptance Criteria

1. THE Portfolio_App SHALL render a bento grid hero section containing the following Glass_Cards: bio card, availability-status card, featured-project card, skills-overview card, experience-summary card, stats card, and contact-CTA card.
2. THE Portfolio_App SHALL lay out the bento grid using CSS Grid with a 3-column base layout that collapses to 2 columns at viewport widths ≤ 640px and to 1 column at viewport widths ≤ 420px.
3. THE Portfolio_App SHALL render ambient orb elements (blurred radial gradients) behind the bento grid using Flutter blue colors `#027DFD` and `#54C5F8` to match the existing HTML template.
4. WHEN a visitor hovers over any Glass_Card, THE Portfolio_App SHALL transition the card's border color toward `rgba(2,125,253,0.4)` and increase background opacity within 200ms.
5. THE Portfolio_App SHALL display Suchandra Mondal's name, title, location, platform chips (iOS, Android, Web, Desktop), and a short bio summary inside the bio card, sourced from Resume_JSON.
6. THE Portfolio_App SHALL display an availability status indicator with a green dot and "Open to roles" text inside the status card, sourced from Resume_JSON.
7. THE Portfolio_App SHALL display a featured project name, description, and tech-stack pills inside the project card, sourced from the first project entry in Resume_JSON.
8. THE Portfolio_App SHALL display a condensed skills pill list inside the skills card, sourced from Resume_JSON.
9. THE Portfolio_App SHALL display career stats (years of experience, years in Flutter, enterprise apps count, platforms count) inside the stats card, sourced from Resume_JSON.
10. THE Portfolio_App SHALL display a "Let's build something" CTA with a mailto link inside the contact-CTA card, sourced from Resume_JSON.

---

### Requirement 3: Full-Page Sections

**User Story:** As a visitor, I want to scroll through dedicated sections for About, Experience, Skills, Projects, Education, and Contact, so that I can explore Suchandra's background in depth.

#### Acceptance Criteria

1. THE Portfolio_App SHALL render the following full-page sections in order below the hero: About, Experience, Skills, Projects, Education, Contact.
2. THE Portfolio_App SHALL assign each section a unique `id` attribute matching its Nav link anchor (e.g., `id="about"`, `id="experience"`).
3. THE Portfolio_App SHALL render the Experience section as a vertical timeline, with each entry showing company name, role title, date range, location, and a bullet list of achievements, sourced from Resume_JSON.
4. THE Portfolio_App SHALL render the Skills section as categorized pill groups (e.g., Core, State Management, Architecture, Backend/Cloud, Tools), sourced from Resume_JSON.
5. THE Portfolio_App SHALL render the Projects section as a card grid, with each card showing project name, description, tech-stack tags, and optional store/live badges, sourced from Resume_JSON.
6. THE Portfolio_App SHALL render the Education section showing degree, institution, year, and location for each entry, sourced from Resume_JSON.
7. THE Portfolio_App SHALL render the Contact section with Suchandra's email, phone, LinkedIn URL, and an embedded Contact_Form.

---

### Requirement 4: Sticky Navigation

**User Story:** As a visitor, I want a sticky navigation bar that stays visible as I scroll, so that I can jump to any section at any time.

#### Acceptance Criteria

1. THE Nav SHALL remain fixed at the top of the viewport at all scroll positions.
2. THE Nav SHALL contain anchor links for: Hero, About, Experience, Skills, Projects, Education, and Contact.
3. WHEN a Nav link is clicked, THE Portfolio_App SHALL scroll smoothly to the corresponding section using CSS `scroll-behavior: smooth` or the Web `scrollIntoView` API.
4. THE Nav SHALL apply a glassmorphism background (`backdrop-filter: blur`) with reduced opacity so page content is partially visible behind it.
5. WHEN the viewport width is ≤ 768px, THE Nav SHALL collapse the link list into a hamburger menu toggle.
6. WHEN the hamburger menu is open and a Nav link is clicked, THE Nav SHALL close the menu after navigation.

---

### Requirement 5: Dark / Light Theme Toggle

**User Story:** As a visitor, I want to toggle between dark and light themes, so that I can view the portfolio in my preferred visual mode.

#### Acceptance Criteria

1. THE Theme_Engine SHALL apply the active theme by toggling a CSS class (`data-theme="dark"` or `data-theme="light"`) on the `<html>` element.
2. THE Theme_Engine SHALL persist the user's theme choice to `localStorage` under the key `"portfolio-theme"`.
3. WHEN the page loads, THE Theme_Engine SHALL read `localStorage` first; if no value is stored, THE Theme_Engine SHALL fall back to the `prefers-color-scheme` media query.
4. THE Portfolio_App SHALL render a theme-toggle button in the Nav that switches between dark and light modes on click.
5. WHILE dark theme is active, THE Portfolio_App SHALL use background colors `#050505` / `#080808`, text color `#ffffff`, and Flutter blue accents `#027DFD` / `#54C5F8`.
6. WHILE light theme is active, THE Portfolio_App SHALL use a light background (minimum `#f5f5f5`), dark text (`#111111`), and the same Flutter blue accents.
7. THE Theme_Engine SHALL apply the theme class before first paint to prevent a flash of unstyled content (FOUC).

---

### Requirement 6: Scroll-Triggered Entrance Animations

**User Story:** As a visitor, I want sections and cards to animate into view as I scroll, so that the page feels dynamic and engaging.

#### Acceptance Criteria

1. THE Animation_Engine SHALL use the browser `IntersectionObserver` API to detect when section elements enter the viewport.
2. WHEN a section element intersects the viewport with a threshold of 0.15, THE Animation_Engine SHALL add a CSS class that transitions the element from `opacity: 0; transform: translateY(24px)` to `opacity: 1; transform: translateY(0)`.
3. THE Animation_Engine SHALL animate only `opacity` and `transform` properties to avoid layout-triggering repaints.
4. WHEN an element has already been animated into view, THE Animation_Engine SHALL NOT re-animate it on subsequent scroll events.
5. WHERE the user has enabled `prefers-reduced-motion`, THE Animation_Engine SHALL skip all entrance animations and render elements at full opacity immediately.

---

### Requirement 7: Resume PDF Download via Backend API

**User Story:** As a visitor, I want to download Suchandra's resume as a PDF, so that I can review it offline or share it.

#### Acceptance Criteria

1. THE API_Server SHALL expose a `GET /api/resume/download` endpoint that responds with the Resume_PDF file as an `application/pdf` content type.
2. THE API_Server SHALL set the `Content-Disposition` header to `attachment; filename="Suchandra_Mondal_Resume.pdf"` on the download response.
3. IF the Resume_PDF file is not found on disk, THEN THE API_Server SHALL respond with HTTP status 404 and a JSON body `{ "error": "Resume not found" }`.
4. THE Portfolio_App SHALL render a "Download Resume" button that triggers a fetch to `GET /api/resume/download` and initiates a browser file download.
5. THE API_Server SHALL include CORS headers permitting requests from the Portfolio_App origin.

---

### Requirement 8: Contact Form with Client-Side Validation

**User Story:** As a visitor, I want to submit a contact message through the portfolio, so that I can reach out to Suchandra directly.

#### Acceptance Criteria

1. THE Contact_Form SHALL contain the following fields: Name (text, required), Email (email, required), and Message (textarea, required).
2. WHEN the visitor submits the Contact_Form with any required field empty, THE Contact_Form SHALL display an inline validation error message adjacent to the empty field without submitting the form.
3. WHEN the visitor submits the Contact_Form with an invalid email format, THE Contact_Form SHALL display the message "Please enter a valid email address" adjacent to the email field.
4. WHEN all fields are valid and the form is submitted, THE Contact_Form SHALL display a success confirmation message and reset all fields.
5. THE Contact_Form SHALL sanitize all user input before any DOM insertion to prevent XSS.
6. THE Contact_Form SHALL remain fully functional without a backend — form submission in the initial version SHALL log the payload to the browser console and show the success message.

---

### Requirement 9: Responsive Layout

**User Story:** As a visitor on any device, I want the portfolio to display correctly on mobile, tablet, and desktop screens, so that I have a good experience regardless of my device.

#### Acceptance Criteria

1. THE Portfolio_App SHALL be fully usable at viewport widths from 320px to 2560px.
2. THE Portfolio_App SHALL use CSS media queries with breakpoints at 420px, 640px, and 768px to adjust layouts.
3. WHEN the viewport width is ≤ 640px, THE Portfolio_App SHALL stack the Experience timeline entries vertically with no horizontal overflow.
4. WHEN the viewport width is ≤ 640px, THE Portfolio_App SHALL display the Projects section as a single-column card list.
5. THE Portfolio_App SHALL use relative units (`rem`, `%`, `vw`) for font sizes and spacing to ensure text scales appropriately across screen sizes.
6. THE Portfolio_App SHALL not produce horizontal scroll at any supported viewport width.

---

### Requirement 10: Project Structure and Build

**User Story:** As a developer, I want the project organized into clearly separated frontend and backend directories, so that each can be developed, run, and deployed independently.

#### Acceptance Criteria

1. THE Portfolio_App SHALL reside entirely within `flutter_portfolio/frontend/` as a Next.js App Router project.
2. THE API_Server SHALL reside entirely within `flutter_portfolio/backend/` as an Express.js project.
3. THE Portfolio_App SHALL be startable with `npm run dev` from `flutter_portfolio/frontend/` and buildable with `npm run build`.
4. THE API_Server SHALL be startable with `node server.js` or `npm start` from `flutter_portfolio/backend/`.
5. THE Portfolio_App SHALL use no external UI component libraries — all styling SHALL be implemented with plain CSS files or CSS Modules.
6. THE Portfolio_App SHALL use no Tailwind CSS.
