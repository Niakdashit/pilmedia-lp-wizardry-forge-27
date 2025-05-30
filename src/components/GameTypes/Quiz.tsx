
import React from 'react';
import QuizGame from './QuizGame';
import QuizConfigurator from '../configurators/QuizConfigurator';

interface QuizConfig {
  questions?: any[];
  showTimer?: boolean;
  showScore?: boolean;
  timeLimit?: number;
}

interface QuizProps {
  config?: QuizConfig;
  campaign?: any;
  onComplete?: (score?: number, totalQuestions?: number) => void;
  onStart?: () => void;
  onConfigChange?: (config: QuizConfig) => void;
  isPreview?: boolean;
}

const Quiz: React.FC<QuizProps> = ({ 
  config = {}, 
  campaign,
  onComplete,
  onStart,
  onConfigChange,
  isPreview = false
}) => {
  const design = campaign?.design || {
    primaryColor: '#841b60',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    buttonColor: '#841b60'
  };

  // Si onConfigChange est fourni, on affiche le configurateur
  if (onConfigChange && !isPreview) {
    return (
      <QuizConfigurator
        config={config}
        onConfigChange={onConfigChange}
      />
    );
  }

  // Sinon, on affiche le jeu
  return (
    <div className="w-full">
      <QuizGame
        questions={config.questions}
        onComplete={(score, totalQuestions) => onComplete?.(score, totalQuestions)}
        onStart={onStart}
        design={design}
      />
    </div>
  );
};

export default Quiz;
