
export const calculateResult = (instantWinConfig?: {
  mode: 'instant_winner';
  winProbability: number;
  maxWinners?: number;
  winnersCount?: number;
}): 'win' | 'lose' => {
  if (instantWinConfig && instantWinConfig.mode === 'instant_winner') {
    const hasReachedMaxWinners = instantWinConfig.maxWinners 
      ? (instantWinConfig.winnersCount || 0) >= instantWinConfig.maxWinners 
      : false;
    
    if (hasReachedMaxWinners) return 'lose';
    
    return Math.random() < instantWinConfig.winProbability ? 'win' : 'lose';
  }
  
  return Math.random() > 0.7 ? 'win' : 'lose';
};

export const getDimensions = (gameSize: 'small' | 'medium' | 'large' | 'xlarge') => {
  switch (gameSize) {
    case 'small': return { width: 160, height: 110 };
    case 'medium': return { width: 200, height: 140 };
    case 'large': return { width: 240, height: 170 };
    case 'xlarge': return { width: 280, height: 200 };
    default: return { width: 200, height: 140 };
  }
};

export const getGridClasses = () => {
  return "grid grid-cols-2 md:grid-cols-3 gap-4";
};
