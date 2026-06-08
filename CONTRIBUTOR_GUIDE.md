# 贡献说明

这份说明写给要通过 GitHub 帮忙更新网站的人。

网站更新方式是：

本地或 GitHub 修改内容 -> 创建 Pull Request -> GitHub 自动检查 -> Netlify Deploy Preview -> 审核后合并 -> Netlify 自动更新正式网站。

请不要直接去 Netlify 上传作品。Netlify 会从 GitHub 仓库自动部署。

## 两类协作者

### A. 普通 collaborator / 投稿者

普通投稿者通常只添加或修改作品内容，不修改网站代码。

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

Trusted maintainer 是被信任的网站维护者，可以修改：
- 作品数据
- 图片和少量必要视频
- `src/data/siteContent.js`
- 组件
- 页面
- CSS 样式
- 路由
- 文档

Trusted maintainer 仍然应该通过 Pull Request 提交修改，不建议直接 push 到 `main`。

Trusted maintainer 的 PR 仍然必须通过：
- `npm run validate-content`
- `npm run build`

如果 trusted maintainer 修改了下面这些高风险文件，检查不会直接失败，但会显示 warning，审核时需要特别小心：
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
  'YOUR_GITHUB_USERNAME',
  'FRIEND_GITHUB_USERNAME',
]
```

把占位符改成真实 GitHub 用户名，例如：

```js
const trustedMaintainers = [
  'your-name',
  'friend-name',
]
```

用户名必须和 GitHub 账号登录名完全一致。

## site-change-approved 标签

如果某个 PR 不是 trusted maintainer 提交的，但这次确实需要修改网站代码，可以由 owner 或 trusted maintainer 给 PR 添加标签：

`site-change-approved`

有这个标签后，文件范围检查会放宽，允许修改页面、组件、样式和配置。

普通 collaborator 不应该自己随便加这个标签。这个标签只由 owner 或 trusted maintainer 添加。

即使有这个标签，PR 仍然必须通过内容检查和 build。

## 添加作品时的基本规则

作品数据在：

`src/data/works.json`

作品图片、poster 和 stills 放在：

`public/images/works/`

小视频文件如果确实需要放在仓库，放在：

`public/videos/works/`

但这个网站主要推荐使用 Vimeo 嵌入，不建议把大 `.mp4` 视频直接上传到 GitHub。

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

1. 不要直接修改 `main`。
2. 新建 branch。
3. 上传 poster、stills 或必要的小视频文件。
4. 修改 `src/data/works.json`。
5. 创建 Pull Request。
6. 等 GitHub Actions 自动检查。
7. 打开 Netlify Deploy Preview 检查页面。
8. 根据错误提示修改。
9. 等 owner 或 trusted maintainer 审核。
10. 合并后 Netlify 会自动更新正式网站。

## 检查失败怎么办

如果 GitHub Actions 失败，请点开失败项，看中文错误提示。

常见原因：
- 图片文件没有上传
- `poster` 文件名和真实文件名大小写不一致
- `vimeoEmbedUrl` 不是 Vimeo player URL
- JSON 少了逗号或引号
- 普通投稿者修改了网站代码文件
- 上传了不应该放进仓库的大视频
