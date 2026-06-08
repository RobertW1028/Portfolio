import { existsSync } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const worksPath = path.join(projectRoot, 'src', 'data', 'works.json')
const worksImageDir = path.join(projectRoot, 'public', 'images', 'works')
const allowedCategories = ['video', 'film', 'installation', 'photography', 'other']

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function nextWorkId(works) {
  const numbers = works
    .map((work) => String(work.id).match(/^work-(\d+)$/)?.[1])
    .filter(Boolean)
    .map(Number)

  const nextNumber = numbers.length > 0 ? Math.max(...numbers) + 1 : 1
  return `work-${String(nextNumber).padStart(3, '0')}`
}

async function askRequired(rl, question) {
  let answer = ''

  while (!answer) {
    answer = (await rl.question(question)).trim()

    if (!answer) {
      console.log('这一项不能为空，请再输入一次。')
    }
  }

  return answer
}

function cleanFileName(fileName) {
  return path.basename(fileName.trim())
}

function parseList(value, separator) {
  return value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseYes(answer) {
  return ['y', 'yes', 'true', '是', '首页', '精选'].includes(answer.trim().toLowerCase())
}

async function main() {
  const works = JSON.parse(await fs.readFile(worksPath, 'utf8'))
  const rl = readline.createInterface({ input, output })

  console.log('开始添加 video / film project。')
  console.log('poster 和 stills 请放在 public/images/works/，这里只填写文件名。')

  const title = await askRequired(rl, '作品标题是什么？')
  const slugAnswer = (await rl.question('slug 是什么？直接回车会根据标题自动生成：')).trim()
  const slug = slugAnswer ? slugify(slugAnswer) : slugify(title)
  const year = await askRequired(rl, '年份是什么？')
  const duration = (await rl.question('片长是什么？例如 8:32，没有可直接回车：')).trim()
  const format = (await rl.question('格式是什么？例如 Single-channel video, color, sound：')).trim()
  const medium = (await rl.question('medium 是什么？例如 Video / Film / Installation：')).trim()
  const poster = cleanFileName(await askRequired(rl, 'poster 文件名是什么？例如 project-poster.jpg：'))
  const vimeoEmbedUrl = (await rl.question('Vimeo embed URL 是什么？例如 https://player.vimeo.com/video/123456789，没有可直接回车：')).trim()
  const synopsis = await askRequired(rl, 'synopsis 简介是什么？')
  const credits = parseList(await rl.question('credits 是什么？多条用英文分号 ; 分隔，直接回车可留空：'), ';')
  const stills = parseList(await rl.question('stills 文件名有哪些？多个用英文逗号 , 分隔，直接回车可留空：'), ',')
    .map(cleanFileName)
  const categoryInput = (await rl.question('category 是什么？可选 video, film, installation, photography, other，直接回车默认为 film：')).trim()
  const category = allowedCategories.includes(categoryInput) ? categoryInput : 'film'
  const featured = parseYes(await rl.question('是否 featured？输入 y 表示是，直接回车表示否：'))
  const featuredOrderAnswer = featured
    ? (await rl.question('featuredOrder 是多少？数字越小越靠前，直接回车为 null：')).trim()
    : ''
  const featuredOrder = featuredOrderAnswer ? Number(featuredOrderAnswer) : null

  rl.close()

  if (works.some((work) => work.slug === slug)) {
    console.log(`提示：slug "${slug}" 已存在，请稍后手动改成唯一 slug。`)
  }

  if (!existsSync(path.join(worksImageDir, poster))) {
    console.log(`提示：还没有找到 poster：public/images/works/${poster}`)
  }

  stills.forEach((still) => {
    if (!existsSync(path.join(worksImageDir, still))) {
      console.log(`提示：还没有找到 still：public/images/works/${still}`)
    }
  })

  if (vimeoEmbedUrl && !vimeoEmbedUrl.startsWith('https://player.vimeo.com/video/')) {
    console.log('提示：vimeoEmbedUrl 看起来不像 Vimeo player 地址。请使用 https://player.vimeo.com/video/... 这种格式。')
  }

  const newWork = {
    id: nextWorkId(works),
    slug,
    title,
    year,
    duration,
    format,
    medium,
    poster,
    image: poster,
    stills,
    vimeoEmbedUrl,
    synopsis,
    description: synopsis,
    credits,
    screeningHistory: [],
    category,
    featured,
    featuredOrder,
  }

  works.push(newWork)
  await fs.writeFile(worksPath, `${JSON.stringify(works, null, 2)}\n`, 'utf8')

  console.log(`已添加作品：${newWork.title}`)
  console.log(`作品编号：${newWork.id}`)
  console.log(`详情页地址：#/works/${newWork.slug}`)
  console.log('完成后运行 npm run validate-content 和 npm run build 检查。')
}

main().catch((error) => {
  console.error('添加作品时出错：')
  console.error(error.message)
  process.exit(1)
})
