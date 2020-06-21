// import { useCallback, useState } from 'react';

// export type FetchStore<Result> = {
//   reload: () => void;
//   read: () => Result;
//   update: (value: Result) => void;
// };

// export function createFetchStore<Result>(
//   fetchFunc: () => Promise<Result>,
//   update: (result: Result) => Promise<Response>,
// ) {

//   const createGetResult = () => {
//     let status = "pending";
//     let result: Result;
//     let error: Error;

//     const suspender = fetchFunc().then(
//       (r) => {
//         status = "success";
//         result = r;
//       },
//       (e) => {
//         status = "error";
//         error = e;
//       }
//     );

//     return () => {
//       if (status === "pending") {
//         throw suspender;
//       } else if (status === "error") {
//         throw error;
//       }

//       return result;
//     };

//   };

//   let request = createGetResult();

//   const refetch = () => {
//     request = createGetResult();
//   }

//   const store: FetchStore<Result> = {
//     update,
//     reload: refetch,
//     read: () => request(),
//   };
//   return store;
// }

// export function useFetch<Result>(
//   store: FetchStore<Result>,
// ) : [Result, () => void, (result:Result) => void]{

//   const [result, setResult] = useState(() => store.read());
//   const reload = useCallback(() => {
//     store.reload();
//     setResult(() => store.read());
//   }, [store]);

//   const update = useCallback((result) => {
//     store.update(result);
//     store.reload();
//     setResult(() => store.read());
//   }, [store])

//   return [result, reload, update];
// }
