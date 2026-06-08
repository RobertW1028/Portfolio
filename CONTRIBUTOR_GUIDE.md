# 贡献作品说明

这份说明写给完全不会代码的人。你可以通过 GitHub 给这个艺术作品集网站提交照片或视频作品。

## 1. 网站更新方式

这个网站的更新方式是：

GitHub 修改内容 → 创建 Pull Request → 自动检查 → 我审核合并 → Netlify 自动部署。

请不要直接去 Netlify 上传作品。

Netlify 会自动从 GitHub 读取最新代码并发布网站。

## 2. 不要直接修改 main 分支

请不要直接修改 `main` 分支。

正确做法是：

1. 创建一个新分支。
2. 在新分支里上传图片、视频和修改作品数据。
3. 创建 Pull Request。
4. 等 GitHub 自动检查完成。
5. 按错误提示修复问题。
6. 等我审核。
7. 我确认没有问题后再合并。

合并后 Netlify 会自动更新正式网站。

## 3. Pull Request 会自动检查什么

Pull Request 会自动运行：

```bash
npm run validate-content
npm run validate-pr-scope
npm run build
```

自动检查会发现常见错误，例如：

- 图片文件不存在
- 视频文件不存在
- 文件名写错
- 写了 `C:\Users\...` 这种本地路径
- `mediaType` 写错
- `featured` 写成字符串
- `id` 重复
- 修改了不该修改的网站代码文件

如果检查失败，请点开 GitHub 里的失败项目，根据中文错误提示修改。

## 4. 不要修改网站代码

普通作品投稿不要修改网站代码，除非事先获得我同意。

不要修改：

- `src/components/`
- `src/pages/`
- `src/App.jsx`
- `package.json`
- `package-lock.json`
- `.github/workflows/`
- `scripts/`

普通作品投稿通常只需要修改：

- `src/data/works.json`
- `public/images/works/`
- `public/videos/works/`

## 5. 图片放在哪里

所有作品图片放在：

`public/images/works/`

视频封面图也放在：

`public/images/works/`

例如：

`public/images/works/my-photo-01.jpg`

## 6. 视频放在哪里

所有视频文件放在：

`public/videos/works/`

例如：

`public/videos/works/performance-001.mp4`

## 7. 作品数据在哪里

作品数据在：

`src/data/works.json`

网站不会自动扫描图片文件夹。上传图片后，还必须在 `works.json` 里添加作品信息。

## 8. 文件名规则

文件名建议使用英文、小写、数字、短横线或下划线。

推荐：

`my-photo-01.jpg`

`performance_001.mp4`

不推荐：

`我的 照片 01.JPG`

`Final Video 最终版.mp4`

不要使用空格、中文或特殊符号。

不要上传过大的图片或视频。建议图片小于 5MB，视频小于 25MB。

## 9. 不要写电脑本地路径

`image` 和 `video` 字段只写文件名。

正确：

```json
"image": "my-photo-01.jpg"
```

正确：

```json
"video": "performance-001.mp4"
```

错误：

```json
"image": "C:\\Users\\Name\\Desktop\\my-photo-01.jpg"
```

错误：

```json
"image": "public/images/works/my-photo-01.jpg"
```

## 10. 图片作品怎么写

图片作品示例：

```json
{
  "id": "work-012",
  "title": "作品标题",
  "year": "2026",
  "medium": "Photography",
  "description": "作品简介。",
  "image": "my-photo-01.jpg",
  "video": "",
  "mediaType": "image",
  "category": "photography",
  "featured": false,
  "featuredOrder": null
}
```

图片作品的 `mediaType` 写：

```json
"mediaType": "image"
```

图片作品的 `video` 写空字符串：

```json
"video": ""
```

## 11. 视频作品怎么写

视频作品需要两个文件：

- 视频封面图，放在 `public/images/works/`
- 视频文件，放在 `public/videos/works/`

视频作品示例：

```json
{
  "id": "work-013",
  "title": "视频作品标题",
  "year": "2026",
  "medium": "Video",
  "description": "视频作品简介。",
  "image": "performance-001-cover.jpg",
  "video": "performance-001.mp4",
  "mediaType": "video",
  "category": "video",
  "featured": false,
  "featuredOrder": null
}
```

视频作品的 `mediaType` 写：

```json
"mediaType": "video"
```

## 12. featured 和 featuredOrder

```json
"featured": true
```

表示首页精选。

```json
"featured": false
```

表示只在作品页显示。

如果需要控制首页精选排序，可以写：

```json
"featuredOrder": 1
```

数字越小越靠前。

如果不需要首页精选排序，写：

```json
"featuredOrder": null
```

## 13. 如何创建 Pull Request

1. 修改完成后，GitHub 通常会提示 `Compare & pull request`。
2. 点击它。
3. 填写本次添加了哪些作品。
4. 按 Pull Request 模板勾选检查项。
5. 提交 Pull Request。
6. 等自动检查完成。

我会审核 Pull Request。确认文件位置、作品数据和预览效果没问题后，再合并到 `main`。

## 14. Netlify 预览和正式部署

创建 Pull Request 后，Netlify 通常会生成 Deploy Preview。

你可以打开 Deploy Preview 检查作品是否显示正常。

Pull Request 合并后，Netlify 会自动更新正式网站。

## 15. 提交前自查

提交前请检查：

- 图片是否在 `public/images/works/`
- 视频是否在 `public/videos/works/`
- 视频是否有封面图
- `works.json` 是否添加了作品信息
- `image` 和 `video` 是否只写文件名
- 文件名大小写是否一致
- `mediaType` 是否写对
- `featured` 是否写成 true 或 false
- 没有直接修改 `main` 分支
- 没有修改网站代码，除非事先获得同意

## 16. 如何添加 Vimeo 视频作品

这个网站现在主要适合提交 video / film projects。

请先把完整视频上传到 Vimeo，再把 Vimeo player URL 写进作品数据。

不要把大视频直接上传到 GitHub。

推荐提交内容：

- poster：放在 `public/images/works/`
- film stills：放在 `public/images/works/`
- Vimeo player URL：写在 `src/data/works.json` 的 `vimeoEmbedUrl`

Vimeo player URL 应该像这样：

```text
https://player.vimeo.com/video/123456789
```

不要粘贴整段 iframe。

如果 Vimeo 限制嵌入域名，请允许：

`yuezhengwang.com`

`www.yuezhengwang.com`

作品数据示例：

```json
{
  "id": "work-014",
  "slug": "new-film-project",
  "title": "New Film Project",
  "year": "2026",
  "duration": "8:32",
  "format": "Single-channel video, color, sound",
  "medium": "Video / Film",
  "poster": "new-film-poster.jpg",
  "image": "new-film-poster.jpg",
  "stills": ["new-film-still-01.jpg", "new-film-still-02.jpg"],
  "vimeoEmbedUrl": "https://player.vimeo.com/video/123456789",
  "synopsis": "这里写简短作品简介。",
  "description": "这里写简短作品简介。",
  "credits": ["Director: Name", "Sound: Name"],
  "screeningHistory": [],
  "category": "film",
  "featured": false,
  "featuredOrder": null
}
```

提交前请运行或等待 GitHub 自动运行：

```bash
npm run validate-content
npm run build
```
