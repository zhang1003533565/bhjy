<template>
  <view class="tab-bar">
    <view 
      class="tab-item" 
      :class="{ active: activeTab === 'home' }" 
      @click="switchTab('home')"
    >
      <uni-icons type="home-filled" size="24" :color="activeTab === 'home' ? '#4CAF50' : '#999'"></uni-icons>
      <text class="tab-text">首页</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: activeTab === 'category' }" 
      @click="switchTab('category')"
    >
      <uni-icons type="list" size="24" :color="activeTab === 'category' ? '#4CAF50' : '#999'"></uni-icons>
      <text class="tab-text">分类</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: activeTab === 'cart' }" 
      @click="switchTab('cart')"
    >
      <uni-icons type="cart" size="24" :color="activeTab === 'cart' ? '#4CAF50' : '#999'"></uni-icons>
      <text class="tab-text">购物车</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: activeTab === 'mine' }" 
      @click="switchTab('mine')"
    >
      <uni-icons type="person" size="24" :color="activeTab === 'mine' ? '#4CAF50' : '#999'"></uni-icons>
      <text class="tab-text">我的</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 定义props
const props = defineProps({
  activeTab: {
    type: String,
    default: 'home'
  }
});

// 定义emit事件
const emit = defineEmits(['tabChange']);

// 切换tab
const switchTab = (tabName: string) => {
  emit('tabChange', tabName);
  
  // 根据tabName跳转到不同页面
  switch(tabName) {
    case 'home':
      uni.switchTab({ url: '/pages/fenlei/fenlei' });
      break;
    case 'category':
      uni.switchTab({ url: '/pages/fenlei/fenlei' });
      break;
    case 'cart':
      uni.switchTab({ url: '/pages/cart/cart' });
      break;
    case 'mine':
      uni.switchTab({ url: '/pages/mine/mine' });
      break;
  }
};
</script>

<style>
.tab-bar {
  display: flex;
  height: 100rpx;
  background-color: #ffffff;
  border-top: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab-text {
  font-size: 12px;
  color: #999;
  margin-top: 6rpx;
}

.tab-item.active .tab-text {
  color: #4CAF50;
}
</style>