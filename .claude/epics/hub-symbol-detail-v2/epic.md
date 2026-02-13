---
name: hub-symbol-detail-v2
status: backlog
created: 2026-02-12T18:33:08Z
progress: 0%
prd: .claude/prds/hub-symbol-detail-v2.md
github: [Will be updated when synced to GitHub]
---

# Epic: HUB Symbol Detail v2

## Overview

Implement an integrated Symbol Detail view in TradeStation HUB that unifies charting, options chain analysis, and trade execution into a portfolio-centric workflow. This epic leverages existing HUB infrastructure (React shell, trade ticket, position services) and integrates DXCharts and options chain capabilities to create a cohesive trading experience without fragmenting to TITAN X.

**Core Strategy**: Maximize reuse of existing components (trade ticket, navigation, account bar) and focus net-new development on three key modules: Symbol Detail container with tab routing, DXCharts integration, and Options Chain view. Watchlist sync and Custom Grouping leverage existing cross-platform sync services.

## Architecture Decisions

### AD1: Single-Page Component Architecture
**Decision**: Build Symbol Detail as a single React component with lazy-loaded sub-tabs (Overview, Chart, Options Chain)
**Rationale**:
- Reuses existing HUB React shell and routing infrastructure
- Lazy loading prevents performance degradation when loading heavy components (DXCharts, Options Chain)
- Maintains persistent symbol context and account selection across tab switches
- Enables shared state management for position highlighting and trade ticket integration

**Technical Approach**:
- React component with tab router (`<SymbolDetail symbol={symbol} account={account}>`)
- Lazy load Chart and Options Chain tabs on first access
- Shared context provider for symbol, account, position data
- WebSocket subscription for real-time quote/P&L updates

### AD2: DXCharts Integration Strategy
**Decision**: Embed DXCharts as React component with configuration layer for TITAN X feature parity
**Rationale**:
- DXCharts provides professional-grade charting with indicator/study library
- Assumption validated: DXCharts can match TITAN X performance (streaming, rendering, indicators)
- Integration layer abstracts chart configuration and event handling
- Reuses existing chart trading order submission flow

**Technical Approach**:
- `<DXChartsWrapper>` component with TITAN X study/indicator mappings
- Drawing object persistence via localStorage with symbol-keyed storage
- Chart trading callbacks integrate with existing trade ticket component
- Performance monitoring: streaming latency, candle rendering, interaction responsiveness

**Risk Mitigation**: Early performance validation sprint to confirm DXCharts meets benchmarks; fallback to simplified chart if issues discovered

### AD3: Watchlist & Custom Grouping Sync Architecture
**Decision**: Leverage existing cross-platform sync services rather than building new sync infrastructure
**Rationale**:
- Watchlist sync service already exists for TITAN X ↔ Mobile synchronization
- Custom Grouping (Flex-View) already implemented in Mobile with sync capability
- HUB becomes a consumer of existing sync events rather than a producer
- Reduces complexity and ensures consistency across platforms

**Technical Approach**:
- Subscribe to watchlist sync service WebSocket for create/update/delete events
- Fetch Custom Grouping configuration from shared service (same API Mobile uses)
- Client-side rendering of Custom Grouping matching Mobile presentation logic
- Eventual consistency model with last-write-wins conflict resolution

### AD4: Amplitude Instrumentation Strategy
**Decision**: Centralized event tracking layer with schema validation and user property enrichment
**Rationale**:
- Amplitude taxonomy overhaul requires consistent instrumentation across all features
- Centralized layer prevents duplicate/malformed events and enables testing
- User property enrichment (account type, platform usage) added at instrumentation layer

**Technical Approach**:
- Event tracking wrapper (`AmplitudeService`) abstracts UI components from Amplitude SDK
- Event schema defined in Airtable, exported to JSON schema for client validation
- Server-side events for order submissions and account changes (complement client events)
- Instrumentation testing framework validates events before reaching Amplitude

### AD5: Trade Ticket Reuse Pattern
**Decision**: Reuse existing HUB trade ticket component with context-aware pre-population
**Rationale**:
- Trade ticket already exists in HUB with validation and submission logic
- No need to rebuild order entry; focus on smart pre-population from Symbol Detail
- Maintains consistent order flow and reduces testing surface area

