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

# How
## Memory Sources
Memory contents come from. 包含单次实验内的信息(Inside-trial Information)dynamic、Cross-trial Information(跨实验信息)dynamic、External Information(外部信息)static。单次实验内的信息：支撑未来动作最关键的信息。跨实验信息：对积累经验至关重要（成功、失败经验），为智能体提供更持久的经验支撑。外部知识：缓解知识过时，拓展知识边界。

## Memory Forms
How to present memory contents.Two formers: 1. textual form(文本形式)；2. parameter form（参数形式）
1. Textual form memory to store four types of information including (1) complete agent-environment interactions, (2) recent agent-environment interactions, (3) retrieved agent-environment interactions, and (4) external knowledge. 同时，上下文不是无限长的，上下文计算复杂度和长度是二次增长，在上下文较长的时候，信息所在的位置不同，被利用的程度也不同。
   1. 研究集中在：1. 近期交互，基于时间截断，基于近期交互来更新记忆，认为近期的上下文是至关重要的；2. 基于记忆的相关性和重要性、主题来选择记忆内容，获取虽然时间久但关键的记忆，主要是检索记忆；3. 外部知识。将外部知识转化为自身记忆，比如数据库、百科、书本、知识库等。
2. Memory in Parametic form. 不占上下文，目前主要是两种：1. 微调（Fine-tunning）；2. 记忆编辑（memory editing）
   1. 微调。优点：有监督微调，让智能体具有特定领域专家能力，不占用上下文，提升对领域特定信息的高精度和高可靠性。缺点：容易过拟合，遗忘原来知识，所需数据较大，只适用于离线
   2. 记忆编辑。

## Memory Operations
aim to process the memory contents.


# Reference
1. 长上下文自然语言理解，对基础模型进行了微调：Dacheng Li, Rulin Shao, Anze Xie, Ying Sheng, Lianmin Zheng, Joseph Gonzalez, Ion Stoica, Xuezhe Ma, and Hao Zhang. How long can context length of open-source llms truly promise? In NeurIPS 2023 Workshop on Instruction Tuning and Instruction Following, 2023.
2. 缓解不不相关记忆带来的影响-alleviate the impact of irrelevant memory in conversations：Ziheng Huang, Sebastian Gutierrez, Hemanth Kamana, and Stephen MacNeil. Memory sandbox: Transparent and interactive memory management for conversational agents. In Adjunct Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology, pages 1–3, 2023.
3. flash memory based on the cache mechanism, which preserves observations from the recent t − 1 time steps, aimed at enhancing the recency of information： Xinnian Liang, Bing Wang, Hui Huang, Shuangzhi Wu, Peihao Wu, Lu Lu, Zejun Ma, and Zhoujun Li. Unleashing infinite-length input capacity for large-scale language models with self-controlled memory system. arXiv preprint arXiv:2304.13343, 2023.
4. 根据余弦相似度获取关键记忆信息：Joon Sung Park, Joseph O’Brien, Carrie Jun Cai, Meredith Ringel Morris, Percy Liang, and Michael S Bernstein. Generative agents: Interactive simulacra of human behavior. In Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology, pages 1–22, 2023.
5. 角色相关的微调：Yunfan Shao, Linyang Li, Junqi Dai, and Xipeng Qiu. Character-llm: A trainable agent for role-playing. arXiv preprint arXiv:2310.10158, 2023.
6. 


