
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DynamicContactForm from '../forms/DynamicContactForm';
import GameRenderer from './components/GameRenderer';
import ResultScreen from './components/ResultScreen';
import ContrastBackground from '../common/ContrastBackground';

interface FunnelUnlockedGameProps {
  campaign: any;
  previewMode?: 'mobile' | 'tablet' | 'desktop';
  mobileConfig?: any;
  modalContained?: boolean;
}

const FunnelUnlockedGame: React.FC<FunnelUnlockedGameProps> = ({
  campaign,
  previewMode = 'desktop',
  mobileConfig,
  modalContained = false
}) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [formValidated, setFormValidated] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);
  const [showValidationMessage, setShowValidationMessage] = useState(false);

  const handleFormValidation = () => {
    setFormValidated(true);
    setShowValidationMessage(true);
    setTimeout(() => setShowValidationMessage(false), 2000);
  };

  const handleGameFinish = (result: 'win' | 'lose') => {
    setGameResult(result);
    setCurrentScreen(3);
  };

  const handleGameStart = () => {
    // Game started logic
  };

  const handleGameButtonClick = () => {
    if (!formValidated) {
      // Focus on form or show validation message
      const formElement = document.querySelector('form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getLayoutClasses = () => {
    if (modalContained) {
      return {
        container: 'w-full h-full flex flex-col overflow-auto',
        content: 'flex-1 flex flex-col lg:flex-row gap-8 p-6',
        formSection: 'w-full lg:w-1/3 flex-shrink-0',
        gameSection: 'w-full lg:w-2/3 flex items-center justify-center min-h-[500px]'
      };
    }

    if (previewMode === 'mobile') {
      return {
        container: 'min-h-screen flex flex-col',
        content: 'flex-1 flex flex-col gap-6 p-4',
        formSection: 'w-full order-2',
        gameSection: 'w-full order-1 flex items-center justify-center min-h-[400px]'
      };
    }

    return {
      container: 'min-h-screen flex flex-col lg:flex-row',
      content: 'flex-1 flex flex-col lg:flex-row gap-8 p-8',
      formSection: 'w-full lg:w-1/3 lg:max-w-md flex-shrink-0',
      gameSection: 'w-full lg:w-2/3 flex items-center justify-center min-h-[600px]'
    };
  };

  const layoutClasses = getLayoutClasses();

  if (currentScreen === 3) {
    return (
      <div className={layoutClasses.container}>
        <ResultScreen
          campaign={campaign}
          result={gameResult}
          onRestart={() => {
            setCurrentScreen(1);
            setFormValidated(false);
            setGameResult(null);
          }}
          previewMode={previewMode}
          mobileConfig={mobileConfig}
        />
      </div>
    );
  }

  return (
    <div 
      className={layoutClasses.container}
      style={{
        backgroundColor: campaign.design?.background || '#f8fafc',
        backgroundImage: campaign.design?.backgroundImage ? `url(${campaign.design.backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {campaign.design?.backgroundImage && (
        <div className="absolute inset-0 bg-black/20 z-0" />
      )}

      <div className={`${layoutClasses.content} relative z-10`}>
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={layoutClasses.formSection}
        >
          <ContrastBackground
            enabled={mobileConfig?.contrastBackground?.enabled || campaign.screens?.[1]?.contrastBackground?.enabled}
            config={mobileConfig?.contrastBackground || campaign.screens?.[1]?.contrastBackground}
            className="h-full"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8 h-full">
              {campaign.screens?.[1]?.showTitle && (
                <h1 
                  className="text-2xl lg:text-3xl font-bold mb-4"
                  style={{ color: campaign.design?.titleColor || '#000000' }}
                >
                  {campaign.screens?.[1]?.title || 'Participez à notre jeu !'}
                </h1>
              )}
              
              {campaign.screens?.[1]?.showDescription && (
                <p className="text-gray-600 mb-6 lg:mb-8 text-sm lg:text-base">
                  {campaign.screens?.[1]?.description || 'Remplissez le formulaire pour jouer'}
                </p>
              )}

              <DynamicContactForm
                campaign={campaign}
                onValidSubmit={handleFormValidation}
                validated={formValidated}
                buttonColor={campaign.buttonConfig?.color || campaign.design?.buttonColor || '#841b60'}
                buttonText={campaign.buttonConfig?.text || 'Participer'}
              />
            </div>
          </ContrastBackground>
        </motion.div>

        {/* Game Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={layoutClasses.gameSection}
        >
          <GameRenderer
            campaign={campaign}
            formValidated={formValidated}
            showValidationMessage={showValidationMessage}
            previewMode={previewMode}
            mobileConfig={mobileConfig}
            onGameFinish={handleGameFinish}
            onGameStart={handleGameStart}
            onGameButtonClick={handleGameButtonClick}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FunnelUnlockedGame;
