# Project Structure

## Root Layout
```
/
├── index.html              # Entry point
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── package.json
├── public/
│   └── resume.pdf          # Downloadable resume
├── src/
│   ├── main.ts             # App bootstrap (DOMContentLoaded → AppShell.init())
│   ├── data/
│   │   └── resume-data.json  # All resume content (single source of truth)
│   ├── models/
│   │   └── types.ts        # TypeScript interfaces: ResumeData, Job, Project, etc.
│   ├── components/
│   │   ├── AppShell.ts
│   │   ├── NavigationBar.ts
│   │   ├── HeroSection.ts
│   │   ├── ExperienceSection.ts
│   │   ├── SkillsSection.ts
│   │   ├── ProjectsSection.ts
│   │   ├── EducationSection.ts
│   │   └── ContactSection.ts
│   ├── engines/
│   │   ├── ThemeEngine.ts
│   │   ├── AnimationEngine.ts
│   │   └── DataLayer.ts
│   ├── styles/
│   │   └── main.css        # Tailwind directives + CSS custom properties for themes
│   └── utils/
│       └── sanitize.ts     # XSS sanitization helpers
└── tests/
    ├── unit/               # Unit tests per module
    └── property/           # fast-check property-based tests
```

## Key Conventions
- All resume content lives in `resume-data.json` — no hardcoded content in components
- Components are pure render functions; they receive data and produce DOM — no internal data fetching
- `DataLayer` is the only module that reads `resume-data.json`; result is cached in memory for the session
- Theme is controlled exclusively via CSS class on `<html>` — components never check theme directly
- Animations use only `transform` and `opacity` — no layout-triggering CSS properties
- All external links must have `rel="noopener noreferrer"`
- User input must be sanitized before any `innerHTML` usage

## Spec Files
```
Resume_portfolio/
├── requirements.md
├── design.md
└── tasks.md
```
