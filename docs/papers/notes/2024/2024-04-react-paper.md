---
title: "ReAct: Synergizing Reasoning and Acting in Language Models"
authors: "Shunyu Yao, et al. (Princeton University)"
venue: "ICLR"
year: 2023
url: "https://arxiv.org/abs/2210.03629"
code: "https://github.com/ysymyth/ReAct"
status: "reading"
rating: "⭐⭐⭐⭐⭐"
tags: ["Reasoning", "Acting", "Tool-Use", "Prompting"]
date_started: 2024-03-05
date_finished: null
reading_time: "2小时"
giscus: true
---

# ReAct: Synergizing Reasoning and Acting in Language Models

<GiscusComment />

## 📋 基本信息

- **作者**: Shunyu Yao, Jeffrey Zhao, et al.
- **机构**: Princeton University, Google Research
- **会议**: ICLR 2023
- **论文**: [arXiv:2210.03629](https://arxiv.org/abs/2210.03629)
- **代码**: [github.com/ysymyth/ReAct](https://github.com/ysymyth/ReAct)

## 🎯 一句话总结

ReAct 将**推理（Reasoning）**和**行动（Acting）**结合起来，让语言模型能够交替进行思考和执行，从而更好地解决需要与外部环境交互的复杂任务。

## ❓ 问题与动机

### 现有方法的局限

1. **纯推理（Chain-of-Thought）**：只让模型思考，不与环境交互
2. **纯行动（Action-Only）**：只执行预定义动作，缺乏推理规划

### ReAct 的洞察

人类解决问题时会**交错进行推理和行动**：
- 思考当前情况 → 决定行动 → 观察结果 → 再次思考 → ...

## 🔬 方法

### ReAct 模式

```
Thought: 我需要搜索关于X的信息
Action: Search[X]
Observation: 搜索结果是...
Thought: 基于这个结果，下一步应该...
Action: Lookup[Y]
Observation: ...
```

### 与 CoT 的对比

| 方法 | 特点 | 适用场景 |
|------|------|----------|
| CoT | 只推理，不行动 | 纯数学/逻辑问题 |
| ReAct | 推理+行动 | 需要外部知识的任务 |

## 📊 实验

### 评测任务
- HotPotQA（问答）
- FEVER（事实验证）
- WebShop（网页导航）
- ALFWorld（决策制定）

### 关键结果
- 在 HotPotQA 上比 CoT 提升 10%+
- 在 ALFWorld 上比模仿学习提升 30%+

## 💡 我的思考

*阅读中，待整理...*

## 🔗 相关论文

- [ ] Chain-of-Thought Prompting
- [ ] SayCan: Grounding Language in Robotic Affordances

## 📝 笔记历史

| 日期 | 动作 | 备注 |
|------|------|------|
| 2024-03-05 | 开始阅读 | - |
