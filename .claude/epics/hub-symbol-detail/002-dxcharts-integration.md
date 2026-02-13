---
name: DXCharts Integration
status: open
created: 2026-02-12T18:31:10Z
updated: 2026-02-12T18:31:10Z
github: [Will be updated when synced to GitHub]
depends_on: [001]
parallel: true
conflicts_with: []
---

# Task: DXCharts Integration

## Description
Integrate the DXCharts library into the Symbol Detail Chart tab, implementing advanced charting features including chart trading capabilities, technical study selector, drawing tools, and real-time data streaming. Provide a professional-grade charting experience with full customization options.

## Acceptance Criteria
- [ ] DXCharts library installed and configured
- [ ] Chart component renders in Chart tab with real-time data
- [ ] Chart trading enabled (place orders directly from chart)
- [ ] Technical studies selector with 20+ indicators (SMA, EMA, MACD, RSI, Bollinger Bands, etc.)
- [ ] Drawing tools implemented (trend lines, channels, fibonacci retracements)
- [ ] Time interval selector (1m, 5m, 15m, 1h, 1d, 1w, 1mo)
- [ ] Chart type selector (candlestick, line, area, bar, heikin-ashi)
- [ ] Real-time tick data streaming and chart updates
- [ ] Chart settings persistence (studies, drawings, preferences)
- [ ] Performance optimized for large datasets (1000+ candles)

## Technical Details
Implementation approach:
- Install `@devexperts/dxcharts-lite` or equivalent
- Create `ChartTab.tsx` with DXCharts wrapper component
- Implement `ChartContainer.tsx` with configuration and lifecycle management
- Build `ChartToolbar.tsx` for studies, intervals, chart types
- Create `ChartTradingPanel.tsx` for order entry from chart
- Use WebSocket service for real-time chart data
- Implement chart settings store for persistence

Key files:
- `src/components/symbol-detail/chart/ChartTab.tsx`
- `src/components/symbol-detail/chart/ChartContainer.tsx`
- `src/components/symbol-detail/chart/ChartToolbar.tsx`
- `src/components/symbol-detail/chart/ChartTradingPanel.tsx`
- `src/components/symbol-detail/chart/StudySelector.tsx`
- `src/services/chartDataService.ts`
- `src/stores/chartSettingsStore.ts`

## Dependencies
- [ ] Task 001 completed (Symbol Detail container available)
- [ ] DXCharts license obtained
- [ ] Chart data API endpoints available
- [ ] WebSocket service for streaming data

## Effort Estimate
- Size: L
- Hours: 16-24 hours
- Parallel: true

## Definition of Done
- [ ] Code implemented
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Deployed to staging
