export interface Quote {
  ticker: string;
  name: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: string;
}

export interface QuoteError {
  message: string;
  ticker?: string;
}
