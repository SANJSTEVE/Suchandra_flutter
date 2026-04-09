# Requirements Document

## Introduction

This document defines the requirements for converting a traditional resume into an interactive web portfolio — a single-page application that presents professional experience, skills, projects, and education in a visually compelling, responsive, and accessible format. The portfolio is deployable as a static site with no backend dependencies, supports dark/light theming, scroll-triggered animations, and project filtering.

## Glossary

- **AppShell**: The root layout container that bootstraps the application, manages navigation, and coordinates all section rendering.
- **NavigationBar**: The sticky top navigation component with smooth-scroll links and the theme toggle button.
- **HeroSection**: The full-viewport landing section displaying name, title, tagline, and call-to-action buttons.
- **ExperienceSection**: The vertical timeline component rendering work history entries.
- **SkillsSection**: The component that visually represents technical and soft skills grouped by category.
- **ProjectsSection**: The card grid component for featured projects with tag-based filtering.
- **ContactSection**: The component rendering contact links and an optional contact form.
- **ThemeEngine**: The module managing dark/light mode preference with localStorage persistence.
- **AnimationEngine**: The module managing scroll-triggered entrance animations via IntersectionObserver.
- **DataLayer**: The module responsible for loading and parsing resume data from a JSON source.
- **ResumeData**: The top-level data structure containing all resume content (personal info, experience, education, skills, projects, contact).
- **PersonalInfo**: The data structure holding name, title, tagline, summary, avatar URL, and resume download URL.
- **Job**: The data structure representing a single work history entry.
- **SkillGroup**: The data structure grouping skills under a named category.
- **Skill**: An individual skill item with a name and optional proficiency level.
- **Project**: The data structure representing a featured project with title, description, tags, and links.
- **ContactInfo**: The data structure holding email and social/professional profile links.
- **ContactFormData**: The data structure holding user-submitted contact form fields.
- **ValidationResult**: The data structure returned by form validation containing an isValid flag and a field-to-error-message map.
- **ThemeMode**: An enumeration of valid theme values: "light" or "dark".
- **IntersectionObserver**: A native browser API used to detect when elements enter the viewport.

---

## Requirements

### Requirement 1: Application Bootstrap and Data Loading

**User Story:** As a visitor, I want the portfolio to load quickly and display all content, so that I can immediately explore the professional profile.

#### Acceptance Criteria

1. WHEN the DOM is fully loaded, THE AppShell SHALL invoke `init()` to begin the bootstrap sequence.
2. WHEN `init()` is invoked, THE DataLayer SHALL fetch and parse the resume data from the configured JSON source.
3. IF the resume data source is missing, malformed, or fails to parse, THEN THE AppShell SHALL render a fallback error state displaying the message "Portfolio content is temporarily unavailable" and a retry button.
4. WHEN the retry button is clicked, THE AppShell SHALL re-invoke `fetchResumeData()` and render normally if the data loads successfully.
5. WHEN resume data is successfully loaded, THE AppShell SHALL pass the `ResumeData` object to `renderAllSections()`.
6. THE DataLayer SHALL return `null` when the data source is inaccessible or the JSON is invalid.
7. THE DataLayer SHALL return a fully populated `ResumeData` object when the data source is valid and accessible.

---

### Requirement 2: Section Rendering

**User Story:** As a visitor, I want all portfolio sections to be rendered from my resume data, so that I can see a complete and accurate representation of my professional profile.

#### Acceptance Criteria

1. WHEN `renderAllSections(data)` is called with a valid `ResumeData` object, THE AppShell SHALL render exactly one DOM node per section (Hero, About, Experience, Skills, Projects, Education, Contact).
2. WHEN `renderAllSections(data)` is called, THE AppShell SHALL render each section exactly once — no section SHALL be rendered more than once.
3. WHEN sections are initially rendered, THE AppShell SHALL set each section to an initially hidden state (opacity: 0) pending scroll-triggered animation.
4. THE HeroSection SHALL render the `PersonalInfo.name`, `PersonalInfo.title`, and `PersonalInfo.tagline` fields.
5. WHEN `PersonalInfo.avatarUrl` is non-null, THE HeroSection SHALL render the profile photo.
6. THE HeroSection SHALL render a "Download Resume" button linking to `PersonalInfo.resumeUrl` and a "Contact Me" button that smooth-scrolls to the ContactSection.
7. THE ExperienceSection SHALL render each `Job` entry as a timeline card displaying company, role, start date, end date, location, and bullet points.
8. WHEN a `Job.endDate` is `null`, THE ExperienceSection SHALL display "Present" as the end date for that entry.
9. THE SkillsSection SHALL render all `SkillGroup` entries, grouping skills under their respective category labels.
10. THE ProjectsSection SHALL render each `Project` as a card displaying title, description, technology tags, and available links.
11. THE ContactSection SHALL render all non-null fields from `ContactInfo` (email, LinkedIn, GitHub, Twitter, website).

