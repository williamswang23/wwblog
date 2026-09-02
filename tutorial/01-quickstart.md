<!-- Copyright (c) 2026, Williams.Wang. All rights reserved. -->
# 01. 快速上手

## 1. 前置条件

当前项目已经验证的环境：

- macOS；
- Hugo Extended 0.165.0；
- Git；
- 本地浏览器；
- GitHub 远程仓库 git@github.com:williamswang23/wwblog.git。

检查 Hugo：

    hugo version

期望看到类似：

    hugo v0.165.0+extended+withdeploy darwin/arm64

Extended 版本很重要，因为站点使用 Hugo 的资源处理功能生成并压缩 CSS。

## 2. 进入博客目录

    cd /Users/wangjiatao/wwblog

确认当前位置：

    pwd

期望输出：

    /Users/wangjiatao/wwblog

## 3. 启动本地预览

预览普通已发布内容：

    hugo server --disableFastRender

预览包含草稿的内容：

    hugo server -D --disableFastRender

然后打开：

    http://localhost:1313/

参数含义：

- server：启动本地网页服务器；
- -D：包含 draft = true 的草稿；
- --disableFastRender：每次修改后完整渲染相关页面，减少预览缓存造成的误判。

停止预览时，在启动命令所在的终端按 Control-C。

## 4. 最小 Smoke Test

打开首页后确认：

- 页面标题为 Williams Wang Research；
- 顶部有“研究、定期栏目、研究领域、方法、关于”；
- 主按钮显示“阅读”；
- 右侧说明使用“公开报告”而不是“免费报告”；
- 加入 Discord 按钮进入 /join/；
- 定期栏目显示六个栏目；
- 研究领域显示六个领域；
- 页面没有明显错位或空白。

关键地址：

    http://localhost:1313/
    http://localhost:1313/research/
    http://localhost:1313/series/
    http://localhost:1313/areas/
    http://localhost:1313/methods/
    http://localhost:1313/join/

## 5. 正式构建检查

本地预览正常后，执行与 Cloudflare 接近的正式构建：

    hugo --gc --minify

成功时会输出 Pages、Static files 等数量，并以 Total in ... 结束。

如果命令显示 Error，则不要提交或推送，先根据 06-troubleshooting.md 排查。

## 6. 查看当前文件变化

    git status --short

建议在每次发布前查看。它能帮助你确认：

- 哪些报告文件被新增；
- 哪些图片被加入；
- 是否意外修改了主题或其他文件；
- 是否存在不应提交的临时文件。

检查文本补丁格式：

    git diff --check

没有输出通常表示没有多余空格或补丁格式问题。

