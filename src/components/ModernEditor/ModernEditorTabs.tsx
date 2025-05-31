
import React from 'react';
import { 
  Palette, 
  Gamepad2, 
  Monitor, 
  FileText, 
  Smartphone, 
  Users 
} from 'lucide-react';

interface ModernEditorTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ModernEditorTabs: React.FC<ModernEditorTabsProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const tabs = [
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'game', label: 'Jeu', icon: Gamepad2 },
    { id: 'screens', label: 'Écrans', icon: Monitor },
    { id: 'form', label: 'Formulaire', icon: FileText },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'participations', label: 'Participations', icon: Users },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <nav className="px-4 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-left mb-1 ${
                activeTab === tab.id
                  ? 'bg-[#841b60] text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ModernEditorTabs;
