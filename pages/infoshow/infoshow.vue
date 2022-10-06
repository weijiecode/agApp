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
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			console.log(JSON.parse(option.item))
			this.itemdata = JSON.parse(option.item)
		},
		data() {
			return {
				itemdata: ''
			}
		},
		methods: {}
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
</style>
