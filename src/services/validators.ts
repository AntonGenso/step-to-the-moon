export const NICKNAME_REGEX = /^[a-zA-Z0-9_]{2,16}$/;
export const PIN_REGEX = /^\d{4}$/;

export const validateNickname = (nickname: string): string | null => {
  if (!nickname.trim()) return 'Enter your nickname';
  if (nickname.length < 2) return 'Nickname must be at least 2 characters';
  if (nickname.length > 16) return 'Nickname must be at most 16 characters';
  if (!NICKNAME_REGEX.test(nickname))
    return 'Only letters, numbers and underscore allowed';
  return null;
};

export const validatePin = (pin: string): string | null => {
  if (!pin) return 'Enter your PIN';
  if (!PIN_REGEX.test(pin)) return 'PIN must be exactly 4 digits';
  return null;
};
