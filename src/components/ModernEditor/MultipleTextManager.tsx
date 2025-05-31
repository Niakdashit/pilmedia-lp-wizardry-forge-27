
import React from 'react';
import { Plus, Trash2, Type } from 'lucide-react';

interface TextField {
  id: string;
  text: string;
  position: 'top' | 'center' | 'bottom' | 'left' | 'right';
  size: 'small' | 'medium' | 'large';
  color: string;
  showFrame: boolean;
  frameColor: string;
  frameBorderColor: string;
}

interface MultipleTextManagerProps {
  zone: 'header' | 'center' | 'footer';
  textFields: TextField[];
  onTextFieldsChange: (fields: TextField[]) => void;
}

const MultipleTextManager: React.FC<MultipleTextManagerProps> = ({
  zone,
  textFields,
  onTextFieldsChange
}) => {
  const addTextField = () => {
    const newField: TextField = {
      id: `${zone}_${Date.now()}`,
      text: 'Nouveau texte',
      position: 'center',
      size: 'medium',
      color: '#000000',
      showFrame: false,
      frameColor: '#ffffff',
      frameBorderColor: '#e5e7eb'
    };
    onTextFieldsChange([...textFields, newField]);
  };

  const updateTextField = (id: string, updates: Partial<TextField>) => {
    const updatedFields = textFields.map(field =>
      field.id === id ? { ...field, ...updates } : field
    );
    onTextFieldsChange(updatedFields);
  };

  const removeTextField = (id: string) => {
    const updatedFields = textFields.filter(field => field.id !== id);
    onTextFieldsChange(updatedFields);
  };

  const zoneLabels = {
    header: 'En-tête',
    center: 'Centre',
    footer: 'Pied de page'
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700">
          Textes {zoneLabels[zone]}
        </h3>
        <button
          onClick={addTextField}
          className="flex items-center space-x-1 px-3 py-1 text-sm bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter</span>
        </button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {textFields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Type className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Texte {index + 1}
                </span>
              </div>
              <button
                onClick={() => removeTextField(field.id)}
                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Text content */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Contenu du texte</label>
              <textarea
                value={field.text}
                onChange={(e) => updateTextField(field.id, { text: e.target.value })}
                placeholder="Entrez votre texte personnalisé"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                rows={2}
              />
            </div>

            {/* Position */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Position</label>
                <div className="grid grid-cols-3 gap-1">
                  {['top', 'center', 'bottom'].map((pos) => (
                    <button
                      key={pos}
                      onClick={() => updateTextField(field.id, { position: pos as any })}
                      className={`px-2 py-1 text-xs rounded ${
                        field.position === pos
                          ? 'bg-[#841b60] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {pos === 'top' ? 'Haut' : pos === 'center' ? 'Centre' : 'Bas'}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {['left', 'right'].map((pos) => (
                    <button
                      key={pos}
                      onClick={() => updateTextField(field.id, { position: pos as any })}
                      className={`px-2 py-1 text-xs rounded ${
                        field.position === pos
                          ? 'bg-[#841b60] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {pos === 'left' ? 'Gauche' : 'Droite'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600">Taille du texte</label>
                <div className="grid grid-cols-3 gap-1">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => updateTextField(field.id, { size: size as any })}
                      className={`px-2 py-1 text-xs rounded ${
                        field.size === size
                          ? 'bg-[#841b60] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {size === 'small' ? 'Petit' : size === 'medium' ? 'Moyen' : 'Grand'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Color */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Couleur du texte</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={field.color}
                  onChange={(e) => updateTextField(field.id, { color: e.target.value })}
                  className="w-10 h-10 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={field.color}
                  onChange={(e) => updateTextField(field.id, { color: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#841b60]"
                />
              </div>
            </div>

            {/* Frame options */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={field.showFrame}
                  onChange={(e) => updateTextField(field.id, { showFrame: e.target.checked })}
                  className="rounded border-gray-300 text-[#841b60] focus:ring-[#841b60]"
                />
                <span className="text-sm text-gray-600">Afficher un cadre de contraste</span>
              </label>

              {field.showFrame && (
                <div className="grid grid-cols-2 gap-3 pl-6">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500">Couleur du fond</label>
                    <input
                      type="color"
                      value={field.frameColor}
                      onChange={(e) => updateTextField(field.id, { frameColor: e.target.value })}
                      className="w-full h-8 rounded border border-gray-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500">Couleur de la bordure</label>
                    <input
                      type="color"
                      value={field.frameBorderColor}
                      onChange={(e) => updateTextField(field.id, { frameBorderColor: e.target.value })}
                      className="w-full h-8 rounded border border-gray-300"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {textFields.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Type className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">Aucun texte configuré pour {zoneLabels[zone].toLowerCase()}</p>
            <p className="text-xs">Cliquez sur "Ajouter" pour créer votre premier texte</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipleTextManager;
