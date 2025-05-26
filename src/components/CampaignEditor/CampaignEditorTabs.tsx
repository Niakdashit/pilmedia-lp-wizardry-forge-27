import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface CampaignEditorTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const CampaignEditorTabs: React.FC<CampaignEditorTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs: Tab[] = [
    { id: 'general', label: 'Général' },
    { id: 'content', label: 'Contenu' },
    { id: 'screens', label: 'Écrans' },
    { id: 'form', label: 'Formulaire' },       // <--- Ajout de l'onglet Formulaire ici
    { id: 'mobile', label: 'Mobile' },
    { id: 'settings', label: 'Paramétrage' }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-200 ${
              activeTab === tab.id 
                ? 'border-[#841b60] text-[#841b60]' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default CampaignEditorTabs;
