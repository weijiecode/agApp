<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<view class="topmenu" :style="{ marginTop: iStatusBarHeight + 'px'}">
			<image src="/static/back.png" class="back" @click="back"></image>
			<p>支付</p>
			<view class="zhanwei"></view>
		</view>
		<!-- 无优惠券 -->
		<view v-if="!isprice" class="pay">
			<p class="title">需支付金额</p>
			<p class="subtitle">￥{{(price*1).toFixed(2)}}</p>
			<u--input class="remark" placeholder="输入备注" border="bottom" clearable v-model="remark"></u--input>
			<u-button style="width:80%;margin-top: 20px;" type="success" text="立即支付" @click="topay"></u-button>
		</view>
		<!-- 有优惠券 -->
		<view v-if="isprice" class="pay">
			<p class="title">需支付金额</p>
			<p style="text-decoration: line-through;color: #545454;" class="subtitle">￥{{(price*1).toFixed(2)}}</p>
			<div class="bothbox">
				<div class="leftbox"><span class="discount">减</span>助农补贴</div>
				<div class="rightbox">-￥5</div>
			</div>
			<div class="endprice">
				<span class="heji">合计&nbsp;&nbsp;￥</span>
				<span class="price">{{(price*1 - 5).toFixed(2)}}</span>
			</div>
			<u--input class="remark" placeholder="输入备注" border="bottom" clearable v-model="remark"></u--input>
			<u-button style="width:80%;margin-top: 20px;" type="success" text="立即支付" @click="topay"></u-button>
		</view>
		<!-- 提示信息 -->
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//  用户id
				userid: '',
				// 用户地址
				address: '',
				// 状态栏高度
				iStatusBarHeight: 0,
				// 价格
				price: 0,
				// 备注
				remark: '',
				// 判断是从商品页支付还是购物车支付（从details商品页面跳转过来则不需要清空购物车数据）
				types: '0',
				// 产品id
				id: '',
				// 购物车传参过来的数组id
				ids: [],
				isprice: ''
			}
		},
		onLoad(option) {
			this.types = option.types
			this.price = option.price
			if (this.types == '1') {
				this.id = option.id
			} else {
				this.ids = JSON.parse(option.id)
			}
			// 获取状态栏高度
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			this.userid = uni.getStorageSync('userId');
			this.address = uni.getStorageSync('address');
			this.getDiscount()
		},
		methods: {
			// 返回到购物车
			back() {
				// 如果从购物车点击的支付则返回的页面是购物车
				if (this.types == '0') {
					uni.switchTab({
						url: "/pages/shopping/shopping"
					})
				} else {
					// 如果从一个商品跳转的支付页面则直接返回到该商品页
					uni.navigateBack()
				}
			},
			// 查询是否已经领取优惠券
			async getDiscount() {
				const res = await this.$http({
					url: 'shop/selectprice',
					method: 'POST',
					data: {
						id: this.userid
					}
				})
				if(res.data.data[0].discount){
					this.isprice = true
				}else {
					this.isprice = false
				}
			},
			async btnprice() {
				const res = await this.$http({
					url: 'shop/addprice',
					method: 'POST',
					data: {
						id: this.userid,
						discount: ''
					}
				})
				console.log(res.data)
			},
			// 支付
			async topay() {
				this.btnprice()
				// 如果从购物车点击的支付则循环遍历存储支付记录
				if (this.types === '0') {
					this.ids.forEach(async item => {
						const res = await this.$http({
							url: 'shop/addpay',
							method: 'POST',
							data: {
								commodityId: item,
								userId: this.userid,
								address: this.address,
								remark: this.remark
							}
						})
						console.log(res)
						if (res.data.code === 200) {
							this.$refs.uNotify.show({
								message: '支付成功',
								type: 'success',
								color: '#ffffff',
								bgColor: '',
								fontSize: 25,
								duration: 3000
							})
						}
					})
					const delres = await this.$http({
						url: 'shop/delshopcart',
						method: 'POST',
						data: {
							userid: this.userid
						}
					})
					console.log(delres)
					setTimeout(() => {
						uni.switchTab({
							url: "/pages/shopping/shopping"
						})
					}, 1500)
				} else {
					// 从商品页支付
					const res1 = await this.$http({
						url: 'shop/addpay',
						method: 'POST',
						data: {
							commodityId: this.id,
							userId: this.userid,
							address: this.address,
							remark: this.remark
						}
					})
					console.log(res1)
					if (res1.data.code === 200) {
						this.$refs.uNotify.show({
							message: '支付成功',
							type: 'success',
							color: '#ffffff',
							bgColor: '',
							fontSize: 25,
							duration: 3000
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
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

	.title {
		text-align: center;
		font-size: 20px;
		margin-top: 20px;
		font-weight: bold;
	}

	.subtitle {
		text-align: center;
		font-size: 24px;
		margin-top: 20px;
		font-weight: bold;
	}

	.discount {
		width: 10px;
		height: 10px;
		color: white;
		background-color: red;
		border-radius: 2px;
		margin-left: 25px;
		font-size: 14px;
		padding: 3px;
		margin-right: 5px;

	}

	.remark {
		padding: 6px 9px;
		margin-left: 25px;
		margin-right: 25px;
		margin-top: 25px;
	}

	.bothbox {
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
	}

	.rightbox {
		margin-right: 25px;
		font-size: 19px;
		color: red;
	}

	.endprice {
		display: flex;
		justify-content: end;
		margin-right: 25px;
		margin-top: 20px;
		font-size: 20px;
		font-weight: bold;
	}

	.price {
		font-size: 22px;
	}
</style>
