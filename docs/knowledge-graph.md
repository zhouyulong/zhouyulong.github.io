---
title: 知识网络拓扑
description: AI Agent 学习知识图谱可视化 - 展示已学、待学和计划中的知识点及其关系
aside: false
editLink: false
---

<script setup>
import { onMounted, ref } from 'vue'
import KnowledgeGraph from './.vitepress/components/KnowledgeGraph.vue'

const isClient = ref(false)
onMounted(() => {
  isClient.value = true
})
</script>

<div v-if="isClient" class="graph-container">
  <KnowledgeGraph />
</div>
<div v-else class="loading">
  <div class="loading-spinner"></div>
  <p>正在加载知识图谱...</p>
</div>

<style>
/* 覆盖 VitePress 默认布局，让图谱占满全屏 */
:deep(.VPDoc) {
  padding: 0 !important;
}

:deep(.VPDoc .container) {
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

:deep(.VPDoc .content) {
  max-width: none !important;
  padding: 0 !important;
}

:deep(.VPDoc .content-container) {
  max-width: none !important;
}

:deep(.VPDoc .aside) {
  display: none !important;
}

:deep(.VPDoc .main) {
  max-width: none !important;
}

:deep(.vp-doc) {
  padding: 0 !important;
}

:deep(.vp-doc > *) {
  display: none;
}

:deep(.vp-doc > .graph-container) {
  display: block;
}

.graph-container {
  position: fixed;
  top: var(--vp-nav-height, 64px);
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: calc(100vh - var(--vp-nav-height, 64px));
  overflow: hidden;
  background: var(--vp-c-bg);
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: var(--vp-c-text-2);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
