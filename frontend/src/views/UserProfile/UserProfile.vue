<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 添加 Header 组件 -->
    <Header />
    <!-- 移除原有的顶部导航栏 -->
    <div class="container mx-auto px-4 py-6">
      <div class="grid grid-cols-12 gap-6">
        <!-- 左侧导航 -->
        <div class="col-span-2">
          <div class="bg-white rounded-lg shadow-sm p-4">
            <nav class="space-y-1">
              <a href="#" class="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700">
                <i class="fas fa-home w-5 h-5 mr-2"></i>
                <span>首页</span>
              </a>
              <a href="#" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                <i class="fas fa-book w-5 h-5 mr-2"></i>
                <span>借阅管理</span>
              </a>
              <a href="#" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                <i class="fas fa-heart w-5 h-5 mr-2"></i>
                <span>我的收藏</span>
              </a>
              <a href="#" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                <i class="fas fa-history w-5 h-5 mr-2"></i>
                <span>借阅历史</span>
              </a>
              <a href="#" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                <i class="fas fa-coins w-5 h-5 mr-2"></i>
                <span>积分中心</span>
              </a>
              <a href="#" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                <i class="fas fa-comment-alt w-5 h-5 mr-2"></i>
                <span>反馈建议</span>
              </a>
              <a href="#" class="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50">
                <i class="fas fa-cog w-5 h-5 mr-2"></i>
                <span>设置</span>
              </a>
            </nav>
          </div>
        </div>

        <!-- 右侧内容区 -->
        <div class="col-span-10">
          <!-- 用户信息区 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex items-start">
              <div class="relative mr-6">
                <img :src="userAvatar" alt="用户头像" class="h-24 w-24 rounded-full object-cover" />
                <button class="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-md cursor-pointer !rounded-button whitespace-nowrap" @click="openAvatarUpload">
                  <i class="fas fa-camera"></i>
                </button>
                <input type="file" ref="avatarInput" class="hidden" accept="image/*" @change="handleAvatarChange" />
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <div>
                    <h2 class="text-2xl font-bold text-gray-800">{{ userData.name }}</h2>
                    <div class="mt-2 text-gray-600 space-y-1">
                      <p class="flex items-center">
                        <i class="fas fa-id-card w-5 mr-2"></i>
                        <span>学号/工号：{{ userData.id }}</span>
                      </p>
                      <p class="flex items-center">
                        <i class="fas fa-envelope w-5 mr-2"></i>
                        <span>邮箱：{{ userData.email }}</span>
                      </p>
                      <p class="flex items-center">
                        <i class="fas fa-user-tag w-5 mr-2"></i>
                        <span>用户类型：{{ userData.type }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="flex space-x-3">
                    <button class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition cursor-pointer !rounded-button whitespace-nowrap" @click="openEditProfile">
                      <i class="fas fa-user-edit mr-2"></i>编辑个人信息
                    </button>
                    <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm hover:bg-gray-200 transition cursor-pointer !rounded-button whitespace-nowrap" @click="openChangePassword">
                      <i class="fas fa-key mr-2"></i>修改密码
                    </button>
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-4 mt-6">
                  <div class="bg-blue-50 rounded-lg p-4 text-center">
                    <p class="text-2xl font-bold text-blue-600">{{ userData.stats.borrowed }}</p>
                    <p class="text-sm text-gray-600 mt-1">已借阅</p>
                  </div>
                  <div class="bg-green-50 rounded-lg p-4 text-center">
                    <p class="text-2xl font-bold text-green-600">{{ userData.stats.returned }}</p>
                    <p class="text-sm text-gray-600 mt-1">已归还</p>
                  </div>
                  <div class="bg-purple-50 rounded-lg p-4 text-center">
                    <p class="text-2xl font-bold text-purple-600">{{ userData.stats.favorites }}</p>
                    <p class="text-sm text-gray-600 mt-1">收藏数</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 统计数据概览 -->
          <div class="grid grid-cols-2 gap-6 mb-6">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-lg font-medium text-gray-800 mb-4">借阅历史统计</h3>
              <div class="flex justify-end mb-4">
                <div class="inline-flex rounded-md shadow-sm">
                  <button 
                    :class="['px-4 py-2 text-sm font-medium border cursor-pointer !rounded-button whitespace-nowrap', 
                      chartPeriod === '7days' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50']"
                    @click="chartPeriod = '7days'"
                  >
                    近 7 天
                  </button>
                  <button 
                    :class="['px-4 py-2 text-sm font-medium border-t border-b border-r cursor-pointer !rounded-button whitespace-nowrap', 
                      chartPeriod === '30days' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50']"
                    @click="chartPeriod = '30days'"
                  >
                    近 30 天
                  </button>
                </div>
              </div>
              <div class="h-64">
                <div ref="borrowChart" class="w-full h-full"></div>
              </div>
            </div>
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h3 class="text-lg font-medium text-gray-800 mb-4">借阅与收藏概览</h3>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="bg-blue-50 rounded-lg p-4">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="text-sm text-gray-600">当前借阅</p>
                      <p class="text-2xl font-bold text-blue-600">{{ userData.stats.borrowed }}</p>
                    </div>
                    <div class="bg-blue-100 rounded-full p-3">
                      <i class="fas fa-book text-blue-500 text-xl"></i>
                    </div>
                  </div>
                </div>
                <div class="bg-purple-50 rounded-lg p-4">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="text-sm text-gray-600">收藏书籍</p>
                      <p class="text-2xl font-bold text-purple-600">{{ userData.stats.favorites }}</p>
                    </div>
                    <div class="bg-purple-100 rounded-full p-3">
                      <i class="fas fa-heart text-purple-500 text-xl"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-green-50 rounded-lg p-4">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="text-sm text-gray-600">信誉评分</p>
                      <p class="text-2xl font-bold text-green-600">{{ userData.stats.creditScore }}</p>
                    </div>
                    <div class="bg-green-100 rounded-full p-3">
                      <i class="fas fa-award text-green-500 text-xl"></i>
                    </div>
                  </div>
                </div>
                <div class="bg-yellow-50 rounded-lg p-4">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="text-sm text-gray-600">积分</p>
                      <p class="text-2xl font-bold text-yellow-600">{{ userData.stats.points }}</p>
                    </div>
                    <div class="bg-yellow-100 rounded-full p-3">
                      <i class="fas fa-coins text-yellow-500 text-xl"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 常用操作面板 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 class="text-lg font-medium text-gray-800 mb-4">常用操作</h3>
            <div class="grid grid-cols-4 gap-4">
              <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center cursor-pointer hover:shadow-md transition">
                <div class="bg-white rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center shadow-sm">
                  <i class="fas fa-book-reader text-blue-500 text-xl"></i>
                </div>
                <h4 class="font-medium text-gray-800">借阅记录</h4>
                <p class="text-sm text-gray-600 mt-1">查看当前借阅书籍</p>
              </div>
              <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center cursor-pointer hover:shadow-md transition">
                <div class="bg-white rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center shadow-sm">
                  <i class="fas fa-heart text-purple-500 text-xl"></i>
                </div>
                <h4 class="font-medium text-gray-800">收藏书籍</h4>
                <p class="text-sm text-gray-600 mt-1">快速查看已收藏书籍</p>
              </div>
              <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 text-center cursor-pointer hover:shadow-md transition">
                <div class="bg-white rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center shadow-sm">
                  <i class="fas fa-coins text-yellow-500 text-xl"></i>
                </div>
                <h4 class="font-medium text-gray-800">积分查询</h4>
                <p class="text-sm text-gray-600 mt-1">查看当前积分</p>
              </div>
              <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center cursor-pointer hover:shadow-md transition">
                <div class="bg-white rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center shadow-sm">
                  <i class="fas fa-comment-dots text-green-500 text-xl"></i>
                </div>
                <h4 class="font-medium text-gray-800">反馈建议</h4>
                <p class="text-sm text-gray-600 mt-1">提交反馈或建议</p>
              </div>
            </div>
          </div>

          <!-- 已借阅书籍列表 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-800">已借阅书籍</h3>
              <button class="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">
                查看全部 <i class="fas fa-chevron-right ml-1"></i>
              </button>
            </div>
            <div v-if="borrowedBooks.length > 0">
              <div class="overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">书籍信息</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">借阅日期</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">应还日期</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="book in borrowedBooks" :key="book.id">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="h-16 w-12 flex-shrink-0 mr-4">
                            <img :src="book.cover" alt="书籍封面" class="h-16 w-12 object-cover rounded" />
                          </div>
                          <div>
                            <div class="text-sm font-medium text-gray-900">{{ book.title }}</div>
                            <div class="text-sm text-gray-500">{{ book.author }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ book.borrowDate }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ book.returnDate }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="[
                          'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                          book.status === '借阅中' ? 'bg-green-100 text-green-800' : 
                          book.status === '已归还' ? 'bg-gray-100 text-gray-800' : 
                          'bg-red-100 text-red-800'
                        ]">
                          {{ book.status }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm">
                        <div class="flex space-x-2">
                          <button v-if="book.status === '借阅中'" class="text-blue-600 hover:text-blue-900 cursor-pointer !rounded-button whitespace-nowrap" @click="renewBook(book.id)">
                            <i class="fas fa-redo-alt mr-1"></i> 续借
                          </button>
                          <button v-if="book.status === '借阅中'" class="text-green-600 hover:text-green-900 cursor-pointer !rounded-button whitespace-nowrap" @click="returnBook(book.id)">
                            <i class="fas fa-check mr-1"></i> 归还
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-else class="py-12 text-center">
              <img src="https://readdy.ai/api/search-image?query=minimalist%20illustration%20of%20empty%20bookshelf%20or%20library%2C%20simple%20line%20art%20style%2C%20clean%20design%20with%20soft%20colors%2C%20showing%20concept%20of%20no%20books%20available&width=200&height=150&seq=empty1&orientation=landscape" alt="暂无借阅" class="mx-auto h-32 mb-4" />
              <p class="text-gray-500">您当前没有借阅中的书籍</p>
              <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition cursor-pointer !rounded-button whitespace-nowrap">
                去借阅书籍
              </button>
            </div>
          </div>

          <!-- 收藏书籍列表 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-800">收藏书籍</h3>
              <button class="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap">
                查看全部 <i class="fas fa-chevron-right ml-1"></i>
              </button>
            </div>
            <div v-if="favoriteBooks.length > 0" class="grid grid-cols-4 gap-6">
              <div v-for="book in favoriteBooks" :key="book.id" class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <div class="relative h-48 overflow-hidden">
                  <img :src="book.cover" alt="书籍封面" class="w-full h-full object-cover" />
                  <button class="absolute top-2 right-2 bg-white rounded-full p-2 text-red-500 hover:text-red-700 shadow-sm cursor-pointer !rounded-button whitespace-nowrap" @click="removeFromFavorites(book.id)">
                    <i class="fas fa-heart"></i>
                  </button>
                </div>
                <div class="p-4">
                  <h4 class="font-medium text-gray-900 mb-1 truncate">{{ book.title }}</h4>
                  <p class="text-sm text-gray-600 mb-2">{{ book.author }}</p>
                  <p class="text-xs text-gray-500">收藏于 {{ book.favoriteDate }}</p>
                </div>
              </div>
            </div>
            <div v-else class="py-12 text-center">
              <img src="https://readdy.ai/api/search-image?query=minimalist%20illustration%20of%20empty%20favorites%20or%20wishlist%2C%20simple%20line%20art%20style%20with%20heart%20symbols%2C%20clean%20design%20with%20soft%20colors%2C%20showing%20concept%20of%20no%20favorite%20items&width=200&height=150&seq=empty2&orientation=landscape" alt="暂无收藏" class="mx-auto h-32 mb-4" />
              <p class="text-gray-500">您当前没有收藏的书籍</p>
              <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition cursor-pointer !rounded-button whitespace-nowrap">
                去发现好书
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑个人信息弹窗 -->
    <div v-if="showEditProfileModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">编辑个人信息</h3>
          <button class="text-gray-400 hover:text-gray-500 cursor-pointer !rounded-button whitespace-nowrap" @click="showEditProfileModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">姓名</label>
            <input type="text" id="name" v-model="editProfileForm.name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">邮箱</label>
            <input type="email" id="email" v-model="editProfileForm.email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">手机号</label>
            <input type="tel" id="phone" v-model="editProfileForm.phone" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm hover:bg-gray-200 transition cursor-pointer !rounded-button whitespace-nowrap" @click="showEditProfileModal = false">
            取消
          </button>
          <button class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition cursor-pointer !rounded-button whitespace-nowrap" @click="saveProfile">
            保存
          </button>
        </div>
      </div>
    </div>

    <!-- 修改密码弹窗 -->
    <div v-if="showChangePasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">修改密码</h3>
          <button class="text-gray-400 hover:text-gray-500 cursor-pointer !rounded-button whitespace-nowrap" @click="showChangePasswordModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700">当前密码</label>
            <input type="password" id="currentPassword" v-model="passwordForm.currentPassword" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700">新密码</label>
            <input type="password" id="newPassword" v-model="passwordForm.newPassword" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">确认新密码</label>
            <input type="password" id="confirmPassword" v-model="passwordForm.confirmPassword" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md shadow-sm hover:bg-gray-200 transition cursor-pointer !rounded-button whitespace-nowrap" @click="showChangePasswordModal = false">
            取消
          </button>
          <button class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition cursor-pointer !rounded-button whitespace-nowrap" @click="changePassword">
            确认修改
          </button>
        </div>
      </div>
    </div>

    <!-- Toast 提示 -->
    <div v-if="toast.show" class="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50">
      {{ toast.message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import * as echarts from 'echarts';
import Header from '@/components/Header.vue';

// 用户数据
const userData = ref({
  name: '张三',
  id: '2023010101',
  email: 'zhangsan@example.com',
  type: '本科生',
  stats: {
    borrowed: 3,
    returned: 12,
    favorites: 5,
    creditScore: 95,
    points: 150
  }
});

// 用户头像
const userAvatar = ref('https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20Asian%20student%20with%20a%20friendly%20smile%2C%20high%20quality%2C%20soft%20lighting%2C%20university%20background%2C%20academic%20setting%2C%20clean%20simple%20background&width=200&height=200&seq=avatar1&orientation=squarish');

// 通知数据
const notifications = ref([
  { content: '您借阅的《数据结构与算法》将在 3 天后到期，请及时归还或续借。', time: '2025-05-15 10:30' },
  { content: '您预约的《人工智能导论》已到馆，请前往图书馆领取。', time: '2025-05-14 14:20' },
  { content: '您的借阅积分已更新，当前积分为 150。', time: '2025-05-12 09:15' }
]);
const unreadNotifications = ref(2);
const showNotifications = ref(false);

// 用户菜单
const showUserMenu = ref(false);

// 已借阅书籍数据
const borrowedBooks = ref([
  {
    id: 1,
    title: '数据结构与算法',
    author: '王明 著',
    cover: 'https://readdy.ai/api/search-image?query=book%20cover%20design%20for%20Data%20Structures%20and%20Algorithms%20textbook%2C%20professional%20academic%20style%2C%20blue%20and%20white%20color%20scheme%2C%20minimalist%20design%20with%20geometric%20patterns%20representing%20data%20structures%2C%20clean%20and%20modern%20look&width=120&height=180&seq=book1&orientation=portrait',
    borrowDate: '2025-05-01',
    returnDate: '2025-05-31',
    status: '借阅中'
  },
  {
    id: 2,
    title: '人工智能导论',
    author: '李华 编著',
    cover: 'https://readdy.ai/api/search-image?query=book%20cover%20design%20for%20Introduction%20to%20Artificial%20Intelligence%20textbook%2C%20professional%20academic%20style%2C%20purple%20and%20white%20color%20scheme%2C%20minimalist%20design%20with%20abstract%20brain%20or%20neural%20network%20pattern%2C%20clean%20and%20modern%20look&width=120&height=180&seq=book2&orientation=portrait',
    borrowDate: '2025-05-05',
    returnDate: '2025-06-05',
    status: '借阅中'
  },
  {
    id: 3,
    title: '计算机网络',
    author: '张伟 著',
    cover: 'https://readdy.ai/api/search-image?query=book%20cover%20design%20for%20Computer%20Networks%20textbook%2C%20professional%20academic%20style%2C%20green%20and%20white%20color%20scheme%2C%20minimalist%20design%20with%20network%20connection%20patterns%2C%20clean%20and%20modern%20look&width=120&height=180&seq=book3&orientation=portrait',
    borrowDate: '2025-05-10',
    returnDate: '2025-06-10',
    status: '借阅中'
  }
]);

// 收藏书籍数据
const favoriteBooks = ref([
  {
    id: 1,
    title: '机器学习实战',
    author: '刘强 著',
    cover: 'https://readdy.ai/api/search-image?query=book%20cover%20design%20for%20Machine%20Learning%20in%20Action%20textbook%2C%20professional%20academic%20style%2C%20orange%20and%20white%20color%20scheme%2C%20minimalist%20design%20with%20abstract%20machine%20learning%20concept%20visualization%2C%20clean%20and%20modern%20look&width=240&height=320&seq=book4&orientation=portrait',
    favoriteDate: '2025-05-10'
  },
  {
    id: 2,
    title: '深度学习基础',
    author: '陈明 编著',
    cover: 'https://readdy.ai/api/search-image?query=book%20cover%20design%20for%20Fundamentals%20of%20Deep%20Learning%20textbook%2C%20professional%20academic%20style%2C%20red%20and%20white%20color%20scheme%2C%20minimalist%20design%20with%20neural%20network%20visualization%2C%20clean%20and%20modern%20look&width=240&height=320&seq=book5&orientation=portrait',
    favoriteDate: '2025-05-08'
  },
  {
    id: 3,
    title: '云计算架构',
    author: '赵芳 著',
    cover: 'https://readdy.ai/api/search-image?query=book%20cover%20design%20for%20Cloud%20Computing%20Architecture%20textbook%2C%20professional%20academic%20style%2C%20light%20blue%20and%20white%20color%20scheme%2C%20minimalist%20design%20with%20cloud%20and%20server%20visualization%2C%20clean%20and%20modern%20look&width=240&height=320&seq=book6&orientation=portrait',
    favoriteDate: '2025-05-05'
  },
  {
    id: 4,
    title: '区块链技术与应用',
    author: '杨光 著',
    cover: 'https://readdy.ai/api/search-image?query=book%20cover%20design%20for%20Blockchain%20Technology%20and%20Applications%20textbook%2C%20professional%20academic%20style%2C%20teal%20and%20white%20color%20scheme%2C%20minimalist%20design%20with%20blockchain%20concept%20visualization%2C%20clean%20and%20modern%20look&width=240&height=320&seq=book7&orientation=portrait',
    favoriteDate: '2025-05-01'
  }
]);

// 图表数据
const borrowChart = ref<HTMLElement | null>(null);
const chartPeriod = ref('7days');
let borrowChartInstance: echarts.ECharts | null = null;

// 弹窗状态
const showEditProfileModal = ref(false);
const showChangePasswordModal = ref(false);
const avatarInput = ref<HTMLInputElement | null>(null);

// 表单数据
const editProfileForm = ref({
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13800138000'
});

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Toast 提示
const toast = ref({
  show: false,
  message: ''
});

// 显示 Toast
const showToast = (message: string) => {
  toast.value.message = message;
  toast.value.show = true;
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
};

// 切换通知面板
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  if (showUserMenu.value) {
    showUserMenu.value = false;
  }
};

// 切换用户菜单
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  if (showNotifications.value) {
    showNotifications.value = false;
  }
};

// 打开头像上传
const openAvatarUpload = () => {
  if (avatarInput.value) {
    avatarInput.value.click();
  }
};

// 处理头像变更
const handleAvatarChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        userAvatar.value = e.target.result as string;
        showToast('头像上传成功');
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
};

