import React from 'react';

interface OverviewTabProps {
  ticker: string;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ ticker }) => {
  return (
    <div className="tab-placeholder">
      <div className="placeholder-content">
        <h2>Overview</h2>
        <p>Overview tab for {ticker}</p>
        <p className="coming-soon">Coming soon: Company information, key statistics, and financial data</p>
      </div>
    </div>
  );
};
