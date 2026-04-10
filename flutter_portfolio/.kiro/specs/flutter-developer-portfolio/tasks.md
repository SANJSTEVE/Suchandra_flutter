# Implementation Plan: Flutter Developer Portfolio — Suchandra Mondal

## Overview

Incremental implementation of the Next.js + Express.js portfolio. Each task builds on the previous, starting with project scaffolding and data, then building UI components bottom-up, then wiring everything together. Property-based tests are placed close to the code they validate.

## Tasks

- [x] 1. Scaffold project structure and install dependencies
  - Create `flutter_portfolio/frontend/` as a Next.js App Router project (`package.json`, `next.config.mjs`, `jsconfig.json`)
  - Create `flutter_portfolio/backend/` as an Express.js project (`package.json`, `server.js` stub)
  - Install frontend deps: `next`, `react`, `react-dom`, `vitest`, `@vitest/coverage-v8`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `fast-check`
  - Install backend deps: `express`, `cors`
  - Create `flutter_portfolio/frontend/tests/unit/` and `flutter_portfolio/frontend/tests/property/` directories (add `.gitkeep`)
  - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 2. Create Resume_JSON and pure utility modules
  - [x] 2.1 Create `flutter_portfolio/frontend/data/resume.json` populated with Suchandra Mondal's full data (personal, skills, experience, education, projects, stats, certifications)
    - All top-level keys must be present: `personal`, `skills`, `experience`, `education`, `projects`, `stats`, `certifications`
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 2.2 Create `flutter_portfolio/frontend/app/themeEngine.js` with three exported pure functions: `applyTheme(theme)`, `persistTheme(theme)`, `getInitialTheme()`
    - `applyTheme`: sets `data-theme` attribute on `document.documentElement`
    - `persistTheme`: writes to `localStorage` under key `"portfolio-theme"`
    - `getInitialTheme`: reads `localStorage` first, falls back to `prefers-color-scheme`
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 2.3 Create `flutter_portfolio/frontend/app/contactForm.js` with four exported pure functions: `validateEmail(email)`, `validateForm(data)`, `sanitize(str)`, `submitForm(data)`
    - `validateEmail`: returns `true`/`false` based on regex
    - `validateForm`: returns an errors object keyed by field name
    - `sanitize`: escapes `<`, `>`, `"`, `'`, `&` HTML entities
    - `submitForm`: logs payload to console, returns `{ success: true }`
    - _Requirements: 8.2, 8.3, 8.4, 8.5, 8.6_

  - [x] 2.4 Write unit tests for `themeEngine.js`
    - Test `applyTheme` sets correct `data-theme` attribute
    - Test `persistTheme` writes to `localStorage`
    - Test `getInitialTheme` reads `localStorage` before `prefers-color-scheme`
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 2.5 Write unit tests for `contactForm.js`
    - Test `validateEmail` accepts valid emails and rejects invalid ones
    - Test `validateForm` returns errors for each empty required field
    - Test `sanitize` escapes HTML entities
    - Test `submitForm` returns success result
    - _Requirements: 8.2, 8.3, 8.4, 8.5_

  - [x] 2.6 Write property tests for Theme Engine (Properties 12–14)
    - **Property 12: Theme application sets data-theme attribute** — `fc.constantFrom('dark','light')` → `applyTheme` → assert `data-theme` equals input
    - **Property 13: Theme persistence round-trip** — `fc.constantFrom('dark','light')` → `persistTheme` → assert `localStorage.getItem` equals input
    - **Property 14: Theme initialization reads localStorage first** — arbitrary stored theme → `getInitialTheme` → assert returns stored value
    - Tag: `// Feature: flutter-developer-portfolio, Property 12/13/14: ...`
    - `numRuns: 100`
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 2.7 Write property tests for Contact Form (Properties 18–21)
    - **Property 18: Empty required fields produce validation errors** — arbitrary subset of empty fields → `validateForm` → assert errors present for each empty field
    - **Property 19: Invalid email format produces validation error** — `fc.string()` filtered to exclude `@` → `validateEmail` → assert returns `false`
    - **Property 20: Valid form submission shows success and resets fields** — arbitrary valid `{name, email, message}` → `submitForm` → assert `success: true`
    - **Property 21: Sanitize strips executable script content** — `fc.string()` containing `<` or `>` → `sanitize` → assert no `<script` or `</script` in output
    - Tag: `// Feature: flutter-developer-portfolio, Property 18/19/20/21: ...`
    - `numRuns: 100`
    - _Requirements: 8.2, 8.3, 8.4, 8.5_

