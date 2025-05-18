<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center">
          <i class="fas fa-book-open text-blue-600 text-3xl mr-3"></i>
          <h1 class="text-2xl font-bold text-gray-800">智慧图书馆</h1>
        </div>
        <nav class="hidden md:flex space-x-8">
          <a href="#" class="text-gray-700 hover:text-blue-600 cursor-pointer">首页</a>
          <a href="#" class="text-gray-700 hover:text-blue-600 cursor-pointer">分类</a>
          <a href="#" class="text-gray-700 hover:text-blue-600 cursor-pointer">排行榜</a>
          <a href="#" class="text-gray-700 hover:text-blue-600 cursor-pointer">学习计划</a>
          <a href="#" class="text-gray-700 hover:text-blue-600 cursor-pointer">我的书架</a>
        </nav>
        <div class="flex items-center space-x-4">
          <button class="text-gray-700 hover:text-blue-600 cursor-pointer">
            <i class="fas fa-bell text-xl"></i>
          </button>
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center cursor-pointer">
            <i class="fas fa-user text-blue-600"></i>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="container mx-auto px-4 py-8">
      <!-- 搜索区域 -->
      <section class="mb-12 relative">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 shadow-sm">
          <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl font-bold text-center text-gray-800 mb-6">探索知识的海洋，发现更多可能</h2>
            <div class="relative">
              <input 
                type="text" 
                placeholder="搜索书籍、作者或关键词..."
                class="w-full py-4 px-6 pr-12 rounded-full border-none shadow-md text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                v-model="searchQuery"
              />
              <button class="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600 cursor-pointer !rounded-button whitespace-nowrap">
                <i class="fas fa-search text-xl"></i>
              </button>
            </div>
            <div class="flex flex-wrap mt-4 justify-center">
              <span v-for="(tag, index) in searchTags" :key="index" 
                class="bg-white px-3 py-1 rounded-full text-sm text-gray-700 mr-2 mb-2 shadow-sm hover:bg-blue-50 cursor-pointer">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- 个性化推荐区域 -->
      <section class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            <i class="fas fa-star text-yellow-500 mr-2"></i>为你推荐
          </h2>
          <button class="text-blue-600 hover:text-blue-800 flex items-center cursor-pointer !rounded-button whitespace-nowrap">
            查看更多 <i class="fas fa-chevron-right ml-1"></i>
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(book, index) in recommendedBooks" :key="index" 
            class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div class="h-48 overflow-hidden">
              <img :src="book.coverUrl" :alt="book.title" class="w-full h-full object-cover object-top" />
            </div>
            <div class="p-4">
              <h3 class="font-bold text-lg text-gray-800 mb-2">{{ book.title }}</h3>
              <p class="text-gray-600 text-sm mb-3">{{ book.author }}</p>
              <p class="text-gray-700 text-sm mb-4">{{ book.description }}</p>
              <div class="flex justify-between">
                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm cursor-pointer !rounded-button whitespace-nowrap">
                  立即借阅
                </button>
                <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm cursor-pointer !rounded-button whitespace-nowrap">
                  <i class="fas fa-bookmark mr-1"></i> 收藏
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 学习计划模块 -->
      <section class="mb-12">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 shadow-md text-white">
          <div class="flex flex-col md:flex-row items-center">
            <div class="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 class="text-2xl font-bold mb-4">为你生成专属的学习计划</h2>
              <p class="mb-6">根据你的阅读历史和学习目标，我们可以为你定制个性化的学习路径，帮助你更高效地获取知识。</p>
              
              <div class="mb-6">
                <div class="flex justify-between mb-2">
                  <span>当前进度</span>
                  <span>{{ learningProgress }}%</span>
                </div>
                <div class="w-full bg-blue-200 bg-opacity-30 rounded-full h-2.5">
                  <div class="bg-white h-2.5 rounded-full" :style="`width: ${learningProgress}%`"></div>
                </div>
              </div>
              
              <div class="flex space-x-4">
                <button class="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 font-medium cursor-pointer !rounded-button whitespace-nowrap">
                  开始学习
                </button>
                <button class="bg-blue-500 bg-opacity-30 text-white px-6 py-3 rounded-lg hover:bg-opacity-40 font-medium cursor-pointer !rounded-button whitespace-nowrap">
                  调整计划
                </button>
              </div>
            </div>
            <div class="md:w-1/3">
              <img :src="learningPlanImage" alt="学习计划" class="w-full rounded-xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <!-- 猜你想看区域 -->
      <section class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>猜你想看
          </h2>
          <button class="text-blue-600 hover:text-blue-800 flex items-center cursor-pointer !rounded-button whitespace-nowrap">
            查看更多 <i class="fas fa-chevron-right ml-1"></i>
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <div v-for="(book, index) in guessBooks" :key="index" 
            class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex">
            <div class="w-1/3 overflow-hidden">
              <img :src="book.coverUrl" :alt="book.title" class="w-full h-full object-cover object-top" />
            </div>
            <div class="w-2/3 p-4">
              <h3 class="font-bold text-gray-800 mb-1">{{ book.title }}</h3>
              <p class="text-gray-600 text-xs mb-2">{{ book.author }}</p>
              <p class="text-gray-700 text-sm mb-3 line-clamp-2">{{ book.description }}</p>
              <div class="flex space-x-2">
                <button class="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-700 cursor-pointer !rounded-button whitespace-nowrap">
                  借阅
                </button>
                <button class="bg-green-600 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-700 cursor-pointer !rounded-button whitespace-nowrap">
                  生成题库
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 精选书单 -->
      <section class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">
            <i class="fas fa-list-alt text-blue-500 mr-2"></i>精选书单
          </h2>
          <div class="flex space-x-2">
            <button v-for="(category, index) in bookCategories" :key="index"
              :class="`px-4 py-2 rounded-lg text-sm cursor-pointer !rounded-button whitespace-nowrap ${activeCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`"
              @click="activeCategory = category">
              {{ category }}
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(book, index) in filteredCategoryBooks" :key="index" 
            class="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div class="h-48 overflow-hidden">
              <img :src="book.coverUrl" :alt="book.title" class="w-full h-full object-cover object-top" />
            </div>
            <div class="p-4">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold text-gray-800">{{ book.title }}</h3>
                <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{{ book.category }}</span>
              </div>
              <p class="text-gray-600 text-sm mb-2">{{ book.author }}</p>
              <p class="text-gray-700 text-sm mb-4 line-clamp-2">{{ book.description }}</p>
              <div class="flex justify-between">
                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm cursor-pointer !rounded-button whitespace-nowrap">
                  立即借阅
                </button>
                <button class="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 text-sm cursor-pointer !rounded-button whitespace-nowrap">
                  <i class="fas fa-bookmark"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">智慧图书馆</h3>
            <p class="text-gray-400">探索知识的海洋，发现更多可能</p>
            <div class="flex space-x-4 mt-4">
              <a href="#" class="text-gray-400 hover:text-white cursor-pointer">
                <i class="fab fa-weixin text-xl"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white cursor-pointer">
                <i class="fab fa-weibo text-xl"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white cursor-pointer">
                <i class="fab fa-qq text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-bold mb-4">服务支持</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white cursor-pointer">帮助中心</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white cursor-pointer">联系我们</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white cursor-pointer">意见反馈</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white cursor-pointer">常见问题</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-bold mb-4">关于我们</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white cursor-pointer">公司简介</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white cursor-pointer">加入我们</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white cursor-pointer">隐私政策</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white cursor-pointer">用户协议</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-bold mb-4">下载客户端</h3>
            <div class="bg-gray-700 p-4 rounded-lg">
              <div class="flex items-center justify-center mb-2">
                <i class="fas fa-qrcode text-5xl text-gray-400"></i>
              </div>
              <p class="text-gray-400 text-center text-sm">扫码下载APP</p>
              <div class="flex justify-center space-x-3 mt-3">
                <i class="fab fa-android text-gray-400 text-lg"></i>
                <i class="fab fa-apple text-gray-400 text-lg"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© 2025 智慧图书馆. 保留所有权利.</p>
          <div class="flex justify-center space-x-4 mt-4">
            <i class="fab fa-cc-visa text-xl"></i>
            <i class="fab fa-cc-mastercard text-xl"></i>
            <i class="fab fa-alipay text-xl"></i>
            <i class="fab fa-weixin text-xl"></i>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

