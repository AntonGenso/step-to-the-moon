import React from 'react';
import styles from './Footer.module.scss';
import { FaTwitter, FaFacebookF, FaMedium, FaYoutube } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left Column */}
        <div className={styles.column}>
          <p className={styles.quote}>{t('quote')}</p>
          <div className={styles.socials}>
            <FaTwitter />
            <FaFacebookF />
            <FaMedium />
            <FaYoutube />
          </div>
        </div>

        {/* Middle Column */}
        <div className={styles.column}>
          <ul className={styles.links}>
            <li>{t('pricing')}</li>
            <li>{t('teams')}</li>
            <li>{t('education')}</li>
            <li>{t('referFriend')}</li>
            <li>{t('updates')}</li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className={styles.column}>
          <div className={styles.contact}>
            <p>
              <FiMapPin /> {t('address')}
            </p>
            <p>
              <FiPhone /> {t('phone')}
            </p>
            <p>
              <FiMail /> {t('email')}
            </p>
          </div>
        </div>

        {/* Subscribe Column */}
        <div className={styles.column}>
          <p>{t('receiveOffers')}</p>
          <form className={styles.subscribeForm}>
            <input type="email" placeholder={t('enterEmail')} />
            <button type="submit">{t('join')}</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
