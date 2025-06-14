
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, RefreshCw } from 'lucide-react';

interface GamePreviewGeneratorProps {
  gameType: string;
  generatedContent: any;
  isComplete: boolean;
}

const GamePreviewGenerator: React.FC<GamePreviewGeneratorProps> = ({
  gameType,
  generatedContent,
  isComplete
}) => {
  const getBrandColors = () => {
    return generatedContent.brand_analysis?.dominantColors || {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#F59E0B'
    };
  };

  const getGameContent = () => {
    return generatedContent.content_generation || {
      title: 'Your Game',
      subtitle: 'Generated content will appear here',
      callToAction: 'Play Now'
    };
  };

  const renderGamePreview = () => {
    const colors = getBrandColors();
    const content = getGameContent();

    switch (gameType) {
      case 'wheel':
        return (
          <div className="relative">
            {/* Wheel Preview */}
            <div className="mx-auto w-48 h-48 relative">
              <motion.div
                className="w-full h-full rounded-full border-8 border-white shadow-lg"
                style={{ 
                  background: `conic-gradient(${colors.primary} 0deg 60deg, ${colors.secondary} 60deg 120deg, ${colors.accent} 120deg 180deg, ${colors.primary} 180deg 240deg, ${colors.secondary} 240deg 300deg, ${colors.accent} 300deg 360deg)`
                }}
                animate={isComplete ? { rotate: 360 } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* Center dot */}
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-white"
                style={{ backgroundColor: colors.primary }}
              />
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                <div 
                  className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent"
                  style={{ borderBottomColor: colors.primary }}
                />
              </div>
            </div>
            {/* Game Info */}
            <div className="text-center mt-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{content.title}</h4>
              <p className="text-gray-600 mb-4">{content.subtitle}</p>
              <button 
                className="px-6 py-3 rounded-full text-white font-semibold"
                style={{ backgroundColor: colors.primary }}
              >
                {content.callToAction}
              </button>
            </div>
          </div>
        );

      case 'scratch':
        return (
          <div className="relative">
            <div className="mx-auto w-64 h-40">
              <motion.div
                className="w-full h-full rounded-lg border-4 border-white shadow-lg relative overflow-hidden"
                style={{ backgroundColor: colors.secondary }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Scratch surface */}
                <div 
                  className="absolute inset-0 opacity-80"
                  style={{ backgroundColor: colors.accent }}
                />
                {/* Hidden content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold mb-2">🎁</div>
                    <div className="text-lg font-semibold">Mystery Prize</div>
                  </div>
                </div>
                {/* Scratch overlay */}
                <div 
                  className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: colors.primary }}
                >
                  Scratch Here!
                </div>
              </motion.div>
            </div>
            <div className="text-center mt-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{content.title}</h4>
              <p className="text-gray-600">{content.subtitle}</p>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="relative">
            <div className="mx-auto max-w-sm">
              <motion.div
                className="bg-white rounded-lg border-4 border-white shadow-lg p-6"
                style={{ borderColor: colors.primary }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl font-bold"
                    style={{ backgroundColor: colors.primary }}
                  >
                    ?
                  </div>
                  <h5 className="font-semibold text-gray-900">Sample Question</h5>
                </div>
                <div className="space-y-2">
                  {['Option A', 'Option B', 'Option C', 'Option D'].map((option, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-lg border-2 text-center cursor-pointer transition-colors hover:bg-gray-50"
                      style={{ borderColor: colors.secondary }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="text-center mt-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{content.title}</h4>
              <p className="text-gray-600">{content.subtitle}</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <RefreshCw className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-600">Preview will appear here</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Eye className="w-5 h-5 mr-2" />
          Live Preview
        </h3>
        {isComplete && (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            Generated
          </span>
        )}
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 min-h-[400px] flex items-center justify-center">
        {isComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {renderGamePreview()}
          </motion.div>
        ) : (
          <div className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-gray-600">Generating your game preview...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePreviewGenerator;
