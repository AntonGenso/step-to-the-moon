'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import Image from 'next/image';

import styles from './logIn.module.scss';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name.trim() }),
      });

      if (!res.ok) {
        setError('Something went wrong. Please try again.');
        return;
      }

      login();
      router.push('/profile');
    } catch {
      setError('Something went wrong. Please try again.');
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
        <p className={styles.subtitle}>Enter your name to start the mission</p>

        <label className={styles.label}>//Your name</label>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.startBtn}>
          Start
        </button>
      </form>
    </div>
  );
}
