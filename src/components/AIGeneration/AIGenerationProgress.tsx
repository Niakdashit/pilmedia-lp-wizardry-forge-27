
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

interface Phase {
  id: number;
  name: string;
  description: string;
  duration: number;
}

interface AIGenerationProgressProps {
  phases: Phase[];
  currentPhase: number;
  isGenerating: boolean;
  isComplete: boolean;
}

const AIGenerationProgress: React.FC<AIGenerationProgressProps> = ({
  phases,
  currentPhase,
  isGenerating,
  isComplete
}) => {
  const getPhaseStatus = (phaseIndex: number) => {
    if (isComplete || phaseIndex < currentPhase) return 'complete';
    if (phaseIndex === currentPhase && isGenerating) return 'active';
    return 'pending';
  };

  const progressPercentage = isComplete 
    ? 100 
    : ((currentPhase + 1) / phases.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Generation Progress</h3>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-purple-700 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Phase List */}
      <div className="space-y-4">
        {phases.map((phase, index) => {
          const status = getPhaseStatus(index);
          
          return (
            <motion.div
              key={phase.id}
              className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                status === 'active' 
                  ? 'bg-purple-50 border border-purple-200' 
                  : status === 'complete'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Status Icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                status === 'complete' 
                  ? 'bg-green-500 text-white' 
                  : status === 'active'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {status === 'complete' ? (
                  <Check className="w-4 h-4" />
                ) : status === 'active' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Phase Info */}
              <div className="flex-1">
                <h4 className={`font-semibold ${
                  status === 'active' ? 'text-purple-900' : 'text-gray-900'
                }`}>
                  {phase.name}
                </h4>
                <p className={`text-sm ${
                  status === 'active' ? 'text-purple-600' : 'text-gray-600'
                }`}>
                  {phase.description}
                </p>
              </div>

              {/* Animation for active phase */}
              {status === 'active' && (
                <motion.div
                  className="w-2 h-2 bg-purple-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AIGenerationProgress;
