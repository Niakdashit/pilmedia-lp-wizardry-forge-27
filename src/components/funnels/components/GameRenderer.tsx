
import React from 'react';
import ContrastBackground from '../../common/ContrastBackground';
import ValidationMessage from '../../common/ValidationMessage';
import WheelPreview from '../../GameTypes/WheelPreview';
import { Jackpot } from '../../GameTypes';
import ScratchPreview from '../../GameTypes/ScratchPreview';
import DicePreview from '../../GameTypes/DicePreview';
import { GAME_SIZES, GameSize } from '../../configurators/GameSizeSelector';

interface GameRendererProps {
  campaign: any;
  formValidated: boolean;
  showValidationMessage: boolean;
  previewMode: 'mobile' | 'tablet' | 'desktop';
  mobileConfig?: any;
  onGameFinish: (result: 'win' | 'lose') => void;
  onGameStart: () => void;
  onGameButtonClick: () => void;
}

const GameRenderer: React.FC<GameRendererProps> = ({
  campaign,
  formValidated,
  showValidationMessage,
  previewMode,
  mobileConfig,
  onGameFinish,
  onGameStart,
  onGameButtonClick
}) => {
  const gameBackgroundImage = campaign.gameConfig?.[campaign.type]?.backgroundImage;
  const buttonLabel = campaign.gameConfig?.[campaign.type]?.buttonLabel || campaign.buttonConfig?.text;
  const buttonColor = campaign.buttonConfig?.color || campaign.gameConfig?.[campaign.type]?.buttonColor || '#841b60';
  const contrastBg = mobileConfig?.contrastBackground || campaign.screens?.[2]?.contrastBackground;

  const gameSize: GameSize = (campaign.gameSize && Object.keys(GAME_SIZES).includes(campaign.gameSize)) 
    ? campaign.gameSize as GameSize 
    : 'medium';
  const gamePosition = campaign.gamePosition || 'center';

  // Détecter si on est dans une modal (pour ajuster l'affichage)
  const isModal = previewMode !== 'desktop' || window.location.pathname.includes('preview');

  // Universal centering container that works in all contexts
  const getGameContainerStyle = (): React.CSSProperties => {
    return {
      width: '100%',
      height: '100%',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '20px',
      boxSizing: 'border-box'
    };
  };

  // Game wrapper with consistent styling
  const gameWrapperStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '100%',
    maxHeight: '100%'
  };

  const handleGameComplete = (result: 'win' | 'lose') => {
    onGameFinish(result);
  };

  const handleGameStartInternal = () => {
    onGameStart();
  };

  const renderGameComponent = () => {
    switch (campaign.type) {
      case 'wheel':
        return (
          <WheelPreview
            campaign={campaign} 
            config={{
              mode: 'instant_winner' as const,
              winProbability: campaign.gameConfig?.wheel?.winProbability || 0.1,
              maxWinners: campaign.gameConfig?.wheel?.maxWinners,
              winnersCount: 0
            }}
            onFinish={handleGameComplete}
            onStart={handleGameStartInternal}
            gameSize={gameSize}
            gamePosition={gamePosition}
            previewDevice={previewMode}
            disabled={!formValidated}
          />
        );
      
      case 'scratch':
        return (
          <ScratchPreview 
            config={campaign.gameConfig?.scratch || {}}
            buttonLabel={buttonLabel}
            buttonColor={buttonColor}
            gameSize={gameSize}
            disabled={!formValidated}
            onFinish={handleGameComplete}
            onStart={handleGameStartInternal}
            isModal={isModal}
          />
        );
      
      case 'jackpot':
        return (
          <Jackpot
            isPreview={true}
            instantWinConfig={campaign.gameConfig?.jackpot?.instantWin}
            buttonLabel={buttonLabel}
            buttonColor={buttonColor}
            backgroundImage={gameBackgroundImage}
            containerBackgroundColor={campaign.gameConfig?.jackpot?.containerBackgroundColor}
            backgroundColor={campaign.gameConfig?.jackpot?.backgroundColor}
            borderColor={campaign.gameConfig?.jackpot?.borderColor}
            borderWidth={campaign.gameConfig?.jackpot?.borderWidth}
            slotBorderColor={campaign.gameConfig?.jackpot?.slotBorderColor}
            slotBorderWidth={campaign.gameConfig?.jackpot?.slotBorderWidth}
            slotBackgroundColor={campaign.gameConfig?.jackpot?.slotBackgroundColor}
            onFinish={handleGameComplete}
            onStart={handleGameStartInternal}
          />
        );
      case 'dice':
        return (
          <DicePreview 
            config={campaign.gameConfig?.dice || {}} 
          />
        );
      default:
        return <div className="text-center text-gray-500">Jeu non supporté: {campaign.type}</div>;
    }
  };

  return (
    <div style={getGameContainerStyle()} className="rounded-lg overflow-visible relative">
      <div style={gameWrapperStyle}>
        <ContrastBackground
          enabled={contrastBg?.enabled && contrastBg?.applyToGame}
          config={contrastBg}
          className="flex items-center justify-center"
        >
          {renderGameComponent()}
        </ContrastBackground>
      </div>
      
      {!formValidated && (
        <div 
          onClick={() => {
            onGameButtonClick();
          }}
          className="absolute inset-0 flex items-center justify-center z-30 rounded-lg cursor-pointer bg-black/0" 
        />
      )}

      <ValidationMessage
        show={showValidationMessage}
        message="Formulaire validé ! Vous pouvez maintenant jouer."
        type="success"
      />
    </div>
  );
};

export default GameRenderer;
