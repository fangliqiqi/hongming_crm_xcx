<template>
	<view class="orderQuantity">
		<!-- 订单数 -->
		<view class="orderQuantity_select">
			<picker mode="date" :value="date" fields="month" :start="startDate"  @change="dateChange">
				<view class="select">
					<view class="select_year">
						<text class="font">{{year}}-{{month}}</text>
						<view class="icon"></view>
					</view>
					<!-- <view class="select_month select_year">
						<text class="font">{{endYear}}--{{endMonth}}</text>
						<view class="icon"></view>
					</view> -->
				</view>
			</picker>
			<!-- 结束日期 :end="endDate"-->
			<picker mode="date" :value="date" fields="month" :start="startDate"  @change="endDateChange">
			<!-- <picker mode="endDate" :value="endDate" fields="endMonth" :start="endStartDate" :end="endEndDate" @change="endDateChange"> -->
				<view class="select">
					<!-- <view class="select_year">
						<text class="font">{{year}}-{{month}}</text>
						<view class="icon"></view>
					</view> -->
					<view class="select_year">
						<text class="font">{{endYear}}-{{endMonth}}</text>
						<view class="icon"></view>
					</view>
				</view>
			</picker>
			<!-- 省 -->
			<view class="select">
				<pickerAddress @change="change">
					<view class=" select_year">
						<view class="font" style="width: 90px; text-align: right;">{{province}}</view>
						<view class="icon"></view>
					</view>
				</pickerAddress>
			</view>
		</view>
		<!-- 总订单数 柱状图-->
		<view class="cake">
			<view class="cake_title">
				总订单数
			</view>
			<view style='width: 100%;height: 700rpx;'>
				<uni-ec-canvas class="uni-ec-canvas" id="line-chart" ref="canvas" canvas-id="lazy-load-chart" :ec="ec">
				</uni-ec-canvas>
			</view>
		</view>
		<!-- 线状图 各地市订单数 -->
		<view class="cake">
			<view class="cake_title">
				各地市订单数
			</view>
			<view style='width: 100%;height: 700rpx; margin-top: 20px; '>
				<c-canvas class="uni-ec-canvas" id="line-chart" ref="cakeMap" canvas-id="lazy-load-chart" :ec="cake">
				</c-canvas>
			</view>
		</view>

	</view>
</template>

