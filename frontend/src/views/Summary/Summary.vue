<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 添加 Header 组件 -->
    <Header />
    <!-- 主容器 -->
    <div class="container mx-auto px-4 py-6 flex flex-col min-h-screen max-w-[1440px]">
      <!-- 主内容区域 -->
      <div class="flex flex-1 gap-6">
        <!-- 左侧导航 -->
        <div class="w-60 bg-white rounded-lg shadow-md p-4 flex flex-col">
          <div class="mb-6 flex items-center justify-center">
            <div class="bg-blue-600 rounded-full p-4 flex items-center justify-center">
              <i class="fas fa-university text-white text-2xl"></i>
            </div>
          </div>
          
          <h3 class="font-semibold text-gray-700 mb-4 text-center">楼层导航</h3>
          
          <div class="space-y-2 flex-1">
            <button 
              v-for="floor in floors" 
              :key="floor.id"
              @click="selectFloor(floor.id)"
              :class="[
                'w-full py-3 px-4 text-left rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap !rounded-button',
                currentFloor === floor.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'
              ]"
            >
              <div class="flex items-center">
                <i :class="['mr-3', floor.icon]"></i>
                <div>
                  <div class="font-medium">{{ floor.name }}</div>
                  <div class="text-xs" :class="currentFloor === floor.id ? 'text-blue-100' : 'text-gray-500'">
                    {{ floor.description }}
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div class="mt-6 pt-4 border-t border-gray-200">
            <div class="text-sm text-gray-600 mb-2">图书馆开放时间</div>
            <div class="bg-blue-50 rounded-lg p-3">
              <div class="flex items-center text-blue-800">
                <i class="fas fa-clock mr-2"></i>
                <span>08:00 - 21:00</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧内容区域 -->
        <div class="flex-1 flex flex-col">
          <!-- 楼层平面图 -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-6 flex-1">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-800">{{ currentFloorData.name }} 平面图</h2>
              <div class="flex space-x-2">
                <button class="bg-gray-100 hover:bg-gray-200 p-2 rounded-full cursor-pointer whitespace-nowrap !rounded-button">
                  <i class="fas fa-search-plus"></i>
                </button>
                <button class="bg-gray-100 hover:bg-gray-200 p-2 rounded-full cursor-pointer whitespace-nowrap !rounded-button">
                  <i class="fas fa-search-minus"></i>
                </button>
              </div>
            </div>
            
            <div class="relative h-[400px] border border-gray-200 rounded-lg overflow-hidden bg-blue-50">
              <!-- 平面图区域 -->
              <div class="absolute inset-0">
                <img 
                  :src="floorMapImage" 
                  alt="楼层平面图" 
                  class="w-full h-full object-cover object-top"
                />
              </div>
              
              <!-- 平面图上的交互点 -->
              <div 
                v-for="room in currentFloorData.rooms" 
                :key="room.id"
                class="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                :style="{top: `${room.position.y}%`, left: `${room.position.x}%`}"
                @mouseenter="hoveredRoom = room"
                @mouseleave="hoveredRoom = null"
              >
                <div class="relative">
                  <div :class="[
                    'w-4 h-4 rounded-full animate-pulse',
                    getRoomTypeColor(room.type)
                  ]"></div>
                  
                  <!-- 悬停提示框 -->
                  <div 
                    v-if="hoveredRoom && hoveredRoom.id === room.id"
                    class="absolute z-10 bg-white rounded-lg shadow-lg p-3 w-48 -translate-x-1/2 -translate-y-full -mt-2"
                  >
                    <div class="font-medium text-gray-800 mb-1">{{ room.name }}</div>
                    <div class="text-sm text-gray-600">{{ room.description }}</div>
                    <div class="mt-2 text-sm">
                      <div class="flex justify-between">
                        <span>总座位:</span>
                        <span class="font-medium">{{ room.totalSeats }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span>空闲座位:</span>
                        <span :class="[
                          'font-medium',
                          room.availableSeats < 5 ? 'text-red-500' : 'text-green-500'
                        ]">{{ room.availableSeats }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 图例 -->
            <div class="mt-4 flex flex-wrap gap-4">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span class="text-sm text-gray-700">阅览室</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span class="text-sm text-gray-700">自习室</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                <span class="text-sm text-gray-700">书架区</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span class="text-sm text-gray-700">服务区</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span class="text-sm text-gray-700">会议室</span>
              </div>
            </div>
          </div>

          <!-- 信息卡片区域 -->
          <div class="grid grid-cols-3 gap-6">
            <!-- 图书馆基本信息 -->
            <div class="bg-white rounded-lg shadow-md p-5">
              <div class="flex items-center mb-4">
                <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                <h3 class="text-lg font-semibold text-gray-800">图书馆概况</h3>
              </div>
              
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">建筑面积</span>
                  <span class="font-medium">5,000 平方米</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">楼层数量</span>
                  <span class="font-medium">6 层</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">藏书总量</span>
                  <span class="font-medium">100,000 册</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">阅览室数量</span>
                  <span class="font-medium">12 个</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-600">自习室数量</span>
                  <span class="font-medium">5 个</span>
                </div>
              </div>
              
              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="text-sm text-gray-500">
                  <i class="fas fa-sync-alt mr-1"></i> 最后更新: 今天 10:30
                </div>
              </div>
            </div>
            
            <!-- 当前楼层阅览室信息 -->
            <div class="bg-white rounded-lg shadow-md p-5">
              <div class="flex items-center mb-4">
                <i class="fas fa-book-reader text-green-600 mr-2"></i>
                <h3 class="text-lg font-semibold text-gray-800">阅览室信息</h3>
              </div>
              
              <div class="space-y-4">
                <div v-for="room in currentFloorData.rooms.filter(r => r.type === 'reading')" :key="room.id" class="border-b border-gray-100 pb-3 last:border-0">
                  <div class="font-medium text-gray-800">{{ room.name }}</div>
                  <div class="mt-1 grid grid-cols-2 gap-2 text-sm">
                    <div class="flex items-center">
                      <i class="fas fa-chair text-gray-400 mr-1"></i>
                      <span>总座位: {{ room.totalSeats }}</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-user-check text-gray-400 mr-1"></i>
                      <span>空闲: <span :class="room.availableSeats < 5 ? 'text-red-500' : 'text-green-500'">{{ room.availableSeats }}</span></span>
                    </div>
                    <div class="flex items-center col-span-2">
                      <i class="fas fa-clock text-gray-400 mr-1"></i>
                      <span>开放时间: {{ room.openTime }}</span>
                    </div>
                  </div>
                </div>
                
                <div v-if="!currentFloorData.rooms.some(r => r.type === 'reading')" class="text-center py-6 text-gray-500">
                  <i class="fas fa-info-circle mb-2 text-xl"></i>
                  <p>当前楼层没有阅览室</p>
                </div>
              </div>
              
              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="text-sm text-gray-500">
                  <i class="fas fa-sync-alt mr-1"></i> 实时更新
                </div>
              </div>
            </div>
            
            <!-- 书架信息 -->
            <div class="bg-white rounded-lg shadow-md p-5">
              <div class="flex items-center mb-4">
                <i class="fas fa-bookmark text-purple-600 mr-2"></i>
                <h3 class="text-lg font-semibold text-gray-800">书架信息</h3>
              </div>
              
              <div v-if="currentFloorData.bookshelves && currentFloorData.bookshelves.length > 0">
                <div class="space-y-4">
                  <div v-for="shelf in currentFloorData.bookshelves" :key="shelf.id" class="border-b border-gray-100 pb-3 last:border-0">
                    <div class="font-medium text-gray-800">{{ shelf.name }}</div>
                    <div class="mt-1 text-sm text-gray-600">{{ shelf.category }}</div>
                    <div class="mt-2 flex justify-between items-center">
                      <span class="text-sm">藏书量</span>
                      <div class="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          class="bg-purple-500 h-2 rounded-full" 
                          :style="{width: `${(shelf.bookCount / shelf.capacity) * 100}%`}"
                        ></div>
                      </div>
                      <span class="text-sm font-medium">{{ shelf.bookCount }}/{{ shelf.capacity }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="mt-4">
                  <h4 class="font-medium text-gray-700 mb-2">热门图书推荐</h4>
                  <div class="space-y-2">
                    <div v-for="(book, index) in currentFloorData.popularBooks" :key="index" class="flex items-center text-sm">
                      <i class="fas fa-star text-yellow-400 mr-2"></i>
                      <span>{{ book }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-6 text-gray-500">
                <i class="fas fa-info-circle mb-2 text-xl"></i>
                <p>当前楼层没有书架信息</p>
              </div>
              
              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="text-sm text-gray-500">
                  <i class="fas fa-sync-alt mr-1"></i> 最后更新: 今天 09:15
                </div>
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

// 当前日期
const currentDate = computed(() => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()]}`;
});

// 楼层数据
const floors = [
  { 
    id: 1, 
    name: '一层', 
    description: '总服务台、自习室',
    icon: 'fas fa-concierge-bell'
  },
  { 
    id: 2, 
    name: '二层', 
    description: '科技类书籍区',
    icon: 'fas fa-laptop-code'
  },
  { 
    id: 3, 
    name: '三层', 
    description: '文学类书籍区',
    icon: 'fas fa-book'
  },
  { 
    id: 4, 
    name: '四层', 
    description: '期刊阅览区',
    icon: 'fas fa-newspaper'
  },
  { 
    id: 5, 
    name: '五层', 
    description: '会议室、多媒体区',
    icon: 'fas fa-film'
  },
  { 
    id: 6, 
    name: '六层', 
    description: '办公区',
    icon: 'fas fa-briefcase'
  }
];

// 当前选中的楼层
const currentFloor = ref(1);
const hoveredRoom = ref(null);

// 楼层详细数据
const floorsData = [
  {
    id: 1,
    name: '一层',
    rooms: [
      { 
        id: 101, 
        name: '总服务台', 
        type: 'service',
        description: '借还书、咨询服务',
        position: { x: 50, y: 30 },
        totalSeats: 10,
        availableSeats: 4,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 102, 
        name: '自习室 A', 
        type: 'study',
        description: '安静学习区域',
        position: { x: 25, y: 60 },
        totalSeats: 50,
        availableSeats: 12,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 103, 
        name: '阅览室 1', 
        type: 'reading',
        description: '普通阅览区',
        position: { x: 75, y: 40 },
        totalSeats: 30,
        availableSeats: 8,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 104, 
        name: '阅览室 2', 
        type: 'reading',
        description: '普通阅览区',
        position: { x: 75, y: 70 },
        totalSeats: 30,
        availableSeats: 15,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 105, 
        name: '阅览室 3', 
        type: 'reading',
        description: '普通阅览区',
        position: { x: 30, y: 20 },
        totalSeats: 30,
        availableSeats: 5,
        openTime: '08:00 - 21:00'
      }
    ],
    bookshelves: [
      {
        id: 'BS101',
        name: '新书展示区',
        category: '各类新书',
        bookCount: 120,
        capacity: 150
      }
    ],
    popularBooks: [
      '《人工智能导论》',
      '《数据结构与算法》',
      '《现代操作系统》'
    ]
  },
  {
    id: 2,
    name: '二层',
    rooms: [
      { 
        id: 201, 
        name: '科技书籍区 A', 
        type: 'bookshelf',
        description: '计算机科学类',
        position: { x: 30, y: 30 },
        totalSeats: 0,
        availableSeats: 0,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 202, 
        name: '科技书籍区 B', 
        type: 'bookshelf',
        description: '自然科学类',
        position: { x: 70, y: 30 },
        totalSeats: 0,
        availableSeats: 0,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 203, 
        name: '阅览室 4', 
        type: 'reading',
        description: '科技阅览区',
        position: { x: 30, y: 70 },
        totalSeats: 40,
        availableSeats: 22,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 204, 
        name: '阅览室 5', 
        type: 'reading',
        description: '科技阅览区',
        position: { x: 70, y: 70 },
        totalSeats: 40,
        availableSeats: 18,
        openTime: '08:00 - 21:00'
      }
    ],
    bookshelves: [
      {
        id: 'BS201',
        name: '计算机科学区',
        category: '计算机、编程、网络',
        bookCount: 2500,
        capacity: 3000
      },
      {
        id: 'BS202',
        name: '自然科学区',
        category: '物理、化学、生物',
        bookCount: 1800,
        capacity: 2000
      }
    ],
    popularBooks: [
      '《深入理解计算机系统》',
      '《算法导论》',
      '《宇宙简史》'
    ]
  },
  {
    id: 3,
    name: '三层',
    rooms: [
      { 
        id: 301, 
        name: '文学书籍区 A', 
        type: 'bookshelf',
        description: '中国文学类',
        position: { x: 30, y: 30 },
        totalSeats: 0,
        availableSeats: 0,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 302, 
        name: '文学书籍区 B', 
        type: 'bookshelf',
        description: '外国文学类',
        position: { x: 70, y: 30 },
        totalSeats: 0,
        availableSeats: 0,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 303, 
        name: '阅览室 7', 
        type: 'reading',
        description: '文学阅览区',
        position: { x: 30, y: 70 },
        totalSeats: 35,
        availableSeats: 10,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 304, 
        name: '阅览室 8', 
        type: 'reading',
        description: '文学阅览区',
        position: { x: 70, y: 70 },
        totalSeats: 35,
        availableSeats: 5,
        openTime: '08:00 - 21:00'
      }
    ],
    bookshelves: [
      {
        id: 'BS301',
        name: '中国文学区',
        category: '古典文学、现当代文学',
        bookCount: 3200,
        capacity: 3500
      },
      {
        id: 'BS302',
        name: '外国文学区',
        category: '各国文学作品',
        bookCount: 2800,
        capacity: 3000
      }
    ],
    popularBooks: [
      '《百年孤独》',
      '《红楼梦》',
      '《战争与和平》'
    ]
  },
  {
    id: 4,
    name: '四层',
    rooms: [
      { 
        id: 401, 
        name: '期刊区 A', 
        type: 'bookshelf',
        description: '学术期刊',
        position: { x: 30, y: 30 },
        totalSeats: 0,
        availableSeats: 0,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 402, 
        name: '期刊区 B', 
        type: 'bookshelf',
        description: '大众期刊',
        position: { x: 70, y: 30 },
        totalSeats: 0,
        availableSeats: 0,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 403, 
        name: '阅览室 10', 
        type: 'reading',
        description: '期刊阅览区',
        position: { x: 30, y: 70 },
        totalSeats: 25,
        availableSeats: 8,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 404, 
        name: '阅览室 11', 
        type: 'reading',
        description: '期刊阅览区',
        position: { x: 70, y: 70 },
        totalSeats: 25,
        availableSeats: 12,
        openTime: '08:00 - 21:00'
      }
    ],
    bookshelves: [
      {
        id: 'BS401',
        name: '学术期刊区',
        category: '各学科学术期刊',
        bookCount: 1500,
        capacity: 2000
      },
      {
        id: 'BS402',
        name: '大众期刊区',
        category: '杂志、报纸',
        bookCount: 800,
        capacity: 1000
      }
    ],
    popularBooks: [
      '《科学》杂志最新期',
      '《自然》杂志最新期',
      '《读者》2025年合集'
    ]
  },
  {
    id: 5,
    name: '五层',
    rooms: [
      { 
        id: 501, 
        name: '会议室 A', 
        type: 'meeting',
        description: '小型会议室',
        position: { x: 30, y: 30 },
        totalSeats: 15,
        availableSeats: 15,
        openTime: '09:00 - 18:00'
      },
      { 
        id: 502, 
        name: '会议室 B', 
        type: 'meeting',
        description: '中型会议室',
        position: { x: 70, y: 30 },
        totalSeats: 30,
        availableSeats: 30,
        openTime: '09:00 - 18:00'
      },
      { 
        id: 503, 
        name: '多媒体区 A', 
        type: 'media',
        description: '电子资源阅览',
        position: { x: 30, y: 70 },
        totalSeats: 20,
        availableSeats: 8,
        openTime: '08:00 - 21:00'
      },
      { 
        id: 504, 
        name: '多媒体区 B', 
        type: 'media',
        description: '视听资料区',
        position: { x: 70, y: 70 },
        totalSeats: 20,
        availableSeats: 12,
        openTime: '08:00 - 21:00'
      }
    ],
    bookshelves: [],
    popularBooks: []
  },
  {
    id: 6,
    name: '六层',
    rooms: [
      { 
        id: 601, 
        name: '行政办公区', 
        type: 'office',
        description: '图书馆管理办公室',
        position: { x: 30, y: 30 },
        totalSeats: 0,
        availableSeats: 0,
        openTime: '09:00 - 17:00'
      },
      { 
        id: 602, 
        name: '技术部门', 
        type: 'office',
        description: '系统维护部门',
        position: { x: 70, y: 30 },
        totalSeats: 0,
        availableSeats: 0,
        openTime: '09:00 - 17:00'
      },
      { 
        id: 603, 
        name: '员工休息区', 
        type: 'office',
        description: '员工休息室',
        position: { x: 50, y: 70 },
        totalSeats: 0,
        availableSeats: 0,
        openTime: '09:00 - 17:00'
      }
    ],
    bookshelves: [],
    popularBooks: []
  }
];

// 当前楼层数据
const currentFloorData = computed(() => {
  return floorsData.find(floor => floor.id === currentFloor.value) || floorsData[0];
});

// 楼层平面图图片
const floorMapImage = computed(() => {
  return `https://readdy.ai/api/search-image?query=A%20detailed%20architectural%20floor%20plan%20of%20a%20modern%20library%20with%20various%20rooms%20and%20sections%20clearly%20labeled%2C%20top-down%20view%20with%20clean%20lines%20and%20organized%20layout%2C%20showing%20reading%20rooms%2C%20bookshelves%2C%20study%20areas%2C%20and%20service%20desks%2C%20with%20a%20professional%20blueprint%20style%20and%20soft%20blue%20background&width=800&height=600&seq=${currentFloor.value}&orientation=landscape`;
});

// 选择楼层
const selectFloor = (floorId: number) => {
  currentFloor.value = floorId;
};

// 获取房间类型对应的颜色
const getRoomTypeColor = (type: string) => {
  const colorMap: Record<string, string> = {
    'reading': 'bg-blue-500',
    'study': 'bg-green-500',
    'bookshelf': 'bg-purple-500',
    'service': 'bg-yellow-500',
    'meeting': 'bg-red-500',
    'media': 'bg-indigo-500',
    'office': 'bg-gray-500'
  };
  
  return colorMap[type] || 'bg-gray-500';
};

onMounted(() => {
  // 初始化页面
});
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}
</style>

