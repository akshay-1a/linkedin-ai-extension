import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "Linkedin Ai Reply",
    description: "Generate Replies with AI for LinkedIn Messages",
    version: "1.0.0",
    author: { email: "akshay1.py@gmail.com" },
    icon: "assets/Icon.svg",
  },
  modules: ["@wxt-dev/module-react"],
  runner: {
    startUrls: ["https://*.linkedin.com/*"],
  },
});
