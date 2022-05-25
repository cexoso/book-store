import { injectable } from "inversify";
import { IPersistence } from './index';

@injectable()
export class Persistence implements IPersistence {
  public mockCache = new Map<string, any>(); // 装假自己这一个持久化缓存
  public setItem(key: string, value: any) {
    this.mockCache.set(key, value);
    return [null, true] as const;
  }
  public getItem<T extends null>(key: string) {
    const value = this.mockCache.get(key);
    if (value === undefined) {
      return [null, null] as const;
    }
    return [null, value as T] as const;
  }
}
