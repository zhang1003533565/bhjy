<template>
  <div class="user-profile-container">
    <div class="page-header">
      <h1>个人信息</h1>
    </div>

    <el-card class="profile-card">
      <el-form 
        :model="userForm" 
        :rules="rules" 
        ref="userFormRef" 
        label-width="100px"
        v-loading="loading"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" disabled />
        </el-form-item>
        
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" />
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        
        <el-form-item label="电话" prop="phone">
          <el-input v-model="userForm.phone" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="updateProfile" :loading="updating">
            保存修改
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="password-card">
      <div class="card-header">
        <h2>修改密码</h2>
      </div>
      <el-form 
        :model="passwordForm" 
        :rules="passwordRules" 
        ref="passwordFormRef" 
        label-width="140px"
      >
        <el-form-item label="当前密码" prop="currentPassword">
          <el-input 
            v-model="passwordForm.currentPassword" 
            type="password" 
            show-password 
          />
        </el-form-item>
        
        <el-form-item label="新密码" prop="newPassword">
          <el-input 
            v-model="passwordForm.newPassword" 
            type="password" 
            show-password 
          />
        </el-form-item>
        
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input 
            v-model="passwordForm.confirmPassword" 
            type="password" 
            show-password 
          />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="updatePassword" :loading="updatingPassword">
            更新密码
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default {
  name: 'UserProfile',
  setup() {
    const userFormRef = ref(null)
    const passwordFormRef = ref(null)
    const loading = ref(true)
    const updating = ref(false)
    const updatingPassword = ref(false)

    const userForm = reactive({
      username: '',
      name: '',
      email: '',
      phone: ''
    })

    const passwordForm = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    const rules = {
      name: [
        { required: true, message: '请输入您的姓名', trigger: 'blur' },
        { min: 2, max: 50, message: '姓名长度应在2到50个字符之间', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请输入您的邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
      ],
      phone: [
        { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' }
      ]
    }

    const passwordRules = {
      currentPassword: [
        { required: true, message: '请输入当前密码', trigger: 'blur' }
      ],
      newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' }
      ],
      confirmPassword: [
        { required: true, message: '请确认新密码', trigger: 'blur' },
        {
          validator: (rule, value, callback) => {
            if (value !== passwordForm.newPassword) {
              callback(new Error('两次输入的密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }
      ]
    }

    const fetchUserProfile = async () => {
      loading.value = true
      try {
        const response = await axios.get('/api/users/profile')
        const userData = response.data
        userForm.username = userData.username
        userForm.name = userData.name
        userForm.email = userData.email
        userForm.phone = userData.phone || ''
      } catch (error) {
        console.error('获取用户信息失败:', error)
        ElMessage.error('获取用户信息失败')
      } finally {
        loading.value = false
      }
    }

    const updateProfile = async () => {
      if (!userFormRef.value) return
      
      await userFormRef.value.validate(async (valid) => {
        if (valid) {
          updating.value = true
          try {
            await axios.put('/api/users/profile', {
              name: userForm.name,
              email: userForm.email,
              phone: userForm.phone
            })
            ElMessage.success('个人信息更新成功')
          } catch (error) {
            console.error('更新个人信息失败:', error)
            ElMessage.error(error.response?.data?.message || '更新个人信息失败')
          } finally {
            updating.value = false
          }
        }
      })
    }

    const updatePassword = async () => {
      if (!passwordFormRef.value) return
      
      await passwordFormRef.value.validate(async (valid) => {
        if (valid) {
          updatingPassword.value = true
          try {
            await axios.put('/api/users/change-password', {
              currentPassword: passwordForm.currentPassword,
              newPassword: passwordForm.newPassword
            })
            ElMessage.success('密码更新成功')
            passwordForm.currentPassword = ''
            passwordForm.newPassword = ''
            passwordForm.confirmPassword = ''
          } catch (error) {
            console.error('更新密码失败:', error)
            ElMessage.error(error.response?.data?.message || '更新密码失败')
          } finally {
            updatingPassword.value = false
          }
        }
      })
    }

    onMounted(() => {
      fetchUserProfile()
    })

    return {
      userFormRef,
      passwordFormRef,
      userForm,
      passwordForm,
      rules,
      passwordRules,
      loading,
      updating,
      updatingPassword,
      updateProfile,
      updatePassword
    }
  }
}
</script>

<style scoped>
.user-profile-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.profile-card, .password-card {
  margin-bottom: 20px;
  max-width: 600px;
}

.card-header {
  margin-bottom: 20px;
}

.card-header h2 {
  font-size: 18px;
  margin: 0;
}
</style> 