<template>
  <div class="book-detail-container">
    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="10" animated />
    </div>
    
    <div v-else-if="error" class="error-container">
      <el-empty description="获取图书信息失败，请稍后再试">
        <el-button type="primary" @click="fetchBookDetails">重试</el-button>
      </el-empty>
    </div>
    
    <div v-else class="book-content">
      <el-row :gutter="30">
        <!-- 图书封面和基本信息 -->
        <el-col :xs="24" :sm="8" :md="6">
          <div class="book-cover">
            <img :src="book.coverImage || '/default-book-cover.jpg'" :alt="book.title" />
          </div>
          <div class="book-actions">
            <el-button 
              type="primary" 
              :disabled="!book.availableCopies" 
              @click="borrowBook"
              :loading="borrowing"
            >
              {{ book.availableCopies ? '借阅此书' : '暂无可借' }}
            </el-button>
            <el-button 
              type="info" 
              :disabled="book.availableCopies" 
              @click="reserveBook"
              :loading="reserving"
            >
              预约此书
            </el-button>
          </div>
          <div class="book-availability">
            <p>馆藏数量: <strong>{{ book.totalCopies }}</strong></p>
            <p>可借数量: <strong>{{ book.availableCopies }}</strong></p>
            <p>位置: <strong>{{ book.location || '未指定' }}</strong></p>
          </div>
        </el-col>
        
        <!-- 图书详细信息 -->
        <el-col :xs="24" :sm="16" :md="18">
          <div class="book-header">
            <h1 class="book-title">{{ book.title }}</h1>
            <el-tag v-if="book.category" size="small">{{ book.category.name }}</el-tag>
          </div>
          
          <div class="book-meta">
            <p><strong>作者:</strong> {{ book.author }}</p>
            <p><strong>出版社:</strong> {{ book.publisher || '未知' }}</p>
            <p><strong>ISBN:</strong> {{ book.isbn }}</p>
            <p><strong>出版年份:</strong> {{ book.publicationYear || '未知' }}</p>
          </div>
          
          <el-divider content-position="left">图书简介</el-divider>
          <div class="book-description">
            <p v-if="book.description">{{ book.description }}</p>
            <p v-else>暂无简介</p>
          </div>
          
          <el-divider content-position="left">借阅信息</el-divider>
          <div class="borrow-info">
            <p v-if="book.availableCopies > 0">
              <el-icon><Success /></el-icon> 当前可借阅
            </p>
            <p v-else>
              <el-icon><Warning /></el-icon> 当前已全部借出，可预约
            </p>
            <p>
              <el-icon><InfoFilled /></el-icon> 借阅期限: 30天
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'BookDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const router = useRouter()
    const book = ref({})
    const loading = ref(true)
    const error = ref(false)
    const borrowing = ref(false)
    const reserving = ref(false)

    const fetchBookDetails = async () => {
      loading.value = true
      error.value = false
      
      try {
        const response = await axios.get(`/api/books/${props.id}`)
        book.value = response.data
      } catch (err) {
        console.error('获取图书详情失败:', err)
        error.value = true
      } finally {
        loading.value = false
      }
    }

    const borrowBook = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        ElMessageBox.confirm('借阅图书需要先登录，是否前往登录页面？', '提示', {
          confirmButtonText: '前往登录',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          router.push({
            name: 'Login',
            query: { redirect: route.fullPath }
          })
        }).catch(() => {})
        return
      }
      
      borrowing.value = true
      try {
        await axios.post('/api/borrows', {
          bookId: props.id
        })
        ElMessage.success('借阅成功！')
        fetchBookDetails() // 重新获取图书信息
      } catch (err) {
        console.error('借阅失败:', err)
        ElMessage.error(err.response?.data?.message || '借阅失败，请稍后再试')
      } finally {
        borrowing.value = false
      }
    }

    const reserveBook = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        ElMessageBox.confirm('预约图书需要先登录，是否前往登录页面？', '提示', {
          confirmButtonText: '前往登录',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          router.push({
            name: 'Login',
            query: { redirect: route.fullPath }
          })
        }).catch(() => {})
        return
      }
      
      reserving.value = true
      try {
        await axios.post('/api/reservations', {
          bookId: props.id
        })
        ElMessage.success('预约成功！当图书可借时会通知您')
      } catch (err) {
        console.error('预约失败:', err)
        ElMessage.error(err.response?.data?.message || '预约失败，请稍后再试')
      } finally {
        reserving.value = false
      }
    }

    onMounted(() => {
      fetchBookDetails()
    })

    return {
      book,
      loading,
      error,
      borrowing,
      reserving,
      fetchBookDetails,
      borrowBook,
      reserveBook
    }
  }
}
</script>

<style scoped>
.book-detail-container {
  padding: 20px;
}

.loading-container, .error-container {
  padding: 40px;
  text-align: center;
}

.book-cover {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.book-cover img {
  width: 100%;
  display: block;
}

.book-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.book-actions .el-button {
  flex: 1;
}

.book-availability {
  background-color: #f5f7fa;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
}

.book-availability p {
  margin: 5px 0;
}

.book-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.book-title {
  margin: 0 10px 0 0;
}

.book-meta {
  margin-bottom: 20px;
}

.book-meta p {
  margin: 10px 0;
}

.book-description {
  line-height: 1.8;
  text-align: justify;
}

.borrow-info {
  background-color: #f0f9eb;
  padding: 15px;
  border-radius: 4px;
}

.borrow-info p {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.borrow-info .el-icon {
  margin-right: 8px;
}
</style> 