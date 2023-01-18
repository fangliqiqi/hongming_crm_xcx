<template>
	<view class="missionBox">
		<!-- 外勤办事员---任务 -->
		<field-clerk-mission :fieldClerkMissionArr='fieldClerkMissionArr' @search="getPageInfo"
			@send="(val)=>{keyword =val;page=0;getPageInfo()}" v-if="roleCodes=='fieldClerk'" @reload="reloadFun"
			:keyword='keyword'>
		</field-clerk-mission>
		<!-- 外勤主管---任务 -->
		<!-- <field-clerk-task-progress :fieldSupervisorMissionArr='fieldSupervisorMissionArr' v-if="roleCodes=='fieldSupervisor'"></field-clerk-task-progress> -->
		<view class="taskSum" v-if="roleCodes=='fieldSupervisor'">
			<!-- 任务总数 -->
			<picker mode="date" :value="date" fields="year" :start="startDate" :end="endDate" @change="dateChange">
				<view class="select">
					<view class="select_year">
						<text class="font">{{year}}年</text>
						<view class="icon"></view>
					</view>
				</view>
			</picker>
			<view class="map">
				<view class="map_title">
					任务总数
				</view>
				<view style='width: 100%;height: 540px;'>
					<!-- <uni-ec-canvas class="uni-ec-canvas" id="line-chart" ref="canvas" canvas-id="lazy-load-chart" 
						:ec="ec">
					</uni-ec-canvas> -->
					<uni-ec-canvas class="uni-ec-canvas" id="line-chart" ref="canvas" canvas-id="lazy-load-chart"
						:ec="ec"></uni-ec-canvas>
				</view>
			</view>
		</view>
		<!-- 任务主管结束 -->
		<!-- 客户充值 -->
		<client-voucher-center v-if="roleCodes==''||roleCodes==undefined" class="clientVoucherCenter" :moneyS='moneyS'
			:crmOpenId='crmOpenId'></client-voucher-center>
		<u-tabbar v-model="current" :list="vuex_tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	import uniEcCanvas from '@/uni-ec-canvas/uni-ec-canvas.vue';
	import * as echarts from '@/uni-ec-canvas/echarts';
	import fieldClerkMission from '@/pages/missionBox/fieldClerk/taskNumber/taskNumber.vue'; //外勤办事员---任务
	import clientVoucherCenter from '@/pages/mine/voucherCenter/voucherCenter.vue'; //客户---充值
	// import fieldClerkMission from '@/pages/missionBox/fieldClerk/task/task.vue'; //外勤办事员---任务
	// import fieldSupervisorMission from '@/pages/missionBox/fieldSupervisor/taskSum/taskSum.vue';//外勤主管---任务
	import {
		mapState
	} from 'vuex';
	export default {
		name: 'missionBox',
		components: {
			uniEcCanvas,
			fieldClerkMission, //外勤办事员---任务
			// fieldSupervisorMission,//外勤主管---任务
			clientVoucherCenter, //客户充值
		},
		data() {
			return {
				crmOpenId: '',
				reload: true,
				loading: false,
				page: 1,
				pageSize: 10,
				tatol: 0,
				keyword: '',
				list: [],
				grabble: '', //搜索
				roleCodes: null, //判断登录值
				fieldClerkMissionArr: [], //外勤办事员---任务传值
				fieldSupervisorMissionArr: [], //外勤主管---任务传值
				moneyS:0,//客户充值金额
				date: "",
				year: "",

				ec: {
					lazyLoad: true,
					option: {
						color: ['#B7CFF9'],
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效  
								type: 'line' // 默认为直线，可选为：'line' | 'shadow'  
							}
						},
						grid: {
							left: '3%',
							right: '10%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
								type: 'value',
								position: 'top',
								splitLine: {
									lineStyle: {
										type: 'dashed'
									}
								},
								data: [0, 250, 500, 750, 1000, '月任务数(个)'],
								axisTick: {
									alignWithLabel: true
								},
								axisLabel: {
									textStyle: {
										color: '#999'
									}
								},
								axisTick: {
									show: false
								},
								axisLine: {
									show: false
								},
								boundaryGap: [0, '30%'],
							}

						],
						yAxis: [{
								boundaryGap: [0, '30%'],
								type: 'category',
								data: ['12月', '11月', '10月', '09月', '08月', '07月', '06月', '05月', '04月', '03月', '02月',
									'01月'
								],
								axisLabel: {
									textStyle: {
										color: '#999'
									},
								},
								axisTick: {
									show: false,

								},
								axisLine: {
									show: false
								},
							}
							// }  
						],

						series: [

							{
								type: 'bar',
								itemStyle: {
									barBorderColor: 'rgba(0,0,0,0)',
									color: 'rgba(0,0,0,0)'
								},
								emphasis: {
									itemStyle: {
										barBorderColor: 'rgba(0,0,0,0)',
										color: 'rgba(0,0,0,0)'
									}
								},
							},
							{
								name: '直接访问',
								type: 'bar',
								// barWidth: '60%', 
								label: {
									show: true,
									position: 'right'
								},
								data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
							},

						]
					}

				}

			}
		},

		onShow() {
			console.info('回来')
			console.info(this.moneyS)
			this.moneyS+=1
			let pages = getCurrentPages();
			this.grabble = ''
			this.year = new Date().getFullYear()
			// --
			this.keyword = ''
			let that = this;
			var roleCodes = this.$store.state.vuex_user.roleCodes[0]
			if (roleCodes == 'fieldSupervisor') {
				that.getList()
				that.getPageInfo()
			} else {
				this.$nextTick(function() {
					if (that.reload) {
						that.page = 1
						that.pageSize = 10
						that.fieldClerkMissionArr = []
						that.getList()
						that.getPageInfo()

						that.loading = false;
					} else {
						that.reload = true
					}
				})
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			...mapState(['vuex_tabbar'])
		},
		methods: {
			reloadFun(val) {
				this.reload = val
			},
			// 选择日期
			dateChange(e) {
				this.year = e.target.value;
				var fieldSupervisorMissionArr = []
				this.$u.post('/fieldSupervisor/findTaskGraphics', {
					year: this.year
				}).then(resp => {
					resp = resp.reverse()
					resp.forEach((item, index) => {
						fieldSupervisorMissionArr.push(item.data)
					})
					this.ec.option.series[1].data = fieldSupervisorMissionArr;
				})
			},
			// 获取年月日信息
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year;
				}
				return year
			},
			previousPage() {
				uni.navigateBack()
			},
			getList() {
				// console.info(this.$store.state.vuex_user.roleCodes[0])
				// var roleCodes = this.$store.state.vuex_user.roleCodes[0]
				if (this.$store.state.vuex_user != '') {
					// this.$store.state.vuex_user.roleCodes[0]
					this.roleCodes = this.$store.state.vuex_user.roleCodes[0]
				} else {
					this.fieldClerkMissionArr = [] //外勤办事员---任务传值
					this.fieldSupervisorMissionArr = [] //外勤主管---任务传值
				}
				var roleCodes = this.roleCodes
				if (roleCodes == 'fieldClerk') {
					this.list = [{
							// pagePath: "/pages/fieldClerk/homePage/homePage",
							pagePath: "/pages/home/index",
							iconPath: "/static/image/unHomePage.png",
							selectedIconPath: "/static/image/homePage.png",
							text: '首页外勤',
							isDot: false,
							customIcon: false,
						}, {
							pagePath: "/pages/messageBox/messageBox",
							iconPath: "/static/image/unTaskProgress.png",
							selectedIconPath: "/static/image/taskProgress.png",
							text: '任务进度提醒',
							isDot: false,
							customIcon: false,
						},
						{
							pagePath: "/pages/missionBox/missionBox",
							iconPath: "/static/image/unTask.png",
							selectedIconPath: "/static/image/task.png",
							text: '任务',
							isDot: false,
							customIcon: false,
						},
						{
							pagePath: "/pages/mine/mine",
							iconPath: "/static/image/unMine.png",
							selectedIconPath: "/static/image/mine.png",
							text: '我的',
							isDot: false,
							customIcon: false,
						}
					]
				} else if (roleCodes == 'fieldSupervisor') {
					this.list = [{
							pagePath: "/pages/home/index",
							iconPath: "/static/image/unHomePage.png",
							selectedIconPath: "/static/image/homePage.png",
							text: '首页',
							isDot: false,
							customIcon: false,
						}, {
							pagePath: "/pages/messageBox/messageBox",
							iconPath: "/static/image/unInformation.png",
							selectedIconPath: "/static/image/information.png",
							text: '消息提醒',
							isDot: false,
							customIcon: false,
						},
						{
							pagePath: "/pages/missionBox/missionBox",
							iconPath: "/static/image/unTask.png",
							selectedIconPath: "/static/image/task.png",
							text: '任务',
							isDot: false,
							customIcon: false,
						},
						{
							pagePath: "/pages/mine/mine",
							iconPath: "/static/image/unMine.png",
							selectedIconPath: "/static/image/mine.png",
							text: '我的',
							isDot: false,
							customIcon: false,
						}
					]
				}
			},
			getPageInfo(val) {
				let keyword = this.keyword || '';
				if (this.$store.state.vuex_user != '') {
					var roleCodes = this.$store.state.vuex_user.roleCodes[0]
				}
				if (roleCodes == 'fieldClerk') {
					// 外勤办事员
					if (this.fieldClerkMissionArr.length == 0) {
						this.page = 1
					} else {
						this.page = this.fieldClerkMissionArr.length == this.tatol ? this.page : ++this.page;
					}
					let data = {
						page: this.page,
						pageSize: 10
					}
					var params = Object.keys(data).map(function(key) {
						// body...
						return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
					}).join("&");
					if (keyword != '') {
						this.$u.post('/fieldClerk/findTaskProgressPage', {
							blurryKeyword: keyword
						}).then(resp => {
							this.fieldClerkMissionArr = resp.rows;
						})
					} else {
						this.$u.post('/fieldClerk/findTaskProgressPage?1=1&' + params).then(response => {
							response.rows = response.rows.map((item, index) => {
								item.percentage = parseFloat(item.percentage).toFixed(0)
								return item
							})
							this.tatol = response.totalRows
							this.fieldClerkMissionArr = (this.page == 1 ? [] : this.fieldClerkMissionArr)
								.concat(response.rows)
							if (typeof cb == 'function') {
								cb()
							}
						}).catch(() => {
							this.loading = false;
						})
					}

				} else if (roleCodes == 'fieldSupervisor') {
					// 外勤主管
					var fieldSupervisorMissionArr = []
					this.$u.post('/fieldSupervisor/findTaskGraphics').then(resp => {
						resp = resp.reverse()
						this.fieldSupervisorMissionArr = resp
						resp.forEach((item, index) => {
							fieldSupervisorMissionArr.push(item.data)

						})
						this.ec.option.series[1].data = fieldSupervisorMissionArr
					})
				} else {
					uni.setNavigationBarTitle({
					            　　title:'充值金额'
					            })
					var tath = this
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							if(uni.getStorageSync('crmOpenId')==''||uni.getStorageSync('crmOpenId')==undefined){
								tath.$u.post('/client/getOpenId', {
									code: loginRes.code
								}).then(resp => {
									tath.crmOpenId = resp
									console.log('授权--成功');
									console.log(tath.crmOpenId);
									uni.setStorageSync('crmOpenId', resp);
									// uni.setStorage({
									// 	key: 'openId',
									// 	data: resp
									// })
								})
							}
							
						}
					});
					// console.log('授权111111');
					// console.log(tath.clientVoucherCenterCode);
				}
			}
		},
		onReachBottom() {
			let that = this;
			let loading = this.loading;
			let page = this.page || 1;
			let pageSize = this.pageSize || 10;
			let tatol = this.tatol || 0;
			if (!loading) {
				that.loading = true;
				if (tatol / pageSize > page) {
					this.getPageInfo(function() {
						that.loading = false;
						that.page = page + 1;
					})
				}
			}
		},
		onReady() {
			let that = this;
			this.$nextTick(function() {
				try {
					that.$refs['canvas'].init()
				} catch (e) {
					//TODO handle the exception
				}
				setTimeout(function() {
					console.info(that)
				}, 3000)
			})
		},
	}
