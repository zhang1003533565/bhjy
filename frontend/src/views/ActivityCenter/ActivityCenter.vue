<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 添加 Header 组件 -->
    <Header />
    <!-- 主体内容区域 -->
    <main class="container mx-auto px-4 py-8">
      <!-- 筛选区域 -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 活动类型筛选 -->
          <div class="flex-1">
            <h3 class="text-sm font-medium text-gray-700 mb-3">活动类型</h3>
            <div class="flex space-x-2">
              <button 
                v-for="type in activityTypes" 
                :key="type.id"
                @click="setActivityType(type.id)"
                :class="{
                  'bg-blue-600 text-white': activeType === type.id,
                  'bg-gray-100 text-gray-700 hover:bg-gray-200': activeType !== type.id
                }"
                class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
              >
                {{ type.name }}
              </button>
            </div>
          </div>

          <!-- 活动时间筛选 -->
          <div class="flex-1">
            <h3 class="text-sm font-medium text-gray-700 mb-3">活动时间</h3>
            <div class="relative">
              <button 
                @click="toggleTimeDropdown"
                class="w-full flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
              >
                {{ selectedTimeRange.name }}
                <i class="fas fa-chevron-down text-gray-500 ml-2" :class="{ 'transform rotate-180': isTimeDropdownOpen }"></i>
              </button>
              
              <div v-if="isTimeDropdownOpen" class="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg py-1">
                <div 
                  v-for="time in timeRanges" 
                  :key="time.id"
                  @click="selectTimeRange(time.id)"
                  class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {{ time.name }}
                </div>
              </div>
            </div>
          </div>

          <!-- 活动状态筛选 -->
          <div class="flex-1">
            <h3 class="text-sm font-medium text-gray-700 mb-3">活动状态</h3>
            <div class="flex space-x-2">
              <button 
                v-for="status in activityStatuses" 
                :key="status.id"
                @click="setActivityStatus(status.id)"
                :class="{
                  'bg-blue-600 text-white': activeStatus === status.id,
                  'bg-gray-100 text-gray-700 hover:bg-gray-200': activeStatus !== status.id
                }"
                class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
              >
                {{ status.name }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 活动展示区域 -->
      <section class="mb-8">
        <!-- 活动列表 -->
        <div v-if="filteredActivities.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="activity in paginatedActivities" 
            :key="activity.id"
            @click="openActivityDetail(activity)"
            class="bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
          >
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="activity.image" 
                :alt="activity.title" 
                class="w-full h-full object-cover object-top"
              >
              <div 
                :class="{
                  'bg-green-500': activity.status === 'ongoing',
                  'bg-yellow-500': activity.status === 'upcoming',
                  'bg-gray-500': activity.status === 'ended'
                }"
                class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium text-white"
              >
                {{ getStatusText(activity.status) }}
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800 mb-2 truncate">{{ activity.title }}</h3>
              <div class="flex items-center text-gray-600 text-sm mb-2">
                <i class="fas fa-calendar-alt mr-2"></i>
                <span>{{ activity.date }}</span>
              </div>
              <div class="flex items-center text-gray-600 text-sm">
                <i class="fas fa-map-marker-alt mr-2"></i>
                <span>{{ activity.location }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 无数据状态 -->
        <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
          <img 
            :src="emptyStateImage" 
            alt="暂无活动" 
            class="w-48 h-48 mx-auto mb-6"
          >
          <h3 class="text-xl font-semibold text-gray-800 mb-2">暂无活动信息</h3>
          <p class="text-gray-600 mb-6">当前筛选条件下没有找到相关活动，请尝试调整筛选条件</p>
          <button 
            @click="resetFilters"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
          >
            重置筛选条件
          </button>
        </div>
      </section>

      <!-- 分页控制 -->
      <section v-if="filteredActivities.length > 0" class="flex justify-center items-center space-x-2 py-6">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer"
        >
          <i class="fas fa-chevron-left mr-1"></i> 上一页
        </button>
        
        <div v-for="page in displayedPages" :key="page" class="flex items-center">
          <button 
            v-if="page !== '...'"
            @click="goToPage(page)"
            :class="{
              'bg-blue-600 text-white': currentPage === page,
              'bg-white text-gray-700 hover:bg-gray-50': currentPage !== page
            }"
            class="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 !rounded-button whitespace-nowrap cursor-pointer"
          >
            {{ page }}
          </button>
          <span v-else class="w-10 h-10 flex items-center justify-center">...</span>
        </div>
        
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
          class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer"
        >
          下一页 <i class="fas fa-chevron-right ml-1"></i>
        </button>
      </section>
    </main>

    <!-- 活动详情弹窗 -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- 背景遮罩 -->
        <div 
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          @click="closeModal"
        ></div>

        <!-- 弹窗内容 -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div class="absolute top-4 right-4 z-10">
            <button 
              @click="closeModal"
              class="bg-white rounded-full p-2 text-gray-500 hover:text-gray-700 focus:outline-none !rounded-button whitespace-nowrap cursor-pointer"
            >
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <div v-if="selectedActivity" class="bg-white">
            <div class="h-64 sm:h-80 overflow-hidden">
              <img 
                :src="selectedActivity.image" 
                :alt="selectedActivity.title" 
                class="w-full h-full object-cover object-top"
              >
            </div>
            
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <h2 class="text-2xl font-bold text-gray-800">{{ selectedActivity.title }}</h2>
                <span 
                  :class="{
                    'bg-green-500': selectedActivity.status === 'ongoing',
                    'bg-yellow-500': selectedActivity.status === 'upcoming',
                    'bg-gray-500': selectedActivity.status === 'ended'
                  }"
                  class="px-3 py-1 rounded-full text-xs font-medium text-white"
                >
                  {{ getStatusText(selectedActivity.status) }}
                </span>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="flex items-center text-gray-600">
                  <i class="fas fa-calendar-alt text-blue-600 mr-3"></i>
                  <div>
                    <p class="text-sm text-gray-500">活动时间</p>
                    <p>{{ selectedActivity.date }}</p>
                  </div>
                </div>
                
                <div class="flex items-center text-gray-600">
                  <i class="fas fa-map-marker-alt text-blue-600 mr-3"></i>
                  <div>
                    <p class="text-sm text-gray-500">活动地点</p>
                    <p>{{ selectedActivity.location }}</p>
                  </div>
                </div>
                
                <div class="flex items-center text-gray-600">
                  <i class="fas fa-user-friends text-blue-600 mr-3"></i>
                  <div>
                    <p class="text-sm text-gray-500">活动类型</p>
                    <p>{{ getTypeText(selectedActivity.type) }}</p>
                  </div>
                </div>
                
                <div class="flex items-center text-gray-600">
                  <i class="fas fa-users text-blue-600 mr-3"></i>
                  <div>
                    <p class="text-sm text-gray-500">参与人数</p>
                    <p>{{ selectedActivity.participants }} 人</p>
                  </div>
                </div>
              </div>
              
              <div class="mb-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">活动详情</h3>
                <p class="text-gray-600 whitespace-pre-line">{{ selectedActivity.description }}</p>
              </div>
              
              <div class="flex flex-col sm:flex-row gap-4">
                <button 
                  v-if="selectedActivity.status !== 'ended'"
                  class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i class="fas fa-user-plus mr-2"></i> 立即报名
                </button>
                <button 
                  v-else
                  disabled
                  class="flex-1 px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed !rounded-button whitespace-nowrap"
                >
                  <i class="fas fa-clock mr-2"></i> 活动已结束
                </button>
                
                <button 
                  class="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i class="fas fa-share-alt mr-2"></i> 分享活动
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

