/**
 * Symbol Detail Page
 * Main container for symbol detail view with tabs and header
 */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SymbolTab } from '../types/symbol';

export function SymbolDetailPage() {
  const { ticker } = useParams<{ ticker: string }>();
  const [activeTab, setActiveTab] = useState<SymbolTab>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Validate ticker parameter
    if (!ticker) {
      setError('No symbol ticker provided');
      setLoading(false);
      return;
    }

    // Simulate loading state (will be replaced by actual data fetching)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [ticker]);

  // Handle loading state
  if (loading) {
    return (
      <div className="symbol-detail-page loading">
        <div className="loading-spinner">Loading {ticker?.toUpperCase()}...</div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="symbol-detail-page error">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Handle missing ticker
  if (!ticker) {
    return (
      <div className="symbol-detail-page error">
        <div className="error-message">
          <h2>Invalid Symbol</h2>
          <p>No ticker symbol provided</p>
        </div>
      </div>
    );
  }

  return (
    <div className="symbol-detail-page">
      {/* Header Placeholder - Will be replaced by SymbolHeader component */}
      <div className="symbol-header-placeholder">
        <h1>{ticker.toUpperCase()}</h1>
        <p>Symbol Header Component (Stream B)</p>
      </div>

      {/* Tabs Placeholder - Will be replaced by SymbolTabs component */}
      <div className="symbol-tabs-placeholder">
        <div className="tabs-nav">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={activeTab === 'chart' ? 'active' : ''}
            onClick={() => setActiveTab('chart')}
          >
            Chart
          </button>
          <button
            className={activeTab === 'options' ? 'active' : ''}
            onClick={() => setActiveTab('options')}
          >
            Options
          </button>
        </div>
        <div className="tab-content">
          <p>Tab: {activeTab} - Components coming from Stream C</p>
        </div>
      </div>
    </div>
  );
}
