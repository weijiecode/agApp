<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<view class="topmenu" :style="{ marginTop: iStatusBarHeight + 'px'}">
			<image src="/static/back.png" class="back" @click="back"></image>
			<p>产品详情</p>
			<view class="zhanwei"></view>
		</view>
		<image src="/static/yumi.JPG" class="topimg"></image>
		<view class="subcontent">
			<view class="oneprice">
				<span style="font-size: 16px;">￥</span>28.8
			</view>
			<view class="onetitle">
				水果玉米10斤新鲜现摘
			</view>
			<view class="shopname">
				<image src="/static/shopindex.png" class="lefticon"></image>
				<span>生鲜水果旗舰店铺</span>
				<u-button style="margin-left: 6rpx;width: 110rpx;" size="mini" shape="circle" color="#6C8E1E" plain
					text="已关注"></u-button>
			</view>
			<view class="onecontent">
				糯玉米 真空包装新鲜甜玉米
			</view>
		</view>
		<view class="bottom">
			<view class="rightbox">
				<view class="onebox">
					加入购物车
				</view>
				<view class="twobox">
					立即购买
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
			}
		},
		onLoad() {
			// 获取状态栏高度
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
		},
		methods: {
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

	.content {
		background-color: #f7f7f7;
		height: 100%;
	}

	.subcontent {
		width: 90%;
		margin: 25rpx auto 0;
		background-color: #fff;
		border-radius: 20rpx;
	}

	.back {
		width: 20px;
		height: 20px;
		padding-left: 40rpx;
	}

	.zhanwei {
		width: 20px;
		height: 20px;
		padding-right: 40rpx;
	}

	.topmenu {
		display: flex;
		justify-content: space-between;
	}

	.topimg {
		margin-top: 20rpx;
		width: 100%;
		height: 500rpx;
	}

	.oneprice {
		margin-left: 20rpx;
		color: red;
		font-weight: bold;
		font-size: 18px;
	}

	.onetitle {
		margin-left: 20rpx;
		font-weight: bold;
		font-size: 15px;
		height: 40rpx;
		overflow: hidden;
	}

	.onecontent {
		margin-top: 40rpx;
		margin-left: 20rpx;
		font-size: 15px;
		color: #2b2b2b;
	}

	.bottom {
		position: fixed;
		bottom: 8rpx;
		display: flex;
		right: 20rpx;
	}

	.lefticon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 16rpx;
	}

	.rightbox {
		display: flex;
	}

	span {
		font-size: 15px;
	}

	.shopname {
		display: flex;
		align-items: center;
		justify-content: end;
		margin-top: 20rpx;
		color: #424242;
		margin-left: 20rpx;
	}

	.onebox {
		font-size: 13px;
		display: flex;
		justify-content: center;
		color: #fff;
		width: 160rpx;
		height: 30rpx;
		line-height: 30rpx;
		padding: 20rpx;
		border-top-left-radius: 50rpx;
		border-bottom-left-radius: 50rpx;
		background-color: #ff9800;
	}

	.twobox {
		font-size: 13px;
		display: flex;
		justify-content: center;
		color: #fff;
		width: 160rpx;
		height: 30rpx;
		line-height: 30rpx;
		padding: 20rpx;
		border-top-right-radius: 50rpx;
		border-bottom-right-radius: 50rpx;
		background-color: #ff5722;
	}
</style>
