
import { Campaign as CampaignType } from './type';

// Extend the imported Campaign type
export interface Campaign extends CampaignType {}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text' | 'checkbox';
  options?: string[]; // Make options optional to match type.ts
  correctAnswer?: string;
}

export interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean; // Keep as required for backward compatibility
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

// Add additional interfaces as needed
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
