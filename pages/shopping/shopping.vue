<template>
	<view class="content">
		<view class="allthings">
			<view class="oneshoping" v-for="item in newshoppingCartData" :key="item.id" v-if="item.status =='1'">
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
			<view class="bottombox">
				<view class="textprice">
					合计：<span class="pricenum">￥{{price}}</span>
				</view>
				<u-button style="margin-left: 6rpx;width: 320rpx;" shape="circle" color="#ff5722" text="结算"
					@click="pay"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//  用户id
				userid: '',
				// 所有用户的购物车数据
				shoppingCartData: [],
				// 产品数据
				shopDataList: [],
				// 对应用户购物车数据
				newshoppingCartData: [],
				// 总价格
				price: 0,
				// 购物车所有产品的id（数组）
				ids: []
			}
		},
		onLoad() {
			this.userid = uni.getStorageSync('userId');
		},
		onShow() {
			console.log(this.price)
			// 每次进入购物车都初始化购物车的数据
			this.newshoppingCartData = []
			// 初始化总价格
			this.price = 0
			// this.getShopCart().then(() => {
			// 	this.getShopData().then(() => {
			// 		this.shopDataList.forEach(item => {
			// 			// 在所有产品里面筛选该用户已加到购物车里面的数据
			// 			this.shoppingCartData.forEach((subitem, index) => {
			// 				if (subitem.commodityid == item.id) {
			// 					this.newshoppingCartData.push(item)
			// 					console.log('@')
			// 				}
			// 			})
			// 		})
			// 	}).then(() => {
			// 		// 统计购物车所有产品的总金额
			// 		this.newshoppingCartData.forEach(item => {
			// 			this.price += item.price*1
			// 		})
			// 	})
			// })
			// })
			this.getShopCart()
			console.log(this.newshoppingCartData)
		},
		methods: {
			// 获取该用户加入购物车的数据
			async getShopCart() {
				const res = await this.$http({
					url: 'shop/selectshopcart',
					method: 'POST',
					data: {
						userid: this.userid
					}
				})
				if (res.data.code === 200) {
					this.shoppingCartData = res.data.data
					// 获取产品列表
					const res1 = await this.$http({
						url: 'shop/admincommodity',
						method: 'POST'
					})

					if (res1.data.code === 200) {
						this.shopDataList = res1.data.data
						console.log(this.shoppingCartData)
						this.shopDataList.forEach(item => {
							// 在所有产品里面筛选该用户已加到购物车里面的数据
							this.shoppingCartData.forEach((subitem, index) => {
								if (subitem.commodityid == item.id) {
									this.newshoppingCartData.push(item)
								}
							})
						})
						this.newshoppingCartData.forEach(item => {
							this.price += item.price * 1
						})
					}
				}
			},
			// 跳转到结算页面并将价格传过去
			pay() {
				console.log(this.newshoppingCartData)
				this.newshoppingCartData.forEach(item => {
					this.ids.push(item.id)
				})
				uni.navigateTo({
					url: '/pages/pay/pay?types=0&price=' + this.price+'&id='+JSON.stringify(this.ids)
				})
			}
		}
	}
</script>

<style scoped>
	.allthings {
		margin-top: 20rpx;
		background-color: #fff;
		padding: 30rpx;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
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

	.bottombox {
		position: fixed;
		bottom: 100rpx;
		display: flex;
		right: 0;
		align-items: center;
	}

	.pricenum {
		color: red;
		font-weight: bold;
	}
</style>
