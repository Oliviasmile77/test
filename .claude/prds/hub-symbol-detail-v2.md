---
name: hub-symbol-detail-v2
description: Integrated Symbol Detail view with charts, options chain, and trading capabilities for TradeStation HUB
status: backlog
created: 2026-02-12T18:25:23Z
---

# PRD: HUB Symbol Detail v2

## Executive Summary

TradeStation HUB Symbol Detail v2 is a portfolio-centric trading workflow that unifies symbol analysis, charting, options trading, and position management into a single, integrated experience. This feature transforms HUB from a basic portfolio viewer into a comprehensive trading platform by delivering the most frequently used trading components (watchlists, charts, options chains, fundamental data, and news) in a cohesive, browser-based interface.

**Key Value Proposition:**
- Streamlines onboarding by providing cross-platform watchlist synchronization and a Getting Started checklist
- Delivers unified trading experience across platforms (HUB, TITAN X, Mobile) with feature parity for options workflows
- Retains high-value active equity and options traders by providing professional-grade tools in a web-based environment
- Positions HUB as the portfolio-first platform for daily monitoring and opportunistic trading, while TITAN X remains the professional active trading solution

## Problem Statement

### Current State
Active traders face a fragmented experience managing positions and executing orders across TradeStation platforms. HUB lacks critical workflow components that force users to switch between platforms:

1. **No Symbol Detail View**: Users cannot analyze symbols in-depth without leaving HUB for TITAN X or Desktop
2. **Missing Options Chain**: Options traders cannot build or manage multi-leg strategies within HUB
3. **No Custom Grouping**: Options positions cannot be grouped by strategy, making portfolio management inefficient
4. **Inconsistent Watchlist Experience**: Watchlists don't sync across platforms, creating friction in user workflows
5. **No Chart Trading**: Users cannot execute trades directly from charts, breaking the analysis-to-execution flow

### Why Now?
1. **Recent HUB Portfolio Launch**: HUB now has positions and portfolio capabilities but lacks trading functionality
2. **Competitive Pressure**: Modern trading platforms offer integrated workflows; fragmentation hurts retention
3. **User Activation Gap**: New clients fund accounts but don't place first trades within 15 days (target: reduce by 2%)
4. **High-Value Customer Retention**: Active traders using all 3 platforms have significantly higher retention rates

### Business Impact
- **First Trade Rate**: Increase by 2% within first year (currently targeting 15% improvement in first 15 days)
- **Platform Adoption**: Increase first login on Mobile/TITAN X during first 15 days post-funding by 15%
- **HVC Retention**: Improve high-value customer retention by 2% (80-82% target)
- **Options Trading Volume**: Enable complete options workflow in HUB to capture more options trading activity

## User Stories

### Primary Personas

**Persona 1: Active Equity Day-Trader & Swing Trader**
- Trades equities intraday or holds few days
- Uses HUB for portfolio monitoring and quick opportunistic trades
- Uses TITAN X for intensive multi-chart day trading
- Needs fast analysis-to-execution workflow

**Persona 2: Options Swing-Trader**
- Builds multi-day option positions (verticals, butterflies, condors)
- Monitors Greeks and portfolio risk
- Needs to analyze symbols from watchlist/positions and build strategies
- Requires portfolio-level Greeks visibility before committing capital

### User Story 1: Create and Sync Watchlist Across Platforms (P1)
**As a** retail trader (newly onboarded client)
**I want to** create a personalized watchlist in HUB that syncs to TITAN X and Mobile
**So that** I have immediate platform customization and a clear path to activation

**Acceptance Criteria:**
- User can create watchlist from Dashboard with suggested hotlists
- Watchlist syncs to TITAN X and Mobile within 1 minute
- User receives notification in TITAN X/Mobile when watchlist is created
- Watchlist persists across sessions and devices
- Getting Started Checklist includes watchlist creation as first step
- Dynamic hotlists provide quick access to top-moving assets

**Success Metrics:**
- 15% increase in first login on Mobile during first 15 days post-funding
- 15% increase in first login on TITAN X during first 15 days post-funding
- Watchlist creation becomes top onboarding action within first week

### User Story 2: Portfolio Review → Opportunistic Trade Execution (P1)
**As an** active equity day-trader
**I want to** navigate from my positions/dashboard to Symbol Detail and execute trades without losing portfolio context
**So that** I can make informed decisions seeing both technical setup and portfolio impact

**Acceptance Criteria:**
- One-click navigation from Positions/Dashboard watchlist to Symbol Detail
- Symbol Detail Overview tab shows position details (quantity, avg cost, P&L) while viewing chart
- Chart trading enabled with market/limit/stop/trailing stop orders directly from chart
- Trade ticket pre-populated from chart with price anchoring and validation
- Persistent top navigation shows buying power and portfolio P&L
- User can toggle through watchlist symbols without losing portfolio context
- Return to Positions/Dashboard via persistent navigation maintains state

**Success Metrics:**
- HVCs who place trades on HUB have increased retention vs those who don't
- Average time from portfolio view to trade execution < 60 seconds
- Portfolio-first workflow distinguishes HUB from TITAN X professional trading

