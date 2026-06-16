# 内容编辑说明

这个网站已经上线到 Netlify，并绑定了自定义域名：

`https://yuezhengwang.com`

网站是 Vite + React，现在主要用于展示 video / film projects。作品通常包含 poster / 静帧、Vimeo 嵌入视频、标题、年份、片长、格式、synopsis、credits，以及可选的 stills / screening history。

## 一、网站内容结构

网站现在大致分为这些页面：

- 首页：极简入口页面，只显示姓名、身份、简介和进入 Works / Bio / Contact 的链接。
- Works 页面：作品列表，显示每个作品的 poster / still、标题、年份、片长或格式。
- 单个作品详情页：展示 Vimeo 视频、poster、synopsis、credits、stills、screening history 等。
- Bio 页面：展示个人介绍。
- Contact 页面：展示邮箱和社交链接。

当前使用 HashRouter，线上地址通常是：

- 首页：`https://yuezhengwang.com/#/`
- Works：`https://yuezhengwang.com/#/works`
- 单个作品：`https://yuezhengwang.com/#/works/作品-slug`
- Bio：`https://yuezhengwang.com/#/about`
- Contact：`https://yuezhengwang.com/#/contact`

## 二、个人信息怎么修改

个人信息集中放在：

`src/data/siteContent.js`

在这个文件里修改：

- 网站标题：`siteTitle`
- 我的名字：`name`
- 首页身份 / 短介绍：`tagline`
- 首页简短介绍：`intro`
- Bio：`about`
- Email：`contact.email`
- Instagram 或其他社交链接：`contact.socialLinks`

修改时只改引号里面的文字，不要删除字段名。

## 三、作品数据怎么修改

作品数据集中放在：

`src/data/works.json`

每一个作品是一组 `{ ... }` 数据。当前每个作品支持这些字段：

`id`：作品唯一编号。每个作品都不能重复，例如 `work-014`。

`slug`：用于作品详情页网址。比如 `my-film-project` 会生成 `https://yuezhengwang.com/#/works/my-film-project`。slug 建议只用英文小写、数字和短横线。

`title`：作品标题。

`year`：年份，例如 `2026`。

`duration`：片长，例如 `8:32`。如果没有片长，可以写空字符串 `""`。

`format`：格式，例如 `Single-channel video, color, sound`。

`medium`：媒介，例如 `Video / Film / Installation`。

`poster`：作品封面图文件名。poster 放在 `public/images/works/`。

`image`：兼容旧组件的字段。通常让它和 `poster` 一样。

`stills`：作品静帧数组，例如 `["still-01.jpg", "still-02.jpg"]`。这些图片也放在 `public/images/works/`。

`vimeoEmbedUrl`：Vimeo 播放器地址，例如 `https://player.vimeo.com/video/123456789`。

`synopsis`：作品简介，适合写短段落。

`description`：兼容旧数据的字段。通常让它和 `synopsis` 一样。

`filemakerStatement`：导演阐述 / 创作自述，可选。如果有内容会在 synopsis 下面显示。

`credits`：字幕 / 制作人员数组，可以写导演、摄影、声音、剪辑、演员等，例如 `["Director: Yuezheng Wang", "Sound: Name"]`。

`screeningHistory`：放映经历数组，可选。例如 `["2026, Festival Name, City"]`。

`category`：分类，例如 `video`、`film`、`installation`、`photography`、`other`。

`featured`：是否首页精选或重点展示。`true` 表示精选，`false` 表示只在作品页显示。

`featuredOrder`：首页精选排序。数字越小越靠前。如果不需要排序，可以写 `null`。

## 四、如何添加 Vimeo 视频作品

推荐按下面步骤添加 video / film project：

### 第一步：上传视频到 Vimeo

1. 先把完整视频上传到 Vimeo。

2. 在 Vimeo 里复制 embed / player URL。

3. Vimeo URL 应该类似：

```text
https://player.vimeo.com/video/123456789
```

4. 不要把整段 iframe 粘进 `works.json`。

正确：

```json
"vimeoEmbedUrl": "https://player.vimeo.com/video/123456789"
```

错误：

```html
<iframe src="https://player.vimeo.com/video/123456789"></iframe>
```

5. 不要把大视频直接上传到 GitHub。

### 第二步：创建作品文件夹并准备图片

