'use client';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import {
  getUserProfile,
  type UserProfile,
} from '@/src/services/userService';

type AuthContextType = {
  nickname: string | null;
  profile: UserProfile | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (nickname: string, pin: string) => Promise<string | null>;
  signup: (
    nickname: string,
    pin: string,
    classCode: string,
  ) => Promise<string | null>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [nickname, setNickname] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount: check if we have an active session
  useEffect(() => {
    fetch('/api/auth/session')
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setNickname(data.nickname);
          const prof = await getUserProfile(data.nickname);
          setProfile(prof);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const refreshProfile = useCallback(async () => {
    if (nickname) {
      const data = await getUserProfile(nickname);
      setProfile(data);
    }
  }, [nickname]);

  const login = async (nick: string, pin: string): Promise<string | null> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname: nick, pin }),
    });

    const data = await res.json();

    if (!res.ok) {
      return data.error || 'Something went wrong';
    }

    const normalizedNick = data.nickname as string;
    setNickname(normalizedNick);
    const prof = await getUserProfile(normalizedNick);
    setProfile(prof);
    return null;
  };

  const signup = async (
    nick: string,
    pin: string,
    classCode: string,
  ): Promise<string | null> => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname: nick, pin, classCode }),
    });

    const data = await res.json();

    if (!res.ok) {
      return data.error || 'Something went wrong';
    }

    const normalizedNick = data.nickname as string;
    setNickname(normalizedNick);
    const prof = await getUserProfile(normalizedNick);
    setProfile(prof);
    return null;
  };

  const logout = async () => {
    await fetch('/api/auth/session', { method: 'DELETE' });
    setNickname(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        nickname,
        profile,
        isLoggedIn: !!nickname,
        loading,
        login,
        signup,
        logout,
        refreshProfile,
      }}
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
