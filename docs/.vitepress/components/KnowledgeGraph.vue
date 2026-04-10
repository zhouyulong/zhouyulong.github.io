<template>
  <div class="knowledge-graph">
    <!-- 左侧信息面板 -->
    <div class="left-panel">
      <div class="panel-header">
        <h3>知识详情</h3>
      </div>
      <div v-if="selectedNode" class="panel-body">
        <div class="info-row">
          <span class="node-name">{{ selectedNode.name }}</span>
          <span class="status-badge" :class="selectedNode.status">{{ getStatusText(selectedNode.status) }}</span>
        </div>
        <div class="info-row">
          <span class="label">阶段</span>
          <span class="phase-tag" :style="{ background: phaseColors[selectedNode.phase] + '20', color: phaseColors[selectedNode.phase], borderColor: phaseColors[selectedNode.phase] + '40' }">{{ selectedNode.phase }}</span>
        </div>
        <div class="info-row">
          <span class="label">类别</span>
          <span class="category-tag" :style="{ background: categoryColors[selectedNode.category] + '20', color: categoryColors[selectedNode.category], borderColor: categoryColors[selectedNode.category] + '40' }">{{ selectedNode.category }}</span>
        </div>
        <div v-if="selectedNode.description" class="info-row">
          <span class="label">描述</span>
          <p class="description">{{ selectedNode.description }}</p>
        </div>
        <div v-if="selectedNode.links?.length" class="info-row">
          <span class="label">相关链接</span>
          <div class="links">
            <a v-for="link in selectedNode.links" :key="link.url" :href="link.url" class="link-item">{{ link.text }}</a>
          </div>
        </div>
        <div v-if="getPrerequisites(selectedNode).length" class="info-row">
          <span class="label">前置知识</span>
          <div class="tags">
            <span v-for="pre in getPrerequisites(selectedNode)" :key="pre.id" class="tag prereq">{{ pre.name }}</span>
          </div>
        </div>
        <div v-if="getNextSteps(selectedNode).length" class="info-row">
          <span class="label">后续学习</span>
          <div class="tags">
            <span v-for="next in getNextSteps(selectedNode)" :key="next.id" class="tag next">{{ next.name }}</span>
          </div>
        </div>
      </div>
      <div v-else class="panel-empty">
        <p>点击图谱中的节点查看详情</p>
        <div class="phase-legend">
          <div class="phase-item" v-for="(color, phase) in phaseColors" :key="phase">
            <span class="phase-dot" :style="{ background: color }"></span>
            <span>{{ phase }}</span>
          </div>
        </div>
      </div>

      <!-- 连线说明 -->
      <div class="link-legend">
        <div class="link-legend-title">连线说明</div>
        <div class="link-legend-item">
          <span class="link-text">A</span>
          <span class="link-line strong"></span>
          <span class="link-text">B</span>
          <span class="link-desc">基础支撑（理解 B 需要 A）</span>
        </div>
        <div class="link-legend-item">
          <span class="link-text">A</span>
          <span class="link-line weak"></span>
          <span class="link-text">B</span>
          <span class="link-desc">扩展关联（A 有助于 B）</span>
        </div>
      </div>
    </div>

    <!-- 右侧图谱区域 -->
    <div class="graph-area">
      <!-- 工具栏 -->
      <div class="toolbar">
        <div class="legend">
          <div class="legend-item"><span class="dot completed"></span><span>已完成</span></div>
          <div class="legend-item"><span class="dot in-progress"></span><span>进行中</span></div>
          <div class="legend-item"><span class="dot planned"></span><span>计划中</span></div>
        </div>
        <div class="controls">
          <button @click="resetView" class="btn">重置视图</button>
          <button @click="fitView" class="btn">适应屏幕</button>
        </div>
      </div>

      <!-- 统计信息 -->
      <div class="stats-bar">
        <div class="stat"><span class="stat-value">{{ stats.completed }}</span><span class="stat-label">已完成</span></div>
        <div class="stat"><span class="stat-value">{{ stats.inProgress }}</span><span class="stat-label">进行中</span></div>
        <div class="stat"><span class="stat-value">{{ stats.planned }}</span><span class="stat-label">计划中</span></div>
        <div class="stat"><span class="stat-value">{{ progressPercent }}%</span><span class="stat-label">总进度</span></div>
      </div>

      <!-- 图谱容器 -->
      <div ref="graphContainer" class="graph-canvas"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const graphContainer = ref(null)
