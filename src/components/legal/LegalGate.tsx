'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/src/context/AuthContext';
import type { LegalConfig } from '@/src/services/sttmServer';
import styles from './legalGate.module.scss';

/**
 * Согласие с правилами для тех, кто зарегистрировался раньше, чем документы
 * появились.
 *
 * Окно без крестика и без закрытия мимо: пока согласие не дано, играть нельзя.
 * Это условие доступа, а не подсказка.
 *
 * Пока документы не опубликованы, сессия сообщает `termsAccepted: true` у всех,
 * и окно не показывается вовсе.
 */
export const LegalGate = () => {
  const t = useTranslations('auth');
  const { isLoggedIn, termsAccepted, markTermsAccepted } = useAuth();
  const [checked, setChecked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);
  const [legal, setLegal] = useState<LegalConfig | null>(null);

  const blocking = isLoggedIn && !termsAccepted;

  // Ссылки нужны только когда окно показывается, поэтому и запрашиваются тогда.
  useEffect(() => {
    if (!blocking) return;
    fetch('/api/legal')
      .then((res) => (res.ok ? res.json() : null))
      .then(setLegal)
      .catch(() => {});
  }, [blocking]);

  if (!blocking) {
    return null;
  }

  const accept = async () => {
    setSaving(true);
    setFailed(false);
    try {
      const res = await fetch('/api/legal/accept', { method: 'POST' });
      if (!res.ok) throw new Error('failed');
      markTermsAccepted();
    } catch {
      setFailed(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.window}>
        <h2>{t('legalTitle')}</h2>
        <p>{t('legalIntro')}</p>

        <label className={styles.consent}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span>
            {t('termsPrefix')}{' '}
            <a href={legal?.terms_url ?? '#'} target="_blank" rel="noopener noreferrer">
              {t('termsLink')}
            </a>{' '}
            {t('termsAnd')}{' '}
            <a href={legal?.privacy_url ?? '#'} target="_blank" rel="noopener noreferrer">
              {t('privacyLink')}
            </a>
          </span>
        </label>

        {failed && <p className={styles.error}>{t('legalError')}</p>}

        <button type="button" disabled={!checked || saving} onClick={accept}>
          {saving ? t('legalAccepting') : t('legalAccept')}
        </button>
      </div>
    </div>
  );
};
