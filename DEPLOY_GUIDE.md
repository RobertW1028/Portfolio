# 部署说明：GitHub + Netlify / Vercel

这份说明写给完全不熟悉代码的人。照着做就可以把当前 Vite + React 艺术作品集网站发布到网上。

## 1. 本地预览网站

在项目根目录打开终端，运行：

```bash
npm.cmd run dev
```

终端会显示一个本地网址，通常是：

`http://127.0.0.1:5173/`

打开它就能预览网站。

如果你的 PowerShell 可以直接运行 npm，也可以用：

```bash
npm run dev
```

## 2. 上线前检查

上线前运行：

```bash
npm.cmd run build
```

如果成功，会生成 `dist` 文件夹。

如果看到报错，先不要上线，把报错修好后再部署。

## 3. 本地检查生产版本

构建成功后，可以运行：

```bash
npm.cmd run preview
```

这个命令会预览 `dist` 里的正式版本。

## 4. 哪些文件要上传到 GitHub

一般要上传这些：

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

简单理解：除了被 `.gitignore` 忽略的文件，项目代码和内容文件都应该上传。

## 5. 哪些文件不要上传到 GitHub

不要上传：

- `node_modules/`
- `dist/`
- `.env`
- 任何包含密码、token、secret 的文件

## 6. 为什么不要上传 node_modules

`node_modules` 是依赖安装后的文件夹，非常大，而且可以通过 `package.json` 和 `package-lock.json` 自动重新安装。

上传它会让 GitHub 仓库变得很重，也容易产生奇怪问题。

## 7. 为什么通常不要上传 dist

`dist` 是构建结果，可以通过 `npm run build` 自动生成。

Netlify 和 Vercel 会在服务器上自动运行构建命令，然后发布生成的 `dist`。

除非你明确选择“手动部署 dist 文件夹”，否则通常不要把 `dist` 上传到 GitHub。

## 8. 用 GitHub Desktop 上传项目到 GitHub

1. 打开 GitHub Desktop。
2. 选择 `File` -> `Add Local Repository...`。
3. 选择这个项目文件夹。
4. 如果提示还不是 Git 仓库，可以选择创建仓库。
5. 在左下角填写 commit 信息，比如 `Prepare portfolio for deployment`。
6. 点击 `Commit to main`。
7. 点击 `Publish repository`。
8. 确认不要勾选上传隐私文件或奇怪的大文件。
9. 发布完成后，你会在 GitHub 网站上看到这个仓库。

每次更新作品或文字后，都需要再次 commit 和 push。

## 9. 用 Netlify 连接 GitHub 部署

1. 打开 Netlify。
2. 选择 `Add new site`。
3. 选择 `Import an existing project`。
4. 连接 GitHub。
5. 选择你的作品集仓库。
6. Build command 填：

```bash
npm run build
```

7. Publish directory 填：

```bash
dist
```

8. 点击 Deploy。

本项目根目录已经有 `netlify.toml`，里面也写了同样的配置：

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

## 10. 用 Vercel 连接 GitHub 部署

1. 打开 Vercel。
2. 选择 `Add New Project`。
3. 导入你的 GitHub 仓库。
4. Framework Preset 通常会自动识别为 Vite。
5. Build Command 填：

```bash
npm run build
```

6. Output Directory 填：

```bash
dist
```

7. Install Command 可以保持默认：

```bash
npm install
```

8. 点击 Deploy。

当前项目使用 `HashRouter`，页面地址会像 `#/works`、`#/about`、`#/contact`，一般不需要额外配置 `vercel.json`。

## 11. 关于刷新页面 404

当前项目使用 `HashRouter`。

作品页地址类似：

`https://你的域名/#/works`

Bio 页面地址类似：

`https://你的域名/#/about`

Contact 页面地址类似：

`https://你的域名/#/contact`

因为路由在 `#` 后面，静态平台刷新页面时通常不会 404。

## 12. 网站上线后如何更新作品

1. 把新图片放到：

`public/images/works/`

2. 把新视频放到：

`public/videos/works/`

3. 修改作品数据：

`src/data/works.json`

或者运行：

```bash
npm.cmd run add-work
```

4. 本地运行：

```bash
npm.cmd run build
```

5. 在 GitHub Desktop 里 commit。
6. push 到 GitHub。
7. Netlify 或 Vercel 会自动重新部署。

## 13. 为什么每次更新后要 commit 和 push

Netlify 和 Vercel 是从 GitHub 仓库读取代码来部署的。

如果你只在电脑里改了文件，但没有 commit 和 push，GitHub 上的仓库不会更新，线上网站也不会更新。

## 14. 如果图片上线后不显示，检查这些地方

第一，图片是否真的放在：

`public/images/works/`

第二，`src/data/works.json` 里的 `image` 是否只写文件名，比如：

```json
"image": "13.jpg"
```

不要写：

```json
"image": "C:\\Users\\..."
```

第三，文件名大小写是否完全一致。

如果文件叫 `13.JPG`，但数据里写 `13.jpg`，有些线上服务器会认为这是两个不同文件。

第四，是否忘记 commit 和 push。

第五，部署平台是否已经重新部署完成。

第六，如果是视频封面图，也要放在 `public/images/works/`。

## 15. 如果视频上线后不显示，检查这些地方

视频文件应该放在：

`public/videos/works/`

`src/data/works.json` 里的 `video` 只写文件名：

```json
"video": "performance-001.mp4"
```

视频作品通常还需要：

```json
"mediaType": "video"
```

封面图写在 `image` 字段里，并放到 `public/images/works/`。
