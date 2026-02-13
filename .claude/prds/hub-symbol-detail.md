---
name: hub-symbol-detail
description: Integrated Symbol Detail view with Charts, Options Chain, and Overview for portfolio-centric trading
status: backlog
created: 2026-02-12T17:52:14Z
updated: 2026-02-12T17:52:14Z
---

# PRD: HUB Symbol Detail

## Executive Summary

TradeStation HUB Symbol Detail delivers a unified, portfolio-centric trading experience by integrating the most frequently used trading components—watchlists, charts, options chains, fundamental data, and news—into a cohesive browser-based platform. This feature bridges the gap between casual portfolio monitoring and professional active trading, providing seamless workflows from analysis to execution while maintaining persistent portfolio context.

**Key Value Propositions:**
- **Portfolio-First Design**: Unlike standalone trading platforms, Symbol Detail is architecturally integrated into HUB's portfolio workflow, allowing users to drill down from Dashboard → Positions → Symbol Detail → Trade → Orders, then return seamlessly to their portfolio context
- **Cross-Platform Parity**: Ensures consistent experience across HUB, TITAN X, and Mobile with synchronized watchlists, custom grouping, and unified design patterns
- **Activation & Retention**: Drives new client activation through guided onboarding (Getting Started Checklist) and increases high-value customer retention by providing best-in-class options workflows

## Problem Statement

### What problem are we solving?

**Fragmented trading workflows and inconsistent platform parity.** Active traders currently face:

1. **Incomplete HUB Platform**: HUB lacks critical workflow components (Symbol Detail, charting, options chain, options grouping) available in TITAN X and Mobile, forcing users to switch platforms mid-workflow
2. **Disconnected Onboarding**: New clients lack cross-platform personalization—watchlists created in one platform don't sync to others, creating friction during activation
3. **Options Workflow Gaps**: Traders cannot efficiently manage multi-leg options positions in HUB, limiting the platform's utility for high-value options traders

### Why does this problem exist?

**Product-suite expansion and technical debt.** Desktop, Web Trading, and TITAN X Desktop developed in isolation, resulting in three separate UI design systems and distinct user experiences. Each platform has unique feature sets, creating inconsistent expectations and workflow interruptions.

### Why is this important now?

1. **Recent HUB Investments**: HUB recently introduced portfolio and positions features with basic trading functionality. Without Symbol Detail, charting, options chain, and options grouping, the platform remains incomplete and doesn't fully serve our core user segments
2. **Activation Gaps**: Missing watchlist integration in HUB eliminates a key activation pathway—personalized watchlists drive downloads and logins to TITAN X and Mobile, accelerating time-to-first-trade
3. **Competitive Pressure**: Modern trading platforms provide integrated browser-based experiences with full charting and options capabilities. HUB must match this baseline to retain high-value customers

## User Stories

### Primary Personas

**P1 - Active Equity Day-Trader & Swing Trader**

Trades equities intraday or holds positions for a few days. Uses HUB for portfolio monitoring and quick opportunistic trades on held positions or watchlist symbols. For intensive multi-chart day trading, uses TITAN X.

**User Stories:**

1. **As an** active equity trader, **I want to** navigate from my Positions page or Dashboard watchlist directly into Symbol Detail with one click, **so that** I can quickly analyze and trade symbols without losing portfolio context
   - **Acceptance Criteria:**
     - Single-click navigation from Positions, Dashboard watchlist, Orders page, or symbol search
     - Symbol Detail opens with Overview tab active by default
     - Top navigation persists (Dashboard, Positions, Orders, Balances links remain accessible)
     - Account summary bar shows real-time buying power and portfolio P&L

2. **As an** equity trader, **I want to** view existing position details (quantity, average cost, P&L) in the Overview tab while reviewing the chart, **so that** I can make informed trading decisions based on both technical analysis and current position status
   - **Acceptance Criteria:**
     - Position card displays in Overview tab when user holds position in symbol
     - Real-time P&L calculated from average cost and current price
     - Clear "No position" state when user has no position

3. **As an** active trader, **I want to** launch market, limit, stop, or trailing-stop orders directly from the chart, **so that** I can execute trades quickly based on chart levels
   - **Acceptance Criteria:**
     - Chart trading enabled with price anchoring
     - Order ticket slides in from right side when triggered from chart
     - Order type selector (market, limit, stop, trailing-stop)
     - Visual representation of order on chart after placement

