
import React from 'react';
import { ArrowLeft, Eye, Save, Share2, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EditorHeaderProps {
  campaign: any;
  onSave: () => void;
  onPreview: () => void;
  isLoading?: boolean;
  isNewCampaign?: boolean;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  campaign,
  onSave,
  onPreview,
  isLoading = false,
  isNewCampaign = false
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/gamification')}
              className="p-2 hover:bg-gray-50 rounded-xl transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {campaign.name || (isNewCampaign ? 'Nouvelle Campagne' : 'Campagne')}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Dernière modification: maintenant</span>
                <span>•</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  campaign.status === 'published' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {campaign.status === 'published' ? 'Publié' : 'Brouillon'}
                </span>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onPreview}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>Aperçu</span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
              <Share2 className="w-4 h-4" />
              <span>Partager</span>
            </button>

            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
              <MoreHorizontal className="w-5 h-5" />
            </button>

            <button
              onClick={onSave}
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-2 bg-[#841b60] hover:bg-[#6d164f] text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
