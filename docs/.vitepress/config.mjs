import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// Shared configuration
const sharedConfig = {
  titleTemplate: ':title | Yulong Zhou',
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    math: true,
    codeCopyButtonTitle: 'Copy Code',
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh-CN' }],
    ['meta', { property: 'og:title', content: 'Yulong Zhou | AI Agent Research & Engineering' }],
    ['meta', { property: 'og:site_name', content: 'Yulong Zhou' }],
    ['meta', { property: 'og:image', content: 'https://zhouyulong.github.io/og-image.png' }],
  ],
}

// Chinese configuration
const zhConfig = {
  label: '简体中文',
  lang: 'zh-CN',
  link: '/zh/',
  title: '周玉龙',
  description: 'AI Agent 研究与工程 - 从算力平台到智能体前沿',

  themeConfig: {
    nav: [
      { text: '首页', link: '/zh/' },
      { text: '关于我', link: '/zh/about/' },
      {
        text: '内容',
        items: [
          { text: 'Agent 实验室', link: '/zh/agent-lab/' },
          { text: '论文显微镜', link: '/zh/papers/' },
          { text: '学习笔记', link: '/zh/notes/' },
          { text: '项目展示', link: '/zh/projects/' },
        ]
      },
      { text: '读博预备', link: '/zh/phd-prep/' },
    ],

    sidebar: {
      '/zh/agent-lab/': [
        {
          text: 'Agent 实验室',
          items: [
            { text: '概述', link: '/zh/agent-lab/' },
            { text: 'Agent 演化树', link: '/zh/agent-lab/evolution-tree' },
            { text: '复现笔记', link: '/zh/agent-lab/reproduction/' },
            { text: '动手项目', link: '/zh/agent-lab/projects/' },
          ]
        }
      ],
      '/zh/papers/': [
        {
          text: '论文显微镜',
          items: [
            { text: '论文列表', link: '/zh/papers/' },
            { text: '阅读方法论', link: '/zh/papers/reading-method' },
          ]
        }
      ],
      '/zh/notes/': [
        {
          text: '学习笔记',
          items: [
            { text: '笔记首页', link: '/zh/notes/' },
            { text: '一周 Agent 见闻', link: '/zh/notes/weekly-agent-news' },
            { text: '基础设施视角', link: '/zh/notes/infra-perspective/' },
          ]
        }
      ],
      '/zh/phd-prep/': [
        {
          text: '读博预备',
          items: [
            { text: '规划与目标', link: '/zh/phd-prep/' },
            { text: '研究方向探索', link: '/zh/phd-prep/research-directions' },
            { text: '研究日志', link: '/zh/phd-prep/research-log/' },
          ]
        }
      ]
    },

    editLink: {
      pattern: 'https://github.com/zhouyulong/zhouyulong.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容'
  }
}

// English configuration
const enConfig = {
  label: 'English',
  lang: 'en-US',
  link: '/en/',
  title: 'Yulong Zhou',
  description: 'AI Agent Research & Engineering - From Compute Infrastructure to Agent Frontier',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/en/' },
      { text: 'About', link: '/en/about/' },
      {
        text: 'Content',
        items: [
          { text: 'Agent Lab', link: '/en/agent-lab/' },
          { text: 'Paper Microscope', link: '/en/papers/' },
          { text: 'Notes', link: '/en/notes/' },
          { text: 'Projects', link: '/en/projects/' },
        ]
      },
      { text: 'PhD Prep', link: '/en/phd-prep/' },
    ],

    sidebar: {
      '/en/agent-lab/': [
        {
          text: 'Agent Lab',
          items: [
            { text: 'Overview', link: '/en/agent-lab/' },
            { text: 'Agent Evolution Tree', link: '/en/agent-lab/evolution-tree' },
            { text: 'Reproduction Notes', link: '/en/agent-lab/reproduction/' },
            { text: 'Hands-on Projects', link: '/en/agent-lab/projects/' },
          ]
        }
      ],
      '/en/papers/': [
        {
          text: 'Paper Microscope',
          items: [
            { text: 'Paper List', link: '/en/papers/' },
            { text: 'Reading Methodology', link: '/en/papers/reading-method' },
          ]
        }
      ],
      '/en/notes/': [
        {
          text: 'Notes',
          items: [
            { text: 'Notes Home', link: '/en/notes/' },
            { text: 'Weekly Agent News', link: '/en/notes/weekly-agent-news' },
            { text: 'Infra Perspective', link: '/en/notes/infra-perspective/' },
          ]
        }
      ],
      '/en/phd-prep/': [
        {
          text: 'PhD Preparation',
          items: [
            { text: 'Plans & Goals', link: '/en/phd-prep/' },
            { text: 'Research Directions', link: '/en/phd-prep/research-directions' },
            { text: 'Research Log', link: '/en/phd-prep/research-log/' },
          ]
        }
      ]
    },

    editLink: {
      pattern: 'https://github.com/zhouyulong/zhouyulong.github.io/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },

    outline: {
      label: 'On this page'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: 'Languages',
    returnToTopLabel: 'Return to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Theme',
    lightModeSwitchTitle: 'Switch to light mode',
    darkModeSwitchTitle: 'Switch to dark mode',
    skipToContentLabel: 'Skip to content'
  }
}

export default withMermaid(defineConfig({
  ...sharedConfig,
  locales: {
    root: { ...zhConfig },
    en: { ...enConfig }
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhouyulong' },
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Yulong Zhou'
    }
  }
}))
