<!-- The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work. -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 使用Header组件 -->
    <Header />

    <!-- 主要内容 -->
    <main class="container mx-auto px-4 pt-24 pb-12">
      <!-- 页面标题 -->
      <div class="mb-10 text-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">功能总览 - 学习规划</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">智能学习助手，为您打造个性化学习体验，提升学习效率</p>
      </div>

      <!-- 功能总览区域 -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-th-large text-blue-500 mr-2"></i>
          功能总览
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- 查找与推荐 -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-blue-500 h-full cursor-pointer">
            <div class="flex justify-between items-start mb-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i class="fas fa-book-open text-blue-500 text-xl"></i>
              </div>
              <span class="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">热门</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">查找与推荐</h3>
            <p class="text-gray-600 text-sm mb-4">快速查找所需书籍，获取智能推荐书单。</p>
            <div class="flex justify-between items-center mt-auto">
              <span class="text-blue-600 text-sm font-medium">立即体验</span>
              <i class="fas fa-arrow-right text-blue-500"></i>
            </div>
          </div>

          <!-- AI智能题库与复习功能 -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-purple-500 h-full cursor-pointer">
            <div class="flex justify-between items-start mb-4">
              <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i class="fas fa-tasks text-purple-500 text-xl"></i>
              </div>
              <span class="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">AI 驱动</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">AI 智能题库</h3>
            <p class="text-gray-600 text-sm mb-4">根据所选书籍内容生成个性化题库，助你高效复习。</p>
            <div class="flex justify-between items-center mt-auto">
              <span class="text-purple-600 text-sm font-medium">立即体验</span>
              <i class="fas fa-arrow-right text-purple-500"></i>
            </div>
          </div>

          <!-- AI导学路径 + 知识盲区分析 -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-green-500 h-full cursor-pointer">
            <div class="flex justify-between items-start mb-4">
              <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i class="fas fa-route text-green-500 text-xl"></i>
              </div>
              <span class="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">智能分析</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">AI 导学路径</h3>
            <p class="text-gray-600 text-sm mb-4">系统智能生成学习路径，识别知识盲区，定向强化学习。</p>
            <div class="flex justify-between items-center mt-auto">
              <span class="text-green-600 text-sm font-medium">立即体验</span>
              <i class="fas fa-arrow-right text-green-500"></i>
            </div>
          </div>

          <!-- AI语音助手 + 智能学习小组 -->
          <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-orange-500 h-full cursor-pointer">
            <div class="flex justify-between items-start mb-4">
              <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <i class="fas fa-microphone-alt text-orange-500 text-xl"></i>
              </div>
              <span class="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">互动学习</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">AI 语音助手</h3>
            <p class="text-gray-600 text-sm mb-4">语音交互式学习，轻松加入学习小组，共同提升。</p>
            <div class="flex justify-between items-center mt-auto">
              <span class="text-orange-600 text-sm font-medium">立即体验</span>
              <i class="fas fa-arrow-right text-orange-500"></i>
            </div>
          </div>
        </div>
      </section>

      <!-- 学习规划功能区域 -->
      <section class="mb-16">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-calendar-alt text-blue-500 mr-2"></i>
          学习规划功能
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- 左侧：目标设置和个性化配置 -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-bullseye text-blue-500 mr-2"></i>
              目标驱动
            </h3>
            <p class="text-gray-600 mb-6">输入学习目标（例如：30天完成《数据结构》），系统将自动生成科学合理的学习路径。</p>
            
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-medium mb-2">学习目标</label>
              <div class="relative">
                <input 
                  type="text" 
                  placeholder="例如：30天完成《数据结构》" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  v-model="learningGoal"
                />
                <i class="fas fa-lightbulb absolute right-3 top-3 text-gray-400"></i>
              </div>
            </div>

            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-medium mb-2">学习周期</label>
              <div class="grid grid-cols-2 gap-4">
                <div class="relative">
                  <input 
                    type="date" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    v-model="startDate"
                  />
                  <i class="fas fa-calendar absolute right-3 top-3 text-gray-400"></i>
                </div>
                <div class="relative">
                  <input 
                    type="date" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    v-model="endDate"
                  />
                  <i class="fas fa-calendar-check absolute right-3 top-3 text-gray-400"></i>
                </div>
              </div>
            </div>

            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-medium mb-2">个性化定制</label>
              <p class="text-gray-600 text-sm mb-4">根据用户的学习习惯和时间安排，系统会动态优化学习任务，确保节奏适中。</p>
              
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-700">每日学习时长</span>
                  <div class="flex items-center">
                    <button @click="decreaseHours" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap">
                      <i class="fas fa-minus"></i>
                    </button>
                    <span class="mx-3 text-sm font-medium">{{ studyHours }}小时</span>
                    <button @click="increaseHours" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-700">难度系数</span>
                  <div class="w-48 grid grid-cols-3 gap-2">
                    <button 
                      @click="setDifficulty('easy')" 
                      :class="[
                        'py-1 px-3 text-xs rounded-full cursor-pointer !rounded-button whitespace-nowrap',
                        difficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      ]"
                    >
                      简单
                    </button>
                    <button 
                      @click="setDifficulty('medium')" 
                      :class="[
                        'py-1 px-3 text-xs rounded-full cursor-pointer !rounded-button whitespace-nowrap',
                        difficulty === 'medium' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      ]"
                    >
                      中等
                    </button>
                    <button 
                      @click="setDifficulty('hard')" 
                      :class="[
                        'py-1 px-3 text-xs rounded-full cursor-pointer !rounded-button whitespace-nowrap',
                        difficulty === 'hard' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      ]"
                    >
                      困难
                    </button>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-700">学习提醒</span>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="enableReminders" class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>

            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center cursor-pointer !rounded-button whitespace-nowrap">
              <i class="fas fa-magic mr-2"></i>
              生成学习计划
            </button>
          </div>

          <!-- 右侧：进度跟踪和智能反馈 -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-chart-line text-blue-500 mr-2"></i>
              进度跟踪
            </h3>
            <p class="text-gray-600 mb-6">系统每日推送当天学习任务，并生成图表展示整体进度，帮助用户有效掌控学习节奏。</p>
            
            <div class="mb-8">
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-lg font-medium text-gray-700">学习进度</h4>
                <span class="text-sm text-gray-500">{{ currentDate }}</span>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div ref="progressChartContainer" class="h-48 flex items-center justify-center">
                  <!-- 进度环形图表 -->
                </div>
                <div class="flex flex-col justify-center">
                  <div class="mb-4">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-600">已完成章节</span>
                      <span class="text-sm font-bold text-blue-600">{{ completedChapters }} / {{ totalChapters }}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-600 h-2 rounded-full" :style="`width: ${completionPercentage}%`"></div>
                    </div>
                  </div>
                  
                  <div class="mb-4">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-600">已完成练习</span>
                      <span class="text-sm font-bold text-green-600">{{ completedExercises }} / {{ totalExercises }}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-green-600 h-2 rounded-full" :style="`width: ${exercisePercentage}%`"></div>
                    </div>
                  </div>
                  
                  <div>
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium text-gray-600">学习时长</span>
                      <span class="text-sm font-bold text-purple-600">{{ currentStudyHours }} / {{ targetStudyHours }}小时</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-purple-600 h-2 rounded-full" :style="`width: ${studyHoursPercentage}%`"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 class="text-lg font-medium text-gray-700 mb-4 flex items-center">
                <i class="fas fa-brain text-purple-500 mr-2"></i>
                智能反馈
              </h4>
              <p class="text-gray-600 mb-4 text-sm">结合用户完成情况，系统自动调整学习计划，实现真正个性化的学习体验。</p>
              
              <div class="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-purple-100 rounded-full p-2 mr-3">
                    <i class="fas fa-lightbulb text-purple-500"></i>
                  </div>
                  <div>
                    <h5 class="text-sm font-medium text-purple-800 mb-1">学习建议</h5>
                    <p class="text-sm text-purple-700">根据您的学习进度，建议增加数据结构中"树"章节的练习量，这是您的知识薄弱点。</p>
                  </div>
                </div>
              </div>
              
              <div class="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div class="flex items-start">
                  <div class="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
                    <i class="fas fa-sync-alt text-blue-500"></i>
                  </div>
                  <div>
                    <h5 class="text-sm font-medium text-blue-800 mb-1">计划调整</h5>
                    <p class="text-sm text-blue-700">您的学习速度超出预期，系统已自动调整后续章节的学习时间，为您节省了2天时间。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 动态学习路径展示 -->
      <section>
        <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i class="fas fa-map-marked-alt text-blue-500 mr-2"></i>
          动态学习路径展示
        </h2>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-800">《数据结构》学习路径</h3>
            <div class="flex items-center">
              <span class="text-sm text-gray-600 mr-2">查看方式：</span>
              <button class="bg-blue-600 text-white px-3 py-1 rounded-md text-sm mr-2 cursor-pointer !rounded-button whitespace-nowrap">
                <i class="fas fa-stream mr-1"></i> 时间轴
              </button>
              <button class="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm cursor-pointer !rounded-button whitespace-nowrap">
                <i class="fas fa-project-diagram mr-1"></i> 知识图谱
              </button>
            </div>
          </div>

          <!-- 动态学习路径时间轴 -->
          <div class="relative">
            <!-- 时间轴线 -->
            <div class="absolute left-0 right-0 h-1 bg-gray-200 top-6"></div>
            
            <div class="relative flex justify-between mb-16">
              <!-- 节点1：已完成 -->
              <div class="relative flex flex-col items-center w-1/6">
                <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10 cursor-pointer">
                  <i class="fas fa-check text-white"></i>
                </div>
                <div class="text-center mt-3">
                  <h4 class="text-sm font-medium text-gray-800">基础概念</h4>
                  <p class="text-xs text-gray-500">5月10日 - 5月12日</p>
                  <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full mt-1">已完成</span>
                </div>
              </div>

              <!-- 节点2：已完成 -->
              <div class="relative flex flex-col items-center w-1/6">
                <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10 cursor-pointer">
                  <i class="fas fa-check text-white"></i>
                </div>
                <div class="text-center mt-3">
                  <h4 class="text-sm font-medium text-gray-800">线性表</h4>
                  <p class="text-xs text-gray-500">5月13日 - 5月15日</p>
                  <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full mt-1">已完成</span>
                </div>
              </div>

              <!-- 节点3：当前 -->
              <div class="relative flex flex-col items-center w-1/6">
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center z-10 cursor-pointer animate-pulse">
                  <i class="fas fa-play text-white"></i>
                </div>
                <div class="text-center mt-3">
                  <h4 class="text-sm font-medium text-gray-800">栈与队列</h4>
                  <p class="text-xs text-gray-500">5月16日 - 5月18日</p>
                  <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full mt-1">进行中</span>
                </div>
              </div>

              <!-- 节点4：未开始 -->
              <div class="relative flex flex-col items-center w-1/6">
                <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center z-10 cursor-pointer">
                  <i class="fas fa-tree text-white"></i>
                </div>
                <div class="text-center mt-3">
                  <h4 class="text-sm font-medium text-gray-800">树结构</h4>
                  <p class="text-xs text-gray-500">5月19日 - 5月22日</p>
                  <span class="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full mt-1">未开始</span>
                </div>
              </div>

              <!-- 节点5：未开始 -->
              <div class="relative flex flex-col items-center w-1/6">
                <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center z-10 cursor-pointer">
                  <i class="fas fa-project-diagram text-white"></i>
                </div>
                <div class="text-center mt-3">
                  <h4 class="text-sm font-medium text-gray-800">图结构</h4>
                  <p class="text-xs text-gray-500">5月23日 - 5月26日</p>
                  <span class="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full mt-1">未开始</span>
                </div>
              </div>

              <!-- 节点6：未开始 -->
              <div class="relative flex flex-col items-center w-1/6">
                <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center z-10 cursor-pointer">
                  <i class="fas fa-sort-amount-down text-white"></i>
                </div>
                <div class="text-center mt-3">
                  <h4 class="text-sm font-medium text-gray-800">算法应用</h4>
                  <p class="text-xs text-gray-500">5月27日 - 5月30日</p>
                  <span class="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full mt-1">未开始</span>
                </div>
              </div>
            </div>

            <!-- 当前节点详情 -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div class="flex items-start">
                <div class="flex-shrink-0 bg-blue-100 rounded-full p-3 mr-4">
                  <i class="fas fa-info-circle text-blue-600 text-xl"></i>
                </div>
                <div class="flex-grow">
                  <div class="flex justify-between items-start mb-2">
                    <h4 class="text-lg font-semibold text-gray-800">栈与队列 - 当前学习节点</h4>
                    <span class="text-sm text-blue-600">进度: 67%</span>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h5 class="text-sm font-medium text-gray-700 mb-2">今日学习目标</h5>
                      <ul class="space-y-2">
                        <li class="flex items-start">
                          <i class="fas fa-check-circle text-green-500 mt-0.5 mr-2"></i>
                          <span class="text-sm text-gray-600">栈的基本操作与实现（已完成）</span>
                        </li>
                        <li class="flex items-start">
                          <i class="fas fa-check-circle text-green-500 mt-0.5 mr-2"></i>
                          <span class="text-sm text-gray-600">栈的应用：表达式求值（已完成）</span>
                        </li>
                        <li class="flex items-start">
                          <i class="fas fa-circle text-blue-500 mt-0.5 mr-2"></i>
                          <span class="text-sm text-gray-600">队列的基本概念与操作（进行中）</span>
                        </li>
                        <li class="flex items-start">
                          <i class="far fa-circle text-gray-400 mt-0.5 mr-2"></i>
                          <span class="text-sm text-gray-600">循环队列的实现（未开始）</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 class="text-sm font-medium text-gray-700 mb-2">学习资源</h5>
                      <ul class="space-y-3">
                        <li class="flex items-center">
                          <i class="fas fa-book text-orange-500 mr-2"></i>
                          <a href="#" class="text-sm text-blue-600 hover:underline">《数据结构》第三章 P78-P92</a>
                        </li>
                        <li class="flex items-center">
                          <i class="fas fa-video text-red-500 mr-2"></i>
                          <a href="#" class="text-sm text-blue-600 hover:underline">视频讲解：栈与队列基础（42分钟）</a>
                        </li>
                        <li class="flex items-center">
                          <i class="fas fa-code text-purple-500 mr-2"></i>
                          <a href="#" class="text-sm text-blue-600 hover:underline">实践练习：10道栈与队列相关题目</a>
                        </li>
                        <li class="flex items-center">
                          <i class="fas fa-users text-green-500 mr-2"></i>
                          <a href="#" class="text-sm text-blue-600 hover:underline">加入"数据结构学习小组"讨论</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div class="flex justify-end space-x-3 mt-4">
                    <button class="bg-white border border-blue-500 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                      <i class="fas fa-clock mr-1"></i> 调整时间
                    </button>
                    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer !rounded-button whitespace-nowrap">
                      <i class="fas fa-check-double mr-1"></i> 标记完成
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 底部导航 -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-bold mb-4">学习助手</h3>
            <p class="text-gray-400 text-sm">智能学习平台，为每位学习者提供个性化学习体验，让学习更高效、更有趣。</p>
            <div class="flex space-x-4 mt-4">
              <a href="#" class="text-gray-400 hover:text-white cursor-pointer">
                <i class="fab fa-weixin text-xl"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white cursor-pointer">
                <i class="fab fa-weibo text-xl"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-white cursor-pointer">
                <i class="fab fa-qq text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-bold mb-4">功能导航</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">功能总览</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">学习规划</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">AI 题库</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">资源库</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">学习社区</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-bold mb-4">帮助中心</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">使用指南</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">常见问题</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">意见反馈</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">联系我们</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white text-sm">隐私政策</a></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-bold mb-4">联系我们</h3>
            <ul class="space-y-2">
              <li class="flex items-center text-gray-400 text-sm">
                <i class="fas fa-envelope mr-2"></i>
                <span>support@learningassistant.com</span>
              </li>
              <li class="flex items-center text-gray-400 text-sm">
                <i class="fas fa-phone-alt mr-2"></i>
                <span>400-123-4567</span>
              </li>
              <li class="flex items-center text-gray-400 text-sm">
                <i class="fas fa-map-marker-alt mr-2"></i>
                <span>北京市海淀区中关村科技园</span>
              </li>
            </ul>
            <div class="mt-4">
              <div class="flex items-center bg-gray-700 rounded-lg p-3">
                <i class="fas fa-qrcode text-2xl text-gray-400 mr-3"></i>
                <div>
                  <p class="text-sm">扫码下载 App</p>
                  <p class="text-xs text-gray-500">随时随地学习</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-500 text-sm">© 2025 学习助手. 保留所有权利</p>
          <div class="flex space-x-4 mt-4 md:mt-0">
            <i class="fab fa-cc-visa text-gray-400 text-2xl"></i>
            <i class="fab fa-cc-mastercard text-gray-400 text-2xl"></i>
            <i class="fab fa-alipay text-gray-400 text-2xl"></i>
            <i class="fab fa-weixin text-gray-400 text-2xl"></i>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import * as echarts from 'echarts';
