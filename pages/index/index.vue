<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<!-- 搜索框 -->
		<view class="topsearch" :style="{ marginTop: iStatusBarHeight + 'px'}">
			<view class="u-demo-block__content">
				<view class="u-page__tag-item">
					<u-search searchIconSize="45" height="75" @custom="search"></u-search>
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
				<image class="img1" :src="shopDataList[0].photo" mode=""></image>
				<image class="img2" :src="shopDataList[1].photo" mode=""></image>
			</view>
			<view class="twoitem">
				<image class="img3" :src="shopDataList[2].photo" mode=""></image>
				<image class="img4" :src="shopDataList[3].photo" mode=""></image>
			</view>
		</view>
		<!-- 总产品列表 -->
		<view class="allthings">
			<view class="allitem">
				<image src="/static/all.png" class="allimg"></image>全部农产品
			</view>
			<view class="oneshoping" @click="todetails(item.id)" v-for="item in shopDataList" :key="item.id" v-if="item.status =='1'">
				<image :src="item.photo" class="shopimg"></image>
				<view class="alltext">
					<view class="onetitle">
						{{item.title}}
					</view>
					<view class="onecontent">
						{{item.content}}
					</view>
					<view class="oneprice">
						<span>￥</span>{{item.price}}
					</view>
					<view class="shopname">
						{{item.merchantid}}
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
				// 轮播图图片
				moreimg: [
					'/static/lunbo1.jpeg',
					'/static/lunbo2.jpeg',
					'/static/lunbo3.jpeg',
				],
				// 产品数据
				shopDataList: [],
				// 获取店铺名称
				shopNameList: []
			}
		},
		onLoad() {
			// 获取状态栏高度
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
		},
		onShow() {
			this.getShopNameData().then(() => {
				this.getShopData().then(() => {
					console.log(this.shopDataList)
					this.shopDataList.forEach((item,index) => {
						this.shopNameList.forEach((subitem,subindex) => {
							if(item.merchantid == subitem.id) {
								this.shopDataList[index].merchantid = subitem.shopname
							}
						})
					})
				})
			})
		},
		methods: {
			// 搜索
			search(value) {
				console.log(value)
				uni.navigateTo({
					url: "/pages/search/search?value="+value
				})
			},
			// 跳转到商品详情页
			todetails(id) {
				uni.navigateTo({
					url: "/pages/details/details?id="+id
				})
			},
			// 获取产品列表
			async getShopData() {
				const res = await this.$http({
					url: 'shop/admincommodity',
					method: 'POST'
				})
				if(res.data.code === 200) {
					this.shopDataList = res.data.data
				}
			},
			// 获取店铺名称
			async getShopNameData() {
				const res = await this.$http({
					url: 'shop/shopname',
					method: 'POST'
				})
				console.log(res)
				if(res.data.code === 200) {
					this.shopNameList = res.data.data
				}
			}
		}
	}
</script>

<style scoped>
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
		height: 100%;
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
</style>
