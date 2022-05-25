import "reflect-metadata";
import { createIOC } from "./create-ioc";
import { IPersistence, Persistence } from "./service/persistence/index";
import { Persistence as NodePersistence } from "./service/persistence/persistence-node";

export function createTestIOC() {
  const container = createIOC();
  container.rebind<IPersistence>(Persistence).to(NodePersistence).inSingletonScope();
  return container;
}
