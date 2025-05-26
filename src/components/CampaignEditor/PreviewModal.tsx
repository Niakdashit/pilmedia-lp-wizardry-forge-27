import React from 'react';
import { X } from 'lucide-react';
// IMPORTS DES FUNNELS
import FunnelUnlockedGame from '../funnels/FunnelUnlockedGame';
import FunnelStandard from '../funnels/FunnelStandard';
// import GameCanvasPreview from './GameCanvasPreview'; // tu peux le garder pour l’aperçu custom le cas échéant

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, campaign }) => {
  if (!isOpen) return null;

  // Détermine le funnel à afficher selon le type de campagne
  const getPreviewFunnel = () => {
    // Funnel 1 : Jeu visible mais verrouillé tant que le formulaire n’est pas validé
    if (['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type)) {
      return (
        <FunnelUnlockedGame
          campaign={campaign}
          formFields={campaign.formFields || []} // on passe bien la config dynamique
        />
      );
    }
    // Funnel 2 : Quiz, memory, puzzle, formulaire dynamique...
    return (
      <FunnelStandard
        campaign={campaign}
        formFields={campaign.formFields || []}
      />
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white w-full h-full flex flex-col relative overflow-hidden">
        {/* Bande supérieure */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Aperçu de la campagne</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas plein écran avec padding top pour la bande */}
        <div className="flex-1 pt-20 overflow-hidden flex justify-center items-center">
          <div className="w-full h-full flex items-center justify-center">
            {getPreviewFunnel()}
            {/* Tu peux garder l’aperçu canvas si besoin */}
            {/* <GameCanvasPreview campaign={campaign} className="h-full" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
