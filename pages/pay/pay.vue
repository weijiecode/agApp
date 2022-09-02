<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<view class="topmenu" :style="{ marginTop: iStatusBarHeight + 'px'}">
			<image src="/static/back.png" class="back" @click="back"></image>
			<p>支付</p>
			<view class="zhanwei"></view>
		</view>
		<view class="pay">
			<p class="title">需支付金额</p>
			<p class="subtitle">￥{{price}}</p>
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
				// 状态栏高度
				iStatusBarHeight: 0,
				// 价格
				price: 0,
				// 判断是从商品页支付还是购物车支付（从details商品页面跳转过来则不需要清空购物车数据）
				types: '0'
			}
		},
		onLoad(option) {
			this.types = option.types
			this.price = option.price
			// 获取状态栏高度
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			this.userid = uni.getStorageSync('userId');
		},
		methods: {
			// 返回到购物车
			back() {
				// 如果从购物车点击的支付则返回的页面是购物车
				if(this.types == '0'){
					uni.switchTab({
						url: "/pages/shopping/shopping"
					})
				}else {
					// 如果从一个商品跳转的支付页面则直接返回到该商品页
					uni.navigateBack()
				}
			},
			// 支付
			async topay() {
				// 如果从购物车点击的支付则清除数据库该用户的所有加入购物车的数据
				if(this.types === '0'){
					const res = await this.$http({
						url: 'shop/delshopcart',
						method: 'POST',
						data: {
							userid: this.userid
						}
					})
					console.log(res)
					if(res.data.code === 200) {
						this.$refs.uNotify.show({
							message: '支付成功',
							type: 'success',
							color: '#ffffff',
							bgColor: '',
							fontSize: 25,
							duration: 3000
						})
						setTimeout(() => {
							uni.switchTab({
								url: "/pages/shopping/shopping"
							})
						},1500)
					}
				}else {
					// 从商品页支付的则直接提示支付成功并跳转到上一个页面
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
					},1500)
				}
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
	
	.title{
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
</style>
