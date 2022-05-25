import { injectable, inject } from "inversify";
import { BookStore } from "../../model/book-store/book-store";
import { Request } from "../../service/request/index";
import { BookForSell } from "../../model/book/book";
import type { IRequest } from "../../service/request/index";
import { ref } from "vue";

@injectable()
export class StoreController {
  public constructor(
    @inject(BookStore) private bookStore: BookStore,
    @inject(Request) private request: IRequest
  ) {}
  public bookIdList = ref<string[]>([]);
  public nextPage = 0;
  private pageCount = 10;

  public reset() {
    this.bookIdList.value = [];
    this.nextPage = 0;
  }

  public async init() {
    if (this.nextPage === 0) {
      return this.fetchNext();
    }
  }

  public fetchNext() {
    return this.fetchBookList(this.nextPage);
  }

  public fetchBookList(page: number) {
    return this.request
      .get("/api/book-list", {
        params: {
          page,
          page_count: this.pageCount,
        },
      })
      .then(
        (res) => {
          const { code, data } = res.data;
          if (code === 0) {
            const { page, list } = data;
            this.nextPage = page + 1;

            list.forEach((item: any) => {
              const { id, name, count } = item;
              const book = new BookForSell(id);
              book.name = name;
              book.setCount(count);
              this.bookStore.putOnTheShelf(book);

              if (this.bookIdList.value.findIndex((_id) => _id === id) === -1) {
                this.bookIdList.value.push(id);
              }
            });
          } else {
            // TODO
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