const selectedNode = ref(null)

// 学习阶段定义
const phases = ['基础层', 'Agent基础', 'Memory核心', 'Memory技术', 'RAG系统', '工程实践', '进阶方向']

// 节点数据 - 按学习顺序和依赖关系组织
const graphData = {
  nodes: [
    // ========== 基础层 (第1列) ==========
    { id: 'attention', name: '注意力机制', category: '基础', status: 'basic', phase: '基础层', description: 'Transformer的核心机制', column: 0, row: 0 },
    { id: 'transformer', name: 'Transformer', category: '基础', status: 'basic', phase: '基础层', description: '现代LLM的基础架构', column: 0, row: 1 },
    { id: 'llm', name: '大语言模型', category: '基础', status: 'basic', phase: '基础层', description: 'GPT、Claude等预训练模型', column: 0, row: 2 },
    { id: 'prompt', name: '提示工程', category: '基础', status: 'basic', phase: '基础层', description: '设计有效提示词', column: 0, row: 3 },

    // ========== Agent基础 (第2列) ==========
    { id: 'agent', name: 'AI Agent', category: 'Agent', status: 'completed', phase: 'Agent基础', description: '智能体核心概念', column: 1, row: 1.5, links: [{ text: 'AutoGen笔记', url: '/reading/notes/autogen' }] },
    { id: 'cot', name: '思维链', category: 'Agent', status: 'completed', phase: 'Agent基础', description: 'Chain-of-Thought推理', column: 1, row: 0 },
    { id: 'react', name: 'ReAct', category: 'Agent', status: 'in-progress', phase: 'Agent基础', description: '推理+行动结合', column: 1, row: 3, links: [{ text: 'ReAct笔记', url: '/reading/notes/react' }] },
    { id: 'tool-use', name: '工具使用', category: 'Agent', status: 'completed', phase: 'Agent基础', description: '调用外部工具', column: 1, row: 4 },

    // ========== Memory核心 (第3列) ==========
    { id: 'memory', name: 'Agent Memory', category: 'Memory', status: 'in-progress', phase: 'Memory核心', description: '记忆机制综述', column: 2, row: 1.5, links: [{ text: '专题首页', url: '/reading/agent-memory/' }] },
    { id: 'working-memory', name: '工作记忆', category: 'Memory', status: 'planned', phase: 'Memory核心', description: '短期信息保持', column: 2, row: 0 },
    { id: 'episodic', name: '情景记忆', category: 'Memory', status: 'planned', phase: 'Memory核心', description: '事件记忆存储', column: 2, row: 3 },
    { id: 'semantic', name: '语义记忆', category: 'Memory', status: 'planned', phase: 'Memory核心', description: '知识概念存储', column: 2, row: 4 },
    { id: 'long-term', name: '长期记忆', category: 'Memory', status: 'planned', phase: 'Memory核心', description: '持久化存储', column: 2, row: 5 },

    // ========== Memory技术 (第4列) ==========
    { id: 'em-llm', name: 'EM-LLM', category: 'Memory技术', status: 'planned', phase: 'Memory技术', description: '无限上下文架构', column: 3, row: 0, links: [{ text: '调研报告', url: '/reading/agent-memory/survey-2025-03' }] },
    { id: 'mem0', name: 'Mem0', category: 'Memory技术', status: 'planned', phase: 'Memory技术', description: '生产级记忆系统', column: 3, row: 1, links: [{ text: '调研报告', url: '/reading/agent-memory/survey-2025-03' }] },
    { id: 'zep', name: 'Zep', category: 'Memory技术', status: 'planned', phase: 'Memory技术', description: '时序知识图谱', column: 3, row: 2, links: [{ text: '调研报告', url: '/reading/agent-memory/survey-2025-03' }] },
    { id: 'mirix', name: 'MIRIX', category: 'Memory技术', status: 'planned', phase: 'Memory技术', description: '多Agent记忆', column: 3, row: 3, links: [{ text: '调研报告', url: '/reading/agent-memory/survey-2025-03' }] },
    { id: 'm-plus', name: 'M+', category: 'Memory技术', status: 'planned', phase: 'Memory技术', description: '分层记忆架构', column: 3, row: 4, links: [{ text: '调研报告', url: '/reading/agent-memory/survey-2025-03' }] },
    { id: 'memreasoner', name: 'MemReasoner', category: 'Memory技术', status: 'planned', phase: 'Memory技术', description: '记忆增强推理', column: 3, row: 5, links: [{ text: '调研报告', url: '/reading/agent-memory/survey-2025-03' }] },

    // ========== RAG系统 (第5列) ==========
    { id: 'embedding', name: '文本嵌入', category: 'RAG', status: 'completed', phase: 'RAG系统', description: '文本向量化', column: 4, row: 0 },
    { id: 'vector-db', name: '向量数据库', category: 'RAG', status: 'completed', phase: 'RAG系统', description: '向量存储检索', column: 4, row: 1 },
    { id: 'rag', name: 'RAG', category: 'RAG', status: 'completed', phase: 'RAG系统', description: '检索增强生成', column: 4, row: 2.5 },
    { id: 'retrieval', name: '检索策略', category: 'RAG', status: 'planned', phase: 'RAG系统', description: '高级检索方法', column: 4, row: 4 },

    // ========== 工程实践 (第6列) ==========
    { id: 'langchain', name: 'LangChain', category: '工程', status: 'completed', phase: '工程实践', description: 'LLM应用框架', column: 5, row: 0 },
    { id: 'llamaindex', name: 'LlamaIndex', category: '工程', status: 'planned', phase: '工程实践', description: 'RAG开发框架', column: 5, row: 1 },
    { id: 'multi-agent', name: 'Multi-Agent', category: '工程', status: 'completed', phase: '工程实践', description: '多Agent协作', column: 5, row: 2.5, links: [{ text: 'AutoGen笔记', url: '/reading/notes/autogen' }] },
    { id: 'deployment', name: 'LLM部署', category: '工程', status: 'planned', phase: '工程实践', description: '模型服务化', column: 5, row: 4 },
    { id: 'quantization', name: '模型量化', category: '工程', status: 'planned', phase: '工程实践', description: '推理优化', column: 5, row: 5 },

    // ========== 进阶方向 (第7列) ==========
    { id: 'reasoning', name: '深度推理', category: '进阶', status: 'planned', phase: '进阶方向', description: '复杂问题求解', column: 6, row: 0 },
    { id: 'planning', name: '任务规划', category: '进阶', status: 'planned', phase: '进阶方向', description: '自主任务分解', column: 6, row: 1.5 },
    { id: 'safety', name: 'Agent安全', category: '进阶', status: 'planned', phase: '进阶方向', description: '安全可控性', column: 6, row: 3 },
    { id: 'evaluation', name: '评估基准', category: '进阶', status: 'planned', phase: '进阶方向', description: 'LOCOMO等评测', column: 6, row: 4.5 },
  ],
  links: [
    // 基础层内部
    { source: 'attention', target: 'transformer', type: 'strong' },
    { source: 'transformer', target: 'llm', type: 'strong' },
    { source: 'llm', target: 'prompt', type: 'weak' },

    // 基础 -> Agent
    { source: 'llm', target: 'agent', type: 'strong' },
    { source: 'prompt', target: 'agent', type: 'weak' },
    { source: 'llm', target: 'cot', type: 'weak' },
    { source: 'cot', target: 'react', type: 'strong' },
    { source: 'agent', target: 'react', type: 'strong' },
    { source: 'agent', target: 'tool-use', type: 'strong' },

    // Agent -> Memory
    { source: 'agent', target: 'memory', type: 'strong' },
    { source: 'memory', target: 'working-memory', type: 'strong' },
    { source: 'memory', target: 'episodic', type: 'strong' },
    { source: 'memory', target: 'semantic', type: 'strong' },
    { source: 'memory', target: 'long-term', type: 'strong' },

    // Memory -> Memory技术
    { source: 'episodic', target: 'em-llm', type: 'strong' },
    { source: 'long-term', target: 'mem0', type: 'strong' },
    { source: 'semantic', target: 'zep', type: 'strong' },
    { source: 'memory', target: 'mirix', type: 'strong' },
    { source: 'long-term', target: 'm-plus', type: 'weak' },
    { source: 'memory', target: 'memreasoner', type: 'weak' },

    // 基础 -> RAG
    { source: 'llm', target: 'rag', type: 'strong' },
    { source: 'embedding', target: 'vector-db', type: 'strong' },
    { source: 'vector-db', target: 'rag', type: 'strong' },
    { source: 'embedding', target: 'rag', type: 'strong' },
    { source: 'semantic', target: 'rag', type: 'weak' },
    { source: 'rag', target: 'retrieval', type: 'strong' },

    // Agent -> 工程
    { source: 'agent', target: 'langchain', type: 'weak' },
    { source: 'rag', target: 'llamaindex', type: 'weak' },
    { source: 'agent', target: 'multi-agent', type: 'strong' },
    { source: 'tool-use', target: 'multi-agent', type: 'weak' },
    { source: 'llm', target: 'deployment', type: 'weak' },
    { source: 'deployment', target: 'quantization', type: 'weak' },

    // Agent -> 进阶
    { source: 'react', target: 'reasoning', type: 'strong' },
    { source: 'agent', target: 'planning', type: 'strong' },
    { source: 'memory', target: 'planning', type: 'weak' },
    { source: 'agent', target: 'safety', type: 'weak' },
    { source: 'memory', target: 'evaluation', type: 'weak' },
  ]
}

