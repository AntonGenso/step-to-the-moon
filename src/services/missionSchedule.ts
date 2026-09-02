/**
 * When a mission becomes available.
 *
 * The admin panel schedules missions in Tashkent time and the API stores the
 * moment in UTC, so the comparison here is a plain instant comparison — the
 * viewer's own timezone never enters into it. Only the label is rendered in
 * Tashkent time, because that is the schedule the academy publishes.
 */

export const MISSION_TIMEZONE = 'Asia/Tashkent';

/** A mission with no date has always been open. */
export const isMissionOpen = (opensAt?: string | null): boolean => {
  if (!opensAt) return true;

  const at = new Date(opensAt).getTime();
  return Number.isNaN(at) || at <= Date.now();
};

/**
 * «01.09, 09:00» — short enough for a card, in Tashkent time.
 *
 * The year is added only when the date falls outside the current one, so the
 * usual case stays compact.
 */
export const formatOpensAt = (opensAt: string, locale: string): string => {
  const date = new Date(opensAt);
  if (Number.isNaN(date.getTime())) return '';

  const thisYear =
    new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: MISSION_TIMEZONE }).format(date) ===
    new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: MISSION_TIMEZONE }).format(
      new Date()
    );

  return new Intl.DateTimeFormat(locale === 'uz' ? 'uz-UZ' : 'ru-RU', {
    day: '2-digit',
    month: '2-digit',
    ...(thisYear ? {} : { year: 'numeric' }),
    hour: '2-digit',
    minute: '2-digit',
    timeZone: MISSION_TIMEZONE,
  }).format(date);
};
