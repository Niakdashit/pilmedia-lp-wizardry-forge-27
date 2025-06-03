
import React from "react";
import { GameResult } from "./types";

interface JackpotControlsProps {
  result: GameResult;
  isRolling: boolean;
  onRoll: () => void;
  buttonLabel: string;
  buttonColor: string;
  borderColor: string;
}

const JackpotControls: React.FC<JackpotControlsProps> = ({
  result,
  isRolling,
  onRoll,
  buttonLabel,
  buttonColor,
  borderColor
}) => {
  if (result) {
    return (
      <h3 
        className={`text-lg font-bold mb-2 text-center ${result === "win" ? "text-green-400" : "text-red-400"}`} 
        style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}
      >
        {result === "win" ? "🎉 Vous avez gagné ! 🎉" : "😞 Dommage, réessayez !"}
      </h3>
    );
  }

  return (
    <button 
      onClick={onRoll} 
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
  );
};

export default JackpotControls;
