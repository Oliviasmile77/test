import React from 'react';

interface ChartTabProps {
  ticker: string;
}

export const ChartTab: React.FC<ChartTabProps> = ({ ticker }) => {
  return (
    <div className="tab-placeholder">
      <div className="placeholder-content">
        <h2>Chart</h2>
        <p>Chart tab for {ticker}</p>
        <p className="coming-soon">Coming soon: Interactive price charts with technical indicators</p>
      </div>
    </div>
  );
};
