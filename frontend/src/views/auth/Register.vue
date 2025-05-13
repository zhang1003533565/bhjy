<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #header>
        <div class="card-header">
          <h2>注册新用户</h2>
        </div>
      </template>
      
      <el-form 
        :model="registerForm" 
        :rules="rules" 
        ref="registerFormRef" 
        label-width="80px" 
        class="register-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="registerForm.password" 
            type="password"
            show-password
          />
        </el-form-item>
        
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input 
            v-model="registerForm.confirmPassword" 
            type="password"
            show-password
          />
        </el-form-item>
        
        <el-form-item label="姓名" prop="name">
          <el-input v-model="registerForm.name" />
        </el-form-item>
        
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" />
        </el-form-item>
        
        <el-form-item label="电话" prop="phone">
          <el-input v-model="registerForm.phone" />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            :loading="loading" 
            @click="handleRegister"
          >
            注册
          </el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
        
        <div class="form-footer">
          <router-link to="/login" class="login-link">
            已有账号？立即登录
          </router-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'

export default {
  name: 'Register',
  setup() {
    const registerFormRef = ref(null)
    const router = useRouter()
    const loading = ref(false)
    
    const registerForm = reactive({
      username: '',
      password: '',
      confirmPassword: '',
      name: '',
      email: '',
      phone: ''
    })
    
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (registerForm.confirmPassword !== '') {
          registerFormRef.value.validateField('confirmPassword')
        }
        callback()
      }
    }
    
    const validateConfirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    
    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度应在3到20个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
      ],
      confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        { validator: validateConfirmPass, trigger: 'blur' }
      ],
      name: [
        { required: true, message: '请输入您的姓名', trigger: 'blur' },
        { min: 2, max: 50, message: '姓名长度应在2到50个字符之间', trigger: 'blur' }
      ],
      email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
      ],
      phone: [
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
      ]
    }
    
    const handleRegister = async () => {
      if (!registerFormRef.value) return
      
      await registerFormRef.value.validate(async (valid) => {
        if (valid) {
          loading.value = true
          try {
            await axios.post('/api/auth/register', {
              username: registerForm.username,
              password: registerForm.password,
              name: registerForm.name,
              email: registerForm.email,
              phone: registerForm.phone
            })
            
            ElMessage.success('注册成功，请登录')
            router.push('/login')
          } catch (error) {
            console.error('注册失败:', error)
            ElMessage.error(error.response?.data?.message || '注册失败，请稍后再试')
          } finally {
            loading.value = false
          }
        }
      })
    }
    
    const resetForm = () => {
      registerFormRef.value.resetFields()
    }
    
    return {
      registerFormRef,
      registerForm,
      rules,
      loading,
      handleRegister,
      resetForm
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 500px;
}

.card-header {
  text-align: center;
}

.card-header h2 {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.register-form {
  margin-top: 20px;
}

.form-footer {
  margin-top: 20px;
  text-align: center;
}

.login-link {
  color: #409EFF;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style> 