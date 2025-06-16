
import React from "react";
import { motion } from "framer-motion";

interface JackpotSlotProps {
  symbol: string;
  isRolling: boolean;
  slotSize: number;
  slotBorderColor: string;
  slotBorderWidth: number;
  slotBackgroundColor: string;
}

const JackpotSlot: React.FC<JackpotSlotProps> = ({
  symbol,
  isRolling,
  slotSize,
  slotBorderColor,
  slotBorderWidth,
  slotBackgroundColor
}) => {
  return (
    <motion.div 
      style={{
        width: slotSize,
        height: slotSize,
        borderRadius: 12,
        border: `${slotBorderWidth}px solid ${slotBorderColor}`,
        backgroundColor: slotBackgroundColor,
        fontSize: Math.max(20, slotSize * 0.4),
        fontWeight: 700,
        // Effets 3D pour les slots individuels
        boxShadow: `
          0 6px 20px rgba(0, 0, 0, 0.15),
          0 2px 8px rgba(0, 0, 0, 0.1),
          inset 0 1px 3px rgba(255, 255, 255, 0.2),
          inset 0 -1px 3px rgba(0, 0, 0, 0.1)
        `,
        background: `
          linear-gradient(145deg, 
            ${slotBackgroundColor}, 
            ${slotBackgroundColor}f0
          )
        `,
      }} 
      animate={{
        scale: isRolling ? [1, 0.93, 1] : 1,
        rotateY: isRolling ? [0, 180, 360] : 0,
        boxShadow: isRolling ? [
          `0 6px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)`,
          `0 8px 25px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15)`,
          `0 6px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)`
        ] : `0 6px 20px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)`
      }} 
      transition={{
        duration: 0.32,
        repeat: isRolling ? Infinity : 0
      }} 
      className="flex items-center justify-center flex-shrink-0"
    >
      {symbol}
    </motion.div>
  );
};

export default JackpotSlot;
