import { 
  Target, 
  Users, 
  HelpCircle, 
  Puzzle, 
  Brain, 
  Dice6, 
  Cookie, 
  ArrowRight, 
  FileText,
  DollarSign
} from 'lucide-react';

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
  cards?: ScratchCard[];
}

interface ScratchCard {
  id: number;
  revealImage: string;
  revealMessage: string;
}