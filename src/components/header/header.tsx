'use client';
import React, { useState } from 'react';
import styles from './Header.module.scss';
import { useAuth } from '@/src/context/AuthContext';
import { Link, useRouter } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';

import Logo from '@/public/images/svg/logo-en.svg';
import LogoCosmos from '@/public/images/svg/uzcosmos_logo_white.svg';
import ExitIcon from '@/public/images/header/exit-icon.svg';
import Inoman from '@/public/images/header/inoman.svg';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const t = useTranslations('header');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
    setShowConfirm(false);
  };

  return (
    <header className={styles.custom}>
      <nav className={styles.navContent}>
        <div className="flex items-center justify-between gap-10">
          <Link href="/">
            <Logo className="h-[30px] w-auto" />
          </Link>
          <a href="https://uzspace.uz/ru" target="_blank" rel="noopener noreferrer">
            <LogoCosmos className="h-[55px] w-auto" />
          </a>
        </div>

        <ul className={styles.navLinks}>
          <li>
            <Link href="/">
              {t('stepToMoon')}
            </Link>
          </li>
        </ul>

        {/* Right side */}
        <div className={styles.authButtons}>
          {!isLoggedIn ? (
            <>
              <LanguageSwitcher />
              <Link href="/login" className={styles.loginBtn}>
                {t('logIn')}
              </Link>
            </>
          ) : (
            <>
              <Link href="/">
                <Inoman />
              </Link>
              <LanguageSwitcher />
              <button onClick={() => setShowConfirm(true)}>
                <ExitIcon />
              </button>
            </>
          )}
        </div>
      </nav>
      {showConfirm && (
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <h2 className={styles.title}>{t('confirmLogout')}</h2>
            <p className={styles.message}>{t('confirmMessage')}</p>
            <div className={styles.actions}>
              <button onClick={handleLogout} className={`${styles.button} ${styles.logout}`}>
                {t('yesLogout')}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className={`${styles.button} ${styles.cancel}`}
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
