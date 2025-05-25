
import React from 'react';
import { getCampaignTypeText, getCampaignTypeIcon } from '../utils/campaignTypes';

const Dashboard: React.FC = () => {
  const campaigns = [
    { id: '1', name: 'Quiz Marketing', type: 'quiz', status: 'active' },
    { id: '2', name: 'Roue de la Fortune Noël', type: 'wheel', status: 'draft' },
    { id: '3', name: 'Jeu de Dés Été', type: 'dice', status: 'completed' },
  ];

  return (
    <div>
      {campaigns.map((campaign) => {
        const IconComponent = getCampaignTypeIcon(campaign.type as any);
        return (
          <div key={campaign.id}>
            <IconComponent className="w-5 h-5" />
            <span>{getCampaignTypeText(campaign.type as any)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
