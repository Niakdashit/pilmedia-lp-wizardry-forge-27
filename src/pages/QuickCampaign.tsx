
import React, { useEffect } from 'react';
import QuickCampaignCreator from '../components/QuickCampaign/QuickCampaignCreator';
import { useQuickCampaignStore } from '../stores/quickCampaignStore';
import FondQuick from '../assets/FondQuick.jpg';

const QuickCampaign: React.FC = () => {
  const { reset } = useQuickCampaignStore();

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div 
      style={{
        backgroundImage: `url(${FondQuick})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }} 
      className="min-h-screen"
    >
      <div className="min-h-screen bg-black/40">
        <QuickCampaignCreator />
      </div>
    </div>
  );
};

export default QuickCampaign;
