
import React from 'react';
import { useQuickCampaignStore } from '../../../stores/quickCampaignStore';

const WheelConfiguration: React.FC = () => {
  const { segmentCount, setSegmentCount, customColors } = useQuickCampaignStore();

  const segmentOptions = [
    { value: 2, label: '2 segments', description: 'Configuration simple' },
    { value: 4, label: '4 segments', description: 'Configuration équilibrée' },
    { value: 6, label: '6 segments', description: 'Configuration riche' },
    { value: 8, label: '8 segments', description: 'Configuration avancée' },
    { value: 12, label: '12 segments', description: 'Configuration complexe' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">⚙️</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Configuration de la roue</h3>
      </div>

      {/* Nombre de segments */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700">Nombre de segments</label>
        <div className="grid grid-cols-1 gap-3">
          {segmentOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSegmentCount(option.value)}
              className={`p-3 border-2 rounded-lg text-left transition-all duration-200 hover:shadow-md ${
                segmentCount === option.value
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  segmentCount === option.value
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300'
                }`}>
                  {segmentCount === option.value && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Aperçu des segments */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Aperçu des segments</h4>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: segmentCount }, (_, i) => (
            <div
              key={i}
              className="px-3 py-2 rounded text-white text-sm font-medium text-center"
              style={{
                backgroundColor: i % 2 === 0 ? customColors.primary : customColors.secondary
              }}
            >
              Segment {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          💡 Plus le nombre de segments est élevé, plus les chances de gain peuvent être réparties finement.
        </p>
      </div>
    </div>
  );
};

export default WheelConfiguration;
