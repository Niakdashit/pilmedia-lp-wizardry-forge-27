
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

  // Debug logs pour vérifier la réception du template
  console.log('Jackpot component - selectedTemplate:', selectedTemplate);
  console.log('Jackpot component - available templates:', Object.keys(jackpotTemplates));

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

  // Récupération du template SVG - vérifier que c'est une chaîne valide
  const templateImg = selectedTemplate && typeof selectedTemplate === 'string' && jackpotTemplates[selectedTemplate] 
    ? jackpotTemplates[selectedTemplate] 
    : null;

  console.log('Template image selected:', templateImg);
  console.log('Template type check:', typeof selectedTemplate, selectedTemplate);

  // Responsive slot size calculation
  const getSlotSize = () => {
    const containerWidth = window.innerWidth || 400;
    if (containerWidth < 350) return 50;
    if (containerWidth < 500) return 60;
    return 70;
  };

  const slotSize = getSlotSize();
  const slotGap = Math.max(8, slotSize * 0.15);

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center p-4">
      {/* Template SVG en arrière-plan - Position absolue pour couvrir tout le conteneur */}
      {templateImg && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
          <img
            src={templateImg}
            alt="Template jackpot"
            className="w-full h-full object-contain opacity-90"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
      )}

      {/* Image de fond personnalisée */}
      {backgroundImage && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Template personnalisé overlay */}
      {customTemplate && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
          <img
            src={customTemplate}
            alt="Jackpot template personnalisé"
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Contenu du jeu avec z-index élevé pour être au-dessus des templates */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Slots */}
        <div style={{ gap: slotGap }} className="flex mb-6 mx-0">
          {slots.map((symbol, i) => 
            <motion.div 
              key={i} 
              style={{
                width: slotSize,
                height: slotSize,
                borderRadius: 8,
                border: "2px solid #fff",
                boxShadow: "0 4px 12px 0 rgba(0,0,0,0.15)",
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
              className="bg-white shadow-lg flex items-center justify-center flex-shrink-0"
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
              className="px-6 py-3 text-white font-medium rounded-lg shadow-lg hover:opacity-90 transition-all duration-200 disabled:opacity-50 max-w-full" 
              style={{
                backgroundColor: buttonColor,
                fontSize: 'clamp(12px, 3.5vw, 16px)',
                minHeight: '44px'
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
