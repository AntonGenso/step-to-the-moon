/**
 * Client-side data access for the game UI.
 *
 * Every call goes to a same-origin Next.js route under `/api/**`, which forwards
 * to sttm-server with the session JWT (kept in an httpOnly cookie). This module
 * runs in the browser and never talks to the database or Firebase directly.
 */

/* ───── Types (kept stable for the components that consume them) ───── */

export interface MissionEntry {
  score: number;
  status: 'open' | 'done';
}

export interface UserSkin {
  headId: number;
  suitId: number;
}

export interface UserProfile {
  skin: UserSkin;
  missions: Record<string, MissionEntry>;
  tests: Record<string, MissionEntry>;
  leaderboard: { stars: number; score: number; total: number };
}

export interface LeaderboardEntry {
  nickname: string;
  skin: UserSkin;
  stars: number;
  score: number;
  total: number;
}

/* ───── Profile ───── */

/**
 * Current user's profile. The `nickname` argument is accepted for backwards
 * compatibility but ignored — the server resolves the user from the session
 * cookie. Returns null when not logged in or on error.
 */
export const getUserProfile = async (
  _nickname?: string,
): Promise<UserProfile | null> => {
  try {
    const res = await fetch('/api/profile', { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as UserProfile;
  } catch {
    return null;
  }
};

/* ───── Score submission ───── */

/** Submit a test score. `testKey` is the front-end key, e.g. "test_3". */
export const submitTestScore = async (
  _nickname: string,
  testKey: string,
  score: number,
): Promise<boolean> => {
  try {
    const res = await fetch('/api/submit-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: testKey, score }),
    });
    return res.ok;
  } catch {
    return false;
  }
};

/* ───── Skin ───── */

export const updateUserSkin = async (
  _nickname: string,
  skin: UserSkin,
): Promise<boolean> => {
  try {
    const res = await fetch('/api/skin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skin),
    });
    return res.ok;
  } catch {
    return false;
  }
};

/* ───── Leaderboard ───── */

const LEADERBOARD_POLL_MS = 15_000;

/**
 * Subscribe to the leaderboard. sttm-server has no realtime channel, so this
 * polls `/api/leaderboard` on an interval and reports the latest snapshot.
 * Returns an unsubscribe function, matching the previous realtime API.
 */
export const subscribeTopUsers = (
  callback: (entries: LeaderboardEntry[]) => void,
): (() => void) => {
  let active = true;

  const tick = async () => {
    try {
      const res = await fetch('/api/leaderboard', { cache: 'no-store' });
      if (!res.ok) return;
      const entries = (await res.json()) as LeaderboardEntry[];
      if (active) callback(entries);
    } catch {
      /* ignore transient errors; the next tick retries */
    }
  };

  tick();
  const id = setInterval(tick, LEADERBOARD_POLL_MS);

  return () => {
    active = false;
    clearInterval(id);
  };
};
