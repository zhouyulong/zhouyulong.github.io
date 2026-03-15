---
title: 论文中心
---

# 论文中心

我的工作流：**待读池 → 阅读中 → 笔记整理 → 复现实验**

## 快捷入口

- [📥 待读论文池](./todo-queue) - 下阶段准备读的论文清单，支持评论讨论
- [📊 阅读统计](./reading-stats) - 阅读数据分析

## 当前状态

| 状态 | 数量 | 说明 |
|------|------|------|
| 📥 待读 | 8 | [查看待读池](./todo-queue) |
| 📖 阅读中 | 0 | 正在阅读的论文 |
| ✅ 已完成笔记 | 0 | 已完成阅读笔记 |
| 🔬 复现中 | 0 | 正在进行复现 |
| ✨ 已复现 | 0 | 完成复现并验证 |

## 最近阅读

*暂无阅读记录，开始阅读吧！*

## 按主题浏览

### Agent Memory
- [待读池](./todo-queue) - 8 篇 Agent Memory 方向论文
- [调研报告](../knowledge/agent-memory-research) - 系统性文献调研

---

## 如何添加阅读笔记

### 方法：从待读池开始

1. **从待读池选择论文**
2. **创建笔记文件**：复制以下模板创建新文件

```markdown
---
title: "论文标题"
authors: "作者"
venue: "arXiv/ICLR/NeurIPS"
year: 2024
url: "https://arxiv.org/abs/..."
code: "https://github.com/..."
status: "reading"  # todo/reading/done/rereading
rating: "⭐⭐⭐⭐⭐"
tags: ["标签1", "标签2"]
date_started: 2024-03-10
date_finished: 2024-03-15
reading_time: "3小时"
giscus: true
---

# 论文标题

<GiscusComment />

## 📋 基本信息
- **作者**:
- **会议**:
- **链接**: [论文]() | [代码]()

## 🎯 一句话总结

## ❓ 问题与动机

## 🔬 方法

## 📊 实验

## 💡 我的思考

## 🔗 相关论文

## 📝 笔记历史
| 日期 | 动作 | 备注 |
|------|------|------|
| 2024-03-10 | 开始阅读 | - |
```

3. **更新本页面**：在「最近阅读」表格中添加链接

### 关键字段说明

| 字段 | 说明 |
|------|------|
| `title` | 论文标题 |
| `authors` | 作者 |
| `venue` | 发表会议/期刊 |
| `year` | 发表年份 |
| `url` | 论文链接 |
| `code` | 代码仓库链接 |
| `status` | 阅读状态：todo/reading/done/rereading |
| `rating` | 1-5星评价 |
| `tags` | 标签列表 |
| `giscus` | 是否开启评论（设为 true）|

---

*阅读是输入，笔记是输出，复现是验证。*
