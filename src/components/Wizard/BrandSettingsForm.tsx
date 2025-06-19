import React from 'react';

export interface Segment {
  color: string;
  prize: string;
}

export interface BrandSettings {
  brandName: string;
  logo?: string;
  gameTitle: string;
  segmentCount: number;
  segments: Segment[];
  desktopBg?: string;
  mobileBg?: string;
  style: string;
  brandUrl: string;
}

interface Props {
  settings: BrandSettings;
  updateSettings: (data: Partial<BrandSettings>) => void;
}

const BrandSettingsForm: React.FC<Props> = ({ settings, updateSettings }) => {
  const handleSegmentCountChange = (count: number) => {
    const segments = [...settings.segments];
    if (count > segments.length) {
      for (let i = segments.length; i < count; i++) {
        segments.push({ color: '#841b60', prize: '' });
      }
    } else {
      segments.splice(count);
    }
    updateSettings({ segmentCount: count, segments });
  };

  const handleSegmentChange = (index: number, key: keyof Segment, value: string) => {
    const segments = settings.segments.map((seg, i) =>
      i === index ? { ...seg, [key]: value } : seg
    );
    updateSettings({ segments });
  };

  const handleFile = (key: 'logo' | 'desktopBg' | 'mobileBg', files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => updateSettings({ [key]: e.target?.result as string } as Partial<BrandSettings>);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Brand settings</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Brand name</label>
        <input
          type="text"
          value={settings.brandName}
          onChange={e => updateSettings({ brandName: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Logo</label>
        <input type="file" accept="image/*" onChange={e => handleFile('logo', e.target.files)} />
        {settings.logo && <img src={settings.logo} alt="logo" className="mt-2 h-16 object-contain" />}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Game title</label>
        <input
          type="text"
          value={settings.gameTitle}
          onChange={e => updateSettings({ gameTitle: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Number of segments: {settings.segmentCount}</label>
        <input
          type="range"
          min={1}
          max={12}
          value={settings.segmentCount}
          onChange={e => handleSegmentCountChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
      {settings.segments.map((seg, index) => (
        <div key={index} className="flex items-center space-x-3">
          <input
            type="color"
            value={seg.color}
            onChange={e => handleSegmentChange(index, 'color', e.target.value)}
            className="w-12 h-10 border rounded"
          />
          <input
            type="text"
            value={seg.prize}
            placeholder={`Prize ${index + 1}`}
            onChange={e => handleSegmentChange(index, 'prize', e.target.value)}
            className="border p-2 rounded flex-1"
          />
        </div>
      ))}
      <div>
        <label className="block text-sm font-medium mb-1">Desktop background</label>
        <input type="file" accept="image/*" onChange={e => handleFile('desktopBg', e.target.files)} />
        {settings.desktopBg && <img src={settings.desktopBg} alt="desktop background" className="mt-2 h-20 object-cover" />}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Mobile background</label>
        <input type="file" accept="image/*" onChange={e => handleFile('mobileBg', e.target.files)} />
        {settings.mobileBg && <img src={settings.mobileBg} alt="mobile background" className="mt-2 h-20 object-cover" />}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Style</label>
        <select
          value={settings.style}
          onChange={e => updateSettings({ style: e.target.value })}
          className="border p-2 rounded w-full"
        >
          <option value="Premium">Premium</option>
          <option value="Fun">Fun</option>
          <option value="Minimal">Minimal</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Brand URL (optional)</label>
        <input
          type="text"
          value={settings.brandUrl}
          onChange={e => updateSettings({ brandUrl: e.target.value })}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
};

export default BrandSettingsForm;
