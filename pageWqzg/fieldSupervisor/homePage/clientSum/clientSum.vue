<template>
	<view class="clientSum">
		<!-- 客户总数 -->
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
		<view class="map">
			<view class="map_title">
				小组客户统计
			</view>
			<view style='width: 100%;height: 700rpx;'>
				<uni-ec-canvas class="uni-ec-canvas" id="line-chart" ref="canvas" canvas-id="lazy-load-chart" :ec="ec">
				</uni-ec-canvas>
			</view>
		</view>

	</view>
</template>

<script>
	import uniEcCanvas from '@/uni-ec-canvas/uni-ec-canvas.vue';
	import * as echarts from '@/uni-ec-canvas/echarts';
	export default {

		data() {
			// 设置日期
			// const currentDate = this.getDate({
			//                format: 'yyyy-mm'
			//  })
			const currentDate = this.getDate()
			return {
				date: currentDate,
				year: null,
				month: null,
				contentList: [],
				nameArray: [], //姓名
				dataArray: [], //数据
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
							bottom: '8%',
							containLabel: true
						},
						xAxis: [{
								type: 'value',
								position: 'top',
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
								// type: 'value',
								boundaryGap: [0, '30%'],
								type: 'category',
								data:['暂无'],
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
										color: 'rgba(0,0,0,0)',
									}
								},
							},
							{
								name: '直接访问',
								type: 'bar',
								barWidth: '60%',
								label: {
									show: true,
									position: 'right'
								},
								data: [700, 600, 358, 425, 820]
							},

						]
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
			// 选择日期
			dateChange(e) {
				this.year = e.target.value.slice(0, 4)
				this.month = e.target.value.slice(5, 7)
				this.$u.post('/fieldSupervisor/findCustomerGraphics', {
					year: this.year,
					month: this.month
				}).then(resp => {
					if (resp == [] || resp.length == 0) {
						this.ec.option.series[1].data = [0]
						this.ec.option.xAxis[0].data = []

					} else {
						this.contentList = resp
						var nameArray = []
						var dataArray = []
						this.contentList.forEach((item, index) => {
							dataArray.push(item.data||0)
							nameArray.push(item.name)
						})
						this.nameArray = nameArray
						this.dataArray = dataArray
						this.ec.option.series[1].data = this.dataArray
						this.ec.option.yAxis[0].data = this.nameArray
					}
					// if (this.month < 10) {
					// 	this.month = '0' + this.month
					// }
				})
			},
			// 获取年月日信息
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				// this.month=month
				this.year = year
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
				
				this.$u.post('/fieldSupervisor/findCustomerGraphics',{month:this.month,year:this.year}).then(resp => {
					this.contentList = resp
					var nameArray = []
					var dataArray = []
					this.contentList.forEach((item, index) => {
						dataArray.push(item.data==''||item.data==null?0:item.data)
						nameArray.push(item.name)
					})
					this.nameArray = nameArray
					this.dataArray = dataArray
					this.ec.option.series[1].data = this.dataArray
					this.ec.option.yAxis[0].data = this.nameArray
					// this.nameArray.
					// myChart.setOption(ec);
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
		components: {
			uniEcCanvas
		}
	}
</script>

<style lang="scss">
	.clientSum {
		.select {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			padding-top: 6px;
			padding-left: 16px;
			padding-right: 16px;
			padding-bottom: 14.5px;
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