1. **创建文件夹** - 在 `public/images/works/` 里为这个作品创建一个独立文件夹

   文件夹名字建议和 id / slug 保持一致，例如：
   
   - 作品 id 是 `my-new-film`，就创建文件夹 `public/images/works/my-new-film/`
   - 作品 id 是 `work-002`，就创建文件夹 `public/images/works/work-002/`
   
   **在 VS Code 中创建文件夹的方式：**
   
   - 右键点击 `public/images/works/` 文件夹
   - 选择 "新建文件夹"
   - 输入文件夹名字（例如 `my-new-film`）
   - 确认创建
   
   **或者用命令行创建：**
   
   ```bash
   mkdir -p public/images/works/my-new-film
   ```

2. **准备作品图片** - 在刚创建的文件夹里放入图片文件：

   - **封面图（必选）**：这是在作品列表页（Works）显示的卡片图片。
     - 建议宽度 > 高度（16:9 或类似比例，如 landscape）
     - 命名建议：`cover.jpg` 或 `still-04.jpg` （选一张合适的 still 作为封面）
     - 存放在 `public/images/works/[作品-id]/`
   
   - **Poster 图（可选）**：可以是竖版、方版、或其他比例，展示在作品详情页。
     - 如果没有专门的 poster，可以省略这个字段
     - 如果有 poster，存放在 `public/images/works/[作品-id]/`
   
   - **Stills 图**：作品的其他截帧或静态图片，展示在详情页下方。
     - 推荐 2-4 张
     - 命名建议：`still-01.jpg`, `still-02.jpg`, 等

### 第三步：添加作品数据到 works.json

在 `src/data/works.json` 里添加作品信息。需要填写以下字段：

   - `cover`：选择用于列表卡片的图片文件名（**必选**）- 格式：`work-id/cover.jpg`
   - `poster`：可选，如果有专门的 poster 就填，没有可以留空或不填 - 格式：`work-id/poster.jpg`
   - `stills`：其他静帧文件名数组（可选）- 格式：`["work-id/still-01.jpg", "work-id/still-02.jpg"]`

**例如：**
   
```json
{
  "id": "my-new-film",
  "slug": "my-new-film",
  "title": "My New Film",
  "year": "2026",
  "duration": "10:36",
  "format": "Color, Stereo",
  "medium": "Film",
  "cover": "my-new-film/still-04.jpg",
  "poster": "my-new-film/poster.jpg",
  "stills": ["my-new-film/still-01.jpg", "my-new-film/still-02.jpg"],
  "vimeoEmbedUrl": "https://player.vimeo.com/video/123456789",
  "synopsis": "作品简介...",
  "credits": ["Director: Your Name"],
  "featured": false,
  "featuredOrder": null
}
```

**或者没有 poster：**
   
   
   ```json
   {
     "id": "new-work",
     "slug": "new-work",
     "title": "New Work",
     "cover": "new-work/cover.jpg",
     "stills": ["new-work/still-01.jpg"]
   }
   ```

### 第四步：本地检查

运行验证和构建检查：

```bash
npm run validate-content
npm run build
```

如果提示任何错误，检查：
- 文件夹名是否拼写正确
- JSON 中的路径是否与实际文件夹一致
- 所有文件是否真的存在

### 第五步：提交到 GitHub

通过 Git 提交所有改动：

```bash
git add .
git commit -m "Add new work: [作品名字]"
git push origin [你的分支名]
```

然后在 GitHub 上创建 Pull Request。

Netlify 会自动检查和部署。部署完成后，访问 `https://yuezhengwang.com/#/works/[slug]` 查看你的新作品。

### 完整工作流程总结

1. 创建文件夹 `public/images/works/work-xxx/`
2. 把图片（cover、poster、stills）放入文件夹
3. 在 `src/data/works.json` 中添加作品数据
4. 运行 `npm run validate-content` 和 `npm run build` 检查
5. `git add .` → `git commit` → `git push` 提交
6. 在 GitHub 创建 PR
7. 等待 Netlify 自动部署完成

**Vimeo 域名限制：**

如果 Vimeo 限制嵌入域名，请在 Vimeo 设置里允许：

- `yuezhengwang.com`
- `www.yuezhengwang.com`

## 五、poster 和 stills 图片命名规则

文件名建议使用：

- 英文
- 小写
- 数字
- 短横线 `-`
- 下划线 `_`

不要使用：

- 中文
- 空格
- 特殊符号

文件名大小写必须和数据里完全一致。

正确：

```json
"poster": "my-video-poster.jpg"
```

