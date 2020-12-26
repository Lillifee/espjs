import { useState } from 'react';

export function useUserInput<T>(): [
  Partial<T> | undefined,
  (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
  React.Dispatch<React.SetStateAction<Partial<T> | undefined>>,
] {
  const [userInput, setUserInput] = useState<Partial<T>>();

  const updateUserInput = (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInput({ ...userInput, ...{ [key]: e.target.value } });

  const clearUserInput = () => setUserInput(undefined);

  return [userInput, updateUserInput, clearUserInput, setUserInput];
}
