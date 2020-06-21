import { useState } from 'react';

export function useUserInput<T>(): [
  Partial<T> | undefined,
  (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => void,
] {
  const [userInput, setUserInput] = useState<Partial<T>>();

  const updateUserInput = (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInput({ ...userInput, ...{ [key]: e.target.value } });

  return [userInput, updateUserInput];
}
