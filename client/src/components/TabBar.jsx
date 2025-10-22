import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './TabBar.css';

function TabBar({ tabs, activeTab, onTabClick, onTabClose }) {
  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div
          key={tab.path}
          className={`tab ${activeTab === tab.path ? 'active' : ''} ${tab.isDirty ? 'dirty' : ''}`}
          onClick={() => onTabClick(tab.path)}
        >
          <span className="tab-name">
            {tab.name}
            {tab.isDirty && <span className="dirty-indicator">●</span>}
          </span>
          <button
            className="tab-close"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.path);
            }}
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
}

export default TabBar;
