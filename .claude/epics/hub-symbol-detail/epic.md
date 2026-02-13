---
name: hub-symbol-detail
status: backlog
created: 2026-02-12T18:15:45Z
progress: 0%
prd: .claude/prds/hub-symbol-detail.md
github: [Will be updated when synced to GitHub]
---

# Epic: HUB Symbol Detail

## Overview

Build an integrated Symbol Detail view that provides portfolio-centric trading workflows by unifying charts, options chains, and fundamental data within HUB's existing React architecture. This implementation leverages DXCharts for charting parity with TITAN X, extends existing trade ticket and positions components, and integrates cross-platform watchlist sync infrastructure to create a seamless browser-based trading experience.

**Key Technical Objectives:**
- Extend HUB's existing React shell with tabbed Symbol Detail interface (Overview, Chart, Options Chain)
- Integrate DXCharts library for TITAN X-parity charting with < 500ms streaming latency
- Build performant Options Chain renderer (≤ 2.0s load time at p95) with real-time Greeks calculations
- Implement cross-platform sync for watchlists and custom grouping via existing sync APIs
- Maintain portfolio context through persistent state management and navigation architecture

## Architecture Decisions

### 1. Frontend Architecture

**Decision: Extend existing HUB React shell with modular tab-based components**

*Rationale:* PRD constraint states "existing React shell can handle three heavy sub-tabs (Overview, Chart, Options Chain) without performance degradation." This validates building within the current architecture rather than creating a separate micro-frontend.

**Technical Approach:**
- **Component Structure**: Create `SymbolDetailView` as container component with three lazy-loaded tab components: `OverviewTab`, `ChartTab`, `OptionsChainTab`
- **State Management**: Use React Context API for shared symbol context (current symbol, position data, account selection) + local component state for tab-specific data
- **Routing**: Extend existing React Router with `/symbol/:ticker` route that preserves query params for portfolio context breadcrumbs
- **Code Splitting**: Lazy-load heavy components (DXCharts, Options Chain grid) to optimize initial page load

### 2. DXCharts Integration

**Decision: Wrap DXCharts library with React adapter component and leverage existing TITAN X configuration**

*Rationale:* PRD assumes "DXCharts is expected to cover every charting capability, study, overlay, and performance target that TITAN X offers today." This means reusing existing DXCharts config rather than building from scratch.

**Technical Approach:**
- **Reuse TITAN X DXCharts Config**: Import study/overlay definitions, default parameters, and rendering settings from TITAN X codebase
- **React Wrapper Component**: Create `DXChartsWrapper` that handles chart lifecycle (mount/unmount), WebSocket subscriptions for real-time data, and study persistence
- **Chart Trading Integration**: Extend existing trade ticket component to accept chart-triggered events (price clicks, drawing objects as order anchors)
- **Performance**: Use WebWorker for heavy study calculations to avoid blocking main thread

### 3. Options Chain Performance

**Decision: Implement virtualized grid with server-side Greeks calculations and aggressive caching**

*Rationale:* NFR-1 requires ≤ 2.0s load time at p95. Options chains can have 200+ strikes. Rendering all at once would exceed performance budget.

**Technical Approach:**
- **Virtualized Scrolling**: Use `react-window` for virtualized grid rendering (only render visible rows)
- **Server-Side Greeks**: Calculate Delta, Gamma, Theta, Vega on backend (reuse existing TITAN X Greeks calculation service)
- **Aggressive Caching**: Cache options chain data for 5 seconds; refresh only on user action or significant price move (> 0.5%)
- **Incremental Updates**: Use WebSocket for real-time quote updates; batch update visible rows only

### 4. Cross-Platform Sync

**Decision: Leverage existing Watchlist API and Custom Grouping API with optimistic UI updates**

*Rationale:* PRD dependencies list "Watchlist API (CRUD operations, cross-platform sync)" and "Custom Grouping API (configuration persistence, cross-platform sync)" as existing infrastructure.

