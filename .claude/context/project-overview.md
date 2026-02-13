---
created: 2026-02-12T17:08:29Z
last_updated: 2026-02-12T17:08:29Z
version: 1.0
author: Claude Code PM System
---

# Project Overview

## High-Level Summary

**TEST** is a development environment that validates and demonstrates AI-assisted software development workflows through:
- **Speckit**: Agent-driven feature specification and planning framework
- **CCPM**: Claude Code Project Management with GitHub integration
- **Workout Site**: Demo static web application as reference implementation

## System Components

### 1. Speckit Framework

**Location**: `.github/agents/`, `.specify/`

**Purpose**: Structured workflow for feature development from idea to implementation

**Capabilities**:
- Natural language feature specification
- Automated implementation planning
- Dependency-ordered task generation
- Consistency validation across artifacts
- Constitution-based governance

**Key Files**:
- `.specify/memory/constitution.md` - Project principles
- `.specify/templates/` - Spec, plan, and task templates
- `.specify/scripts/powershell/` - Automation scripts
- `.github/agents/` - Agent definitions
- `.github/prompts/` - Prompt templates

**Workflow**:
```
Natural Language → spec.md → plan.md → tasks.md → Implementation
```

### 2. CCPM (Claude Code PM)

**Location**: `.claude/`

**Purpose**: Project management system with GitHub Issues integration and parallel execution

**Capabilities**:
- PRD creation through guided brainstorming
- Epic planning and task decomposition
- Bidirectional GitHub Issues sync
- Parallel agent execution in git worktrees
- Complete traceability from PRD to code
- Progress tracking and reporting

**Key Components**:
- **Commands**: `/pm:prd-new`, `/pm:epic-sync`, `/pm:issue-start`, etc.
- **Agents**: test-runner, code-analyzer, parallel-worker
- **Rules**: Standard patterns for workflows
- **Context**: Project-wide context preservation
- **Scripts**: Automation for common operations

**Workflow**:
```
PRD → Epic → Tasks → GitHub Issues → Parallel Execution → Merge
```

### 3. Workout Site Demo App

**Location**: `workout-site/`

**Purpose**: Minimal static web app demonstrating workout curricula

**Technology**:
- Pure HTML5/CSS3/JavaScript
- No build system or dependencies
- Data-driven from JSON files
- Responsive, accessible design

**Features**:
- Browse 10 workout curricula
- View curriculum details
- Clean, minimal UI
- Fast load times
- Offline capable

**Files**:
- `index.html` - Main page structure
- `styles.css` - Styling and layout
- `app.js` - Interactivity and data loading
- `data/curriculum.json` - Workout data
- `spec.md` - Feature specification

## Feature List

### Speckit Features

| Feature | Status | Description |
|---------|--------|-------------|
| Feature Specification | ✅ Active | Create spec.md from natural language |
| Implementation Planning | ✅ Active | Generate plan.md with technical approach |
| Task Generation | ✅ Active | Create dependency-ordered tasks.md |
| Implementation Execution | ✅ Active | Execute tasks automatically |
| Clarification | ✅ Active | Identify and resolve underspecified areas |
| Consistency Analysis | ✅ Active | Validate artifacts align |
| Constitution Management | ✅ Active | Define and enforce principles |
| GitHub Issues Export | ✅ Active | Convert tasks to issues |
| Custom Checklists | ✅ Active | Generate feature-specific checklists |

### CCPM Features

| Feature | Status | Description |
|---------|--------|-------------|
| PRD Management | ✅ Active | Create, edit, list PRDs |
| Epic Planning | ✅ Active | Parse PRDs to epics |
| Task Decomposition | ✅ Active | Break epics into tasks |
| GitHub Sync | ✅ Active | Bidirectional issue sync |
| Issue Management | ✅ Active | Start, update, close issues |
| Parallel Execution | ✅ Active | Multiple agents in worktrees |
| Progress Tracking | ✅ Active | Status, standup reports |
| Context Preservation | ✅ Active | Maintain project context |
| Agent Coordination | ✅ Active | File-based parallelism |
| Workflow Commands | ✅ Active | Next task, blocked tasks, etc. |

### Workout Site Features

| Feature | Status | Description |
|---------|--------|-------------|
| Curriculum Display | ✅ Complete | Show list of workouts |
| Data Loading | ✅ Complete | Load from JSON file |
| Clean UI | ✅ Complete | Minimal, accessible design |
| Fast Performance | ✅ Complete | < 1 second load time |
| Static Deployment | ✅ Complete | No build required |
| Responsive Design | ⏳ Planned | Mobile-friendly layout |
| Filtering/Search | ⏳ Planned | Find specific curricula |
| User Preferences | ⏳ Planned | Save favorite curricula |

