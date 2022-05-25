import { defineComponent } from "vue";
import { BookItem } from "./book-item";
import { injectBookList, injectBookController } from "../../injects/book";

export const BookList = defineComponent({
  setup() {
    const bookIdList = injectBookList();
    const controller = injectBookController();

    controller.init();

    return () => (
      <div class="">
        <ul>
          {bookIdList.value.map((id) => {
            return (
              <li key={id}>
                <BookItem bookId={id} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
});
