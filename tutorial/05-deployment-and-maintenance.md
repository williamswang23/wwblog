<!-- Copyright (c) 2026, Williams.Wang. All rights reserved. -->
# 05. 部署与维护

## 1. 部署链路

当前仓库：

    git@github.com:williamswang23/wwblog.git

当前本地分支：

    master

预期链路：

~~~mermaid
flowchart LR
  A["本地 wwblog"] --> B["git commit"]
  B --> C["git push origin master"]
  C --> D["GitHub"]
  D --> E["Cloudflare Pages 自动构建"]
  E --> F["public 静态站点"]
  F --> G["williamswang.win"]
~~~

注意：第一次正式部署前，需要在 Cloudflare Pages 后台确认 Production branch 确实是 master。

## 2. Cloudflare Pages 应使用的设置

必需配置：

- Build command：hugo --gc --minify
- Build output directory：public
- Environment variable：HUGO_VERSION=0.165.0
- Production branch：需要在后台确认

Production 与 Preview 都必须配置相同的 `HUGO_VERSION`。这不是单纯的版本偏好：当前站点依赖 Goldmark passthrough 保留 `\\[...\\]` 与 `\\(...\\)` 公式分隔符；Cloudflare v2 构建镜像默认的 Hugo 0.118.2 会丢失其中一部分分隔符，即使构建退出码为 0，读者端公式仍会退化为普通文本。

## 3. 为什么要固定 Hugo 版本

Cloudflare Pages 默认 Hugo 版本可能随构建镜像变化。固定 HUGO_VERSION 可以减少：

- 本地成功、线上失败；
- 模板 API 版本差异；
- 弃用或行为变化；
- 无预警构建漂移。

本地升级 Hugo 后，不要立即修改 Cloudflare 版本。先完成本地构建和预览，再同步 HUGO_VERSION。

修改 Cloudflare 构建变量后，应由一次新的 Git 提交触发自动构建，并同时验收：部署来源 commit、生成 HTML 中的公式分隔符数量，以及浏览器中的 MathJax DOM。不要只把 Cloudflare 的“成功”状态当作公式正确的证据。

## 4. 标准发布流程

### 4.1 查看状态

    git status --short

### 4.2 本地预览

    hugo server -D --disableFastRender

### 4.3 正式构建

    hugo --gc --minify

### 4.4 检查补丁

    git diff --check

### 4.5 精确暂存

发布单篇报告：

    git add content/research/2026-09-02-report-slug

新增栏目：

    git add content/series/new-series.md

新增研究领域：

    git add content/areas/new-area.md

站点修改应按实际文件精确暂存。避免在存在大量无关改动时直接使用 git add .。

### 4.6 提交

    git commit -m "content: publish report title"

常见提交前缀：

- content：发布或修订报告；
- feat：新增站点功能；
- style：纯视觉调整；
- docs：使用说明；
- fix：修复错误。

### 4.7 推送

    git push origin master

## 5. public 目录

public 是 Hugo 输出目录，并已写入 .gitignore：

    public/

不要手工编辑 public 中的 HTML，因为下一次构建会覆盖。

仓库历史上可能已经跟踪过部分 public 文件。新版工作流仍应以 content、layouts、assets、static 和 hugo.toml 为源，不应把 public 当作源代码。

## 6. 静态文件与资源文件的区别

assets：

- 由 Hugo 处理；
- 当前 CSS 会被压缩并加 fingerprint；
- 适合样式和需要管线处理的资源。

static：

- 原样复制；
- 适合品牌图片、favicon、Cloudflare _headers 和独立 HTML；
- 不会自动压缩。

报告图片放在报告 Page Bundle 中，不要全部堆入 static。

## 7. Cloudflare 安全响应头

static/_headers 当前设置：

    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Permissions-Policy: camera=(), microphone=(), geolocation=()

这些会由 Cloudflare Pages 应用于站点响应。

## 8. 草稿、预览和正式发布

草稿：

    draft = true

本地预览草稿：

    hugo server -D

正式构建默认排除草稿：

    hugo --gc --minify

不要使用 private 代替 draft。

## 9. 修订已经发布的报告

修改原报告目录中的 index.md 或图片，保持 URL 不变。

建议在正文加入更新记录：

    ## 更新记录

    - 2026-09-10：更新数据截至时间和图 2。
    - 2026-09-02：首次发布。

提交信息：

    git commit -m "content: revise report title"

## 10. 备份与可恢复性

核心备份来源：

- 本地 wwblog；
- GitHub 远程仓库；
- 报告原稿所在的 iCloud 社媒目录；
- Cloudflare Pages 的部署记录。

报告原稿和博客网页版本应各自保留，不要让博客成为研究生产资料的唯一副本。

## 11. 定期维护建议

每月：

- 检查 Discord 邀请链接；
- 检查首页和最新报告；
- 查看是否有失效外链；
- 统一标签拼写；
- 确认 Cloudflare 构建正常。

每季度：

- 复核栏目是否仍在更新；
- 将形成连续研究线的不定期报告升级为栏目；
- 更新方法说明；
- 检查 Hugo 与 Cloudflare 版本，但不要无验证升级；
- 检查图片体积和页面性能。
