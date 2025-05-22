
<template>
  <view class="container">
    <!-- 顶部搜索区域 -->
    <view class="search-container">
      <view class="location">
        <uni-icons type="location" size="18" color="#333"></uni-icons>
        <text class="location-text">北京市朝阳区</text>
        <uni-icons type="arrowdown" size="14" color="#666"></uni-icons>
      </view>
      <view class="search-box">
        <uni-icons type="search" size="18" color="#666"></uni-icons>
        <text class="search-placeholder">搜索农产品、保健品</text>
      </view>
      <view class="scan-icon">
        <uni-icons type="scan" size="24" color="#333"></uni-icons>
      </view>
    </view>

    <!-- 内容区域 -->
    <scroll-view scroll-y class="content-container" @scrolltolower="loadMore" :scroll-top="scrollTop" @scroll="onScroll">
      <!-- 轮播广告区 -->
      <view class="banner-container">
        <swiper class="banner-swiper" circular autoplay interval="3000" duration="500" @change="swiperChange">
          <swiper-item v-for="(item, index) in bannerList" :key="index">
            <image :src="item.imageUrl" mode="aspectFill" class="banner-image"></image>
          </swiper-item>
        </swiper>
        <view class="swiper-dots">
          <view 
            v-for="(item, index) in bannerList" 
            :key="index" 
            class="dot" 
            :class="{ active: currentSwiper === index }">
          </view>
        </view>
      </view>

      <!-- 功能分类导航 -->
      <view class="category-container">
        <scroll-view scroll-x class="category-scroll" show-scrollbar="false">
          <view class="category-grid">
            <view class="category-item cursor-pointer" v-for="(item, index) in categoryList" :key="index">
              <image :src="item.imageUrl" mode="aspectFill" class="category-image"></image>
              <text class="category-text">{{ item.name }}</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 特色板块 -->
      <view class="special-section">
        <!-- 今日特惠 -->
        <view class="section-container">
          <view class="section-header">
            <view class="section-title">
              <view class="title-icon"></view>
              <text class="title-text">今日特惠</text>
            </view>
            <view class="view-more cursor-pointer">
              <text>查看更多</text>
              <uni-icons type="right" size="14" color="#666"></uni-icons>
            </view>
          </view>
          <scroll-view scroll-x class="special-scroll" show-scrollbar="false">
            <view class="special-items">
              <view class="special-item cursor-pointer" v-for="(item, index) in specialOfferList" :key="index">
                <image :src="item.imageUrl" mode="aspectFill" class="special-image"></image>
                <view class="special-info">
                  <text class="special-name">{{ item.name }}</text>
                  <view class="price-container">
                    <text class="current-price">¥{{ item.currentPrice }}</text>
                    <text class="original-price">¥{{ item.originalPrice }}</text>
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>

        <!-- 新品上市 -->
        <view class="section-container">
          <view class="section-header">
            <view class="section-title">
              <view class="title-icon new-icon"></view>
              <text class="title-text">新品上市</text>
            </view>
            <view class="view-more cursor-pointer">
              <text>查看更多</text>
              <uni-icons type="right" size="14" color="#666"></uni-icons>
            </view>
          </view>
          <scroll-view scroll-x class="special-scroll" show-scrollbar="false">
            <view class="special-items">
              <view class="special-item cursor-pointer" v-for="(item, index) in newProductList" :key="index">
                <image :src="item.imageUrl" mode="aspectFill" class="special-image"></image>
                <view class="special-info">
                  <text class="special-name">{{ item.name }}</text>
                  <view class="price-container">
                    <text class="current-price">¥{{ item.price }}</text>
                    <text class="tag-new">新品</text>
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>

        <!-- 养生资讯 -->
        <view class="section-container">
          <view class="section-header">
            <view class="section-title">
              <view class="title-icon health-icon"></view>
              <text class="title-text">养生资讯</text>
            </view>
            <view class="view-more cursor-pointer">
              <text>查看更多</text>
              <uni-icons type="right" size="14" color="#666"></uni-icons>
            </view>
          </view>
          <view class="health-articles">
            <view class="article-item cursor-pointer" v-for="(item, index) in healthArticles" :key="index">
              <view class="article-content">
                <text class="article-title">{{ item.title }}</text>
                <text class="article-desc">{{ item.description }}</text>
                <view class="article-meta">
                  <text class="article-date">{{ item.date }}</text>
                  <text class="article-views">{{ item.views }}阅读</text>
                </view>
              </view>
              <image :src="item.imageUrl" mode="aspectFill" class="article-image"></image>
            </view>
          </view>
        </view>
      </view>

      <!-- 商品推荐列表 -->
      <view class="product-section">
        <view class="section-header">
          <view class="section-title">
            <view class="title-icon recommend-icon"></view>
            <text class="title-text">商品推荐</text>
          </view>
        </view>
        <view class="product-grid">
          <view class="product-item cursor-pointer" v-for="(item, index) in productList" :key="index">
            <image :src="item.imageUrl" mode="aspectFill" class="product-image"></image>
            <view class="product-info">
              <text class="product-name">{{ item.name }}</text>
              <view class="product-meta">
                <view class="price-container">
                  <text class="current-price">¥{{ item.currentPrice }}</text>
                  <text class="original-price">¥{{ item.originalPrice }}</text>
                </view>
                <view class="sales-rating">
                  <text class="sales">已售{{ item.sales }}件</text>
                  <view class="rating">
                    <uni-icons type="star-filled" size="12" color="#FFD700"></uni-icons>
                    <text>{{ item.rating }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="loading-more" v-if="isLoading">
          <uni-icons type="spinner-cycle" size="20" color="#666"></uni-icons>
          <text>加载中...</text>
        </view>
      </view>
    </scroll-view>

    <!-- 底部导航栏 -->
    <view class="tab-bar">
      <view class="tab-item active cursor-pointer">
        <uni-icons type="home-filled" size="24" color="#4CAF50"></uni-icons>
        <text class="tab-text">首页</text>
      </view>
      <view class="tab-item cursor-pointer" @click="navigateToCategory">
        <uni-icons type="list" size="24" color="#999"></uni-icons>
        <text class="tab-text">分类</text>
      </view>
      <view class="tab-item cursor-pointer">
        <uni-icons type="cart" size="24" color="#999"></uni-icons>
        <text class="tab-text">购物车</text>
      </view>
      <view class="tab-item cursor-pointer">
        <uni-icons type="person" size="24" color="#999"></uni-icons>
        <text class="tab-text">我的</text>
      </view>
    </view>

    <!-- 悬浮功能 -->
    <view class="float-buttons">
      <view class="float-button customer-service cursor-pointer">
        <uni-icons type="headphones" size="24" color="#fff"></uni-icons>
      </view>
      <view class="float-button back-to-top cursor-pointer" v-show="showBackToTop" @click="scrollToTop">
        <uni-icons type="top" size="24" color="#fff"></uni-icons>
      </view>
    </view>

    <!-- 新人优惠券提示 -->
    <view class="coupon-tip cursor-pointer" v-if="showCouponTip">
      <view class="coupon-tip-content">
        <image src="https://readdy.ai/api/search-image?query=3D%20cartoon%2C%20gift%20box%20with%20red%20ribbon%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=1&orientation=squarish" class="coupon-icon"></image>
        <view class="coupon-text">
          <text class="coupon-title">新人专享优惠券</text>
          <text class="coupon-desc">最高可享200元优惠</text>
        </view>
      </view>
      <view class="coupon-close" @click.stop="closeCouponTip">
        <uni-icons type="closeempty" size="16" color="#999"></uni-icons>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
// 引入组件
import TabBar from '@/components/TabBar.vue';
// 直接定义函数，不需要 methods
const navigateToCategory = () => {
  uni.navigateTo({
    url: '/pages/fenlei/fenlei' // 替换成你的分类页面路径
  });
};

// 轮播图数据
const bannerList = ref([
  {
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20fresh%20organic%20vegetables%20and%20fruits%20arrangement%20with%20green%20leafy%20vegetables%2C%20colorful%20bell%20peppers%2C%20carrots%2C%20and%20apples%20on%20rustic%20wooden%20table%20with%20soft%20natural%20lighting%2C%20healthy%20food%20concept%2C%20high%20resolution%2C%20professional%20food%20photography%20style%2C%20vibrant%20colors&width=700&height=300&seq=2&orientation=landscape'
  },
  {
    imageUrl: 'https://readdy.ai/api/search-image?query=professional%20product%20photography%20of%20traditional%20Chinese%20herbal%20medicine%20arrangement%20with%20ginseng%2C%20dried%20red%20dates%2C%20goji%20berries%2C%20and%20various%20herbs%20in%20wooden%20bowls%20on%20dark%20background%20with%20soft%20lighting%2C%20health%20supplement%20concept%2C%20high%20resolution%2C%20commercial%20quality&width=700&height=300&seq=3&orientation=landscape'
  },
  {
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20organic%20honey%20products%20with%20glass%20jars%20of%20different%20honey%20varieties%2C%20honeycomb%2C%20and%20wooden%20dipper%20on%20natural%20wooden%20background%20with%20soft%20golden%20lighting%2C%20natural%20sweetener%20concept%2C%20high%20resolution%2C%20commercial%20food%20photography%20style&width=700&height=300&seq=4&orientation=landscape'
  }
]);

// 分类数据
const categoryList = ref([
  {
    name: '新鲜果蔬',
    imageUrl: 'https://readdy.ai/api/search-image?query=icon%2C%20Realistic%20food%2C%20photorealistic%20vegetables%20and%20fruits%2C%20high-detail%203D%20rendering%2C%20prominent%20main%20subjects%2C%20clear%20and%20sharp%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20subtle%20shadows%2C%20product%20photography%20style&width=60&height=60&seq=5&orientation=squarish'
  },
  {
    name: '粮油副食',
    imageUrl: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20rice%20and%20cooking%20oil%20bottle%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=60&height=60&seq=6&orientation=squarish'
  },
  {
    name: '养生茶饮',
    imageUrl: 'https://readdy.ai/api/search-image?query=icon%2C%202.5D%20vector%20illustration%2C%20herbal%20tea%20cup%20with%20steam%2C%20high-quality%20details%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20no%20shadows%2C%20no%20text%2C%20Content%20simple&width=60&height=60&seq=7&orientation=squarish'
  },
  {
    name: '保健品',
    imageUrl: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20vitamin%20bottle%20with%20pills%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=60&height=60&seq=8&orientation=squarish'
  },
  {
    name: '有机蔬菜',
    imageUrl: 'https://readdy.ai/api/search-image?query=icon%2C%202.5D%20vector%20illustration%2C%20organic%20vegetables%20with%20leaf%20label%2C%20high-quality%20details%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20no%20shadows%2C%20no%20text%2C%20Content%20simple&width=60&height=60&seq=9&orientation=squarish'
  },
  {
    name: '坚果炒货',
    imageUrl: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20mixed%20nuts%20in%20bowl%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=60&height=60&seq=10&orientation=squarish'
  },
  {
    name: '滋补品',
    imageUrl: 'https://readdy.ai/api/search-image?query=icon%2C%202.5D%20vector%20illustration%2C%20ginseng%20root%2C%20high-quality%20details%2C%20prominent%20main%20subject%2C%20clear%20and%20sharp%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20isolated%20on%20white%20background%2C%20centered%20composition%2C%20soft%20lighting%2C%20no%20shadows%2C%20no%20text%2C%20Content%20simple&width=60&height=60&seq=11&orientation=squarish'
  },
  {
    name: '蜂蜜制品',
    imageUrl: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%2C%20honey%20jar%20with%20dipper%2C%20subject%20fills%2080%20percent%20of%20frame%2C%20vibrant%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=60&height=60&seq=12&orientation=squarish'
  }
]);

// 今日特惠数据
const specialOfferList = ref([
  {
    name: '云南野生菌菇礼盒装 500g',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20premium%20wild%20mushroom%20gift%20box%20with%20assorted%20mushrooms%20including%20shiitake%20and%20morel%20mushrooms%20arranged%20in%20elegant%20packaging%2C%20gourmet%20food%20concept%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality&width=200&height=200&seq=13&orientation=squarish',
    currentPrice: '128.00',
    originalPrice: '168.00'
  },
  {
    name: '有机黑枸杞 250g装',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20organic%20black%20goji%20berries%20in%20clear%20glass%20jar%2C%20premium%20dried%20superfood%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20health%20food%20concept&width=200&height=200&seq=14&orientation=squarish',
    currentPrice: '89.00',
    originalPrice: '118.00'
  },
  {
    name: '东北长白山人参 5年根',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20premium%20ginseng%20roots%20from%20Northeast%20China%2C%20traditional%20Chinese%20medicine%20ingredient%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20herbal%20supplement%20concept&width=200&height=200&seq=15&orientation=squarish',
    currentPrice: '299.00',
    originalPrice: '399.00'
  },
  {
    name: '新疆和田大枣 500g',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20premium%20red%20dates%20from%20Xinjiang%20in%20clear%20packaging%2C%20dried%20fruit%20superfood%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20natural%20snack%20concept&width=200&height=200&seq=16&orientation=squarish',
    currentPrice: '45.90',
    originalPrice: '59.90'
  }
]);

// 新品上市数据
const newProductList = ref([
  {
    name: '蓝莓叶黄素护眼胶囊 60粒',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20blueberry%20lutein%20eye%20health%20supplement%20bottle%20with%20capsules%2C%20health%20product%20concept%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20pharmaceutical%20style&width=200&height=200&seq=17&orientation=squarish',
    price: '138.00'
  },
  {
    name: '有机燕麦片早餐冲饮 1kg',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20organic%20oatmeal%20package%20with%20oat%20grains%20visible%2C%20breakfast%20food%20concept%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20healthy%20eating%20style&width=200&height=200&seq=18&orientation=squarish',
    price: '49.90'
  },
  {
    name: '西湖龙井明前茶 250g礼盒',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20premium%20Longjing%20green%20tea%20in%20elegant%20gift%20box%20with%20tea%20leaves%20visible%2C%20luxury%20tea%20concept%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20traditional%20Chinese%20tea%20style&width=200&height=200&seq=19&orientation=squarish',
    price: '268.00'
  },
  {
    name: '新西兰麦卢卡蜂蜜 UMF15+',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20premium%20Manuka%20honey%20jar%20with%20golden%20honey%20visible%2C%20luxury%20food%20concept%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20natural%20health%20product%20style&width=200&height=200&seq=20&orientation=squarish',
    price: '328.00'
  }
]);

// 养生资讯数据
const healthArticles = ref([
  {
    title: '春季养生指南：五种应季食材不可错过',
    description: '春季是养生的好时节，本文为您推荐五种春季应季食材，助您调理身体...',
    date: '2025-05-18',
    views: '2.3万',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20spring%20seasonal%20vegetables%20and%20herbs%20with%20fresh%20greens%2C%20sprouts%2C%20and%20flowers%20on%20wooden%20table%2C%20seasonal%20food%20concept%2C%20high%20resolution%2C%20lifestyle%20photography%2C%20soft%20natural%20lighting&width=120&height=80&seq=21&orientation=landscape'
  },
  {
    title: '中医专家解读：如何根据体质选择合适的保健品',
    description: '不同体质的人适合不同的保健品，本文邀请中医专家为您详细解读...',
    date: '2025-05-15',
    views: '1.8万',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20traditional%20Chinese%20medicine%20consultation%20with%20doctor%20examining%20herbs%20and%20supplements%2C%20TCM%20concept%2C%20high%20resolution%2C%20medical%20photography%2C%20professional%20setting%20with%20soft%20lighting&width=120&height=80&seq=22&orientation=landscape'
  },
  {
    title: '夏日即将来临，这些食材帮你清热解暑',
    description: '夏季即将到来，如何科学饮食清热解暑？这些传统食材效果显著...',
    date: '2025-05-12',
    views: '1.5万',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20summer%20cooling%20foods%20including%20watermelon%2C%20cucumber%2C%20and%20herbal%20tea%20on%20light%20background%2C%20refreshing%20food%20concept%2C%20high%20resolution%2C%20food%20photography%2C%20bright%20natural%20lighting&width=120&height=80&seq=23&orientation=landscape'
  }
]);

// 商品推荐列表数据
const productList = ref([
  {
    name: '有机胚芽米 5kg装',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20organic%20germinated%20rice%20package%2C%20premium%20grain%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20health%20food%20concept&width=180&height=180&seq=24&orientation=squarish',
    currentPrice: '69.90',
    originalPrice: '89.90',
    sales: '2356',
    rating: '4.9'
  },
  {
    name: '冻干灵芝孢子粉胶囊 60粒',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20freeze-dried%20reishi%20mushroom%20spore%20powder%20capsules%20in%20bottle%2C%20herbal%20supplement%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20traditional%20medicine%20concept&width=180&height=180&seq=25&orientation=squarish',
    currentPrice: '198.00',
    originalPrice: '258.00',
    sales: '1892',
    rating: '4.8'
  },
  {
    name: '新鲜有机蓝莓 125g盒装',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20fresh%20organic%20blueberries%20in%20transparent%20packaging%2C%20premium%20berry%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20fresh%20fruit%20concept&width=180&height=180&seq=26&orientation=squarish',
    currentPrice: '29.90',
    originalPrice: '36.90',
    sales: '3421',
    rating: '4.7'
  },
  {
    name: '特级红枣枸杞茶 30包装',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20red%20date%20and%20goji%20berry%20tea%20bags%20in%20elegant%20packaging%2C%20herbal%20tea%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20traditional%20health%20tea%20concept&width=180&height=180&seq=27&orientation=squarish',
    currentPrice: '48.00',
    originalPrice: '68.00',
    sales: '2789',
    rating: '4.9'
  },
  {
    name: '深海鱼油软胶囊 90粒',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20deep%20sea%20fish%20oil%20softgel%20capsules%20in%20bottle%2C%20omega-3%20supplement%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20health%20supplement%20concept&width=180&height=180&seq=28&orientation=squarish',
    currentPrice: '108.00',
    originalPrice: '138.00',
    sales: '1563',
    rating: '4.8'
  },
  {
    name: '有机黑芝麻丸 200g罐装',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20organic%20black%20sesame%20balls%20in%20elegant%20jar%2C%20traditional%20Chinese%20health%20food%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20natural%20supplement%20concept&width=180&height=180&seq=29&orientation=squarish',
    currentPrice: '59.00',
    originalPrice: '79.00',
    sales: '1245',
    rating: '4.7'
  }
]);

// 轮播图状态
const currentSwiper = ref(0);
const swiperChange = (e: any) => {
  currentSwiper.value = e.detail.current;
};

// 滚动状态
const scrollTop = ref(0);
const showBackToTop = ref(false);
const isLoading = ref(false);

// 监听滚动
const onScroll = (e: any) => {
  const scrollY = e.detail.scrollTop;
  showBackToTop.value = scrollY > 300;
};

// 返回顶部
const scrollToTop = () => {
  scrollTop.value = 0;
};

// 加载更多
const loadMore = () => {
  if (isLoading.value) return;
  isLoading.value = true;
  
  // 模拟加载更多数据
  setTimeout(() => {
    const newProducts = [
      {
        name: '云南野生松茸 100g',
        imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20premium%20wild%20matsutake%20mushroom%2C%20luxury%20food%20ingredient%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20gourmet%20concept&width=180&height=180&seq=30&orientation=squarish',
        currentPrice: '368.00',
        originalPrice: '498.00',
        sales: '986',
        rating: '4.9'
      },
      {
        name: '有机亚麻籽油 500ml',
        imageUrl: 'https://readdy.ai/api/search-image?query=realistic%20photography%20of%20organic%20flaxseed%20oil%20in%20glass%20bottle%2C%20cold-pressed%20oil%20product%2C%20high%20resolution%2C%20product%20photography%20on%20white%20background%2C%20commercial%20quality%2C%20healthy%20oil%20concept&width=180&height=180&seq=31&orientation=squarish',
        currentPrice: '89.00',
        originalPrice: '109.00',
        sales: '1432',
        rating: '4.8'
      }
    ];
    
    productList.value = [...productList.value, ...newProducts];
    isLoading.value = false;
  }, 1500);
};

// 新人优惠券提示
const showCouponTip = ref(true);
const closeCouponTip = () => {
  showCouponTip.value = false;
};

onMounted(() => {
  // 初始化页面
});
</script>
<style>
page {
  height: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f7f5;
  position: relative;
}

/* 顶部搜索区域 */
.search-container {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  position: relative;
  z-index: 10;
  flex-shrink: 0;
}

.location {
  display: flex;
  align-items: center;
  margin-right: 20rpx;
}

.location-text {
  font-size: 14px;
  color: #333;
  margin: 0 6rpx;
  max-width: 120rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  height: 70rpx;
  background-color: #f5f7f5;
  border-radius: 35rpx;
  padding: 0 20rpx;
}

.search-placeholder {
  font-size: 14px;
  color: #999;
  margin-left: 10rpx;
}

.scan-icon {
  margin-left: 20rpx;
  width: 24px;
  height: 24px;
}

/* 内容区域 */
.content-container {
  flex: 1;
  overflow: auto;
}

/* 轮播广告区 */
.banner-container {
  padding: 20rpx 30rpx;
  position: relative;
}

.banner-swiper {
  height: 300rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
}

.swiper-dots {
  position: absolute;
  bottom: 40rpx;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.dot {
  width: 12rpx;
  height: 12rpx;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  margin: 0 8rpx;
}

.dot.active {
  width: 24rpx;
  background-color: #ffffff;
  border-radius: 6rpx;
}

/* 功能分类导航 */
.category-container {
  padding: 20rpx 0;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.category-scroll {
  width: 100%;
}

.category-grid {
  display: flex;
  padding: 0 20rpx;
  flex-wrap: nowrap;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120rpx;
  margin: 10rpx 15rpx;
}

.category-image {
  width: 90rpx;
  height: 90rpx;
  border-radius: 45rpx;
  margin-bottom: 10rpx;
}

.category-text {
  font-size: 12px;
  color: #333;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 特色板块 */
.special-section {
  margin-bottom: 20rpx;
}

.section-container {
  background-color: #ffffff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  display: flex;
  align-items: center;
}

.title-icon {
  width: 8rpx;
  height: 30rpx;
  background-color: #4CAF50;
  border-radius: 4rpx;
  margin-right: 16rpx;
}

.new-icon {
  background-color: #FF9800;
}

.health-icon {
  background-color: #2196F3;
}

.recommend-icon {
  background-color: #E91E63;
}

.title-text {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.view-more {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #666;
}

/* 今日特惠和新品上市 */
.special-scroll {
  width: 100%;
}

.special-items {
  display: flex;
  flex-wrap: nowrap;
}

.special-item {
  width: 200rpx;
  margin-right: 20rpx;
}

.special-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 10rpx;
  margin-bottom: 10rpx;
}

.special-info {
  width: 100%;
}

.special-name {
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
  height: 36px;
}

.price-container {
  display: flex;
  align-items: center;
  margin-top: 10rpx;
}

.current-price {
  font-size: 16px;
  color: #FF5722;
  font-weight: bold;
}

.original-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
  margin-left: 10rpx;
}

.tag-new {
  font-size: 12px;
  color: #ffffff;
  background-color: #FF9800;
  padding: 2rpx 10rpx;
  border-radius: 4rpx;
  margin-left: 10rpx;
}

/* 养生资讯 */
.health-articles {
  display: flex;
  flex-direction: column;
}

.article-item {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0;
  border-bottom: 1px solid #f0f0f0;
}

.article-item:last-child {
  border-bottom: none;
}

.article-content {
  flex: 1;
  margin-right: 20rpx;
}

.article-title {
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.article-desc {
  font-size: 12px;
  color: #666;
  margin-bottom: 10rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.article-meta {
  display: flex;
  font-size: 12px;
  color: #999;
}

.article-date {
  margin-right: 20rpx;
}

.article-image {
  width: 160rpx;
  height: 120rpx;
  border-radius: 8rpx;
  flex-shrink: 0;
}

/* 商品推荐列表 */
.product-section {
  background-color: #ffffff;
  padding: 30rpx;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product-item {
  width: 330rpx;
  margin-bottom: 30rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.product-image {
  width: 330rpx;
  height: 330rpx;
  border-radius: 10rpx 10rpx 0 0;
}

.product-info {
  padding: 16rpx;
}

.product-name {
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
  height: 36px;
  margin-bottom: 10rpx;
}

.product-meta {
  display: flex;
  flex-direction: column;
}

.sales-rating {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10rpx;
}

.sales {
  font-size: 12px;
  color: #999;
}

.rating {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #FF9800;
}

.loading-more {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx 0;
  color: #666;
  font-size: 14px;
}

.loading-more text {
  margin-left: 10rpx;
}

/* 底部导航栏 */
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

/* 悬浮功能 */
.float-buttons {
  position: fixed;
  right: 30rpx;
  bottom: 160rpx;
  z-index: 100;
}

.float-button {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
}

.customer-service {
  background-color: #4CAF50;
}

.back-to-top {
  background-color: rgba(0, 0, 0, 0.5);
}

/* 新人优惠券提示 */
.coupon-tip {
  position: fixed;
  left: 30rpx;
  bottom: 160rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 20rpx;
  z-index: 100;
}

.coupon-tip-content {
  display: flex;
  align-items: center;
}

.coupon-icon {
  width: 80rpx;
  height: 80rpx;
  margin-right: 20rpx;
}

.coupon-text {
  display: flex;
  flex-direction: column;
}

.coupon-title {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.coupon-desc {
  font-size: 12px;
  color: #FF5722;
}

.coupon-close {
  margin-left: 20rpx;
  padding: 10rpx;
}

.cursor-pointer {
  cursor: pointer;
}
</style>

