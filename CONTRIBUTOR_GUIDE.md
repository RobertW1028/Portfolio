# 贡献说明

这份说明写给通过 GitHub 帮忙维护这个网站的人。

网站正式域名：
https://yuezhengwang.com

现在仓库是 public。Netlify 会从 GitHub 仓库自动部署，通常不再因为 private repo 的 contributor 限制导致朋友的部署失败。

请不要直接去 Netlify 上传作品或修改网站。正确流程是：

GitHub 修改内容 -> 创建 Pull Request -> GitHub Actions 自动检查 -> Netlify Deploy Preview -> 审核后合并 -> Netlify 自动更新正式网站。

## 两类协作者

### A. 普通投稿者

普通投稿者通常只添加照片、poster、stills、Vimeo 项目信息或作品数据。

普通投稿者可以修改：
- `src/data/works.json`
- `public/images/works/`
- `public/videos/works/`，仅在确实需要小视频文件时
- `CONTENT_GUIDE.md`
- `CONTRIBUTOR_GUIDE.md`

普通投稿者不要修改：
- `src/components/`
- `src/pages/`
- `src/App.jsx`
- `src/main.jsx`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `netlify.toml`
- `.github/`
- `scripts/`
- `.env` 或任何密钥文件

如果普通投稿者修改了这些网站代码或配置文件，GitHub Actions 会失败。

### B. Trusted maintainer

Trusted maintainer 是被信任的网站维护者。这个网站实际是给 trusted maintainer 长期维护和使用的，所以 trusted maintainer 可以修改：
- 网站内容
- `src/data/siteContent.js`
- 页面组件
- CSS 样式
- 路由
- 作品数据
- Vimeo 项目内容
- 文档

Trusted maintainer 仍然应该通过 Pull Request 提交修改，不建议直接 push 到 `main`。

Trusted maintainer 的 PR 仍然必须通过：
- `npm run validate-content`
- `npm run build`

Trusted maintainer 不能跳过 build。即使文件范围检查放宽，内容检查和构建检查仍然必须通过。

不建议随便使用 GitHub 的 bypass rules。除非是紧急修复，并且你已经确认 build 和预览都正常，否则应该让 PR 走完整检查流程。

如果 trusted maintainer 修改了下面这些高风险文件，检查会给出 warning，审核时需要特别认真看 diff：
- `package.json`
- `package-lock.json`
- `netlify.toml`
- `.github/`
- `scripts/`
- `.env`

## trusted maintainer 名单在哪里设置

请在 `scripts/validate-pr-scope.mjs` 顶部找到：

```js
const trustedMaintainers = [
  'RobertW1028',
  'yuezhengwang66',
]
```

当前 trusted maintainer 名单已经设置为：

```js
const trustedMaintainers = [
  'RobertW1028',
  'yuezhengwang66',
]
```

如果你或朋友的 GitHub 用户名不是这两个，请在 `scripts/validate-pr-scope.mjs` 里改成真实用户名。用户名必须和 GitHub 账号登录名完全一致，大小写也尽量保持一致。

## site-change-approved 标签

如果某个 PR 不是 trusted maintainer 提交的，但这次确实需要修改页面、组件、样式或配置，可以由 owner 或 trusted maintainer 给 PR 添加标签：

`site-change-approved`

有这个标签后，文件范围检查会放宽。

普通 collaborator 不应该自己随便加这个标签。这个标签只由 owner 或 trusted maintainer 添加。

即使有这个标签，PR 仍然必须通过内容检查和 build。

## 添加作品的基本规则

作品数据在：

`src/data/works.json`

作品 poster 和 stills 放在：

`public/images/works/`

如果确实需要小视频文件，可以放在：

`public/videos/works/`

但本网站主要推荐使用 Vimeo 嵌入，不建议把大 `.mp4` 视频直接上传到 GitHub。

## 文件名规则

文件名建议使用英文、小写、数字、短横线或下划线。

推荐：
- `my-film-poster.jpg`
- `my-film-still-01.webp`

不要使用：
- 中文文件名
- 空格
- 特殊符号
- 电脑本地路径，例如 `C:\Users\...`

数据里的 `poster`、`image`、`stills`、`video` 只写文件名，不要写文件夹路径。

正确：

```json
"poster": "my-film-poster.jpg"
```

错误：

```json
"poster": "public/images/works/my-film-poster.jpg"
```

## Vimeo 视频作品

Vimeo 地址请使用 player URL：

```text
https://player.vimeo.com/video/123456789
```

不要把整段 iframe 粘进 `works.json`。

不要使用普通 Vimeo 页面链接，例如：

```text
https://vimeo.com/123456789
```

## Pull Request 流程

1. 不建议直接修改 `main`。
2. 新建 branch。
3. 修改作品数据、素材、页面或样式。
4. 创建 Pull Request。
5. 等 GitHub Actions 自动检查完成。
6. 打开 Netlify Deploy Preview 检查页面。
7. 如果检查失败，根据错误提示修改。
8. 审核通过后再合并。
9. 合并后 Netlify 会自动更新正式网站。

## 检查失败怎么办

如果 GitHub Actions 失败，请点开失败项，看错误提示。

常见原因：
- 普通投稿者修改了网站代码文件
- trusted maintainer 用户名没有加入 `trustedMaintainers`
- PR 需要改代码，但没有 `site-change-approved` 标签
- 图片文件没有上传
- `poster` 文件名和真实文件名大小写不一致
- `vimeoEmbedUrl` 不是 Vimeo player URL
- JSON 少了逗号或引号
- build 失败
