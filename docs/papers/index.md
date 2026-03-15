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
| 📥 待读 | 12 | [查看待读池](./todo-queue) |
| 📖 阅读中 | 2 | 正在阅读的论文 |
| ✅ 已完成笔记 | 2 | 已完成阅读笔记 |
| 🔬 复现中 | 1 | 正在进行复现 |
| ✨ 已复现 | 0 | 完成复现并验证 |

## 最近阅读

| 论文 | 日期 | 标签 | 状态 | 笔记 |
|------|------|------|------|------|
| AutoGen: Enabling Next-Gen LLM Applications | 2024-03-10 | Multi-Agent | ✅ 已读 | [笔记](./notes/2024/2024-03-autogen-paper) |
| ReAct: Synergizing Reasoning and Acting | 2024-03-05 | Reasoning | ✅ 已读 | [笔记](./notes/2024/2024-04-react-paper) |

## 按主题浏览

### Multi-Agent Systems
- [AutoGen](./notes/2024/2024-03-autogen-paper) - 微软多 Agent 对话框架
- MetaGPT - 多 Agent 协作编程（[待读池](./todo-queue)）

### Reasoning & Planning
- [ReAct](./notes/2024/2024-04-react-paper) - 推理与行动协同

---

## 如何添加阅读笔记

### 方法：复制已有笔记

最简单的方法是复制一个已有笔记，然后修改内容：

```bash
# 1. 复制已有笔记作为模板
cp docs/papers/notes/2024/2024-03-autogen-paper.md docs/papers/notes/2024/2024-XX-new-paper.md

# 2. 编辑新文件，填写内容
# 3. 在本页面的「最近阅读」表格中添加链接
```

### 笔记文件格式

文件需要包含 front matter（元数据）和正文：

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
tags: ["Multi-Agent", "框架"]
date_started: 2024-03-10
date_finished: 2024-03-15
reading_time: "3小时"
giscus: true  # 开启评论
---

# 论文标题

<GiscusComment />

## 📋 基本信息
...
```

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