**Technical Approach**:
- Trade ticket opens as modal overlay (not new page)
- Pre-population logic for chart clicks (price anchoring), options chain selection (strategy builder), overview actions (position close/scale)
- Trade ticket maintains Symbol Detail context; user returns to same tab after order submission
- Shared state: account selection, open orders, position updates

## Technical Approach

### Frontend Components

#### Symbol Detail Module (`components/SymbolDetail/`)
**Purpose**: Container component managing tab routing, symbol context, and data subscriptions

**Sub-components**:
- `SymbolDetailContainer.tsx`: Main container with tab router, symbol context provider
- `OverviewTab.tsx`: Market snapshot, position card, fundamentals, news feed, earnings calendar
- `ChartTab.tsx`: DXCharts wrapper, chart trading controls, position overlay
- `OptionsChainTab.tsx`: Options chain table, strategy builder, Greeks display
- `SymbolNavigation.tsx`: Persistent top nav (Dashboard, Positions, Orders links) with account summary bar

**State Management**:
- Symbol context: `{ symbol, account, position, openOrders }`
- WebSocket subscriptions: quotes, P&L, Greeks (for options)
- Lazy loading: Chart and Options Chain tabs load on first access

**Key Integrations**:
- Trade ticket modal (existing component)
- Position service API (existing)
- Market data service (existing)
- DXCharts library (new integration)

#### DXCharts Integration (`components/DXChartsWrapper/`)
**Purpose**: Encapsulate DXCharts library with TITAN X feature parity configuration

**Components**:
- `DXChartsWrapper.tsx`: React wrapper for DXCharts instance
- `ChartConfigService.ts`: Study/indicator library mapping (TITAN X → DXCharts)
- `DrawingPersistence.ts`: Drawing object save/load from localStorage
- `ChartTradingControls.tsx`: Order placement UI overlaying chart

**Features**:
- Streaming intraday candles (WebSocket data feed)
- Full TITAN X indicator/study library at launch
- Drawing tools with symbol-keyed persistence
- Chart trading: click price → trade ticket with price anchored
- Single-pane and multi-pane layouts (intervals, studies)

**Performance Targets**:
- Streaming latency: near-real-time (< 100ms)
- Candle rendering: smooth 60fps interaction
- Study calculation: no UI blocking

#### Options Chain View (`components/OptionsChain/`)
**Purpose**: Multi-leg strategy builder with Greeks, position highlighting, and chart sync

**Components**:
- `OptionsChainTable.tsx`: Sortable table with calls/puts, Greeks, IV
- `StrategyBuilder.tsx`: Dropdown for common strategies (verticals, spreads, etc.)
- `PositionHighlight.tsx`: Highlight held positions with real-time P&L
- `GreeksCalculator.ts`: Client-side Greeks aggregation for strategies

**Features**:
- Greeks display: Delta, Gamma, Theta, Vega, IV% for every strike
- Sortable columns: strike, bid/ask, volume, open interest, Greeks
- Strategy dropdown auto-populates trade ticket with multi-leg configuration
- Chart sync: selecting strike/expiry updates chart to show that contract
- Held position highlighting with real-time P&L calculated from avg cost

**Performance Targets**:
- Load time: ≤ 2.0 seconds at p95 for full chain (all expiries, all strikes)
- Real-time updates: Greeks and P&L refresh without re-fetching full chain

#### Watchlist & Dashboard Enhancements (`components/Dashboard/`)
**Purpose**: Integrate watchlist sync and Getting Started checklist into Dashboard

**Components**:
- `WatchlistWidget.tsx`: Real-time quote list with symbol navigation to Symbol Detail
- `GettingStartedChecklist.tsx`: Post-funding checklist driving platform adoption
- `DashboardContainer.tsx`: Merged Dashboard/Portfolio Overview (account state-aware)

**Features**:
- Watchlist creation flow (inline or modal)
- Cross-platform sync (subscribe to sync service events)
- Dynamic hotlists (top movers, earnings today, etc.)
- Checklist tiles: Create Watchlist, Download Mobile, Download TITAN X, Educational Video
- Account state configuration: Pre-funding (onboarding focus) vs Post-funding (trading focus)

