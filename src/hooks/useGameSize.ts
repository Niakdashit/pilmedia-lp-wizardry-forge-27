
import { useState, useCallback } from 'react';
import { GameSize, GAME_SIZES } from '../components/configurators/GameSizeSelector';

export const useGameSize = (initialSize: GameSize = 'small') => {
  const [gameSize, setGameSize] = useState<GameSize>(initialSize);

  const updateGameSize = useCallback((size: GameSize) => {
    setGameSize(size);
  }, []);

  const getGameDimensions = useCallback(() => {
    return GAME_SIZES[gameSize];
  }, [gameSize]);

  const getGameStyle = useCallback(() => {
    const dimensions = GAME_SIZES[gameSize];
    return {
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      maxWidth: `${dimensions.width}px`,
      maxHeight: `${dimensions.height}px`,
      minWidth: `${dimensions.width}px`,
      minHeight: `${dimensions.height}px`
    };
  }, [gameSize]);

  return {
    gameSize,
    updateGameSize,
    getGameDimensions,
    getGameStyle
  };
};