// 搜索相关
const searchQuery = ref('');
const searchTags = [
  '考研书籍', '人工智能', '计算机编程', '经济学', '历史文学', '英语学习'
];

// 学习进度
const learningProgress = ref(65);

// 为你推荐的书籍
const recommendedBooks = [
  {
    title: '人工智能基础',
    author: '李明 著',
    description: '适合初学者入门学习的人工智能教材，内容全面且易于理解。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20textbook%20cover%20about%20artificial%20intelligence%20basics%20with%20clean%20minimalist%20design%2C%20featuring%20abstract%20neural%20network%20patterns%20on%20a%20light%20blue%20background%2C%20suitable%20for%20beginners%2C%20modern%20and%20professional%20looking&width=400&height=600&seq=1&orientation=portrait'
  },
  {
    title: '考研数学精讲',
    author: '张华 编著',
    description: '针对考研数学难点进行详细讲解，配有大量例题和习题。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20mathematics%20textbook%20cover%20for%20graduate%20entrance%20examination%20with%20elegant%20design%2C%20featuring%20mathematical%20formulas%20and%20graphs%20on%20a%20light%20green%20background%2C%20clean%20and%20academic%20looking&width=400&height=600&seq=2&orientation=portrait'
  },
  {
    title: 'Python编程入门到精通',
    author: '王强 著',
    description: '从零基础开始学习Python，循序渐进，案例丰富。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20modern%20Python%20programming%20book%20cover%20with%20clean%20design%2C%20featuring%20Python%20logo%20and%20code%20snippets%20on%20a%20light%20purple%20background%2C%20professional%20and%20beginner-friendly%20appearance&width=400&height=600&seq=3&orientation=portrait'
  },
  {
    title: '数据结构与算法分析',
    author: '刘伟 著',
    description: '深入浅出地讲解数据结构与算法，适合计算机专业学生。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20computer%20science%20textbook%20cover%20about%20data%20structures%20and%20algorithms%20with%20modern%20design%2C%20featuring%20abstract%20algorithm%20flowcharts%20on%20a%20light%20orange%20background%2C%20academic%20and%20clean%20looking&width=400&height=600&seq=4&orientation=portrait'
  }
];