import Header from '@/components/Header.vue';

// 学习目标设置
const learningGoal = ref('30天完成《数据结构》');
const startDate = ref('2025-05-10');
const endDate = ref('2025-06-10');
const studyHours = ref(2);
const difficulty = ref('medium');
const enableReminders = ref(true);

// 进度统计数据
const completedChapters = ref(2);
const totalChapters = ref(6);
const completedExercises = ref(15);
const totalExercises = ref(40);
const currentStudyHours = ref(12);
const targetStudyHours = ref(60);

// 计算属性
const completionPercentage = computed(() => (completedChapters.value / totalChapters.value) * 100);
const exercisePercentage = computed(() => (completedExercises.value / totalExercises.value) * 100);
const studyHoursPercentage = computed(() => (currentStudyHours.value / targetStudyHours.value) * 100);
const currentDate = computed(() => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
});

// 方法
const increaseHours = () => {
  if (studyHours.value < 8) {
    studyHours.value++;
  }
};

const decreaseHours = () => {
  if (studyHours.value > 1) {
    studyHours.value--;
  }
};

const setDifficulty = (level: string) => {
  difficulty.value = level;
};

// 图表相关
const progressChartContainer = ref<HTMLElement | null>(null);
let progressChart: echarts.ECharts | null = null;

onMounted(() => {
  if (progressChartContainer.value) {
    progressChart = echarts.init(progressChartContainer.value);
    
    const option = {
      animation: false,
      series: [
        {
          type: 'pie',
          radius: ['60%', '80%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { 
              value: completedChapters.value, 
              name: '已完成',
              itemStyle: { color: '#3B82F6' }
            },
            { 
              value: totalChapters.value - completedChapters.value, 
              name: '未完成',
              itemStyle: { color: '#E5E7EB' }
            }
          ]
        }
      ],
      graphic: {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: `${Math.round(completionPercentage.value)}%`,
          fontSize: 20,
          fontWeight: 'bold',
          fill: '#3B82F6',
        }
      }
    };
    
    progressChart.setOption(option);
  }
});
</script>

<style scoped>
/* 自定义样式 */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
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
</style>

