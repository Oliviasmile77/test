---
name: Watchlist System
status: open
created: 2026-02-12T18:31:10Z
updated: 2026-02-12T18:31:10Z
github: [Will be updated when synced to GitHub]
depends_on: []
parallel: true
conflicts_with: []
---

# Task: Watchlist System

## Description
Build a comprehensive watchlist system including a Dashboard widget for quick access, a creation/management flow for organizing symbols, and cross-platform synchronization to ensure watchlists are consistent across web and mobile. Users should be able to create, edit, delete, and organize multiple watchlists with real-time symbol data.

## Acceptance Criteria
- [ ] Dashboard watchlist widget displays user's primary watchlist with real-time prices
- [ ] Users can create new watchlists with custom names
- [ ] Users can add/remove symbols from watchlists
- [ ] Users can reorder symbols within a watchlist via drag-and-drop
- [ ] Watchlists sync across devices in real-time
- [ ] Watchlist data persists in backend database
- [ ] Users can switch between multiple watchlists in Dashboard widget
- [ ] Watchlist changes trigger real-time updates without page refresh

## Technical Details
- Create Dashboard widget component for watchlist display
- Implement watchlist management UI (modal or dedicated page)
- Build backend API endpoints for CRUD operations on watchlists
- Implement WebSocket subscription for real-time symbol price updates
- Add database schema for watchlists (user_id, watchlist_name, symbols array, order)
- Integrate with existing symbol data service for price feeds
- Key files: `src/components/Dashboard/WatchlistWidget/`, `src/pages/Watchlist/`, `src/api/watchlist/`, backend models
- Consider using drag-and-drop library (react-beautiful-dnd or similar)

## Dependencies
- [ ] No dependencies - independent Dashboard feature

## Effort Estimate
- Size: L
- Hours: 24-32 hours
- Parallel: true

## Definition of Done
- [ ] Code implemented
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Deployed to staging
