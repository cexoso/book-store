/* istanbul ignore file */
// 浏览器连接层，无法测试
import { injectable } from "inversify";
import { IPersistence } from "./index";

@injectable()
export class Persistence implements IPersistence {
  public setItem<T>(key: string, value: T) {
    try {
      const content = JSON.stringify(value);
      localStorage.setItem(key, content);
    } catch (error) {
      return [error as any, false] as const;
    }
    return [null, true] as const;
  }
  public getItem(key: string) {
    try {
      const content = localStorage.getItem(key);
      if (content === null) {
        return [null, null] as const;
      }
      const value = JSON.parse(content);
      return [null, value] as const;
    } catch (error) {
      return [error, null] as const;
    }
  }
}