4. **As an** equity trader, **I want to** place OCO/OSO bracket orders without leaving Symbol Detail and see bracket legs plotted visually on the chart, **so that** I can manage risk efficiently in a single workflow
   - **Acceptance Criteria:**
     - Advanced order types available in chart trading ticket
     - Bracket legs visualized on chart with price levels
     - Real-time updates to order status indicators

5. **As an** active trader, **I want to** quickly toggle through symbols in my watchlist without losing portfolio context, **so that** I can efficiently analyze multiple symbols in succession
   - **Acceptance Criteria:**
     - Symbol selector/dropdown accessible from Symbol Detail view
     - Watchlist symbols pre-populated in selector
     - Context (chart settings, tab selection) persists when switching symbols
     - Account bar and navigation remain visible during symbol switches

**P1 - Options Swing-Trader**

Builds multi-day option positions (verticals, butterflies, condors) and monitors Greeks. Uses HUB to analyze symbols from watchlist or existing positions, build strategies, and execute trades without leaving the browser.

**User Stories:**

1. **As an** options trader, **I want to** navigate from the Positions page to Symbol Detail and see existing option positions highlighted in the Options Chain, **so that** I can quickly assess current positions and potential adjustments
   - **Acceptance Criteria:**
     - Held positions highlighted in Options Chain (visual distinction from other strikes)
     - Real-time P&L displayed for held positions
     - Aggregate position Greeks visible at top of chain

2. **As an** options trader, **I want to** select a multi-leg strategy from a dropdown and have the order ticket auto-populate with correct strikes, legs, and direction, **so that** I can execute complex strategies quickly
   - **Acceptance Criteria:**
     - Strategy dropdown (vertical, butterfly, condor, iron condor, etc.) in Options Chain
     - Auto-population of multi-leg ticket with correct parameters
     - Editable legs (strike, quantity, direction) before submission
     - Visual confirmation of strategy structure

3. **As an** options trader, **I want to** display delta, theta, gamma, vega, and IV% for every strike with sortable columns, **so that** I can identify optimal entry points based on Greeks
   - **Acceptance Criteria:**
     - Greeks columns (Delta, Gamma, Theta, Vega) present in Options Chain
     - IV% column with real-time data
     - Sortable columns (click to sort ascending/descending)
     - Values match TITAN X for same symbol and snapshot (parity requirement)

4. **As an** options trader, **I want to** review aggregate position Greeks across all held contracts before adding new positions, **so that** I can manage portfolio-level risk
   - **Acceptance Criteria:**
     - Portfolio Greeks summary displayed at top of Options Chain or in Position card
     - Real-time calculation based on all held option contracts
     - Clear labeling (e.g., "Total Delta: +120", "Total Theta: -$85/day")

5. **As an** options trader, **I want to** close out of Symbol Detail and return to Positions with Custom Grouping to see updated portfolio Greeks, **so that** I can verify post-trade risk adjustments
   - **Acceptance Criteria:**
     - Custom Grouping (Flex View) available in Positions page
     - Grouping parity with Mobile (layout, labels, sort behavior match)
     - Persistent across sessions (user configurations saved)
     - Cross-platform sync (groupings created in Mobile appear in HUB)

**P2 - Newly Onboarded Client**

Funding account for the first time, exploring platform features, and setting up personalized tools. Needs guided onboarding to reach first trade.

**User Stories:**

1. **As a** newly onboarded client, **I want to** create a watchlist in HUB and have it automatically sync to TITAN X and Mobile, **so that** I can access my personalized symbols across all platforms
   - **Acceptance Criteria:**
     - Watchlist creation flow in HUB Dashboard
     - Automatic sync to TITAN X and Mobile (< 1 minute latency)
     - Notification in TITAN X/Mobile when watchlist syncs with link to access
     - Persistent across sessions and devices

2. **As a** new client, **I want to** see a Getting Started Checklist on my Dashboard that guides me through key setup steps, **so that** I can personalize my platform and reach my first trade quickly
   - **Acceptance Criteria:**
     - Checklist visible on post-funding Dashboard
     - Key tasks: Create Watchlist, Download Mobile, Download TITAN X, Watch Educational Video, Explore Symbol Detail
     - Progress tracking (completed tasks marked with checkmark)
     - Direct links to download pages (not generic platforms page)
     - Checklist dismissible or collapsible after completion

