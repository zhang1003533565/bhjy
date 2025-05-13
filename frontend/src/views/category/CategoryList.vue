<template>
  <div class="category-list-container">
    <div class="page-header">
      <h1>图书分类</h1>
    </div>

    <el-row :gutter="20" class="category-grid">
      <el-col 
        :xs="24" 
        :sm="12" 
        :md="8" 
        :lg="6" 
        v-for="category in categories" 
        :key="category.id" 
        class="category-item"
      >
        <router-link :to="{ name: 'BookList', query: { category: category.id } }">
          <el-card shadow="hover" :body-style="{ padding: '20px' }">
            <div class="category-icon">
              <el-icon :size="40"><Collection /></el-icon>
            </div>
            <h3 class="category-name">{{ category.name }}</h3>
            <p class="category-description">{{ category.description || '暂无描述' }}</p>
            <p class="book-count">包含 {{ category.bookCount || 0 }} 本书</p>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Collection } from '@element-plus/icons-vue'

export default {
  name: 'CategoryList',
  components: {
    Collection
  },
  setup() {
    const categories = ref([])
    const loading = ref(true)

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories')
        categories.value = response.data
      } catch (error) {
        console.error('获取分类列表失败:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchCategories()
    })

    return {
      categories,
      loading
    }
  }
}
</script>

<style scoped>
.category-list-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.category-grid {
  margin-bottom: 30px;
}

.category-item {
  margin-bottom: 20px;
}

.category-item a {
  text-decoration: none;
  color: inherit;
}

.category-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  color: #409EFF;
}

.category-name {
  font-size: 18px;
  margin: 0 0 10px 0;
  text-align: center;
}

.category-description {
  color: #606266;
  margin-bottom: 10px;
  text-align: center;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.book-count {
  text-align: center;
  color: #909399;
  font-size: 14px;
  margin: 0;
}
</style> 