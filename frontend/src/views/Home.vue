<template>
  <div class="home">
    <div class="hero">
      <div class="container">
        <h1>欢迎使用图书馆管理系统</h1>
        <p>查找、借阅和管理图书的便捷平台</p>
        <el-button type="primary" size="large" @click="$router.push('/books')">
          浏览图书
        </el-button>
      </div>
    </div>

    <div class="container">
      <el-row :gutter="20" class="features">
        <el-col :xs="24" :sm="12" :md="8">
          <div class="feature-card">
            <el-icon size="40" color="#409EFF"><Search /></el-icon>
            <h3>丰富的图书资源</h3>
            <p>提供多种类型的图书资源，满足不同读者的需求。</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <div class="feature-card">
            <el-icon size="40" color="#409EFF"><Calendar /></el-icon>
            <h3>高效的借阅管理</h3>
            <p>轻松实现图书借阅、归还和续借，跟踪借阅历史记录。</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <div class="feature-card">
            <el-icon size="40" color="#409EFF"><Bell /></el-icon>
            <h3>个性化的阅读体验</h3>
            <p>根据阅读偏好，推荐相关图书，提高阅读体验。</p>
          </div>
        </el-col>
      </el-row>

      <div class="latest-books">
        <h2>最新图书</h2>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="6" v-for="(book, index) in latestBooks" :key="index">
            <el-card shadow="hover" class="book-card" @click="$router.push(`/books/${book.id}`)">
              <img :src="book.coverImage || '/images/no-cover.png'" alt="封面" class="book-cover" />
              <div class="book-info">
                <h3>{{ book.title }}</h3>
                <p>{{ book.author }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Search, Calendar, Bell } from '@element-plus/icons-vue'
import axios from 'axios'

// 模拟最新图书数据
const latestBooks = ref([
  {
    id: 1,
    title: '活着',
    author: '余华',
    coverImage: ''
  },
  {
    id: 2,
    title: '三体',
    author: '刘慈欣',
    coverImage: ''
  },
  {
    id: 3,
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    coverImage: ''
  },
  {
    id: 4,
    title: '月亮与六便士',
    author: '毛姆',
    coverImage: ''
  }
])

// 获取最新图书数据
const fetchLatestBooks = async () => {
  try {
    // 实际项目中从API获取数据
    // const response = await axios.get('/api/books/latest')
    // latestBooks.value = response.data
  } catch (error) {
    console.error('获取最新图书失败:', error)
  }
}

onMounted(() => {
  fetchLatestBooks()
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
  color: white;
  padding: 60px 0;
  text-align: center;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.features {
  margin: 40px 0;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 30px;
  height: 100%;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  margin: 20px 0 10px;
  font-size: 1.2rem;
}

.feature-card p {
  color: #606266;
  line-height: 1.6;
}

.latest-books {
  margin: 60px 0;
}

.latest-books h2 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  text-align: center;
}

.book-card {
  height: 100%;
  cursor: pointer;
  transition: transform 0.3s;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-cover {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #f5f7fa;
}

.book-info {
  padding: 15px 0;
}

.book-info h3 {
  font-size: 1rem;
  margin-bottom: 5px;
}

.book-info p {
  color: #909399;
  font-size: 0.9rem;
}
</style> 