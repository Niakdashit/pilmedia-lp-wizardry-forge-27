
import React, { useState, useEffect } from 'react';
import Color from 'color';
import confetti from 'canvas-confetti';
import { Wheel, Scratch, Jackpot, QuizGame } from '../GameTypes';
import MemoryPreview from '../GameTypes/MemoryPreview';
import PuzzlePreview from '../GameTypes/PuzzlePreview';
import DicePreview from '../GameTypes/DicePreview';

interface PreviewContentProps {
  campaign: any;
  step?: 'start' | 'game' | 'end';
  onComplete?: () => void;
}

const PreviewContent: React.FC<PreviewContentProps> = ({ campaign, step = 'game', onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(false);
  }, [step]);

  const handleGameComplete = () => {
    setIsComplete(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      onComplete?.();
    }, 500);
  };

  const getGameComponent = () => {
    if (isComplete) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-full w-full max-w-2xl mx-auto px-4">
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              ...campaign.design.textStyles?.title
            }}
          >
            {campaign.screens[3].title || 'Félicitations !'}
          </h2>
          
          <p
            className="text-xl"
            style={{
              ...campaign.design.textStyles?.description,
              color: campaign.design.textStyles?.description?.color || (Color(campaign.design.blockColor || '#FFFFFF').isDark() ? '#FFFFFF' : '#000000')
            }}
          >
            {campaign.screens[3].description || 'Merci pour votre participation !'}
          </p>
        </div>
      );
    }

    switch (campaign.type) {
      case 'quiz':
        return (
          <QuizGame
            campaignId={campaign.id}
            config={campaign.gameConfig.quiz}
          />
        );
      case 'memory':
        return (
          <MemoryPreview
            config={campaign.gameConfig.memory}
          />
        );

      case 'puzzle':
        return (
          <PuzzlePreview
            config={campaign.gameConfig.puzzle}
          />
        );

      case 'dice':
        return (
          <DicePreview
            config={campaign.gameConfig.dice}
          />
        );

      case 'wheel':
        return (
          <Wheel 
            config={campaign.gameConfig.wheel}
            isPreview={true}
            currentWinners={0}
            maxWinners={100}
            winRate={10}
            onComplete={handleGameComplete}
          />
        );

      case 'scratch':
        return (
          <Scratch 
            config={campaign.gameConfig.scratch}
            onConfigChange={() => {}}
          />
        );

      case 'jackpot':
        return (
          <Jackpot
            isPreview={true}
            instantWinConfig={campaign.gameConfig?.jackpot?.instantWin}
            onFinish={handleGameComplete}
          />
        );

      default:
        return (
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-gray-500 text-center">
              Type de jeu non pris en charge
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      {getGameComponent()}
    </div>
  );
};

export default PreviewContent;
