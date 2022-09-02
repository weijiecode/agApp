<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<view class="topmenu" :style="{ marginTop: iStatusBarHeight + 'px'}">
			<image src="/static/back.png" class="back" @click="back"></image>
			<p>收藏产品</p>
			<view class="zhanwei"></view>
		</view>
		<view class="listbox">
			<view class="oneshoping" @click="todetails(item.id)" v-for="item in newArry" :key="item.id"
				v-if="item.status =='1'">
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
				//  用户id
				userid: '',
				// 产品数据
				shopDataList: [],
				// 筛选后的数据
				newArry: []
			}
		},
		onLoad() {
			// 获取状态栏高度
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			this.userid = uni.getStorageSync('userId');
		},
		onShow() {
			this.getShopData()
		},
		methods: {
			// 返回到 我的 页面
			back() {
				// 如果从购物车点击的支付则返回的页面是购物车
				uni.switchTab({
					url: "/pages/mycenter/mycenter"
				})
			},
			// 跳转到商品详情页
			todetails(id) {
				uni.navigateTo({
					url: "/pages/details/details?id="+id
				})
			},
			// 获取收藏数据
			async getShopData() {
				// 初始化数据
				this.newArry = []
				const res = await this.$http({
					url: 'shop/admincommodity',
					method: 'POST'
				})
				if (res.data.code === 200) {
					this.shopDataList = res.data.data
					const res1 = await this.$http({
						url: 'shop/selectallcollect',
						method: 'POST',
						data: {
							userId: this.userid
						}
					})
					if(res1.data.code === 200){
						this.shopDataList.forEach(item => {
							res1.data.data.forEach(subitem => {
								if(item.id == subitem.commodityId){
									this.newArry.push(item)
								}
							})
						})
					}
				}
			},
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

	.topmenu {
		display: flex;
		justify-content: space-between;
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
	
	.listbox {
		margin-top: 20px;
	}
</style>
