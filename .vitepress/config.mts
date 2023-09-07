import { defineConfig } from "vitepress";
import sidebar from "./sidebar.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "You-Dont-Know-JS-1", link: "/You-Dont-Know-JS-1/" },
      { text: "You-Dont-Know-JS-2", link: "/You-Dont-Know-JS-2/" },
    ],
    sidebar: sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
  ignoreDeadLinks: true,
});
