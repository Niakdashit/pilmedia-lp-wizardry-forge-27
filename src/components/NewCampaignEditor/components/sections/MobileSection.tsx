
import React from 'react';
import { Smartphone } from 'lucide-react';
import CampaignMobile from '../../../CampaignEditor/CampaignMobile';

interface MobileSectionProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const MobileSection: React.FC<MobileSectionProps> = ({ campaign, setCampaign }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Optimisation mobile</h2>
            <p className="text-gray-600">Configurez l'affichage sur appareils mobiles</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <CampaignMobile campaign={campaign} setCampaign={setCampaign} />
        </div>
      </div>
    </div>
  );
};

export default MobileSection;
