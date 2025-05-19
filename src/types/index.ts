
export type ContactStatus = 'pending' | 'verified' | 'rejected';
export type CampaignType = 'quiz' | 'survey' | 'contest' | 'form';
export type CampaignStatus = 'draft' | 'scheduled' | 'active' | 'ended';

export interface CampaignColors {
  background: string;
  button: string;
  buttonText: string;
  text: string;
  border: string;
  questionBackground: string;
  progressBar: string;
  primary?: string;
  secondary?: string;
}

export interface CampaignStyle {
  containerRadius?: string;
  buttonRadius?: string;
  containerOpacity?: string;
  buttonPadding?: string;
  fontFamily?: string;
  fontSize?: string;
  containerShadow?: string;
  buttonShadow?: string;
  containerBorder?: string;
  backgroundType?: 'color' | 'gradient' | 'image';
  gradient?: string;
  imageOverlayOpacity?: string;
  imageOverlayColor?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  headingStyle?: string;
  lineHeight?: string;
  textAlign?: string;
  containerSize?: string;
  containerPadding?: string;
  formPosition?: string;
  animation?: string;
  buttonHoverEffect?: string;
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
  campaign_id: string;
  created_at?: string;
  updated_at?: string;
}

export interface QuestionOption {
  text: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  campaign_id?: string;
  question: string;
  type: 'multiple_choice' | 'open_ended';
  options: QuestionOption[];
  created_at?: string;
  updated_at?: string;
  text?: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'quiz' | 'survey' | 'contest' | 'form' | 'wheel' | 'memory' | 'scratch' | 'puzzle' | 'dice' | 'target';
  status: CampaignStatus;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  url: string;
  public_url?: string;
  background_image?: string;
  user_id: string;
  colors: CampaignColors;
  style: CampaignStyle;
  participants: number;
  created_at: string;
  updated_at: string;
  questions?: Question[];
  fields?: FormField[];
  description?: string;
  game_content?: {
    title: string;
    description: string;
    rules: string;
    successMessage: string;
    failureMessage: string;
  };
  game_settings?: {
    wheel?: {
      segments: Array<{
        text: string;
        color: string;
        probability?: number;
      }>;
    };
    memory?: {
      pairs?: number;
      cards?: Array<{
        content: string;
        image?: string;
      }>;
    };
    scratch?: {
      prize: {
        text: string;
        image?: string;
      };
      revealPercent: number;
    };
    puzzle?: {
      imageUrl: string;
      gridSize: number;
    };
    dice?: {
      sides: number;
      style: string;
    };
    target?: {
      targets: number;
      speed: number;
    };
  };
}

// Props interfaces for components
export interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: string;
  positive: boolean;
  stat: string;
}

export interface DiceRollProps {
  sides: number;
  style: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
}

export interface TargetShootProps {
  targets: number;
  speed: number;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
}

export interface WheelOfFortuneProps {
  segments: any[];
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  backgroundImage?: string;
}

export interface MemoryGameProps {
  cards: any[];
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  backgroundImage?: string;
}