</script>

<style lang="scss">
	// .clientVoucherCenter{
	// 	height: 100vh;
	// }
	.missionBox {
		background-color: #f5f6f7;
		min-height: 100vh;
		background-color: #fff;

		.color {
			background: #2DD199 !important;
		}

		.title {
			height: 65px;
			background-color: #FFFFFF;
			padding-left: 30px;
			padding-right: 30px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.title_title {
				display: flex;
				flex-direction: row;
				align-items: center;

				.name {
					font-size: 18;
					font-family: PingFang SC;
					font-weight: bold;
					color: #3A3B3D;
					margin-left: 10px;
				}
			}

			.remind {
				display: flex;
				flex-direction: row;
				align-items: center;

				.font {
					font-size: 13px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #A1A2A6;
					margin-left: 5px;
				}
			}
		}

	}

	.taskSum {
		border-top: 1px solid #EEEEEE;

		.select {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			padding-top: 12px;
			padding-left: 16px;
			padding-right: 16px;
			padding-bottom: 12px;
			background-color: #FFFFFF;
			margin-bottom: 10px;

			.select_year {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				.font {
					font-size: 18px;
					font-family: DINPro;
					font-weight: 500;
					color: #3A3B3D;
					margin-right: 10px;
				}

				.icon {
					width: 0;
					height: 0;
					border-left: 5px solid transparent;
					border-right: 5px solid transparent;
					border-top: 6px solid #D2D3D6;
				}
			}

			.select_month {
				margin-left: 30px;
			}
		}

		.map {
			padding-left: 16px;
			padding-right: 16px;
			padding-top: 28.5px;
			background-color: #FFFFFF;

			.map_title {
				font-size: 18px;
				font-family: PingFang SC;
				font-weight: bold;
				color: #303133;
				display: flex;
				align-items: center;

				// padding-left: 11px;
				&:before {
					content: '';
					display: inline-block;
					margin-right: 7.5px;
					width: 3.5px;
					height: 16px;
					background-color: #3978E7;
				}
			}
		}
	}
</style>
