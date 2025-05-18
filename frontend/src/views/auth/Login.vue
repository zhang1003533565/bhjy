<template>
    <div class="full-page-background">
        <div class="login-card">
            <div class="left-panel">
                <div class="logo-container">
                     <img :src="logoImage" alt="学校 Logo" class="school-logo">
                    </div>

                <h2 class="library-name chinese">河北建筑工程学院图书馆</h2>
                <p class="library-name english">HEBEI UNIVERSITY OF ARCHITECTURE LIBRARY</p>

                </div>

            <div class="right-panel">
                <div class="form-header">
                    <h2>图书馆用户登录</h2>
                    <p>Welcome to login</p>
                </div>

                <form @submit.prevent="handleLogin">
                    <div class="form-group">
                        <label for="account">
                            账号/用户名
                        </label>
                        <input type="text" id="account" v-model="account" placeholder="请输入您的账号">
                    </div>

                    <div class="form-group">
                        <label for="password">
                            密码
                        </label>
                        <input type="password" id="password" v-model="password" placeholder="请输入您的密码">
                    </div>

                    <div class="remember-forgot">
                        <div class="remember-me">
                            <input type="checkbox" id="rememberMe" v-model="rememberMe">
                            <label for="rememberMe">记住我</label>
                        </div>
                        <a href="#" class="forgot-password">忘记密码?</a>
                    </div>


                    <div class="form-actions">
                        <button type="submit" class="login-button">
                            登录
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { login } from '@/api/auth'  // 导入登录接口
import logoImage from '@/assets/login/logo.png'
import backgroundImage from '@/assets/login/background.jpg'

export default {
    name: 'LoginPage',
    data() {
        return {
            account: '',
            password: '',
            rememberMe: false,
            logoImage: logoImage,
            backgroundImageUrl: `url(${backgroundImage})`
        };
    },
    mounted() {
        document.documentElement.style.setProperty('--background-image-url', this.backgroundImageUrl);
    },
    beforeUnmount() {
        document.documentElement.style.removeProperty('--background-image-url');
    },
    methods: {
        async handleLogin() {
            // 打印请求参数
            console.log('登录请求参数:', {
                account: this.account,
                password: this.password,
                rememberMe: this.rememberMe
            });

            try {
                // 调用登录接口
                const response = await login({
                    account: this.account,
                    password: this.password
                });
                
                // 打印接口返回信息
                console.log('登录接口返回:', response);

                if (response.token) {
                    // 登录成功
                    console.log('登录成功');
                    console.log('获取到的token:', response.token);
                    console.log('用户信息:', response.user);
                    
                    // 存储token和用户信息
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify(response.user));
                    
                    // 如果需要记住登录状态
                    if (this.rememberMe) {
                        localStorage.setItem('rememberMe', 'true');
                    }

                    // TODO: 这里可以添加登录成功后的路由跳转
                    // this.$router.push('/');
                } else {
                    console.log('登录失败:', response.message);
                }
            } catch (error) {
                // 打印错误信息
                console.error('登录请求失败:', error);
                console.error('错误详情:', error.response?.data || error.message);
            }
        }
    }
};
</script>

<style scoped>
/* 可以根据需要添加自定义样式 */

/* 全局重置和基础样式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 14px;
}

/* 全页面背景样式 */
.full-page-background {
    background-image: var(--background-image-url);
    background-size: cover;
    background-position: center;
    /* 确保背景覆盖整个视口 */
    width: 100%;
    min-height: 100vh;
    /* 使用 Flexbox 使子元素居中 */
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    padding: 20px; /* 添加一些内边距 */
}

/* 居中卡片样式 */
.login-card {
    background-color: #fff; /* 白色背景 */
    border-radius: 8px; /* 圆角 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 阴影 */
    width: 90%; /* 卡片宽度 */
    max-width: 800px; /* 最大宽度 */
    overflow: hidden; /* 隐藏溢出内容 */
    display: flex; /* 启用 Flexbox 实现左右分栏 */
    z-index: 10; /* 确保卡片在背景图上方 */
}

/* 调整左右分栏在小屏幕下的布局 */
@media (max-width: 768px) { /* 调整断点为 768px */
    .login-card {
        flex-direction: column; /* 在小屏幕下堆叠 */
    }
    .left-panel, .right-panel {
        width: 100%; /* 小屏幕下宽度占满 */
    }
    .left-panel {
        padding-bottom: 20px; /* 增加底部间距 */
    }
    .logo-container img { /* 调整小屏幕下 Logo 大小 */
        width: 60px;
        height: 60px;
    }
     .library-name { /* 调整小屏幕下文字大小 */
        font-size: 14px;
    }
     .library-name.english {
         font-size: 12px;
     }
}

