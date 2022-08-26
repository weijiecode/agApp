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
		<u-swiper style="width: 90%;margin: 40rpx auto;border-radius: 10px" height="260" indicator indicatorMode="line"
			circular :list="moreimg">
		</u-swiper>
		<!-- 推荐产品 -->
		<view class="recommend">
			<view class="oneitem">
				推荐农产品
			</view>
			<view class="twoitem">
				<image class="img1" src="/static/testphoto.JPG" mode=""></image>
				<image class="img2" src="https://cdn.uviewui.com/uview/swiper/swiper1.png" mode=""></image>
			</view>
			<view class="twoitem">
				<image class="img3" src="https://cdn.uviewui.com/uview/swiper/swiper1.png" mode=""></image>
				<image class="img4" src="/static/testphoto.JPG" mode=""></image>
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
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
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
</style>
