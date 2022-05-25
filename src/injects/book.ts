import { inject } from "vue";
import type { createIOC } from "../create-ioc";
import { StoreController } from "../controller/store/store.controller";
import { BookStore } from "../model/book-store/book-store";

export const injectIOC = () => {
  type IOC = ReturnType<typeof createIOC>;
  const ioc = inject("ioc") as IOC; // 不考虑拿不到的情况
  return ioc;
};

export const injectBookController = () => {
  const ioc = injectIOC();
  const controller = ioc.get(StoreController);
  return controller;
};

export const injectBookList = () => {
  const controller = injectBookController();
  const bookIDList = controller.bookIdList;
  return bookIDList;
};

export const injectBookStore = () => {
  const ioc = injectIOC();
  const bookStore = ioc.get(BookStore);
  return bookStore;
};

export const injectBook = (id: string) => {
  const bookStore = injectBookStore();
  return bookStore.getBookById(id);
};
