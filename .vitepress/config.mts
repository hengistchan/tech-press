import { defineConfig } from "vitepress";
import sidebar from "./sidebar.json";
import nav from "./nav.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: Object.values(nav),
    sidebar: sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
  ignoreDeadLinks: true,
});
