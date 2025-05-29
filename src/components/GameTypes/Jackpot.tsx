
import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

// Imports des templates SVG
import Tjackpot1 from '../../assets/templates/Tjackpot1.svg';
import Tjackpot2 from '../../assets/templates/Tjackpot2.svg';
import Tjackpot3 from '../../assets/templates/Tjackpot3.svg';
import Tjackpot4 from '../../assets/templates/Tjackpot4.svg';
import Tjackpot5 from '../../assets/templates/Tjackpot5.svg';

// Mapping des templates
const jackpotTemplates: Record<string, any> = {
  Tjackpot1,
  Tjackpot2,
  Tjackpot3,
  Tjackpot4,
  Tjackpot5
};

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
  customTemplate?: string;
  selectedTemplate?: string;
}

const Jackpot: React.FC<JackpotProps> = ({
  isPreview,
  instantWinConfig,
  onFinish,
  onStart,
  buttonLabel = "Lancer le Jackpot",
  buttonColor = "#ec4899",
  backgroundImage,
  customTemplate,
  selectedTemplate
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

  // Récupération du template SVG
  const templateImg = selectedTemplate ? jackpotTemplates[selectedTemplate] : undefined;

  // Responsive slot size calculation
  const getSlotSize = () => {
    const containerWidth = window.innerWidth || 400;
    if (containerWidth < 350) return 50;
    if (containerWidth < 500) return 60;
    return 70;
  };

  const slotSize = getSlotSize();
  const slotGap = Math.max(8, slotSize * 0.15);

  const containerStyle: any = {
    minHeight: '400px',
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // NE PAS appliquer l'image de fond ici pour éviter la duplication
  // L'image de fond est gérée par le conteneur parent

  return (
    <div style={containerStyle} className="flex flex-col items-center justify-center w-full h-full p-2 px-0">
      {/* Template SVG responsive */}
      {templateImg && (
        <img
          src={templateImg}
          alt="Template jackpot"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-full h-full object-contain max-w-none"
          style={{
            maxWidth: '95vw',
            maxHeight: '85vh',
            minWidth: '320px',
            minHeight: '300px',
            opacity: 0.97
          }}
        />
      )}

      {/* Template personnalisé overlay */}
      {customTemplate && (
        <img
          src={customTemplate}
          alt="Jackpot template personnalisé"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
        />
      )}

      {/* Contenu du jeu avec z-index élevé */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Slots */}
        <div style={{
          gap: slotGap,
          flexWrap: 'nowrap',
          maxWidth: '100%'
        }} className="flex mb-4 mx-0">
          {slots.map((symbol, i) => 
            <motion.div 
              key={i} 
              style={{
                width: slotSize,
                height: slotSize,
                borderRadius: 8,
                border: "2px solid #fff",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.09)",
                fontSize: Math.max(20, slotSize * 0.4),
                fontWeight: 700
              }} 
              animate={{
                scale: isRolling ? [1, 0.93, 1] : 1
              }} 
              transition={{
                duration: 0.32,
                repeat: isRolling ? Infinity : 0
              }} 
              className="bg-white shadow-md flex items-center justify-center flex-shrink-0 aspect-[9/16]"
            >
              {symbol}
            </motion.div>
          )}
        </div>

        {/* Résultat ou bouton */}
        <div className="flex flex-col items-center w-full">
          {result ? (
            <h2 className={`text-base font-bold mb-2 text-center ${result === "win" ? "text-green-600" : "text-red-600"}`} 
                style={{ fontSize: 'clamp(14px, 4vw, 18px)' }}>
              {result === "win" ? "JACKPOT ! Vous avez gagné !" : "Dommage, pas de jackpot !"}
            </h2>
          ) : (
            <button 
              onClick={roll} 
              disabled={isRolling} 
              className="px-4 py-2 text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 max-w-full" 
              style={{
                backgroundColor: buttonColor,
                fontSize: 'clamp(12px, 3.5vw, 16px)',
                minHeight: '40px'
              }}
            >
              {isRolling ? "Roulement..." : buttonLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jackpot;
