---
created: 2026-02-12T17:08:29Z
last_updated: 2026-02-12T17:08:29Z
version: 1.0
author: Claude Code PM System
---

# Project Style Guide

## Coding Standards

### HTML

#### Structure
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`)
- Proper nesting and indentation (2 spaces)
- Close all tags explicitly
- Use lowercase for tags and attributes

#### Attributes
- Always quote attribute values: `class="container"`
- Use descriptive IDs and classes: `id="workout-list"` not `id="wl"`
- Prefer data attributes for JavaScript hooks: `data-curriculum-id="1"`
- Include `alt` text for all images

#### Accessibility
- Include proper `lang` attribute on `<html>`
- Use ARIA labels where appropriate
- Ensure proper heading hierarchy (h1 → h2 → h3)
- Maintain keyboard navigation support

**Example**:
```html
<article class="workout-card" data-curriculum-id="1">
  <h2 class="workout-title">Strength Training Basics</h2>
  <p class="workout-description">Build foundational strength...</p>
</article>
```

### CSS

#### Organization
- Group related rules together
- Use comments to separate major sections
- Order properties alphabetically within rules
- Mobile-first responsive design

#### Naming
- Use kebab-case for class names: `workout-card`, `main-navigation`
- Be descriptive: `button-primary` not `btn-1`
- Avoid over-specific selectors
- No IDs in CSS (use classes)

#### Values
- Use `rem` for font sizes
- Use `em` for spacing
- Use CSS variables for colors and common values
- Prefer `flex` and `grid` over floats

#### Comments
```css
/* === Main Layout === */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* === Workout Cards === */
.workout-card {
  padding: 1.5rem;
  border-radius: 8px;
}
```

### JavaScript

#### Style
- Use `const` by default, `let` when reassignment needed
- Never use `var`
- Prefer arrow functions for callbacks
- Use template literals for string interpolation

#### Naming Conventions
- **Variables**: camelCase (`workoutList`, `currentCurriculum`)
- **Functions**: camelCase, verb-first (`fetchData`, `renderWorkouts`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ITEMS`, `API_URL`)
- **Classes**: PascalCase (`WorkoutManager`, `DataLoader`)

#### Functions
- Keep functions small and focused
- One purpose per function
- Descriptive names: `loadCurriculumData()` not `load()`
- Return early for error conditions

**Example**:
```javascript
const fetchCurriculumData = async () => {
  try {
    const response = await fetch('./data/curriculum.json');
    if (!response.ok) {
      throw new Error('Failed to load curriculum');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading curriculum:', error);
    return [];
  }
};
```

#### Error Handling
- Use try-catch for async operations
- Log errors with context
- Fail gracefully with user feedback
- Never leave empty catch blocks

#### Comments
- Use JSDoc for function documentation
- Comment "why" not "what"
- Keep comments up to date
- Remove commented-out code

**Example**:
```javascript
/**
 * Renders workout curricula to the DOM
 * @param {Array} curricula - Array of curriculum objects
 * @returns {void}
 */
const renderCurricula = (curricula) => {
  // Implementation
};
```

## File Structure Patterns

### Naming
- Lowercase with hyphens: `workout-site`, `index.html`
- Descriptive names: `curriculum.json` not `data.json`
- Consistent extensions: `.html`, `.css`, `.js`, `.md`, `.json`

### Organization
```
project-root/
├── app-name/
│   ├── index.html          # Main entry point
│   ├── styles.css          # All styles
│   ├── app.js              # All JavaScript
│   ├── data/
│   │   └── *.json          # Data files
│   └── assets/             # Images, fonts, etc.
│       ├── images/
│       └── fonts/
├── .claude/                # PM system (dotfile)
├── .specify/               # Workflow framework (dotfile)
└── README.md               # Documentation
```

### Size Guidelines
- HTML files: < 500 lines (split if larger)
- CSS files: < 1000 lines (consider modular approach)
- JS files: < 500 lines (split into modules)
- JSON files: < 100KB (paginate if larger)

## Comment Style

### HTML Comments
```html
<!-- === Header Section === -->
<header>...</header>

<!-- === Main Content === -->
<main>...</main>
```

