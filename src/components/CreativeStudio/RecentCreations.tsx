
import React, { useState } from 'react';
import './CreativeStudio.css';

interface Creation {
  id: string;
  title: string;
  type: string;
  thumbnail: string;
  status: 'active' | 'draft' | 'completed';
  participants: number;
  lastModified: string;
}

const RecentCreations: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const recentCreations: Creation[] = [
    {
      id: '1',
      title: 'Summer Sale Wheel',
      type: 'Wheel of Fortune',
      thumbnail: '/api/placeholder/400/300',
      status: 'active',
      participants: 1247,
      lastModified: '2 hours ago'
    },
    {
      id: '2',
      title: 'Product Launch Quiz',
      type: 'Interactive Quiz',
      thumbnail: '/api/placeholder/400/300',
      status: 'draft',
      participants: 0,
      lastModified: '1 day ago'
    },
    {
      id: '3',
      title: 'Holiday Scratch Cards',
      type: 'Scratch Cards',
      thumbnail: '/api/placeholder/400/300',
      status: 'completed',
      participants: 3429,
      lastModified: '3 days ago'
    },
    {
      id: '4',
      title: 'Brand Memory Challenge',
      type: 'Memory Game',
      thumbnail: '/api/placeholder/400/300',
      status: 'active',
      participants: 892,
      lastModified: '5 days ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#00ff88';
      case 'draft': return '#ff8800';
      case 'completed': return '#0088ff';
      default: return '#666';
    }
  };

  return (
    <section className="recent-creations">
      <div className="section-header">
        <h2 className="section-title">Recent Creations</h2>
        <button className="view-all-btn">
          <span>View All</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
      </div>
      
      <div className="creations-grid">
        {recentCreations.map((creation, index) => (
          <div
            key={creation.id}
            className={`creation-card ${hoveredItem === creation.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredItem(creation.id)}
            onMouseLeave={() => setHoveredItem(null)}
            style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
          >
            <div className="card-thumbnail">
              <div className="thumbnail-placeholder">
                <div className="thumbnail-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </div>
              </div>
              <div className="card-overlay"></div>
            </div>
            
            <div className="card-content">
              <div className="card-header">
                <h3 className="card-title">{creation.title}</h3>
                <div 
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(creation.status) }}
                ></div>
              </div>
              
              <p className="card-type">{creation.type}</p>
              
              <div className="card-stats">
                <div className="stat">
                  <span className="stat-value">{creation.participants.toLocaleString()}</span>
                  <span className="stat-label">Participants</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Modified {creation.lastModified}</span>
                </div>
              </div>
            </div>
            
            <div className="card-glow"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentCreations;
