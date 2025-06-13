import React, { useState } from 'react';
import { useGameResult } from '../../hooks/useGameResult';

interface QuizGameProps {
  campaignId: string;
  config: any;
  design?: any;
}

const QuizGame: React.FC<QuizGameProps> = ({ campaignId, config = {}, design = {} }) => {
  const questions = config.questions || [];
  const { checkWinningCondition, saveResult } = useGameResult(campaignId, config);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(!config.introScreen);

  const colors = design.customColors || { primary: '#841b60', text: '#ffffff' };
  const textStyles = design.textStyles || {};

  const handleAnswer = async (index: number) => {
    const newAnswers = [...answers, index];
    if (current + 1 < questions.length) {
      setAnswers(newAnswers);
      setCurrent(current + 1);
    } else {
      const finalAnswers = newAnswers;
      const finalScore = questions.reduce((acc: number, q: any, i: number) => {
        const option = q.options?.[finalAnswers[i]];
        return acc + (option && option.isCorrect ? 1 : 0);
      }, 0);
      setScore(finalScore);
      const isWinner = await checkWinningCondition();
      await saveResult({
        campaignId,
        userId: 'anonymous',
        gameType: 'quiz',
        result: finalAnswers,
        score: finalScore,
        isWinner,
      });
      setAnswers(finalAnswers);
      setCompleted(true);
    }
  };

  if (!started) {
    return (
      <div className="text-center space-y-4 p-4">
        <h3 className="text-lg font-medium" style={textStyles.title}>
          {config.introScreen?.title || 'Bienvenue au quiz'}
        </h3>
        {config.introScreen?.description && (
          <p style={textStyles.description}>{config.introScreen.description}</p>
        )}
        <button
          onClick={() => setStarted(true)}
          className="px-4 py-2 rounded-lg"
          style={{ backgroundColor: colors.primary, color: colors.text, ...textStyles.button }}
        >
          {config.introScreen?.buttonText || 'Commencer'}
        </button>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="text-center p-4 space-y-2">
        <h3 className="text-lg font-semibold" style={textStyles.title}>
          {config.endMessage || 'Félicitations !'}
        </h3>
        <p style={textStyles.description}>
          Vous avez obtenu {score} / {questions.length} points.
        </p>
      </div>
    );
  }

  const question = questions[current];
  if (!question) {
    return <div className="text-center p-4">Aucune question configurée</div>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm" style={textStyles.label}>
        Question {current + 1} sur {questions.length}
      </p>
      <h3 className="text-lg font-medium" style={textStyles.title}>{question.text}</h3>
      {question.options?.map((option: any, idx: number) => (
        <button
          key={option.id}
          onClick={() => handleAnswer(idx)}
          className="block w-full px-4 py-2 rounded-lg transition-colors"
          style={{ backgroundColor: colors.primary, color: colors.text, ...textStyles.button }}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default QuizGame;