// 打开编辑个人信息弹窗
const openEditProfile = () => {
  editProfileForm.value.name = userData.value.name;
  editProfileForm.value.email = userData.value.email;
  showEditProfileModal.value = true;
};

// 保存个人信息
const saveProfile = () => {
  userData.value.name = editProfileForm.value.name;
  userData.value.email = editProfileForm.value.email;
  showEditProfileModal.value = false;
  showToast('个人信息更新成功');
};

// 打开修改密码弹窗
const openChangePassword = () => {
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  showChangePasswordModal.value = true;
};

// 修改密码
const changePassword = () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    showToast('两次输入的密码不一致');
    return;
  }
  
  if (passwordForm.value.newPassword.length < 6) {
    showToast('密码长度不能少于6位');
    return;
  }
  
  showChangePasswordModal.value = false;
  showToast('密码修改成功');
};

// 续借书籍
const renewBook = (bookId: number) => {
  const book = borrowedBooks.value.find(b => b.id === bookId);
  if (book) {
    // 模拟续借操作，将归还日期延长30天
    const returnDate = new Date(book.returnDate);
    returnDate.setDate(returnDate.getDate() + 30);
    book.returnDate = returnDate.toISOString().split('T')[0];
    showToast(`《${book.title}》续借成功`);
  }
};

