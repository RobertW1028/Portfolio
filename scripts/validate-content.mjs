import { existsSync, statSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const worksPath = path.join(projectRoot, 'src', 'data', 'works.json')
const imageDir = path.join(projectRoot, 'public', 'images', 'works')

const requiredFields = [
  'id',
  'slug',
  'title',
  'year',
  'duration',
  'format',
  'medium',
  'poster',
  'image',
  'stills',
  'synopsis',
  'description',
  'credits',
  'screeningHistory',
  'category',
  'featured',
  'featuredOrder',
]

const stringFields = [
  'id',
  'slug',
  'title',
  'year',
  'duration',
  'format',
  'medium',
  'poster',
  'cover',
  'image',
  'youtubeEmbedUrl',
  'youtubeWatchUrl',
  'vimeoEmbedUrl',
  'bilibiliEmbedUrl',
  'bilibiliWatchUrl',
  'synopsis',
  'description',
  'category',
]

const allowedCategories = ['video', 'film', 'installation', 'photography', 'other']
const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.webp']
const imageWarningSize = 5 * 1024 * 1024
const safeFileNamePattern = /^[a-z0-9._-]+$/
const safePathPattern = /^[a-z0-9._/-]+$/
const slugPattern = /^[a-z0-9-]+$/
const youtubeEmbedPrefixes = [
  'https://www.youtube.com/embed/',
  'https://youtube.com/embed/',
  'https://www.youtube-nocookie.com/embed/',
]

const errors = []
const warnings = []

function addError(message) {
  errors.push(message)
}

function addWarning(message) {
  warnings.push(message)
}

function isLocalComputerPath(value) {
  return /^[a-zA-Z]:[\\/]/.test(value) || value.includes('\\')
}

function hasPathPrefix(value) {
  // 禁止绝对路径（以 / 开头）
  // 允许相对路径（包含 / 但不以 / 开头）
  return value.startsWith('/')
}

function hasIframe(value) {
  return typeof value === 'string' && value.toLowerCase().includes('<iframe')
}

function getLabel(work, index) {
  return work.id || `第 ${index + 1} 个作品`
}

function checkStringField(work, field, label) {
  if (field in work && typeof work[field] !== 'string') {
    addError(`${label}：${field} 必须是字符串。`)
  }
}

function checkFileNameOnly(work, fieldName, value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    addError(`${label}：${fieldName} 不能为空。`)
    return false
  }

  if (isLocalComputerPath(value)) {
    addError(`${label}：${fieldName} 不能写电脑本地路径，请只写文件名。当前值：${value}`)
  }

  if (hasPathPrefix(value)) {
    addError(`${label}：${fieldName} 不要写 public/images/works/，请只写文件名。当前值：${value}`)
  }

  // 允许相对路径（如 work-001/poster.jpg）或直接文件名
  // 检查整个路径是否匹配安全模式
  if (!safePathPattern.test(value)) {
    addError(`${label}：${fieldName} 只建议使用英文小写、数字、短横线、下划线、点号和斜杠。当前值：${value}`)
  }

  // 验证路径中不包含 ../ 或其他危险模式
  if (value.includes('..')) {
    addError(`${label}：${fieldName} 不能包含 .. 路径。当前值：${value}`)
  }

  const extension = path.extname(value).toLowerCase()
  if (!allowedImageExtensions.includes(extension)) {
    addError(`${label}：${fieldName} 扩展名不正确。允许：${allowedImageExtensions.join(', ')}。当前值：${value}`)
  }

  return true
}

function checkImageFile(fieldName, fileName, label) {
  const filePath = path.join(imageDir, fileName)

  // 安全检查：确保路径不会超出 imageDir
  const normalizedFilePath = path.normalize(filePath)
  const normalizedImageDir = path.normalize(imageDir)
  if (!normalizedFilePath.startsWith(normalizedImageDir)) {
    addError(`${label}：${fieldName} 路径不安全。当前值：${fileName}`)
    return
  }

  if (!existsSync(filePath)) {
    addError(`${label}：找不到 ${fieldName}：public/images/works/${fileName}`)
    return
  }

  const fileSize = statSync(filePath).size
  if (fileSize > imageWarningSize) {
    addWarning(`${label}：${fieldName} 文件较大：${fileName}，可能影响网页加载速度。`)
  }
}

function checkEmbedUrl(work, field, label, isValid, message) {
  const value = work[field]

  if (!value) {
    return
  }

  if (isLocalComputerPath(value)) {
    addError(`${label}：${field} 不要写电脑本地路径。`)
  }

  if (hasIframe(value)) {
    addError(`${label}：${field} 不要粘贴整段 iframe，只写播放器地址。`)
  }

  if (!isValid(value)) {
    addError(`${label}：${message}`)
  }
}

