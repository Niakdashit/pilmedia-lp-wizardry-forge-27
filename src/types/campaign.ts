
export interface CampaignScreen {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  showTitle: boolean;
  showDescription: boolean;
  showReplayButton?: boolean;
}

export interface GameConfig {
  quiz: {
    questions: any[];
    timeLimit: number;
    showCorrectAnswers: boolean;
  };
  wheel: {
    segments: any[];
    colors: string[];
  };
  scratch: {
    image: string;
    revealPercentage: number;
  };
  swiper: {
    cards: any[];
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
