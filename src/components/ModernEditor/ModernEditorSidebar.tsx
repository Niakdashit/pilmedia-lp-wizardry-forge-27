
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Gamepad2, Palette, FormInput, Sliders, Smartphone } from 'lucide-react';
import { CampaignType } from '../../utils/campaignTypes';

interface ModernEditorSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  campaignType: CampaignType;
}

interface TabConfig {
  id: string;
  label: string;
  icon: any;
  description?: string;
}

const ModernEditorSidebar: React.FC<ModernEditorSidebarProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs: TabConfig[] = [
    { id: 'general', label: 'Général', icon: Settings, description: 'Informations de base' },
    { id: 'game', label: 'Jeu', icon: Gamepad2, description: 'Configuration du jeu' },
    { id: 'gameconfig', label: 'Layout', icon: Sliders, description: 'Taille et position' },
    { id: 'design', label: 'Design', icon: Palette, description: 'Couleurs et style' },
    { id: 'form', label: 'Formulaire', icon: FormInput, description: 'Champs de saisie' },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, description: 'Vue mobile' }
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col py-4 border-r border-gray-200">
      <div className="flex-1 space-y-1 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <div key={tab.id} className="relative group">
              <button
                onClick={() => onTabChange(tab.id)}
                className={`relative w-full flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#841b60] text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1.5 transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                <span className="text-xs font-medium text-center leading-tight">{tab.label}</span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-[#841b60] rounded-r-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
              
              {/* Tooltip */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                <div className="font-medium">{tab.label}</div>
                {tab.description && (
                  <div className="text-xs text-gray-300">{tab.description}</div>
                )}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-6 border-transparent border-r-gray-900"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModernEditorSidebar;
