<!-- Copyright (c) 2026, Williams.Wang. All rights reserved. -->
# 07. FAQ 与检查清单

## FAQ

### Q1：新报告可以直接用 Markdown 吗？

可以。Markdown 是默认和推荐格式。正文、标题、列表、链接、表格、图片和可信 HTML 都可以使用。

### Q2：博客报告必须提供 PDF 吗？

不需要。博客以网页版本为完整公开版本。PDF 可以只在 Discord 发布，或根据具体报告决定是否提供。

### Q3：社媒目录中的旧报告会自动上传吗？

不会。只有人工选择并复制到 content/research 的新报告才会发布。

### Q4：一份报告可以属于多个定期栏目吗？

当前不可以。series 是单个字符串。一份报告只能属于一个定期栏目。

### Q5：一份报告可以属于多个研究领域吗？

可以。categories 是数组。

### Q6：所有报告都需要定期栏目吗？

不需要。没有持续更新机制时：

    series = ""

它会被视为不定期研究。

### Q7：什么时候应该新增定期栏目？

满足以下任一情况时考虑：

- 已确定会重复更新；
- 已计划至少三篇围绕同一问题的报告；
- 有稳定方法、数据口径和读者预期；
- 需要形成可连续跟踪的历史序列。

单篇报告不要单独建立栏目。

### Q8：什么时候应该新增研究领域？

只有现有六个领域无法合理覆盖一类长期研究时才新增。领域应该宽而稳定，避免为单篇报告创建领域。

### Q9：为什么 featured 没有效果？

当前模板尚未使用 featured 字段。它是预留字段。

### Q10：private 是否等于专属报告？

不等于。private 只控制搜索引擎索引。专属报告应只在 Discord 发布。

### Q11：可以修改已经发布报告的文件夹名吗？

技术上可以，但会改变 URL。上线后应尽量保持 slug 不变。

### Q12：为什么报告正文不要再写一级标题？

页面模板已经自动生成 H1。正文从 ## 开始能保持单一 H1 和清晰目录结构。

### Q13：公式如何显示？

在正文开头加入：

    {{< math >}}

然后使用 MathJax 的 $...$ 或 $$...$$。

### Q14：如何在报告中加入 Discord 提示？

    {{< discord-note title="继续讨论" >}}
    这里写提示内容。
    {{< /discord-note >}}

正文末尾已经自动有 Discord CTA，通常无需重复。

### Q15：如何确认发布成功？

Cloudflare 部署成功只是第一步，还要打开正式 URL，检查图片、栏目、领域、description 和 Discord CTA。

## Front matter 速查模板

### 定期报告

    +++
    title = "报告标题"
    date = "2026-09-02T10:00:00+08:00"
    draft = true
    description = "报告说明。"
    series = "SPX期权分析报告"
    categories = ["衍生品"]
    tags = ["SPX", "期权", "波动率"]
    featured = false
    private = false
    +++

### 不定期报告

    +++
    title = "报告标题"
    date = "2026-09-02T10:00:00+08:00"
    draft = true
    description = "报告说明。"
    series = ""
    categories = ["科技产业"]
    tags = ["HBM", "AI基础设施"]
    featured = false
    private = false
    +++

## 写作完成检查清单

- [ ] 标题明确；
- [ ] description 能独立说明报告价值；
- [ ] 日期和时区正确；
- [ ] series 正确或明确留空；
- [ ] 至少一个 categories；
- [ ] tags 统一且不过多；
- [ ] 正文从二级标题开始；
- [ ] 核心结论靠前；
- [ ] 标注数据截至时间；
- [ ] 事实、假设和推断尽量分开；
- [ ] 包含来源；
- [ ] 包含风险、反证或失效点；
- [ ] 图片使用相对路径；
- [ ] 图片有 alt text；
- [ ] 公式页加入 math shortcode；
- [ ] 不包含本机绝对路径；
- [ ] 不包含密钥或隐私信息。

## 本地预览检查清单

- [ ] hugo server -D 成功；
- [ ] 首页显示报告；
- [ ] 报告页只有一个主标题；
- [ ] 目录正确；
- [ ] 图片全部加载；
- [ ] 表格可读；
- [ ] 公式正常；
- [ ] 外链正确；
- [ ] 定期栏目页归集正确；
- [ ] 研究领域页归集正确；
- [ ] 手机宽度没有横向溢出；
- [ ] Discord CTA 正常；
- [ ] 文末免责声明存在。

## 发布前检查清单

- [ ] draft 已改为 false；
- [ ] hugo --gc --minify 成功；
- [ ] git diff --check 无输出；
- [ ] git status --short 只包含预期文件；
- [ ] 没有暂存 public；
- [ ] 没有意外暂存 themes/ananke；
- [ ] 提交信息准确；
- [ ] 推送到正确分支。

## 发布后检查清单

- [ ] Cloudflare 部署成功；
- [ ] 正式报告 URL 返回正常；
- [ ] 页面不是旧缓存；
- [ ] 标题和 description 正确；
- [ ] 图片、表格和公式正常；
- [ ] 栏目和领域页面出现报告；
- [ ] Discord 链接正常；
- [ ] 使用正式 URL 制作社媒摘要；
- [ ] 保存或记录重要修订。

## 常用命令速查

进入博客：

    cd /Users/wangjiatao/wwblog

新建报告：

    hugo new content research/YYYY-MM-DD-report-slug/index.md

预览草稿：

    hugo server -D --disableFastRender

正式构建：

    hugo --gc --minify

查看状态：

    git status --short

检查补丁：

    git diff --check

搜索栏目名称：

    rg -n '^series = ' content/research

搜索研究领域：

    rg -n '^categories = ' content/research

搜索仍为草稿的报告：

    rg -n '^draft = true' content/research

