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
  type: string;
  status: string;
  start_date: string;
  end_date: string;
  start_time?: string;
  end_time?: string;
  user_id: string;
  public_url?: string;
  url?: string;
  background_image?: string;
  participants?: number;
  created_at?: string;
  updated_at?: string;

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
  };

  fields?: FormField[];
  questions?: Question[];
}
