---
created: 2026-02-12T17:08:29Z
last_updated: 2026-02-12T17:08:29Z
version: 1.0
author: Claude Code PM System
---

# System Patterns & Architectural Decisions

## Architectural Style

### Static Web Application
- **Pattern**: Client-side only, no server
- **Data Flow**: One-way data flow from JSON to DOM
- **State Management**: Vanilla JavaScript variables
- **Rendering**: Direct DOM manipulation

### Separation of Concerns
- **HTML** (`index.html`): Structure and semantic markup
- **CSS** (`styles.css`): Presentation and layout
- **JavaScript** (`app.js`): Behavior and interactivity
- **Data** (`data/curriculum.json`): Content separate from code

## Design Patterns Observed

### Module Pattern (Implicit)
```javascript
// workout-site/app.js uses self-contained functions
// No global namespace pollution
// Functions encapsulated in IIFE or modules
```

### Data-Driven UI
- UI generated from JSON data
- Curriculum loaded from `data/curriculum.json`
- Template-like approach for rendering items

### Project Management Patterns

#### CCPM (Claude Code PM)
- **Pattern**: Spec-driven development
- **Workflow**: PRD → Epic → Tasks → Issues → Code
- **Execution**: Parallel agents in isolated worktrees/branches
- **Integration**: GitHub Issues as source of truth

#### Speckit Framework
- **Pattern**: Agent-driven workflow
- **Phases**: Specify → Plan → Tasks → Implement
- **Artifacts**: spec.md, plan.md, tasks.md
- **Governance**: Constitution-based (`.specify/memory/constitution.md`)

## Code Organization Patterns

### File Naming
- **Lowercase with dashes**: `curriculum.json`, `index.html`
- **Extension-based identification**: .html, .css, .js, .md, .json

### Directory Structure
- **Dotfiles for config**: `.claude/`, `.github/`, `.specify/`, `.vscode/`
- **Domain-based directories**: `workout-site/` for app code
- **Subdirectories for data**: `data/` within app directory

### Configuration Management
- **Layered configuration**:
  1. Global: `CLAUDE.md`
  2. System: `.claude/settings.*.json`
  3. Editor: `.vscode/settings.json`
  4. Project: `.specify/memory/constitution.md`

## Workflow Patterns

### Feature Development (Speckit)
1. **Specify** → Define requirements in `spec.md`
2. **Plan** → Create technical plan in `plan.md`
3. **Tasks** → Break down into tasks in `tasks.md`
4. **Implement** → Execute tasks
5. **Validate** → Analyze consistency

### Project Management (CCPM)
1. **Brainstorm** → Create PRD
2. **Parse** → Generate Epic
3. **Decompose** → Break into tasks
4. **Sync** → Push to GitHub Issues
5. **Execute** → Parallel agent implementation

### Git Workflow
- **Branching**: `epic/{name}` for features
- **Commits**: `Issue #{number}: {description}`
- **Coordination**: Multiple agents via git commits
- **Integration**: Merge epic branches back to main

## Data Flow Patterns

### Static Data Loading
```
curriculum.json → fetch() → parse JSON → render DOM
```

### Unidirectional Flow
1. Load data from JSON file
2. Process/transform if needed
3. Render to DOM
4. User interaction updates DOM
5. No data persistence (stateless)

## Error Handling Patterns

### Graceful Degradation
- No error boundaries currently implemented
- Browser handles JavaScript errors
- Recommendation: Add try-catch for data loading

### Validation
- No input validation currently
- No data schema validation
- Recommendation: Add JSON schema validation

## Testing Patterns

### Current State
- No automated tests
- Manual browser testing

### Recommended Patterns
- **Unit Tests**: Test data transformations
- **Integration Tests**: Test component rendering
- **E2E Tests**: Test user workflows

## Performance Patterns

### Current Optimizations
- Direct file loading (no build step)
- Minimal JavaScript (lightweight)
- No heavy frameworks

### Potential Optimizations
- Image optimization (if images added)
- CSS minification (for production)
- JavaScript bundling (if complexity grows)
- Lazy loading (for larger datasets)

## Security Patterns

### Current Security
- No user input → No injection risks
- Static content → No server vulnerabilities
- Local data → No API security concerns

### Considerations
- If adding forms: Sanitize inputs
- If adding API: Use HTTPS, validate responses
- If adding auth: Use OAuth2/JWT properly

## Scalability Patterns

### Current Limitations
- Single-page app
- Client-side rendering only
- No state persistence
- Limited to small datasets

### Scaling Strategies
- **Horizontal**: Multiple pages/routes
- **Vertical**: Add build system, framework
- **Data**: API integration, database
- **State**: Add state management library

## Integration Patterns

### GitHub Integration
- **Issues as Database**: GitHub Issues store project state
- **Comments as Audit Trail**: Progress tracked in comments
- **Labels for Organization**: `epic:*`, `task:*` labels
- **Parent-Child Relationships**: via gh-sub-issue extension

### Agent Coordination
- **File-based Parallelism**: Agents work on different files
- **Git for Sync**: Commits communicate progress
- **Progress Files**: `stream-*.md` for status updates
- **Analysis Files**: `{issue}-analysis.md` defines boundaries

## Constitutional Patterns

From `.specify/memory/constitution.md`:
- **Single Responsibility**: Static web app only
- **Reproducible Builds**: One command builds entire app
- **Automated CI**: All changes pass checks
- **Minimal Dependencies**: Keep surface area small
- **Accessibility First**: Meet a11y standards
- **Performance Budget**: Fast load times

## Antipatterns to Avoid

### Identified Risks
- ❌ **Global variables**: Pollute namespace
- ❌ **Inline styles**: Mix presentation with structure
- ❌ **Callback hell**: Deep nesting of async code
- ❌ **Tight coupling**: Components depend on each other
- ❌ **No error handling**: Silent failures

### Best Practices Adopted
- ✅ **Separation of concerns**: HTML/CSS/JS separate
- ✅ **Data-driven**: Content in JSON, not hardcoded
- ✅ **Modular code**: Functions focused on single tasks
- ✅ **Documented workflow**: Clear process in CLAUDE.md
- ✅ **Version control**: Git for all changes
