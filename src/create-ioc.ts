import "reflect-metadata";
import { Container } from "inversify";
import { BookStore } from "./model/book-store/book-store";
import { IPersistence, Persistence } from "./service/persistence/index";
import { Persistence as BrowserPersistence } from "./service/persistence/persistence";
import { Request, IRequest } from "./service/request";
import axios from "axios";

import { StoreController } from "./controller/store/store.controller";

export function createIOC() {
  const container = new Container();
  container.bind(BookStore).toSelf().inSingletonScope();
  container
    .bind<IPersistence>(Persistence)
    .to(BrowserPersistence)
    .inSingletonScope();

  // 直接将 Request 绑定到 axios 实例
  container
    .bind<IRequest>(Request)
    .toDynamicValue(() => axios)
    .inSingletonScope();
  container.bind(StoreController).toSelf().inSingletonScope();

  return container;
}
