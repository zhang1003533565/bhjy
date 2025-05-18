import request from '@/utils/request'

// 登录接口
export function login(data) {
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

// 使用示例：
// import { login } from '@/api/auth'
// 
// // 调用登录接口
// const loginData = {
//   account: '用户名或学号',
//   password: '密码'
// }
// 
// try {
//   const response = await login(loginData)
//   if (response.data.token) {
//     // 登录成功处理
//     localStorage.setItem('token', response.data.token)
//     localStorage.setItem('user', JSON.stringify(response.data.user))
//   }
// } catch (error) {
//   // 错误处理
//   console.error('登录失败：', error)
// } 