3. **As a** new client, **I want to** access direct download links for TITAN X and Mobile from the checklist, **so that** I can quickly set up active trading platforms
   - **Acceptance Criteria:**
     - Mobile Download tile links to app store (iOS/Android) or direct install page
     - TITAN X Download tile links to desktop download page
     - Links open in new tab (HUB remains open)
     - Completion tracked when user clicks link (optimistic completion)

**P3 - Casual Investor**

Checks portfolio periodically, places occasional trades, primarily uses HUB for convenience. Needs fundamental data and news before making decisions.

**User Stories:**

1. **As a** casual investor, **I want to** view fundamental data (market cap, EPS, dividend, beta) and recent news in the Overview tab, **so that** I can make informed investment decisions without switching platforms
   - **Acceptance Criteria:**
     - Fundamentals panel displays Market Cap, EPS, Dividend, Beta, Float
     - Standard units and "N/A" for missing values
     - News feed in reverse chronological order with source and timestamp
     - News articles open via link-out

2. **As a** casual investor, **I want to** see earnings calendar and analyst ratings in the Overview tab, **so that** I can understand upcoming catalysts and market sentiment
   - **Acceptance Criteria:**
     - Earnings calendar shows upcoming and most recent earnings dates
     - Analyst rating widget shows consensus (buy/hold/sell) with coverage details
     - Data refreshes on page load

## Requirements

### Functional Requirements

#### 1. Symbol Detail Module

**1.1 Overview Tab**

- **FR-1.1.1**: Display real-time market snapshot with Last Price, Bid, Ask, Day % Change, and Volume
- **FR-1.1.2**: Show position card when user holds position in symbol (Quantity, Average Cost, Real-time P&L); display "No position" state when user has no position
- **FR-1.1.3**: Render fundamentals panel with Market Cap, EPS, Dividend, Beta, and Float (show "N/A" for missing values)
- **FR-1.1.4**: Display news and corporate actions feed in reverse chronological order with source, timestamp, and link-out capability
- **FR-1.1.5**: Show earnings calendar with upcoming and most recent earnings dates
- **FR-1.1.6**: Display analyst rating widget with consensus and coverage details

**1.2 Charts Tab (DXCharts)**

- **FR-1.2.1**: Stream intraday candles with near-real-time latency (no missing bars)
- **FR-1.2.2**: Provide full library of TITAN X studies/overlays with default parameters
- **FR-1.2.3**: Support single-pane and multi-pane chart layouts with interval selection
- **FR-1.2.4**: Enable chart trading with advanced order types (market, limit, stop, trailing-stop, OCO, OSO)
- **FR-1.2.5**: Display order visualization on chart (price anchor, order type, quantity, status indicator)
- **FR-1.2.6**: Persist study selections and settings across symbol changes and sessions
- **FR-1.2.7**: Show position view on chart (quantity and real-time P&L when position exists)

**1.3 Options Chain Tab**

- **FR-1.3.1**: Load and render options chain in ≤ 2.0 seconds at p95 (performance requirement)
- **FR-1.3.2**: Display calls/puts/strategy/strike count controls with immediate updates on toggle
- **FR-1.3.3**: Show column set with top-of-book, Greeks (Delta, Gamma, Theta, Vega), IV%, and market statistics
- **FR-1.3.4**: Highlight held positions in chain (underlying and options)
- **FR-1.3.5**: Provide strategy preset dropdown (vertical, butterfly, condor, iron condor, etc.)
- **FR-1.3.6**: Auto-populate multi-leg ticket with correct strikes, quantity, and direction when strategy selected
- **FR-1.3.7**: Sync changes between Options Chain and trade ticket (edits in chain reflected in ticket)
- **FR-1.3.8**: Ensure Greeks and IV% values match TITAN X for same symbol/snapshot (parity requirement)
- **FR-1.3.9**: Persist user column settings across sessions

**1.4 Trade Ticket Integration**

