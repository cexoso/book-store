import "reflect-metadata";
import { Container } from "inversify";
import { BookStore } from "./model/book-store/book-store";
import { IPersistence, Persistence } from "./service/persistence/index";
import { Persistence as BrowserPersistence } from "./service/persistence/persistence";

export function createIOC() {
  const container = new Container();
  container.bind(BookStore).toSelf().inSingletonScope();
  container.bind<IPersistence>(Persistence).to(BrowserPersistence).inSingletonScope();;
  return container;
}
