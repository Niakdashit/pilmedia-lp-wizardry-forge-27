import React from 'react';
import { Campaign } from '../types';

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold">{campaign.name}</h2>
      <p className="text-gray-600">Type: {campaign.type}</p>
      <p>Status: {campaign.status}</p>
    </div>
  );
};

export default CampaignCard;
