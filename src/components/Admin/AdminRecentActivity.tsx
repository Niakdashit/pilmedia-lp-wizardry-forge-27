
import React from 'react';
import { Calendar, Plus, Activity, Archive, TrendingUp, AlertCircle } from 'lucide-react';
import { RecentActivity } from './types';

interface AdminRecentActivityProps {
  activities: RecentActivity[];
}

const AdminRecentActivity: React.FC<AdminRecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'campaign_created':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'campaign_published':
        return <Activity className="w-4 h-4 text-blue-600" />;
      case 'status_change':
        return <Archive className="w-4 h-4 text-orange-600" />;
      case 'participation_spike':
        return <TrendingUp className="w-4 h-4 text-purple-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Activité Récente</h3>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              {activity.clientName && (
                <p className="text-sm text-gray-500">Client: {activity.clientName}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRecentActivity;
