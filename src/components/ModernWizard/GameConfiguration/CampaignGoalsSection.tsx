
import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users } from 'lucide-react';
import { CampaignData } from '../../../pages/ModernCampaignWizard';
import ChipSelector from '../components/ChipSelector';

interface CampaignGoalsSectionProps {
  campaignData: CampaignData;
  updateCampaignData: (updates: Partial<CampaignData>) => void;
}

const audienceOptions = [
  'Young Adults (18-25)', 'Professionals (25-40)', 'Families', 
  'Seniors (50+)', 'Students', 'Entrepreneurs'
];

const goalOptions = [
  'Lead Generation', 'Brand Awareness', 'Product Launch', 
  'Customer Engagement', 'Event Promotion', 'Newsletter Signup'
];

const CampaignGoalsSection: React.FC<CampaignGoalsSectionProps> = ({
  campaignData,
  updateCampaignData
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-[#841b60]" />
            Campaign Goal
          </h3>
          <ChipSelector
            options={goalOptions}
            selected={campaignData.campaignGoal}
            onChange={(goal) => updateCampaignData({ campaignGoal: goal })}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-[#841b60]" />
            Target Audience
          </h3>
          <ChipSelector
            options={audienceOptions}
            selected={campaignData.targetAudience}
            onChange={(audience) => updateCampaignData({ targetAudience: audience })}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CampaignGoalsSection;
