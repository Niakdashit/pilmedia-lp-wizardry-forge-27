
import React from 'react';
import { Save, Eye, Monitor, Smartphone, Tablet, RotateCcw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EditorHeaderProps {
  campaign: any;
  onSave: (continueEditing?: boolean) => void;
  onPreview: () => void;
  previewDevice: 'mobile' | 'tablet' | 'desktop';
  setPreviewDevice: (device: 'mobile' | 'tablet' | 'desktop') => void;
  previewOrientation: 'portrait' | 'landscape';
  setPreviewOrientation: (orientation: 'portrait' | 'landscape') => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  campaign,
  onSave,
  onPreview,
  previewDevice,
  setPreviewDevice,
  previewOrientation,
  setPreviewOrientation
}) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/campaigns')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
          
          <div className="h-6 w-px bg-gray-300" />
          
          <div>
            <h1 className="text-xl font-bold text-gray-900">{campaign.name}</h1>
            <p className="text-sm text-gray-500">
              {campaign.type} • {campaign.status === 'draft' ? 'Brouillon' : 'Publié'}
            </p>
          </div>
        </div>

        {/* Center Section - Preview Controls */}
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setPreviewDevice('mobile')}
            className={`p-2 rounded-md transition-colors ${
              previewDevice === 'mobile' 
                ? 'bg-white text-purple-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPreviewDevice('tablet')}
            className={`p-2 rounded-md transition-colors ${
              previewDevice === 'tablet' 
                ? 'bg-white text-purple-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPreviewDevice('desktop')}
            className={`p-2 rounded-md transition-colors ${
              previewDevice === 'desktop' 
                ? 'bg-white text-purple-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          
          <div className="h-6 w-px bg-gray-300 mx-1" />
          
          <button
            onClick={() => setPreviewOrientation(previewOrientation === 'portrait' ? 'landscape' : 'portrait')}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
            title="Changer l'orientation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onPreview}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Aperçu</span>
          </button>
          
          <button
            onClick={() => onSave(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer</span>
          </button>
          
          <button
            onClick={() => onSave(false)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            Publier
          </button>
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;