**Integration**:
- Watchlist sync service (WebSocket)
- Amplitude events for checklist completion
- Deep links to Mobile install, TITAN X download

#### Custom Grouping in Positions (`components/Positions/`)
**Purpose**: Display options positions grouped by strategy with aggregate Greeks

**Components**:
- `CustomGroupingView.tsx`: Fetch grouping config from shared service, render grouped positions
- `GroupedPositionRow.tsx`: Expandable row with aggregate P&L and Greeks
- `GroupingPersistence.ts`: Subscribe to sync service for grouping changes from Mobile

**Features**:
- Fetch Custom Grouping configuration from shared service (same API Mobile uses)
- Client-side rendering matching Mobile Flex-View presentation
- Expand/collapse grouped positions
- Aggregate P&L, Greeks, risk metrics per group
- Cross-platform sync: groupings created in Mobile appear in HUB automatically

**Parity Requirement**: Presentation (layout, labels, sort, expand/collapse) must match Mobile Flex-View exactly

### Backend Services

**Note**: Most backend services already exist; focus is on leveraging existing APIs and adding minimal net-new endpoints

#### Symbol Detail Data API (Existing - Minor Enhancements)
**Existing Endpoints (Reuse)**:
- `GET /api/quotes/{symbol}` - Real-time quote snapshot
- `GET /api/positions/{account}` - User positions with P&L
- `GET /api/fundamentals/{symbol}` - Market cap, EPS, dividend, beta
- `GET /api/news/{symbol}` - News feed with corporate actions
- `GET /api/earnings/{symbol}` - Earnings calendar

**New/Enhanced Endpoints**:
- `GET /api/options-chain/{symbol}?expiries=all` - Full options chain with Greeks
  - Response includes: strikes, bid/ask, volume, open interest, IV, Delta, Gamma, Theta, Vega
  - Performance requirement: ≤ 2.0 seconds for high-volume symbols (SPY, AAPL)
  - Caching strategy: 5-second cache for chain data, real-time for Greeks updates

#### Watchlist Sync Service (Existing - HUB Consumer)
**Existing Service**: Already syncs watchlists between TITAN X and Mobile
**HUB Integration**: Subscribe to sync service events (create, update, delete)
**WebSocket Events**:
- `watchlist.created` - New watchlist created on any platform
- `watchlist.updated` - Watchlist symbols/columns modified
- `watchlist.deleted` - Watchlist removed

**HUB Implementation**:
- Subscribe to sync service on Dashboard mount
- Local cache with background sync
- Optimistic UI updates with rollback on sync failure

#### Custom Grouping Service (Existing - HUB Consumer)
**Existing Service**: Mobile Flex-View uses shared grouping configuration service
**HUB Integration**: Fetch grouping config, render client-side matching Mobile presentation
**API**:
- `GET /api/custom-grouping/{account}` - Fetch user's custom groupings
- Response includes: grouping definitions, sort order, labels

**HUB Implementation**:
- Fetch on Positions page load
- Client-side aggregation of P&L and Greeks per group
- No server-side grouping computation (matches Mobile approach)

#### Trade Submission Service (Existing - Reuse)
**Existing Endpoints (Reuse)**:
- `POST /api/orders` - Submit order (market, limit, stop, trailing stop, OCO/OSO)
- `GET /api/orders/{account}` - Fetch open orders
- `DELETE /api/orders/{orderId}` - Cancel order

**Chart Trading Integration**:
- Trade ticket pre-population logic runs client-side
- Price anchoring from chart click coordinates
- Validation (buying power, position limits) before submission

**Options Strategy Integration**:
- Multi-leg order submission (existing support for option spreads)
- Strategy builder pre-populates ticket with leg configuration (calls/puts, strikes, quantities)

### Infrastructure

#### Deployment Considerations
**Hosting**: HUB is already deployed as React SPA; Symbol Detail is additional route/component
**Build Process**: Existing CI/CD pipeline (lint, type-check, build, deploy)
**Feature Flags**: Gradual rollout capability (beta → 10% → 100%)
**Rollback Plan**: Feature flag disable reverts to pre-Symbol Detail HUB state