正确：

```json
"stills": ["my-video-still-01.jpg", "my-video-still-02.jpg"]
```

不要写：

```json
"poster": "public/images/works/my-video-poster.jpg"
```

不要写电脑本地路径：

```json
"poster": "C:\\Users\\Name\\Desktop\\my-video-poster.jpg"
```

`image`、`poster`、`stills` 里都只写文件名。

## 六、图片和视频存放规则

### 文件夹结构

为了保持文件夹整洁，建议按作品创建独立的文件夹来管理 poster 和 stills。

推荐结构：

```
public/images/works/
  work-001/
    poster.jpg
    still-01.jpg
    still-02.jpg
  work-002/
    poster.jpg
    still-01.jpg
  ...
```

在 `src/data/works.json` 中，这样引用：

```json
{
  "id": "work-001",
  "poster": "work-001/poster.jpg",
  "image": "work-001/poster.jpg",
  "stills": ["work-001/still-01.jpg", "work-001/still-02.jpg"]
}
```

### 存放位置

poster 放在：

`public/images/works/[作品-id]/`

stills 放在：

`public/images/works/[作品-id]/`

大视频不要放 GitHub，推荐上传到 Vimeo。

如果确实有很小的视频文件，才放在：

`public/videos/works/`

但本网站主要推荐 Vimeo 嵌入方式，也就是只在数据里保存 `vimeoEmbedUrl`。

## 七、作品数据示例

Vimeo 视频作品示例：

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
  "credits": ["Director: Yuezheng Wang", "Sound: Name"],
  "screeningHistory": ["2026, Screening Name, City"],
  "category": "film",
  "featured": false,
  "featuredOrder": null
}
```

没有 Vimeo 视频的作品，可以把 `vimeoEmbedUrl` 写成空字符串：

```json
"vimeoEmbedUrl": ""
```

## 八、如何运行本地检查

本地预览网站：

```bash
npm.cmd run dev
```

检查作品数据：

```bash
npm.cmd run validate-content
```

构建检查：

```bash
npm.cmd run build
```

如果项目没有 `validate-content` 命令，可以跳过，只运行：

```bash
npm.cmd run build
```

当前项目已经有 `validate-content`，建议每次更新作品后都运行。

## 九、如何更新线上网站

更新线上网站的流程：

1. 本地修改内容。
2. 运行：

```bash
npm.cmd run validate-content
npm.cmd run build
```

3. 打开 GitHub Desktop。
4. 写 commit 信息。
5. 点击 commit。
6. 点击 `Push origin`。
7. Netlify 会自动重新部署。
8. 等部署完成后，打开 `https://yuezhengwang.com` 检查。

## 十、别人作为 collaborator 如何添加内容

协作者不要直接改 `main`。

推荐流程：

1. 新建 branch。
2. 上传 poster / stills 到 `public/images/works/`。
3. 修改 `src/data/works.json`。
4. 创建 Pull Request。
5. 等 GitHub 自动检查。
6. 等 Netlify Deploy Preview。
7. 我审核后 merge。
8. merge 后 Netlify 自动更新正式网站。

如果是 Vimeo 视频作品，协作者只需要提交 poster、stills 和 `vimeoEmbedUrl`，不要上传大视频文件。

## 十一、常见错误排查

图片放进文件夹但没有写进 works 数据：

只把图片放到 `public/images/works/` 不够，还必须在 `src/data/works.json` 添加作品记录。

poster 文件名大小写不一致：

如果文件叫 `Poster.JPG`，数据里写 `poster.jpg`，线上可能找不到。

`vimeoEmbedUrl` 写成普通 Vimeo 页面链接：

错误：

```text
https://vimeo.com/123456789
```

正确：

```text
https://player.vimeo.com/video/123456789
```

把整段 iframe 粘进数据文件：

`works.json` 里只写 URL，不写 iframe。

把大 mp4 上传到 GitHub：

不推荐。大视频请上传到 Vimeo。

`featured` 写错：

正确是布尔值，不要加引号：

```json
"featured": true
```

不要写：

```json
"featured": "true"
```

slug 重复：

每个作品的 `slug` 必须唯一，否则详情页会混乱。

JSON 逗号或引号写错：

JSON 使用英文双引号和英文逗号。最后一个字段后面不要多写逗号。

build 失败但仍然 push：

不要这样做。请先修复错误，确认 `npm.cmd run build` 成功后再 push。
