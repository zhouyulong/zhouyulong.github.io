<template>
  <div class="giscus-wrapper">
    <h2>评论</h2>
    <div class="giscus-container">
      <script
        src="https://giscus.app/client.js"
        :data-repo="repo"
        data-repo-id="R_kgDOOAL4Kg"
        data-category="Paper Discussions"
        data-category-id="DIC_kwDOOAL4Ks4CnWyR"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async
      ></script>
    </div>
  </div>
</template>

<script setup>
const repo = 'zhouyulong/zhouyulong.github.io'
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}
.giscus-container {
  margin-top: 1rem;
}
</style>
