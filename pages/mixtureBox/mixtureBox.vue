<template>
	<view class="mixtureBox">
		<!-- 混合 -->
		<!-- <high-seas-ywy  :executiveHighSeasByValue='executiveHighSeasByValue' v-if="roleCodes=='accountExecutive'"></high-seas-ywy> -->
		<!-- <high-seas-y-w-y :highSeasYWYByValue='highSeasYWYByValue' v-if="roleCodes=='accountExecutive'"></high-seas-y-w-y> -->
		<!-- <executive-high-seas :executiveHighSeasByValue='executiveHighSeasByValue' v-if="roleCodes=='accountExecutiveSupervisor'"></executive-high-seas> -->
		<!-- <executive-high-seas :executiveHighSeasByValue='executiveHighSeasByValue' v-if="roleCodes=='accountExecutiveSupervisor'"></executive-high-seas> -->

		<!-- 业务员-公海 -->
		<view class="content" v-if="roleCodes=='accountExecutive'||roleCodes=='accountExecutiveSupervisor'">
			<view class="child" v-for="(item,index) in highSeasYWYByValue">
				<view class="child_left">
					<view class="clienteleName">{{item.clienteleName||''}}</view>
					<view class="yixiang">
						<text class="ask">意向等级</text>
						<text class="answer">{{item.sourceTypeLv||''}}</text>
					</view>
					<view class="yixiang">
						<text class="ask">业务描述</text>
						<text class="answer">{{item.categoryText||'暂无'}}</text>
					</view>
				</view>
				<view class='child_right'>
					<!-- <view class='child_right_child' v-if="roleCodes == 'accountExecutiveSupervisor'">
						<picker mode="multiSelector" @change="bindMultiPickerChange"
							@columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
							分配
						</picker>
						
					</view> -->
					<view class='child_right_child' v-if="roleCodes == 'accountExecutiveSupervisor'" @click="allocation(item)">
						分配
					</view>


					<view class='child_right_child' @click="rob(item)">
						抢单

					</view>

				</view>
			</view>


		</view>

		<view v-if="highSeasYWYByValue.length==0">暂无信息</view>
		<citySelect v-model="show"  :list="departmentList"  @city-change="cityChange" @confirm="confirm"></citySelect>
		<u-tabbar v-model="current" :list="vuex_tabbar" :mid-button="false"></u-tabbar>


	</view>
</template>