### User Story 3: Options Strategy Building with Portfolio Context (P1)
**As an** options swing-trader
**I want to** navigate from Positions to Symbol Detail, analyze the options chain, build multi-leg strategies, and see portfolio Greeks before execution
**So that** I can manage position and portfolio risk effectively

**Acceptance Criteria:**
- Navigate from Positions page to Symbol Detail to analyze existing option positions
- Options Chain displays with real-time P&L for held positions highlighted
- Strategy dropdown auto-populates multi-leg ticket from chain selection
- Greeks (Delta, Gamma, Theta, Vega, IV%) display for every strike with sortable columns
- Chart syncs to selected strike or expiry for visual confirmation
- Custom Grouping in Positions shows updated portfolio Greeks after closing strategy
- User can return to Positions with Custom Grouping to see portfolio impact

**Success Metrics:**
- Options traders using Symbol Detail have increased retention vs those who don't
- Custom Grouping adoption rate among options traders
- Options chain performance: load time ≤ 2 seconds at p95
- Parity with Mobile Flex-View for Custom Grouping display

### User Story 4: Chart Analysis for Symbol Discovery (P2)
**As an** active trader
**I want to** access professional-grade charting with full indicator library and drawing tools
**So that** I can perform technical analysis without switching to TITAN X

**Acceptance Criteria:**
- DXCharts integration with near-real-time streaming (matching TITAN X performance)
- Full TITAN X indicator/overlay library available at launch
- Drawing objects persist across sessions and symbol changes
- Studies/overlays selectable with default parameters
- Single-pane and multi-pane chart layouts supported
- Chart trading with advanced order types (OCO/OSO)
- Position view shows quantity and P&L on chart

**Success Metrics:**
- Chart trading adoption rate
- Study/overlay usage indicating advanced trader engagement
- Chart load performance matches or exceeds TITAN X benchmarks

## Requirements

### Functional Requirements

#### FR1: Symbol Detail Module
**Priority: P0 (Must Have)**

**FR1.1 Navigation & Entry Points**
- Support navigation to Symbol Detail from:
  - Dashboard watchlist widgets (click symbol)
  - Positions page (click held symbol)
  - Orders page (click symbol with active orders)
  - Search/symbol lookup
- Maintain symbol context when user navigates away and returns
- Support deep linking to specific symbols with account context

**FR1.2 Overview Tab**
- Market snapshot: Last Price, Bid, Ask, Day % Change, Volume (streaming updates)
- Position card (if held): Quantity, Avg Cost, P&L (real-time calculated)
- Fundamentals panel: Market Cap, EPS, Dividend, Beta, Float
- News & Corporate Actions feed: chronological order with source, timestamp, link-out
- Earnings Calendar widget: upcoming dates with consensus data
- Analyst-Rating widget: consensus with coverage details

**FR1.3 Chart Tab**
- DXCharts integration with streaming intraday candles
- Full TITAN X indicator/study library at launch
- Drawing tools with persistence
- Chart trading capability with order placement directly from chart
- Advanced order ticket: market, limit, stop, trailing stop, OCO/OSO
- Single-pane and multi-pane layouts (intervals and studies)
- Position view overlay showing quantity and P&L on chart

**FR1.4 Options Chain Tab**
- Multi-leg strategy builder with strike-to-ticket linking
- Greeks and IV metrics for every strike (sortable columns)
- Held position highlighting with real-time P&L
- Strategy dropdown: auto-populate tickets for common strategies
- Chart sync to selected strike/expiry
- Calls/Puts toggle and strategy/strike count controls
- Performance: ≤ 2.0 seconds load time at p95

**FR1.5 Trade Ticket Integration**
- Existing trade ticket capability linked to all Symbol Detail sections
- Pre-population from chart, options chain, or overview
- Price anchoring and validation from chart view
- Order placement without leaving Symbol Detail
- Order confirmation with return to previous context

**FR1.6 Cross-Module Context Retention**
- Maintain open trade ticket state when switching tabs (Overview, Chart, Options)
- Persist symbol selection when navigating to other HUB sections
- Top navigation: quick links to Dashboard, Positions, Orders, Balances
- Account summary bar: real-time buying power and portfolio P&L always visible

#### FR2: Custom Grouping - Flex View
**Priority: P0 (Must Have)**

**FR2.1 Positions Custom Grouping**
- Enable users to create custom groupings in HUB Positions view
- Display positions grouped with consistent labels and ordering
- Support expand/collapse for grouped positions
- Calculate aggregate P&L, Greeks, and risk metrics for each group

**FR2.2 Parity with Mobile Flex-View**
- Match Mobile's Custom Grouping presentation (layout, labels, sort, expand/collapse)
- Ensure same account/symbol context displays identical grouping in HUB and Mobile

**FR2.3 Cross-Platform Grouping Sync**
- Custom groupings created in Mobile are fetched and displayed in HUB automatically
- No manual reconfiguration required
- Grouping changes persist across sessions and devices

**FR2.4 Grouping Persistence**
- User-configured groupings persist when signing out, reloading, or accessing from another device
- Grouping settings stored per account

#### FR3: Watchlist / Hotlists
**Priority: P0 (Must Have)**

