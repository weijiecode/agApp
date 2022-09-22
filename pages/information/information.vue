<template>
	<view>
		<view class="content">
			<view @click="toinfo(item)" class="oneitem" v-for="item in inforationData" :key="item.id">
				<view class="leftimg">
					<image class="img" :src="item.picture" mode=""></image>
				</view>
				<view class="rightbox">
					<view class="onetitle">
						{{item.title}}
					</view>
					<view class="onedatetime">
						{{item.datetime}}
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
				// 咨询列表数据
				inforationData: []
			}
		},
		onShow() {
			this.getInformation()
		},
		methods: {
			// 获取咨询列表
			async getInformation() {
				const res = await this.$http({
					url: 'information/getinformation',
					method: 'GET'
				})
				if (res.data.code === 200) {
					this.inforationData = res.data.data
					console.log(this.inforationData)
				} else {
					console.log("获取咨询失败，请重试")
				}
			},
			// 点击详情页面
			toinfo(item) {
				console.log(item)
				const subitem = JSON.stringify(item)
				uni.navigateTo({
					url: "/pages/infoshow/infoshow?item="+subitem
				})
			}
		}
	}
</script>

<style scoped>
	.img {
		width: 150px;
		height: 100px;
	}

	.oneitem {
		display: flex;
	}

	.rightbox {
		position: relative;
		width: 100%;
	}

	.onedatetime {
		position: absolute;
		bottom: 20px;
		font-size: 14px;
		color: #939393;
		margin-left: 10px;
	}

	.onetitle {
		margin-left: 10px;
		font-size: 13px;
		margin-top: 10px;
		display: inline-block;
		height: 37px;
		overflow: hidden;
	}
</style>
