<template>
	<view class="container">
		<view class="header">
			<text class="system-title">图书管理系统</text>
		</view>
		
		<view class="search-box">
			<input class="search-input" type="text" v-model="searchKeyword" placeholder="搜索书名、作者或分类" />
			<button class="search-btn" @click="searchBooks">搜索</button>
		</view>
		
		<view class="function-buttons">
			<view class="function-btn" @click="navigateTo('/pages/book/add')">
				<text class="btn-icon">+</text>
				<text class="btn-text">添加图书</text>
			</view>
			<view class="function-btn" @click="navigateTo('/pages/borrow/index')">
				<text class="btn-icon">↗</text>
				<text class="btn-text">借阅管理</text>
			</view>
			<view class="function-btn" @click="navigateTo('/pages/category/index')">
				<text class="btn-icon">≡</text>
				<text class="btn-text">分类管理</text>
			</view>
			<view class="function-btn" @click="navigateTo('/pages/user/index')">
				<text class="btn-icon">👤</text>
				<text class="btn-text">用户管理</text>
			</view>
		</view>
		
		<view class="book-list">
			<text class="section-title">图书列表</text>
			<view class="book-item" v-for="(book, index) in books" :key="index" @click="viewBookDetail(book.id)">
				<image class="book-cover" :src="book.coverUrl || '/static/default-book.png'"></image>
				<view class="book-info">
					<text class="book-title">{{book.title}}</text>
					<text class="book-author">作者: {{book.author}}</text>
					<text class="book-category">分类: {{book.category}}</text>
					<text class="book-status" :class="{'available': book.status === '可借阅', 'borrowed': book.status === '已借出'}">
						{{book.status}}
					</text>
				</view>
			</view>
			
			<view class="empty-tip" v-if="books.length === 0">
				<text>暂无图书数据</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchKeyword: '',
				books: [
					{
						id: 1,
						title: '活着',
						author: '余华',
						category: '小说',
						status: '可借阅',
						coverUrl: '/static/book-covers/1.jpg'
					},
					{
						id: 2,
						title: '三体',
						author: '刘慈欣',
						category: '科幻',
						status: '已借出',
						coverUrl: '/static/book-covers/2.jpg'
					},
					{
						id: 3,
						title: '百年孤独',
						author: '加西亚·马尔克斯',
						category: '外国文学',
						status: '可借阅',
						coverUrl: '/static/book-covers/3.jpg'
					}
				]
			}
		},
		onLoad() {
			// 页面加载时获取图书列表
			this.getBookList();
		},
		methods: {
			// 获取图书列表
			getBookList() {
				// 这里可以添加API请求获取真实数据
				console.log('获取图书列表');
			},
			// 搜索图书
			searchBooks() {
				console.log('搜索关键词:', this.searchKeyword);
				// 实现搜索逻辑
			},
			// 查看图书详情
			viewBookDetail(id) {
				uni.navigateTo({
					url: `/pages/book/detail?id=${id}`
				});
			},
			// 页面导航
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style>
	.container {
		padding: 20rpx;
	}
	
	.header {
		display: flex;
		justify-content: center;
		padding: 30rpx 0;
	}
	
	.system-title {
		font-size: 40rpx;
		font-weight: bold;
		color: #333;
	}
	
	.search-box {
		display: flex;
		margin: 20rpx 0 30rpx;
	}
	
	.search-input {
		flex: 1;
		height: 80rpx;
		border: 1px solid #ddd;
		border-radius: 8rpx;
		padding: 0 20rpx;
		margin-right: 20rpx;
	}
	
	.search-btn {
		width: 160rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background-color: #007aff;
		color: #fff;
		border-radius: 8rpx;
		font-size: 28rpx;
	}
	
	.function-buttons {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}
	
	.function-btn {
		width: 22%;
		height: 160rpx;
		background-color: #f8f8f8;
		border-radius: 8rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.btn-icon {
		font-size: 40rpx;
		margin-bottom: 10rpx;
		color: #007aff;
	}
	
	.btn-text {
		font-size: 24rpx;
		color: #333;
	}
	
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		margin: 20rpx 0;
		color: #333;
	}
	
	.book-list {
		margin-top: 20rpx;
	}
	
	.book-item {
		display: flex;
		padding: 20rpx;
		border-bottom: 1px solid #eee;
	}
	
	.book-cover {
		width: 160rpx;
		height: 220rpx;
		margin-right: 20rpx;
		background-color: #f0f0f0;
	}
	
	.book-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.book-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}
	
	.book-author, .book-category {
		font-size: 26rpx;
		color: #666;
		margin-bottom: 10rpx;
	}
	
	.book-status {
		font-size: 26rpx;
		width: fit-content;
		padding: 4rpx 12rpx;
		border-radius: 6rpx;
	}
	
	.available {
		background-color: #e8f5e9;
		color: #4caf50;
	}
	
	.borrowed {
		background-color: #ffebee;
		color: #f44336;
	}
	
	.empty-tip {
		text-align: center;
		padding: 100rpx 0;
		color: #999;
	}
</style>
