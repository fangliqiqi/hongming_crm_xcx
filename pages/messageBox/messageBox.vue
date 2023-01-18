<template>
	<view class='messageBox'>
		<!-- 外勤主管消息提醒 -->
		<field-supervisor-message v-if="roleCodes=='fieldSupervisor'"
			:fieldSupervisorMessageByValue='fieldSupervisorMessageByValue'></field-supervisor-message>
		<!-- 外勤办事员任务进度提醒 -->
		<field-clerk-task-progress v-if="roleCodes=='fieldClerk'" :fieldClerkByValueArray='fieldClerkByValueArray'>
		</field-clerk-task-progress>
		<!-- 业务员--订单 -->
		<salesman-order-form :salesmanOrderFormByValue='salesmanOrderFormByValue' :keyword='keyword'
			@send="(val)=>{keyword =val;page=0;getPageInfo()}" v-if="roleCodes=='accountExecutive'" @reload="reloadFun">
		</salesman-order-form>
		<!-- boss--待办事项 -->
		<boss-commission-matter v-if="roleCodes=='boss'||roleCodes=='bossManager'"
			:bossCommissionMatterByValue='bossCommissionMatterByValue' :bossByValue='bossByValue'>
		</boss-commission-matter>
		<u-tabbar v-model="current" :list="vuex_tabbar" :mid-button="false"></u-tabbar>
	</view>