**Technical Approach:**
- **Optimistic Updates**: Update local state immediately on user action; show sync status indicator while backend propagates to TITAN X/Mobile
- **Conflict Resolution**: Use last-write-wins with server timestamp for concurrent edits across platforms
- **Sync Polling**: Poll sync status every 10 seconds to detect changes from other platforms; update UI with notification banner
- **Offline Support**: Queue local changes in IndexedDB; sync when connection restored

### 5. State Persistence

**Decision: Use session storage for intra-session state + localStorage for cross-session preferences**

*Rationale:* PRD requires trade ticket state, chart settings, and column preferences to persist across navigation and sessions.

**Technical Approach:**
- **Session Storage**: Symbol context, tab selection, trade ticket open/closed state (cleared on logout)
- **LocalStorage**: Chart study selections, options chain column settings, watchlist column customization (persists across sessions)
- **State Hydration**: On component mount, check session/local storage and hydrate state before rendering

## Technical Approach

### Frontend Components

**1. Symbol Detail Container (`SymbolDetailView`)**
- Manages symbol context (current symbol, position data, account selection)
- Handles navigation from entry points (Dashboard watchlist, Positions page, Orders page, symbol search)
- Provides top navigation bar and account summary bar (buying power, portfolio P&L)
- Lazy-loads tab components on user interaction

**2. Overview Tab (`OverviewTab`)**
- **Market Snapshot Widget**: Real-time quote display (Last, Bid, Ask, Change%, Volume) via WebSocket subscription
- **Position Card**: Fetch position data from Positions API; calculate real-time P&L from average cost + current price
- **Fundamentals Panel**: Server-side rendered component; fetch from Market Data API on symbol change
- **News Feed**: Infinite scroll list; fetch from Market Data API with pagination
- **Earnings Calendar & Analyst Ratings**: Standalone widgets with lazy-loading

**3. Chart Tab (`ChartTab`)**
- **DXCharts Wrapper**: React component wrapping DXCharts library instance
- **Study Selector**: Dropdown UI for selecting studies/overlays; persist selections to localStorage
- **Chart Trading Controls**: Hooks into chart click events; triggers trade ticket with price anchor
- **Position Overlay**: Visual indicator on chart showing current position entry price and P&L

**4. Options Chain Tab (`OptionsChainTab`)**
- **Virtualized Grid**: `react-window` grid rendering calls/puts with sortable columns
- **Strategy Dropdown**: Preset multi-leg strategies (vertical, butterfly, condor, iron condor); auto-populate trade ticket on selection
- **Greeks Display**: Server-calculated Greeks (Delta, Gamma, Theta, Vega, IV%) with real-time updates
- **Position Highlighting**: Visually distinguish held strikes; display aggregate portfolio Greeks at top
- **Column Customization**: Sortable, resizable columns with preferences saved to localStorage

**5. Trade Ticket Integration**
- **Unified Ticket Component**: Extend existing HUB trade ticket to accept context from all three tabs
- **State Persistence**: Maintain open/closed state in session storage; survive symbol changes and navigation
- **Account Sync**: Sync to top-level account selection unless explicitly changed by user
- **Order Validation**: Client-side validation + server-side validation via Orders API

**6. Watchlist System**
- **Dashboard Watchlist Widget**: Real-time quote grid on post-funding Dashboard
- **Watchlist Creation Flow**: Modal with symbol search and add functionality
- **Cross-Platform Sync**: Optimistic UI updates + polling for changes from TITAN X/Mobile
- **Hotlists**: Server-side generated lists (top movers, trending symbols) rendered as separate widget

**7. Custom Grouping (Flex View)**
- **Positions Page Enhancement**: Add grouping selector dropdown to existing Positions view
- **Grouping UI**: Expand/collapse groups with aggregate P&L and Greeks per group
- **Mobile Parity**: Match Mobile Flex-View layout, labels, and sort behavior
- **Sync**: Fetch groupings from Custom Grouping API; persist changes cross-platform

