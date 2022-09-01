<template>
	<view class="content">
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<view class="topmenu" :style="{ marginTop: iStatusBarHeight + 'px'}">
			<image src="/static/back.png" class="back" @click="back"></image>
			<p>产品详情</p>
			<view class="zhanwei"></view>
		</view>
		<!-- 搜索列表 -->
		<!-- 总产品列表 -->
		<view class="allthings">
			<view class="allitem">
				搜索结果列表
			</view>
			<view class="oneshoping" @click="todetails(item.id)" v-for="item in newArry" :key="item.id" v-if="item.status =='1'">
				<image :src="item.photo" class="shopimg"></image>
				<view class="alltext">
					<view class="onetitle">
						{{item.title}}
					</view>
					<view class="onecontent">
						{{item.content}}
					</view>
					<view class="oneprice">
						<span>￥</span>{{item.price}}
					</view>
					<view class="shopname">
						{{item.merchantid}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 状态栏高度
				iStatusBarHeight: 0,
				// 搜索关键字
				searchtext: '',
				// 产品数据
				shopDataList: [],
				// 获取店铺名称
				shopNameList: [],
				// 搜索后的数据
				newArry: []
			}
		},
		onLoad(option) {
			this.searchtext = option.value
			// 获取状态栏高度
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
			
			this.getShopNameData().then(() => {
				this.getShopData().then(() => {
					this.shopDataList.forEach((item,index) => {
						this.shopNameList.forEach((subitem,subindex) => {
							if(item.merchantid == subitem.id) {
								this.shopDataList[index].merchantid = subitem.shopname
							}
						})
					})
				}).then(() => {
					this.shopDataList.forEach(item => {
						if(item.title.indexOf(this.searchtext)>=0){
							this.newArry.push(item)
						}
					})
				})
			})
			
		},
		methods: {
			// 搜索
			search(value) {
				console.log(value)
			},
			// 返回到首页
			back() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			// 获取产品列表
			async getShopData() {
				const res = await this.$http({
					url: 'shop/admincommodity',
					method: 'POST'
				})
				if(res.data.code === 200) {
					this.shopDataList = res.data.data
				}
			},
			// 获取店铺名称
			async getShopNameData() {
				const res = await this.$http({
					url: 'shop/shopname',
					method: 'POST'
				})
				console.log(res)
				if(res.data.code === 200) {
					this.shopNameList = res.data.data
				}
			},
			// 跳转到商品详情页
			todetails(id) {
				uni.navigateTo({
					url: "/pages/details/details?id="+id
				})
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
	.topsearch {
		width: 90%;
		margin: 0 auto;
	}
	
	.allthings {
		margin-top: 20rpx;
		background-color: #fff;
		padding: 30rpx;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
	}
	.allitem {
		font-weight: bold;
		color: black;
		display: flex;
		align-items: center;
		color: #646464;
		font-size: 15px;
	}
	
	.allimg {
		width: 40rpx;
		height: 40rpx;
	}
	
	.topmenu {
		display: flex;
		justify-content: space-between;
	}
	
	.oneshoping {
		display: flex;
		margin-top: 30rpx;
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
	
	.back {
		width: 20px;
		height: 20px;
		padding-left: 40rpx;
	}
	
	.topbox {
		display: flex;
		align-items: center;
	}
	
	.zhanwei {
		width: 20px;
		height: 20px;
		padding-right: 40rpx;
	}
</style>
