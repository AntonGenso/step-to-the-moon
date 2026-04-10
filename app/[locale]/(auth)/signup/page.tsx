'use client';

import React, { useState } from 'react';
import { useRouter } from '@/src/i18n/navigation';
import { useAuth } from '@/src/context/AuthContext';
import {
  validateNickname,
  validatePin,
} from '@/src/services/validators';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import styles from '../login/logIn.module.scss';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const t = useTranslations('auth');
  const tv = useTranslations('validation');

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
      setError(tv(nicknameError));
      return;
    }

    const pinError = validatePin(pin);
    if (pinError) {
      setError(tv(pinError));
      return;
    }

    if (pin !== confirmPin) {
      setError(t('pinsNoMatch'));
      return;
    }

    setLoading(true);

    try {
      const err = await signup(nickname, pin);
      if (err) {
        setError(err);
      } else {
        router.push('/');
      }
    } catch {
      setError(t('somethingWrong'));
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
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('signupSubtitle')}</p>

        <label className={styles.label}>{t('nickname')}</label>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder={t('placeholder.nicknameHint')}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            autoComplete="username"
            maxLength={16}
          />
        </div>

        <label className={styles.label}>{t('pin')}</label>
        <div className={styles.inputGroup}>
          <input
            type="password"
            inputMode="numeric"
            placeholder={t('placeholder.pin')}
            value={pin}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '').slice(0, 4);
              setPin(v);
            }}
            autoComplete="new-password"
            maxLength={4}
          />
        </div>

        <label className={styles.label}>{t('confirmPin')}</label>
        <div className={styles.inputGroup}>
          <input
            type="password"
            inputMode="numeric"
            placeholder={t('placeholder.confirmPin')}
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
          {loading ? t('signingUp') : t('signUp')}
        </button>
      </form>
    </div>
  );
}
