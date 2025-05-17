import React from 'react';

interface EditorTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { key: 'general', label: 'Général' },
  { key: 'content', label: 'Contenu' },
  { key: 'design', label: 'Design' }
];

const EditorTabs: React.FC<EditorTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b bg-gray-50">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === tab.key
              ? 'border-b-2 border-[#841b60] text-[#841b60] bg-white'
              : 'text-gray-600 hover:text-[#841b60]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default EditorTabs;
