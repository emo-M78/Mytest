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
      component: () => import('../views/PortfolioPage.vue')
    },
    {
      path: '/portfolio/:id',
      name: 'ProjectDetail',
      component: () => import('../views/ProjectDetailPage.vue'),
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

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'Home' });
  } else {
    next();
  }
  console.log(`Navigating FROM: ${from.fullPath} (isAuthenticated: ${useAuthStore().isAuthenticated})`);
  console.log(`Navigating TO: ${to.fullPath} (meta: ${JSON.stringify(to.meta)})`);

});

export default router