function checkWatchUrl(work, field, label) {
  const value = work[field]

  if (!value) {
    return
  }

  if (isLocalComputerPath(value)) {
    addError(`${label}：${field} 不要写电脑本地路径。`)
  }

  if (hasIframe(value)) {
    addError(`${label}：${field} 不要粘贴整段 iframe，只写链接地址。`)
  }
}

async function main() {
  let works

  try {
    works = JSON.parse(await fs.readFile(worksPath, 'utf8'))
  } catch (error) {
    console.error('无法读取或解析 src/data/works.json，请检查 JSON 格式。')
    console.error(error.message)
    process.exit(1)
  }

  if (!Array.isArray(works)) {
    console.error('src/data/works.json 最外层必须是数组。')
    process.exit(1)
  }

  const ids = new Set()
  const slugs = new Set()

  works.forEach((work, index) => {
    const label = getLabel(work, index)

    requiredFields.forEach((field) => {
      if (!(field in work)) {
        addError(`${label}：缺少必填字段 ${field}。`)
      }
    })

    stringFields.forEach((field) => checkStringField(work, field, label))

    if (work.id) {
      if (ids.has(work.id)) {
        addError(`${label}：id 重复。`)
      }
      ids.add(work.id)
    }

    if (work.slug) {
      if (!slugPattern.test(work.slug)) {
        addError(`${label}：slug 只能使用英文小写、数字和短横线。当前值：${work.slug}`)
      }
      if (slugs.has(work.slug)) {
        addError(`${label}：slug 重复。`)
      }
      slugs.add(work.slug)
    }

    if (work.category && !allowedCategories.includes(work.category)) {
      addError(`${label}：category 不在允许范围内。可用分类：${allowedCategories.join(', ')}`)
    }

    if ('featured' in work && typeof work.featured !== 'boolean') {
      addError(`${label}：featured 只能是 true 或 false。`)
    }

    if (work.featuredOrder !== null && (typeof work.featuredOrder !== 'number' || !Number.isFinite(work.featuredOrder))) {
      addError(`${label}：featuredOrder 只能是数字或 null。`)
    }

    if (!Array.isArray(work.stills)) {
      addError(`${label}：stills 必须是数组。`)
    }

    if (!Array.isArray(work.credits)) {
      addError(`${label}：credits 必须是数组。`)
    }

    if (!Array.isArray(work.screeningHistory)) {
      addError(`${label}：screeningHistory 必须是数组。`)
    }

    if (work.poster && checkFileNameOnly(work, 'poster', work.poster, label)) {
      checkImageFile('poster', work.poster, label)
    }

    if (work.cover && checkFileNameOnly(work, 'cover', work.cover, label)) {
      checkImageFile('cover', work.cover, label)
    }

    if (work.image && checkFileNameOnly(work, 'image', work.image, label)) {
      checkImageFile('image', work.image, label)

      if (work.poster && work.image !== work.poster) {
        addWarning(`${label}：image 与 poster 不一致。旧组件兼容字段通常建议等于 poster。`)
      }
    }

    if (Array.isArray(work.stills)) {
      work.stills.forEach((still) => {
        if (checkFileNameOnly(work, 'stills', still, label)) {
          checkImageFile('still', still, label)
        }
      })
    }

    checkEmbedUrl(
      work,
      'youtubeEmbedUrl',
      label,
      (value) => youtubeEmbedPrefixes.some((prefix) => value.startsWith(prefix)),
      `youtubeEmbedUrl 必须以 ${youtubeEmbedPrefixes.join(' 或 ')} 开头。`,
    )

    checkEmbedUrl(
      work,
      'vimeoEmbedUrl',
      label,
      (value) => value.startsWith('https://player.vimeo.com/video/'),
      'vimeoEmbedUrl 必须以 https://player.vimeo.com/video/ 开头。',
    )

    checkEmbedUrl(
      work,
      'bilibiliEmbedUrl',
      label,
      (value) => value.startsWith('https://player.bilibili.com/player.html'),
      'bilibiliEmbedUrl 必须以 https://player.bilibili.com/player.html 开头。',
    )

    checkWatchUrl(work, 'youtubeWatchUrl', label)
    checkWatchUrl(work, 'bilibiliWatchUrl', label)
  })

  if (warnings.length > 0) {
    console.warn('作品内容检查警告：')
    warnings.forEach((warning) => console.warn(`- ${warning}`))
  }

  if (errors.length > 0) {
    console.error('作品内容检查发现错误：')
    errors.forEach((error) => console.error(`- ${error}`))
    process.exit(1)
  }

  console.log('作品内容检查通过')
}

main()
