
export interface CardState {
  isRevealed: boolean;
  scratchPercentage: number;
  result: 'win' | 'lose' | null;
}

export interface ScratchPreviewProps {
  config?: any;
  onFinish?: (result: 'win' | 'lose') => void;
  onStart?: () => void;
  disabled?: boolean;
  buttonLabel?: string;
  buttonColor?: string;
  gameSize?: 'small' | 'medium' | 'large' | 'xlarge';
  gamePosition?: 'top' | 'center' | 'bottom' | 'left' | 'right';
  isPreview?: boolean;
  instantWinConfig?: {
    mode: 'instant_winner';
    winProbability: number;
    maxWinners?: number;
    winnersCount?: number;
  };
}

export interface ScratchCardProps {
  cardIndex: number;
  card: any;
  cardState: CardState;
  width: number;
  height: number;
  config: any;
  onCardUpdate: (cardIndex: number, updates: Partial<CardState>) => void;
  onFinish?: (result: 'win' | 'lose') => void;
}
