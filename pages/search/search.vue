<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<!-- 搜索框 -->
		<view class="topbox">
			<image src="/static/back.png" class="back" @click="back"></image>
			<view class="topsearch" :style="{ marginTop: iStatusBarHeight + 'px'}">
				<view class="u-demo-block__content">
					<view class="u-page__tag-item">
						<u-search searchIconSize="45" height="75" @custom="search" v-model="searchtext"></u-search>
					</view> 
				</view>
			</view>
		</view>
		<!-- 搜索列表 -->
		<!-- 总产品列表 -->
		<view class="allthings">
			<view class="allitem">
				搜索结果列表
			</view>
			<view class="oneshoping" @click="todetails">
				<image src="/static/yumi.JPG" class="shopimg"></image>
				<view class="alltext">
					<view class="onetitle">
						水果玉米10斤新鲜现摘
					</view>
					<view class="onecontent">
						糯玉米 真空包装新鲜甜玉米
					</view>
					<view class="oneprice">
						<span>￥</span>28.8
					</view>
					<view class="shopname">
						生鲜水果旗舰店铺
					</view>
				</view>
			</view>
			<view class="oneshoping">
				<image src="/static/yumi.JPG" class="shopimg"></image>
				<view class="alltext">
					<view class="onetitle">
						水果玉米10斤新鲜现摘
					</view>
					<view class="onecontent">
						糯玉米 真空包装新鲜甜玉米
					</view>
					<view class="oneprice">
						<span>￥</span>28.8
					</view>
					<view class="shopname">
						生鲜水果旗舰店铺
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 状态栏高度
				iStatusBarHeight: 0,
				// 搜索关键字
				searchtext: '',
			}
		},
		onLoad() {
			// 获取状态栏高度
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
		},
		methods: {
			// 搜索
			search(value) {
				console.log(value)
			},
			// 返回到首页
			back() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.stat {
		background-color: #f7f7f7;
		position: fixed;
		z-index: 1;
		height: var(--status-bar-height); // --status-bar-height系统状态栏高度
		width: 100%;
		top: 0;
		left: 0;
	}
	.topsearch {
		width: 90%;
		margin: 0 auto;
	}
	
	.allthings {
		margin-top: 20rpx;
		background-color: #fff;
		padding: 30rpx;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
	}
	.allitem {
		font-weight: bold;
		color: black;
		display: flex;
		align-items: center;
		color: #646464;
		font-size: 15px;
	}
	
	.allimg {
		width: 40rpx;
		height: 40rpx;
	}
	
	.oneshoping {
		display: flex;
		margin-top: 30rpx;
	}
	
	.shopimg {
		width: 240rpx;
		height: 204rpx;
	}
	
	.alltext {
		width: calc(100% - 180rpx);
	}
	
	.onetitle {
		margin-left: 20rpx;
		font-weight: bold;
		font-size: 15px;
		height: 40rpx;
		overflow: hidden;
	}
	
	.onecontent {
		margin-top: 12rpx;
		margin-left: 20rpx;
		font-size: 13px;
		color: #b1b1b1;
		height: 70rpx;
		overflow: hidden;
	}
	
	.oneprice {
		margin-left: 20rpx;
		color: red;
		font-weight: bold;
		font-size: 18px;
	}
	
	span {
		font-size: 16px;
	}
	
	.shopname {
		margin-top: 4rpx;
		margin-left: 20rpx;
		font-size: 13px;
		color: #707070;
		height: 40rpx;
		overflow: hidden;
	}
	
	.back {
		width: 20px;
		height: 20px;
		padding-left: 40rpx;
	}
	
	.topbox {
		display: flex;
		align-items: center;
	}
</style>