**FR3.1 Dashboard Watchlist Widget**
- Display watchlist on HUB Dashboard as personalized account landing page
- Show synchronized quote lists across TITAN X, Mobile, and HUB
- Include dynamic hotlists for quick access to top-moving assets
- Enable one-click navigation to Symbol Detail from watchlist

**FR3.2 Cross-Platform Synchronization**
- Watchlist created/updated in HUB syncs to TITAN X and Mobile within 1 minute
- Watchlist created/updated in TITAN X or Mobile syncs to HUB within 1 minute
- Column customization in watchlist persists across sessions and devices

**FR3.3 Getting Started Checklist Integration**
- Getting Started Checklist displayed at top of Dashboard
- Checklist drives user toward platform personalization (watchlist creation)
- Direct links to Mobile and TITAN X downloads/logins
- Post-funding checklist includes:
  - Configure first Watchlist
  - Post Symbol Detail & Watchlist tile (completed on creation)
  - Mobile Download tile (opens direct install/login link)
  - TITAN X Download tile (opens direct download/setup link)
  - Educational/Feature Video tile (in-app modal or KB link)
  - Create Watchlist tile (initiates watchlist creation flow, marks as completed)

**FR3.4 Watchlist Functionality**
- Support symbol add/remove within HUB
- Display real-time quotes for all symbols
- Support sorting and column customization
- Enable symbol search/lookup for adding to watchlist

#### FR4: Dashboard Enhancements
**Priority: P0 (Must Have)**

**FR4.1 Merged Dashboard / Portfolio Overview**
- New landing page for HUB combining account summary and portfolio management
- Contains all pertinent account onboarding and maintenance information
- Supports customer onboarding process (funding, market data, learning)
- Supports first account setup and document uploads
- Anchors HUB as portfolio-centric capability

**FR4.2 Account State Configuration**
- Pre-Funding Dashboard: displays funding steps, market data selection, learning resources
- Post-Funding Dashboard: displays watchlist, account summaries, positions, performance attribution, news, events, benchmarks

**FR4.3 Dashboard Components**
- Account balance and buying power (top)
- Portfolio P&L widget (+$1,250, +2.1% for the day)
- Performance attribution (e.g., AAPL +$800, TSLA +$600, SPY -$150)
- Watchlist widget (10 symbols with real-time quotes)
- News widget (e.g., "AAPL announces new product launch")
- Market snapshot (hotlists, trending symbols)
- Fundamentals Panel (when available, Market Cap, EPS, Dividend, Beta, Float)
- News & Corporate Actions Feed (chronological with source, timestamp, link-out)

**FR4.4 Getting Started Checklist**
- Added to top of Dashboard post-funding
- Helps drive users toward platform personalization
- Provides direct links to active trading platforms (Mobile, TITAN X)
- Marks tiles as completed upon action (e.g., watchlist creation)

#### FR5: Amplitude Event Taxonomy Overhaul
**Priority: P0 (Must Have)**

**FR5.1 Event Taxonomy Migration**
- Fully remove and replace original HUB event taxonomy
- Bring HUB into compliance with new taxonomy managed in Airtable by PM
- Apply consistent approach to event, event property, and user property structure across all platforms

**FR5.2 Airtable Integration**
- Define taxonomy in Airtable (inclusive of events, event properties, user properties)
- Configure Amplitude taxonomy to match Airtable definitions

**FR5.3 Instrumentation and Testing**
- Instrument Amplitude taxonomy throughout all HUB features (new and pre-existing)
- Fully testable from client application through to Amplitude reporting
- Include all events, event properties, and desired user properties

**FR5.4 Taxonomy Readiness**
- Statuses maintained in Airtable according to documented process
- Ensure concise and shared awareness of current readiness

### Non-Functional Requirements

#### NFR1: Performance
**Priority: P0 (Must Have)**

- **Options Chain Load Time**: ≤ 2.0 seconds at p95 under normal network/server conditions
- **Chart Streaming Latency**: Near-real-time (match TITAN X performance)
- **Dashboard Load Time**: < 3 seconds for full page render with all widgets
- **Symbol Detail Navigation**: < 1 second transition between tabs
- **Watchlist Sync**: Changes reflected across platforms within 1 minute
- **Real-time Data Updates**: Quotes, P&L, Greeks update without manual refresh

#### NFR2: Responsive Design & Platform Support
**Priority: P0 (Must Have)**

- **Desktop Breakpoints**: Full feature support for viewport ≥1024px (desktop) or 768–1023px (tablet)
- **Limited Mobile-Web Support**: Viewport <768px loads core read-only views with basic navigation; advanced trading/chart features disabled or redirected to Mobile app and/or TITAN X
- **Browser Support**: Modern browsers (Chrome, Safari, Firefox, Edge) - latest 2 versions
- **Cross-Platform Consistency**: Custom Grouping, Watchlist presentation matches Mobile Flex-View exactly

#### NFR3: Security & Compliance
**Priority: P0 (Must Have)**

