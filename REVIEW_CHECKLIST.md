# Pull Request 审核清单

审核别人提交的作品 Pull Request 时，可以按下面顺序检查。

## 1. 自动检查是否全部绿色

先看 GitHub Pull Request 页面底部的 Checks。

应该通过：

- `Validate content`
- `Validate pull request scope`
- `Build`
- 如果修改了依赖，还会有 `Dependency Review`

如果有红色失败，不要急着合并。先点进去看中文错误提示。

## 2. Netlify Deploy Preview 是否正常

打开 Netlify Deploy Preview。

检查页面是否能打开，作品页是否能加载。

## 3. 新增作品是否显示

打开作品页：

`#/works`

检查新增作品是否出现。

如果作品设置了 `featured: true`，也检查首页精选逻辑是否符合预期。

## 4. 图片和视频是否加载正常

检查：

- 图片是否显示
- 视频封面图是否显示
- 视频是否能播放
- 文件名大小写是否和数据一致

## 5. 如果有人改了代码文件，要更加谨慎

普通作品投稿通常不应该修改：

- `src/components/`
- `src/pages/`
- `src/App.jsx`
- `package.json`
- `package-lock.json`
- `.github/workflows/`
- `scripts/`

如果有人改了这些文件，先确认是不是事先获得了你的同意。

## 6. 如果只是添加作品，通常只应修改这些地方

- `src/data/works.json`
- `public/images/works/`
- `public/videos/works/`
- `CONTENT_GUIDE.md`
- `CONTRIBUTOR_GUIDE.md`

## 7. 合并前最后确认

- PR 模板是否填写清楚
- GitHub 自动检查是否全部通过
- Netlify Deploy Preview 是否正常
- 新作品是否在正确页面显示
- 没有上传过大的文件
- 没有写 `C:\Users\...` 这种本地路径

确认无误后，再合并 Pull Request。
