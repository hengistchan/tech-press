const exec = require("child_process").execSync;

const rimraf = require("rimraf");
const fs = require("fs-extra");

const getRandomName = () => {
  return Math.random().toString(36).slice(-8);
};

const downloadForGithub = async (url, branch = "main") => {
  const randomName = getRandomName();
  exec(`git clone ${url} --depth 1 --branch ${branch} temp/${randomName}`);
  return `temp/${randomName}`;
};

const rm = (path) => {
  return rimraf.sync(path);
};

/**
 *
 * @param {string} src
 * @param {string} dest
 * @param {(src: string, dest: string, info: {stat: fs.Stats, name: string}) => boolean} callback
 */
const copy = (src, dest, callback) => {
  fs.readdirSync(src).forEach((file) => {
    const _src = `${src}/${file}`;
    const _dest = `${dest}/${file}`;
    const stat = fs.statSync(_src);
    if (stat) {
      const res = callback(_src, _dest, { stat, name: file });
      if (typeof res === "boolean") {
        if (res) {
          fs.copySync(_src, _dest)
        }
        return;
      }
      const { 
        file: _file = file,
        content: _content,
      } = res;
      if (_content) {
        const content = fs.readFileSync(_src, "utf-8");
        fs.writeFileSync(`${dest}/${_file}`, _content(content), "utf-8");
      } else {
        fs.copySync(_src, `${dest}/${_file}`);
      }
    }
  });
};

const write = (path, callback) => {
  fs.ensureFileSync(path);
  const centent = fs.readFileSync(path, "utf-8");
  const newContent = callback(centent);
  fs.writeFileSync(path, newContent, "utf-8");
};

const newContentHead = (obj = {}) => {
  let head = "---\n";
  Object.entries(obj).forEach(([key, value]) => {
    head += `${key}: ${value}\n`;
  });
  head += "---\n";
  return head;
};

module.exports = {
  downloadForGithub,
  rm,
  copy,
  write,
  newContentHead,
};
