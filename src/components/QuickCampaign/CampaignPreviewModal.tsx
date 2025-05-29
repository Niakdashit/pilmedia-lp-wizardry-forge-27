
import React from 'react';
import { motion } from 'framer-motion';
import { X, Monitor, Smartphone } from 'lucide-react';

interface CampaignPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const CampaignPreviewModal: React.FC<CampaignPreviewModalProps> = ({
  isOpen,
  onClose,
  campaign
}) => {
  if (!isOpen) return null;

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
        className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div className="flex items-center space-x-4">
            <Monitor className="w-6 h-6 text-gray-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Aperçu de la campagne
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Preview content */}
        <div className="p-8">
          {campaign ? (
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {campaign.name || 'Ma Campagne'}
                </h3>
                <p className="text-gray-600 mb-4">
                  Type: {campaign.selectedGameType || 'Non défini'}
                </p>
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Campagne configurée</span>
                </div>
              </div>
              
              <p className="text-gray-500">
                Votre campagne est prête à être déployée. Vous pourrez la personnaliser davantage après sa création.
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <Smartphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Prévisualisation non disponible
              </h3>
              <p className="text-gray-500">
                Terminez la configuration pour voir l'aperçu de votre campagne.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CampaignPreviewModal;
