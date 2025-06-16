
import React from 'react';
import { motion } from 'framer-motion';

interface QuizContainerProps {
  children: React.ReactNode;
  design?: any;
  className?: string;
}

const QuizContainer: React.FC<QuizContainerProps> = ({ 
  children, 
  design = {}, 
  className = '' 
}) => {
  const containerStyle = {
    backgroundColor: design.containerBackgroundColor || '#ffffff',
    borderColor: design.borderColor || '#e5e7eb',
    borderRadius: design.borderRadius || '16px',
    color: design.textColor || '#1f2937',
    fontFamily: design.fontFamily || 'Inter, sans-serif',
    boxShadow: design.enableShadow !== false 
      ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' 
      : 'none'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden border-2 ${className}`}
      style={containerStyle}
    >
      {children}
    </motion.div>
  );
};

export default QuizContainer;
