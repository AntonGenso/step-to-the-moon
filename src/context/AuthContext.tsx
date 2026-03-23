'use client';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '@/src/services/firebase';
import {
  getUserProfile,
  type UserProfile,
} from '@/src/services/userService';

type AuthContextType = {
  user: User | null;
  profile: UserProfile | null;
  isLoggedIn: boolean;
  loading: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    if (user) {
      const data = await getUserProfile(user.uid);
      setProfile(data);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await getUserProfile(firebaseUser.uid);
        setProfile(data);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    await fetch('/api/auth/session', { method: 'DELETE' });
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, isLoggedIn: !!user, loading, logout, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
