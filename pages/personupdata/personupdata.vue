<template>
	<view class="content">
		<view class="topmenu">
			<image src="/static/back.png" class="back" @click="back"></image>
			<p>个人资料</p>
			<view class="zhanwei"></view>
		</view>
		<view class="userdata">
			<view class="photo">
				<u-upload :fileList="fileList6" @afterRead="afterRead" @delete="deletePic" name="6" multiple
					:maxCount="1" :max-size="2 * 1024 * 1024" @oversize="oversize">
					<image class="userphoto" v-if="userdata.photo!=null" :src="userdata.photo" mode="">
						<image class="nophoto" src="/static/photo.png" mode=""
							v-if="userdata.photo==null || userdata.photo==''"></image>
				</u-upload>
				<p class="titlephoto">点击更换头像</p>
			</view>
			<u--form labelPosition="left" :model="userdata" labelWidth="80px">
				<u-form-item @click="tipnoupdata" label="用户名" borderBottom>
					<u--input disabled v-model="userdata.username" border="none"></u--input>
				</u-form-item>
				<u-form-item label="昵称" borderBottom>
					<u--input v-model="userdata.nickname" border="none"></u--input>
				</u-form-item>
				<u-form-item label="性别">
					<u-radio-group size="32" v-model="userdata.sex">
						<u-radio :name="1"></u-radio>
						<image class="sex" src="/static/sex1.png" mode=""></image>
						<u-radio :name="0"></u-radio>
						<image class="sex" src="/static/sex0.png" mode=""></image>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="手机号" borderBottom>
					<u--input v-model="userdata.phone" border="none"></u--input>
				</u-form-item>
				<u-form-item label="邮箱号" borderBottom>
					<u--input v-model="userdata.email" border="none"></u--input>
				</u-form-item>
				<u-form-item label="个人简介" borderBottom>
					<u--input v-model="userdata.introduction" border="none"></u--input>
				</u-form-item>
			</u--form>
		</view>
		<u-button @click="personupdata" shape="circle" style="margin-top: 40rpx;width: 85%;" text="确认修改"
			color="#6C8E1E">
		</u-button>
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
					photo: '',
					username: '',
					nickname: '',
					sex: 1,
					phone: '',
					email: '',
					introduction: ''
				},
				// 当前登录用户id
				userId: '',
				// 新头像
				newphoto: '',
				// 组件头像存储
				fileList6: [],
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'userId',
				success: (res) => {
					this.userId = res.data
				}
			})
		},
		async mounted() {
			// 页面一加载获取昵称和简介
			const res = await this.$http({
				url: 'account/userdata',
				method: 'POST',
				data: {
					id: this.userId
				}
			})
			this.userdata.photo = res.data.data.photo
			this.userdata.username = res.data.data.username
			this.userdata.nickname = res.data.data.nickname
			this.userdata.sex = res.data.data.sex * 1
			this.userdata.phone = res.data.data.phone
			this.userdata.email = res.data.data.email
			this.userdata.introduction = res.data.data.introduction
		},
		methods: {
			// 返回登录页
			back() {
				uni.switchTab({
					url: "/pages/mycenter/mycenter"
				})
			},
			// 头像超出大小限制
			oversize() {
				uni.showToast({
					title: "图片最大不能超过2M",
					icon: 'none'
				})
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			// 上传
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://localhost:5001/mycenter/photouploadurl', // 接口地址
						filePath: url,
						name: 'file',
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
							this.newphoto = res.data.slice(1, res.data.length - 1)
							this.setphoto()
						}
					});
				})
			},
			// 发送修改头像请求
			async setphoto() {
				const result = await this.$http({
					url: "mycenter/updatephoto",
					method: "POST",
					data: {
						photo: this.newphoto,
						oldphoto: this.userdata.photo,
						id: this.userId
					}
				})
				if (result.data.code == 200) {
					this.userdata = {
						photo: this.newphoto,
						nickname: this.userdata.nickname,
						sex: this.userdata.sex,
						phone: this.userdata.phone,
						email: this.userdata.email,
						introduction: this.userdata.introduction
					}
					this.$refs.uNotify.show({
						message: '修改头像成功！',
						type: 'success',
						color: '#ffffff',
						bgColor: '',
						fontSize: 25,
						duration: 3000
					})
				}
			},
			// 点击用户名提示不能修改
			tipnoupdata() {
				this.$refs.uNotify.show({
					message: '用户名不能修改！',
					type: 'error',
					color: '#ffffff',
					bgColor: '',
					fontSize: 25,
					duration: 3000
				})
			},
			// 修改
			async personupdata() {
				if (this.userdata.password != this.userdata.checkpassword) {
					this.$refs.uNotify.show({
						message: '密码不一致，请修改后重试',
						type: 'error',
						color: '#ffffff',
						bgColor: '',
						fontSize: 25,
						duration: 3000
					})
				} else {
					const res = await this.$http({
						url: "mycenter/updata",
						method: "POST",
						data: {
							nickname: this.userdata.nickname,
							sex: this.userdata.sex,
							phone: this.userdata.phone,
							email: this.userdata.email,
							introduction: this.userdata.introduction,
							id: this.userId
						}
					})
					// 提交修改并返回我的页面
					if (res.data.code === 200) {
						this.$refs.uNotify.show({
							message: '个人资料修改成功！',
							type: 'success',
							color: '#ffffff',
							bgColor: '',
							fontSize: 25,
							duration: 3000
						})
						setTimeout(() => {
							uni.switchTab({
								url: "/pages/mycenter/mycenter"
							})
						}, 1500)
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

	.photo {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.nophoto {
		width: 140rpx;
		height: 140rpx;
		border-radius: 100%;
		box-shadow: 0 0 0 3px #f3efef;
	}
	.userphoto {
		width: 140rpx;
		height: 140rpx;
		border-radius: 100%;
		box-shadow: 0 0 0 3px #f3efef;
	}
	
	::v-deep .u-upload__wrap__preview__image {
		width: 140rpx !important;
		height: 140rpx !important;
		border-radius: 100%;
		box-shadow: 0 0 0 3px #f3efef;
	}

	.titlephoto {
		font-size: 13px;
		color: #aaa;
		margin-top: 10rpx;
	}
</style>
