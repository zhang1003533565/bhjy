import { createRouter, createWebHistory } from 'vue-router'

// 延迟加载页面组件
const Home = () => import('../views/Home.vue')
const BookList = () => import('../views/book/BookList.vue')
const BookDetail = () => import('../views/book/BookDetail.vue')
const CategoryList = () => import('../views/category/CategoryList.vue')
const BorrowingManagement = () => import('../views/borrowing/BorrowingManagement.vue')
const UserProfile = () => import('../views/user/UserProfile.vue')
const MyBooks = () => import('../views/user/MyBooks.vue')
const Login = () => import('../views/auth/Login.vue')
const Register = () => import('../views/auth/Register.vue')
const NotFound = () => import('../views/NotFound.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页 - 图书馆管理系统' }
  },
  {
    path: '/books',
    name: 'BookList',
    component: BookList,
    meta: { title: '图书目录 - 图书馆管理系统' }
  },
  {
    path: '/books/:id',
    name: 'BookDetail',
    component: BookDetail,
    props: true,
    meta: { title: '图书详情 - 图书馆管理系统' }
  },
  {
    path: '/categories',
    name: 'CategoryList',
    component: CategoryList,
    meta: { title: '图书分类 - 图书馆管理系统' }
  },
  {
    path: '/borrowing',
    name: 'BorrowingManagement',
    component: BorrowingManagement,
    meta: { title: '借阅管理 - 图书馆管理系统', requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { title: '个人信息 - 图书馆管理系统', requiresAuth: true }
  },
  {
    path: '/my-books',
    name: 'MyBooks',
    component: MyBooks,
    meta: { title: '我的借阅 - 图书馆管理系统', requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录 - 图书馆管理系统' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: '注册 - 图书馆管理系统' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '页面未找到 - 图书馆管理系统' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || '图书馆管理系统'
  
  // 检查是否需要登录认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查本地存储中是否有令牌
    const token = localStorage.getItem('token')
    if (!token) {
      // 如果没有令牌，重定向到登录页面
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router 