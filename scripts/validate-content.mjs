import { existsSync, statSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const worksPath = path.join(projectRoot, 'src', 'data', 'works.json')
const imageDir = path.join(projectRoot, 'public', 'images', 'works')
const videoDir = path.join(projectRoot, 'public', 'videos', 'works')

const requiredFields = [
  'id',
  'title',
  'year',
  'medium',
  'description',
  'image',
  'video',
  'mediaType',
  'category',
  'featured',
  'featuredOrder',
]
const allowedMediaTypes = ['image', 'video']
const allowedCategories = ['painting', 'photography', 'installation', 'video', 'other']
const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.webp']
const allowedVideoExtensions = ['.mp4', '.webm']
const imageWarningSize = 5 * 1024 * 1024
const videoWarningSize = 25 * 1024 * 1024
const safeFileNamePattern = /^[a-z0-9._-]+$/

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

function isFileNameSafe(value) {
  return safeFileNamePattern.test(value)
}

function formatSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`
}

function checkTextField(work, field) {
  if (typeof work[field] !== 'string' || !work[field].trim()) {
    addError(`${work.id || '未知作品'}：${field} 必须填写文字。`)
  }
}

function checkFileNameOnly(work, fieldName, value, allowedExtensions) {
  const label = work.id || '未知作品'

  if (typeof value !== 'string' || !value.trim()) {
    addError(`${label}：${fieldName} 不能为空。`)
    return false
  }

  if (isLocalComputerPath(value)) {
    addError(`${label}：${fieldName} 不能写电脑本地路径，请只写文件名。当前值：${value}`)
  }

  if (hasPathPrefix(value)) {
    addError(`${label}：${fieldName} 不要包含 public/images/works/ 或 public/videos/works/，请只写文件名。当前值：${value}`)
  }

  if (!isFileNameSafe(value)) {
    addError(`${label}：${fieldName} 文件名建议只使用英文小写、数字、短横线、下划线和点号，不能有空格、中文或特殊符号。当前值：${value}`)
  }

  const extension = path.extname(value).toLowerCase()
  if (!allowedExtensions.includes(extension)) {
    addError(`${label}：${fieldName} 扩展名不正确。允许：${allowedExtensions.join(', ')}。当前值：${value}`)
  }

  return true
}

function checkFileExistsAndSize(work, fieldName, fileName, directory, warningSize) {
  const label = work.id || '未知作品'
  const filePath = path.join(directory, fileName)

  if (!existsSync(filePath)) {
    addError(`${label}：找不到 ${fieldName} 文件：${path.relative(projectRoot, filePath)}`)
    return
  }

  const fileSize = statSync(filePath).size
  if (fileSize > warningSize) {
    addWarning(`${label}：${fieldName} 文件较大：${fileName} (${formatSize(fileSize)})，可能影响网页加载速度。`)
  }
}

function checkFeaturedOrder(work) {
  if (work.featuredOrder === null) {
    return
  }

  if (typeof work.featuredOrder !== 'number' || !Number.isFinite(work.featuredOrder)) {
    addError(`${work.id || '未知作品'}：featuredOrder 只能是数字或 null。`)
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
  const imageReferences = new Map()
  const videoReferences = new Map()

  works.forEach((work, index) => {
    const label = work.id || `第 ${index + 1} 个作品`

    requiredFields.forEach((field) => {
      if (!(field in work)) {
        addError(`${label}：缺少必填字段 ${field}。`)
      }
    })

    ;['id', 'title', 'year', 'medium', 'description', 'image', 'mediaType', 'category'].forEach((field) => {
      if (field in work) {
        checkTextField(work, field)
      }
    })

    if (work.id) {
      if (ids.has(work.id)) {
        addError(`${work.id}：id 重复。每个作品 id 必须唯一。`)
      }
      ids.add(work.id)
    }

    if (work.mediaType && !allowedMediaTypes.includes(work.mediaType)) {
      addError(`${label}：mediaType 只能写 image 或 video。当前值：${work.mediaType}`)
    }

    if (work.category && !allowedCategories.includes(work.category)) {
      addError(`${label}：category 不在允许范围内。可用分类：${allowedCategories.join(', ')}`)
    }

    if ('featured' in work && typeof work.featured !== 'boolean') {
      addError(`${label}：featured 只能是 true 或 false，不能写成字符串。`)
    }

    if ('video' in work && typeof work.video !== 'string') {
      addError(`${label}：video 必须是字符串。图片作品请写空字符串。`)
    }

    checkFeaturedOrder(work)

    if (work.image && checkFileNameOnly(work, 'image', work.image, allowedImageExtensions)) {
      const previousId = imageReferences.get(work.image)
      if (previousId) {
        addError(`${label}：image 文件名 ${work.image} 已经被 ${previousId} 引用，请避免重复引用。`)
      } else {
        imageReferences.set(work.image, work.id || label)
      }

      checkFileExistsAndSize(work, '图片或封面图', work.image, imageDir, imageWarningSize)
    }

    if (work.mediaType === 'image') {
      if (work.video) {
        addError(`${label}：图片作品的 video 必须留空字符串。`)
      }
      return
    }

    if (work.mediaType === 'video') {
      if (!work.video) {
        addError(`${label}：视频作品必须填写 video 文件名。`)
        return
      }

      if (checkFileNameOnly(work, 'video', work.video, allowedVideoExtensions)) {
        const previousId = videoReferences.get(work.video)
        if (previousId) {
          addError(`${label}：video 文件名 ${work.video} 已经被 ${previousId} 引用，请避免重复引用。`)
        } else {
          videoReferences.set(work.video, work.id || label)
        }

        checkFileExistsAndSize(work, '视频', work.video, videoDir, videoWarningSize)
      }
    }
  })

  if (warnings.length > 0) {
    console.warn('作品内容检查警告：')
    warnings.forEach((warning) => {
      console.warn(`- ${warning}`)
    })
  }

  if (errors.length > 0) {
    console.error('作品内容检查发现错误：')
    errors.forEach((error) => {
      console.error(`- ${error}`)
    })
    process.exit(1)
  }

  console.log('作品内容检查通过')
}

main()
