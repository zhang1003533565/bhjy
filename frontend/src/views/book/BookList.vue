<template>
  <div class="book-list-container">
    <div class="page-header">
      <h1>图书目录</h1>
      <div class="search-bar">
        <el-input
          v-model="searchQuery"
          placeholder="搜索图书名称、作者或ISBN"
          prefix-icon="el-icon-search"
          @keyup.enter="searchBooks"
          clearable
        />
        <el-button type="primary" @click="searchBooks">搜索</el-button>
      </div>
    </div>

    <el-row :gutter="20" class="filter-row">
      <el-col :span="6">
        <el-select v-model="selectedCategory" placeholder="选择分类" clearable @change="filterBooks">
          <el-option
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          />
        </el-select>
      </el-col>
      <el-col :span="18" class="sort-options">
        <el-radio-group v-model="sortOption" @change="sortBooks">
          <el-radio-button label="newest">最新上架</el-radio-button>
          <el-radio-button label="title">按书名</el-radio-button>
          <el-radio-button label="author">按作者</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="book-grid">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="book in books" :key="book.id" class="book-item">
        <router-link :to="{ name: 'BookDetail', params: { id: book.id } }">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div class="book-cover">
              <img :src="book.coverImage || '/default-book-cover.jpg'" :alt="book.title" />
              <div class="book-availability" :class="{ 'available': book.availableCopies > 0 }">
                {{ book.availableCopies > 0 ? '可借阅' : '已借完' }}
              </div>
            </div>
            <div class="book-info">
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-author">{{ book.author }}</p>
              <p class="book-category">{{ getCategoryName(book.categoryId) }}</p>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>

    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalBooks"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'BookList',
  setup() {
    const books = ref([])
    const categories = ref([])
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const sortOption = ref('newest')
    const currentPage = ref(1)
    const pageSize = ref(12)
    const totalBooks = ref(0)

    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books', {
          params: {
            page: currentPage.value - 1,
            size: pageSize.value,
            query: searchQuery.value,
            category: selectedCategory.value,
            sort: sortOption.value
          }
        })
        books.value = response.data.content
        totalBooks.value = response.data.totalElements
      } catch (error) {
        console.error('获取图书列表失败:', error)
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories')
        categories.value = response.data
      } catch (error) {
        console.error('获取分类列表失败:', error)
      }
    }

    const searchBooks = () => {
      currentPage.value = 1
      fetchBooks()
    }

    const filterBooks = () => {
      currentPage.value = 1
      fetchBooks()
    }

    const sortBooks = () => {
      fetchBooks()
    }

    const handlePageChange = (page) => {
      currentPage.value = page
      fetchBooks()
    }

    const getCategoryName = (categoryId) => {
      const category = categories.value.find(c => c.id === categoryId)
      return category ? category.name : '未分类'
    }

    onMounted(() => {
      fetchCategories()
      fetchBooks()
    })

    return {
      books,
      categories,
      searchQuery,
      selectedCategory,
      sortOption,
      currentPage,
      pageSize,
      totalBooks,
      searchBooks,
      filterBooks,
      sortBooks,
      handlePageChange,
      getCategoryName
    }
  }
}
</script>

<style scoped>
.book-list-container {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  gap: 10px;
  width: 50%;
}

.filter-row {
  margin-bottom: 20px;
}

.sort-options {
  text-align: right;
}

.book-grid {
  margin-bottom: 30px;
}

.book-item {
  margin-bottom: 20px;
}

.book-cover {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-availability {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #f56c6c;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.book-availability.available {
  background-color: #67c23a;
}

.book-info {
  padding: 14px;
}

.book-title {
  margin: 0;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-author, .book-category {
  margin: 5px 0 0;
  font-size: 14px;
  color: #606266;
}

.pagination-container {
  text-align: center;
  margin-top: 20px;
}
</style> 