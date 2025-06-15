
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, BarChart2, Users, AlertCircle } from 'lucide-react';

const AdminQuickAccess: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Accès Rapide</h3>
      <div className="space-y-3">
        <Link
          to="/admin/campaigns/new"
          className="flex items-center p-3 rounded-lg bg-[#841b60] text-white hover:bg-[#6d164f] transition-colors"
        >
          <Plus className="w-5 h-5 mr-3" />
          <span className="font-medium">Nouvelle Campagne</span>
        </Link>
        <Link
          to="/admin/analytics"
          className="flex items-center p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <BarChart2 className="w-5 h-5 mr-3" />
          <span className="font-medium">Voir Statistiques</span>
        </Link>
        <Link
          to="/admin/clients"
          className="flex items-center p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <Users className="w-5 h-5 mr-3" />
          <span className="font-medium">Gérer Clients</span>
        </Link>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Alertes Système</h4>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-orange-600">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>3 campagnes inactives depuis 30j</span>
          </div>
          <div className="flex items-center text-sm text-red-600">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>1 client inactif</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuickAccess;
