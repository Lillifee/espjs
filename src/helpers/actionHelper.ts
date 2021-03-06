interface ActionCreatorsMap {
  [key: string]: (...args: any[]) => any;
}

type ActionCreatorsReturnMap<T extends ActionCreatorsMap> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => { type: K; payload: ReturnType<T[K]> };
};

export type ActionTypes<A extends ActionCreatorsMap> = ReturnType<A[keyof A]>;

export const createActions = <T extends ActionCreatorsMap>(actions: T): ActionCreatorsReturnMap<T> =>
  Object.entries(actions).reduce((result, [key, value]) => {
    result[key] = (...args: any) => ({ type: key, payload: value(...args) });
    return result;
  }, {} as any);
