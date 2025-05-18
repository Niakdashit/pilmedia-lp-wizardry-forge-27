import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface WheelSegment {
  text: string;
  color: string;
  image?: string;
  probability?: number;
}

interface WheelOfFortuneProps {
  segments: WheelSegment[];
  onSpinEnd?: (segment: string) => void;
  colors?: {
    primary: string;
    secondary: string;
    text: string;
  };
  style?: {
    width?: string;
    height?: string;
    fontSize?: string;
  };
}

export const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({
  segments,
  onSpinEnd,
  colors = {
    primary: '#841b60',
    secondary: '#6d1750',
    text: '#ffffff'
  },
  style = {
    width: '400px',
    height: '400px',
    fontSize: '16px'
  }
}) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const controls = useAnimation();

  const getRotationDegrees = (segmentIndex: number): number => {
    return (360 / segments.length) * segmentIndex;
  };

  const spin = async () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Calculate winning segment based on probabilities
    const totalProbability = segments.reduce((sum, segment) => sum + (segment.probability || 1), 0);
    let random = Math.random() * totalProbability;
    let winningIndex = 0;

    for (let i = 0; i < segments.length; i++) {
      random -= segments[i].probability || 1;
      if (random <= 0) {
        winningIndex = i;
        break;
      }
    }

    const extraSpins = 5;
    const baseRotation = 360 * extraSpins;
    const segmentRotation = (360 / segments.length) * winningIndex;
    const finalRotation = baseRotation + segmentRotation;

    await controls.start({
      rotate: [0, finalRotation],
      transition: {
        duration: 5,
        ease: [0.34, 1.56, 0.64, 1],
      }
    });

    setIsSpinning(false);
    setSelectedSegment(segments[winningIndex].text);
    if (onSpinEnd) onSpinEnd(segments[winningIndex].text);
  };

  return (
    <div className="relative" style={{ width: style.width, height: style.height }}>
      {/* Wheel */}
      <motion.div
        ref={wheelRef}
        animate={controls}
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{ transformOrigin: 'center' }}
      >
        {segments.map((segment, index) => {
          const rotation = getRotationDegrees(index);
          const skewedRotation = rotation + (360 / segments.length / 2);

          return (
            <div
              key={index}
              className="absolute top-0 right-0 bottom-0 left-0"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: '50% 50%',
                clipPath: `polygon(50% 50%, 50% 0%, ${50 + (100 / segments.length)}% 0%)`
              }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  backgroundColor: segment.color || colors.primary,
                  transform: `rotate(${360 / segments.length / 2}deg)`,
                  transformOrigin: 'center',
                }}
              >
                {segment.image ? (
                  <img
                    src={segment.image}
                    alt={segment.text}
                    className="absolute w-12 h-12 object-contain"
                    style={{
                      transform: `rotate(${-skewedRotation}deg)`,
                      top: '15%',
                      left: '50%',
                      marginLeft: '-24px'
                    }}
                  />
                ) : (
                  <span
                    className="absolute whitespace-nowrap text-center"
                    style={{
                      color: colors.text,
                      fontSize: style.fontSize,
                      transform: `rotate(${-skewedRotation}deg)`,
                      width: '100px',
                      left: '50%',
                      marginLeft: '-50px',
                      top: '15%'
                    }}
                  >
                    {segment.text}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Center button */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white shadow-lg z-10 focus:outline-none transition-transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
        style={{ border: `4px solid ${colors.primary}` }}
      >
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0"
          style={{
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderBottom: `16px solid ${colors.primary}`
          }}
        />
      </button>

      {/* Pointer */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 z-20"
        style={{
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderTop: `24px solid ${colors.secondary}`
        }}
      />
    </div>
  );
};

export default WheelOfFortune;