// 计算节点半径
graphData.nodes.forEach(node => {
  const baseRadius = { '基础层': 22, 'Agent基础': 26, 'Memory核心': 28, 'Memory技术': 24, 'RAG系统': 26, '工程实践': 24, '进阶方向': 22 }[node.phase] || 22
  node.radius = baseRadius
})

const stats = computed(() => ({
  completed: graphData.nodes.filter(n => n.status === 'completed').length,
  inProgress: graphData.nodes.filter(n => n.status === 'in-progress').length,
  planned: graphData.nodes.filter(n => n.status === 'planned').length,
}))

const progressPercent = computed(() => {
  const total = stats.value.completed + stats.value.inProgress + stats.value.planned
  return Math.round((stats.value.completed / total) * 100)
})

const getStatusText = (status) => ({ completed: '已完成', 'in-progress': '进行中', planned: '计划中', basic: '基础' }[status] || status)
const getPrerequisites = (node) => graphData.links.filter(l => l.target === node.id).map(l => graphData.nodes.find(n => n.id === l.source)).filter(Boolean)
const getNextSteps = (node) => graphData.links.filter(l => l.source === node.id).map(l => graphData.nodes.find(n => n.id === l.target)).filter(Boolean)

let d3 = null, svg = null, g = null, zoom = null, nodeElements = null, phaseLabels = null
let linksWithObjects = [] // 存储转换后的链接对象