**8. Dashboard Enhancements**
- **Getting Started Checklist**: Post-funding banner with tiles (Create Watchlist, Download Mobile, Download TITAN X, Educational Video, Explore Symbol Detail)
- **Tile Actions**: Direct links to app stores, video modal, Symbol Detail navigation
- **Progress Tracking**: Store completion state in backend; display checkmarks for completed tasks
- **Dismissal**: Allow user to collapse checklist; persist preference to backend

### Backend Services

**Leverage Existing APIs (No New Services Required):**
- **Positions API**: Real-time position data across platforms
- **Orders API**: Order placement, validation, status tracking
- **Market Data API**: Quotes, fundamentals, news, options chain, Greeks calculations
- **Watchlist API**: CRUD operations, cross-platform sync
- **Custom Grouping API**: Configuration persistence, cross-platform sync

**Minor Backend Enhancements:**
- **Greeks Calculation Service**: Ensure existing TITAN X Greeks service is accessible to HUB backend; add caching layer (5-second TTL) to reduce computation overhead
- **Options Chain Endpoint**: Add pagination support to existing options chain API for virtualized rendering

### Infrastructure

**Deployment:**
- Deploy as part of existing HUB React app (no separate deployment)
- Feature flag: `hub_symbol_detail_enabled` to control rollout
- Progressive rollout: 5% → 25% → 50% → 100% over 2-week period

**Performance:**
- **CDN**: DXCharts library assets served from CDN for fast load times
- **WebSocket Connection Pooling**: Reuse existing HUB WebSocket connections for real-time quotes
- **Monitoring**: Add DataDog RUM instrumentation for client-side performance metrics (page load time, chart render time, options chain load time)

**Scalability:**
- **Horizontal Scaling**: Existing HUB backend scales horizontally via Kubernetes
- **Database**: Leverage existing Postgres replicas for read-heavy operations (watchlists, custom groupings)
- **Caching**: Redis cache for options chain data, Greeks calculations, fundamental data (5-second TTL)

## Implementation Strategy

### Phase 1: Foundation (Weeks 1-2)
- Set up Symbol Detail routing and container component
- Implement basic Overview tab with market snapshot, position card, and fundamentals
- Integrate existing trade ticket component with Symbol Detail context

### Phase 2: Charting (Weeks 3-4)
- Integrate DXCharts library and create React wrapper
- Implement chart trading with price anchoring and order visualization
- Add study selector and persistence logic

### Phase 3: Options Chain (Weeks 5-6)
- Build virtualized options chain grid with sortable columns
- Integrate Greeks calculations from backend service
- Implement strategy presets and multi-leg ticket auto-population
- Add position highlighting and portfolio Greeks summary

### Phase 4: Cross-Platform Features (Weeks 7-8)
- Implement watchlist creation flow and Dashboard widget
- Build Custom Grouping (Flex View) UI in Positions page
- Integrate cross-platform sync APIs with optimistic updates

### Phase 5: Onboarding & Polish (Weeks 9-10)
- Build Getting Started Checklist with tile actions
- Implement state persistence (session storage, localStorage)
- Add responsive layout support (desktop, tablet, mobile-web redirects)
- Performance optimization and caching

### Phase 6: Analytics & Launch (Weeks 11-12)
- Implement Amplitude event taxonomy (instrument all user actions)
- Conduct performance testing (load time, streaming latency)
- QA and bug fixes
- Progressive rollout with feature flag

## Task Breakdown Preview

High-level task categories that will be created (10 tasks total):

