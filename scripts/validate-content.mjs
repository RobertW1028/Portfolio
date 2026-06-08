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
  'vimeoEmbedUrl',
  'synopsis',
  'description',
  'credits',
  'screeningHistory',
  'category',
  'featured',
  'featuredOrder',
]
const allowedCategories = ['video', 'film', 'installation', 'photography', 'other']
const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.webp']
const imageWarningSize = 5 * 1024 * 1024
const safeFileNamePattern = /^[a-z0-9._-]+$/
const slugPattern = /^[a-z0-9-]+$/

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
  return value.startsWith('/') || value.includes('/')
}

function checkFileNameOnly(work, fieldName, value) {
  const label = work.id || '未知作品'

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

  if (!safeFileNamePattern.test(value)) {
    addError(`${label}：${fieldName} 文件名只能使用英文小写、数字、短横线、下划线和点号，不能有空格、中文或特殊符号。当前值：${value}`)
  }

  const extension = path.extname(value).toLowerCase()
  if (!allowedImageExtensions.includes(extension)) {
    addError(`${label}：${fieldName} 扩展名不正确。允许：${allowedImageExtensions.join(', ')}。当前值：${value}`)
  }

  return true
}

function checkImageFile(work, fieldName, fileName) {
  const filePath = path.join(imageDir, fileName)

  if (!existsSync(filePath)) {
    addError(`${work.id}：找不到 ${fieldName}：public/images/works/${fileName}`)
    return
  }

  const fileSize = statSync(filePath).size
  if (fileSize > imageWarningSize) {
    addWarning(`${work.id}：${fieldName} 文件较大：${fileName}，可能影响网页加载速度。`)
  }
}

function checkStringField(work, field) {
  if (typeof work[field] !== 'string') {
    addError(`${work.id || '未知作品'}：${field} 必须是字符串。`)
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
    const label = work.id || `第 ${index + 1} 个作品`

    requiredFields.forEach((field) => {
      if (!(field in work)) {
        addError(`${label}：缺少必填字段 ${field}。`)
      }
    })

    ;['id', 'slug', 'title', 'year', 'duration', 'format', 'medium', 'poster', 'image', 'vimeoEmbedUrl', 'synopsis', 'description', 'category'].forEach((field) => {
      if (field in work) {
        checkStringField(work, field)
      }
    })

    if (work.id) {
      if (ids.has(work.id)) {
        addError(`${work.id}：id 重复。`)
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

    if (work.poster && checkFileNameOnly(work, 'poster', work.poster)) {
      checkImageFile(work, 'poster', work.poster)
    }

    if (work.image && checkFileNameOnly(work, 'image', work.image)) {
      if (work.poster && work.image !== work.poster) {
        addWarning(`${label}：image 与 poster 不一致。旧组件兼容字段通常建议等于 poster。`)
      }
    }

    if (Array.isArray(work.stills)) {
      work.stills.forEach((still) => {
        if (checkFileNameOnly(work, 'stills', still)) {
          checkImageFile(work, 'still', still)
        }
      })
    }

    if (work.vimeoEmbedUrl) {
      if (isLocalComputerPath(work.vimeoEmbedUrl)) {
        addError(`${label}：vimeoEmbedUrl 不要写电脑本地路径。`)
      }
      if (!work.vimeoEmbedUrl.startsWith('https://player.vimeo.com/video/')) {
        addError(`${label}：vimeoEmbedUrl 必须以 https://player.vimeo.com/video/ 开头，不要粘贴整段 iframe。`)
      }
    }
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
