<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->

<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    <!-- 顶部导航 -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center">
          <img src="https://readdy.ai/api/search-image?query=minimalist%20academic%20journal%20logo%20design%20with%20blue%20and%20gold%20colors%2C%20simple%20geometric%20shapes%20representing%20knowledge%20and%20education%2C%20clean%20typography%2C%20professional%20look%2C%20white%20background&width=50&height=50&seq=1&orientation=squarish" alt="校园期刊" class="h-10 w-10 mr-3">
          <h1 class="text-2xl font-bold text-gray-800">校园期刊展示平台</h1>
        </div>
        <div class="flex items-center space-x-4">
          <button class="text-gray-600 hover:text-blue-600 cursor-pointer">
            <i class="fas fa-search text-lg"></i>
          </button>
          <button class="text-gray-600 hover:text-blue-600 cursor-pointer">
            <i class="fas fa-user text-lg"></i>
          </button>
        </div>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="container mx-auto px-4 py-8">
      <!-- 筛选区域 -->
      <section class="bg-white rounded-lg shadow-md p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">期刊类型</label>
            <div class="relative">
              <select v-model="filters.type" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md !rounded-button cursor-pointer">
                <option value="all">全部类型</option>
                <option value="academic">学术期刊</option>
                <option value="news">校园新闻</option>
                <option value="department">院系刊物</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i class="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">发布时间</label>
            <div class="relative">
              <select v-model="filters.time" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md !rounded-button cursor-pointer">
                <option value="all">全部时间</option>
                <option value="week">本周</option>
                <option value="month">本月</option>
                <option value="year">全年</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <i class="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">状态</label>
            <div class="flex space-x-2">
              <button 
                v-for="(status, index) in statusOptions" 
                :key="index"
                @click="filters.status = status.value"
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-md !rounded-button whitespace-nowrap cursor-pointer transition-colors',
                  filters.status === status.value 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                <i :class="['mr-2', status.icon]"></i>{{ status.label }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 内容区域 -->
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- 期刊展示区 -->
        <section class="flex-1">
          <div v-if="filteredJournals.length > 0">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                v-for="(journal, index) in paginatedJournals" 
                :key="index" 
                class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                @click="openJournalDetail(journal)"
              >
                <div class="relative h-48 overflow-hidden">
                  <img :src="journal.coverImage" :alt="journal.title" class="w-full h-full object-cover object-top">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span class="text-white text-xs font-medium px-2 py-1 rounded bg-blue-600">{{ getTypeLabel(journal.type) }}</span>
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{{ journal.title }}</h3>
                  <div class="flex items-center text-gray-500 text-sm mb-3">
                    <i class="fas fa-calendar-alt mr-2"></i>
                    <span>{{ journal.publishDate }}</span>
                  </div>
                  <p class="text-gray-600 text-sm line-clamp-3">{{ journal.description }}</p>
                  <div class="mt-4 flex justify-end">
                    <button class="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">
                      阅读详情 <i class="fas fa-arrow-right ml-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 分页控制 -->
            <div class="mt-10 flex justify-center items-center">
              <button 
                @click="prevPage" 
                :disabled="currentPage === 1" 
                :class="[
                  'px-4 py-2 rounded-l-md !rounded-button whitespace-nowrap cursor-pointer border border-gray-300',
                  currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                ]"
              >
                <i class="fas fa-chevron-left mr-1"></i> 上一页
              </button>
              
              <div v-for="page in totalPages" :key="page" class="hidden md:block">
                <button 
                  @click="goToPage(page)" 
                  :class="[
                    'px-4 py-2 border-t border-b border-gray-300 !rounded-button whitespace-nowrap cursor-pointer',
                    currentPage === page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
              </div>
              
              <button 
                @click="nextPage" 
                :disabled="currentPage === totalPages" 
                :class="[
                  'px-4 py-2 rounded-r-md !rounded-button whitespace-nowrap cursor-pointer border border-gray-300',
                  currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                ]"
              >
                下一页 <i class="fas fa-chevron-right ml-1"></i>
              </button>
            </div>
          </div>

          <!-- 无数据状态 -->
          <div v-else class="bg-white rounded-lg shadow-md p-10 text-center">
            <img src="https://readdy.ai/api/search-image?query=minimalist%20illustration%20of%20empty%20bookshelf%20or%20library%20with%20soft%20shadows%2C%20clean%20lines%2C%20pastel%20colors%2C%20simple%20geometric%20shapes%2C%20no%20text%2C%20professional%20design%2C%20white%20background&width=200&height=200&seq=2&orientation=squarish" alt="暂无期刊" class="w-40 h-40 mx-auto mb-6">
            <h3 class="text-xl font-bold text-gray-800 mb-2">暂无期刊内容</h3>
            <p class="text-gray-600 mb-6">当前筛选条件下没有找到相关期刊，请尝试其他筛选条件</p>
            <button 
              @click="resetFilters" 
              class="px-6 py-2 bg-blue-600 text-white rounded-md !rounded-button whitespace-nowrap cursor-pointer hover:bg-blue-700 transition-colors"
            >
              返回全部期刊
            </button>
          </div>
        </section>

        <!-- 右侧推荐区 -->
        <aside class="w-full lg:w-80 bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <i class="fas fa-star text-yellow-500 mr-2"></i> 推荐期刊
          </h2>
          
          <div class="space-y-4">
            <div 
              v-for="(journal, index) in recommendedJournals" 
              :key="index"
              class="flex items-start space-x-3 pb-4 border-b border-gray-100 cursor-pointer"
              @click="openJournalDetail(journal)"
            >
              <img :src="journal.coverImage" :alt="journal.title" class="w-16 h-20 object-cover object-top rounded">
              <div class="flex-1">
                <h3 class="font-medium text-gray-800 line-clamp-2 text-sm">{{ journal.title }}</h3>
                <div class="flex items-center text-gray-500 text-xs mt-1">
                  <i class="fas fa-calendar-alt mr-1"></i>
                  <span>{{ journal.publishDate }}</span>
                </div>
                <span class="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">{{ getTypeLabel(journal.type) }}</span>
              </div>
            </div>
          </div>
          
          <button class="w-full mt-6 py-2 text-sm text-blue-600 border border-blue-600 rounded-md !rounded-button whitespace-nowrap cursor-pointer hover:bg-blue-50 transition-colors">
            查看更多推荐
          </button>
        </aside>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-4">校园期刊平台</h3>
            <p class="text-gray-400 text-sm">提供最新校园学术资讯，汇聚各院系优质期刊内容，打造校园知识交流平台。</p>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">快速链接</h3>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white cursor-pointer">首页</a></li>
              <li><a href="#" class="hover:text-white cursor-pointer">学术期刊</a></li>
              <li><a href="#" class="hover:text-white cursor-pointer">校园新闻</a></li>
              <li><a href="#" class="hover:text-white cursor-pointer">院系刊物</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-bold mb-4">联系我们</h3>
            <ul class="space-y-2 text-gray-400">
              <li class="flex items-center"><i class="fas fa-envelope mr-2"></i> contact@campus-journal.edu</li>
              <li class="flex items-center"><i class="fas fa-phone mr-2"></i> (010) 1234-5678</li>
              <li class="flex items-center"><i class="fas fa-map-marker-alt mr-2"></i> 北京市海淀区学院路 100 号</li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© 2025 校园期刊平台 版权所有</p>
        </div>
      </div>
    </footer>

    <!-- 期刊详情弹窗 -->
    <div v-if="showJournalDetail" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden" @click.stop>
        <div class="flex flex-col md:flex-row">
          <!-- 左侧封面 -->
          <div class="md:w-2/5 bg-gray-100">
            <img :src="selectedJournal.coverImage" :alt="selectedJournal.title" class="w-full h-full object-cover object-top">
          </div>
          
          <!-- 右侧内容 -->
          <div class="md:w-3/5 p-6 overflow-y-auto max-h-[90vh]">
            <div class="flex justify-between items-start mb-4">
              <span class="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {{ getTypeLabel(selectedJournal.type) }}
              </span>
              <button @click="closeJournalDetail" class="text-gray-400 hover:text-gray-600 cursor-pointer">
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ selectedJournal.title }}</h2>
            
            <div class="flex items-center text-gray-600 mb-4">
              <div class="flex items-center mr-4">
                <i class="fas fa-calendar-alt mr-2"></i>
                <span>{{ selectedJournal.publishDate }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-user mr-2"></i>
                <span>{{ selectedJournal.author }}</span>
              </div>
            </div>
            
            <div class="border-t border-b border-gray-200 py-4 my-4">
              <h3 class="font-bold text-gray-700 mb-2">期刊简介</h3>
              <p class="text-gray-600">{{ selectedJournal.description }}</p>
            </div>
            
            <div class="mb-6">
              <h3 class="font-bold text-gray-700 mb-2">内容预览</h3>
              <div class="text-gray-600 bg-gray-50 p-4 rounded-md text-sm h-40 overflow-y-auto">
                {{ selectedJournal.preview }}
              </div>
            </div>
            
            <div class="flex flex-wrap gap-3">
              <button class="flex-1 py-2 bg-blue-600 text-white rounded-md !rounded-button whitespace-nowrap cursor-pointer hover:bg-blue-700 transition-colors flex items-center justify-center">
                <i class="fas fa-download mr-2"></i> 下载期刊
              </button>
              <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md !rounded-button whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors">
                <i class="fas fa-bookmark"></i>
              </button>
              <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md !rounded-button whitespace-nowrap cursor-pointer hover:bg-gray-50 transition-colors">
                <i class="fas fa-share-alt"></i>
              </button>
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

// 筛选条件
const filters = ref({
  type: 'all',
  time: 'all',
  status: 'latest'
});

// 状态选项
const statusOptions = [
  { label: '最新', value: 'latest', icon: 'fas fa-clock' },
  { label: '最热', value: 'hot', icon: 'fas fa-fire' },
  { label: '推荐', value: 'recommended', icon: 'fas fa-star' }
];

// 分页控制
const currentPage = ref(1);
const itemsPerPage = 6;

// 期刊数据
const journals = ref([
  {
    id: 1,
    title: '计算机科学与技术前沿研究',
    type: 'academic',
    publishDate: '2025-05-15',
    author: '张教授 等',
    description: '本期探讨了人工智能、机器学习、计算机视觉等领域的最新研究成果，包含多篇高质量学术论文和研究报告。',
    coverImage: 'https://readdy.ai/api/search-image?query=professional%20computer%20science%20journal%20cover%20with%20abstract%20digital%20patterns%2C%20blue%20technology%20theme%2C%20clean%20minimalist%20design%2C%20high%20quality%20academic%20publication%2C%20white%20background%20with%20blue%20accents&width=400&height=500&seq=3&orientation=portrait',
    preview: '随着人工智能技术的迅猛发展，深度学习在计算机视觉领域取得了突破性进展。本文综述了最新的卷积神经网络模型及其在图像识别中的应用，并探讨了未来发展趋势。研究表明，结合注意力机制的模型在复杂场景理解任务中表现出色，为智能监控、自动驾驶等应用提供了新的解决方案。此外，本期还收录了关于量子计算、区块链技术、网络安全等多个热点领域的研究论文，展示了计算机科学与技术的最新研究成果。'
  },
  {
    id: 2,
    title: '校园文学季刊 - 春之声',
    type: 'department',
    publishDate: '2025-05-10',
    author: '文学院编辑部',
    description: '收录了校内师生的优秀文学作品，包括诗歌、散文、小说等，展现了校园文学创作的丰富多彩。',
    coverImage: 'https://readdy.ai/api/search-image?query=artistic%20literary%20magazine%20cover%20with%20spring%20theme%2C%20pastel%20colors%2C%20watercolor%20flowers%2C%20poetic%20and%20elegant%20design%2C%20high%20quality%20print%20magazine%20appearance%2C%20soft%20background%20with%20artistic%20elements&width=400&height=500&seq=4&orientation=portrait',
    preview: '《春之声》是我校文学院的季度刊物，本期以"新生"为主题，收录了校内师生创作的诗歌、散文、小说等多种体裁的文学作品。其中，《樱花路》一文以细腻的笔触描绘了校园春天的美景，《未来的声音》小说则展现了当代大学生对未来的思考与憧憬。本期还特别邀请了著名作家王教授撰写专栏，分享其文学创作心得与对当代校园文学的见解。编辑部希望通过这些作品，展现校园文学的活力与深度，为读者带来思想与美的享受。'
  },
  {
    id: 3,
    title: '校园周报 - 第128期',
    type: 'news',
    publishDate: '2025-05-17',
    author: '校报编辑部',
    description: '报道校园重大活动、学术讲座、师生动态等新闻，是了解校园生活的重要窗口。',
    coverImage: 'https://readdy.ai/api/search-image?query=modern%20university%20newspaper%20front%20page%20with%20clean%20layout%2C%20multiple%20columns%2C%20campus%20photos%2C%20professional%20news%20design%2C%20academic%20atmosphere%2C%20white%20background%20with%20minimal%20color%20accents&width=400&height=500&seq=5&orientation=portrait',
    preview: '本期校园周报重点报道了我校举办的第十二届学术创新大赛，来自各院系的300多名学生参与其中，展示了丰富多彩的创新成果。特别值得关注的是，我校机器人研究团队在全国大学生机器人大赛中获得特等奖的喜讯。此外，本期还报道了校园文化节的精彩活动，包括民族文化展、国际美食节等，展现了校园文化的多元与包容。在"师生风采"栏目中，介绍了物理系李教授获得国家自然科学奖的事迹，以及我校学生在国际志愿服务中的感人故事。'
  },
  {
    id: 4,
    title: '经济学研究前沿',
    type: 'academic',
    publishDate: '2025-05-01',
    author: '李教授 等',
    description: '聚焦经济学理论与实践的前沿问题，发表高水平学术研究成果，为经济政策制定提供理论支持。',
    coverImage: 'https://readdy.ai/api/search-image?query=professional%20economics%20journal%20cover%20with%20graphs%20and%20charts%2C%20financial%20theme%2C%20elegant%20design%20with%20gold%20and%20navy%20blue%20colors%2C%20academic%20publication%20appearance%2C%20clean%20background%20with%20subtle%20patterns&width=400&height=500&seq=6&orientation=portrait',
    preview: '本期《经济学研究前沿》重点关注后疫情时代全球经济复苏与转型的关键问题。首篇文章分析了数字经济对传统产业结构的深刻影响，提出了产业升级的新路径。第二篇研究探讨了绿色金融在促进可持续发展中的作用机制，为金融创新提供了理论框架。此外，本期还收录了关于宏观经济政策协调、区域经济一体化、收入分配不平等等热点问题的研究论文，展现了经济学研究的广度与深度。特别值得一提的是，本期邀请了诺贝尔经济学奖获得者撰写的特约评论，对当前经济理论发展提出了独到见解。'
  },
  {
    id: 5,
    title: '医学院学术月刊',
    type: 'department',
    publishDate: '2025-04-25',
    author: '医学院科研处',
    description: '发布医学院最新研究成果，包括基础医学、临床医学、公共卫生等领域的学术论文和研究报告。',
    coverImage: 'https://readdy.ai/api/search-image?query=medical%20journal%20cover%20with%20clean%20clinical%20design%2C%20healthcare%20symbols%2C%20professional%20medical%20publication%20appearance%2C%20light%20blue%20and%20white%20color%20scheme%2C%20scientific%20and%20academic%20look&width=400&height=500&seq=7&orientation=portrait',
    preview: '本期医学院学术月刊重点关注新型传染病防控研究的最新进展。首篇研究论文报道了我院研究团队开发的快速病原体检测新技术，可将检测时间缩短至30分钟，为疾病早期干预提供了重要支持。第二篇论文探讨了人工智能技术在医学影像诊断中的应用，展示了AI辅助诊断系统在肺部疾病筛查中的优异表现。此外，本期还收录了关于慢性疾病管理、精准医疗、医疗资源优化配置等多个方向的研究成果，体现了我院医学研究的多元化与前沿性。临床病例讨论栏目分享了一例罕见疾病的诊治过程，为临床医生提供了宝贵的参考经验。'
  },
  {
    id: 6,
    title: '校友通讯 - 2025春季刊',
    type: 'news',
    publishDate: '2025-04-20',
    author: '校友会办公室',
    description: '报道校友活动、成就与贡献，加强校友与母校的联系，促进校友之间的交流与合作。',
    coverImage: 'https://readdy.ai/api/search-image?query=alumni%20magazine%20cover%20with%20graduation%20and%20success%20theme%2C%20professional%20networking%20design%2C%20campus%20landmarks%2C%20elegant%20layout%2C%20warm%20color%20palette%2C%20high%20quality%20print%20magazine%20appearance&width=400&height=500&seq=8&orientation=portrait',
    preview: '2025春季校友通讯以"创新引领未来"为主题，重点报道了我校杰出校友在各行各业的创新成就。本期封面人物是1995级计算机系校友张明，他创立的科技公司近期在纳斯达克成功上市，成为行业翘楚。特别专题"校友回母校"记录了多位知名校友返校举办的系列讲座，分享他们的职业发展经验与人生感悟，为在校学生提供了宝贵指导。"校友动态"栏目汇总了近期校友在学术、商业、公益等领域的最新成就，展现了校友群体的多元风采。此外，本期还介绍了校友会近期组织的各类活动，以及即将到来的校庆筹备情况，欢迎广大校友积极参与。'
  },
  {
    id: 7,
    title: '环境科学与工程学报',
    type: 'academic',
    publishDate: '2025-04-15',
    author: '王研究员 等',
    description: '发表环境科学与工程领域的原创研究成果，关注环境保护、污染治理、生态修复等热点问题。',
    coverImage: 'https://readdy.ai/api/search-image?query=environmental%20science%20journal%20cover%20with%20nature%20elements%2C%20green%20and%20blue%20color%20scheme%2C%20scientific%20graphs%2C%20sustainable%20development%20theme%2C%20academic%20publication%20design%2C%20clean%20background%20with%20earth%20imagery&width=400&height=500&seq=9&orientation=portrait',
    preview: '本期《环境科学与工程学报》重点关注碳中和背景下的环境治理新技术与新方法。首篇研究论文提出了一种高效低成本的工业废水处理新工艺，在去除重金属污染物的同时，实现了能源回收利用。第二篇研究探讨了城市空气质量监测网络优化布局方法，提高了污染源识别的准确性。特别值得关注的是关于生物多样性保护与生态系统修复的系列研究，为区域生态环境治理提供了科学依据。本期还收录了多篇关于环境政策评估、气候变化适应、绿色技术创新等方向的研究论文，展现了环境科学与工程领域的最新研究动态与成果。'
  },
  {
    id: 8,
    title: '艺术学院作品集 - 2025春',
    type: 'department',
    publishDate: '2025-04-10',
    author: '艺术学院创作中心',
    description: '展示艺术学院师生的优秀创作，包括绘画、雕塑、设计、摄影等多种艺术形式的作品。',
    coverImage: 'https://readdy.ai/api/search-image?query=art%20school%20portfolio%20magazine%20cover%20with%20vibrant%20colors%2C%20creative%20design%20elements%2C%20artistic%20typography%2C%20showcase%20of%20various%20art%20forms%2C%20modern%20aesthetic%2C%20gallery%20quality%20appearance%2C%20white%20background%20with%20colorful%20artistic%20elements&width=400&height=500&seq=10&orientation=portrait',
    preview: '2025春季艺术学院作品集以"边界的探索"为主题，收录了我院师生近期创作的优秀艺术作品。本期开篇是我院张教授的油画系列《光影之间》，通过独特的光线处理手法，展现了城市空间的诗意与张力。学生作品部分涵盖了绘画、雕塑、装置、数字艺术等多种形式，其中研究生李明的装置作品《虚拟与现实》获得了第十届全国艺术院校展金奖。特别策划"跨媒介实验"展示了我院师生在艺术创作中融合新技术、新媒体的探索成果，体现了当代艺术的创新精神。本期还收录了艺术评论文章，对当代艺术发展趋势进行了深入分析，为读者提供了理解当代艺术的新视角。'
  },
  {
    id: 9,
    title: '校园生活月刊 - 5月号',
    type: 'news',
    publishDate: '2025-05-05',
    author: '学生会宣传部',
    description: '记录校园生活点滴，报道学生活动、社团风采、校园文化等内容，展现丰富多彩的大学生活。',
    coverImage: 'https://readdy.ai/api/search-image?query=campus%20lifestyle%20magazine%20cover%20with%20students%20enjoying%20university%20life%2C%20vibrant%20colors%2C%20modern%20youth%20culture%2C%20casual%20and%20friendly%20atmosphere%2C%20high%20quality%20lifestyle%20publication%20appearance%2C%20bright%20background%20with%20dynamic%20elements&width=400&height=500&seq=11&orientation=portrait',
    preview: '5月校园生活月刊以"青春绽放"为主题，全方位展现了我校丰富多彩的校园文化生活。本期封面故事聚焦第三十届校园文化艺术节，记录了各院系学生在音乐、舞蹈、戏剧等领域的精彩表现。"社团风采"栏目介绍了摄影协会举办的校园风光摄影大赛获奖作品，以独特视角捕捉了校园的美丽瞬间。"校园达人"专访了我校电子竞技队队长，分享他们在全国大学生电竞联赛中获得冠军的心路历程。此外，本期还包含了美食探店、时尚穿搭、考试攻略等实用内容，以及即将到来的毕业季活动预告，为同学们的校园生活提供了丰富的参考与指南。'
  },
  {
    id: 10,
    title: '人文社会科学评论',
    type: 'academic',
    publishDate: '2025-04-05',
    author: '陈教授 等',
    description: '关注人文社会科学领域的前沿问题，发表哲学、历史、社会学、文学等学科的研究成果。',
    coverImage: 'https://readdy.ai/api/search-image?query=humanities%20and%20social%20sciences%20journal%20cover%20with%20classical%20elements%2C%20philosophical%20theme%2C%20elegant%20typography%2C%20academic%20and%20intellectual%20design%2C%20cream%20and%20burgundy%20color%20scheme%2C%20high%20quality%20scholarly%20publication%20appearance&width=400&height=500&seq=12&orientation=portrait',
    preview: '本期《人文社会科学评论》以"数字时代的人文价值"为主题，探讨了技术变革背景下人文精神的传承与创新。首篇论文从哲学角度分析了人工智能发展对人类主体性的挑战与重构，引发了对技术伦理的深刻思考。历史学研究部分收录了关于数字人文方法在历史研究中应用的创新成果，展示了传统学科与新技术融合的可能性。社会学研究聚焦社交媒体对当代社会关系的重塑，提出了数字社会学的新研究范式。文学研究则探讨了网络文学的美学特征与文化价值，为理解当代文学生态提供了新视角。本期还特别设置了跨学科对话栏目，邀请不同领域的学者共同探讨人文社会科学的发展方向与社会责任。'
  },
  {
    id: 11,
    title: '法学院学报 - 2025年第2期',
    type: 'department',
    publishDate: '2025-04-01',
    author: '法学院学术委员会',
    description: '发表法学理论研究与实务探讨文章，关注法律教育、司法改革、法治建设等热点问题。',
    coverImage: 'https://readdy.ai/api/search-image?query=law%20journal%20cover%20with%20justice%20symbols%2C%20professional%20legal%20publication%20design%2C%20formal%20and%20authoritative%20appearance%2C%20navy%20blue%20and%20gold%20color%20scheme%2C%20high%20quality%20academic%20law%20publication%20look&width=400&height=500&seq=13&orientation=portrait',
    preview: '本期法学院学报以"数字经济法律规制"为主题，探讨了数字技术发展对传统法律体系的挑战与应对。首篇论文分析了数据产权的法律属性与保护机制，为数据要素市场建设提供了法理基础。第二篇研究探讨了算法规制的法律框架，关注人工智能应用中的公平与透明问题。此外，本期还收录了关于网络空间治理、数字金融监管、智能合约法律效力等前沿问题的研究成果，展现了法学研究对技术变革的积极回应。司法实务栏目分享了数字证据在典型案例中的应用经验，为司法实践提供了参考。本期特别邀请了最高法院法官撰写专题评论，对数字时代司法改革方向提出了建设性意见。'
  },
  {
    id: 12,
    title: '国际交流简报 - 2025年春',
    type: 'news',
    publishDate: '2025-03-25',
    author: '国际交流处',
    description: '报道学校国际交流与合作动态，包括国际学术会议、留学项目、国际合作研究等内容。',
    coverImage: 'https://readdy.ai/api/search-image?query=international%20exchange%20newsletter%20cover%20with%20global%20education%20theme%2C%20world%20map%20design%2C%20multicultural%20elements%2C%20professional%20academic%20publication%20appearance%2C%20blue%20and%20white%20color%20scheme%20with%20global%20connectivity%20imagery&width=400&height=500&seq=14&orientation=portrait',
    preview: '2025年春季国际交流简报重点报道了我校近期开展的多项国际合作项目与活动。本期头条新闻是我校与牛津大学签署的全面战略合作协议，双方将在学生交换、科研合作、联合培养等方面展开深入合作。"国际会议"栏目介绍了我校成功举办的"全球气候变化与可持续发展"国际学术研讨会，来自20个国家的专家学者参与了热烈讨论。"留学项目"部分更新了2025-2026学年度校际交换生项目信息，包括申请条件、奖学金设置等重要内容。"国际师生风采"栏目报道了我校国际学生在全球创新挑战赛中获得优异成绩的喜讯，以及我校教授受邀在国际顶级学术会议上作主题报告的学术成就。'
  }
]);

// 获取类型标签
const getTypeLabel = (type: string) => {
  const typeMap: Record<string, string> = {
    'academic': '学术期刊',
    'news': '校园新闻',
    'department': '院系刊物'
  };
  return typeMap[type] || '未分类';
};

// 筛选期刊
const filteredJournals = computed(() => {
  return journals.value.filter(journal => {
    // 类型筛选
    if (filters.value.type !== 'all' && journal.type !== filters.value.type) {
      return false;
    }
    
    // 时间筛选
    if (filters.value.time !== 'all') {
      const publishDate = new Date(journal.publishDate);
      const today = new Date();
      
      if (filters.value.time === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);
        if (publishDate < oneWeekAgo) return false;
      } else if (filters.value.time === 'month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        if (publishDate < oneMonthAgo) return false;
      } else if (filters.value.time === 'year') {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        if (publishDate < oneYearAgo) return false;
      }
    }
    
    // 状态筛选 (简化处理，实际应用中可能需要更复杂的逻辑)
    if (filters.value.status === 'latest') {
      // 最新期刊逻辑 (已经按发布日期排序)
      return true;
    } else if (filters.value.status === 'hot') {
      // 最热期刊逻辑 (这里简化处理，实际可能基于阅读量等数据)
      return journal.id % 2 === 0; // 简化示例
    } else if (filters.value.status === 'recommended') {
      // 推荐期刊逻辑
      return journal.id % 3 === 0; // 简化示例
    }
    
    return true;
  }).sort((a, b) => {
    // 按发布日期降序排序
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });
});

// 分页数据
const totalPages = computed(() => {
  return Math.ceil(filteredJournals.value.length / itemsPerPage);
});

const paginatedJournals = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredJournals.value.slice(startIndex, endIndex);
});

// 推荐期刊
const recommendedJournals = computed(() => {
  // 简化示例：获取最新的5个期刊作为推荐
  return journals.value
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 5);
});

// 分页控制方法
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

const goToPage = (page: number) => {
  currentPage.value = page;
};

// 重置筛选条件
const resetFilters = () => {
  filters.value = {
    type: 'all',
    time: 'all',
    status: 'latest'
  };
  currentPage.value = 1;
};

// 期刊详情弹窗控制
const showJournalDetail = ref(false);
const selectedJournal = ref(journals.value[0]);

const openJournalDetail = (journal: any) => {
  selectedJournal.value = journal;
  showJournalDetail.value = true;
};

const closeJournalDetail = () => {
  showJournalDetail.value = false;
};

// 监听页面点击事件，点击弹窗外部关闭弹窗
onMounted(() => {
  document.addEventListener('click', (event) => {
    if (showJournalDetail.value) {
      const target = event.target as HTMLElement;
      if (target.closest('.fixed') === target) {
        closeJournalDetail();
      }
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>