const colors = { completed: '#10b981', 'in-progress': '#3b82f6', planned: '#f59e0b', basic: '#6b7280' }
const categoryColors = { '基础': '#8b5cf6', 'Agent': '#06b6d4', 'Memory': '#ec4899', 'Memory技术': '#f97316', 'RAG': '#84cc16', '工程': '#6366f1', '进阶': '#14b8a6' }
const phaseColors = { '基础层': '#8b5cf6', 'Agent基础': '#06b6d4', 'Memory核心': '#ec4899', 'Memory技术': '#f97316', 'RAG系统': '#84cc16', '工程实践': '#6366f1', '进阶方向': '#14b8a6' }

const highlightConnections = (nodeId) => {
  if (!window.linkGroups || !nodeElements) return
  const connectedNodeIds = new Set([nodeId])

  // 使用转换后的链接对象来查找关联节点
  linksWithObjects.forEach(l => {
    if (l.source.id === nodeId) connectedNodeIds.add(l.target.id)
    if (l.target.id === nodeId) connectedNodeIds.add(l.source.id)
  })

  // 高亮连线和箭头
  window.linkGroups.selectAll('path')
    .attr('stroke', d => (d.source.id === nodeId || d.target.id === nodeId) ? '#f59e0b' : '#e2e8f0')
    .attr('stroke-width', d => (d.source.id === nodeId || d.target.id === nodeId) ? 3 : 1)
    .attr('opacity', d => (d.source.id === nodeId || d.target.id === nodeId) ? 1 : 0.15)

  window.linkGroups.selectAll('polygon')
    .attr('fill', d => (d.source.id === nodeId || d.target.id === nodeId) ? '#f59e0b' : '#e2e8f0')
    .attr('opacity', d => (d.source.id === nodeId || d.target.id === nodeId) ? 1 : 0.15)

  nodeElements.selectAll('circle.main-circle').attr('opacity', d => connectedNodeIds.has(d.id) ? 1 : 0.3)
  // 关联节点文字保持白色，非关联节点变为灰色
  nodeElements.selectAll('text')
    .attr('opacity', d => connectedNodeIds.has(d.id) ? 1 : 0.7)
    .attr('fill', d => connectedNodeIds.has(d.id) ? '#fff' : '#9ca3af')
  if (phaseLabels) phaseLabels.attr('opacity', 0.3)
}

