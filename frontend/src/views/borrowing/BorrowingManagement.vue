<template>
  <div class="borrowing-management-container">
    <div class="page-header">
      <h1>借阅管理</h1>
      <div class="header-actions">
        <el-input
          v-model="searchQuery"
          placeholder="搜索借阅记录"
          prefix-icon="el-icon-search"
          clearable
          @keyup.enter="searchBorrows"
          style="width: 300px"
        />
        <el-button type="primary" @click="searchBorrows">搜索</el-button>
      </div>
    </div>

    <el-tabs v-model="activeTab" @tab-click="handleTabChange">
      <el-tab-pane label="所有借阅" name="all">
        <borrowing-table :borrows="borrows" :loading="loading" @refresh="fetchBorrows" />
      </el-tab-pane>
      <el-tab-pane label="已借出" name="borrowed">
        <borrowing-table :borrows="borrows" :loading="loading" @refresh="fetchBorrows" />
      </el-tab-pane>
      <el-tab-pane label="已归还" name="returned">
        <borrowing-table :borrows="borrows" :loading="loading" @refresh="fetchBorrows" />
      </el-tab-pane>
      <el-tab-pane label="逾期未还" name="overdue">
        <borrowing-table :borrows="borrows" :loading="loading" @refresh="fetchBorrows" />
      </el-tab-pane>
    </el-tabs>

    <div class="pagination-container">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :page-sizes="[10, 20, 50, 100]"
        :total="totalBorrows"
        :page-size="pageSize"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import BorrowingTable from '../../components/borrowing/BorrowingTable.vue'

export default {
  name: 'BorrowingManagement',
  components: {
    BorrowingTable
  },
  setup() {
    const borrows = ref([])
    const loading = ref(true)
    const activeTab = ref('all')
    const searchQuery = ref('')
    const currentPage = ref(1)
    const pageSize = ref(10)
    const totalBorrows = ref(0)

    const fetchBorrows = async () => {
      loading.value = true
      try {
        const params = {
          page: currentPage.value - 1,
          size: pageSize.value,
          query: searchQuery.value,
          status: activeTab.value === 'all' ? null : activeTab.value.toUpperCase()
        }

        const response = await axios.get('/api/borrows', { params })
        borrows.value = response.data.content
        totalBorrows.value = response.data.totalElements
      } catch (error) {
        console.error('获取借阅记录失败:', error)
      } finally {
        loading.value = false
      }
    }

    const searchBorrows = () => {
      currentPage.value = 1
      fetchBorrows()
    }

    const handleTabChange = () => {
      currentPage.value = 1
      fetchBorrows()
    }

    const handleSizeChange = (size) => {
      pageSize.value = size
      fetchBorrows()
    }

    const handleCurrentChange = (page) => {
      currentPage.value = page
      fetchBorrows()
    }

    watch(activeTab, () => {
      fetchBorrows()
    })

    onMounted(() => {
      fetchBorrows()
    })

    return {
      borrows,
      loading,
      activeTab,
      searchQuery,
      currentPage,
      pageSize,
      totalBorrows,
      fetchBorrows,
      searchBorrows,
      handleTabChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
}
</script>

<style scoped>
.borrowing-management-container {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.pagination-container {
  margin-top: 20px;
  text-align: center;
}
</style> 