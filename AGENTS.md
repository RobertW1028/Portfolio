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


# Project instructions for Codex

This is a Vite + React personal art portfolio website.

The site is already deployed on Netlify.

Production domain:
https://yuezhengwang.com

GitHub repository:
RobertW1028 / Portfolio

The user is a technical beginner. When reporting back, always explain clearly in Chinese:
- what you changed
- why you changed it
- which files were modified
- what command the user should run next
- whether it is safe to push / merge / deploy

Do not assume the user understands Git, GitHub, Netlify, DNS, npm, React, Vite, PR, branch, build, or deploy.

Use simple Chinese explanations.

## Important behavior rules

1. Do not push to GitHub unless explicitly asked.
2. Do not merge Pull Requests unless explicitly asked.
3. Do not operate Netlify directly.
4. Do not change DNS or domain settings.
5. Do not delete existing works, images, routes, or content unless explicitly asked.
6. Do not introduce databases, backend systems, Tailwind, Next.js, CMS, or complex UI frameworks unless explicitly requested.
7. Keep the visual style minimal, clean, restrained, and suitable for an artist portfolio.
8. Prefer small, reversible changes over large rewrites.
9. Before making structural changes, inspect the current project structure.
10. After changes, run checks when possible:
    - npm run validate-content
    - npm run build
    If PowerShell blocks npm, tell the user to use:
    - npm.cmd run validate-content
    - npm.cmd run build

## Current website structure

The website should remain minimal.

Home page:
- Acts as a simple entry page.
- Shows artist/site name and simple navigation.
- Should not be crowded with large work grids, long bio, or contact details.

Global navigation:
- Wayne should link back to home.
- Works links to the works page.
- Bio links to the bio/about page.
- Contact links to the contact page.

Works page:
- Shows work/project cards.
- Cards should use poster/still images.
- Do not load many Vimeo iframes on the works listing page.
- Clicking a card may open a detail page.

Work detail page:
- Designed for video / film projects.
- Should support:
  - poster or still image
  - Vimeo embed
  - title
  - year
  - duration
  - format
  - synopsis
  - credits
  - optional stills
  - optional screening history

Bio page:
- Shows the artist bio.
- Should not include a redundant internal Home bar if the global nav already has Wayne linking home.

Contact page:
- Shows contact info.
- Should not include a redundant internal Home bar if the global nav already has Wayne linking home.

## Content management

Keep content centralized.

Personal/site content should usually live in:
src/data/siteContent.js

Works data should usually live in:
src/data/works.json
or the actual current works data file.

Images, posters, and stills should live in:
public/images/works/

Small local video files, only if truly needed, may live in:
public/videos/works/

Large video files should not be committed to GitHub. Use Vimeo instead.

Do not hard-code user-facing personal content across many components if it can be read from data files.

## Video / film project data model

Works may include these fields:

- id
- slug
- title
- year
- duration
- format
- medium
- poster
- image
- stills
- vimeoEmbedUrl
- synopsis
- description
- credits
- screeningHistory
- category
- featured
- featuredOrder

Field expectations:
- id must be unique.
- slug must be unique and URL-safe.
- poster should be a filename only, not a path.
- image may mirror poster for compatibility.
- stills should be an array of filenames.
- vimeoEmbedUrl should look like:
  https://player.vimeo.com/video/123456789
- Do not store a full iframe string in works data.
- Do not use local machine paths such as C:\Users\...
- Do not use public/images/works/file.jpg inside data fields; use only file.jpg.
- featured should be true or false.
- featuredOrder should be a number or null.

## File naming rules

For images and stills:
- Use English lowercase filenames.
- Avoid spaces.
- Avoid Chinese characters.
- Avoid special symbols.
- Use hyphens or underscores if needed.
- Ensure file name case exactly matches the data file.

Good:
night-study-poster.jpg
night-study-still-01.jpg

Bad:
我的作品.jpg
Work 1.JPG
final version!!.png

## Netlify deployment

The site is deployed on Netlify.

If the project uses BrowserRouter, Netlify needs SPA fallback so refreshing non-home pages does not show 404.

Preferred netlify.toml:

[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

Alternative:
public/_redirects with:

/* /index.html 200

The file must be in the correct location:
- netlify.toml at project root
- _redirects inside public/

If /works, /bio, /about, or /contact refresh to 404 on Netlify, check SPA fallback first.

## GitHub collaboration model

main represents the production site.

Collaborators should work through Pull Requests.

Recommended flow:
branch → changes → Pull Request → GitHub Actions → Netlify Deploy Preview → review → merge → Netlify production deploy

There are two contributor types:

### Ordinary contributor

Ordinary contributors should only change:
- works data file
- public/images/works/
- public/videos/works/, only if necessary
- CONTENT_GUIDE.md
- CONTRIBUTOR_GUIDE.md

If an ordinary contributor modifies code/config files, mark it as high risk.

High-risk files include:
- src/components/
- src/pages/
- src/App.jsx
- src/main.jsx
- package.json
- package-lock.json
- vite.config.js
- netlify.toml
- .github/
- scripts/

### Trusted maintainer

Trusted maintainers may modify:
- siteContent
- components
- pages
- CSS
- routes
- works data
- documentation

But they still must pass:
- validate-content
- build

If a trusted maintainer modifies package.json, netlify.toml, .github, scripts, or deployment configuration, warn the user clearly and recommend extra review.

## GitHub Actions expectations

The project may include:
- scripts/validate-content.mjs
- scripts/validate-pr-scope.mjs
- .github/workflows/check.yml

The workflow should generally:
- On pull_request:
  - install dependencies
  - run validate-content
  - run validate-pr-scope
  - run build
- On push to main:
  - run validate-content
  - run build
  - usually skip validate-pr-scope

For PR author detection, prefer:
github.event.pull_request.user.login

Do not rely only on GITHUB_ACTOR because rerunning jobs can make GITHUB_ACTOR refer to the person rerunning the job rather than the PR author.

If labels are needed, pass PR labels explicitly.

## Pull Request review guidelines

When reviewing a PR, check:

1. Does it build?
2. Does it affect Netlify deployment?
3. Does it break SPA routing or cause refresh 404?
4. Does it preserve the minimal home page?
5. Does it keep Works, Bio, and Contact working?
6. Does it change any high-risk files?
7. Does it include sensitive information?
8. Does it include node_modules, dist, .env, keys, tokens, or large media files?
9. Are image paths and filenames correct?
10. Are Vimeo URLs in correct player format?
11. Are id and slug unique?
12. Are data fields valid?
13. Does the Netlify Deploy Preview look correct?
14. Should the user push, wait, or not merge?

Every PR review should end with one of:

可以合并

or

暂时不要合并

If not mergeable, list concrete fixes in Chinese that the collaborator can follow.

## User communication style

The user is a beginner. Always report in Chinese using plain language.

When finishing a task, include:

1. 修改了哪些文件
2. 为什么这样改
3. 是否通过 build
4. 是否需要用户自己运行命令
5. 是否可以 push
6. 是否可以 merge
7. 下一步应该做什么

If the user is about to do something risky, warn clearly.

Risky actions include:
- bypass branch protection
- force merge
- deleting deploys
- deleting DNS records
- changing nameservers
- deleting files
- changing package.json
- changing Netlify config
- changing GitHub Actions
- making repository public/private
- removing branch protection