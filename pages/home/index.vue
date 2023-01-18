<template>
	<!-- :style="'padding-top:'+statusBarHeight+'px'" -->
	<view class="homePageBox" :style="(roleCodes==undefined||roleCodes=='')?'background-color:#fff;':''">
		<view :class="roleCodes==undefined||roleCodes==''?'background':''" v-if="roleCodes==undefined||roleCodes==''">
			<image src="@/static/image/homePageBg.png" class="image"></image>
		</view>
		<u-navbar class="00000000000" :is-back='false' :border-bottom='false' title-bold='true' :title-color='fontColor'
			:background='background' title="首页" v-else></u-navbar>
		<!-- 外勤办事员-首页 -->
		<field-clerk :fieldClerkByValue="fieldClerkByValue" :informationList='informationListWQBSY'
			v-if="roleCodes=='fieldClerk'"></field-clerk>
		<!-- 外勤主管-首页 -->
		<field-supervisor :fieldSupervisorByValue="fieldSupervisorByValue" :informationList='informationListWQZG'
			:fieldSupervisorMessageByValue='fieldSupervisorMessageByValue' v-if="roleCodes=='fieldSupervisor'">
		</field-supervisor>
		<!-- 业务主管-首页 -->
		<executive :executiveByValue='executiveByValue' :executiveByObj='executiveByObj' :informationList='informationList'
			:ZGhighSeasByValue='ZGhighSeasByValue' v-if="roleCodes=='accountExecutiveSupervisor'"></executive>
		<!-- 业务员-首页 -->
		<salesman :salesmanByValue='salesmanByValue' :salesmanByValueList='salesmanByValueList' :ywyInformationList='ywyInformationList'
			:highSeasByValue='highSeasByValue' v-if="roleCodes=='accountExecutive'"></salesman>
		<!-- boxx-首页 -->
		<boss :bossByValue='bossByValue' :bossDotList='bossDotList' v-if="roleCodes=='boss'||roleCodes=='bossManager'">
		</boss>
		<!-- 客户首页 -->
		<client v-if="roleCodes==undefined||roleCodes==''" :balance='balance' :clientList='clientList'
			:sysInfo='sysInfo' :menuInfo='menuInfo'></client>
		<u-tabbar v-model="current" :list="vuex_tabbar" :mid-button="false" style='position: absolute;
    bottom: 0px;'></u-tabbar>
	</view>
</template>

