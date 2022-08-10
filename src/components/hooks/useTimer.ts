import { useCallback, useEffect, useRef } from 'react';

/**
 * Timer hook with callback and interval
 *
 * @param callback Callback function
 * @param interval interval in ms
 * @return [ start : () => void, stop: () => void ]
 */
export const useTimer = (
  callback: () => void,
  interval?: number,
): [
  () => void, // Start timer
  () => void, // Stop timer
] => {
  // Reference of running timer
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  // Clear timer
  const stop = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  // Start the timer
  const start = useCallback(() => {
    stop();
    if (interval) {
      timeout.current = setTimeout(() => {
        callback();
        start();
      }, interval);
    }
  }, [callback, interval]);

  // Clear timer on unmount
  useEffect(() => {
    callback();
    start();
    return stop;
  }, [callback, start]);

  return [start, stop];
};
