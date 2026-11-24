const fs = require("fs");
const path = require("path");

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf8"));
const version = process.env.APP_VERSION || pkg.version || "0.1.0";
const buildTime = new Date().toISOString();

const srcDir = path.join(__dirname, "src");
const distDir = path.join(__dirname, "dist");

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

const html = fs
  .readFileSync(path.join(srcDir, "index.html"), "utf8")
  .replace(/__APP_VERSION__/g, version)
  .replace(/__BUILD_TIME__/g, buildTime);

fs.writeFileSync(path.join(distDir, "index.html"), html, "utf8");
fs.copyFileSync(path.join(srcDir, "styles.css"), path.join(distDir, "styles.css"));
fs.copyFileSync(path.join(srcDir, "app.js"), path.join(distDir, "app.js"));
fs.writeFileSync(
  path.join(distDir, "version.json"),
  JSON.stringify({ service: "sunmao-test-frontend", version, buildTime }, null, 2) + "\n",
  "utf8"
);
fs.writeFileSync(
  path.join(distDir, "healthz"),
  JSON.stringify({ status: "ok", service: "sunmao-test-frontend", version }) + "\n",
  "utf8"
);

console.log(`sunmao-test-frontend v${version} built into dist/`);
