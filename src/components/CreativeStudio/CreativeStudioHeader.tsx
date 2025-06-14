
import React from 'react';
import './CreativeStudio.css';

const CreativeStudioHeader: React.FC = () => {
  return (
    <header className="creative-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-mark">
            <div className="logo-symbol"></div>
          </div>
          <span className="logo-text">Leadya Studio</span>
        </div>
        
        <nav className="main-nav">
          <a href="#" className="nav-link">Projects</a>
          <a href="#" className="nav-link">Library</a>
          <a href="#" className="nav-link">Analytics</a>
        </nav>

        <div className="header-actions">
          <div className="search-container">
            <div className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search campaigns, templates..."
              className="search-input"
            />
          </div>
          
          <button className="profile-btn">
            <div className="profile-avatar"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default CreativeStudioHeader;
