---
created: 2026-02-12T17:08:29Z
last_updated: 2026-02-12T17:08:29Z
version: 1.0
author: Claude Code PM System
---

# Technical Context

## Technology Stack

### Primary Language
- **HTML5** - Markup for web structure
- **CSS3** - Styling and layout
- **JavaScript (ES6+)** - Client-side functionality

### Runtime Environment
- **Web Browser** - Chrome, Firefox, Safari, Edge
- **No build system** - Direct file execution
- **No transpilation** - Vanilla JavaScript

## Development Tools

### Version Control
- **Git** - Version control system
- **GitHub CLI (gh)** - v2.86.0
  - Extension: gh-sub-issue (for parent-child issue relationships)

### Editor
- **VSCode** - Primary code editor
  - Configuration in `.vscode/settings.json`
  - Auto-approval for Speckit PowerShell scripts

### Project Management
- **Claude Code PM (CCPM)** - Project management system
  - GitHub Issues integration
  - Epic and task management
  - Parallel agent execution

### Workflow Framework
- **Speckit** - Feature specification and planning
  - Agent-driven workflow
  - Templates for specs, plans, tasks
  - PowerShell automation scripts

## Dependencies

### No Package Manager
This project does not use npm, yarn, pip, or any package manager. All code is vanilla HTML/CSS/JS with no external dependencies.

### External Resources
- None currently (could add CDN resources if needed)

## Build & Deployment

### Build Process
**None required** - Static files served directly

### Development Server
**None required** - Open `index.html` in browser

### Deployment
- Copy files to web server or static hosting
- No compilation or bundling needed
- **Supported platforms:**
  - GitHub Pages
  - Netlify
  - Vercel
  - Any static file server

## Testing

### Test Framework
- No automated testing framework currently configured
- Manual testing in browser

### Test Locations
- Potential test directories detected: `.github/agents/` contains agent tests

## Code Quality Tools

### Linting
- No linter configured (could add ESLint, stylelint)

### Formatting
- No formatter configured (could add Prettier)

### Type Checking
- No TypeScript or type checking

## Platform & Environment

### Operating System
- **macOS** - Darwin 24.6.0
- **Architecture**: ARM64 (Apple Silicon)

### Shell
- **Zsh** - Default shell

### Package Manager
- **Homebrew** - For system-level packages
  - Used to install GitHub CLI

## API Integrations

### GitHub API
- Via GitHub CLI (gh)
- Used for issue management, PR creation
- Authentication via OAuth

### No External APIs
The demo app (workout-site) uses local JSON data, no external API calls.

## Data Storage

### Local Files
- **JSON**: `workout-site/data/curriculum.json`
- **Markdown**: Various .md files for documentation and specs

### No Database
This is a static web app with no backend or database.

## Version Requirements

### Git
- Any recent version (2.x+)

### GitHub CLI
- v2.86.0 currently installed
- Requires authentication to GitHub account

### Web Browser
- Modern browsers with ES6+ support
- No specific version requirements

## Development Environment

### Required Software
- [x] Git
- [x] GitHub CLI (gh)
- [x] Web browser
- [x] Code editor (VSCode recommended)

### Optional Software
- [ ] Node.js (for future tooling)
- [ ] Python (for local server: `python -m http.server`)
- [ ] Live reload tools

## Future Technical Considerations

### Potential Additions
- **Build System**: Vite, Parcel, or webpack (if complexity grows)
- **Package Manager**: npm/yarn (if dependencies needed)
- **Testing**: Jest, Vitest, or Playwright
- **Linting**: ESLint + Prettier
- **TypeScript**: For type safety
- **CSS Preprocessor**: SASS/LESS (if styles become complex)

### Scaling Considerations
- Current architecture supports up to medium-sized static apps
- For larger apps, consider framework (React, Vue, Svelte)
- For backend needs, consider API integration or serverless functions