#### Performance & Scaling
**Client-Side Performance**:
- Code-splitting: Lazy load Chart and Options Chain components
- Webpack optimization: Tree-shaking, minification, chunk splitting
- React optimization: Memoization, virtualization for large lists (options chain)

**Server-Side Scaling**:
- Options chain caching: Redis cache with 5-second TTL
- WebSocket connection pooling: Shared connections for quotes, P&L, Greeks
- CDN for static assets (DXCharts library, indicator configs)

**Performance Monitoring**:
- Real User Monitoring (RUM): Page load times, interaction latency
- Synthetic monitoring: Chart load time, options chain load time
- Amplitude events: Performance milestones (time-to-interactive, time-to-first-trade)

#### Monitoring & Observability
**Application Metrics**:
- Chart streaming latency (target: < 100ms)
- Options chain load time (target: ≤ 2.0s at p95)
- Trade submission success rate
- Watchlist sync latency (target: < 1 minute)

**Business Metrics** (Amplitude):
- Symbol Detail view rate
- Chart trading adoption rate
- Options chain usage rate
- Watchlist creation rate
- Getting Started checklist completion rate

**Alerting**:
- P95 latency exceeds thresholds
- Error rate spike (> 1% of requests)
- WebSocket disconnection rate high
- Trade submission failures

## Implementation Strategy

### Phase 1: Foundation (Weeks 1-2)
**Goal**: Set up Symbol Detail container, routing, and basic data fetching

**Deliverables**:
- Symbol Detail container component with tab routing
- Overview tab with market snapshot, position card, fundamentals
- Navigation integration (Dashboard → Symbol Detail → back to Dashboard)
- WebSocket subscription for real-time quotes and P&L
- Amplitude instrumentation foundation (event schema, tracking layer)

**Success Criteria**:
- User can navigate to Symbol Detail from Dashboard watchlist
- Overview tab displays real-time data with < 3 second load time
- Position card shows accurate P&L for held symbols
- Navigation preserves context (return to Dashboard maintains state)

### Phase 2: Chart Integration (Weeks 3-4)
**Goal**: Integrate DXCharts with TITAN X feature parity and chart trading capability

**Deliverables**:
- DXCharts wrapper component with streaming candles
- Full TITAN X indicator/study library configuration
- Drawing object persistence (localStorage)
- Chart trading controls and trade ticket integration
- Performance validation: streaming latency, rendering smoothness

**Success Criteria**:
- Chart loads with near-real-time streaming (< 100ms latency)
- All TITAN X studies/indicators available and functional
- Drawing objects persist across sessions
- Chart trading: click → trade ticket → order submission → return to chart

**Risk Mitigation**: Early performance testing sprint; if DXCharts issues found, escalate decision on fallback

### Phase 3: Options Chain & Strategy Builder (Weeks 5-6)
**Goal**: Build options chain view with Greeks, strategy builder, and position highlighting

**Deliverables**:
- Options chain table with sortable columns (strike, Greeks, IV)
- Strategy dropdown with common strategies (verticals, spreads, condors)
- Held position highlighting with real-time P&L
- Chart sync to selected strike/expiry
- Performance optimization for high-volume symbols (SPY, AAPL)

**Success Criteria**:
- Options chain loads in ≤ 2.0 seconds at p95
- Greeks display accurately matches TITAN X values
- Strategy builder pre-populates multi-leg ticket correctly
- Held positions highlighted with real-time P&L

**Risk Mitigation**: Backend caching strategy (Redis) to meet load time target; client-side virtualization for large chains

### Phase 4: Watchlist Sync & Dashboard Enhancements (Week 7)
**Goal**: Integrate watchlist sync and Getting Started checklist

**Deliverables**:
- Watchlist creation flow in Dashboard
- Cross-platform sync (subscribe to sync service events)
- Getting Started checklist with tile completion tracking
- Dynamic hotlists (top movers, earnings today)
- Amplitude events for checklist completion

**Success Criteria**:
- Watchlist created in HUB syncs to TITAN X/Mobile within 1 minute
- Watchlist created in TITAN X/Mobile appears in HUB within 1 minute
- Checklist tiles mark as completed on user actions
- User receives notification in TITAN X/Mobile on watchlist creation

