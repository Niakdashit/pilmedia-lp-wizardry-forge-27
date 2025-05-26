
import React, { useState } from 'react';
import { X, Smartphone, Tablet, Monitor } from 'lucide-react';
import GameCanvasPreview from './GameCanvasPreview';
import FunnelPreview from '../Preview/FunnelPreview';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, campaign }) => {
  const [previewMode, setPreviewMode] = useState<'game' | 'funnel'>('funnel');
  const [viewMode, setViewMode] = useState<'modal' | 'mobile' | 'tablet'>('modal');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white w-full h-full flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-gray-800">Aperçu de la campagne</h2>
            
            {/* Preview Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setPreviewMode('funnel')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  previewMode === 'funnel'
                    ? 'bg-white text-[#841b60] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Funnel
              </button>
              <button
                onClick={() => setPreviewMode('game')}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  previewMode === 'game'
                    ? 'bg-white text-[#841b60] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Jeu seul
              </button>
            </div>

            {/* View Mode Toggle (only for funnel) */}
            {previewMode === 'funnel' && (
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('modal')}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    viewMode === 'modal'
                      ? 'bg-white text-[#841b60] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setViewMode('tablet')}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    viewMode === 'tablet'
                      ? 'bg-white text-[#841b60] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                  <span>Tablet</span>
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    viewMode === 'mobile'
                      ? 'bg-white text-[#841b60] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Mobile</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 pt-20 overflow-hidden flex justify-center items-center bg-gray-50">
          {previewMode === 'funnel' ? (
            <FunnelPreview
              campaign={campaign}
              isOpen={true}
              onClose={() => {}}
              viewMode={viewMode}
            />
          ) : (
            <div className="w-full h-full">
              <GameCanvasPreview campaign={campaign} className="h-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
