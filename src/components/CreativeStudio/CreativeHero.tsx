
import React from 'react';
import './CreativeStudio.css';

const CreativeHero: React.FC = () => {
  return (
    <section className="creative-hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grain-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Create <span className="title-accent">Extraordinary</span><br/>
            Interactive Experiences
          </h1>
          <p className="hero-subtitle">
            Design, launch, and optimize engaging campaigns that convert.<br/>
            From concept to completion in minutes, not hours.
          </p>
        </div>
        
        <div className="hero-cta">
          <button className="primary-cta">
            <span className="cta-text">Start Creating</span>
            <div className="cta-glow"></div>
          </button>
          <button className="secondary-cta">
            <span className="cta-text">Browse Templates</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreativeHero;
