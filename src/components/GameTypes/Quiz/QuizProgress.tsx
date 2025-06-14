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
  const progress = (currentQuestion + 1) / totalQuestions * 100;
  const progressStyle = {
    backgroundColor: design.progressBackgroundColor || '#f3f4f6',
    color: design.textColor || '#374151'
  };
  const progressBarStyle = {
    backgroundColor: design.primaryColor || '#841b60'
  };
  return <div className="mb-8 space-y-4">
      {/* Header with question number and score */}
      

      {/* Progress bar */}
      <div className="relative">
        <div className="h-2 rounded-full overflow-hidden" style={progressStyle}>
          <motion.div className="h-full rounded-full" style={progressBarStyle} initial={{
          width: 0
        }} animate={{
          width: `${progress}%`
        }} transition={{
          duration: 0.5,
          ease: "easeOut"
        }} />
        </div>
        
        {/* Progress percentage */}
        
      </div>
    </div>;
};
export default QuizProgress;