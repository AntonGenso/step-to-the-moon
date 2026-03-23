import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  increment,
  serverTimestamp,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { db } from './firebase';

export interface UserSkin {
  headId: number;
  suitId: number;
}

export interface UserProfile {
  nickname: string;
  score: number;
  stars: number;
  total: number;
  completedMissions: number[];
  createdAt: unknown;
  skin?: UserSkin;
}

/** Create profile on signup */
export const createUserProfile = async (uid: string, nickname: string) => {
  await setDoc(doc(db, 'users', uid), {
    nickname,
    score: 0,
    stars: 0,
    total: 0,
    completedMissions: [],
    skin: { headId: 0, suitId: 0 },
    createdAt: serverTimestamp(),
  });
};

/** Get user profile */
export const getUserProfile = async (
  uid: string,
): Promise<UserProfile | null> => {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
};

/** Add score points */
export const addScore = async (uid: string, points: number) => {
  await updateDoc(doc(db, 'users', uid), {
    score: increment(points),
    total: increment(points),
  });
};

/** Add stars */
export const addStars = async (uid: string, points: number) => {
  await updateDoc(doc(db, 'users', uid), {
    stars: increment(points),
    total: increment(points),
  });
};

/** Mark mission as completed and add score */
export const completeMission = async (
  uid: string,
  missionId: number,
  points: number = 0,
) => {
  await updateDoc(doc(db, 'users', uid), {
    completedMissions: arrayUnion(missionId),
    ...(points > 0 && { score: increment(points), total: increment(points) }),
  });
};

/** Update user skin selection */
export const updateUserSkin = async (uid: string, skin: UserSkin) => {
  await updateDoc(doc(db, 'users', uid), { skin });
};

export interface LeaderboardEntry {
  uid: string;
  nickname: string;
  score: number;
  stars: number;
  total: number;
}

/** Get top users by total points */
export const getTopUsers = async (count: number = 10): Promise<LeaderboardEntry[]> => {
  const q = query(collection(db, 'users'), orderBy('total', 'desc'), limit(count));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as UserProfile;
    return {
      uid: d.id,
      nickname: data.nickname,
      score: data.score,
      stars: data.stars ?? 0,
      total: data.total ?? 0,
    };
  });
};
