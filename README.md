# Williams Wang Research

Williams Wang Research 的 Hugo 静态站点。博客是公开报告的完整来源；Discord 用于更新、讨论与未来专属报告。

## 详细使用手册

从 [tutorial/index.md](tutorial/index.md) 开始阅读。手册覆盖本地预览、内容分类、Markdown 报告与图片发布、栏目和研究领域管理、Cloudflare Pages 部署、维护排错及发布检查清单。

## 内容结构

- content/research/：全部公开研究报告。
- content/series/：具有持续更新机制的定期栏目。
- content/areas/：用于归类报告的长期研究领域。
- content/posts/：改版前的早期文章归档。

定期报告填写 series；不定期报告将 series 留空。每份报告至少填写一个 categories 研究领域，并使用 tags 标注资产、模型和指标。

## 新建并预览报告

使用 Page Bundle，让正文和图片放在同一个文件夹：

    cd /Users/wangjiatao/wwblog
    hugo new content research/2026-09-02-report-slug/index.md

报告目录示例：

    content/research/2026-09-02-report-slug/
    ├── index.md
    ├── figure-01.png
    └── figure-02.webp

报告 front matter 示例：

    +++
    title = "报告标题"
    date = "2026-09-02T10:00:00+08:00"
    draft = true
    description = "一句话说明研究问题和报告价值。"
    series = "SPX期权分析报告"
    categories = ["衍生品"]
    tags = ["SPX", "期权", "波动率"]
    featured = false
    private = false
    +++

不定期报告使用：

    series = ""

正文图片使用相对路径：

    ![说明图片表达的内容](figure-01.png)

不要保留本机绝对路径或 file:// 链接。图表优先使用 PNG，连续色彩图像可使用 WebP 或 JPEG。

本地预览草稿：

    hugo server -D --disableFastRender

打开 http://localhost:1313/。确认后将 draft 改为 false。

## 新增定期栏目

只需在 content/series/ 新建一个 Markdown 文件：

    +++
    title = "新的定期栏目名称"
    description = "栏目研究什么、如何持续更新。"
    cadence = "定期更新"
    weight = 70
    +++

文件名决定 URL，例如 new-series.md 对应 /series/new-series/。报告中的 series 必须与栏目 title 完全一致。

## 新增研究领域

只需在 content/areas/ 新建一个 Markdown 文件：

    +++
    title = "新的研究领域"
    description = "领域覆盖范围。"
    weight = 70
    +++

报告中的 categories 必须与领域 title 完全一致。

## 发布

新版确认并提交后，未来可按报告文件夹单独提交：

    git add content/research/2026-09-02-report-slug
    git commit -m "content: publish report title"
    git push origin master

历史社媒目录不会自动导入。每份新报告由人工选择后发布，正文优先适配网页阅读，不要求附带 PDF。

## Cloudflare Pages

- Build command: hugo --gc --minify
- Build output directory: public
- Environment variable: HUGO_VERSION=0.165.0
- Production branch: 以 Cloudflare Pages 当前项目设置为准

站点仅使用静态 Hugo 功能，适合继续通过 Cloudflare Pages 免费或极低成本部署。Discord 的外部邀请地址集中配置在 hugo.toml，站内其他位置统一链接到 /join/。

## 主题说明

仓库中的 themes/ananke 子模块为历史主题，原有改动保留。新版使用根目录 layouts 和 assets，不再依赖该主题渲染，避免覆盖历史工作。

## 访问统计

全站公开 HTML 页面通过不蒜子统计访问，只有主页页脚显示累计浏览量（PV）和访客数估计（UV）。2026-09-11 起接入；不导入或拼接 Cloudflare 历史数据，UV 不代表精确自然人数。

- `hugo.toml` 的 `params.visitorStats.enabled` 控制启停，`since` 记录接入日期。
- `hugo server` 不加载计数脚本；正式构建也只在 `baseURL` 对应的 HTTPS 主机名下计数，排除 localhost 和 Pages 预览域名。
- 数据返回后才显示主页统计行；失败或 8 秒内未返回有效数字时保持隐藏，其他内容正常使用。非主页也会计数，但不显示数字。
- 不蒜子是外部免费服务，存在网络、拦截、去重口径及服务可用性限制；与 Cloudflare 后台数字无需一致。
- 本地验证应模拟统计响应，避免为测试反复增加线上计数。上线后检查主页数字和文章页请求各一次。
