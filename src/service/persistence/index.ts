export const Persistence = "persistence";

export type SUCCESS<T> = readonly [null, T];
export type FAIL = readonly [reason: any, value: null];

export interface IPersistence {
  setItem: (key: string, value: any) => SUCCESS<boolean> | FAIL;
  getItem: <T>(key: string) => SUCCESS<T> | FAIL;
}