---

### Requirement 3: Navigation

**User Story:** As a visitor, I want a sticky navigation bar that tracks my scroll position, so that I can quickly jump to any section and always know where I am on the page.

#### Acceptance Criteria

1. THE NavigationBar SHALL render a sticky navigation link for each portfolio section.
2. WHEN the user scrolls the page, THE NavigationBar SHALL mark exactly one section link as active — the link corresponding to the section currently in the viewport.
3. WHEN a navigation link is clicked, THE NavigationBar SHALL smooth-scroll the viewport to the corresponding section.
4. WHEN the viewport width is below the mobile breakpoint, THE NavigationBar SHALL collapse the section links and display a hamburger menu icon.
5. WHEN the hamburger menu icon is clicked, THE NavigationBar SHALL expand and display the section links.
6. WHEN a section link in the mobile menu is clicked, THE NavigationBar SHALL close the mobile menu after navigating.

---

### Requirement 4: Project Filtering

**User Story:** As a visitor, I want to filter projects by technology tag, so that I can quickly find projects relevant to a specific skill or technology.

#### Acceptance Criteria

1. THE ProjectsSection SHALL render a filter bar displaying all unique technology tags present across all projects, plus an "All" option.
2. WHEN the "All" filter is selected, THE ProjectsSection SHALL display all project cards.
3. WHEN a specific technology tag is selected, THE ProjectsSection SHALL display only project cards whose `tags` list contains that tag.
4. WHEN a specific technology tag is selected, THE ProjectsSection SHALL hide all project cards whose `tags` list does not contain that tag.
5. WHEN filter selection changes, THE AnimationEngine SHALL animate visible cards in and hidden cards out with a fade/slide transition.
6. WHEN a project card is clicked, THE ProjectsSection SHALL open a modal displaying the project's full details including `longDesc`, all tags, `repoUrl`, and `liveUrl`.
7. WHEN the modal close action is triggered, THE ProjectsSection SHALL close the modal and return focus to the triggering card.

---

### Requirement 5: Skills Filtering

**User Story:** As a visitor, I want to filter skills by category, so that I can focus on the specific type of skills I am interested in.

#### Acceptance Criteria

1. THE SkillsSection SHALL render category filter controls for all available skill categories.
2. WHEN a category filter is selected, THE SkillsSection SHALL display only skills belonging to that category.
3. WHEN no category filter is active, THE SkillsSection SHALL display all skill groups.

---

### Requirement 6: Dark/Light Theme

**User Story:** As a visitor, I want to toggle between dark and light modes, so that I can view the portfolio in my preferred visual style.

#### Acceptance Criteria

1. WHEN `ThemeEngine.init()` is called and a theme preference exists in `localStorage`, THE ThemeEngine SHALL apply that stored theme.
2. WHEN `ThemeEngine.init()` is called and no `localStorage` preference exists, THE ThemeEngine SHALL apply the theme matching the system `prefers-color-scheme` media query.
3. WHEN the theme toggle button is clicked, THE ThemeEngine SHALL switch to the opposite `ThemeMode`.
4. WHEN the theme toggle button is clicked, THE ThemeEngine SHALL persist the new `ThemeMode` to `localStorage` under the key `"portfolio-theme"`.
5. WHEN the theme toggle button is clicked twice in succession, THE ThemeEngine SHALL return to the original `ThemeMode`.
6. WHEN `localStorage` is unavailable, THE ThemeEngine SHALL fall back to the system `prefers-color-scheme` preference and SHALL NOT display an error to the user.
7. WHEN a theme is applied, THE ThemeEngine SHALL toggle the appropriate CSS class on the root `<html>` element.

---

### Requirement 7: Scroll-Triggered Animations

**User Story:** As a visitor, I want sections to animate into view as I scroll, so that the portfolio feels dynamic and engaging.

#### Acceptance Criteria

1. WHEN `AnimationEngine.init()` is called, THE AnimationEngine SHALL register all section elements with the `IntersectionObserver`.
2. WHEN a registered section element enters the viewport, THE AnimationEngine SHALL add the designated animation CSS class to that element.
3. WHEN a section has been animated into view, THE AnimationEngine SHALL unregister that element from the `IntersectionObserver` to prevent re-animation.
4. THE AnimationEngine SHALL use only `transform` and `opacity` CSS properties for animations to avoid layout recalculation.

---

### Requirement 8: Contact Form

**User Story:** As a visitor, I want to send a message through a contact form, so that I can reach out to the portfolio owner directly from the page.

#### Acceptance Criteria

