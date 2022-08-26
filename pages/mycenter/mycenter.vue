<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<view class="topuser">
			<view class="leftphoto">
				<image src="/static/testphoto.JPG" class="photo"></image>
			</view>
			<view class="rightp">
				<view class="nickname">
					{{nickname}}
				</view>
				<view class="introduction" v-if="introduction == '' || introduction == null">
					暂无个人简介~
				</view>
				<view class="introduction" v-if="introduction != ''">
					{{introduction}}
				</view>
			</view>
			<view class="edit">
				<u-button @click="personupdata" size="mini" shape="circle" color="#6C8E1E" plain text="编辑个人资料"></u-button>
			</view>
		</view>
		<view class="menus">
			<view class="oneitem">
				<image src="/static/zhifu.png" class="subicon"></image>
				<view class="subtext">
					待支付
				</view>
			</view>
			<view class="oneitem">
				<image src="/static/dengdai.png" class="subicon"></image>
				<view class="subtext">
					待发货
				</view>
			</view>
			<view class="oneitem">
				<image src="/static/shouhuo.png" class="subicon"></image>
				<view class="subtext">
					待收货
				</view>
			</view>
			<view class="oneitem">
				<image src="/static/pingjia.png" class="subicon"></image>
				<view class="subtext">
					评价
				</view>
			</view>
		</view>
		<view class="subcontent">
			<view class="twoitem">
				<image src="/static/shoucang.png" class="subtwophoto"></image>
				<view class="subtwotext">
					商品收藏
				</view>
			</view>
			<view class="twoitem">
				<image src="/static/dianpu.png" class="subtwophoto"></image>
				<view class="subtwotext">
					店铺关注
				</view>
			</view>
			<view class="twoitem">
				<image src="/static/dizhi.png" class="subtwophoto"></image>
				<view class="subtwotext">
					收货地址
				</view>
			</view>
			<view class="twoitem" style="border-bottom: 1px solid #fff;">
				<image src="/static/shezhi.png" class="subtwophoto"></image>
				<view class="subtwotext">
					设置
				</view>
			</view>
		</view>
		<view class="out" @click="out">
			<view class="twoitem" style="border-bottom: 1px solid #fff;">
				<image src="/static/out.png" class="subtwophoto"></image>
				<view class="subtwotext">
					退出账号
				</view>
			</view>
		</view>
		<view class="zhanwei">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 状态栏高度
				iStatusBarHeight: 0,
				// 当前登录用户id
				userId: '',
				// 用户昵称
				nickname: '',
				// 用户简介
				introduction: ''
			}
		},
		onLoad() {
			// 获取状态栏高度
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			uni.getStorage({
				key: 'userId',
				success: (res) =>  {
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
			this.nickname = res.data.data.nickname
			this.introduction = res.data.data.introduction
		},
		methods: {
			// 退出
			out() {
				// 跳转到登录界面
				uni.navigateTo({
					url: "/pages/login/login"
				})
				// 清楚缓存数据
				uni.removeStorageSync('userId');
			},
			// 跳转修改个人资料界面
			personupdata() {
				uni.navigateTo({
					url: '/pages/personupdata/personupdata'
				})
			}
		}
	}
</script>

<style scoped>
	.stat {
		background-color: #def9a0;
		position: fixed;
		z-index: 1;
		height: var(--status-bar-height); // --status-bar-height系统状态栏高度
		width: 100%;
		top: 0;
		left: 0;
	}

	.content {
		background-color: #f7f7f7;
		height: 100% !important;
	}

	.topuser {
		position: relative;
		margin-top: 50rpx;
		display: flex;
		align-items: center;
		background: linear-gradient(135deg, #def9a0 50%, #d4ed9b);
		height: 250rpx;
	}

	.photo {
		width: 135rpx;
		height: 135rpx;
		border-radius: 50%;
		margin-left: 100rpx;
		border: 1px solid #6C8E1E;
	}

	.rightp {
		margin-left: 50rpx;
		display: flex;
		flex-direction: column;
	}

	.nickname {}

	.introduction {
		font-size: 12px;
		color: #3e3e3e;
	}

	.edit {
		position: absolute;
		right: 10px;
	}

	.menus {
		margin: 30rpx auto 0;
		border-radius: 10px;
		width: 95%;
		background-color: #fff;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.subcontent {
		margin: 30rpx auto 0;
		border-radius: 10px;
		width: 95%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
	}

	.out {
		margin: 30rpx auto 0;
		border-radius: 10px;
		width: 95%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
	}

	.oneitem {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.subicon {
		width: 50rpx;
		height: 50rpx;
		margin-bottom: 10rpx;
	}

	.subtext {
		font-size: 12px;
		color: #282828;
	}

	.twoitem {
		display: flex;
		align-items: center;
		height: 110rpx;
		padding: 0 40rpx;
		border-bottom: 1px solid #e5e5e5;
	}

	.subtwophoto {
		width: 44rpx;
		height: 44rpx;
		margin-right: 30rpx;
	}
	
	.subtwotext {
		font-size: 15px;
	}

	.zhanwei {
		z-index: -1;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 500px;
		background-color: #f7f7f7;
	}
</style>
