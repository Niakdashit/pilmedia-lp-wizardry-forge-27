
import React, { useEffect } from 'react';
import QuickCampaignCreator from '../components/QuickCampaign/QuickCampaignCreator';
import { useQuickCampaignStore } from '../stores/quickCampaignStore';
import { useSearchParams } from 'react-router-dom';

const QuickCampaign: React.FC = () => {
  const { reset, setSelectedGameType, setCurrentStep } = useQuickCampaignStore();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  useEffect(() => {
    reset();
    if (type) {
      setSelectedGameType(type);
      setCurrentStep(2);
    }
  }, [reset, type, setSelectedGameType, setCurrentStep]);

  return (
    <div className="min-h-screen bg-[#ebf4f7]">
      <QuickCampaignCreator />
    </div>
  );
};

export default QuickCampaign;
