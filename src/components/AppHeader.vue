<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/modules/auth'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const currentUser = computed(() => authStore.currentUser)

const navLinks = [
  { name: 'Home', text: '首页' },
  { name: 'Portfolio', text: '作品集' },
  { name: 'About', text: '关于' },
  { name: 'Contact', text: '联系' }
]

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'Login' })
}

const activeIndex = computed(() => router.currentRoute.value.name || 'Home')
</script>

<template>
  <div class="app-header-content container">
    <div class="logo" @click="router.push({ name: 'Home' })">
      范杰-VUE期末考核项目
    </div>

    <el-menu :default-active="activeIndex" class="el-menu-nav" mode="horizontal" router :ellipsis="false">
      <el-menu-item v-for="link in navLinks" :key="link.name" :index="link.name" :route="{ name: link.name }">
        {{ link.text }}
      </el-menu-item>

      <template v-if="!isAuthenticated">
        <el-menu-item index="Login" :route="{ name: 'Login' }">登录</el-menu-item>
        <el-menu-item index="Register" :route="{ name: 'Register' }">注册</el-menu-item>
      </template>
      <template v-else>
        <el-sub-menu index="user-menu">
          <template #title>
            <span class="username">欢迎, {{ currentUser?.username || '用户' }}</span>
          </template>
          <el-menu-item index="Logout" @click="handleLogout">退出登录</el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.app-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #303133;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo:hover {
  color: #409EFF;
}

.el-menu-nav {
  border-bottom: none !important;
  margin-left: auto;
  background-color: transparent !important;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  height: 60px;
  line-height: 60px;
  font-size: 1rem;
  color: #606266;
  transition: all 0.3s;
}

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  background-color: #ecf5ff !important;
  color: #409EFF !important;
}

:deep(.el-menu-item.is-active) {
  color: #409EFF !important;
  border-bottom: 2px solid #409EFF !important;
}

.username {
  padding: 0 10px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-header-content {
    flex-direction: column;
    padding: 10px;
    height: auto;
  }

  .logo {
    margin-bottom: 10px;
    font-size: 1.2rem;
  }

  .el-menu-nav {
    width: 100%;
    margin-left: 0;
  }

  :deep(.el-menu--horizontal) {
    flex-wrap: wrap;
    justify-content: center;
  }

  :deep(.el-menu-item),
  :deep(.el-sub-menu) {
    height: 40px;
    line-height: 40px;
  }
}
</style>