- **Authentication**: Secure session management with account context
- **Authorization**: Users can only access their own accounts and positions
- **Data Protection**: All market data, positions, and PII transmitted over HTTPS
- **Audit Trail**: All trade submissions, account changes logged for compliance
- **Order Validation**: Client-side and server-side validation before order submission
- **RedOak Screenshot Submission**: Required feature screenshot submitted for Legal/Compliance review

#### NFR4: Scalability
**Priority: P1 (Should Have)**

- **Concurrent Users**: Support existing user base without degradation
- **Market Data Streaming**: Handle full market hours load for active symbols
- **Options Chain Data**: Efficiently load chains for high-volume symbols (e.g., SPY, AAPL)
- **Watchlist Size**: Support watchlists up to 100 symbols without performance impact

#### NFR5: Reliability & Availability
**Priority: P0 (Must Have)**

- **Uptime Target**: 99.9% during market hours
- **Error Handling**: Graceful degradation if data unavailable (show empty state, not error)
- **Session Persistence**: Maintain user state across page reloads
- **Failover**: Market data failover to backup sources if primary unavailable

## Success Criteria

### Primary Metrics (TSG-287 Goals)

**SC1: First Trade Rate**
- **Baseline**: Current first trade within 15 days rate
- **Target**: Increase by 2% within first year
- **Measurement**: Track users who fund → first trade completion time
- **Attribution**: Watchlist + Getting Started Checklist should reduce friction

**SC2: Fund and Never Trade Reduction**
- **Baseline**: Current % of clients who fund and never trade
- **Target**: Reduce by 5% within first year
- **Measurement**: Track funded accounts with zero trades over 90-day period
- **Attribution**: Integrated workflow should increase activation

**SC3: HVC Retention**
- **Baseline**: 80% HVC retention
- **Target**: Increase to 82% (2% improvement)
- **Measurement**: Track HVCs active on all 3 platforms
- **Attribution**: HVCs who place trades on HUB should have higher retention vs those who don't

**SC4: Platform Adoption (First Login)**
- **Baseline**: Current first login rates on Mobile/TITAN X during first 15 days post-funding
- **Target**: Increase by 15% over next 6-month period
- **Measurement**: Track first login on Mobile during first 15 days post-funding; Track first login on TITAN X during first 15 days post-funding
- **Attribution**: Getting Started Checklist with direct download links

### Secondary Metrics

**SC5: HUB Trade Engagement**
- **Metric**: HVCs who place trades on HUB have increased retention rate vs those who do not
- **Measurement**: Compare retention cohorts (HUB traders vs non-HUB traders)

**SC6: Symbol Detail Usage**
- **Metric**: HVCs who use Symbol Detail have increased retention rate vs those who do not
- **Measurement**: Amplitude events tracking Symbol Detail views, tab interactions

**SC7: Feature Adoption**
- **Chart Trading Adoption**: % of HUB users who place orders from chart
- **Options Chain Usage**: % of options traders using HUB Options Chain
- **Custom Grouping Adoption**: % of options traders creating custom groupings
- **Watchlist Creation**: % of new users creating watchlist within first week

**SC8: Performance Benchmarks**
- **Options Chain Load**: ≥95% of loads complete within 2.0 seconds
- **Chart Streaming**: No missed candles during market hours
- **Cross-Platform Sync**: Watchlist changes reflected within 1 minute in 99% of cases

### Qualitative Success Indicators

**SC9: User Satisfaction**
- **Support Ticket Reduction**: Decrease in tickets related to "How do I trade options?" or "Where is my watchlist?"
- **Feature Feedback**: Positive sentiment in user interviews and surveys
- **Platform Differentiation**: User perception that HUB is distinct from TITAN X (portfolio-first vs active trading)

## Constraints & Assumptions

### Technical Constraints

**TC1: DXCharts Integration**
- **Assumption**: DXCharts can handle every charting capability, study, overlay, and performance target that TITAN X offers today
- **Constraint**: Chart library must be feature-complete at launch (no phased rollout)
- **Risk**: If DXCharts limitations discovered, may need fallback or delayed launch

**TC2: React Performance**
- **Assumption**: Existing React shell can handle three heavy sub-tabs (Overview, Chart, Options Chain) without performance degradation
- **Constraint**: Single-page app architecture must maintain <3 second load times
- **Risk**: May need code-splitting or lazy loading optimization

**TC3: Amplitude Taxonomy Readiness**
- **Assumption**: Amplitude taxonomy will be ready to instrument activation events from day one
- **Constraint**: All new features must be fully instrumented before launch
- **Dependency**: PM team must complete Airtable taxonomy definition before development starts

### Operational Constraints

**OC1: Department Dependencies**
- **Marketing**: All website assets updated, email campaigns ready, Amplitude events created
- **Customer Learning**: 2-minute explainer video, knowledge-base articles, education center updated
- **Sales**: Platform demo webinar prepared, inside sales/institutional teams briefed
- **Customer Support**: Informed about new features, able to troubleshoot, demo webinar available, PM <> Support channel open during launch
- **Product Operations**: Aware of key dates and launch plans
- **Legal/Compliance**: Periodic review meetings scheduled, RedOak screenshot submission completed, host webinar for feature launch, UI questions answered

