
import { useState, useCallback } from 'react';

interface UseWheelSpinOptions {
  segments: any[];
  disabled: boolean;
  config: {
    mode: string;
    winProbability?: number;
    maxWinners?: number;
    winnersCount?: number;
  };
  onStart?: () => void;
  onFinish?: (result: 'win' | 'lose') => void;
}

export const useWheelSpin = ({ segments, disabled, config, onStart, onFinish }: UseWheelSpinOptions) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spinWheel = useCallback(() => {
    if (spinning || segments.length === 0 || disabled) return;
    
    setSpinning(true);
    if (onStart) onStart();

    const totalSpins = 5;
    const randomOffset = Math.random() * 360;
    const finalRotationDeg = totalSpins * 360 + randomOffset;
    const finalRotation = (finalRotationDeg * Math.PI) / 180;

    const duration = 4500;
    const start = Date.now();
    const initialRotation = rotation;

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    const animate = () => {
      const now = Date.now();
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const easedT = easeOutCubic(t);
      const current = initialRotation + easedT * (finalRotation - initialRotation);
      setRotation(current);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        setRotation(current % (2 * Math.PI));
        let result: 'win' | 'lose' = 'lose';
        if (
          config.mode === 'instant_winner' &&
          (!config.maxWinners || (config.winnersCount ?? 0) < config.maxWinners)
        ) {
          result = Math.random() < (config.winProbability ?? 0) ? 'win' : 'lose';
        }
        if (typeof onFinish === 'function') onFinish(result);
      }
    };
    animate();
  }, [spinning, segments.length, disabled, config, onStart, onFinish, rotation]);

  return {
    rotation,
    spinning,
    spinWheel
  };
};
