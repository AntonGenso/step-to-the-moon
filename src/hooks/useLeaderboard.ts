'use client';

import { useEffect, useState } from 'react';
import {
  subscribeTopUsers,
  type LeaderboardEntry,
} from '@/src/services/userService';

export function useLeaderboard() {
  const [players, setPlayers] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeTopUsers(setPlayers);
    return () => unsubscribe();
  }, []);

  return players;
}
