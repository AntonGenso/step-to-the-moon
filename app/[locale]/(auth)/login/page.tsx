'use client';

import React, { useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import {
  NICKNAME_MAX_LENGTH,
  NICKNAME_MIN_LENGTH,
  validateNickname,
  validatePin,
} from '@/src/services/validators';
import { Link, useRouter } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';

import styles from './logIn.module.scss';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const t = useTranslations('auth');
  const tv = useTranslations('validation');

  const [nickname, setNickname] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const nicknameError = validateNickname(nickname);
    if (nicknameError) {
      setError(
        tv(nicknameError, {
          min: NICKNAME_MIN_LENGTH,
          max: NICKNAME_MAX_LENGTH,
        }),
      );
      return;
    }

    const pinError = validatePin(pin);
    if (pinError) {
      setError(tv(pinError));
      return;
    }

    setLoading(true);

    try {
      const err = await login(nickname.trim(), pin);
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
      <div className={styles.langSwitcher}>
        <LanguageSwitcher />
      </div>

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
        <p className={styles.subtitle}>
          {t('loginSubtitle')}
        </p>

        <label className={styles.label}>{t('nickname')}</label>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder={t('placeholder.nickname')}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            autoComplete="username"
            maxLength={NICKNAME_MAX_LENGTH}
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
          {loading ? t('signingIn') : t('start')}
        </button>

        <p className={styles.subtitle} style={{ marginTop: '1rem', marginBottom: 0 }}>
          {t('noAccount')}{' '}
          <Link href="/signup" style={{ color: '#00e3ff', textDecoration: 'underline' }}>
            {t('signUp')}
          </Link>
        </p>
      </form>
    </div>
  );
}
