
export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
}

export interface NewsletterModule {
  id: string;
  type: string;
  content: string | string[];
  settings: {
    padding?: string;
    backgroundColor?: string;
    textAlign?: string;
    color?: string;
    fontSize?: string;
    width?: string;
    height?: string;
    href?: string;
    borderRadius?: string;
    imageUrl?: string;
    socialLinks?: SocialLinks;
    columns?: number;
    spacing?: string;
    verticalAlignment?: string;
  };
}

export interface EmailTemplate {
  id: string;
  name: string;
  modules: NewsletterModule[];
  settings: {
    backgroundColor: string;
    contentWidth: string;
    fontFamily: string;
  };
}
