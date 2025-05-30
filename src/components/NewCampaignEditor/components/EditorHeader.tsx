
import React from 'react';
import { Save, Eye, Monitor, Smartphone, Tablet, RotateCcw, ArrowLeft, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EditorHeaderProps {
  campaign: any;
  onSave: (continueEditing?: boolean) => void;
  onPreview: () => void;
  previewDevice: 'mobile' | 'tablet' | 'desktop';
  setPreviewDevice: (device: 'mobile' | 'tablet' | 'desktop') => void;
  previewOrientation: 'portrait' | 'landscape';
  setPreviewOrientation: (orientation: 'portrait' | 'landscape') => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  campaign,
  onSave,
  onPreview,
  previewDevice,
  setPreviewDevice,
  previewOrientation,
  setPreviewOrientation,
  sidebarOpen,
  setSidebarOpen
}) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 px-3 lg:px-6 py-3 lg:py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section - Mobile First */}
        <div className="flex items-center space-x-2 lg:space-x-4 flex-1 min-w-0">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <button
            onClick={() => navigate('/campaigns')}
            className="hidden lg:flex items-center space-x-2 text-gray-600 hover:text-[#841b60] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
          
          <div className="hidden lg:block h-6 w-px bg-gray-300" />
          
          <div className="flex-1 min-w-0">
            <h1 className="text-lg lg:text-xl font-bold text-gray-900 truncate">{campaign.name}</h1>
            <p className="text-xs lg:text-sm text-gray-500 truncate">
              {campaign.type} • {campaign.status === 'draft' ? 'Brouillon' : 'Publié'}
            </p>
          </div>
        </div>

        {/* Center Section - Preview Controls (Hidden on small mobile) */}
        <div className="hidden sm:flex items-center space-x-1 lg:space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setPreviewDevice('mobile')}
            className={`p-1.5 lg:p-2 rounded-md transition-colors ${
              previewDevice === 'mobile' 
                ? 'bg-white text-[#841b60] shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Smartphone className="w-3 h-3 lg:w-4 lg:h-4" />
          </button>
          <button
            onClick={() => setPreviewDevice('tablet')}
            className={`p-1.5 lg:p-2 rounded-md transition-colors ${
              previewDevice === 'tablet' 
                ? 'bg-white text-[#841b60] shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Tablet className="w-3 h-3 lg:w-4 lg:h-4" />
          </button>
          <button
            onClick={() => setPreviewDevice('desktop')}
            className={`p-1.5 lg:p-2 rounded-md transition-colors ${
              previewDevice === 'desktop' 
                ? 'bg-white text-[#841b60] shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Monitor className="w-3 h-3 lg:w-4 lg:h-4" />
          </button>
          
          <div className="h-4 lg:h-6 w-px bg-gray-300 mx-1" />
          
          <button
            onClick={() => setPreviewOrientation(previewOrientation === 'portrait' ? 'landscape' : 'portrait')}
            className="p-1.5 lg:p-2 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
            title="Changer l'orientation"
          >
            <RotateCcw className="w-3 h-3 lg:w-4 lg:h-4" />
          </button>
        </div>

        {/* Right Section - Mobile Optimized */}
        <div className="flex items-center space-x-1 lg:space-x-3">
          <button
            onClick={onPreview}
            className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-1.5 lg:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="hidden sm:inline">Aperçu</span>
          </button>
          
          <button
            onClick={() => onSave(true)}
            className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-1.5 lg:py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d1650] transition-colors text-sm"
          >
            <Save className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="hidden sm:inline">Enregistrer</span>
          </button>
          
          <button
            onClick={() => onSave(false)}
            className="px-2 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-r from-[#841b60] to-pink-600 text-white rounded-lg hover:from-[#6d1650] hover:to-pink-700 transition-all transform hover:scale-105 text-sm"
          >
            Publier
          </button>
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;
