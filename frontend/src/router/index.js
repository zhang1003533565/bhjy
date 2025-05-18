import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/auth/Login.vue";
import Home from "@/views/Home.vue";
import SmartQuestionBank from "@/views/SmartQuestionBank/SmartQuestionBank.vue";
import StudyPlanner from "@/views/StudyPlanner/StudyPlanner.vue";
import LearningAssistant from "@/views/LearningAssistant/LearningAssistant.vue";
import BookCategories from "@/views/BookCategories/BookCategories.vue";
import MyBookshelf from "@/views/MyBookshelf/MyBookshelf.vue";
import UserProfile from "@/views/UserProfile/UserProfile.vue";
import Summary from "@/views/Summary/Summary.vue";
import CampusLectures from "@/views/CampusLectures/CampusLectures.vue";
import ActivityCenter from "@/views/ActivityCenter/ActivityCenter.vue";
import Journals from "@/views/Journals/Journals.vue";
import NewStudentGuide from "@/views/NewStudentGuide/NewStudentGuide.vue";

const routes = [
  {
    path: "/",
    redirect: "/home"
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
  },
  {
    path: "/book-category",
    name: "BookCategories",
    component: BookCategories,
    meta: { requiresAuth: true }
  },
  {
    path: "/smart-question-bank",
    name: "SmartQuestionBank",
    component: SmartQuestionBank,
    meta: { requiresAuth: true }
  },
  {
    path: "/study-planner",
    name: "StudyPlanner",
    component: StudyPlanner,
    meta: { requiresAuth: true }
  },
  {
    path: "/learning-assistant",
    name: "LearningAssistant",
    component: LearningAssistant,
    meta: { requiresAuth: true }
  },
  {
    path: "/my-bookshelf",
    name: "MyBookshelf",
    component: MyBookshelf,
    meta: { requiresAuth: true }
  },
  {
    path: "/profile",
    name: "UserProfile",
    component: UserProfile,
    meta: { requiresAuth: true }
  },
  {
    path: "/summary",
    name: "Summary",
    component: Summary,
    meta: { requiresAuth: true }
  },
  {
    path: "/campus-lectures",
    name: "CampusLectures",
    component: CampusLectures,
    meta: { requiresAuth: true }
  },
  {
    path: "/activity-center",
    name: "ActivityCenter",
    component: ActivityCenter,
    meta: { requiresAuth: true }
  },
  {
    path: "/journals",
    name: "Journals",
    component: Journals,
    meta: { requiresAuth: true }
  },
  {
    path: "/new-student-guide",
    name: "NewStudentGuide",
    component: NewStudentGuide,
    meta: { requiresAuth: true }
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
