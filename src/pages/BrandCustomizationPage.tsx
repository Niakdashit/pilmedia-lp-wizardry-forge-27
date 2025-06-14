
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BrandCustomizationStep from '../components/BrandCustomization/BrandCustomizationStep';

const BrandCustomizationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gameType = searchParams.get('type') || 'wheel';

  const handleNext = (brandData: any) => {
    // Store brand customization data
    const existingConfig = JSON.parse(localStorage.getItem('gameConfig') || '{}');
    const updatedConfig = {
      ...existingConfig,
      brandCustomization: brandData
    };
    localStorage.setItem('gameConfig', JSON.stringify(updatedConfig));
    
    // Navigate to AI-Driven Game Generation (Step 4)
    navigate(`/gamification/ai-generation?type=${gameType}`);
  };

  const handleBack = () => {
    navigate(`/gamification/configuration?type=${gameType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <BrandCustomizationStep
        gameType={gameType}
        onNext={handleNext}
        onBack={handleBack}
      />
    </div>
  );
};

export default BrandCustomizationPage;