**OC2: Resource Constraints**
- **Development Teams**: All current HUB teams involved (AOR/OX/Auth)
- **Data Team**: Event data available in Amplitude, Sigma, Databricks in near real-time
- **BI Team**: Default dashboards for adoption, grouped-view trade lift, error rates
- **Risk/InfoSec**: Security review completed before launch

### Business Assumptions

**BA1: Market Timing**
- **Assumption**: Launching integrated workflow will not cannibalize TITAN X active trading usage
- **Rationale**: HUB is portfolio-first; TITAN X remains professional active trading platform
- **Validation**: User segmentation shows different use cases (portfolio management vs intensive intraday)

**BA2: User Adoption**
- **Assumption**: Getting Started Checklist will drive platform downloads and first trade
- **Validation**: Requires post-launch measurement and iteration

**BA3: Options Trading Growth**
- **Assumption**: Completing options workflow in HUB will increase options trading volume
- **Validation**: Track options trade volume pre/post launch

**BA4: Cross-Platform Synergy**
- **Assumption**: HVCs active on all 3 platforms (HUB, TITAN X, Mobile) have higher retention
- **Validation**: Historical data supports this; ongoing measurement required

## Out of Scope

### Explicitly Excluded Features

**EX1: Active Trading Platform Components**
- **Level 2 / Market Depth**: Remains TITAN X exclusive
- **Matrix**: TITAN X exclusive for professional traders
- **Options Visualizations and Strategy Analyzer**: TITAN X exclusive
- **Multiple Charts**: TITAN X supports multi-chart layouts; HUB limited to single/multi-pane
- **Automation / Easy Language**: TITAN X exclusive
- **Radar Scanner**: TITAN X exclusive
- **Risk/Reward Graphs**: TITAN X exclusive

**EX2: Mobile-First Responsive Design**
- **Mobile-Web Limitation**: Users on small screen mobile devices will be driven to Mobile app via "Launch in TS Mobile" redirect
- **Rationale**: Advanced trading/chart features require larger screens; Mobile app provides native experience

**EX3: Advanced Order Types (Initial Release)**
- **Bracket Orders**: May be future enhancement
- **Conditional Orders (beyond OCO/OSO)**: TITAN X exclusive initially
- **Algorithmic Trading**: TITAN X exclusive

**EX4: Portfolio Analytics (Initial Release)**
- **Performance Attribution**: Basic version in Dashboard; advanced analytics out of scope
- **Risk Metrics Beyond Greeks**: Advanced portfolio risk analysis out of scope
- **Tax Loss Harvesting**: Not included in initial release

**EX5: Educational Content Creation**
- **In-Depth Tutorials**: Customer Learning owns content; product provides links
- **Interactive Onboarding Tours**: Basic checklist only; guided tours out of scope
- **Strategy Backtesting**: TITAN X exclusive feature

## Dependencies

### External Dependencies

**ED1: Third-Party Services**
- **DXCharts**: Chart rendering library with full TITAN X feature parity
  - **Risk**: Performance issues or missing features delay launch
  - **Mitigation**: Early integration testing and performance benchmarks
- **Market Data Providers**: Real-time quote feeds for equities and options
  - **Risk**: Data latency or outages impact user experience
  - **Mitigation**: Failover providers and graceful degradation
- **Amplitude**: Analytics platform for event tracking
  - **Risk**: Taxonomy not ready or instrumentation incomplete
  - **Mitigation**: PM-owned Airtable taxonomy definition timeline

**ED2: Platform Services**
- **Authentication Service**: Session management and account context
- **Order Management System**: Trade submission and validation
- **Position Service**: Real-time position data and P&L calculations
- **Market Data Service**: Streaming quotes, Greeks, fundamentals

### Internal Team Dependencies

**ID1: Product Management**
- **Airtable Taxonomy Definition**: Event, event property, user property structure
  - **Timeline**: Must be complete before development instrumentation starts
  - **Owner**: PM team
- **RedOak Screenshot Submission**: Compliance-required feature screenshots
  - **Timeline**: Before launch
  - **Owner**: Product Management

**ID2: Customer Experience**
- **CE Support Team**: Informed about features, able to troubleshoot
  - **Timeline**: 2 weeks before launch
  - **Owner**: CE Support
- **CE Trade Desk**: Demo webinar, platform troubleshooting
  - **Timeline**: 1 week before launch
  - **Owner**: CE Trade Desk

**ID3: Customer Learning**
- **2-Minute Explainer Video**: Feature overview for new users
  - **Timeline**: Launch day
  - **Owner**: Customer Learning
- **Knowledge-Base Articles**: All new features documented
  - **Timeline**: Launch day
  - **Owner**: Customer Learning
- **Education Center Updated**: Feature descriptions and links
  - **Timeline**: Launch day
  - **Owner**: Customer Learning

**ID4: Sales (Inside-Sales & Institutional)**
- **Platform Demo Webinar**: Available to answer questions about release, feature set, value
  - **Timeline**: Launch week
  - **Owner**: Sales

**ID5: Product Data Insights & BI Team**
- **Event Data in Amplitude/Sigma/Databricks**: Near real-time availability
  - **Timeline**: Launch day
  - **Owner**: Product Data Insights
