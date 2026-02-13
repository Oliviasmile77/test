/**
 * Symbol Detail Page
 * Main container for symbol detail view with tabs and header
 */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SymbolDetailTabs } from '../components/symbol-detail/SymbolDetailTabs';

export function SymbolDetailPage() {
  const { ticker } = useParams<{ ticker: string }>();
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
      <SymbolDetailTabs />
    </div>
  );
}