- [x] **Task 1: Symbol Detail Core UI** - Build tabbed interface (Overview, Chart, Options Chain) with routing, navigation, and account summary bar
- [ ] **Task 2: DXCharts Integration** - Integrate DXCharts library, implement chart trading, study selector, and position overlay
- [ ] **Task 3: Options Chain Implementation** - Build virtualized grid, integrate Greeks, implement strategy presets and position highlighting
- [ ] **Task 4: Trade Ticket Integration** - Extend trade ticket for Symbol Detail context, implement state persistence across tabs
- [ ] **Task 5: Watchlist System** - Build Dashboard watchlist widget, creation flow, and cross-platform sync
- [ ] **Task 6: Custom Grouping (Flex View)** - Implement grouping UI in Positions page with Mobile parity and sync
- [ ] **Task 7: Dashboard Onboarding** - Build Getting Started Checklist with tile actions and progress tracking
- [ ] **Task 8: Navigation & State Management** - Implement portfolio context retention, routing, and session/local storage persistence
- [ ] **Task 9: Amplitude Instrumentation** - Implement event taxonomy for all features and test end-to-end
- [ ] **Task 10: Performance Optimization & Testing** - Optimize options chain load time, chart streaming, quote latency; conduct QA and load testing

## Dependencies

### External Dependencies
- **DXCharts Library**: Charting engine with TITAN X parity (provided by TITAN X team)
- **Market Data Feeds**: Real-time quotes, news, fundamentals, earnings, analyst ratings (existing data provider contracts)
- **Options Data Feeds**: Greeks, IV, top-of-book options data (existing data provider contracts)

### Internal Dependencies
- **Positions API**: Real-time position data (existing HUB backend service)
- **Orders API**: Order placement and validation (existing HUB backend service)
- **Market Data API**: Quotes, fundamentals, news, options chain (existing HUB backend service)
- **Watchlist API**: CRUD and cross-platform sync (existing cross-platform service)
- **Custom Grouping API**: Configuration persistence and sync (existing cross-platform service)
- **TradeStation SSO**: Authentication and session management (existing auth service)
- **Amplitude**: Analytics instrumentation (existing contract)

### Team Dependencies
- **Product Management**: Define and maintain Amplitude taxonomy in Airtable
- **Product Data Insights**: Create Amplitude dashboards for adoption metrics
- **Marketing**: Website updates, email campaigns, in-app banners
- **Customer Learning**: Create KB articles, explainer video, in-app guided tour
- **Customer Support**: Platform demo webinar and knowledge transfer
- **Legal/Compliance**: Feature reviews and RedOak screenshot submission

### Risk Mitigation
- **DXCharts Integration Risk**: TITAN X team to provide DXCharts config and support; allocate 1 week buffer in Phase 2
- **Performance Risk**: Conduct load testing in Phase 5; have fallback plan to reduce options chain strikes displayed (e.g., 100 strikes instead of 200)
- **Cross-Platform Sync Risk**: Watchlist/Custom Grouping APIs are existing services; if sync latency exceeds 1 minute, add polling frequency tuning

## Success Criteria (Technical)

### Performance Benchmarks
- **Options Chain Load Time**: ≤ 2.0 seconds at p95 (measured from API request to grid render complete)
- **Real-Time Quote Latency**: < 1 second from exchange to UI update (measured via DataDog RUM)
- **Chart Streaming Latency**: < 500ms for intraday candles (measured via WebSocket message timestamp)
- **Watchlist Sync**: < 1 minute cross-platform propagation (measured from HUB save to TITAN X/Mobile update)
- **Page Load Success Rate**: ≥ 99.5% (measured via DataDog error tracking)
- **Order Placement Success Rate**: ≥ 99.9% excluding user errors (measured via backend logging)

### Quality Gates
- **Unit Test Coverage**: ≥ 80% for all new components
- **Integration Tests**: E2E tests for all critical user journeys (symbol navigation, chart trading, multi-leg options, watchlist sync)
- **Accessibility**: WCAG 2.1 Level AA compliance (automated testing with axe-core)
- **Browser Compatibility**: Tested on Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Performance Budget**: Initial page load < 3 seconds (desktop), < 5 seconds (tablet)

