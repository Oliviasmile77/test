import { useEffect, useRef } from 'react';
import { useSymbolDetailStore } from '../stores/symbolDetailStore';
import { fetchQuote } from '../services/symbolService';

/**
 * Custom hook to fetch and manage symbol quote data
 * @param ticker - Stock ticker symbol to fetch data for
 * @returns Object containing quote data, loading state, and error
 */
export function useSymbolData(ticker: string | null) {
  const {
    currentSymbol,
    quoteData,
    isLoading,
    error,
    setSymbol,
    updateQuote,
    setLoading,
    setError,
  } = useSymbolDetailStore();

  // Track the last fetched ticker to prevent duplicate fetches
  const lastFetchedRef = useRef<string | null>(null);

  useEffect(() => {
    // Don't fetch if no ticker provided
    if (!ticker) {
      return;
    }

    const upperTicker = ticker.toUpperCase();

    // Update current symbol in store
    setSymbol(upperTicker);

    // Skip if we just fetched this symbol
    if (lastFetchedRef.current === upperTicker) {
      return;
    }

    // Fetch quote data
    const loadQuote = async () => {
      setLoading(true);
      lastFetchedRef.current = upperTicker;

      try {
        const quote = await fetchQuote(upperTicker);
        updateQuote(quote);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch quote';
        setError({
          message: errorMessage,
          ticker: upperTicker,
        });
      }
    };

    loadQuote();
  }, [ticker, setSymbol, updateQuote, setLoading, setError]);

  return {
    ticker: currentSymbol,
    quote: quoteData,
    isLoading,
    error,
  };
}