<script>
	import citySelect from './u-city-select.vue';
	import executiveHighSeas from '@/pages/mixtureBox/executive/highSeas/highSeas.vue'; //业务主管-公海
	import highSeasYWY from '@/pages/mixtureBox/highSeasYWY/highSeasYWY.vue'; //业务员-公海
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			executiveHighSeas, //业务主管-公海
			highSeasYWY, //业务员-公海
			citySelect
		},
		computed: {
			...mapState(['vuex_tabbar'])
		},
		data() {
			return {
				task:{},
				show: false,
				page: 1,
				pageSize: 0,
				multiIndex: [0, 0],
				multiArray: [
					// ['暂无'],
					// ['暂无']
				],
				departmentNameArray: [], //部门
				departmentStaffArr: [], //部门人员
				departmentStaffIdArr: [], //部门人员id
				formObj: {
					classify: 20,
					type: null, //进方式
					theContent: '', //本次跟进内容
					nextDate: null, //下次跟进时间
					nextContent: null, //下次跟进内容
					companyId: null, //公司id
				},
				showPicker: false,
				list: [],
				roleCodes: null, //判断登录值
				highSeasYWYByValue: [], // 业务员-公海传参
				executiveHighSeasByValue: [], // 业务主管-公海传参
				departmentList:[{
						value: 1,
						label: '中国',
						children: [{
								value: 2,
								label: '广东',
								children: [{
										value: 3,
										label: '深圳'
									},
									{
										value: 4,
										label: '广州'
									},
								]
						},
						{
								value: 2,
								label: '广东111',
								children: []}
						],
				}]
				
			}
		},
		onShow() {

			// this.page = 0
			this.pageSize = 0
			this.highSeasYWYByValue=[]
			this.getPageInfo();
			this.getList()
		},
		 onPullDownRefresh(){
			 this.page = 0
		  this.getPageInfo();
		  uni.stopPullDownRefresh()
		 },
		methods: {
			confirm(e) {
				var taht=this
				uni.showModal({
				    title: '分配',
				    content: '分配给'+ e.label,
				    success: function (res) {
				        if (res.confirm) {
							taht.$u.get('/publicResoBusinessOpportunity/allocation', {
								userId: e.value,
								id:taht.task.id
							}).then(resp => {
								setTimeout(function(){
									uni.showToast({
										title: '已分配给'+e.label,
										// icon: 'none',
									})
									taht.getPageInfo()
								});
								}).catch(resp => {
									setTimeout(function(){
					uni.showToast({
							title: '分配给'+e.label+'失败',
							icon: 'none',
						})
						taht.getPageInfo()
					});
				})
							
				        } else if (res.cancel) {
							setTimeout(function(){
							uni.showToast({
									title: '已取消分配',
									icon: 'none',
								})
								taht.getPageInfo()
							});
				        }
				    }
				});
			},
			bindMultiPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				console.log(e)
				var tast = this
				e.detail.value.forEach((item, index) => {
					item = tast.multiArray[index][index]
					console.log(item)
				})
			},
			bindMultiPickerColumnChange(e) {
				console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
				console.log(e);
				var tast = this
				if (e.detail.column == 0) {
					tast.multiArray[1] = tast.departmentStaffArr[e.detail.value]
				} else {

				}
				tast.$forceUpdate()

			},

			getList() {
				console.info(this.$store.state.vuex_user.roleCodes[0])
				var roleCodes = this.$store.state.vuex_user.roleCodes[0]
				this.roleCodes = roleCodes
			},
			getPageInfo() {
				var roleCodes = this.$store.state.vuex_user.roleCodes[0]
				this.roleCodes = roleCodes
				if (roleCodes == 'accountExecutiveSupervisor') {
					console.info('业务主管')
					if(this.highSeasYWYByValue.length==0){
						this.page=1
					}else if(this.highSeasYWYByValue.length==this.pageSize){
						// this.page = this.highSeasYWYByValue.length == this.pageSize ? this.page : ++this.page;
						this.page=1
						}
						else if(this.highSeasYWYByValue.length!=this.pageSize){
							 this.page = this.highSeasYWYByValue.length == this.pageSize ? this.page : ++this.page;
						}else{

								this.page=1
							}
					// this.page = this.highSeasYWYByValue.length == this.pageSize ? this.page : ++this.page;
					let data = {
						page: this.page,
						pageSize: 10
					}
					var params = Object.keys(data).map(function(key) {
						// body...
						return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
					}).join("&");
					this.$u.post('/publicResoBusinessOpportunity/queryListPage?1=1&' + params).then(resp => {
						if(this.page==1){
							 this.highSeasYWYByValue = resp.rows
						}
						else{
						if (this.highSeasYWYByValue.length == 0) {
							this.highSeasYWYByValue = resp.rows
						} else if (this.pageSize >resp.totalRows) {
								console.info('抢单成功')
							this.highSeasYWYByValue = resp.rows
						}else if (this.highSeasYWYByValue.length != resp.totalRows) {
							this.highSeasYWYByValue = this.highSeasYWYByValue.concat(resp.rows)
						}
						}
						this.pageSize = resp.totalRows
						uni.stopPullDownRefresh()
					});
					// 获取部门
					this.$u.post('/guns-cloud-system/entDept/findDeptList').then(resp => {
						var valueNu=1
						// this.array=resp.wxDept
						var departmentNameArray = []
						var departmentStaffArr = [];
						resp.wxDept.forEach(item=>{
							let userNames = item.userNames.split(',');
							departmentStaffArr = departmentStaffArr.concat(item.userIds.split(',').map((ite,idx)=>{
								return {value:ite,
								label:userNames[idx],
								parentId:item.deptId,
								deptId:99999999,sort:9};
							})).filter(item=>{return item.value!=""&&item.value!=undefined});
						});
						departmentStaffArr =  departmentStaffArr.concat(resp.wxDept.map(item=>{
							return {
								deptId:item.deptId,
								parentId:item.parentId,
								label:item.deptName,
								value:item.deptId,
								sort:1
							}
						}))
						console.info(departmentStaffArr)
						this.departmentList = this.handleTree(departmentStaffArr,'deptId','parentId','children',-1);
					})
					this.$forceUpdate()
				} else if (roleCodes == 'accountExecutive') {
					// 业务员
					if(this.highSeasYWYByValue.length==0){
						this.page=1
					}
					else if(this.highSeasYWYByValue.length==this.pageSize){
						// this.page = this.highSeasYWYByValue.length == this.pageSize ? this.page : ++this.page;
						this.page=1
						}
						else if(this.highSeasYWYByValue.length!=this.pageSize){
							 this.page = this.highSeasYWYByValue.length == this.pageSize ? this.page : ++this.page;
						}else{
								this.page=1
							}
					
					let data = {
						page: this.page,
						pageSize: 10
					}
					var params = Object.keys(data).map(function(key) {
						return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
					}).join("&");
					this.$u.post('/publicResoBusinessOpportunity/queryListPage?1=1&' + params).then(resp => {
						// this.highSeasYWYByValue = resp.rows
						if(this.page==1){
							 this.highSeasYWYByValue = resp.rows
						}
						else{
						if (this.highSeasYWYByValue.length == 0) {
							this.highSeasYWYByValue = resp.rows
						} else if (this.pageSize >resp.totalRows) {
								console.info('抢单成功')
							this.highSeasYWYByValue = resp.rows
						}else if (this.highSeasYWYByValue.length != this.pageSize) {
							this.highSeasYWYByValue = this.highSeasYWYByValue.concat(resp.rows)
						}
						this.pageSize = resp.totalRows
						}
						// uni.stopPullDownRefresh()
					})
				}
				this.$forceUpdate()
			},
			handleTree(data, id, parentId, children, rootId) {
			    id = id || 'id'
			    parentId = parentId || 'parentId'
			    children = children || 'children'
			    rootId = rootId || Math.min.apply(Math, data.map(item => { return item[parentId] })) || 0
			        //对源数据深度克隆
			    const cloneData = JSON.parse(JSON.stringify(data))
			        //循环所有项
			    const treeData = cloneData.filter(father => {
			        let branchArr = cloneData.filter(child => {
			            //返回每一项的子级数组
			            return father[id] == child[parentId]
			        }).sort((a, b) => {
			            let flag = 0;
			            if (a.orderNo) {
			                flag = a.orderNo - b.orderNo
			            } else if (a.sort) {
			                flag = a.sort - b.sort
			            } else if (a.id) {
			                flag = a.id - b.id
			            }
			            return flag
			        });
			        branchArr.length > 0 ? father.children = branchArr : '';
			        //返回第一层
			        return father[parentId] === rootId;
			    });
			    console.info(treeData)
			    return treeData != '' ? treeData : data;
			},
			// 抢单
			rob(item) {
				this.$u.get('/publicResoBusinessOpportunity/vieForCommercial', {
					id: item.id
				}).then(resp => {
					this.page=1

					setTimeout(function() {
						uni.showToast({
							title: '抢单成功'
							// icon: 'none',
						})
					}, 1000);
					this.getPageInfo()

				})
			},
			// 分配
			allocation(item) {
				console.info('分配')
				console.info(item)
				this.task=item
				this.show=true
				// this.$u.post('/publicResoBusinessOpportunity/allocation', {
				// 	id: item.id
				// }).then(resp => {
				// 	})

			},

		},
		onReachBottom() {
			// this.getPageInfo()
			this.getList()

			if (this.highSeasYWYByValue.length != this.pageSize) {
				this.getPageInfo()
			}
		}
	}
