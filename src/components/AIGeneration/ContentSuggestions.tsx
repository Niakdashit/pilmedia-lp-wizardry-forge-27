
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Edit3, Sparkles, Check } from 'lucide-react';

interface ContentSuggestionsProps {
  content: any;
  onRegenerate: () => void;
}

const ContentSuggestions: React.FC<ContentSuggestionsProps> = ({
  content,
  onRegenerate
}) => {
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>([]);

  const suggestions = [
    {
      id: 'title-variant',
      category: 'Title',
      current: content?.title || 'Spin & Win!',
      alternatives: ['Lucky Spin!', 'Win Big Today!', 'Fortune Wheel'],
      icon: Edit3
    },
    {
      id: 'cta-variant',
      category: 'Call to Action',
      current: content?.callToAction || 'Spin the Wheel',
      alternatives: ['Try Your Luck', 'Play Now', 'Start Playing'],
      icon: Sparkles
    },
    {
      id: 'message-variant',
      category: 'Win Message',
      current: content?.winMessage || 'Congratulations! You won:',
      alternatives: ['Amazing! You got:', 'Fantastic! You earned:', 'Success! You unlocked:'],
      icon: Check
    }
  ];

  const handleSuggestionSelect = (suggestionId: string) => {
    setSelectedSuggestions(prev => 
      prev.includes(suggestionId) 
        ? prev.filter(id => id !== suggestionId)
        : [...prev, suggestionId]
    );
  };

  const handleApplyChanges = () => {
    // In a real implementation, this would update the content
    console.log('Applying changes for:', selectedSuggestions);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Content Suggestions</h3>
        <button
          onClick={onRegenerate}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Regenerate All</span>
        </button>
      </div>

      <div className="space-y-6">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          
          return (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center mb-3">
                <Icon className="w-5 h-5 text-purple-600 mr-2" />
                <h4 className="font-medium text-gray-900">{suggestion.category}</h4>
              </div>
              
              <div className="mb-3">
                <label className="text-sm text-gray-600">Current:</label>
                <p className="font-medium text-gray-900">{suggestion.current}</p>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 mb-2 block">AI Suggestions:</label>
                <div className="grid grid-cols-1 gap-2">
                  {suggestion.alternatives.map((alternative, altIndex) => (
                    <motion.button
                      key={altIndex}
                      onClick={() => handleSuggestionSelect(`${suggestion.id}-${altIndex}`)}
                      className={`text-left p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedSuggestions.includes(`${suggestion.id}-${altIndex}`)
                          ? 'border-purple-600 bg-purple-50 text-purple-900'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{alternative}</span>
                        {selectedSuggestions.includes(`${suggestion.id}-${altIndex}`) && (
                          <Check className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedSuggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-purple-900">Changes Selected</h5>
              <p className="text-sm text-purple-700">
                {selectedSuggestions.length} suggestion(s) will be applied
              </p>
            </div>
            <button
              onClick={handleApplyChanges}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Apply Changes
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ContentSuggestions;
