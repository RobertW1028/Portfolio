# Codex 后续沟通参考

## 1. 当前网站目标

这是一个 Vite + React 艺术作品集网站。

网站目标是保持简洁、安静、留白充足，适合艺术家或设计师展示作品、Bio 和联系方式。

不要重建项目，不要删除现有数据文件，不要引入数据库、后台、Tailwind、Next.js 或复杂 UI 框架。

## 2. 首页极简化需求

首页只做入口页面。

首页路径是：

`#/`

首页只显示：

- 姓名
- 身份，例如“艺术家 / 设计师”
- 一句简短介绍
- 主按钮“探索我的作品”
- 两个轻量文字链接“Bio”和“Contact”

首页不要直接展示：

- 作品网格
- Bio 长文
- Contact 详细信息
- 复杂导航栏
- 大块页脚

首页视觉方向：

- 白色或米白色背景
- 内容居中
- 页面高度接近 100vh
- 大量留白
- 干净字体
- 不要花哨动画

## 3. 页面结构

首页：

`#/`

只显示极简 Hero。

作品页：

`#/works`

显示作品网格，保留分类筛选，作品数据从 `src/data/works.json` 和 `src/data/works.js` 读取。

Bio 页面：

`#/about`

显示 About / Bio 内容，内容从 `src/data/siteContent.js` 读取。

Contact 页面：

`#/contact`

显示邮箱和社交链接，内容从 `src/data/siteContent.js` 读取。

## 4. 添加作品时参考

作品数据放在：

`src/data/works.json`

也可以运行：

```bash
npm run add-work
```

如果 PowerShell 拦截 npm，用：

```bash
npm.cmd run add-work
```

每个作品包含：

- `id`
- `title`
- `year`
- `medium`
- `description`
- `image`
- `video`
- `mediaType`
- `category`
- `featured`
- `featuredOrder`

`featured: true` 表示可以显示在首页精选逻辑中。

当前首页只做入口，不展示作品网格；作品主要在 `#/works` 查看。

如果未来恢复首页精选区，`featuredOrder` 数字越小越靠前。

## 5. 核心原则

内容集中管理：

- 个人信息、Bio、邮箱、社交链接放在 `src/data/siteContent.js`
- 作品数据放在 `src/data/works.json`
- 作品读取辅助函数放在 `src/data/works.js`

图片位置：

`public/images/works/`

视频位置：

`public/videos/works/`

图片和视频字段只写文件名，不写电脑本地路径。

正确：

```json
"image": "my-photo-01.jpg"
```

错误：

```json
"image": "C:\\Users\\Name\\Desktop\\my-photo-01.jpg"
```

首页只做入口，具体内容放到独立页面：

- 作品放到 `#/works`
- Bio 放到 `#/about`
- Contact 放到 `#/contact`



请继续优化我的 Vite + React 艺术作品集网站，让它适合之后通过 GitHub + 自动部署的方式，让其他人也可以提交作品内容。

我的目标：
- 网站会部署到 Vercel 或 Netlify。
- GitHub 仓库会作为网站内容和代码来源。
- 其他人可以帮我添加作品，但我不希望他们直接破坏正式网站。
- 最好让他们通过 Pull Request 提交，我审核后再合并上线。

请你不要重建项目，请基于当前项目修改和补充。

请完成以下任务：

1. 创建一个中文协作者说明文件

请创建：

CONTRIBUTOR_GUIDE.md

用中文写，面向完全不懂代码的人，说明别人如何帮我添加作品。

说明内容包括：
- 需要先有 GitHub 账号
- 如何上传图片到 public/images/works/
- 如何上传视频到 public/videos/works/
- 如何编辑 src/data/works.json
- image 字段应该怎么写
- video 字段应该怎么写
- 不要写电脑本地路径，例如 C:\Users\...
- 文件名要英文、小写、不要空格
- featured: true 是首页精选
- featured: false 是只在全部作品页显示
- featuredOrder 是首页排序
- 添加完成后如何提交 Pull Request
- 不要直接修改 main 分支
- 不要上传太大的图片或视频
- 提交前应该检查哪些东西

2. 创建 Pull Request 模板

请创建：

.github/pull_request_template.md

模板内容请包含：
- 本次添加了哪些作品
- 是否上传了图片
- 图片是否放在 public/images/works/
- 是否修改了 works.json
- 是否需要显示在首页
- 是否检查了文件名大小写
- 是否运行过 npm run build，如果没有运行也请填写原因
- 给我预览时需要特别注意什么

3. 创建内容检查脚本

请创建一个简单的 Node.js 检查脚本：

scripts/validate-content.mjs

功能：
- 读取 src/data/works.json
- 检查 JSON 是否格式正确
- 检查每个作品是否有 id、title、image、mediaType、category、featured
- 如果 mediaType 是 image，检查 public/images/works/ 里是否存在对应图片
- 如果 mediaType 是 video，检查 public/images/works/ 里是否存在封面图，并检查 public/videos/works/ 里是否存在对应视频
- 检查是否有重复 id
- 检查 featuredOrder 是否是数字或 null
- 如果有问题，用中文输出清楚
- 如果没问题，输出“作品内容检查通过”

4. 更新 package.json

请添加命令：

"validate-content": "node scripts/validate-content.mjs"

如果当前已经有 scripts/add-work.mjs，请保留它，不要删除。

5. 可选：添加 GitHub Actions 检查

如果适合，请创建：

.github/workflows/check.yml

让 GitHub 在别人提交 Pull Request 时自动运行：
npm install
npm run validate-content
npm run build

这样别人提交的内容如果破坏了网站，GitHub 可以提前发现。

6. 更新 CONTENT_GUIDE.md

请在 CONTENT_GUIDE.md 里增加一个部分：

“如果别人帮我添加作品，应该怎么做？”

请写清楚：
- 最安全方式是 Pull Request
- 不建议别人直接修改 main 分支
- main 分支代表正式网站
- 合并 Pull Request 后，Vercel 或 Netlify 会自动重新部署
- 如果图片没有显示，优先检查 image 文件名、图片文件夹、featured、featuredOrder

7. 请不要加入数据库
8. 请不要加入复杂后台
9. 请不要使用 Tailwind、Next.js 或复杂 UI 框架
10. 保持当前网站视觉风格

完成后请用中文告诉我：
- 你新增或修改了哪些文件
- 别人以后如何提交作品
- 我作为网站所有者应该如何审核
- 我应该如何运行内容检查
- 部署到 Vercel 或 Netlify 后，什么时候会自动更新