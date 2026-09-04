<!-- Copyright (c) 2026, Williams.Wang. All rights reserved. -->
# 03. 发布一份新报告

## 1. 发布前决策

先回答三个问题：

1. 这份报告是否应该公开发布？
2. 它属于哪个研究领域？
3. 它属于现有定期栏目，还是不定期研究？

判断规则：

- 有固定更新机制并属于现有六个栏目：填写 series；
- 没有固定更新机制：series 留空；
- 每份报告至少填写一个 categories；
- 使用 tags 标注资产、模型和指标。

## 2. 创建报告 Page Bundle

进入博客目录：

    cd /Users/wangjiatao/wwblog

创建报告：

    hugo new content research/2026-09-02-report-slug/index.md

建议命名规则：

    YYYY-MM-DD-英文短名称

例如：

    2026-09-02-spx-options
    2026-09-15-liquidity-review
    2026-10-01-hbm-supply-cycle

文件夹名称会进入 URL。报告上线后尽量不要修改，否则旧链接可能失效。

## 3. 填写 front matter

打开新建的 index.md。定期报告示例：

    +++
    title = "SPX期权市场结构分析：报告标题"
    date = "2026-09-02T10:00:00+08:00"
    draft = true
    description = "一句话说明研究问题、时点和报告价值。"
    series = "SPX期权分析报告"
    categories = ["衍生品"]
    tags = ["SPX", "期权", "波动率", "Gamma"]
    featured = false
    private = false
    +++

不定期报告示例：

    +++
    title = "HBM供需周期与价格传导"
    date = "2026-09-02T10:00:00+08:00"
    draft = true
    description = "分析 HBM 供给约束、产能转换和价格传导。"
    series = ""
    categories = ["科技产业"]
    tags = ["HBM", "DRAM", "AI基础设施"]
    featured = false
    private = false
    +++

## 4. 字段说明

### title

报告正式标题。用于页面 H1、浏览器标题、社交分享和卡片。

### date

发布日期。当前站点时区是 Asia/Singapore。建议保留 Hugo 自动生成的带时区时间。

### draft

发布开关。写作期间保持 true，确认后改为 false。

### description

一至两句话说明报告研究什么。不要复制标题，也不要写空泛宣传语。

推荐包含：

- 研究对象；
- 数据或结论时点；
- 报告回答的问题。

### series

定期栏目名称，只支持单个字符串。

必须精确使用现有栏目 title。没有栏目时使用空字符串。

### categories

研究领域数组。至少填写一个，可以填写多个。

### tags

更细的标签数组。建议 3 至 6 个，不要为同一概念创建大量近义标签。

### featured

预留字段。当前模板尚未使用它控制首页推荐，不要依赖这个字段产生视觉变化。

### private

只控制搜索引擎 noindex。它不是访问权限。

## 5. 编写正文

页面模板会自动生成报告主标题，因此正文建议从二级标题开始：

    ## 核心结论

    报告的主要结论……

    ## 数据与时点

    数据截至……

    ## 分析

    详细分析……

    ## 风险与反证

    结论可能在以下条件下失效……

建议每份公开报告尽量包含：

- 核心结论；
- 数据或信息截至时间；
- 方法和证据；
- 图表或表格；
- 关键假设；
- 不确定性和替代解释；
- 风险、确认条件和失效点；
- 来源；
- 更新记录，如有重要修订。

站点的标题渲染规则会将正文中的一级标题降为二级标题，但仍建议原稿主动从 ## 开始，避免结构混乱。

## 6. Markdown 常用语法

二级标题：

    ## 标题

列表：

    - 项目一
    - 项目二

引用：

    > 需要突出引用的内容。

链接：

    [来源名称](https://example.com/source)

表格：

    | 指标 | 当前值 | 说明 |
    |---|---:|---|
    | 示例 | 100 | 示例说明 |

站点允许可信的原始 HTML，但应优先使用 Markdown。不要粘贴来源不明的脚本。

## 7. 图片处理

把报告图片放在 index.md 同一目录：

    content/research/2026-09-02-report-slug/
    ├── index.md
    ├── figure-01.png
    ├── figure-02.webp
    └── methodology-diagram.svg

在 Markdown 中使用相对路径：

    ![SPX期权Gamma暴露结构](figure-01.png)

不要使用：

    /Users/wangjiatao/...
    file:///Users/wangjiatao/...

这些路径只在本机有效。

图片建议：

- 图表和带文字截图优先 PNG；
- 连续色彩图像优先 WebP 或 JPEG；
- 可缩放矢量图可以使用 SVG；
- 文件名使用小写英文、数字和连字符；
- 每张图片填写能够说明内容的 alt text；
- 避免直接热链第三方图片；
- 单张图片尽量控制在约 1 至 2MB；
- 普通网页图一般无需超过 2000 至 2400 像素宽。

当前 Markdown 图片不会自动生成多尺寸版本，上传前应自行控制文件大小。

## 8. 数学公式

站点已在 `hugo.toml` 启用 Goldmark passthrough，构建时会保留 `\[...\]`、`\(...\)` 和 `$$...$$` 分隔符。MathJax shortcode 负责在页面中加载渲染引擎；包含公式的报告仍需在正文开头显式加入：

    {{< math >}}

然后可以使用：

    行内公式：$y = \alpha + \beta x$

    块级公式：

    $$
    \sigma^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2
    $$

也可以原样使用 `\(...\)` 行内公式和 `\[...\]` 块级公式。发布前需要检查构建后的文章 HTML 仍保留相同数量的分隔符；只确认 MathJax 脚本存在并不足以证明公式可渲染。

MathJax 从 jsDelivr CDN 加载。若读者网络无法访问该 CDN，公式可能无法渲染；普通文本和图片不受影响。

## 9. 插入 Discord 提示

报告正文中需要强调社群讨论时，可以使用：

    {{< discord-note title="围绕这份研究继续讨论" >}}
    Discord 中会发布后续更新、修订和讨论。
    {{< /discord-note >}}

报告末尾模板本身已经自动加入 Discord CTA，不必在每份报告中重复使用 shortcode。

## 10. 本地预览

    hugo server -D --disableFastRender

逐项检查：

- 标题和 description；
- 日期；
- 是否归入正确栏目；
- 是否归入正确研究领域；
- 图片是否显示；
- 图片是否清晰但不过大；
- 表格在窄屏是否可以阅读；
- 目录是否正确；
- 公式是否渲染；
- 链接是否可点击；
- 文末免责声明与 Discord CTA 是否存在。

## 11. 发布

确认后修改：

    draft = false

正式构建：

    hugo --gc --minify

检查文件：

    git status --short
    git diff --check

只暂存本次报告目录：

    git add content/research/2026-09-02-report-slug

提交：

    git commit -m "content: publish report title"

推送：

    git push origin master

Cloudflare Pages 若监听 master，会自动构建并发布。生产分支尚需在第一次正式部署前确认。

## 12. 发布后检查

- 打开报告正式 URL；
- 确认图片、表格和公式；
- 确认页面标题和 description；
- 确认栏目页出现该报告；
- 确认研究领域页出现该报告；
- 确认 Discord CTA；
- 使用正式博客链接制作 X、Discord 和其他渠道摘要。