- [x] 3. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Create global CSS and root layout
  - [x] 4.1 Create `flutter_portfolio/frontend/app/globals.css` with all CSS
    - CSS custom properties for dark theme (`:root`) and light theme (`[data-theme="light"]`) using the specified color palette
    - `.glass-card` styles: `backdrop-filter: blur`, semi-transparent background, border
    - `.bento-grid` CSS Grid: 3-column base, collapses at 640px (2-col) and 420px (1-col)
    - `.reveal` / `.reveal.visible` transition classes (`opacity`, `transform: translateY(24px)`)
    - `@media (prefers-reduced-motion: reduce)` override to make `.reveal` immediately visible
    - Responsive breakpoints at 420px, 640px, 768px
    - Nav, section, timeline, pill, card, footer styles
    - _Requirements: 5.5, 5.6, 6.2, 6.3, 6.5, 9.1, 9.2, 9.5, 9.6_

  - [x] 4.2 Create `flutter_portfolio/frontend/app/layout.js` as the root layout
    - Import `globals.css`
    - Inject inline `<script>` in `<head>` that reads `localStorage` and sets `data-theme` on `<html>` before first paint (FOUC prevention)
    - Set `<html lang="en">` and appropriate `<meta>` tags
    - _Requirements: 5.7, 10.1_

- [x] 5. Create `useReveal` hook
  - Create `flutter_portfolio/frontend/components/useReveal.js`
  - Returns a `ref`; attaches `IntersectionObserver` with `threshold: 0.15`
  - Adds `'visible'` class to the element on first intersection, then unobserves
  - Checks `window.matchMedia('(prefers-reduced-motion: reduce)')` — if active, sets element visible immediately without waiting for intersection
  - Falls back gracefully if `IntersectionObserver` is not supported
  - _Requirements: 6.1, 6.2, 6.4, 6.5_

- [ ] 6. Build Nav component
  - [-] 6.1 Create `flutter_portfolio/frontend/components/Nav.js`
    - Props: `{ theme, toggleTheme }`
    - Renders sticky nav with glassmorphism background (`backdrop-filter: blur`, `--nav-bg`)
    - Links: Hero, About, Experience, Skills, Projects, Education, Contact — each scrolls to section `id` on click
    - Theme toggle button (sun/moon icon or text label)
    - Hamburger menu toggle for viewports ≤ 768px; clicking a link closes the menu
    - Scroll-spy: highlights active section link based on scroll position
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ] 6.2 Write unit tests for Nav
    - Test all section links are rendered
    - Test hamburger toggles menu open/closed
    - Test clicking a link closes the hamburger menu
    - Test theme toggle button is present
    - _Requirements: 4.2, 4.5, 4.6_

