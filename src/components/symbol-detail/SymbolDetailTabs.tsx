import React from 'react';
import { Routes, Route, NavLink, useParams, Navigate } from 'react-router-dom';
import { SymbolHeader } from './SymbolHeader';
import { OverviewTab } from './OverviewTab';
import { ChartTab } from './ChartTab';
import { OptionsChainTab } from './OptionsChainTab';
import type { Quote } from '../../types/symbol';
import '../../styles/SymbolDetail.module.css';

// Mock data for development - will be replaced with API calls from Stream A
const getMockQuote = (ticker: string): Quote => ({
  ticker: ticker.toUpperCase(),
  price: 150.25,
  change: 2.50,
  changePercent: 1.69,
  volume: 45678900,
  avgVolume: 42000000,
  marketCap: 2500000000000,
  high: 152.30,
  low: 148.50,
  open: 149.00,
  previousClose: 147.75,
  lastUpdated: new Date().toISOString(),
});

export const SymbolDetailTabs: React.FC = () => {
  const { ticker } = useParams<{ ticker: string }>();

  if (!ticker) {
    return <Navigate to="/" replace />;
  }

  // TODO: Replace with actual data fetching from Stream A
  const quote = getMockQuote(ticker);
  const symbolName = `${ticker.toUpperCase()} Inc.`; // Mock name

  return (
    <div className="symbol-detail-container">
      <SymbolHeader quote={quote} symbolName={symbolName} />

      <nav className="symbol-tabs">
        <NavLink
          to={`/symbol/${ticker}/overview`}
          className={({ isActive }) => isActive ? 'tab active' : 'tab'}
        >
          Overview
        </NavLink>
        <NavLink
          to={`/symbol/${ticker}/chart`}
          className={({ isActive }) => isActive ? 'tab active' : 'tab'}
        >
          Chart
        </NavLink>
        <NavLink
          to={`/symbol/${ticker}/options`}
          className={({ isActive }) => isActive ? 'tab active' : 'tab'}
        >
          Options Chain
        </NavLink>
      </nav>

      <div className="tab-content">
        <Routes>
          <Route path="/" element={<Navigate to="overview" replace />} />
          <Route path="/overview" element={<OverviewTab ticker={ticker} />} />
          <Route path="/chart" element={<ChartTab ticker={ticker} />} />
          <Route path="/options" element={<OptionsChainTab ticker={ticker} />} />
        </Routes>
      </div>
    </div>
  );
};
