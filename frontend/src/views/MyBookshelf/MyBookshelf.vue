<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 使用Header组件 -->
    <Header />
    
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm sticky top-0 z-10 mt-1">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center">
          <button class="mr-4 text-gray-700 hover:text-blue-600 transition-colors !rounded-button whitespace-nowrap cursor-pointer">
            <i class="fas fa-arrow-left text-lg"></i>
            <span class="ml-2 hidden sm:inline">返回</span>
          </button>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-800">我的书架</h1>
        </div>
        
        <div class="relative w-full max-w-md ml-4">
          <input 
            type="text" 
            placeholder="搜索书名、作者或 ISBN" 
            class="w-full py-2 px-4 pr-10 border-none bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors !rounded-button whitespace-nowrap cursor-pointer">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- 筛选栏 -->
    <div class="container mx-auto px-4 py-6 bg-white shadow-sm mt-4 rounded-lg">
      <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div class="flex-1 min-w-[150px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">分类</label>
          <div class="relative">
            <button 
              @click="toggleDropdown('category')"
              class="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-left text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 !rounded-button whitespace-nowrap cursor-pointer"
            >
              {{ selectedCategory }}
              <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2"></i>
            </button>
            <div v-if="openDropdown === 'category'" class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 text-sm">
              <div 
                v-for="category in categories" 
                :key="category"
                @click="selectCategory(category)"
                class="px-3 py-2 hover:bg-blue-50 cursor-pointer"
              >
                {{ category }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 min-w-[150px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">阅读状态</label>
          <div class="relative">
            <button 
              @click="toggleDropdown('status')"
              class="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-left text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 !rounded-button whitespace-nowrap cursor-pointer"
            >
              {{ selectedStatus }}
              <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2"></i>
            </button>
            <div v-if="openDropdown === 'status'" class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 text-sm">
              <div 
                v-for="status in statuses" 
                :key="status"
                @click="selectStatus(status)"
                class="px-3 py-2 hover:bg-blue-50 cursor-pointer"
              >
                {{ status }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 min-w-[150px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">借阅时间</label>
          <div class="relative">
            <button 
              @click="toggleDropdown('time')"
              class="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-left text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 !rounded-button whitespace-nowrap cursor-pointer"
            >
              {{ selectedTime }}
              <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2"></i>
            </button>
            <div v-if="openDropdown === 'time'" class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 text-sm">
              <div 
                v-for="time in times" 
                :key="time"
                @click="selectTime(time)"
                class="px-3 py-2 hover:bg-blue-50 cursor-pointer"
              >
                {{ time }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 min-w-[150px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">排序方式</label>
          <div class="relative">
            <button 
              @click="toggleDropdown('sort')"
              class="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-left text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 !rounded-button whitespace-nowrap cursor-pointer"
            >
              {{ selectedSort }}
              <i class="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2"></i>
            </button>
            <div v-if="openDropdown === 'sort'" class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 text-sm">
              <div 
                v-for="sort in sorts" 
                :key="sort"
                @click="selectSort(sort)"
                class="px-3 py-2 hover:bg-blue-50 cursor-pointer"
              >
                {{ sort }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 书架展示区 -->
    <div class="container mx-auto px-4 py-8">
      <div v-if="books.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="book in books" 
          :key="book.id" 
          class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div class="relative pb-[140%] overflow-hidden">
            <img 
              :src="book.coverUrl" 
              :alt="book.title" 
              class="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div 
              class="absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full"
              :class="{
                'bg-yellow-100 text-yellow-800': book.status === '待归还',
                'bg-green-100 text-green-800': book.status === '已归还',
                'bg-blue-100 text-blue-800': book.status === '收藏'
              }"
            >
              {{ book.status }}
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-800 mb-1 line-clamp-1">{{ book.title }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ book.author }}</p>
            <p class="text-xs text-gray-500 mb-3">借阅时间: {{ book.borrowDate }}</p>
            
            <div class="flex space-x-2">
              <button 
                @click="viewBookDetails(book)"
                class="flex-1 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                查看详情
              </button>
              <button 
                v-if="book.status === '待归还'"
                @click="returnBook(book)"
                class="flex-1 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 text-xs font-medium rounded transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                归还
              </button>
              <button 
                v-if="book.status === '收藏'"
                @click="unfavoriteBook(book)"
                class="flex-1 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium rounded transition-colors !rounded-button whitespace-nowrap cursor-pointer"
              >
                取消收藏
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态展示 -->
      <div v-else class="flex flex-col items-center justify-center py-16">
        <div class="w-24 h-24 mb-6 text-gray-300">
          <i class="fas fa-book-open text-6xl"></i>
        </div>
        <h3 class="text-xl font-medium text-gray-700 mb-2">暂无书籍</h3>
        <p class="text-gray-500 mb-6">当前筛选条件下没有找到任何书籍</p>
        <button 
          @click="resetFilters"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors !rounded-button whitespace-nowrap cursor-pointer"
        >
          清除筛选条件
        </button>
      </div>
    </div>

    <!-- 分页控件 -->
    <div class="container mx-auto px-4 pb-12">
      <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600">每页显示:</span>
          <div class="relative">
            <button 
              @click="toggleDropdown('pageSize')"
              class="bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 !rounded-button whitespace-nowrap cursor-pointer"
            >
              {{ pageSize }}
              <i class="fas fa-chevron-down ml-1 text-xs"></i>
            </button>
            <div v-if="openDropdown === 'pageSize'" class="absolute z-10 mt-1 bg-white shadow-lg rounded-lg py-1 text-sm">
              <div 
                v-for="size in pageSizes" 
                :key="size"
                @click="selectPageSize(size)"
                class="px-3 py-2 hover:bg-blue-50 cursor-pointer"
              >
                {{ size }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex items-center">
          <span class="text-sm text-gray-600 mr-4">第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
          <div class="flex space-x-2">
            <button 
              @click="prevPage"
              :disabled="currentPage === 1"
              :class="currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'"
              class="px-3 py-1 border border-gray-300 rounded-md !rounded-button whitespace-nowrap cursor-pointer"
            >
              <i class="fas fa-chevron-left text-xs mr-1"></i> 上一页
            </button>
            <button 
              @click="nextPage"
              :disabled="currentPage === totalPages"
              :class="currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'"
              class="px-3 py-1 border border-gray-300 rounded-md !rounded-button whitespace-nowrap cursor-pointer"
            >
              下一页 <i class="fas fa-chevron-right text-xs ml-1"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 操作反馈提示 -->
    <div 
      v-if="showToast" 
      class="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300"
      :class="{ 'opacity-100': showToast, 'opacity-0': !showToast }"
    >
      {{ toastMessage }}
    </div>

    <!-- 图书详情弹窗 -->
    <div v-if="showBookDetail" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="relative">
          <button 
            @click="showBookDetail = false"
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 !rounded-button whitespace-nowrap cursor-pointer"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
          <div class="p-6">
            <div class="flex mb-6">
              <div class="w-1/3">
                <img 
                  :src="selectedBook?.coverUrl" 
                  :alt="selectedBook?.title" 
                  class="w-full h-auto rounded-lg shadow-sm object-cover object-top"
                />
              </div>
              <div class="w-2/3 pl-6">
                <h2 class="text-xl font-bold text-gray-800 mb-2">{{ selectedBook?.title }}</h2>
                <p class="text-gray-600 mb-1">作者: {{ selectedBook?.author }}</p>
                <p class="text-gray-600 mb-1">ISBN: {{ selectedBook?.isbn }}</p>
                <div 
                  class="inline-block px-2 py-1 text-xs font-medium rounded-full mt-2"
                  :class="{
                    'bg-yellow-100 text-yellow-800': selectedBook?.status === '待归还',
                    'bg-green-100 text-green-800': selectedBook?.status === '已归还',
                    'bg-blue-100 text-blue-800': selectedBook?.status === '收藏'
                  }"
                >
                  {{ selectedBook?.status }}
                </div>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-4">
              <h3 class="font-medium text-gray-800 mb-2">借阅信息</h3>
              <p class="text-sm text-gray-600 mb-1">借阅时间: {{ selectedBook?.borrowDate }}</p>
              <p class="text-sm text-gray-600 mb-4">应还时间: {{ selectedBook?.returnDate }}</p>
              
              <h3 class="font-medium text-gray-800 mb-2">图书简介</h3>
              <p class="text-sm text-gray-600 mb-6">{{ selectedBook?.description }}</p>
              
              <div class="flex space-x-3">
                <button 
                  v-if="selectedBook?.status === '待归还'"
                  @click="returnBookFromDetail"
                  class="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                  归还图书
                </button>
                <button 
                  v-if="selectedBook?.status !== '收藏'"
                  @click="favoriteBookFromDetail"
                  class="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                  收藏图书
                </button>
                <button 
                  v-if="selectedBook?.status === '收藏'"
                  @click="unfavoriteBookFromDetail"
                  class="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors !rounded-button whitespace-nowrap cursor-pointer"
                >
                  取消收藏
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import Header from '@/components/Header.vue';

// 下拉菜单状态
const openDropdown = ref<string | null>(null);
const toggleDropdown = (dropdown: string) => {
  if (openDropdown.value === dropdown) {
    openDropdown.value = null;
  } else {
    openDropdown.value = dropdown;
  }
};

// 点击外部关闭下拉菜单
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative')) {
      openDropdown.value = null;
    }
  });
});

// 筛选条件
const categories = ['全部分类', '文学', '科技', '历史', '艺术', '经济', '哲学', '心理学'];
const selectedCategory = ref('全部分类');
const selectCategory = (category: string) => {
  selectedCategory.value = category;
  openDropdown.value = null;
};

const statuses = ['全部状态', '待归还', '已归还', '收藏'];
const selectedStatus = ref('全部状态');
const selectStatus = (status: string) => {
  selectedStatus.value = status;
  openDropdown.value = null;
};

const times = ['全部时间', '最近一周', '最近一个月', '最近三个月', '最近半年'];
const selectedTime = ref('全部时间');
const selectTime = (time: string) => {
  selectedTime.value = time;
  openDropdown.value = null;
};

const sorts = ['按书名 A-Z', '按书名 Z-A', '按作者', '按借阅时间（最新）', '按借阅时间（最早）'];
const selectedSort = ref('按借阅时间（最新）');
const selectSort = (sort: string) => {
  selectedSort.value = sort;
  openDropdown.value = null;
};

// 分页控制
const pageSizes = [8, 12, 16, 20];
const pageSize = ref(12);
const currentPage = ref(1);
const totalBooks = ref(35);
const totalPages = computed(() => Math.ceil(totalBooks.value / pageSize.value));

const selectPageSize = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1; // 重置到第一页
  openDropdown.value = null;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// 重置筛选条件
const resetFilters = () => {
  selectedCategory.value = '全部分类';
  selectedStatus.value = '全部状态';
  selectedTime.value = '全部时间';
  selectedSort.value = '按借阅时间（最新）';
  // 模拟加载数据
  setTimeout(() => {
    books.value = generateMockBooks();
  }, 300);
};

// 操作反馈提示
const showToast = ref(false);
const toastMessage = ref('');

const displayToast = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// 图书详情弹窗
const showBookDetail = ref(false);
const selectedBook = ref<any>(null);

const viewBookDetails = (book: any) => {
  selectedBook.value = book;
  showBookDetail.value = true;
};

// 图书操作
const returnBook = (book: any) => {
  // 模拟API调用
  setTimeout(() => {
    book.status = '已归还';
    displayToast('图书归还成功');
  }, 300);
};

const unfavoriteBook = (book: any) => {
  // 模拟API调用
  setTimeout(() => {
    book.status = '已归还';
    displayToast('已取消收藏');
  }, 300);
};

const returnBookFromDetail = () => {
  if (selectedBook.value) {
    returnBook(selectedBook.value);
    showBookDetail.value = false;
  }
};

const favoriteBookFromDetail = () => {
  if (selectedBook.value) {
    selectedBook.value.status = '收藏';
    displayToast('图书收藏成功');
    showBookDetail.value = false;
  }
};

const unfavoriteBookFromDetail = () => {
  if (selectedBook.value) {
    unfavoriteBook(selectedBook.value);
    showBookDetail.value = false;
  }
};

// 模拟数据
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  status: string;
  borrowDate: string;
  returnDate: string;
  description: string;
  coverUrl: string;
  category: string;
}