### Phase 5: Custom Grouping in Positions (Week 8)
**Goal**: Display options positions grouped by strategy with aggregate Greeks

**Deliverables**:
- Custom Grouping view in Positions page
- Fetch grouping config from shared service
- Client-side rendering matching Mobile Flex-View presentation
- Aggregate P&L and Greeks per group
- Cross-platform sync (groupings from Mobile appear in HUB)

**Success Criteria**:
- Custom Grouping presentation matches Mobile Flex-View exactly
- Groupings created in Mobile appear in HUB without manual reconfiguration
- Aggregate Greeks calculated correctly for grouped positions

### Phase 6: Testing, Optimization & Launch Prep (Weeks 9-10)
**Goal**: End-to-end testing, performance optimization, compliance approval, launch readiness

**Deliverables**:
- Cross-browser testing (Chrome, Safari, Firefox, Edge)
- Performance optimization (code-splitting, caching, lazy loading)
- Amplitude instrumentation validation (all events firing correctly)
- RedOak screenshot submission for Legal/Compliance approval
- Marketing assets, Customer Learning content, Sales enablement
- Support team training and troubleshooting guide
- Beta release to internal employees + 100 external users

**Success Criteria**:
- No critical bugs in beta release
- Performance targets met (chart streaming, options chain load time)
- Amplitude events validated in production
- Legal/Compliance approval obtained
- Support team trained and ready
- Marketing/Sales materials prepared

### Testing Approach

**Unit Testing**:
- Component-level tests for Symbol Detail, Chart, Options Chain
- State management tests (context providers, reducers)
- Utility function tests (Greeks calculation, price anchoring)

**Integration Testing**:
- Symbol Detail → Trade Ticket flow
- Watchlist sync across platforms
- Custom Grouping fetch and render
- Chart trading order submission

**End-to-End Testing**:
- User journey: Dashboard → Symbol Detail → Chart → Trade → Positions
- Options workflow: Positions → Symbol Detail → Options Chain → Strategy Builder → Trade → Positions with Custom Grouping
- Watchlist creation → sync validation → cross-platform verification

**Performance Testing**:
- Options chain load time for high-volume symbols (SPY, AAPL, QQQ)
- Chart streaming latency under market hours load
- Concurrent user load testing (dashboard, symbol detail, chart)
- WebSocket connection stability (reconnection, backoff)

**Compliance Testing**:
- RedOak screenshot review (Legal/Compliance)
- Order validation (buying power, position limits)
- Audit trail (all trade submissions logged)

## Task Breakdown Preview

The implementation will be organized into **8 high-level tasks** (each task may contain sub-tasks during decomposition):

- [ ] **Task 1: Symbol Detail Container & Routing** - Build React component with tab routing, symbol context, navigation integration
- [ ] **Task 2: Overview Tab & Data Integration** - Market snapshot, position card, fundamentals, news feed, WebSocket subscriptions
- [ ] **Task 3: DXCharts Integration & Chart Trading** - Embed DXCharts, configure TITAN X study library, chart trading controls, trade ticket integration
- [ ] **Task 4: Options Chain View & Strategy Builder** - Options chain table, Greeks display, strategy dropdown, position highlighting, chart sync
- [ ] **Task 5: Watchlist Sync & Dashboard Enhancements** - Watchlist creation, cross-platform sync, Getting Started checklist, dynamic hotlists
- [ ] **Task 6: Custom Grouping in Positions** - Fetch grouping config, client-side rendering, aggregate Greeks, Mobile parity
- [ ] **Task 7: Amplitude Instrumentation & Event Taxonomy** - Centralized tracking layer, schema validation, event taxonomy overhaul, Airtable integration
- [ ] **Task 8: Testing, Optimization & Launch Readiness** - Cross-browser testing, performance optimization, compliance approval, beta release, marketing/sales enablement

**Rationale for 8 Tasks**:
- Each task represents a distinct feature module or integration point
- Tasks leverage existing infrastructure (trade ticket, position service, sync service) to minimize complexity
- Clear dependencies: Task 1 → 2 → 3/4 (parallel) → 5/6 (parallel) → 7 → 8
- Task 8 consolidates all testing/optimization/launch activities to avoid fragmentation

