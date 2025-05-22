<template>
<view class="container">
<!-- 顶部搜索区域 -->
<view class="search-container">
<view class="search-box cursor-pointer">
<uni-icons type="search" size="18" color="#666"></uni-icons>
<text class="search-placeholder">搜索农产品、保健品</text>
</view>
</view>
<!-- 内容区域 -->
<view class="content-wrapper">
<!-- 左侧分类导航 -->
<scroll-view scroll-y class="category-nav">
<view
v-for="(item, index) in mainCategories"
:key="index"
class="category-nav-item cursor-pointer"
:class="{ active: currentCategoryIndex === index }"
@click="switchCategory(index)"
>
<text class="category-nav-text">{{ item.name }}</text>
</view>
</scroll-view>
<!-- 右侧内容区域 -->
<scroll-view scroll-y class="category-content">
<view class="content-header">
<text class="content-title">{{ mainCategories[currentCategoryIndex].name }}</text>
</view>
<!-- 子分类网格 -->
<view class="subcategory-container">
<view
v-for="(subItem, subIndex) in currentSubcategories"
:key="subIndex"
class="subcategory-item cursor-pointer"
>
<image :src="subItem.imageUrl" mode="aspectFill" class="subcategory-image"></image>
<text class="subcategory-text">{{ subItem.name }}</text>
</view>
</view>
<!-- 推荐商品 -->
<view class="recommend-section" v-if="currentRecommends.length > 0">
<view class="section-header">
<text class="section-title">推荐商品</text>
</view>
<view class="product-grid">
<view
v-for="(product, productIndex) in currentRecommends"
:key="productIndex"
class="product-item cursor-pointer"
>
<image :src="product.imageUrl" mode="aspectFill" class="product-image"></image>
<view class="product-info">
<text class="product-name">{{ product.name }}</text>
<view class="price-container">
<text class="current-price">¥{{ product.price }}</text>
<text class="original-price" v-if="product.originalPrice">¥{{ product.originalPrice }}</text>
</view>
<view class="product-sales">
<text>已售{{ product.sales }}件</text>
</view>
</view>
</view>
</view>
</view>
</scroll-view>
</view>
<!-- 底部导航栏 -->
<view class="tab-bar">
<a href="https://readdy.ai/home/b08c3ac8-c464-475d-a276-48f346512cce/b9b91c70-5068-4776-bfa7-07f1ecc6dfe2" data-readdy="true" class="tab-item cursor-pointer">
<uni-icons type="home" size="24" color="#999"></uni-icons>
<text class="tab-text">首页</text>
</a>
<view class="tab-item active cursor-pointer">
<uni-icons type="list-filled" size="24" color="#4CAF50"></uni-icons>
<text class="tab-text">分类</text>
</view>
<a href="https://readdy.ai/home/b08c3ac8-c464-475d-a276-48f346512cce/27ce77b4-3fa1-4184-a7c3-182d82c111cb" data-readdy="true" class="tab-item cursor-pointer">
<uni-icons type="cart" size="24" color="#999"></uni-icons>
<text class="tab-text">购物车</text>
</a>
<view class="tab-item cursor-pointer">
<uni-icons type="person" size="24" color="#999"></uni-icons>
<text class="tab-text">我的</text>
</view>
</view>
</view>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue';
// 主分类数据
const mainCategories = ref([
{ name: '新鲜果蔬' },
{ name: '粮油副食' },
{ name: '养生茶饮' },
{ name: '保健品' },
{ name: '有机蔬菜' },
{ name: '坚果炒货' },
{ name: '滋补品' },
{ name: '蜂蜜制品' },
{ name: '干果零食' },
{ name: '肉禽蛋品' },
{ name: '海鲜水产' },
{ name: '乳品冷饮' }
]);
// 当前选中的分类索引
const currentCategoryIndex = ref(0);
// 子分类数据
const subcategories = ref([
// 新鲜果蔬
[
{
name: '时令水果',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520seasonal%2520fruits%2520with%2520apple%2520orange%2520and%2520strawberry%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=101&orientation=squarish'
},
{
name: '进口水果',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520imported%2520fruits%2520with%2520kiwi%2520and%2520dragon%2520fruit%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=102&orientation=squarish'
},
{
name: '叶菜类',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520leafy%2520vegetables%2520with%2520lettuce%2520and%2520spinach%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=103&orientation=squarish'
},
{
name: '根茎类',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520root%2520vegetables%2520with%2520carrot%2520and%2520potato%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=104&orientation=squarish'
},
{
name: '茄果类',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520nightshade%2520vegetables%2520with%2520tomato%2520and%2520eggplant%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=105&orientation=squarish'
},
{
name: '瓜果类',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520melons%2520and%2520gourds%2520with%2520watermelon%2520and%2520cucumber%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=106&orientation=squarish'
}
],
// 粮油副食
[
{
name: '大米',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520rice%2520grains%2520in%2520small%2520pile%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=107&orientation=squarish'
},
{
name: '面粉',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520flour%2520in%2520small%2520pile%2520with%2520scoop%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=108&orientation=squarish'
},
{
name: '食用油',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520cooking%2520oil%2520bottle%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=109&orientation=squarish'
},
{
name: '调味品',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520spices%2520and%2520seasonings%2520with%2520salt%2520and%2520pepper%2520shakers%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=110&orientation=squarish'
},
{
name: '杂粮',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520mixed%2520grains%2520with%2520millet%2520and%2520quinoa%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=111&orientation=squarish'
},
{
name: '方便食品',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520instant%2520noodles%2520cup%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=112&orientation=squarish'
}
],
// 养生茶饮
[
{
name: '花草茶',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520herbal%2520tea%2520with%2520chamomile%2520flowers%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=113&orientation=squarish'
},
{
name: '绿茶',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520green%2520tea%2520leaves%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=114&orientation=squarish'
},
{
name: '红茶',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520black%2520tea%2520leaves%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=115&orientation=squarish'
},
{
name: '乌龙茶',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520oolong%2520tea%2520leaves%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=116&orientation=squarish'
},
{
name: '普洱茶',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520puer%2520tea%2520cake%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=117&orientation=squarish'
},
{
name: '代用茶',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520herbal%2520tea%2520bags%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=118&orientation=squarish'
}
],
// 保健品
[
{
name: '维生素',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520vitamin%2520pills%2520and%2520bottle%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=119&orientation=squarish'
},
{
name: '蛋白粉',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520protein%2520powder%2520container%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=120&orientation=squarish'
},
{
name: '鱼油',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520fish%2520oil%2520capsules%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=121&orientation=squarish'
},
{
name: '钙片',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520calcium%2520tablets%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=122&orientation=squarish'
},
{
name: '益生菌',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520probiotic%2520capsules%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=123&orientation=squarish'
},
{
name: '胶原蛋白',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520collagen%2520powder%2520jar%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=124&orientation=squarish'
}
],
// 有机蔬菜
[
{
name: '有机叶菜',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520organic%2520leafy%2520vegetables%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=125&orientation=squarish'
},
{
name: '有机水果',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520organic%2520fruits%2520with%2520organic%2520label%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=126&orientation=squarish'
},
{
name: '有机菌菇',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520organic%2520mushrooms%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=127&orientation=squarish'
},
{
name: '有机根茎',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520organic%2520root%2520vegetables%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=128&orientation=squarish'
}
],
// 坚果炒货
[
{
name: '核桃',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520walnuts%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=129&orientation=squarish'
},
{
name: '开心果',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520pistachios%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=130&orientation=squarish'
},
{
name: '腰果',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520cashews%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=131&orientation=squarish'
},
{
name: '瓜子',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520sunflower%2520seeds%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=132&orientation=squarish'
},
{
name: '混合坚果',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520mixed%2520nuts%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=133&orientation=squarish'
}
],
// 滋补品
[
{
name: '人参',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520ginseng%2520root%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=134&orientation=squarish'
},
{
name: '枸杞',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520goji%2520berries%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=135&orientation=squarish'
},
{
name: '灵芝',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520reishi%2520mushroom%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=136&orientation=squarish'
},
{
name: '燕窝',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520birds%2520nest%2520soup%2520ingredient%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=137&orientation=squarish'
},
{
name: '冬虫夏草',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520cordyceps%2520sinensis%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=138&orientation=squarish'
}
],
// 蜂蜜制品
[
{
name: '百花蜜',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520wildflower%2520honey%2520jar%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=139&orientation=squarish'
},
{
name: '蜂王浆',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520royal%2520jelly%2520jar%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=140&orientation=squarish'
},
{
name: '蜂胶',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520propolis%2520capsules%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=141&orientation=squarish'
},
{
name: '麦卢卡蜂蜜',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520manuka%2520honey%2520jar%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=142&orientation=squarish'
}
],
// 干果零食
[
{
name: '果干',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520dried%2520fruits%2520mix%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=143&orientation=squarish'
},
{
name: '肉干',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520beef%2520jerky%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=144&orientation=squarish'
},
{
name: '薯片',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520potato%2520chips%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=145&orientation=squarish'
},
{
name: '饼干',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520cookies%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=146&orientation=squarish'
}
],
// 肉禽蛋品
[
{
name: '鸡肉',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520chicken%2520meat%2520cuts%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=147&orientation=squarish'
},
{
name: '猪肉',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520pork%2520meat%2520cuts%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=148&orientation=squarish'
},
{
name: '牛肉',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520beef%2520meat%2520cuts%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=149&orientation=squarish'
},
{
name: '禽蛋',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520eggs%2520in%2520carton%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=150&orientation=squarish'
}
],
// 海鲜水产
[
{
name: '鱼类',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520fresh%2520fish%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=151&orientation=squarish'
},
{
name: '虾蟹',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520shrimp%2520and%2520crab%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=152&orientation=squarish'
},
{
name: '贝类',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520shellfish%2520and%2520clams%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=153&orientation=squarish'
},
{
name: '海产干货',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520dried%2520seafood%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=154&orientation=squarish'
}
],
// 乳品冷饮
[
{
name: '牛奶',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520milk%2520bottle%2520and%2520glass%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=155&orientation=squarish'
},
{
name: '酸奶',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520yogurt%2520cup%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=156&orientation=squarish'
},
{
name: '奶酪',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25203D%2520cartoon%252C%2520cheese%2520wedge%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520vibrant%2520colors%2520with%2520soft%2520gradients%252C%2520minimalist%2520design%252C%2520smooth%2520rounded%2520shapes%252C%2520subtle%2520shading%252C%2520no%2520outlines%252C%2520centered%2520composition%252C%2520isolated%2520on%2520white%2520background%252C%2520playful%2520and%2520friendly%2520aesthetic%252C%2520isometric%2520perspective%252C%2520high%2520detail%2520quality%252C%2520clean%2520and%2520modern%2520look%252C%2520single%2520object%2520focus&width=80&height=80&seq=157&orientation=squarish'
},
{
name: '冰淇淋',
imageUrl: 'https://readdy.ai/api/search-image?query=icon%252C%25202.5D%2520vector%2520illustration%252C%2520ice%2520cream%2520cone%252C%2520high-quality%2520details%252C%2520prominent%2520main%2520subject%252C%2520clear%2520and%2520sharp%252C%2520subject%2520fills%252080%2520percent%2520of%2520frame%252C%2520isolated%2520on%2520white%2520background%252C%2520centered%2520composition%252C%2520soft%2520lighting%252C%2520no%2520shadows%252C%2520no%2520text%252C%2520Content%2520simple&width=80&height=80&seq=158&orientation=squarish'
}
]
]);
// 推荐商品数据
const recommendProducts = ref([
// 新鲜果蔬
[
{
name: '云南蒙自石榴 2个装 单果约300g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fresh%2520pomegranates%2520from%2520Yunnan%252C%2520premium%2520fruit%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520fresh%2520fruit%2520concept&width=160&height=160&seq=201&orientation=squarish',
price: '29.90',
originalPrice: '39.90',
sales: '2356'
},
{
name: '有机西兰花 300g 新鲜蔬菜',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fresh%2520organic%2520broccoli%252C%2520premium%2520vegetable%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520fresh%2520vegetable%2520concept&width=160&height=160&seq=202&orientation=squarish',
price: '12.80',
originalPrice: '16.80',
sales: '1892'
},
{
name: '新疆阿克苏冰糖心苹果 3个装 单果约250g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fresh%2520red%2520apples%2520from%2520Xinjiang%252C%2520premium%2520fruit%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520fresh%2520fruit%2520concept&width=160&height=160&seq=203&orientation=squarish',
price: '32.90',
originalPrice: '42.90',
sales: '3421'
},
{
name: '云南小番茄 500g装 新鲜水果',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fresh%2520cherry%2520tomatoes%252C%2520premium%2520vegetable%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520fresh%2520produce%2520concept&width=160&height=160&seq=204&orientation=squarish',
price: '15.90',
originalPrice: '19.90',
sales: '2789'
}
],
// 粮油副食
[
{
name: '东北五常有机稻花香大米 5kg装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520organic%2520rice%2520package%252C%2520high%2520quality%2520grain%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520staple%2520food%2520concept&width=160&height=160&seq=205&orientation=squarish',
price: '89.90',
originalPrice: '109.90',
sales: '1563'
},
{
name: '山茶油 物理压榨一级 500ml',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520camellia%2520oil%2520in%2520glass%2520bottle%252C%2520high%2520quality%2520cooking%2520oil%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520healthy%2520oil%2520concept&width=160&height=160&seq=206&orientation=squarish',
price: '128.00',
originalPrice: '168.00',
sales: '1245'
},
{
name: '有机面粉 中筋面粉 1kg装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520organic%2520flour%2520package%252C%2520premium%2520baking%2520ingredient%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520baking%2520concept&width=160&height=160&seq=207&orientation=squarish',
price: '19.90',
originalPrice: '25.90',
sales: '986'
},
{
name: '海天酱油 特级生抽 1.28L',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520soy%2520sauce%2520bottle%252C%2520high%2520quality%2520condiment%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520cooking%2520ingredient%2520concept&width=160&height=160&seq=208&orientation=squarish',
price: '29.90',
originalPrice: '36.90',
sales: '3562'
}
],
// 养生茶饮
[
{
name: '西湖龙井茶叶 明前特级 250g礼盒',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520Longjing%2520green%2520tea%2520in%2520elegant%2520gift%2520box%252C%2520high%2520quality%2520tea%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520luxury%2520tea%2520concept&width=160&height=160&seq=209&orientation=squarish',
price: '298.00',
originalPrice: '398.00',
sales: '856'
},
{
name: '菊花枸杞茶 袋泡茶 30袋装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520chrysanthemum%2520and%2520goji%2520berry%2520tea%2520bags%2520in%2520box%252C%2520herbal%2520tea%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520health%2520tea%2520concept&width=160&height=160&seq=210&orientation=squarish',
price: '49.90',
originalPrice: '69.90',
sales: '1432'
},
{
name: '普洱茶熟茶 云南七子饼茶 357g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520Pu-erh%2520tea%2520cake%252C%2520traditional%2520Chinese%2520tea%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520aged%2520tea%2520concept&width=160&height=160&seq=211&orientation=squarish',
price: '128.00',
originalPrice: '168.00',
sales: '765'
},
{
name: '红枣桂圆枸杞茶 120g罐装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520dried%2520red%2520dates%252C%2520longan%2520and%2520goji%2520berries%2520tea%2520mix%2520in%2520jar%252C%2520herbal%2520tea%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520traditional%2520health%2520tea%2520concept&width=160&height=160&seq=212&orientation=squarish',
price: '59.90',
originalPrice: '79.90',
sales: '1876'
}
],
// 保健品
[
{
name: '深海鱼油软胶囊 Omega-3 90粒',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fish%2520oil%2520omega-3%2520supplement%2520bottle%2520with%2520capsules%252C%2520health%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520nutritional%2520supplement%2520concept&width=160&height=160&seq=213&orientation=squarish',
price: '129.00',
originalPrice: '169.00',
sales: '2356'
},
{
name: '维生素C咀嚼片 橙味 120片',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520vitamin%2520C%2520chewable%2520tablets%2520bottle%252C%2520health%2520supplement%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520immunity%2520support%2520concept&width=160&height=160&seq=214&orientation=squarish',
price: '69.90',
originalPrice: '89.90',
sales: '1892'
},
{
name: '蓝莓叶黄素护眼胶囊 60粒',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520blueberry%2520lutein%2520eye%2520health%2520supplement%2520bottle%252C%2520health%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520eye%2520care%2520concept&width=160&height=160&seq=215&orientation=squarish',
price: '138.00',
originalPrice: '178.00',
sales: '1563'
},
{
name: '钙镁片 中老年补钙 120片',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520calcium%2520magnesium%2520supplement%2520bottle%252C%2520bone%2520health%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520senior%2520health%2520concept&width=160&height=160&seq=216&orientation=squarish',
price: '89.00',
originalPrice: '119.00',
sales: '1245'
}
],
// 有机蔬菜
[
{
name: '有机西红柿 500g装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fresh%2520organic%2520tomatoes%252C%2520premium%2520vegetable%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520organic%2520produce%2520concept&width=160&height=160&seq=217&orientation=squarish',
price: '15.90',
originalPrice: '19.90',
sales: '2356'
},
{
name: '有机生菜 300g装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fresh%2520organic%2520lettuce%252C%2520premium%2520vegetable%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520organic%2520produce%2520concept&width=160&height=160&seq=218&orientation=squarish',
price: '12.80',
originalPrice: '16.80',
sales: '1892'
},
{
name: '有机胡萝卜 500g装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fresh%2520organic%2520carrots%252C%2520premium%2520vegetable%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520organic%2520produce%2520concept&width=160&height=160&seq=219&orientation=squarish',
price: '13.90',
originalPrice: '17.90',
sales: '1563'
},
{
name: '有机菠菜 300g装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fresh%2520organic%2520spinach%252C%2520premium%2520vegetable%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520organic%2520produce%2520concept&width=160&height=160&seq=220&orientation=squarish',
price: '11.90',
originalPrice: '15.90',
sales: '1245'
}
],
// 坚果炒货
[
{
name: '新疆特级薄皮核桃 500g装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520walnuts%2520from%2520Xinjiang%252C%2520high%2520quality%2520nuts%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520healthy%2520snack%2520concept&width=160&height=160&seq=221&orientation=squarish',
price: '49.90',
originalPrice: '69.90',
sales: '2356'
},
{
name: '开心果 原味无添加 250g装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520pistachios%252C%2520high%2520quality%2520nuts%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520healthy%2520snack%2520concept&width=160&height=160&seq=222&orientation=squarish',
price: '59.90',
originalPrice: '79.90',
sales: '1892'
},
{
name: '越南进口腰果 盐焗味 200g装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520cashews%252C%2520high%2520quality%2520nuts%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520healthy%2520snack%2520concept&width=160&height=160&seq=223&orientation=squarish',
price: '45.90',
originalPrice: '59.90',
sales: '1563'
},
{
name: '每日坚果混合装 30袋独立包装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520daily%2520mixed%2520nuts%2520in%2520individual%2520packages%252C%2520high%2520quality%2520nuts%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520healthy%2520snack%2520concept&width=160&height=160&seq=224&orientation=squarish',
price: '89.90',
originalPrice: '119.90',
sales: '3245'
}
],
// 滋补品
[
{
name: '东北长白山人参 5年根 100g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520ginseng%2520roots%252C%2520traditional%2520Chinese%2520medicine%2520ingredient%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520herbal%2520supplement%2520concept&width=160&height=160&seq=225&orientation=squarish',
price: '298.00',
originalPrice: '398.00',
sales: '856'
},
{
name: '宁夏特级枸杞 500g装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520goji%2520berries%2520from%2520Ningxia%252C%2520high%2520quality%2520dried%2520superfood%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520traditional%2520health%2520food%2520concept&width=160&height=160&seq=226&orientation=squarish',
price: '69.90',
originalPrice: '89.90',
sales: '1432'
},
{
name: '灵芝孢子粉胶囊 60粒',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520reishi%2520mushroom%2520spore%2520powder%2520capsules%2520bottle%252C%2520traditional%2520medicine%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520herbal%2520supplement%2520concept&width=160&height=160&seq=227&orientation=squarish',
price: '198.00',
originalPrice: '258.00',
sales: '765'
},
{
name: '即食燕窝 鲜炖冰糖 6瓶装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520ready-to-eat%2520birds%2520nest%2520dessert%2520in%2520glass%2520bottles%252C%2520premium%2520health%2520food%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520luxury%2520nutrition%2520concept&width=160&height=160&seq=228&orientation=squarish',
price: '499.00',
originalPrice: '599.00',
sales: '432'
}
],
// 蜂蜜制品
[
{
name: '纯正蜂蜜 百花蜜 500g瓶装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520pure%2520wildflower%2520honey%2520in%2520glass%2520jar%252C%2520premium%2520natural%2520sweetener%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520organic%2520honey%2520concept&width=160&height=160&seq=229&orientation=squarish',
price: '69.90',
originalPrice: '89.90',
sales: '2356'
},
{
name: '新西兰麦卢卡蜂蜜 UMF10+ 250g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520Manuka%2520honey%2520jar%2520from%2520New%2520Zealand%252C%2520high%2520quality%2520health%2520food%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520premium%2520honey%2520concept&width=160&height=160&seq=230&orientation=squarish',
price: '298.00',
originalPrice: '368.00',
sales: '1245'
},
{
name: '蜂王浆胶囊 60粒',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520royal%2520jelly%2520capsules%2520bottle%252C%2520bee%2520product%2520supplement%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520natural%2520health%2520supplement%2520concept&width=160&height=160&seq=231&orientation=squarish',
price: '128.00',
originalPrice: '168.00',
sales: '765'
},
{
name: '蜂胶软胶囊 巴西绿蜂胶 60粒',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520propolis%2520capsules%2520bottle%2520from%2520Brazil%252C%2520bee%2520product%2520supplement%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520natural%2520health%2520supplement%2520concept&width=160&height=160&seq=232&orientation=squarish',
price: '158.00',
originalPrice: '198.00',
sales: '876'
}
],
// 干果零食
[
{
name: '综合果干礼盒 8种装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520assorted%2520dried%2520fruits%2520gift%2520box%252C%2520premium%2520healthy%2520snack%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520natural%2520snack%2520concept&width=160&height=160&seq=233&orientation=squarish',
price: '99.90',
originalPrice: '129.90',
sales: '1356'
},
{
name: '内蒙古牛肉干 香辣味 200g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520beef%2520jerky%2520from%2520Inner%2520Mongolia%252C%2520spicy%2520flavor%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520protein%2520snack%2520concept&width=160&height=160&seq=234&orientation=squarish',
price: '59.90',
originalPrice: '79.90',
sales: '1892'
},
{
name: '手工曲奇饼干 什锦口味 300g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520handmade%2520assorted%2520cookies%2520in%2520package%252C%2520premium%2520baked%2520goods%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520gourmet%2520snack%2520concept&width=160&height=160&seq=235&orientation=squarish',
price: '39.90',
originalPrice: '49.90',
sales: '2563'
},
{
name: '新疆吐鲁番葡萄干 500g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520raisins%2520from%2520Xinjiang%252C%2520dried%2520fruit%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520natural%2520sweet%2520snack%2520concept&width=160&height=160&seq=236&orientation=squarish',
price: '45.90',
originalPrice: '59.90',
sales: '1765'
}
],
// 肉禽蛋品
[
{
name: '生鲜鸡胸肉 去皮 500g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fresh%2520skinless%2520chicken%2520breast%252C%2520premium%2520meat%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520protein%2520food%2520concept&width=160&height=160&seq=237&orientation=squarish',
price: '29.90',
originalPrice: '36.90',
sales: '2356'
},
{
name: '黑猪五花肉 500g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fresh%2520black%2520pork%2520belly%2520slices%252C%2520premium%2520meat%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520gourmet%2520food%2520concept&width=160&height=160&seq=238&orientation=squarish',
price: '49.90',
originalPrice: '59.90',
sales: '1892'
},
{
name: '澳洲进口牛排 200g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520premium%2520Australian%2520beef%2520steak%252C%2520imported%2520meat%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520gourmet%2520food%2520concept&width=160&height=160&seq=239&orientation=squarish',
price: '89.90',
originalPrice: '109.90',
sales: '1563'
},
{
name: '农家散养土鸡蛋 10枚',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520free-range%2520farm%2520eggs%252C%2520premium%2520poultry%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520organic%2520food%2520concept&width=160&height=160&seq=240&orientation=squarish',
price: '19.90',
originalPrice: '24.90',
sales: '3245'
}
],
// 海鲜水产
[
{
name: '挪威三文鱼刺身 200g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fresh%2520Norwegian%2520salmon%2520sashimi%2520slices%252C%2520premium%2520seafood%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520gourmet%2520food%2520concept&width=160&height=160&seq=241&orientation=squarish',
price: '69.90',
originalPrice: '89.90',
sales: '1356'
},
{
name: '鲜活大闸蟹 公4两母3两 4对装',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fresh%2520Chinese%2520mitten%2520crabs%252C%2520premium%2520seafood%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520gourmet%2520food%2520concept&width=160&height=160&seq=242&orientation=squarish',
price: '298.00',
originalPrice: '368.00',
sales: '892'
},
{
name: '青岛大虾 鲜活海虾 500g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520fresh%2520prawns%2520from%2520Qingdao%252C%2520premium%2520seafood%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520gourmet%2520food%2520concept&width=160&height=160&seq=243&orientation=squarish',
price: '89.90',
originalPrice: '109.90',
sales: '1563'
},
{
name: '即食海参 大连野生海参 100g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520ready-to-eat%2520sea%2520cucumber%2520from%2520Dalian%252C%2520premium%2520seafood%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520luxury%2520food%2520concept&width=160&height=160&seq=244&orientation=squarish',
price: '398.00',
originalPrice: '498.00',
sales: '432'
}
],
// 乳品冷饮
[
{
name: '有机纯牛奶 250ml*12盒',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520organic%2520milk%2520cartons%2520pack%252C%2520premium%2520dairy%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520healthy%2520drink%2520concept&width=160&height=160&seq=245&orientation=squarish',
price: '69.90',
originalPrice: '89.90',
sales: '2356'
},
{
name: '原味酸奶 200g*6杯',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520plain%2520yogurt%2520cups%2520pack%252C%2520premium%2520dairy%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520probiotic%2520food%2520concept&width=160&height=160&seq=246&orientation=squarish',
price: '49.90',
originalPrice: '59.90',
sales: '1892'
},
{
name: '新西兰进口切达奶酪 200g',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520imported%2520cheddar%2520cheese%2520from%2520New%2520Zealand%252C%2520premium%2520dairy%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520gourmet%2520food%2520concept&width=160&height=160&seq=247&orientation=squarish',
price: '59.90',
originalPrice: '79.90',
sales: '765'
},
{
name: '哈根达斯冰淇淋 组合装 4杯',
imageUrl: 'https://readdy.ai/api/search-image?query=realistic%2520photography%2520of%2520Haagen-Dazs%2520ice%2520cream%2520cups%2520assortment%252C%2520premium%2520frozen%2520dessert%2520product%252C%2520high%2520resolution%252C%2520product%2520photography%2520on%2520white%2520background%252C%2520commercial%2520quality%252C%2520luxury%2520dessert%2520concept&width=160&height=160&seq=248&orientation=squarish',
price: '198.00',
originalPrice: '238.00',
sales: '1245'
}
]
]);
// 当前子分类
const currentSubcategories = computed(() => {
return subcategories.value[currentCategoryIndex.value] || [];
});
// 当前推荐商品
const currentRecommends = computed(() => {
return recommendProducts.value[currentCategoryIndex.value] || [];
});
// 切换分类
const switchCategory = (index: number) => {
currentCategoryIndex.value = index;
};
</script>
<style>
page {
height: 100%;
}
.container {
display: flex;
flex-direction: column;
height: 100%;
background-color: #f8f8f8;
}
/* 顶部搜索区域 */
.search-container {
padding: 20rpx 30rpx;
background-color: #ffffff;
position: relative;
z-index: 10;
flex-shrink: 0;
box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}
.search-box {
display: flex;
align-items: center;
height: 70rpx;
background-color: #f5f5f5;
border-radius: 35rpx;
padding: 0 30rpx;
}
.search-placeholder {
font-size: 14px;
color: #999;
margin-left: 10rpx;
}
/* 内容区域 */
.content-wrapper {
display: flex;
flex: 1;
overflow: hidden;
}
/* 左侧分类导航 */
.category-nav {
width: 180rpx;
background-color: #f5f5f5;
height: 100%;
overflow: auto;
}
.category-nav-item {
display: flex;
align-items: center;
justify-content: center;
height: 100rpx;
text-align: center;
position: relative;
padding: 0 10rpx;
}
.category-nav-item.active {
background-color: #ffffff;
color: #4CAF50;
font-weight: bold;
}
.category-nav-item.active::before {
content: "";
position: absolute;
left: 0;
top: 50%;
transform: translateY(-50%);
width: 6rpx;
height: 36rpx;
background-color: #4CAF50;
border-radius: 3rpx;
}
.category-nav-text {
font-size: 14px;
color: #333;
line-height: 1.4;
}
.category-nav-item.active .category-nav-text {
color: #4CAF50;
}
/* 右侧内容区域 */
.category-content {
flex: 1;
background-color: #ffffff;
height: 100%;
overflow: auto;
}
.content-header {
padding: 30rpx;
border-bottom: 1px solid #f0f0f0;
}
.content-title {
font-size: 16px;
font-weight: bold;
color: #333;
}
/* 子分类网格 */
.subcategory-container {
display: flex;
flex-wrap: wrap;
padding: 20rpx 10rpx;
}
.subcategory-item {
width: 25%;
display: flex;
flex-direction: column;
align-items: center;
padding: 20rpx 0;
}
.subcategory-image {
width: 80rpx;
height: 80rpx;
margin-bottom: 10rpx;
}
.subcategory-text {
font-size: 12px;
color: #333;
text-align: center;
width: 100%;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
padding: 0 10rpx;
}
/* 推荐商品 */
.recommend-section {
margin-top: 20rpx;
padding-bottom: 30rpx;
}
.section-header {
padding: 20rpx 30rpx;
border-bottom: 1px solid #f0f0f0;
}
.section-title {
font-size: 16px;
font-weight: bold;
color: #333;
position: relative;
padding-left: 20rpx;
}
.section-title::before {
content: "";
position: absolute;
left: 0;
top: 50%;
transform: translateY(-50%);
width: 6rpx;
height: 24rpx;
background-color: #4CAF50;
border-radius: 3rpx;
}
.product-grid {
display: flex;
flex-wrap: wrap;
padding: 20rpx;
}
.product-item {
width: 50%;
padding: 10rpx;
box-sizing: border-box;
}
.product-image {
width: 100%;
height: 320rpx;
border-radius: 10rpx;
background-color: #f9f9f9;
}
.product-info {
padding: 10rpx 0;
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
.price-container {
display: flex;
align-items: baseline;
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
.product-sales {
font-size: 12px;
color: #999;
margin-top: 6rpx;
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
.cursor-pointer {
cursor: pointer;
}
</style>