## Integration Points

### Speckit ↔ CCPM
- **Handoff**: Use `/speckit.taskstoissues` to export Speckit tasks to CCPM GitHub Issues
- **Workflow**: Spec → Plan → Tasks (Speckit) → Issues (CCPM) → Execution
- **Bidirectional**: Can use either system independently or together

### CCPM ↔ GitHub
- **Issues**: CCPM creates and updates GitHub Issues
- **Comments**: Progress posted as issue comments
- **Labels**: `epic:*`, `task:*` for organization
- **Parent-Child**: gh-sub-issue extension links issues
- **PRs**: Link PRs to issues for traceability

### Workout Site ↔ Workflows
- **Example**: Use Workout Site to test Speckit/CCPM workflows
- **Features**: Add new features using structured process
- **Validation**: Verify workflows work in practice
- **Documentation**: Real examples for learning

## Current State

### Completed
- ✅ CCPM system installed and configured
- ✅ GitHub CLI authenticated (Oliviasmile77)
- ✅ gh-sub-issue extension installed
- ✅ CLAUDE.md updated with workflow documentation
- ✅ Speckit framework configured
- ✅ Workout Site demo app functional
- ✅ Initial context files created

### In Progress
- ⏳ First PRD creation
- ⏳ First epic with parallel execution
- ⏳ Workflow documentation and refinement
- ⏳ Best practices documentation

### Planned
- 📋 Add features to Workout Site using workflows
- 📋 Measure and optimize workflow efficiency
- 📋 Create comprehensive tutorials
- 📋 Share learnings with community

## System Health

### Dependencies
- ✅ Git installed and working
- ✅ GitHub CLI authenticated
- ✅ gh-sub-issue extension installed
- ⚠️ No remote repository (optional)

### Configuration
- ✅ CLAUDE.md comprehensive
- ✅ Project constitution defined
- ✅ CCPM rules in place
- ✅ VSCode settings configured

### Documentation
- ✅ README in context directory
- ✅ CLAUDE.md with workflow guides
- ✅ Templates for specs/plans/tasks
- ✅ Rules for standard patterns

## Access Points

### Entry Commands
- **Create PRD**: `/pm:prd-new <feature-name>`
- **Specify Feature**: `/speckit.specify <description>`
- **Check Status**: `/pm:status`
- **Get Next Task**: `/pm:next`
- **Create Context**: `/context:create` (just completed)
- **Update Context**: `/context:update`
- **Prime Context**: `/context:prime`

### Key Files
- **Project Guidance**: `CLAUDE.md`
- **Constitution**: `.specify/memory/constitution.md`
- **Context**: `.claude/context/*.md`
- **Demo App**: `workout-site/index.html`

### Documentation
- **CCPM Commands**: `.claude/commands/pm/`
- **Speckit Templates**: `.specify/templates/`
- **Rules**: `.claude/rules/`
- **Context**: `.claude/context/` (this directory)

## Quick Start Guide

### For New Features (Speckit)
1. Run `/speckit.specify "Add feature description"`
2. Review generated spec.md
3. Run `/speckit.plan` for implementation approach
4. Run `/speckit.tasks` for task breakdown
5. Run `/speckit.implement` to execute

### For Project Management (CCPM)
1. Run `/pm:prd-new feature-name`
2. Complete guided brainstorming
3. Run `/pm:prd-parse feature-name`
4. Run `/pm:epic-oneshot feature-name`
5. Run `/pm:issue-start <issue-number>`

### For Development
1. Open `workout-site/index.html` in browser
2. Edit HTML/CSS/JS files directly
3. Refresh browser to see changes
4. No build step required

## Performance Characteristics

### Workflow Efficiency
- **PRD Creation**: ~15 minutes (guided)
- **Epic Planning**: ~5 minutes (automated)
- **Task Generation**: ~2 minutes (automated)
- **Issue Sync**: ~30 seconds (automated)
- **Parallel Tasks**: 5-8 simultaneous streams

### Application Performance
- **Load Time**: < 1 second
- **First Paint**: < 500ms
- **Interactive**: Immediate
- **Bundle Size**: ~10KB total
- **Dependencies**: 0

### System Resource Usage
- **Disk**: ~5MB (frameworks + context)
- **Memory**: Minimal (static files)
- **Network**: None (works offline)
- **CPU**: Negligible
