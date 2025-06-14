
import React from 'react';
import { RotateCcw, Gift, Plus, Trash2 } from 'lucide-react';

interface WheelConfigurationProps {
  gameType: string;
  config: any;
  onChange: (data: any) => void;
}

const WheelConfiguration: React.FC<WheelConfigurationProps> = ({
  gameType,
  config,
  onChange
}) => {
  const segments = config.segments || [
    { label: 'Prize 1', probability: 10 },
    { label: 'Prize 2', probability: 15 },
    { label: 'Try Again', probability: 25 },
    { label: 'Discount 10%', probability: 20 },
    { label: 'Free Gift', probability: 15 },
    { label: 'No Prize', probability: 15 }
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy', description: 'Higher win probability' },
    { value: 'medium', label: 'Medium', description: 'Balanced experience' },
    { value: 'hard', label: 'Hard', description: 'Lower win probability' }
  ];

  const themes = [
    { value: 'classic', label: 'Classic', color: '#3B82F6' },
    { value: 'luxury', label: 'Luxury', color: '#F59E0B' },
    { value: 'modern', label: 'Modern', color: '#8B5CF6' },
    { value: 'festive', label: 'Festive', color: '#EF4444' }
  ];

  const updateSegment = (index: number, field: string, value: any) => {
    const newSegments = [...segments];
    newSegments[index] = { ...newSegments[index], [field]: value };
    onChange({ ...config, segments: newSegments });
  };

  const addSegment = () => {
    const newSegments = [...segments, { label: `Prize ${segments.length + 1}`, probability: 10 }];
    onChange({ ...config, segments: newSegments });
  };

  const removeSegment = (index: number) => {
    if (segments.length > 2) {
      const newSegments = segments.filter((_: any, i: number) => i !== index);
      onChange({ ...config, segments: newSegments });
    }
  };

  const handleConfigChange = (field: string, value: any) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <RotateCcw className="w-6 h-6 mr-2" />
          Wheel Configuration
        </h2>
        <p className="text-gray-600">Customize your spin wheel game settings</p>
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-700">
          Wheel Theme
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => handleConfigChange('theme', theme.value)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                config.theme === theme.value
                  ? 'border-gray-900 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className="w-full h-8 rounded-lg mb-2"
                style={{ backgroundColor: theme.color }}
              ></div>
              <p className="font-medium text-gray-900">{theme.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="space-y-4">
        <label className="block text-lg font-semibold text-gray-700">
          Difficulty Level
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty.value}
              onClick={() => handleConfigChange('difficulty', difficulty.value)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                config.difficulty === difficulty.value
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h3 className="font-semibold text-gray-900 mb-1">{difficulty.label}</h3>
              <p className="text-sm text-gray-600">{difficulty.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Wheel Segments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-lg font-semibold text-gray-700 flex items-center">
            <Gift className="w-5 h-5 mr-2" />
            Wheel Segments
          </label>
          <button
            onClick={addSegment}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Segment</span>
          </button>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {segments.map((segment: any, index: number) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex-1">
                <input
                  type="text"
                  value={segment.label}
                  onChange={(e) => updateSegment(index, 'label', e.target.value)}
                  placeholder={`Segment ${index + 1}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-24">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={segment.probability}
                  onChange={(e) => updateSegment(index, 'probability', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                />
                <span className="text-xs text-gray-500 block text-center mt-1">%</span>
              </div>
              {segments.length > 2 && (
                <button
                  onClick={() => removeSegment(index)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="text-sm text-gray-500">
          Total probability: {segments.reduce((sum: number, seg: any) => sum + (seg.probability || 0), 0)}%
        </div>
      </div>
    </div>
  );
};

export default WheelConfiguration;