### Acceptance Criteria
- All PRD functional requirements (FR-1.1.1 through FR-7.4) implemented and tested
- All PRD non-functional requirements (NFR-1 through NFR-18) validated via performance testing
- Amplitude instrumentation complete and events flowing to Amplitude/Sigma/Databricks
- Greeks and IV% values match TITAN X for same symbol/snapshot (data parity validated)
- Position data syncs in real-time across HUB, TITAN X, Mobile (tested with concurrent sessions)

## Estimated Effort

**Total Timeline:** 12 weeks (3 months)

**Resource Requirements:**
- **Frontend Engineers**: 3 engineers full-time
- **Backend Engineers**: 1 engineer (20% allocation for API enhancements, caching)
- **QA Engineers**: 2 engineers (Weeks 9-12 for testing and validation)
- **Product Manager**: 1 PM (20% allocation for taxonomy, stakeholder coordination)
- **Designer**: 1 designer (Weeks 1-3 for UI specs, then ad-hoc support)

**Critical Path Items:**
1. **DXCharts Integration (Phase 2)**: High complexity; TITAN X team dependency; 2-week buffer allocated
2. **Options Chain Performance (Phase 3)**: Must achieve ≤ 2.0s load time; may require multiple optimization iterations
3. **Cross-Platform Sync (Phase 4)**: Dependency on Watchlist/Custom Grouping APIs; limited control over sync latency
4. **Amplitude Instrumentation (Phase 6)**: Must be complete before launch; dependency on PM taxonomy definition

**Risk Adjustment:** Add 2-week buffer for unforeseen issues (total 14 weeks pessimistic estimate)

---

## Implementation Notes

**Simplification Opportunities:**
- **Leverage Existing Trade Ticket**: Extend current HUB trade ticket component rather than building new one; saves 2 weeks
- **Reuse TITAN X DXCharts Config**: Import existing study/overlay definitions; avoids rebuilding charting logic from scratch
- **Use Existing APIs**: No new backend services required; minor enhancements only (pagination, caching)
- **Feature Flag Rollout**: Progressive rollout allows early detection of issues; reduces launch risk

**Key Architectural Benefits:**
- **Modular Tab Components**: Each tab (Overview, Chart, Options Chain) is independently testable and deployable
- **Lazy Loading**: Heavy components load on-demand; improves initial page load performance
- **Portfolio Context Retention**: State management architecture ensures seamless navigation without losing context
- **Cross-Platform Consistency**: Leveraging existing sync APIs ensures HUB matches TITAN X/Mobile behavior

---

## Tasks Created

- [ ] 001-symbol-detail-core-ui.md - Symbol Detail Core UI (parallel: true)
- [ ] 002-dxcharts-integration.md - DXCharts Integration (parallel: true, depends on: 001)
- [ ] 003-options-chain-implementation.md - Options Chain Implementation (parallel: false, depends on: 001)
- [ ] 004-trade-ticket-integration.md - Trade Ticket Integration (parallel: false, depends on: 001, 002, 003)
- [ ] 005-watchlist-system.md - Watchlist System (parallel: true)
- [ ] 006-custom-grouping-flex-view.md - Custom Grouping (Flex View) (parallel: true)
- [ ] 007-dashboard-onboarding.md - Dashboard Onboarding (parallel: true)
- [ ] 008-navigation-state-management.md - Navigation & State Management (parallel: false, depends on: 001)
- [ ] 009-amplitude-instrumentation.md - Amplitude Instrumentation (parallel: false, depends on: 001-008)
- [ ] 010-performance-optimization-testing.md - Performance Optimization & Testing (parallel: false, depends on: 001-009)

**Total tasks:** 10
**Parallel tasks:** 5 (tasks 001, 002, 005, 006, 007 can run concurrently)
**Sequential tasks:** 5 (tasks 003, 004, 008, 009, 010 have dependencies)
**Estimated total effort:** ~18-22 days (assuming parallel execution and 3 engineers)