- **FR-1.4.1**: Link trade ticket to Overview, Chart, and Options Chain tabs
- **FR-1.4.2**: Pre-populate ticket based on context (symbol, action, quantity)
- **FR-1.4.3**: Support advanced order types (market, limit, stop, trailing-stop, OCO, OSO, bracket orders)
- **FR-1.4.4**: Remain open/closed state persistent during session (survives symbol changes and page navigation)
- **FR-1.4.5**: Sync to top-level account selection unless explicitly changed by user

**1.5 Cross-Module Behavior**

- **FR-1.5.1**: Preserve symbol context when switching between Overview, Chart, and Options tabs
- **FR-1.5.2**: Maintain open order-ticket state across tab switches (no reset)
- **FR-1.5.3**: Display stable multi-component layout (charts, watchlist, positions/orders, order ticket)

#### 2. Custom Grouping (Flex View) in Positions

- **FR-2.1**: Enable custom grouping creation and selection in HUB Positions view
- **FR-2.2**: Display positions grouped with consistent labels and ordering
- **FR-2.3**: Match Mobile Flex-View presentation (layout, labels, sort behavior, expand/collapse)
- **FR-2.4**: Persist grouping configurations across sessions and devices
- **FR-2.5**: Sync custom groupings from Mobile to HUB (cross-platform sync)

#### 3. Watchlist/Hotlists

- **FR-3.1**: Display watchlist on Dashboard (post-funding state)
- **FR-3.2**: Provide watchlist creation flow with symbol search and add functionality
- **FR-3.3**: Sync watchlists across HUB, TITAN X, and Mobile (< 1 minute latency)
- **FR-3.4**: Enable watchlist modification and deletion with cross-platform propagation
- **FR-3.5**: Persist watchlist column customization and settings across sessions
- **FR-3.6**: Display dynamic hotlists (top movers, trending symbols) on Dashboard
- **FR-3.7**: Provide expandable watchlist component under Symbol Detail for quick symbol switching

#### 4. Dashboard

**4.1 Pre-Funding Dashboard**

- **FR-4.1.1**: Display onboarding tasks (funding steps, market data selection, learning resources)
- **FR-4.1.2**: Maintain focus on funding completion and activation

**4.2 Post-Funding Dashboard**

- **FR-4.2.1**: Display account summaries, positions, performance attribution, news, market benchmarks
- **FR-4.2.2**: Show watchlist widget with real-time quotes
- **FR-4.2.3**: Display Getting Started Checklist at top of page (if open items exist)
- **FR-4.2.4**: Retain all Trade Ready Checklist and Document Upload functionality
- **FR-4.2.5**: Support all existing account states and conditions

**4.3 Getting Started Checklist**

- **FR-4.3.1**: Create Watchlist tile with creation flow trigger and completion tracking
- **FR-4.3.2**: Mobile Download tile with direct link to app store/install page
- **FR-4.3.3**: TITAN X Download tile with direct link to desktop download
- **FR-4.3.4**: Educational/Feature Video tile with in-app modal or KB link playback
- **FR-4.3.5**: Symbol Detail tile with navigation to Symbol Detail (retains watchlist context)
- **FR-4.3.6**: Chart Trading and Multileg Options tiles with direct links or launch points to TITAN X/Mobile
- **FR-4.3.7**: Progress tracking (completed tasks marked, persistent across sessions)

#### 5. Navigation & Context Retention

- **FR-5.1**: Provide entry points to Symbol Detail from Dashboard watchlist, Positions page, Orders page, and symbol search
- **FR-5.2**: Maintain top navigation (Dashboard, Positions, Orders, Balances) when in Symbol Detail
- **FR-5.3**: Display account summary bar with real-time buying power and portfolio P&L in Symbol Detail
- **FR-5.4**: Enable seamless return to Positions, Orders, or Dashboard after order placement

#### 6. Responsive Layout

- **FR-6.1**: Apply desktop responsive layout for viewport width ≥ 1024px
- **FR-6.2**: Apply tablet responsive layout for viewport width 768–1023px
- **FR-6.3**: Provide limited mobile-web support for viewport width < 768px (read-only views, redirect advanced features to Mobile/TITAN X)

#### 7. Amplitude Event Taxonomy

- **FR-7.1**: Implement new Amplitude taxonomy for all features (new and pre-existing) as defined in Airtable
- **FR-7.2**: Instrument all events, event properties, and user properties
- **FR-7.3**: Ensure instrumentation is testable from client application through to Amplitude reporting
- **FR-7.4**: Maintain taxonomy status in Airtable according to documented process

