
import { Campaign as CampaignType } from './type';

export interface Campaign extends CampaignType {}

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