// 活动类型数据
const activityTypes = [
  { id: 'all', name: '全部活动' },
  { id: 'school', name: '校内活动' },
  { id: 'department', name: '院系活动' },
  { id: 'external', name: '校外活动' }
];

// 时间范围数据
const timeRanges = [
  { id: 'all', name: '全部时间' },
  { id: 'week', name: '最近7天' },
  { id: 'month', name: '本月' },
  { id: 'year', name: '全年' }
];

// 活动状态数据
const activityStatuses = [
  { id: 'all', name: '全部状态' },
  { id: 'upcoming', name: '即将开始' },
  { id: 'ongoing', name: '进行中' },
  { id: 'ended', name: '已结束' }
];

// 活动数据
const activities = ref([
  {
    id: 1,
    title: '2025年春季校园招聘会',
    date: '2025-05-20 09:00-17:00',
    location: '大学体育馆',
    status: 'upcoming',
    type: 'school',
    participants: 1200,
    description: '本次招聘会将有超过100家知名企业参与，涵盖IT、金融、教育、制造等多个行业，为2025届毕业生提供丰富的就业机会。\n\n活动亮点：\n- 一对一职业咨询\n- 简历修改指导\n- 模拟面试环节\n- 行业专家讲座\n\n请携带个人简历和学生证参加，提前做好充分准备，展现最好的自己！',
    image: 'https://readdy.ai/api/search-image?query=A%20modern%20university%20job%20fair%20with%20company%20booths%20and%20students%20in%20professional%20attire%20networking%20with%20recruiters%2C%20bright%20spacious%20gymnasium%20setting%20with%20university%20banners%2C%20clean%20corporate%20design%20with%20soft%20lighting%20and%20professional%20atmosphere&width=800&height=600&seq=1&orientation=landscape'
  },
  {
    id: 2,
    title: '人工智能与未来教育论坛',
    date: '2025-05-25 14:00-17:30',
    location: '科学楼报告厅',
    status: 'upcoming',
    type: 'department',
    participants: 300,
    description: '本次论坛邀请了国内外人工智能和教育领域的专家学者，共同探讨AI技术如何改变未来教育模式，以及高校如何应对这一变革。\n\n主要议题：\n- AI在个性化学习中的应用\n- 智能教学系统的发展趋势\n- 教育大数据分析与应用\n- 人机协作教学模式探索\n\n欢迎对教育科技感兴趣的师生参加！',
    image: 'https://readdy.ai/api/search-image?query=A%20professional%20academic%20forum%20on%20artificial%20intelligence%20in%20education%20with%20experts%20presenting%20on%20stage%2C%20modern%20auditorium%20with%20digital%20screens%20displaying%20AI%20and%20education%20graphics%2C%20audience%20of%20professors%20and%20students%2C%20professional%20lighting%20and%20clean%20academic%20setting&width=800&height=600&seq=2&orientation=landscape'
  },
  {
    id: 3,
    title: '第十二届校园文化艺术节',
    date: '2025-05-18 - 2025-05-31',
    location: '校园各处',
    status: 'ongoing',
    type: 'school',
    participants: 5000,
    description: '为期两周的校园文化艺术节将举办多项精彩活动，包括音乐会、舞蹈表演、戏剧展演、书画展览等，全方位展示我校学生的艺术才华。\n\n活动安排：\n- 5月18日：开幕式暨交响乐演奏会\n- 5月20日-22日：各院系才艺展示\n- 5月24日-26日：校园歌手大赛\n- 5月28日-30日：舞台剧展演\n- 5月31日：闭幕式暨颁奖典礼\n\n欢迎全校师生积极参与！',
    image: 'https://readdy.ai/api/search-image?query=A%20vibrant%20university%20arts%20festival%20with%20colorful%20decorations%20and%20banners%20across%20campus%2C%20students%20performing%20music%20and%20dance%20on%20outdoor%20stages%2C%20art%20exhibitions%20with%20paintings%20and%20sculptures%2C%20crowds%20of%20students%20enjoying%20the%20festivities%20in%20a%20beautiful%20campus%20setting%20with%20trees%20and%20modern%20buildings&width=800&height=600&seq=3&orientation=landscape'
  },
  {
    id: 4,
    title: '环保志愿者城市清洁行动',
    date: '2025-05-26 08:30-12:00',
    location: '市中心公园',
    status: 'upcoming',
    type: 'external',
    participants: 150,
    description: '联合市环保局举办的城市清洁志愿活动，旨在提高公众环保意识，美化城市环境。参与者将在市中心公园及周边区域进行垃圾清理、分类宣传等工作。\n\n活动流程：\n- 08:30-09:00 签到与分组\n- 09:00-11:30 清洁活动\n- 11:30-12:00 总结与合影\n\n请穿着舒适服装，主办方将提供手套、垃圾袋等工具。完成活动可获得志愿服务时长证明。',
    image: 'https://readdy.ai/api/search-image?query=A%20group%20of%20university%20student%20volunteers%20in%20matching%20t-shirts%20cleaning%20up%20a%20city%20park%2C%20collecting%20trash%20in%20bags%2C%20working%20together%20with%20gloves%20and%20pickup%20tools%2C%20beautiful%20park%20setting%20with%20trees%20and%20pathways%2C%20bright%20daylight%20with%20clear%20blue%20sky%2C%20environmental%20conservation%20theme&width=800&height=600&seq=4&orientation=landscape'
  },
  {
    id: 5,
    title: '计算机科学前沿技术讲座',
    date: '2025-05-19 15:00-17:00',
    location: '信息学院报告厅',
    status: 'ongoing',
    type: 'department',
    participants: 200,
    description: '本次讲座邀请到了谷歌AI研究院的首席科学家，为大家带来关于大型语言模型最新研究进展的分享。讲座将深入浅出地介绍前沿技术，并探讨其在各领域的应用前景。\n\n讲座内容：\n- 大型语言模型的技术演进\n- 多模态AI系统的构建\n- 产业应用案例分析\n- 未来研究方向展望\n\n面向全校师生开放，计算机相关专业学生优先。',
    image: 'https://readdy.ai/api/search-image?query=A%20professional%20computer%20science%20lecture%20in%20a%20modern%20university%20auditorium%20with%20a%20distinguished%20speaker%20presenting%20advanced%20technology%20concepts%20on%20large%20digital%20screens%2C%20attentive%20audience%20of%20students%20and%20faculty%20taking%20notes%2C%20professional%20academic%20setting%20with%20university%20branding%20visible&width=800&height=600&seq=5&orientation=landscape'
  },
  {
    id: 6,
    title: '国际文化交流周',
    date: '2025-05-10 - 2025-05-17',
    location: '国际交流中心',
    status: 'ended',
    type: 'school',
    participants: 800,
    description: '为期一周的国际文化交流活动，来自20多个国家的留学生将展示各自国家的传统文化、美食、艺术和风俗习惯，促进校园多元文化交流。\n\n活动亮点：\n- 国家文化展台\n- 传统服饰展示\n- 国际美食品鉴\n- 民族音乐表演\n- 语言交流角\n\n活动对全校师生开放，欢迎参与体验多彩的国际文化！',
    image: 'https://readdy.ai/api/search-image?query=An%20international%20cultural%20exchange%20event%20at%20a%20university%20with%20students%20from%20diverse%20backgrounds%20showcasing%20their%20national%20cultures%2C%20colorful%20displays%20of%20traditional%20costumes%20and%20artifacts%2C%20food%20stalls%20with%20international%20cuisine%2C%20performances%20of%20traditional%20music%20and%20dance%2C%20in%20a%20modern%20university%20international%20center&width=800&height=600&seq=6&orientation=landscape'
  },
  {
    id: 7,
    title: '创新创业大赛决赛',
    date: '2025-05-12 13:30-18:00',
    location: '创新创业中心',
    status: 'ended',
    type: 'school',
    participants: 500,
    description: '年度创新创业大赛决赛将选出10支优秀团队进行项目路演，评委由知名企业家、投资人和学校导师组成。优胜团队将获得创业资金支持和孵化机会。\n\n比赛环节：\n- 项目展示（每队10分钟）\n- 评委提问（每队5分钟）\n- 现场观众投票\n- 结果公布与颁奖\n\n欢迎对创新创业感兴趣的同学前来观摩学习！',
    image: 'https://readdy.ai/api/search-image?query=A%20university%20entrepreneurship%20competition%20final%20with%20student%20teams%20presenting%20business%20pitches%20to%20judges%2C%20professional%20presentation%20setup%20with%20large%20screens%20displaying%20startup%20concepts%2C%20panel%20of%20business%20professionals%20and%20investors%20evaluating%2C%20audience%20of%20students%20and%20faculty%20in%20a%20modern%20innovation%20center%20with%20startup-themed%20decor&width=800&height=600&seq=7&orientation=landscape'
  },
  {
    id: 8,
    title: '心理健康主题工作坊',
    date: '2025-05-28 14:00-16:30',
    location: '学生活动中心',
    status: 'upcoming',
    type: 'department',
    participants: 60,
    description: '由心理咨询中心组织的心理健康工作坊，帮助学生缓解学习压力，提高情绪管理能力，培养积极心态。活动将采用小组互动形式，营造轻松愉快的氛围。\n\n工作坊内容：\n- 压力源识别与应对\n- 情绪管理技巧\n- 正念冥想练习\n- 人际沟通能力提升\n\n名额有限，请提前报名。参与者将获得精美心理健康手册一份。',
    image: 'https://readdy.ai/api/search-image?query=A%20mental%20health%20workshop%20in%20a%20bright%20university%20student%20center%20with%20small%20groups%20of%20students%20sitting%20in%20circles%20engaged%20in%20supportive%20discussion%2C%20professional%20counselors%20facilitating%20activities%2C%20calm%20and%20welcoming%20atmosphere%20with%20plants%20and%20comfortable%20seating%2C%20mindfulness%20and%20wellness%20themed%20materials%20visible&width=800&height=600&seq=8&orientation=landscape'
  },
  {
    id: 9,
    title: '校友返校日',
    date: '2025-05-15 09:00-18:00',
    location: '校园各处',
    status: 'ended',
    type: 'school',
    participants: 1500,
    description: '一年一度的校友返校日活动，邀请各届校友重返母校，回忆美好校园时光，了解学校最新发展。活动包括校园参观、座谈会、文艺表演等多个环节。\n\n活动安排：\n- 09:00-10:00 签到与欢迎仪式\n- 10:00-12:00 校园导览\n- 12:00-14:00 校友午宴\n- 14:00-16:00 学院分会场活动\n- 16:00-18:00 文艺晚会\n\n欢迎各届校友携家人一同参加！',
    image: 'https://readdy.ai/api/search-image?query=A%20university%20alumni%20reunion%20day%20with%20graduates%20of%20different%20ages%20returning%20to%20campus%2C%20welcome%20banners%20and%20registration%20tables%2C%20alumni%20touring%20the%20campus%20with%20current%20students%20as%20guides%2C%20groups%20taking%20photos%20at%20iconic%20campus%20locations%2C%20warm%20atmosphere%20of%20nostalgia%20and%20celebration%20with%20university%20branding%20visible&width=800&height=600&seq=9&orientation=landscape'
  },
  {
    id: 10,
    title: '城市马拉松赛',
    date: '2025-05-30 07:00-12:00',
    location: '市体育中心',
    status: 'upcoming',
    type: 'external',
    participants: 350,
    description: '一年一度的城市马拉松赛事，设有全程马拉松、半程马拉松和5公里健康跑三个项目。我校组织师生参与其中，展现青春活力和体育精神。\n\n参赛须知：\n- 请提前完成体检并获得参赛资格\n- 赛前一天在指定地点领取参赛物资\n- 比赛日请提前2小时到达集合地点\n- 沿途设有补给站和医疗点\n\n报名截止日期：2025年5月20日',
    image: 'https://readdy.ai/api/search-image?query=A%20city%20marathon%20event%20with%20hundreds%20of%20runners%20including%20university%20students%20and%20faculty%20in%20matching%20team%20shirts%2C%20starting%20line%20with%20race%20banners%20and%20timing%20equipment%2C%20spectators%20cheering%20along%20the%20route%2C%20professional%20race%20organization%20with%20water%20stations%20and%20medical%20support%2C%20early%20morning%20urban%20setting%20with%20clear%20skies&width=800&height=600&seq=10&orientation=landscape'
  },
  {
    id: 11,
    title: '图书馆读书月闭幕式',
    date: '2025-05-29 19:00-21:00',
    location: '图书馆报告厅',
    status: 'upcoming',
    type: 'school',
    participants: 200,
    description: '为期一个月的图书馆读书活动即将落下帷幕，闭幕式将公布阅读之星评选结果，并邀请知名作家进行文学讲座，与读者分享阅读心得。\n\n活动议程：\n- 读书月活动回顾\n- 阅读之星颁奖仪式\n- 作家专题讲座\n- 读者互动环节\n\n现场将有精美图书赠送和签售活动，欢迎广大师生参加！',
    image: 'https://readdy.ai/api/search-image?query=A%20library%20reading%20month%20closing%20ceremony%20in%20an%20elegant%20university%20library%20auditorium%20with%20bookshelves%20visible%2C%20author%20at%20podium%20giving%20presentation%2C%20audience%20of%20students%20and%20faculty%20listening%20attentively%2C%20book%20displays%20and%20reading%20awards%20on%20stage%2C%20warm%20lighting%20creating%20scholarly%20atmosphere&width=800&height=600&seq=11&orientation=landscape'
  },
  {
    id: 12,
    title: '社区公益义诊活动',
    date: '2025-05-22 09:00-16:00',
    location: '社区服务中心',
    status: 'upcoming',
    type: 'external',
    participants: 80,
    description: '医学院联合附属医院组织的社区义诊活动，为社区居民提供基础健康检查、常见病咨询和健康生活方式指导，践行医学生社会责任。\n\n服务项目：\n- 血压、血糖测量\n- 常见疾病咨询\n- 合理用药指导\n- 健康生活方式宣教\n\n医学专业学生可获得社会实践学分，请提前报名参与。',
    image: 'https://readdy.ai/api/search-image?query=Medical%20students%20and%20doctors%20from%20university%20hospital%20providing%20free%20health%20consultations%20to%20community%20members%2C%20medical%20checkup%20stations%20with%20equipment%20for%20blood%20pressure%20and%20glucose%20testing%2C%20elderly%20residents%20receiving%20care%2C%20informational%20health%20posters%2C%20community%20center%20setting%20with%20professional%20medical%20atmosphere&width=800&height=600&seq=12&orientation=landscape'
  }
]);

