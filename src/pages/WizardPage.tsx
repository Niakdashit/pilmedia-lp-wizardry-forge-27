import React, { useState } from 'react';
import BrandSettingsForm, { BrandSettings, Segment } from '../components/Wizard/BrandSettingsForm';
import WheelPreview from '../components/Wizard/WheelPreview';

const defaultSegments: Segment[] = Array.from({ length: 6 }).map(() => ({
  color: '#841b60',
  prize: ''
}));

const WizardPage: React.FC = () => {
  const [settings, setSettings] = useState<BrandSettings>({
    brandName: '',
    logo: undefined,
    gameTitle: '',
    segmentCount: 6,
    segments: defaultSegments,
    desktopBg: undefined,
    mobileBg: undefined,
    style: 'Premium',
    brandUrl: ''
  });

  const updateSettings = (data: Partial<BrandSettings>) => {
    setSettings(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-sm">
          <BrandSettingsForm settings={settings} updateSettings={updateSettings} />
        </div>
        <WheelPreview settings={settings} />
      </div>
    </div>
  );
};

export default WizardPage;
