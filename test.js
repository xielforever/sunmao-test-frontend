const assert = require("assert");
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

execFileSync(process.execPath, [path.join(__dirname, "build.js")], { stdio: "inherit" });

const distDir = path.join(__dirname, "dist");
for (const file of ["index.html", "styles.css", "app.js", "version.json", "healthz"]) {
  const full = path.join(distDir, file);
  assert.ok(fs.existsSync(full), `missing build artifact: ${file}`);
}

const html = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
assert.ok(!html.includes("__APP_VERSION__"), "APP_VERSION placeholder was not replaced");
assert.ok(html.includes("sunmao-test-frontend"), "index.html missing project title");

const health = JSON.parse(fs.readFileSync(path.join(distDir, "healthz"), "utf8"));
assert.strictEqual(health.status, "ok");

console.log("sunmao-test-frontend build verification passed");
