import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 4000,
  pageLoadTimeout: 60000,
  video: false,

  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3000",
    supportFile: false,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
