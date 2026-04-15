当前笔记：
note-0

Agent Memory：

# what：

1. 智能体与环境交互三阶段：从环境中获取；对信息处理()，使其可用；基于信息act（智能体记忆模块通过记忆写入、记忆管理、记忆读取实现该三阶段）
    
2. 任务：智能体最终目标
    
3. 环境：是智能体需要完成任务而交互的对象，任何能影响到智能体决策的情境因素
    
4. 实验与步骤(trial and step)：The complete agent-environment interaction process is called a trial. Agent-environment interaction turn is called step.
    
5. narrow definition of agent memory: 同一个trial历史信息。
    
6. broad definition of Agent Memory：the information across different trials and external knowledge beyond agent-environment interactions.(1)同一个任务的历史信息；（2）不同trial历史信息；（3）外部知识，之前错误的trial，也就是负反馈的trial，这些错误的trial注册进智能体记忆，以及之前的爱好、特点、历史行为、知识库。
    1. memory writing: Project raw information into the actually stored memory content. $m_{t}^{k}=W(\{a_{t}^{k}, o_t^k\})$，$m_t^k$为第k个任务，第t步骤后存储的记忆信息，W为映射函数，$a_t^k$为第k个任务，第t步骤的action（执行动作），$o_t^k$为第k个任务，第t步骤的observation（观察结果）
    2. memory management: 处理存储的记忆信息，令其更高效 (对应第二阶段)：$M^k_t=P(M^k_{t-1}, m_t^k)$，$M_{t-1}^k$ 是第k个任务，第t步之前存储的记忆信息，$m_t^k$是第k个任务，第t步存储的记忆信息，P为迭代处理存储记忆信息的函数。
       1. 提炼高级知识，增加泛化能力
       2. 融合相似知识，减少冗余
       3. weed memory: 删除无用/不相关的记忆信息，让记忆信息更准确
    3. memory reading: obtain the important information from the memory to support agent next action. $\hat{M}_t^k = R(M_t^k, c_{t+1}^k)$，R通常是计算两者的相似性，$\hat{M}_t^k$最终提示词的组成部分，$M_t^k$为第k个任务，第t步存储的记忆信息，$c_t^k$为第k个任务，第t+1步的上下文(context)
    4. Unified function for the envolving process from $\{a_t^k, o_t^k\}$ to $a_{t+1}^k$, this is: $a_{t+1}^k=R(P(M^k_{t-1},W(\{a_t^k, o_t^k\})), c_{t+1}^k)$

# Why
## 1. Cognitive Psychology(认知心理学)
Include attention, language use, memory, perception, problem-solving, creativity, and reasoning. memory is the most important part of cognition.因为记忆是提炼高级知识、学习等等的基础。设计智能体目的是为了替代人类部分工作，因为必须遵从人类的工作机制。因为记忆对人类的很重要，所以为智能体设计记忆机制非常重要。

## 2. self-evolution(自我进化)
完成不同任务，就需要在动态环境进行自我进化，而记忆对于自我进化至关重要。记忆需要支撑：1. 经验积累，失败的经验、成功的经验；2.环境探索，从不同行动中得到反馈并学习，通过历史信息决定如何探索。3. 知识抽象，从原始观测，抽象高层信息，增强对未知环境的适应力以及自身泛化能力

## 3. agent application(智能体应用)
使用智能体的时候，对话需要有历史信息，这是进行下一轮回复的必要条件。

# How to implement the memory
## Memory Sources
Memory contents come from. 包含单次实验内的信息(Inside-trial Information)dynamic、Cross-trial Information(跨实验信息)dynamic、External Information(外部信息)static。单次实验内的信息：支撑未来动作最关键的信息。跨实验信息：对积累经验至关重要（成功、失败经验），为智能体提供更持久的经验支撑。外部知识：缓解知识过时，拓展知识边界。

## Memory Forms
How to present memory contents.Two formers: 1. textual form(文本形式)；2. parameter form（参数形式）
1. Textual form memory to store four types of information including (1) complete agent-environment interactions, (2) recent agent-environment interactions, (3) retrieved agent-environment interactions, and (4) external knowledge. 同时，上下文不是无限长的，上下文计算复杂度和长度是二次增长，在上下文较长的时候，信息所在的位置不同，被利用的程度也不同。
   1. 研究集中在：1. 近期交互，基于时间截断，基于近期交互来更新记忆，认为近期的上下文是至关重要的；2. 基于记忆的相关性和重要性、主题来选择记忆内容，获取虽然时间久但关键的记忆，主要是检索记忆；3. 外部知识。将外部知识转化为自身记忆，比如数据库、百科、书本、知识库等。
2. Memory in Parametic form. 不占上下文，目前主要是两种：1. 微调（Fine-tunning）；2. 记忆编辑（memory editing）
   1. 微调。优点：有监督微调，让智能体具有特定领域专家能力，不占用上下文，利用特定领域数据集提升对领域特定信息的高精度和高可靠性。缺点：容易过拟合，遗忘原来知识，灾难性遗忘（catastrophic forgetting），所需数据较大，只适用于离线
   2. 记忆编辑（knowledge editing: Infusing memory into model parameters）。不是从特定数据集中提取特定领域的的知识，针对仅需要调整的事实，不影响已存在的不相关的知识，适合小规模记忆调整，成本低，适合在线场景，可缓解灾难性遗忘。
