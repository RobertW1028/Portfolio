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
const worksVideoDir = path.join(projectRoot, 'public', 'videos', 'works')
const allowedCategories = ['painting', 'photography', 'installation', 'video', 'other']

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

function parseYes(answer) {
  return ['y', 'yes', 'true', '是', '首页', '精选'].includes(answer.trim().toLowerCase())
}

async function askFeaturedOrder(rl) {
  const answer = (await rl.question('首页排序数字是多少？数字越小越靠前，直接回车则排在后面：')).trim()

  if (!answer) {
    return undefined
  }

  const order = Number(answer)

  if (!Number.isFinite(order)) {
    console.log('排序不是有效数字，这个作品会排在有排序数字的作品后面。')
    return undefined
  }

  return order
}

async function main() {
  const works = JSON.parse(await fs.readFile(worksPath, 'utf8'))
  const rl = readline.createInterface({ input, output })

  console.log('开始添加新作品。按提示输入内容即可。')
  console.log('分类可选：painting, photography, installation, video, other')
  console.log('图片请放在 public/images/works/，这里只填写文件名。')

  const mediaAnswer = (await rl.question('这是图片作品还是视频作品？输入 image 或 video，直接回车默认为 image：')).trim().toLowerCase()
  const mediaType = mediaAnswer === 'video' ? 'video' : 'image'
  const title = await askRequired(rl, '作品标题是什么？')
  const year = await askRequired(rl, '年份是什么？')
  const medium = await askRequired(rl, '媒介是什么？')
  const description = await askRequired(rl, '简介是什么？')

  let image = ''
  let video = ''

  if (mediaType === 'video') {
    image = cleanFileName(await askRequired(rl, '视频封面图文件名是什么？例如 performance-001-cover.jpg：'))
    video = cleanFileName(await askRequired(rl, '视频文件名是什么？例如 performance-001.mp4：'))
  } else {
    image = cleanFileName(await askRequired(rl, '图片文件名是什么？例如 my-photo-01.jpg：'))
  }

  const categoryInput = (await rl.question('分类是什么？直接回车默认为 other：')).trim()
  const category = allowedCategories.includes(categoryInput)
    ? categoryInput
    : mediaType === 'video'
      ? 'video'
      : 'other'
  const featured = parseYes(await rl.question('是否显示在首页？输入 y 表示是，直接回车表示只在全部作品页显示：'))
  const featuredOrder = featured ? await askFeaturedOrder(rl) : undefined

  rl.close()

  const newWork = {
    id: nextWorkId(works),
    title,
    year,
    medium,
    description,
    image,
    video,
    mediaType,
    category,
    featured,
  }

  if (featuredOrder !== undefined) {
    newWork.featuredOrder = featuredOrder
  }

  works.push(newWork)
  await fs.writeFile(worksPath, `${JSON.stringify(works, null, 2)}\n`, 'utf8')

  console.log(`已添加作品：${newWork.title}`)
  console.log(`作品编号：${newWork.id}`)

  const imagePath = path.join(worksImageDir, image)

  if (!existsSync(imagePath)) {
    console.log(`提示：还没有找到图片或封面图 ${image}`)
    console.log(`请把图片放到：public/images/works/${image}`)
    console.log('这里只需要写文件名，不要写 C:\\Users\\... 这种电脑本地路径。')
  }

  if (mediaType === 'video') {
    const videoPath = path.join(worksVideoDir, video)

    if (!existsSync(videoPath)) {
      console.log(`提示：还没有找到视频 ${video}`)
      console.log(`请把视频放到：public/videos/works/${video}`)
    }
  }

  if (featured && featuredOrder === undefined) {
    console.log('提示：这个作品会显示在首页，但因为没有 featuredOrder，会排在有排序数字的精选作品后面。')
  }

  console.log('完成后运行 npm run dev 检查页面。')
}

main().catch((error) => {
  console.error('添加作品时出错：')
  console.error(error.message)
  process.exit(1)
})
