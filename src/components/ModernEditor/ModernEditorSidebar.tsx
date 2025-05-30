import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Gamepad2, Palette, FormInput, Sliders } from 'lucide-react';
import { CampaignType } from '../../utils/campaignTypes';

interface ModernEditorSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  campaignType: CampaignType;
}

const ModernEditorSidebar: React.FC<ModernEditorSidebarProps> = ({
  activeTab,
  onTabChange,
  campaignType
}) => {
  const tabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'game', label: 'Jeu', icon: Gamepad2 },
    { id: 'gameconfig', label: 'Configuration', icon: Sliders },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'form', label: 'Formulaire', icon: FormInput }
  ];

  // Ajout conditionnel de l'onglet formulaire pour certains types
  if (['wheel', 'jackpot', 'scratch'].includes(campaignType)) {
    tabs.push({
      id: 'form',
      label: 'Formulaire',
      icon: FormInput,
      description: 'Champs de saisie'
    });
  }

  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 py-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <div key={tab.id} className="relative px-3 mb-2">
              <button
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex flex-col items-center p-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-[#841b60] text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5 mb-2" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
              
              {/* Tooltip */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                <div className="font-medium">{tab.label}</div>
                <div className="text-xs text-gray-300">{tab.description}</div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-[#841b60] rounded-r-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Bottom indicator */}
      <div className="px-3 pb-6">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#841b60] to-transparent"></div>
      </div>
    </div>
  );
};

export default ModernEditorSidebar;
