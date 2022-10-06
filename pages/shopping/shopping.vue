<template>
	<view class="content">
		<view class="allthings">
			<view class="oneshoping">
				<u-swipe-action>
					<u-swipe-action-item v-for="item in newshoppingCartData" :key="item.id" v-if="item.status =='1'"
						@click="delclick(item.id)" :options="options1">
						<view class="swipe-action u-border-top u-border-bottom">
							<view class="swipe-action__content">
								<image :src="item.photo" class="shopimg"></image>
								<view class="boxcontent">
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
					</u-swipe-action-item>
				</u-swipe-action>
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
				ids: [],
				options1: [{
					text: '删除',
					style: {
						backgroundColor: '#f56c6c'
					}
				}]
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
				this.newshoppingCartData = []
				this.price = 0
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
									item.id = subitem.id
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
			// 购物车删除商品
			async delclick(index) {
				console.log(index)
				const res = await this.$http({
					url: 'shop/delcart',
					method: 'POST',
					data: {
						id: index
					}
				})
				console.log(res)
				if (res.data.code === 200) {
					this.getShopCart()
				}
			},
			// 跳转到结算页面并将价格传过去
			pay() {
				console.log(this.newshoppingCartData)
				this.newshoppingCartData.forEach(item => {
					this.ids.push(item.id)
				})
				uni.navigateTo({
					url: '/pages/pay/pay?types=0&price=' + this.price + '&id=' + JSON.stringify(this.ids)
				})
			}
		}
	}
</script>

<style scoped>
	.allthings {
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
		/* display: flex; */
		/* margin-top: 30rpx;
		box-shadow: 5px 5px 10px #efeded, -5px -5px 10px #f6f6f6;
		border-radius: 10px; */
	}

	::v-deep .swipe-action__content {
		display: flex !important;
		width: 100% !important;
	}
	
	.boxcontent {
		width: calc(100% - 120px);
	}

	uni-image {
		overflow: initial !important;
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
		margin-top: 10rpx;
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
	
	::v-deep .u-swipe-action-item__right__button {
		border-radius: 10px !important;
		margin-top: 5px !important;
	}
	
	::v-deep .swipe-action {
		border: 0.5px solid #e7e7e7 !important;
		margin-top: 5px !important;
		border-radius: 10px !important;
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

	.u-page {
		padding: 0;
	}

	.u-demo-block__title {
		padding: 10px 0 2px 15px;
	}

	.swipe-action {
		&__content {
			padding: 25rpx 0;

			&__text {
				font-size: 15px;
				color: $u-main-color;
				padding-left: 30rpx;
			}
		}
	}
</style>
