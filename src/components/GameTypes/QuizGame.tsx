
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Trophy, Star, Target } from 'lucide-react';
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
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (showTimer && timeLeft > 0 && !answered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answered) {
      handleAnswer(-1);
    }
  }, [timeLeft, answered, showTimer]);

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);
    setShowResult(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
      
      // Animation de succès
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: [design.primaryColor || '#841b60', '#FFD700', '#32CD32']
      });
    } else {
      setStreak(0);
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
            origin: { y: 0.6 },
            colors: [design.primaryColor || '#841b60', '#FFD700', '#32CD32']
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
    setStreak(0);
    setMaxStreak(0);
    onStart?.();
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return 'Performance exceptionnelle ! 🌟';
    if (percentage >= 80) return 'Excellent travail ! 🎉';
    if (percentage >= 70) return 'Très bien joué ! 👏';
    if (percentage >= 60) return 'Bon travail ! 👍';
    if (percentage >= 40) return 'Pas mal, continuez ! 💪';
    return 'Bravo pour votre participation ! 🎯';
  };

  const getEncouragementMessage = () => {
    if (streak >= 3) return `🔥 Série de ${streak} !`;
    if (maxStreak >= 2) return `⭐ Meilleure série : ${maxStreak}`;
    return '';
  };

  if (!questions || questions.length === 0 || !currentQuestion) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 text-center">
        <p className="text-gray-500">Aucune question disponible</p>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 text-center space-y-4 sm:space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex justify-center mb-4">
            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500" />
          </div>
          
          <h2 
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: design.textColor }}
          >
            Quiz terminé !
          </h2>
          
          <div 
            className="text-4xl sm:text-6xl font-bold"
            style={{ color: design.primaryColor }}
          >
            {score}/{questions.length}
          </div>
          
          <div className="flex justify-center space-x-1 mb-4">
            {Array.from({ length: Math.floor((score / questions.length) * 5) }).map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          
          <p 
            className="text-lg sm:text-xl"
            style={{ color: design.textColor }}
          >
            {getScoreMessage()}
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="text-sm text-gray-600">
              Score: {Math.round((score / questions.length) * 100)}%
            </div>
            {maxStreak > 1 && (
              <div className="text-sm text-gray-600">
                Meilleure série: {maxStreak} réponses consécutives
              </div>
            )}
          </div>
          
          <button
            onClick={resetQuiz}
            className="px-6 sm:px-8 py-3 rounded-lg font-medium text-white transition-all hover:opacity-90 w-full sm:w-auto"
            style={{ backgroundColor: design.buttonColor }}
          >
            Recommencer le quiz
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      <motion.div
        key={currentQuestionIndex}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        className="space-y-4 sm:space-y-6"
      >
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-300 relative"
            style={{
              backgroundColor: design.primaryColor,
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
            }}
          >
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-transparent to-white/30 rounded-full"></div>
          </div>
        </div>

        {/* Question counter, timer and streak */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestionIndex + 1} sur {questions.length}
          </span>
          
          <div className="flex items-center space-x-4">
            {getEncouragementMessage() && (
              <span className="text-sm font-medium text-orange-600">
                {getEncouragementMessage()}
              </span>
            )}
            
            {showTimer && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span 
                  className={`font-medium ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}
                >
                  {timeLeft}s
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Question */}
        <div className="space-y-4">
          <h3 
            className="text-lg sm:text-xl font-semibold leading-tight"
            style={{ color: design.textColor }}
          >
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const optionText = typeof option === 'string' ? option : String(option);
              
              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                  className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all duration-200 text-sm sm:text-base ${
                    answered
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-800 shadow-lg'
                        : index === selectedAnswer && index !== currentQuestion.correctAnswer
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                      : 'bg-white border-gray-300 hover:border-purple-300 hover:bg-purple-50 hover:shadow-md'
                  }`}
                  whileHover={!answered ? { scale: 1.02 } : {}}
                  whileTap={!answered ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium pr-2">{optionText}</span>
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
              className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <p className="text-blue-800 text-sm sm:text-base">
                <strong>💡 Explication :</strong> {currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </div>

        {/* Score display */}
        {showScore && (
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <span>Score: {score}/{currentQuestionIndex + (answered ? 1 : 0)}</span>
              <Target className="w-4 h-4" />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default QuizGame;
