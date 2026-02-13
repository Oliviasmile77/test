/**
 * Symbol Detail Type Definitions
 * Core types for symbol data, quotes, and UI state
 */

// Tab types for Symbol Detail page
export type SymbolTab = 'overview' | 'chart' | 'options';

// Main symbol interface
export interface Symbol {
  ticker: string;
  name: string;
  exchange: string;
  assetType: string;
  description?: string;
}

// Real-time quote data
export interface Quote {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  avgVolume: number;
  marketCap: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  lastUpdated: string; // ISO 8601 timestamp
}

// Symbol detail page state
export interface SymbolDetailState {
  symbol: Symbol | null;
  quote: Quote | null;
  loading: boolean;
  error: string | null;
  activeTab: SymbolTab;
}

// API response types
export interface SymbolResponse {
  success: boolean;
  data?: Symbol;
  error?: string;
}

export interface QuoteResponse {
  success: boolean;
  data?: Quote;
  error?: string;
}
