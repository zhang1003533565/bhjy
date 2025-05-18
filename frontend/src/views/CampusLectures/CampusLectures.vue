<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 添加 Header 组件 -->
    <Header />
    <!-- 顶部筛选区域 -->
    <div class="sticky top-0 z-10 bg-white shadow-sm px-6 py-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">校园讲座活动</h1>
        <div class="flex flex-wrap gap-6">
          <!-- 讲座类型筛选 -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-1">讲座类型</label>
            <div class="relative">
              <button 
                @click="toggleDropdown('type')" 
                class="cursor-pointer !rounded-button whitespace-nowrap bg-white border border-gray-300 rounded-md py-2 px-4 flex items-center justify-between w-40 text-gray-700 focus:outline-none"
              >
                {{ selectedType || '全部类型' }}
                <i class="fas fa-chevron-down ml-2 text-gray-500"></i>
              </button>
              <div 
                v-if="dropdowns.type" 
                class="absolute mt-1 w-full bg-white shadow-lg rounded-md z-10 border border-gray-200"
              >
                <div 
                  v-for="type in lectureTypes" 
                  :key="type"
                  @click="selectType(type)"
                  class="cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  {{ type }}
                </div>
              </div>
            </div>
          </div>

          <!-- 时间范围筛选 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">时间范围</label>
            <div class="flex border border-gray-300 rounded-md overflow-hidden">
              <button 
                v-for="(period, index) in timePeriods" 
                :key="period"
                @click="selectedTimePeriod = period"
                :class="[
                  'cursor-pointer !rounded-button whitespace-nowrap py-2 px-4 text-sm focus:outline-none',
                  selectedTimePeriod === period 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                ]"
              >
                {{ period }}
              </button>
            </div>
          </div>

          <!-- 状态筛选 -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">状态</label>
            <div class="flex border border-gray-300 rounded-md overflow-hidden">
              <button 
                v-for="status in statuses" 
                :key="status"
                @click="selectedStatus = status"
                :class="[
                  'cursor-pointer !rounded-button whitespace-nowrap py-2 px-4 text-sm focus:outline-none',
                  selectedStatus === status 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                ]"
              >
                {{ status }}
              </button>
            </div>
          </div>
          
          <!-- 重置按钮 -->
          <div class="self-end">
            <button 
              @click="resetFilters"
              class="cursor-pointer !rounded-button whitespace-nowrap bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md focus:outline-none"
            >
              <i class="fas fa-redo-alt mr-2"></i>重置筛选
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- 无数据状态 -->
      <div v-if="filteredLectures.length === 0" class="flex flex-col items-center justify-center py-16">
        <img 
          :src="noDataImageUrl" 
          alt="暂无讲座" 
          class="w-64 h-64 object-contain mb-6"
        />
        <p class="text-gray-500 text-lg mb-4">暂无符合条件的讲座活动</p>
        <button 
          @click="resetFilters"
          class="cursor-pointer !rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md focus:outline-none"
        >
          重置筛选
        </button>
      </div>

      <!-- 讲座列表 -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="lecture in paginatedLectures" 
          :key="lecture.id"
          class="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50"
        >
          <div class="relative overflow-hidden" @click="openLectureDetail(lecture)" style="cursor: pointer">
            <img 
              :src="lecture.coverImage" 
              :alt="lecture.title" 
              class="w-full h-48 object-cover object-top"
            />
            <div 
              class="absolute top-2 right-2 px-2 py-1 text-xs rounded-full"
              :class="{
                'bg-green-100 text-green-800': lecture.status === '即将开始',
                'bg-blue-100 text-blue-800': lecture.status === '进行中',
                'bg-gray-100 text-gray-800': lecture.status === '已结束'
              }"
            >
              {{ lecture.status }}
            </div>
          </div>
          <div class="p-4">
            <h3 
              class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 h-14 cursor-pointer"
              @click="openLectureDetail(lecture)"
            >
              {{ lecture.title }}
            </h3>
            <div class="flex items-center text-gray-600 mb-2">
              <i class="fas fa-calendar-alt text-gray-400 mr-2"></i>
              <span class="text-sm">{{ lecture.date }} {{ lecture.time }}</span>
            </div>
            <div class="flex items-center text-gray-600 mb-3">
              <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
              <span class="text-sm">{{ lecture.location }}</span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <img 
                  :src="lecture.speakerAvatar" 
                  :alt="lecture.speaker" 
                  class="w-8 h-8 rounded-full object-cover mr-2"
                />
                <span class="text-sm text-gray-700">{{ lecture.speaker }}</span>
              </div>
              <button 
                @click="openLectureDetail(lecture)"
                class="cursor-pointer !rounded-button whitespace-nowrap text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                查看详情 <i class="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页控制 -->
      <div v-if="filteredLectures.length > 0" class="mt-10 flex justify-center">
        <div class="flex items-center space-x-1">
          <button 
            @click="currentPage > 1 && (currentPage--)"
            :disabled="currentPage === 1"
            :class="[
              'cursor-pointer !rounded-button whitespace-nowrap px-4 py-2 border rounded-md',
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <button 
            v-for="page in totalPages" 
            :key="page"
            @click="currentPage = page"
            :class="[
              'cursor-pointer !rounded-button whitespace-nowrap w-10 h-10 flex items-center justify-center border rounded-md',
              currentPage === page 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            {{ page }}
          </button>
          
          <button 
            @click="currentPage < totalPages && (currentPage++)"
            :disabled="currentPage === totalPages"
            :class="[
              'cursor-pointer !rounded-button whitespace-nowrap px-4 py-2 border rounded-md',
              currentPage === totalPages 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            ]"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 讲座详情弹窗 -->
    <div 
      v-if="selectedLecture" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div 
        class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="relative">
          <img 
            :src="selectedLecture.coverImage" 
            :alt="selectedLecture.title" 
            class="w-full h-64 object-cover object-top"
          />
          <button 
            @click="closeModal" 
            class="cursor-pointer !rounded-button whitespace-nowrap absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70"
          >
            <i class="fas fa-times"></i>
          </button>
          <div 
            class="absolute bottom-4 right-4 px-3 py-1 rounded-full text-sm"
            :class="{
              'bg-green-100 text-green-800': selectedLecture.status === '即将开始',
              'bg-blue-100 text-blue-800': selectedLecture.status === '进行中',
              'bg-gray-100 text-gray-800': selectedLecture.status === '已结束'
            }"
          >
            {{ selectedLecture.status }}
          </div>
        </div>
        
        <div class="p-6">
          <div class="flex flex-col md:flex-row gap-6">
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ selectedLecture.title }}</h2>
              
              <div class="flex flex-wrap gap-y-3 mb-6">
                <div class="flex items-center text-gray-600 mr-6">
                  <i class="fas fa-calendar-alt text-gray-400 mr-2"></i>
                  <span>{{ selectedLecture.date }} {{ selectedLecture.time }}</span>
                </div>
                <div class="flex items-center text-gray-600 mr-6">
                  <i class="fas fa-map-marker-alt text-gray-400 mr-2"></i>
                  <span>{{ selectedLecture.location }}</span>
                </div>
                <div class="flex items-center text-gray-600">
                  <i class="fas fa-user text-gray-400 mr-2"></i>
                  <span>{{ selectedLecture.speaker }}</span>
                </div>
              </div>
              
              <!-- 标签页导航 -->
              <div class="border-b border-gray-200 mb-6">
                <div class="flex -mb-px">
                  <button 
                    v-for="tab in tabs" 
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="[
                      'cursor-pointer !rounded-button whitespace-nowrap py-3 px-4 text-sm font-medium border-b-2 focus:outline-none',
                      activeTab === tab.id 
                        ? 'border-blue-600 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    ]"
                  >
                    {{ tab.name }}
                  </button>
                </div>
              </div>
              
              <!-- 标签页内容 -->
              <div v-if="activeTab === 'description'" class="prose max-w-none">
                <p class="text-gray-700 whitespace-pre-line">{{ selectedLecture.description }}</p>
              </div>
              
              <div v-if="activeTab === 'speaker'" class="prose max-w-none">
                <div class="flex items-center mb-4">
                  <img 
                    :src="selectedLecture.speakerAvatar" 
                    :alt="selectedLecture.speaker" 
                    class="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">{{ selectedLecture.speaker }}</h3>
                    <p class="text-gray-600">{{ selectedLecture.speakerTitle }}</p>
                  </div>
                </div>
                <p class="text-gray-700 whitespace-pre-line">{{ selectedLecture.speakerBio }}</p>
              </div>
              
              <div v-if="activeTab === 'organizer'" class="prose max-w-none">
                <div class="flex items-center mb-4">
                  <img 
                    :src="selectedLecture.organizerLogo" 
                    :alt="selectedLecture.organizer" 
                    class="w-16 h-16 object-contain mr-4"
                  />
                  <h3 class="text-lg font-medium text-gray-900">{{ selectedLecture.organizer }}</h3>
                </div>
                <p class="text-gray-700 whitespace-pre-line">{{ selectedLecture.organizerInfo }}</p>
              </div>
              
              <!-- 评论区 -->
              <div v-if="activeTab === 'comments'" class="mt-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">评论 ({{ selectedLecture.comments.length }})</h3>
                
                <div v-if="selectedLecture.comments.length === 0" class="text-center py-8">
                  <p class="text-gray-500">暂无评论，快来发表第一条评论吧！</p>
                </div>
                
                <div v-else class="space-y-4">
                  <div 
                    v-for="(comment, index) in selectedLecture.comments" 
                    :key="index"
                    class="bg-gray-50 p-4 rounded-lg"
                  >
                    <div class="flex items-start">
                      <img 
                        :src="comment.avatar" 
                        :alt="comment.name" 
                        class="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div class="flex-1">
                        <div class="flex justify-between items-center mb-1">
                          <h4 class="font-medium text-gray-900">{{ comment.name }}</h4>
                          <span class="text-xs text-gray-500">{{ comment.time }}</span>
                        </div>
                        <p class="text-gray-700">{{ comment.content }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 评论输入框 -->
                <div class="mt-6">
                  <div class="flex items-start">
                    <img 
                      src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20asian%20student%20with%20a%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20photo&width=100&height=100&seq=avatar1&orientation=squarish" 
                      alt="用户头像" 
                      class="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div class="flex-1">
                      <textarea 
                        v-model="commentText"
                        placeholder="写下你的评论..." 
                        class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                      ></textarea>
                      <div class="flex justify-end mt-2">
                        <button 
                          @click="addComment"
                          class="cursor-pointer !rounded-button whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none"
                          :disabled="!commentText.trim()"
                          :class="{'opacity-50 cursor-not-allowed': !commentText.trim()}"
                        >
                          发表评论
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="md:w-64">
              <div class="bg-gray-50 p-4 rounded-lg mb-4">
                <h3 class="font-medium text-gray-900 mb-3">讲座信息</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex items-center text-gray-700">
                    <i class="fas fa-tag text-gray-400 mr-2 w-5"></i>
                    <span>{{ selectedLecture.type }}</span>
                  </div>
                  <div class="flex items-center text-gray-700">
                    <i class="fas fa-users text-gray-400 mr-2 w-5"></i>
                    <span>限制人数: {{ selectedLecture.capacity }}人</span>
                  </div>
                  <div class="flex items-center text-gray-700">
                    <i class="fas fa-clock text-gray-400 mr-2 w-5"></i>
                    <span>时长: {{ selectedLecture.duration }}</span>
                  </div>
                </div>
              </div>
              
              <button 
                class="cursor-pointer !rounded-button whitespace-nowrap w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium mb-4 focus:outline-none flex items-center justify-center"
                :class="{'opacity-50 cursor-not-allowed': selectedLecture.status === '已结束'}"
                :disabled="selectedLecture.status === '已结束'"
              >
                <i class="fas fa-ticket-alt mr-2"></i>
                {{ selectedLecture.status === '已结束' ? '报名已截止' : '立即报名' }}
              </button>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-medium text-gray-900 mb-3">分享讲座</h3>
                <div class="flex justify-between mb-4">
                  <button class="cursor-pointer !rounded-button whitespace-nowrap w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
                    <i class="fab fa-weixin"></i>
                  </button>
                  <button class="cursor-pointer !rounded-button whitespace-nowrap w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
                    <i class="fab fa-weibo"></i>
                  </button>
                  <button class="cursor-pointer !rounded-button whitespace-nowrap w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
                    <i class="fas fa-link"></i>
                  </button>
                  <button class="cursor-pointer !rounded-button whitespace-nowrap w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
                    <i class="fas fa-qrcode"></i>
                  </button>
                </div>
                <div class="text-center">
                  <img 
                    :src="qrCodeUrl" 
                    alt="讲座二维码" 
                    class="w-32 h-32 mx-auto"
                  />
                  <p class="text-xs text-gray-500 mt-2">扫码分享讲座</p>
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

// 筛选条件数据
const lectureTypes = ['全部类型', '学术类', '技术类', '职业发展类'];
const timePeriods = ['今天', '本周', '本月', '全部'];
const statuses = ['全部', '即将开始', '进行中', '已结束'];

// 筛选条件状态
const selectedType = ref('全部类型');
const selectedTimePeriod = ref('全部');
const selectedStatus = ref('全部');
const dropdowns = ref({
  type: false,
});

// 分页状态
const currentPage = ref(1);
const pageSize = 9;

// 详情弹窗状态
const selectedLecture = ref(null);
const activeTab = ref('description');
const tabs = [
  { id: 'description', name: '讲座简介' },
  { id: 'speaker', name: '主讲人介绍' },
  { id: 'organizer', name: '主办方信息' },
  { id: 'comments', name: '评论区' }
];
const commentText = ref('');

// 图片资源
const noDataImageUrl = 'https://readdy.ai/api/search-image?query=minimalist%20illustration%20of%20an%20empty%20calendar%20or%20event%20schedule%2C%20with%20a%20soft%20color%20palette%2C%20showing%20no%20events%20or%20activities%2C%20clean%20and%20modern%20design%20style&width=400&height=400&seq=nodata1&orientation=squarish';
const qrCodeUrl = 'https://readdy.ai/api/search-image?query=QR%20code%20on%20a%20white%20background%2C%20high%20contrast%20black%20and%20white%2C%20clean%20and%20scannable%2C%20minimalist%20design&width=200&height=200&seq=qrcode1&orientation=squarish';

// 模拟讲座数据
const lectures = ref([
  {
    id: 1,
    title: '人工智能与未来教育发展趋势',
    type: '学术类',
    date: '2025-05-18',
    time: '14:00-16:00',
    location: '综合教学楼 A101',
    status: '即将开始',
    speaker: '张教授',
    speakerTitle: '计算机科学与技术学院教授',
    speakerBio: '张教授是计算机科学与技术学院的资深教授，主要研究方向为人工智能、机器学习和教育技术。他曾在多个国际顶级期刊发表论文，并获得多项国家级科研奖励。\n\n近年来，他致力于将人工智能技术应用于教育领域，开发了多个智能教育平台，为学生提供个性化学习体验。',
    speakerAvatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20an%20Asian%20male%20professor%20in%20his%2050s%20with%20glasses%2C%20wearing%20a%20business%20casual%20outfit%2C%20standing%20in%20front%20of%20a%20university%20building%2C%20natural%20lighting%2C%20professional%20headshot&width=200&height=200&seq=speaker1&orientation=squarish',
    description: '本次讲座将探讨人工智能技术如何改变传统教育模式，分析未来教育发展的主要趋势。讲座内容包括：\n\n1. 人工智能在教育中的应用现状\n2. 智能教育平台的设计与实现\n3. 个性化学习与自适应教学系统\n4. 教育大数据分析与应用\n5. 未来教育发展的挑战与机遇\n\n讲座结束后将有互动问答环节，欢迎各位同学积极参与！',
    coverImage: 'https://readdy.ai/api/search-image?query=futuristic%20classroom%20with%20AI%20technology%2C%20students%20using%20holographic%20displays%2C%20professor%20explaining%20concepts%20with%20interactive%203D%20models%2C%20bright%20modern%20educational%20environment%20with%20blue%20technological%20accents&width=600&height=400&seq=lecture1&orientation=landscape',
    organizer: '计算机科学与技术学院',
    organizerInfo: '计算机科学与技术学院成立于1978年，是我校最早设立的院系之一。学院拥有一支高水平的教师队伍，包括多名院士、长江学者和国家杰出青年科学基金获得者。\n\n学院致力于培养具有扎实理论基础和实践能力的计算机科学与技术人才，近年来在人工智能、大数据、云计算等领域取得了显著的科研成果。',
    organizerLogo: 'https://readdy.ai/api/search-image?query=modern%20university%20computer%20science%20department%20logo%2C%20blue%20and%20white%20color%20scheme%2C%20minimalist%20design%20with%20digital%20elements%2C%20professional%20academic%20emblem&width=200&height=200&seq=org1&orientation=squarish',
    capacity: 200,
    duration: '2小时',
    comments: [
      {
        name: '李同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20female%20student%20portrait%2C%20casual%20style%2C%20university%20campus%20background%2C%20natural%20lighting%2C%20friendly%20smile&width=100&height=100&seq=comment1&orientation=squarish',
        content: '张教授的讲座总是很有启发性，期待这次的分享！',
        time: '2025-05-17 10:23'
      },
      {
        name: '王同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20male%20student%20portrait%2C%20casual%20style%2C%20university%20campus%20background%2C%20natural%20lighting%2C%20friendly%20smile&width=100&height=100&seq=comment2&orientation=squarish',
        content: '人工智能与教育的结合是个很有前景的方向，希望能从讲座中获得一些研究灵感。',
        time: '2025-05-17 15:45'
      }
    ]
  },
  {
    id: 2,
    title: '区块链技术与金融创新',
    type: '技术类',
    date: '2025-05-19',
    time: '10:00-12:00',
    location: '经济管理学院报告厅',
    status: '即将开始',
    speaker: '李博士',
    speakerTitle: '金融科技研究中心主任',
    speakerBio: '李博士是我校金融科技研究中心主任，同时也是国内知名的区块链技术专家。他拥有剑桥大学计算机科学博士学位和哈佛大学金融学硕士学位。\n\n在加入学校前，他曾在多家国际知名金融机构和科技公司担任高级技术顾问，参与设计了多个大型区块链应用系统。他的研究成果已在国际顶级期刊发表，并获得多项专利。',
    speakerAvatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20Asian%20male%20business%20professional%20in%20his%2030s%2C%20wearing%20a%20suit%2C%20confident%20expression%2C%20office%20setting%2C%20professional%20headshot&width=200&height=200&seq=speaker2&orientation=squarish',
    description: '本次讲座将深入浅出地介绍区块链技术的基本原理及其在金融领域的创新应用。主要内容包括：\n\n1. 区块链技术基础：共识机制、分布式账本、智能合约\n2. 加密货币的发展历程与挑战\n3. 区块链在支付结算、供应链金融中的应用\n4. 数字货币与中央银行数字货币(CBDC)探索\n5. 区块链金融的监管与合规问题\n\n讲座面向所有对金融科技感兴趣的师生，不要求具备专业技术背景。',
    coverImage: 'https://readdy.ai/api/search-image?query=blockchain%20technology%20visualization%20with%20financial%20elements%2C%20digital%20blocks%20connected%20in%20a%20chain%2C%20floating%20cryptocurrency%20symbols%2C%20blue%20and%20gold%20color%20scheme%2C%20modern%20financial%20district%20background&width=600&height=400&seq=lecture2&orientation=landscape',
    organizer: '经济管理学院',
    organizerInfo: '经济管理学院成立于1985年，是我校重点建设的学院之一。学院设有金融学、会计学、市场营销等多个本科和研究生专业，拥有一支由海内外知名学者组成的师资队伍。\n\n学院注重理论与实践相结合的教学模式，与多家知名企业和金融机构建立了长期合作关系，为学生提供丰富的实习和就业机会。',
    organizerLogo: 'https://readdy.ai/api/search-image?query=business%20school%20logo%20design%2C%20professional%20academic%20emblem%2C%20blue%20and%20gold%20colors%2C%20financial%20and%20management%20symbols%2C%20clean%20corporate%20style&width=200&height=200&seq=org2&orientation=squarish',
    capacity: 150,
    duration: '2小时',
    comments: [
      {
        name: '张同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20male%20student%20portrait%2C%20business%20casual%20attire%2C%20university%20campus%20background%2C%20natural%20lighting%2C%20professional%20look&width=100&height=100&seq=comment3&orientation=squarish',
        content: '作为金融专业的学生，对区块链技术很感兴趣，希望能了解更多实际应用案例。',
        time: '2025-05-16 09:12'
      }
    ]
  },
  {
    id: 3,
    title: '职场软技能：有效沟通与团队协作',
    type: '职业发展类',
    date: '2025-05-20',
    time: '15:30-17:30',
    location: '就业指导中心多功能厅',
    status: '即将开始',
    speaker: '陈老师',
    speakerTitle: '资深职业发展顾问',
    speakerBio: '陈老师拥有超过15年的人力资源管理和职业咨询经验，曾在多家世界500强企业担任人力资源总监。她获得了美国康奈尔大学组织行为学硕士学位，并持有国际职业规划师认证。\n\n她擅长职业规划、面试技巧指导和职场软技能培训，已帮助数千名大学生成功踏入理想的职业道路。她编写的《职场新人生存指南》一书在国内多所高校被用作就业指导教材。',
    speakerAvatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20Asian%20female%20career%20counselor%2C%20business%20professional%20attire%2C%20warm%20and%20approachable%20expression%2C%20office%20setting%2C%20professional%20headshot&width=200&height=200&seq=speaker3&orientation=squarish',
    description: '在当今竞争激烈的职场环境中，专业技能固然重要，但软技能往往是决定职业发展上限的关键因素。本次讲座将聚焦两项核心职场软技能：有效沟通与团队协作。\n\n讲座内容包括：\n\n1. 职场沟通的常见障碍与解决方案\n2. 如何进行有效倾听与反馈\n3. 跨部门沟通的技巧与注意事项\n4. 冲突管理与问题解决\n5. 远程团队协作的挑战与应对\n\n讲座将通过案例分析、角色扮演等互动形式，帮助同学们掌握实用的职场沟通技巧。',
    coverImage: 'https://readdy.ai/api/search-image?query=professional%20team%20meeting%20in%20a%20modern%20office%2C%20diverse%20group%20of%20young%20professionals%20collaborating%20around%20a%20conference%20table%2C%20bright%20corporate%20environment%2C%20positive%20teamwork%20atmosphere&width=600&height=400&seq=lecture3&orientation=landscape',
    organizer: '就业指导中心',
    organizerInfo: '就业指导中心是学校专门为学生提供就业指导和职业发展服务的机构。中心提供一对一职业咨询、简历修改、模拟面试等服务，并定期举办招聘会、职业发展讲座和企业参观活动。\n\n中心与数百家知名企业建立了长期合作关系，为学生提供丰富的实习和就业机会。每年，中心还会发布《毕业生就业质量报告》，为学校人才培养提供参考。',
    organizerLogo: 'https://readdy.ai/api/search-image?query=university%20career%20center%20logo%2C%20professional%20design%20with%20graduation%20cap%20and%20briefcase%20elements%2C%20blue%20and%20green%20colors%2C%20academic%20and%20professional%20symbols&width=200&height=200&seq=org3&orientation=squarish',
    capacity: 100,
    duration: '2小时',
    comments: [
      {
        name: '刘同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20female%20student%20portrait%2C%20smart%20casual%20attire%2C%20university%20campus%20background%2C%20natural%20lighting%2C%20confident%20expression&width=100&height=100&seq=comment4&orientation=squarish',
        content: '即将毕业，正在找工作，希望能从讲座中学到一些实用的沟通技巧！',
        time: '2025-05-17 20:34'
      },
      {
        name: '赵同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20male%20student%20portrait%2C%20casual%20style%2C%20university%20library%20background%2C%20natural%20lighting%2C%20thoughtful%20expression&width=100&height=100&seq=comment5&orientation=squarish',
        content: '上次参加了陈老师的简历制作讲座，收获很大，这次一定不能错过！',
        time: '2025-05-18 08:15'
      }
    ]
  },
  {
    id: 4,
    title: '气候变化与可持续发展',
    type: '学术类',
    date: '2025-05-21',
    time: '09:30-11:30',
    location: '环境科学楼报告厅',
    status: '即将开始',
    speaker: '王教授',
    speakerTitle: '环境科学研究所所长',
    speakerBio: '王教授是国际知名的气候变化专家，现任我校环境科学研究所所长。他获得了麻省理工学院环境工程博士学位，曾参与联合国气候变化专门委员会(IPCC)的多项研究工作，是第五次评估报告的主要撰写人之一。\n\n他的研究领域包括气候变化影响评估、低碳经济转型和可持续发展战略。他发表的论文被引用超过10000次，并多次获得国家自然科学奖。',
    speakerAvatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20senior%20Asian%20male%20professor%20in%20his%2060s%2C%20academic%20attire%2C%20environmental%20research%20facility%20background%2C%20thoughtful%20and%20authoritative%20expression%2C%20professional%20headshot&width=200&height=200&seq=speaker4&orientation=squarish',
    description: '本次讲座将从科学、经济和政策多个角度，全面分析气候变化的现状、影响及应对策略。主要内容包括：\n\n1. 气候变化的科学证据与最新研究进展\n2. 气候变化对生态系统、经济和社会的影响\n3. 《巴黎协定》及全球气候治理框架\n4. 中国的碳达峰、碳中和战略与路径\n5. 个人和机构在应对气候变化中的责任与行动\n\n讲座旨在提高师生对气候变化问题的认识，激发大家参与可持续发展实践的热情。',
    coverImage: 'https://readdy.ai/api/search-image?query=climate%20change%20visualization%20with%20melting%20ice%20caps%2C%20rising%20sea%20levels%2C%20renewable%20energy%20solutions%20like%20wind%20turbines%20and%20solar%20panels%2C%20earth%20from%20space%20view%20with%20visible%20climate%20patterns%2C%20scientific%20and%20educational%20style&width=600&height=400&seq=lecture4&orientation=landscape',
    organizer: '环境科学研究所',
    organizerInfo: '环境科学研究所成立于1995年，是我校重点建设的科研机构之一。研究所下设气候变化研究中心、环境监测与评价中心、生态修复技术中心等多个研究部门。\n\n研究所拥有国家级重点实验室和多个省部级科研平台，承担了多项国家重大科研项目。研究所注重国际合作，与哈佛大学、牛津大学等国际知名高校建立了长期合作关系。',
    organizerLogo: 'https://readdy.ai/api/search-image?query=environmental%20science%20institute%20logo%2C%20academic%20research%20center%20emblem%2C%20green%20and%20blue%20colors%2C%20earth%20and%20leaf%20elements%2C%20scientific%20and%20professional%20design&width=200&height=200&seq=org4&orientation=squarish',
    capacity: 180,
    duration: '2小时',
    comments: []
  },
  {
    id: 5,
    title: '数据可视化与信息设计',
    type: '技术类',
    date: '2025-05-22',
    time: '13:00-15:00',
    location: '设计学院多媒体教室',
    status: '即将开始',
    speaker: '林设计师',
    speakerTitle: '资深数据可视化专家',
    speakerBio: '林设计师是国内知名的数据可视化专家，现任某科技公司数据体验设计总监。她毕业于罗德岛设计学院，获得交互设计硕士学位。\n\n她曾参与设计多个获奖的数据可视化项目，作品曾在《信息之美》年度大赛中获得金奖。她同时是《数据可视化：设计与实践》一书的作者，该书被多所高校采用为教材。',
    speakerAvatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20Asian%20female%20designer%20in%20her%2030s%2C%20creative%20professional%20attire%2C%20design%20studio%20background%2C%20artistic%20and%20confident%20expression%2C%20professional%20headshot&width=200&height=200&seq=speaker5&orientation=squarish',
    description: '在大数据时代，如何将复杂的数据转化为直观、有效的视觉表达，是一项重要的技能。本次讲座将介绍数据可视化的基本原理与实践技巧。\n\n讲座内容包括：\n\n1. 数据可视化的认知基础与设计原则\n2. 常见图表类型及其适用场景\n3. 交互式数据可视化设计方法\n4. 数据叙事与视觉故事讲述\n5. 数据可视化工具与技术生态\n\n讲座将结合大量实际案例，展示优秀的数据可视化作品，并进行设计分析。',
    coverImage: 'https://readdy.ai/api/search-image?query=data%20visualization%20concept%20with%20colorful%20charts%2C%20graphs%2C%20and%20infographics%20floating%20in%20a%20digital%20space%2C%20modern%20design%20studio%20with%20large%20screens%20displaying%20analytics%2C%20creative%20professional%20environment&width=600&height=400&seq=lecture5&orientation=landscape',
    organizer: '设计学院',
    organizerInfo: '设计学院成立于2000年，是我校培养创新设计人才的重要基地。学院设有视觉传达设计、产品设计、数字媒体艺术等多个专业，拥有一支由国内外知名设计师和学者组成的师资队伍。\n\n学院注重理论与实践相结合，建有现代化的设计实验室和创客空间，为学生提供良好的创作环境。学院与多家知名设计公司和文创机构保持密切合作，学生作品多次在国内外设计大赛中获奖。',
    organizerLogo: 'https://readdy.ai/api/search-image?query=design%20school%20logo%2C%20creative%20academic%20emblem%2C%20colorful%20geometric%20shapes%2C%20artistic%20and%20professional%20style%2C%20education%20and%20innovation%20theme&width=200&height=200&seq=org5&orientation=squarish',
    capacity: 80,
    duration: '2小时',
    comments: [
      {
        name: '孙同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20female%20student%20portrait%2C%20artistic%20style%2C%20design%20studio%20background%2C%20creative%20casual%20attire%2C%20expressive%20face&width=100&height=100&seq=comment6&orientation=squarish',
        content: '作为设计专业的学生，非常期待这次讲座！数据可视化是我一直想深入学习的领域。',
        time: '2025-05-16 14:27'
      }
    ]
  },
  {
    id: 6,
    title: '量子计算：原理与应用前景',
    type: '学术类',
    date: '2025-05-23',
    time: '14:00-16:00',
    location: '物理学院报告厅',
    status: '即将开始',
    speaker: '周教授',
    speakerTitle: '量子信息研究中心主任',
    speakerBio: '周教授是国际知名的量子物理学家，现任我校量子信息研究中心主任。他获得了普林斯顿大学物理学博士学位，曾在多个国际顶尖研究机构工作，包括美国国家标准与技术研究院(NIST)和欧洲核子研究中心(CERN)。\n\n他的研究领域包括量子计算、量子通信和量子密码学。他发表的论文被引用超过8000次，并获得多项国际科学奖项，包括国际理论物理中心狄拉克奖章。',
    speakerAvatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20Asian%20male%20physics%20professor%2C%20academic%20attire%2C%20physics%20laboratory%20background%2C%20intelligent%20and%20scholarly%20expression%2C%20professional%20headshot&width=200&height=200&seq=speaker6&orientation=squarish',
    description: '量子计算被认为是计算技术的下一次革命，有望解决经典计算机难以处理的复杂问题。本次讲座将介绍量子计算的基本原理及其潜在应用。\n\n讲座内容包括：\n\n1. 量子力学基础：叠加态、纠缠和量子测量\n2. 量子比特与量子门：量子计算的基本单元\n3. 量子算法：Shor算法、Grover算法等\n4. 量子计算的工程实现：超导量子计算、离子阱量子计算等\n5. 量子计算的应用前景：密码破解、材料设计、药物发现等\n\n讲座将尽量用通俗易懂的语言解释复杂的量子概念，适合各专业背景的师生参加。',
    coverImage: 'https://readdy.ai/api/search-image?query=quantum%20computing%20visualization%20with%20quantum%20bits%20in%20superposition%2C%20complex%20mathematical%20equations%20floating%20in%20space%2C%20futuristic%20laboratory%20with%20advanced%20quantum%20processors%2C%20blue%20and%20purple%20technological%20glow&width=600&height=400&seq=lecture6&orientation=landscape',
    organizer: '物理学院',
    organizerInfo: '物理学院成立于1952年，是我校历史最悠久的院系之一。学院设有理论物理、凝聚态物理、光学与光电子学等多个研究方向，拥有多个国家重点实验室和研究中心。\n\n学院师资力量雄厚，包括多名中国科学院院士和国家杰出青年科学基金获得者。学院注重基础研究与应用研究相结合，在量子物理、高能物理、天体物理等领域取得了一系列重要成果。',
    organizerLogo: 'https://readdy.ai/api/search-image?query=physics%20department%20logo%2C%20academic%20scientific%20emblem%2C%20atom%20and%20wave%20symbols%2C%20blue%20and%20silver%20colors%2C%20professional%20and%20scholarly%20design&width=200&height=200&seq=org6&orientation=squarish',
    capacity: 150,
    duration: '2小时',
    comments: [
      {
        name: '郑同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20male%20student%20portrait%2C%20smart%20casual%20attire%2C%20physics%20laboratory%20background%2C%20intellectual%20expression%2C%20glasses&width=100&height=100&seq=comment7&orientation=squarish',
        content: '量子计算太神奇了！希望能了解一下目前研究的最新进展。',
        time: '2025-05-17 16:42'
      },
      {
        name: '吴同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20female%20student%20portrait%2C%20casual%20style%2C%20university%20library%20background%2C%20studious%20expression%2C%20glasses&width=100&height=100&seq=comment8&orientation=squarish',
        content: '作为计算机专业的学生，对量子计算很感兴趣，但基础物理知识有限，讲座会不会太难理解？',
        time: '2025-05-18 09:31'
      },
      {
        name: '周教授',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20Asian%20male%20physics%20professor%2C%20academic%20attire%2C%20physics%20laboratory%20background%2C%20intelligent%20and%20scholarly%20expression%2C%20professional%20headshot&width=200&height=200&seq=speaker6&orientation=squarish',
        content: '吴同学不用担心，讲座会尽量用通俗易懂的语言和类比来解释量子概念，不会涉及太多数学推导。欢迎参加！',
        time: '2025-05-18 10:05'
      }
    ]
  },
  {
    id: 7,
    title: '创业经验分享：从校园到独角兽',
    type: '职业发展类',
    date: '2025-05-24',
    time: '19:00-21:00',
    location: '创新创业中心报告厅',
    status: '即将开始',
    speaker: '黄创始人',
    speakerTitle: '科技创业公司CEO',
    speakerBio: '黄创始人是我校计算机科学专业2010届校友，某知名科技创业公司创始人兼CEO。他在校期间就展现出了卓越的创新能力和领导才能，曾获得多项创新创业大赛奖项。\n\n毕业后，他与几位同学共同创办了一家人工智能技术公司，专注于计算机视觉领域。公司成立仅5年，估值已超过10亿美元，成为行业内的独角兽企业。他本人也被《福布斯》评为"30位30岁以下创业者"之一。',
    speakerAvatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20Asian%20male%20tech%20entrepreneur%20in%20his%20early%2030s%2C%20smart%20casual%20business%20attire%2C%20modern%20tech%20office%20background%2C%20confident%20and%20visionary%20expression%2C%20professional%20headshot&width=200&height=200&seq=speaker7&orientation=squarish',
    description: '本次讲座将分享一位校友从大学生到创业成功的完整历程，为有创业梦想的同学提供宝贵经验。\n\n讲座内容包括：\n\n1. 创业初期：如何发现机会、组建团队、获取第一笔融资\n2. 产品开发：从原型到市场化产品的迭代过程\n3. 团队管理：初创企业的人才招聘与文化建设\n4. 融资之路：天使轮到C轮的融资经验与教训\n5. 校园创业的优势与挑战\n\n讲座结束后将有互动环节，参与者可以向嘉宾提问，并有机会获得创业指导。',
    coverImage: 'https://readdy.ai/api/search-image?query=startup%20founder%20presenting%20to%20a%20group%20of%20university%20students%20in%20a%20modern%20auditorium%2C%20entrepreneurship%20workshop%20atmosphere%2C%20tech%20startup%20slides%20on%20screen%2C%20engaged%20young%20audience%2C%20inspirational%20business%20environment&width=600&height=400&seq=lecture7&orientation=landscape',
    organizer: '创新创业中心',
    organizerInfo: '创新创业中心成立于2015年，是学校为培养学生创新精神和创业能力而设立的专门机构。中心提供创业教育、项目孵化、创业指导等全方位服务。\n\n中心设有创业实验室、路演厅、创客空间等功能区域，为学生创业项目提供良好的物理空间。中心还设立了创业基金，为优秀创业项目提供种子资金支持。每年，中心举办"挑战杯"创业大赛、创新创业训练营等活动，激发学生的创新创业热情。',
    organizerLogo: 'https://readdy.ai/api/search-image?query=university%20innovation%20and%20entrepreneurship%20center%20logo%2C%20startup%20incubator%20emblem%2C%20lightbulb%20and%20rocket%20symbols%2C%20blue%20and%20orange%20colors%2C%20modern%20and%20dynamic%20design&width=200&height=200&seq=org7&orientation=squarish',
    capacity: 200,
    duration: '2小时',
    comments: [
      {
        name: '陈同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20male%20student%20portrait%2C%20business%20casual%20attire%2C%20startup%20office%20background%2C%20ambitious%20expression&width=100&height=100&seq=comment9&orientation=squarish',
        content: '作为一名有创业想法的学生，非常期待能从黄学长的经验中获得启发！',
        time: '2025-05-16 18:23'
      }
    ]
  },
  {
    id: 8,
    title: '生物医学工程前沿技术',
    type: '学术类',
    date: '2025-05-25',
    time: '10:00-12:00',
    location: '医学院学术报告厅',
    status: '即将开始',
    speaker: '林教授',
    speakerTitle: '生物医学工程研究所所长',
    speakerBio: '林教授是国际知名的生物医学工程专家，现任我校生物医学工程研究所所长。她获得了斯坦福大学生物医学工程博士学位，曾在哈佛医学院担任研究员。\n\n她的研究领域包括生物传感器、医学影像和再生医学。她发表的论文被引用超过12000次，拥有多项国际专利。她领导的团队开发的便携式生物传感器已成功应用于多家医院的临床诊断。',
    speakerAvatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20Asian%20female%20biomedical%20engineering%20professor%2C%20lab%20coat%2C%20medical%20research%20facility%20background%2C%20intelligent%20and%20compassionate%20expression%2C%20professional%20headshot&width=200&height=200&seq=speaker8&orientation=squarish',
    description: '生物医学工程是医学与工程学交叉的前沿领域，正在改变医疗健康的未来。本次讲座将介绍该领域的最新研究进展。\n\n讲座内容包括：\n\n1. 生物传感器与可穿戴医疗设备\n2. 医学影像技术的新发展\n3. 组织工程与再生医学\n4. 纳米医学与靶向药物递送\n5. 人工智能在医疗诊断中的应用\n\n讲座将展示多个前沿研究案例，包括我校生物医学工程研究所的最新成果。',
    coverImage: 'https://readdy.ai/api/search-image?query=biomedical%20engineering%20laboratory%20with%20advanced%20equipment%2C%20researchers%20working%20with%20medical%20imaging%20devices%20and%20tissue%20engineering%20setups%2C%20futuristic%20medical%20technology%2C%20clean%20and%20high-tech%20environment%20with%20blue%20lighting&width=600&height=400&seq=lecture8&orientation=landscape',
    organizer: '医学院',
    organizerInfo: '医学院成立于1928年，是我校历史最悠久的院系之一。学院设有基础医学、临床医学、公共卫生等多个专业，拥有三所附属医院和多个研究所。\n\n学院师资力量雄厚，包括多名中国科学院院士和长江学者。学院注重医学教育与科研相结合，培养了大批优秀医学人才。近年来，学院积极推动医工结合，与工学院共建生物医学工程学科，取得了显著成果。',
    organizerLogo: 'https://readdy.ai/api/search-image?query=medical%20school%20logo%2C%20academic%20healthcare%20emblem%2C%20caduceus%20and%20DNA%20symbols%2C%20blue%20and%20white%20colors%2C%20professional%20and%20clinical%20design&width=200&height=200&seq=org8&orientation=squarish',
    capacity: 120,
    duration: '2小时',
    comments: []
  },
  {
    id: 9,
    title: '人文视角下的科技伦理',
    type: '学术类',
    date: '2025-05-26',
    time: '15:00-17:00',
    location: '人文学院报告厅',
    status: '即将开始',
    speaker: '赵教授',
    speakerTitle: '科技伦理研究中心主任',
    speakerBio: '赵教授是国内知名的科技伦理学者，现任我校科技伦理研究中心主任。她获得了牛津大学哲学博士学位，研究领域包括人工智能伦理、生命伦理学和科技政策。\n\n她曾担任国家科技伦理委员会委员，参与制定多项科技伦理指南。她著有《技术时代的伦理思考》《人工智能与人类未来》等多部学术著作，被翻译成多种语言出版。',
    speakerAvatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20Asian%20female%20philosophy%20professor%2C%20elegant%20academic%20attire%2C%20university%20office%20with%20bookshelves%20background%2C%20thoughtful%20and%20wise%20expression%2C%20professional%20headshot&width=200&height=200&seq=speaker9&orientation=squarish',
    description: '随着科技的快速发展，伦理问题日益凸显。本次讲座将从人文视角探讨科技发展中的伦理挑战。\n\n讲座内容包括：\n\n1. 人工智能伦理：算法偏见、隐私保护与责任归属\n2. 生命科技伦理：基因编辑、辅助生殖技术的伦理边界\n3. 数据伦理：大数据时代的隐私与公共利益平衡\n4. 环境伦理：科技发展与可持续发展的张力\n5. 科技伦理的制度建设与治理框架\n\n讲座旨在促进理工科与人文社科的对话，培养学生的伦理意识和责任感。',
    coverImage: 'https://readdy.ai/api/search-image?query=philosophical%20discussion%20about%20technology%20ethics%20in%20a%20university%20setting%2C%20diverse%20group%20of%20academics%20and%20students%20debating%2C%20digital%20ethics%20concepts%20visualized%20on%20screens%2C%20thoughtful%20academic%20atmosphere%20with%20warm%20lighting&width=600&height=400&seq=lecture9&orientation=landscape',
    organizer: '人文学院',
    organizerInfo: '人文学院成立于1985年，是我校人文社会科学研究和教学的重要基地。学院设有哲学、历史学、文学等多个系，以及科技伦理研究中心、文化遗产保护研究中心等专业研究机构。\n\n学院致力于培养具有深厚人文素养和批判思维能力的人才，注重人文学科与自然科学、工程技术的交叉融合。学院定期举办"人文与科技对话"系列讲座，促进不同学科间的交流与合作。',
    organizerLogo: 'https://readdy.ai/api/search-image?query=humanities%20college%20logo%2C%20academic%20cultural%20emblem%2C%20book%20and%20quill%20symbols%2C%20burgundy%20and%20gold%20colors%2C%20classical%20and%20scholarly%20design&width=200&height=200&seq=org9&orientation=squarish',
    capacity: 100,
    duration: '2小时',
    comments: [
      {
        name: '杨同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20female%20student%20portrait%2C%20thoughtful%20expression%2C%20university%20humanities%20building%20background%2C%20casual%20intellectual%20style&width=100&height=100&seq=comment10&orientation=squarish',
        content: '作为计算机专业的学生，越来越感受到伦理问题的重要性，期待这次跨学科的讲座！',
        time: '2025-05-17 21:15'
      }
    ]
  },
  {
    id: 10,
    title: '深度学习在自然语言处理中的应用',
    type: '技术类',
    date: '2025-05-15',
    time: '14:00-16:00',
    location: '计算机学院报告厅',
    status: '已结束',
    speaker: '刘教授',
    speakerTitle: '人工智能研究所副所长',
    speakerBio: '刘教授是国际知名的自然语言处理专家，现任我校人工智能研究所副所长。他获得了卡内基梅隆大学计算机科学博士学位，研究领域包括深度学习、自然语言处理和知识图谱。\n\n他曾在谷歌AI研究院工作，参与开发了多个大型语言模型。回国后，他致力于推动中文自然语言处理技术的发展，带领团队开发了国内领先的中文语言理解系统。',
    speakerAvatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20Asian%20male%20computer%20science%20professor%2C%20casual%20tech%20professional%20attire%2C%20AI%20research%20lab%20background%2C%20intelligent%20and%20focused%20expression%2C%20professional%20headshot&width=200&height=200&seq=speaker10&orientation=squarish',
    description: '自然语言处理是人工智能的重要分支，近年来随着深度学习技术的发展取得了突破性进展。本次讲座将介绍深度学习在自然语言处理中的最新应用。\n\n讲座内容包括：\n\n1. 深度学习基础：神经网络、反向传播、梯度下降\n2. 自然语言处理的核心任务：分词、词性标注、命名实体识别等\n3. 深度学习模型：RNN、LSTM、Transformer架构\n4. 预训练语言模型：BERT、GPT系列及其应用\n5. 实际案例分析：智能问答、机器翻译、文本生成\n\n讲座将结合代码示例，展示如何使用深度学习框架构建自然语言处理模型。',
    coverImage: 'https://readdy.ai/api/search-image?query=natural%20language%20processing%20visualization%20with%20neural%20networks%2C%20text%20data%20flowing%20through%20AI%20algorithms%2C%20computer%20code%20and%20language%20patterns%2C%20digital%20brain%20analyzing%20text%2C%20high-tech%20computing%20environment%20with%20blue%20technological%20glow&width=600&height=400&seq=lecture10&orientation=landscape',
    organizer: '计算机科学与技术学院',
    organizerInfo: '计算机科学与技术学院成立于1978年，是我校最早设立的院系之一。学院拥有一支高水平的教师队伍，包括多名院士、长江学者和国家杰出青年科学基金获得者。\n\n学院致力于培养具有扎实理论基础和实践能力的计算机科学与技术人才，近年来在人工智能、大数据、云计算等领域取得了显著的科研成果。',
    organizerLogo: 'https://readdy.ai/api/search-image?query=computer%20science%20department%20logo%2C%20academic%20technology%20emblem%2C%20binary%20code%20and%20processor%20symbols%2C%20blue%20and%20silver%20colors%2C%20modern%20and%20digital%20design&width=200&height=200&seq=org10&orientation=squarish',
    capacity: 200,
    duration: '2小时',
    comments: [
      {
        name: '林同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20male%20student%20portrait%2C%20tech%20casual%20style%2C%20computer%20lab%20background%2C%20focused%20expression%2C%20glasses&width=100&height=100&seq=comment11&orientation=squarish',
        content: '讲座非常精彩，刘教授讲解深入浅出，让我对Transformer架构有了更清晰的理解！',
        time: '2025-05-15 16:30'
      },
      {
        name: '张同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20female%20student%20portrait%2C%20casual%20tech%20style%2C%20university%20campus%20background%2C%20intelligent%20expression&width=100&height=100&seq=comment12&orientation=squarish',
        content: '请问有讲座的回放或者PPT吗？因为课程冲突没能参加，但内容很感兴趣。',
        time: '2025-05-16 09:45'
      },
      {
        name: '管理员',
        avatar: 'https://readdy.ai/api/search-image?query=professional%20university%20staff%20portrait%2C%20business%20attire%2C%20office%20background%2C%20helpful%20expression&width=100&height=100&seq=admin1&orientation=squarish',
        content: '张同学，讲座回放将在近期上传到学校网站，PPT已发送到参会者邮箱，你可以联系计算机学院教务办获取。',
        time: '2025-05-16 11:20'
      }
    ]
  },
  {
    id: 11,
    title: '国际商务谈判策略与技巧',
    type: '职业发展类',
    date: '2025-05-16',
    time: '15:00-17:00',
    location: '商学院报告厅',
    status: '已结束',
    speaker: '吴教授',
    speakerTitle: '国际商务系主任',
    speakerBio: '吴教授是国际商务领域的资深专家，现任我校商学院国际商务系主任。她获得了宾夕法尼亚大学沃顿商学院工商管理博士学位，曾在多家跨国公司担任高管职务。\n\n她的研究领域包括跨文化商务谈判、国际市场进入策略和全球供应链管理。她著有《跨文化商务谈判》《国际商务实务》等多部教材，被国内多所高校采用。',
    speakerAvatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20Asian%20female%20business%20professor%2C%20elegant%20business%20attire%2C%20university%20office%20background%2C%20confident%20and%20professional%20expression%2C%20professional%20headshot&width=200&height=200&seq=speaker11&orientation=squarish',
    description: '在全球化背景下，国际商务谈判能力已成为商业人才的核心竞争力之一。本次讲座将分享国际商务谈判的策略与技巧。\n\n讲座内容包括：\n\n1. 国际商务谈判的基本框架与流程\n2. 跨文化因素对谈判的影响\n3. 谈判准备：信息收集、目标设定与BATNA分析\n4. 谈判策略：分配式谈判vs整合式谈判\n5. 常见谈判技巧与应对方法\n\n讲座将通过案例分析和角色扮演，帮助学生掌握实用的谈判技能。',
    coverImage: 'https://readdy.ai/api/search-image?query=international%20business%20negotiation%20scene%20in%20a%20modern%20conference%20room%2C%20diverse%20business%20professionals%20discussing%20across%20a%20table%2C%20global%20business%20atmosphere%20with%20world%20map%20and%20financial%20charts%20on%20display%2C%20professional%20corporate%20environment&width=600&height=400&seq=lecture11&orientation=landscape',
    organizer: '商学院',
    organizerInfo: '商学院成立于1990年，是我校培养商业管理人才的重要基地。学院设有工商管理、市场营销、财务管理、国际商务等多个专业，拥有一支由海内外知名学者和企业家组成的师资队伍。\n\n学院注重理论与实践相结合的教学模式，与多家知名企业建立了长期合作关系，为学生提供丰富的实习和就业机会。学院的MBA项目在国内商学院排名中位居前列。',
    organizerLogo: 'https://readdy.ai/api/search-image?query=business%20school%20logo%2C%20academic%20commercial%20emblem%2C%20briefcase%20and%20globe%20symbols%2C%20navy%20blue%20and%20gold%20colors%2C%20professional%20and%20global%20design&width=200&height=200&seq=org11&orientation=squarish',
    capacity: 150,
    duration: '2小时',
    comments: [
      {
        name: '王同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20male%20student%20portrait%2C%20business%20formal%20attire%2C%20university%20business%20school%20background%2C%20professional%20expression&width=100&height=100&seq=comment13&orientation=squarish',
        content: '吴教授的讲座非常实用，特别是关于不同文化背景下谈判策略的部分，对我即将开始的交换生活很有帮助！',
        time: '2025-05-16 17:35'
      }
    ]
  },
  {
    id: 12,
    title: '现代诗歌创作与欣赏',
    type: '学术类',
    date: '2025-05-17',
    time: '19:00-21:00',
    location: '文学院报告厅',
    status: '已结束',
    speaker: '陈诗人',
    speakerTitle: '著名诗人、文学评论家',
    speakerBio: '陈诗人是当代著名诗人和文学评论家，已出版诗集十余部，作品被翻译成多种语言。他获得过鲁迅文学奖、徐志摩诗歌奖等多项文学大奖。\n\n他现任我校文学院教授，同时担任《诗歌月刊》主编。他的研究领域包括现代诗歌理论、中西诗歌比较和创意写作。他指导的学生中，已有多人成为活跃在文坛的青年诗人。',
    speakerAvatar: 'https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20middle-aged%20Asian%20male%20poet%20and%20literature%20professor%2C%20artistic%20casual%20attire%2C%20university%20arts%20building%20background%2C%20thoughtful%20and%20expressive%20face%2C%20professional%20headshot&width=200&height=200&seq=speaker12&orientation=squarish',
    description: '诗歌是人类最古老的文学形式之一，至今仍以其独特的语言魅力打动人心。本次讲座将带领大家领略现代诗歌的魅力。\n\n讲座内容包括：\n\n1. 现代诗歌的发展脉络与主要流派\n2. 诗歌语言的特质：意象、节奏、隐喻\n3. 优秀现代诗作品赏析\n4. 诗歌创作的灵感来源与技巧\n5. 现代社会中的诗歌价值\n\n讲座将穿插诗歌朗诵和创作指导，鼓励学生感受诗歌的力量并尝试创作。',
    coverImage: 'https://readdy.ai/api/search-image?query=poetry%20reading%20event%20in%20a%20university%20auditorium%2C%20poet%20presenting%20to%20an%20engaged%20audience%2C%20artistic%20atmosphere%20with%20soft%20lighting%2C%20bookshelves%20and%20literary%20quotes%20on%20display%2C%20cultural%20and%20intellectual%20environment&width=600&height=400&seq=lecture12&orientation=landscape',
    organizer: '文学院',
    organizerInfo: '文学院成立于1980年，是我校人文教育和研究的重要基地。学院设有中国语言文学、外国语言文学、比较文学等多个专业，拥有一支由著名作家、诗人和文学理论家组成的师资队伍。\n\n学院注重培养学生的文学素养和创作能力，定期举办文学讲座、朗诵会和创作工作坊。学院出版的《大学文学》杂志是国内高校文学期刊中的佼佼者。',
    organizerLogo: 'https://readdy.ai/api/search-image?query=literature%20department%20logo%2C%20academic%20literary%20emblem%2C%20book%20and%20pen%20symbols%2C%20burgundy%20and%20cream%20colors%2C%20classical%20and%20artistic%20design&width=200&height=200&seq=org12&orientation=squarish',
    capacity: 80,
    duration: '2小时',
    comments: [
      {
        name: '李同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20female%20student%20portrait%2C%20artistic%20style%2C%20university%20arts%20building%20background%2C%20expressive%20and%20creative%20look&width=100&height=100&seq=comment14&orientation=squarish',
        content: '陈老师的讲座太精彩了！特别是他朗诵自己的诗作时，整个报告厅都安静得能听见呼吸声。',
        time: '2025-05-17 21:15'
      },
      {
        name: '赵同学',
        avatar: 'https://readdy.ai/api/search-image?query=young%20asian%20male%20student%20portrait%2C%20artistic%20casual%20style%2C%20bookstore%20background%2C%20thoughtful%20expression&width=100&height=100&seq=comment15&orientation=squarish',
        content: '受到启发写了一首小诗，希望有机会能请陈老师指导。',
        time: '2025-05-18 08:40'
      }
    ]
  }
]);

// 计算筛选后的讲座
const filteredLectures = computed(() => {
  return lectures.value.filter(lecture => {
    // 类型筛选
    if (selectedType.value !== '全部类型' && lecture.type !== selectedType.value) {
      return false;
    }
    
    // 状态筛选
    if (selectedStatus.value !== '全部' && lecture.status !== selectedStatus.value) {
      return false;
    }
    
    // 时间筛选
    if (selectedTimePeriod.value !== '全部') {
      const lectureDate = new Date(lecture.date);
      const today = new Date('2025-05-18'); // 使用当前日期
      
      if (selectedTimePeriod.value === '今天') {
        const isToday = 
          lectureDate.getFullYear() === today.getFullYear() && 
          lectureDate.getMonth() === today.getMonth() && 
          lectureDate.getDate() === today.getDate();
        if (!isToday) return false;
      } else if (selectedTimePeriod.value === '本周') {
        // 计算本周的开始和结束
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // 周日为一周的开始
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        if (lectureDate < startOfWeek || lectureDate > endOfWeek) return false;
      } else if (selectedTimePeriod.value === '本月') {
        // 检查是否在本月
        const isThisMonth = 
          lectureDate.getFullYear() === today.getFullYear() && 
          lectureDate.getMonth() === today.getMonth();
        if (!isThisMonth) return false;
      }
    }
    
    return true;
  });
});

// 计算分页后的讲座
const paginatedLectures = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return filteredLectures.value.slice(start, end);
});

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredLectures.value.length / pageSize);
});

