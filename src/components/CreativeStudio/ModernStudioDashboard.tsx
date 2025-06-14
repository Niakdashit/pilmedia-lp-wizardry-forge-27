
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ModernStudio.css';

// Custom SVG Icons for each game type
const CustomIcons = {
  wheel: (
    <svg viewBox="0 0 32 32" className="custom-icon">
      <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 4 L16 16 L28 16" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="16" r="2" fill="currentColor"/>
    </svg>
  ),
  quiz: (
    <svg viewBox="0 0 32 32" className="custom-icon">
      <path d="M8 6 L24 6 L24 20 L16 20 L12 26 L12 20 L8 20 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="12" r="1" fill="currentColor"/>
      <path d="M16 14 L16 18" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  scratch: (
    <svg viewBox="0 0 32 32" className="custom-icon">
      <rect x="6" y="8" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 12 L14 16 L22 8" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="20" cy="20" r="1" fill="currentColor"/>
    </svg>
  ),
  dice: (
    <svg viewBox="0 0 32 32" className="custom-icon">
      <rect x="6" y="6" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="16" cy="16" r="1.5" fill="currentColor"/>
      <circle cx="20" cy="20" r="1.5" fill="currentColor"/>
    </svg>
  ),
  jackpot: (
    <svg viewBox="0 0 32 32" className="custom-icon">
      <path d="M8 12 L8 20 L24 20 L24 12" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 8 L12 12 L20 12 L20 8" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="16" r="2" fill="currentColor"/>
      <path d="M14 24 L18 24" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  memory: (
    <svg viewBox="0 0 32 32" className="custom-icon">
      <rect x="6" y="6" width="8" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="18" y="6" width="8" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="6" y="18" width="8" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="18" y="18" width="8" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="10" cy="10" r="1" fill="currentColor"/>
      <circle cx="22" cy="22" r="1" fill="currentColor"/>
    </svg>
  ),
  puzzle: (
    <svg viewBox="0 0 32 32" className="custom-icon">
      <path d="M6 6 L14 6 L14 10 L18 10 L18 6 L26 6 L26 14 L22 14 L22 18 L26 18 L26 26 L18 26 L18 22 L14 22 L14 26 L6 26 Z" 
            fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="16" cy="8" r="2" fill="none" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  form: (
    <svg viewBox="0 0 32 32" className="custom-icon">
      <rect x="6" y="4" width="20" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 10 L22 10" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 14 L18 14" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 18 L22 18" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 22 L16 22" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
};

const gameTypes = [
  { type: 'wheel', label: 'Roue de la fortune' },
  { type: 'quiz', label: 'Quiz' },
  { type: 'scratch', label: 'Grattage' },
  { type: 'dice', label: 'Dés' },
  { type: 'jackpot', label: 'Jackpot' },
  { type: 'memory', label: 'Memory' },
  { type: 'puzzle', label: 'Puzzle' },
  { type: 'form', label: 'Formulaire' }
];

const recentCampaigns = [
  {
    id: '1',
    name: 'Quiz Marketing Digital',
    type: 'quiz',
    participants: 4,
    status: 'draft',
    createdAt: '17 mai 2025',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
  },
  {
    id: '2',
    name: 'Roue de la fortune Soldes',
    type: 'wheel',
    participants: 45,
    status: 'active',
    createdAt: '16 mai 2025',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
  },
  {
    id: '3',
    name: 'Campagne Instagram Été',
    type: 'dice',
    participants: 128,
    status: 'active',
    createdAt: '15 mai 2025',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'
  }
];

const ModernStudioDashboard: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="modern-studio">
      {/* Animated Background */}
      <div className="studio-background">
        <div className="bokeh-container">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`bokeh bokeh-${i + 1}`} />
          ))}
        </div>
        <div className="light-streaks">
          <div className="streak streak-1" />
          <div className="streak streak-2" />
          <div className="streak streak-3" />
        </div>
        <div className="gradient-overlay" />
      </div>

      {/* Hero Section */}
      <section className={`hero-section ${mounted ? 'hero-mounted' : ''}`}>
        <div className="hero-content">
          <h1 className="hero-title">
            Créez des expériences{' '}
            <span className="neon-accent">interactives</span>{' '}
            exceptionnelles
          </h1>
          <p className="hero-subtitle">
            Concevez, déployez et optimisez vos campagnes marketing avec notre studio créatif de nouvelle génération
          </p>
          
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Recherchez vos créations, templates, inspirations..."
              className="search-input"
            />
          </div>
        </div>
      </section>

      {/* Game Type Bubbles */}
      <section className="bubbles-section">
        <div className="bubbles-container">
          <div className="section-header">
            <h2 className="section-title">Choisissez votre format</h2>
            <p className="section-subtitle">Sélectionnez le type d'expérience que vous souhaitez créer</p>
          </div>
          
          <div className="bubbles-dock">
            {gameTypes.map((game, index) => (
              <Link 
                key={game.type}
                to={`/quick-campaign?type=${game.type}`}
                className={`bubble ${mounted ? 'bubble-mounted' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bubble-icon">
                  {CustomIcons[game.type as keyof typeof CustomIcons]}
                  <div className="icon-glow" />
                </div>
                <span className="bubble-label">{game.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Creations Gallery */}
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="section-header">
            <h2 className="section-title">Vos créations récentes</h2>
            <Link to="/campaigns" className="view-all-link">
              Voir toutes vos campagnes
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
          </div>

          <div className="gallery-grid">
            {recentCampaigns.map((campaign, index) => (
              <div 
                key={campaign.id}
                className={`gallery-item ${mounted ? 'gallery-item-mounted' : ''}`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="gallery-image">
                  <img src={campaign.image} alt={campaign.name} />
                  <div className="image-overlay" />
                  <div className="status-badge">
                    <span className={`status-dot status-${campaign.status}`} />
                    {campaign.status === 'active' ? 'Active' : 'Brouillon'}
                  </div>
                </div>
                <div className="gallery-content">
                  <h3 className="gallery-title">{campaign.name}</h3>
                  <div className="gallery-meta">
                    <span className="participants">{campaign.participants} participants</span>
                    <span className="date">{campaign.createdAt}</span>
                  </div>
                </div>
                <div className="gallery-glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="actions-section">
        <div className="actions-container">
          <Link to="/quick-campaign" className="primary-action">
            <span>Création rapide</span>
            <div className="action-glow" />
          </Link>
          <Link to="/campaigns" className="secondary-action">
            <span>Gérer vos campagnes</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ModernStudioDashboard;
