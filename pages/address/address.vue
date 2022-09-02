<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<view class="topmenu" :style="{ marginTop: iStatusBarHeight + 'px'}">
			<image src="/static/back.png" class="back" @click="back"></image>
			<p>我的地址</p>
			<view class="zhanwei"></view>
		</view>
		<view class="addressshow">
			<u-popup :show="show">
				<view>
					<u--textarea v-model="address" confirmType="done" placeholder="请输入详细地址"></u--textarea>
				</view>
				<u-button @click="saveAddress" style="width: 30%;margin-top: 30px;" type="primary" text="保存提交">
				</u-button>
			</u-popup>
			<u-button @click="show=true" style="width: 30%;margin-top: 30px;" v-if="!address" type="primary"
				text="添加地址"></u-button>
			<view class="text">{{address}}</view>
			<u-button type="error" text="删除" v-if="address" @click="deladdress"></u-button>
		</view>
		<!-- 提示信息 -->
		<u-notify ref="uNotify"></u-notify>
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
				// 地址
				address: '',
				// 添加地址弹出框
				show: false
			}
		},
		onLoad() {
			// 获取状态栏高度
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			this.userid = uni.getStorageSync('userId');
		},
		onShow() {
			this.getAddress()
		},
		methods: {
			// 返回到 我的 页面
			back() {
				// 如果从购物车点击的支付则返回的页面是购物车
				uni.switchTab({
					url: "/pages/mycenter/mycenter"
				})
			},
			async getAddress() {
				const res = await this.$http({
					url: 'shop/selectaddress',
					method: 'POST',
					data: {
						userId: this.userid
					}
				})
				console.log(res)
				if (res.data.code === 200) {
					this.address = res.data.data[0].address
				}
			},
			// 提交保存地址
			async saveAddress() {
				const res = await this.$http({
					url: 'shop/addaddress',
					method: 'POST',
					data: {
						userId: this.userid,
						address: this.address
					}
				})
				console.log(res)
				if (res.data.code === 200) {
					this.show = false
					this.$refs.uNotify.show({
						message: '保存地址成功',
						type: 'success',
						color: '#ffffff',
						bgColor: '',
						fontSize: 25,
						duration: 3000
					})
					this.getAddress()
				} else {
					this.$refs.uNotify.show({
						message: '保存失败，请重试',
						type: 'error',
						color: '#ffffff',
						bgColor: '',
						fontSize: 25,
						duration: 3000
					})
				}
			},
			// 删除地址
			async deladdress() {
				const res = await this.$http({
					url: 'shop/deladdress',
					method: 'POST',
					data: {
						userId: this.userid
					}
				})
				console.log(res)
				if(res.data.code === 200) {
					this.address = ''
					this.$refs.uNotify.show({
						message: '删除地址成功',
						type: 'success',
						color: '#ffffff',
						bgColor: '',
						fontSize: 25,
						duration: 3000
					})
					this.getAddress()
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

	.text {
		font-size: 18px;
		height: 90px;
		line-height: 70px;
		padding-left: 20px;
	}
</style>
