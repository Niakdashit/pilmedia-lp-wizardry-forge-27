
import React from 'react';
import { motion } from 'framer-motion';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  design?: any;
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  currentQuestion,
  totalQuestions,
  design = {}
}) => {
  const progress = (currentQuestion + 1) / totalQuestions * 100;
  
  const progressStyle = {
    backgroundColor: design.progressBackgroundColor || '#f3f4f6',
    color: design.textColor || '#374151'
  };
  
  const progressBarStyle = {
    backgroundColor: design.primaryColor || '#841b60'
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium" style={{ color: design.textColor || '#374151' }}>
          Question {currentQuestion + 1} sur {totalQuestions}
        </span>
        <span className="text-sm" style={{ color: design.secondaryTextColor || '#6b7280' }}>
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="relative">
        <div className="h-2 rounded-full overflow-hidden" style={progressStyle}>
          <motion.div 
            className="h-full rounded-full" 
            style={progressBarStyle} 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
