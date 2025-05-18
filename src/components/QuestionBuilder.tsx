import React, { useState } from 'react';
import { FormField, Question } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface QuestionBuilderProps {
  onAddQuestion: (question: Omit<Question, 'id'>) => void;
  onAddField: (field: Omit<FormField, 'id'>) => void;
  fields: FormField[];
  questions: Question[];
  onRemoveField: (id: string) => void;
  onRemoveQuestion: (id: string) => void;
}

const QuestionBuilder: React.FC<QuestionBuilderProps> = ({
  onAddQuestion,
  onAddField,
  fields,
  questions,
  onRemoveField,
  onRemoveQuestion
}) => {
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<'multiple-choice' | 'text' | 'checkbox'>('multiple-choice');
  const [newOptionText, setNewOptionText] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');
  const [fieldRequired, setFieldRequired] = useState(false);

  const handleAddOption = () => {
    if (newOptionText && !options.includes(newOptionText)) {
      setOptions([...options, newOptionText]);
      setNewOptionText('');
    }
  };

  const handleRemoveOption = (optionToRemove: string) => {
    setOptions(options.filter(option => option !== optionToRemove));
  };

  const handleAddFieldSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFieldLabel && newFieldType) {
      onAddField({
        label: newFieldLabel,
        type: newFieldType,
        required: fieldRequired
      });
      setNewFieldLabel('');
      setNewFieldType('text');
      setFieldRequired(false);
    }
  };

  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestionText) {
      const newQuestion: Omit<Question, 'id'> = {
        text: newQuestionText,
        type: newQuestionType,
        options: newQuestionType === 'multiple-choice' || newQuestionType === 'checkbox' ? options : []
      };
      onAddQuestion(newQuestion);
      setNewQuestionText('');
      setNewQuestionType('multiple-choice');
      setOptions([]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Ajouter une Question</h2>
      <form onSubmit={handleAddQuestionSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="questionText" className="block text-sm font-medium text-gray-700">
            Texte de la question
          </label>
          <input
            type="text"
            id="questionText"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={newQuestionText}
            onChange={(e) => setNewQuestionText(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="questionType" className="block text-sm font-medium text-gray-700">
            Type de question
          </label>
          <select
            id="questionType"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={newQuestionType}
            onChange={(e) => setNewQuestionType(e.target.value as 'multiple-choice' | 'text' | 'checkbox')}
          >
            <option value="multiple-choice">Choix multiple</option>
            <option value="text">Texte</option>
            <option value="checkbox">Case à cocher</option>
          </select>
        </div>

        {(newQuestionType === 'multiple-choice' || newQuestionType === 'checkbox') && (
          <div>
            <div className="mb-2">
              <label htmlFor="optionText" className="block text-sm font-medium text-gray-700">
                Options
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="optionText"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={newOptionText}
                  onChange={(e) => setNewOptionText(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="ml-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Ajouter
                </button>
              </div>
            </div>
            {options.length > 0 && (
              <div className="mb-4">
                <ul className="list-disc list-inside">
                  {options.map((option, index) => (
                    <li key={index} className="flex items-center justify-between py-1">
                      {option}
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(option)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Supprimer
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Ajouter la Question
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Ajouter un Champ de Formulaire</h2>
      <form onSubmit={handleAddFieldSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="fieldLabel" className="block text-sm font-medium text-gray-700">
            Label du champ
          </label>
          <input
            type="text"
            id="fieldLabel"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={newFieldLabel}
            onChange={(e) => setNewFieldLabel(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fieldType" className="block text-sm font-medium text-gray-700">
            Type de champ
          </label>
          <select
            id="fieldType"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value)}
          >
            <option value="text">Texte</option>
            <option value="email">Email</option>
            <option value="select">Select</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="fieldRequired" className="block text-sm font-medium text-gray-700">
            Champ requis ?
          </label>
          <input
            type="checkbox"
            id="fieldRequired"
            className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={fieldRequired}
            onChange={(e) => setFieldRequired(e.target.checked)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Ajouter le Champ
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-4">Questions Existantes</h2>
      {questions.length > 0 ? (
        <ul className="space-y-2">
          {questions.map(question => (
            <li key={question.id} className="bg-white shadow rounded-md p-3 flex items-center justify-between">
              <span>{question.text} ({question.type})</span>
              <button
                onClick={() => onRemoveQuestion(question.id)}
                className="text-red-600 hover:text-red-800"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune question existante.</p>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4">Champs de Formulaire Existants</h2>
      {fields.length > 0 ? (
        <ul className="space-y-2">
          {fields.map(field => (
            <li key={field.id} className="bg-white shadow rounded-md p-3 flex items-center justify-between">
              <span>{field.label} ({field.type})</span>
              <button
                onClick={() => onRemoveField(field.id)}
                className="text-red-600 hover:text-red-800"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun champ de formulaire existant.</p>
      )}
    </div>
  );
};

export default QuestionBuilder;
