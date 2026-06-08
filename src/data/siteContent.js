// 网站个人信息集中管理文件
// 改网站标题、姓名、首页简介、About / Bio、邮箱和社交链接，都来这里改。

export const siteContent = {
  // 网站标题：显示在浏览器标签页，也可显示在子页面左上角。
  siteTitle: '',

  // 姓名：显示在首页最醒目的位置。
  name: 'Yuezheng Wang',

  // 首页身份短句：显示在姓名下方。
  tagline: '',

  // 首页简介：建议保持简短，1-2 句话就好。
  intro:
    '',

  // About / Bio：关于我的介绍。
  // paragraphs 里每一行是一段文字，需要新增段落就多加一行。
  about: {
    heading: '我是谁',
    paragraphs: [
      '我是一名热爱视觉表达的创作者，关注材料、图像与空间之间的关系。',
      '我的作品通常从日常观察出发，通过绘画、摄影、装置或影像的方式，探索记忆、情绪和环境之间的连接。',
    ],
    skillsTitle: '我的专长',
    skills: ['视觉艺术创作', '平面设计', '数字艺术', '创意思维'],
  },

  // 联系方式：修改邮箱或社交媒体链接就在这里。
  contact: {
    email: 'wyz15905@gmail.com',
    socialLinks: [
      {
        label: 'Instagram',
        url: 'https://www.instagram.com/wayne_yuezhengwang/',
      },
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/',
      },
      {
        label: '其他',
        url: '#',
      },
    ],
  },
}
