
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
}

export interface DiceGameProps {
  sides: number;
  style: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
}

export interface TargetGameProps {
  targets: number;
  speed: number;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
}

export interface WheelOfFortuneProps {
  segments: Array<{
    text: string;
    color: string;
    probability?: number;
  }>;
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
}
