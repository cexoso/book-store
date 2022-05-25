import { injectable } from "inversify";
import { shallowRef } from "vue";
import { BookForSell } from "../book/book";

@injectable()
export class BookStore {
  private bookMap = shallowRef<Record<string, BookForSell>>({});
  public putOnTheShelf(book: BookForSell) {
    // 上架方法，该方法可以将书上架
    this.bookMap.value[book.id] = book;
  }
  public takeDown(bookId: string) {
    const hasBook = Boolean(this.getBookById(bookId));
    if (!hasBook) {
      return false;
    }

    delete this.bookMap.value[bookId];
    return true;
    // 下架
  }
  public getBookById(bookId: string) {
    const book = this.bookMap.value[bookId];
    if (!book) {
      return null;
    }
    return book;
  }
}
