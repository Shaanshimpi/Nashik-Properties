import React from 'react';
import './ConfigurationSelector.css';

export const ConfigurationSelector = ({ configurations, selected, onSelect }) => {
  if (Object.keys(configurations).length === 0) {
    return null;
  }

  return (
    <div className="configuration-selector">
      <div className="configuration-selector__grid">
        {Object.keys(configurations).map((config) => (
          <button
            key={config}
            className={`configuration-selector__option ${selected === config ? 'configuration-selector__option--selected' : ''}`}
            onClick={() => onSelect(config)}
          >
            <span className="configuration-selector__label">{config}</span>
            <span className="configuration-selector__price">
              ₹{Number(configurations[config].base_price).toLocaleString('en-IN')}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConfigurationSelector;