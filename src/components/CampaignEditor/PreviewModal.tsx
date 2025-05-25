
import React from 'react';
import { X } from 'lucide-react';
import CampaignPreview from './CampaignPreview';
import { CampaignType } from '../../utils/campaignTypes';

interface Campaign {
  name: string;
  description: string;
  url: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: string;
  type: CampaignType;
  screens: {
    [key: number]: {
      title?: string;
      description?: string;
      buttonText?: string;
      buttonLink?: string;
      showTitle?: boolean;
      showDescription?: boolean;
      showReplayButton?: boolean;
    };
  };
  gameConfig: any;
  design: {
    background: string;
    fontFamily: string;
    primaryColor: string;
    secondaryColor: string;
    titleColor: string;
    buttonColor: string;
    blockColor: string;
    borderColor: string;
    borderRadius: string;
    shadow: string;
    titleFont: string;
    textFont: string;
    fontSize: string;
    fontWeight: string;
    logoUrl: string;
    backgroundImage: string;
    customCSS?: string;
    customHTML?: string;
    textColor?: string;
  };
  rewards: {
    mode: string;
    quantity: number;
    probability: number;
    timeSlots: any[];
  };
  config: {
    jackpot?: any;
  };
}

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, campaign }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Aperçu de la campagne</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="bg-gray-100 rounded-lg p-4">
            <CampaignPreview campaign={campaign} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