### Non-Functional Requirements

**Performance**

- **NFR-1**: Options Chain must load and render in ≤ 2.0 seconds at p95
- **NFR-2**: Real-time quote updates must display with < 1 second latency
- **NFR-3**: Chart streaming must maintain < 500ms latency for intraday candles
- **NFR-4**: Watchlist sync across platforms must complete in < 1 minute

**Scalability**

- **NFR-5**: Support concurrent users across HUB, TITAN X, and Mobile without performance degradation
- **NFR-6**: Handle heavy React shell with three concurrent sub-tabs (Overview, Chart, Options Chain)

**Reliability**

- **NFR-7**: Symbol Detail page load success rate ≥ 99.5%
- **NFR-8**: Order placement success rate ≥ 99.9% (excluding user errors)

**Security**

- **NFR-9**: All trading actions must require user authentication
- **NFR-10**: Order submission must include server-side validation and authorization checks
- **NFR-11**: Session management must follow TradeStation security standards

**Accessibility**

- **NFR-12**: Meet WCAG 2.1 Level AA compliance for all UI components
- **NFR-13**: Support keyboard navigation for all critical workflows
- **NFR-14**: Provide screen reader compatibility for portfolio and trading functions

**Compatibility**

- **NFR-15**: Support modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
- **NFR-16**: Ensure DXCharts compatibility matches TITAN X charting capabilities

**Data Integrity**

- **NFR-17**: Greeks and IV% values must match TITAN X for same symbol/snapshot (data parity)
- **NFR-18**: Position data must sync in real-time across HUB, TITAN X, and Mobile

## Success Criteria

### Business Metrics

**Activation**

1. **Increase first trade within 15 days by 2%** within the first year (baseline: current rate)
2. **Reduce funded-but-never-traded clients by 5%** within the first year
3. **Increase first login on Mobile within 15 days post-funding by 15%** over 6-month period
4. **Increase first login on TITAN X within 15 days post-funding by 15%** over 6-month period

**Retention**

5. **Increase HVC retention by 2%** (from 80% to 82%)
6. **HVCs active on all 3 platforms have increased retention** vs. single-platform users (secondary metric)

**Engagement**

7. **HVCs who place trades on HUB have increased retention** vs. HVCs who don't trade on HUB (secondary metric)
8. **HVCs who use Symbol Detail have increased retention** vs. HVCs who don't (secondary metric)

### Technical Acceptance Criteria

**Overview Tab**

- ✅ Market snapshot displays real-time Last Price, Bid, Ask, Day % Change, Volume
- ✅ Position card shows Quantity and real-time P&L when user holds position; "No position" state otherwise
- ✅ Fundamentals panel displays Market Cap, EPS, Dividend, Beta, Float (with "N/A" for missing values)
- ✅ News feed lists items in reverse chronological order with source, timestamp, and link-out capability
- ✅ Earnings calendar shows upcoming and most recent earnings dates
- ✅ Analyst rating widget displays consensus with coverage details

**Charts Tab**

- ✅ DXCharts streams intraday candles with near-real-time latency (no missing bars)
- ✅ All TITAN X studies/overlays are selectable with default parameters and render correctly
- ✅ Study selections persist across symbol changes and sessions
- ✅ Advanced orders (market, limit, stop, trailing-stop, OCO, OSO) can be placed from chart
- ✅ Orders visualize on chart with price anchor, order type, quantity, and status indicator
- ✅ Single-pane and multi-pane chart layouts supported with interval selection
- ✅ Position view displays Quantity and real-time P&L when position exists

**Options Chain Tab**

- ✅ Chain loads and renders in ≤ 2.0 seconds at p95
- ✅ Strategy presets auto-populate multi-leg ticket with correct strikes, quantity, and direction
- ✅ Greeks (Delta, Gamma, Theta, Vega) and IV% values match TITAN X for same symbol/snapshot
- ✅ Held positions are highlighted in chain
- ✅ Edits in chain immediately reflected in trade ticket
- ✅ Calls/puts/strategy/strike count controls update chain immediately on toggle
- ✅ Column set (top-of-book, Greeks, market stats) present with correctly formatted values
- ✅ User column settings persist across sessions