// 状态变量
const activeType = ref('all');
const selectedTimeRange = ref(timeRanges[0]);
const activeStatus = ref('all');
const isTimeDropdownOpen = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(8);
const isModalOpen = ref(false);
const selectedActivity = ref(null);

// 空状态图片
const emptyStateImage = 'https://readdy.ai/api/search-image?query=A%20minimalist%20illustration%20of%20an%20empty%20calendar%20or%20event%20schedule%20with%20subtle%20decorative%20elements%2C%20clean%20modern%20design%20with%20soft%20colors%2C%20showing%20no%20events%20or%20activities%20available%2C%20suitable%20for%20a%20no%20data%20state%20in%20a%20university%20activities%20website&width=400&height=400&seq=13&orientation=squarish';

// 筛选活动
const filteredActivities = computed(() => {
  let result = activities.value;
  
  // 按类型筛选
  if (activeType.value !== 'all') {
    result = result.filter(activity => activity.type === activeType.value);
  }
  
  // 按状态筛选
  if (activeStatus.value !== 'all') {
    result = result.filter(activity => activity.status === activeStatus.value);
  }
  
  // 按时间筛选
  if (selectedTimeRange.value.id !== 'all') {
    const today = new Date();
    const activityDates = result.map(activity => {
      // 提取日期部分（处理范围日期情况）
      const datePart = activity.date.split(' ')[0].split(' - ')[0];
      return new Date(datePart);
    });
    
    if (selectedTimeRange.value.id === 'week') {
      // 最近7天
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      result = result.filter((_, index) => activityDates[index] >= weekAgo);
    } else if (selectedTimeRange.value.id === 'month') {
      // 本月
      result = result.filter((_, index) => 
        activityDates[index].getMonth() === today.getMonth() && 
        activityDates[index].getFullYear() === today.getFullYear()
      );
    } else if (selectedTimeRange.value.id === 'year') {
      // 全年
      result = result.filter((_, index) => 
        activityDates[index].getFullYear() === today.getFullYear()
      );
    }
  }
  
  return result;
});

