/**
 * The mission catalog for the game UI.
 *
 * Missions come from the database (sttm-admin edits them, `GET /api/missions`
 * serves them) — nothing here is hardcoded any more. One database row can show
 * up as two cards: the mission itself (video + game) and, when a handout for
 * the student exists, the bonus card (instruction + upload). They share the
 * mission id, so the card id carries the `-bonus` suffix to tell them apart in
 * routes and list keys.
 */

import type { MissionDetail, MissionFactPayload, MissionListItem } from './sttmServer';
import { toAssetUrl } from './assetUrl';

export interface MissionFact {
  id: number;
  title: string;
  /**
   * Optional i18n key. Facts entered in the admin panel carry their text, so
   * this stays unset for them; it is kept for translated content.
   */
  key?: string;
  description: string;
  /** Empty when the fact was saved without a picture. */
  image: string;
}

/** One card as the mission screens render it. */
export interface MissionView {
  /** Identifies the card in routes: `"27"` for a mission, `"27-bonus"`. */
  cardId: string;
  /** `missions.id` — the key for progress lookups and score submission. */
  id: number;
  type: 'current' | 'bonus';
  title: string;
  /** Number the admin gave the mission; the bonus card shares it. */
  level: number;
  /** Bonus cards carry no reward, so their XP is not set and not shown. */
  xp?: number;
  /** Cover uploaded in the admin panel. */
  icon: string | null;
  gameLink: string;
  videoLink: string;
  /** Student handout per locale; only the bonus card ever has one. */
  fileLinks?: Record<string, string>;
  /**
   * The catalog has no facts yet — the database does not store them, so this
   * stays empty until it does. The UI already hides the section when it is.
   */
  facts: MissionFact[];
}

const BONUS_SUFFIX = '-bonus';

/** Splits `"27-bonus"` into the mission id and which of the two cards it is. */
export const parseCardId = (cardId: string): { id: number; isBonus: boolean } => {
  const isBonus = cardId.endsWith(BONUS_SUFFIX);
  const id = Number(isBonus ? cardId.slice(0, -BONUS_SUFFIX.length) : cardId);
  return { id, isBonus };
};

/** Progress key used by `/api/profile`, keyed by the database mission id. */
export const missionProgressKey = (missionId: number) => `mission_${missionId}`;

const pickLocalized = (assets: { ru: string | null; uz: string | null }, locale: string): string =>
  toAssetUrl(locale === 'uz' ? assets.uz || assets.ru : assets.ru || assets.uz);

/** Facts as the screens render them, with the locale already resolved. */
const pickText = (text: { ru: string | null; uz: string | null }, locale: string): string =>
  (locale === 'uz' ? text.uz || text.ru : text.ru || text.uz) ?? '';

const toFacts = (facts: MissionFactPayload[], locale: string): MissionFact[] =>
  facts.map((fact) => ({
    id: fact.id,
    title: pickText(fact.title, locale),
    description: pickText(fact.description, locale),
    image: toAssetUrl(fact.image_url),
  }));

/**
 * Expands the catalog into cards: every mission, followed by its bonus card
 * when a handout exists. `level` numbers them the way they are shown.
 */
const toCards = (missions: MissionListItem[], locale: string): MissionView[] => {
  const cards: MissionView[] = [];

  for (const mission of missions) {
    const title = mission.label ?? mission.name;
    const icon = toAssetUrl(mission.cover_url) || null;

    cards.push({
      cardId: String(mission.id),
      id: mission.id,
      type: 'current',
      title,
      level: mission.level,
      xp: mission.xp,
      icon,
      gameLink: mission.game_link ?? '',
      videoLink: pickLocalized(mission.video, locale),
      // The catalog does not carry facts; the mission screen fetches them.
      facts: [],
    });

    if (mission.has_document) {
      cards.push({
        cardId: `${mission.id}${BONUS_SUFFIX}`,
        id: mission.id,
        type: 'bonus',
        title,
        // The bonus belongs to the same mission, so it repeats its number.
        level: mission.level,
        icon,
        gameLink: '',
        videoLink: '',
        facts: [],
      });
    }
  }

  return cards;
};

/**
 * The list is the same for everyone and changes only when an admin edits a
 * mission, so one fetch per page load is plenty. Keyed by locale because the
 * video differs between them.
 */
let cache: { locale: string; cards: Promise<MissionView[]> } | null = null;

export const getMissionCards = (locale: string): Promise<MissionView[]> => {
  if (cache?.locale === locale) return cache.cards;

  const cards = fetch('/api/missions', { cache: 'no-store' })
    .then(async (res) => {
      if (!res.ok) throw new Error('Failed to load missions');
      return toCards((await res.json()) as MissionListItem[], locale);
    })
    .catch((error) => {
      cache = null; // a failed load must not be served to the next caller
      throw error;
    });

  cache = { locale, cards };
  return cards;
};

/**
 * One card with its files. The handout links are signed and short-lived, so
 * they are fetched per view rather than cached with the list.
 */
export const getMissionCard = async (
  cardId: string,
  locale: string
): Promise<MissionView | null> => {
  const { id, isBonus } = parseCardId(cardId);
  if (!Number.isInteger(id) || id <= 0) return null;

  const res = await fetch(`/api/missions/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const detail = (await res.json()) as MissionDetail;

  const fileLinks: Record<string, string> = {};
  if (detail.documents.ru.url) fileLinks.ru = toAssetUrl(detail.documents.ru.url);
  if (detail.documents.uz.url) fileLinks.uz = toAssetUrl(detail.documents.uz.url);

  return {
    cardId,
    id,
    type: isBonus ? 'bonus' : 'current',
    title: detail.label ?? detail.name,
    level: detail.level,
    xp: isBonus ? undefined : detail.xp,
    icon: toAssetUrl(detail.cover_url) || null,
    gameLink: isBonus ? '' : (detail.game_link ?? ''),
    videoLink: isBonus
      ? ''
      : pickLocalized({ ru: detail.video.ru.url, uz: detail.video.uz.url }, locale),
    fileLinks: Object.keys(fileLinks).length ? fileLinks : undefined,
    // Facts belong to the mission itself, not to its bonus handout.
    facts: isBonus ? [] : toFacts(detail.facts ?? [], locale),
  };
};
