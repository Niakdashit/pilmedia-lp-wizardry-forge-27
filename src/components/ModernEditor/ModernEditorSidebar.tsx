
import React from 'react';
import { Settings, Gamepad2, Palette, FileText } from 'lucide-react';

interface ModernEditorSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  campaignType: string;
}

const ModernEditorSidebar: React.FC<ModernEditorSidebarProps> = ({
  activeTab,
  onTabChange,
  campaignType
}) => {
  const tabs = [
    { id: 'general', label: 'Général', icon: Settings },
    { id: 'game', label: 'Jeu', icon: Gamepad2 },
    { id: 'form', label: 'Formulaire', icon: FileText },
    { id: 'design', label: 'Design', icon: Palette }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Configuration</h2>
        <p className="text-sm text-gray-500 mt-1">
          Personnalisez votre campagne
        </p>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#841b60] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default ModernEditorSidebar;
