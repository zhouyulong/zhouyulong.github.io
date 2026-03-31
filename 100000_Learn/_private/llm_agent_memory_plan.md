# LLM Agent Memory 申博学习计划

> 创建日期：2026-03-31
> 状态：🚧 待验证（暂不公开入口）

---

## 整体策略：「论文驱动基础补漏 + 基础反哺论文理解」

### 核心原则
- **不前置学完所有基础**，但**每篇论文关联一个基础模块**
- 读论文时遇到不懂的基础概念 → **48小时内必须补掉**
- 每周有固定的「基础加餐时间」，和当前论文主题相关

---

## 阶段一：建立最小基础 + 入门论文（4周）

### 每周时间分配（约10-12小时）
| 轨道 | 时间占比 | 内容 |
|-----|---------|------|
| Memory论文 | 40% | 精读Survey + 2-3篇经典 |
| LLM基础 | 40% | Transformer → 预训练 → Fine-tuning |
| 英语 | 20% | 论文翻译 + 术语积累 |

### Week 1-2：Transformer + Attention 基础（不可跳过）

**为什么必须先补**：Memory论文里大量涉及"如何修改注意力机制来支持长记忆"、"KV Cache优化"等，不理解基础会卡死。

**基础学习内容**：
1. **Attention机制**：Q/K/V的数学意义，为什么要除以√d_k，Softmax的作用
2. **因果掩码（Causal Mask）**：为什么Decoder-only模型需要它，和Memory的关系
3. **位置编码**：RoPE是什么，为什么Long Context外推需要改位置编码
4. **KV Cache**：推理时的内存瓶颈，这是理解Memory压缩动机的基础

