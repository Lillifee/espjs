import { useState, useEffect, useCallback } from 'react';

export function useFetch<T>(input: RequestInfo): [T | undefined, boolean, () => void] {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const refresh = useCallback(() => setRefreshCount(refreshCount + 1), [refreshCount]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(input);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [refreshCount]);

  // throw the error - error boundary will take care about this.
  if (error) throw error;

  return [response, isLoading, refresh];
}
