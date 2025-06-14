
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle } from 'lucide-react';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  timeLeft?: number | null;
  design?: any;
  score?: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({
  currentQuestion,
  totalQuestions,
  timeLeft,
  design = {},
  score
}) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  
  const progressStyle = {
    backgroundColor: design.progressBackgroundColor || '#f3f4f6',
    color: design.textColor || '#374151'
  };

  const progressBarStyle = {
    backgroundColor: design.primaryColor || '#841b60'
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Header with question number and score */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{
            backgroundColor: `${design.primaryColor || '#841b60'}20`,
            color: design.primaryColor || '#841b60'
          }}>
            Question {currentQuestion + 1} / {totalQuestions}
          </span>
          
          {score !== undefined && (
            <div className="flex items-center space-x-2 text-sm" style={{ color: design.textColor }}>
              <CheckCircle className="w-4 h-4" />
              <span>Score: {score}/{currentQuestion}</span>
            </div>
          )}
        </div>

        {timeLeft !== null && timeLeft !== undefined && (
          <motion.div 
            className="flex items-center space-x-2 px-3 py-1 rounded-full"
            style={{
              backgroundColor: timeLeft <= 10 ? '#fee2e2' : '#f0fdf4',
              color: timeLeft <= 10 ? '#dc2626' : '#16a34a'
            }}
            animate={timeLeft <= 5 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: timeLeft <= 5 ? Infinity : 0, duration: 0.5 }}
          >
            <Clock className="w-4 h-4" />
            <span className="font-semibold">{timeLeft}s</span>
          </motion.div>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div 
          className="h-2 rounded-full overflow-hidden"
          style={progressStyle}
        >
          <motion.div
            className="h-full rounded-full"
            style={progressBarStyle}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        
        {/* Progress percentage */}
        <div 
          className="absolute -top-6 text-xs font-medium"
          style={{ 
            left: `${Math.max(5, Math.min(95, progress))}%`,
            transform: 'translateX(-50%)',
            color: design.textColor || '#6b7280'
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
