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
		onLoad(option){
			console.log(JSON.parse(option.item))
			this.itemdata = JSON.parse(option.item)
		},
		data() {
			return {
				itemdata: ''
			}
		},
		methods: {
		}
	}
</script>

<style scoped>
.title {
	font-size: 18px;
	text-align: center;
}

.datetime {
	margin-left: 10px;
	font-size: 15px;
	color: #5d5d5d;
}

image {
	width: 100%;
}

.content{
	padding: 10px;
	font-size: 15px;
}

.subcontent {
	color: #656565;
}
</style>
