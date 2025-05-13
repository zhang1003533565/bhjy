<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <div class="card-header">
          <h2>登录图书馆系统</h2>
        </div>
      </template>
      
      <el-form 
        :model="loginForm" 
        :rules="rules" 
        ref="loginFormRef" 
        label-width="0" 
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input 
            v-model="loginForm.username" 
            placeholder="用户名" 
            prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="密码" 
            prefix-icon="Lock"
            show-password
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            :loading="loading" 
            @click="handleLogin" 
            class="login-button"
          >
            登录
          </el-button>
        </el-form-item>
        
        <div class="form-footer">
          <router-link to="/register" class="register-link">
            没有账号？立即注册
          </router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import axios from 'axios'

export default {
  name: 'Login',
  components: {
    User,
    Lock
  },
  setup() {
    const loginFormRef = ref(null)
    const router = useRouter()
    const route = useRoute()
    const loading = ref(false)
    
    const loginForm = reactive({
      username: '',
      password: ''
    })
    
    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度应在3到20个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' }
      ]
    }
    
    const handleLogin = async () => {
      if (!loginFormRef.value) return
      
      await loginFormRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true
          try {
            const response = await axios.post('/api/auth/login', {
              username: loginForm.username,
              password: loginForm.password
            })
            
            const { token, user } = response.data
            
            // 保存令牌和用户信息到本地存储
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            
            // 配置axios默认请求头
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            
            ElMessage.success('登录成功')
            
            // 如果有重定向URL，则跳转至该URL，否则跳转至首页
            const redirectPath = route.query.redirect || '/'
            router.push(redirectPath)
          } catch (error) {
            console.error('登录失败:', error)
            ElMessage.error(error.response?.data?.message || '用户名或密码错误')
          } finally {
            loading.value = false
          }
        }
      })
    }
    
    return {
      loginFormRef,
      loginForm,
      rules,
      loading,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.card-header {
  text-align: center;
}

.card-header h2 {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.login-form {
  margin-top: 20px;
}

.login-button {
  width: 100%;
}

.form-footer {
  margin-top: 20px;
  text-align: center;
}

.register-link {
  color: #409EFF;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style> 