// 归还书籍
const returnBook = (bookId: number) => {
  const book = borrowedBooks.value.find(b => b.id === bookId);
  if (book) {
    book.status = '已归还';
    userData.value.stats.borrowed--;
    userData.value.stats.returned++;
    showToast(`《${book.title}》归还成功`);
  }
};

// 移除收藏
const removeFromFavorites = (bookId: number) => {
  const index = favoriteBooks.value.findIndex(b => b.id === bookId);
  if (index !== -1) {
    const bookTitle = favoriteBooks.value[index].title;
    favoriteBooks.value.splice(index, 1);
    userData.value.stats.favorites--;
    showToast(`《${bookTitle}》已从收藏中移除`);
  }
};

// 初始化借阅历史图表
const initBorrowChart = () => {
  if (borrowChart.value) {
    borrowChartInstance = echarts.init(borrowChart.value);
    updateBorrowChart();
  }
};

// 更新借阅历史图表
const updateBorrowChart = () => {
  if (!borrowChartInstance) return;

  const days = chartPeriod.value === '7days' ? 7 : 30;
  const dates = [];
  const borrowData = [];
  const returnData = [];

  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    dates.push(`${date.getMonth() + 1}/${date.getDate()}`);
    
    // 模拟数据
    borrowData.push(Math.floor(Math.random() * 5));
    returnData.push(Math.floor(Math.random() * 5));
  }

  const option = {
    animation: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['借阅', '归还'],
      right: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dates
    },
    yAxis: {
      type: 'value',
      minInterval: 1
    },
    series: [
      {
        name: '借阅',
        type: 'bar',
        data: borrowData,
        itemStyle: {
          color: '#3B82F6'
        }
      },
      {
        name: '归还',
        type: 'bar',
        data: returnData,
        itemStyle: {
          color: '#10B981'
        }
      }
    ]
  };

  borrowChartInstance.setOption(option);
};

// 监听图表周期变化
const watchChartPeriod = () => {
  updateBorrowChart();
};

// 页面加载完成后初始化
onMounted(() => {
  initBorrowChart();
  
  // 监听窗口大小变化，重绘图表
  window.addEventListener('resize', () => {
    if (borrowChartInstance) {
      borrowChartInstance.resize();
    }
  });
  
  // 监听图表周期变化
  watchChartPeriod();
});

// 监听图表周期变化
watch(chartPeriod, () => {
  watchChartPeriod();
});

// 点击页面其他地方关闭下拉菜单
onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative') && (showNotifications.value || showUserMenu.value)) {
      showNotifications.value = false;
      showUserMenu.value = false;
    }
  });
});
</script>

<style scoped>
/* 自定义样式 */
input {
  @apply border border-gray-300 rounded-md;
  @apply px-3 py-2;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 表格样式 */
table {
  border-collapse: separate;
  border-spacing: 0;
}

th {
  font-weight: 500;
}

/* 卡片悬浮效果 */
.hover-card-effect {
  transition: transform 0.2s, box-shadow 0.2s;
}

.hover-card-effect:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>

