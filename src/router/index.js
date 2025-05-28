import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import { useAuthStore } from '@/stores/modules/auth'
import SimplestPage from '../views/SimplestPage.vue' // 创建一个新文件

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'Simple',
    //   component: SimplestPage,
    // },
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutPage.vue'),
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
      component: () => import('../components/PortfolioItem.vue')
      // CUSTOMIZATION: 创建并链接到您的 PortfolioPage.vue
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/ContactPage.vue')
      // CUSTOMIZATION: 创建并链接到您的 ContactPage.vue
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginPage.vue'),
      meta: { requiresGuest: true } // CUSTOMIZATION: 路由元信息，例如用于导航守卫
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterPage.vue'),
      meta: { requiresGuest: true } // CUSTOMIZATION: 路由元信息
    },
    {
      path: '/:pathMatch(.)', // 匹配所有未匹配到的路径
      name: 'NotFound',
      component: () => import('../views/NotFoundPage.vue')
      // CUSTOMIZATION: 创建一个 NotFoundPage.vue 用于处理无效路径
    }
  ],
  //   // CUSTOMIZATION: 可以添加 scrollBehavior 来自定义路由切换时的滚动行为
  //   scrollBehavior(to, from, savedPosition) {
  //     if (savedPosition) {
  //       return savedPosition
  //     } else {
  //       return { top: 0, behavior: 'smooth' } // 切换路由时平滑滚动到页面顶部
  //     }
  //   }
})

// // CUSTOMIZATION: 导航守卫示例 (例如，如果已登录则重定向离开登录页)
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore(); // 确保在 Pinia 初始化后使用
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next({ name: 'Login' });
//   } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
//     next({ name: 'Home' });
//   } else {
//     next();
//   }
//   console.log(`Navigating FROM: ${from.fullPath} (isAuthenticated: ${useAuthStore().isAuthenticated})`);
//   console.log(`Navigating TO: ${to.fullPath} (meta: ${JSON.stringify(to.meta)})`);

// });

export default router