## Dependencies

### External Dependencies

**DXCharts Library**
- **Dependency**: Third-party charting library with TITAN X feature parity
- **Risk**: Performance issues, missing features, or integration complexity
- **Mitigation**: Early integration sprint (Phase 2) with performance validation; escalate fallback decision if issues found
- **Timeline**: Must be production-ready by Week 3 (Phase 2 start)

**Market Data Providers**
- **Dependency**: Real-time quote feeds for equities and options
- **Risk**: Data latency, outages, or accuracy issues
- **Mitigation**: Failover providers, graceful degradation (show stale data with timestamp)
- **Timeline**: Existing service; no new integration required

**Amplitude Analytics Platform**
- **Dependency**: Event tracking and user analytics
- **Risk**: Taxonomy not ready, instrumentation incomplete, or data latency
- **Mitigation**: PM-owned Airtable taxonomy timeline; instrumentation sprint in Phase 1
- **Timeline**: Taxonomy must be complete before Phase 1 starts

### Internal Team Dependencies

**Product Management**
- **Deliverable**: Airtable taxonomy definition (events, event properties, user properties)
- **Timeline**: Before Phase 1 (Week 1)
- **Owner**: PM team
- **Impact**: Blocks Amplitude instrumentation if delayed

**Customer Experience (CE Support & Trade Desk)**
- **Deliverable**: Support team training, troubleshooting guide, demo webinar availability
- **Timeline**: 2 weeks before launch (Week 8)
- **Owner**: CE Support, CE Trade Desk
- **Impact**: Poor launch experience if support unprepared

**Customer Learning**
- **Deliverable**: 2-minute explainer video, KB articles, education center updates
- **Timeline**: Launch day (Week 10)
- **Owner**: Customer Learning
- **Impact**: Reduced user adoption if content not ready

**Sales (Inside-Sales & Institutional)**
- **Deliverable**: Platform demo webinar, feature set presentation
- **Timeline**: Launch week (Week 10)
- **Owner**: Sales team
- **Impact**: Missed sales opportunities if not prepared

**Marketing**
- **Deliverable**: Website asset updates, email campaigns, Amplitude campaign events
- **Timeline**: Launch day (Week 10)
- **Owner**: Marketing
- **Impact**: Reduced awareness and adoption if not coordinated

**Legal / Compliance**
- **Deliverable**: RedOak screenshot submission approval, periodic review meetings, launch webinar
- **Timeline**: Before launch (Week 9)
- **Owner**: Legal/Compliance (TSG group)
- **Impact**: Cannot launch without approval

**Product Data Insights & BI Team**
- **Deliverable**: Event data in Amplitude/Sigma/Databricks, default dashboards (adoption, trade lift, error rates)
- **Timeline**: Launch day (Week 10)
- **Owner**: Product Data Insights, BI Team
- **Impact**: Cannot measure success metrics if dashboards not ready

**Risk & InfoSec**
- **Deliverable**: Security review, risk assessment approval
- **Timeline**: Before launch (Week 9)
- **Owner**: Risk Team, InfoSec
- **Impact**: Cannot launch without security approval

### Platform Service Dependencies

**Authentication Service** (Existing)
- Session management and account context
- No changes required; Symbol Detail uses existing auth

**Order Management System** (Existing)
- Trade submission and validation
- No changes required; reuses existing trade ticket integration

**Position Service** (Existing)
- Real-time position data and P&L calculations
- Minor enhancement: aggregate Greeks for Custom Grouping (client-side calculation)

**Market Data Service** (Existing)
- Streaming quotes, fundamentals, news
- New endpoint: Options chain with Greeks (backend caching required)

**Watchlist Sync Service** (Existing)
- Cross-platform watchlist synchronization
- HUB becomes consumer (subscribe to events); no service changes required

**Custom Grouping Service** (Existing)
- Mobile Flex-View grouping configuration
- HUB becomes consumer (fetch config); no service changes required

## Success Criteria (Technical)

### Performance Benchmarks

**PB1: Options Chain Load Time**
- **Target**: ≤ 2.0 seconds at p95 under normal network/server conditions
- **Measurement**: RUM (Real User Monitoring) tracking time from chain request to full render
- **Validation**: Load testing with high-volume symbols (SPY, AAPL, QQQ) during market hours
- **Acceptance**: 95% of chain loads complete within 2.0 seconds

