import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

// Paramètres slots
const SYMBOLS = ['🍒', '🍋', '🍊', '🍀', '7️⃣', '💎', '⭐'];
const SLOT_SIZE = 80; // px (desktop)
const SLOT_GAP = 16; // px

interface JackpotInstantWinConfig {
  mode: 'instant_winner';
  winProbability: number; // ex: 0.05
  maxWinners?: number;
  winnersCount?: number;
}
interface JackpotProps {
  isPreview?: boolean;
  instantWinConfig?: JackpotInstantWinConfig;
  onFinish?: (result: 'win' | 'lose') => void;
  customTemplate?: string;
  config?: any;
}
const Jackpot: React.FC<JackpotProps> = ({
  isPreview,
  instantWinConfig,
  onFinish,
  customTemplate,
  config
}) => {
  const [slots, setSlots] = useState<string[]>(['🍒', '🍋', '🍊']);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<'win' | 'lose' | null>(null);

  // Utilise le customTemplate du config si disponible
  const templateImage = config?.customTemplate || customTemplate;
  const roll = () => {
    if (isRolling || result) return;
    setIsRolling(true);
    let currentSlots = [...slots];
    const rollInterval = setInterval(() => {
      currentSlots = [SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)], SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)], SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]];
      setSlots([...currentSlots]);
    }, 100);
    setTimeout(() => {
      clearInterval(rollInterval);
      // Décide le résultat
      let win = false;
      if (instantWinConfig && instantWinConfig.mode === 'instant_winner' && (!instantWinConfig.maxWinners || (instantWinConfig.winnersCount ?? 0) < instantWinConfig.maxWinners)) {
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
          origin: {
            y: 0.7
          }
        });
        onFinish?.('win');
      } else {
        onFinish?.('lose');
      }
    }, 1800);
  };
  if (!isPreview) {
    return <div>
        <p>Pas de configuration pour le moment.</p>
      </div>;
  }

  // Responsive wrapper (4:5 ratio)
  return <div style={{
    maxWidth: 400,
    // Desktop max
    width: "95vw",
    aspectRatio: "4 / 5",
    minWidth: 260,
    minHeight: 340
  }} className="flex flex-col items-center justify-center w-full py-[199px]">
      {/* Modèle personnalisé ou SVG par défaut */}
      {templateImage ? <img src={templateImage} alt="Modèle jackpot personnalisé" style={{
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
      pointerEvents: "none"
    }} className="select-none" /> : <svg viewBox="0 0 360 450" width="100%" height="100%" style={{
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 0,
      pointerEvents: "none"
    }} className="select-none">
          {/* Cadre bois et header */}
          <rect x="0" y="45" width="360" height="380" rx="32" fill="#FFD700" />
          <rect x="10" y="55" width="340" height="360" rx="24" fill="#d6a768" stroke="#b07b37" strokeWidth="3" />
          {/* Header rose */}
          <path d="M0 72 Q180 -30 360 72 V120 H0 V72Z" fill="#FF4B8B" />
          {/* Texte & objets */}
          <text x="180" y="68" textAnchor="middle" fontWeight="bold" fontFamily="Arial Rounded MT Bold, Arial" fontSize="32" fill="#fff">
            Cuisine Actuelle
          </text>
          {/* Toque */}
          <ellipse cx="48" cy="40" rx="32" ry="20" fill="#fff" stroke="#aaa" strokeWidth="3" />
          <ellipse cx="62" cy="33" rx="12" ry="10" fill="#fafafa" stroke="#bbb" strokeWidth="2" />
          {/* Batteur */}
          <g>
            <ellipse cx="322" cy="38" rx="18" ry="14" fill="#fffbb7" stroke="#ffb14c" strokeWidth="4" />
            <rect x="320" y="45" width="10" height="22" rx="4" fill="#ffd700" />
            <rect x="317" y="67" width="16" height="4" rx="2" fill="#ff4b8b" />
          </g>
          {/* Levier */}
          <rect x="335" y="140" width="8" height="180" rx="5" fill="#e23c26" />
          <circle cx="339" cy="140" r="20" fill="#FF4B8B" stroke="#d14343" strokeWidth="3" />
          {/* ombre levier */}
          <ellipse cx="339" cy="320" rx="16" ry="10" fill="#ffb14c" opacity="0.2" />
        </svg>}
      
      {/* Slots - centrés dans le cadre */}
      <div style={{
      position: "absolute",
      top: 160,
      left: 0,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      zIndex: 1
    }} className="p">
        <div style={{
        display: "flex",
        gap: SLOT_GAP,
        background: "rgba(255,255,255,0.12)",
        padding: 0,
        borderRadius: 12
      }}>
          {slots.map((symbol, i) => <motion.div key={i} className="bg-white shadow-md flex items-center justify-center" style={{
          width: SLOT_SIZE,
          height: SLOT_SIZE,
          borderRadius: 10,
          border: "3px solid #fff",
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.09)",
          fontSize: 38,
          fontWeight: 700
        }} animate={{
          scale: isRolling ? [1, 0.93, 1] : 1
        }} transition={{
          duration: 0.32,
          repeat: isRolling ? Infinity : 0
        }}>
              {symbol}
            </motion.div>)}
        </div>
      </div>
      {/* Bouton */}
      <div style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 24,
      display: "flex",
      justifyContent: "center",
      zIndex: 2
    }}>
        {result ? <h2 className={`text-xl font-bold mb-4 ${result === "win" ? "text-green-600" : "text-red-600"}`}>
            {result === "win" ? "JACKPOT ! Vous avez gagné !" : "Dommage, pas de jackpot !"}
          </h2> : <button onClick={roll} disabled={isRolling} className="px-8 py-3 bg-[#FF4B8B] text-white font-medium rounded-xl shadow-lg hover:bg-[#e4437a] transition-colors duration-200 disabled:opacity-50" style={{
        fontSize: 20,
        marginTop: 4
      }}>
            {isRolling ? "Roulement..." : "Lancer le Jackpot"}
          </button>}
      </div>
      {/* Responsive spacer */}
      <div style={{
      paddingBottom: 18
    }} />
    </div>;
};
export default Jackpot;