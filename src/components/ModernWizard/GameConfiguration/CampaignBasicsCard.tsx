
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { CampaignData } from '../../../pages/ModernCampaignWizard';

interface CampaignBasicsCardProps {
  campaignData: CampaignData;
  updateCampaignData: (updates: Partial<CampaignData>) => void;
}

const CampaignBasicsCard: React.FC<CampaignBasicsCardProps> = ({
  campaignData,
  updateCampaignData
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <MessageSquare className="w-5 h-5 mr-2 text-[#841b60]" />
        Campaign Basics
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand Slogan or Message
          </label>
          <input
            type="text"
            value={campaignData.slogan}
            onChange={(e) => updateCampaignData({ slogan: e.target.value })}
            placeholder="Your brand message..."
            className="w-full px-4 py-3 bg-gray-50/50 border-0 rounded-xl focus:ring-2 focus:ring-[#841b60] transition-all"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignBasicsCard;
