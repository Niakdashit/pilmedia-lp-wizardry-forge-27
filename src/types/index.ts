
import { Campaign as CampaignType, Question as QuestionType, FormField as FormFieldType } from './type';

// Étendre le type Campaign importé
export interface Campaign extends CampaignType {
  // Pas besoin de remplacer les champs - l'extension suffit
}

// Interface Question alignée avec type.ts
export interface Question extends QuestionType {
  // Tous les champs de QuestionType sont déjà inclus
}

// Interface FormField alignée avec type.ts
export interface FormField extends FormFieldType {
  // Tous les champs de FormFieldType sont déjà inclus
}

// Interface StatCard
export interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: string;
  positive: boolean;
  stat: string;
}

// Interface StatCardProps pour le composant
export interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: string;
  positive: boolean;
  stat: string;
}

// Conserver l'interface User existante
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

// Conserver les interfaces de props de jeux existantes
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
