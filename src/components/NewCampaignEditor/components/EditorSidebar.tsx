
import React from 'react';
import { Settings, Palette, Smartphone, Monitor, Users, BarChart3, Gamepad2 } from 'lucide-react';
import { CampaignType } from '../../../utils/campaignTypes';

interface EditorSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  campaignType: CampaignType;
  onSectionChange?: () => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  activeSection,
  setActiveSection,
  campaignType,
  onSectionChange
}) => {
  const sections = [
    { id: 'general', label: 'Général', icon: Settings, description: 'Paramètres de base' },
    { id: 'game', label: 'Jeu', icon: Gamepad2, description: 'Configuration du jeu' },
    { id: 'design', label: 'Design', icon: Palette, description: 'Apparence visuelle' },
    { id: 'layout', label: 'Mise en page', icon: Monitor, description: 'Positionnement des éléments' },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, description: 'Optimisation mobile' },
    { id: 'form', label: 'Formulaire', icon: Users, description: 'Collecte de données' },
    { id: 'analytics', label: 'Analytiques', icon: BarChart3, description: 'Statistiques et résultats' }
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    onSectionChange?.();
  };

  return (
    <aside className="h-full bg-white border-r border-gray-200 overflow-y-auto">
      {/* Header avec gradient brand */}
      <div className="bg-gradient-to-r from-[#841b60] to-pink-600 p-4 lg:p-6">
        <h2 className="text-lg font-semibold text-white mb-2">Configuration</h2>
        <p className="text-white/80 text-sm">Personnalisez votre campagne</p>
      </div>
      
      <div className="p-4 lg:p-6">
        <nav className="space-y-1 lg:space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`w-full flex items-center space-x-3 px-3 lg:px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#841b60]/10 to-pink-50 border border-[#841b60]/20 text-[#841b60]'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#841b60]' : 'text-gray-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className={`font-medium ${isActive ? 'text-[#841b60]' : 'text-gray-900'}`}>
                    {section.label}
                  </div>
                  <div className={`text-xs lg:text-sm ${isActive ? 'text-[#841b60]/70' : 'text-gray-500'} truncate`}>
                    {section.description}
                  </div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-[#841b60] rounded-full flex-shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* Game Type Indicator avec style brand */}
      <div className="p-4 lg:p-6 bg-gradient-to-r from-[#841b60]/5 to-pink-50 border-t border-gray-200 mt-auto">
        <div className="text-sm font-medium text-gray-900 mb-1">Type de jeu actuel</div>
        <div className="text-lg font-bold text-[#841b60] capitalize">{campaignType}</div>
      </div>
    </aside>
  );
};

export default EditorSidebar;
