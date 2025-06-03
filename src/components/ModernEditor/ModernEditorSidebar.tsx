
import React from 'react';
import { Settings, Gamepad2, Palette, FileText, Sliders } from 'lucide-react';

interface ModernEditorSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  campaignType: string;
}

const ModernEditorSidebar: React.FC<ModernEditorSidebarProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'game', label: 'Jeu', icon: Gamepad2 },
    { id: 'gameconfig', label: 'Config', icon: Sliders },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'form', label: 'Formulaire', icon: FileText }
  ];

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 py-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                w-full p-3 mb-2 flex flex-col items-center justify-center text-xs transition-all
                ${isActive 
                  ? 'bg-[#841b60] text-white' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
              title={tab.label}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="leading-tight text-center break-words">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModernEditorSidebar;
