<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <el-container class="default-layout">
    <el-header class="layout-header">
      <AppHeader />
    </el-header>

    <el-main class="layout-main">
      <slot></slot>
    </el-main>

    <el-footer class="layout-footer">
      <AppFooter />
    </el-footer>
  </el-container>
</template>

<style scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  background-color: #ffffff;
  color: #333;
  padding: 0;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  height: 64px;
}

.layout-main {
  flex: 1 0 auto;
  padding: 20px;
  background-color: #f4f6f8;
}

.layout-footer {
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 20px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
</style>