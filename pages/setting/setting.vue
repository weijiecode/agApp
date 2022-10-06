<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<view class="topmenu" :style="{ marginTop: iStatusBarHeight + 'px'}">
			<image src="/static/back.png" class="back" @click="back"></image>
			<p>修改密码</p>
			<view class="zhanwei"></view>
		</view>
		<view class="passwordbox">
			<u--form labelPosition="left" labelWidth="80px">
				<u-form-item label="旧密码" borderBottom>
					<u--input v-model="oldpassword" border="none"></u--input>
				</u-form-item>
				<u-form-item label="新密码" borderBottom>
					<u--input v-model="newpassword" border="none"></u--input>
				</u-form-item>
				<u-button @click="btnpassword" style="width: 30%;margin-top: 30px;" type="primary"
					text="确认修改密码"></u-button>
			</u--form>
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
				// 旧密码
				oldpassword: '',
				// 新密码
				newpassword: '',
				// 用户id
				userid: ''
			}
		},
		onLoad() {
			// 获取状态栏高度
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			this.userid = uni.getStorageSync('userId');
		},
		methods: {
			// 返回到 我的 页面
			back() {
				// 如果从购物车点击的支付则返回的页面是购物车
				uni.switchTab({
					url: "/pages/mycenter/mycenter"
				})
			},
			// 确认修改密码
			async btnpassword() {
				const res = await this.$http({
					url: "account/checkpassword",
					method: "POST",
					data: {
						id: this.userid,
						password: this.oldpassword
					}
				})
				console.log(res)
				if (res.data.code === 200) {
					const res1 = await this.$http({
						url: 'account/updatepassword',
						method: 'POST',
						data: {
							id: this.userid,
							password: this.newpassword
						}
					})
					if(res1.data.code === 200){
						// 输入框清空
						this.oldpassword = ''
						this.newpassword = ''
						this.$refs.uNotify.show({
							message: '密码修改成功',
							type: 'success',
							color: '#ffffff',
							bgColor: '',
							fontSize: 25,
							duration: 3000
						})
					}
				}else {
					this.$refs.uNotify.show({
						message: '修改密码失败，请重试',
						type: 'error',
						color: '#ffffff',
						bgColor: '',
						fontSize: 25,
						duration: 3000
					})
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
	
	.passwordbox {
		padding: 25px;
	}

</style>
