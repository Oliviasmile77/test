import React from 'react';
import type { Quote } from '../../types/symbol';
import '../../styles/SymbolDetail.module.css';

interface SymbolHeaderProps {
  quote: Quote;
  symbolName?: string;
}

export const SymbolHeader: React.FC<SymbolHeaderProps> = ({ quote, symbolName }) => {
  const isPositive = quote.change >= 0;
  const changeClass = isPositive ? 'change-positive' : 'change-negative';
  const changeSign = isPositive ? '+' : '';

  return (
    <div className="symbol-header">
      <div className="symbol-header-main">
        <div className="symbol-title">
          <h1 className="symbol-ticker">{quote.ticker}</h1>
          {symbolName && <span className="symbol-name">{symbolName}</span>}
        </div>
        <div className="symbol-quote">
          <span className="symbol-price">${quote.price.toFixed(2)}</span>
          <span className={`symbol-change ${changeClass}`}>
            {changeSign}${quote.change.toFixed(2)} ({changeSign}{quote.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
      <div className="symbol-header-meta">
        <div className="meta-item">
          <span className="meta-label">Open</span>
          <span className="meta-value">${quote.open.toFixed(2)}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">High</span>
          <span className="meta-value">${quote.high.toFixed(2)}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Low</span>
          <span className="meta-value">${quote.low.toFixed(2)}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Volume</span>
          <span className="meta-value">{quote.volume.toLocaleString()}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Prev Close</span>
          <span className="meta-value">${quote.previousClose.toFixed(2)}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Last Updated</span>
          <span className="meta-value">{new Date(quote.lastUpdated).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};