- **Default Dashboards**: Adoption, grouped-view trade lift, error rates
  - **Timeline**: Launch day
  - **Owner**: BI Team

**ID6: Legal / Compliance**
- **Periodic Review Meetings**: Component feature review
  - **Timeline**: Throughout development
  - **Owner**: Legal/Compliance (TSG group)
- **Feature Screenshot Review**: RedOak submission
  - **Timeline**: Before launch
  - **Owner**: Legal/Compliance
- **Host Webinar**: Feature launch explanation, UI questions
  - **Timeline**: Launch day
  - **Owner**: Legal/Compliance

**ID7: Marketing**
- **Website Assets Updated**: TradeStation.com feature pages
  - **Timeline**: Launch day
  - **Owner**: Marketing
- **Email Push**: New feature announcement
  - **Timeline**: Launch day
  - **Owner**: Marketing
- **Amplitude Campaign Events**: Targeted user campaigns
  - **Timeline**: Launch day
  - **Owner**: Marketing

**ID8: Executives**
- **Quarterly KPI Packet**: Adoption and key metrics reporting
  - **Timeline**: Post-launch quarterly updates
  - **Owner**: Product Management
- **Timely Updates**: Post-launch email updates
  - **Timeline**: Weekly for first month post-launch
  - **Owner**: Product Management

**ID9: Risk & InfoSec**
- **Security Review**: Risk assessment and InfoSec approval
  - **Timeline**: Before launch
  - **Owner**: Risk Team, InfoSec

## Technical Architecture Considerations

### Component Architecture

**CA1: Symbol Detail Module**
- Single-page React component with three sub-tabs (Overview, Chart, Options Chain)
- Shared state management for symbol context, account selection, open orders
- Lazy loading for heavy components (Chart, Options Chain) to optimize initial render
- WebSocket connections for streaming quotes, P&L updates, Greeks

**CA2: Watchlist Sync**
- Real-time sync service listening to watchlist CRUD events across platforms
- Eventual consistency model with conflict resolution (last-write-wins)
- Local cache with background sync to minimize perceived latency

**CA3: Custom Grouping Integration**
- Fetch Mobile Custom Grouping configuration via shared service
- Client-side rendering matching Mobile Flex-View presentation logic
- No server-side grouping computation; client-side aggregation only

**CA4: Amplitude Instrumentation**
- Event tracking layer abstracted from UI components
- Centralized event schema validation before sending to Amplitude
- User property enrichment (account type, platform usage, trading activity)

### Data Flow

**DF1: Symbol Detail Navigation**
1. User clicks symbol from Dashboard/Positions/Orders
2. HUB loads Symbol Detail with symbol context and account selection
3. Overview tab loads market snapshot, position data, fundamentals, news
4. Chart/Options Chain tabs load on-demand when user switches tabs
5. Trade ticket opens as modal overlay maintaining Symbol Detail context

**DF2: Options Chain Workflow**
1. User opens Options Chain tab for held symbol
2. Client fetches options chain data with Greeks for all strikes/expiries
3. Held positions highlighted with real-time P&L calculation
4. User selects strategy from dropdown → multi-leg ticket auto-populates
5. User submits order → returns to Positions with Custom Grouping showing updated Greeks

**DF3: Watchlist Sync**
1. User creates watchlist in HUB → event published to sync service
2. Sync service updates TITAN X and Mobile watchlist stores
3. TITAN X/Mobile poll or receive push notification of watchlist change
4. User receives in-app notification in TITAN X/Mobile confirming sync

### Integration Points

**IP1: DXCharts Integration**
- Embed DXCharts component in Chart tab
- Configure with TITAN X study/indicator library
- Implement drawing object persistence layer
- Handle chart trading order submission callbacks

**IP2: Trade Ticket Integration**
- Existing trade ticket component reused across Symbol Detail
- Pre-population logic for chart clicks, options chain selection, overview actions
- Order validation and submission flow unchanged
- Post-order confirmation returns user to previous Symbol Detail context

**IP3: Amplitude Event Taxonomy**
- Centralized event schema defined in Airtable
- Client-side SDK instrumented across all user interactions
- Server-side events for order submissions, account changes
- Event validation layer prevents malformed events from reaching Amplitude

## Risk Analysis

### High-Risk Items

**HR1: DXCharts Performance**
- **Risk**: DXCharts unable to match TITAN X performance benchmarks
- **Impact**: User dissatisfaction, increased TITAN X dependency, failed retention goals
- **Mitigation**: Early performance testing, fallback to simplified chart if needed, phased rollout
- **Probability**: Medium

**HR2: Options Chain Load Time**
- **Risk**: Options chain for high-volume symbols (SPY, AAPL) exceeds 2.0 second target
- **Impact**: Poor user experience, options traders abandon HUB for TITAN X
- **Mitigation**: Backend optimization, caching strategies, progressive rendering
- **Probability**: Medium-High

**HR3: Cross-Platform Sync Reliability**
- **Risk**: Watchlist/Custom Grouping sync failures or delays >1 minute
- **Impact**: User confusion, duplicate work, poor onboarding experience
- **Mitigation**: Robust sync service with retry logic, conflict resolution, user notifications
- **Probability**: Medium

