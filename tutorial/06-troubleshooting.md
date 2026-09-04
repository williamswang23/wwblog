<!-- Copyright (c) 2026, Williams.Wang. All rights reserved. -->
# 06. 常见问题与排查

## 1. 报告在本地看不到

现象：

- 已创建 index.md，但 /research/ 没有报告。

可能原因：

- draft = true；
- 启动预览时没有使用 -D；
- 报告不在 content/research 下；
- front matter 格式错误。

定位：

    rg -n '^draft = ' content/research
    hugo server -D --disableFastRender

处理：

- 写作阶段使用 -D；
- 正式发布前改为 draft = false；
- 确认报告结构是 content/research/slug/index.md。

## 2. 报告在本地能看到，正式网站看不到

最常见原因是 draft 仍然为 true。本地使用 -D 会显示草稿，正式构建不会。

定位：

    rg -n '^draft = true' content/research
    hugo --gc --minify

如果构建成功但线上仍没有：

- 确认改动已经 commit；
- 确认已经 push；
- 查看 Cloudflare Pages 最新部署是否成功；
- 确认生产分支。

## 3. 图片在本地或线上失效

可能原因：

- 使用了 /Users/... 绝对路径；
- 使用了 file://；
- 图片没有放进报告目录；
- 文件名大小写不一致；
- Markdown 路径与实际文件名不一致。

定位：

以下命令中的 `2026-09-02-report-slug` 需要替换为实际报告目录名：

    find content/research/2026-09-02-report-slug -maxdepth 1 -type f
    rg -n '!\\[' content/research/2026-09-02-report-slug/index.md

处理：

- 图片与 index.md 放在同一目录；
- 使用相对路径；
- 统一大小写；
- 避免空格和复杂字符。

## 4. 报告没有进入定期栏目

可能原因：

- 报告 series 与栏目 title 不完全一致；
- series 使用了数组；
- 栏目文件位于错误目录。

定位：

    rg -n '^series = ' content/research
    rg -n '^title = ' content/series

处理：

报告应使用单个字符串：

    series = "SPX期权分析报告"

## 5. 报告没有进入研究领域

可能原因：

- categories 名称与领域 title 不一致；
- categories 写成普通字符串而不是数组；
- 领域页面不存在。

定位：

    rg -n '^categories = ' content/research
    rg -n '^title = ' content/areas

正确格式：

    categories = ["衍生品"]

多个领域：

    categories = ["市场结构", "衍生品"]

## 6. 首页没有“不定期研究”板块

这是正常条件显示。只有存在 series 为空的已发布报告时，首页才显示该板块。

检查：

    rg -n '^series = ""' content/research

同时确认这些报告 draft = false。

## 7. Hugo 构建出现 TOML 错误

常见原因：

- 缺少引号；
- 数组逗号错误；
- front matter 的 +++ 不完整；
- 中文引号代替英文引号。

错误示例：

    title = “报告标题”

正确：

    title = "报告标题"

运行：

    hugo --gc --minify

Hugo 通常会指出文件和行号。

## 8. 本地端口 1313 被占用

定位：

    lsof -nP -iTCP:1313 -sTCP:LISTEN

使用其他端口：

    hugo server -D --disableFastRender --port 1314

然后打开：

    http://localhost:1314/

## 9. 修改后浏览器仍显示旧文案

可能原因：

- 旧的 Hugo server 仍在运行；
- 浏览器标签没有刷新；
- 预览服务使用了另一个临时目录；
- 浏览器缓存。

处理顺序：

1. 在旧终端按 Control-C；
2. 确认进入 /Users/wangjiatao/wwblog；
3. 重新运行 hugo server -D --disableFastRender；
4. 强制刷新浏览器；
5. 用 rg 确认源码实际文字。

例如：

    rg -n '免费报告|免费研究' layouts content

## 10. 公式显示为原始美元符号

可能原因：

- 没有加入 math shortcode；
- `hugo.toml` 没有启用 Goldmark passthrough，导致 `\[...\]` 或 `\(...\)` 的反斜杠在构建时被剥离；
- MathJax CDN 无法加载；
- 公式放在 code 或 pre 中。

在正文开头加入：

    {{< math >}}

检查 `hugo.toml` 是否包含：

    [markup.goldmark.extensions.passthrough]
      enable = true
      [markup.goldmark.extensions.passthrough.delimiters]
        block = [['\[', '\]'], ['$$', '$$']]
        inline = [['\(', '\)']]

重新构建后，先确认生成的文章 HTML 仍保留公式分隔符，再刷新浏览器并查看开发者控制台是否有 CDN 错误。若 HTML 已保留分隔符但浏览器仍显示原文，问题通常在 MathJax 加载或执行层。

## 11. Discord 按钮没有到达邀请页

检查 hugo.toml：

    rg -n 'discordURL' hugo.toml

检查跳转：

    curl -I -L --max-time 20 https://discord.williamswang.win

站内按钮应先到 /join/，/join/ 的外部按钮再使用 discordURL。


## 12. Cloudflare 构建失败

依次检查：

1. 本地 hugo --gc --minify 是否成功；
2. Cloudflare Build command 是否正确；
3. Build output directory 是否为 public；
4. HUGO_VERSION 是否为 0.165.0；
5. Production 与 Preview 是否都配置版本；
6. 构建日志指出的具体文件和行号。

不要通过手工上传旧 public 绕过模板错误，应修复源文件并重新构建。

已知故障特征：

- `can't evaluate field Locale in type *langs.Language`：Cloudflare 正在使用过旧的 Hugo。项目模板应使用兼容的 `site.Language.Lang`，同时仍须把 Production 与 Preview 的 `HUGO_VERSION` 固定为 `0.165.0`。
- Git 构建显示成功，但页面出现裸 `[`、`]` 或公式普通文本：不要把它视为构建恢复。Hugo 0.118.2 不足以完整保留本站使用的 LaTeX 分隔符；检查 Cloudflare 构建变量，并确认页面存在 `mjx-container`。

直接部署只用于把同一 commit、同一份已验证的隔离构建恢复到生产，不替代 Git 构建配置修复。完成变量修复后，必须再触发一次 Git 自动构建并复验公式。

## 13. private 页面仍然能访问

这是当前设计。private = true 只生成：

    noindex,nofollow

它不会：

- 要求密码；
- 检查 Discord 身份；
- 阻止直接链接；
- 加密内容。

专属报告不要放进博客 content。

## 14. Git 状态中 themes/ananke 显示修改

这是历史主题目录的已有状态。新版不依赖 Ananke。

不要为了清理状态执行破坏性重置，也不要在发布报告时顺手修改或删除该目录。精确 git add 报告目录即可避免把它加入提交。
