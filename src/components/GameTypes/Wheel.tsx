import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Image as ImageIcon, Type, Clock } from 'lucide-react';
import gsap from 'gsap';
import ImageUpload from '../common/ImageUpload';

interface WheelProps {
  config: any;
  onConfigChange: (config: any) => void;
  isPreview?: boolean;
  onComplete?: (result: { label: string; won: boolean }) => void;
  currentWinners: number;
  maxWinners: number;
  winRate: number;
}

const Wheel: React.FC<WheelProps> = ({ config, onConfigChange, isPreview, onComplete, currentWinners, maxWinners, winRate }) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (isPreview && wheelRef.current) {
      wheelRef.current.innerHTML = '';

      const segments = config.segments || [];
      const totalSegments = segments.length;
      if (totalSegments > 0) {
        const segmentAngle = 360 / totalSegments;

        segments.forEach((segment: any, index: number) => {
          const startAngle = index * segmentAngle;

          const segmentEl = document.createElement('div');
          segmentEl.className = 'absolute w-full h-full origin-center';
          segmentEl.style.transform = `rotate(${startAngle}deg)`;

          const segmentShape = document.createElement('div');
          segmentShape.className = 'absolute w-1/2 h-full right-1/2 origin-right';
          segmentShape.style.transform = `rotate(${segmentAngle}deg)`;
          segmentShape.style.backgroundColor = segment.color;
          segmentShape.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';

          if (segment.text) {
            const textEl = document.createElement('div');
            textEl.className = 'absolute left-1/2 top-1/2 -translate-y-1/2 text-white font-bold text-sm transform -rotate-90 whitespace-nowrap';
            textEl.style.transformOrigin = '0 50%';
            textEl.textContent = segment.text;
            segmentShape.appendChild(textEl);
          }

          if (segment.image) {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'absolute left-3/4 top-1/2 -translate-y-1/2 w-8 h-8';

            const imgEl = document.createElement('img');
            imgEl.src = segment.image;
            imgEl.className = 'w-full h-full object-contain';
            imgEl.style.transform = 'rotate(90deg)';

            imgContainer.appendChild(imgEl);
            segmentShape.appendChild(imgContainer);
          }

          segmentEl.appendChild(segmentShape);
          wheelRef.current.appendChild(segmentEl);
        });
      }
    }
  }, [config.segments, isPreview]);

  const spinWheel = () => {
    if (isSpinning || !wheelRef.current || !config.segments?.length) return;

    setIsSpinning(true);
    const segments = config.segments;
    const totalSegments = segments.length;
    const segmentAngle = 360 / totalSegments;
    const winningIndex = Math.floor(Math.random() * totalSegments);
    const totalRotation = 360 * (config.spinCount || 5) + (360 - winningIndex * segmentAngle);

    const won = currentWinners < maxWinners && Math.random() <= winRate;

    gsap.to(wheelRef.current, {
      rotation: totalRotation,
      duration: config.spinDuration || 5,
      ease: 'power2.out',
      onComplete: () => {
        setIsSpinning(false);
        if (onComplete) {
          onComplete({ label: segments[winningIndex].text, won });
        }
      },
    });
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <div
        ref={wheelRef}
        className="absolute inset-0 rounded-full border-8 border-[#841b60] shadow-xl overflow-hidden"
      ></div>
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#841b60] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#6d164f]"
      >
        {isSpinning ? 'En cours...' : 'Lancer la roue'}
      </button>
    </div>
  );
};

export default Wheel;
