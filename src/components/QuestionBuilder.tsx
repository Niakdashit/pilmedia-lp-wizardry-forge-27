
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { FormField, Question } from '../types';

interface QuestionBuilderProps {
  onAddField: (field: Omit<FormField, 'id'>) => void;
  onAddQuestion: (question: Omit<Question, 'id'>) => void;
  onRemoveField: (index: number) => void;
  onRemoveQuestion: (index: number) => void;
  fields: FormField[];
  questions: Question[];
}

const QuestionBuilder: React.FC<QuestionBuilderProps> = ({
  onAddField,
  onAddQuestion,
  onRemoveField,
  onRemoveQuestion,
  fields,
  questions
}) => {
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [newFieldPlaceholder, setNewFieldPlaceholder] = useState('');
  const [newFieldOptions, setNewFieldOptions] = useState('');
  
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<'multiple_choice' | 'open_ended'>('multiple_choice');
  const [newQuestionOptions, setNewQuestionOptions] = useState('');
  
  const handleAddField = () => {
    if (newFieldLabel.trim()) {
      onAddField({
        name: newFieldLabel.toLowerCase().replace(/\s+/g, '_'),
        label: newFieldLabel,
        type: newFieldType,
        required: newFieldRequired,
        placeholder: newFieldPlaceholder || undefined,
        options: newFieldType === 'select' ? newFieldOptions.split(',').map(opt => opt.trim()) : undefined,
        campaign_id: ''
      });
      
      setNewFieldLabel('');
      setNewFieldType('text');
      setNewFieldRequired(false);
      setNewFieldPlaceholder('');
      setNewFieldOptions('');
    }
  };
  
  const handleAddQuestion = () => {
    if (newQuestionText.trim() && (newQuestionType !== 'multiple_choice' || newQuestionOptions.trim())) {
      const optionsArray = newQuestionType === 'multiple_choice'
        ? newQuestionOptions.split(',').map(opt => ({ text: opt.trim() }))
        : [];
      
      onAddQuestion({
        question: newQuestionText,
        type: newQuestionType,
        options: optionsArray,
        campaign_id: ''
      });
      
      setNewQuestionText('');
      setNewQuestionOptions('');
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Form Fields Builder */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Champs de formulaire</h3>
        
        {fields.map((field, index) => (
          <div key={field.id} className="mb-4 p-3 border rounded-md bg-white">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{field.label}</span>
              <button
                onClick={() => onRemoveField(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Type: {field.type} • {field.required ? 'Obligatoire' : 'Optionnel'}
              {field.placeholder && ` • Placeholder: ${field.placeholder}`}
              {field.options && field.options.length > 0 && (
                <div>Options: {field.options.join(', ')}</div>
              )}
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label du champ
              </label>
              <input
                type="text"
                value={newFieldLabel}
                onChange={(e) => setNewFieldLabel(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Nom du champ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de champ
              </label>
              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="text">Texte</option>
                <option value="email">Email</option>
                <option value="tel">Téléphone</option>
                <option value="number">Nombre</option>
                <option value="date">Date</option>
                <option value="select">Liste déroulante</option>
                <option value="checkbox">Case à cocher</option>
                <option value="radio">Boutons radio</option>
                <option value="textarea">Zone de texte</option>
              </select>
            </div>
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Placeholder (optionnel)
            </label>
            <input
              type="text"
              value={newFieldPlaceholder}
              onChange={(e) => setNewFieldPlaceholder(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Ex: Entrez votre nom..."
            />
          </div>
          
          {(newFieldType === 'select' || newFieldType === 'radio') && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Options (séparées par des virgules)
              </label>
              <input
                type="text"
                value={newFieldOptions}
                onChange={(e) => setNewFieldOptions(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Option 1, Option 2, Option 3"
              />
            </div>
          )}
          
          <div className="mb-3 flex items-center">
            <input
              type="checkbox"
              id="fieldRequired"
              checked={newFieldRequired}
              onChange={(e) => setNewFieldRequired(e.target.checked)}
              className="rounded text-[#841b60]"
            />
            <label htmlFor="fieldRequired" className="ml-2 text-sm text-gray-700">
              Champ obligatoire
            </label>
          </div>
          
          <button
            onClick={handleAddField}
            disabled={!newFieldLabel.trim()}
            className="w-full flex items-center justify-center p-2 bg-[#841b60] text-white rounded-md disabled:bg-gray-300"
          >
            <Plus size={18} className="mr-1" />
            Ajouter un champ
          </button>
        </div>
      </div>
      
      {/* Questions Builder */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Questions</h3>
        
        {questions.map((q, index) => (
          <div key={q.id} className="mb-4 p-3 border rounded-md bg-white">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{q.question}</span>
              <button
                onClick={() => onRemoveQuestion(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Type: {q.type === 'multiple_choice' ? 'Choix multiple' : 'Réponse libre'}
              {q.options && q.options.length > 0 && (
                <div>Options: {q.options.map(opt => opt.text).join(', ')}</div>
              )}
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Entrez votre question ici"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type de question
            </label>
            <select
              value={newQuestionType}
              onChange={(e) => setNewQuestionType(e.target.value as 'multiple_choice' | 'open_ended')}
              className="w-full p-2 border rounded-md"
            >
              <option value="multiple_choice">Choix multiple</option>
              <option value="open_ended">Réponse libre</option>
            </select>
          </div>
          
          {newQuestionType === 'multiple_choice' && (
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Options (séparées par des virgules)
              </label>
              <input
                type="text"
                value={newQuestionOptions}
                onChange={(e) => setNewQuestionOptions(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Option 1, Option 2, Option 3"
              />
            </div>
          )}
          
          <button
            onClick={handleAddQuestion}
            disabled={!newQuestionText.trim() || (newQuestionType === 'multiple_choice' && !newQuestionOptions.trim())}
            className="w-full flex items-center justify-center p-2 bg-[#841b60] text-white rounded-md disabled:bg-gray-300"
          >
            <Plus size={18} className="mr-1" />
            Ajouter une question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionBuilder;
