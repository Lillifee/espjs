import { useEffect, useCallback, useReducer, useMemo, useRef } from 'react';
import { ActionTypes, createActions } from '../../helpers';

const toQueryString = <T>(obj: T) =>
  Object.entries(obj)
    .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value || ''))
    .join('&');

export interface FetchState<T> {
  data: T;
  isLoading: boolean;
  isError: boolean;
  isUpdating: boolean;
  isInitial?: boolean;
}

const createFetchSlice = <T>() => {
  const actions = createActions({
    FETCH_INIT: () => undefined,
    FETCH_SUCCESS: (data: T) => data,
    FETCH_FAILURE: (error: Error) => error,
    FETCH_UPDATE: (data: Partial<T>) => data, // TODO check data necessary
  });

  type FetchActions = ActionTypes<typeof actions>;

  const reducer = (state: FetchState<T>, action: FetchActions) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: state.isInitial ? true : false,
          isInitial: false,
          isError: false,
          isUpdating: false,
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          isUpdating: false,
          data: action.payload,
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: true,
          isError: true,
          isUpdating: false,
        };
      case 'FETCH_UPDATE':
        return {
          ...state,
          isLoading: true,
          isError: false,
          isUpdating: true,
          data: { ...state.data, ...action.payload },
        };
      default:
        throw new Error();
    }
  };

  return {
    actions,
    reducer,
  };
};

export const useFetch = <T>(
  url: RequestInfo,
  initialData: T,
  updateInterval?: number,
): { state: FetchState<T>; refresh: () => void; update: (data: Partial<T>) => void } => {
  const { reducer, actions } = useMemo(() => createFetchSlice<T>(), []);
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isUpdating: false,
    isError: false,
    isInitial: true,
    data: initialData,
  });

  const abort = useRef(new AbortController());

  const fetchData = useCallback(async () => {
    dispatch(actions.FETCH_INIT());

    await fetch(url, { signal: abort.current.signal })
      .then((res) => res.json().then((json) => dispatch(actions.FETCH_SUCCESS(json))))
      .catch((error) => !abort.current.signal.aborted && dispatch(actions.FETCH_FAILURE(error)));

    updateInterval && setTimeout(() => fetchData(), updateInterval);
  }, [abort]);

  useEffect(() => {
    fetchData();
    return () => abort.current.abort();
  }, [fetchData, abort]);

  const update = useCallback(
    async (result: Partial<T>) => {
      dispatch(actions.FETCH_UPDATE(result));
      await fetch(`${url}?${toQueryString(result)}`);
      setTimeout(() => window.location.reload(), 1000);
    },
    [url],
  );

  return { state, refresh: fetchData, update };
};
