
import React from 'react';
import { Plus, Trash2, HelpCircle } from 'lucide-react';

interface QuizContentEditorProps {
  campaign: any;
  setCampaign: React.Dispatch<React.SetStateAction<any>>;
}

const QuizContentEditor: React.FC<QuizContentEditorProps> = ({ campaign, setCampaign }) => {
  const questions = campaign.gameConfig?.quiz?.questions || [];

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        quiz: {
          ...prev.gameConfig?.quiz,
          questions: newQuestions
        }
      }
    }));
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number, field: string, value: any) => {
    const newQuestions = [...questions];
    const newAnswers = [...newQuestions[questionIndex].answers];
    newAnswers[answerIndex] = { ...newAnswers[answerIndex], [field]: value };
    newQuestions[questionIndex] = { ...newQuestions[questionIndex], answers: newAnswers };
    
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        quiz: {
          ...prev.gameConfig?.quiz,
          questions: newQuestions
        }
      }
    }));
  };

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      question: '',
      answers: [
        { text: '', correct: true },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false }
      ]
    };
    
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        quiz: {
          ...prev.gameConfig?.quiz,
          questions: [...questions, newQuestion]
        }
      }
    }));
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_: any, i: number) => i !== index);
    
    setCampaign((prev: any) => ({
      ...prev,
      gameConfig: {
        ...prev.gameConfig,
        quiz: {
          ...prev.gameConfig?.quiz,
          questions: newQuestions
        }
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Questions du quiz</h3>
        <button
          onClick={addQuestion}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une question</span>
        </button>
      </div>

      <div className="space-y-6">
        {questions.map((question: any, questionIndex: number) => (
          <div key={question.id} className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-gray-900">
                Question {questionIndex + 1}
              </h4>
              <button
                onClick={() => removeQuestion(questionIndex)}
                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Saisissez votre question..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Réponses
                </label>
                <div className="space-y-2">
                  {question.answers?.map((answer: any, answerIndex: number) => (
                    <div key={answerIndex} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        checked={answer.correct}
                        onChange={() => {
                          // Marquer cette réponse comme correcte et les autres comme incorrectes
                          question.answers.forEach((_: any, i: number) => {
                            handleAnswerChange(questionIndex, i, 'correct', i === answerIndex);
                          });
                        }}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                      <input
                        type="text"
                        value={answer.text}
                        onChange={(e) => handleAnswerChange(questionIndex, answerIndex, 'text', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder={`Réponse ${answerIndex + 1}`}
                      />
                      {answer.correct && (
                        <span className="text-green-600 text-sm font-medium">✓ Correcte</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {questions.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Aucune question configurée</p>
          <button
            onClick={addQuestion}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Créer la première question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizContentEditor;
