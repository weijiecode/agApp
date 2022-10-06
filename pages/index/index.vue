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
						title: "全国达标合格农产品亮证行动在浙江杭州启动"
					},
					{
						content: "据中国奶业协会副会长兼秘书长刘亚清介绍，2021年中国奶业协会战略发展工作委员会，充分发挥思想库、智囊团的作用，从行业重点难点问题着手，着力开展前瞻性、针对性、储备性的战略研究，通过深刻总结发展成就和经验，科学研判发展环境和形势，系统谋划发展战略和举措，以及对奶业全产业链进行深入研究，形成了《中国奶业战略发展重点课题研究报告2021》，报告收录了中国奶业协会战略发展工作委员会和中国奶业协会其他专业委员会以及中国奶业协会副会长单位、中国奶业20强与观察员企业、行业专家学者撰写的《中国奶业奋进2025》，农业农村部食物与营养发展研究所所长王加启团队牵头撰写的《中国奶业扩大内需、提升乳品消费战略研究报告》，国家奶牛产业技术体系首席科学家李胜利团队牵头撰写的《中国奶牛养殖业发展现状、问题及解决策略研究报告》，伊利集团牵头撰写的《中国奶业企业国际化经营与质量安全体系建设研究报告》，蒙牛集团牵头撰写的《完善中国奶业产业链供应链的保障机制研究报告》，光明乳业牵头撰写的《创新驱动提升乳制品增品种、提品质、创品牌的“三品”战略 研究报告》，现代牧业牵头撰写的《如何打造农牧循环的生态型奶牛养殖模式研究报告》，7篇课题研究成果为奶业振兴发展和更好应对复杂多变的国内外环境形势，提供了广阔思路和战略方案。 刘亚清表示，“ 十四五” 是中国奶业实现新的更大发展的关键时期， 中国奶业协会战略发展工作委员会将紧扣《 中国奶业奋进2025》， 围绕制约奶业发展的瓶颈， 重点在企业资产重组、 金融资本运作、 奶源保障和消费升级等方面深度策划， 破题助力。 一是引领乳品新型消费品质升级， 推进“ 互联网 +”移动支付乳品营销新业态、 新模式， 促进网上线下双向深度融合， 推动乳品新型消费扩容提质， 激发消费内生活力； 拓展乳制品消费种类， 引导“ 营养指导消费、 消费引导生产” 调控理念， 统筹液态乳品、 干乳制品和功能乳品， 提升奶酪等高附加值产品的占比， 实现牛奶的精细化和最大化利用， 为奶业发展开拓新动能。 二是拓展奶业企业投资融资服务， 引导企业通过资产重组、 兼并收购、 强强联合等方式， 形成以市场为导向的合理经营规模， 培育规模企业加快集团化、 集约化进程； 引入资本运作模式， 为企业的投融资提供项目定位、 可行性分析和投融资策划等咨询服务， 链接金融机构、 风险投资、 信用担保， 顶层构建投融资机制， 为企业创新创造搭建资金服务平台。 三是超前策划奶源总量安全保障， 着眼扩繁增量， 保护优良遗传物质和良种牛源， 运用产学研一体化模式， 加速改良和扩繁进程， 为奶业振兴做出奶源安全的战略储备。 四是推动中国奶业人才培养战略， 围绕奶源基地建设、 乳制品加工流通、 乳品质量安全以及消费引导等方面， 突出“ 人” 的要素， 发挥“ 才” 的助力， 在实用人才培养上率先起步； 树立全球视野， 对接现代技术和人才需求的战略储备， 构建全球先进管理和技术人才“ 引入内化” 机制， 在管理人才的培养上同步跟进； 以产业数字化为切入点， 构建战略人才孵化器， 在高端人才培养上创造环境。",
						datetime: "2022-09-28 00:15:41",
						picture: "../../static/lunbo2.jpeg",
						title: "《中国奶业战略发展重点课题研究报告2021》正式发布"
					},
					{
						content: "一.产品介绍玉门枸杞，甘肃省酒泉市玉门市特产，全国农产品地理标志。玉门地处枸杞种植黄金带，因光照时间长，昼夜温差大，降雨量小，使枸杞生长周期长，营养成分多，保证了枸杞正常采摘和晾晒，减少了树体及鲜果的病虫害，造就了玉门枸杞色泽鲜红、口味甘甜、粒大皮薄、肉厚汁多的优良品质。二.自然生态环境和人文历史因素2.1地貌土壤情况玉门市地处河西走廊西部，祁连山北麓。玉门地貌分为祁连山地、走廊平原和马鬃山地三部分。地势南、北高，中部低，平均海拔2300米。产区地势平坦，海拔适宜。土壤绝大部分是灌漠土，质地以沙壤和轻壤为主，PH值7～8.5之间，土壤肥沃（表层有机质含量为15.5g/kg）土层深厚，为玉门枸杞的生长提供良好的生存环境，使其枝条粗壮，根系发达，因而孕育了品质优质的玉门枸杞。2.2气候情况玉门枸杞产区属典型的大陆性中温带干旱气候，日照时间长（年日照时数为3200h左右）；辐射强（年总辐射量153.84千卡/㎝2）；温差大（年平均气温日较差16.1℃）；有效积温长（2400℃～3298℃）；无霜期长（119～151天）；年平均降水量为66.5mm，年蒸发量2653.2mm。该气候有利于枸杞枝叶的生长，枝条粗壮；有利于光合作用，果实营养物质积累多，因降雨量小，降低了枸杞受有害生物侵染的几率，所产枸杞果粒大，产量高，品质好。2.3水文情况玉门境内主要有白杨河、疏勒河和小昌马河等河流，水资源较为丰富，是枸杞的主要灌溉用水来源。这些河流均发源于祁连山，富含锶、钾、钠、钙、镁、锌等多种矿物质和微量元素，水质清澈优良。同时，种植区域无化工等污染性工矿企业，无“三废”排放和空气污染，也没有重金属污染历史，使得玉门枸杞绿色无污染，营养丰富。三.地域范围玉门枸杞农产品地理标志地域保护范围包括甘肃省玉门市行政所辖区域内的玉门镇、赤金镇、花海镇、柳河镇、黄闸湾镇、下西号镇，昌马乡、清泉乡、柳湖乡、小金湾东乡族乡、独山子东乡族乡、六墩乡、黄花农场、饮马农场12个乡镇和2个团场，共59个行政村2个农垦团场。年生产规模1.487万公顷，年总产量2.403万吨。",
						datetime: "2022-09-28 00:18:40",
						picture: "../../static/lunbo3.jpeg",
						title: "玉门枸杞"
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
				uni.navigateTo({
					url: "/pages/infoshow/infoshow?item=" + subitem
				})
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