const clearHighlight = () => {
  if (!window.linkGroups || !nodeElements) return
  window.linkGroups.selectAll('path')
    .attr('stroke', '#94a3b8')
    .attr('stroke-width', d => d.type === 'strong' ? 2.5 : 1.5)
    .attr('opacity', 0.5)
  window.linkGroups.selectAll('polygon')
    .attr('fill', '#94a3b8')
    .attr('opacity', 0.5)
  nodeElements.selectAll('circle.main-circle').attr('opacity', 1)
  // 恢复文字样式
  nodeElements.selectAll('text')
    .attr('opacity', 1)
    .attr('fill', '#fff')
  if (phaseLabels) phaseLabels.attr('opacity', 1)
}

onMounted(async () => {
  if (!graphContainer.value || typeof window === 'undefined') return
  d3 = await import('d3')

  let containerWidth = graphContainer.value.clientWidth
  let containerHeight = graphContainer.value.clientHeight

  svg = d3.select(graphContainer.value).append('svg')
    .attr('width', containerWidth).attr('height', containerHeight)
    .attr('viewBox', [0, 0, containerWidth, containerHeight])

  zoom = d3.zoom().scaleExtent([0.4, 2]).on('zoom', (event) => g.attr('transform', event.transform))
  svg.call(zoom)
  g = svg.append('g')

  // 计算布局 - 时间轴从左到右
  const colWidth = 140
  const rowHeight = 70
  const startX = 80
  const startY = containerHeight / 2

  // 设置节点位置
  graphData.nodes.forEach(node => {
    node.x = startX + node.column * colWidth
    node.y = startY + (node.row - 2.5) * rowHeight
  })

  // 创建节点ID到节点对象的映射
  const nodeMap = new Map(graphData.nodes.map(n => [n.id, n]))

  // 将链接的source和target从字符串转换为节点对象引用
  linksWithObjects = graphData.links.map(l => ({
    ...l,
    source: nodeMap.get(l.source),
    target: nodeMap.get(l.target)
  })).filter(l => l.source && l.target)

  // 阶段背景
  const phaseBands = g.append('g').attr('class', 'phase-bands')
  phases.forEach((phase) => {
    const nodesInPhase = graphData.nodes.filter(n => n.phase === phase)
    if (nodesInPhase.length === 0) return
    const minCol = Math.min(...nodesInPhase.map(n => n.column))
    const maxCol = Math.max(...nodesInPhase.map(n => n.column))
    const x = startX + minCol * colWidth - colWidth / 2
    const width = (maxCol - minCol + 1) * colWidth

    phaseBands.append('rect')
      .attr('x', x).attr('y', 0)
      .attr('width', width).attr('height', containerHeight)
      .attr('fill', phaseColors[phase] + '08')
      .attr('stroke', phaseColors[phase] + '20')
      .attr('stroke-width', 1)

    phaseBands.append('text')
      .attr('x', x + width / 2).attr('y', 25)
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .attr('fill', phaseColors[phase])
      .text(phase)
  })

  // 绘制连线（贝塞尔曲线路径）
  const linkPath = d => {
    const sx = d.source.x, sy = d.source.y
    const tx = d.target.x, ty = d.target.y
    // 使用水平方向的贝塞尔曲线
    const c1x = sx + (tx - sx) * 0.5
    const c1y = sy
    const c2x = sx + (tx - sx) * 0.5
    const c2y = ty
    return `M${sx},${sy}C${c1x},${c1y} ${c2x},${c2y} ${tx},${ty}`
  }

  // 绘制连线组（包含线和箭头）
  const linkGroups = g.append('g').attr('class', 'links').selectAll('g').data(linksWithObjects).join('g')

  // 绘制连线
  linkGroups.append('path')
    .attr('d', linkPath)
    .attr('fill', 'none')
    .attr('stroke', '#94a3b8')
    .attr('stroke-width', d => d.type === 'strong' ? 2.5 : 1.5)
    .attr('stroke-dasharray', d => d.type === 'strong' ? null : '4,4')
    .attr('opacity', 0.5)

  // 在连线末端绘制箭头
  linkGroups.append('polygon')
    .attr('points', '0,-4 8,0 0,4')
    .attr('fill', '#94a3b8')
    .attr('opacity', 0.5)
    .attr('transform', d => {
      const sx = d.source.x, sy = d.source.y
      const tx = d.target.x, ty = d.target.y
      // 计算角度
      const angle = Math.atan2(ty - sy, tx - sx) * 180 / Math.PI
      // 计算箭头位置（在目标节点边缘）
      const targetRadius = d.target.radius || 25
      const distance = Math.sqrt((tx - sx) ** 2 + (ty - sy) ** 2)
      const ratio = (distance - targetRadius - 5) / distance
      const arrowX = sx + (tx - sx) * ratio
      const arrowY = sy + (ty - sy) * ratio
      return `translate(${arrowX}, ${arrowY}) rotate(${angle})`
    })

  // 保存引用用于高亮
  window.linkGroups = linkGroups

  // 绘制节点
  nodeElements = g.append('g').attr('class', 'nodes').selectAll('g').data(graphData.nodes).join('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x},${d.y})`)
    .style('cursor', 'pointer')
    .on('click', (event, d) => {
      event.stopPropagation()
      selectedNode.value = d
      highlightConnections(d.id)
    })

  // 节点外圈 - 阶段颜色
  nodeElements.append('circle')
    .attr('r', d => d.radius + 3)
    .attr('fill', 'none')
    .attr('stroke', d => phaseColors[d.phase])
    .attr('stroke-width', 2)

  // 节点主体 - 状态颜色
  nodeElements.append('circle')
    .attr('class', 'main-circle')
    .attr('r', d => d.radius)
    .attr('fill', d => colors[d.status])
    .attr('stroke', '#fff')
    .attr('stroke-width', 2)

  // 节点文字
  nodeElements.append('text')
    .text(d => {
      const maxLen = Math.floor(d.radius / 5)
      return d.name.length > maxLen ? d.name.slice(0, maxLen) + '..' : d.name
    })
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('font-size', d => Math.min(10, d.radius / 2.2) + 'px')
    .attr('fill', '#fff')
    .attr('font-weight', '600')
    .style('pointer-events', 'none')

  // 状态指示点
  nodeElements.append('circle')
    .attr('r', 5)
    .attr('cx', d => d.radius * 0.7)
    .attr('cy', d => -d.radius * 0.7)
    .attr('fill', d => colors[d.status])
    .attr('stroke', '#fff')
    .attr('stroke-width', 1.5)

  // 点击空白处取消
  svg.on('click', () => {
    selectedNode.value = null
    clearHighlight()
  })

  // 初始适应视图
  setTimeout(fitView, 100)

  // 监听窗口大小变化
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect
      containerWidth = width
      containerHeight = height
      svg.attr('width', width).attr('height', height).attr('viewBox', [0, 0, width, height])
      fitView()
    }
  })
  resizeObserver.observe(graphContainer.value)

  // 保存引用以便清理
  graphContainer.value._resizeObserver = resizeObserver
})

