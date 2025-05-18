export interface Campaign {
  id: string;
  name: string;
  type: 'quiz' | 'survey' | 'contest' | 'form' | 'wheel' | 'memory' | 'scratch' | 'puzzle' | 'dice' | 'target';
  status: 'active' | 'draft' | 'scheduled' | 'ended';
  start_date?: string;
  end_date?: string;
  start_time?: string;
  end_time?: string;
  url?: string;
  user_id?: string;
  participants: number;
  background_image?: string;
  questions?: Question[];
  fields?: FormField[];
  colors?: {
    background: string;
    button: string;
    buttonText: string;
    text: string;
    border: string;
    questionBackground: string;
    progressBar: string;
  };
  style?: {
    containerRadius: string;
    buttonRadius: string;
    containerOpacity: string;
    buttonPadding: string;
    buttonShadow?: string;
    containerShadow?: string;
    fontFamily?: string;
    fontSize?: string;
  };
  game_type?: string;
  game_settings?: {
    wheel?: {
      segments: Array<{
        text: string;
        color: string;
        probability?: number;
      }>;
    };
    memory?: {
      pairs: number;
      cards: Array<{
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
  game_content?: {
    title: string;
    description: string;
    rules: string;
    successMessage: string;
    failureMessage: string;
  };
  game_style?: {
    colors: {
      primary: string;
      secondary: string;
      text: string;
    };
    typography: {
      fontFamily: string;
      fontSize: string;
    };
    spacing: {
      padding: string;
      margin: string;
    };
  };
  created_at: string;
  updated_at?: string;
  public_url?: string;
  description?: string; // Adding this property for compatibility
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text' | 'checkbox';
  options?: string[];
  correctAnswer?: string;
}

export interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: string;
  positive: boolean;
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  phone?: string;
  company?: string;
  role?: string;
  created_at: string;
  updated_at: string;
}
