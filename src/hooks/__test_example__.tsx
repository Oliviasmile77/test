// Example usage of useSymbolData hook
// This file demonstrates how components will consume the data layer

import { useSymbolData } from './useSymbolData';

function SymbolExample() {
  const { quote, isLoading, error } = useSymbolData('AAPL');

  if (isLoading) {
    return <div>Loading quote data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!quote) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h2>{quote.name} ({quote.ticker})</h2>
      <p>Last Price: ${quote.lastPrice}</p>
      <p>Change: ${quote.change} ({quote.changePercent}%)</p>
      <p>Volume: {quote.volume.toLocaleString()}</p>
    </div>
  );
}

export default SymbolExample;
