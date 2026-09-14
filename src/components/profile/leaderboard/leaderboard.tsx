'use client';

import React from 'react';
import styles from './leaderboard.module.scss';
import { useAuth } from '@/src/context/AuthContext';
import { useLeaderboard } from '@/src/hooks/useLeaderboard';
// import { GlassFrame } from '@/src/uikit/glass-frame/GlassFrame';
import { useTranslations } from 'next-intl';
import StarIcon from '@/public/images/svg/mobile/other/star.svg';
import Image from 'next/image';

export default function Leaderboard() {
  const {
    players,
    page,
    totalPages,
    loading,
    search,
    myClassOnly,
    setPage,
    setSearch,
    setMyClassOnly,
  } = useLeaderboard();
  const { nickname } = useAuth();
  const t = useTranslations('leaderboard');
  const tc = useTranslations('common');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('title')}</h2>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      <div className="w-[70%] rounded-lg p-4">
        <div className={styles.filters}>
          <input
            type="search"
            className={styles.searchInput}
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={t('searchPlaceholder')}
          />
          <button
            type="button"
            className={`${styles.filterButton} ${myClassOnly ? styles.filterButtonActive : ''}`}
            onClick={() => setMyClassOnly(!myClassOnly)}
            aria-pressed={myClassOnly}
          >
            {myClassOnly ? t('allPlayers') : t('myClass')}
          </button>
        </div>

        {/* <div className={styles.headerRow}>
          <span className={styles.colHash}>{t('hash')}</span>
          <span className={styles.colName}>{t('name')}</span>
          <span className={styles.colStars}>{t('stars')}</span>
          <span className={styles.colScore}>{t('score')}</span>
          <span className={styles.colTotal}>{t('total')}</span>
        </div> */}

        <div className={`${styles.playerList}`}>
          {players.map((p) => {
            const isMe = p.nickname === nickname;
            // Top-3 styling follows the real place, so page 2 has no podium.
            const rankClass = [styles.rank1, styles.rank2, styles.rank3][p.position - 1] ?? '';
            return (
              <div
                key={p.nickname}
                className={`${styles.playerRow} ${rankClass} ${isMe ? styles.playerRowMe : ''}`}
              >
                <span className={styles.colHash}>{p.position}</span>
                <div className={styles.colName}>
                  <div className={styles.avatar}>
                    <Image
                      src="/images/profile/skin/svg/boy_dark.svg"
                      alt={p.nickname}
                      className={styles.avatarImg}
                      width={32}
                      height={32}
                    />
                  </div>
                  <span className={styles.playerName}>{isMe ? t('you') : p.nickname}</span>
                </div>

                <div className={styles.colStars}>
                  <div className={styles.badge}>
                    <span className={styles.badgeValue}>{p.stars}</span>
                    <StarIcon className={styles.starIcon} />
                  </div>
                </div>

                <div className={styles.colScore}>
                  <div className={styles.badge}>
                    <span className={styles.badgeValue}>{p.score}</span>
                    <span className={styles.badgeUnit}>{tc('xp').toLowerCase()}</span>
                  </div>
                </div>

                <div className={styles.colTotal}>
                  <div className={styles.totalBox}>{p.total}</div>
                </div>
              </div>
            );
          })}

          {!players.length && !loading && <p className={styles.empty}>{t('nothingFound')}</p>}
        </div>

        {totalPages > 1 && (
          <div className={styles.pager}>
            <button
              type="button"
              className={styles.pagerButton}
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              {t('prev')}
            </button>
            <span className={styles.pagerCounter}>{t('pageOf', { page, pages: totalPages })}</span>
            <button
              type="button"
              className={styles.pagerButton}
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
            >
              {t('next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
