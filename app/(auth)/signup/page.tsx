'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/src/services/firebase';
import { createUserProfile } from '@/src/services/userService';
import {
  nicknameToEmail,
  pinToPassword,
  validateNickname,
  validatePin,
} from '@/src/services/authHelpers';
import Image from 'next/image';

import styles from '../login/logIn.module.scss';

export default function SignupPage() {
  const router = useRouter();

  const [nickname, setNickname] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
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

    if (pin !== confirmPin) {
      setError('PINs do not match');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        nicknameToEmail(nickname),
        pinToPassword(pin),
      );

      await updateProfile(userCredential.user, {
        displayName: nickname.trim(),
      });

      await createUserProfile(userCredential.user.uid, nickname.trim());

      const token = await userCredential.user.getIdToken();
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      router.push('/profile');
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          setError('This nickname is already taken');
          break;
        default:
          setError('Something went wrong. Please try again.');
      }
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
        <p className={styles.subtitle}>Create your account to join the mission</p>

        <label className={styles.label}>//Nickname</label>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="2–16 chars: letters, digits, _"
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
            autoComplete="new-password"
            maxLength={4}
          />
        </div>

        <label className={styles.label}>//Confirm PIN</label>
        <div className={styles.inputGroup}>
          <input
            type="password"
            inputMode="numeric"
            placeholder="Repeat PIN"
            value={confirmPin}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '').slice(0, 4);
              setConfirmPin(v);
            }}
            autoComplete="new-password"
            maxLength={4}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          type="submit"
          className={styles.startBtn}
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
