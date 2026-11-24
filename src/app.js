const statusEl = document.getElementById("health-status");
const checkBtn = document.getElementById("check-btn");

async function checkHealth() {
  if (!statusEl) return;
  statusEl.textContent = "请求中...";
  try {
    const resp = await fetch("./healthz", { cache: "no-store" });
    statusEl.textContent = resp.ok ? `OK (${resp.status})` : `异常 (${resp.status})`;
  } catch (err) {
    statusEl.textContent = `请求失败: ${err.message}`;
  }
}

if (checkBtn) {
  checkBtn.addEventListener("click", checkHealth);
}
checkHealth();
