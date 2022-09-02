<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<view class="topmenu" :style="{ marginTop: iStatusBarHeight + 'px'}">
			<image src="/static/back.png" class="back" @click="back"></image>
			<p>产品详情</p>
			<view class="zhanwei"></view>
		</view>
		<image :src="photo" class="topimg"></image>
		<view class="subcontent">
			<view class="oneprice">
				<span style="font-size: 16px;">￥</span>{{price}}
			</view>
			<view class="onetitle">
				{{title}}
			</view>
			<view class="shopname">
				<image src="/static/shopindex.png" class="lefticon"></image>
				<span>{{shopname}}</span>
				<u-button @click="btnattention" style="margin-left: 6rpx;width: 110rpx;" size="mini" shape="circle" color="#6C8E1E" plain
					:text="isattention"></u-button>
			</view>
			<view class="onecontent">
				{{content}}
			</view>
		</view>
		<view class="bottom">
			<view class="rightbox">
				<image @click="btncollect" src="/static//sc.png" class="sc"></image>
				<p @click="btncollect" style="margin-right: 80px;font-size: 14px;color: #2c2c2c;">{{iscollect}}</p>
				<view class="onebox" @click="addshopcart">
					加入购物车
				</view>
				<view class="twobox" @click="pay">
					立即购买
				</view>
			</view>
		</view>
		<view class="zhanwei1">
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
				// 该产品id
				id: '',
				// 产品标题
				title: '',
				// 产品内容
				content: '',
				// 产品价格
				price: '',
				// 产品图片
				photo: '',
				// 产品店铺
				shopname: '',
				// 店铺id
				merchantid: '',
				// 用户id
				userid: '',
				// 显示是否收藏
				iscollect: '收藏',
				// 显示是否关注
				isattention: '关注'
			}
		},
		onLoad(option) {
			this.id = option.id*1
			this.userid = uni.getStorageSync('userId');
			// 获取状态栏高度
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			this.getShop().then(() => {
				this.getShopNameData()
				// 获取该用户是否收藏该商品
				this.getcollect()
				this.getattention()
			})
			
			
		},
		methods: {
			// 返回到首页
			back() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			// 获取指定id的产品
			async getShop() {
				const res = await this.$http({
					url: 'shop/selectshop',
					method: 'POST',
					data: {
						id: this.id
					}
				})
				console.log(res)
				this.title = res.data.data[0].title
				this.content = res.data.data[0].content
				this.price = res.data.data[0].price
				this.photo = res.data.data[0].photo
				this.merchantid = res.data.data[0].merchantid*1
				console.log('@')
			},
			// 获取店铺名称
			async getShopNameData() {
				const res = await this.$http({
					url: 'shop/shopname',
					method: 'POST'
				})
				console.log(res)
				if(res.data.code === 200) {
					res.data.data.forEach(item => {
						if(item.id == this.merchantid){
							this.shopname = item.shopname
						}
					})
				}
			},
			// 添加产品到购物车
			async addshopcart() {
				const res = await this.$http({
					url: 'shop/addshopcart',
					method: 'POST',
					data: {
						commodityid: this.id,
						userid: this.userid
					}
				})
				console.log(res)
				if(res.data.code === 200) {
					this.$refs.uNotify.show({
						message: '加入购物车成功',
						type: 'success',
						color: '#ffffff',
						bgColor: '',
						fontSize: 25,
						duration: 3000
					})
				}else {
					this.$refs.uNotify.show({
						message: '加入购物车失败',
						type: 'error',
						color: '#ffffff',
						bgColor: '',
						fontSize: 25,
						duration: 3000
					})
				}
			},
			// 跳转到结算页面并将价格传过去
			pay() {
				uni.navigateTo({
					url: '/pages/pay/pay?types=1&price=' + this.price
				})
			},
			// 获取用户是否收藏
			async getcollect() {
				console.log(this.userid)
				console.log(this.id)
				const res = await this.$http({
					url: 'shop/selectcollect',
					method: 'POST',
					data: {
						userId: this.userid,
						commodityId: this.id
					}
				})
				console.log(res)
				if(res.data.code === 200){
					this.iscollect = '已收藏'
				}else {
					this.iscollect = '收藏'
				}
			},
			// 点击收藏
			async btncollect() {
				// 如果当前是已收藏的状态则发送收藏的网络请求
				if(this.iscollect == '收藏'){
					const res = await this.$http({
						url: 'shop/addcollect',
						method: 'POST',
						data: {
							userId: this.userid,
							commodityId: this.id
						}
					})
					if(res.data.code === 200){
						this.iscollect = '已收藏'
					}
				}else {
					// 如果当前是未收藏的状态则发送取消收藏的网络请求
					const res1 = await this.$http({
						url: 'shop/delcollect',
						method: 'POST',
						data: {
							userId: this.userid,
							commodityId: this.id
						}
					})
					if(res1.data.code === 200){
						this.iscollect = '收藏'
					}
				}
			},
			// 获取用户是否关注
			async getattention() {
				console.log(this.userid)
				console.log(this.merchantid)
				const res = await this.$http({
					url: 'shop/selectattention',
					method: 'POST',
					data: {
						userId: this.userid,
						merchantId: this.merchantid
					}
				})
				console.log(res)
				if(res.data.code === 200){
					this.isattention = '已关注'
				}else {
					this.isattention = '关注'
				}
			},
			// 点击关注
			async btnattention() {
				// 如果当前是已关注的状态则发送关注的网络请求
				if(this.isattention == '关注'){
					const res = await this.$http({
						url: 'shop/addattention',
						method: 'POST',
						data: {
							userId: this.userid,
							merchantId: this.merchantid
						}
					})
					if(res.data.code === 200){
						this.isattention = '已关注'
					}
				}else {
					// 如果当前是关注的状态则发送取消关注的网络请求
					const res1 = await this.$http({
						url: 'shop/delattention',
						method: 'POST',
						data: {
							userId: this.userid,
							merchantId: this.merchantid
						}
					})
					if(res1.data.code === 200){
						this.isattention = '关注'
					}
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.stat {
		background-color: #f7f7f7;
		position: fixed;
		z-index: 1;
		height: var(--status-bar-height); // --status-bar-height系统状态栏高度
		width: 100%;
		top: 0;
		left: 0;
	}

	.content {
		background-color: #f7f7f7;
		height: 100%;
	}

	.subcontent {
		width: 90%;
		margin: 25rpx auto 0;
		background-color: #fff;
		border-radius: 20rpx;
	}

	.back {
		width: 20px;
		height: 20px;
		padding-left: 40rpx;
	}
	
	.sc {
		width: 20px;
		height: 20px;
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

	.topimg {
		margin-top: 20rpx;
		width: 100%;
		height: 500rpx;
	}

	.oneprice {
		margin-left: 20rpx;
		color: red;
		font-weight: bold;
		font-size: 18px;
	}

	.onetitle {
		margin-left: 20rpx;
		font-weight: bold;
		font-size: 15px;
		height: 40rpx;
		overflow: hidden;
	}

	.onecontent {
		margin-top: 40rpx;
		margin-left: 20rpx;
		font-size: 15px;
		color: #2b2b2b;
	}

	.bottom {
		position: fixed;
		bottom: 8rpx;
		display: flex;
		right: 20rpx;
	}

	.lefticon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 16rpx;
	}

	.rightbox {
		display: flex;
		align-items: center;
	}

	span {
		font-size: 15px;
	}

	.shopname {
		display: flex;
		align-items: center;
		justify-content: end;
		margin-top: 20rpx;
		color: #424242;
		margin-left: 20rpx;
	}

	.onebox {
		font-size: 13px;
		display: flex;
		justify-content: center;
		color: #fff;
		width: 160rpx;
		height: 30rpx;
		line-height: 30rpx;
		padding: 20rpx;
		border-top-left-radius: 50rpx;
		border-bottom-left-radius: 50rpx;
		background-color: #ff9800;
	}

	.twobox {
		font-size: 13px;
		display: flex;
		justify-content: center;
		color: #fff;
		width: 160rpx;
		height: 30rpx;
		line-height: 30rpx;
		padding: 20rpx;
		border-top-right-radius: 50rpx;
		border-bottom-right-radius: 50rpx;
		background-color: #ff5722;
	}
	
	.zhanwei1 {
		z-index: -1;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 500px;
		background-color: #f7f7f7;
	}
</style>
