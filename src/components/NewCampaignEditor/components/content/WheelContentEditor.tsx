
import React from 'react';
import { Plus, Trash2, Palette } from 'lucide-react';

interface WheelContentEditorProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const WheelContentEditor: React.FC<WheelContentEditorProps> = ({ campaign, setCampaign }) => {
  const segments = campaign.gameConfig?.wheel?.segments || [];

  const handleSegmentChange = (index: number, field: string, value: any) => {
    const newSegments = [...segments];
    newSegments[index] = { ...newSegments[index], [field]: value };
    
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        wheel: {
          ...prev.gameConfig?.wheel,
          segments: newSegments
        }
      }
    }));
  };

  const addSegment = () => {
    const newSegment = {
      id: Date.now().toString(),
      label: `Segment ${segments.length + 1}`,
      color: '#6366f1',
      probability: 10
    };
    
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        wheel: {
          ...prev.gameConfig?.wheel,
          segments: [...segments, newSegment]
        }
      }
    }));
  };

  const removeSegment = (index: number) => {
    const newSegments = segments.filter((_: any, i: number) => i !== index);
    
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        wheel: {
          ...prev.gameConfig?.wheel,
          segments: newSegments
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Segments de la roue</h3>
        <button
          onClick={addSegment}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un segment</span>
        </button>
      </div>

      <div className="space-y-4">
        {segments.map((segment: any, index: number) => (
          <div key={segment.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="grid grid-cols-4 gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texte
                </label>
                <input
                  type="text"
                  value={segment.label}
                  onChange={(e) => handleSegmentChange(index, 'label', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Couleur
                </label>
                <div className="flex space-x-2">
                  <input
                    type="color"
                    value={segment.color}
                    onChange={(e) => handleSegmentChange(index, 'color', e.target.value)}
                    className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={segment.color}
                    onChange={(e) => handleSegmentChange(index, 'color', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Probabilité (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={segment.probability}
                  onChange={(e) => handleSegmentChange(index, 'probability', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={() => removeSegment(index)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {segments.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <Palette className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Aucun segment configuré</p>
          <button
            onClick={addSegment}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Créer le premier segment
          </button>
        </div>
      )}
    </div>
  );
};

export default WheelContentEditor;
