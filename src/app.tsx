import { defineComponent } from "vue";
import { createIOC } from "./create-ioc";

export const App = defineComponent({
  provide() {
    const ioc = createIOC();
    return {
      ioc,
    };
  },
  setup() {
    return () => <router-view />;
  },
});
