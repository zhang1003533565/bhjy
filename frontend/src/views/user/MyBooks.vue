<template>
  <div class="my-books-container">
    <div class="page-header">
      <h1>我的借阅</h1>
    </div>

    <el-tabs v-model="activeTab" @tab-click="handleTabChange">
      <el-tab-pane label="当前借阅" name="current">
        <el-table
          v-loading="loading"
          :data="borrowRecords"
          style="width: 100%"
          empty-text="您当前没有借阅任何图书"
        >
          <el-table-column prop="book.title" label="书名" min-width="180">
            <template #default="scope">
              <router-link :to="{ name: 'BookDetail', params: { id: scope.row.book.id } }">
                {{ scope.row.book.title }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="book.author" label="作者" min-width="120" />
          <el-table-column prop="borrowDate" label="借阅日期" width="180">
            <template #default="scope">
              {{ formatDate(scope.row.borrowDate) }}
            </template>
          </el-table-column>
          <el-table-column prop="dueDate" label="应还日期" width="180">
            <template #default="scope">
              <span :class="{ 'overdue': isOverdue(scope.row.dueDate) }">
                {{ formatDate(scope.row.dueDate) }}
                <el-tag v-if="isOverdue(scope.row.dueDate)" type="danger" size="small">已逾期</el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button 
                type="primary" 
                size="small" 
                @click="returnBook(scope.row.id)"
                :loading="returningBook === scope.row.id"
              >
                归还
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="借阅历史" name="history">
        <el-table
          v-loading="loading"
          :data="borrowRecords"
          style="width: 100%"
          empty-text="您没有借阅历史记录"
        >
          <el-table-column prop="book.title" label="书名" min-width="180">
            <template #default="scope">
              <router-link :to="{ name: 'BookDetail', params: { id: scope.row.book.id } }">
                {{ scope.row.book.title }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="book.author" label="作者" min-width="120" />
          <el-table-column prop="borrowDate" label="借阅日期" width="180">
            <template #default="scope">
              {{ formatDate(scope.row.borrowDate) }}
            </template>
          </el-table-column>
          <el-table-column prop="returnDate" label="归还日期" width="180">
            <template #default="scope">
              {{ formatDate(scope.row.returnDate) }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="120">
            <template #default="scope">
              <el-tag :type="getBorrowStatusType(scope.row.status)">
                {{ getBorrowStatusText(scope.row.status) }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="我的预约" name="reservations">
        <el-table
          v-loading="loading"
          :data="reservations"
          style="width: 100%"
          empty-text="您当前没有预约任何图书"
        >
          <el-table-column prop="book.title" label="书名" min-width="180">
            <template #default="scope">
              <router-link :to="{ name: 'BookDetail', params: { id: scope.row.book.id } }">
                {{ scope.row.book.title }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="book.author" label="作者" min-width="120" />
          <el-table-column prop="reservationDate" label="预约日期" width="180">
            <template #default="scope">
              {{ formatDate(scope.row.reservationDate) }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="120">
            <template #default="scope">
              <el-tag :type="getReservationStatusType(scope.row.status)">
                {{ getReservationStatusText(scope.row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button 
                type="danger" 
                size="small" 
                @click="cancelReservation(scope.row.id)"
                :loading="cancelingReservation === scope.row.id"
                :disabled="scope.row.status !== 'PENDING'"
              >
                取消预约
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <div class="pagination-container" v-if="totalItems > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalItems"
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
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'MyBooks',
  setup() {
    const activeTab = ref('current')
    const borrowRecords = ref([])
    const reservations = ref([])
    const loading = ref(true)
    const currentPage = ref(1)
    const pageSize = ref(10)
    const totalItems = ref(0)
    const returningBook = ref(null)
    const cancelingReservation = ref(null)

    const fetchBorrows = async () => {
      loading.value = true
      try {
        const params = {
          page: currentPage.value - 1,
          size: pageSize.value
        }
        
        if (activeTab.value === 'current') {
          params.status = 'BORROWED'
        } else if (activeTab.value === 'history') {
          params.status = 'RETURNED'
        }
        
        const response = await axios.get('/api/borrows/my', { params })
        borrowRecords.value = response.data.content
        totalItems.value = response.data.totalElements
      } catch (error) {
        console.error('获取借阅记录失败:', error)
        ElMessage.error('获取借阅记录失败')
      } finally {
        loading.value = false
      }
    }

    const fetchReservations = async () => {
      loading.value = true
      try {
        const response = await axios.get('/api/reservations/my', {
          params: {
            page: currentPage.value - 1,
            size: pageSize.value
          }
        })
        reservations.value = response.data.content
        totalItems.value = response.data.totalElements
      } catch (error) {
        console.error('获取预约记录失败:', error)
        ElMessage.error('获取预约记录失败')
      } finally {
        loading.value = false
      }
    }

    const handleTabChange = () => {
      currentPage.value = 1
      if (activeTab.value === 'reservations') {
        fetchReservations()
      } else {
        fetchBorrows()
      }
    }

    const handlePageChange = (page) => {
      currentPage.value = page
      if (activeTab.value === 'reservations') {
        fetchReservations()
      } else {
        fetchBorrows()
      }
    }

    const returnBook = async (id) => {
      try {
        await ElMessageBox.confirm('确定要归还这本书吗？', '确认归还', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'info'
        })
        
        returningBook.value = id
        await axios.put(`/api/borrows/${id}/return`)
        ElMessage.success('图书归还成功')
        fetchBorrows()
      } catch (error) {
        if (error !== 'cancel') {
          console.error('归还图书失败:', error)
          ElMessage.error(error.response?.data?.message || '归还图书失败')
        }
      } finally {
        returningBook.value = null
      }
    }

    const cancelReservation = async (id) => {
      try {
        await ElMessageBox.confirm('确定要取消这个预约吗？', '确认取消', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        
        cancelingReservation.value = id
        await axios.put(`/api/reservations/${id}/cancel`)
        ElMessage.success('预约取消成功')
        fetchReservations()
      } catch (error) {
        if (error !== 'cancel') {
          console.error('取消预约失败:', error)
          ElMessage.error(error.response?.data?.message || '取消预约失败')
        }
      } finally {
        cancelingReservation.value = null
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return '未知'
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const isOverdue = (dueDate) => {
      if (!dueDate) return false
      return new Date(dueDate) < new Date()
    }

    const getBorrowStatusText = (status) => {
      const statusMap = {
        BORROWED: '借阅中',
        RETURNED: '已归还',
        OVERDUE: '已逾期',
        LOST: '已丢失'
      }
      return statusMap[status] || status
    }

    const getBorrowStatusType = (status) => {
      const typeMap = {
        BORROWED: 'primary',
        RETURNED: 'success',
        OVERDUE: 'danger',
        LOST: 'danger'
      }
      return typeMap[status] || 'info'
    }

    const getReservationStatusText = (status) => {
      const statusMap = {
        PENDING: '等待中',
        FULFILLED: '已完成',
        CANCELLED: '已取消'
      }
      return statusMap[status] || status
    }

    const getReservationStatusType = (status) => {
      const typeMap = {
        PENDING: 'warning',
        FULFILLED: 'success',
        CANCELLED: 'info'
      }
      return typeMap[status] || 'info'
    }

    onMounted(() => {
      fetchBorrows()
    })

    return {
      activeTab,
      borrowRecords,
      reservations,
      loading,
      currentPage,
      pageSize,
      totalItems,
      returningBook,
      cancelingReservation,
      handleTabChange,
      handlePageChange,
      returnBook,
      cancelReservation,
      formatDate,
      isOverdue,
      getBorrowStatusText,
      getBorrowStatusType,
      getReservationStatusText,
      getReservationStatusType
    }
  }
}
</script>

<style scoped>
.my-books-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  text-align: center;
}

.overdue {
  color: #f56c6c;
}
</style> 