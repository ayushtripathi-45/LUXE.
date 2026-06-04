import fs from 'fs';
import { JSDOM, VirtualConsole } from 'jsdom';

const html = `<!DOCTYPE html><html><body><div id="root"></div></body></html>`;
const jsCode = fs.readFileSync('./dist/assets/index-VzlLI5uL.js', 'utf8');

const virtualConsole = new VirtualConsole();
virtualConsole.on("error", (...args) => {
  console.error("BROWSER_ERROR:", ...args);
});
virtualConsole.on("warn", (...args) => {
  console.warn("BROWSER_WARN:", ...args);
});
virtualConsole.on("log", (...args) => {
  console.log("BROWSER_LOG:", ...args);
});
virtualConsole.on("jsdomError", (e) => {
  console.error("JSDOM_ERROR:", e);
});

const dom = new JSDOM(html, {
  url: "http://localhost:5173/",
  runScripts: "dangerously",
  virtualConsole
});

const scriptEl = dom.window.document.createElement("script");
scriptEl.type = "module";
scriptEl.textContent = jsCode;
try {
  dom.window.document.body.appendChild(scriptEl);
} catch (e) {
  console.error("APPEND_ERROR:", e);
}
