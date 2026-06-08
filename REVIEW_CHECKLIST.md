# Pull Request 审核清单

审核 PR 时，先判断提交者属于哪一类：

- 普通投稿者：通常只添加作品，只应修改作品数据和素材文件。
- Trusted maintainer：可以维护网站内容、页面、样式和结构，但仍然应该通过 PR 和自动检查。

## 1. 先看 GitHub Actions

PR 页面底部的 Checks 应该通过：
- `Validate content`
- `Validate pull request scope`
- `Build`

push 到 `main` 时通常只运行内容检查和 build，不运行 scope 检查。

如果检查失败，不要合并。先点进失败项，看错误提示。

## 2. 普通投稿者 PR

普通投稿者通常只应修改：
- `src/data/works.json`
- `public/images/works/`
- `public/videos/works/`，仅在确实需要小视频文件时
- `CONTENT_GUIDE.md`
- `CONTRIBUTOR_GUIDE.md`

如果普通投稿者修改了下面内容，属于高风险，通常不要合并：
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

如果确实需要普通投稿者改网站代码，请由 owner 或 trusted maintainer 添加 `site-change-approved` 标签，并认真审核改动。

## 3. Trusted maintainer PR

Trusted maintainer 可以修改：
- 网站内容
- `src/data/siteContent.js`
- 作品数据
- 图片和必要的小视频
- 页面组件
- CSS
- 路由
- 文档

但仍然要确认：
- `npm run validate-content` 通过
- `npm run build` 通过
- Netlify Deploy Preview 能打开
- 首页仍然是极简入口
- Works 页面正常显示作品卡片
- 单个作品详情页可以根据 slug 打开
- Bio 和 Contact 页面正常
- 图片路径没有被写成本地路径
- Vimeo URL 没有被写错
- 作品详情页里的 Vimeo iframe 正常加载

如果 trusted maintainer 修改了下面文件，要特别认真看 diff：
- `package.json`
- `package-lock.json`
- `netlify.toml`
- `.github/`
- `scripts/`
- `.env`

这些修改可能影响依赖、安全、部署或自动检查。

## 4. site-change-approved 标签

`site-change-approved` 表示 owner 或 trusted maintainer 已经允许这个 PR 修改网站代码或配置。

这个标签只能由 owner 或 trusted maintainer 添加。

有这个标签不代表可以直接合并。它只代表文件范围检查放宽，内容检查和 build 仍然必须通过。

## 5. 作品数据检查

检查 `src/data/works.json`：
- `id` 是否唯一
- `slug` 是否唯一
- `title` 是否存在
- `year` 是否存在
- `duration` 是否合理
- `format` 是否存在
- `poster` 是否存在
- `image` 是否和 `poster` 兼容
- `stills` 是否是数组
- `vimeoEmbedUrl` 是否是 `https://player.vimeo.com/video/...`
- `synopsis` 是否存在
- `credits` 是否是数组
- `featured` 是否为 true 或 false
- `featuredOrder` 是否为数字或 null

## 6. 图片和 Vimeo 检查

检查：
- poster 和 stills 是否在 `public/images/works/`
- 数据里是否只写文件名
- 没有写 `public/images/works/xxx.jpg`
- 没有写 `C:\Users\...`
- 文件名大小写完全一致
- 文件名尽量英文、小写、无空格
- 没有把整段 iframe 写进 `works.json`
- 没有把普通 Vimeo 页面链接写成 embed URL
- 没有把大 mp4 视频上传到 GitHub

Vimeo iframe 应该只在作品详情页加载，不应该在首页或 Works 列表页加载大量 iframe。

## 7. Netlify Deploy Preview

仓库变成 public 后，Netlify 通常可以正常为朋友的 PR 创建 Deploy Preview。

打开 Netlify Deploy Preview，检查：
- 首页是否仍然极简
- `/works` 是否显示作品列表
- `/works/:slug` 是否能打开作品详情页
- `/about` 是否正常
- `/contact` 是否正常
- 图片、poster、stills 是否显示
- Vimeo 视频是否能播放
- 手机端排版是否没有明显破坏

如果 Netlify 没有自动重新部署，可以在 Netlify 后台找到对应站点，进入 Deploys，点击 Retry deploy 或 Trigger deploy。

## 8. 合并前结论

最后给出明确结论：

- 可以合并
或
- 暂时不要合并

如果暂时不要合并，请把需要修改的地方写成可以直接复制给对方的反馈。
