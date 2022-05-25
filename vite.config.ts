import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import mockServer from "vite-plugin-mock-server";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    mockServer({
      logLevel: "info",
      urlPrefixes: ["/api/"],
      mockRootDir: "./mock",
    }),
  ],
  server: {
    proxy: {
      "/api/book-list": {},
    },
  },
});
