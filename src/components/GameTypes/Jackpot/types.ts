
export interface JackpotInstantWinConfig {
  mode: 'instant_winner';
  winProbability: number;
  maxWinners?: number;
  winnersCount?: number;
}

export interface JackpotProps {
  isPreview?: boolean;
  instantWinConfig?: JackpotInstantWinConfig;
  onFinish?: (result: 'win' | 'lose') => void;
  onStart?: () => void;
  buttonLabel?: string;
  buttonColor?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  slotBorderColor?: string;
  slotBorderWidth?: number;
  slotBackgroundColor?: string;
  containerBackgroundColor?: string;
}

export type GameResult = 'win' | 'lose' | null;
