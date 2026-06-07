import { execFileSync } from 'node:child_process'

const allowedExactFiles = new Set([
  'src/data/works.json',
  'CONTENT_GUIDE.md',
  'CONTRIBUTOR_GUIDE.md',
])

const allowedDirectories = [
  'public/images/works/',
  'public/videos/works/',
]

const blockedPrefixes = [
  'src/components/',
  'src/pages/',
  '.github/workflows/',
  'scripts/',
]

const blockedExactFiles = new Set([
  'package.json',
  'package-lock.json',
  'vite.config.js',
  'netlify.toml',
  'src/App.jsx',
  'src/main.jsx',
  '.env',
])

function getChangedFiles() {
  try {
    return execFileSync('git', ['diff', '--name-only', 'origin/main...HEAD'], {
      encoding: 'utf8',
    })
      .split(/\r?\n/)
      .map((file) => file.trim())
      .filter(Boolean)
  } catch (error) {
    console.error('无法获取 origin/main...HEAD 的变更文件列表。')
    console.error('请确认 GitHub Actions 使用 actions/checkout，并设置 fetch-depth: 0。')
    console.error('如果在本地运行，请先执行 git fetch origin main。')
    process.exit(1)
  }
}

function isAllowed(file) {
  return allowedExactFiles.has(file) || allowedDirectories.some((directory) => file.startsWith(directory))
}

function isBlocked(file) {
  return blockedExactFiles.has(file) || blockedPrefixes.some((prefix) => file.startsWith(prefix))
}

const changedFiles = getChangedFiles()
const blockedFiles = changedFiles.filter((file) => !isAllowed(file) || isBlocked(file))

if (blockedFiles.length > 0) {
  console.error('普通作品投稿只能修改作品数据、图片、视频和贡献说明。')
  console.error('下面这些文件不允许在普通作品投稿 PR 中修改：')
  blockedFiles.forEach((file) => {
    console.error(`- ${file}`)
  })
  console.error('如果这是站点代码维护，请由管理员单独审核，或临时不使用这条检查。')
  process.exit(1)
}

console.log('Pull Request 修改范围检查通过')