**PB2: Chart Streaming Latency**
- **Target**: Near-real-time (< 100ms from market data event to chart update)
- **Measurement**: WebSocket event timestamp to DOM update timestamp
- **Validation**: Market hours monitoring with high-volume symbols
- **Acceptance**: Median latency < 100ms, p95 latency < 200ms

**PB3: Dashboard Load Time**
- **Target**: < 3 seconds for full page render with all widgets
- **Measurement**: Time to Interactive (TTI) metric
- **Validation**: Lighthouse/WebPageTest audits, RUM tracking
- **Acceptance**: Median TTI < 3 seconds across browsers

**PB4: Symbol Detail Navigation**
- **Target**: < 1 second transition between tabs (Overview, Chart, Options Chain)
- **Measurement**: Click event to tab content rendered
- **Validation**: User interaction testing, RUM tracking
- **Acceptance**: Median transition time < 1 second

**PB5: Watchlist Sync Latency**
- **Target**: Changes reflected across platforms within 1 minute
- **Measurement**: Timestamp from sync event publish to HUB/TITAN X/Mobile update
- **Validation**: Cross-platform sync testing
- **Acceptance**: 99% of sync events complete within 1 minute

### Quality Gates

**QG1: Zero Critical Bugs in Beta Release**
- **Criteria**: No P0/P1 bugs reported during 2-week beta period (internal + 100 external users)
- **Validation**: Bug triage and prioritization process
- **Acceptance**: All critical bugs fixed before limited release (Phase 2)

**QG2: Cross-Browser Compatibility**
- **Criteria**: Feature parity across Chrome, Safari, Firefox, Edge (latest 2 versions)
- **Validation**: Manual testing, automated Selenium/Playwright tests
- **Acceptance**: No browser-specific bugs blocking core workflows

**QG3: Amplitude Instrumentation Complete**
- **Criteria**: All events defined in Airtable taxonomy fire correctly with proper properties
- **Validation**: Amplitude event inspector, automated event validation tests
- **Acceptance**: 100% of defined events instrumented and validated

**QG4: Legal/Compliance Approval**
- **Criteria**: RedOak screenshot submission approved, periodic review meetings completed
- **Validation**: Legal/Compliance sign-off documented
- **Acceptance**: Written approval from Legal/Compliance before launch

**QG5: Support Readiness**
- **Criteria**: Support team trained, troubleshooting guide prepared, demo webinar delivered
- **Validation**: Support team quiz/assessment, demo webinar attendance
- **Acceptance**: >90% of support team completes training

### Business Acceptance Criteria

**BAC1: First Trade Rate Improvement**
- **Baseline**: Current first trade within 15 days rate (to be measured)
- **Target**: 2% increase within first year
- **Measurement**: Cohort analysis (users who fund → first trade completion time)
- **Validation**: Amplitude funnel analysis, quarterly KPI tracking

**BAC2: Platform Adoption (Mobile/TITAN X First Login)**
- **Baseline**: Current first login rates during first 15 days post-funding
- **Target**: 15% increase over 6-month period
- **Measurement**: First login events tracked in Amplitude by platform
- **Validation**: Cohort comparison (pre-launch vs post-launch)

**BAC3: HVC Retention**
- **Baseline**: 80% HVC retention rate
- **Target**: 82% HVC retention (2% improvement)
- **Measurement**: HVCs active on all 3 platforms (HUB, TITAN X, Mobile)
- **Validation**: Quarterly retention cohort analysis

**BAC4: Symbol Detail Engagement**
- **Target**: >50% of active HUB users view Symbol Detail within first month post-launch
- **Measurement**: Symbol Detail view events in Amplitude
- **Validation**: Monthly adoption dashboard

**BAC5: Chart Trading Adoption**
- **Target**: >20% of HUB traders place at least one order from chart within 3 months post-launch
- **Measurement**: Chart trading events (order placement source = chart)
- **Validation**: Quarterly adoption dashboard