</template>
<script>
	import fieldSupervisorMessage from '@/pages/messageBox/fieldSupervisor/message/message.vue'; //外勤主管消息提醒
	// import fieldClerkTaskProgress from '@/pages/messageBox/fieldClerk/taskProgress/taskProgress.vue';//外勤办事员任务进度提醒
	// import fieldClerkTaskProgress from '@/pageWq/highSeas/highSeas.vue';//外勤办事员任务进度提醒
	import fieldClerkTaskProgress from '@/pages/messageBox/fieldClerkHighSeas/fieldClerkHighSeas.vue'; //外勤办事员任务进度提醒
	// /pageWq/fieldClerk/taskNumber/taskNumber
	// import fieldClerkTaskProgress from '@/pages/messageBox/taskNumber/taskNumber';//外勤办事员任务进度提醒
	import salesmanOrderForm from '@/pages/messageBox/salesman/orderForm.vue'; //业务员--订单 
	import bossCommissionMatter from '@/pages/messageBox/boss/commissionMatter.vue'; //boss--待办事项
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			fieldSupervisorMessage, //外勤主管消息提醒
			fieldClerkTaskProgress, //外勤办事员任务进度提醒
			salesmanOrderForm, //业务员--订单 
			bossCommissionMatter, //boss--待办事项
		},
		computed: {
			...mapState(['vuex_tabbar'])
		},
		data() {
			return {
				reload: true,
				loading: false,
				page: 1,
				pageSize: 10,
				tatol: 0,
				list: [],
				firmId: null,
				roleCodes: null, //判断登录值
				fieldSupervisorMessageByValue: [], //外勤主管--消息提醒传值
				fieldClerkTaskProgress: {}, //外勤办事员任务进度提醒
				fieldClerkByValueArray: [], //外勤办事员任务进度提醒
				salesmanOrderFormByValue: [], //业务员--订单传值
				bossCommissionMatterByValue: [], //boss--待办事项传值
				bossByValue: null, //boss--待办事项传值
				InputValue: '',
				keyword: ''
			}
		},
		onShow() {
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
		},
		methods: {
			reloadFun(val) {
				this.reload = val
			},
			getList() {
				if (this.$store.state.vuex_user != '') {
					var roleCodes = this.$store.state.vuex_user.roleCodes[0]
					this.roleCodes = roleCodes
					this.fieldSupervisorMessageByValue = [] //外勤主管--消息提醒传值
					this.fieldClerkTaskProgress = {} //外勤办事员任务进度提醒
					this.fieldClerkByValueArray = [] //外勤办事员任务进度提醒
					this.salesmanOrderFormByValue = [] //业务员--订单传值
					this.bossCommissionMatterByValue = [] //boss--待办事项传值
					this.bossByValue = null //boss---待办事项传值
				}

			},
			getPageInfo(cb) {
				let keyword = this.keyword || '';
				if (this.$store.state.vuex_user != '') {
					var roleCodes = this.$store.state.vuex_user.roleCodes[0]
				}
				if (roleCodes == 'fieldClerk') {
					// this.$store.state.vuex_tabbar[1].text='任务进度提醒'
					uni.setNavigationBarTitle({
						title: '任务进度提醒'
					})
					if (this.fieldClerkByValueArray.length == 0) {
						this.page = 1
					} else {
						this.page = this.fieldClerkByValueArray.length == this.tatol ? this.page : ++this.page;
					}
					let data = {
						page: this.page,
						pageSize: 10
					}
					var params = Object.keys(data).map(function(key) {
						// body...
						return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
					}).join("&");
					this.$u.post('/fieldClerk/findTaskProgressPage?1=1&' + params).then(response => {
						response.rows = response.rows.map(item => {
							item.percentage = parseFloat(item.percentage).toFixed(0);
							
							return item;
						})

						this.tatol = response.totalRows
						this.fieldClerkByValueArray = (this.page == 1 ? [] : this.fieldClerkByValueArray)
							.concat(response.rows)
						if (typeof cb == 'function') {
							cb()
						}
					}).catch(() => {
						this.loading = false;
					})

				} else if (roleCodes == 'fieldSupervisor') {
					// 外勤主管-消息提醒
					if (this.fieldSupervisorMessageByValue.length == 0) {
						this.page = 1
					} else {
						this.page = this.fieldSupervisorMessageByValue.length == this.tatol ? this.page : ++this.page;
					}
					let data = {
						page: this.page,
						pageSize: 10
					}
					var params = Object.keys(data).map(function(key) {
						// body...
						return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
					}).join("&");

					this.$u.post('/messageReceiving/queryMongoDBListPage?1=1&' + params).then(resp => {
						// this.fieldSupervisorMessageByValue = resp.rows
						this.tatol = resp.totalRows
						this.fieldSupervisorMessageByValue = (this.page == 1 ? [] : this
								.fieldSupervisorMessageByValue)
							.concat(resp.rows)
						if (typeof cb == 'function') {
							cb()
						}
					}).catch(() => {
						this.loading = false;
					})
				} else if (roleCodes == 'accountExecutive') {

					// 业务员订单
					uni.setNavigationBarTitle({
						title: '订单'
					});
					if (this.salesmanOrderFormByValue.length == 0) {
						this.page = 1
					} else {
						this.page = this.salesmanOrderFormByValue.length == this.tatol ? this.page : ++this.page;
					}
					let data = {
						page: this.page,
						pageSize: 10
					}
					var params = Object.keys(data).map(function(key) {
						// body...
						return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
					}).join("&");
					this.firmId = this.$store.state.id
					if (this.firmId == null) {
						this.$u.post('/salesman/findOrderList?1=1&' + params, {
							firmId: this.firmId,
							blurryKeyword: keyword
						}).then(resp => {
							this.tatol = resp.totalRows
							this.salesmanOrderFormByValue = (this.page == 1 ? [] : this.salesmanOrderFormByValue)
								.concat(resp.rows)
							if (typeof cb == 'function') {
								cb()
							}
						}).catch(() => {
							this.loading = false;
						})
					} else {
						this.$u.get('/salesman/findOrderListById', {
							id: this.firmId,
							page: this.page,
							pageSize: 10
						}).then(resp => {
							this.tatol = resp.totalRows
							this.salesmanOrderFormByValue = (this.page == 1 ? [] : this.salesmanOrderFormByValue)
								.concat(resp.records)
							this.$store.state.id = null
							if (typeof cb == 'function') {
								cb()
							}
						}).catch(() => {
							this.loading = false;
						})
					}

				} else if (roleCodes == 'boss' || roleCodes == 'bossManager') {
					// boss
					this.$u.post('/boss/homePage').then(resp => {
						this.bossByValue = resp.agentNumber
						this.bossCommissionMatterByValue = resp.agentList
					})
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
		}
	}
</script>
