<template>
	<view class="content">
		<view class="allthings">
			<view class="oneshoping">
				<image src="/static/yumi.JPG" class="shopimg"></image>
				<view class="alltext">
					<view class="onetitle">
						水果玉米10斤新鲜现摘
					</view>
					<view class="onecontent">
						糯玉米 真空包装新鲜甜玉米
					</view>
					<view class="oneprice">
						<span>￥</span>28.8
					</view>
					<view class="shopname">
						生鲜水果旗舰店铺
					</view>
				</view>
			</view>
			<view class="oneshoping">
				<image src="/static/yumi.JPG" class="shopimg"></image>
				<view class="alltext">
					<view class="onetitle">
						水果玉米10斤新鲜现摘
					</view>
					<view class="onecontent">
						糯玉米 真空包装新鲜甜玉米
					</view>
					<view class="oneprice">
						<span>￥</span>28.8
					</view>
					<view class="shopname">
						生鲜水果旗舰店铺
					</view>
				</view>
			</view>
			<view class="bottombox">
				<view class="textprice">
					合计：<span class="pricenum">￥20</span>
				</view>
				<u-button style="margin-left: 6rpx;width: 320rpx;" shape="circle" color="#ff5722" text="结算"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.allthings {
		margin-top: 20rpx;
		background-color: #fff;
		padding: 30rpx;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
	}


	.allimg {
		width: 40rpx;
		height: 40rpx;
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

	.bottombox {
		position: fixed;
		bottom: 100rpx;
		display: flex;
		right: 0;
		align-items: center;
	}
	
	.pricenum {
		color: red;
		font-weight: bold;
	}
</style>
