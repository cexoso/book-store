import { expect } from "chai";
import { createTestIOC } from "../../create-test-ioc";
import { StoreController } from "./store.controller";
import { BookStore } from "../../model/book-store/book-store";
import type { IRequest } from "../../service/request";
import { Request } from "../../service/request";
import { stub } from "sinon";

const getRangeBook = ([start, end]: [number, number]) => {
  const list = [];
  for (let index = start; index <= end; index++) {
    list.push({
      id: String(index),
      name: "fakeName" + index,
      count: 100,
    });
  }

  return list;
};
describe("StoreController", () => {
  it("StoreController 是应用内单例的", () => {
    const ioc = createTestIOC();
    expect(ioc.get(StoreController)).eq(
      ioc.get(StoreController),
      "StoreController 是应用内单例的"
    );
  });
  describe("store controller fetch", () => {
    it("当页面初始化时，可以通过 fetchBookList 方法获取数据", async () => {
      const ioc = createTestIOC();
      const storeController = ioc.get(StoreController);
      const request = ioc.get<IRequest>(Request);

      const getMethod = stub(request, "get");

      getMethod.returns(
        Promise.resolve({
          data: {
            code: 0,
            data: {
              page: 0,
              pageCount: 10,
              list: getRangeBook([0, 2]),
            },
          },
        })
      );

      await storeController.fetchBookList(0);

      expect(getMethod.lastCall.args).deep.eq([
        "/api/book-list",
        {
          params: {
            page: 0,
            page_count: 10,
          },
        },
      ]);

      expect(storeController.bookIdList.value).deep.eq(["0", "1", "2"]);

      const bookStore = ioc.get(BookStore);
      const result = bookStore.getBookById("0");
      expect(result).not.eq(null, "预期数据被正确的存储");
    });
    it("连续加载分页数据", async () => {
      const ioc = createTestIOC();
      const storeController = ioc.get(StoreController);
      const request = ioc.get<IRequest>(Request);

      const getMethod = stub(request, "get");

      getMethod.returns(
        Promise.resolve({
          data: {
            code: 0,
            data: {
              page: 0,
              pageCount: 10,
              list: getRangeBook([0, 9]),
            },
          },
        })
      );

      await storeController.fetchNext();

      expect(getMethod.lastCall.args).deep.eq([
        "/api/book-list",
        {
          params: {
            page: 0,
            page_count: 10,
          },
        },
      ]);

      expect(storeController.bookIdList.value).deep.eq([
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ]);
      getMethod.returns(
        Promise.resolve({
          data: {
            code: 0,
            data: {
              page: 1,
              pageCount: 10,
              list: getRangeBook([10, 19]),
            },
          },
        })
      );

      await storeController.fetchNext();

      expect(getMethod.lastCall.args).deep.eq([
        "/api/book-list",
        {
          params: {
            page: 1,
            page_count: 10,
          },
        },
      ]);

      expect(storeController.bookIdList.value).deep.eq([
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
      ]);
    });
    it("reset 可以清除页面数据", async () => {
      const ioc = createTestIOC();
      const storeController = ioc.get(StoreController);
      const request = ioc.get<IRequest>(Request);
      const getMethod = stub(request, "get");
      getMethod.returns(
        Promise.resolve({
          data: {
            code: 0,
            data: {
              page: 0,
              pageCount: 10,
              list: getRangeBook([0, 2]),
            },
          },
        })
      );

      await storeController.fetchNext();

      expect(storeController.bookIdList.value).deep.eq(["0", "1", "2"]);
      const bookStore = ioc.get(BookStore);
      const result = bookStore.getBookById("0");
      expect(result).not.eq(null, "预期数据被正确的存储");
      storeController.reset();

      expect(storeController.bookIdList.value).deep.eq([], "页面数据清0");
      expect(storeController.nextPage).eq(0, "指针重新指向0");

      expect(result).not.eq(null, "仅清楚页面数据，不会清除数据层数据");
    });
    it("init 仅会在首次生效", async () => {
      const ioc = createTestIOC();
      const storeController = ioc.get(StoreController);
      const request = ioc.get<IRequest>(Request);

      const getMethod = stub(request, "get");

      getMethod.returns(
        Promise.resolve({
          data: {
            code: 0,
            data: {
              page: 0,
              pageCount: 10,
              list: getRangeBook([0, 9]),
            },
          },
        })
      );

      await storeController.init();
      expect(storeController.bookIdList.value).deep.eq([
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ]);
      getMethod.returns(
        Promise.resolve({
          data: {
            code: 0,
            data: {
              page: 1,
              pageCount: 10,
              list: getRangeBook([10, 19]),
            },
          },
        })
      );
      await storeController.init();
      expect(storeController.bookIdList.value).deep.eq([
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ]);
    });
  });
});