/* 左侧面板样式 */
.left-panel {
    width: 50%; /* 占卡片宽度的一半 */
    background-color: #4B0082; /* 校徽原来的紫色背景 */
    color: white; /* 文字颜色改为白色以适应深色背景 */
    padding: 40px; /* 内边距 */
    display: flex; /* 使用 Flexbox 使内容居中并堆叠 */
    flex-direction: column; /* 垂直堆叠 */
    align-items: center; /* 水平居中 */
    justify-content: center; /* 垂直居中 */
    text-align: center; /* 文字居中 */
}

/* Logo 容器样式 */
.logo-container {
    display: flex; /* 使用 Flexbox 布局多个 Logo (如果需要) */
    align-items: center;
    justify-content: center;
    margin-bottom: 20px; /* Logo 与名称之间的间距 */
}

/* 校徽图片样式 */
.school-logo, .library-logo {
    width: 150px; /* Logo 默认大小 */
    height: 150px;
    object-fit: contain; /* 确保图片不变形并完整显示 */
    margin: 0 10px; /* 如果有多个 Logo，设置它们之间的间距 */
    /* 如果需要白色 Logo，并且原始图片不是白色，可能需要滤镜或使用白色版本的图片 */
    /* filter: brightness(0) invert(1); */
}


/* 图书馆名称样式 */
.library-name {
    font-size: 18px; /* 中文名称大小 */
    margin: 5px 0; /* 名称之间的间距 */
    font-weight: bold;
}

.library-name.english {
    font-size: 16px; /* 英文名称大小 */
    font-weight: normal;
}

/* 系统名称样式 (如果需要) */
/*
.system-name {
    font-size: 16px;
    margin-top: 20px;
}
*/

/* 统一认证按钮样式 (如果需要) */
/*
.auth-button {
    background-color: #fff;
    color: #4B0082;
    padding: 10px 30px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 30px;
}
.auth-description {
    font-size: 12px;
    margin-top: 10px;
}
.help-link {
    color: white;
    font-size: 12px;
    margin-top: 10px;
    text-decoration: underline;
}
*/


/* 右侧面板样式 */
.right-panel {
    width: 50%; /* 占卡片宽度的一半 */
    background-color: #fff; /* 白色背景 */
    padding: 40px; /* 内边距 */
}

/* 表单头部样式 */
.form-header {
    text-align: center;
    margin-bottom: 30px;
}

.form-header h2 {
    font-size: 24px;
    font-weight: bold;
    color: #303133;
    margin-bottom: 5px;
}

.form-header p {
    font-size: 14px;
    color: #606266;
}

/* 表单组样式 */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block; /* 使 Label 独占一行 */
    font-size: 14px;
    font-weight: bold;
    color: #606266;
    margin-bottom: 8px;
}

.form-group input {
    width: 100%; /* 输入框宽度占满父容器 */
    padding: 10px 15px;
    border: 1px solid #dcdfe6; /* 边框颜色 */
    border-radius: 4px; /* 圆角 */
    font-size: 14px;
    color: #606266;
    outline: none; /* 移除聚焦时的外轮廓 */
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1); /* 添加过渡效果 */
}

.form-group input:focus {
    border-color: #409eff; /* 聚焦时的边框颜色 */
}

/* 记住我和忘记密码区域样式 */
.remember-forgot {
    display: flex;
    justify-content: space-between; /* 使记住我和忘记密码分散对齐 */
    align-items: center;
    font-size: 14px;
    margin-bottom: 20px; /* 调整与下方登录按钮的间距 */
}

.remember-me {
    display: flex;
    align-items: center;
}

.remember-me input[type="checkbox"] {
    margin-right: 5px; /* 复选框与文字的间距 */
}

.forgot-password {
    color: #409eff; /* 链接颜色 */
    text-decoration: none;
}

.forgot-password:hover {
    text-decoration: underline;
}


/* 表单操作区域样式 */
.form-actions {
    margin-top: 30px; /* 调整与上方记住我/忘记密码区域的间距 */
}

/* 登录按钮样式 */
.login-button {
    width: 100%; /* 按钮宽度占满父容器 */
    padding: 10px 15px;
    background-color: #673AB7; /* 登录按钮颜色 (深紫色，接近校徽颜色) */
    color: #fff; /* 文字颜色 */
    border: none; /* 移除边框 */
    border-radius: 4px; /* 圆角 */
    font-size: 16px;
    font-weight: bold;
    cursor: pointer; /* 鼠标悬停时显示手型 */
    transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1); /* 添加过渡效果 */
}

.login-button:hover {
    background-color: #5E35B1; /* 鼠标悬停时的颜色 */
}

/* 移除 SVG 容器样式 */
/*
.logo-motto-svg {
    overflow: visible;
    display: block;
    margin: 0 auto;
    width: 300px;
    height: 300px;
}
*/

/* 移除校训文字样式 */
/*
.motto-text {
    font-size: 18px;
    font-weight: bold;
    font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
}
*/

/* 移除 SVG 路径本身 */
/*
.logo-motto-svg path {
    stroke: none;
    fill: none;
}
*/
</style>
