<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 使用Header组件 -->
    <Header />
    
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm mt-1">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-800">图书分类</h1>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <i class="fas fa-search text-gray-400"></i>
            </span>
            <input
              type="text"
              placeholder="搜索书名、作者、ISBN..."
              class="pl-10 pr-10 py-2 border-none rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none w-[400px] text-sm"
              v-model="searchQuery"
            />
            <button
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              <i class="fas fa-times text-gray-400"></i>
            </button>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'p-2 rounded-lg !rounded-button cursor-pointer whitespace-nowrap',
                viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              ]"
            >
              <i class="fas fa-th-large"></i>
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'p-2 rounded-lg !rounded-button cursor-pointer whitespace-nowrap',
                viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              ]"
            >
              <i class="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 筛选区域 -->
    <div class="container mx-auto px-4 py-4 bg-white mt-4 rounded-lg shadow-sm">
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex flex-wrap items-center gap-4">
          <div class="relative">
            <select
              class="appearance-none bg-gray-100 border-none rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer text-sm whitespace-nowrap"
              v-model="filters.author"
            >
              <option value="">作者 (全部)</option>
              <option v-for="author in authors" :key="author" :value="author">{{ author }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <i class="fas fa-chevron-down text-xs"></i>
            </div>
          </div>

          <div class="relative">
            <select
              class="appearance-none bg-gray-100 border-none rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer text-sm whitespace-nowrap"
              v-model="filters.year"
            >
              <option value="">出版年份 (全部)</option>
              <option v-for="year in publishYears" :key="year" :value="year">{{ year }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <i class="fas fa-chevron-down text-xs"></i>
            </div>
          </div>

          <div class="relative">
            <select
              class="appearance-none bg-gray-100 border-none rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer text-sm whitespace-nowrap"
              v-model="filters.language"
            >
              <option value="">语言 (全部)</option>
              <option value="中文">中文</option>
              <option value="英文">英文</option>
              <option value="日文">日文</option>
              <option value="法文">法文</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <i class="fas fa-chevron-down text-xs"></i>
            </div>
          </div>

          <div class="relative">
            <select
              class="appearance-none bg-gray-100 border-none rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer text-sm whitespace-nowrap"
              v-model="filters.status"
            >
              <option value="">借阅状态 (全部)</option>
              <option value="可借阅">可借阅</option>
              <option value="已借出">已借出</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <i class="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
        </div>

        <div class="relative mt-4 md:mt-0">
          <select
            class="appearance-none bg-gray-100 border-none rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer text-sm whitespace-nowrap"
            v-model="sortOption"
          >
            <option value="title-asc">书名 (A-Z)</option>
            <option value="title-desc">书名 (Z-A)</option>
            <option value="date-asc">出版日期 (最早-最新)</option>
            <option value="date-desc">出版日期 (最新-最早)</option>
            <option value="author-asc">作者 (A-Z)</option>
            <option value="author-desc">作者 (Z-A)</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <i class="fas fa-chevron-down text-xs"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="container mx-auto px-4 py-6 flex">
      <!-- 左侧分类导航 -->
      <aside class="w-64 bg-white rounded-lg shadow-sm p-4 mr-6 hidden md:block h-fit">
        <h2 class="text-lg font-semibold mb-4">图书分类</h2>
        <ul>
          <li v-for="(category, index) in categories" :key="index" class="mb-2">
            <div
              class="flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-100"
              :class="{ 'bg-blue-50 text-blue-600': selectedCategory === category.name }"
              @click="toggleCategory(index)"
            >
              <span>{{ category.name }}</span>
              <i
                class="fas"
                :class="category.expanded ? 'fa-chevron-down' : 'fa-chevron-right'"
              ></i>
            </div>
            <ul v-if="category.expanded" class="ml-4 mt-2 space-y-1">
              <li v-for="(subCategory, subIndex) in category.subCategories" :key="subIndex">
                <div
                  class="flex items-center py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-100"
                  :class="{ 'bg-blue-50 text-blue-600': selectedSubCategory === subCategory }"
                  @click="selectSubCategory(subCategory)"
                >
                  <span>{{ subCategory }}</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </aside>

      <!-- 右侧内容区 -->
      <div class="flex-1">
        <!-- 移动端分类按钮 -->
        <div class="md:hidden mb-4">
          <button
            @click="showMobileCategories = !showMobileCategories"
            class="bg-white p-3 rounded-lg shadow-sm w-full flex items-center justify-between !rounded-button cursor-pointer whitespace-nowrap"
          >
            <span>{{ selectedCategory }} {{ selectedSubCategory ? `- ${selectedSubCategory}` : '' }}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          
          <div v-if="showMobileCategories" class="bg-white mt-2 rounded-lg shadow-sm p-4 absolute z-10 w-[calc(100%-2rem)]">
            <ul>
              <li v-for="(category, index) in categories" :key="index" class="mb-2">
                <div
                  class="flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-100"
                  :class="{ 'bg-blue-50 text-blue-600': selectedCategory === category.name }"
                  @click="toggleCategory(index)"
                >
                  <span>{{ category.name }}</span>
                  <i
                    class="fas"
                    :class="category.expanded ? 'fa-chevron-down' : 'fa-chevron-right'"
                  ></i>
                </div>
                <ul v-if="category.expanded" class="ml-4 mt-2 space-y-1">
                  <li v-for="(subCategory, subIndex) in category.subCategories" :key="subIndex">
                    <div
                      class="flex items-center py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-100"
                      :class="{ 'bg-blue-50 text-blue-600': selectedSubCategory === subCategory }"
                      @click="selectSubCategory(subCategory); showMobileCategories = false"
                    >
                      <span>{{ subCategory }}</span>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <!-- 图书展示区域 -->
        <div v-if="filteredBooks.length > 0">
          <!-- 网格视图 -->
          <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
              v-for="book in paginatedBooks"
              :key="book.id"
              class="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
              @click="openBookDetail(book)"
            >
              <div class="h-60 overflow-hidden">
                <img :src="book.coverUrl" alt="Book cover" class="w-full h-full object-cover object-top" />
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-lg mb-1 truncate">{{ book.title }}</h3>
                <p class="text-gray-600 text-sm mb-1">{{ book.author }}</p>
                <p class="text-gray-500 text-xs mb-2">ISBN: {{ book.isbn }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-gray-500 text-xs">{{ formatDate(book.publishDate) }}</span>
                  <span
                    :class="[
                      'text-xs px-2 py-1 rounded-full',
                      book.status === '可借阅' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ book.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 列表视图 -->
          <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    封面
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    书名
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    作者
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ISBN
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    出版日期
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="book in paginatedBooks" :key="book.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="h-16 w-12 overflow-hidden rounded">
                      <img :src="book.coverUrl" alt="Book cover" class="h-full w-full object-cover object-top" />
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600" @click="openBookDetail(book)">
                      {{ book.title }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">{{ book.author }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">{{ book.isbn }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">{{ formatDate(book.publishDate) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'px-2 py-1 text-xs rounded-full',
                        book.status === '可借阅' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ book.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      class="text-blue-600 hover:text-blue-900 mr-3 !rounded-button cursor-pointer whitespace-nowrap"
                      @click.stop="openBookDetail(book)"
                    >
                      详情
                    </button>
                    <button
                      v-if="book.status === '可借阅'"
                      class="text-green-600 hover:text-green-900 !rounded-button cursor-pointer whitespace-nowrap"
                      @click.stop="borrowBook(book)"
                    >
                      借阅
                    </button>
                    <button
                      v-else
                      class="text-red-600 hover:text-red-900 !rounded-button cursor-pointer whitespace-nowrap"
                      @click.stop="returnBook(book)"
                    >
                      归还
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 分页控制 -->
          <div class="mt-6 flex items-center justify-between">
            <div class="flex items-center">
              <span class="text-sm text-gray-700">
                每页显示
                <select
                  v-model="itemsPerPage"
                  class="mx-1 bg-white border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                条，共 {{ filteredBooks.length }} 条
              </span>
            </div>
            
            <div class="flex items-center space-x-2">
              <button
                @click="currentPage = 1"
                :disabled="currentPage === 1"
                :class="[
                  'px-3 py-1 rounded-md !rounded-button cursor-pointer whitespace-nowrap',
                  currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                ]"
              >
                首页
              </button>
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                :class="[
                  'px-3 py-1 rounded-md !rounded-button cursor-pointer whitespace-nowrap',
                  currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                ]"
              >
                上一页
              </button>
              
              <div v-for="page in displayedPages" :key="page" class="flex items-center">
                <button
                  @click="currentPage = page"
                  :class="[
                    'px-3 py-1 rounded-md !rounded-button cursor-pointer whitespace-nowrap',
                    currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                :class="[
                  'px-3 py-1 rounded-md !rounded-button cursor-pointer whitespace-nowrap',
                  currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                ]"
              >
                下一页
              </button>
              <button
                @click="currentPage = totalPages"
                :disabled="currentPage === totalPages"
                :class="[
                  'px-3 py-1 rounded-md !rounded-button cursor-pointer whitespace-nowrap',
                  currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                ]"
              >
                末页
              </button>
              
              <div class="flex items-center ml-4">
                <span class="text-sm text-gray-700 mr-2">跳至</span>
                <input
                  type="number"
                  v-model="jumpToPage"
                  min="1"
                  :max="totalPages"
                  class="w-12 h-8 border-none rounded-md bg-gray-100 text-center text-sm"
                  @keyup.enter="handleJumpToPage"
                />
                <span class="text-sm text-gray-700 ml-2">页</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 无结果提示 -->
        <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
          <i class="fas fa-search text-gray-300 text-5xl mb-4"></i>
          <h3 class="text-xl font-medium text-gray-700 mb-2">未找到匹配的图书</h3>
          <p class="text-gray-500">请尝试调整筛选条件或搜索关键词</p>
        </div>
      </div>
    </div>

    <!-- 图书详情弹窗 -->
    <div v-if="selectedBook" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-semibold">图书详情</h2>
          <button @click="selectedBook = null" class="text-gray-500 hover:text-gray-700 cursor-pointer">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="flex flex-col md:flex-row overflow-auto p-6">
          <div class="md:w-1/3 flex-shrink-0 mb-6 md:mb-0 md:mr-6">
            <img :src="selectedBook.coverUrl" alt="Book cover" class="w-full h-auto rounded-lg shadow-sm" />
          </div>
          
          <div class="md:w-2/3">
            <h3 class="text-2xl font-bold mb-2">{{ selectedBook.title }}</h3>
            <p class="text-gray-700 mb-4">作者：{{ selectedBook.author }}</p>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p class="text-gray-600 text-sm">ISBN</p>
                <p class="font-medium">{{ selectedBook.isbn }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">出版日期</p>
                <p class="font-medium">{{ formatDate(selectedBook.publishDate) }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">出版社</p>
                <p class="font-medium">{{ selectedBook.publisher }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">语言</p>
                <p class="font-medium">{{ selectedBook.language }}</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">页数</p>
                <p class="font-medium">{{ selectedBook.pages }} 页</p>
              </div>
              <div>
                <p class="text-gray-600 text-sm">借阅状态</p>
                <p
                  :class="[
                    'font-medium',
                    selectedBook.status === '可借阅' ? 'text-green-600' : 'text-red-600'
                  ]"
                >
                  {{ selectedBook.status }}
                </p>
              </div>
            </div>
            
            <div class="mb-6">
              <h4 class="font-semibold mb-2">图书简介</h4>
              <div class="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto text-sm text-gray-700">
                {{ selectedBook.description }}
              </div>
            </div>
            
            <div class="flex space-x-4">
              <button
                v-if="selectedBook.status === '可借阅'"
                @click="borrowBook(selectedBook)"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center !rounded-button cursor-pointer whitespace-nowrap"
              >
                <i class="fas fa-book-reader mr-2"></i> 借阅
              </button>
              <button
                v-else
                @click="returnBook(selectedBook)"
                class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center !rounded-button cursor-pointer whitespace-nowrap"
              >
                <i class="fas fa-undo mr-2"></i> 归还
              </button>
              
              <button
                @click="toggleFavorite(selectedBook)"
                :class="[
                  'px-4 py-2 rounded-lg flex items-center !rounded-button cursor-pointer whitespace-nowrap',
                  selectedBook.isFavorite
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                <i
                  class="fas"
                  :class="selectedBook.isFavorite ? 'fa-heart' : 'fa-heart'"
                  :style="{ color: selectedBook.isFavorite ? '#dc2626' : '#9ca3af' }"
                ></i>
                <span class="ml-2">{{ selectedBook.isFavorite ? '已收藏' : '收藏' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作反馈提示 -->
    <div
      v-if="notification.show"
      class="fixed top-4 right-4 max-w-xs bg-white rounded-lg shadow-lg overflow-hidden z-50 transition-all duration-300"
      :class="{ 'opacity-0 translate-y-[-20px]': !notification.show }"
    >
      <div class="p-4 flex items-start">
        <div
          class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3"
          :class="{
            'bg-green-100': notification.type === 'success',
            'bg-red-100': notification.type === 'error'
          }"
        >
          <i
            class="fas"
            :class="{
              'fa-check text-green-500': notification.type === 'success',
              'fa-times text-red-500': notification.type === 'error'
            }"
          ></i>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-900">{{ notification.title }}</h3>
          <p class="mt-1 text-sm text-gray-500">{{ notification.message }}</p>
        </div>
        <button
          @click="notification.show = false"
          class="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-500 cursor-pointer"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div
        class="h-1 bg-blue-500 transition-all duration-300"
        :style="{ width: `${notification.progress}%` }"
        :class="{
          'bg-green-500': notification.type === 'success',
          'bg-red-500': notification.type === 'error'
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import Header from '@/components/Header.vue';

// 状态管理
const searchQuery = ref('');
const viewMode = ref('grid');
const selectedCategory = ref('全部分类');
const selectedSubCategory = ref('');
const showMobileCategories = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const jumpToPage = ref(1);
const selectedBook = ref<Book | null>(null);
const notification = ref({
  show: false,
  type: 'success',
  title: '',
  message: '',
  progress: 100,
  timer: 0
});

// 筛选条件
const filters = ref({
  author: '',
  year: '',
  language: '',
  status: ''
});

// 排序选项
const sortOption = ref('title-asc');

// 分类数据
const categories = ref([
  {
    name: '文学小说',
    expanded: true,
    subCategories: ['现代文学', '古典文学', '外国文学', '科幻小说', '推理悬疑']
  },
  {
    name: '社会科学',
    expanded: false,
    subCategories: ['历史', '哲学', '心理学', '社会学', '政治学']
  },
  {
    name: '自然科学',
    expanded: false,
    subCategories: ['数学', '物理', '化学', '生物', '天文学']
  },
  {
    name: '艺术设计',
    expanded: false,
    subCategories: ['绘画', '摄影', '音乐', '建筑', '设计']
  },
  {
    name: '经济管理',
    expanded: false,
    subCategories: ['经济学', '管理学', '金融', '市场营销', '创业']
  }
]);

// 图书数据类型定义
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishDate: string;
  publisher: string;
  language: string;
  pages: number;
  status: string;
  description: string;
  coverUrl: string;
  isFavorite: boolean;
  category: string;
  subCategory: string;
}

// 模拟图书数据
const books = ref<Book[]>([
  {
    id: 1,
    title: '活着',
    author: '余华',
    isbn: '9787506365437',
    publishDate: '2012-08-01',
    publisher: '作家出版社',
    language: '中文',
    pages: 226,
    status: '可借阅',
    description: '《活着》是中国作家余华的代表作之一，讲述了农村人福贵悲惨的人生遭遇。福贵本是个阔少爷，因为嗜赌成性，卖掉了家里的田地，一贫如洗，穷困潦倒之际，又被国民党抓去当壮丁，后被解放军俘虏，回到家乡。此后更加悲惨的命运一次又一次降临到福贵身上，他的妻子、儿女和女婿相继死去，最后只剩下年老的福贵和一头老牛相依为命。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20a%20Chinese%20novel%20titled%20Alive%20by%20Yu%20Hua%2C%20featuring%20a%20minimalist%20design%20with%20earthy%20tones%2C%20subtle%20rural%20imagery%2C%20and%20elegant%20typography.%20The%20cover%20conveys%20a%20sense%20of%20melancholy%20and%20resilience%2C%20with%20a%20simple%20landscape%20background%20and%20clean%20modern%20aesthetic.&width=400&height=600&seq=1&orientation=portrait',
    isFavorite: false,
    category: '文学小说',
    subCategory: '现代文学'
  },
  {
    id: 2,
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    isbn: '9787544253994',
    publishDate: '2011-06-01',
    publisher: '南海出版公司',
    language: '中文',
    pages: 360,
    status: '已借出',
    description: '《百年孤独》是哥伦比亚作家加西亚·马尔克斯的代表作，也是拉丁美洲魔幻现实主义文学的代表作，被誉为"再现拉丁美洲历史社会图景的鸿篇巨著"。作品描写了布恩迪亚家族七代人的传奇故事，以及加勒比海沿岸小镇马孔多的百年兴衰，反映了拉丁美洲一个世纪以来风云变幻的历史。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20One%20Hundred%20Years%20of%20Solitude%20by%20Gabriel%20Garcia%20Marquez%2C%20featuring%20magical%20realism%20elements%20with%20butterflies%2C%20a%20family%20tree%2C%20and%20surreal%20imagery.%20The%20design%20uses%20rich%20colors%20against%20a%20neutral%20background%2C%20with%20elegant%20typography.%20The%20cover%20conveys%20a%20sense%20of%20mystery%20and%20timelessness.&width=400&height=600&seq=2&orientation=portrait',
    isFavorite: true,
    category: '文学小说',
    subCategory: '外国文学'
  },
  {
    id: 3,
    title: '三体',
    author: '刘慈欣',
    isbn: '9787536692930',
    publishDate: '2008-01-01',
    publisher: '重庆出版社',
    language: '中文',
    pages: 302,
    status: '可借阅',
    description: '《三体》是刘慈欣创作的长篇科幻小说，是"地球往事三部曲"系列的第一部，小说讲述了地球人类文明和三体文明的信息交流、生死搏杀及两个文明在宇宙中的兴衰历程。在三体行星上，由于三颗恒星的无规则运动，导致该行星的气候环境极其恶劣，三体人经历了数次文明的毁灭与重生。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20The%20Three-Body%20Problem%20by%20Liu%20Cixin%2C%20featuring%20a%20cosmic%20design%20with%20three%20suns%2C%20planetary%20elements%2C%20and%20a%20minimalist%20sci-fi%20aesthetic.%20The%20cover%20uses%20deep%20space%20colors%20with%20striking%20contrast%2C%20clean%20typography%2C%20and%20subtle%20mathematical%20equations%20in%20the%20background.&width=400&height=600&seq=3&orientation=portrait',
    isFavorite: false,
    category: '文学小说',
    subCategory: '科幻小说'
  },
  {
    id: 4,
    title: '人类简史',
    author: '尤瓦尔·赫拉利',
    isbn: '9787508647357',
    publishDate: '2014-11-01',
    publisher: '中信出版社',
    language: '中文',
    pages: 440,
    status: '可借阅',
    description: '《人类简史：从动物到上帝》是以色列历史学家尤瓦尔·赫拉利的著作，讲述了人类如何从史前古猿演变成为地球的主宰。这本书追溯了人类发展的历程，从认知革命、农业革命到科学革命，重新解读现代社会的形成。作者用宏大的视角，带领读者审视我们所创造的文明和即将面临的未来。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20Sapiens:%20A%20Brief%20History%20of%20Humankind%20by%20Yuval%20Noah%20Harari%2C%20featuring%20a%20minimalist%20design%20with%20human%20evolution%20imagery%2C%20DNA%20strands%2C%20and%20ancient%20cave%20paintings.%20The%20cover%20uses%20earthy%20tones%20with%20clean%20typography%20against%20a%20light%20neutral%20background.&width=400&height=600&seq=4&orientation=portrait',
    isFavorite: true,
    category: '社会科学',
    subCategory: '历史'
  },
  {
    id: 5,
    title: '时间简史',
    author: '史蒂芬·霍金',
    isbn: '9787535732309',
    publishDate: '2010-04-01',
    publisher: '湖南科学技术出版社',
    language: '中文',
    pages: 246,
    status: '已借出',
    description: '《时间简史》是英国物理学家史蒂芬·霍金的科普著作，讲述了宇宙起源、黑洞、时间、空间等宇宙学的基本知识。霍金用通俗易懂的语言，向普通读者解释了复杂的物理学概念，探讨了宇宙的本质、时间的起源和人类在宇宙中的位置等重大问题。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20A%20Brief%20History%20of%20Time%20by%20Stephen%20Hawking%2C%20featuring%20cosmic%20imagery%20with%20stars%2C%20galaxies%2C%20and%20a%20subtle%20clock%20face.%20The%20design%20uses%20deep%20space%20blues%20and%20purples%20with%20elegant%20white%20typography.%20The%20cover%20conveys%20the%20vastness%20of%20space%20and%20the%20concept%20of%20time%20against%20a%20dark%20background.&width=400&height=600&seq=5&orientation=portrait',
    isFavorite: false,
    category: '自然科学',
    subCategory: '物理'
  },
  {
    id: 6,
    title: '围城',
    author: '钱钟书',
    isbn: '9787020090006',
    publishDate: '2012-09-01',
    publisher: '人民文学出版社',
    language: '中文',
    pages: 359,
    status: '可借阅',
    description: '《围城》是钱钟书所著的长篇小说，描写了青年方鸿渐从国外留学回来后的生活经历。小说通过方鸿渐的婚姻生活、教书生涯，展示了当时社会的世态人情，讽刺了伪文化人的虚伪和自私。小说以围城为比喻，揭示了人生的矛盾：城外的人想进去，城里的人想出来。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20Fortress%20Besieged%20by%20Qian%20Zhongshu%2C%20featuring%20traditional%20Chinese%20architectural%20elements%20with%20a%20modern%20minimalist%20design.%20The%20cover%20shows%20a%20stylized%20city%20wall%20or%20fortress%20with%20people%20on%20both%20sides%2C%20using%20subtle%20colors%20and%20elegant%20Chinese%20typography%20against%20a%20light%20neutral%20background.&width=400&height=600&seq=6&orientation=portrait',
    isFavorite: false,
    category: '文学小说',
    subCategory: '现代文学'
  },
  {
    id: 7,
    title: '金融学原理',
    author: '兹维·博迪',
    isbn: '9787300257686',
    publishDate: '2017-06-01',
    publisher: '中国人民大学出版社',
    language: '中文',
    pages: 542,
    status: '可借阅',
    description: '《金融学原理》是金融学领域的经典教材，全面介绍了现代金融学的基本理论和实践应用。本书涵盖了金融市场、投资组合理论、资本资产定价模型、期权定价、公司金融等内容，为读者提供了系统的金融学知识框架。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20Principles%20of%20Finance%20textbook%2C%20featuring%20a%20professional%20and%20academic%20design%20with%20subtle%20financial%20imagery%20like%20graphs%2C%20charts%2C%20and%20currency%20symbols.%20The%20cover%20uses%20a%20clean%20blue%20and%20white%20color%20scheme%20with%20professional%20typography%20against%20a%20light%20neutral%20background.&width=400&height=600&seq=7&orientation=portrait',
    isFavorite: false,
    category: '经济管理',
    subCategory: '金融'
  },
  {
    id: 8,
    title: '设计心理学',
    author: '唐纳德·诺曼',
    isbn: '9787508649313',
    publishDate: '2015-04-01',
    publisher: '中信出版社',
    language: '中文',
    pages: 283,
    status: '已借出',
    description: '《设计心理学》探讨了设计与人类心理之间的关系，分析了为什么有些设计让人感到愉悦和易用，而有些则令人困惑和沮丧。作者唐纳德·诺曼从认知心理学的角度出发，阐述了以人为中心的设计原则，强调设计应该符合人类的心理特性和行为习惯。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20The%20Design%20of%20Everyday%20Things%20by%20Donald%20Norman%2C%20featuring%20minimalist%20design%20elements%20with%20everyday%20objects%20shown%20in%20an%20artistic%20way.%20The%20cover%20uses%20clean%20lines%2C%20subtle%20colors%2C%20and%20modern%20typography%20against%20a%20light%20neutral%20background%20with%20visual%20representations%20of%20user-centered%20design%20concepts.&width=400&height=600&seq=8&orientation=portrait',
    isFavorite: true,
    category: '艺术设计',
    subCategory: '设计'
  },
  {
    id: 9,
    title: '红楼梦',
    author: '曹雪芹',
    isbn: '9787020002207',
    publishDate: '1996-12-01',
    publisher: '人民文学出版社',
    language: '中文',
    pages: 1606,
    status: '可借阅',
    description: '《红楼梦》是中国古典四大名著之一，描写了贾、史、王、薛四大家族的兴衰历程，以贾宝玉、林黛玉、薛宝钗的爱情悲剧为主线，展现了封建社会末期的方方面面。小说以细腻的笔触刻画了众多栩栩如生的人物形象，被誉为中国封建社会的百科全书。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20Dream%20of%20the%20Red%20Chamber%20by%20Cao%20Xueqin%2C%20featuring%20traditional%20Chinese%20painting%20elements%20with%20elegant%20garden%20scenes%2C%20flowers%2C%20and%20classical%20architecture.%20The%20cover%20uses%20rich%20reds%20and%20golds%20with%20traditional%20Chinese%20typography%20against%20a%20subtle%20textured%20background%20reminiscent%20of%20ancient%20Chinese%20manuscripts.&width=400&height=600&seq=9&orientation=portrait',
    isFavorite: false,
    category: '文学小说',
    subCategory: '古典文学'
  },
  {
    id: 10,
    title: '心理学与生活',
    author: '理查德·格里格',
    isbn: '9787115111302',
    publishDate: '2003-10-01',
    publisher: '人民邮电出版社',
    language: '中文',
    pages: 621,
    status: '可借阅',
    description: '《心理学与生活》是一本广受欢迎的心理学入门教材，通过生动的实例和清晰的解释，向读者介绍了心理学的基本概念和研究方法。本书涵盖了感知、学习、记忆、思维、动机、情绪、人格、社会心理学等多个领域，帮助读者理解心理学如何应用于日常生活。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20Psychology%20and%20Life%20textbook%2C%20featuring%20a%20modern%20design%20with%20brain%20imagery%2C%20human%20silhouettes%2C%20and%20abstract%20representations%20of%20psychological%20concepts.%20The%20cover%20uses%20a%20professional%20color%20scheme%20with%20clean%20typography%20against%20a%20light%20neutral%20background%20with%20subtle%20psychological%20symbols.&width=400&height=600&seq=10&orientation=portrait',
    isFavorite: true,
    category: '社会科学',
    subCategory: '心理学'
  },
  {
    id: 11,
    title: '摄影的艺术',
    author: '布鲁斯·巴恩鲍姆',
    isbn: '9787115373557',
    publishDate: '2014-08-01',
    publisher: '人民邮电出版社',
    language: '中文',
    pages: 168,
    status: '已借出',
    description: '《摄影的艺术》是一本摄影入门指南，详细介绍了摄影的基本原理、构图技巧、光线运用等内容。作者通过丰富的实例和清晰的讲解，帮助读者理解如何拍摄出具有艺术感染力的照片。无论是初学者还是有一定基础的摄影爱好者，都能从本书中获得启发。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20The%20Art%20of%20Photography%2C%20featuring%20artistic%20camera%20imagery%2C%20light%20effects%2C%20and%20composition%20examples.%20The%20cover%20uses%20a%20modern%20black%20and%20white%20design%20with%20subtle%20color%20accents%20and%20professional%20typography%20against%20a%20clean%20neutral%20background%20with%20photographic%20elements.&width=400&height=600&seq=11&orientation=portrait',
    isFavorite: false,
    category: '艺术设计',
    subCategory: '摄影'
  },
  {
    id: 12,
    title: '量子物理史话',
    author: '曹天予',
    isbn: '9787508648293',
    publishDate: '2015-01-01',
    publisher: '中信出版社',
    language: '中文',
    pages: 380,
    status: '可借阅',
    description: '《量子物理史话》讲述了量子物理学的发展历程，从普朗克的量子假说到爱因斯坦的光电效应，从玻尔的原子模型到海森堡的不确定性原理，生动展现了量子物理学的重大发现和理论突破。作者通过对历史事件和科学家故事的叙述，使读者能够更好地理解量子物理学的基本概念和深远影响。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20A%20History%20of%20Quantum%20Physics%2C%20featuring%20elegant%20scientific%20imagery%20with%20atomic%20models%2C%20wave%20functions%2C%20and%20quantum%20particles.%20The%20cover%20uses%20deep%20blues%20and%20purples%20with%20subtle%20mathematical%20equations%20and%20clean%20typography%20against%20a%20dark%20background%20with%20scientific%20elements.&width=400&height=600&seq=12&orientation=portrait',
    isFavorite: false,
    category: '自然科学',
    subCategory: '物理'
  },
  {
    id: 13,
    title: '管理学原理',
    author: '斯蒂芬·罗宾斯',
    isbn: '9787111635574',
    publishDate: '2017-09-01',
    publisher: '机械工业出版社',
    language: '中文',
    pages: 468,
    status: '可借阅',
    description: '《管理学原理》是管理学领域的经典教材，全面介绍了现代管理学的基本理论和实践应用。本书涵盖了计划、组织、领导、控制等管理职能，以及决策、沟通、激励等管理过程，为读者提供了系统的管理学知识框架。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20Principles%20of%20Management%20textbook%2C%20featuring%20a%20professional%20business%20design%20with%20organizational%20charts%2C%20leadership%20imagery%2C%20and%20corporate%20elements.%20The%20cover%20uses%20a%20clean%20blue%20and%20gray%20color%20scheme%20with%20professional%20typography%20against%20a%20light%20neutral%20background%20with%20subtle%20business%20graphics.&width=400&height=600&seq=13&orientation=portrait',
    isFavorite: true,
    category: '经济管理',
    subCategory: '管理学'
  },
  {
    id: 14,
    title: '追风筝的人',
    author: '卡勒德·胡赛尼',
    isbn: '9787208061644',
    publishDate: '2006-05-01',
    publisher: '上海人民出版社',
    language: '中文',
    pages: 362,
    status: '已借出',
    description: '《追风筝的人》是阿富汗裔美国作家卡勒德·胡赛尼的成名作，讲述了阿米尔与仆人哈桑之间跨越阶级的友谊，以及阿米尔因背叛哈桑而长期自责，最终踏上救赎之路的故事。小说以阿富汗近代史为背景，展现了人性的复杂与救赎的可能。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20The%20Kite%20Runner%20by%20Khaled%20Hosseini%2C%20featuring%20a%20silhouette%20of%20a%20boy%20flying%20a%20kite%20against%20a%20dramatic%20sky.%20The%20cover%20uses%20muted%20colors%20with%20Afghan-inspired%20patterns%20and%20elegant%20typography%20against%20a%20textured%20background%20suggesting%20the%20landscape%20of%20Afghanistan.&width=400&height=600&seq=14&orientation=portrait',
    isFavorite: false,
    category: '文学小说',
    subCategory: '外国文学'
  },
  {
    id: 15,
    title: '社会学概论',
    author: '安东尼·吉登斯',
    isbn: '9787300151939',
    publishDate: '2009-01-01',
    publisher: '中国人民大学出版社',
    language: '中文',
    pages: 476,
    status: '可借阅',
    description: '《社会学概论》是社会学领域的经典教材，全面介绍了现代社会学的基本理论和研究方法。本书涵盖了文化、社会化、社会互动、社会分层、社会变迁等内容，为读者提供了系统的社会学知识框架。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20Introduction%20to%20Sociology%20textbook%2C%20featuring%20a%20modern%20design%20with%20social%20network%20imagery%2C%20diverse%20human%20silhouettes%2C%20and%20community%20concepts.%20The%20cover%20uses%20a%20professional%20color%20scheme%20with%20clean%20typography%20against%20a%20light%20neutral%20background%20with%20subtle%20sociological%20symbols.&width=400&height=600&seq=15&orientation=portrait',
    isFavorite: false,
    category: '社会科学',
    subCategory: '社会学'
  },
  {
    id: 16,
    title: '白夜行',
    author: '东野圭吾',
    isbn: '9787544258609',
    publishDate: '2013-01-01',
    publisher: '南海出版公司',
    language: '中文',
    pages: 538,
    status: '可借阅',
    description: '《白夜行》是日本作家东野圭吾的长篇小说，讲述了一桩离奇命案背后，两个少年因命运交错而走上截然不同人生道路的故事。女主角雪穗为了掩盖罪行，利用自己的美貌和心机，操控着身边的每一个人；男主角亮司则隐忍不发，在黑暗中默默守护着她。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20Journey%20Under%20the%20Midnight%20Sun%20by%20Keigo%20Higashino%2C%20featuring%20a%20mysterious%20night%20scene%20with%20moonlight%2C%20shadows%2C%20and%20subtle%20thriller%20elements.%20The%20cover%20uses%20dark%20blues%20and%20blacks%20with%20contrasting%20light%20elements%20and%20elegant%20typography%20suggesting%20the%20psychological%20suspense%20nature%20of%20the%20story.&width=400&height=600&seq=16&orientation=portrait',
    isFavorite: true,
    category: '文学小说',
    subCategory: '推理悬疑'
  },
  {
    id: 17,
    title: '建筑空间组合论',
    author: '彭一刚',
    isbn: '9787112024162',
    publishDate: '2008-07-01',
    publisher: '中国建筑工业出版社',
    language: '中文',
    pages: 248,
    status: '可借阅',
    description: '《建筑空间组合论》是建筑设计领域的经典著作，系统阐述了建筑空间的基本概念、类型和组合方法。作者从建筑实践出发，结合丰富的案例，深入分析了建筑空间的形态生成、序列组织和环境整合等问题，为建筑设计提供了理论指导。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20Architectural%20Space%20Composition%2C%20featuring%20minimalist%20architectural%20drawings%2C%20spatial%20diagrams%2C%20and%20geometric%20patterns.%20The%20cover%20uses%20clean%20lines%20and%20a%20professional%20color%20palette%20with%20technical%20illustrations%20and%20elegant%20typography%20against%20a%20light%20neutral%20background%20with%20subtle%20architectural%20elements.&width=400&height=600&seq=17&orientation=portrait',
    isFavorite: false,
    category: '艺术设计',
    subCategory: '建筑'
  },
  {
    id: 18,
    title: '微积分教程',
    author: '菲赫金哥尔茨',
    isbn: '9787040072235',
    publishDate: '2006-08-01',
    publisher: '高等教育出版社',
    language: '中文',
    pages: 562,
    status: '已借出',
    description: '《微积分教程》是数学领域的经典教材，系统介绍了微积分的基本概念、理论和应用。本书涵盖了极限、连续、导数、积分、级数等内容，理论严谨，例题丰富，是学习高等数学的重要参考书。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20Calculus%20textbook%2C%20featuring%20elegant%20mathematical%20equations%2C%20graphs%2C%20and%20geometric%20shapes.%20The%20cover%20uses%20a%20clean%20academic%20design%20with%20subtle%20mathematical%20symbols%20and%20professional%20typography%20against%20a%20light%20neutral%20background%20with%20calculus-related%20visual%20elements.&width=400&height=600&seq=18&orientation=portrait',
    isFavorite: false,
    category: '自然科学',
    subCategory: '数学'
  },
  {
    id: 19,
    title: '政治学原理',
    author: '安德鲁·海伍德',
    isbn: '9787300263489',
    publishDate: '2019-01-01',
    publisher: '中国人民大学出版社',
    language: '中文',
    pages: 416,
    status: '可借阅',
    description: '《政治学原理》是政治学领域的经典教材，全面介绍了现代政治学的基本理论和研究方法。本书涵盖了国家、政府、民主、意识形态、政党等内容，为读者提供了系统的政治学知识框架。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20Principles%20of%20Political%20Science%20textbook%2C%20featuring%20governmental%20imagery%2C%20democratic%20symbols%2C%20and%20political%20concepts.%20The%20cover%20uses%20a%20professional%20red%2C%20white%2C%20and%20blue%20color%20scheme%20with%20clean%20typography%20against%20a%20light%20neutral%20background%20with%20subtle%20political%20symbols%20like%20flags%2C%20buildings%2C%20and%20constitutional%20elements.&width=400&height=600&seq=19&orientation=portrait',
    isFavorite: true,
    category: '社会科学',
    subCategory: '政治学'
  },
  {
    id: 20,
    title: '创业维艰',
    author: '本·霍洛维茨',
    isbn: '9787508649719',
    publishDate: '2015-06-01',
    publisher: '中信出版社',
    language: '中文',
    pages: 284,
    status: '可借阅',
    description: '《创业维艰》是硅谷创业教父本·霍洛维茨的创业经验总结，讲述了作者在创办、经营和出售公司过程中的艰辛历程和宝贵经验。本书坦诚地分享了创业者面临的各种困难和挑战，以及如何在危机中生存和成长的实用建议。',
    coverUrl: 'https://readdy.ai/api/search-image?query=A%20book%20cover%20for%20The%20Hard%20Thing%20About%20Hard%20Things%20by%20Ben%20Horowitz%2C%20featuring%20a%20modern%20business%20design%20with%20startup%20imagery%2C%20entrepreneurial%20elements%2C%20and%20tech-inspired%20graphics.%20The%20cover%20uses%20a%20professional%20dark%20blue%20color%20scheme%20with%20clean%20typography%20against%20a%20subtle%20textured%20background%20suggesting%20the%20challenges%20of%20entrepreneurship.&width=400&height=600&seq=20&orientation=portrait',
    isFavorite: false,
    category: '经济管理',
    subCategory: '创业'
  }
]);

// 计算属性
const authors = computed(() => {
  const uniqueAuthors = new Set(books.value.map(book => book.author));
  return Array.from(uniqueAuthors).sort();
});

const publishYears = computed(() => {
  const uniqueYears = new Set(books.value.map(book => new Date(book.publishDate).getFullYear()));
  return Array.from(uniqueYears).sort((a, b) => b - a);
});

const filteredBooks = computed(() => {
  let result = [...books.value];

  // 分类筛选
  if (selectedCategory.value !== '全部分类') {
    result = result.filter(book => book.category === selectedCategory.value);
    
    if (selectedSubCategory.value) {
      result = result.filter(book => book.subCategory === selectedSubCategory.value);
    }
  }

  // 搜索筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(
      book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.includes(query)
    );
  }

  // 条件筛选
  if (filters.value.author) {
    result = result.filter(book => book.author === filters.value.author);
  }

  if (filters.value.year) {
    const year = parseInt(filters.value.year);
    result = result.filter(book => new Date(book.publishDate).getFullYear() === year);
  }

  if (filters.value.language) {
    result = result.filter(book => book.language === filters.value.language);
  }

  if (filters.value.status) {
    result = result.filter(book => book.status === filters.value.status);
  }

  // 排序
  const [field, direction] = sortOption.value.split('-');
  
  result.sort((a, b) => {
    let valueA, valueB;
    
    if (field === 'title') {
      valueA = a.title;
      valueB = b.title;
    } else if (field === 'author') {
      valueA = a.author;
      valueB = b.author;
    } else if (field === 'date') {
      valueA = new Date(a.publishDate).getTime();
      valueB = new Date(b.publishDate).getTime();
    }
    
    if (direction === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  return result;
});

const totalPages = computed(() => {
  return Math.ceil(filteredBooks.value.length / itemsPerPage.value);
});

const paginatedBooks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredBooks.value.slice(startIndex, endIndex);
});

const displayedPages = computed(() => {
  const pages = [];
  const maxDisplayedPages = 5;
  let startPage = Math.max(1, currentPage.value - Math.floor(maxDisplayedPages / 2));
  let endPage = Math.min(totalPages.value, startPage + maxDisplayedPages - 1);
  
  if (endPage - startPage + 1 < maxDisplayedPages) {
    startPage = Math.max(1, endPage - maxDisplayedPages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
});

// 方法
const toggleCategory = (index: number) => {
  categories.value[index].expanded = !categories.value[index].expanded;
};

const selectSubCategory = (subCategory: string) => {
  selectedSubCategory.value = subCategory;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const handleJumpToPage = () => {
  const page = parseInt(jumpToPage.value.toString());
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  } else {
    jumpToPage.value = currentPage.value;
  }
};

const openBookDetail = (book: Book) => {
  selectedBook.value = book;
};

const borrowBook = (book: Book) => {
  if (book.status === '可借阅') {
    book.status = '已借出';
    showNotification('借阅成功', `您已成功借阅《${book.title}》`, 'success');
  }
};

const returnBook = (book: Book) => {
  if (book.status === '已借出') {
    book.status = '可借阅';
    showNotification('归还成功', `您已成功归还《${book.title}》`, 'success');
  }
};

const toggleFavorite = (book: Book) => {
  book.isFavorite = !book.isFavorite;
  showNotification(
    book.isFavorite ? '收藏成功' : '取消收藏',
    book.isFavorite ? `《${book.title}》已加入收藏` : `《${book.title}》已移出收藏`,
    'success'
  );
};

const showNotification = (title: string, message: string, type: 'success' | 'error') => {
  // 清除之前的定时器
  if (notification.value.timer) {
    clearInterval(notification.value.timer);
  }
  
  // 设置新通知
  notification.value = {
    show: true,
    type,
    title,
    message,
    progress: 100,
    timer: 0
  };
  
  // 创建进度条倒计时
  const duration = 3000; // 3秒
  const interval = 30;
  const step = (100 * interval) / duration;
  
  notification.value.timer = window.setInterval(() => {
    notification.value.progress -= step;
    
    if (notification.value.progress <= 0) {
      clearInterval(notification.value.timer);
      notification.value.show = false;
    }
  }, interval);
};

// 监听器
watch(itemsPerPage, () => {
  currentPage.value = 1;
});

watch(searchQuery, () => {
  currentPage.value = 1;
});

watch(filters, () => {
  currentPage.value = 1;
}, { deep: true });

watch(sortOption, () => {
  currentPage.value = 1;
});

// 生命周期钩子
onMounted(() => {
  // 初始化时选中第一个分类
  if (categories.value.length > 0) {
    selectedCategory.value = categories.value[0].name;
  }
});
</script>

<style scoped>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* 去除number输入框的箭头 */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

input[type=number] {
  -moz-appearance: textfield;
}

/* 卡片悬停效果 */
.book-card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
</style>

