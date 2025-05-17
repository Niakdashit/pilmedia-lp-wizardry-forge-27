import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  cards?: { content: string; image?: string }[];
  colors?: {
    primary: string;
    secondary: string;
    text: string;
  };
  style?: {
    width?: string;
    height?: string;
    fontSize?: string;
  };
  onGameComplete?: (score: number, moves: number) => void;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({
  cards: initialCards = [
    { content: '🎮' }, { content: '🎮' },
    { content: '🎲' }, { content: '🎲' },
    { content: '🎯' }, { content: '🎯' },
    { content: '🎪' }, { content: '🎪' },
    { content: '🎨' }, { content: '🎨' },
    { content: '🎭' }, { content: '🎭' }
  ],
  colors = {
    primary: '#841b60',
    secondary: '#6d1750',
    text: '#ffffff'
  },
  style = {
    width: '600px',
    height: '400px',
    fontSize: '2rem'
  },
  onGameComplete
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...initialCards, ...initialCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        id: index,
        content: card.content,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
    setIsComplete(false);
  };

  const handleCardClick = (cardId: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      cards[cardId].isMatched
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlippedCards;

      if (cards[firstCard].content === cards[secondCard].content) {
        setCards(cards.map(card =>
          card.id === firstCard || card.id === secondCard
            ? { ...card, isMatched: true }
            : card
        ));
        setScore(score + 1);
        setFlippedCards([]);

        // Check if game is complete
        if (score + 1 === initialCards.length) {
          setIsComplete(true);
          onGameComplete?.(score + 1, moves + 1);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const cardVariants = {
    initial: { rotateY: 0 },
    flipped: { rotateY: 180 },
  };

  return (
    <div
      style={{
        width: style.width,
        height: style.height,
        padding: '20px'
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold" style={{ color: colors.primary }}>
          Moves: {moves}
        </div>
        <button
          onClick={initializeGame}
          className="px-4 py-2 rounded-lg text-white transition-colors"
          style={{ backgroundColor: colors.primary }}
        >
          Reset Game
        </button>
      </div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          height: 'calc(100% - 60px)'
        }}
      >
        <AnimatePresence>
          {cards.map(card => (
            <motion.div
              key={card.id}
              className="relative cursor-pointer"
              onClick={() => handleCardClick(card.id)}
              initial="initial"
              animate={card.isFlipped || card.isMatched || flippedCards.includes(card.id) ? "flipped" : "initial"}
              variants={cardVariants}
              transition={{ duration: 0.6 }}
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Card Front */}
              <div
                className="absolute inset-0 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: colors.primary,
                  backfaceVisibility: 'hidden'
                }}
              >
                <span style={{ fontSize: style.fontSize }}>?</span>
              </div>

              {/* Card Back */}
              <div
                className="absolute inset-0 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: colors.secondary,
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden'
                }}
              >
                <span style={{ fontSize: style.fontSize }}>{card.content}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isComplete && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={initializeGame}
        >
          <div
            className="p-8 rounded-lg text-center"
            style={{ backgroundColor: colors.primary }}
          >
            <h2 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
              Congratulations!
            </h2>
            <p style={{ color: colors.text }}>
              You completed the game in {moves} moves!
            </p>
            <button
              className="mt-4 px-6 py-2 rounded-lg text-white transition-colors"
              style={{ backgroundColor: colors.secondary }}
              onClick={initializeGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};