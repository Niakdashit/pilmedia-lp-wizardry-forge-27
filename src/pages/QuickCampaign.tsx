
import React, { useEffect } from 'react';
import QuickCampaignCreator from '../components/QuickCampaign/QuickCampaignCreator';
import { useQuickCampaignStore } from '../stores/quickCampaignStore';

const QuickCampaign: React.FC = () => {
  const { reset } = useQuickCampaignStore();

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="min-h-screen bg-[#ebf4f7]">
      <div className="max-w-md mx-auto md:max-w-none">
        <QuickCampaignCreator />
      </div>
    </div>
  );
};

export default QuickCampaign;
