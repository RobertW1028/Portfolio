import { execFileSync } from 'node:child_process'

// 请把下面两个占位符改成真实 GitHub 用户名。
// Trusted maintainer 可以修改网站内容、页面、组件、CSS、路由和文档。
const trustedMaintainers = [
  'RobertW1028',
  'yuezhengwang66',
]

const approvalLabel = 'site-change-approved'

const allowedExactFiles = new Set([
  'src/data/works.json',
  'CONTENT_GUIDE.md',
  'CONTRIBUTOR_GUIDE.md',
])

const allowedDirectories = [
  'public/images/works/',
  'public/videos/works/',
]

const highRiskExactFiles = new Set([
  'package.json',
  'package-lock.json',
  'vite.config.js',
  'netlify.toml',
  'src/App.jsx',
  'src/main.jsx',
  '.env',
])

const highRiskPrefixes = [
  'src/components/',
  'src/pages/',
  '.github/',
  'scripts/',
]

const trustedWarningExactFiles = new Set([
  'package.json',
  'package-lock.json',
  'netlify.toml',
  '.env',
])

const trustedWarningPrefixes = [
  '.github/',
  'scripts/',
]

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

function getPullRequestAuthor() {
  return process.env.PR_AUTHOR || process.env.GITHUB_ACTOR || ''
}

function getPullRequestLabels() {
  return (process.env.PR_LABELS || '')
    .split(',')
    .map((label) => label.trim())
    .filter(Boolean)
}

function isAllowedForRegularContributor(file) {
  return allowedExactFiles.has(file) || allowedDirectories.some((directory) => file.startsWith(directory))
}

function isHighRiskForRegularContributor(file) {
  return highRiskExactFiles.has(file) || highRiskPrefixes.some((prefix) => file.startsWith(prefix))
}

function shouldWarnTrustedMaintainer(file) {
  return trustedWarningExactFiles.has(file) || trustedWarningPrefixes.some((prefix) => file.startsWith(prefix))
}

const changedFiles = getChangedFiles()
const prAuthor = getPullRequestAuthor()
const prLabels = getPullRequestLabels()
const isTrustedMaintainer = trustedMaintainers.includes(prAuthor)
const hasApprovalLabel = prLabels.includes(approvalLabel)

console.log(`PR 作者：${prAuthor || '未检测到'}`)
console.log(`PR 标签：${prLabels.length > 0 ? prLabels.join(', ') : '无'}`)

if (isTrustedMaintainer) {
  console.log('检测到 trusted maintainer，允许修改网站内容、页面、组件、样式和路由。')
} else if (hasApprovalLabel) {
  console.log(`检测到 ${approvalLabel} 标签，允许本次 PR 修改网站代码或配置。`)
}

if (isTrustedMaintainer || hasApprovalLabel) {
  const warningFiles = changedFiles.filter(shouldWarnTrustedMaintainer)

  if (warningFiles.length > 0) {
    console.warn('注意：本次 PR 修改了高风险配置或自动化文件，请认真审核：')
    warningFiles.forEach((file) => {
      console.warn(`- ${file}`)
    })
    console.warn('这不会阻止检查通过，但合并前需要确认这些修改是有意的。')
  }

  console.log('Pull Request 修改范围检查通过。validate-content 和 build 仍会继续运行。')
  process.exit(0)
}

const blockedFiles = changedFiles.filter(
  (file) => !isAllowedForRegularContributor(file) || isHighRiskForRegularContributor(file),
)

if (blockedFiles.length > 0) {
  console.error('普通投稿者只能修改作品数据、图片、视频和贡献说明文档。')
  console.error('下面这些文件不允许在普通投稿者 PR 中修改：')
  blockedFiles.forEach((file) => {
    console.error(`- ${file}`)
  })
  console.error(`如果这是经过同意的网站代码维护，请由 owner 或 trusted maintainer 添加 ${approvalLabel} 标签，或把 PR 作者加入 trustedMaintainers。`)
  process.exit(1)
}

console.log('普通投稿者修改范围检查通过。')
