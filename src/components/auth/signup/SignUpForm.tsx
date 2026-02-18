'use client';

import { instance } from '@/src/services/api';
import axios from 'axios';
import { useState } from 'react';

export const SignUpForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const classId = 1;

  const handleSignUp = async () => {
    try {
      const { data } = await axios.post('/api/auth/signup', {
        username: userName,
        password,
        class_id: classId,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log({
    //   username: userName,
    //   password,
    //   class_id: classId,
    // });
    handleSignUp();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[400px] flex-col gap-[14px] rounded-[20px] border-[1px] border-sky-500 p-[32px] shadow-md backdrop-blur-md"
    >
      <p className="text-center text-[30px] font-semibold">Registration</p>
      <input
        value={userName}
        placeholder="add name"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        className="rounded-md border-[1px] border-sky-500 p-[10px]"
      />
      <input
        value={password}
        placeholder="add password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="rounded-md border-[1px] border-sky-500 p-[10px]"
      />
      <button
        className="cursor-pointer rounded-md bg-sky-500 p-[10px] duration-300 hover:bg-sky-600"
        type="submit"
      >
        Signup
      </button>
    </form>
  );
};
