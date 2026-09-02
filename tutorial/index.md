<!-- Copyright (c) 2026, Williams.Wang. All rights reserved. -->
# Williams Wang Research 博客使用手册

这套文档面向博客所有者，目标是让你能够独立完成以下工作：

- 在本机启动和检查博客；
- 理解“定期栏目、研究领域、不定期研究、标签”的区别；
- 将 Markdown 报告和图片发布到博客；
- 新增或调整定期栏目与研究领域；
- 修改站点文案、Discord 地址和品牌资产；
- 在发布前完成构建检查；
- 理解 GitHub 与 Cloudflare Pages 的部署链路；
- 定位报告未显示、图片失效、栏目未归集等常见问题。

## 建议阅读顺序

如果你只想尽快发布第一份报告：

1. 阅读 [01. 快速上手](01-quickstart.md)；
2. 阅读 [03. 发布一份新报告](03-publish-a-report.md)；
3. 发布前使用 [07. FAQ 与检查清单](07-faq-and-checklists.md) 中的检查清单。

如果你希望完整掌握博客：

1. [01. 快速上手](01-quickstart.md)：启动博客并完成最小验证；
2. [02. 架构与内容模型](02-architecture-and-content-model.md)：理解目录、页面和内容分类；
3. [03. 发布一份新报告](03-publish-a-report.md)：完整发布一份 Markdown 报告；
4. [04. 管理栏目、领域与站点](04-manage-series-areas-and-site.md)：管理栏目、领域、文案与品牌；
5. [05. 部署与维护](05-deployment-and-maintenance.md)：构建、GitHub 与 Cloudflare Pages；
6. [06. 常见问题与排查](06-troubleshooting.md)：常见问题和处理方法；
7. [07. FAQ 与检查清单](07-faq-and-checklists.md)：FAQ、字段速查和发布清单。

## 项目一句话

这是一个由 Hugo 生成、通过 Cloudflare Pages 托管的静态研究博客。博客是公开报告的完整来源，Discord 用于更新、讨论和未来专属报告。

## 当前内容原则

- 博客只发布经过人工选择的公开报告；
- 社媒目录中的历史报告不会自动迁移；
- 新报告优先采用适合网页阅读的 Markdown，不要求提供 PDF；
- 定期栏目用于持续更新的研究序列；
- 没有固定更新机制的报告归为不定期研究；
- 每份报告至少选择一个研究领域；
- X、Discord 和其他社交渠道使用摘要加博客链接分发；
- Discord 的外部邀请地址集中在站点配置中维护。

## 项目位置

博客本地目录：

    /Users/wangjiatao/wwblog

报告原始资料目录：

    /Users/wangjiatao/Library/Mobile Documents/com~apple~CloudDocs/Project_ww/社媒

这两个目录承担不同职责。社媒目录保存报告原稿和生产资料；wwblog 只保存已经选择发布的网页版本。

## 重要边界

1. 不要直接编辑 public 目录。它是 Hugo 的生成结果，可以重新生成。
2. 不要修改 themes/ananke 来调整新版页面。新版使用根目录 layouts 和 assets。
3. private = true 只会告诉搜索引擎不要索引，不会阻止任何知道链接的人访问。
4. draft = true 才会让报告不进入正式构建。
5. 第一次正式部署前，需要在 Cloudflare Pages 后台确认生产分支是否为 master。
6. 本手册中的 Git 推送步骤应在新版博客完成审阅并建立基线提交后使用。
