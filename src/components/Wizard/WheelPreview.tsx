import React from 'react';
import { BrandSettings } from './BrandSettingsForm';

interface Props {
  settings: BrandSettings;
}

const WheelPreview: React.FC<Props> = ({ settings }) => {
  return (
    <div className="border rounded-xl p-6 bg-white/70 backdrop-blur-sm shadow-sm h-full flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">Wheel of Fortune Preview</h2>
      <div className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-full">
        {/* Placeholder for wheel rendering */}
        <span className="text-gray-500 text-sm">{settings.gameTitle || 'Preview'}</span>
      </div>
    </div>
  );
};

export default WheelPreview;
