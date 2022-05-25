import { createApp } from "vue";
import { App } from "./app";
import { BookList } from "./components/book-list/book-list";
import { BookDetail } from "./components/book-detail/book-detail";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/list",
      component: BookList,
    },
    {
      path: "/detail",
      component: BookDetail,
    },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
