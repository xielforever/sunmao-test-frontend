# sunmao-test-frontend

用于 SunMao CI/CD 发布测试的前端测试项目。

## 页面与端点

- `/`：前端静态页面，展示版本号、构建时间与 `/healthz` 检测状态
- `/healthz`：健康检查端点（`dist/healthz` 与 Nginx `location = /healthz`）
- `/version.json`：构建版本元数据

## 本地构建与校验

```bash
npm run test
npm run build
```

## 发布测试产物

- `Dockerfile`：基于 `node:22-alpine` 构建静态产物并由 `nginx:1.27-alpine` 托管（默认端口 `80`）
- `nginx.conf`：SPA 回退与 `/healthz` 路由配置
- `deploy/k8s.yaml`：Kubernetes `Namespace` / `Deployment` / `Service` 清单（`sunmao-samples/sunmao-test-frontend`）
- `sunmao.yaml`：SunMao 流水线配置（支持 `server` / `container` / `k8s` / `all` 部署目标）
