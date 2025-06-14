
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, PenTool, Palette, Settings, CheckCircle } from 'lucide-react';

interface Phase {
  id: number;
  name: string;
  description: string;
  duration: number;
}

interface GenerationPhaseDisplayProps {
  phases: Phase[];
  currentPhase: number;
  generatedContent: any;
  isGenerating: boolean;
}

const GenerationPhaseDisplay: React.FC<GenerationPhaseDisplayProps> = ({
  phases,
  currentPhase,
  generatedContent,
  isGenerating
}) => {
  const getPhaseIcon = (phaseIndex: number) => {
    const icons = [Brain, PenTool, Palette, Settings];
    const Icon = icons[phaseIndex] || Brain;
    return Icon;
  };

  const getPhaseContent = (phaseIndex: number) => {
    const phaseKeys = ['brand_analysis', 'content_generation', 'ux_optimization', 'final_configuration'];
    const content = generatedContent[phaseKeys[phaseIndex]];
    
    if (!content) return null;

    switch (phaseIndex) {
      case 0: // Brand Analysis
        return (
          <div className="space-y-3">
            {content.dominantColors && (
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Brand Colors</h5>
                <div className="flex space-x-2">
                  {Object.entries(content.dominantColors).map(([key, color]) => (
                    <div key={key} className="text-center">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color as string }}
                      />
                      <span className="text-xs text-gray-500 mt-1 block capitalize">{key}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {content.brandStyle && (
              <div>
                <span className="text-sm text-gray-600">Style: </span>
                <span className="text-sm font-medium text-gray-900 capitalize">{content.brandStyle}</span>
              </div>
            )}
          </div>
        );

      case 1: // Content Generation
        return (
          <div className="space-y-3">
            {content.title && (
              <div>
                <h5 className="font-medium text-gray-700">Game Title</h5>
                <p className="text-lg font-semibold text-purple-600">{content.title}</p>
              </div>
            )}
            {content.subtitle && (
              <div>
                <h5 className="font-medium text-gray-700">Subtitle</h5>
                <p className="text-gray-900">{content.subtitle}</p>
              </div>
            )}
            {content.prizes && (
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Generated Prizes</h5>
                <div className="flex flex-wrap gap-2">
                  {content.prizes.slice(0, 3).map((prize: string, index: number) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                    >
                      {prize}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 2: // UX Optimization
        return (
          <div className="space-y-3">
            {content.layoutOptimizations && (
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Optimizations</h5>
                <ul className="space-y-1">
                  {content.layoutOptimizations.map((optimization: string, index: number) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {optimization}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 3: // Final Configuration
        return (
          <div className="space-y-3">
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span className="font-medium">Game Ready!</span>
            </div>
            <p className="text-sm text-gray-600">
              Your personalized game has been generated and is ready for final customization.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Generation Details</h3>
      
      <AnimatePresence mode="wait">
        {phases.map((phase, index) => {
          const Icon = getPhaseIcon(index);
          const isActive = index === currentPhase && isGenerating;
          const isComplete = generatedContent[phases[index].name.toLowerCase().replace(' ', '_')];
          
          if (!isActive && !isComplete) return null;
          
          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 last:mb-0"
            >
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  isComplete ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{phase.name}</h4>
                  <p className="text-sm text-gray-600">{phase.description}</p>
                </div>
              </div>
              
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="ml-13 p-4 bg-gray-50 rounded-lg"
                >
                  {getPhaseContent(index)}
                </motion.div>
              )}
              
              {isActive && !isComplete && (
                <motion.div
                  className="ml-13 p-4 bg-purple-50 rounded-lg"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="flex items-center text-purple-600">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-2 animate-pulse" />
                    <span className="text-sm">Processing...</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default GenerationPhaseDisplay;
