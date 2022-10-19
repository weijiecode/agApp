<template>
	<view class="content">
		<!-- 弹框推荐商品 -->
		<u-popup :show="show" closeable :round="10" mode="center" @close="popclose" @open="open">
			<view>
				<view class="boxshop">
					<p class="poptitle">{{subitem1.title}}</p>
					<view class="popimg">
						<image style="width: 280px;margin: 20px 0;height: 150px;border-radius: 8px;" :src="subitem1.photo" mode=""></image>
					</view>
					<u-button @click="todetails(subitem1)" shape="circle" style="width: 280px;" type="success"
						text="点击查看"></u-button>
				</view>
			</view>
		</u-popup>
		<view :style="{ height: iStatusBarHeight + 'px'}" class="stat"></view>
		<!-- 搜索框 -->
		<view class="topsearch" :style="{ marginTop: iStatusBarHeight + 'px'}">
			<view class="u-demo-block__content">
				<view class="u-page__tag-item">
					<u-search searchIconSize="45" height="75" @custom="search"></u-search>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<u-swiper @click="btnswiper" style="width: 90%;margin: 40rpx auto;border-radius: 5px" height="260" indicator
			indicatorMode="line" circular keyName="picture" :list="moreimg">
		</u-swiper>
		<!-- 推荐产品 -->
		<view class="recommend">
			<view class="oneitem">
				<image src="/static/tuijian.png" class="tuijian"></image>推荐农产品
			</view>
			<view class="twoitem">
				<image class="img1" @click="todetails(subitem1)" :src="subitem1.photo"></image>
				<image class="img2" @click="todetails(subitem2)" :src="subitem2.photo"></image>
			</view>
			<view class="twoitem">
				<image class="img3" @click="todetails(subitem3)" :src="subitem3.photo"></image>
				<image class="img4" @click="todetails(subitem4)" :src="subitem4.photo"></image>
			</view>
		</view>
		<!-- 总产品列表 -->
		<view class="allthings">
			<view class="allitem">
				<image src="/static/all.png" class="allimg"></image>全部农产品
			</view>
			<view class="oneshoping" @click="todetails(item)" v-for="item in shopDataList" :key="item.id"
				v-if="item.status =='1'">
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
				// 弹框显示
				show: false,
				// 状态栏高度
				iStatusBarHeight: 0,
				// 轮播图数据
				moreimg: [{
						content: "　本网讯  9月26日，全国达标合格农产品亮证行动推进会在浙江省杭州市举行，会上启动了全国达标合格农产品亮证行动。会议以“学法力行 践诺增信”为主题，进一步宣贯新修订的《农产品质量安全法》，统筹推进农产品“三品一标”。会议指出，承诺达标合格证制度是新修订的《农产品质量安全法》的一项重要制度创新，对农产品生产者开具、收购者收取保存并再次开具、批发市场查验承诺达标合格证做出了具体规定。要将亮证与普法结合，将法律宣贯和实施亮证行动一体推进，引导农产品生产经营者科学用药、规范开具、积极亮证。要强化工作指导，督促农产品生产企业、农民专业合作社应开尽开，创造条件鼓励支持农户开具承诺达标合格证。要创新开证、用证、查证形式，将承诺达标合格证开具、验证等纳入农安信用评定，让达标合格农产品更加可信赖，真正将达标合格农产品打造为普遍认可的农产品品牌。会议现场举行了《农产品质量安全法》普法宣讲员宣誓和达标合格农产品亮证签约，并向普法宣讲员颁发证书。农产品生产主体、收储运主体、集团采购、产地电商代表共同发起了亮证倡议。与会代表还现场考察了浙江省杭州市临安区达标合格农产品亮证应用情况。",
						datetime: "2022-09-28 00:12:26",
						picture: "../../static/lunbo1.jpeg",
						title: "全国名特优新农产品展播",
						discount: false
					},
					{
						content: "近日，国务院总理李克强在政府工作报告中指出——电商网购、在线服务等新业态在抗疫中发挥了重要作用，要继续出台支持政策，全面推进“互联网+”，打造数字经济新优势。政府工作报告指出，将继续推动消费回升，支持电商、快递进农村，拓展农村消费。6月1日，财政部办公厅、商务部办公厅、国务院扶贫办综合司联合发布《关于做好2020年电子商务进农村综合示范工作的通知》。《通知》指出，鼓励各地优先采取以奖代补、贷款贴息，结合先建后补、购买服务、直接补助等支持方式，合理加快资金进度，提高资金使用效益，通过中央财政资金引导带动社会资本，共同参与农村电子商务工作。电商已经成为产业扶贫和消费扶贫的重要平台。据商务部部长钟山介绍，2019年商务部会同有关部门推动电商扶贫实现了对国家级贫困县的全覆盖，当年全国贫困县网络零售额达到2392亿元，同比增长33%。自疫情发生以来，拼多多、京东、淘宝等电商平台陆续推出各项“助农”补贴和专题促销活动。",
						datetime: "2022-09-28 00:15:41",
						picture: "../../static/lunbo2.png",
						title: "《脱贫政策在线》",
						discount: false
					},
					{
						content: "为进一步贯彻落实稳经济促消费的各项政策措施，推出各项“助农”补贴和专题促销活动，本活动每人可领5元消费红包！",
						datetime: "2022-09-28 00:18:40",
						picture: "../../static/lunbo.jpg",
						title: "补贴领取须知",
						discount: true
					}
				],
				// 产品数据
				shopDataList: [],
				// 获取店铺名称
				shopNameList: [],
				// 推荐产品
				subitem1: {
					id: '',
					title: '',
					photo: ''
				},
				subitem2: {
					id: '',
					photo: ''
				},
				subitem3: {
					id: '',
					photo: ''
				},
				subitem4: {
					id: '',
					photo: ''
				}
			}
		},
		onLoad() {
			// 获取状态栏高度
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight
		},
		onShow() {
			console.log(uni.getStorageSync('show'))
			this.show = uni.getStorageSync('show')
			this.getShopNameData().then(() => {
				this.getShopData().then(() => {
					console.log(this.shopDataList)
					this.shopDataList.forEach((item, index) => {
						this.shopNameList.forEach((subitem, subindex) => {
							if (item.merchantid == subitem.id) {
								this.shopDataList[index].merchantid = subitem.shopname
							}
						})
					})
				}).then(() => {
					this.subitem1 = this.shopDataList[0]
					this.subitem2 = this.shopDataList[1]
					this.subitem3 = this.shopDataList[2]
					this.subitem4 = this.shopDataList[3]
					console.log(this.subitem1)
				})
			})
		},
		methods: {
			// 关闭弹框
			popclose() {
				this.show = false
				uni.setStorageSync('show', false);
			},
			// 搜索
			search(value) {
				console.log(value)
				uni.navigateTo({
					url: "/pages/search/search?value=" + value
				})
			},
			// 跳转到商品详情页
			async todetails(item) {
				this.show = false
				uni.setStorageSync('show', false);
				console.log(item)
				const res = await this.$http({
					url: 'shop/updateshopcount',
					method: 'POST',
					data: {
						id: item.id,
						count: item.count * 1 + 1
					}
				})
				console.log(res)
				uni.navigateTo({
					url: "/pages/details/details?id=" + item.id
				})
			},
			// 获取产品列表
			async getShopData() {
				const res = await this.$http({
					url: 'shop/admincommodity',
					method: 'POST'
				})
				if (res.data.code === 200) {
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
				if (res.data.code === 200) {
					this.shopNameList = res.data.data
				}
			},
			// 跳转轮播图详情
			btnswiper(index) {
				console.log(index)
				const subitem = JSON.stringify(this.moreimg[index])
				if(index == 2){
					uni.navigateTo({
						url: "/pages/infoshow/infoshow?item=" + subitem
					})
				}else {
					uni.navigateTo({
						url: "/pages/infoshow/infoshow?item=" + subitem
					})
				}
			}
		}
	}
