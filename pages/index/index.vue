<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<!-- 搜索框 -->
		<view class="topsearch" :style="{ marginTop: iStatusBarHeight + 'px'}">
			<view class="u-demo-block__content">
				<view class="u-page__tag-item">
					<u-search searchIconSize="45" height="75" @custom="search" v-model="searchtext"></u-search>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<u-swiper style="width: 90%;margin: 40rpx auto;border-radius: 5px" height="260" indicator indicatorMode="line"
			circular :list="moreimg">
		</u-swiper>
		<!-- 推荐产品 -->
		<view class="recommend">
			<view class="oneitem">
				<image src="/static/tuijian.png" class="tuijian"></image>推荐农产品
			</view>
			<view class="twoitem">
				<image class="img1" src="/static/yumi.JPG" mode=""></image>
				<image class="img2" src="/static/lunbo3.jpeg" mode=""></image>
			</view>
			<view class="twoitem">
				<image class="img3" src="/static/lunbo1.jpeg" mode=""></image>
				<image class="img4" src="/static/yumi.JPG" mode=""></image>
			</view>
		</view>
		<!-- 总产品列表 -->
		<view class="allthings">
			<view class="allitem">
				<image src="/static/all.png" class="allimg"></image>全部农产品
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
				// 轮播图图片
				moreimg: [
					'/static/lunbo1.jpeg',
					'/static/lunbo2.jpeg',
					'/static/lunbo3.jpeg',
				]
			}
		},
		onLoad() {
			// 获取状态栏高度
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
		},
		methods: {
			search(value) {
				console.log(value)
			}
		}
	}
</script>

<style>
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

	.content {
		background-color: #f7f7f7;
		height: 100% !important;
	}

	::v-deep .u-input--circle {
		background-color: #EEEEEE;
	}

	.recommend {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		margin: 0 auto;
	}

	.oneitem {
		font-weight: bold;
		color: #6C8E1E;
		display: flex;
		align-items: center;
	}

	.allitem {
		font-weight: bold;
		color: black;
		display: flex;
		align-items: center;
	}

	.allimg {
		width: 40rpx;
		height: 40rpx;
	}

	.tuijian {
		width: 50rpx;
		height: 50rpx;
	}

	.twoitem {
		margin-top: 12rpx;
		display: flex;
		width: 100%;
	}

	.img1 {
		width: 35%;
		height: 100px;
		border-radius: 5px;
	}

	.img2 {
		width: 64%;
		height: 100px;
		margin-left: 12rpx;
		border-radius: 5px;
	}

	.img4 {
		width: 35%;
		height: 100px;
		border-radius: 5px;
	}

	.img3 {
		width: 64%;
		height: 100px;
		margin-right: 12rpx;
		border-radius: 5px;
	}

	.recommend {
		background-color: #fff;
		padding: 30rpx;
		border-radius: 10px;
	}

	.allthings {
		margin-top: 20rpx;
		background-color: #fff;
		padding: 30rpx;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
	}

	.oneshoping {
		display: flex;
		margin-top: 30rpx;
	}

	.shopimg {
		width: 240rpx;
		height: 200rpx;
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
		color: #707070;
		height: 96rpx;
		overflow: hidden;
	}

	.oneprice {
		margin-left: 20rpx;
		color: red;
		font-weight: bold;
		font-size: 20px;
	}
	
	span {
		font-size: 16px;
	}
</style>
