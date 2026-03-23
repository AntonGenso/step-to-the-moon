'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/src/services/firebase';
import {
  nicknameToEmail,
  pinToPassword,
  validateNickname,
  validatePin,
} from '@/src/services/authHelpers';

export const SignUpForm = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const nicknameError = validateNickname(nickname);
    if (nicknameError) {
      setError(nicknameError);
      return;
    }

    const pinError = validatePin(pin);
    if (pinError) {
      setError(pinError);
      return;
    }

    if (pin !== confirmPin) {
      setError('PINs do not match');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        nicknameToEmail(nickname),
        pinToPassword(pin),
      );

      await updateProfile(userCredential.user, {
        displayName: nickname.trim(),
      });

      const token = await userCredential.user.getIdToken();
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      router.push('/profile');
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          setError('This nickname is already taken');
          break;
        default:
          setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[400px] flex-col gap-[14px] rounded-[20px] border-[1px] border-sky-500 p-[32px] shadow-md backdrop-blur-md"
    >
      <p className="text-center text-[30px] font-semibold">Registration</p>
      <input
        value={nickname}
        placeholder="Nickname (2–16 characters)"
        onChange={(e) => setNickname(e.target.value)}
        className="rounded-md border-[1px] border-sky-500 p-[10px]"
        maxLength={16}
        required
      />
      <input
        type="password"
        inputMode="numeric"
        value={pin}
        placeholder="4-digit PIN"
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, '').slice(0, 4);
          setPin(v);
        }}
        className="rounded-md border-[1px] border-sky-500 p-[10px]"
        maxLength={4}
        required
      />
      <input
        type="password"
        inputMode="numeric"
        value={confirmPin}
        placeholder="Confirm PIN"
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, '').slice(0, 4);
          setConfirmPin(v);
        }}
        className="rounded-md border-[1px] border-sky-500 p-[10px]"
        maxLength={4}
        required
      />
      {error && (
        <p className="text-center text-sm text-red-500">{error}</p>
      )}
      <button
        className="cursor-pointer rounded-md bg-sky-500 p-[10px] duration-300 hover:bg-sky-600 disabled:opacity-50"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign up'}
      </button>
    </form>
  );
};
