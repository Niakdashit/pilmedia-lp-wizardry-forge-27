import React, { useEffect } from 'react';
import QuickCampaignCreator from '../components/QuickCampaign/QuickCampaignCreator';
import { useQuickCampaignStore } from '../stores/quickCampaignStore';

const QuickCampaign: React.FC = () => {
  const { reset } = useQuickCampaignStore();

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage: 'url("/bg-photo.png")', // Chemin relatif au dossier public
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full">
        <QuickCampaignCreator />
      </div>
    </div>
  );
};

export default QuickCampaign;