onUnmounted(() => {
  if (graphContainer.value && graphContainer.value._resizeObserver) {
    graphContainer.value._resizeObserver.disconnect()
  }
})

const resetView = () => {
  if (svg && zoom && d3) svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity)
}

const fitView = () => {
  if (!svg || !g || !d3 || !graphContainer.value) return
  const bounds = g.node().getBBox()
  const containerWidth = graphContainer.value.clientWidth
  const containerHeight = graphContainer.value.clientHeight
  const midX = bounds.x + bounds.width / 2
  const midY = bounds.y + bounds.height / 2
  const scale = Math.min(containerWidth / bounds.width, containerHeight / bounds.height) * 0.85
  const transform = d3.zoomIdentity.translate(containerWidth / 2, containerHeight / 2).scale(scale).translate(-midX, -midY)
  svg.transition().duration(500).call(zoom.transform, transform)
}
</script>

<style scoped>
.knowledge-graph {
  display: flex;
  height: calc(100vh - 200px);
  min-height: 500px;
  background: var(--vp-c-bg);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.left-panel {
  width: 260px;
  flex-shrink: 0;
  background: var(--vp-c-bg-soft);
  border-right: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.panel-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.panel-body {
  padding: 16px;
  overflow-y: auto;
  flex: 1;
}

.panel-empty {
  padding: 30px 16px;
  text-align: center;
  color: var(--vp-c-text-2);
}

.panel-empty p {
  font-size: 13px;
  margin-bottom: 20px;
}

.phase-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.phase-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--vp-c-text-1);
}

