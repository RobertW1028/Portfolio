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

Codex 审核 Pull Request 时，请重点检查：

1. 普通 collaborator 是否只修改允许修改的文件。

普通添加作品通常只允许修改：
- src/data/works.json 或当前实际作品数据文件
- public/images/works/
- public/videos/works/，仅在确实需要小视频文件时
- CONTENT_GUIDE.md 或 CONTRIBUTOR_GUIDE.md，只有说明文档需要时

如果 PR 修改以下内容，请标记为高风险：
- package.json
- package-lock.json
- vite.config.js
- netlify.toml
- src/components/
- src/pages/
- src/App.jsx
- src/main.jsx
- .github/
- scripts/
- .env 或任何密钥文件

2. 作品数据检查

请检查：
- id 是否唯一
- slug 是否唯一
- title 是否存在
- year 是否存在
- duration 是否合理
- format 是否存在
- poster 是否存在
- image 是否和 poster 兼容
- stills 是否为数组
- vimeoEmbedUrl 是否是 https://player.vimeo.com/video/... 格式
- synopsis 是否存在
- credits 是否格式正确
- featured 是否为 true 或 false
- featuredOrder 是否为数字或 null

3. 文件路径检查

请检查：
- poster 和 stills 是否都放在 public/images/works/
- 数据文件里只写文件名，不要写 public/images/works/xxx.jpg
- 不要写 C:\Users\... 这种本地路径
- 文件名大小写是否一致
- 文件名建议英文、小写、无空格

4. Vimeo 检查

请检查：
- 不要把整段 iframe 写进 works.json
- vimeoEmbedUrl 只保存 player URL
- 不要把大 mp4 上传到 GitHub
- 首页和 Works 列表不要加载大量 Vimeo iframe
- Vimeo iframe 应该只在作品详情页加载

5. 页面结构检查

请检查：
- 首页仍然保持极简入口
- Works 页面显示作品卡片
- 作品详情页可以根据 slug 打开
- Bio 和 Contact 页面仍然正常
- 不要把大量作品重新堆回首页

6. 合并建议

Codex review 最后请明确给出：
- 可以合并
或
- 暂时不要合并

如果暂时不要合并，请列出 collaborator 需要修改的地方，并写成可以直接复制给对方的反馈。
