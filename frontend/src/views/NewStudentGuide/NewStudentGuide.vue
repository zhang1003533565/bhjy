<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    <!-- 顶部快捷链接栏 -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 px-6 shadow-md">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <i class="fas fa-graduation-cap text-xl"></i>
          <h1 class="text-xl font-bold">新生指导中心</h1>
        </div>
        <div class="flex space-x-6">
          <a href="#" class="flex items-center space-x-1 hover:text-blue-100 cursor-pointer whitespace-nowrap">
            <i class="fas fa-book"></i>
            <span>图书馆官网</span>
          </a>
          <a href="#" class="flex items-center space-x-1 hover:text-blue-100 cursor-pointer whitespace-nowrap">
            <i class="fas fa-home"></i>
            <span>宿舍管理系统</span>
          </a>
          <a href="#" class="flex items-center space-x-1 hover:text-blue-100 cursor-pointer whitespace-nowrap">
            <i class="fas fa-bullhorn"></i>
            <span>校园公告板</span>
          </a>
          <a href="#" class="flex items-center space-x-1 hover:text-blue-100 cursor-pointer whitespace-nowrap">
            <i class="fas fa-calendar-alt"></i>
            <span>校历</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 进度条 -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-2 px-6">
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-gradient-to-r from-blue-500 to-blue-300 h-2.5 rounded-full" :style="{ width: progressWidth }"></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>开始</span>
          <span>{{ currentSection }}</span>
          <span>完成</span>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-6 flex">
      <!-- 左侧导航栏 -->
      <div class="w-64 pr-6">
        <div class="bg-white rounded-lg shadow-md p-4 sticky top-4">
          <h2 class="text-lg font-bold text-gray-800 mb-4">指导目录</h2>
          <ul class="space-y-2">
            <li v-for="(section, index) in sections" :key="index" 
                @click="changeSection(index)"
                class="cursor-pointer rounded-md transition-all duration-200 hover:bg-blue-50"
                :class="currentSectionIndex === index ? 'bg-blue-100 text-blue-700' : 'text-gray-700'">
              <div class="flex items-center p-3">
                <i :class="section.icon + ' w-5 text-center'"></i>
                <span class="ml-3">{{ section.title }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- 中间内容区 -->
      <div class="flex-1 mx-4">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <i :class="sections[currentSectionIndex].icon + ' mr-3 text-blue-500'"></i>
            {{ sections[currentSectionIndex].title }}
          </h2>

          <div v-if="currentSectionIndex === 0">
            <!-- 报到流程 -->
            <div class="space-y-8">
              <div v-for="(step, index) in sections[0].steps" :key="index" class="relative">
                <div class="flex">
                  <div class="flex flex-col items-center mr-6">
                    <div class="rounded-full h-10 w-10 flex items-center justify-center bg-blue-500 text-white font-bold">
                      {{ index + 1 }}
                    </div>
                    <div v-if="index < sections[0].steps.length - 1" class="h-full w-0.5 bg-blue-200 my-2"></div>
                  </div>
                  <div class="bg-gradient-to-r from-blue-50 to-white rounded-lg p-5 shadow-sm border border-blue-100 flex-1">
                    <h3 class="text-xl font-bold text-blue-700 mb-3">{{ step.title }}</h3>
                    <p class="text-gray-700 mb-4">{{ step.description }}</p>
                    <div v-if="step.details" class="bg-blue-50 p-4 rounded-md text-sm text-gray-700">
                      <div v-for="(detail, dIndex) in step.details" :key="dIndex" class="mb-2 last:mb-0">
                        <strong class="text-blue-700">{{ detail.label }}：</strong>{{ detail.value }}
                      </div>
                    </div>
                    <div v-if="step.image" class="mt-4 rounded-lg overflow-hidden">
                      <img :src="step.image" :alt="step.title" class="w-full h-auto object-cover object-top">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="currentSectionIndex === 1">
            <!-- 宿舍安排 -->
            <div class="space-y-8">
              <div v-for="(step, index) in sections[1].steps" :key="index" class="relative">
                <div class="flex">
                  <div class="flex flex-col items-center mr-6">
                    <div class="rounded-full h-10 w-10 flex items-center justify-center bg-blue-500 text-white font-bold">
                      {{ index + 1 }}
                    </div>
                    <div v-if="index < sections[1].steps.length - 1" class="h-full w-0.5 bg-blue-200 my-2"></div>
                  </div>
                  <div class="bg-gradient-to-r from-blue-50 to-white rounded-lg p-5 shadow-sm border border-blue-100 flex-1">
                    <h3 class="text-xl font-bold text-blue-700 mb-3">{{ step.title }}</h3>
                    <p class="text-gray-700 mb-4">{{ step.description }}</p>
                    <div v-if="step.details" class="bg-blue-50 p-4 rounded-md text-sm text-gray-700">
                      <div v-for="(detail, dIndex) in step.details" :key="dIndex" class="mb-2 last:mb-0">
                        <strong class="text-blue-700">{{ detail.label }}：</strong>{{ detail.value }}
                      </div>
                    </div>
                    <div v-if="step.image" class="mt-4 rounded-lg overflow-hidden">
                      <img :src="step.image" :alt="step.title" class="w-full h-auto object-cover object-top">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="currentSectionIndex === 2">
            <!-- 图书馆使用 -->
            <div class="space-y-8">
              <div v-for="(step, index) in sections[2].steps" :key="index" class="relative">
                <div class="flex">
                  <div class="flex flex-col items-center mr-6">
                    <div class="rounded-full h-10 w-10 flex items-center justify-center bg-blue-500 text-white font-bold">
                      {{ index + 1 }}
                    </div>
                    <div v-if="index < sections[2].steps.length - 1" class="h-full w-0.5 bg-blue-200 my-2"></div>
                  </div>
                  <div class="bg-gradient-to-r from-blue-50 to-white rounded-lg p-5 shadow-sm border border-blue-100 flex-1">
                    <h3 class="text-xl font-bold text-blue-700 mb-3">{{ step.title }}</h3>
                    <p class="text-gray-700 mb-4">{{ step.description }}</p>
                    <div v-if="step.details" class="bg-blue-50 p-4 rounded-md text-sm text-gray-700">
                      <div v-for="(detail, dIndex) in step.details" :key="dIndex" class="mb-2 last:mb-0">
                        <strong class="text-blue-700">{{ detail.label }}：</strong>{{ detail.value }}
                      </div>
                    </div>
                    <div v-if="step.image" class="mt-4 rounded-lg overflow-hidden">
                      <img :src="step.image" :alt="step.title" class="w-full h-auto object-cover object-top">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="currentSectionIndex === 3">
            <!-- 校园导航 -->
            <div class="space-y-6">
              <div class="mb-6">
                <img :src="campusMapUrl" alt="校园地图" class="w-full rounded-lg shadow-md">
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(location, index) in sections[3].locations" :key="index"
                    class="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg shadow-sm border border-blue-100">
                  <h3 class="text-lg font-bold text-blue-700 mb-2">{{ location.name }}</h3>
                  <p class="text-gray-700 mb-3">{{ location.description }}</p>
                  <div class="text-sm text-gray-600">
                    <div class="flex items-center mb-1">
                      <i class="fas fa-map-marker-alt text-red-500 mr-2"></i>
                      <span>{{ location.location }}</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fas fa-clock text-blue-500 mr-2"></i>
                      <span>{{ location.hours }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="currentSectionIndex === 4">
            <!-- 学术资源 -->
            <div class="space-y-6">
              <div v-for="(resource, index) in sections[4].resources" :key="index"
                  class="bg-gradient-to-r from-blue-50 to-white p-5 rounded-lg shadow-sm border border-blue-100">
                <h3 class="text-xl font-bold text-blue-700 mb-3">{{ resource.title }}</h3>
                <p class="text-gray-700 mb-4">{{ resource.description }}</p>
                <div class="flex flex-wrap gap-3">
                  <a v-for="(link, lIndex) in resource.links" :key="lIndex" href="#"
                     class="bg-white px-4 py-2 rounded-md shadow-sm border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer whitespace-nowrap !rounded-button">
                    <i :class="link.icon + ' mr-2'"></i>{{ link.text }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
            <!-- 活动参与 -->
            <div class="space-y-6">
              <div v-for="(activity, index) in sections[5].activities" :key="index"
                  class="bg-gradient-to-r from-blue-50 to-white p-5 rounded-lg shadow-sm border border-blue-100">
                <div class="flex flex-col md:flex-row">
                  <div class="md:w-1/3 mb-4 md:mb-0 md:mr-5">
                    <div class="rounded-lg overflow-hidden h-48">
                      <img :src="activity.image" :alt="activity.title" class="w-full h-full object-cover object-top">
                    </div>
                  </div>
                  <div class="md:w-2/3">
                    <h3 class="text-xl font-bold text-blue-700 mb-2">{{ activity.title }}</h3>
                    <div class="flex items-center text-sm text-gray-600 mb-3">
                      <div class="flex items-center mr-4">
                        <i class="fas fa-calendar-day text-blue-500 mr-1"></i>
                        <span>{{ activity.date }}</span>
                      </div>
                      <div class="flex items-center">
                        <i class="fas fa-map-marker-alt text-red-500 mr-1"></i>
                        <span>{{ activity.location }}</span>
                      </div>
                    </div>
                    <p class="text-gray-700 mb-4">{{ activity.description }}</p>
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap !rounded-button">
                      立即报名
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧帮助中心 -->
      <div class="w-80">
        <div class="bg-white rounded-lg shadow-md p-4 sticky top-4">
          <h2 class="text-lg font-bold text-gray-800 mb-4">帮助中心</h2>
          
          <!-- 搜索框 -->
          <div class="relative mb-4">
            <input type="text" placeholder="搜索常见问题..." 
                  class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
            <i class="fas fa-search absolute right-3 top-2.5 text-gray-400"></i>
          </div>
          
          <!-- 常见问题 -->
          <div class="space-y-3">
            <div v-for="(faq, index) in faqs" :key="index">
              <div @click="toggleFaq(index)" 
                   class="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-50 rounded-md">
                <span class="text-gray-700 font-medium">{{ faq.question }}</span>
                <i :class="faq.open ? 'fas fa-chevron-up text-blue-500' : 'fas fa-chevron-down text-gray-400'"></i>
              </div>
              <div v-if="faq.open" class="p-3 bg-gray-50 rounded-md mt-1 text-sm text-gray-600">
                {{ faq.answer }}
              </div>
            </div>
          </div>
          
          <!-- 在线咨询 -->
          <div class="mt-6">
            <button class="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap !rounded-button">
              <i class="fas fa-headset mr-2"></i>
              在线咨询
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 资源下载区 -->
    <div class="bg-gray-100 py-10">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">资源下载</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="(resource, index) in downloadResources" :key="index" 
               class="bg-white rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
            <div class="flex flex-col items-center text-center">
              <div class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <i :class="resource.icon + ' text-blue-500 text-2xl'"></i>
              </div>
              <h3 class="text-lg font-bold text-gray-800 mb-2">{{ resource.title }}</h3>
              <p class="text-sm text-gray-600 mb-4">{{ resource.description }}</p>
              <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap !rounded-button">
                <i class="fas fa-download mr-2"></i>下载
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新生互动区 -->
    <div class="bg-white py-10">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">新生互动</h2>
        
        <!-- 留言表单 -->
        <div class="max-w-2xl mx-auto mb-10 bg-blue-50 rounded-lg p-6 shadow-sm">
          <h3 class="text-lg font-bold text-gray-800 mb-4">发表留言</h3>
          <div class="mb-4">
            <textarea v-model="newMessage" rows="4" placeholder="有什么问题想问？或者分享你的新生体验..." 
                      class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <div class="flex justify-end">
            <button @click="postMessage" class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors cursor-pointer whitespace-nowrap !rounded-button">
              发布留言
            </button>
          </div>
        </div>
        
        <!-- 留言列表 -->
        <div class="space-y-6 max-w-4xl mx-auto">
          <div v-for="(message, index) in messages" :key="index" class="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
            <div class="flex items-start">
              <div class="flex-shrink-0 mr-4">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span class="text-blue-500 font-bold">{{ message.author.charAt(0) }}</span>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-center mb-2">
                  <h4 class="font-bold text-gray-800">{{ message.author }}</h4>
                  <span class="text-xs text-gray-500">{{ message.time }}</span>
                </div>
                <p class="text-gray-700 mb-3">{{ message.content }}</p>
                <div class="flex items-center text-sm text-gray-500 space-x-4">
                  <button class="flex items-center hover:text-blue-500 cursor-pointer">
                    <i class="far fa-thumbs-up mr-1"></i>
                    <span>{{ message.likes }}</span>
                  </button>
                  <button class="flex items-center hover:text-blue-500 cursor-pointer">
                    <i class="far fa-comment mr-1"></i>
                    <span>回复</span>
                  </button>
                </div>
                
                <!-- 回复 -->
                <div v-if="message.replies && message.replies.length > 0" class="mt-4 pl-4 border-l-2 border-gray-200 space-y-3">
                  <div v-for="(reply, rIndex) in message.replies" :key="rIndex" class="bg-gray-50 rounded-md p-3">
                    <div class="flex justify-between items-center mb-1">
                      <h5 class="font-bold text-gray-800 text-sm">{{ reply.author }}</h5>
                      <span class="text-xs text-gray-500">{{ reply.time }}</span>
                    </div>
                    <p class="text-sm text-gray-700">{{ reply.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-4">关于我们</h3>
            <p class="text-gray-400 text-sm">我们致力于为新生提供全方位的校园指导，帮助你快速适应大学生活。</p>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">联系方式</h3>
            <div class="space-y-2 text-gray-400 text-sm">
              <div class="flex items-center">
                <i class="fas fa-envelope mr-2"></i>
                <span>contact@university.edu</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-phone mr-2"></i>
                <span>123-456-7890</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">快速链接</h3>
            <ul class="space-y-2 text-gray-400 text-sm">
              <li><a href="#" class="hover:text-white">学校官网</a></li>
              <li><a href="#" class="hover:text-white">教务系统</a></li>
              <li><a href="#" class="hover:text-white">校园地图</a></li>
              <li><a href="#" class="hover:text-white">学生手册</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">关注我们</h3>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white text-xl">
                <i class="fab fa-weixin"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white text-xl">
                <i class="fab fa-weibo"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white text-xl">
                <i class="fab fa-qq"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white text-xl">
                <i class="fab fa-bilibili"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© 2025 大学新生指导中心. 保留所有权利.</p>
          <p class="mt-2">今日日期: 2025-05-18</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import Header from '@/components/Header.vue';

// 当前选中的部分
const currentSectionIndex = ref(0);
const scrollPosition = ref(0);

// 计算进度条宽度
const progressWidth = computed(() => {
  return `${(currentSectionIndex.value / (sections.length - 1)) * 100}%`;
});

// 计算当前部分名称
const currentSection = computed(() => {
  return sections[currentSectionIndex.value].title;
});

// 切换部分
const changeSection = (index: number) => {
  currentSectionIndex.value = index;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 校园地图图片URL
const campusMapUrl = 'https://readdy.ai/api/search-image?query=A%20detailed%20and%20colorful%20university%20campus%20map%20with%20buildings%2C%20pathways%2C%20green%20spaces%2C%20and%20landmarks%20clearly%20labeled.%20The%20map%20has%20a%20clean%2C%20modern%20design%20with%20a%20blue%20color%20scheme%20and%20includes%20a%20legend%20for%20easy%20navigation.%20Perfect%20for%20new%20students%20to%20find%20their%20way%20around%20campus.&width=800&height=500&seq=1&orientation=landscape';

// 导航部分数据
const sections = [
  {
    title: '报到流程',
    icon: 'fas fa-clipboard-check',
    steps: [
      {
        title: '报到注册',
        description: '新生需要在指定时间内到学校报到处进行注册，确认个人信息并领取学生证。',
        details: [
          { label: '时间', value: '2025年8月25日-27日 (8:00-17:00)' },
          { label: '地点', value: '学生服务中心一楼大厅' },
          { label: '所需材料', value: '录取通知书、身份证、一寸照片4张' }
        ],
        image: 'https://readdy.ai/api/search-image?query=University%20registration%20scene%20with%20students%20at%20check-in%20counters%2C%20staff%20helping%20new%20students%20with%20paperwork%2C%20modern%20university%20lobby%20with%20blue%20accent%20colors%2C%20bright%20and%20welcoming%20atmosphere%2C%20students%20carrying%20luggage%20and%20documents%2C%20professional%20setting%20with%20university%20branding%20visible.&width=600&height=300&seq=2&orientation=landscape'
      },
      {
        title: '缴费',
        description: '完成学费、住宿费等费用的缴纳，可通过线上支付或现场缴费两种方式。',
        details: [
          { label: '缴费方式', value: '线上支付（推荐）或现场缴费' },
          { label: '线上支付', value: '通过学校财务系统(finance.university.edu)完成' },
          { label: '现场缴费', value: '学生服务中心二楼财务处' }
        ]
      },
      {
        title: '领取宿舍钥匙',
        description: '完成报到和缴费后，前往宿舍管理处领取宿舍钥匙和相关生活用品。',
        details: [
          { label: '时间', value: '报到当天 (8:00-20:00)' },
          { label: '地点', value: '各宿舍楼管理员办公室' },
          { label: '所需材料', value: '学生证、缴费凭证' }
        ],
        image: 'https://readdy.ai/api/search-image?query=University%20dormitory%20key%20handover%20scene%2C%20student%20receiving%20room%20key%20from%20dormitory%20manager%20at%20reception%20desk%2C%20modern%20dormitory%20lobby%20with%20blue%20accent%20walls%2C%20students%20with%20luggage%20in%20background%2C%20professional%20and%20organized%20setting%2C%20bright%20and%20clean%20environment.&width=600&height=300&seq=3&orientation=landscape'
      },
      {
        title: '入住宿舍',
        description: '按照分配的宿舍号入住，熟悉宿舍环境和设施，与室友互相认识。',
        details: [
          { label: '宿舍设施', value: '床、桌椅、衣柜、空调、独立卫浴' },
          { label: '需自备物品', value: '床上用品、洗漱用品、生活日用品' },
          { label: '注意事项', value: '禁止使用大功率电器，保持宿舍整洁' }
        ]
      },
      {
        title: '参加新生入学教育',
        description: '参加学校组织的新生入学教育活动，了解学校规章制度和学习要求。',
        details: [
          { label: '时间', value: '2025年8月28日-30日' },
          { label: '地点', value: '大学礼堂' },
          { label: '内容', value: '校规校纪、安全教育、学习指导、心理健康等' }
        ],
        image: 'https://readdy.ai/api/search-image?query=University%20orientation%20session%20with%20new%20students%20in%20a%20large%20modern%20auditorium%2C%20professor%20speaking%20at%20podium%20with%20presentation%20slides%2C%20students%20seated%20in%20rows%20paying%20attention%2C%20bright%20well-lit%20space%20with%20blue%20accent%20lighting%2C%20professional%20academic%20atmosphere%2C%20university%20branding%20visible.&width=600&height=300&seq=4&orientation=landscape'
      }
    ]
  },
  {
    title: '宿舍安排',
    icon: 'fas fa-home',
    steps: [
      {
        title: '宿舍分配',
        description: '学校根据专业和年级统一安排宿舍，一般为4人间或6人间，每个宿舍楼设有专门的管理员。',
        details: [
          { label: '查询方式', value: '登录学生系统或迎新系统查询个人宿舍分配情况' },
          { label: '调整申请', value: '特殊情况可在报到后3天内向宿管中心申请调整' }
        ],
        image: 'https://readdy.ai/api/search-image?query=Modern%20university%20dormitory%20room%20with%20four%20beds%2C%20desks%2C%20wardrobes%2C%20and%20large%20windows%20letting%20in%20natural%20light.%20Clean%20and%20organized%20space%20with%20blue%20accent%20walls%2C%20personal%20study%20areas%20for%20each%20student%2C%20and%20modern%20furniture.%20Bright%20and%20welcoming%20atmosphere%20suitable%20for%20new%20students.&width=600&height=300&seq=5&orientation=landscape'
      },
      {
        title: '宿舍设施',
        description: '宿舍配备基本生活和学习设施，包括床铺、书桌、衣柜、空调、独立卫浴等。',
        details: [
          { label: '基础设施', value: '床、书桌、椅子、衣柜、书架、空调、热水器' },
          { label: '公共设施', value: '每层楼设有公共洗衣房、自习室、活动室' },
          { label: '网络设施', value: '宿舍内配备有线网络接口和无线WiFi覆盖' }
        ]
      },
      {
        title: '宿舍管理规定',
        description: '为保障学生安全和良好的生活环境，学校制定了一系列宿舍管理规定。',
        details: [
          { label: '作息时间', value: '宿舍楼晚上11:00熄灯，23:30关门' },
          { label: '访客管理', value: '外来访客需在宿管处登记，不得留宿' },
          { label: '安全规定', value: '禁止使用大功率电器，禁止在宿舍内吸烟、饮酒' }
        ]
      },
      {
        title: '宿舍生活指南',
        description: '如何与室友和谐相处，保持良好的宿舍环境，解决常见的宿舍生活问题。',
        details: [
          { label: '室友相处', value: '尊重彼此的生活习惯，建立宿舍公约' },
          { label: '环境卫生', value: '轮流打扫宿舍，保持整洁' },
          { label: '节能环保', value: '节约用水用电，分类投放垃圾' }
        ],
        image: 'https://readdy.ai/api/search-image?query=University%20students%20collaborating%20in%20a%20dormitory%20common%20area%2C%20diverse%20group%20of%20students%20studying%20together%20and%20socializing%2C%20modern%20lounge%20with%20comfortable%20seating%2C%20blue%20accent%20walls%20and%20good%20lighting%2C%20friendly%20and%20productive%20atmosphere%2C%20students%20using%20laptops%20and%20books.&width=600&height=300&seq=6&orientation=landscape'
      }
    ]
  },
  {
    title: '图书馆使用',
    icon: 'fas fa-book',
    steps: [
      {
        title: '办理借书证',
        description: '新生可使用学生证直接作为借书证，无需单独办理。首次使用前需在图书馆一楼服务台激活。',
        details: [
          { label: '激活地点', value: '图书馆一楼读者服务中心' },
          { label: '所需材料', value: '学生证、身份证' },
          { label: '激活时间', value: '工作日 8:30-17:00' }
        ],
        image: 'https://readdy.ai/api/search-image?query=University%20library%20service%20desk%20with%20staff%20helping%20students%2C%20modern%20library%20interior%20with%20blue%20accent%20design%20elements%2C%20students%20getting%20library%20cards%20activated%2C%20bright%20and%20organized%20space%20with%20bookshelves%20in%20background%2C%20professional%20academic%20atmosphere.&width=600&height=300&seq=7&orientation=landscape'
      },
      {
        title: '借阅规则',
        description: '了解图书馆的借阅规则，包括借阅数量、期限、续借和逾期处理等。',
        details: [
          { label: '借阅数量', value: '本科生最多可同时借阅10本图书' },
          { label: '借阅期限', value: '普通图书30天，教参类图书14天' },
          { label: '续借方式', value: '可在到期前7天内在线或现场办理续借，最多续借2次' },
          { label: '逾期处理', value: '逾期每天每本书收取0.5元滞纳金' }
        ]
      },
      {
        title: '图书查询与借阅',
        description: '如何使用图书馆检索系统查找图书，以及借阅和归还图书的流程。',
        details: [
          { label: '查询方式', value: '通过图书馆网站或馆内检索终端查询' },
          { label: '自助借阅', value: '在一楼、三楼、五楼设有自助借阅机' },
          { label: '人工借阅', value: '在二楼总服务台办理' }
        ],
        image: 'https://readdy.ai/api/search-image?query=Student%20using%20digital%20catalog%20terminal%20in%20modern%20university%20library%2C%20searching%20for%20books%20on%20touchscreen%20interface%2C%20spacious%20library%20with%20blue%20accent%20lighting%2C%20rows%20of%20bookshelves%20visible%20in%20background%2C%20clean%20and%20organized%20academic%20environment.&width=600&height=300&seq=8&orientation=landscape'
      },
      {
        title: '电子资源使用',
        description: '图书馆提供丰富的电子资源，包括电子期刊、数据库、电子书等。',
        details: [
          { label: '访问方式', value: '校园网内直接访问，校外通过VPN访问' },
          { label: '主要资源', value: 'CNKI、Web of Science、IEEE、Elsevier等数据库' },
          { label: '使用培训', value: '每学期初图书馆会举办电子资源使用培训' }
        ]
      },
      {
        title: '学习空间预约',
        description: '图书馆提供多种学习空间，包括研讨室、自习室等，部分需要提前预约。',
        details: [
          { label: '预约方式', value: '通过图书馆小程序或网站预约' },
          { label: '研讨室', value: '3-8人使用，最长可预约4小时' },
          { label: '自习室', value: '部分需预约，部分自由入座' }
        ],
        image: 'https://readdy.ai/api/search-image?query=Modern%20university%20library%20study%20space%20with%20students%20working%20at%20individual%20desks%20and%20in%20small%20groups%2C%20glass-walled%20study%20rooms%20visible%2C%20contemporary%20design%20with%20blue%20accent%20lighting%2C%20quiet%20and%20focused%20atmosphere%2C%20students%20using%20laptops%20and%20books%2C%20spacious%20and%20well-organized%20environment.&width=600&height=300&seq=9&orientation=landscape'
      }
    ]
  },
  {
    title: '校园导航',
    icon: 'fas fa-map-marked-alt',
    locations: [
      {
        name: '教学楼区',
        description: '包含主教学楼、理工楼、人文楼、艺术楼等，是日常上课的主要场所。',
        location: '校园中心区域',
        hours: '周一至周日 6:00-22:30'
      },
      {
        name: '图书馆',
        description: '藏书超过200万册，电子资源丰富，设有多种学习空间和专业阅览室。',
        location: '校园东区',
        hours: '周一至周日 8:00-22:00'
      },
      {
        name: '学生活动中心',
        description: '设有学生社团办公室、多功能厅、排练室、会议室等，是举办各类学生活动的主要场所。',
        location: '校园南区',
        hours: '周一至周日 9:00-21:00'
      },
      {
        name: '体育场馆',
        description: '包含体育馆、游泳馆、田径场、篮球场、网球场等多种运动设施。',
        location: '校园西区',
        hours: '周一至周日 7:00-21:30'
      },
      {
        name: '食堂区',
        description: '校内共有4个食堂，提供各类风味美食，价格实惠，环境整洁。',
        location: '分布在校园各区',
        hours: '早餐 6:30-9:00，午餐 11:00-13:30，晚餐 17:00-19:30'
      },
      {
        name: '校医院',
        description: '提供基本医疗服务、体检、预防接种等服务，设有内科、外科、口腔科等。',
        location: '校园北区',
        hours: '工作日 8:00-17:30，节假日 9:00-16:00'
      },
      {
        name: '行政办公区',
        description: '包含校长办公室、教务处、学生处、财务处等行政部门。',
        location: '校园中心区域',
        hours: '工作日 8:30-17:00'
      },
      {
        name: '宿舍区',
        description: '分为东、西、南、北四个宿舍区，共计20栋宿舍楼，可容纳15000名学生住宿。',
        location: '分布在校园四周',
        hours: '24小时开放，23:30关门'
      }
    ]
  },
  {
    title: '学术资源',
    icon: 'fas fa-graduation-cap',
    resources: [
      {
        title: '在线学习平台',
        description: '学校提供多种在线学习平台，包括慕课平台、虚拟实验室等，支持学生自主学习。',
        links: [
          { text: '校内慕课平台', icon: 'fas fa-laptop' },
          { text: '虚拟实验室', icon: 'fas fa-flask' },
          { text: '学习资源库', icon: 'fas fa-archive' }
        ]
      },
      {
        title: '学术支持服务',
        description: '为学生提供学术写作、研究方法、数据分析等方面的支持和指导。',
        links: [
          { text: '学术写作中心', icon: 'fas fa-pen' },
          { text: '统计咨询服务', icon: 'fas fa-chart-bar' },
          { text: '研究方法指导', icon: 'fas fa-microscope' }
        ]
      },
      {
        title: '学科竞赛信息',
        description: '提供各类学科竞赛的信息、报名渠道和培训资源，鼓励学生参与学科竞赛。',
        links: [
          { text: '数学建模竞赛', icon: 'fas fa-calculator' },
          { text: '程序设计大赛', icon: 'fas fa-code' },
          { text: '创新创业大赛', icon: 'fas fa-lightbulb' },
          { text: '英语竞赛', icon: 'fas fa-language' }
        ]
      },
      {
        title: '国际交流项目',
        description: '提供海外交换、暑期项目、国际会议等国际交流机会，拓展学生国际视野。',
        links: [
          { text: '交换生项目', icon: 'fas fa-exchange-alt' },
          { text: '暑期海外课程', icon: 'fas fa-sun' },
          { text: '国际志愿者', icon: 'fas fa-hands-helping' }
        ]
      }
    ]
  },
  {
    title: '活动参与',
    icon: 'fas fa-calendar-alt',
    activities: [
      {
        title: '新生开学典礼',
        date: '2025年8月31日 9:00',
        location: '大学礼堂',
        description: '所有新生必须参加的开学典礼，校领导将致辞，并有特邀嘉宾演讲，帮助新生了解学校历史和文化。',
        image: 'https://readdy.ai/api/search-image?query=University%20opening%20ceremony%20in%20grand%20auditorium%2C%20rows%20of%20new%20students%20in%20formal%20attire%2C%20stage%20with%20university%20officials%20and%20speakers%2C%20blue%20and%20gold%20decorations%2C%20ceremonial%20atmosphere%2C%20large%20screen%20displaying%20university%20logo%2C%20bright%20and%20formal%20setting.&width=400&height=250&seq=10&orientation=landscape'
      },
      {
        title: '社团招新活动',
        date: '2025年9月5日-7日',
        location: '学生活动中心广场',
        description: '校内各社团将设立展台进行招新，新生可以了解各社团活动并选择加入感兴趣的社团。',
        image: 'https://readdy.ai/api/search-image?query=University%20club%20fair%20with%20multiple%20booths%20and%20tables%20in%20campus%20square%2C%20students%20interacting%20with%20club%20representatives%2C%20colorful%20banners%20and%20displays%2C%20lively%20atmosphere%20with%20crowds%20of%20students%2C%20blue%20sky%20background%2C%20outdoor%20campus%20setting%20with%20modern%20buildings.&width=400&height=250&seq=11&orientation=landscape'
      },
      {
        title: '新生才艺展示晚会',
        date: '2025年9月15日 19:00',
        location: '大学礼堂',
        description: '为新生提供展示才艺的平台，可以表演唱歌、舞蹈、乐器等，增进新生之间的了解和友谊。',
        image: 'https://readdy.ai/api/search-image?query=University%20talent%20show%20with%20students%20performing%20on%20stage%2C%20colorful%20stage%20lighting%20with%20blue%20accent%20lights%2C%20audience%20of%20students%20watching%20in%20auditorium%2C%20performers%20with%20musical%20instruments%2C%20modern%20stage%20setup%20with%20university%20branding%2C%20enthusiastic%20atmosphere.&width=400&height=250&seq=12&orientation=landscape'
      },
      {
        title: '新生运动会',
        date: '2025年10月10日-12日',
        location: '校体育场',
        description: '新生按班级或院系组队参加各项体育比赛，包括田径、球类、趣味运动等多个项目。',
        image: 'https://readdy.ai/api/search-image?query=University%20sports%20meet%20with%20students%20competing%20on%20athletic%20track%2C%20spectators%20in%20stands%20cheering%2C%20blue%20sky%20day%2C%20university%20flags%20and%20banners%20displayed%20around%20field%2C%20athletes%20in%20colorful%20uniforms%2C%20modern%20stadium%20facilities%2C%20energetic%20sports%20atmosphere.&width=400&height=250&seq=13&orientation=landscape'
      }
    ]
  }
];

// 常见问题
const faqs = ref([
  {
    question: '如何查询自己的宿舍分配情况？',
    answer: '可以登录学校迎新系统(welcome.university.edu)或通过迎新微信小程序查询个人宿舍分配情况。也可以在报到当天向报到处工作人员咨询。',
    open: false
  },
  {
    question: '入学时需要带哪些物品？',
    answer: '必备证件：身份证、录取通知书、一寸照片；生活用品：床上用品、洗漱用品、衣物；学习用品：笔记本电脑、文具等。详细清单可在迎新系统中查看。',
    open: false
  },
  {
    question: '学校周边有哪些生活设施？',
    answer: '学校周边有多家超市、餐厅、银行、邮局等生活设施。校内也设有小型超市、打印店、理发店等。具体位置可参考校园导航地图。',
    open: false
  },
  {
    question: '如何申请奖学金和助学金？',
    answer: '新生可在每学年开始后，通过学生工作系统申请各类奖学金和助学金。具体申请条件和流程将在开学初由辅导员统一通知。',
    open: false
  },
  {
    question: '校园网如何连接和使用？',
    answer: '宿舍内可通过有线网络或WiFi连接校园网。首次使用需在网络中心官网(net.university.edu)注册账号并绑定学号，完成实名认证后即可使用。',
    open: false
  }
]);

// 下载资源
const downloadResources = [
  {
    title: '校园地图',
    description: '详细的校园平面图，标注了各个建筑和设施的位置。',
    icon: 'fas fa-map'
  },
  {
    title: '新生手册',
    description: '包含学校概况、规章制度、学习指南等重要信息。',
    icon: 'fas fa-book-open'
  },
  {
    title: '报到表格',
    description: '入学报到所需填写的各类表格，可提前下载填写。',
    icon: 'fas fa-file-alt'
  },
  {
    title: '宿舍分配表',
    description: '各院系新生宿舍分配情况，可查询自己的宿舍信息。',
    icon: 'fas fa-home'
  }
];

// 留言板
const newMessage = ref('');
const messages = ref([
  {
    author: '张同学',
    time: '2025-05-17 14:30',
    content: '请问图书馆的电子资源如何在校外访问？需要安装什么软件吗？',
    likes: 5,
    replies: [
      {
        author: '王学姐',
        time: '2025-05-17 15:45',
        content: '需要使用学校提供的VPN服务，可以在信息中心网站下载安装VPN客户端，使用学号和密码登录即可。'
      }
    ]
  },
  {
    author: '李同学',
    time: '2025-05-16 10:15',
    content: '宿舍是否需要自带路由器？宿舍网络覆盖情况如何？',
    likes: 8,
    replies: [
      {
        author: '陈学长',
        time: '2025-05-16 11:20',
        content: '宿舍内已有WiFi覆盖，但信号可能不是很稳定，建议自带一个路由器，可以提升网络体验。'
      },
      {
        author: '网络中心',
        time: '2025-05-16 14:30',
        content: '宿舍区WiFi已全面升级，覆盖良好。如使用自带路由器，请遵守网络管理规定，避免信号干扰。'
      }
    ]
  },
  {
    author: '刘同学',
    time: '2025-05-15 16:40',
    content: '新生军训一般在什么时间？需要准备哪些物品？',
    likes: 12,
    replies: [
      {
        author: '赵辅导员',
        time: '2025-05-15 17:25',
        content: '军训一般在开学后第二周开始，为期两周。需准备防晒霜、水壶、运动鞋等物品，具体清单将在开学时发放。'
      }
    ]
  }
]);

// 切换FAQ展开状态
const toggleFaq = (index: number) => {
  faqs.value[index].open = !faqs.value[index].open;
};

// 发布新留言
const postMessage = () => {
  if (newMessage.value.trim() === '') return;
  
  const now = new Date();
  const timeString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  messages.value.unshift({
    author: '我',
    time: timeString,
    content: newMessage.value,
    likes: 0,
    replies: []
  });
  
  newMessage.value = '';
};

// 监听滚动位置
onMounted(() => {
  window.addEventListener('scroll', () => {
    scrollPosition.value = window.scrollY;
  });
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

