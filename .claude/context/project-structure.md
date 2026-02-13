---
created: 2026-02-12T17:08:29Z
last_updated: 2026-02-12T17:08:29Z
version: 1.0
author: Claude Code PM System
---

# Project Structure

## Root Directory Layout

```
/Users/ojiang/TEST/
├── .claude/              # Claude Code PM system
├── .github/              # Speckit agents and GitHub config
├── .specify/             # Speckit framework files
├── .vscode/              # VSCode configuration
├── CLAUDE.md             # Project guidance for Claude
└── workout-site/         # Demo static web application
```

## Detailed Directory Breakdown

### `.claude/` - Claude Code PM System
```
.claude/
├── agents/               # Specialized agents
│   ├── test-runner.md
│   ├── code-analyzer.md
│   └── parallel-worker.md
├── commands/             # Command implementations
│   ├── context/          # Context management commands
│   ├── pm/               # Project management commands
│   └── testing/          # Test execution commands
├── context/              # Project-wide context files
│   └── README.md
├── epics/                # Local epic workspace (gitignored)
├── hooks/                # Git hooks and automation
├── prds/                 # Product requirements documents
├── rules/                # Standard patterns
│   ├── worktree-operations.md
│   ├── standard-patterns.md
│   ├── github-operations.md
│   ├── frontmatter-operations.md
│   ├── datetime.md
│   ├── path-standards.md
│   ├── agent-coordination.md
│   ├── strip-frontmatter.md
│   ├── test-execution.md
│   └── branch-operations.md
├── scripts/              # Utility scripts
│   └── pm/               # PM-related scripts
└── settings.*.json       # Configuration files
```

### `.github/` - Speckit Agents
```
.github/
├── agents/               # Agent definitions for Speckit commands
└── prompts/              # Prompt templates for agents
```

### `.specify/` - Speckit Framework
```
.specify/
├── memory/
│   └── constitution.md   # Project constitution
├── scripts/
│   └── powershell/       # PowerShell automation scripts
└── templates/            # Templates for specs, plans, tasks
```

### `.vscode/` - Editor Configuration
```
.vscode/
└── settings.json         # VSCode-specific settings
```

### `workout-site/` - Demo Application
```
workout-site/
├── index.html            # Main HTML file
├── styles.css            # Stylesheet
├── app.js                # Application JavaScript
├── spec.md               # Feature specification
└── data/
    └── curriculum.json   # Mock workout data
```

## File Organization Patterns

### Naming Conventions
- **Markdown files**: kebab-case (e.g., `project-structure.md`)
- **Config files**: lowercase with extensions (e.g., `settings.json`)
- **Directories**: kebab-case or lowercase (e.g., `.claude/`, `workout-site/`)

### Module Organization
- **CCPM System**: All project management tools in `.claude/`
- **Speckit System**: Workflow framework in `.github/` and `.specify/`
- **Application Code**: Demo app in `workout-site/`
- **Documentation**: Root-level CLAUDE.md plus context in `.claude/context/`

### Configuration Hierarchy
1. **Project-level**: CLAUDE.md (guidance for all work)
2. **System-level**: `.claude/settings.*.json` (CCPM configuration)
3. **Editor-level**: `.vscode/settings.json` (VSCode-specific)
4. **App-level**: workout-site/spec.md (feature specifications)

## Key Directories Purpose

| Directory | Purpose | Managed By |
|-----------|---------|------------|
| `.claude/` | Project management and context | CCPM |
| `.github/` | CI/CD and Speckit agents | Speckit |
| `.specify/` | Workflow templates and scripts | Speckit |
| `.vscode/` | Editor configuration | Developer |
| `workout-site/` | Demo application | Developer |

## Important Paths

- **Project Root**: `/Users/ojiang/TEST/`
- **Context Files**: `.claude/context/`
- **PM Commands**: `.claude/commands/pm/`
- **Rules**: `.claude/rules/`
- **Demo App**: `workout-site/`
- **Constitution**: `.specify/memory/constitution.md`

## .gitignore Considerations

Recommended additions to .gitignore:
```
.claude/epics/          # Local epic workspaces
.claude/settings.local.json  # May contain local config
```
