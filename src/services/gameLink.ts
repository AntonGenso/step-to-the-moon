/**
 * Builds the URL a mission's game is opened with.
 *
 * Games run in an iframe and report their result back with
 * `postMessage({ type: 'SUBMIT_SCORE', score })`; the platform then credits the
 * student it has in the session cookie. So a game needs to know neither who is
 * playing nor where the API is, and a link from the admin panel is used as it
 * was entered.
 *
 * The two placeholders below come from the older links, where the game called
 * the API itself. They are still substituted so those links keep working, but
 * nothing new needs them.
 */

const USER_PLACEHOLDER = 'USER_ID';
const ORIGIN_PLACEHOLDER = 'https://your-platform.com';

export const resolveGameLink = (
  link: string,
  { nickname, origin }: { nickname?: string | null; origin?: string }
): string => {
  if (!link) return '';

  return link
    .replace(USER_PLACEHOLDER, encodeURIComponent(nickname ?? ''))
    .replace(ORIGIN_PLACEHOLDER, origin ?? '');
};
