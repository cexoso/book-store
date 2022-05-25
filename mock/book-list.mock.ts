import { MockHandler } from "vite-plugin-mock-server";
import { parse } from "qs";

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
const mocks: MockHandler[] = [
  {
    pattern: "/api/book-list",
    handle: (req, res) => {
      const obj = parse(req.url.split("?")[1]);
      const page = Number(obj.page);
      const pageCount = Number(obj.page_count);
      const start = page * pageCount;
      const list = getRangeBook([start, start + pageCount]);

      const result = {
        code: 0,
        data: {
          page,
          pageCount,
          list,
        },
      };

      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify(result));
    },
  },
];

export default mocks;