**推荐资源**（高效版本，不求全覆盖）：
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)（中文翻译版也可，快速建立直觉）
- [RoPE相对位置编码](https://zhuanlan.zhihu.com/p/645024542)（中文，1小时读完）
- **动手**：用PyTorch实现一个最简单的Multi-Head Attention（哪怕只有50行）

**同步读论文**：
- **A Survey on LLM-based Agents**（Wang et al., 2023）
- 重点读Memory相关的章节，用笔标记所有不懂的术语

---

### Week 3-4：预训练与Fine-tuning基础

**基础学习内容**：
1. **预训练目标**：Next Token Prediction的数学形式，为什么这样训练出来的模型有"记忆"
2. **Fine-tuning范式**：SFT（指令微调）vs RLHF（对齐），LoRA/QLoRA原理
3. **长上下文问题**：为什么Transformer上下文长度有限（O(n²)复杂度），这是Memory系统的核心动机

**推荐资源**：
- [Let's build GPT from scratch](https://www.youtube.com/watch?v=kCc8FmEb1nY)（Andrej Karpathy，2小时，边看边跟做）
- [LoRA论文精读 + 代码实现](https://github.com/microsoft/LoRA)（官方repo，理解低秩适应的动机）

**同步读论文**：
- **MemGPT**（Packer et al., 2023）
- 带着基础去读：理解为什么需要"虚拟上下文管理"，底层LLM的上下文限制是什么

---

## 阶段二：深入Memory专题 + 同步补基础（4-6周）

从这时候起，**每篇Memory论文绑定一个基础专题**：

| 论文 | 关联基础模块 | 补基础方式 |
|-----|------------|-----------|
| **Retrieval-Augmented Generation (RAG)** | 向量检索、Embedding模型、FAISS/ANN | 花2-3小时了解Embedding训练（Contrastive Learning）、向量索引原理 |
| **LongMem / Long Context方案** | 长度外推（Positional Interpolation）、StreamingLLM的KV Cache管理 | 必须理解RoPE位置编码的插值，否则看不懂为什么能外推 |
| **MemoryBank / 分层记忆** | 数据库基础、信息检索、摘要生成（Summarization） | 了解Extractive vs Abstractive Summarization的基本方法 |
| **Reflexion / 自我反思** | In-context Learning原理、Prompt Engineering | 理解Few-shot Learning的底层机制，为什么示例能影响模型行为 |
| **Parametric Memory (ROME/MEMIT)** | 模型编辑、因果中介分析（Causal Mediation Analysis）、Transformer的前馈层作用 | 这部分较难，可以浅尝辄止，但要知道"模型参数存储知识"的神经科学研究基础 |

### 基础补漏的实操方式

**遇到即查，48小时内解决**：
1. 读论文时标记所有"看起来熟悉但不确切"的概念（比如"residual connection"、"layer normalization"、"temperature scaling"）
2. 当天或次日用30-60分钟查清楚，用**自己的话写一页笔记**（中英文都可）
3. 周末复习本周的所有基础笔记

**推荐速查渠道**：
- **Papers with Code**：概念解释 + 代码 + 论文链接
- **Hugging Face Blog/Documentation**：技术概念的工程视角
- **YouTube**: Yannic Kilcher（英文，但讲得很细，可以同时练听力）

---

## 阶段三：面试冲刺（申博前2-3周）

这时候要能把基础和论文串起来，用英文流畅表达。

### 准备的核心问题（既要基础又要前沿）

| 问题类型 | 示例 | 准备要求 |
|---------|------|---------|
| 基础深挖 | "为什么Transformer用LayerNorm而不是BatchNorm？" | 必须能答出序列数据的统计特性 |
| 动机理解 | "为什么LLM需要外部Memory？上下文不够吗？" | 能解释O(n²)复杂度、长文本的遗忘问题、KV Cache内存瓶颈 |
| 方案对比 | "MemGPT和RAG的区别是什么？" | 能画出架构图，解释管理策略的不同 |
| 技术细节 | "LoRA为什么能降低显存占用？" | 能写出低秩分解的直觉（参数量减少） |
| 批判思考 | "现有Memory系统的最大问题是什么？" | 结合你读过的论文，提出一个具体的批判点 |

---

## 英语训练贯穿始终

### 论文阅读时（每天）
- **第一遍**：英文原文，不查词，标记生词
- **第二遍**：精读，把Abstract + Conclusion**手写翻译成中文**
- **第三遍**：用英文写Summary（强制输出）

### 口语训练（每天20-30分钟）
- **自言自语**：用英文解释今天学的基础概念（"Today I learned what RoPE is... It works by...")
- **模拟面试**：准备上面表格里的高频问题，录音回答，检查流畅度
- **学术词汇积累**：每篇论文整理10个术语，造句

---

## 关键检查点（诚实评估）

**第2周末**：
- [ ] 能不看资料，用中文解释Attention机制的计算流程
- [ ] 能用英文说出3个Memory系统的核心挑战

**第4周末**：
- [ ] 能画出MemGPT的架构图，并解释每个模块的作用
- [ ] 理解LoRA的基本原理（低秩适应）

**第6周末**：
- [ ] 能就Memory话题进行10分钟英文对话
- [ ] 能用基础概念解释为什么某篇论文的方案有效

**第8周末（面试前）**：
- [ ] 能回答"LLM基础 + Memory前沿"的交叉问题
- [ ] 能向面试官提出一个基于你基础理解的技术问题

---

## 总结：三轨并行，相互驱动

```
读Memory论文 ──遇到不懂的概念──→ 补LLM基础 ──加深理解──→ 更好读论文
      │                              │
      └────── 用英语写/说 ───────────┘
```

**论文是目标，基础是底气，英语是工具**。没有基础的论文理解是沙滩上的楼阁，没有论文方向的基础学习是盲人摸象。

---

## 附录：推荐论文清单

### Survey类（先读）
1. A Survey on Large Language Model based Autonomous Agents (2023)
2. Retrieval-Augmented Generation for Large Language Models: A Survey (2023)

### 经典Memory论文
1. MemGPT: Towards LLMs as Operating Systems (2023)
2. Reflexion: Self-Reflective Agents (2023)
3. LongMem: Long-Term Memory for Large Language Models (2023)
4. Generative Agents: Interactive Simulacra of Human Behavior (2023)
5. MemoryBank: Enhancing Large Language Models with Long-Term Memory (2023)

### 进阶（时间允许）
1. ROME: Locating and Editing Factual Associations in GPT (2022)
2. MEMIT: Mass-Editing Memory in a Transformer (2022)
3. O-LoRA: Orthogonal Low-Rank Adaptation (2024)
4. StreamingLLM: Efficient Streaming Language Models (2023)
