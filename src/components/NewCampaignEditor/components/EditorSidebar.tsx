
import React from 'react';
import { Settings, Palette, Smartphone, Monitor, Users, BarChart3, Gamepad2 } from 'lucide-react';
import { CampaignType } from '../../../utils/campaignTypes';

interface EditorSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  campaignType: CampaignType;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  activeSection,
  setActiveSection,
  campaignType
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

  return (
    <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h2>
        
        <nav className="space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-purple-700'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className={`font-medium ${isActive ? 'text-purple-900' : 'text-gray-900'}`}>
                    {section.label}
                  </div>
                  <div className={`text-sm ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
                    {section.description}
                  </div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* Game Type Indicator */}
      <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-t border-gray-200">
        <div className="text-sm font-medium text-gray-900 mb-1">Type de jeu actuel</div>
        <div className="text-lg font-bold text-purple-600 capitalize">{campaignType}</div>
      </div>
    </aside>
  );
};

export default EditorSidebar;
