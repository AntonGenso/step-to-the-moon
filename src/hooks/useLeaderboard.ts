'use client';

import { useEffect, useState } from 'react';
import {
  subscribeTopUsers,
  type LeaderboardEntry,
} from '@/src/services/userService';

export function useLeaderboard(count: number = 10) {
  const [players, setPlayers] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeTopUsers(count, setPlayers);
    return () => unsubscribe();
  }, [count]);

  return players;
}
