# 部署说明：GitHub + Netlify / Vercel

这个网站已经成功部署到 Netlify。以后主要流程是：本地修改 → 本地检查 → commit → push → Netlify 自动部署。

## 1. 当前部署配置

项目是 Vite + React。

`package.json` 里应该有这些命令：

```json
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
```

当前 Netlify 配置在：

`netlify.toml`

内容是：

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Netlify 的 Build command 应该是：

```bash
npm run build
```

Netlify 的 Publish directory 应该是：

```bash
dist
```

## 2. 本地预览网站

在项目根目录打开终端，运行：

```bash
npm.cmd run dev
```

如果你的 PowerShell 可以直接运行 npm，也可以用：

```bash
npm run dev
```

终端会显示本地网址，通常是：

`http://127.0.0.1:5173/`

## 3. 上线前检查

每次准备更新线上网站前，建议先运行：

```bash
npm.cmd run build
```

如果 PowerShell 可以直接运行 npm，也可以用：

```bash
npm run build
```

构建成功后，会生成 `dist` 文件夹。

## 4. 本地检查生产版本

构建成功后，可以运行：

```bash
npm.cmd run preview
```

这个命令会预览 `dist` 里的正式版本。

## 5. 当前路由方式

当前项目使用 `HashRouter`。

线上页面地址会像这样：

- 首页：`https://你的站点.netlify.app/#/`
- 作品页：`https://你的站点.netlify.app/#/works`
- Bio 页面：`https://你的站点.netlify.app/#/about`
- Contact 页面：`https://你的站点.netlify.app/#/contact`

因为路由在 `#` 后面，Netlify 刷新页面时通常不会出现 404。

当前不需要添加 `_redirects`，也不需要为了路由修改 `netlify.toml`。

## 6. 如何测试线上页面

部署完成后，在浏览器分别打开：

`https://你的站点.netlify.app/#/works`

`https://你的站点.netlify.app/#/about`

`https://你的站点.netlify.app/#/contact`

然后刷新页面。

如果使用的是 `#/works` 这种地址，刷新后正常显示就说明 HashRouter 工作正常。

## 7. 如何修改 Netlify site name

1. 打开 Netlify。
2. 进入你的网站项目。
3. 点击 `Site configuration` 或 `Site settings`。
4. 找到 `Site details`。
5. 点击 `Change site name`。
6. 输入新的站点名。

修改后，你的网站地址会变成：

`https://新的名字.netlify.app`

注意：如果你之前把旧网址发给别人，改名后旧网址可能不再适用。

## 8. 以后更新网站的流程

每次改文字、Bio、作品、图片或视频后，按这个流程：

1. 本地修改文件。
2. 运行：

```bash
npm.cmd run build
```

3. 如果构建成功，用 GitHub Desktop commit。
4. push 到 GitHub。
5. Netlify 会自动检测到 GitHub 更新，并重新部署网站。

简单记：

本地修改 → `npm.cmd run build` → commit → push → Netlify 自动部署。

## 9. 哪些文件要上传到 GitHub

一般要上传：

- `src/`
- `public/`
- `scripts/`
- `package.json`
- `package-lock.json`
- `index.html`
- `vite.config.js`
- `.gitignore`
- `netlify.toml`
- `CONTENT_GUIDE.md`
- `CODEX_PROMPTS.md`
- `DEPLOY_GUIDE.md`

## 10. 哪些文件不要上传到 GitHub

不要上传：

- `node_modules/`
- `dist/`
- `.env`
- 任何包含密码、token、secret 的文件

`node_modules` 很大，而且可以通过 `npm install` 重新安装。

`dist` 是构建结果，Netlify 会自动生成。除非你选择手动拖拽部署，否则通常不要上传它。

## 11. 如何更新作品

图片放在：

`public/images/works/`

视频放在：

`public/videos/works/`

作品数据放在：

`src/data/works.json`

也可以运行添加作品工具：

```bash
npm.cmd run add-work
```

添加后记得运行：

```bash
npm.cmd run build
```

然后 commit 和 push。

## 12. 图片路径规则

`works.json` 里的 `image` 只写文件名。

正确：

```json
"image": "13.jpg"
```

不要写：

```json
"image": "public/images/works/13.jpg"
```

不要写电脑本地路径：

```json
"image": "C:\\Users\\..."
```

组件会自动拼接成：

`/images/works/13.jpg`

## 13. 如果线上图片不显示

检查这些地方：

1. 图片是否真的放在 `public/images/works/`。
2. `works.json` 里的 `image` 是否只写文件名。
3. 文件名大小写是否完全一致。
4. 是否用了空格、中文或特殊符号。
5. 是否已经 commit 和 push 到 GitHub。
6. Netlify 是否已经重新部署完成。
7. 浏览器是否缓存了旧页面，可以强制刷新试试。

如果文件叫 `13.JPG`，但数据里写 `13.jpg`，线上服务器可能会认为这是两个不同文件。

## 14. 如果线上视频不显示

视频文件应该放在：

`public/videos/works/`

`works.json` 里的 `video` 只写文件名：

```json
"video": "performance-001.mp4"
```

视频作品通常需要：

```json
"mediaType": "video"
```

视频封面图写在 `image` 字段里，并放在：

`public/images/works/`

## 15. 用 Vercel 部署时怎么填

如果你以后选择 Vercel：

Build Command 填：

```bash
npm run build
```

Output Directory 填：

```bash
dist
```

Install Command 保持默认：

```bash
npm install
```

当前项目使用 `HashRouter`，一般不需要额外创建 `vercel.json`。

## 16. 别人如何通过 GitHub 上传照片或视频

别人贡献作品时，不要直接去 Netlify 上传文件。

正确流程是：

1. 在 GitHub 上创建新分支。
2. 上传图片或视频文件。
3. 修改 `src/data/works.json`。
4. 创建 Pull Request。
5. 我审核 Pull Request。
6. 合并后 Netlify 自动部署正式网站。

图片上传位置：

`public/images/works/`

视频上传位置：

`public/videos/works/`

视频封面图也上传到：

`public/images/works/`

作品数据写在：

`src/data/works.json`

`image` 和 `video` 只写文件名，不写文件夹路径，不写电脑本地路径。

正确：

```json
"image": "my-photo-01.jpg"
```

错误：

```json
"image": "C:\\Users\\Name\\Desktop\\my-photo-01.jpg"
```

图片作品写：

```json
"mediaType": "image"
```

视频作品写：

```json
"mediaType": "video"
```

`featured: true` 表示首页精选。

`featured: false` 表示只在作品页显示。

`featuredOrder` 控制首页精选排序，数字越小越靠前。

Pull Request 创建后，GitHub Actions 会自动运行：

```bash
npm install
npm run validate-content
npm run build
```

Netlify 也会生成 Deploy Preview。审核时可以打开预览链接，检查图片、视频和作品数据是否正常。

如果图片或视频不显示，优先检查：

1. 文件是否放对文件夹。
2. `works.json` 里是否只写文件名。
3. 文件名大小写是否完全一致。
4. 是否忘记修改 `works.json`。
5. GitHub Actions 是否通过。
6. Netlify Deploy Preview 是否已经完成。

更详细的贡献说明见：

`CONTRIBUTOR_GUIDE.md`
