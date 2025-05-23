import React, { useState } from 'react';
import { Clock, Calendar, Users, PlayCircle, PlusCircle, Settings, Edit, Trash2 } from 'lucide-react';

interface Automation {
  id: string;
  name: string;
  type: 'welcome' | 'birthday' | 'abandoned' | 'custom';
  trigger: string;
  audience: string;
  status: 'active' | 'inactive' | 'draft';
  lastRun?: string;
}

const AutomateTab: React.FC = () => {
  const [automations] = useState<Automation[]>([
    {
      id: '1',
      name: 'Email de bienvenue',
      type: 'welcome',
      trigger: 'Inscription à la newsletter',
      audience: 'Nouveaux inscrits',
      status: 'active',
      lastRun: '2025-04-05 09:32'
    },
    {
      id: '2',
      name: 'Rappel d\'anniversaire',
      type: 'birthday',
      trigger: 'Date d\'anniversaire',
      audience: 'Tous les contacts avec une date d\'anniversaire',
      status: 'active',
      lastRun: '2025-04-12 14:15'
    },
    {
      id: '3',
      name: 'Récupération de panier',
      type: 'abandoned',
      trigger: 'Panier abandonné (24h)',
      audience: 'Clients avec panier abandonné',
      status: 'inactive'
    },
    {
      id: '4',
      name: 'Séquence de formation',
      type: 'custom',
      trigger: 'Email précédent ouvert',
      audience: 'Segment "Intéressés par les formations"',
      status: 'draft'
    }
  ]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'welcome':
        return <PlayCircle className="w-5 h-5 text-green-500" />;
      case 'birthday':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'abandoned':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'custom':
      default:
        return <Settings className="w-5 h-5 text-purple-500" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Actif
          </span>
        );
      case 'inactive':
        return (
          <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            Inactif
          </span>
        );
      case 'draft':
        return (
          <span className="px-2.5 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Brouillon
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Automatisations d'email</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Nouvelle automatisation
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-green-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-green-100 rounded-full">
                <PlayCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-green-800">Actives</h3>
            <p className="text-green-600 text-sm">Automatisations en cours</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-gray-100 rounded-full">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-2xl font-bold text-gray-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Inactives</h3>
            <p className="text-gray-600 text-sm">En pause</p>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Edit className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-yellow-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-yellow-800">Brouillons</h3>
            <p className="text-yellow-600 text-sm">En cours de création</p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">1.5k</span>
            </div>
            <h3 className="text-lg font-semibold text-blue-800">Contacts</h3>
            <p className="text-blue-600 text-sm">Dans les automatisations</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-700">Toutes les automatisations</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Automatisation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Déclencheur
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Audience
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière exécution
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {automations.map((automation) => (
                <tr key={automation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(automation.type)}
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{automation.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{automation.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{automation.trigger}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{automation.audience}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(automation.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{automation.lastRun || 'Jamais exécuté'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-[#841b60] hover:text-[#6d164f]">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal de création (simplifié pour l'exemple) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Nouvelle automatisation</h3>
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="mt-4 grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'automatisation</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Ex: Email de bienvenue"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type d'automatisation</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="welcome">Email de bienvenue</option>
                  <option value="birthday">Anniversaire</option>
                  <option value="abandoned">Panier abandonné</option>
                  <option value="custom">Personnalisée</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                Annuler
              </button>
              <button className="px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f]">
                Créer et configurer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomateTab;
