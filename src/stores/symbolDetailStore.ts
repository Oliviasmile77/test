import { create } from 'zustand';
import { Quote, QuoteError } from '../types/quote';

interface SymbolDetailState {
  // Current state
  currentSymbol: string | null;
  quoteData: Quote | null;
  isLoading: boolean;
  error: QuoteError | null;

  // Actions
  setSymbol: (ticker: string) => void;
  updateQuote: (quote: Quote) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: QuoteError | null) => void;
  reset: () => void;
}

const initialState = {
  currentSymbol: null,
  quoteData: null,
  isLoading: false,
  error: null,
};

export const useSymbolDetailStore = create<SymbolDetailState>((set) => ({
  ...initialState,

  setSymbol: (ticker: string) =>
    set({
      currentSymbol: ticker.toUpperCase(),
      error: null,
    }),

  updateQuote: (quote: Quote) =>
    set({
      quoteData: quote,
      isLoading: false,
      error: null,
    }),

  setLoading: (loading: boolean) =>
    set({
      isLoading: loading,
      error: loading ? null : undefined, // Clear error when starting new load
    }),

  setError: (error: QuoteError | null) =>
    set({
      error,
      isLoading: false,
    }),

  reset: () => set(initialState),
}));
