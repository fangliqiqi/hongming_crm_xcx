<template>
	<view class="income">
		<!-- 收入 -->
			<view class="income_select">
		<picker mode="date" :value="date" fields="month" :start="startDate" :end="endDate" @change="dateChange">
			<view class="select">
				<view class="select_year">
					<text class="font">{{year}}年</text>
					<view class="icon"></view>
				</view>
				<view class="select_month select_year">
					<text class="font">{{month}}月</text>
					<view class="icon"></view>
				</view>
			</view>
		</picker>
		<!-- 省 -->
		<view class="select">
			<pickerAddress @change="change">
				<view class=" select_year">
					<view class="font">{{province}}</view>
					<view class="icon"></view>
				</view>
			</pickerAddress>
		</view>
		</view>
		<!-- 饼状图 -->
		<view class="cake">
			<view class="cake_title">
				收入额
			</view>
			<view style='width: 100%;height: 500rpx;'>
				<c-canvas class="uni-ec-canvas" id="line-chart" ref="cakeMap" canvas-id="lazy-load-chart" :ec="cake">
				</c-canvas>
			</view>
		</view>

		<!-- 柱状图 -->
		<view class="cake">
			<view class="cake_title">
				各地市收入额
			</view>
			<view style='width: 100%;height: 700rpx;'>
				<uni-ec-canvas class="uni-ec-canvas" id="line-chart" ref="canvas" canvas-id="lazy-load-chart" :ec="ec">
				</uni-ec-canvas>
			</view>
		</view>

	</view>
</template>

<script>
	import uniEcCanvas from '../../../../uni-ec-canvas/uni-ec-canvas.vue';
	import cCanvas from '@/uni-ec-canvas/uni-ec-canvas.vue';
	import * as echarts from '../../../../uni-ec-canvas/echarts';
	import pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue'; //省市区选择
	export default {
		components: {
			uniEcCanvas,
			cCanvas,
			pickerAddress
		},
		data() {
			const currentDate = this.getDate()
			return {
				province: '安徽省',
				date: currentDate,
				year: null,
				month: null,
				incomeReportList: [], //饼图
				cityIncomeReportList: [], //柱状图

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
								// type: 'category',
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
									position: 'top',
								},
								data: [700]
							},

						]
					}

				},
				cake: {
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
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						tooltip: {
							trigger: 'item'
						},

						color: ['#67c190', '#3a7ae8', '#f66c42', '#f3cf85', '#e2d8b0'],
						series: [{
							name: '访问来源',
							type: 'pie',
							radius: ['40%', '70%'],
							data: [{
									value: 20,
									name: '搜索引擎'
								},
								{
									value: 20,
									name: '直接访问'
								},
								{
									value: 20,
									name: '邮件营销'
								},
								{
									value: 20,
									name: '联盟广告'
								},
								{
									value: 40,
									name: '视频广告'
								}
							],
							emphasis: {
								itemStyle: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							},
							label: {
								alignTo: 'edge',
								formatter: '{time|{c} 元}\n{name|{b}}',
								minMargin: 5,
								edgeDistance: 10,
								lineHeight: 15,
								rich: {
									time: {
										fontSize: 10,
										color: '#999'
									}
								}
							},
						}]
					}

				}

			}
		},
		onLoad() {
			this.getList();
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
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
			// 选择日期
			dateChange(e) {
				this.year = e.target.value.slice(0, 4)
				this.month = e.target.value.slice(5, 7)
				this.getList()
			},
			// 获取年月日信息
		getDate(type) {
		            const date = new Date();
		            let year = date.getFullYear();
		            let month = date.getMonth() + 1;
		            let day = date.getDate();
					this.year=year
		            if (type === 'start') {
		                year = year - 60;
		            } else if (type === 'end') {
		                year = year + 2;
		            }
		            month = month > 9 ? month : '0' + month;
					this.month=month
					
		            day = day > 9 ? day : '0' + day;
		            return `${year}-${month}-${day}`;
		        },

			getList() {
				this.$u.post('/boss/incomeReport', {
					year: this.year,
					month: this.month,
					province: this.province
				}).then(resp => {
					if (resp.cityIncomeReport == [] || resp.cityIncomeReport.length == 0) {
						//柱状
						this.ec.option.series[1].data = [0]
						this.ec.option.xAxis[0].data = ['暂无']
					} else {
						this.cityIncomeReportList = resp.cityIncomeReport //柱状图
						var cityIncomeReporNameArray = []
						var cityIncomeReporDataArray = []
						this.cityIncomeReportList.forEach((item, index) => {
							cityIncomeReporDataArray.push(item.value)
							cityIncomeReporNameArray.push(item.payCity)
						})
						//柱状
						this.ec.option.series[1].data = cityIncomeReporDataArray
						this.ec.option.xAxis[0].data = cityIncomeReporNameArray
					}
					if (resp.incomeReport == [] || resp.incomeReport.length == 0) {
						//饼状

						this.cake.option.series[0].data = []
					} else {
						this.incomeReportList = resp.incomeReport //饼状
						this.incomeReportList.forEach((item, index) => {

							if (item.value == undefined) {
								item.value = 0
							}
						})
						//饼状
						this.cake.option.series[0].data = this.incomeReportList
					}
				})
			}
		},
		onReachBottom() {
			this.getList()
		},
		onReady() {
			setTimeout(() => {
				console.log(this)
				console.log(this.$refs)
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

<style lang="scss" scoped>
	.income {
		position: relative;
		padding-bottom: 60px;
	border-top: 0.5px solid #EEEEEE;
		background-color: #F5F6F7;
		height: 100vh;
		.income_select{
			display: flex;
			margin-bottom: 10px;
			background-color: #fff;
		.select {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			padding-top: 13px;
			padding-left: 16px;
			padding-right: 16px;
			padding-bottom: 13px;
			background-color: #FFFFFF;

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

		.cake {
			padding-left: 16px;
			padding-right: 16px;
			padding-top: 28.5px;
			background-color: #FFFFFF;

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
