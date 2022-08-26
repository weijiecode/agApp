<template>
	<view class="content">
		<view class="topmenu">
			<image src="/static/back.png" class="back" @click="back"></image>
			<p>注册账号</p>
			<view class="zhanwei"></view>
		</view>
		<view class="userdata">
			<u--form labelPosition="right" :model="userdata" labelWidth="80px">
				<u-form-item label="用户名" borderBottom>
					<u--input v-model="userdata.username" border="none"></u--input>
				</u-form-item>
				<u-form-item label="密码" borderBottom>
					<u--input v-model="userdata.password" border="none"></u--input>
				</u-form-item>
				<u-form-item label="确认密码" borderBottom>
					<u--input v-model="userdata.checkpassword" border="none"></u--input>
				</u-form-item>
				<u-form-item label="昵称" borderBottom>
					<u--input v-model="userdata.nickname" border="none"></u--input>
				</u-form-item>
				<u-form-item label="性别">
					<u-radio-group size="32" v-model="userdata.sex">
						<u-radio :name="1"></u-radio>
						<image class="sex" src="/static/sex1.png" mode=""></image>
						<u-radio :name="0" ></u-radio>
						<image class="sex" src="/static/sex0.png" mode=""></image>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="手机号" borderBottom>
					<u--input v-model="userdata.phone" border="none"></u--input>
				</u-form-item>
				<u-form-item label="邮箱号" borderBottom>
					<u--input v-model="userdata.email" border="none"></u--input>
				</u-form-item>
			</u--form>
		</view>
		<u-button @click="register" shape="circle" style="margin-top: 40rpx;width: 85%;" text="确认注册" color="#6C8E1E"></u-button>
		<!-- 提示信息 -->
		<u-notify ref="uNotify"></u-notify>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 注册用户信息
				userdata: {
					username: '',
					password: '',
					checkpassword: '',
					nickname: '',
					sex: 1,
					phone: '',
					email: ''
				}
			}
		},
		methods: {
			// 返回登录页
			back() {
				uni.navigateTo({
					url: "/pages/login/login"
				})
			},
			// 注册
			async register() {
				if(this.userdata.password != this.userdata.checkpassword){
					this.$refs.uNotify.show({
						message: '密码不一致，请修改后重试',
						type: 'error',
						color: '#ffffff',
						bgColor: '',
						fontSize: 25,
						duration: 3000
					})
				}else {
					const res = await this.$http({
						url: "account/register",
						method: "POST",
						data: {
							reg_username: this.userdata.username,
							reg_password: this.userdata.password,
							reg_nickname: this.userdata.nickname,
							reg_sex: this.userdata.sex,
							reg_phone: this.userdata.phone,
							reg_email: this.userdata.email
						}
					})
					// 登录成功后提示注册成功并返回登录界面
					if(res.data.code === 200){
						this.$refs.uNotify.show({
							message: '注册账号成功！',
							type: 'success',
							color: '#ffffff',
							bgColor: '',
							fontSize: 25,
							duration: 3000
						})
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/login/login"
							})
						},1500)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		margin-top: 80rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
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

	.topmenu {
		display: flex;
		justify-content: space-between;
	}
	
	.userdata {
		    width: 85%;
		    margin: 50rpx auto 0;
	}
	
	.sex {
		width: 20px;
		height: 20px;
		margin-right: 28rpx;
	}
</style>
