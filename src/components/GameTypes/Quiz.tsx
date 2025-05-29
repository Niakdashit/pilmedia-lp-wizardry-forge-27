
import React from 'react';
import QuizGame from './QuizGame';

interface QuizConfig {
  questions?: any[];
  showTimer?: boolean;
  showScore?: boolean;
  timeLimit?: number;
}

interface QuizProps {
  config?: QuizConfig;
  onConfigChange?: (config: QuizConfig) => void;
  campaign?: any;
  onComplete?: (score: number, totalQuestions: number) => void;
  onStart?: () => void;
}

const Quiz: React.FC<QuizProps> = ({ 
  config = {}, 
  onConfigChange, 
  campaign,
  onComplete,
  onStart 
}) => {
  const design = campaign?.design || {
    primaryColor: '#841b60',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    buttonColor: '#841b60'
  };

  return (
    <div className="w-full">
      <QuizGame
        questions={config.questions}
        onComplete={onComplete}
        onStart={onStart}
        design={design}
        showTimer={config.showTimer !== false}
        showScore={config.showScore !== false}
      />
    </div>
  );
};

export default Quiz;