**Cross-Module**

- ✅ Symbol context and open order-ticket state persist when switching between Overview, Chart, and Options tabs
- ✅ Multi-component page renders charts, watchlist, positions/orders, and order ticket together with stable layout
- ✅ Trade ticket remains open/closed during session when navigating symbols or leaving/returning to page
- ✅ Account selection at top-level persists during session; trade ticket syncs to top-level selection unless user changes it

**Custom Grouping (Flex View)**

- ✅ Custom grouping in HUB Positions displays positions grouped with consistent labels and ordering
- ✅ Grouping presentation (layout, labels, sort behavior, expand/collapse) matches Mobile Flex-View
- ✅ Groupings persist across sessions and devices
- ✅ Groupings created in Mobile sync to HUB without manual reconfiguration

**Responsive Layout**

- ✅ Desktop layout (viewport ≥ 1024px) applies with full feature support
- ✅ Tablet layout (viewport 768–1023px) applies with full feature support
- ✅ Mobile-web (viewport < 768px) provides read-only views and redirects advanced features to Mobile/TITAN X

**Dashboard**

- ✅ Pre-funding dashboard displays onboarding tasks and maintains focus on funding completion
- ✅ Post-funding dashboard displays account summaries, positions, performance attribution, news, market benchmarks, watchlist, and Getting Started Checklist
- ✅ All Trade Ready Checklist and Document Upload functionality retained
- ✅ All account states and conditions supported

**Checklist**

- ✅ Mobile Download tile links directly to app install/login page (not generic platforms page)
- ✅ TITAN X Download tile links directly to desktop download page (not generic platforms page)
- ✅ Educational/Feature Video tile opens video in in-app modal or KB link with playback controls; tracks start/complete state
- ✅ Symbol Detail tile navigates to Symbol Detail with watchlist context retained
- ✅ Create Watchlist tile initiates watchlist creation flow and marks as Completed upon success
- ✅ Upon watchlist creation in HUB, user receives notification in TITAN X/Mobile with sync confirmation and link to access
- ✅ Chart Trading and Multileg Options tiles link directly to features or provide launch points to TITAN X/Mobile

**Watchlist**

- ✅ Watchlist created in HUB persists across sessions and devices
- ✅ Watchlist changes sync to TITAN X and Mobile in < 1 minute
- ✅ Watchlist modifications/deletions propagate across all platforms without manual refresh
- ✅ Watchlist column customization and settings persist across sessions

**Amplitude Event Taxonomy**

- ✅ Amplitude taxonomy for all features fully implemented as defined in Airtable (events, event properties, user properties)
- ✅ Instrumented taxonomy fully tested from client application through to Amplitude reporting
- ✅ Taxonomy status maintained in Airtable according to documented process

**Documentation & Enablement**

- ✅ KB articles published for all new features
- ✅ Onboarding video (2-minute explainer) created and available
- ✅ In-app guided tour for first-time Symbol Detail visitors

## Constraints & Assumptions

### Technical Constraints

1. **DXCharts Capability**: DXCharts is expected to cover every charting capability, study, overlay, and performance target that TITAN X offers today
2. **HUB Performance**: The existing React shell can handle three heavy sub-tabs (Overview, Chart, Options Chain) without performance degradation
3. **Browser Limitations**: HUB is optimized for desktop and tablet; mobile-web provides limited functionality with redirects to native apps

### Timeline Constraints

4. **Amplitude Taxonomy Readiness**: Amplitude taxonomy must be ready at launch to instrument activation events from day one
5. **Cross-Team Dependencies**: Marketing, Customer Support, Product Operations, and Legal must complete enablement activities before launch

### Resource Constraints

6. **Development Teams**: All current HUB teams required for development
7. **Design System Alignment**: Must work within existing HUB React architecture and design system

### Business Assumptions

8. **User Segmentation**: Primary users are active equity/options traders who value cross-platform consistency
9. **Platform Hierarchy**: TITAN X remains the professional-grade solution for intensive intraday trading; HUB serves portfolio management and opportunistic trading
10. **Cross-Platform Synergy**: Users active on multiple platforms (HUB, TITAN X, Mobile) have higher retention than single-platform users

## Out of Scope

