
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

// Paramètres slots
const SYMBOLS = ['🍒', '🍋', '🍊', '🍀', '7️⃣', '💎', '⭐'];

interface JackpotInstantWinConfig {
  mode: 'instant_winner';
  winProbability: number;
  maxWinners?: number;
  winnersCount?: number;
}

interface JackpotProps {
  isPreview?: boolean;
  instantWinConfig?: JackpotInstantWinConfig;
  onFinish?: (result: 'win' | 'lose') => void;
  buttonLabel?: string;
  buttonColor?: string;
}

const Jackpot: React.FC<JackpotProps> = ({
  isPreview,
  instantWinConfig,
  onFinish,
  buttonLabel = "Lancer le Jackpot",
  buttonColor = "#ec4899"
}) => {
  const [slots, setSlots] = useState<string[]>(['🍒', '🍋', '🍊']);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 400, height: 300 });

  useEffect(() => {
    const updateSize = () => {
      const container = document.querySelector('.jackpot-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const roll = () => {
    if (isRolling || result) return;
    setIsRolling(true);

    let currentSlots = [...slots];
    const rollInterval = setInterval(() => {
      currentSlots = [
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ];
      setSlots([...currentSlots]);
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);

      let win = false;
      if (
        instantWinConfig &&
        instantWinConfig.mode === 'instant_winner' &&
        (!instantWinConfig.maxWinners || (instantWinConfig.winnersCount ?? 0) < instantWinConfig.maxWinners)
      ) {
        win = Math.random() < (instantWinConfig.winProbability ?? 0.1);
      } else {
        win = currentSlots[0] === currentSlots[1] && currentSlots[1] === currentSlots[2];
      }

      setIsRolling(false);
      setResult(win ? 'win' : 'lose');

      if (win) {
        confetti({ particleCount: 120, spread: 100, origin: { y: 0.7 } });
        onFinish?.('win');
      } else {
        onFinish?.('lose');
      }
    }, 1800);
  };

  if (!isPreview) {
    return <div><p>Pas de configuration pour le moment.</p></div>;
  }

  // Responsive sizing based on container
  const getResponsiveSize = () => {
    const minDimension = Math.min(containerSize.width, containerSize.height);
    
    if (minDimension < 200) {
      return { slotSize: 35, gap: 6, fontSize: 16, buttonPadding: '6px 12px', buttonFontSize: '11px' };
    } else if (minDimension < 300) {
      return { slotSize: 45, gap: 8, fontSize: 20, buttonPadding: '8px 16px', buttonFontSize: '12px' };
    } else {
      return { slotSize: 60, gap: 10, fontSize: 28, buttonPadding: '10px 20px', buttonFontSize: '14px' };
    }
  };

  const { slotSize, gap, fontSize, buttonPadding, buttonFontSize } = getResponsiveSize();

  return (
    <div className="jackpot-container flex flex-col items-center justify-center w-full h-full p-2" style={{ minHeight: '150px' }}>
      {/* Slots */}
      <div 
        className="flex mb-3"
        style={{ 
          gap: gap,
          flexWrap: 'nowrap',
          maxWidth: '100%'
        }}
      >
        {slots.map((symbol, i) => (
          <motion.div
            key={i}
            className="bg-white shadow-md flex items-center justify-center flex-shrink-0"
            style={{
              width: slotSize,
              height: slotSize,
              borderRadius: 6,
              border: "2px solid #fff",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.09)",
              fontSize: fontSize,
              fontWeight: 700
            }}
            animate={{ scale: isRolling ? [1, 0.93, 1] : 1 }}
            transition={{ duration: 0.32, repeat: isRolling ? Infinity : 0 }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>

      {/* Résultat ou bouton */}
      <div className="flex flex-col items-center w-full">
        {result ? (
          <h2 
            className={`font-bold mb-2 text-center ${result === "win" ? "text-green-600" : "text-red-600"}`}
            style={{ fontSize: buttonFontSize }}
          >
            {result === "win" ? "JACKPOT ! Vous avez gagné !" : "Dommage, pas de jackpot !"}
          </h2>
        ) : (
          <button
            onClick={roll}
            disabled={isRolling}
            className="text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 max-w-full"
            style={{
              backgroundColor: buttonColor,
              fontSize: buttonFontSize,
              padding: buttonPadding,
              minHeight: '36px'
            }}
          >
            {isRolling ? "Roulement..." : buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Jackpot;
