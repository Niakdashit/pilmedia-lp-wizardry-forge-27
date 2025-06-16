
import React from 'react';
import { Zap, Target, Users } from 'lucide-react';

interface AdminTemplatesStatsProps {
  totalTemplates: number;
  publicTemplates: number;
  privateTemplates: number;
  totalUsage: number;
}

const AdminTemplatesStats: React.FC<AdminTemplatesStatsProps> = ({
  totalTemplates,
  publicTemplates,
  privateTemplates,
  totalUsage
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">Total Modèles</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalTemplates}</p>
          </div>
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
            <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">Modèles Publics</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600">{publicTemplates}</p>
          </div>
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
            <Users className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">Modèles Privés</p>
            <p className="text-xl sm:text-2xl font-bold text-orange-600">{privateTemplates}</p>
          </div>
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
            <Target className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">Utilisations Totales</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-600">{totalUsage}</p>
          </div>
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
            <Target className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTemplatesStats;
