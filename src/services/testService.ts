/**
 * The test catalog for the game UI.
 *
 * Tests come from the database (sttm-admin edits them, `GET /api/tests` serves
 * them) — nothing here is hardcoded any more. The reward is ten points per
 * question, computed by the server, so a seven-question test is worth 70.
 */

import type { TestDetail, TestListItem, TestQuestionPayload } from './sttmServer';
import { toAssetUrl } from './assetUrl';

export type OptionLetter = 'A' | 'B' | 'C' | 'D';

export const OPTION_LETTERS: OptionLetter[] = ['A', 'B', 'C', 'D'];

/** One question with the locale already resolved. */
export interface TestQuestion {
  id: number;
  text: string;
  options: Record<OptionLetter, string>;
  /** Which option the quiz counts as right. */
  answer: OptionLetter;
}

/** One card as the test screens render it. */
export interface TestView {
  id: number;
  title: string;
  /** Number the admin gave the test; what the card shows. */
  level: number;
  xp: number;
  questionCount: number;
  /** Cover uploaded in the admin panel; empty when none was. */
  icon: string;
  /** When the test opens, UTC ISO 8601; null — open from the start. */
  opensAt: string | null;
  /** Only filled in by `getTestCard`; the catalog carries no questions. */
  questions: TestQuestion[];
}

/** Russian is the fallback: an empty Uzbek field means "show the Russian one". */
const pickText = (text: { ru: string; uz: string | null }, locale: string): string =>
  (locale === 'uz' ? text.uz || text.ru : text.ru || text.uz) ?? '';

const toQuestions = (questions: TestQuestionPayload[], locale: string): TestQuestion[] =>
  questions.map((question) => ({
    id: question.id,
    text: pickText(question.text, locale),
    options: Object.fromEntries(
      OPTION_LETTERS.map((letter) => [letter, pickText(question.options[letter], locale)])
    ) as Record<OptionLetter, string>,
    answer: question.correct_option,
  }));

const toCard = (test: TestListItem, locale: string, questions: TestQuestion[] = []): TestView => ({
  id: test.id,
  title: test.label ?? test.name,
  level: test.level,
  xp: test.xp,
  questionCount: test.question_count,
  icon: toAssetUrl(test.cover_url),
  opensAt: test.opens_at,
  questions,
});

/**
 * The list is the same for everyone and changes only when an admin edits a
 * test, so one fetch per page load is plenty. Keyed by locale because the
 * titles are resolved per locale.
 */
let cache: { locale: string; cards: Promise<TestView[]> } | null = null;

export const getTestCards = (locale: string): Promise<TestView[]> => {
  if (cache?.locale === locale) return cache.cards;

  const cards = fetch('/api/tests', { cache: 'no-store' })
    .then(async (res) => {
      if (!res.ok) throw new Error('Failed to load tests');
      const list = (await res.json()) as TestListItem[];
      return list.map((test) => toCard(test, locale));
    })
    .catch((error) => {
      cache = null; // a failed load must not be served to the next caller
      throw error;
    });

  cache = { locale, cards };
  return cards;
};

/**
 * One test with its questions. Returns null when the test is hidden, has not
 * opened yet, or does not exist — the backend answers 404 for all three.
 */
export const getTestCard = async (id: number, locale: string): Promise<TestView | null> => {
  if (!Number.isInteger(id) || id <= 0) return null;

  const res = await fetch(`/api/tests/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;

  const detail = (await res.json()) as TestDetail;
  return toCard(detail, locale, toQuestions(detail.questions ?? [], locale));
};

/** Progress key used by `/api/profile`, keyed by the database test id. */
export const testProgressKey = (testId: number) => `test_${testId}`;
