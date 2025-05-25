import React from 'react';
import { Gamepad2, Target, Share2, FlipHorizontal2, FormInput, Grid3X3, Dices, Cookie, Coins } from 'lucide-react';

export type CampaignType = 'quiz' | 'survey' | 'contest' | 'wheel' | 'scratch' | 'memory' | 'form' | 'puzzle' | 'dice' | 'jackpot';

export const getCampaignTypeIcon = (type: string) => {
  switch (type) {
    case 'wheel':
      return <Gamepad2 className="w-4 h-4" />;
    case 'quiz':
      return <Target className="w-4 h-4" />;
    case 'survey':
      return <Target className="w-4 h-4" />;
    case 'contest':
      return <Target className="w-4 h-4" />;
    case 'scratch':
      return <Cookie className="w-4 h-4" />;
    case 'memory':
      return <FlipHorizontal2 className="w-4 h-4" />;
    case 'form':
      return <FormInput className="w-4 h-4" />;
    case 'puzzle':
      return <Grid3X3 className="w-4 h-4" />;
    case 'dice':
      return <Dices className="w-4 h-4" />;
    case 'jackpot':
      return <Coins className="w-4 h-4" />;
    default:
      return <Target className="w-4 h-4" />;
  }
};

export const getCampaignTypeText = (type: string) => {
  switch (type) {
    case 'wheel': return 'Roue de la fortune';
    case 'quiz': return 'Quiz';
    case 'survey': return 'Sondage';
    case 'contest': return 'Concours';
    case 'scratch': return 'Carte à gratter';
    case 'memory': return 'Jeu de mémoire';
    case 'form': return 'Formulaire';
    case 'puzzle': return 'Puzzle';
    case 'dice': return 'Dés chanceux';
    case 'jackpot': return 'Jackpot';
    default: return type;
  }
};

export const getDefaultGameConfig = (type: CampaignType) => {
  switch (type) {
    case 'wheel':
      return {
        wheel: {
          segments: [
            {
              id: '1',
              text: 'Segment 1',
              color: '#FF6B6B',
              image: '',
              isWinning: false
            },
            {
              id: '2', 
              text: 'Segment 2',
              color: '#4ECDC4',
              image: '',
              isWinning: false
            },
            {
              id: '3',
              text: 'Segment 3',
              color: '#45B7D1',
              image: '',
              isWinning: true
            },
            {
              id: '4',
              text: 'Segment 4',
              color: '#96CEB4',
              image: '',
              isWinning: false
            }
          ],
          centerLogo: '',
          centerText: 'Tourner',
          spinDuration: 5,
          spinCount: 3
        }
      };
    case 'jackpot':
      return {
        jackpot: {
          symbols: ['🍒', '🍋', '🍊'],
          reels: 3,
          winMessage: 'JACKPOT ! Vous avez gagné !',
          loseMessage: 'Dommage, pas de jackpot !',
          instantWin: {
            enabled: false,
            winProbability: 0.05,
            maxWinners: undefined,
          }
        }
      };
    case 'scratch':
      return {
        scratch: {
          revealImage: '',
          scratchColor: '#CCCCCC',
          scratchImage: '',
          maskShape: 'rectangle',
          cursorImage: '',
          requiredScratchPercent: 70,
          winMessage: 'Félicitations !',
          loseMessage: 'Pas de chance ! Réessayez !'
        }
      };
    case 'quiz':
      return {
        quiz: {
          questions: [
            {
              id: Date.now(),
              text: '',
              type: 'multiple',
              options: [
                { id: Date.now() + 1, text: '', isCorrect: false },
                { id: Date.now() + 2, text: '', isCorrect: false }
              ],
              feedback: {
                correct: 'Bonne réponse !',
                incorrect: 'Mauvaise réponse.'
              },
              timeLimit: 30
            }
          ],
          showCorrectAnswers: true
        }
      };
    case 'memory':
      return {
        memory: {
          pairs: [],
          timeLimit: 60,
          maxAttempts: 10
        }
      };
    case 'puzzle':
      return {
        puzzle: {
          image: '',
          pieces: 9,
          timeLimit: 120
        }
      };
    case 'dice':
      return {
        dice: {
          count: 2,
          sides: 6,
          winningCombinations: []
        }
      };
    default:
      return {};
  }
};