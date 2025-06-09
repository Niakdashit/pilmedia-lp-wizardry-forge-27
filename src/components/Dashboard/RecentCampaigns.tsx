
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, MoreVertical } from 'lucide-react';
import { getCampaignTypeIcon, getCampaignTypeText, CampaignType } from '../../utils/campaignTypes';
import { RecentCampaign } from './types';

const RecentCampaigns: React.FC = () => {
  const recentCampaigns: RecentCampaign[] = [
    {
      id: '1',
      name: 'Quiz Marketing Digital',
      type: 'quiz' as CampaignType,
      participants: 4,
      status: 'draft',
      createdAt: '17 mai 2025',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
    },
    {
      id: '2',
      name: 'Roue de la fortune Soldes',
      type: 'wheel' as CampaignType,
      participants: 45,
      status: 'active',
      createdAt: '16 mai 2025',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
    },
    {
      id: '3',
      name: 'Campagne Instagram Été',
      type: 'dice' as CampaignType,
      participants: 128,
      status: 'active',
      createdAt: '15 mai 2025',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'draft':
        return 'text-gray-500';
      case 'ended':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'draft':
        return 'Brouillon';
      case 'ended':
        return 'Terminée';
      default:
        return status;
    }
  };

  return (
    <div className="relative">
      <div className="p-0">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Campagnes récentes</h2>
          <Link to="/campaigns" className="text-[#841b60] hover:text-[#6d164f] font-medium flex items-center transition-colors">
            Voir toutes
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentCampaigns.map(campaign => {
            const IconComponent = getCampaignTypeIcon(campaign.type);
            return (
              <div key={campaign.id} className="bg-white rounded-xl shadow hover:shadow-md transition-all duration-300 overflow-hidden">
                {campaign.image && (
                  <div className="relative h-40 w-full overflow-hidden">
                    <img src={campaign.image} alt={campaign.name} className="w-full h-full object-cover" />

                    <div className="absolute top-3 left-3">
                      <div className="inline-flex items-center rounded-full bg-white text-[#841b60] px-3 py-1 text-xs font-medium">
                        <IconComponent className="w-4 h-4" />
                        <span className="ml-2">{getCampaignTypeText(campaign.type)}</span>
                      </div>
                    </div>

                    <button className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white transition" aria-label="Options">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                )}
                <div className="p-4 space-y-2">
                  <h3 className="text-base font-semibold text-gray-800 truncate">{campaign.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Créé le {campaign.createdAt}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-800 font-medium">{campaign.participants} participants</span>
                    <span className={`flex items-center text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      <span className="mr-1.5 h-2 w-2 rounded-full bg-current" />
                      {getStatusText(campaign.status)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentCampaigns;
