import React from 'react';

interface OptionsChainTabProps {
  ticker: string;
}

export const OptionsChainTab: React.FC<OptionsChainTabProps> = ({ ticker }) => {
  return (
    <div className="tab-placeholder">
      <div className="placeholder-content">
        <h2>Options Chain</h2>
        <p>Options chain tab for {ticker}</p>
        <p className="coming-soon">Coming soon: Real-time options data with calls and puts</p>
      </div>
    </div>
  );
};
