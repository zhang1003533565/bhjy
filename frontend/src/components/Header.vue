<!-- 顶部导航栏组件 -->
<template>
  <header class="bg-white shadow-sm">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center">
        <img src="@/assets/school_logo.png" alt="河北建筑工程学院" class="h-10 w-10 mr-3" />
        <h1 class="text-2xl font-bold text-gray-800">河北建筑工程学院图书馆</h1>
      </div>
      <nav class="hidden md:flex space-x-8">
        <router-link to="/home" class="text-gray-700 hover:text-blue-600 cursor-pointer">首页</router-link>
        <router-link to="/summary" class="text-gray-700 hover:text-blue-600 cursor-pointer">概况</router-link>
        <router-link to="/activity-center" class="text-gray-700 hover:text-blue-600 cursor-pointer">活动中心</router-link>
        <router-link to="/book-category" class="text-gray-700 hover:text-blue-600 cursor-pointer">图书分类</router-link>
        <router-link to="/campus-lectures" class="text-gray-700 hover:text-blue-600 cursor-pointer">校园讲座</router-link>
        <router-link to="/journals" class="text-gray-700 hover:text-blue-600 cursor-pointer">校园期刊</router-link>
        <router-link to="/new-student-guide" class="text-gray-700 hover:text-blue-600 cursor-pointer">新生引导</router-link>
      </nav>
      <div class="flex items-center space-x-4">
        <button class="text-gray-700 hover:text-blue-600 cursor-pointer">
          <i class="fas fa-bell text-xl"></i>
        </button>
        <div class="relative">
          <div 
            class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer"
            @click="toggleDropdown"
          >
            <i class="fas fa-user text-blue-600"></i>
          </div>
          
          <!-- 下拉菜单 -->
          <div 
            v-if="showDropdown" 
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
            @mouseleave="showDropdown = false"
          >
            <router-link 
              to="/profile" 
              class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <i class="fas fa-user-circle mr-2"></i>个人中心
            </router-link>
            <router-link 
              to="/smart-question-bank" 
              class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <i class="fas fa-book mr-2"></i>智能题库助手
            </router-link>
            <router-link 
              to="/study-planner" 
              class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <i class="fas fa-calendar-alt mr-2"></i>学习规划
            </router-link>
            <router-link 
              to="/learning-assistant" 
              class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <i class="fas fa-graduation-cap mr-2"></i>学习助手
            </router-link>
            <router-link 
              to="/my-bookshelf" 
              class="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <i class="fas fa-book-reader mr-2"></i>我的书架
            </router-link>
            <div class="border-t border-gray-100 my-1"></div>
            <button 
              class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              @click="logout"
            >
              <i class="fas fa-sign-out-alt mr-2"></i>退出登录
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const logout = () => {
  // 清除登录信息
  localStorage.removeItem('token');
  // 跳转到登录页
  router.push('/auth/login');
};
</script>

<style scoped>
.router-link-active {
  color: #2563eb; /* blue-600 */
  border-bottom: 2px solid #2563eb;
}

/* 导航栏中的 router-link-active 样式 */
nav .router-link-active {
  color: #2563eb;
  border-bottom: 2px solid #2563eb;
}

/* 下拉菜单中的 router-link-active 样式 */
.absolute .router-link-active {
  color: #2563eb;
  background-color: #eff6ff;
  border-bottom: none;
}
</style> 