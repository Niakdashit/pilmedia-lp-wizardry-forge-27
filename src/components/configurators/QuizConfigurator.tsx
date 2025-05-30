
import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  hint?: {
    type: 'image' | 'link';
    value: string;
    text?: string;
  };
}

interface QuizConfiguratorProps {
  config: {
    questions?: QuizQuestion[];
  };
  onConfigChange: (config: any) => void;
}

const QuizConfigurator: React.FC<QuizConfiguratorProps> = ({ config, onConfigChange }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(
    config.questions || [
      {
        id: '1',
        question: '',
        options: ['', ''],
      }
    ]
  );

  const updateQuestions = (newQuestions: QuizQuestion[]) => {
    setQuestions(newQuestions);
    onConfigChange({
      ...config,
      questions: newQuestions,
      showTimer: false,
      showScore: false,
    });
  };

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      question: '',
      options: ['', ''],
    };
    updateQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId: string) => {
    updateQuestions(questions.filter(q => q.id !== questionId));
  };

  const updateQuestion = (questionId: string, field: string, value: any) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        return { ...q, [field]: value };
      }
      return q;
    });
    updateQuestions(updatedQuestions);
  };

  const addOption = (questionId: string) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        return { ...q, options: [...q.options, ''] };
      }
      return q;
    });
    updateQuestions(updatedQuestions);
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        return { ...q, options: q.options.filter((_, i) => i !== optionIndex) };
      }
      return q;
    });
    updateQuestions(updatedQuestions);
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    });
    updateQuestions(updatedQuestions);
  };

  const updateHint = (questionId: string, hint: QuizQuestion['hint']) => {
    updateQuestion(questionId, 'hint', hint);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Questions du Quiz</h3>
        <button
          onClick={addQuestion}
          className="flex items-center space-x-2 px-4 py-2 bg-[#841b60] text-white rounded-lg hover:bg-[#6d164f] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une question</span>
        </button>
      </div>

      {questions.map((question, questionIndex) => (
        <div key={question.id} className="border border-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-800">Question {questionIndex + 1}</h4>
            {questions.length > 1 && (
              <button
                onClick={() => removeQuestion(question.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <textarea
              value={question.question}
              onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
              rows={2}
              placeholder="Entrez votre question..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Options de réponse
              </label>
              <button
                onClick={() => addOption(question.id)}
                className="text-sm text-[#841b60] hover:text-[#6d164f] font-medium"
              >
                + Ajouter une option
              </button>
            </div>
            
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                  placeholder={`Option ${optionIndex + 1}`}
                />
                {question.options.length > 2 && (
                  <button
                    onClick={() => removeOption(question.id, optionIndex)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Indice (optionnel)
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`hint-type-${question.id}`}
                    checked={!question.hint}
                    onChange={() => updateHint(question.id, undefined)}
                    className="text-[#841b60]"
                  />
                  <span className="text-sm">Aucun indice</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`hint-type-${question.id}`}
                    checked={question.hint?.type === 'image'}
                    onChange={() => updateHint(question.id, { type: 'image', value: '' })}
                    className="text-[#841b60]"
                  />
                  <span className="text-sm">Image</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={`hint-type-${question.id}`}
                    checked={question.hint?.type === 'link'}
                    onChange={() => updateHint(question.id, { type: 'link', value: '', text: '' })}
                    className="text-[#841b60]"
                  />
                  <span className="text-sm">Lien</span>
                </label>
              </div>

              {question.hint?.type === 'image' && (
                <div>
                  <input
                    type="url"
                    value={question.hint.value}
                    onChange={(e) => updateHint(question.id, { type: 'image', value: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                    placeholder="URL de l'image..."
                  />
                </div>
              )}

              {question.hint?.type === 'link' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={question.hint.text || ''}
                    onChange={(e) => updateHint(question.id, { type: 'link', value: question.hint?.value || '', text: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                    placeholder="Texte du lien..."
                  />
                  <input
                    type="url"
                    value={question.hint.value}
                    onChange={(e) => updateHint(question.id, { type: 'link', value: e.target.value, text: question.hint?.text })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#841b60] focus:border-transparent"
                    placeholder="URL du lien..."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizConfigurator;
