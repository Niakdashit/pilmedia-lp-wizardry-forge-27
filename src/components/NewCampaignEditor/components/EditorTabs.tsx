
import React from 'react';
import { Settings, Palette, FileText, Eye } from 'lucide-react';
import { CampaignType } from '../../../utils/campaignTypes';
import { TabType } from '../NewCampaignEditor';

interface EditorTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  campaignType: CampaignType;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  activeTab,
  onTabChange,
  campaignType
}) => {
  const tabs = [
    {
      id: 'general' as TabType,
      label: 'Général',
      icon: Settings,
      description: 'Informations de base'
    },
    {
      id: 'design' as TabType,
      label: 'Design',
      icon: Palette,
      description: 'Apparence et style'
    },
    {
      id: 'content' as TabType,
      label: 'Contenu',
      icon: FileText,
      description: `Configuration ${getGameTypeLabel(campaignType)}`
    },
    {
      id: 'preview' as TabType,
      label: 'Prévisualisation',
      icon: Eye,
      description: 'Aperçu final'
    }
  ];

  return (
    <div className="border-b border-gray-200 bg-white">
      <nav className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-4 px-3 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="font-medium">{tab.label}</span>
              <span className="text-xs opacity-75 mt-0.5">{tab.description}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

function getGameTypeLabel(type: CampaignType): string {
  const labels: Record<CampaignType, string> = {
    wheel: 'roue',
    jackpot: 'jackpot',
    scratch: 'carte à gratter',
    memory: 'memory',
    puzzle: 'puzzle',
    dice: 'dé magique',
    quiz: 'quiz',
    swiper: 'swiper'
  };
  return labels[type] || 'jeu';
}

export default EditorTabs;
