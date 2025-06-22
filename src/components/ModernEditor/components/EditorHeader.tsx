
import React from 'react';
import { ArrowLeft, Eye, Save, Share2, MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PreviewDeviceButtons from './PreviewDeviceButtons';

interface EditorHeaderProps {
  campaign: any;
  onSave: () => void;
  onPreview: () => void;
  isLoading?: boolean;
  isNewCampaign?: boolean;
  selectedDevice?: 'desktop' | 'tablet' | 'mobile';
  onDeviceChange?: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  campaign,
  onSave,
  onPreview,
  isLoading = false,
  isNewCampaign = false,
  selectedDevice = 'desktop',
  onDeviceChange = () => {}
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-gray-100 flex-shrink-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left section - aligné avec le sidebar */}
          <div className="flex items-center space-x-4 w-80 flex-shrink-0">
            <button
              onClick={() => navigate('/gamification')}
              className="p-2 hover:bg-gray-50 rounded-xl transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-gray-900 truncate">
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

          {/* Center section - Device buttons dans la zone centrale */}
          <div className="flex items-center justify-center flex-1">
            <PreviewDeviceButtons 
              selectedDevice={selectedDevice}
              onDeviceChange={onDeviceChange}
            />
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
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