// 切换下拉菜单
const toggleDropdown = (name: string) => {
  dropdowns.value = {
    type: name === 'type' ? !dropdowns.value.type : false
  };
};

// 选择讲座类型
const selectType = (type: string) => {
  selectedType.value = type;
  dropdowns.value.type = false;
};

// 重置筛选条件
const resetFilters = () => {
  selectedType.value = '全部类型';
  selectedTimePeriod.value = '全部';
  selectedStatus.value = '全部';
  currentPage.value = 1;
};

// 打开讲座详情
const openLectureDetail = (lecture: any) => {
  selectedLecture.value = lecture;
  activeTab.value = 'description';
  commentText.value = '';
};

// 关闭弹窗
const closeModal = () => {
  selectedLecture.value = null;
};

// 添加评论
const addComment = () => {
  if (!commentText.value.trim() || !selectedLecture.value) return;
  
  const now = new Date();
  const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  selectedLecture.value.comments.push({
    name: '我',
    avatar: 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20asian%20student%20with%20a%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20photo&width=100&height=100&seq=avatar1&orientation=squarish',
    content: commentText.value,
    time: formattedTime
  });
  
  commentText.value = '';
};

// 监听点击事件，关闭下拉菜单
onMounted(() => {
  document.addEventListener('click', (event) => {
    if (dropdowns.value.type) {
      dropdowns.value.type = false;
    }
  });
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 移除input number的上下箭头 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

