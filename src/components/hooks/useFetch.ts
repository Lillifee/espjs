import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { ActionTypes, createActions } from '../../helpers';
import { useDebounce } from './useDebounce';
import { useTimer } from './useTimer';

const toQueryString = <T>(obj: T) =>
  Object.entries(obj)
    .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value || ''))
    .join('&');

export interface FetchState<T> {
  data: T;
  fetch: T;
  input?: Partial<T>;
  isLoading: boolean;
  isUpdating: boolean;
}

/**
 * Create fetch and update reducer with typed actions
 * @template T Type of request data
 */
const createFetchSlice = <T>() => {
  const actions = createActions({
    FETCH: () => undefined,
    FETCH_SUCCESS: (data: T) => data,
    FETCH_FAILURE: (error: Error) => error,
    UPDATE: () => undefined,
    UPDATE_SUCCESS: () => undefined,
    UPDATE_FAILURE: (error: Error) => error,
    USER_INPUT: (data: Partial<T>) => data,
  });

  type FetchActions = ActionTypes<typeof actions>;

  const reducer = (state: FetchState<T>, action: FetchActions) => {
    // TODO handle failure
    switch (action.type) {
      case 'FETCH':
        return { ...state, isLoading: state.isLoading ? true : false };
      case 'FETCH_SUCCESS':
        return { ...state, fetch: action.payload, data: { ...action.payload, ...state.input }, isLoading: false };
      case 'UPDATE':
        return { ...state, input: undefined, isUpdating: true };
      case 'UPDATE_SUCCESS':
        return { ...state, isUpdating: false };
      case 'USER_INPUT':
        const input = { ...state.input, ...action.payload };
        return { ...state, input, data: { ...state.fetch, ...input } };
      default:
        return state;
    }
  };

  return { reducer, actions };
};

/**
 * Fetch and post data
 *
 * @template T type of the response
 * @param url url to fetch
 * @param data default data
 */
export const useFetch = <T>(
  url: RequestInfo,
  data: T,
  options: {
    refreshInterval?: number;
    updateDebounce?: number;
    updateMethod?: 'POST' | 'URI';
  } = {},
): [FetchState<T>, (data?: Partial<T>) => void, (data: Partial<T>) => void, () => void] => {
  const { refreshInterval, updateDebounce, updateMethod = 'URI' } = options;

  // Create and initialize reducer and actions
  const { reducer, actions } = useMemo(() => createFetchSlice<T>(), []);
  const [state, dispatch] = useReducer(reducer, { isLoading: true, isUpdating: false, data, fetch: data });

  // Abort controller to cancel the fetch and update
  const abortFetch = useRef(new AbortController());
  const abortUpdate = useRef(new AbortController());

  // Fetch data callback
  const fetchData = useCallback(() => {
    abortFetch.current = new AbortController();
    dispatch(actions.FETCH());

    fetch(url, { signal: abortFetch.current.signal })
      .then((res) => res.json())
      .then((json: T) => dispatch(actions.FETCH_SUCCESS(json)))
      .catch((error: Error) => {
        if (!abortFetch.current.signal.aborted) {
          dispatch(actions.FETCH_FAILURE(error));
        }
      });
  }, [url, actions]);

  // Refresh timer
  const [startRefresh, stopRefresh] = useTimer(fetchData, refreshInterval);

  // Post the user input
  const postData = useCallback(
    (data: Partial<T>) => {
      abortUpdate.current = new AbortController();
      dispatch(actions.UPDATE());

      const updateFetch =
        updateMethod === 'URI'
          ? fetch(`${url}?${toQueryString(data)}`, { signal: abortUpdate.current.signal })
          : fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
              signal: abortUpdate.current.signal,
            });

      // Post the updated data
      updateFetch
        // .then((res) => res.json())
        .then(() => dispatch(actions.UPDATE_SUCCESS()))
        .catch((error: Error) => {
          if (!abortUpdate.current.signal.aborted) {
            dispatch(actions.UPDATE_FAILURE(error));
          }
        })
        .finally(startRefresh);
    },
    [actions, updateMethod, url, startRefresh],
  );

  // Debounce the update
  const [updateDebounced] = useDebounce(postData, updateDebounce);

  // Update the user input
  const update = (newInput?: Partial<T>) => {
    stopRefresh();
    abortFetch.current.abort();
    abortUpdate.current.abort();
    newInput && dispatch(actions.USER_INPUT(newInput));
    updateDebounced({ ...state.input, ...newInput });
  };

  const setInput = (value: Partial<T>) => dispatch(actions.USER_INPUT(value));

  // Fetch data on mount
  useEffect(() => {
    fetchData();
    startRefresh();

    // Abort fetch on unload
    return () => {
      abortUpdate.current.abort();
      abortFetch.current.abort();
    };
  }, [fetchData, startRefresh]);

  return [state, update, setInput, fetchData];
};

