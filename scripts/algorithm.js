const { readFile } = require("fs-extra");
const { rm, write, newContentHead } = require("./utils");
const fs = require("fs-extra");
const { copy } = require("fs-extra");

const dir = "temp/source";
const paths = [
  ["1", "基础算法"],
  ["2", "进阶算法"],
  ["3", "强化算法"],
];
const target = "Algorithm";
const sidebars = [];

// paths.forEach((path) => {
//   const [id, name] = path;
//   const sidebar = {
//     text: name,
//     items: [],
//   };
//   const files = fs.readdirSync(`${dir}/${id}`);
//   files.forEach((file) => {
//     const name = file.replace(".json", "").replaceAll(" ", "");
//     sidebar.items.push({
//       text: name,
//       link: `/${target}/${id}/${name}`,
//     });
//     const head = newContentHead({
//       title: name,
//       outline: "deep",
//     });
//     readFile(`${dir}/${id}/${file}`, "utf-8").then((content) => {
//       const newContent = `${head}${JSON.parse(content).content}`;
//       write(`${target}/${id}/${name}.md`, () => newContent);
//     });
//   });
//   sidebars.push(sidebar);
// });
// const sidebarPath = `.vitepress/sidebar.json`;
// write(sidebarPath, (content) => {
//   const sidebarJson = JSON.parse(content);
//   sidebarJson[`/${target}/`] = sidebars;
//   return JSON.stringify(sidebarJson, null, 2);
// });

// 读取 md 文件夹，将图片下载到本地
paths.forEach(([id]) => {
  const path = `${target}/${id}`;
  const files = fs.readdirSync(path);
  files
    .filter((i) => i.endsWith(".md"))
    .forEach((file) => {
      const fileName = file.replace(".md", "").replaceAll(" ", "");
      let index = 0;
      const content = fs.readFileSync(`${path}/${file}`, "utf-8");
      const reg = /!\[.*?\]\((.*?)\)/g;
      const matches = content.match(reg);
      if (matches) {
        matches.forEach((match, index) => {
          const url = match.match(/\((.*?)\)/)[1];
          const name =
            index + (url.endsWith(".png") ? ".png" : url.endsWith(".jpg") ? ".jpg" : ".gif");

          if (url.includes("http")) {
            const newContent = content.replace(url, `./${fileName}.assets/${name}`);
            write(`${target}/${id}/${file}`, () => newContent);
            console.log(url);
            // fetch(url)
            //   .then((res) => res.arrayBuffer())
            //   .then((buffer) => {
            //     const path = `${target}/${id}/${fileName}.assets/${name}`;
            //     write(path, () => Buffer.from(buffer));

            //   });
          }
        });
      }
    });
});
