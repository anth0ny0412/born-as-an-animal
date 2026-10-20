// 브라우저처럼 index.html의 스크립트를 순서대로 한 공간에서 실행해 게임 데이터와 엔진을 불러옴
const vm = require("vm");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function scriptList() {
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  return [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);
}

// withUI: true면 화면 코드(main.js)까지 가짜 DOM 위에서 실행
function load({ withUI = false } = {}) {
  const el = () => ({ innerHTML: "", textContent: "", dataset: {}, addEventListener() {}, click() {} });
  const app = Object.assign(el(), { querySelectorAll: () => [], querySelector: () => null });
  const ctx = {
    console,
    setTimeout() {}, setInterval: () => 0, clearInterval() {}, scrollTo() {},
    document: { getElementById: (id) => (id === "app" ? app : el()), addEventListener() {}, body: {} },
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const src of scriptList()) {
    if (!withUI && src.includes("main.js")) continue;
    vm.runInContext(fs.readFileSync(path.join(ROOT, src), "utf8"), ctx, { filename: src });
  }
  return { ctx, app };
}

module.exports = { load };
