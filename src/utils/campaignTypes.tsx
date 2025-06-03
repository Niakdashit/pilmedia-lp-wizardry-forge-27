import { CSSProperties } from "react";

export type CampaignType =
  | 'wheel'
  | 'jackpot'
  | 'memory'
  | 'puzzle'
  | 'quiz'
  | 'dice'
  | 'scratch'
  | 'swiper'
  | 'form';

export interface GameConfig {
  wheel: WheelConfig;
  jackpot: JackpotConfig;
  memory: MemoryConfig;
  puzzle: PuzzleConfig;
  quiz: QuizConfig;
  dice: DiceConfig;
  scratch: ScratchConfig;
  swiper: SwiperConfig;
  form: FormConfig;
}

interface BaseConfig {
  buttonLabel: string;
  buttonColor: string;
}

interface WheelConfig extends BaseConfig {
  winProbability: number;
  maxWinners: number;
  winnersCount: number;
}

interface JackpotConfig extends BaseConfig {
  instantWin: InstantWinConfig;
  containerBackgroundColor: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  slotBorderColor: string;
  slotBorderWidth: number;
  slotBackgroundColor: string;
}

interface ScratchConfig extends BaseConfig {
  instantWin: InstantWinConfig;
  scratchArea: number;
  revealMessage: string;
}

interface MemoryConfig extends BaseConfig {
  difficulty: string;
  timeLimit: number;
}

interface PuzzleConfig extends BaseConfig {
  pieces: number;
  timeLimit: number;
}

interface QuizConfig extends BaseConfig {
  questions: any[];
  timePerQuestion: number;
}

interface DiceConfig extends BaseConfig {
  numberOfDice: number;
  winningCombination: string;
}

interface SwiperConfig extends BaseConfig {
  direction: string;
}

interface FormConfig extends BaseConfig { }

interface InstantWinConfig {
  mode: "instant_winner";
  winProbability: number; // entre 0 et 1
  maxWinners?: number;
  winnersCount?: number;
}

export const getDefaultGameConfig = (type: CampaignType) => {
  const configs = {
    wheel: {
      winProbability: 0.1,
      maxWinners: 10,
      winnersCount: 0,
      buttonLabel: 'Tourner',
      buttonColor: '#841b60'
    },
    jackpot: {
      instantWin: {
        mode: 'instant_winner' as const,
        winProbability: 0.05,
        maxWinners: 10,
        winnersCount: 0
      },
      buttonLabel: 'Lancer le Jackpot',
      buttonColor: '#841b60',
      containerBackgroundColor: '#1f2937',
      backgroundColor: '#c4b5fd30',
      borderColor: '#8b5cf6',
      borderWidth: 3,
      slotBorderColor: '#a78bfa',
      slotBorderWidth: 2,
      slotBackgroundColor: '#ffffff'
    },
    scratch: {
      instantWin: {
        mode: 'instant_winner' as const,
        winProbability: 0.1,
        maxWinners: 10,
        winnersCount: 0
      },
      scratchArea: 70,
      revealMessage: 'Félicitations !',
      buttonLabel: 'Gratter',
      buttonColor: '#841b60'
    },
    memory: {
      difficulty: 'medium',
      timeLimit: 60,
      buttonLabel: 'Commencer',
      buttonColor: '#841b60'
    },
    puzzle: {
      pieces: 9,
      timeLimit: 300,
      buttonLabel: 'Commencer',
      buttonColor: '#841b60'
    },
    quiz: {
      questions: [],
      timePerQuestion: 30,
      buttonLabel: 'Commencer',
      buttonColor: '#841b60'
    },
    dice: {
      numberOfDice: 2,
      winningCombination: 'double',
      buttonLabel: 'Lancer les dés',
      buttonColor: '#841b60'
    },
    swiper: {
      direction: 'horizontal',
      buttonLabel: 'Swiper',
      buttonColor: '#841b60'
    },
    form: {
      buttonLabel: 'Valider',
      buttonColor: '#841b60'
    }
  };

  return configs[type] || {};
};
