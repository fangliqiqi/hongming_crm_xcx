<template>
	<view class="taskSum">
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
			<view style='width: 100%;height: 1200rpx;'>
				<uni-ec-canvas class="uni-ec-canvas" id="line-chart" ref="canvas" canvas-id="lazy-load-chart" :ec="ec">
				</uni-ec-canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import uniEcCanvas from '@/uni-ec-canvas/uni-ec-canvas.vue';
	import * as echarts from '@/uni-ec-canvas/echarts.js';
	export default {

		data() {
			// 设置日期
			// const currentDate = this.getDate({
			//                format: 'yyyy-mm'
			//  })
			const currentDate = this.getDate()
			return {

				date: currentDate,
				year: currentDate,

				ec: {

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
							left: '0%',
							right: '8%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
								type: 'value',
								position: 'top',
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
									show: false
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
								data: [700, 600, 358, 425, 820, 700, 600, 358, 425, 820, 99, 300]
							},

						]
					}

				}

			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},

		onLoad() {
			this.getList();
		},
		methods: {
			// 选择日期
			dateChange(e) {
				this.year = e.target.value.slice(0, 4);
			},
			// 获取年月日信息
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				// let month = date.getMonth() + 1;
				console.info('点击')
				console.info(year)
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					// year = year + 2;
					year = year;
				}
				this.year = `${year}`
				return `${year}`
			},
			getList() {
				this.$u.post('/fieldSupervisor/findTaskGraphics').then(resp => {
				})
			}
		},
		onReachBottom() {
			this.getList()
		},
		components: {
			uniEcCanvas
		}
	}
</script>

<style lang="scss">
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
