import "reflect-metadata";
import { createIOC } from "./create-ioc";
import { IPersistence, Persistence } from "./service/persistence/index";
import { Request, IRequest } from "./service/request/index";
import { Persistence as NodePersistence } from "./service/persistence/persistence-node";
import { Axios } from "axios";

export function createTestIOC() {
  const container = createIOC();
  container
    .rebind<IPersistence>(Persistence)
    .to(NodePersistence)
    .inSingletonScope();


  // 直接将 Request 绑定到 axios 实例
  container
    .rebind<IRequest>(Request)
    .toDynamicValue(() => new Axios({ baseURL: "https://fake-demain/" }))
    .inSingletonScope();
  return container;
}
