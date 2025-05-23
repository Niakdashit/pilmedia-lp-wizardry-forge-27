import React, { useState, useEffect } from 'react';
import Color from 'color';
import confetti from 'canvas-confetti';

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

  const handleAnswerSelect = (optionIndex: number) => {
    if (showFeedback || isComplete) return;
    
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);

    const isLastQuestion = currentQuestionIndex === (campaign.gameConfig.quiz?.questions?.length || 0) - 1;

    setTimeout(() => {
      if (isLastQuestion) {
        setIsComplete(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          onComplete?.();
        }, 500);
      } else {
        setShowFeedback(false);
        setSelectedAnswer(null);
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 1500);
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

    const buttonStyle = {
      backgroundColor: campaign.design.buttonColor,
      color: getContrastColor(campaign.design.buttonColor),
      borderRadius: campaign.design.borderRadius,
      fontFamily: campaign.design.textFont,
      padding: '1rem 2rem',
      transition: 'all 0.2s',
      width: '100%',
      textAlign: 'center' as const,
    };

    switch (campaign.type) {
      case 'quiz':
        const question = campaign.gameConfig.quiz?.questions?.[currentQuestionIndex];
        if (!question) return null;

        return (
          <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto px-4">
            <div className="text-center mb-8 w-full">
              <h3 
                className="text-xl font-bold mb-4"
                style={{ 
                  fontFamily: campaign.design.titleFont,
                  color: campaign.design.titleColor
                }}
              >
                Question {currentQuestionIndex + 1}/{campaign.gameConfig.quiz.questions.length}
              </h3>
              <p 
                className="text-lg"
                style={{ fontFamily: campaign.design.textFont }}
              >
                {question.text}
              </p>
            </div>

            <div className="space-y-3 w-full">
              {question.options.map((option: any, optionIndex: number) => {
                const isSelected = selectedAnswer === optionIndex;
                const isCorrect = option.isCorrect;
                
                let buttonBackground = buttonStyle.backgroundColor;
                if (showFeedback && isSelected && isCorrect) {
                  buttonBackground = '#4CAF50';
                }

                return (
                  <button
                    key={optionIndex}
                    onClick={() => !showFeedback && handleAnswerSelect(optionIndex)}
                    className="w-full p-4 text-center transition-all duration-200 hover:opacity-90"
                    style={{
                      ...buttonStyle,
                      backgroundColor: buttonBackground,
                      opacity: showFeedback && !isSelected ? 0.5 : 1,
                    }}
                    disabled={showFeedback}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>

            {showFeedback && selectedAnswer !== null && question.options[selectedAnswer].isCorrect && (
              <div 
                className="text-center p-4 rounded-lg mt-6 w-full"
                style={{
                  backgroundColor: '#E8F5E9',
                  color: '#2E7D32',
                  fontFamily: campaign.design.textFont
                }}
              >
                {question.feedback?.correct || 'Bonne réponse !'}
              </div>
            )}

            <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden w-full">
              <div 
                className="h-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / campaign.gameConfig.quiz.questions.length) * 100}%`,
                  backgroundColor: campaign.design.buttonColor
                }}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-gray-500 text-center">
              Aperçu en cours de développement pour le type "{campaign.type}".
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