# State Management Layer - Quick Reference

## Overview
Clean data layer for symbol detail feature using Zustand for state management.

## Usage in Components

```tsx
import { useSymbolData } from '../hooks/useSymbolData';

function MyComponent() {
  const { ticker, quote, isLoading, error } = useSymbolData('AAPL');

  // quote contains: ticker, name, lastPrice, change, changePercent,
  //                 volume, high, low, open, previousClose, timestamp
}
```

## Supported Symbols (Mock Data)
- **AAPL** - Apple Inc.
- **TSLA** - Tesla, Inc.
- **SPY** - SPDR S&P 500 ETF Trust
- **MSFT** - Microsoft Corporation

## API Structure

### `useSymbolData(ticker: string | null)`
Main hook for fetching quote data. Handles loading states and errors automatically.

**Returns:**
- `ticker` - Current symbol being displayed
- `quote` - Quote data object (or null)
- `isLoading` - Boolean loading state
- `error` - Error object (or null)

### Store Actions (Advanced Usage)
```tsx
import { useSymbolDetailStore } from '../stores/symbolDetailStore';

const { setSymbol, updateQuote, setLoading, setError, reset } = useSymbolDetailStore();
```

### Service Layer
```tsx
import { fetchQuote } from '../services/symbolService';

const quote = await fetchQuote('AAPL'); // 500ms simulated delay
```

## Notes
- Mock data includes random price variation for realism
- 500ms API delay simulated
- Real API integration can be swapped in later
- State is shared across all components
