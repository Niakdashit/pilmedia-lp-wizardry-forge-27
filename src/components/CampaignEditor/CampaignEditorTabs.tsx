
import React from 'react';
import { motion } from 'framer-motion';

interface CampaignEditorTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  campaignType?: string;
}

const CampaignEditorTabs: React.FC<CampaignEditorTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  campaignType 
}) => {
  // Onglets spécialisés pour les quiz
  const quizTabs = [
    { id: 'general', label: 'Général', icon: '⚙️', gradient: 'from-purple-500 to-purple-600' },
    { id: 'questions', label: 'Questions', icon: '❓', gradient: 'from-blue-500 to-blue-600' },
    { id: 'design', label: 'Design', icon: '🎨', gradient: 'from-pink-500 to-pink-600' },
    { id: 'preview', label: 'Aperçu', icon: '👁️', gradient: 'from-green-500 to-green-600' },
    { id: 'mobile', label: 'Mobile', icon: '📱', gradient: 'from-orange-500 to-orange-600' },
    { id: 'form', label: 'Formulaire', icon: '📝', gradient: 'from-teal-500 to-teal-600' },
    { id: 'participations', label: 'Participations', icon: '👥', gradient: 'from-indigo-500 to-indigo-600' },
  ];

  // Onglets par défaut pour les autres types
  const defaultTabs = [
    { id: 'general', label: 'Général', icon: '⚙️', gradient: 'from-purple-500 to-purple-600' },
    { id: 'content', label: 'Contenu et apparences', icon: '🎨', gradient: 'from-pink-500 to-pink-600' },
    { id: 'screens', label: 'Écrans', icon: '📱', gradient: 'from-blue-500 to-blue-600' },
    { id: 'mobile', label: 'Mobile', icon: '📱', gradient: 'from-orange-500 to-orange-600' },    
    { id: 'form', label: 'Formulaire', icon: '📝', gradient: 'from-teal-500 to-teal-600' },
    { id: 'participations', label: 'Participations', icon: '👥', gradient: 'from-indigo-500 to-indigo-600' },
  ];

  const tabs = campaignType === 'quiz' ? quizTabs : defaultTabs;

  return (
    <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200/50 shadow-sm">
      <nav className="flex space-x-1 px-8 py-4 overflow-x-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap min-w-fit ${
              activeTab === tab.id
                ? 'text-white shadow-lg transform scale-105'
                : 'text-gray-600 hover:text-gray-800 hover:bg-white/50 hover:shadow-md'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {activeTab === tab.id && (
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-xl`}
                layoutId="activeTab"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            
            <div className="relative flex items-center space-x-2 z-10">
              <span className="text-base">{tab.icon}</span>
              <span className="font-semibold">{tab.label}</span>
            </div>
            
            {activeTab === tab.id && (
              <motion.div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              />
            )}
          </motion.button>
        ))}
      </nav>
    </div>
  );
};

export default CampaignEditorTabs;
