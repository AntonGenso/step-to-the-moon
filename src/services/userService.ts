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
  /** Place on the unfiltered board — a name search doesn't renumber the rows. */
  position: number;
}

/** One page of the board, as `/api/leaderboard` returns it. */
export interface LeaderboardPage {
  entries: LeaderboardEntry[];
  page: number;
  pageSize: number;
  /** Rows matching the current scope and search, across every page. */
  total: number;
  totalPages: number;
}

export interface LeaderboardQuery {
  page?: number;
  pageSize?: number;
  /** Name fragment; empty means no name filter. */
  search?: string;
  /** True narrows the board to the classmates of the logged-in student. */
  myClassOnly?: boolean;
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
 * Subscribe to one page of the leaderboard. sttm-server has no realtime
 * channel, so this polls `/api/leaderboard` on an interval and reports the
 * latest snapshot. Returns an unsubscribe function, matching the previous
 * realtime API.
 *
 * The query is baked into the subscription: changing page or filters means
 * unsubscribing and subscribing again, which is what the hook does.
 */
export const subscribeLeaderboard = (
  query: LeaderboardQuery,
  callback: (page: LeaderboardPage) => void
): (() => void) => {
  let active = true;

  const params = new URLSearchParams();
  if (query.page) params.set('page', String(query.page));
  if (query.pageSize) params.set('pageSize', String(query.pageSize));
  if (query.search) params.set('search', query.search);
  if (query.myClassOnly) params.set('scope', 'class');
  const qs = params.toString();

  const tick = async () => {
    try {
      const res = await fetch(`/api/leaderboard${qs ? `?${qs}` : ''}`, { cache: 'no-store' });
      if (!res.ok) return;
      const page = (await res.json()) as LeaderboardPage;
      if (active) callback(page);
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