- [ ] 7. Build BentoHero component
  - [ ] 7.1 Create `flutter_portfolio/frontend/components/BentoHero.js`
    - Props: `{ data: ResumeData }`
    - Renders 7 glass cards in the bento CSS grid layout
    - Bio card (col-span 2): avatar initials "SM", name, title, summary, platform chips (iOS, Android, Web, Desktop)
    - Status card (col-span 1): green dot, "Available", "Open to roles", location, Dart/Flutter proficiency bar
    - Project card (col-span 1): first project from `data.projects` — title, description, tag pills
    - Skills card (col-span 2): condensed pill list from all skill categories in `data.skills`
    - Experience summary card (col-span 3): top 3 experience entries from `data.experience`
    - Stats card (col-span 2): 4 stat boxes from `data.stats`
    - Contact CTA card (col-span 1): "Let's build something." + `mailto:` link from `data.personal.email`
    - Ambient orb elements (blurred radial gradients) using `#027DFD` and `#54C5F8`
    - Card hover transitions: border color → `rgba(2,125,253,0.4)`, increased background opacity, within 200ms
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10_

  - [ ] 7.2 Write unit tests for BentoHero
    - Test all 7 cards are rendered
    - Test bio card shows name, title, location
    - Test stats card shows all 4 stat values
    - Test contact CTA card contains a `mailto:` link
    - _Requirements: 2.1, 2.5, 2.9, 2.10_

  - [ ] 7.3 Write property tests for BentoHero data binding (Properties 1–6)
    - **Property 1: Missing top-level keys produce empty states, not errors** — arbitrary partial resume object → render BentoHero → assert no thrown error
    - **Property 2: Bio card renders all personal data fields** — arbitrary `{name, title, location, summary}` → render → assert all four values present in output
    - **Property 3: Project card renders first project's data** — arbitrary non-empty `projects` array → render → assert first project's `title`, `description`, and `tags` present
    - **Property 4: Skills card renders all skill items** — arbitrary `skills` array → render → assert every item string present in output
    - **Property 5: Stats card renders all stat values** — arbitrary `stats` object → render → assert all four stat values present
    - **Property 6: Contact CTA card renders correct mailto link** — arbitrary email string → render → assert `mailto:<email>` present in output
    - Tag: `// Feature: flutter-developer-portfolio, Property 1/2/3/4/5/6: ...`
    - `numRuns: 100`
    - _Requirements: 1.4, 2.5, 2.7, 2.8, 2.9, 2.10_

- [ ] 8. Build full-page section components
  - [ ] 8.1 Create `flutter_portfolio/frontend/components/Experience.js`
    - Props: `{ jobs: Job[] }`
    - Renders vertical timeline; each entry: company, role, date range, location, bullet list
    - Uses `useReveal` hook for entrance animation
    - Section has `id="experience"`
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ] 8.2 Create `flutter_portfolio/frontend/components/Skills.js`
    - Props: `{ skills: SkillCategory[] }`
    - Renders categorized pill groups (Core, State Management, Architecture, Backend/Cloud, Tools)
    - Uses `useReveal` hook
    - Section has `id="skills"`
    - _Requirements: 3.1, 3.2, 3.4_

  - [ ] 8.3 Create `flutter_portfolio/frontend/components/Projects.js`
    - Props: `{ projects: Project[] }`
    - Renders card grid; each card: title, description, tag pills, optional store/live badges
    - Uses `useReveal` hook
    - Section has `id="projects"`
    - _Requirements: 3.1, 3.2, 3.5_

  - [ ] 8.4 Create `flutter_portfolio/frontend/components/Education.js`
    - Props: `{ education: EducationEntry[] }`
    - Renders cards with degree, institution, year, location
    - Uses `useReveal` hook
    - Section has `id="education"`
    - _Requirements: 3.1, 3.2, 3.6_

  - [ ] 8.5 Create `flutter_portfolio/frontend/components/About.js`
    - Renders About section with summary text from `personal.summary`
    - Uses `useReveal` hook
    - Section has `id="about"`
    - _Requirements: 3.1, 3.2_

  - [ ] 8.6 Create `flutter_portfolio/frontend/components/Contact.js`
    - Props: `{ personal: Personal }`
    - Renders email, phone, LinkedIn links (all external links with `rel="noopener noreferrer"`)
    - Embeds Contact_Form using `validateEmail`, `validateForm`, `sanitize`, `submitForm` from `contactForm.js`
    - Inline validation errors adjacent to each field; success message on valid submit; fields reset after success
    - Uses `useReveal` hook
    - Section has `id="contact"`
    - _Requirements: 3.1, 3.2, 3.7, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [ ] 8.7 Write unit tests for section components
    - Experience: renders company, role, bullets for each job
    - Skills: renders each category name and its items
    - Projects: renders title, description, tags for each project
    - Education: renders degree and institution for each entry
    - Contact: renders email, phone, LinkedIn; form renders 3 fields
    - _Requirements: 3.3, 3.4, 3.5, 3.6, 3.7_

  - [ ] 8.8 Write property tests for section data binding (Properties 7–11)
    - **Property 7: Experience timeline renders all entry fields** — arbitrary `experience` array → render Experience → assert each entry's `company`, `role`, and first bullet present
    - **Property 8: Skills section renders all categories and items** — arbitrary `skills` array → render Skills → assert each `category` name and all `items` present
    - **Property 9: Projects section renders all project data** — arbitrary `projects` array → render Projects → assert each project's `title`, `description`, and `tags` present
    - **Property 10: Education section renders all entry fields** — arbitrary `education` array → render Education → assert each entry's `degree` and `institution` present
    - **Property 11: Contact section renders all contact fields** — arbitrary `{email, phone, linkedin}` → render Contact → assert all three values present
    - Tag: `// Feature: flutter-developer-portfolio, Property 7/8/9/10/11: ...`
    - `numRuns: 100`
    - _Requirements: 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ] 9. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Write property tests for Animation Engine (Properties 15–17)
  - [ ] 10.1 Write property tests in `flutter_portfolio/frontend/tests/property/animationEngine.property.test.js`
    - **Property 15: Intersection triggers visible class** — arbitrary DOM element → fire `IntersectionObserver` callback with `isIntersecting: true` → assert element has `'visible'` class
    - **Property 16: Animation is idempotent** — element already with `'visible'` class → fire callback again → assert class list unchanged (observer already unobserved)
    - **Property 17: Reduced-motion skips animation** — `prefers-reduced-motion: reduce` active → observe element → assert element immediately has `'visible'` class without intersection
    - Tag: `// Feature: flutter-developer-portfolio, Property 15/16/17: ...`
    - `numRuns: 100`
    - _Requirements: 6.2, 6.4, 6.5_

