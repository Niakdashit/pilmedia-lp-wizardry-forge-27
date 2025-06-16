
import React from 'react';
import WheelContainer from './WheelComponents/WheelContainer';
import WheelButton from './WheelComponents/WheelButton';
import WheelFormModal from './WheelComponents/WheelFormModal';
import WheelPreviewContent from './WheelComponents/WheelPreviewContent';
import { useWheelPreviewLogic } from './WheelComponents/WheelPreviewLogic';
import { getWheelPreviewConfig } from './WheelComponents/WheelPreviewConfig';

interface InstantWinConfig {
  mode: "instant_winner";
  winProbability: number;
  maxWinners?: number;
  winnersCount?: number;
}

interface WheelPreviewProps {
  campaign: any;
  config: InstantWinConfig;
  onFinish?: (result: 'win' | 'lose') => void;
  disabled?: boolean;
  onStart?: () => void;
  gameSize?: 'small' | 'medium' | 'large' | 'xlarge';
  gamePosition?: 'top' | 'center' | 'bottom' | 'left' | 'right';
  previewDevice?: 'desktop' | 'tablet' | 'mobile';
}

const WheelPreview: React.FC<WheelPreviewProps> = ({
  campaign,
  config,
  onFinish,
  disabled = false,
  onStart,
  gameSize = 'small',
  gamePosition = 'center',
  previewDevice = 'desktop'
}) => {
  const {
    formValidated,
    showFormModal,
    setShowFormModal,
    showValidationMessage,
    gameDimensions,
    shouldCropWheel,
    canvasSize,
    containerWidth,
    containerHeight,
    pointerSize,
    segments,
    rotation,
    spinning,
    fields,
    participationLoading,
    handleFormSubmit,
    handleWheelClick
  } = useWheelPreviewLogic({
    campaign,
    config,
    onFinish,
    disabled,
    onStart,
    gameSize,
    gamePosition,
    previewDevice
  });

  const {
    centerImage,
    centerLogo,
    theme,
    borderColor,
    borderOutlineColor,
    customColors,
    buttonConfig
  } = getWheelPreviewConfig(campaign);

  if (segments.length === 0) {
    return (
      <WheelContainer 
        gamePosition={gamePosition} 
        gameDimensions={gameDimensions}
        previewDevice={previewDevice}
      >
        <p>Aucun segment configuré pour la roue</p>
      </WheelContainer>
    );
  }

  return (
    <WheelContainer 
      gamePosition={gamePosition} 
      gameDimensions={gameDimensions}
      previewDevice={previewDevice}
    >
      {/* Wheel content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <WheelPreviewContent
          segments={segments}
          rotation={rotation}
          centerImage={centerImage}
          centerLogo={centerLogo}
          theme={theme}
          customColors={customColors}
          borderColor={borderColor}
          borderOutlineColor={borderOutlineColor}
          canvasSize={canvasSize}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          pointerSize={pointerSize}
          shouldCropWheel={shouldCropWheel}
          gamePosition={gamePosition}
          formValidated={formValidated}
          showValidationMessage={showValidationMessage}
          onWheelClick={handleWheelClick}
        />

        <WheelButton
          buttonConfig={buttonConfig}
          spinning={spinning}
          disabled={disabled}
          formValidated={formValidated}
          onClick={handleWheelClick}
        />
      </div>

      <WheelFormModal
        showFormModal={showFormModal}
        onClose={() => setShowFormModal(false)}
        campaign={campaign}
        fields={fields}
        participationLoading={participationLoading}
        onSubmit={handleFormSubmit}
      />
    </WheelContainer>
  );
};

export default WheelPreview;
