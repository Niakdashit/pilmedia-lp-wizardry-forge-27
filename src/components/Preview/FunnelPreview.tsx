
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Funnel1Steps from './Funnel1Steps';
import Funnel2Steps from './Funnel2Steps';

interface FunnelPreviewProps {
  campaign: any;
  isOpen: boolean;
  onClose: () => void;
  viewMode: 'modal' | 'mobile' | 'tablet';
}

const FunnelPreview: React.FC<FunnelPreviewProps> = ({
  campaign,
  isOpen,
  onClose,
  viewMode
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    civilite: '',
    prenom: '',
    nom: '',
    email: ''
  });

  // Determine which funnel type based on game type
  const isFunnel1 = ['wheel', 'scratch', 'jackpot', 'dice'].includes(campaign.type);
  
  const resetFunnel = () => {
    setCurrentStep(1);
    setFormData({ civilite: '', prenom: '', nom: '', email: '' });
  };

  const getContainerStyle = () => {
    switch (viewMode) {
      case 'mobile':
        return {
          width: '375px',
          height: '667px',
          borderRadius: '20px',
          border: '6px solid #1f1f1f',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          backgroundColor: '#000',
          overflow: 'hidden'
        };
      case 'tablet':
        return {
          width: '768px',
          height: '1024px',
          borderRadius: '14px',
          border: '4px solid #333',
          boxShadow: '0 0 15px rgba(0,0,0,0.2)',
          backgroundColor: '#000',
          overflow: 'hidden'
        };
      case 'modal':
      default:
        return {
          width: '90vw',
          maxWidth: '1200px',
          height: '80vh',
          borderRadius: '12px',
          backgroundColor: '#fff',
          overflow: 'hidden'
        };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div style={getContainerStyle()} className="relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Funnel Content */}
        <div className="w-full h-full">
          <AnimatePresence mode="wait">
            {isFunnel1 ? (
              <Funnel1Steps
                key="funnel1"
                campaign={campaign}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                formData={formData}
                setFormData={setFormData}
                onReset={resetFunnel}
                viewMode={viewMode}
              />
            ) : (
              <Funnel2Steps
                key="funnel2"
                campaign={campaign}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                formData={formData}
                setFormData={setFormData}
                onReset={resetFunnel}
                viewMode={viewMode}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FunnelPreview;
