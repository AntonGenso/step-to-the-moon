export const NICKNAME_REGEX = /^[a-zA-Z0-9_]{2,16}$/;
export const PIN_REGEX = /^\d{4}$/;

export const validateNickname = (nickname: string): string | null => {
  if (!nickname.trim()) return 'enterNickname';
  if (nickname.length < 2) return 'nicknameTooShort';
  if (nickname.length > 16) return 'nicknameTooLong';
  if (!NICKNAME_REGEX.test(nickname)) return 'nicknameChars';
  return null;
};

export const validatePin = (pin: string): string | null => {
  if (!pin) return 'enterPin';
  if (!PIN_REGEX.test(pin)) return 'pinFormat';
  return null;
};
