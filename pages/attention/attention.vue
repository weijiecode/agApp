<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<view class="topmenu" :style="{ marginTop: iStatusBarHeight + 'px'}">
			<image src="/static/back.png" class="back" @click="back"></image>
			<p>关注店铺</p>
			<view class="zhanwei"></view>
		</view>
		<view class="listbox">
			<view class="onelist" v-for="item in newArry" :key="item.id">
				<image src="/static/shopindex.png" class="lefticon"></image>{{item.shopname}}
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
				// 获取店铺名称
				shopNameList: [],
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
			this.getShopNameData()
		},
		methods: {
			// 返回到 我的 页面
			back() {
				// 如果从购物车点击的支付则返回的页面是购物车
				uni.switchTab({
					url: "/pages/mycenter/mycenter"
				})
			},
			// 获取店铺名称
			async getShopNameData() {
				this.newArry = []
				const res = await this.$http({
					url: 'shop/shopname',
					method: 'POST'
				})
				if (res.data.code === 200) {
					this.shopNameList = res.data.data
					const res1 = await this.$http({
						url: 'shop/selectallattention',
						method: 'POST',
						data: {
							userId: this.userid
						}
					})
					if (res1.data.code === 200) {
						this.shopNameList.forEach(item => {
							res1.data.data.forEach(subitem => {
								if (item.id == subitem.merchantId) {
									this.newArry.push(item)
								}
							})
						})
					}
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

	.lefticon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 16rpx;
	}

	.listbox {
		margin-top: 20px;
	}

	.onelist {
		padding-left: 20px;
		box-sizing: border-box;
		font-size: 18px;
		border: 1px solid #ccc;
		width: 90%;
		margin: 10px auto;
		border-radius: 10px;
		height: 45px;
		line-height: 45px;
	}
</style>
