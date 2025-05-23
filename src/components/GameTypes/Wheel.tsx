import React from 'react';

interface WheelProps {
  segments?: string[];
  colors?: string[];
  onSpinComplete?: (segment: string) => void;
  onConfigChange?: (config: any) => void;
}

const Wheel: React.FC<WheelProps> = ({
  segments = ['Prize 1', 'Prize 2', 'Prize 3', 'Try Again'],
  colors = ['#E57373', '#81C784', '#64B5F6', '#FFD54F'],
  onSpinComplete
}) => {
  // Using only needed states and removing unused ones
  const [spinning, setSpinning] = React.useState(false);
  const spinDuration = 5000;
  
  const handleSpin = () => {
    if (!spinning) {
      setSpinning(true);
      setTimeout(() => {
        setSpinning(false);
        const randomIndex = Math.floor(Math.random() * segments.length);
        if (onSpinComplete) {
          onSpinComplete(segments[randomIndex]);
        }
      }, spinDuration);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`w-64 h-64 rounded-full border-4 border-gray-300 relative overflow-hidden ${spinning ? 'animate-spin' : ''}`}>
        {segments.map((segment, index) => {
          const rotation = (360 / segments.length) * index;
          return (
            <div
              key={index}
              className="absolute w-full h-full origin-bottom-right"
              style={{
                transform: `rotate(${rotation}deg)`,
                clipPath: 'polygon(0 0, 50% 0, 0 100%)',
                backgroundColor: colors[index % colors.length],
              }}
            >
              <span
                className="absolute text-white font-bold text-sm transform rotate-45"
                style={{ left: '20%', top: '15%' }}
              >
                {segment}
              </span>
            </div>
          );
        })}
      </div>
      <button
        onClick={handleSpin}
        disabled={spinning}
        className="mt-4 bg-[#841b60] text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
    </div>
  );
};

export default Wheel;
