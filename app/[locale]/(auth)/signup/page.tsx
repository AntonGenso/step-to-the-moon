'use client';

import React, { useState } from 'react';
import { Link, useRouter } from '@/src/i18n/navigation';
import { useAuth } from '@/src/context/AuthContext';
import {
  NICKNAME_MAX_LENGTH,
  NICKNAME_MIN_LENGTH,
  validateNewNickname,
  validatePin,
} from '@/src/services/validators';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';

import styles from '../login/logIn.module.scss';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const t = useTranslations('auth');
  const tv = useTranslations('validation');

  const [nickname, setNickname] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const nicknameError = validateNewNickname(nickname);
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

    if (pin !== confirmPin) {
      setError(t('pinsNoMatch'));
      return;
    }

    if (!classCode.trim()) {
      setError(t('classCodeRequired'));
      return;
    }

    setLoading(true);

    try {
      const err = await signup(nickname.trim(), pin, classCode.trim().toUpperCase());
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
        <p className={styles.subtitle}>{t('signupSubtitle')}</p>

        <label className={styles.label}>{t('nickname')}</label>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder={t('placeholder.nicknameHint', {
              min: NICKNAME_MIN_LENGTH,
              max: NICKNAME_MAX_LENGTH,
            })}
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

        <label className={styles.label}>{t('classCode')}</label>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder={t('placeholder.classCode')}
            value={classCode}
            onChange={(e) =>
              setClassCode(
                e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 7),
              )
            }
            autoComplete="off"
            maxLength={7}
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

        <p className={styles.subtitle} style={{ marginTop: '1rem', marginBottom: 0 }}>
          {t('haveAccount')}{' '}
          <Link href="/login" style={{ color: '#00e3ff', textDecoration: 'underline' }}>
            {t('logIn')}
          </Link>
        </p>
      </form>
    </div>
  );
}
