
import React, { useState } from 'react';
import './CreativeStudio.css';

interface GameType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  isPopular?: boolean;
}

const GameTypeBubbles: React.FC = () => {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  const gameTypes: GameType[] = [
    {
      id: 'wheel',
      name: 'Wheel of Fortune',
      description: 'Spin to win experiences',
      isPopular: true,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'scratch',
      name: 'Scratch Cards',
      description: 'Reveal hidden prizes',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 10l3 3 5-5" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'quiz',
      name: 'Interactive Quiz',
      description: 'Engage with questions',
      isPopular: true,
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 17h.01" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'jackpot',
      name: 'Jackpot Slots',
      description: 'Casino-style excitement',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
          <rect x="8" y="8" width="2" height="8" fill="currentColor"/>
          <rect x="11" y="6" width="2" height="12" fill="currentColor"/>
          <rect x="14" y="10" width="2" height="6" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'memory',
      name: 'Memory Game',
      description: 'Match and remember',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'dice',
      name: 'Dice Roll',
      description: 'Random chance games',
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          <circle cx="8" cy="8" r="1" fill="currentColor"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
          <circle cx="16" cy="16" r="1" fill="currentColor"/>
        </svg>
      )
    }
  ];

  return (
    <section className="game-types-section">
      <div className="section-header">
        <h2 className="section-title">Choose Your Game Mechanic</h2>
        <p className="section-subtitle">
          Select from our library of proven engagement mechanics
        </p>
      </div>
      
      <div className="game-bubbles-grid">
        {gameTypes.map((game, index) => (
          <div
            key={game.id}
            className={`game-bubble ${hoveredGame === game.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredGame(game.id)}
            onMouseLeave={() => setHoveredGame(null)}
            style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
          >
            {game.isPopular && <div className="popular-badge">Popular</div>}
            
            <div className="bubble-inner">
              <div className="bubble-icon">
                {game.icon}
              </div>
              
              <div className="bubble-content">
                <h3 className="bubble-title">{game.name}</h3>
                <p className="bubble-description">{game.description}</p>
              </div>
            </div>
            
            <div className="bubble-glow"></div>
            <div className="bubble-border"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameTypeBubbles;