The following features are **explicitly excluded** from this initiative. HUB is not an active trading platform; these advanced features remain in TITAN X and Mobile:

1. **Level 2 / Market Depth** - Professional market data for order book visibility
2. **Matrix** - Multi-symbol order entry grid
3. **Options Visualizations and Strategy Analyzer** - Risk/reward graphs and visual strategy analysis
4. **Multiple Charts** - Multi-chart workspace layouts
5. **Automation / Easy Language** - Automated trading strategies and scripting
6. **Radar Scanner** - Real-time market scanning and alerts
7. **Mobile-First Responsiveness** - Full mobile-web trading experience (mobile users redirected to native Mobile app)

**Note:** HUB will provide launch points to these advanced features in TITAN X and Mobile, driving users toward active trader platforms.

## Dependencies

### Internal Dependencies

**Product Management**
- Define and review Amplitude taxonomy in Airtable (events, event properties, user properties)
- Configure Amplitude taxonomy in Amplitude platform
- Maintain taxonomy status in Airtable according to documented process

**Product Data Insights**
- Ensure event data available in Amplitude, Sigma, Databricks in near real-time
- Create default dashboards (adoption, grouped-view trade lift, error rates)

**Marketing**
- Update all TradeStation website assets
- Email campaign announcing new feature launch
- Create Amplitude events for targeted campaigns
- In-app banner announcing release

**Customer Learning**
- Create 2-minute explainer video
- Write knowledge-base articles for all new features
- Update Education Center content

**Customer Support (CE Support, Trade Desk, Concierge)**
- Platform demo webinar for support teams
- Knowledge transfer sessions before launch
- Open PM ↔ Support communication channel during launch

**Sales (Inside Sales & Institutional)**
- Platform demo webinar for sales teams
- Q&A sessions about feature set and value propositions

**Legal / Compliance**
- Periodic meetings to review component features
- Feature screenshot submission through RedOak
- Webinar to explain feature launch and answer UI questions

**Executives**
- Quarterly KPI packet (adoption, retention metrics)
- Post-launch email updates

### External Dependencies

**Third-Party Data Providers**
- Real-time market data feeds (quotes, news, fundamentals, earnings, analyst ratings)
- Options data feeds (Greeks, IV, top-of-book)

**Infrastructure**
- DXCharts library (charting engine with TITAN X parity)
- Amplitude (analytics instrumentation)
- Cross-platform sync infrastructure (watchlist, custom grouping persistence)

### Technical Dependencies

**Platform APIs**
- Positions API (real-time position data across platforms)
- Orders API (order placement, status tracking)
- Market Data API (quotes, fundamentals, news, options chain)
- Watchlist API (CRUD operations, cross-platform sync)
- Custom Grouping API (configuration persistence, cross-platform sync)

**Authentication & Authorization**
- TradeStation SSO (single sign-on across platforms)
- Session management (cross-platform session awareness)

### Risk & Compliance

**Regulatory Requirements**
- Order validation and risk checks
- Market data entitlements and licensing
- Audit trail for all trading actions

---

## Appendix

### Use Case Examples

**Use Case 1: Morning Portfolio Review → Opportunistic Trade Execution**

*Primary Actor:* Active Equity Trader

*Scenario:* At 9:35 AM ET, trader logs into HUB and lands on Dashboard. Dashboard shows account balance, portfolio P&L (+$1,250, +2.1%), performance attribution (AAPL +$800, TSLA +$600, SPY -$150), watchlist with real-time quotes, and news widget ("AAPL announces new product launch"). Trader notices AAPL up 3.2% and clicks "AAPL" in Performance Attribution widget.

*Workflow:*
1. HUB navigates to Symbol Detail (AAPL), Overview tab active
2. Overview displays market snapshot (AAPL $185.50, +3.2%), position card ("100 shares at $180.25 avg, P&L +$525"), fundamentals, and news feed
3. Trader clicks Chart tab to review technical setup
4. Chart shows AAPL approaching resistance at $186.00
5. Trader decides to take partial profit: clicks price on chart → order ticket slides in
6. Ticket pre-populates: SELL 50 AAPL at Market
7. Trader reviews and clicks "Place Order" → confirmation modal → executes
8. Order fills at $185.48; confirmation shows "Sold 50 AAPL at $185.48. Remaining position: 50 shares. Realized P&L: +$261.50"
9. Trader clicks "View Positions" in top nav
10. Positions page shows updated AAPL position (50 shares, +$261.50 P&L)

