
import React from 'react';
import { ArrowLeft, Save, Eye, Settings } from 'lucide-react';

interface EditorHeaderProps {
  campaignName: string;
  isNewCampaign: boolean;
  onSave: (continueEditing?: boolean) => void;
  onPreview: () => void;
  onBack: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  campaignName,
  isNewCampaign,
  onSave,
  onPreview,
  onBack
}) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Retour aux campagnes"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            {isNewCampaign ? 'Nouvelle Campagne' : campaignName}
          </h1>
          <p className="text-sm text-gray-500">
            {isNewCampaign ? 'Créer une nouvelle campagne' : 'Modifier la campagne'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={onPreview}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Eye className="w-4 h-4 mr-2" />
          Aperçu
        </button>
        
        <button
          onClick={() => onSave(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </button>
      </div>
    </header>
  );
};

export default EditorHeader;
