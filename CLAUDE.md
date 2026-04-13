# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Start dev server at localhost:3000
npm run build      # Production build to /build
npm run deploy     # Build + deploy to GitHub Pages (gh-pages branch)
npm test           # Run tests
```

## Architecture

Single-page React app — no routing between pages. All sections live on one scrollable page. `react-scroll` handles smooth scrolling between anchors.

**Component tree:**
```
App.js              ← Root; holds theme state (light/dark); passes theme + toggleTheme to Navbar
├── Navbar          ← Sticky top nav with react-scroll links + dark mode toggle switch
├── Home            ← Defined inline in App.js (not a separate file)
│   └── Connect     ← LinkedIn / GitHub / Gmail / Resume social buttons
├── Skills          ← Skills grid with Lottie animations; responsive layout changes which cards get accent color
├── Background      ← Tabbed Education/Experience timeline; tab state managed locally with useState
│   ├── Education
│   └── Experience
├── Projects        ← Project cards with screenshot overlay on hover
└── Contact         ← Formspree contact form + Google Maps iframe
```

## Theming System

Dark mode uses CSS custom properties. Variables are defined in `src/index.css`:
- `:root` — light theme values
- `[data-theme="dark"]` — dark overrides

The `data-theme` attribute is applied to `<div className="App">` in `App.js`. Theme state (`useState`) lives in `App`, and `toggleTheme` is passed as a prop to `Navbar`, which renders the toggle switch.

**Key tokens:** `--bg-page`, `--bg-surface`, `--bg-section-alt`, `--bg-accent`, `--color-accent`, `--text-primary`, `--text-on-accent`. Never use hardcoded color values — always use these variables.

## Personalizing Content

All data is hardcoded in the component files (no CMS or config file):
- **Home name/bio** → `src/App.js` (inline `<Home>` component)
- **Skills** → `skillsSection` array in `src/components/Skills.js`
- **Education** → `education` array in `src/components/Education.js`
- **Experience** → `experience` array in `src/components/Experience.js`
- **Projects** → `projects` array in `src/components/Projects.js`
- **Contact email + Formspree endpoint** → `src/components/Contact.js`
- **Social links + resume URL** → props passed to `<Connect>` in `src/App.js`
- **Avatar image** → `src/components/images/avatar.png` (also `public/avatar.png` for favicon)

## Animations

Lottie animations (`.json` files) live in `src/components/animations/`. The `<Animation>` component wraps `react-lottie`. To add a new animation, drop the JSON from [LottieFiles](https://lottiefiles.com/) into that folder and reference the filename.

## Deployment

GitHub Pages via `gh-pages`. Before deploying, update `"homepage"` in `package.json` to match your GitHub Pages URL (`https://<username>.github.io/<repo-name>`), then run `npm run deploy`.

## Known Issues

- `Projects.js` uses `class` instead of `className` in some JSX attributes — React warnings but renders correctly.
- Project links use `react-router-dom <Link>` for external URLs (should be `<a href>`), and each wraps its own `<BrowserRouter>` — works but is non-standard.