*Outcome:* Trader successfully executed profit-taking trade while maintaining portfolio context throughout. Workflow felt like "drilling down" from portfolio → symbol detail → trade → back to portfolio.

**Use Case 2: Build Multi-Leg Options Strategy**

*Primary Actor:* Options Swing-Trader

*Scenario:* Trader navigates to Symbol Detail for SPY, opens Options Chain tab, and wants to build an iron condor for upcoming expiration.

*Workflow:*
1. Trader opens Symbol Detail (SPY) from Positions page
2. Clicks Options Chain tab
3. Selects "Iron Condor" from strategy dropdown
4. Clicks desired strikes for short put, long put, short call, long call
5. Multi-leg ticket auto-populates with 4 legs (correct strikes, quantities, directions)
6. Trader reviews Greeks summary (net delta: -5, net theta: +$120/day)
7. Adjusts quantity to 10 contracts
8. Reviews total premium credit: $450
9. Clicks "Place Order" → confirmation modal → executes
10. Order fills; trader clicks "Positions" in top nav
11. Positions page shows new iron condor position with Custom Grouping (Flex View)
12. Position grouped by strategy with aggregate P&L and Greeks

*Outcome:* Trader successfully built and executed complex multi-leg strategy in browser-based environment, with full transparency into portfolio-level Greeks before and after trade.

**Use Case 3: Create and Sync Watchlist Across Platforms**

*Primary Actor:* Newly Onboarded Client

*Scenario:* New client logs into HUB for first time after funding account. Dashboard displays Getting Started Checklist with "Create Watchlist" tile.

*Workflow:*
1. Client clicks "Create Watchlist" tile
2. HUB opens watchlist creation flow
3. Client names watchlist "Tech Stocks"
4. Searches for and adds AAPL, MSFT, GOOGL, TSLA, NVDA
5. Clicks "Save"
6. Watchlist appears on Dashboard with real-time quotes
7. Checklist marks "Create Watchlist" as completed
8. Client receives notification in TITAN X: "Your watchlist 'Tech Stocks' is now synced. Click here to view."
9. Client opens Mobile app and sees "Tech Stocks" watchlist automatically available

*Outcome:* Client successfully personalized HUB and experienced cross-platform consistency, reducing friction and increasing likelihood of exploring TITAN X and Mobile.

### User Journey: Portfolio-First Navigation Flow

```
User Login → Dashboard (Portfolio Overview)
             ├─ Portfolio P&L Widget
             ├─ Performance Attribution (Top gainers/losers)
             ├─ Watchlist Widget (Real-time quotes)
             └─ Getting Started Checklist
                 ↓ (Click symbol in watchlist or performance attribution)

Symbol Detail View
├─ Top Navigation (Dashboard, Positions, Orders, Balances)
├─ Account Summary Bar (Buying power, Portfolio P&L)
├─ Symbol Selector (Watchlist dropdown)
└─ Tabs
    ├─ Overview (Fundamentals, News, Position card)
    ├─ Chart (DXCharts + Chart Trading)
    └─ Options Chain (Multi-leg strategies, Greeks)
        ↓ (Place order from Chart or Options Chain)

Order Confirmation
    ↓ (Click "Positions" or "Dashboard" in top nav)

Return to Portfolio Context
├─ Positions Page (View filled order, updated position)
└─ Dashboard (See portfolio-level impact)
```

### Integration Philosophy

**Symbol Detail IS:**
- A deep-dive view for analyzing and trading specific symbols within portfolio context
- An integrated component of account/position management workflow
- A browser-based alternative for traders who prefer web access over desktop apps
- A "quick-execution" environment for opportunistic trades on held or watchlist symbols

**Symbol Detail IS NOT:**
- A multi-workspace professional trading platform
- A standalone "day trading terminal" with Level 2, Matrix, or multi-chart layouts
- A full-featured active-trading platform (those workflows remain in TITAN X)

This design philosophy ensures HUB accelerates activation and drives trading activity while maintaining its identity as a unified portfolio management platform, complementing (not replacing) TITAN X and Mobile.
