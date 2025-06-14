
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock } from 'lucide-react';

interface QuizGameProps {
  config: any;
  design?: any;
  onGameComplete?: (result: any) => void;
}

const QuizGame: React.FC<QuizGameProps> = ({
  config,
  design = {},
  onGameComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const questions = config?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const styles = {
    container: {
      backgroundColor: design.blockColor || design.containerBackgroundColor || '#ffffff',
      borderColor: design.borderColor || '#e5e7eb',
      borderRadius: design.borderRadius || '8px',
      borderWidth: '1px',
      borderStyle: 'solid'
    },
    question: {
      color: design.textColor || design.titleColor || '#000000',
      fontFamily: design.fontFamily || 'Inter, sans-serif'
    },
    option: {
      backgroundColor: design.optionBackgroundColor || design.blockColor || '#ffffff',
      borderColor: design.optionBorderColor || design.borderColor || '#e5e7eb',
      borderRadius: design.borderRadius || '8px',
      color: design.textColor || '#000000'
    },
    button: {
      backgroundColor: design.buttonColor || '#841b60',
      color: design.buttonTextColor || '#ffffff',
      borderRadius: design.borderRadius || '8px'
    }
  };

  useEffect(() => {
    if (currentQuestion?.timeLimit && currentQuestion.timeLimit > 0) {
      setTimeLeft(currentQuestion.timeLimit);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev && prev <= 1) {
            clearInterval(timer);
            handleNextQuestion();
            return null;
          }
          return prev ? prev - 1 : null;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (optionId: string, isMultiple: boolean) => {
    if (isMultiple) {
      const current = selectedAnswers[currentQuestionIndex] || [];
      const updated = current.includes(optionId)
        ? current.filter((id: string) => id !== optionId)
        : [...current, optionId];
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestionIndex]: updated
      });
    } else {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestionIndex]: [optionId]
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      if (onGameComplete) {
        const score = calculateScore();
        onGameComplete({ score, total: questions.length });
      }
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question: any, index: number) => {
      const userAnswers = selectedAnswers[index] || [];
      const correctAnswers = question.options
        .filter((opt: any) => opt.isCorrect)
        .map((opt: any) => opt.id);
      
      if (JSON.stringify(userAnswers.sort()) === JSON.stringify(correctAnswers.sort())) {
        correct++;
      }
    });
    return correct;
  };

  if (!currentQuestion && !showResults) {
    return (
      <div className="flex items-center justify-center p-8" style={styles.container}>
        <p style={styles.question}>Aucune question configurée</p>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="p-6 text-center" style={styles.container}>
        <h3 className="text-2xl font-bold mb-4" style={styles.question}>
          Quiz terminé !
        </h3>
        <p className="text-lg mb-4" style={styles.question}>
          Votre score : {score}/{questions.length}
        </p>
        <div className="text-sm" style={{ color: styles.question.color }}>
          {score === questions.length ? '🎉 Parfait !' : 
           score >= questions.length / 2 ? '👍 Bien joué !' : '💪 Continuez vos efforts !'}
        </div>
      </div>
    );
  }

  const currentAnswers = selectedAnswers[currentQuestionIndex] || [];
  const isMultiple = currentQuestion.type === 'multiple';

  return (
    <div className="p-6 max-w-2xl mx-auto" style={styles.container}>
      {/* Header avec numéro de question et timer */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium" style={styles.question}>
          Question {currentQuestionIndex + 1} / {questions.length}
        </span>
        {timeLeft !== null && (
          <div className="flex items-center space-x-2 text-sm" style={styles.question}>
            <Clock className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
        )}
      </div>

      {/* Image de la question */}
      {currentQuestion.image && (
        <div className="mb-6">
          <img
            src={currentQuestion.image}
            alt="Question"
            className="w-full max-h-48 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Texte de la question */}
      <h3 className="text-xl font-semibold mb-6" style={styles.question}>
        {currentQuestion.text}
      </h3>

      {/* Options de réponse */}
      <div className="space-y-3 mb-6">
        {currentQuestion.options?.map((option: any) => (
          <button
            key={option.id}
            onClick={() => handleAnswerSelect(option.id, isMultiple)}
            className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
              currentAnswers.includes(option.id)
                ? 'ring-2 ring-offset-2'
                : 'hover:shadow-md'
            }`}
            style={{
              ...styles.option,
              borderColor: currentAnswers.includes(option.id) 
                ? styles.button.backgroundColor 
                : styles.option.borderColor,
              backgroundColor: currentAnswers.includes(option.id)
                ? `${styles.button.backgroundColor}10`
                : styles.option.backgroundColor
            }}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isMultiple ? 'rounded-sm' : ''
                }`}
                style={{
                  borderColor: currentAnswers.includes(option.id) 
                    ? styles.button.backgroundColor 
                    : styles.option.borderColor,
                  backgroundColor: currentAnswers.includes(option.id) 
                    ? styles.button.backgroundColor 
                    : 'transparent'
                }}
              >
                {currentAnswers.includes(option.id) && (
                  <CheckCircle className="w-3 h-3" style={{ color: styles.button.color }} />
                )}
              </div>
              <span>{option.text}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Bouton suivant */}
      <button
        onClick={handleNextQuestion}
        disabled={currentAnswers.length === 0}
        className="w-full py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          ...styles.button,
          opacity: currentAnswers.length === 0 ? 0.5 : 1
        }}
      >
        {currentQuestionIndex < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
      </button>
    </div>
  );
};

export default QuizGame;