<script>
	import fieldClerk from '@/pages/home/fieldClerk/index.vue'; //外勤办事员-首页
	import fieldSupervisor from '@/pages/home/fieldSupervisor/index.vue'; //外勤主管-首页
	import executive from '@/pages/home/executive/index.vue'; //业务主管-首页
	import salesman from '@/pages/home/salesman/index.vue'; //业务员-首页
	import boss from '@/pages/home/boss/index.vue'; //boss-首页
	import client from '@/pages/home/client/index.vue'; //客户-首页
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			fieldClerk, //外勤办事员-首页
			fieldSupervisor, //外勤主管-首页
			executive, //业务主管-首页
			salesman, //业务员-首页
			boss, //boss-首页
			client, //客户首页
		},
		data() {
			return {
				sysInfo: {},
				menuInfo: {},
				statusBarHeight: 0, //状态栏的高度
				windowHeight: 0, //可使用窗口高度
				reload: true,
				loading: false,
				page: 1,
				pageSize: 10,
				tatol: 0,
				fontColor: '#000000',
				background: {
					backgroundColor: '#fff',
				},
				fieldClerkByValue: {}, // 外勤办事员-首页传参
				// fieldClerkByValueArray:[],//外勤办事员-首页传参-任务
				informationListWQBSY: [], //外勤办事员-循环播放
				fieldSupervisorByValue: {}, // 外勤主管-首页传参
				informationListWQZG: [], //外勤主管-循环播放
				fieldSupervisorMessageByValue: [], //// 外勤主管-首页消息条数传参
				executiveByValue: {}, // 业务主管-首页传参
				executiveByObj:{},//业务主管消息传参
				ZGhighSeasByValue: [], //业务主管-公海传参
				informationList: [], //业务主管循环播放
				salesmanByValue: {}, // 业务员-首页传参
				salesmanByValueList:{},//业务员--消息列表传参
				highSeasByValue: [], // 业务员-公海传参
				ywyInformationList: [], //业务員-循环播放
				bossByValue: {}, // boss-首页传参
				bossDotList: [], //boss-首页-list小点传参
				clientList: [], //客户首页-传参
				balance: 0, //客户首页-账户余额传参
				list: [],
				// roleCodes: this.$store.state.vuex_user.roleCodes[0] || null, //判断登录值
				roleCodes: '', //判断登录值
			}
		},
		onShow() {
			var roleCodes = this.$store.state.vuex_user.roleCodes; //登录角色值
			if (roleCodes != undefined && roleCodes.length > 0) {
				this.roleCodes = roleCodes[0]
			} else {
				this.roleCodes = ''
			}
			if (this.roleCodes == undefined) {
				this.fontColor = '#fff'
				this.background = {
					backgroundColor: 'transparent',
				}
			}
			// 
			this.keyword = ''
			let that = this;

			this.$nextTick(function() {
				if (that.reload) {
					this.page = 1
					this.pageSize = 10
					this.salesmanOrderFormByValue = []
					uni.setNavigationBarTitle({
						title: '待办事项'
					})
					that.getList()
					that.getPageInfo()
					this.loading = false;
					// that.reload = false
				} else {
					that.reload = true
				}
			})
			this.sysInfo = uni.getSystemInfoSync();
			this.menuInfo = uni.getMenuButtonBoundingClientRect();

		},
		computed: {
			...mapState(['vuex_tabbar'])
		},
		onPullDownRefresh() {
			this.getPageInfo();
		},
		methods: {
			getList() {
				// console.info(this.$store.state.vuex_user.roleCodes[0])||null
				// var roleCodes = this.$store.state.vuex_user.roleCodes[0]||null
				if (this.$store.state.vuex_user != "") {
					this.roleCodes = this.$store.state.vuex_user.roleCodes[0] || null
				} else {
					this.fieldClerkByValue = {} // 外勤办事员-首页传参
					// this.fieldClerkByValueArray=[]//外勤办事员-首页传参-任务
					this.informationListWQBSY = [] //外勤办事员-循环播放
					this.fieldSupervisorByValue = {} // 外勤主管-首页传参
					this.informationListWQZG = [] //外勤主管-循环播放
					this.fieldSupervisorMessageByValue = [] //// 外勤主管-首页消息条数传参
					this.executiveByValue = {} // 业务主管-首页传参
					this.executiveByObj={}//业务主管-消息传参
					this.informationList = [] //业务主管-循环播放
					this.ZGhighSeasByValue = [] //业务主管-公海传参
					this.salesmanByValue = {} // 业务员-首页传参
					this.salesmanByValueList={},//业务员-消息列表传参
					this.highSeasByValue = [] // 业务员-公海传参
					this.ywyInformationList = [] //業務員-循环播放
					this.bossByValue = {} // boss-首页传参
					this.bossDotList = {} // boss-首页-list小点传参
					this.clientList = [] //客户--订单列表
					this.balance = 0 //客户账户余额
					this.sysInfo = {}
					this.menuInfo = {}
				}
			},
			getPageInfo() {
				if (this.$store.state.vuex_user != "") {
					var roleCodes = this.$store.state.vuex_user.roleCodes[0]
				}

				if (roleCodes == 'fieldClerk') {
					// 外勤办事员
					this.$u.post('/fieldClerk/homePage').then(response => {
						var taskProgress = {}
						if (response.taskProgress != []) {
							taskProgress = response.taskProgress.forEach((item, index) => {
								var str = 12.345
								item.percentage = parseFloat(item.percentage).toFixed(0)
								if (item.percentage == '') {
									item.percentage = 0
									return item.percentage
								}
							})
						}

						this.fieldClerkByValue = response

						this.informationListWQBSY = [response.taskProgress[0].companyName + response.taskProgress[
							0].projectName + '的任务进度为' + (response.taskProgress[0].percentage || 0) + '%']
						// this.$u.post('/fieldClerk/findTaskProgressPage').then(response => {
						// 	this.fieldClerkByValueArray = response.rows
						// 	uni.stopPullDownRefresh()

						// })
					})
				} else if (roleCodes == 'fieldSupervisor') {
					// 外勤主管
					this.$u.post('/fieldSupervisor/homePage').then(resp => {
						this.fieldSupervisorByValue = resp

					})
					this.$u.post('/crmMessageReceiving/queryMongoDBListPage').then(resp => {
						this.fieldSupervisorMessageByValue = resp
						this.informationListWQZG = [resp.rows[0].msg || '']
						uni.stopPullDownRefresh()
					})
				} else if (roleCodes == 'accountExecutiveSupervisor') {
					// 业务主管 
					// 业务主管  待审核接口后端暂时没有给
					this.$u.post('/salespersonSupervisor/homePage').then(resp => {
						this.executiveByValue = resp
						// this.informationList = [resp.followUp[0].companyName + '客户跟进提醒!']
						// this.$u.post('/messageReceiving/queryMongoDBHighSeasListPage').then(resp => {
						// 	this.ZGhighSeasByValue = resp.rows
						// })
						})
					let omsg = this.$u.get('/messageReceiving/findAbnormalOrderMessage'); //异常订单提醒
					let fmsg = this.$u.get('/messageReceiving/findFollowMessage'); //客户跟进提醒
					let emsg = this.$u.get('/messageReceiving/findAuditFailureMessage'); //审核失败提醒
					let dmsg = this.$u.get('/messageReceiving/findRenewCustomerMessage'); //续签客户提醒
					Promise.all([omsg, fmsg, emsg, dmsg]).then(result => {
						let executiveByObj = {};
						let informationList=[]
						result.forEach((resp, index) => {
							switch (index) {
								case 0:
									executiveByObj= {
										abnormalOrderNumber: resp.rest.totalRows||0,
										abnormalOrder: resp.rest.rows||0
									}
									break;
								case 1:
									executiveByObj.followNumber = resp.rest.totalRows||0
									executiveByObj.followUp = resp.rest.rows||0
									informationList=[resp.rest.rows[0]? resp.rest.rows[0].map.companyName + '客户跟进提醒！' :'暂无消息提醒']
									break;
								case 2:
									executiveByObj.auditFailureNumber = resp.rest.totalRows||0
									executiveByObj.auditFailure = resp.rest.rows||0
									break;
								case 3:
									executiveByObj.renewCustomerNumber = resp.rest.totalRows||0
									executiveByObj.renewCustomer = resp.rest.rows||0
									break;
							}
						})
						this.informationList=informationList
						this.executiveByObj = executiveByObj || {};
					}).catch(err => {
					
					
					
					// 业务员-公海
					this.$u.post('/messageReceiving/queryMongoDBHighSeasListPage').then(resp => {
						this.ZGhighSeasByValue = resp.rows
						console.info('业务员-公海')
						console.info(resp)
						// console.info(this.salesmanByValueList)
					})
					
						uni.stopPullDownRefresh()
					})
				} else if (roleCodes == 'accountExecutive') {
					// 业务员
					// .then(resp => {
					// 	console.info('客户跟进提醒')
					// 	console.info(resp.rest)
					// 	this.salesmanByValue.followUp=resp.rest.rows
					// })

					// 
					this.$u.post('/salesman/homePage').then(resp => {
						this.salesmanByValue = resp
					// 	this.ywyInformationList = [resp.followUp[0].companyName + '客户跟进提醒！']
					// 	this.ywyInformationList = [resp.followUp[0] ? resp.followUp[0].companyName + '客户跟进提醒！' :
					// 		'暂无消息提醒'
					// 	]
					})
					let omsg = this.$u.get('/messageReceiving/findAbnormalOrderMessage'); //异常订单提醒
					let fmsg = this.$u.get('/messageReceiving/findFollowMessage'); //客户跟进提醒
					let emsg = this.$u.get('/messageReceiving/findAuditFailureMessage'); //审核失败提醒
					let dmsg = this.$u.get('/messageReceiving/findRenewCustomerMessage'); //续签客户提醒
					console.info('业务元请求')
					console.info('业务元请求')
					Promise.all([omsg, fmsg, emsg, dmsg]).then(result => {
						console.info('业务元请求--后')
						console.info(result)
						let salesmanByValueList = {};
						let ywyInformationList=[]
						result.forEach((resp, index) => {
							switch (index) {
								case 0:
									salesmanByValueList= {
										abnormalOrderNumber: resp.rest.totalRows||0,
										abnormalOrder: resp.rest.rows||0
									}
									break;
								case 1:
									salesmanByValueList.followNumber = resp.rest.totalRows||0
									salesmanByValueList.followUp = resp.rest.rows||0
									ywyInformationList=[resp.rest.rows[0]? resp.rest.rows[0].map.companyName + '客户跟进提醒！' :'暂无消息提醒']
									break;
								case 2:
									salesmanByValueList.auditFailureNumber = resp.rest.totalRows||0
									salesmanByValueList.auditFailure = resp.rest.rows||0
									break;
								case 3:
									salesmanByValueList.renewCustomerNumber = resp.rest.totalRows||0
									salesmanByValueList.renewCustomer = resp.rest.rows||0
									break;
							}
						})
						this.ywyInformationList=ywyInformationList
						this.salesmanByValueList = salesmanByValueList || {};
					}).catch(err => {

					})
					
					// 业务员-公海
					this.$u.post('/messageReceiving/queryMongoDBHighSeasListPage').then(resp => {
						this.highSeasByValue = resp.rows
						console.info('业务员-公海')
						console.info(resp)
						// console.info(this.salesmanByValueList)
					})
					
					// uni.stopPullDownRefresh()
					// this.highSeasByValue=highSeasByValue
				} else if (roleCodes == 'boss' || roleCodes == 'bossManager') {
					// boss
					this.$u.post('/boss/homePage').then(resp => {
						this.bossByValue = resp;
						this.bossDotList = this.group(resp.agentList, 3);
						uni.stopPullDownRefresh()
					})
				} else {
					//客户首页
					if (this.clientList.length == 0) {
						this.page = 1
					} else {
						this.page = this.clientList.length == this.tatol ? this.page : ++this.page;
					}
					let data = {
						page: this.page,
						pageSize: 10
					}
					var params = Object.keys(data).map(function(key) {
						// body...
						return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
					}).join("&");
					this.$u.post('/client/homePage?1=1&' + params, {
						companyId: uni.getStorageSync('companyData').id
					}).then(resp => {
						this.tatol = resp.totalRows
						this.clientList = (this.page == 1 ? [] : this.clientList)
							.concat(resp.rows)
						if (typeof cb == 'function') {
							cb()
						}
					}).catch(resp => {
						this.loading = false;
						setTimeout(function() {
							uni.showToast({
								title: '请先完成登录',
								icon: 'none',
							})
							// this.getPageInfo()
						});
					})
					// 获取余额
					this.$u.post('/client/balance', {
						companyId: uni.getStorageSync('companyData').id
					}).then(resp => {
						console.info('获取余额')
						console.info(resp)
						this.balance = resp
					})
				}
			},
			group(array, subGroupLength) {
				let index = 0;
				let newArray = [];
				while (index < array.length) {
					newArray.push(array.slice(index, index += subGroupLength));
				}
				return newArray;
			}

		},
		// onReachBottom() {
		// 	this.getPageInfo()
		// }
		onReachBottom() {
			let that = this;
			let loading = this.loading;
			let page = this.page || 1;
			let pageSize = this.pageSize || 10;
			let tatol = this.tatol || 0;
			if (!loading) {
				// that.loading = true;
				if (tatol / pageSize > page) {
					this.getPageInfo(function() {
						that.loading = false;
						that.page = page + 1;
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.background {
		width: 100%;
		height: auto;
		// background: url(../../static/image/homePageBg.png) no-repeat;
		// background-image: url(../../static/image/homePageBg.png) ;
		// background-repeat-y: no-repeat;
		// background-size: contain;
		background-color: #FFFFFF !important;
		z-index: 3;
		position: fixed;
		top: 0px;

		.image {
			width: 100%;
		}
	}

	.homePageBox {
		background-color: #F5F6F7;
		// height: 100vh;
		position: relative;
		// padding-bottom: 80px;

		.u-notice-bar {
			padding: 0 9px !important;
			height: 31px;
			line-height: 31px;
		}
	}
</style>
