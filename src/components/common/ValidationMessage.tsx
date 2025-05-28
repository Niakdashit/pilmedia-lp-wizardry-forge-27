
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ValidationMessageProps {
  show: boolean;
  message: string;
  type?: 'success' | 'error';
  className?: string;
}

const ValidationMessage: React.FC<ValidationMessageProps> = ({
  show,
  message,
  type = 'success',
  className = ""
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
          style={{ position: 'absolute' }}
        >
          <div className={`px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center space-x-2 ${
            type === 'success' 
              ? 'bg-green-600 text-white' 
              : 'bg-red-600 text-white'
          }`}>
            <span>{type === 'success' ? '✅' : '❌'}</span>
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ValidationMessage;
