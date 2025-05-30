
import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, X, Clock, HelpCircle } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  timeLimit?: number;
}

interface QuizConfigurationProps {
  campaign: any;
  setCampaign: (campaign: any) => void;
}

const QuizConfiguration: React.FC<QuizConfigurationProps> = ({ campaign, setCampaign }) => {
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState<QuizQuestion>({
    id: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    timeLimit: 30
  });

  const questions = campaign.gameConfig?.quiz?.questions || [];

  const addQuestion = () => {
    const question = {
      ...newQuestion,
      id: Date.now().toString()
    };
    
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        quiz: {
          ...prev.gameConfig?.quiz,
          questions: [...questions, question]
        }
      }
    }));

    setNewQuestion({
      id: '',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      timeLimit: 30
    });
  };

  const updateQuestion = (index: number, updatedQuestion: QuizQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        quiz: {
          ...prev.gameConfig?.quiz,
          questions: updatedQuestions
        }
      }
    }));
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_: any, i: number) => i !== index);
    
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        quiz: {
          ...prev.gameConfig?.quiz,
          questions: updatedQuestions
        }
      }
    }));
  };

  const QuestionEditor = ({ question, onSave, onCancel }: {
    question: QuizQuestion;
    onSave: (question: QuizQuestion) => void;
    onCancel: () => void;
  }) => {
    const [editedQuestion, setEditedQuestion] = useState(question);

    return (
      <div className="bg-white border-2 border-purple-200 rounded-lg p-4 sm:p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Question</label>
          <textarea
            value={editedQuestion.question}
            onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Tapez votre question ici..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Options de réponse</label>
          <div className="space-y-2">
            {editedQuestion.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={editedQuestion.correctAnswer === optionIndex}
                  onChange={() => setEditedQuestion({ ...editedQuestion, correctAnswer: optionIndex })}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...editedQuestion.options];
                    newOptions[optionIndex] = e.target.value;
                    setEditedQuestion({ ...editedQuestion, options: newOptions });
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={`Option ${optionIndex + 1}`}
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">Cochez la radio pour sélectionner la bonne réponse</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Temps limite (secondes)
            </label>
            <input
              type="number"
              value={editedQuestion.timeLimit || 30}
              onChange={(e) => setEditedQuestion({ ...editedQuestion, timeLimit: parseInt(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="5"
              max="300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 flex items-center">
            <HelpCircle className="w-4 h-4 mr-1" />
            Explication (optionnel)
          </label>
          <textarea
            value={editedQuestion.explanation || ''}
            onChange={(e) => setEditedQuestion({ ...editedQuestion, explanation: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            rows={2}
            placeholder="Explication de la réponse..."
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={() => onSave(editedQuestion)}
            className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors flex items-center justify-center"
          >
            <X className="w-4 h-4 mr-2" />
            Annuler
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h3 className="text-lg font-semibold text-gray-800">Configuration des Questions</h3>
        <span className="text-sm text-gray-500">{questions.length} question(s)</span>
      </div>

      {/* Liste des questions existantes */}
      <div className="space-y-4">
        {questions.map((question: QuizQuestion, index: number) => (
          <div key={question.id || index}>
            {editingQuestion === question.id ? (
              <QuestionEditor
                question={question}
                onSave={(updatedQuestion) => {
                  updateQuestion(index, updatedQuestion);
                  setEditingQuestion(null);
                }}
                onCancel={() => setEditingQuestion(null)}
              />
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-sm sm:text-base truncate pr-2">
                      {question.question || `Question ${index + 1}`}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {question.options.filter(opt => opt.trim()).length} options • 
                      Réponse: {question.options[question.correctAnswer] || 'Non définie'} • 
                      {question.timeLimit || 30}s
                    </p>
                  </div>
                  <div className="flex space-x-2 flex-shrink-0">
                    <button
                      onClick={() => setEditingQuestion(question.id)}
                      className="bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-200 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteQuestion(index)}
                      className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Formulaire d'ajout de nouvelle question */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6">
        <h4 className="font-medium mb-4 text-center text-gray-600">Ajouter une nouvelle question</h4>
        <QuestionEditor
          question={newQuestion}
          onSave={addQuestion}
          onCancel={() => setNewQuestion({
            id: '',
            question: '',
            options: ['', '', '', ''],
            correctAnswer: 0,
            explanation: '',
            timeLimit: 30
          })}
        />
      </div>

      {/* Configuration globale du quiz */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium mb-3 text-blue-800">Paramètres globaux</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={campaign.gameConfig?.quiz?.showTimer !== false}
              onChange={(e) => setCampaign((prev: any) => ({
                ...prev,
                gameConfig: {
                  ...prev.gameConfig,
                  quiz: {
                    ...prev.gameConfig?.quiz,
                    showTimer: e.target.checked
                  }
                }
              }))}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Afficher le timer</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={campaign.gameConfig?.quiz?.showScore !== false}
              onChange={(e) => setCampaign((prev: any) => ({
                ...prev,
                gameConfig: {
                  ...prev.gameConfig,
                  quiz: {
                    ...prev.gameConfig?.quiz,
                    showScore: e.target.checked
                  }
                }
              }))}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Afficher le score</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default QuizConfiguration;