**HR4: Amplitude Taxonomy Incomplete**
- **Risk**: Event taxonomy not ready or instrumentation incomplete at launch
- **Impact**: Cannot measure success metrics, blind to user behavior, delayed iteration
- **Mitigation**: PM-owned timeline for Airtable taxonomy, dedicated instrumentation sprint
- **Probability**: Low-Medium

### Medium-Risk Items

**MR1: React Performance with Heavy Sub-Tabs**
- **Risk**: Loading Overview, Chart, Options Chain in single page causes performance degradation
- **Impact**: Slow page load times, poor user experience
- **Mitigation**: Code-splitting, lazy loading, component-level optimization
- **Probability**: Medium

**MR2: Legal/Compliance Delays**
- **Risk**: RedOak screenshot review or compliance approval delays launch
- **Impact**: Missed launch window, delayed business impact
- **Mitigation**: Early submission, regular check-ins, buffer time in schedule
- **Probability**: Low

**MR3: Department Coordination**
- **Risk**: Marketing, Sales, Customer Learning, Support not ready at launch
- **Impact**: Poor launch experience, user confusion, support ticket surge
- **Mitigation**: Detailed launch checklist, regular cross-functional syncs, early coordination
- **Probability**: Low-Medium

### Low-Risk Items

**LR1: Browser Compatibility**
- **Risk**: Features broken in specific browsers or versions
- **Impact**: Subset of users unable to access features
- **Mitigation**: Cross-browser testing, graceful degradation, browser warnings
- **Probability**: Low

**LR2: Mobile-Web Redirect**
- **Risk**: Users on mobile-web frustrated by limited functionality
- **Impact**: Poor mobile-web experience, user complaints
- **Mitigation**: Clear messaging, direct links to Mobile app, minimal mobile-web features
- **Probability**: Low

## Launch Strategy

### Phased Rollout (Recommended)

**Phase 1: Beta Release (Internal + Select Users)**
- **Audience**: Internal employees, 100 beta users (mix of equity and options traders)
- **Duration**: 2 weeks
- **Goals**: Validate core workflows, identify critical bugs, gather initial feedback
- **Success Criteria**: No critical bugs, positive user feedback, performance targets met

**Phase 2: Limited Release (10% of Users)**
- **Audience**: 10% of active HUB users (stratified by equity vs options traders)
- **Duration**: 2 weeks
- **Goals**: Monitor performance at scale, validate instrumentation, measure early adoption
- **Success Criteria**: No performance degradation, event data flowing correctly, positive adoption trends

**Phase 3: Full Release (100% of Users)**
- **Audience**: All HUB users
- **Timing**: After successful Phase 2
- **Goals**: Drive activation and retention improvements, measure business impact
- **Success Criteria**: TSG-287 goals trending positive, user satisfaction high, no major incidents

### Launch Checklist

**Pre-Launch (2 Weeks Before)**
- [ ] DXCharts performance validation complete
- [ ] Options Chain load time benchmarks met
- [ ] Amplitude taxonomy fully instrumented and tested
- [ ] Cross-platform sync tested (HUB ↔ TITAN X ↔ Mobile)
- [ ] RedOak screenshot submission approved by Legal/Compliance
- [ ] Customer Learning content ready (video, KB articles, education center)
- [ ] Marketing assets ready (website, email, campaigns)
- [ ] Sales team briefed (demo webinar prepared)
- [ ] Support team trained (troubleshooting guide, demo access)
- [ ] BI dashboards configured (adoption, trade lift, error rates)
- [ ] Risk/InfoSec approval obtained

**Launch Day**
- [ ] Feature flag enabled for target audience
- [ ] Monitoring dashboards active (performance, errors, adoption)
- [ ] Support channel open (PM <> Support Slack)
- [ ] Email campaign sent to target users
- [ ] Website updated with feature announcements
- [ ] Legal/Compliance webinar hosted
- [ ] Executive team notified

**Post-Launch (First Week)**
- [ ] Daily performance monitoring (load times, errors, crashes)
- [ ] Daily adoption tracking (Symbol Detail views, Chart usage, Options Chain usage)
- [ ] Support ticket review (identify common issues)
- [ ] User feedback collection (surveys, interviews)
- [ ] Hotfix readiness (critical bug response plan)

**Post-Launch (First Month)**
- [ ] Weekly metric reviews (TSG-287 goals, secondary metrics)
- [ ] Weekly executive updates
- [ ] Bi-weekly user interviews (qualitative feedback)
- [ ] Feature iteration based on feedback and data
- [ ] Quarterly KPI packet prepared

## Appendix

### Glossary