1. THE ContactSection SHALL render a contact form with fields for sender name, sender email, subject, and message.
2. WHEN the contact form is submitted, THE ContactSection SHALL invoke `validateForm()` before attempting submission.
3. WHEN `validateForm()` is called with a `ContactFormData` where `senderName` is empty, THE ContactSection SHALL return a `ValidationResult` with `isValid: false` and an error for the `senderName` field.
4. WHEN `validateForm()` is called with a `ContactFormData` where `senderEmail` is empty, THE ContactSection SHALL return a `ValidationResult` with `isValid: false` and an error for the `senderEmail` field.
5. WHEN `validateForm()` is called with a `ContactFormData` where `senderEmail` is non-empty but not a valid email address, THE ContactSection SHALL return a `ValidationResult` with `isValid: false` and an error for the `senderEmail` field.
6. WHEN `validateForm()` is called with a `ContactFormData` where `message` is empty, THE ContactSection SHALL return a `ValidationResult` with `isValid: false` and an error for the `message` field.
7. WHEN `validateForm()` is called with a `ContactFormData` where `message` is non-empty but fewer than 10 characters, THE ContactSection SHALL return a `ValidationResult` with `isValid: false` and an error for the `message` field.
8. WHEN `validateForm()` is called with a `ContactFormData` where all required fields are valid, THE ContactSection SHALL return a `ValidationResult` with `isValid: true` and an empty errors map.
9. IF the form submission endpoint returns a non-2xx response or times out, THEN THE ContactSection SHALL display an inline error message and SHALL preserve the form field values.
10. WHEN form validation errors exist, THE ContactSection SHALL display inline error messages adjacent to the invalid fields.

---

### Requirement 9: Data Validation

**User Story:** As a developer, I want the data layer to validate resume data on load, so that malformed data is caught early and does not cause rendering errors.

#### Acceptance Criteria

1. WHEN loading resume data, THE DataLayer SHALL validate that `PersonalInfo.name` is non-empty.
2. WHEN loading resume data, THE DataLayer SHALL validate that `PersonalInfo.title` is non-empty.
3. WHEN loading resume data, THE DataLayer SHALL validate that `PersonalInfo.resumeUrl` is a valid URL or relative path.
4. WHEN loading resume data, THE DataLayer SHALL validate that each `Job.startDate` is a valid YYYY-MM formatted string.
5. WHEN loading resume data, THE DataLayer SHALL validate that each `Job.endDate` is either `null` or a valid YYYY-MM string that is after `Job.startDate`.
6. WHEN loading resume data, THE DataLayer SHALL validate that each `Job.bullets` list contains at least one entry.
7. IF any required field fails validation, THEN THE DataLayer SHALL return `null` and log a descriptive error message to the console.

---

### Requirement 10: Error Handling and Resilience

**User Story:** As a visitor, I want the portfolio to handle missing or broken content gracefully, so that my experience is not disrupted by optional content failures.

#### Acceptance Criteria

1. WHEN a `Project.imageUrl` or `PersonalInfo.avatarUrl` resource returns a 404 or fails to load, THE AppShell SHALL replace the broken image with a styled placeholder (initials avatar or generic project icon).
2. WHEN `localStorage` is unavailable, THE ThemeEngine SHALL operate in session-only mode without displaying an error.
3. THE ContactSection SHALL sanitize all user-supplied input before rendering it to the DOM to prevent cross-site scripting (XSS).
4. THE AppShell SHALL render all external links (GitHub, LinkedIn, live demo URLs) with `rel="noopener noreferrer"` attributes.

---

### Requirement 11: Responsive Design

**User Story:** As a visitor on any device, I want the portfolio to be fully usable on mobile, tablet, and desktop screens, so that I can view it comfortably regardless of my device.

#### Acceptance Criteria

1. THE AppShell SHALL render a layout that adapts to mobile (< 768px), tablet (768px–1024px), and desktop (> 1024px) viewport widths.
2. THE ProjectsSection SHALL adjust the card grid column count based on available viewport width.
3. THE NavigationBar SHALL display a hamburger menu on viewports narrower than the mobile breakpoint.
4. THE HeroSection SHALL remain fully readable and usable on viewports as narrow as 320px.

---

### Requirement 12: Performance

**User Story:** As a visitor, I want the portfolio to load fast and feel smooth, so that I have a positive first impression.

#### Acceptance Criteria

1. THE AppShell SHALL render all images with the `loading="lazy"` attribute to defer off-screen image loading.
2. THE DataLayer SHALL fetch resume data at most once per page session and cache the result in memory.
3. THE AnimationEngine SHALL use `IntersectionObserver` rather than scroll event listeners for animation triggers.
4. THE AppShell SHALL target a Lighthouse Performance score of 90 or above on mobile.
5. THE AppShell SHALL load all fonts with `font-display: swap` to prevent invisible text during font loading.
