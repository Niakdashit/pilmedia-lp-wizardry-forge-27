
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { FormField, Question } from '../types';

interface QuestionBuilderProps {
  onAddField: (field: Omit<FormField, 'id'>) => void;
  onAddQuestion: (question: Omit<Question, 'id'>) => void;
  fields: FormField[];
  questions: Question[];
  onRemoveField: (id: string) => void;
  onRemoveQuestion: (id: string) => void;
}

const QuestionBuilder: React.FC<QuestionBuilderProps> = ({
  onAddField,
  onAddQuestion,
  fields,
  questions,
  onRemoveField,
  onRemoveQuestion
}) => {
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionOptions, setNewQuestionOptions] = useState('');
  const [newQuestionCorrectAnswer, setNewQuestionCorrectAnswer] = useState('');

  const handleAddFieldSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFieldLabel.trim() !== '') {
      onAddField({
        label: newFieldLabel,
        type: newFieldType,
        required: true
      });
      setNewFieldLabel('');
      setNewFieldType('text');
    }
  };

  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestionText.trim() !== '' && newQuestionOptions.trim() !== '') {
      const options = newQuestionOptions.split(',').map(option => option.trim());
      onAddQuestion({
        text: newQuestionText,
        type: 'multiple-choice',
        options: options,
        correctAnswer: newQuestionCorrectAnswer
      });
      setNewQuestionText('');
      setNewQuestionOptions('');
      setNewQuestionCorrectAnswer('');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ajouter un champ au formulaire</h3>
        <form onSubmit={handleAddFieldSubmit} className="flex space-x-2">
          <input
            type="text"
            placeholder="Label du champ"
            value={newFieldLabel}
            onChange={(e) => setNewFieldLabel(e.target.value)}
            className="px-3 py-2 border rounded-md w-1/2"
          />
          <select
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="text">Texte</option>
            <option value="email">Email</option>
            <option value="select">Select</option>
            <option value="textarea">Textarea</option>
          </select>
          <button
            type="submit"
            className="bg-[#841b60] text-white px-4 py-2 rounded-md hover:bg-[#6d1750] transition-colors"
          >
            <Plus className="inline-block mr-1" size={16} />
            Ajouter
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ajouter une question au quiz</h3>
        <form onSubmit={handleAddQuestionSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="Texte de la question"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Options (séparées par des virgules)"
            value={newQuestionOptions}
            onChange={(e) => setNewQuestionOptions(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
           <input
            type="text"
            placeholder="Réponse Correcte"
            value={newQuestionCorrectAnswer}
            onChange={(e) => setNewQuestionCorrectAnswer(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-[#841b60] text-white px-4 py-2 rounded-md hover:bg-[#6d1750] transition-colors"
          >
            <Plus className="inline-block mr-1" size={16} />
            Ajouter
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Champs du formulaire</h3>
        {fields.length === 0 ? (
          <p className="text-gray-500">Aucun champ ajouté.</p>
        ) : (
          <ul className="space-y-2">
            {fields.map(field => (
              <li key={field.id} className="flex items-center justify-between px-4 py-2 border rounded-md">
                <span>{field.label} ({field.type})</span>
                <button
                  onClick={() => onRemoveField(field.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Questions du quiz</h3>
        {questions.length === 0 ? (
          <p className="text-gray-500">Aucune question ajoutée.</p>
        ) : (
          <ul className="space-y-2">
            {questions.map(question => (
              <li key={question.id} className="flex items-center justify-between px-4 py-2 border rounded-md">
                <span>{question.text}</span>
                <button
                  onClick={() => onRemoveQuestion(question.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuestionBuilder;
