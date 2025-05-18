
import { Campaign as CampaignType } from './type';

// Extend the imported Campaign type
export interface Campaign extends CampaignType {
  // No need to override fields - just extending is enough
}

// Update Question interface to match with type.ts
export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text' | 'checkbox';
  options: string[];
  correctAnswer?: string;
}

// Update FormField interface to match with type.ts
export interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
}

// StatCard interface
export interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: string;
  positive: boolean;
  stat?: string;
}

// Keep existing User interface
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

// Keep existing game props interfaces
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
