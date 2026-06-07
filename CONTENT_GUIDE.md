# 内容编辑说明

网站内容主要在两个地方：

`src/data/siteContent.js`：姓名、简介、邮箱、社交链接。

`src/data/works.json`：所有作品数据。

## 为什么图片放进文件夹后不一定会显示

把图片放进 `public/images/works/` 只是第一步。

网站还需要知道这张图片属于哪个作品，所以还要在 `src/data/works.json` 里添加一条作品信息。

如果只放了图片，但没有在 `works.json` 里写作品记录，页面不会自动显示它。

如果 `works.json` 里写了作品，但 `image` 文件名写错，也不会显示正确图片。

## 图片应该放在哪里

所有作品图片和视频封面图都放在：

`public/images/works/`

例如：

`public/images/works/my-photo-01.jpg`

## 视频应该放在哪里

所有视频文件都放在：

`public/videos/works/`

例如：

`public/videos/works/performance-001.mp4`

## image 字段应该怎么写

`image` 只写文件名。

正确：

```json
"image": "my-photo-01.jpg"
```

不要写电脑本地路径。

错误：

```json
"image": "C:\\Users\\你的名字\\Desktop\\my-photo-01.jpg"
```

网站会自动把文件名拼成：

`/images/works/my-photo-01.jpg`

## video 字段应该怎么写

图片作品不需要视频，写空字符串：

```json
"video": ""
```

视频作品只写视频文件名：

```json
"video": "performance-001.mp4"
```

网站会自动从这里读取视频：

`/videos/works/performance-001.mp4`

## 文件名注意事项

文件名大小写要保持一致。

如果文件叫 `My-Photo.JPG`，数据里写 `my-photo.jpg` 可能找不到。

推荐使用英文、小写、数字和短横线。

推荐：

`my-photo-01.jpg`

`performance-001.mp4`

不推荐：

`我的 照片 01.JPG`

`Final Video 最终版.mp4`

尽量不要使用中文、空格和特殊符号。

## featured 是什么意思

```json
"featured": true
```

表示显示在首页“精选作品”区域。

```json
"featured": false
```

表示只显示在“全部作品”页面，不显示在首页。

## featuredOrder 是什么意思

`featuredOrder` 用来控制首页精选作品的排序。

数字越小，越靠前。

例如：

```json
"featured": true,
"featuredOrder": 1
```

这个作品会排在首页精选作品前面。

没有 `featuredOrder` 的精选作品会排在有排序数字的作品后面。

首页最多只显示 6 个精选作品。即使某个作品写了 `"featured": true`，如果它排序在第 7 个以后，也不会显示在首页，但仍然会显示在全部作品页面。

## 如何让新作品显示在首页

在 `src/data/works.json` 里，把作品设置成：

```json
"featured": true,
"featuredOrder": 1
```

如果想排第二，就写：

```json
"featuredOrder": 2
```

首页最多显示 6 个精选作品。

## 如何让新作品只显示在全部作品页面

设置：

```json
"featured": false
```

这样作品不会出现在首页，但会出现在全部作品页面。

## 图片作品示例

```json
{
  "id": "work-012",
  "title": "新照片作品",
  "year": "2026",
  "medium": "Photography",
  "description": "这里写作品简介。",
  "image": "my-photo-01.jpg",
  "video": "",
  "mediaType": "image",
  "category": "photography",
  "featured": true,
  "featuredOrder": 1
}
```

## 视频作品示例

```json
{
  "id": "work-013",
  "title": "新视频作品",
  "year": "2026",
  "medium": "Video",
  "description": "这里写视频作品简介。",
  "image": "performance-001-cover.jpg",
  "video": "performance-001.mp4",
  "mediaType": "video",
  "category": "video",
  "featured": false
}
```

视频作品的 `image` 是封面图文件名。

视频作品的 `video` 是视频文件名。

## 用命令添加作品

推荐运行：

```bash
npm run add-work
```

如果 PowerShell 拦截 npm，请用：

```bash
npm.cmd run add-work
```

它会问你：

- 作品标题
- 年份
- 媒介
- 简介
- 图片文件名
- 分类
- 是否显示在首页
- 如果显示在首页，首页排序数字是多少

如果图片不存在，它会用中文提示，但不会崩溃。

## 检查网站

开发预览：

```bash
npm run dev
```

构建检查：

```bash
npm run build
```

如果 PowerShell 拦截 npm，请用：

```bash
npm.cmd run dev
npm.cmd run build
```
