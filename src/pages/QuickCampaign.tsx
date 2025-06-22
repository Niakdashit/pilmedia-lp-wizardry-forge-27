
import React, { useEffect } from 'react';
import QuickCampaignCreator from '../components/QuickCampaign/QuickCampaignCreator';
import { useQuickCampaignStore } from '../stores/quickCampaignStore';
import Sidebar from '../components/Sidebar/Sidebar';

const QuickCampaign: React.FC = () => {
  const { reset } = useQuickCampaignStore();

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="min-h-screen bg-[#ebf4f7] flex">
      {/* Main Navigation Sidebar */}
      <Sidebar />
      
      <div className="flex-1 min-w-0">
        <div className="space-y-6">
          <QuickCampaignCreator />
        </div>
      </div>
    </div>
  );
};

export default QuickCampaign;
