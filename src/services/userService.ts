import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  writeBatch,
  serverTimestamp,
  collection,
  query,
  orderBy,
  onSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import { MISSION_IDS, TEST_IDS } from '@/src/config/gameConfig';

/* ───── Types ───── */

export interface MissionEntry {
  score: number;
  status: 'open' | 'done';
}

export interface UserSkin {
  headId: number;
  suitId: number;
}

export interface UserProfile {
  pin: string;
  skin: UserSkin;
  missions: Record<string, MissionEntry>;
  tests: Record<string, MissionEntry>;
  leaderboard: { stars: number; score: number; total: number };
  created_at: unknown;
}

export interface LeaderboardEntry {
  nickname: string;
  skin: UserSkin;
  stars: number;
  score: number;
  total: number;
}

/* ───── Helpers ───── */

const userRef = (nickname: string) => doc(db, 'users', nickname.toLowerCase());

function buildDefaultMissions(): Record<string, MissionEntry> {
  const m: Record<string, MissionEntry> = {};
  for (const id of MISSION_IDS) {
    m[id] = { score: 0, status: 'open' };
  }
  return m;
}

function buildDefaultTests(): Record<string, MissionEntry> {
  const t: Record<string, MissionEntry> = {};
  for (const id of TEST_IDS) {
    t[id] = { score: 0, status: 'open' };
  }
  return t;
}

/* ───── CRUD ───── */

/** Create profile on signup. Document ID = nickname (lowercase). */
export const createUserProfile = async (nickname: string, pin: string) => {
  await setDoc(userRef(nickname), {
    pin,
    skin: { headId: 0, suitId: 0 },
    missions: buildDefaultMissions(),
    tests: buildDefaultTests(),
    leaderboard: { stars: 0, score: 0, total: 0 },
    created_at: serverTimestamp(),
  });
};

/** Get user profile by nickname */
export const getUserProfile = async (
  nickname: string,
): Promise<UserProfile | null> => {
  const snap = await getDoc(userRef(nickname));
  return snap.exists() ? (snap.data() as UserProfile) : null;
};

/** Check if nickname already exists */
export const nicknameExists = async (nickname: string): Promise<boolean> => {
  const snap = await getDoc(userRef(nickname));
  return snap.exists();
};

/* ───── Score submission (compare-and-keep-higher, atomic batch) ───── */

/**
 * Submit a mission score. Only updates if newScore > current score.
 * Recalculates leaderboard.stars and leaderboard.total in a single batch.
 */
export const submitMissionScore = async (
  nickname: string,
  missionKey: string,
  newScore: number,
): Promise<UserProfile | null> => {
  const ref = userRef(nickname);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const data = snap.data() as UserProfile;
  const current = data.missions[missionKey]?.score ?? 0;

  if (newScore <= current) return data;

  // Recalculate stars with the new value
  const updatedMissions = { ...data.missions };
  updatedMissions[missionKey] = { score: newScore, status: 'done' };

  const stars = Object.values(updatedMissions).reduce((sum, m) => sum + m.score, 0);
  const total = stars + data.leaderboard.score;

  const batch = writeBatch(db);
  batch.update(ref, {
    [`missions.${missionKey}.score`]: newScore,
    [`missions.${missionKey}.status`]: 'done',
    'leaderboard.stars': stars,
    'leaderboard.total': total,
  });
  await batch.commit();

  return {
    ...data,
    missions: updatedMissions,
    leaderboard: { ...data.leaderboard, stars, total },
  };
};

/**
 * Submit a test score. Only updates if newScore > current score.
 * Recalculates leaderboard.score and leaderboard.total in a single batch.
 */
export const submitTestScore = async (
  nickname: string,
  testKey: string,
  newScore: number,
): Promise<UserProfile | null> => {
  const ref = userRef(nickname);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const data = snap.data() as UserProfile;
  const current = data.tests[testKey]?.score ?? 0;

  if (newScore <= current) return data;

  // Recalculate score with the new value
  const updatedTests = { ...data.tests };
  updatedTests[testKey] = { score: newScore, status: 'done' };

  const score = Object.values(updatedTests).reduce((sum, t) => sum + t.score, 0);
  const total = data.leaderboard.stars + score;

  const batch = writeBatch(db);
  batch.update(ref, {
    [`tests.${testKey}.score`]: newScore,
    [`tests.${testKey}.status`]: 'done',
    'leaderboard.score': score,
    'leaderboard.total': total,
  });
  await batch.commit();

  return {
    ...data,
    tests: updatedTests,
    leaderboard: { ...data.leaderboard, score, total },
  };
};

/* ───── Skin ───── */

export const updateUserSkin = async (nickname: string, skin: UserSkin) => {
  await updateDoc(userRef(nickname), { skin });
};

/* ───── Leaderboard (real-time) ───── */

/**
 * Subscribe to the top N users, ordered by total descending.
 * Returns an unsubscribe function.
 */
export const subscribeTopUsers = (
  callback: (entries: LeaderboardEntry[]) => void,
): Unsubscribe => {
  const q = query(
    collection(db, 'users'),
    orderBy('leaderboard.total', 'desc'),
  );

  return onSnapshot(q, (snap) => {
    const entries: LeaderboardEntry[] = snap.docs.map((d) => {
      const data = d.data() as UserProfile;
      return {
        nickname: d.id,
        skin: data.skin ?? { headId: 0, suitId: 0 },
        stars: data.leaderboard?.stars ?? 0,
        score: data.leaderboard?.score ?? 0,
        total: data.leaderboard?.total ?? 0,
      };
    });
    callback(entries);
  });
};
