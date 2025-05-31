
import React from 'react';
import { Save, ChevronRight, Eye, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ModernEditorHeaderProps {
  isNewCampaign: boolean;
  campaignName: string;
  onPreview: () => void;
  onSave: (continueEditing?: boolean) => void;
}

const ModernEditorHeader: React.FC<ModernEditorHeaderProps> = ({
  isNewCampaign,
  campaignName,
  onPreview,
  onSave
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/campaigns')}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
          <div className="h-6 w-px bg-gray-300" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {isNewCampaign ? 'Nouvelle Campagne' : campaignName}
            </h1>
            <p className="text-sm text-gray-500">
              {isNewCampaign ? 'Création d\'une nouvelle campagne' : 'Édition de campagne'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onPreview}
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Aperçu</span>
          </button>
          
          <button
            onClick={() => onSave(true)}
            className="flex items-center space-x-2 px-4 py-2 text-[#841b60] bg-white border border-[#841b60] rounded-lg hover:bg-[#f8f0f5] transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer</span>
          </button>
          
          <button
            onClick={() => onSave(false)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors"
          >
            <span>Publier</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernEditorHeader;
