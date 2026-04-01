import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'zhouyuloong',
  description: 'AI Agent 研究与工程',
  lang: 'zh-CN',
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
    ['meta', { property: 'og:title', content: 'zhouyuloong | AI Agent 研究与工程' }],
    ['meta', { property: 'og:site_name', content: 'zhouyuloong' }],
    ['meta', { property: 'og:image', content: 'https://zhouyulong.github.io/og-image.png' }],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '论文阅读', link: '/reading/' },
      { text: '关于', link: '/about/' },
    ],

    sidebar: {
      '/reading/': [
        {
          text: '论文阅读',
          items: [
            { text: '概览', link: '/reading/' },
            { text: '待读论文池', link: '/reading/todo' },
            { text: '阅读统计', link: '/reading/stats' },
            { text: '阅读方法论', link: '/reading/how-to-read' },
          ]
        },
        {
          text: '技术专题',
          collapsed: false,
          items: [
            { text: 'Agent Memory', link: '/reading/agent-memory/' },
            { text: '调研报告（2025-03）', link: '/reading/agent-memory/survey-2025-03' },
          ]
        },
        {
          text: '阅读笔记',
          collapsed: true,
          items: [
            { text: 'AutoGen', link: '/reading/notes/autogen' },
            { text: 'ReAct', link: '/reading/notes/react' },
          ]
        }
      ]
    },

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

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容'
  },

  vite: {
    resolve: {
      alias: {
        '@components': '/_components'
      }
    }
  }
}))
