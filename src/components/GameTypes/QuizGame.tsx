
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  timeLimit?: number;
}

interface QuizGameProps {
  questions?: QuizQuestion[];
  onComplete?: (score: number, totalQuestions: number) => void;
  onStart?: () => void;
  design?: {
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    buttonColor?: string;
  };
  showTimer?: boolean;
  showScore?: boolean;
}

const defaultQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Quel est le meilleur réseau social pour le marketing B2B ?',
    options: ['Facebook', 'LinkedIn', 'Instagram', 'TikTok'],
    correctAnswer: 1,
    explanation: 'LinkedIn est la plateforme de référence pour le marketing B2B',
    timeLimit: 30
  },
  {
    id: '2',
    question: 'Que signifie SEO ?',
    options: ['Social Engine Optimization', 'Search Engine Optimization', 'Site Engine Optimization', 'Secure Engine Optimization'],
    correctAnswer: 1,
    explanation: 'SEO signifie Search Engine Optimization (optimisation pour les moteurs de recherche)',
    timeLimit: 30
  },
  {
    id: '3',
    question: 'Quel est le taux de conversion moyen d\'un e-commerce ?',
    options: ['1-2%', '3-5%', '6-8%', '9-12%'],
    correctAnswer: 1,
    explanation: 'Le taux de conversion moyen d\'un e-commerce est généralement entre 3-5%',
    timeLimit: 30
  }
];

const QuizGame: React.FC<QuizGameProps> = ({
  questions = defaultQuestions,
  onComplete,
  onStart,
  design = {
    primaryColor: '#841b60',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    buttonColor: '#841b60'
  },
  showTimer = true,
  showScore = true
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 30);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (showTimer && timeLeft > 0 && !answered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answered) {
      handleAnswer(-1); // Auto-submit when time is up
    }
  }, [timeLeft, answered, showTimer]);

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);
    setShowResult(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setAnswered(false);
        setTimeLeft(questions[currentQuestionIndex + 1]?.timeLimit || 30);
      } else {
        setIsComplete(true);
        const finalScore = answerIndex === currentQuestion.correctAnswer ? score + 1 : score;
        
        if (finalScore >= questions.length * 0.7) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
        
        onComplete?.(finalScore, questions.length);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsComplete(false);
    setTimeLeft(questions[0]?.timeLimit || 30);
    setAnswered(false);
    onStart?.();
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'Excellent ! 🎉';
    if (percentage >= 60) return 'Bien joué ! 👏';
    if (percentage >= 40) return 'Pas mal ! 👍';
    return 'Il faut réviser ! 📚';
  };

  // Ensure we have valid questions and current question
  if (!questions || questions.length === 0 || !currentQuestion) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 text-center">
        <p className="text-gray-500">Aucune question disponible</p>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-4"
        >
          <h2 
            className="text-3xl font-bold"
            style={{ color: design.textColor }}
          >
            Quiz terminé !
          </h2>
          
          <div 
            className="text-6xl font-bold"
            style={{ color: design.primaryColor }}
          >
            {score}/{questions.length}
          </div>
          
          <p 
            className="text-xl"
            style={{ color: design.textColor }}
          >
            {getScoreMessage()}
          </p>
          
          <div className="text-lg text-gray-600">
            Score: {Math.round((score / questions.length) * 100)}%
          </div>
          
          <button
            onClick={resetQuiz}
            className="px-8 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90"
            style={{ backgroundColor: design.buttonColor }}
          >
            Recommencer le quiz
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <motion.div
        key={currentQuestionIndex}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        className="space-y-6"
      >
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: design.primaryColor,
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
            }}
          />
        </div>

        {/* Question counter and timer */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestionIndex + 1} sur {questions.length}
          </span>
          
          {showTimer && (
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <span 
                className={`font-medium ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-600'}`}
              >
                {timeLeft}s
              </span>
            </div>
          )}
        </div>

        {/* Question */}
        <div className="space-y-4">
          <h3 
            className="text-xl font-semibold"
            style={{ color: design.textColor }}
          >
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              // Ensure option is a string
              const optionText = typeof option === 'string' ? option : String(option);
              
              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    answered
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : index === selectedAnswer && index !== currentQuestion.correctAnswer
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                      : 'bg-white border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                  whileHover={!answered ? { scale: 1.02 } : {}}
                  whileTap={!answered ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{optionText}</span>
                    {answered && (
                      <div>
                        {index === currentQuestion.correctAnswer && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                        {index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && currentQuestion.explanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <p className="text-blue-800">
                <strong>Explication :</strong> {currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </div>

        {/* Score display */}
        {showScore && (
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Score actuel: {score}/{currentQuestionIndex + (answered ? 1 : 0)}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default QuizGame;