// 分页数据
const totalPages = computed(() => Math.ceil(filteredActivities.value.length / itemsPerPage.value));

const paginatedActivities = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredActivities.value.slice(startIndex, endIndex);
});

// 显示的页码
const displayedPages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  
  if (totalPages.value <= maxVisiblePages) {
    // 总页数少于最大显示页数，显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // 总页数多于最大显示页数，显示部分页码
    if (currentPage.value <= 3) {
      // 当前页靠近开始
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages.value);
    } else if (currentPage.value >= totalPages.value - 2) {
      // 当前页靠近结束
      pages.push(1);
      pages.push('...');
      for (let i = totalPages.value - 3; i <= totalPages.value; i++) {
        pages.push(i);
      }
    } else {
      // 当前页在中间
      pages.push(1);
      pages.push('...');
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages.value);
    }
  }
  
  return pages;
});

// 方法
const toggleTimeDropdown = () => {
  isTimeDropdownOpen.value = !isTimeDropdownOpen.value;
};

const selectTimeRange = (id) => {
  const selected = timeRanges.find(time => time.id === id);
  if (selected) {
    selectedTimeRange.value = selected;
    isTimeDropdownOpen.value = false;
    currentPage.value = 1; // 重置页码
  }
};

const setActivityType = (type) => {
  activeType.value = type;
  currentPage.value = 1; // 重置页码
};

const setActivityStatus = (status) => {
  activeStatus.value = status;
  currentPage.value = 1; // 重置页码
};

const resetFilters = () => {
  activeType.value = 'all';
  selectedTimeRange.value = timeRanges[0];
  activeStatus.value = 'all';
  currentPage.value = 1;
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

const goToPage = (page) => {
  if (typeof page === 'number') {
    currentPage.value = page;
  }
};

const openActivityDetail = (activity) => {
  selectedActivity.value = activity;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const getStatusText = (status) => {
  switch (status) {
    case 'upcoming': return '即将开始';
    case 'ongoing': return '进行中';
    case 'ended': return '已结束';
    default: return '';
  }
};

const getTypeText = (type) => {
  switch (type) {
    case 'school': return '校内活动';
    case 'department': return '院系活动';
    case 'external': return '校外活动';
    default: return '';
  }
};

// 点击页面其他区域关闭时间下拉框
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative') && isTimeDropdownOpen.value) {
      isTimeDropdownOpen.value = false;
    }
  });
});
</script>

<style scoped>
.container {
  max-width: 1440px;
}

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
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 防止数字输入框的上下箭头 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 模态框动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>

