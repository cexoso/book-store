import { expect } from "chai";
import { BookForSell } from "./book";

describe("Book", () => {
  it("创建 book 实例，可以更改 book 的属性", () => {
    const book = new BookForSell("1");
    book.name = "明朝那些事";
    expect(book).has.property("name", "明朝那些事");
    expect(book.state.value).eq("已卖完", "默认为很售完");
    book.setCount(100);
    expect(book.count.value).eq(100, "设置值后依然会保留值");
    expect(book.state.value).eq("在售", "当有 count 时，状态为在售");
  });
});