3. 文本以及和参数记忆的优缺点(advantage and disadvantages)
   1. 有效性
      1. 文本记忆：存储智能体和环境交互的原始信息，内容全面，但受限大模型上下文限制。另外，长上下文导致模型计算成本指数次上升。
      2. 参数记忆：不受制于上下文限制，但转换为参数的时候会有信息损失，复杂的训练还有其他成本。
   2. 效率：
      1. 文本记忆：因为会增加提示词，所以时间成本更高。但易于写入，且可解释性更好。
      2. 参数记忆：信息整合进了大模型中，所以无需额外上下文，但将需要记忆的信息写入参数效率低。
      3. 总结：文本记忆在写入环节效率高；参数记忆在读取环节效率高
   3. 可解释性：文本记忆可解释性天然更好，但信息密度没有参数记忆高，参数记忆反之。
   4. 总结：对于近期的交互任务，文本记忆似乎更有效，但对于需要大空间存储或者长期、熟悉的知识则参数化记忆更有效

## Memory Operations
aim to process the memory contents.包含记忆写入、记忆管理和记忆读取，三者相互协同实现记忆功能。
1. 记忆写入。1. 选择哪些信息被记忆(当前有选择原始信息，有选择原始信息+信息摘要)，记忆写入操作的信息提取策略至关重要，原始信息容错冗余，包含大量噪声。同时不同环境，反馈形式不同，如何提取并将其表征为记忆也很重要。代表作有:1.使用记忆控制器scm选择什么时机进行记忆写入；2.memogpt有智能体自行控制；3.memochat通过总结对话主题片段，将其作为索引记忆的键值。

2. 记忆管理。
记忆通过反思（reflecting）生成高维度的记忆，合并冗余的记忆，遗忘不重要的记忆，从而实现管理。之前关于记忆管理的研究工作统计如图所示
![tables](./images/table3-memory-operations.png "memory-operations")

3. 记忆读取。
要进行下一步的动作，需要提取相关的记忆信息，其关键在于如何获取与当前状态相关的信息。代表作：ChatDB，智能体生产一系列记忆链进行存户，在需要的试试通过sql语句读取。MPC 从记忆池中检索相关记忆，提出提供思维链，忽略特定记忆。Expel利用Faiss向量存储作为记忆池，获取相似度top-k的记忆。

To some extent, memory reading and memory writing are collaborative. The memory writing forms greatly influence the method of memory reading. 对应文本记忆，大多数采用文本相似度及其辅助信息读取，对于参数化记忆，利用更新后的参数进行推理，是一种隐式推理。

# How to evaluate the memory
两类评估方法：1.直接评估，独立评测记忆模块的能力；2.间接评估，通过端对端的智能体任务进行评估，若相关任务能够有效完成，则证明该记忆模块具有价值。

## Direct Evaluation
直接评估在之前的研究中被分为两类：主观评价和客观评价。
### 主观评价(subjective evaluation)
主要依靠人的主观判断去衡量记忆模块的有效性。评价两个常见视角是：连贯性和合理性。连贯性是指：被召回的记忆是否于当前上下文匹配，并且自然，如果要出去旅行计划，那么召回的应该是和旅行相关的记忆，而非工作相关的记忆。合理性是指：评估被召回的记忆是否合理，内容合理，比如中国在哪里，召回中国在亚洲，而非中国在地球。

### 客观评价(objective evaluation)
依据数值指标评价记忆模块的有效性，容易评估不同的记忆模块。常包含三个维度：结果正确性（Result Correctness）、引用准确性(Reference Accuracy)以及时间和硬件成本(Time and Hardware cost)。

结果正确性：基于记忆模块回答预设问题，判断回答是否正确，正确率计算$Correctness=\frac{1}{N}\sum_{i=1}^{N}\mathbb{I}\left[a_i=\hat{a}_i \right]$ , $N$是题目数量，$a_i$是问题i的正确答案，$\hat{a}_i$是智能体回答的答案。
匹配函数通常被表示为：$\mathbb{I}\left[ a_i=\hat{a}_i \right] = \begin{cases}
  1 & \text{if } a_i=\hat{a}_i \\
  0 & \text{if } a_i \neq \hat{a}_i
\end{cases}$
之前研究思路有代表性的思路：1. 从带有标注标准答案的历史记录中构建问题，并计算召回的记忆能否匹配正确答案的准确率; 2. 生成仅能够从历史对话中回答的问题，将智能体的回答与正确答案进行匹配，并计算匹配的准确率。

引用准确率：评估智能体是否能够正确发现相关记忆，侧重支撑智能体最终决策的中间信息。将检索到的记忆内容与标准答案对比。通常使用F1指标评估引用准确率：$\text{F1}=2 \cdot \frac{Precision \cdot Recall}{Precision + Recall}$，
其中：精确率$Precision=\frac{TP}{TP+FP}$，召回率$Recall=\frac{TP}{TP+FN}$，$TP$是真阳，$FP$是假阳，$FN$是假阴。