const generateMockBooks = (): Book[] => {
  const bookCovers = [
    'https://readdy.ai/api/search-image?query=A%20beautifully%20designed%20book%20cover%20for%20a%20novel%20with%20elegant%20typography%2C%20soft%20color%20palette%2C%20minimalist%20design%2C%20clean%20background%2C%20professional%20book%20cover%20design%2C%20high%20quality%2C%20modern%20aesthetic%2C%20simple%20and%20elegant&width=300&height=450&seq=1&orientation=portrait',
    'https://readdy.ai/api/search-image?query=A%20science%20fiction%20book%20cover%20with%20futuristic%20elements%2C%20space%20theme%2C%20dark%20background%20with%20glowing%20elements%2C%20professional%20book%20cover%20design%2C%20high%20quality%2C%20modern%20aesthetic%2C%20simple%20and%20elegant&width=300&height=450&seq=2&orientation=portrait',
    'https://readdy.ai/api/search-image?query=A%20history%20book%20cover%20with%20vintage%20aesthetic%2C%20old%20manuscript%20style%2C%20sepia%20tones%2C%20professional%20book%20cover%20design%2C%20high%20quality%2C%20classic%20look%2C%20simple%20and%20elegant&width=300&height=450&seq=3&orientation=portrait',
    'https://readdy.ai/api/search-image?query=An%20art%20book%20cover%20with%20vibrant%20colors%2C%20abstract%20design%2C%20creative%20layout%2C%20professional%20book%20cover%20design%2C%20high%20quality%2C%20artistic%20aesthetic%2C%20simple%20and%20elegant&width=300&height=450&seq=4&orientation=portrait',
    'https://readdy.ai/api/search-image?query=An%20economics%20book%20cover%20with%20business%20theme%2C%20graph%20elements%2C%20professional%20look%2C%20clean%20design%2C%20professional%20book%20cover%20design%2C%20high%20quality%2C%20corporate%20aesthetic%2C%20simple%20and%20elegant&width=300&height=450&seq=5&orientation=portrait',
    'https://readdy.ai/api/search-image?query=A%20philosophy%20book%20cover%20with%20thoughtful%20imagery%2C%20minimalist%20design%2C%20symbolic%20elements%2C%20professional%20book%20cover%20design%2C%20high%20quality%2C%20intellectual%20aesthetic%2C%20simple%20and%20elegant&width=300&height=450&seq=6&orientation=portrait',
    'https://readdy.ai/api/search-image?query=A%20psychology%20book%20cover%20with%20human%20silhouette%2C%20brain%20imagery%2C%20professional%20clinical%20look%2C%20clean%20design%2C%20professional%20book%20cover%20design%2C%20high%20quality%2C%20scientific%20aesthetic%2C%20simple%20and%20elegant&width=300&height=450&seq=7&orientation=portrait',
    'https://readdy.ai/api/search-image?query=A%20literary%20fiction%20book%20cover%20with%20artistic%20typography%2C%20subtle%20imagery%2C%20elegant%20design%2C%20professional%20book%20cover%20design%2C%20high%20quality%2C%20sophisticated%20aesthetic%2C%20simple%20and%20elegant&width=300&height=450&seq=8&orientation=portrait'
  ];

  const titles = [
    '时间的形状', '沉默的大多数', '人类简史', '未来简史', '思考，快与慢',
    '百年孤独', '月亮与六便士', '三体', '平凡的世界', '围城',
    '解忧杂货店', '活着', '追风筝的人', '白夜行', '红楼梦',
    '万历十五年', '明朝那些事儿', '金融的逻辑', '置身事内', '乌合之众'
  ];

  const authors = [
    '余华', '刘慈欣', '尤瓦尔·赫拉利', '卡勒德·胡赛尼', '东野圭吾',
    '马尔克斯', '毛姆', '路遥', '钱钟书', '东野圭吾',
    '村上春树', '丹尼尔·卡尼曼', '吴军', '黄仁宇', '当年明月',
    '陈志武', '兰小欢', '古斯塔夫·勒庞', '王小波', '曹雪芹'
  ];

  const statuses = ['待归还', '已归还', '收藏'];
  const categories = ['文学', '科技', '历史', '艺术', '经济', '哲学', '心理学'];
  
  const descriptions = [
    '这本书探讨了时间的本质和人类对时间的感知，融合了物理学和哲学的视角，深入浅出地解释了复杂的时间概念。',
    '作者以独特的视角和犀利的笔触，剖析了当代社会中的沉默群体，探讨了言论自由与社会责任的关系。',
    '这是一部横跨人类全史的宏大叙事，从认知革命到人工智能时代，展现了人类如何从一个不起眼的非洲物种，成为地球的主宰。',
    '这本书展望了人类的未来发展方向，探讨了生物技术和人工智能将如何改变人类社会和人类本身的本质。',
    '本书揭示了人类思考的两种模式：快速、直觉和情绪的系统1，以及缓慢、深思熟虑和逻辑的系统2，解释了它们如何塑造我们的判断和决策。',
    '这是一部魔幻现实主义的经典之作，讲述了布恩迪亚家族七代人的故事，展现了拉丁美洲的历史与文化。',
    '这本小说讲述了一个伦敦证券交易所的经纪人放弃优越生活，追求内心绘画梦想的故事，探讨了艺术与生活的关系。',
    '这部科幻小说构建了一个宏大的宇宙文明图景，探讨了宇宙社会学和文明的生存法则，被誉为中国科幻的里程碑。',
    '这部小说全景式地展现了中国农村从1975年到1985年间翻天覆地的变化，被誉为中国当代文学的经典之作。',
    '这部小说以幽默辛辣的笔触，描绘了1940年代中国知识分子的生活百态，被誉为中国现代文学的经典。'
  ];

  // 生成随机日期（最近半年内）
  const generateRandomDate = () => {
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);
    
    const randomTimestamp = sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime());
    const randomDate = new Date(randomTimestamp);
    
    return `${randomDate.getFullYear()}-${String(randomDate.getMonth() + 1).padStart(2, '0')}-${String(randomDate.getDate()).padStart(2, '0')}`;
  };

  // 生成随机归还日期（借阅日期后30天）
  const generateReturnDate = (borrowDate: string) => {
    const date = new Date(borrowDate);
    date.setDate(date.getDate() + 30);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // 生成随机ISBN
  const generateISBN = () => {
    return `978-${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}-${Math.floor(Math.random() * 10)}`;
  };

  const mockBooks: Book[] = [];
  
  for (let i = 0; i < 20; i++) {
    const borrowDate = generateRandomDate();
    const returnDate = generateReturnDate(borrowDate);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    mockBooks.push({
      id: i + 1,
      title: titles[i % titles.length],
      author: authors[i % authors.length],
      isbn: generateISBN(),
      status: status,
      borrowDate: borrowDate,
      returnDate: returnDate,
      description: descriptions[i % descriptions.length],
      coverUrl: bookCovers[i % bookCovers.length],
      category: categories[i % categories.length]
    });
  }
  
  return mockBooks;
};

const books = ref<Book[]>(generateMockBooks());
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 去除number类型input的上下箭头 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>

