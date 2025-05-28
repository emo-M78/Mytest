import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import { useAuthStore } from '@/stores/modules/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/ContactPage.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginPage.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterPage.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/:pathMatch(.)',
      name: 'NotFound',
      component: () => import('../views/NotFoundPage.vue')
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