</script>

<style>
</style>
<style lang="scss" scoped>
	.mixtureBox {
		border-top: 0.5px solid #EEEEEE;
		padding-left: 16px;
		padding-right: 16px;
		background-color: #FFFFFF;

		.content {
			.child {
				border-bottom: 0.5px solid #EEEEEE;
				padding-top: 19px;
				padding-bottom: 20.5px;
				display: flex;
				justify-content: space-between;

				.child_left {
					.clienteleName {
						color: #000;
						font-size: 16px;
						font-family: PingFang SC;
						font-weight: 600;
						line-height: 25px;
					}

					.yixiang {
						.ask {
							color: #000;
							font-size: 16px;
							font-family: PingFang SC;
							font-weight: 500;
							line-height: 25px;
						}

						.answer {
							color: #000;
							font-size: 16px;
							font-family: PingFang SC;
							font-weight: 500;
							line-height: 25px;
							margin-left: 10px;
						}
					}
				}

				.child_right {
					display: flex;

					.child_right_child {
						width: 60px;
						height: 25px;
						border-radius: 12.5px;
						border: 1px solid #72c6c6;
						color: #72c6c6;
						text-align: center;
						font-size: 16px;
						font-family: PingFang SC;
						font-weight: 600;
						margin-right: 10px;
					}
				}

				.title {
					width: 100%;
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D;
					margin-bottom: 11px;
				}

				.time {
					width: 100%;
					font-size: 14px;
					font-family: DINPro;
					font-weight: 400;
					color: #6E7073;
				}
			}

			.child:last-child {
				border-bottom: 0px;
			}
		}
	}
</style>
