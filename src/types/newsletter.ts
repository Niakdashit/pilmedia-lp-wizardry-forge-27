
export interface ModuleSettings {
  url?: string;
  columns?: number;
  align?: 'left' | 'center' | 'right';
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  spacing?: number;
  verticalAlignment?: string;
  // Social links
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
  [key: string]: any;
}

export interface NewsletterModule {
  id: string;
  type: string;
  content: string | string[];
  settings: ModuleSettings;
}

export interface EditorSettings {
  title: string;
  subject: string;
  preheader: string;
  fromName: string;
  fromEmail: string;
  replyTo: string;
  backgroundColor: string;
  contentWidth: string;
  fontFamily: string;
  fontSize: string;
  textColor: string;
  linkColor: string;
}
