
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickCampaignCreator from '../components/QuickCampaign/QuickCampaignCreator';
import { useQuickCampaignStore } from '../stores/quickCampaignStore';

const QuickCampaign: React.FC = () => {
  const navigate = useNavigate();
  const { reset } = useQuickCampaignStore();

  useEffect(() => {
    // Reset du store quand on arrive sur la page
    reset();
  }, [reset]);

  return (
    <div className="min-h-screen">
      <QuickCampaignCreator />
    </div>
  );
};

export default QuickCampaign;
