'use client';

import styles from './MobileLeaderboard.module.scss';
import { useAuth } from '@/src/context/AuthContext';
import { useLeaderboard } from '@/src/hooks/useLeaderboard';
import StarIcon from '@/public/images/svg/mobile/other/star.svg';
import { GlassFrame } from '@/src/uikit/glass-frame/GlassFrame';
import { useTranslations } from 'next-intl';

export const MobileLeaderboard = () => {
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('title')}</h2>
      <p className={styles.subtitle}>{t('subtitle')}</p>

      <GlassFrame innerClassName="!p-[20px]">
        {/* Filters — name search + "my class" toggle */}
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

        {/* Column headers */}
        <div className={styles.headerRow}>
          <span className={styles.colHash}>{t('hash')}</span>
          <span className={styles.colName}>{t('name')}</span>
          <span className={styles.colStars}>{t('stars')}</span>
          <span className={styles.colScore}>{t('score')}</span>
          <span className={styles.colTotal}>{t('total')}</span>
        </div>

        {/* Player rows */}
        <div className={`mt-6 flex flex-col gap-5`}>
          {players.map((p) => {
            const isMe = p.nickname === nickname;
            return (
              <div
                key={p.nickname}
                className={`flex items-center rounded-[23px] bg-gradient-to-r ${isMe ? 'from-[#FF7B1D] to-[#FFCB78] shadow-[0px_0px_50px_0px_#FF7B1D80,0px_0px_5px_0px_#FF7B1D]' : 'from-[#006D86] to-[#2FE4D3]'} p-[2px]`}
              >
                <div className="flex h-full w-full items-center rounded-[23px] bg-[#0a1f26] p-[12px_14px]">
                  <span className={styles.colHash}>{p.position}</span>
                  <div className={styles.colName}>
                    <div className={styles.avatar}>
                      <StarIcon className={styles.starIcon} />
                    </div>
                    <span>{isMe ? t('you') : p.nickname}</span>
                  </div>
                  <span className={styles.colStarsValue}>{p.stars}</span>
                  <span className={styles.colScoreValue}>{p.score}</span>
                  <div className={styles.colTotalValue}>
                    <span className={styles.totalNumber}>{p.total}</span>
                  </div>
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
      </GlassFrame>
    </div>
  );
};
