// 这里是整个网站最主要的内容管理文件。
// 以后想改姓名、简介、联系方式或作品列表，优先来这个文件改。

export const siteContent = {
  // 网站标题：会显示在浏览器标签页和导航栏左上角。
  siteTitle: 'Yuezheng Wang',

  // 我的姓名：会显示在首页最醒目的位置。
  name: 'Yuezheng Wang',

  // 我的身份 / 简介短句：会显示在首页姓名下方。
  tagline: '',

  // 首页简介：适合写 1-2 句简短介绍。
  intro:
    '',

  // 首页封面作品：当 src/data/works.json 里暂时没有作品时，首页会使用这里。
  // image 只写 public/images/works/ 里的文件名，不要写电脑本地路径。
  homeFeature: {
    title: 'Days After Mekong Hotel',
    year: '2026',
    image: '/images/home/home-still.jpg',
    alt: 'Film still',
  },

  // About / Bio：关于我的详细介绍。
  // 如果想新增段落，就在 paragraphs 数组里多加一行文字。
  about: {
    heading: 'Yuezheng Wang',
    // Bio 页面人物照片。真实照片可放在 public/images/bio/，这里写文件名即可，例如 'portrait.jpg'。
    // 暂时留空时，Bio 页面会显示一个极简浅灰占位区域。
    portraitImage: '/images/profile/portrait.jpg',
    paragraphs: [
      '',
      '',
    ],
  },

  // 联系方式：修改邮箱或社交媒体链接就在这里。
  contact: {
    email: 'wyz15905@gmail.com',
    contactMessage:
      'For collaborations, screenings, project inquiries, or other questions, please contact me via email or social media.',
    socialLinks: [
      {
        label: 'Instagram',
        url: 'https://www.instagram.com/wayne_yuezhengwang/',
      },
      {
        label: '',
        url: '',
      },
      {
        label: '',
        url: '#',
      },
    ],
  },

  // 作品列表：以后新增作品，就复制一个对象粘贴到 works 数组里。
  // 图片建议放在 public/images 文件夹，然后 image 写成 '/images/文件名.jpg'。
  works: [
    {
      id: 1,
      title: '作品 1',
      year: '2026',
      medium: '综合材料',
      description: '作品描述文字',
      image: '/images/work1.jpg',
      category: 'painting',
    },
    {
      id: 2,
      title: '作品 2',
      year: '2026',
      medium: '摄影',
      description: '作品描述文字',
      image: '/images/work2.jpg',
      category: 'photography',
    },
    {
      id: 3,
      title: '作品 3',
      year: '2025',
      medium: '影像',
      description: '作品描述文字',
      image: '/images/work3.jpg',
      category: 'video',
    },
    {
      id: 4,
      title: '作品 4',
      year: '2025',
      medium: '布面丙烯',
      description: '作品描述文字',
      image: '/images/work4.jpg',
      category: 'painting',
    },
    {
      id: 5,
      title: '作品 5',
      year: '2024',
      medium: '空间装置',
      description: '作品描述文字',
      image: '/images/work5.jpg',
      category: 'installation',
    },
    {
      id: 6,
      title: '作品 6',
      year: '2024',
      medium: '数字绘画',
      description: '作品描述文字',
      image: '/images/work6.jpg',
      category: 'other',
    },
    {
      id: 7,
      title: '占位作品 7',
      year: '2024',
      medium: '纸本水彩',
      description: '用于测试“显示更多”功能的占位作品。',
      image: '/images/work7.jpg',
      category: 'painting',
    },
    {
      id: 8,
      title: '占位作品 8',
      year: '2023',
      medium: '摄影',
      description: '用于测试“显示更多”功能的占位作品。',
      image: '/images/work8.jpg',
      category: 'photography',
    },
    {
      id: 9,
      title: '占位作品 9',
      year: '2023',
      medium: '装置',
      description: '用于测试“显示更多”功能的占位作品。',
      image: '/images/work9.jpg',
      category: 'installation',
    },
  ],
}

export const works = siteContent.works
