<script setup>
import { RouterView } from 'vue-router';
import DefaultLayout from './layouts/DefaultLayout.vue';
</script>

<template>
  <DefaultLayout>
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </DefaultLayout>
</template>

<style>
html,
body,
#app {
  height: 100%;
}

.main-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
}

.main-wrapper>.el-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
}

.el-main {
  flex-grow: 1;
  background-color: #F4F6F8;
}

.el-header,
.el-footer {
  flex-grow: 0;
  flex-shrink: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #5e9cdb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>