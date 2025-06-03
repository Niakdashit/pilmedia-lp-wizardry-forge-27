
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
        <div 
          className="flex flex-col items-center justify-center rounded-lg p-4" 
          style={{ backgroundColor: backgroundColor + '66' }}
        >
          <div style={{
            gap: slotGap,
            flexWrap: 'nowrap',
            maxWidth: '100%'
          }} className="flex mb-6 mx-0">
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

          <div className="flex flex-col items-center w-full">
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
      </div>
    </div>
  );
};

export default Jackpot;
