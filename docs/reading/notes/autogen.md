---
title: "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation"
authors: "Qingyun Wu, et al. (Microsoft Research)"
venue: "arXiv"
year: 2023
url: "https://arxiv.org/abs/2308.08155"
code: "https://github.com/microsoft/autogen"
status: "done"
rating: "⭐⭐⭐⭐⭐"
tags: ["Multi-Agent", "对话系统", "框架", "微软"]
date_started: 2024-03-08
date_finished: 2024-03-12
reading_time: "4小时"
giscus: true
---

# AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation

## 📋 基本信息

- **作者**: Qingyun Wu, Gagan Bansal, Jieyu Zhang, et al.
- **机构**: Microsoft Research
- **论文**: [arXiv:2308.08155](https://arxiv.org/abs/2308.08155)
- **代码**: [github.com/microsoft/autogen](https://github.com/microsoft/autogen)
- **项目主页**: [microsoft.github.io/autogen](https://microsoft.github.io/autogen/)

## 🎯 一句话总结

AutoGen 是一个开源框架，通过**可对话的、可定制的、可协作的 Agent**来构建 LLM 应用，支持多 Agent 对话、人机协作和工具使用。

## ❓ 问题与动机

### 现有问题
1. **开发复杂 LLM 应用的困难**：构建复杂应用需要大量精力和领域知识
2. **灵活性 vs 简单性的权衡**：现有工具要么太僵化，要么太底层
3. **缺乏多 Agent 协作的标准框架**：每个项目都需要重新造轮子

### AutoGen 的解决方案
- 提供**对话编程**范式
- 支持**可定制和可对话的 Agent**
- 实现**自动化 Agent 聊天**

## 🔬 方法

### 核心概念

```
┌─────────────────────────────────────────┐
│            AutoGen 核心抽象              │
├─────────────────────────────────────────┤
│  ConversableAgent  ←──  可对话的 Agent   │
│  - 发送/接收消息                         │
│  - 生成回复                              │
│  - 支持 LLM、人类、工具                   │
├─────────────────────────────────────────┤
│  Chat  ←──  对话                         │
│  - 两个 Agent 之间的消息交换             │
│  - 支持多种对话模式                      │
├─────────────────────────────────────────┤
│  GroupChat  ←──  群组对话                │
│  - 多个 Agent 参与的对话                 │
│  - 支持不同的发言者选择策略               │
└─────────────────────────────────────────┘
```

### Agent 类型

1. **AssistantAgent**：使用 LLM 的后端 AI（如 GPT-4）
2. **UserProxyAgent**：代表人类用户，可执行代码和函数
3. **GroupChatManager**：管理群组对话的发言者选择

### 关键设计

#### 1. 统一对话接口
所有 Agent 都实现统一的对话接口，支持：
- `send()` / `receive()` - 消息发送和接收
- `generate_reply()` - 生成回复
- 支持异步和同步模式

#### 2. 可定制的回复生成
```python
# 自动代理可以配置使用 LLM、工具或人类输入
agent = ConversableAgent(
    name="assistant",
    llm_config={"config_list": [...]},  # LLM 配置
    code_execution_config={...},          # 代码执行配置
    human_input_mode="NEVER"              # 是否需要人类输入
)
```

#### 3. 对话控制
- **终止条件**：自动检测对话结束
- **最大轮数**：限制对话长度
- **发言者选择**：在群聊中选择下一个发言者

## 📊 实验与应用

### 评测基准

| 应用 | 复杂度 | 性能提升 |
|------|--------|----------|
| 数学问题求解 | ⭐⭐⭐ | 比单独使用 GPT-4 提升 17% |
| 问答系统 | ⭐⭐⭐ | 多 Agent 检索增强 |
| 代码生成 | ⭐⭐⭐⭐ | 可执行代码验证 |
| 决策制定 | ⭐⭐⭐⭐⭐ | 多视角推理 |

### 实际应用案例

1. **AIGC 任务**：生成图像、视频、音频
2. **复杂数据工作流**：数据获取、处理、分析
3. **软件工程**：代码生成、调试、优化

## 💡 我的思考

### 优点
1. **设计简洁优雅**：对话作为核心抽象非常自然
2. **高度可扩展**：容易添加新的 Agent 类型和对话模式
3. **实际应用价值高**：微软出品，工业级应用验证
4. **社区活跃**：GitHub 30k+ stars，持续更新

### 局限
1. **群聊发言者选择策略较简单**：可能影响复杂任务效果
2. **缺乏形式化验证**：多 Agent 系统的正确性难以保证
3. **调试困难**：多 Agent 交互的调试工具不够完善

### 启发与应用

**对我的研究的启发：**
- 对话编程范式值得深入学习
- 可定制性是关键设计原则
- 工具使用和多 Agent 协作是趋势

**可以应用的方向：**
- 构建实验性的 Multi-Agent 系统
- 研究 Agent 间的通信优化
- 探索群聊发言者选择策略的改进

## 🔗 相关论文

**后续工作（引用本文的）：**
- [ ] AutoGen Studio - 可视化开发环境
- [ ] AutoGen 的后续版本更新

**本文引用的重要工作：**
- [x] ReAct: Synergizing Reasoning and Acting - Agent 推理+行动模式
- [ ] LangChain - 另一个 LLM 应用框架
- [ ] CAMEL: Communicative Agents - 多 Agent 通信

## 📝 笔记历史

| 日期 | 动作 | 备注 |
|------|------|------|
| 2024-03-08 | 开始阅读 | 初读，了解框架整体设计 |
| 2024-03-10 | 代码实验 | 跑通官方示例 |
| 2024-03-12 | 完成笔记 | 整理成此笔记 |

## 🔬 复现计划

- [x] 阅读论文
- [x] 安装 AutoGen 并跑通示例
- [ ] 实现一个自定义 Agent
- [ ] 对比单 Agent vs 多 Agent 效果

<!-- 复现记录待添加 -->
