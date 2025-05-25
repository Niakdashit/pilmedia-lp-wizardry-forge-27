import React, { useState, useEffect } from 'react';
import Color from 'color';
import confetti from 'canvas-confetti';
import { Quiz, Wheel, Scratch, Memory, Puzzle, Dice } from '../GameTypes';

interface PreviewContentProps {
  campaign: any;
  step?: 'start' | 'game' | 'end';
  onComplete?: () => void;
}

const PreviewContent: React.FC<PreviewContentProps> = ({ campaign, step = 'game', onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsComplete(false);
  }, [step]);

  const getContrastColor = (bgColor: string) => {
    try {
      const color = Color(bgColor);
      return color.isLight() ? '#000000' : '#FFFFFF';
    } catch {
      return '#000000';
    }
  };

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
              color: campaign.design.titleColor,
              fontFamily: campaign.design.titleFont
            }}
          >
            {campaign.screens[3].title || 'Félicitations !'}
          </h2>
          
          <p 
            className="text-xl"
            style={{ 
              color: getContrastColor(campaign.design.blockColor),
              fontFamily: campaign.design.textFont
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
          <Quiz 
            config={campaign.gameConfig.quiz} 
            onConfigChange={() => {}}
            isPreview={true}
            onComplete={handleGameComplete}
          />
        );

      case 'wheel':
        return (
          <Wheel 
            config={campaign.gameConfig.wheel} 
            onConfigChange={() => {}}
            isPreview={true}
            onComplete={handleGameComplete}
          />
        );

      case 'scratch':
        return (
          <Scratch 
            config={campaign.gameConfig.scratch} 
            onConfigChange={() => {}}
            isPreview={true}
            onComplete={handleGameComplete}
          />
        );

      case 'memory':
        return (
          <Memory 
            config={campaign.gameConfig.memory} 
            onConfigChange={() => {}}
            isPreview={true}
            onComplete={handleGameComplete}
          />
        );

      case 'puzzle':
        return (
          <Puzzle 
            config={campaign.gameConfig.puzzle} 
            onConfigChange={() => {}}
            isPreview={true}
            onComplete={handleGameComplete}
          />
        );

      case 'dice':
        return (
          <Dice 
            config={campaign.gameConfig.dice} 
            onConfigChange={() => {}}
            isPreview={true}
            onComplete={handleGameComplete}
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