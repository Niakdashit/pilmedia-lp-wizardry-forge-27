import React from 'react';
import { Module } from '../../../stores/newsletterStore';

interface ColumnsPropertiesProps {
  module: Module;
  onUpdate: (moduleId: string, updates: Partial<Module>) => void;
}

export const ColumnsProperties: React.FC<ColumnsPropertiesProps> = ({ module, onUpdate }) => {
  const handleColumnCountChange = (count: number) => {
    onUpdate(module.id, {
      ...module,
      columns: count
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de colonnes
        </label>
        <div className="flex gap-2">
          {[2, 3, 4].map((count) => (
            <button
              key={count}
              onClick={() => handleColumnCountChange(count)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                module.columns === count
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Espacement
        </label>
        <input
          type="range"
          min="0"
          max="8"
          value={module.spacing || 4}
          onChange={(e) => onUpdate(module.id, { ...module, spacing: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Alignement vertical
        </label>
        <select
          value={module.verticalAlignment || 'top'}
          onChange={(e) => onUpdate(module.id, { ...module, verticalAlignment: e.target.value })}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="top">Haut</option>
          <option value="center">Centre</option>
          <option value="bottom">Bas</option>
        </select>
      </div>
    </div>
  );
};