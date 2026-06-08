# Project instructions

这是一个已经上线的个人艺术作品集网站。

正式域名：
https://yuezhengwang.com

技术栈：
- Vite
- React
- Netlify
- GitHub

网站结构：
- 首页是极简入口
- Works 页面展示作品列表
- 单个作品详情页展示 video / film project
- Bio 页面展示人物介绍
- Contact 页面展示联系方式

## Review guidelines

Codex 审核 Pull Request 时，请先判断提交者类型：

- 普通投稿者：通常只添加作品，只应修改作品数据、图片、必要的小视频和说明文档。
- Trusted maintainer：可以修改网站内容、`siteContent`、页面结构、组件、CSS、路由、作品数据、Vimeo 项目内容和文档，但仍然必须通过内容检查和 build。

Codex review 不应建议随便使用 bypass rules。检查失败时，应先说明失败原因和修复方式。

## 普通投稿者 PR

普通添加作品通常只允许修改：
- `src/data/works.json` 或当前实际作品数据文件
- `public/images/works/`
- `public/videos/works/`，仅在确实需要小视频文件时
- `CONTENT_GUIDE.md` 或 `CONTRIBUTOR_GUIDE.md`，只有说明文档需要时

如果普通投稿者 PR 修改以下内容，请标记为高风险：
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `netlify.toml`
- `src/components/`
- `src/pages/`
- `src/App.jsx`
- `src/main.jsx`
- `.github/`
- `scripts/`
- `.env` 或任何密钥文件

普通投稿者如需修改网站代码，应由 owner 或 trusted maintainer 添加 `site-change-approved` 标签后再审核。

## Trusted maintainer PR

Trusted maintainer PR 可以修改代码和样式，但 Codex 仍然必须检查：
- GitHub Actions 是否全部通过
- `npm run validate-content` 是否通过
- `npm run build` 是否通过
- Netlify Deploy Preview 是否能打开
- 首页是否仍然保持极简入口
- Works 页面是否显示作品卡片
- 作品详情页是否可以根据 slug 打开
- Bio 和 Contact 页面是否正常
- 图片路径是否仍然只使用文件名
- 是否没有出现 `C:\Users\...` 这种本地路径
- Vimeo URL 是否仍然使用 `https://player.vimeo.com/video/...`
- Vimeo iframe 是否只在作品详情页加载
- 手机端布局是否没有明显破坏

如果 trusted maintainer 修改以下文件，请提醒 reviewer 认真审核：
- `package.json`
- `package-lock.json`
- `netlify.toml`
- `.github/`
- `scripts/`
- `.env`

## site-change-approved 标签

`site-change-approved` 标签表示 owner 或 trusted maintainer 已经允许该 PR 修改网站代码或配置。

这个标签只应由 owner 或 trusted maintainer 添加。普通 collaborator 不应该自己添加。

有这个标签不代表可以跳过检查。所有 PR 仍然需要通过内容检查和 build。

## 作品数据检查

请检查：
- `id` 是否唯一
- `slug` 是否唯一
- `title` 是否存在
- `year` 是否存在
- `duration` 是否合理
- `format` 是否存在
- `poster` 是否存在
- `image` 是否和 `poster` 兼容
- `stills` 是否为数组
- `vimeoEmbedUrl` 是否是 `https://player.vimeo.com/video/...` 格式
- `synopsis` 是否存在
- `credits` 是否格式正确
- `featured` 是否为 true 或 false
- `featuredOrder` 是否为数字或 null

## 文件路径检查

请检查：
- poster 和 stills 是否都放在 `public/images/works/`
- 数据文件里只写文件名，不要写 `public/images/works/xxx.jpg`
- 不要写 `C:\Users\...` 这种本地路径
- 文件名大小写是否一致
- 文件名建议英文、小写、无空格

## Vimeo 检查

请检查：
- 不要把整段 iframe 写进 `works.json`
- `vimeoEmbedUrl` 只保存 player URL
- 不要把大 mp4 上传到 GitHub
- 首页和 Works 列表不要加载大量 Vimeo iframe
- Vimeo iframe 应该只在作品详情页加载

## 页面结构检查

请检查：
- 首页仍然保持极简入口
- Works 页面显示作品卡片
- 作品详情页可以根据 slug 打开
- Bio 和 Contact 页面仍然正常
- 不要把大量作品重新堆回首页

## 合并建议

Codex review 最后请明确给出：
- 可以合并
或
- 暂时不要合并

如果暂时不要合并，请列出 collaborator 需要修改的地方，并写成可以直接复制给对方的反馈。
