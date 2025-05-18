<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 使用Header组件 -->
    <Header />

    <div class="container mx-auto px-4 py-6 max-w-7xl">
      <header class="mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h1 class="text-3xl font-bold text-blue-700">学习助手</h1>
            <span class="text-gray-500">{{ currentDate }}</span>
          </div>
          <div class="flex items-center space-x-4">
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
              <i class="fas fa-user-circle mr-2"></i>个人中心
            </button>
            <button class="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow-sm hover:bg-blue-200 transition duration-200 cursor-pointer !rounded-button whitespace-nowrap">
              <i class="fas fa-cog mr-2"></i>设置
            </button>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-12 gap-6 min-h-[900px]">
        <!-- 语音助手区（左侧） -->
        <div class="col-span-3 bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-6 flex flex-col h-full">
            <div class="text-center mb-6">
              <h2 class="text-xl font-bold text-gray-800 mb-2">语音助手</h2>
              <p class="text-sm text-gray-600">随时为您提供学习支持</p>
            </div>
            
            <div class="flex justify-center mb-6">
              <button 
                class="w-24 h-24 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap"
                :class="{'animate-pulse': isListening}"
                @click="toggleListening"
              >
                <i class="fas fa-microphone text-white text-3xl"></i>
              </button>
            </div>
            
            <div class="text-center mb-6">
              <p class="text-sm text-gray-700">{{ isListening ? '正在聆听...' : '点击开始语音交互' }}</p>
              <p class="text-xs text-gray-500 mt-2">说出你要查找的书籍，语音助手将为你快速定位</p>
            </div>
            
            <div class="flex-grow bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto h-64">
              <div class="space-y-4">
                <template v-for="(message, index) in chatMessages" :key="index">
                  <div :class="message.isUser ? 'flex justify-end' : 'flex justify-start'">
                    <div :class="[
                      'max-w-[80%] rounded-lg p-3 shadow-sm',
                      message.isUser ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-800 border border-gray-200'
                    ]">
                      <p class="text-sm">{{ message.text }}</p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            
            <div class="mt-auto">
              <h3 class="text-sm font-medium text-gray-700 mb-2">快捷指令</h3>
              <div class="grid grid-cols-2 gap-2">
                <button class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm cursor-pointer !rounded-button whitespace-nowrap">
                  <i class="fas fa-book mr-1"></i>查找书籍
                </button>
                <button class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm cursor-pointer !rounded-button whitespace-nowrap">
                  <i class="fas fa-tasks mr-1"></i>创建任务
                </button>
                <button class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm cursor-pointer !rounded-button whitespace-nowrap">
                  <i class="fas fa-calendar-alt mr-1"></i>制定计划
                </button>
                <button class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm cursor-pointer !rounded-button whitespace-nowrap">
                  <i class="fas fa-chart-line mr-1"></i>学习报告
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 学习面板区（中间） -->
        <div class="col-span-5 bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-6 h-full flex flex-col">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-800">学习面板</h2>
              <div class="flex space-x-2">
                <button class="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 cursor-pointer !rounded-button whitespace-nowrap">
                  <i class="fas fa-plus"></i>
                </button>
                <button class="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 cursor-pointer !rounded-button whitespace-nowrap">
                  <i class="fas fa-filter"></i>
                </button>
              </div>
            </div>
            
            <!-- 今日任务概览卡片 -->
            <div class="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl p-5 text-white mb-6">
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="font-bold text-lg mb-1">今日任务概览</h3>
                  <p class="text-blue-100 text-sm">{{ currentDate }}</p>
                </div>
                <div class="text-right">
                  <p class="text-3xl font-bold">{{ completedTasks }}/{{ totalTasks }}</p>
                  <p class="text-blue-100 text-sm">已完成/总任务</p>
                </div>
              </div>
              <div class="mt-4 bg-blue-400 bg-opacity-30 rounded-full h-2">
                <div 
                  class="bg-white rounded-full h-2 transition-all duration-500"
                  :style="{width: `${(completedTasks / totalTasks) * 100}%`}"
                ></div>
              </div>
            </div>
            
            <!-- 任务时间轴 -->
            <div class="mb-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-semibold text-gray-800">任务列表</h3>
                <div class="flex space-x-2">
                  <button class="text-gray-500 hover:text-blue-600 cursor-pointer !rounded-button whitespace-nowrap">
                    <i class="fas fa-chevron-left"></i>
                  </button>
                  <span class="text-sm text-gray-600">本周</span>
                  <button class="text-gray-500 hover:text-blue-600 cursor-pointer !rounded-button whitespace-nowrap">
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
              
              <div class="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                <div v-for="(task, index) in tasks" :key="index" class="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div class="flex items-start">
                    <div class="mr-3">
                      <input 
                        type="checkbox" 
                        :checked="task.completed" 
                        @change="toggleTask(index)"
                        class="w-5 h-5 rounded-full border-2 border-blue-400 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      >
                    </div>
                    <div class="flex-grow">
                      <div class="flex justify-between">
                        <h4 class="font-medium text-gray-800" :class="{'line-through text-gray-500': task.completed}">{{ task.title }}</h4>
                        <span class="text-xs text-gray-500">{{ task.time }}</span>
                      </div>
                      <p class="text-sm text-gray-600 mt-1" :class="{'text-gray-400': task.completed}">{{ task.description }}</p>
                      <div class="flex items-center mt-2">
                        <span class="text-xs px-2 py-1 rounded-full" :class="getPriorityClass(task.priority)">{{ task.priority }}</span>
                        <span class="text-xs text-gray-500 ml-2">
                          <i class="fas fa-clock mr-1"></i>{{ task.duration }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 进度统计图表 -->
            <div class="mt-auto">
              <h3 class="font-semibold text-gray-800 mb-3">学习进度统计</h3>
              <div class="bg-gray-50 rounded-lg p-4">
                <div ref="chartContainer" class="h-64"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 小组互动区（右侧） -->
        <div class="col-span-4 bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-6 h-full flex flex-col">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-800">小组互动</h2>
              <button class="text-blue-600 hover:text-blue-800 cursor-pointer !rounded-button whitespace-nowrap">
                <i class="fas fa-ellipsis-h"></i>
              </button>
            </div>
            
            <!-- 签到打卡模块 -->
            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-5 text-white mb-6">
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="font-bold text-lg">每日签到</h3>
                  <p class="text-indigo-100 text-sm">已连续签到 {{ consecutiveDays }} 天</p>
                </div>
                <button 
                  class="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors duration-200 cursor-pointer !rounded-button whitespace-nowrap"
                  :disabled="hasCheckedIn"
                  :class="{'opacity-50 cursor-not-allowed': hasCheckedIn}"
                  @click="checkIn"
                >
                  {{ hasCheckedIn ? '已签到' : '立即签到' }}
                </button>
              </div>
              
              <div class="mt-4 flex justify-between">
                <div v-for="day in 7" :key="day" class="text-center">
                  <div 
                    class="w-8 h-8 rounded-full flex items-center justify-center text-xs mb-1"
                    :class="getCheckInDayClass(day)"
                  >
                    {{ getDayLabel(day) }}
                  </div>
                  <span class="text-xs text-indigo-100">{{ getDayDate(day) }}</span>
                </div>
              </div>
            </div>
            
            <!-- 成员列表 -->
            <div class="mb-6">
              <h3 class="font-semibold text-gray-800 mb-3">小组成员</h3>
              <div class="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                <div v-for="(member, index) in teamMembers" :key="index" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center">
                    <div class="relative">
                      <img :src="member.avatar" alt="成员头像" class="w-10 h-10 rounded-full object-cover">
                      <span 
                        class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                        :class="member.online ? 'bg-green-500' : 'bg-gray-400'"
                      ></span>
                    </div>
                    <div class="ml-3">
                      <h4 class="font-medium text-gray-800">{{ member.name }}</h4>
                      <p class="text-xs text-gray-500">{{ member.role }}</p>
                    </div>
                  </div>
                  <div class="flex items-center">
                    <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        class="bg-blue-600 h-2 rounded-full"
                        :style="{width: `${member.progress}%`}"
                      ></div>
                    </div>
                    <span class="text-xs text-gray-600">{{ member.progress }}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 积分排行榜 -->
            <div class="mt-auto">
              <div class="flex justify-between items-center mb-3">
                <h3 class="font-semibold text-gray-800">积分排行榜</h3>
                <span class="text-sm text-blue-600 cursor-pointer">查看全部</span>
              </div>
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="space-y-4">
                  <div v-for="(user, index) in leaderboard" :key="index" class="flex items-center">
                    <div 
                      class="w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3"
                      :class="getLeaderboardRankClass(index)"
                    >
                      {{ index + 1 }}
                    </div>
                    <img :src="user.avatar" alt="用户头像" class="w-8 h-8 rounded-full object-cover mr-3">
                    <div class="flex-grow">
                      <div class="flex justify-between items-center">
                        <span class="font-medium text-gray-800">{{ user.name }}</span>
                        <span class="font-bold text-blue-600">{{ user.points }}</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          class="bg-blue-600 h-1.5 rounded-full"
                          :style="{width: `${(user.points / maxPoints) * 100}%`}"
                        ></div>
                      </div>
                    </div>
                  </div>
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
import * as echarts from 'echarts';
import Header from '@/components/Header.vue';

// 当前日期
const currentDate = ref('2025年5月18日 星期日');

// 语音助手状态
const isListening = ref(false);
const chatMessages = ref([
  { text: '你好！我是你的学习助手，有什么可以帮到你的吗？', isUser: false },
  { text: '有哪些关于人工智能的书籍？', isUser: true },
  { text: '我为您找到了以下人工智能相关书籍：《深度学习》、《人工智能：一种现代方法》、《机器学习实战》等。需要了解更多详情吗？', isUser: false }
]);

// 任务数据
const tasks = ref([
  { 
    title: '完成高等数学第三章习题', 
    description: '完成教材P78-P82的所有习题，重点关注定积分部分',
    time: '10:00 - 12:00', 
    duration: '2小时', 
    priority: '高优先级', 
    completed: true 
  },
  { 
    title: '阅读《机器学习》第五章', 
    description: '阅读并做笔记，重点理解支持向量机原理',
    time: '14:00 - 16:00', 
    duration: '2小时', 
    priority: '中优先级', 
    completed: false 
  },
  { 
    title: '准备英语演讲稿', 
    description: '围绕"人工智能与教育"主题，准备5分钟英文演讲',
    time: '16:30 - 18:00', 
    duration: '1.5小时', 
    priority: '中优先级', 
    completed: false 
  },
  { 
    title: '小组讨论：数据结构项目', 
    description: '与小组成员讨论期末项目方案，确定技术路线',
    time: '19:00 - 20:30', 
    duration: '1.5小时', 
    priority: '高优先级', 
    completed: false 
  },
  { 
    title: '复习计算机网络知识点', 
    description: '重点复习TCP/IP协议栈和网络安全部分',
    time: '21:00 - 22:00', 
    duration: '1小时', 
    priority: '低优先级', 
    completed: false 
  }
]);

// 计算任务完成情况
const totalTasks = computed(() => tasks.value.length);
const completedTasks = computed(() => tasks.value.filter(task => task.completed).length);

// 签到数据
const consecutiveDays = ref(5);
const hasCheckedIn = ref(true);
const checkedInDays = ref([true, true, true, true, true, false, false]); // 过去7天的签到情况

// 小组成员数据
const teamMembers = ref([
  { 
    name: '张明', 
    role: '组长', 
    progress: 85, 
    online: true,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20Asian%20man%20with%20short%20black%20hair%20wearing%20casual%20business%20attire%20with%20a%20neutral%20background%20looking%20confident%20and%20friendly%20high%20quality%20realistic&width=100&height=100&seq=1&orientation=squarish'
  },
  { 
    name: '李华', 
    role: '成员', 
    progress: 70, 
    online: true,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20Asian%20woman%20with%20medium%20length%20black%20hair%20wearing%20casual%20business%20attire%20with%20a%20neutral%20background%20looking%20confident%20and%20friendly%20high%20quality%20realistic&width=100&height=100&seq=2&orientation=squarish'
  },
  { 
    name: '王芳', 
    role: '成员', 
    progress: 60, 
    online: false,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20Asian%20woman%20with%20long%20black%20hair%20wearing%20casual%20business%20attire%20with%20a%20neutral%20background%20looking%20confident%20and%20friendly%20high%20quality%20realistic&width=100&height=100&seq=3&orientation=squarish'
  },
  { 
    name: '赵强', 
    role: '成员', 
    progress: 75, 
    online: true,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20Asian%20man%20with%20glasses%20and%20short%20black%20hair%20wearing%20casual%20business%20attire%20with%20a%20neutral%20background%20looking%20confident%20and%20friendly%20high%20quality%20realistic&width=100&height=100&seq=4&orientation=squarish'
  }
]);

// 积分排行榜数据
const leaderboard = ref([
  { 
    name: '张明', 
    points: 850,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20Asian%20man%20with%20short%20black%20hair%20wearing%20casual%20business%20attire%20with%20a%20neutral%20background%20looking%20confident%20and%20friendly%20high%20quality%20realistic&width=100&height=100&seq=1&orientation=squarish'
  },
  { 
    name: '赵强', 
    points: 720,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20Asian%20man%20with%20glasses%20and%20short%20black%20hair%20wearing%20casual%20business%20attire%20with%20a%20neutral%20background%20looking%20confident%20and%20friendly%20high%20quality%20realistic&width=100&height=100&seq=4&orientation=squarish'
  },
  { 
    name: '李华', 
    points: 680,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20Asian%20woman%20with%20medium%20length%20black%20hair%20wearing%20casual%20business%20attire%20with%20a%20neutral%20background%20looking%20confident%20and%20friendly%20high%20quality%20realistic&width=100&height=100&seq=2&orientation=squarish'
  },
  { 
    name: '王芳', 
    points: 620,
    avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20Asian%20woman%20with%20long%20black%20hair%20wearing%20casual%20business%20attire%20with%20a%20neutral%20background%20looking%20confident%20and%20friendly%20high%20quality%20realistic&width=100&height=100&seq=3&orientation=squarish'
  }
]);

const maxPoints = computed(() => {
  return Math.max(...leaderboard.value.map(user => user.points));
});

// 图表引用
const chartContainer = ref<HTMLElement | null>(null);
let chart: echarts.ECharts | null = null;

// 方法
const toggleListening = () => {
  isListening.value = !isListening.value;
  if (isListening.value) {
    // 模拟录音后获取回复
    setTimeout(() => {
      chatMessages.value.push({ 
        text: '请问有什么可以帮到您？', 
        isUser: false 
      });
      isListening.value = false;
    }, 2000);
  }
};

const toggleTask = (index: number) => {
  tasks.value[index].completed = !tasks.value[index].completed;
};

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case '高优先级':
      return 'bg-red-100 text-red-700';
    case '中优先级':
      return 'bg-yellow-100 text-yellow-700';
    case '低优先级':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const checkIn = () => {
  hasCheckedIn.value = true;
  consecutiveDays.value++;
  checkedInDays.value[5] = true; // 今天是第6天（索引5）
};

const getCheckInDayClass = (day: number) => {
  const dayIndex = day - 1;
  if (dayIndex === 5 && !checkedInDays.value[dayIndex]) {
    // 今天未签到
    return 'bg-white border-2 border-indigo-200 text-indigo-600';
  } else if (dayIndex > 5) {
    // 未来日期
    return 'bg-indigo-300 text-white';
  } else if (checkedInDays.value[dayIndex]) {
    // 已签到
    return 'bg-white text-indigo-600';
  } else {
    // 未签到
    return 'bg-indigo-400 text-white';
  }
};

const getDayLabel = (day: number) => {
  const days = ['一', '二', '三', '四', '五', '六', '日'];
  return days[day - 1];
};

const getDayDate = (day: number) => {
  const today = new Date('2025-05-18');
  const dayOffset = day - 7; // 假设今天是周日（第7天），计算偏移量
  const date = new Date(today);
  date.setDate(today.getDate() + dayOffset);
  return `${date.getDate()}日`;
};

const getLeaderboardRankClass = (index: number) => {
  switch (index) {
    case 0:
      return 'bg-yellow-500 text-white';
    case 1:
      return 'bg-gray-300 text-white';
    case 2:
      return 'bg-yellow-700 text-white';
    default:
      return 'bg-gray-200 text-gray-600';
  }
};

// 初始化图表
onMounted(() => {
  if (chartContainer.value) {
    chart = echarts.init(chartContainer.value);
    
    const option = {
      animation: false,
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['学习时长', '任务完成率'],
        right: 10,
        top: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: [
        {
          type: 'value',
          name: '小时',
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#5470C6'
            }
          },
          axisLabel: {
            formatter: '{value} h'
          }
        },
        {
          type: 'value',
          name: '完成率',
          position: 'right',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#91CC75'
            }
          },
          axisLabel: {
            formatter: '{value} %'
          },
          max: 100
        }
      ],
      series: [
        {
          name: '学习时长',
          type: 'line',
          smooth: true,
          data: [3.5, 4.2, 5.1, 3.8, 4.5, 6.2, 5.8],
          itemStyle: {
            color: '#5470C6'
          }
        },
        {
          name: '任务完成率',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          data: [60, 75, 85, 70, 80, 90, 85],
          itemStyle: {
            color: '#91CC75'
          }
        }
      ]
    };
    
    chart.setOption(option);
    
    window.addEventListener('resize', () => {
      chart?.resize();
    });
  }
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.25em;
  height: 1.25em;
  border: 2px solid #cbd5e1;
  border-radius: 0.25em;
  display: grid;
  place-content: center;
}

input[type="checkbox"]:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em white;
  transform-origin: center;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}
</style>