**BAC6: Options Chain Usage**
- **Target**: >30% of HUB options traders use Options Chain within 3 months post-launch
- **Measurement**: Options Chain view events + strategy builder usage
- **Validation**: Quarterly adoption dashboard

## Estimated Effort

### Overall Timeline: 10 Weeks (Development + Testing + Launch Prep)

**Phase 1: Foundation** (Weeks 1-2) - 2 weeks
- Symbol Detail container, routing, Overview tab, data integration
- Amplitude instrumentation foundation

**Phase 2: Chart Integration** (Weeks 3-4) - 2 weeks
- DXCharts integration, study library configuration, chart trading, drawing persistence

**Phase 3: Options Chain** (Weeks 5-6) - 2 weeks
- Options chain table, strategy builder, Greeks display, position highlighting, performance optimization

**Phase 4: Watchlist Sync** (Week 7) - 1 week
- Watchlist creation, cross-platform sync, Getting Started checklist, dynamic hotlists

**Phase 5: Custom Grouping** (Week 8) - 1 week
- Custom Grouping view, Mobile parity, aggregate Greeks

**Phase 6: Testing & Launch** (Weeks 9-10) - 2 weeks
- Testing, optimization, compliance approval, beta release, launch readiness

### Resource Requirements

**Frontend Developers**: 3-4 engineers (React, TypeScript, WebSocket, charting libraries)
**Backend Developers**: 1-2 engineers (Options chain API optimization, caching strategy)
**QA Engineers**: 1-2 engineers (cross-browser testing, performance testing, E2E tests)
**Product Manager**: 1 PM (Amplitude taxonomy, requirements clarification, stakeholder coordination)
**Product Designer**: 1 designer (UI/UX reviews, accessibility validation, responsive design)
**DevOps Engineer**: 0.5 FTE (feature flag setup, deployment automation, monitoring setup)

### Critical Path Items

**CP1: DXCharts Integration (Phase 2)**
- **Risk**: Performance issues or missing features delay chart functionality
- **Impact**: Blocks chart trading adoption, degrades user experience
- **Mitigation**: Early integration sprint, performance validation, escalation path for fallback decision

**CP2: Options Chain Performance (Phase 3)**
- **Risk**: Backend optimization required to meet ≤ 2.0 second load time target
- **Impact**: Poor options trader experience, low Options Chain adoption
- **Mitigation**: Backend caching strategy (Redis), client-side virtualization, load testing

**CP3: Amplitude Taxonomy Readiness (Phase 1)**
- **Risk**: Event taxonomy not ready before instrumentation sprint
- **Impact**: Cannot measure success metrics, blind to user behavior
- **Mitigation**: PM-owned Airtable taxonomy timeline with hard deadline before Phase 1

**CP4: Legal/Compliance Approval (Phase 6)**
- **Risk**: RedOak screenshot review delays launch
- **Impact**: Missed launch window, delayed business impact
- **Mitigation**: Early submission (Week 9), regular check-ins, buffer time in schedule

**CP5: Cross-Platform Sync Reliability (Phases 4 & 5)**
- **Risk**: Watchlist/Custom Grouping sync failures or delays
- **Impact**: User confusion, poor onboarding experience, low adoption
- **Mitigation**: Robust sync service with retry logic, conflict resolution, monitoring/alerting

## Notes

**Leverage Existing Infrastructure**: This epic maximizes reuse of existing HUB components (React shell, trade ticket, navigation, position service) to minimize development effort and testing surface area. The focus is on three net-new integrations: DXCharts, Options Chain, and cross-platform sync consumption.

**Phased Rollout Recommended**: Beta release (internal + 100 users) → Limited release (10%) → Full release (100%) enables early feedback and risk mitigation before broad exposure.

**Performance-First Approach**: Options Chain load time (≤ 2.0s) and chart streaming latency (< 100ms) are critical to user experience and adoption. Early performance validation and optimization are prioritized.

**Compliance-First Approach**: Legal/Compliance approval (RedOak screenshot submission) is on the critical path. Early engagement and buffer time ensure no launch delays.

**Data-Driven Iteration**: Amplitude instrumentation is foundational (Phase 1) to enable measurement of success metrics from day one. Post-launch iteration will be driven by adoption data, user feedback, and retention analysis.
