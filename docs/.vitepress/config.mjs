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
  title: 'zhouyuloong',
  description: 'AI Agent 研究与工程 - 从算力平台到智能体前沿',

  themeConfig: {
    nav: [
      { text: '首页', link: '/zh/' },
      { text: '论文', link: '/papers/' },
      { text: '知识库', link: '/knowledge/' },
      { text: '实验室', link: '/lab/' },
      { text: '博客', link: '/blog/' },
      { text: '关于', link: '/about/' },
    ],

    sidebar: {
      '/papers/': [
        {
          text: '论文中心',
          items: [
            { text: '概览', link: '/papers/' },
            { text: '待读论文池', link: '/papers/todo-queue' },
            { text: '阅读统计', link: '/papers/reading-stats' },
          ]
        },
        {
          text: '阅读笔记',
          collapsed: false,
          items: [
            {
              text: '2024',
              collapsed: true,
              items: [
                { text: 'AutoGen 论文', link: '/papers/notes/2024/2024-03-autogen-paper' },
                { text: 'ReAct 论文', link: '/papers/notes/2024/2024-04-react-paper' },
              ]
            }
          ]
        },
        {
          text: '复现实验',
          collapsed: true,
          items: [
            { text: 'AutoGen 复现', link: '/papers/repro/autogen/' },
          ]
        }
      ],
      '/knowledge/': [
        {
          text: '知识体系',
          items: [
            { text: '概览', link: '/knowledge/' },
            { text: '论文阅读方法论', link: '/knowledge/paper-reading-method/' },
            { text: 'Agent 技术演化', link: '/knowledge/agent-evolution/' },
          ]
        }
      ],
      '/lab/': [
        {
          text: '实验室',
          items: [
            { text: '概览', link: '/lab/' },
          ]
        }
      ],
      '/blog/': [
        {
          text: '博客',
          items: [
            { text: '首页', link: '/blog/' },
            { text: '一周 Agent 见闻 #1', link: '/blog/posts/2024/03/weekly-agent-news-001' },
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
      { text: 'Papers', link: '/en/papers/' },
      { text: 'Knowledge', link: '/en/knowledge/' },
      { text: 'Lab', link: '/en/lab/' },
      { text: 'Blog', link: '/en/blog/' },
      { text: 'About', link: '/en/about/' },
    ],

    sidebar: {
      '/en/papers/': [
        {
          text: 'Paper Center',
          items: [
            { text: 'Overview', link: '/en/papers/' },
            { text: 'Reading Queue', link: '/en/papers/todo-queue' },
            { text: 'Statistics', link: '/en/papers/reading-stats' },
          ]
        }
      ],
      '/en/knowledge/': [
        {
          text: 'Knowledge Base',
          items: [
            { text: 'Overview', link: '/en/knowledge/' },
            { text: 'Paper Reading Method', link: '/en/knowledge/paper-reading-method/' },
            { text: 'Agent Evolution', link: '/en/knowledge/agent-evolution/' },
          ]
        }
      ],
      '/en/lab/': [
        {
          text: 'Lab',
          items: [
            { text: 'Overview', link: '/en/lab/' },
          ]
        }
      ],
      '/en/blog/': [
        {
          text: 'Blog',
          items: [
            { text: 'Home', link: '/en/blog/' },
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
      copyright: 'Copyright © 2026-present zhouyuloong'
    }
  },
  vite: {
    resolve: {
      alias: {
        '@components': '/_components'
      }
    }
  }
}))