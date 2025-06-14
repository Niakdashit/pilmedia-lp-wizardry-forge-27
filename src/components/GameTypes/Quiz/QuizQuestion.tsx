
import React from 'react';
import { motion } from 'framer-motion';

interface QuizQuestionProps {
  question: any;
  design?: any;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, design = {} }) => {
  const questionStyle = {
    color: design.titleColor || design.textColor || '#1f2937',
    fontFamily: design.fontFamily || 'Inter, sans-serif',
    fontSize: design.questionFontSize || '1.5rem',
    fontWeight: design.questionFontWeight || '600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      {/* Question image */}
      {question.image && (
        <motion.div 
          className="mb-6 rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img
            src={question.image}
            alt="Question illustration"
            className="w-full max-h-64 object-cover"
            style={{ borderRadius: design.borderRadius || '12px' }}
          />
        </motion.div>
      )}

      {/* Question text */}
      <motion.h3
        className="leading-relaxed"
        style={questionStyle}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {question.text}
      </motion.h3>

      {/* Question type indicator */}
      {question.type === 'multiple' && (
        <motion.p 
          className="text-sm mt-2 italic"
          style={{ color: design.secondaryTextColor || '#6b7280' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Plusieurs réponses possibles
        </motion.p>
      )}
    </motion.div>
  );
};

export default QuizQuestion;