// 猜你想看的书籍
const guessBooks = [
  {
    title: '机器学习实战',
    author: '陈明 著',
    description: '通过实际案例讲解机器学习算法的应用，包含详细代码和实战技巧。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20machine%20learning%20book%20cover%20with%20modern%20design%2C%20featuring%20abstract%20AI%20patterns%20and%20code%20examples%20on%20a%20light%20background%2C%20practical%20and%20hands-on%20appearance&width=300&height=450&seq=5&orientation=portrait'
  },
  {
    title: '考研英语词汇精讲',
    author: '李娜 编著',
    description: '系统整理考研英语高频词汇，配有记忆方法和例句。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20English%20vocabulary%20book%20cover%20for%20graduate%20entrance%20examination%20with%20clean%20design%2C%20featuring%20English%20words%20and%20learning%20methods%20on%20a%20light%20blue%20background%2C%20academic%20and%20systematic%20appearance&width=300&height=450&seq=6&orientation=portrait'
  },
  {
    title: '数据分析与可视化',
    author: '赵刚 著',
    description: '全面介绍数据分析方法和可视化技术，适合数据科学入门。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20data%20analysis%20and%20visualization%20book%20cover%20with%20modern%20design%2C%20featuring%20colorful%20charts%20and%20graphs%20on%20a%20light%20background%2C%20analytical%20and%20visually%20appealing%20appearance&width=300&height=450&seq=7&orientation=portrait'
  }
];

// 学习计划图片
const learningPlanImage = 'https://readdy.ai/api/search-image?query=A%20professional%20illustration%20showing%20a%20personalized%20learning%20plan%20with%20progress%20tracking%2C%20schedule%20and%20educational%20resources%2C%20featuring%20modern%20design%20elements%20on%20a%20light%20background%2C%20educational%20and%20motivational%20appearance&width=500&height=400&seq=8&orientation=landscape';

