
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
  );
};

export default JackpotSlot;
