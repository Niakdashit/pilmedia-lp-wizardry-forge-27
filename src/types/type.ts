
export interface FormField {
  id: string;
  label: string;
  type: string; // text, select, email, etc.
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correct_answer?: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'quiz' | 'survey' | 'contest' | 'form' | 'wheel' | 'memory' | 'scratch' | 'puzzle' | 'dice' | 'target';
  status: 'active' | 'draft' | 'scheduled' | 'ended';
  start_date?: string; 
  end_date?: string; 
  start_time?: string;
  end_time?: string;
  user_id?: string; // Made optional to match index.ts
  public_url?: string;
  url?: string;
  background_image?: string;
  participants?: number;
  created_at?: string;
  updated_at?: string;
  description?: string;

  style?: {
    containerRadius?: string;
    buttonRadius?: string;
    containerOpacity?: string;
    buttonPadding?: string;
    fontFamily?: string;
    fontSize?: string;
    containerShadow?: string;
    buttonShadow?: string;
  };

  colors?: {
    background?: string;
    button?: string;
    buttonText?: string;
    text?: string;
    border?: string;
    questionBackground?: string;
    progressBar?: string;
    primary?: string;
    secondary?: string;
  };

  fields?: FormField[];
  questions?: Question[];

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