// 书籍分类
const bookCategories = ['人工智能', '考研必备', '职场进阶', '编程开发'];
const activeCategory = ref('人工智能');

// 分类书籍
const categoryBooks = [
  {
    title: '深度学习入门',
    author: '张伟 著',
    description: '深度学习基础理论与实践指南，适合AI领域初学者。',
    category: '人工智能',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20deep%20learning%20book%20cover%20with%20modern%20design%2C%20featuring%20neural%20network%20visualization%20on%20a%20light%20background%2C%20beginner-friendly%20and%20technical%20appearance&width=400&height=600&seq=9&orientation=portrait'
  },
  {
    title: '计算机视觉实战',
    author: '刘明 著',
    description: '计算机视觉算法与应用案例详解，包含代码实现。',
    category: '人工智能',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20computer%20vision%20book%20cover%20with%20modern%20design%2C%20featuring%20image%20recognition%20examples%20and%20camera%20icons%20on%20a%20light%20background%2C%20practical%20and%20technical%20appearance&width=400&height=600&seq=10&orientation=portrait'
  },
  {
    title: '自然语言处理技术',
    author: '王芳 著',
    description: '详细介绍NLP技术原理与应用，包含最新研究进展。',
    category: '人工智能',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20natural%20language%20processing%20book%20cover%20with%20modern%20design%2C%20featuring%20text%20analysis%20visualization%20and%20language%20patterns%20on%20a%20light%20background%2C%20technical%20and%20innovative%20appearance&width=400&height=600&seq=11&orientation=portrait'
  },
  {
    title: '强化学习原理与实践',
    author: '李强 著',
    description: '系统讲解强化学习算法，结合实际案例分析。',
    category: '人工智能',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20reinforcement%20learning%20book%20cover%20with%20modern%20design%2C%20featuring%20reward%20system%20diagrams%20and%20algorithm%20flowcharts%20on%20a%20light%20background%2C%20technical%20and%20practical%20appearance&width=400&height=600&seq=12&orientation=portrait'
  },
  {
    title: '考研政治精讲',
    author: '张红 编著',
    description: '考研政治重点难点讲解，配有大量真题解析。',
    category: '考研必备',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20political%20science%20textbook%20cover%20for%20graduate%20entrance%20examination%20with%20clean%20design%2C%20featuring%20Chinese%20political%20symbols%20on%20a%20light%20red%20background%2C%20academic%20and%20systematic%20appearance&width=400&height=600&seq=13&orientation=portrait'
  },
  {
    title: '考研英语阅读理解',
    author: '王丽 编著',
    description: '考研英语阅读理解技巧与实战训练，提高阅读速度和准确率。',
    category: '考研必备',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20English%20reading%20comprehension%20book%20cover%20for%20graduate%20entrance%20examination%20with%20elegant%20design%2C%20featuring%20text%20analysis%20diagrams%20on%20a%20light%20blue%20background%2C%20academic%20and%20practical%20appearance&width=400&height=600&seq=14&orientation=portrait'
  },
  {
    title: '高效能人士的七个习惯',
    author: '史蒂芬·柯维 著',
    description: '世界级畅销书，教你如何提高个人效能和领导力。',
    category: '职场进阶',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20self-help%20book%20cover%20about%20seven%20habits%20of%20highly%20effective%20people%20with%20elegant%20design%2C%20featuring%20success%20symbols%20on%20a%20light%20background%2C%20motivational%20and%20professional%20appearance&width=400&height=600&seq=15&orientation=portrait'
  },
  {
    title: 'JavaScript高级程序设计',
    author: '尼古拉斯 著',
    description: 'JavaScript权威指南，深入讲解语言特性和最佳实践。',
    category: '编程开发',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20professional%20JavaScript%20programming%20book%20cover%20with%20modern%20design%2C%20featuring%20code%20snippets%20and%20JS%20logo%20on%20a%20light%20yellow%20background%2C%20advanced%20and%20technical%20appearance&width=400&height=600&seq=16&orientation=portrait'
  }
];

// 根据选中的分类过滤书籍
const filteredCategoryBooks = computed(() => {
  return categoryBooks.filter(book => book.category === activeCategory.value);
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

