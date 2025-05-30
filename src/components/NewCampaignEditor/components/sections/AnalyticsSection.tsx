
import React from 'react';
import { BarChart3 } from 'luc ide-react';
import ParticipationsViewer from '../../../campaign/ParticipationsViewer';

interface AnalyticsSectionProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ campaign }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analytiques et résultats</h2>
            <p className="text-gray-600">Consultez les statistiques de votre campagne</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg">
          <ParticipationsViewer
            campaignId={campaign.id || ''}
            campaignName={campaign.name}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
