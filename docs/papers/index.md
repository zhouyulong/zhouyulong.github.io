---
title: 论文中心
---

# 论文中心

我的工作流：**待读池 → 阅读中 → 笔记整理 → 复现实验**

## 快捷入口

- [📥 待读论文池](./todo-queue.md) - 下阶段准备读的论文清单
- [📝 阅读笔记](./notes/_template.md) - 所有阅读笔记汇总
- [🔬 复现项目](./repro/) - 论文复现实验记录
- [📊 阅读统计](./reading-stats.md) - 阅读数据分析

## 当前状态

| 状态 | 数量 | 说明 |
|------|------|------|
| 📥 待读 | 12 | [查看待读池](./todo-queue.md) |
| 📖 阅读中 | 2 | 正在阅读的论文 |
| ✅ 已完成笔记 | 5 | 已完成阅读笔记 |
| 🔬 复现中 | 1 | 正在进行复现 |
| ✨ 已复现 | 1 | 完成复现并验证 |

## 最近阅读

| 论文 | 日期 | 标签 | 状态 | 笔记 |
|------|------|------|------|------|
| AutoGen: Enabling Next-Gen LLM Applications | 2024-03-10 | Multi-Agent | ✅ 已读 | [笔记](./notes/2024/2024-03-autogen-paper.md) |
| ReAct: Synergizing Reasoning and Acting | 2024-03-05 | Reasoning | ✅ 已读 | [笔记](./notes/2024/2024-04-react-paper.md) |

## 按主题浏览

### Multi-Agent Systems
探索多智能体协作机制与涌现行为。

- [AutoGen](./notes/2024/2024-03-autogen-paper.md) - 微软多 Agent 对话框架
- [MetaGPT](./todo-queue.md) - 多 Agent 协作编程

### Reasoning & Planning
Agent 的推理能力与任务规划。

- [ReAct](./notes/2024/2024-04-react-paper.md) - 推理与行动协同
- Chain-of-Thought - 思维链提示

### Tool Use & APIs
Agent 与外部工具的交互能力。

- Toolformer - 自主工具学习
- Gorilla - API 调用能力

## 如何添加阅读笔记

1. 复制模板：`cp docs/papers/notes/_template.md docs/papers/notes/YYYY-MM-paper-name.md`
2. 填写 front matter 元数据
3. 按模板结构填写阅读内容
4. 在本页面「最近阅读」中添加链接

## 笔记模板字段说明

```yaml
---
title: "论文标题"
authors: "作者"
venue: "会议/期刊"
year: 2024
url: "论文链接"
code: "代码链接"
status: "todo/reading/done/rereading"
rating: "⭐⭐⭐⭐⭐"
tags: ["标签1", "标签2"]
date_started: 2024-03-10
date_finished: 2024-03-15
reading_time: "3小时"
giscus: true  # 开启评论
---
```
