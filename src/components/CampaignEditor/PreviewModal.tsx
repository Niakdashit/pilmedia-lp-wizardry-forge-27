import React from 'react';
import { X } from 'lucide-react';
import GameCanvasPreview from './GameCanvasPreview';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, campaign }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white w-full h-full flex flex-col relative overflow-hidden">
        {/* Barre supérieure */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Aperçu de la campagne</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas en dessous de la barre */}
        <div className="flex-1 pt-20 flex items-center justify-center overflow-auto bg-gray-50">
          <GameCanvasPreview campaign={campaign} />
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
