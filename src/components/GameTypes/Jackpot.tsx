
import React, { useState } from "react";
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
  onStart?: () => void;
  buttonLabel?: string;
  buttonColor?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  slotBorderColor?: string;
  slotBorderWidth?: number;
  slotBackgroundColor?: string;
  containerBackgroundColor?: string;
}

const Jackpot: React.FC<JackpotProps> = ({
  isPreview,
  instantWinConfig,
  onFinish,
  onStart,
  buttonLabel = "Lancer le Jackpot",
  buttonColor = "#ec4899",
  backgroundImage,
  backgroundColor = "#f3f4f6",
  borderColor = "#ffd700",
  borderWidth = 4,
  slotBorderColor = "#ffffff",
  slotBorderWidth = 2,
  slotBackgroundColor = "#ffffff",
  containerBackgroundColor = "#1f2937"
}) => {
  const [slots, setSlots] = useState<string[]>(['🍒', '🍋', '🍊']);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);

  const roll = () => {
    if (isRolling || result) return;
    
    onStart?.();
    
    setIsRolling(true);
    let currentSlots = [...slots];
    
    const rollInterval = setInterval(() => {
      currentSlots = [
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)], 
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)], 
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      ];
      setSlots([...currentSlots]);
    }, 100);
    
    setTimeout(() => {
      clearInterval(rollInterval);
      let win = false;
      
      if (instantWinConfig && instantWinConfig.mode === 'instant_winner' && 
          (!instantWinConfig.maxWinners || (instantWinConfig.winnersCount ?? 0) < instantWinConfig.maxWinners)) {
        win = Math.random() < (instantWinConfig.winProbability ?? 0.1);
      } else {
        win = currentSlots[0] === currentSlots[1] && currentSlots[1] === currentSlots[2];
      }
      
      setIsRolling(false);
      setResult(win ? 'win' : 'lose');
      
      if (win) {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.7 }
        });
      }
      
      onFinish?.(win ? 'win' : 'lose');
    }, 1800);
  };

  if (!isPreview) {
    return <div><p>Pas de configuration pour le moment.</p></div>;
  }

  // Responsive slot size calculation
  const getSlotSize = () => {
    const containerWidth = window.innerWidth || 400;
    if (containerWidth < 350) return 50;
    if (containerWidth < 500) return 60;
    return 70;
  };

  const slotSize = getSlotSize();
  const slotGap = Math.max(8, slotSize * 0.15);

  // Container avec dimensions ajustées au contenu
  const gameContainerStyle: React.CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `${borderWidth}px solid ${borderColor}`,
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: containerBackgroundColor,
    position: 'relative',
  };

  if (backgroundImage) {
    gameContainerStyle.backgroundImage = `url(${backgroundImage})`;
    gameContainerStyle.backgroundSize = 'cover';
    gameContainerStyle.backgroundPosition = 'center';
    gameContainerStyle.backgroundRepeat = 'no-repeat';
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div style={gameContainerStyle}>
        {/* Zone de jeu centrale */}
        <div 
          className="flex flex-col items-center justify-center rounded-lg p-4" 
          style={{ backgroundColor: backgroundColor + '66' }}
        >
          {/* Slots avec bordures personnalisables */}
          <div style={{
            gap: slotGap,
            flexWrap: 'nowrap',
            maxWidth: '100%'
          }} className="flex mb-6 mx-0">
            {slots.map((symbol, i) => 
              <motion.div 
                key={i} 
                style={{
                  width: slotSize,
                  height: slotSize,
                  borderRadius: 8,
                  border: `${slotBorderWidth}px solid ${slotBorderColor}`,
                  backgroundColor: slotBackgroundColor,
                  boxShadow: "0 4px 12px 0 rgba(0,0,0,0.15)",
                  fontSize: Math.max(20, slotSize * 0.4),
                  fontWeight: 700
                }} 
                animate={{
                  scale: isRolling ? [1, 0.93, 1] : 1,
                  rotateY: isRolling ? [0, 180, 360] : 0
                }} 
                transition={{
                  duration: 0.32,
                  repeat: isRolling ? Infinity : 0
                }} 
                className="shadow-md flex items-center justify-center flex-shrink-0"
              >
                {symbol}
              </motion.div>
            )}
          </div>

          {/* Résultat ou bouton */}
          <div className="flex flex-col items-center w-full">
            {result ? (
              <h3 className={`text-lg font-bold mb-2 text-center ${result === "win" ? "text-green-400" : "text-red-400"}`} 
                  style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
                {result === "win" ? "🎉 Vous avez gagné ! 🎉" : "😞 Dommage, réessayez !"}
              </h3>
            ) : (
              <button 
                onClick={roll} 
                disabled={isRolling} 
                className="px-6 py-3 text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 max-w-full" 
                style={{
                  backgroundColor: buttonColor,
                  fontSize: 'clamp(14px, 3.5vw, 18px)',
                  minHeight: '48px',
                  border: `2px solid ${borderColor}`,
                  borderRadius: '8px'
                }}
              >
                {isRolling ? "🎰 Roulement..." : buttonLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jackpot;