.phase-dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
}

.info-row {
  margin-bottom: 14px;
}

.node-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  display: block;
  margin-bottom: 6px;
}

.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.status-badge.completed { background: #10b98120; color: #10b981; }
.status-badge.in-progress { background: #3b82f620; color: #3b82f6; }
.status-badge.planned { background: #f59e0b20; color: #f59e0b; }

.label {
  display: block;
  font-size: 10px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.phase-tag, .category-tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid;
}

.description {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.link-item {
  font-size: 12px;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.link-item:hover {
  text-decoration: underline;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  padding: 2px 8px;
  font-size: 10px;
  border-radius: 4px;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.tag.prereq {
  background: #f59e0b15;
  color: #f59e0b;
  border-color: #f59e0b30;
}

.tag.next {
  background: #3b82f615;
  color: #3b82f6;
  border-color: #3b82f630;
}

.graph-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
  gap: 10px;
}

.legend {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dot.completed { background: #10b981; }
.dot.in-progress { background: #3b82f6; }
.dot.planned { background: #f59e0b; }

.controls {
  display: flex;
  gap: 6px;
}

.btn {
  padding: 5px 12px;
  font-size: 11px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand);
}

.stats-bar {
  display: flex;
  gap: 20px;
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 17px;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.stat-label {
  font-size: 10px;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}

.graph-canvas {
  flex: 1;
  cursor: grab;
  min-height: 0;
  background: linear-gradient(90deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 50%, var(--vp-c-bg) 100%);
}

.graph-canvas:active {
  cursor: grabbing;
}

/* 连线说明样式 */
.link-legend {
  padding: 16px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.link-legend-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.link-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 11px;
  color: var(--vp-c-text-2);
  flex-wrap: wrap;
}

.link-text {
  font-size: 12px;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.link-desc {
  color: var(--vp-c-text-2);
  font-size: 11px;
  margin-left: 4px;
}

.link-legend-item:last-child {
  margin-bottom: 0;
}

.link-line {
  display: inline-block;
  width: 30px;
  height: 2px;
  border-radius: 1px;
  position: relative;
}

.link-line.strong {
  background: #94a3b8;
  height: 2.5px;
}

.link-line.strong::after {
  content: '';
  position: absolute;
  right: -2px;
  top: 50%;
  transform: translateY(-50%);
  border: 4px solid transparent;
  border-left: 6px solid #94a3b8;
}

.link-line.weak {
  background: repeating-linear-gradient(
    to right,
    #94a3b8,
    #94a3b8 4px,
    transparent 4px,
    transparent 8px
  );
  height: 1.5px;
}

.link-line.weak::after {
  content: '';
  position: absolute;
  right: -2px;
  top: 50%;
  transform: translateY(-50%);
  border: 3px solid transparent;
  border-left: 5px solid #94a3b8;
}

@media (max-width: 768px) {
  .knowledge-graph {
    flex-direction: column;
    height: auto;
  }

  .left-panel {
    width: 100%;
    max-height: 280px;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .graph-area {
    height: 450px;
  }
}
</style>
