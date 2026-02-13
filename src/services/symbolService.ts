import { Quote } from '../types/quote';

// Mock quote data for supported symbols
const MOCK_QUOTES: Record<string, Omit<Quote, 'ticker' | 'timestamp'>> = {
  AAPL: {
    name: 'Apple Inc.',
    lastPrice: 185.92,
    change: 2.15,
    changePercent: 1.17,
    volume: 52431890,
    high: 186.50,
    low: 183.20,
    open: 184.50,
    previousClose: 183.77,
  },
  TSLA: {
    name: 'Tesla, Inc.',
    lastPrice: 242.84,
    change: -5.23,
    changePercent: -2.11,
    volume: 98234567,
    high: 248.90,
    low: 241.10,
    open: 247.50,
    previousClose: 248.07,
  },
  SPY: {
    name: 'SPDR S&P 500 ETF Trust',
    lastPrice: 487.23,
    change: 0.89,
    changePercent: 0.18,
    volume: 45678901,
    high: 488.10,
    low: 485.90,
    open: 486.50,
    previousClose: 486.34,
  },
  MSFT: {
    name: 'Microsoft Corporation',
    lastPrice: 402.56,
    change: 4.32,
    changePercent: 1.08,
    volume: 28456789,
    high: 403.20,
    low: 399.80,
    open: 400.10,
    previousClose: 398.24,
  },
};

/**
 * Simulates fetching quote data from an API
 * @param ticker - Stock ticker symbol
 * @returns Promise resolving to Quote data
 * @throws Error if ticker is not supported
 */
export async function fetchQuote(ticker: string): Promise<Quote> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const upperTicker = ticker.toUpperCase();
  const mockData = MOCK_QUOTES[upperTicker];

  if (!mockData) {
    throw new Error(`Symbol ${ticker} not found. Supported symbols: ${Object.keys(MOCK_QUOTES).join(', ')}`);
  }

  // Add random variation to make it feel more real
  const variation = (Math.random() - 0.5) * 2; // ±1
  const lastPrice = Number((mockData.lastPrice + variation).toFixed(2));
  const change = Number((lastPrice - mockData.previousClose).toFixed(2));
  const changePercent = Number(((change / mockData.previousClose) * 100).toFixed(2));

  return {
    ticker: upperTicker,
    name: mockData.name,
    lastPrice,
    change,
    changePercent,
    volume: mockData.volume,
    high: mockData.high,
    low: mockData.low,
    open: mockData.open,
    previousClose: mockData.previousClose,
    timestamp: new Date().toISOString(),
  };
}
