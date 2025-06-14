import React, { useState, useEffect } from 'react';
import QuizContainer from './Quiz/QuizContainer';
import QuizProgress from './Quiz/QuizProgress';
import QuizQuestion from './Quiz/QuizQuestion';
import QuizOption from './Quiz/QuizOption';
import QuizResults from './Quiz/QuizResults';
import { createEnhancedQuizDesign } from '../../utils/quizConfigSync';

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
  const [score, setScore] = useState(0);

  const questions = config?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  // Utiliser le nouveau système de synchronisation
  const enhancedDesign = createEnhancedQuizDesign({ design });

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

  const calculateCurrentScore = () => {
    let currentScore = 0;
    for (let i = 0; i <= currentQuestionIndex; i++) {
      const question = questions[i];
      const userAnswers = selectedAnswers[i] || [];
      const correctAnswers = question?.options
        ?.filter((opt: any) => opt.isCorrect)
        ?.map((opt: any) => opt.id) || [];
      
      if (JSON.stringify(userAnswers.sort()) === JSON.stringify(correctAnswers.sort())) {
        currentScore++;
      }
    }
    return currentScore;
  };

  const handleNextQuestion = () => {
    const newScore = calculateCurrentScore();
    setScore(newScore);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      if (onGameComplete) {
        onGameComplete({ score: newScore, total: questions.length });
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (!currentQuestion && !showResults) {
    return (
      <QuizContainer design={enhancedDesign} className="p-8">
        <div className="text-center">
          <p className="text-lg" style={{ color: enhancedDesign.textColor }}>
            Aucune question configurée
          </p>
        </div>
      </QuizContainer>
    );
  }

  if (showResults) {
    return (
      <QuizContainer design={enhancedDesign}>
        <QuizResults
          score={score}
          totalQuestions={questions.length}
          design={enhancedDesign}
          onRestart={handleRestart}
        />
      </QuizContainer>
    );
  }

  const currentAnswers = selectedAnswers[currentQuestionIndex] || [];
  const isMultiple = currentQuestion.type === 'multiple';

  return (
    <QuizContainer design={enhancedDesign} className="p-6 max-w-2xl mx-auto">
      <QuizProgress
        currentQuestion={currentQuestionIndex}
        totalQuestions={questions.length}
        design={enhancedDesign}
      />

      <QuizQuestion question={currentQuestion} design={enhancedDesign} />

      {/* Options */}
      <div className="space-y-3 mb-8">
        {currentQuestion.options?.map((option: any, index: number) => (
          <QuizOption
            key={option.id}
            option={option}
            isSelected={currentAnswers.includes(option.id)}
            isMultiple={isMultiple}
            onSelect={() => handleAnswerSelect(option.id, isMultiple)}
            design={enhancedDesign}
            index={index}
          />
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={handleNextQuestion}
        disabled={currentAnswers.length === 0}
        className="w-full py-4 px-6 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg enabled:hover:scale-[1.02]"
        style={{
          backgroundColor: enhancedDesign.primaryColor,
          color: enhancedDesign.buttonTextColor,
          borderRadius: enhancedDesign.borderRadius,
          opacity: currentAnswers.length === 0 ? 0.5 : 1
        }}
      >
        {currentQuestionIndex < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
      </button>
    </QuizContainer>
  );
};

export default QuizGame;
