import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Monitor, Smartphone, Tablet } from 'lucide-react';
import { useQuickCampaignStore } from '../../stores/quickCampaignStore';
import PreviewContent from '../Newsletter/PreviewContent';

interface CampaignPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CampaignPreviewModal: React.FC<CampaignPreviewModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const { selectedGameType, campaignName, selectedTheme, selectedTemplate, backgroundImage } = useQuickCampaignStore();

  if (!isOpen) return null;

  // Convertir le File en URL si une image de fond est présente
  const backgroundImageUrl = backgroundImage ? URL.createObjectURL(backgroundImage) : null;

  console.log('CampaignPreviewModal - selectedTemplate from store:', selectedTemplate);

  // Créer un objet campagne basé sur les données du quick campaign store
  const previewCampaign = {
    id: 'quick-campaign-preview',
    name: campaignName || 'Ma Campagne',
    type: selectedGameType || 'jackpot',
    design: {
      theme: selectedTheme || 'moderne',
      template: selectedTemplate, // Template directement depuis le store
      background: selectedTheme === 'creatif' ? '#f0f9ff' :
                 selectedTheme === 'elegant' ? '#faf7ff' :
                 selectedTheme === 'ludique' ? '#fff7ed' : '#ebf4f7',
      titleColor: selectedTheme === 'creatif' ? '#8b5cf6' :
                 selectedTheme === 'elegant' ? '#6366f1' :
                 selectedTheme === 'ludique' ? '#f59e0b' : '#0ea5e9',
      blockColor: '#ffffff',
      backgroundImage: backgroundImageUrl
    },
    screens: {
      1: {
        title: 'Tentez votre chance !',
        description: 'Participez pour avoir une chance de gagner des prix incroyables !'
      },
      3: {
        title: 'Félicitations !',
        description: 'Merci pour votre participation !'
      }
    },
    gameConfig: {
      [selectedGameType || 'jackpot']: {
        template: selectedTemplate, // Template aussi dans gameConfig pour jackpot
        // Configuration par défaut selon le type de jeu
        ...(selectedGameType === 'wheel' && {
          segments: [
            { label: 'Prix 1', value: 'prize1', color: '#ff6b6b' },
            { label: 'Prix 2', value: 'prize2', color: '#4ecdc4' },
            { label: 'Prix 3', value: 'prize3', color: '#45b7d1' },
            { label: 'Perdu', value: 'lose', color: '#96ceb4' }
          ]
        }),
        ...(selectedGameType === 'scratch' && {
          backgroundImage: backgroundImageUrl,
          revealPercentage: 50
        }),
        ...(selectedGameType === 'jackpot' && {
          backgroundImage: backgroundImageUrl,
          instantWin: {
            enabled: true,
            probability: 10
          }
        })
      }
    }
  };

  console.log('Preview campaign object:', previewCampaign);

  const getDevicePreviewStyle = () => {
    switch (selectedDevice) {
      case 'mobile':
        return {
          width: '280px',
          height: '600px',
          borderRadius: '20px',
          border: '6px solid #1f1f1f',
          backgroundColor: '#000',
          padding: '8px'
        };
      case 'tablet':
        return {
          width: '400px',
          height: '650px',
          borderRadius: '14px',
          border: '4px solid #333',
          backgroundColor: '#000',
          padding: '6px'
        };
      default:
        return {
          width: '100%',
          height: '500px',
          borderRadius: '8px',
          border: '2px solid #e5e7eb',
          backgroundColor: '#fff'
        };
    }
  };

  const renderPreview = () => {
    const containerStyle = {
      backgroundColor: previewCampaign.design.background,
      borderRadius: selectedDevice === 'desktop' ? '8px' : selectedDevice === 'mobile' ? '14px' : '8px',
      backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };

    if (selectedDevice === 'desktop') {
      return (
        <div 
          className="w-full h-full flex items-center justify-center"
          style={containerStyle}
        >
          <PreviewContent 
            campaign={previewCampaign}
            step="game"
          />
        </div>
      );
    }

    // Mobile/Tablet preview avec device frame
    return (
      <div className="flex items-center justify-center p-8">
        <div style={getDevicePreviewStyle()}>
          <div 
            className="w-full h-full overflow-hidden"
            style={containerStyle}
          >
            <PreviewContent 
              campaign={previewCampaign}
              step="game"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-4">
            <Monitor className="w-6 h-6 text-gray-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Aperçu de la campagne
            </h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              {campaignName || 'Ma Campagne'}
            </span>
          </div>

          {/* Device Selector */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 mr-4">
            <button
              onClick={() => setSelectedDevice('desktop')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedDevice === 'desktop'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setSelectedDevice('tablet')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedDevice === 'tablet'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Tablet className="w-4 h-4" />
              <span>Tablette</span>
            </button>
            <button
              onClick={() => setSelectedDevice('mobile')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedDevice === 'mobile'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Preview content */}
        <div className="flex-1 overflow-auto" style={{ height: '70vh' }}>
          {renderPreview()}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CampaignPreviewModal;
