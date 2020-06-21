import { useState, useEffect, useCallback } from 'react';

const toQueryString = <T>(obj: T) =>
  Object.entries(obj)
    .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value || ''))
    .join('&');

export function useFetch<T>(input: RequestInfo): [T | undefined, boolean, () => void, (result: Partial<T>) => void] {
  const [response, setResponse] = useState(undefined);
  // const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const refresh = useCallback(() => setRefreshCount(refreshCount + 1), [refreshCount]);
  const update = useCallback((result: Partial<T>) => fetch(`${input}?${toQueryString(result)}`), [input]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(input);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
        // setError(error);
      }
    };
    fetchData();
  }, [refreshCount]);

  // throw the error - error boundary will take care about this.
  // if (error) throw error;

  return [response, isLoading, refresh, update];
}
