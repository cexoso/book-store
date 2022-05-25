import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import { injectBook, injectBookController } from "../../injects/book";

export const BookDetail = defineComponent({
  setup() {
    const controller = injectBookController();
    const router = useRoute();
    const book = computed(() => {
      const id = router.query["book-id"] as string;
      return id ? injectBook(id) : null;
    }).value;

    return () => {
      if (!book) {
        return <div>查无止书</div>;
      }

      return (
        <div class="">
          <div>
            <span>name:</span>
            <span>{book.name}</span>
          </div>
          <div>
            <span>count:</span>
            <span>{book.count.value}</span>
          </div>
          <div>
            <span>{book.state.value}</span>
          </div>
          <button onClick={() => controller.buyAll(book.id)}>买空</button>
        </div>
      );
    };
  },
});
