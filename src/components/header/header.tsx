'use client';
import React, { useState } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import Button from '../button/Button';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'next/navigation';

import Logo from '@/public/images/svg/logo-en.svg';
import LogoCosmos from '@/public/images/svg/uzcosmos_logo_white.svg';
import ExitIcon from '@/public/images/header/exit-icon.svg';
import Inoman from '@/public/images/header/inoman.svg';
import USA from '@/public/images/header/USA.svg';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
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
          <Link href="https://uzspace.uz/ru" target="_blank">
            <LogoCosmos className="h-[55px] w-auto" />
          </Link>
        </div>

        <ul className={styles.navLinks}>
          <li>
            <Link href="/" className="btn">
              Step to the moon
            </Link>
          </li>
        </ul>

        {/* Right side */}
        <div className={styles.authButtons}>
          {!isLoggedIn ? (
            <>
              <Link href="/">
                <USA />
              </Link>
              <Link href="/login">
                <Button text="Log In" />
              </Link>
            </>
          ) : (
            <>
              <Link href="/">
                <Inoman />
              </Link>
              <Link href="/">
                <USA />
              </Link>
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
            <h2 className={styles.title}>Confirm Logout</h2>
            <p className={styles.message}>Are you sure you want to log out?</p>
            <div className={styles.actions}>
              <button onClick={handleLogout} className={`${styles.button} ${styles.logout}`}>
                Yes, Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className={`${styles.button} ${styles.cancel}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
