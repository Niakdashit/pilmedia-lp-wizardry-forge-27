
export interface CampaignScreen {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  showTitle: boolean;
  showDescription: boolean;
  showReplayButton?: boolean;
  frame?: {
    show?: boolean;
    position?: string;
    maxWidth?: number;
    maxHeight?: number;
    padding?: number;
  };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface WheelSegment {
  text: string;
  isWinning: boolean;
}

export interface SwiperCard {
  image: string;
  text: string;
  isWinning: boolean;
}

export interface GameConfig {
  quiz: {
    questions: QuizQuestion[];
    timeLimit: number;
    showCorrectAnswers: boolean;
  };
  wheel: {
    segments: WheelSegment[];
    colors: string[];
  };
  scratch: {
    image: string;
    revealPercentage: number;
  };
  swiper: {
    cards: SwiperCard[];
    swipeThreshold: number;
  };
}

export interface CampaignDesign {
  background: string;
  fontFamily: string;
  primaryColor: string;
  secondaryColor: string;
  titleColor: string;
  buttonColor: string;
  blockColor: string;
  borderColor: string;
  borderRadius: string;
  shadow: string;
  titleFont: string;
  textFont: string;
  fontSize: string;
  fontWeight: string;
  logoUrl: string;
  backgroundImage: string;
  customHTML?: string;
  customCSS?: string;
  frame?: {
    maxWidth?: number;
    maxHeight?: number;
    padding?: number;
    position?: string;
    show?: boolean;
  };
}

export interface CampaignRewards {
  mode: 'probability' | 'schedule';
  quantity: number;
  probability: number;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  quantity: number;
}

export interface Campaign {
  name: string;
  description: string;
  url: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: 'draft' | 'scheduled' | 'active' | 'ended';
  type: string;
  screens: {
    [key: string]: CampaignScreen;
  };
  gameConfig: GameConfig;
  design: CampaignDesign;
  rewards: CampaignRewards;
}
