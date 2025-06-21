
import React from 'react';
import { Crown, Zap, Shield, Headphones } from 'lucide-react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

const ProExtensions: React.FC = () => {
  const { extensions, toggleExtension } = useQuickCampaignStore();

  const availableExtensions = [
    {
      id: 'advanced-analytics',
      icon: Zap,
      title: 'Analytics Avancées',
      description: 'Tableaux de bord personnalisés et rapports détaillés',
      price: '29€/mois'
    },
    {
      id: 'white-label',
      icon: Shield,
      title: 'White Label',
      description: 'Supprimez toutes les références à notre marque',
      price: '49€/mois'
    },
    {
      id: 'priority-support',
      icon: Headphones,
      title: 'Support Prioritaire',
      description: 'Support technique 24/7 avec temps de réponse garanti',
      price: '19€/mois'
    }
  ];

  const isExtensionEnabled = (extensionId: string) => {
    return extensions.some(ext => ext.id === extensionId && ext.enabled);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Crown className="w-6 h-6 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-900">Extensions Pro</h3>
      </div>

      <div className="space-y-4">
        {availableExtensions.map((extension) => {
          const Icon = extension.icon;
          const enabled = isExtensionEnabled(extension.id);
          
          return (
            <div key={extension.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{extension.title}</div>
                    <div className="text-sm text-gray-600">{extension.description}</div>
                    <div className="text-sm font-medium text-orange-600 mt-1">{extension.price}</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleExtension(extension.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    enabled
                      ? 'bg-orange-600 text-white hover:bg-orange-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {enabled ? 'Activé' : 'Activer'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
        <div className="flex items-center space-x-2 mb-2">
          <Crown className="w-5 h-5 text-orange-600" />
          <span className="font-medium text-orange-800">Extensions Pro</span>
        </div>
        <p className="text-sm text-orange-700">
          Les extensions Pro offrent des fonctionnalités avancées pour les utilisateurs professionnels.
          Facturation mensuelle avec possibilité d'annulation à tout moment.
        </p>
      </div>
    </div>
  );
};

export default ProExtensions;
