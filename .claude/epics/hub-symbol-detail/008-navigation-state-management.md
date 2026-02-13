---
name: Navigation & State Management
status: open
created: 2026-02-12T18:31:10Z
updated: 2026-02-12T18:31:10Z
github: [Will be updated when synced to GitHub]
depends_on: [001]
parallel: false
conflicts_with: []
---

# Task: Navigation & State Management

## Description
Implement comprehensive navigation and state management to ensure portfolio context is retained across routes. Users should maintain their portfolio selection, Symbol Detail state, and view preferences when navigating between pages. State persistence should use both session storage (temporary) and localStorage (permanent) based on data type.

## Acceptance Criteria
- [ ] Portfolio context persists when navigating from Dashboard → Symbol Detail → back
- [ ] Selected symbol and portfolio maintained in Symbol Detail across route changes
- [ ] Routing properly handles portfolio ID and symbol parameters
- [ ] Session storage used for temporary navigation state
- [ ] LocalStorage used for user preferences and recent selections
- [ ] Back button behavior works correctly across all routes
- [ ] Deep linking to Symbol Detail with parameters works correctly

## Technical Details
**State Management:**
- Create `PortfolioContext` using React Context API
- Implement custom hooks: `usePortfolio()`, `useSymbolDetail()`
- Session storage for: current portfolio, active symbol, navigation history
- LocalStorage for: preferred portfolio, recent symbols, view preferences

**Routing Structure:**
```
/dashboard
/portfolio/:portfolioId
/portfolio/:portfolioId/symbol/:symbol
/analytics
```

**Key Files:**
- `src/context/PortfolioContext.tsx` - Portfolio state management
- `src/context/NavigationContext.tsx` - Navigation history tracking
- `src/hooks/usePortfolio.ts` - Portfolio selection hook
- `src/hooks/useNavigation.ts` - Navigation helper hook
- `src/utils/sessionStorage.ts` - Session storage utilities
- `src/utils/localStorage.ts` - LocalStorage utilities
- `src/routes/index.tsx` - Route configuration

**Dependencies:**
- Requires Symbol Detail component structure from Task 001

## Dependencies
- [ ] Task 001 (Symbol Detail) - needs route and component structure

## Effort Estimate
- Size: M
- Hours: 16-24 hours
- Parallel: false

## Definition of Done
- [ ] Code implemented
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Deployed to staging
