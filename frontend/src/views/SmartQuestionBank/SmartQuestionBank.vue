<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 使用Header组件 -->
    <Header />

    <!-- 主要内容区 -->
    <div class="container mx-auto px-6 py-8">
      <!-- Hero 区域 -->
      <div class="relative rounded-xl overflow-hidden mb-12">
        <div class="flex flex-col md:flex-row items-center bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-xl">
          <div class="md:w-1/2 p-8 md:p-12 z-10">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">智能题库生成与错题管理</h2>
            <p class="text-indigo-100 mb-6">基于 AI 技术，为您打造个性化学习体验，提高学习效率，实现知识快速掌握</p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="bg-white text-indigo-700 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                开始生成题库
              </button>
              <button class="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-800 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                查看使用教程
              </button>
            </div>
          </div>
          <div class="md:w-1/2 h-full">
            <img src="https://readdy.ai/api/search-image?query=Modern%20educational%20technology%20concept%20with%20books%2C%20digital%20tablet%2C%20and%20futuristic%20holographic%20interface%20showing%20quiz%20questions%20and%20learning%20analytics%2C%20clean%20minimalist%20background%20with%20blue%20gradient%20lighting%2C%20professional%203D%20rendering&width=800&height=600&seq=1&orientation=landscape" 
                 alt="智能学习系统" 
                 class="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>

      <!-- 主要功能区 -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 左侧主功能区 -->
        <div class="lg:w-2/3">
          <!-- 题库生成模块 -->
          <div class="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-6">题库生成</h3>
            
            <div class="relative mb-6">
              <input 
                type="text" 
                placeholder="请输入书籍名称，系统将自动生成相关题库..." 
                class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                生成题库
              </button>
            </div>
            
            <h4 class="font-medium text-gray-700 mb-4">热门推荐书籍</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="(book, index) in recommendedBooks" :key="index" class="flex border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-300 cursor-pointer">
                <div class="w-1/3 overflow-hidden">
                  <img :src="book.image" :alt="book.title" class="w-full h-full object-cover object-top" />
                </div>
                <div class="w-2/3 p-4">
                  <h5 class="font-medium text-gray-800 mb-1">{{ book.title }}</h5>
                  <p class="text-gray-600 text-sm mb-2">{{ book.author }}</p>
                  <div class="flex items-center">
                    <span class="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">{{ book.category }}</span>
                    <span class="text-xs text-gray-500 ml-2">{{ book.questionCount }}+ 题</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 错题管理模块 -->
          <div class="bg-white rounded-xl shadow-md p-6 mb-8">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-bold text-gray-800">错题管理</h3>
              <button class="text-indigo-600 hover:text-indigo-800 flex items-center cursor-pointer">
                <span>查看全部</span>
                <i class="fas fa-chevron-right ml-1 text-xs"></i>
              </button>
            </div>
            
            <!-- 错题统计卡片 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-indigo-50 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-indigo-800 font-medium">累计错题</p>
                    <p class="text-2xl font-bold text-indigo-900">128</p>
                  </div>
                  <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-exclamation-circle text-indigo-600"></i>
                  </div>
                </div>
              </div>
              
              <div class="bg-amber-50 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-amber-800 font-medium">待复习</p>
                    <p class="text-2xl font-bold text-amber-900">42</p>
                  </div>
                  <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-clock text-amber-600"></i>
                  </div>
                </div>
              </div>
              
              <div class="bg-emerald-50 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-emerald-800 font-medium">已掌握</p>
                    <p class="text-2xl font-bold text-emerald-900">86</p>
                  </div>
                  <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-check-circle text-emerald-600"></i>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 错题分类标签 -->
            <div class="flex flex-wrap gap-2 mb-6">
              <button class="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm !rounded-button whitespace-nowrap cursor-pointer">全部</button>
              <button class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 !rounded-button whitespace-nowrap cursor-pointer">选择题</button>
              <button class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 !rounded-button whitespace-nowrap cursor-pointer">填空题</button>
              <button class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 !rounded-button whitespace-nowrap cursor-pointer">简答题</button>
              <button class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 !rounded-button whitespace-nowrap cursor-pointer">计算题</button>
            </div>
            
            <!-- 错题列表 -->
            <div class="space-y-4">
              <div v-for="(mistake, index) in recentMistakes" :key="index" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
                <div class="flex justify-between items-start mb-2">
                  <div class="flex items-center">
                    <span class="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mr-2">{{ mistake.type }}</span>
                    <span class="text-gray-500 text-xs">{{ mistake.source }}</span>
                  </div>
                  <div class="flex items-center">
                    <span class="text-red-500 text-sm mr-2">错误 {{ mistake.errorCount }} 次</span>
                    <i class="fas fa-bookmark text-gray-400 hover:text-indigo-600 cursor-pointer"></i>
                  </div>
                </div>
                <p class="text-gray-800 mb-2">{{ mistake.question }}</p>
                <div class="flex justify-between">
                  <button class="text-indigo-600 text-sm hover:text-indigo-800 cursor-pointer">查看详情</button>
                  <button class="text-emerald-600 text-sm hover:text-emerald-800 cursor-pointer">标记为已掌握</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 右侧辅助功能区 -->
        <div class="lg:w-1/3">
          <!-- 个人学习数据 -->
          <div class="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-6">学习进度</h3>
            
            <!-- 学习进度图表 -->
            <div class="mb-6" ref="learningProgressChart"></div>
            
            <!-- 知识点掌握情况 -->
            <h4 class="font-medium text-gray-700 mb-3">知识点掌握情况</h4>
            <div class="space-y-3">
              <div v-for="(topic, index) in knowledgeTopics" :key="index">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm text-gray-700">{{ topic.name }}</span>
                  <span class="text-sm font-medium" :class="getProgressColor(topic.progress)">{{ topic.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="h-2 rounded-full" :class="getProgressBarColor(topic.progress)" :style="`width: ${topic.progress}%`"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 导出功能模块 -->
          <div class="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-6">导出错题本</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">选择导出格式</label>
                <div class="flex space-x-3">
                  <button 
                    v-for="format in ['PDF', 'Word']" 
                    :key="format"
                    :class="[
                      'px-4 py-2 rounded-lg border text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer',
                      selectedFormat === format 
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    ]"
                    @click="selectedFormat = format"
                  >
                    <i :class="format === 'PDF' ? 'fas fa-file-pdf mr-2' : 'fas fa-file-word mr-2'"></i>
                    {{ format }}
                  </button>
                </div>
              </div>
              
              <div>
                <label class="block text-gray-700 text-sm font-medium mb-2">自定义导出内容</label>
                <div class="space-y-2">
                  <div class="flex items-center">
                    <input type="checkbox" id="includeAnswers" class="mr-2" checked />
                    <label for="includeAnswers" class="text-sm text-gray-700">包含答案解析</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" id="includeStats" class="mr-2" checked />
                    <label for="includeStats" class="text-sm text-gray-700">包含错误统计</label>
                  </div>
                  <div class="flex items-center">
                    <input type="checkbox" id="includeNotes" class="mr-2" />
                    <label for="includeNotes" class="text-sm text-gray-700">包含个人笔记</label>
                  </div>
                </div>
              </div>
              
              <button class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
                <i class="fas fa-download mr-2"></i>
                导出错题本
              </button>
            </div>
          </div>
          
          <!-- AI 智能助手 -->
          <div class="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-md p-6 text-white">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <i class="fas fa-robot text-white"></i>
              </div>
              <h3 class="text-xl font-bold">AI 智能助手</h3>
            </div>
            
            <p class="mb-4 text-blue-100">借助 AI 技术，获取智能解答路径，快速掌握知识点</p>
            
            <div class="bg-white/10 rounded-lg p-4 mb-4">
              <p class="text-sm text-blue-100 mb-2">根据你的学习情况，建议重点复习：</p>
              <p class="font-medium">物理 - 力学基本定律与应用</p>
            </div>
            
            <button class="w-full bg-white text-indigo-700 py-2 rounded-lg font-medium hover:bg-blue-50 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
              <i class="fas fa-comments mr-2"></i>
              开始 AI 辅导
            </button>
          </div>
        </div>
      </div>
      
      <!-- 功能特点展示 -->
      <div class="my-12">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-10">强大功能，助力学习</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <i class="fas fa-book text-indigo-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">题库生成</h3>
            <p class="text-gray-600">选择一本书籍，系统将自动生成该书籍相关内容的题库，包括选择题、填空题、简答题等多种题型。</p>
          </div>
          
          <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
              <i class="fas fa-exclamation-circle text-amber-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">错误收集</h3>
            <p class="text-gray-600">系统将自动收集你在练习过程中出错的题目，方便你进行针对性复习。</p>
          </div>
          
          <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <i class="fas fa-clipboard-list text-emerald-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">错题整理</h3>
            <p class="text-gray-600">根据你的学习进度，系统会将错题分类整理并生成个性化的错题本。</p>
          </div>
          
          <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <i class="fas fa-lightbulb text-purple-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">复习建议</h3>
            <p class="text-gray-600">根据你的错题记录，系统将提供针对性的复习建议，帮助你巩固薄弱知识点。</p>
          </div>
        </div>
      </div>
      
      <!-- 导出方式展示 -->
      <div class="bg-indigo-50 rounded-xl p-8 mb-12">
        <div class="flex flex-col lg:flex-row items-center">
          <div class="lg:w-1/2 mb-6 lg:mb-0 lg:pr-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">灵活导出，随时学习</h2>
            <p class="text-gray-600 mb-6">系统支持将生成的题库和错题本导出为 Word 或 PDF 格式，方便你打印或在其他设备上查看。每道错题都配有详细解析，系统将分析你的解题思路，提供正确的解题步骤与技巧。</p>
            
            <div class="flex flex-wrap gap-4">
              <div class="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <i class="fas fa-file-pdf text-red-500 mr-2"></i>
                <span class="text-gray-700">PDF 格式</span>
              </div>
              <div class="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <i class="fas fa-file-word text-blue-500 mr-2"></i>
                <span class="text-gray-700">Word 格式</span>
              </div>
              <div class="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <i class="fas fa-print text-gray-600 mr-2"></i>
                <span class="text-gray-700">打印友好</span>
              </div>
              <div class="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                <i class="fas fa-mobile-alt text-gray-600 mr-2"></i>
                <span class="text-gray-700">移动设备支持</span>
              </div>
            </div>
          </div>
          
          <div class="lg:w-1/2">
            <img 
              src="https://readdy.ai/api/search-image?query=Educational%20document%20with%20quiz%20questions%20and%20detailed%20explanations%2C%20showing%20export%20options%20for%20PDF%20and%20Word%20formats%2C%20clean%20professional%20layout%20with%20annotations%20and%20highlights%2C%20blue%20accent%20colors%2C%20high%20quality%203D%20rendering%20on%20white%20background&width=600&height=400&seq=2&orientation=landscape" 
              alt="导出功能展示" 
              class="rounded-lg shadow-md w-full h-auto object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部区域 -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 class="text-lg font-bold mb-4">智能题库助手</h4>
            <p class="text-gray-400">基于 AI 技术，为您打造个性化学习体验，提高学习效率，实现知识快速掌握。</p>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">快速链接</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white cursor-pointer">首页</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white cursor-pointer">题库生成</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white cursor-pointer">错题管理</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white cursor-pointer">使用教程</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">联系我们</h4>
            <ul class="space-y-2">
              <li class="flex items-center">
                <i class="fas fa-envelope mr-2 text-gray-400"></i>
                <span class="text-gray-400">support@tiku.com</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-phone mr-2 text-gray-400"></i>
                <span class="text-gray-400">400-123-4567</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-map-marker-alt mr-2 text-gray-400"></i>
                <span class="text-gray-400">北京市海淀区中关村</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">关注我们</h4>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition duration-300 cursor-pointer">
                <i class="fab fa-weixin"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition duration-300 cursor-pointer">
                <i class="fab fa-weibo"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-indigo-600 transition duration-300 cursor-pointer">
                <i class="fab fa-qq"></i>
              </a>
            </div>
            <div class="mt-4">
              <p class="text-gray-400 text-sm">支持多种支付方式</p>
              <div class="flex space-x-3 mt-2">
                <i class="fab fa-alipay text-xl text-gray-400"></i>
                <i class="fab fa-weixin text-xl text-gray-400"></i>
                <i class="fab fa-cc-visa text-xl text-gray-400"></i>
                <i class="fab fa-cc-mastercard text-xl text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">© 2025 智能题库助手. 保留所有权利</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-white text-sm cursor-pointer">隐私政策</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm cursor-pointer">服务条款</a>
            <a href="#" class="text-gray-400 hover:text-white text-sm cursor-pointer">帮助中心</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import Header from '@/components/Header.vue';

// 选择的导出格式
const selectedFormat = ref('PDF');

// 推荐书籍数据
const recommendedBooks = ref([
  {
    title: '高中物理全解',
    author: '王教授',
    category: '物理',
    questionCount: '1200',
    image: 'https://readdy.ai/api/search-image?query=Physics%20textbook%20cover%20with%20modern%20design%2C%20showing%20Newton%20laws%20and%20mechanics%20concepts%2C%20blue%20gradient%20background%20with%20scientific%20illustrations%2C%20professional%20educational%20material%2C%20high%20quality%203D%20rendering&width=300&height=400&seq=3&orientation=portrait'
  },
  {
    title: '高等数学基础',
    author: '李教授',
    category: '数学',
    questionCount: '1500',
    image: 'https://readdy.ai/api/search-image?query=Advanced%20mathematics%20textbook%20cover%20with%20calculus%20symbols%20and%20geometric%20shapes%2C%20elegant%20blue%20gradient%20background%2C%20professional%20educational%20material%2C%20clean%20modern%20design%2C%20high%20quality%203D%20rendering&width=300&height=400&seq=4&orientation=portrait'
  },
  {
    title: '英语语法大全',
    author: '张教授',
    category: '英语',
    questionCount: '980',
    image: 'https://readdy.ai/api/search-image?query=English%20grammar%20textbook%20cover%20with%20language%20elements%20and%20communication%20symbols%2C%20blue%20gradient%20background%2C%20professional%20educational%20material%2C%20modern%20clean%20design%2C%20high%20quality%203D%20rendering&width=300&height=400&seq=5&orientation=portrait'
  },
  {
    title: '化学反应原理',
    author: '刘教授',
    category: '化学',
    questionCount: '850',
    image: 'https://readdy.ai/api/search-image?query=Chemistry%20textbook%20cover%20showing%20molecular%20structures%20and%20chemical%20reactions%2C%20blue%20gradient%20background%20with%20scientific%20illustrations%2C%20professional%20educational%20material%2C%20modern%20clean%20design%2C%20high%20quality%203D%20rendering&width=300&height=400&seq=6&orientation=portrait'
  }
]);

// 最近错题数据
const recentMistakes = ref([
  {
    type: '选择题',
    source: '高中物理全解',
    errorCount: 3,
    question: '一个物体做匀速圆周运动，下列说法正确的是？'
  },
  {
    type: '填空题',
    source: '高等数学基础',
    errorCount: 2,
    question: '函数 f(x) = sin(x) 在区间 [0, π] 上的最大值是 ______。'
  },
  {
    type: '简答题',
    source: '英语语法大全',
    errorCount: 1,
    question: '请解释现在完成时态的使用场景和基本结构。'
  }
]);

// 知识点掌握情况
const knowledgeTopics = ref([
  { name: '物理力学', progress: 85 },
  { name: '物理电学', progress: 65 },
  { name: '物理光学', progress: 45 },
  { name: '数学函数', progress: 90 }
]);

// 获取进度条颜色
const getProgressBarColor = (progress: number): string => {
  if (progress >= 80) return 'bg-emerald-500';
  if (progress >= 60) return 'bg-blue-500';
  if (progress >= 40) return 'bg-amber-500';
  return 'bg-red-500';
};

// 获取进度文字颜色
const getProgressColor = (progress: number): string => {
  if (progress >= 80) return 'text-emerald-600';
  if (progress >= 60) return 'text-blue-600';
  if (progress >= 40) return 'text-amber-600';
  return 'text-red-600';
};

// 图表引用
const learningProgressChart = ref<HTMLElement | null>(null);

onMounted(() => {
  // 初始化学习进度图表
  if (learningProgressChart.value) {
    const chart = echarts.init(learningProgressChart.value);
    
    const option = {
      animation: false,
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '0',
        left: 'center',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          fontSize: 12
        }
      },
      series: [
        {
          name: '题目类型',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 4,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: false
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 42, name: '选择题', itemStyle: { color: '#4F46E5' } },
            { value: 28, name: '填空题', itemStyle: { color: '#0EA5E9' } },
            { value: 18, name: '简答题', itemStyle: { color: '#10B981' } },
            { value: 12, name: '计算题', itemStyle: { color: '#F59E0B' } }
          ]
        }
      ]
    };
    
    chart.setOption(option);
    
    // 响应窗口大小变化
    window.addEventListener('resize', () => {
      chart.resize();
    });
  }
});
</script>

<style scoped>
/* 自定义样式 */
.learning-progress__chart {
  height: 240px;
  width: 100%;
}

/* 移除number输入框的箭头 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>