export const onChangeInput =
  <T>(setInputAction: (data: Partial<T>) => void, key: keyof T) =>
  (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputAction({ [key]: e.target.value } as any);

export interface FetchStateA<T> {
  data: T;
  isLoading: boolean;
  error?: Error;
}

/**
 * Create fetch and update reducer with typed actions
 * @template T Type of request data
 */
const createFetchSliceA = <T>() => {
  const actions = createActions({
    FETCH: () => undefined,
    FETCH_SUCCESS: (data: T) => data,
    FETCH_FAILURE: (error: Error) => error,
  });

  const reducer = (state: FetchStateA<T>, action: ActionTypes<typeof actions>) => {
    switch (action.type) {
      case 'FETCH':
        return { ...state, error: undefined };
      case 'FETCH_SUCCESS':
        return { ...state, isLoading: false, data: action.payload };
      case 'FETCH_FAILURE':
        return { ...state, isLoading: false, error: action.payload };
      default:
        return state;
    }
  };

  return { reducer, actions };
};

/**
 * Fetch data
 *
 * @template T type of the response
 * @param url url to fetch
 * @param data default data
 */
export const useFetchData = <T>(url: RequestInfo, data: T): [() => void, () => void, FetchStateA<T>] => {
  // Create and initialize reducer and actions
  const { reducer, actions } = useMemo(() => createFetchSliceA<T>(), []);
  const [state, dispatch] = useReducer(reducer, { isLoading: true, data });

  // Abort controller to cancel the fetch
  const abortFetchRef = useRef(new AbortController());
  const abortFetch = () => abortFetchRef.current.abort();
  useEffect(() => abortFetch, []);

  // Fetch callback
  const fetchData = useCallback(() => {
    abortFetchRef.current = new AbortController();
    dispatch(actions.FETCH());

    fetch(url, { signal: abortFetchRef.current.signal })
      .then((res) => res.json())
      .then((json: T) => dispatch(actions.FETCH_SUCCESS(json)))
      .catch((error: Error) => {
        if (!abortFetchRef.current.signal.aborted) {
          dispatch(actions.FETCH_FAILURE(error));
        }
      });
  }, [url, actions]);

  return [fetchData, abortFetch, state];
};

export interface UpdateState {
  isUpdating: boolean;
  error?: Error;
}

/**
 * Create fetch and update reducer with typed actions
 * @template T Type of request data
 */
const createUpdateSliceA = () => {
  const actions = createActions({
    UPDATE: () => undefined,
    UPDATE_SUCCESS: () => undefined,
    UPDATE_FAILURE: (error: Error) => error,
  });

  const reducer = (state: UpdateState, action: ActionTypes<typeof actions>) => {
    switch (action.type) {
      case 'UPDATE':
        return { ...state, isUpdating: true };
      case 'UPDATE_SUCCESS':
        return { ...state, isUpdating: false };
      case 'UPDATE_FAILURE':
        return { ...state, isUpdating: false, error: action.payload };
      default:
        return state;
    }
  };

  return { reducer, actions };
};

type UpdateOptions = {
  updateMethod?: 'POST' | 'URI';
};

/**
 * Fetch and post data
 *
 * @template T type of the response
 * @param url url to fetch
 * @param data default data
 */
export const useUpdate = <T>(
  url: RequestInfo,
  options: UpdateOptions = {},
): [(data: Partial<T>) => void, () => void, UpdateState] => {
  const { updateMethod = 'URI' } = options;

  // Create and initialize reducer and actions
  const { reducer, actions } = useMemo(() => createUpdateSliceA(), []);
  const [state, dispatch] = useReducer(reducer, { isUpdating: false });

  // Abort controller to cancel the fetch and update
  const abortUpdateRef = useRef(new AbortController());
  const abortUpdate = () => abortUpdateRef.current.abort();
  useEffect(() => abortUpdate, []);

  // Post the user input
  const update = useCallback(
    (data: Partial<T>) => {
      abortUpdateRef.current = new AbortController();
      dispatch(actions.UPDATE());

      const updateFetch =
        updateMethod === 'URI'
          ? fetch(`${url}?${toQueryString(data)}`, { signal: abortUpdateRef.current.signal })
          : fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
              signal: abortUpdateRef.current.signal,
            });

      // Post the updated data
      updateFetch
        .then(() => dispatch(actions.UPDATE_SUCCESS()))
        .catch((error: Error) => {
          if (!abortUpdateRef.current.signal.aborted) {
            dispatch(actions.UPDATE_FAILURE(error));
          }
        });
    },
    [url, actions, updateMethod],
  );

  return [update, abortUpdate, state];
};

// /**
//  * Fetch and post data
//  *
//  * @template T type of the response
//  * @param url url to fetch
//  * @param data default data
//  */
// export const useFetchAndUpdate = <T>(
//   url: RequestInfo,
//   data: T,
//   options: UpdateOptions & FetchAndUpdateOptions = {},
// ): [FetchStateA<T>, (data: Partial<T>) => void, () => void] => {
//   const { refreshInterval = 1000, updateDebounce = 1000 } = options;

//   // fetch hook
//   const [fetchData, abortFetch, state] = useFetchData(url, data);

//   // update hook
//   const [updateData, abortUpdate] = useUpdate<T>(url, options);

//   // Refresh timer
//   useTimer(fetchData, refreshInterval);

//   // Debounce the update
//   const [updateDebounced] = useDebounce(updateData, updateDebounce);

//   const [userInput, setUserInput] = useState<Partial<T>>();

//   const updateUserInput = (key: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) =>
//     setUserInput({ ...userInput, ...{ [key]: e.target.value } });

//   const clearUserInput = () => setUserInput(undefined);

//   // Update the user input
//   const update = (newInput: Partial<T>) => {
//     setUserInput((prev) => ({ ...prev, ...newInput }));

//     stopRefresh();
//     abortFetch();
//     abortUpdate();
//     dispatch(actions.USER_INPUT(newInput));
//     updateDebounced({ ...state.data, ...state.input, ...newInput });
//   };

//   // // Fetch data on mount
//   // useEffect(() => {
//   //   fetchData();
//   //   startRefresh();
//   // }, [fetchData, startRefresh]);

//   return [state, update, fetchData];
// };
