'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import {
  validateNickname,
  validatePin,
} from '@/src/services/validators';
import Link from 'next/link';
import Image from 'next/image';

import styles from './logIn.module.scss';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [nickname, setNickname] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const nicknameError = validateNickname(nickname);
    if (nicknameError) {
      setError(nicknameError);
      return;
    }

    const pinError = validatePin(pin);
    if (pinError) {
      setError(pinError);
      return;
    }

    setLoading(true);

    try {
      const err = await login(nickname, pin);
      if (err) {
        setError(err);
      } else {
        router.push('/profile');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.logos}>
        <Image
          src="/images/svg/logo-en.svg"
          alt="School 21"
          width={80}
          height={60}
          className={styles.logo21}
        />
        <Image
          src="/images/svg/uzcosmos_logo_white.svg"
          alt="UZCOSMOS"
          width={140}
          height={40}
          className={styles.logoUzcosmos}
        />
      </div>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h1 className={styles.title}>STEP TO THE MOON</h1>
        <p className={styles.subtitle}>
          Enter your credentials to start the mission
        </p>

        <label className={styles.label}>//Nickname</label>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            autoComplete="username"
            maxLength={16}
          />
        </div>

        <label className={styles.label}>//PIN</label>
        <div className={styles.inputGroup}>
          <input
            type="password"
            inputMode="numeric"
            placeholder="4-digit PIN"
            value={pin}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '').slice(0, 4);
              setPin(v);
            }}
            autoComplete="current-password"
            maxLength={4}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="submit"
          className={styles.startBtn}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Start'}
        </button>

        <p className={styles.subtitle} style={{ marginTop: '1rem', marginBottom: 0 }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: '#00e3ff', textDecoration: 'underline' }}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