<script>
	import uniEcCanvas from '@/uni-ec-canvas/uni-ec-canvas.vue';
	import cCanvas from '@/uni-ec-canvas/uni-ec-canvas.vue';
	import * as echarts from '@/uni-ec-canvas/echarts';
	import pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue'; //省市区选择
	export default {
		components: {
			uniEcCanvas,
			cCanvas,
			pickerAddress
		},
		data() {
			// const currentDate = this.getDate()
			// const currentDate1 = this.getDate()
			return {
				province: '安徽省',
				// date: currentDate,
				// endDate:currentDate1,
				year: '',//开始年份
				month: '',//开始月份
				endYear:'',//结束年份
				endMonth:'',//结束月份
				stringCollectList: [], //线图
				cityIncomeReportList: [], //柱状图
				monthArray: [], //线状图月份

				ec: {
					color: ['pink', '#f4f5f6'],
					lazyLoad: true,
					option: {
						color: ['#3398DB'],
						tooltip: {
							trigger: 'axis',
							axisPointer: { // 坐标轴指示器，坐标轴触发有效  
								type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
							}
						},
						grid: {
							left: '3%',
							right: '8%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
								type: 'value',
								position:'top',
								
								data: ['0'],
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
							}

						],
						yAxis: [{
								boundaryGap: [0, '30%'],
								type: 'category',
								data:['暂无'],
								axisTick: {
									alignWithLabel: true
								},
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									textStyle: {
										color: '#999'
									},
								}
							}
							// }  
						],
						color: ['#67c190', '#3a7ae8', '#f66c42', '#f3cf85', '#e2d8b0'],
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
										color: 'rgba(0,0,0,0)',
									}
								},
							},

							{
								name: '直接访问',
								type: 'bar',
								barWidth: '60%',
								// label: seriesLabel,
								label: {
									show: true,
									position: 'right',
								},
								data: [0]
							},

						]
					}

				},
				cake: {
					// lazyLoad: true,
					option: {
						tooltip: {
							trigger: 'axis',
							// axisPointer: { // 坐标轴指示器，坐标轴触发有效  
							// 	type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'  
							// }
						},

						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
								
								position:'bottom',
								data:['暂无'],
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
							}

						],
						yAxis: [{
								boundaryGap: [0, '30%'],
								type: 'value',
								data:['暂无'],
								axisTick: {
									alignWithLabel: true
								},
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								axisLabel: {
									textStyle: {
										color: '#999'
									},
								}
							}
							// }  
						],
						color: ['#3a7ae8', '#67c190', '#f66c42', '#f3cf85', '#e2d8b0'],
						legend: {
							data: [0]
						},
						series: [{
								name: '',
								type: 'line',
								stack: '总量',
								data: [0],
								// label: {
								// 	show: true,
								// 	position: 'right',
								// },
							}
						]
					},
				},
			}
		},
		onLoad() {
			this.getList();
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},

			// endDate() {
			// 	return this.getDate('end');
			// },

		},
		methods: {
			previousPage() {
				uni.navigateBack()
			},
			// 省份
			change(data) {
				this.province = data.data[0]
				this.getList()
			},
			// 选择开始日期
			dateChange(e) {
				this.year = e.target.value.slice(0, 4)
				this.month = e.target.value.slice(5, 7)
				if(this.month<6){
					
					this.endYear=this.year
					this.endMonth = Number(this.month)+Number('2')
				}else if(this.month==3){
					this.endYear=this.year
					this.endMonth ='11'
				}
				else if(this.month>3){
					var value=Number(this.month) +Number('2')
					if(value=='12'){
						this.endYear=this.year
						this.endMonth ='12'
					}else{
						this.endMonth=Number(value)-Number('12')
						this.endYear=Number(this.year)+Number('1')
						}
				}
				if(this.endMonth<10){
					this.endMonth='0' + this.endMonth
				}

				this.getList()
				
			},
			// 选择结束日期
			endDateChange(e){
				this.endYear = e.target.value.slice(0, 4)
				this.endMonth = e.target.value.slice(5, 7)
				var month=null
				if(this.endMonth==12){
					this.year=this.endYear
					this.month=Number(12)-Number(2);

				}
				else if(this.endMonth<3){
				 month =12- (2-Number(this.endMonth))
					 if(month<10){
					 	this.month='0' + month;
					 }else{
						 this.month=month
						 }
					 this.year=Number(this.endYear)-Number('1')
				}else if(this.endMonth==3){
					this.month = '01'
					this.year=this.endYear
				}
				else if (this.endMonth>3){
					month = Number(this.endMonth)-Number('2')
						if(month<10){
							this.month='0' + month;
						}
						this.year=this.endYear
				}
				this.getList()
				// }
			},
			// 获取年月日信息
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				// this.month=month
				// this.year = year
				return `${year}-${month}-${day}`;
			},

			getList() {
					this.monthArray = [] //线状图月份
				var cityIncomeReporNameArray = []
				var cityIncomeReporDataArray = []
				var stringCollectNameArray = []
				var stringCollectDataArray = []
				this.$u.post('/boss/orderReport', {
					year: this.year,
					month: this.month,
					province: this.province,
					endYear:this.endYear,
					endMonth:this.endMonth
					
				}).then(resp => {
					if(this.month==null||this.month==''){
						this.month=resp.month
					}
					if(this.year==null||this.year==''){
						this.year=resp.year
					}
					if(this.endYear==null||this.endYear==''){
						this.endYear=resp.endYear
					}
					if(this.endMonth==null||this.endMonth==''){
						this.endMonth=resp.endMonth
					}
					
					if(resp.collect==[]||resp.collect.length==0){
						this.stringCollectList=[0]
						//线状
						// this.cake.option.xAxis[0].data = [0]
						this.cake.option.series = [{
								name: '邮件营销',
								type: 'line',
								stack: '总量',
								data: [0]
							}]
						this.cake.option.legend.data =  []
					}else{
						this.stringCollectList = resp.collect //线状
						// 线状图
						this.stringCollectList.forEach((item, index) => {
						
							if (item.value == undefined) {
								item.value = 0
							}
							item.type = 'line'
							item.stack = '总量'
							stringCollectNameArray.push(item.name)
							stringCollectDataArray.push(item.data)
							
						})
						this.cake.option.series = this.stringCollectList
						this.cake.option.legend.data = stringCollectNameArray
					}
					if(resp.date==[]||resp.date.length==0){
						this.cake.option.xAxis[0].data = [0]
					}else{
						//线状
						resp.date.forEach((item, index) => {
							item = item.substring(item.length - 2)
							item = item + '月'
							this.monthArray.push(item)
						})
						this.cake.option.xAxis[0].data = this.monthArray
					}
					if(resp.totalOrder==[]||resp.totalOrder.length==0){
						this.ec.option.series[1].data = [0]
						this.ec.option.yAxis[0].data = ['暂无']
					}else{
						this.cityIncomeReportList = resp.totalOrder //柱状图
						this.cityIncomeReportList.forEach((item, index) => {
							if (item.number == undefined) {
								item.number = 0
							}
							cityIncomeReporDataArray.push(item.number)
							cityIncomeReporNameArray.push(item.line)
							this.ec.option.series[1].data = cityIncomeReporDataArray
							this.ec.option.yAxis[0].data = cityIncomeReporNameArray
						})
					}					
				
				})
			}
		},
		onReachBottom() {
			this.getList()
		},
		onReady() {
			setTimeout(() => {
				this.$refs['cakeMap'].init()
				console.log('延迟加载了')
			}, 1000) // 两秒之后延迟加载  
			setTimeout(() => {
				console.log(this)
				console.log(this.$refs)
				this.$refs['canvas'].init()
				console.log('延迟加载了')
			}, 1000) // 两秒之后延迟加载  

			setTimeout(() => {
				//this.ec.option.series[0].data = [120, 132, 101, 134, 90, 230, 210]  
				// this.ec.option.xAxis[0].data = [1,2,3,4,5,6,7]  
				// 如果是data数组内的数据 记得用$set  
				console.log('数据更改了')
			}, 2000)
		},

	}
</script>

<style lang="scss">
	.orderQuantity {
		position: relative;
		padding-bottom: 100px;
		border-top: 0.5px solid #EEEEEE;
		background-color: #F5F6F7;
		// height: 100vh;

		.orderQuantity_select {
			display: flex;
			margin-bottom: 10px;
			background-color: #fff;
				padding-left: 16px;
				padding-right: 16px;
			.select {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				padding-top: 13px;
				width: 110px;
				// padding-left: 16px;
				// padding-right: 16px;
				padding-bottom: 13px;
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
						// width: 20px;
						// height: 12px;

						// background: #D2D3D6;
						// border-left: 8px;
						// border-right: 8px;
						// border-bottom: 20px;
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
}
			.cake {
				padding-left: 16px;
				padding-right: 16px;
				padding-top: 28.5px;
				padding-bottom: 20px;
				background-color: #FFFFFF;
				margin-bottom: 10px;

				.cake_title {
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
