
// Define component interfaces for any components with type mismatches
export interface MemoryGameProps {
  // Define required props for the MemoryGame component
  cards: Array<{
    content: string;
    image?: string;
  }>;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  onComplete?: () => void;
  backgroundImage?: string;
}

export interface DiceGameProps {
  sides: number;
  style: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  onComplete?: () => void;
}

export interface TargetGameProps {
  targets: number;
  speed: number;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  onComplete?: () => void;
}
