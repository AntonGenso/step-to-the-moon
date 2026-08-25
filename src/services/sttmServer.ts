/**
 * Server-only client for sttm-server (the MySQL backend).
 *
 * Used exclusively from Next.js route handlers (`app/api/**`), never from the
 * browser: the base URL points at an internal docker hostname and the JWT is
 * kept in an httpOnly cookie the client can't read. Do not import this into a
 * Client Component.
 */

const BASE_URL = process.env.STTM_API_URL ?? 'http://sttm-server-dev:5000';

export type Roles = string[];

export interface SttmUser {
  id: number;
  name: string;
  phone: string | null;
  roles: Roles;
  class?: {
    id: number;
    grade: number;
    letter: string;
    school_name: string;
  };
}

export interface AuthResult {
  user: SttmUser;
  token: string;
  refreshToken: string;
}

export interface ProgressItem {
  mission_id?: number;
  test_id?: number;
  status: 'open' | 'in_progress' | 'done';
  best_score: number;
  attempts: number;
  started_at: string | null;
  completed_at: string | null;
}

export interface GameProfile {
  skin: { headId: number; suitId: number };
  leaderboard: { stars: number; score: number; total: number };
  missions: ProgressItem[];
  tests: ProgressItem[];
}

/** One row of the mission catalog, as `GET /missions` returns it. */
export interface MissionListItem {
  id: number;
  name: string;
  label: string | null;
  xp: number;
  /** Number shown on the card ("Миссия 07"); also the order of the list. */
  level: number;
  type: string;
  is_active: number;
  game_link: string | null;
  bonus_xp: number;
  cover_url: string | null;
  video_url: string | null;
  video: { ru: string | null; uz: string | null };
  /** Whether the student handout exists; the file itself needs `GET /missions/:id`. */
  has_document: boolean;
}

/** One "interesting fact" of a mission: text from the database, picture from MinIO. */
export interface MissionFactPayload {
  id: number;
  position: number;
  title: { ru: string; uz: string | null };
  description: { ru: string; uz: string | null };
  image_url: string | null;
}

/** Localized asset as the mission endpoints hand it out. */
export interface MissionAsset {
  url: string | null;
  name?: string | null;
}

/** Full mission card from `GET /missions/:id` — document links are signed. */
export interface MissionDetail {
  id: number;
  name: string;
  label: string | null;
  xp: number;
  level: number;
  type: string;
  is_active: number;
  game_link: string | null;
  bonus_xp: number;
  cover_url: string | null;
  video: { ru: MissionAsset; uz: MissionAsset };
  documents: { ru: MissionAsset; uz: MissionAsset };
  facts: MissionFactPayload[];
}

export interface LeaderboardRow {
  nickname: string;
  skin: { headId: number; suitId: number };
  stars: number;
  score: number;
  total: number;
}

/** Error carrying the HTTP status, so route handlers can mirror it back. */
export class SttmError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

type FetchOptions = {
  method?: string;
  token?: string;
  body?: unknown;
};

const request = async <T>(path: string, options: FetchOptions = {}): Promise<T> => {
  const { method = 'GET', token, body } = options;

  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: 'no-store',
    });
  } catch {
    throw new SttmError(502, 'Backend unreachable');
  }

  let data: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    const message = (data as { message?: string })?.message ?? `Request failed (${res.status})`;
    throw new SttmError(res.status, message);
  }

  return data as T;
};

/* ───────────────────────── Auth ───────────────────────── */

export const registerStudent = (
  nickname: string,
  pin: string,
  classCode: string
): Promise<AuthResult> =>
  request<AuthResult>('/auth/student/register', {
    method: 'POST',
    body: { nickname, pin, classCode },
  });

/** The game logs in with the nickname as `name` and the PIN as `password`. */
export const login = (nickname: string, pin: string): Promise<AuthResult> =>
  request<AuthResult>('/auth/login', {
    method: 'POST',
    body: { name: nickname, password: pin },
  });

/** Exchanges a refresh token for a new access token (and a rotated refresh). */
export const refreshSession = (refreshToken: string): Promise<AuthResult> =>
  request<AuthResult>('/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
  });

/** Revokes a refresh token server-side (logout). */
export const revokeSession = (refreshToken: string): Promise<unknown> =>
  request('/auth/logout', {
    method: 'POST',
    body: { refreshToken },
  });

/* ───────────────────────── Missions ───────────────────────── */

/** The catalog is public: no token, and every caller sees the same list. */
export const getMissions = (): Promise<MissionListItem[]> =>
  request<MissionListItem[]>('/missions');

/** Signed handout links are issued here, so this one needs the student token. */
export const getMission = (token: string, id: number): Promise<MissionDetail> =>
  request<MissionDetail>('/missions/' + id, { token });

/* ───────────────────────── Game ───────────────────────── */

export const getProfile = (token: string): Promise<GameProfile> =>
  request<GameProfile>('/game/profile', { token });

export const submitMission = (token: string, missionId: number, score: number) =>
  request('/game/missions/' + missionId + '/submit', {
    method: 'POST',
    token,
    body: { score },
  });

export const submitTest = (token: string, testId: number, score: number) =>
  request('/game/tests/' + testId + '/submit', {
    method: 'POST',
    token,
    body: { score },
  });

export const updateSkin = (token: string, headId: number, suitId: number) =>
  request('/game/skin', {
    method: 'PATCH',
    token,
    body: { headId, suitId },
  });

export const getLeaderboard = (token: string, classId?: number): Promise<LeaderboardRow[]> =>
  request<LeaderboardRow[]>('/game/leaderboard' + (classId ? `?classId=${classId}` : ''), {
    token,
  });
