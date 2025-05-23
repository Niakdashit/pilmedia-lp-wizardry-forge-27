import React from 'react';
import { ModuleData } from '@/stores/newsletterStore';

interface HTMLPropertiesProps {
  module: ModuleData;
  onUpdate: (id: string, updates: Partial<ModuleData>) => void;
}

export const HTMLProperties: React.FC<HTMLPropertiesProps> = ({ module, onUpdate }) => {
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate(module.id, {
      content: e.target.value
    });
  };

  const handlePreviewToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(module.id, {
      settings: {
        ...module.settings,
        previewEnabled: e.target.checked
      }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Code HTML
        </label>
        <textarea
          value={module.content || ''}
          onChange={handleContentChange}
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#841b60]"
          placeholder="<div>Mon bloc HTML</div>"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="preview-enabled"
          checked={module.settings?.previewEnabled ?? true}
          onChange={handlePreviewToggle}
          className="h-4 w-4 text-[#841b60] focus:ring-[#841b60] border-gray-300 rounded"
        />
        <label htmlFor="preview-enabled" className="ml-2 block text-sm text-gray-700">
          Afficher l'aperçu en temps réel
        </label>
      </div>
    </div>
  );
};