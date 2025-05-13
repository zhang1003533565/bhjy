<template>
  <div class="borrowing-table">
    <el-table
      :data="borrows"
      style="width: 100%"
      v-loading="loading"
      empty-text="暂无借阅记录"
    >
      <el-table-column label="图书信息" min-width="300">
        <template #default="scope">
          <div class="book-info">
            <div class="book-cover" v-if="scope.row.book?.coverImage">
              <img :src="scope.row.book.coverImage" :alt="scope.row.book.title" />
            </div>
            <div class="book-details">
              <h3>
                <router-link :to="{ name: 'BookDetail', params: { id: scope.row.book?.id } }">
                  {{ scope.row.book?.title || '未知图书' }}
                </router-link>
              </h3>
              <p>{{ scope.row.book?.author || '未知作者' }}</p>
              <p>ISBN: {{ scope.row.book?.isbn || '无' }}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column label="借阅人" prop="user.name" min-width="120">
        <template #default="scope">
          {{ scope.row.user?.name || '未知用户' }}
        </template>
      </el-table-column>
      
      <el-table-column label="借阅日期" min-width="120">
        <template #default="scope">
          {{ formatDate(scope.row.borrowDate) }}
        </template>
      </el-table-column>
      
      <el-table-column label="应还日期" min-width="120">
        <template #default="scope">
          <span :class="{ 'overdue': isOverdue(scope.row) }">
            {{ formatDate(scope.row.dueDate) }}
          </span>
        </template>
      </el-table-column>
      
      <el-table-column label="归还日期" min-width="120">
        <template #default="scope">
          {{ scope.row.returnDate ? formatDate(scope.row.returnDate) : '未归还' }}
        </template>
      </el-table-column>
      
      <el-table-column label="状态" width="120">
        <template #default="scope">
          <el-tag :type="getBorrowStatusType(scope.row.status)">
            {{ getBorrowStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="scope">
          <div class="action-buttons">
            <el-button 
              v-if="scope.row.status === 'BORROWED'"
              type="primary" 
              size="small" 
              @click="handleReturn(scope.row)"
            >
              归还
            </el-button>
            
            <el-button 
              v-if="scope.row.status === 'OVERDUE'"
              type="warning" 
              size="small" 
              @click="handleReturn(scope.row)"
            >
              逾期归还
            </el-button>
            
            <el-button 
              type="info" 
              size="small" 
              @click="showDetails(scope.row)"
            >
              详情
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 借阅详情对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="借阅详情"
      width="500px"
    >
      <div v-if="selectedBorrow" class="borrow-details">
        <div class="detail-item">
          <span class="label">图书:</span>
          <span>{{ selectedBorrow.book?.title }}</span>
        </div>
        <div class="detail-item">
          <span class="label">借阅人:</span>
          <span>{{ selectedBorrow.user?.name }} ({{ selectedBorrow.user?.username }})</span>
        </div>
        <div class="detail-item">
          <span class="label">借阅日期:</span>
          <span>{{ formatDate(selectedBorrow.borrowDate) }}</span>
        </div>
        <div class="detail-item">
          <span class="label">应还日期:</span>
          <span :class="{ 'overdue': isOverdue(selectedBorrow) }">
            {{ formatDate(selectedBorrow.dueDate) }}
          </span>
        </div>
        <div class="detail-item">
          <span class="label">归还日期:</span>
          <span>{{ selectedBorrow.returnDate ? formatDate(selectedBorrow.returnDate) : '未归还' }}</span>
        </div>
        <div class="detail-item">
          <span class="label">状态:</span>
          <el-tag :type="getBorrowStatusType(selectedBorrow.status)">
            {{ getBorrowStatusText(selectedBorrow.status) }}
          </el-tag>
        </div>
        <div class="detail-item" v-if="selectedBorrow.fine && selectedBorrow.fine > 0">
          <span class="label">罚款:</span>
          <span class="fine">{{ selectedBorrow.fine }} 元</span>
        </div>
        <div class="detail-item">
          <span class="label">备注:</span>
          <span>{{ selectedBorrow.notes || '无' }}</span>
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button 
            v-if="selectedBorrow && (selectedBorrow.status === 'BORROWED' || selectedBorrow.status === 'OVERDUE')"
            type="primary" 
            @click="handleReturn(selectedBorrow); dialogVisible = false"
          >
            归还图书
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import axios from 'axios'

export default {
  name: 'BorrowingTable',
  props: {
    borrows: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['refresh'],
  setup(props, { emit }) {
    const dialogVisible = ref(false)
    const selectedBorrow = ref(null)
    
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
    
    const isOverdue = (borrow) => {
      if (borrow.status === 'OVERDUE') return true
      if (borrow.status === 'RETURNED' || !borrow.dueDate) return false
      return new Date(borrow.dueDate) < new Date()
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
    
    const showDetails = (borrow) => {
      selectedBorrow.value = borrow
      dialogVisible.value = true
    }
    
    const handleReturn = async (borrow) => {
      try {
        await ElMessageBox.confirm(
          `确定要归还《${borrow.book?.title}》吗？`,
          '确认归还',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'info'
          }
        )
        
        try {
          await axios.put(`/api/borrows/${borrow.id}/return`)
          ElMessage.success('图书归还成功')
          emit('refresh')
        } catch (error) {
          console.error('归还图书失败:', error)
          ElMessage.error(error.response?.data?.message || '归还图书失败')
        }
      } catch {
        // 用户取消操作
      }
    }
    
    return {
      dialogVisible,
      selectedBorrow,
      formatDate,
      isOverdue,
      getBorrowStatusText,
      getBorrowStatusType,
      showDetails,
      handleReturn
    }
  }
}
</script>

<style scoped>
.book-info {
  display: flex;
  align-items: center;
}

.book-cover {
  width: 60px;
  height: 80px;
  margin-right: 15px;
  overflow: hidden;
  border-radius: 4px;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-details h3 {
  margin: 0 0 5px;
  font-size: 16px;
}

.book-details p {
  margin: 0 0 3px;
  font-size: 14px;
  color: #606266;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.overdue {
  color: #f56c6c;
}

.borrow-details {
  padding: 10px 0;
}

.detail-item {
  margin-bottom: 15px;
  display: flex;
}

.detail-item .label {
  width: 80px;
  font-weight: bold;
  color: #606266;
}

.fine {
  color: #f56c6c;
  font-weight: bold;
}
</style> 