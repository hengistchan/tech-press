const { downloadForGithub, copy, rm, write, newContentHead } = require("./utils");
const fs = require("fs-extra");

/**
 * @type {Record<string, string>}
 */
const includeSingleFiles = [["preface.md", "index.md"]].reduce((prev, file) => {
  if (Array.isArray(file)) {
    prev[file[0]] = file[1];
  } else {
    prev[file] = file;
  }
  return prev;
}, {});
const sidebarPath = `.vitepress/sidebar.json`;
const navPath = `.vitepress/nav.json`;

async function init(name, branch, category) {
  const initialSidebar = [
    {
      text: "Preface",
      link: `/${name}/`,
    },
  ];
  const tempPath = await downloadForGithub(
    "https://github.com/getify/You-Dont-Know-JS.git",
    branch
  );
  rm(`${name}`);
  const sidebar = [];
  copy(tempPath, name, (src, _, { stat, name: fileName }) => {
    if (!stat.isDirectory() || !category.includes(fileName)) return false;
    const mdFiles = fs.readdirSync(src).filter((file) => {
      return file.endsWith(".md");
    });
    sidebar.push({
      text: fileName,
      items: mdFiles.map((file) => ({
        text: file.replace(".md", ""),
        link: `/${name}/${fileName}/${file}`,
      })),
    });
    mdFiles.forEach((file) => {
      const filePath = `${src}/${file}`;
      write(filePath, (content) => {
        return (
          newContentHead({ title: `${file.replace(".md", "")} | ${fileName}` }) + content
        ).replaceAll(/<img src="(.+?)\"/g, (match, p1) => {
          return `<img src="./${p1}"`;
        });
      });
    });
    return true;
  });
  copy(tempPath, name, (src, dest, { stat, name: fileName }) => {
    const file = Object.keys(includeSingleFiles).find((i) => i === fileName);
    if (!stat.isFile() || !file) {
      return false;
    }
    return {
      file: includeSingleFiles[file],
      content: (content) => {
        return content.replaceAll(/<img src="(.+?)\"/g, (match, p1) => {
          return decodeURIComponent(`<img src="./${p1}"`);
        });
      },
    };
  });
  // update sidebar
  write(sidebarPath, (content) => {
    const sidebarJson = JSON.parse(content);
    // sort by category
    sidebar
      .sort((a, b) => {
        return category.indexOf(a.text) - category.indexOf(b.text);
      })
      .forEach((item) => {
        item.text = item.text
          .split("-")
          .map((i) => i[0].toUpperCase() + i.slice(1))
          .join(" ");
      });
    sidebarJson[`/${name}/`] = [...initialSidebar, ...sidebar];
    return JSON.stringify(sidebarJson, null, 2);
  });
  write(navPath, (content) => {
    const navJson = JSON.parse(content);
    navJson[`${name}`] = {
      text: name.split("-").join(" "),
      link: `/${name}/`,
    };
    return JSON.stringify(navJson, null, 2);
  });
  rm(tempPath);
}

module.exports = init;
