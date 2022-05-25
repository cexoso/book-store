import { defineComponent } from "vue";
import { injectBook } from "../../injects/book";

export const BookItem = defineComponent({
  props: {
    bookId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { bookId } = props;
    const book = injectBook(bookId);
    return () => {
      if (!book) {
        return null;
      }
      return (
        <router-link to={{ path: "/detail", query: { "book-id": bookId } }}>
          <span>Name: {book.name}</span> /{" "}
          <span>count: {book.count.value}</span> /{" "}
          <span>state: {book.state.value}</span>
        </router-link>
      );
    };
  },
});