</script>

<style scoped>
	.poptitle {
		color: #525452;
		font-size: 18px;
		font-weight: bold;
	}

	.boxshop {
		width: 300px;
		height: 300px;
		background-color: #efefef;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

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

	.content {
		background-color: #f7f7f7;
		height: 100%;
	}

	::v-deep .u-input--circle {
		background-color: #EEEEEE;
	}

	.recommend {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		margin: 0 auto;
	}

	.oneitem {
		font-weight: bold;
		color: #6C8E1E;
		display: flex;
		align-items: center;
	}

	.allitem {
		font-weight: bold;
		color: black;
		display: flex;
		align-items: center;
	}

	.allimg {
		width: 40rpx;
		height: 40rpx;
	}

	.tuijian {
		width: 50rpx;
		height: 50rpx;
	}

	.twoitem {
		margin-top: 12rpx;
		display: flex;
		width: 100%;
	}

	.img1 {
		width: 35%;
		height: 100px;
		border-radius: 5px;
	}

	.img2 {
		width: 64%;
		height: 100px;
		margin-left: 12rpx;
		border-radius: 5px;
	}

	.img4 {
		width: 35%;
		height: 100px;
		border-radius: 5px;
	}

	.img3 {
		width: 64%;
		height: 100px;
		margin-right: 12rpx;
		border-radius: 5px;
	}

	.recommend {
		background-color: #fff;
		padding: 30rpx;
		border-radius: 10px;
	}

	.allthings {
		margin-top: 20rpx;
		background-color: #fff;
		padding: 30rpx;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
	}

	.oneshoping {
		border-radius: 10px;
		box-shadow: 5px 5px 10px #efeded, -5px -5px 10px #f6f6f6;
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
</style>
