
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react';

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

interface QuizGameProps {
  questions?: QuizQuestion[];
  onComplete?: (score?: number, totalQuestions?: number) => void;
  onStart?: () => void;
  design?: any;
  showTimer?: boolean;
  showScore?: boolean;
}

const QuizGame: React.FC<QuizGameProps> = ({
  questions = [],
  onComplete,
  onStart,
  design = {},
  showTimer = false,
  showScore = false
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (onStart) {
      onStart();
    }
  }, [onStart]);

  const handleStartGame = () => {
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setGameCompleted(false);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setGameCompleted(true);
        if (onComplete) {
          onComplete(0, questions.length); // Pas de score car pas de bonnes réponses
        }
      }
    }
  };

  const getOptionDisplay = (option: any): string => {
    if (typeof option === 'string') {
      return option;
    }
    if (typeof option === 'object' && option.text) {
      return option.text;
    }
    return String(option);
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <p>Aucune question configurée pour ce quiz.</p>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 p-8">
        <h2 
          className="text-2xl font-bold text-center"
          style={{ color: design.titleColor || '#000000' }}
        >
          Quiz interactif
        </h2>
        <p className="text-gray-600 text-center">
          Répondez aux questions pour participer
        </p>
        <button
          onClick={handleStartGame}
          className="px-8 py-3 rounded-lg text-white font-medium transition-colors"
          style={{ backgroundColor: design.buttonColor || '#841b60' }}
        >
          Commencer le quiz
        </button>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 p-8">
        <CheckCircle className="w-16 h-16 text-green-500" />
        <h2 
          className="text-2xl font-bold text-center"
          style={{ color: design.titleColor || '#000000' }}
        >
          Quiz terminé !
        </h2>
        <p className="text-gray-600 text-center">
          Merci d'avoir participé au quiz
        </p>
        <button
          onClick={handleStartGame}
          className="px-6 py-2 rounded-lg text-white font-medium transition-colors"
          style={{ backgroundColor: design.buttonColor || '#841b60' }}
        >
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">
          Question {currentQuestionIndex + 1} sur {questions.length}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: design.primaryColor || '#841b60',
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
            }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <h3 
          className="text-xl font-medium text-center"
          style={{ color: design.titleColor || '#000000' }}
        >
          {currentQuestion?.question}
        </h3>

        {currentQuestion?.hint && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Indice :</h4>
            {currentQuestion.hint.type === 'image' && (
              <img
                src={currentQuestion.hint.value}
                alt="Indice"
                className="max-w-full h-auto rounded-lg"
                style={{ maxHeight: '200px' }}
              />
            )}
            {currentQuestion.hint.type === 'link' && (
              <a
                href={currentQuestion.hint.value}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{currentQuestion.hint.text || currentQuestion.hint.value}</span>
              </a>
            )}
          </div>
        )}

        <div className="space-y-3">
          {currentQuestion?.options?.map((option, index) => {
            const optionText = getOptionDisplay(option);
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(optionText)}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                  selectedAnswer === optionText
                    ? 'border-purple-500 bg-purple-50 text-purple-800'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`}
              >
                {optionText}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className="px-8 py-3 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: design.buttonColor || '#841b60' }}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Question suivante' : 'Terminer le quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizGame;
