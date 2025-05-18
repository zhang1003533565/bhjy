import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/auth/Login.vue";
import Home from "@/views/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/auth/login"
  },
  {
    path: "/auth/login",
    name: "Login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }  // 标记需要认证
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 检查路由是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查是否已登录
    const token = localStorage.getItem('token');
    if (!token) {
      // 未登录，重定向到登录页
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath }  // 保存原本要去的路径
      });
    } else {
      next();  // 已登录，继续访问
    }
  } else {
    next();  // 不需要认证的页面直接通过
  }
});

export default router;
