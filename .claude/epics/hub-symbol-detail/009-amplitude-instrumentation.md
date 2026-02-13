---
name: Amplitude Instrumentation
status: open
created: 2026-02-12T18:31:10Z
updated: 2026-02-12T18:31:10Z
github: [Will be updated when synced to GitHub]
depends_on: [001, 002, 003, 004, 005, 006, 007, 008]
parallel: false
conflicts_with: []
---

# Task: Amplitude Instrumentation

## Description
Implement comprehensive Amplitude analytics instrumentation across all features in the hub-symbol-detail epic. Define a consistent event taxonomy, track user interactions, feature usage, and performance metrics. Validate end-to-end event flow from client to Amplitude dashboard to ensure accurate analytics data collection.

## Acceptance Criteria
- [ ] Event taxonomy documented with naming conventions and parameters
- [ ] Symbol Detail events tracked (view, interactions, tab switches)
- [ ] Portfolio Selector events tracked (selection, creation, navigation)
- [ ] Watchlist events tracked (add/remove symbols, reordering)
- [ ] Recent Trades events tracked (views, filters, interactions)
- [ ] Dashboard Onboarding events tracked (checklist progress, tile clicks)
- [ ] Navigation events tracked (route changes, context retention)
- [ ] End-to-end testing validates events appear in Amplitude
- [ ] Error tracking implemented for failed analytics calls

## Technical Details
**Event Taxonomy Structure:**
```typescript
// Core events
'Symbol Detail Viewed'
'Portfolio Selected'
'Watchlist Symbol Added'
'Trade History Viewed'
'Onboarding Action Completed'
'Navigation Context Changed'

// Event properties (standardized)
{
  portfolioId: string
  symbol: string
  source: string (e.g., 'dashboard', 'search', 'watchlist')
  timestamp: ISO string
  userId: string
  sessionId: string
}
```

**Implementation Files:**
- `src/analytics/amplitude.ts` - Amplitude SDK initialization and wrapper
- `src/analytics/events.ts` - Event taxonomy definitions
- `src/analytics/trackEvent.ts` - Event tracking helper
- `src/hooks/useAnalytics.ts` - Analytics hook for components
- `src/utils/errorTracking.ts` - Analytics error handler

**Events to Implement:**
1. **Symbol Detail:** view, tab_switch, chart_interaction, news_click
2. **Portfolio Selector:** opened, selected, created, switched
3. **Watchlist:** symbol_added, symbol_removed, reordered, viewed
4. **Recent Trades:** viewed, filtered, export_clicked
5. **Onboarding:** checklist_opened, tile_clicked, step_completed, dismissed
6. **Navigation:** route_changed, context_restored, deep_link_opened

**Testing:**
- Create test suite with mock Amplitude SDK
- Validate event payloads match schema
- End-to-end test: trigger events → verify in Amplitude dashboard
- Load testing: ensure high-volume event handling

## Dependencies
- [ ] Task 001 - Symbol Detail implementation
- [ ] Task 002 - Portfolio Selector implementation
- [ ] Task 003 - Watchlist implementation
- [ ] Task 004 - Recent Trades implementation
- [ ] Task 005 - Advanced Charting implementation
- [ ] Task 006 - Portfolio Analytics Dashboard implementation
- [ ] Task 007 - Dashboard Onboarding implementation
- [ ] Task 008 - Navigation & State Management implementation

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
