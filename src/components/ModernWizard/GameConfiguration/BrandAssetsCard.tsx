
import React from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { CampaignData } from '../../../pages/ModernCampaignWizard';
import BrandAssetUpload from '../components/BrandAssetUpload';

interface BrandAssetsCardProps {
  campaignData: CampaignData;
  updateCampaignData: (updates: Partial<CampaignData>) => void;
}

const BrandAssetsCard: React.FC<BrandAssetsCardProps> = ({
  campaignData,
  updateCampaignData
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Upload className="w-5 h-5 mr-2 text-[#841b60]" />
        Brand Assets
      </h3>
      
      <BrandAssetUpload
        logo={campaignData.logo}
        onLogoChange={(logo) => updateCampaignData({ logo })}
      />
    </motion.div>
  );
};

export default BrandAssetsCard;
