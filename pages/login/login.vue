<template>
	<view class="content">
		<image src="/static/logo1.png" alt="" class="toplogo">
			<p class="logop">快捷购物、安心购物、品质保障</p>
			<view class="userinput">
				<u--input v-model="username" placeholder="请输入用户名" border="bottom" clearable></u--input>
				<u--input v-model="password" placeholder="请输入密码" border="bottom" password clearable></u--input>
			</view>
			<u-button @click="login" shape="circle" style="margin-top: 40rpx;width: 85%;" text="登录" color="#6C8E1E">
			</u-button>
			<view class="allbtn">
				<view class="leftbtn" @click="showmsg">
					忘记密码？
				</view>
				<view class="rightbtn" @click="register">
					注册账号
				</view>
			</view>
			<!-- 提示信息 -->
			<u-notify ref="uNotify"></u-notify>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				// 用户名
				username: '',
				// 密码
				password: ''
			}
		},
		methods: {
			// 忘记密码提示
			showmsg() {
				this.$refs.uNotify.show({
					message: '请联系管理员',
					type: 'primary',
					color: '#ffffff',
					bgColor: '',
					fontSize: 25,
					duration: 3000
				})
			},
			// 登录
			async login() {
				const res = await this.$http({
					url: "account/login",
					method: "POST",
					data: {
						username: this.username,
						password: this.password
					}
				})
				if (res.data.code === 200) {
					// 将该用户id存储到缓存中
					uni.setStorageSync('userId', res.data.data.id);
					uni.setStorageSync('address', res.data.data.address);
					uni.switchTab({
						url: "/pages/index/index"
					})
				} else {
					this.$refs.uNotify.show({
						message: '账号或密码错误，请重试',
						type: 'error',
						color: '#ffffff',
						bgColor: '',
						fontSize: 25,
						duration: 3000
					})
				}
			},
			// 跳转到注册页
			register() {
				uni.navigateTo({
					url: "/pages/register/register"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.toplogo {
		width: 300rpx;
		height: 300rpx;
		align-self: center;
		margin-top: 200rpx;
	}

	.logop {
		align-self: center;
		font-size: 13px;
		color: #525252;
		margin-top: -40rpx;
		z-index: 2;
	}

	.userinput {
		margin-top: 100rpx;
		width: 85%;
		margin: 50px auto 0;
	}

	.allbtn {
		display: flex;
		width: 85%;
		margin: 0 auto;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.leftbtn {
		color: #525252;
		font-size: 15px;
	}

	.rightbtn {
		color: #6C8E1E;
		font-size: 15px;
	}
</style>
