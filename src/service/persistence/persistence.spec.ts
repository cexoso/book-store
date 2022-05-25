import { expect } from "chai";
import { createTestIOC } from "../../create-test-ioc";
import { Persistence, IPersistence } from "./index";

describe("Persistence", () => {
  it("Persistence 是应用内单例的", () => {
    const ioc = createTestIOC();
    expect(ioc.get(Persistence)).eq(
      ioc.get(Persistence),
      "Persistence 是应用内单例的"
    );
  });
  describe("Persistence 可以存储数据", () => {
    it("可以上架和下架书籍", () => {
      const ioc = createTestIOC();
      const persistence = ioc.get<IPersistence>(Persistence);
      persistence.setItem("key1", { q: 1 });
      const value = persistence.getItem("key1");

      expect(value).deep.eq([null, { q: 1 }]);
    });
  });
});
