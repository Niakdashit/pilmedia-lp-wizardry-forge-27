
import React from 'react';
import { Layout, Move, Maximize2 } from 'lucide-react';

interface LayoutSectionProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const LayoutSection: React.FC<LayoutSectionProps> = ({ campaign, setCampaign }) => {
  const updateLayout = (key: string, value: string) => {
    setCampaign((prev: any) => ({
      ...prev,
      layout: { ...prev.layout, [key]: value }
    }));
  };

  const positions = [
    { id: 'top', label: 'Haut', description: 'En haut de l\'écran' },
    { id: 'center', label: 'Centre', description: 'Au centre de l\'écran' },
    { id: 'bottom', label: 'Bas', description: 'En bas de l\'écran' },
    { id: 'left', label: 'Gauche', description: 'À gauche de l\'écran' },
    { id: 'right', label: 'Droite', description: 'À droite de l\'écran' }
  ];

  const spacings = [
    { id: 'compact', label: 'Compact', description: 'Espacement réduit' },
    { id: 'normal', label: 'Normal', description: 'Espacement standard' },
    { id: 'relaxed', label: 'Relaxé', description: 'Espacement large' }
  ];

  return (
    <div className="space-y-8">
      {/* Position des blocs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Position des éléments</h2>
            <p className="text-gray-600">Contrôlez la disposition de vos éléments</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Position des blocs de contenu</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {positions.map((position) => (
                <button
                  key={position.id}
                  onClick={() => updateLayout('blockPosition', position.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    campaign.layout?.blockPosition === position.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{position.label}</div>
                  <div className="text-sm text-gray-500 mt-1">{position.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Position du jeu</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {positions.map((position) => (
                <button
                  key={position.id}
                  onClick={() => updateLayout('gamePosition', position.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-center ${
                    campaign.layout?.gamePosition === position.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{position.label}</div>
                  <div className="text-sm text-gray-500 mt-1">{position.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Espacement */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Maximize2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Espacement</h3>
            <p className="text-gray-600">Ajustez l'espacement entre les éléments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {spacings.map((spacing) => (
            <button
              key={spacing.id}
              onClick={() => updateLayout('spacing', spacing.id)}
              className={`p-4 rounded-lg border-2 transition-all text-center ${
                campaign.layout?.spacing === spacing.id
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="font-medium">{spacing.label}</div>
              <div className="text-sm text-gray-500 mt-1">{spacing.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Aperçu de la mise en page */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Move className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Aperçu de la mise en page</h3>
            <p className="text-gray-600">Visualisez la disposition de vos éléments</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 w-full max-w-md h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Layout className="w-12 h-12 mx-auto mb-4" />
              <p>Aperçu de la mise en page</p>
              <p className="text-sm">Position: {campaign.layout?.blockPosition || 'center'}</p>
              <p className="text-sm">Espacement: {campaign.layout?.spacing || 'normal'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutSection;
