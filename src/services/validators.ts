import { containsProfanity } from './profanity';

// Nicknames may be written in Latin or Cyrillic and may contain spaces so that
// a full name ("John Connor", "Иван Петров") is a valid nickname. Spaces are
// only allowed between words: no leading, trailing or repeated ones.
const NICKNAME_WORD = '[A-Za-z\\u0400-\\u04FF0-9_]+';

export const NICKNAME_MIN_LENGTH = 2;
export const NICKNAME_MAX_LENGTH = 32;
export const NICKNAME_REGEX = new RegExp(`^${NICKNAME_WORD}(?: ${NICKNAME_WORD})*$`);
export const PIN_REGEX = /^\d{4}$/;

export const validateNickname = (nickname: string): string | null => {
  const value = nickname.trim();
  if (!value) return 'enterNickname';
  if (value.length < NICKNAME_MIN_LENGTH) return 'nicknameTooShort';
  if (value.length > NICKNAME_MAX_LENGTH) return 'nicknameTooLong';
  if (!NICKNAME_REGEX.test(value)) return 'nicknameChars';
  return null;
};

/**
 * Signup-only: the same shape rules plus the profanity check. Login keeps
 * using `validateNickname`, so an account created before a word entered the
 * list can still sign in.
 */
export const validateNewNickname = (nickname: string): string | null => {
  const shapeError = validateNickname(nickname);
  if (shapeError) return shapeError;
  if (containsProfanity(nickname.trim())) return 'nicknameProfanity';
  return null;
};

export const validatePin = (pin: string): string | null => {
  if (!pin) return 'enterPin';
  if (!PIN_REGEX.test(pin)) return 'pinFormat';
  return null;
};
