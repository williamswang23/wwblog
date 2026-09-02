<!-- Copyright (c) 2026, Williams.Wang. All rights reserved. -->
# 04. 管理栏目、领域与站点

## 1. 新增定期栏目

在 content/series/ 新建 Markdown 文件：

    content/series/new-series.md

示例：

    +++
    title = "新的定期栏目名称"
    description = "栏目研究什么、如何持续更新。"
    cadence = "定期更新"
    weight = 70
    +++

    这里说明栏目覆盖范围、方法、更新节奏和历史变化。

字段说明：

- title：报告 series 必须使用的精确名称；
- description：首页和栏目卡片摘要；
- cadence：显示“定期更新”“双周更新”等；
- weight：排序，数字越小越靠前。

文件名决定 URL：

    new-series.md

对应：

    /series/new-series/

无需修改首页模板。栏目首页会自动读取 content/series 下的页面。

## 2. 将报告加入栏目

在报告 front matter 中填写：

    series = "新的定期栏目名称"

必须与栏目 title 完全一致，包括：

- 中文字符；
- 大小写；
- 空格；
- 标点。

## 3. 重命名定期栏目

先搜索旧名称：

    rg -n '旧的栏目名称' content/series content/research

需要同步修改：

1. 栏目文件的 title；
2. 所有相关报告的 series；
3. 如需修改 URL，再修改栏目文件名。

修改文件名会改变栏目 URL。栏目已经上线后，除非准备重定向，否则不建议随意修改 slug。

## 4. 停止一个栏目

不建议直接删除历史报告。更稳妥的方式：

1. 保留栏目页面和历史报告；
2. 在栏目正文中说明“已停止更新”及日期；
3. 将 cadence 改为“已停止更新”；
4. 不再新增报告。

这样可以保留历史链接和研究轨迹。

## 5. 新增研究领域

在 content/areas/ 新建：

    content/areas/new-area.md

示例：

    +++
    title = "新的研究领域"
    description = "领域覆盖范围。"
    weight = 70
    +++

报告使用：

    categories = ["新的研究领域"]

研究领域同样采用 title 精确匹配。

## 6. 调整领域顺序

修改领域文件中的 weight：

    weight = 10

数字越小越靠前。建议以 10 为间隔：

    10, 20, 30, 40

这样以后可以在中间插入 15 或 25，不必重排所有文件。

## 7. 管理标签

标签不需要提前创建。报告中第一次使用后，Hugo 会自动生成标签页面。

推荐规则：

- 资产使用常见代码：SPX、SPY、GLD；
- 模型使用稳定名称：HMM、Copula；
- 指标使用统一写法：Gamma、ATM-IV；
- 避免同时存在“流动性”“市场流动性”“Liquidity”等重复含义标签。

定期检查标签：

    rg -n '^tags = ' content/research

## 8. 修改首页文字

首页内容位于：

    layouts/index.html

可以修改：

- 主标题；
- 副标题；
- “阅读”按钮；
- 右侧公开报告说明；
- 各区块标题；
- 空状态文案。

修改模板前先启动本地预览，保存后查看桌面和手机宽度。

## 9. 修改导航与页脚

顶部导航：

    layouts/partials/site-header.html

页脚：

    layouts/partials/site-footer.html

Discord CTA：

    layouts/partials/discord-cta.html

新增导航页面时，需要同时确认：

- 页面实际存在；
- URL 正确；
- 移动端导航策略；
- 页脚是否也需要入口。

当前移动端隐藏主导航，只保留品牌和加入 Discord 按钮。

## 10. 修改 Discord 地址

唯一外部 Discord 地址配置在 hugo.toml：

    discordURL = "https://discord.williamswang.win"

站内其他位置优先链接到：

    /join/

/join/ 再跳转外部 Discord。这样以后更换邀请地址时，只需修改配置。

修改后测试：

    curl -I -L --max-time 20 https://discord.williamswang.win

应最终到达 Discord 邀请页面。

## 11. 修改站点名称、域名和说明

配置文件：

    hugo.toml

关键项：

    baseURL = "https://williamswang.win/"
    title = "Williams Wang Research"

    [params]
      author = "Williams Wang"
      description = "独立市场研究：宏观、市场结构、衍生品与科技产业。"
      discordURL = "https://discord.williamswang.win"

修改域名时必须同步 baseURL，否则 canonical、Open Graph URL 和 sitemap 会指向旧域名。

## 12. 修改品牌图片

品牌资产目录：

    static/images/brand/

主要文件：

- WWR_logo_header_compact_transparent.svg：顶部；
- WWR_logo_reverse_white_transparent.svg：页脚；
- WWR_logo_symbol_only_transparent.svg：favicon；
- png/WWR_logo_primary_horizontal_transparent.png：默认分享图。

模板引用位置：

    layouts/partials/site-header.html
    layouts/partials/site-footer.html
    layouts/_default/baseof.html
    hugo.toml

替换文件时尽量保持文件名不变，可以减少模板修改。

## 13. 修改视觉样式

主样式文件：

    assets/css/research.css

主要控制：

- 颜色；
- 字体；
- 页面宽度；
- 首页 Hero；
- 报告卡片；
- 定期栏目和研究领域卡片；
- 报告正文；
- Discord CTA；
- 桌面与手机响应式布局。

修改 CSS 后至少检查：

- 1280 像素左右桌面宽度；
- 390 像素左右手机宽度；
- 首页；
- 报告正文；
- 定期栏目页；
- 研究领域页；
- Discord 页面。

## 14. 不要修改的历史主题

themes/ananke 是历史主题子模块，当前根配置没有启用它。新版样式来自根目录 layouts 和 assets。

除非决定恢复 Ananke，否则不要在该目录中继续开发新版页面，也不要清理现有历史改动。

