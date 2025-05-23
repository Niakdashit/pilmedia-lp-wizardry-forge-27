
import React from 'react';
import { NewsletterModule } from '../../../../types/newsletter';

interface SettingsTabProps {
  selectedModule?: NewsletterModule;
  onUpdateModule?: (moduleId: string, data: Partial<NewsletterModule>) => void;
  onDeleteModule?: (moduleId: string) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ 
  selectedModule, 
  onUpdateModule
}) => {
  if (!selectedModule || !onUpdateModule) {
    return (
      <div className="p-4 text-gray-500">
        Select a module to edit its settings.
      </div>
    );
  }
  
  const handlePaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateModule(selectedModule.id, { settings: { ...selectedModule.settings, padding: e.target.value } });
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateModule(selectedModule.id, { settings: { ...selectedModule.settings, backgroundColor: e.target.value } });
  };

  const handleTextAlignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateModule(selectedModule.id, { settings: { ...selectedModule.settings, textAlign: e.target.value } });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateModule(selectedModule.id, { settings: { ...selectedModule.settings, color: e.target.value } });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateModule(selectedModule.id, { settings: { ...selectedModule.settings, fontSize: e.target.value } });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Padding</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={selectedModule.settings.padding || ''}
          onChange={handlePaddingChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Background Color</label>
        <input
          type="color"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={selectedModule.settings.backgroundColor || '#ffffff'}
          onChange={handleBackgroundColorChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Text Align</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={selectedModule.settings.textAlign || 'left'}
          onChange={handleTextAlignChange}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Color</label>
        <input
          type="color"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={selectedModule.settings.color || '#000000'}
          onChange={handleColorChange}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Font Size</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={selectedModule.settings.fontSize || '16px'}
          onChange={handleFontSizeChange}
        >
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsTab;