效率（时间和硬件成本）：总时间成本包括记忆适配时间和推理时间。适配时间包括记忆写入和记忆管理，推理时间是读取记忆的时延。内存操作开始到结束小号的时间成为时间损耗。$\Delta{time}=\frac{1}{M}\sum_{i=1}^{M}t_i^{end}-t_i^{start}$

## Indirect Evaluation
设计需要智能体高度依赖记忆的任务，如果能完成，则证明记忆模块有效。常见任务；对话（conversation），多源问题（Multi-source Question-answering），长上下文应用（Long-context Applications），其他任务(Other Tasks)
1. 对话
对话任务的性能可以反映不同记忆模块的有效性。对话场景，评估记忆效果的常用方法：连贯性和参与度（consistency and engagement）。连贯性：智能体的回复与上下文保持一致的程度。参与度（engagement）：反映智能体回复的质量和吸引力，也反映了智能体针对当前对话构建任务性格的能力。

2. 多源问答
评估来自任务内、跨任务以及外部知识的记忆信息。能够检验智能体记忆在整合不同来源内容方面的能力。

3. 长上下文应用
   对长上下文而言，段落检索式评估上下文能力重要指标，即在长上下文中找到给定问题或描述的重要段落。

# Memory-enhanced Agent Applications
增强记忆的智能体应用常见场景：角色扮演与社会模拟、个人助手、开放世界游戏、代码生成、推荐系统、特定领域专家系统以及其他应用场景

# Reference
1. 长上下文自然语言 2. 缓解不不相关记忆带来的影响-alleviate the impact of irrelevant memory in conversations：Ziheng Huang, Sebastian Gutierrez, Hemanth Kamana, and Stephen MacNeil. Memory sandbox: Transparent and interactive memory management for conversational agents. In Adjunct Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology, pages 1–3, 2023.
3. flash memory based on the cache mechanism, which preserves observations from the recent t − 1 time steps, aimed at enhancing the recency of information： Xinnian Liang, Bing Wang, Hui Huang, Shuangzhi Wu, Peihao Wu, Lu Lu, Zejun Ma, and Zhoujun Li. Unleashing infinite-length input capacity for large-scale language models with self-controlled memory system. arXiv preprint arXiv:2304.13343, 2023.
4. 根据余弦相似度获取关键记忆信息：Joon Sung Park, Joseph O’Brien, Carrie Jun Cai, Meredith Ringel Morris, Percy Liang, and Michael S Bernstein. Generative agents: Interactive simulacra of human behavior. In Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology, pages 1–22, 2023.
5. 角色相关的微调：Yunfan Shao, Linyang Li, Junqi Dai, and Xipeng Qiu. Character-llm: A trainable agent for role-playing. arXiv preprint arXiv:2310.10158, 2023.
6. 知识编辑：关注修改大模型and智能体的人格（personality）:[135] Shengyu Mao, Ningyu Zhang, Xiaohan Wang, Mengru Wang, Yunzhi Yao, Yong Jiang, Pengjun Xie, Fei Huang, and Huajun Chen. Editing personality for large language models. 2023.
7. MEND,为预训练模型的参数生成修改方案，利用meta-learning思想：[134] Eric Mitchell, Charles Lin, Antoine Bosselut, Chelsea Finn, and Christopher D Manning. Fast model editing at scale. arXiv preprint arXiv:2110.11309, 2021.
8. 知识编辑：改变大模型中的中毒知识，且保持其通用性：[137] Mengru Wang, Ningyu Zhang, Ziwen Xu, Zekun Xi, Shumin Deng, Yunzhi Yao, Qishen Zhang, Linyi Yang, Jindong Wang, and Huajun Chen. Detoxifying large language models via knowledge editing. arXiv preprint arXiv:2403.14472, 2024.
9. design a memory controller to decide when to execute memory operations.:[98] Xinnian Liang, Bing Wang, Hui Huang, Shuangzhi Wu, Peihao Wu, Lu Lu, Zejun Ma, and Zhoujun Li. Unleashing infinite-length input capacity for large-scale language models with self-controlled memory system. arXiv preprint arXiv:2304.13343, 2023.
10. MemGPT:entirely self-directed.[100] Charles Packer, Vivian Fang, Shishir G Patil, Kevin Lin, Sarah Wooders, and Joseph E Gonzalez. Memgpt: Towards llms as operating systems. arXiv preprint arXiv:2310.08560, 2023.
11. [96] Chenxu Hu, Jie Fu, Chenzhuang Du, Simian Luo, Junbo Zhao, and Hang Zhao. Chatdb: Augmenting llms with databases as their symbolic memory. arXiv preprint arXiv:2306.03901, 2023.
12. 从带有标注标准答案的历史记录中构建问题，并计算召回的记忆能否匹配正确答案的准确率:[96] Chenxu Hu, Jie Fu, Chenzhuang Du, Simian Luo, Junbo Zhao, and Hang Zhao. Chatdb: Augmenting llms with databases as their symbolic memory. arXiv preprint arXiv:2306.03901, 2023.
13. 