### CSS Comments
```css
/* ========================================
   SECTION: Layout
   ======================================== */

/* Component: Navigation Bar */
.nav { ... }

/* State: Active navigation item */
.nav-item.active { ... }
```

### JavaScript Comments
```javascript
// === Data Loading ===

/**
 * Loads and parses curriculum data from JSON file
 * @async
 * @returns {Promise<Array>} Array of curriculum objects
 */
const loadData = async () => {
  // Fetch from local file
  const data = await fetch('./data/curriculum.json');

  // Parse and validate
  return data.json();
};

// === DOM Manipulation ===
// ... more code ...
```

### Markdown Comments
```markdown
<!-- This section describes the feature overview -->

## Feature Overview

<!-- TODO: Add architecture diagram -->
```

## Documentation Standards

### README Files
- **Purpose**: First section explaining what this is
- **Installation**: Clear steps to get started
- **Usage**: Examples of common operations
- **Contributing**: How to contribute (if applicable)
- **License**: License information

### Code Documentation
- Document public APIs
- Explain complex algorithms
- Provide usage examples
- Keep docs close to code

### Commit Messages
```
Type: Brief description (50 chars max)

Detailed explanation if needed. Wrap at 72 characters.
- Can use bullet points
- For multiple changes

Related: #123
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Examples**:
- `feat: Add curriculum filtering by difficulty`
- `fix: Correct data loading error handling`
- `docs: Update installation instructions`
- `refactor: Extract rendering logic to separate function`

## Constitutional Principles

From `.specify/memory/constitution.md`:

### 1. Single Responsibility
- Each file has one clear purpose
- Each function does one thing
- Each component is self-contained

### 2. Reproducible Builds
- No environment-specific code
- Clear dependencies
- Deterministic output

### 3. Minimal Dependencies
- Prefer vanilla JavaScript
- No unnecessary libraries
- Keep bundle size small

### 4. Accessibility First
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

### 5. Performance Budget
- Fast load times (< 1 second)
- Minimal JavaScript
- Optimized assets
- Efficient rendering

## Quality Checklist

### Before Committing
- [ ] Code follows style guide
- [ ] Functions are small and focused
- [ ] Variables have descriptive names
- [ ] Comments explain "why" not "what"
- [ ] No console.log statements (except error handling)
- [ ] No commented-out code
- [ ] Indentation is consistent
- [ ] Files end with newline

### Before Merging
- [ ] All tests pass (when tests exist)
- [ ] No linting errors
- [ ] Accessibility tested
- [ ] Performance acceptable
- [ ] Documentation updated
- [ ] Commit messages clear

### Before Deploying
- [ ] Production build successful
- [ ] Cross-browser tested
- [ ] Mobile responsive
- [ ] Load time < 1 second
- [ ] No console errors
- [ ] Assets optimized

## Editor Configuration

### VSCode Settings
Recommended settings in `.vscode/settings.json`:
```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

### EditorConfig
Create `.editorconfig`:
```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{html,css,js,json,md}]
indent_style = space
indent_size = 2
```

## Workflow Integration

### Speckit Compliance
- Follow templates in `.specify/templates/`
- Use standard frontmatter in markdown
- Maintain spec → plan → task traceability
- Adhere to constitution principles

### CCPM Compliance
- Use ISO 8601 datetime format
- Include frontmatter in all markdown files
- Follow path standards (relative paths only)
- Commit with `Issue #XXX:` prefix when applicable

## Anti-Patterns to Avoid

### JavaScript
- ❌ Global variables
- ❌ Inline event handlers in HTML
- ❌ Callback hell
- ❌ Silent failures
- ❌ Magic numbers

### CSS
- ❌ !important (except rare cases)
- ❌ Over-specific selectors
- ❌ Inline styles
- ❌ Undescriptive class names
- ❌ Non-responsive units (px for fonts)

### HTML
- ❌ Divitis (excessive divs)
- ❌ Non-semantic elements
- ❌ Missing alt attributes
- ❌ Inline styles/scripts
- ❌ Improper nesting

### General
- ❌ Premature optimization
- ❌ Over-engineering
- ❌ Duplicate code
- ❌ Tight coupling
- ❌ Missing error handling
