
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Trophy, Star, Zap, Target, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  timeLimit?: number;
}

interface QuizDesign {
  template: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  animations: boolean;
  layout: 'card' | 'fullscreen' | 'chat';
}

interface ModernQuizProps {
  questions: QuizQuestion[];
  design: QuizDesign;
  onComplete?: (score: number, totalQuestions: number, stats: any) => void;
  onStart?: () => void;
  showTimer?: boolean;
  showScore?: boolean;
}

const ModernQuiz: React.FC<ModernQuizProps> = ({
  questions,
  design,
  onComplete,
  onStart,
  showTimer = true,
  showScore = true
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 30);
  const [answered, setAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [answerStats, setAnswerStats] = useState<Array<{ correct: boolean; time: number }>>([]);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer logic
  useEffect(() => {
    if (showTimer && timeLeft > 0 && !answered && gameStarted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !answered) {
      handleAnswer(-1);
    }
  }, [timeLeft, answered, showTimer, gameStarted]);

  const startQuiz = () => {
    setGameStarted(true);
    onStart?.();
  };

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;

    const startTime = Date.now();
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    setShowExplanation(true);

    // Update stats
    setAnswerStats(prev => [...prev, { 
      correct: isCorrect, 
      time: (questions[currentQuestionIndex]?.timeLimit || 30) - timeLeft 
    }]);

    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      setMaxStreak(Math.max(maxStreak, streak + 1));
      
      // Success animation
      if (design.animations) {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.8 },
          colors: [design.primaryColor, design.secondaryColor, '#FFD700']
        });
      }
    } else {
      setStreak(0);
    }

    // Auto-advance after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setAnswered(false);
        setTimeLeft(questions[currentQuestionIndex + 1]?.timeLimit || 30);
      } else {
        // Quiz completed
        const finalScore = isCorrect ? score + 1 : score;
        setIsComplete(true);
        
        if (finalScore >= questions.length * 0.7 && design.animations) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: [design.primaryColor, design.secondaryColor, '#FFD700']
          });
        }
        
        onComplete?.(finalScore, questions.length, {
          streak: maxStreak,
          answerStats,
          averageTime: answerStats.reduce((acc, stat) => acc + stat.time, 0) / answerStats.length
        });
      }
    }, currentQuestion.explanation ? 3000 : 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsComplete(false);
    setTimeLeft(questions[0]?.timeLimit || 30);
    setAnswered(false);
    setStreak(0);
    setMaxStreak(0);
    setShowExplanation(false);
    setGameStarted(false);
    setAnswerStats([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { message: 'Performance exceptionnelle !', icon: Trophy, color: '#FFD700' };
    if (percentage >= 80) return { message: 'Excellent travail !', icon: Award, color: '#10b981' };
    if (percentage >= 70) return { message: 'Très bien joué !', icon: Star, color: '#3b82f6' };
    if (percentage >= 60) return { message: 'Bon travail !', icon: Target, color: '#8b5cf6' };
    return { message: 'Bravo pour votre participation !', icon: Zap, color: design.primaryColor };
  };

  // Styles based on design
  const containerStyle = {
    backgroundColor: design.backgroundColor,
    color: design.textColor,
    fontFamily: design.fontFamily,
    borderRadius: design.borderRadius
  };

  const buttonStyle = {
    backgroundColor: design.primaryColor,
    borderRadius: design.borderRadius
  };

  const cardStyle = {
    borderRadius: design.borderRadius,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)'
  };

  if (!gameStarted) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={containerStyle}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md mx-auto"
          style={cardStyle}
        >
          <div className="p-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: design.primaryColor }}>
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Prêt pour le quiz ?</h1>
            <p className="text-gray-600 mb-8">
              {questions.length} questions vous attendent. Bonne chance !
            </p>
            <button
              onClick={startQuiz}
              className="px-8 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              style={buttonStyle}
            >
              Commencer le quiz
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isComplete) {
    const scoreData = getScoreMessage();
    const ScoreIcon = scoreData.icon;

    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={containerStyle}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-lg mx-auto"
          style={cardStyle}
        >
          <div className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: scoreData.color }}
            >
              <ScoreIcon className="w-12 h-12 text-white" />
            </motion.div>
            
            <h2 className="text-3xl font-bold mb-4">Quiz terminé !</h2>
            
            <div className="text-6xl font-bold mb-4" style={{ color: design.primaryColor }}>
              {score}/{questions.length}
            </div>
            
            <div className="flex justify-center space-x-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor((score / questions.length) * 5)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <p className="text-xl mb-6" style={{ color: scoreData.color }}>
              {scoreData.message}
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold">Score</div>
                  <div>{Math.round((score / questions.length) * 100)}%</div>
                </div>
                <div>
                  <div className="font-semibold">Meilleure série</div>
                  <div>{maxStreak} consécutives</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={resetQuiz}
              className="px-8 py-4 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              style={buttonStyle}
            >
              Recommencer
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen p-4"
      style={containerStyle}
    >
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Question {currentQuestionIndex + 1} sur {questions.length}
            </span>
            {showTimer && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className={`font-medium ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : ''}`}>
                  {timeLeft}s
                </span>
              </div>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="h-3 rounded-full"
              style={{ backgroundColor: design.primaryColor }}
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={cardStyle}
            className="p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-8 leading-tight">
              {currentQuestion.question}
            </h3>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                    answered
                      ? index === currentQuestion.correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : index === selectedAnswer && index !== currentQuestion.correctAnswer
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-100 border-gray-300 text-gray-600'
                      : 'bg-white border-gray-300 hover:border-purple-300 hover:shadow-md'
                  }`}
                  whileHover={!answered ? { scale: 1.02 } : {}}
                  whileTap={!answered ? { scale: 0.98 } : {}}
                  style={{ borderRadius: design.borderRadius }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {answered && (
                      <div>
                        {index === currentQuestion.correctAnswer && (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        )}
                        {index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {showExplanation && currentQuestion.explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <p className="text-blue-800">
                    <strong>💡 Explication :</strong> {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {showScore && (
              <div className="mt-6 text-center">
                <div className="text-sm text-gray-600">
                  Score: {score}/{currentQuestionIndex + (answered ? 1 : 0)}
                  {streak > 1 && (
                    <span className="ml-4 text-orange-600 font-medium">
                      🔥 Série de {streak}
                    </span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModernQuiz;