- **HUB**: TradeStation's web-based trading platform focused on portfolio management and opportunistic trading
- **TITAN X**: TradeStation's professional-grade desktop trading platform for active traders
- **Symbol Detail**: Integrated view combining chart, options chain, overview, and trade ticket for a single symbol
- **Options Chain**: Display of all available options contracts for a symbol with Greeks and IV metrics
- **Custom Grouping**: User-defined grouping of positions (e.g., by strategy) with aggregate Greeks
- **Flex-View**: Mobile's custom grouping feature for options positions
- **HVC**: High-Value Customer (active traders with significant account balances)
- **TSG-287**: Internal goal designation for first trade rate, retention, and platform adoption metrics
- **DXCharts**: Third-party charting library providing professional-grade technical analysis
- **Greeks**: Options risk metrics (Delta, Gamma, Theta, Vega)
- **IV**: Implied Volatility
- **OCO**: One-Cancels-Other order type
- **OSO**: One-Sends-Other order type
- **P&L**: Profit & Loss
- **RedOak**: Internal compliance review tool for feature screenshots

### Supporting Documentation

- Dashboard Widget Priority.xlsx (Appendix reference)
- Post Funding Checklist - detail requirements.docx (Appendix reference)
- Dashboard - Portfolio Overview states.docx (Appendix reference)

### Use Cases (from BRD)

**Use Case 1: Create and Sync Watchlist Across Platforms**
- **Primary Actor**: Retail Trader (Newly Onboarded Client)
- **Secondary Actors**: HUB, TITAN X, Mobile App
- **Objective**: Enable user to create a personalized watchlist that syncs across all platforms
- **Context Scenario**: New client logs into HUB for the first time after funding their account. They want to monitor specific symbols and quickly access them across devices.
- **Desired Outcome**: User successfully creates a watchlist in HUB, which is immediately available in TITAN X and Mobile, reducing friction and improving engagement.

**Use Case 2: Morning Portfolio Review → Opportunistic Trade Execution**
- **Primary Actor**: Active Trader (Existing Customer)
- **Secondary Actors**: HUB Dashboard, Symbol Detail, Trade Ticket, Positions Page
- **Objective**: Enable seamless workflow from portfolio monitoring to symbol analysis to trade execution, without leaving HUB or losing portfolio context.
- **Context Scenario**: At 9:35 AM ET, an active trader logs into HUB and lands on the Dashboard. The dashboard displays: Account balance and buying power at the top, Portfolio P&L widget showing +$1,250 (+2.1%) for the day, Performance attribution showing AAPL position up $800, TSLA up $600, SPY down $150, Watchlist widget showing 10 symbols with real-time quotes, News widget showing "AAPL announces new product launch". The trader notices AAPL is up 3.2% and contributing significantly to today's P&L. They click "AAPL" in the Performance Attribution widget.
- **Step-by-Step Flow**:
  1. HUB navigates to Symbol Detail (AAPL) with Overview tab active
  2. Overview displays: Market snapshot (AAPL $185.50 +3.2%, +$5.75), Position card showing "You hold 100 shares at $180.25 avg cost. P&L: +$525 (+2.9%)", Fundamentals panel, News feed with product launch article
  3. Trader clicks "Chart" tab to review technical setup
  4. Chart shows AAPL approaching previous resistance at $186.00
  5. Trader decides to take partial profit: sell 50 shares at market
  6. Trader clicks price on chart → order ticket slides in from right
  7. Order ticket pre-populates: Symbol: AAPL, Action: SELL (since position exists), Quantity: 50 (half of position), Order Type: Market
  8. Trader reviews: "Sell 50 AAPL at Market. Est. proceeds: ~$9,275"
  9. Trader clicks "Place Order" → confirmation modal
  10. Order executes immediately (fills at $185.48)
  11. Post-trade confirmation: "Sold 50 AAPL at $185.48. Your remaining position: 50 shares at $180.25 avg. Realized P&L: +$261.50"
  12. Trader clicks "View Positions" in top nav
  13. HUB navigates back to Positions page
  14. Positions page shows updated: AAPL: 50 shares (down from 100), avg cost $180.25, current P&L +$261.50 (unchanged, but now partially realized), Updated portfolio P&L: +$1,250 (unchanged, but now partially realized)
- **Desired Outcome**: The trader successfully executed a profit-taking trade while maintaining full portfolio context throughout. The workflow felt "portfolio-first" → from portfolio → to symbol detail → to trade → back to portfolio, reinforcing HUB's role as an integrated platform rather than a standalone trading app. The trader feels confident in their decision because they saw both the technical setup (chart) and their existing position details (Overview) before committing.
- **Supports Business Goals**: Retention: Seamless workflow keeps traders engaged in HUB ecosystem; CSAT: Intuitive navigation and context retention improves satisfaction; Portfolio-first design: Differentiates HUB from standalone trading platforms

**Use Case 3: Analyze Symbol Using Integrated Charting**
- **Primary Actor**: Active Trader
- **Secondary Actors**: HUB, DXCharts
- **Objective**: Provide professional-grade charting and order entry directly in the browser.
- **Context Scenario**: Trader wants to analyze a symbol using technical indicators and place an order based on chart patterns without switching to desktop application.
- **Desired Outcome**: Trader performs technical analysis and executes order directly from chart view within HUB.

### Revision History

| Date | Version | Author | Description |
|------|---------|--------|-------------|
| 2026-02-12 | 1.0 | Product Team | Initial PRD creation based on BRD v1.0 (September 24, 2025 / December 8, 2025) |