- [ ] 11. Build Express.js backend
  - [ ] 11.1 Implement `flutter_portfolio/backend/server.js`
    - `GET /api/resume/download`: streams `data/resume.pdf` with `Content-Type: application/pdf` and `Content-Disposition: attachment; filename="Suchandra_Mondal_Resume.pdf"`
    - Returns `404 { "error": "Resume not found" }` if file is missing
    - Returns `500 { "error": "Internal server error" }` on unexpected errors
    - CORS: allow origin from `FRONTEND_URL` env var, defaulting to `http://localhost:3000`
    - Listens on port `4000` (or `PORT` env var)
    - _Requirements: 7.1, 7.2, 7.3, 7.5_

  - [ ] 11.2 Copy `flutter_portfolio/Suchandra Mondal.pdf` to `flutter_portfolio/backend/data/resume.pdf`
    - _Requirements: 7.1_

- [ ] 12. Wire everything together in `page.js`
  - [ ] 12.1 Create `flutter_portfolio/frontend/app/page.js` as a client component (`'use client'`)
    - Static import `resume.json`
    - Theme state: initialize from `getInitialTheme()`, toggle via `applyTheme` + `persistTheme`
    - Render order: `<Nav>` → `<BentoHero>` → `<About>` → `<Experience>` → `<Skills>` → `<Projects>` → `<Education>` → `<Contact>` → `<footer>`
    - Pass `theme` and `toggleTheme` to `<Nav>`; pass relevant slices of `resume.json` to each section component
    - "Download Resume" button: fetches `GET http://localhost:4000/api/resume/download`, triggers browser file download; shows inline error on failure
    - _Requirements: 1.1, 3.1, 4.1, 5.1, 5.2, 5.3, 5.4, 7.4_

  - [ ] 12.2 Copy `flutter_portfolio/Suchandra Mondal.pdf` to `flutter_portfolio/frontend/public/resume.pdf`
    - _Requirements: 7.4_

- [ ] 13. Final checkpoint — Ensure all tests pass
  - Run `npx vitest --run` from `flutter_portfolio/frontend/`
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- All property tests use `fast-check` with `numRuns: 100`
- Tag format for property tests: `// Feature: flutter-developer-portfolio, Property N: <property_text>`
- Do NOT modify any files outside `flutter_portfolio/`
- The existing `frontend/` and `backend/` at the workspace root are a separate project
- All external links must include `rel="noopener noreferrer"`
- User input must be sanitized before any `innerHTML` usage
