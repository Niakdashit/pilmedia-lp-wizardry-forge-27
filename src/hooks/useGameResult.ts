import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { GameResult, GameConfig } from '../types/game';

export const useGameResult = (campaignId: string, config: GameConfig) => {
  const checkWinningCondition = useCallback(async () => {
    if (!config.maxWinners || !config.winRate) return false;

    // Get current winners count
    const { count } = await supabase
      .from('game_results')
      .select('id', { count: 'exact' })
      .eq('campaign_id', campaignId)
      .eq('is_winner', true);

    const currentWinners = count || 0;

    // Check if we've reached max winners
    if (currentWinners >= config.maxWinners) {
      return false;
    }

    // Apply win rate probability
    return Math.random() <= config.winRate;
  }, [campaignId, config]);

  const saveResult = useCallback(async (result: Omit<GameResult, 'id' | 'createdAt'>) => {
    const { data, error } = await supabase
      .from('game_results')
      .insert([{
        campaign_id: result.campaignId,
        user_id: result.userId,
        game_type: result.gameType,
        result: result.result,
        score: result.score,
        duration: result.duration,
        is_winner: result.isWinner
      }])
      .select()
      .single();

    if (error) {
      console.error('Error saving game result:', error);
      throw error;
    }

    return data;
  }, []);

  return {
    checkWinningCondition,
    saveResult
  };
};