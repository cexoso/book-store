import { expect } from "chai";
import { createTestIOC } from "../../create-test-ioc";
import { BookStore } from "../book-store/book-store";
import { BookForSell } from "../book/book";

describe("BookStore", () => {
  it("BookStore 是应用内单例的", () => {
    const ioc = createTestIOC();
    expect(ioc.get(BookStore)).eq(
      ioc.get(BookStore),
      "BookStore 是应用内单例的"
    );
  });
  describe("可以上架和下架书籍", () => {
    it("可以上架和下架书籍", () => {
      const ioc = createTestIOC();
      const bookStore = ioc.get(BookStore);
      const book = new BookForSell("0");
      book.count.value = 100;
      bookStore.putOnTheShelf(book);
      expect(bookStore.getBookById("0")).has.property("id", "0");

      expect(bookStore.takeDown("0")).eq(true, "下架成功会返回 true");
      expect(bookStore.getBookById("0")).eq(null, "不能再获取到已下架的书籍");
      expect(bookStore.takeDown("0")).eq(false, "下架失败会返回 false");
    });
    it("怎么存进去的值，取出来就得是什么样的", () => {
      const ioc = createTestIOC();
      const bookStore = ioc.get(BookStore);
      const book = new BookForSell("0");
      book.count.value = 100;
      bookStore.putOnTheShelf(book);
      const book0 = bookStore.getBookById("0");
      expect(book0?.count.value).eq(100);
    });
  });
});
