
import React from 'react';
import { Plus, Trash2, GripVertical, FileText } from 'lucide-react';

interface FormContentEditorProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const FormContentEditor: React.FC<FormContentEditorProps> = ({ campaign, setCampaign }) => {
  const formFields = campaign.formFields || [];

  const handleFieldChange = (index: number, field: string, value: any) => {
    const newFields = [...formFields];
    newFields[index] = { ...newFields[index], [field]: value };
    
    setCampaign((prev: any) => ({
      ...prev,
      formFields: newFields
    }));
  };

  const addField = () => {
    const newField = {
      id: `field_${Date.now()}`,
      label: 'Nouveau champ',
      type: 'text',
      required: false,
      placeholder: ''
    };
    
    setCampaign((prev: any) => ({
      ...prev,
      formFields: [...formFields, newField]
    }));
  };

  const removeField = (index: number) => {
    const newFields = formFields.filter((_: any, i: number) => i !== index);
    
    setCampaign((prev: any) => ({
      ...prev,
      formFields: newFields
    }));
  };

  const fieldTypes = [
    { value: 'text', label: 'Texte' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Téléphone' },
    { value: 'number', label: 'Nombre' },
    { value: 'select', label: 'Sélection' },
    { value: 'textarea', label: 'Texte long' },
    { value: 'checkbox', label: 'Case à cocher' },
    { value: 'radio', label: 'Bouton radio' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Champs du formulaire</h3>
        <button
          onClick={addField}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un champ</span>
        </button>
      </div>

      <div className="space-y-4">
        {formFields.map((field: any, index: number) => (
          <div key={field.id} className="p-4 border border-gray-200 rounded-lg bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GripVertical className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  Champ {index + 1}
                </span>
              </div>
              <button
                onClick={() => removeField(index)}
                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Libellé
                </label>
                <input
                  type="text"
                  value={field.label}
                  onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={field.type}
                  onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {fieldTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Placeholder
                </label>
                <input
                  type="text"
                  value={field.placeholder || ''}
                  onChange={(e) => handleFieldChange(index, 'placeholder', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => handleFieldChange(index, 'required', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Champ obligatoire</span>
                </label>
              </div>
            </div>

            {(field.type === 'select' || field.type === 'radio') && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options (une par ligne)
                </label>
                <textarea
                  value={field.options?.join('\n') || ''}
                  onChange={(e) => handleFieldChange(index, 'options', e.target.value.split('\n').filter(Boolean))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Option 1&#10;Option 2&#10;Option 3"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {formFields.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Aucun champ configuré</p>
          <button
            onClick={addField}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Créer le premier champ
          </button>
        </div>
      )}
    </div>
  );
};

export default FormContentEditor;
