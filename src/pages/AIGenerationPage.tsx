
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AIGenerationStep from '../components/AIGeneration/AIGenerationStep';

const AIGenerationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gameType = searchParams.get('type') || 'wheel';

  const handleNext = (generatedData: any) => {
    // Store the AI-generated data
    const existingConfig = JSON.parse(localStorage.getItem('gameConfig') || '{}');
    const finalConfig = {
      ...existingConfig,
      aiGeneration: generatedData
    };
    localStorage.setItem('gameConfig', JSON.stringify(finalConfig));
    
    // Navigate to the final editor
    navigate(`/gamification/editor/new?type=${gameType}`);
  };

  const handleBack = () => {
    navigate(`/gamification/brand-customization?type=${gameType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <AIGenerationStep
        gameType={gameType}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  );
};

export default AIGenerationPage;
