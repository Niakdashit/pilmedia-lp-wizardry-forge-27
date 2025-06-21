
import React from 'react';
import { Settings, Sparkles } from 'lucide-react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

const AdvancedModeToggle: React.FC = () => {
  const { advancedMode, setAdvancedMode } = useQuickCampaignStore();

  return (
    <div className="flex items-center space-x-3">
      <div className="text-sm text-gray-600">Mode Expert</div>
      <button
        onClick={() => setAdvancedMode(!advancedMode)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
          advancedMode ? 'bg-purple-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            advancedMode ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <div className="flex items-center space-x-1">
        {advancedMode ? (
          <Sparkles className="w-4 h-4 text-purple-600" />
        ) : (
          <Settings className="w-4 h-4 text-gray-400" />
        )}
        <span className={`text-sm font-medium ${
          advancedMode ? 'text-purple-600' : 'text-gray-500'
        }`}>
          {advancedMode ? 'Activé' : 'Désactivé'}
        </span>
      </div>
    </div>
  );
};

export default AdvancedModeToggle;
