
import React, { useState } from "react";
import confetti from "canvas-confetti";
import JackpotSlot from "./JackpotSlot";
import JackpotControls from "./JackpotControls";
import { JackpotProps, GameResult } from "./types";
import { SYMBOLS, ROLL_INTERVAL_MS, ROLL_DURATION_MS } from "./constants";
import { getSlotSize, getSlotGap } from "./utils";

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
  const [result, setResult] = useState<GameResult>(null);

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
    }, ROLL_INTERVAL_MS);
    
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
    }, ROLL_DURATION_MS);
  };

  if (!isPreview) {
    return <div><p>Pas de configuration pour le moment.</p></div>;
  }

  const slotSize = getSlotSize();
  const slotGap = getSlotGap(slotSize);

  // Calculer la largeur nécessaire pour les 3 slots + gaps
  const slotsContainerWidth = (slotSize * 3) + (slotGap * 2);

  // Style pour le conteneur des slots uniquement
  const slotsContainerStyle: React.CSSProperties = {
    width: slotsContainerWidth + (borderWidth * 2) + 20, // +20 pour un peu de padding interne
    height: slotSize + (borderWidth * 2) + 20,
    border: `${borderWidth}px solid ${borderColor}`,
    borderRadius: '12px',
    backgroundColor: containerBackgroundColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    position: 'relative',
  };

  if (backgroundImage) {
    slotsContainerStyle.backgroundImage = `url(${backgroundImage})`;
    slotsContainerStyle.backgroundSize = 'cover';
    slotsContainerStyle.backgroundPosition = 'center';
    slotsContainerStyle.backgroundRepeat = 'no-repeat';
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Conteneur des slots seulement */}
      <div style={slotsContainerStyle}>
        <div 
          className="flex rounded-lg p-2" 
          style={{ 
            backgroundColor: backgroundColor + '66',
            gap: slotGap,
            flexWrap: 'nowrap'
          }}
        >
          {slots.map((symbol, i) => 
            <JackpotSlot
              key={i}
              symbol={symbol}
              isRolling={isRolling}
              slotSize={slotSize}
              slotBorderColor={slotBorderColor}
              slotBorderWidth={slotBorderWidth}
              slotBackgroundColor={slotBackgroundColor}
            />
          )}
        </div>
      </div>

      {/* Bouton de contrôle séparé */}
      <div className="flex flex-col items-center">
        <JackpotControls
          result={result}
          isRolling={isRolling}
          onRoll={roll}
          buttonLabel={buttonLabel}
          buttonColor={buttonColor}
          borderColor={borderColor}
        />
      </div>
    </div>
  );
};

export default Jackpot;
