# 论文阅读与笔记记录工作流

> 本文档为内部工作文档，不暴露在网站中
> 最后更新：2026-04-10

---

## 总体流程图

```
发现论文 → 加入待读池 → 开始阅读 → 记录笔记 → 更新索引 → 定期回顾
    ↑                                              ↓
    └──────────── 复现/延伸学习 ←──────────────────┘
```

---

## 第一步：发现论文并加入待读池

**操作**：在 `docs/reading/todo.md` 中添加条目

**格式**：
```markdown
| 论文 | 作者/机构 | 年份 | 优先级 | 动机 |
|------|----------|------|--------|------|
| [标题](arxiv链接) | 作者 | 2024 | P0 | 为什么想读 |
```

**优先级定义**：
- P0：核心必读，与当前研究方向直接相关
- P1：重要参考，可能有用
- P2：泛读了解，有时间再看

---

## 第二步：开始阅读

**操作**：
1. 在 `docs/reading/todo.md` 中将该论文状态改为"阅读中"
2. 创建笔记文件（见第三步）
3. 记录开始日期

---

## 第三步：创建笔记文件

### 3.1 确定文件路径

**位置**：`docs/reading/notes/{论文标识}.md`

**命名规则**：
- 小写字母
- 单词间用短横线 `-` 连接
- 简洁明了，如 `mamba-linear-attention.md`

### 3.2 复制对应模板

根据阅读深度选择：

| 场景 | 模板来源 | 预计时间 |
|------|---------|---------|
| 泛读了解 | `learning_template.md` 快速版 | 30分钟 |
| 核心论文精读 | `learning_template.md` 标准版 | 2-3小时 |
| 给导师展示 | `learning_template.md` 深度版 | 1-2天 |

### 3.3 必须包含的 YAML Frontmatter

```yaml
---
title: "论文完整标题"
authors: "第一作者 et al."
venue: "会议或期刊名称"
year: 2024
url: "https://arxiv.org/abs/xxxx.xxxxx"
code: "https://github.com/xxx/xxx"  # 没有则留空或删除
status: "reading"  # 可选：reading / notes / completed
rating: "⭐⭐⭐⭐⭐"  # 1-5星评价
tags: ["标签1", "标签2", "标签3"]  # 3-5个关键词
date_started: "2024-04-10"
date_finished: null  # 完成时填写
reading_time: "2小时"  # 实际阅读耗时
giscus: true  # 启用评论功能
---
```

### 3.4 内容填写要点

**快速版必填**：
- 一句话总结（强制自己输出）
- 核心结论（3点以内）
- 与我相关的点
- 不懂的概念清单
- 后续行动

**标准版额外关注**：
- 内容结构梳理
- 技术脉络分析
- 工程视角思考（成本、延迟、可扩展性）
- 关联论文整理

**深度版额外关注**：
- 批判性思考（优点、局限、改进方向）
- 与我工作的结合点
- 准备和导师讨论的问题

---

## 第四步：更新索引文档

**必须更新**：`docs/reading/index.md`

### 4.1 在阅读笔记表格中添加条目

找到 "阅读笔记" 部分（约第28-34行），添加：

```markdown
| 论文 | 日期 | 状态 |
|------|------|------|
| [AutoGen](./notes/autogen) | 2024-03 | 笔记整理中 |
| [ReAct](./notes/react) | 2024-04 | 笔记整理中 |
| [新论文](./notes/新论文标识) | 2024-04 | 阅读中 |  ← 新增行
```

### 4.2 如属于某个专题，更新专题首页

例如属于 "Agent Memory" 专题：
- 更新 `docs/reading/agent-memory/index.md`
- 将该论文加入相关论文列表

---

## 第五步：更新待读池状态

**操作**：在 `docs/reading/todo.md` 中：

1. **删除已读条目**（推荐，保持待读池精简）
2. 或改为状态标记：`| 状态 | 阅读中 → 已完成 |`

---

## 第六步：更新统计（可选）

**操作**：在 `docs/reading/stats.md` 中更新：
- 本月阅读数量
- 各主题分布
- 阅读时间统计

---

## 第七步：定期回顾

**频率**：每周一次，约30分钟

**操作**：
1. 回顾本周笔记，更新理解
2. 检查 "后续行动" 完成情况
3. 发现概念之间的联系，添加交叉链接

---

## 文件结构速查

```
docs/reading/
├── index.md              # 论文阅读首页（必须更新）
├── todo.md               # 待读论文池
├── stats.md              # 阅读统计
├── how-to-read.md        # 阅读方法论
├── notes/                # 论文笔记目录
│   ├── autogen.md
│   ├── react.md
│   └── {新论文}.md       # ← 你的新笔记放这里
└── agent-memory/         # 专题目录（如适用）
    ├── index.md
    └── survey-2025-03.md
```

---

## 完整操作示例

假设要读一篇关于 GraphRAG 的论文：

### Step 1: 创建笔记文件
```bash
# 文件路径：docs/reading/notes/graphrag.md
```

### Step 2: 填写内容（标准版模板）
```yaml
---
title: "GraphRAG: Graph-based Retrieval-Augmented Generation"
authors: "Microsoft Research"
venue: "arXiv preprint"
year: 2024
url: "https://arxiv.org/abs/2404.16130"
code: ""
status: "reading"
rating: "⭐⭐⭐⭐"
tags: ["RAG", "Graph", "Knowledge Graph", "LLM"]
date_started: "2024-04-10"
date_finished: null
reading_time: "2小时"
giscus: true
---

# GraphRAG: Graph-based Retrieval-Augmented Generation

## 📋 基本信息
...
```

### Step 3: 更新索引
编辑 `docs/reading/index.md`，在阅读笔记表格添加：
```markdown
| [GraphRAG](./notes/graphrag) | 2024-04 | 阅读中 |
```

### Step 4: 更新待读池
编辑 `docs/reading/todo.md`，删除或标记该论文为已完成。

---

## 常见问题

### Q1: 不确定用哪个模板？
**A**: 先用快速版，有时间再补充成标准版。完成比完美重要。

### Q2: 一篇论文属于多个主题怎么办？
**A**: 放在 `notes/` 目录下，在多个专题首页中添加链接。

### Q3: 读了一半想放弃怎么办？
**A**: 在笔记中记录 "放弃原因"，这也是有价值的记录。更新状态为 "已放弃"。

### Q4: 需要复现代码吗？
**A**: 核心论文建议复现，在笔记中添加 "复现实验" 章节，记录过程和结果。

---

## 质量检查清单

完成笔记后，逐项检查：

- [ ] 文件命名规范（小写、短横线连接）
- [ ] YAML frontmatter 完整
- [ ] 一句话总结是否用自己的话概括
- [ ] 是否包含 "与我相关的点"
- [ ] 不懂的概念是否有后续学习计划
- [ ] `docs/reading/index.md` 是否已更新
- [ ] 待读池状态是否已更新
- [ ] 是否有可执行的后续行动

---

## 关联文档

- `learning_template.md` - 学习记录模板（快速/标准/深度三版）
- `learning_plan.md` - 学习规划
- `docs/reading/how-to-read.md` - 阅读方法论
