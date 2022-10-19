<template>
	<view class="content">
		<view class="title">
			{{itemdata.title}}
		</view>
		<view class="datetime">
			{{itemdata.datetime}}
		</view>
		<view class="picture">
			<image :src="itemdata.picture" mode=""></image>
		</view>
		<view class="subcontent">
			{{itemdata.content}}
		</view>
		<div class="price">
			<div class="contentprice">
				<span class="one">￥</span>
				<span class="two">5</span>
				<span class="three">无门槛消费红包</span>
				<u-button @click="btnprice" v-if="!isprice" class="four" size="mini" shape="circle" plain text="领取"></u-button>
				<u-button v-if="isprice" class="four" size="mini" shape="circle" plain text="已领取"></u-button>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			console.log(JSON.parse(option.item))
			this.itemdata = JSON.parse(option.item)
			this.userid = uni.getStorageSync('userId');
			if(this.itemdata.discount){
				this.getDiscount()
			}
		},
		data() {
			return {
				itemdata: '',
				userid: '',
				isprice: ''
			}
		},
		methods: {
			// 查询是否已经领取优惠券
			async getDiscount() {
				const res = await this.$http({
					url: 'shop/selectprice',
					method: 'POST',
					data: {
						id: this.userid
					}
				})
				if(res.data.data[0].discount){
					this.isprice = true
				}else {
					this.isprice = false
				}
			},
			// 领取优惠券
			async btnprice() {
				const res = await this.$http({
					url: 'shop/addprice',
					method: 'POST',
					data: {
						id: this.userid,
						discount: '5'
					}
				})
				console.log(res.data)
				if(res.data.code === 200) {
					this.isprice = true
				}else {
					this.isprice = false
				}
			}
		}
	}
</script>

<style scoped>
	.title {
		font-size: 17px;
		text-align: center;
		margin-top: 10px;
		margin-bottom: 15px;
	}

	.datetime {
		margin-left: 10px;
		font-size: 15px;
		color: #5d5d5d;
		margin-bottom: 10px;
	}

	image {
		width: 100%;
		border-radius: 15px;
	}

	.content {
		padding: 10px;
		font-size: 15px;
	}

	.subcontent {
		color: #656565;
		margin-top: 20px;
	}

	.price {
		margin-top: 20px;
	}

	.contentprice {
		position: relative;
		width: 270px;
		height: 95px;
		margin: auto;
		-webkit-mask: radial-gradient(circle at 10px, transparent 10px, red 0) -10px / 100% 30px;
		background: linear-gradient(45deg, orange, red);
	}

	.one {
		color: #fff;
		font-weight: bold;
		font-size: 25px;
		position: absolute;
		left: 20px;
		top: 32px;
	}

	.two {
		color: #fff;
		font-weight: bold;
		font-size: 40px;
		position: absolute;
		left: 45px;
		top: 18px;
	}

	.three {
		color: #fff;
		font-weight: bold;
		font-size: 15px;
		position: absolute;
		left: 140px;
		top: 18px;
	}

	.four {
		width: 90px;
		position: absolute;
		top: 47px;
		right: 32px;
	}
</style>
