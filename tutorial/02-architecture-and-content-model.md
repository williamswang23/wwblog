<!-- Copyright (c) 2026, Williams.Wang. All rights reserved. -->
# 02. 架构与内容模型

## 1. 整体工作流

~~~mermaid
flowchart LR
  A["社媒目录中的报告原稿"] --> B["人工选择并适配 Markdown"]
  B --> C["content/research 报告目录"]
  C --> D["Hugo 读取内容和模板"]
  D --> E["生成 public 静态网站"]
  E --> F["GitHub 仓库"]
  F --> G["Cloudflare Pages 构建与发布"]
  G --> H["williamswang.win"]
  H --> I["读者进入 Discord"]
~~~

Hugo 不需要数据库。Markdown、图片、站点配置和模板共同生成完整 HTML。

## 2. 关键目录

    wwblog/
    ├── archetypes/
    │   ├── default.md
    │   └── research.md
    ├── assets/
    │   └── css/research.css
    ├── content/
    │   ├── research/
    │   ├── series/
    │   ├── areas/
    │   ├── posts/
    │   ├── about.md
    │   ├── methods.md
    │   └── join.md
    ├── layouts/
    │   ├── _default/
    │   ├── areas/
    │   ├── series/
    │   ├── partials/
    │   └── shortcodes/
    ├── static/
    │   ├── images/brand/
    │   └── _headers
    ├── hugo.toml
    ├── README.md
    └── tutorial/

目录职责：

- archetypes：新建内容时使用的默认 front matter 模板；
- assets：需要由 Hugo 处理的 CSS 等资源；
- content：网站正文；
- layouts：页面结构和自动归集逻辑；
- static：原样复制到网站的静态文件；
- hugo.toml：站点名称、域名、语言、Discord 地址、SEO 和分类配置；
- public：构建产物，不应手工维护。

## 3. 四层内容分类

### 3.1 报告

所有新版公开报告都放在：

    content/research/

每份报告建议使用独立 Page Bundle：

    content/research/2026-09-02-report-slug/
    ├── index.md
    ├── figure-01.png
    └── figure-02.webp

### 3.2 定期栏目

定期栏目表示具有稳定研究对象和持续更新机制的研究序列。

当前六个栏目：

1. SPX期权分析报告；
2. 市场板块轮动分析；
3. 利率期限结构分析；
4. SPY HMM模型分析；
5. 市场流动性综合分析报告；
6. 市场板块轮动双周复盘。

栏目定义放在：

    content/series/

报告通过 series 字段归入栏目。匹配规则是栏目 title 与报告 series 完全相同。

### 3.3 不定期研究

有研究想法才生产、没有稳定更新机制的报告属于不定期研究。

设置方式：

    series = ""

首页只在存在不定期报告时显示“不定期研究”板块。

### 3.4 研究领域

研究领域用于宽口径归类，不代表更新频率。

当前六个领域：

1. 宏观与政策；
2. 市场结构；
3. 衍生品；
4. 科技产业；
5. 公司研究；
6. 研究方法。

领域定义放在：

    content/areas/

报告通过 categories 数组归入领域：

    categories = ["衍生品"]

一份报告可以属于多个领域：

    categories = ["市场结构", "衍生品"]

领域名称必须与 content/areas 中页面的 title 完全相同。

### 3.5 标签

tags 用于更具体的资产、模型、指标和主题：

    tags = ["SPX", "期权", "波动率", "Gamma"]

标签适合回答“报告具体涉及什么”，不适合代替定期栏目或研究领域。

## 4. 页面如何自动生成

Hugo 根据内容目录和模板生成：

- /research/：全部公开研究报告；
- /series/：全部定期栏目；
- /series/栏目路径/：属于该栏目的报告；
- /areas/：全部研究领域；
- /areas/领域路径/：属于该领域的报告；
- /tags/：标签索引；
- /categories/：Hugo 自动生成的分类索引；
- /posts/：早期文章归档；
- /join/：Discord 说明与外部入口。

栏目页的核心匹配逻辑来自 layouts/series/single.html：

    where site.RegularPages "Params.series" .Title

领域页的核心匹配逻辑来自 layouts/areas/single.html：

    where site.RegularPages "Params.categories" "intersect" (slice .Title)

这就是为什么名称必须精确匹配。

## 5. SEO 与分发功能

当前模板自动提供：

- canonical URL；
- meta description；
- Open Graph 标题、说明和默认图片；
- Twitter summary_large_image；
- Article 或 WebPage JSON-LD；
- RSS；
- sitemap.xml；
- robots.txt；
- 报告日期、作者和阅读时间；
- 报告文末免责声明；
- Discord 引流模块。

description 非常重要。它会用于报告卡片、搜索引擎说明和社交分享摘要。

## 6. draft 与 private 的区别

draft = true：

- 正式 hugo 构建不会包含该报告；
- 使用 hugo server -D 才能预览；
- 适合发布前审阅。

private = true：

- 页面仍然会被构建并上传；
- 页面仍可通过链接访问；
- 只生成 noindex,nofollow；
- 不是密码保护或付费墙。

如果内容必须只在 Discord 内部存在，就不要把它放入博客仓库。

