
import React, { useEffect } from 'react';
import QuickCampaignCreator from '../components/QuickCampaign/QuickCampaignCreator';
import { useQuickCampaignStore } from '../stores/quickCampaignStore';
// 👇 Importe l'image depuis les assets
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
        backgroundRepeat: 'no-repeat'
      }} 
      className="min-h-screen flex items-center justify-center p-6"
    >
      {/* Fond dégradé coloré comme dans l'aperçu */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 opacity-90" />
      
      <div className="relative z-10 w-full">
        <QuickCampaignCreator />
      </div>
    </div>
  );
};

export default QuickCampaign;
