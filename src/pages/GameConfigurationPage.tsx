
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GameConfiguration from '../components/GameConfiguration/GameConfiguration';

const GameConfigurationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gameType = searchParams.get('type') || 'wheel';

  const handleNext = (config: any) => {
    // Store config in localStorage or state management
    localStorage.setItem('gameConfig', JSON.stringify(config));
    // Navigate to next step (Brand Customization - Step 3)
    navigate(`/gamification/customization?type=${gameType}`);
  };

  const handleBack = () => {
    navigate('/gamification/mechanic-selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <GameConfiguration
        gameType={gameType}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  );
};

export default GameConfigurationPage;
