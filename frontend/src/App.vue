<template>
  <el-config-provider :locale="zhCn">
    <div class="app">
      <el-container>
        <el-header height="60px">
          <div class="header-container">
            <div class="logo">
              <router-link to="/">图书馆管理系统</router-link>
            </div>
            <el-menu
              mode="horizontal"
              :ellipsis="false"
              router
              :default-active="$route.path"
            >
              <el-menu-item index="/">首页</el-menu-item>
              <el-menu-item index="/books">图书目录</el-menu-item>
              <el-menu-item index="/categories">图书分类</el-menu-item>
              <el-menu-item index="/borrowing">借阅管理</el-menu-item>
            </el-menu>
            <div class="user-actions">
              <el-dropdown>
                <el-button type="primary">
                  用户中心<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <router-link to="/profile">个人信息</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link to="/my-books">我的借阅</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link to="/logout">退出登录</router-link>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer height="60px">
          <div class="footer-content">
            <p>© 2023 图书馆管理系统 - 版权所有</p>
          </div>
        </el-footer>
      </el-container>
    </div>
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-header {
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  z-index: 999;
}

.el-main {
  margin-top: 60px;
  padding: 20px;
  flex: 1;
}

.el-footer {
  background-color: #f5f7fa;
  color: #606266;
  text-align: center;
  line-height: 60px;
  border-top: 1px solid #ebeef5;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px;
}

.logo a {
  color: #409eff;
  text-decoration: none;
}

.user-actions {
  display: flex;
  align-items: center;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}
</style> 