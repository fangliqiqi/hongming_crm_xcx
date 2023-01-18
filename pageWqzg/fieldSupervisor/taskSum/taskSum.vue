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
			<view style='width: 100%;height: 540px;'>
				<uni-ec-canvas class="uni-ec-canvas" id="line-chart" ref="canvas" canvas-id="lazy-load-chart" :ec="ec">
				</uni-ec-canvas>
			</view>
		</view>
		<u-tabbar v-model="current" :list="list" :mid-button="false"></u-tabbar>
	</view>
</template>

<script>
	import uniEcCanvas from '@/uni-ec-canvas/uni-ec-canvas.vue';
	import * as echarts from '@/uni-ec-canvas/echarts';
	export default {
props:['fieldSupervisorMissionArr'],
		data() {
			// 设置日期
			// const currentDate = this.getDate({
			//                format: 'yyyy-mm'
			//  })
			const currentDate = this.getDate()
			return {
				taskSumArray:[],//图表数据
				taskSumDataArray:[],//
				list: [{
								pagePath: "/pages/home/index",
								iconPath: "/static/image/unHomePage.png",
								selectedIconPath: "/static/image/homePage.png",
								text: '首页',
								isDot: false,
								customIcon: false,
							},{
								pagePath: "/pages/messageBox/messageBox",
								iconPath: "/static/image/unInformation.png",
								selectedIconPath: "/static/image/information.png",
								text: '消息提醒',
								isDot: false,
								customIcon: false,
							},
							{
								pagePath: "/pages/fieldSupervisor/taskSum/taskSum",
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
				],
				current: 0,
				date: currentDate,
				year: currentDate,
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
							right: '4%',
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
								type: 'value',  
								data: [0, 250,500, 750, 1000,'月任务数(个)'],  
								axisTick: {  
								    alignWithLabel: true  
								}  ,
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
								// axisTick: {
								//         alignWithLabel: true  
								//     } ,
								// axisLine: {
								//             show: false
								//         },
								//         axisTick: {
								//             show: false
								//         },
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
								data: [700, 600, 358, 425, 820, 700, 600, 358, 425, 820, 99, 300]
							},

						]
					}

				}
			
			}
		},
		computed: {
			startDate() {
				console.info('1111')
				console.info(this.getDate('start'))
				return this.getDate('start');
			},
			endDate() {
				console.info('2222')
				console.info(this.getDate('start'))
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
				// month = month > 9 ? month : '0' + month;
				// day = day > 9 ? day : '0' + day;
				this.year = `${year}`
				// this.month=`${month}`
				console.info('年份')
				// console.info([`${year}`,`${month}`])
				// return `${year}-${month}`;
				// var arr={year:`${year}`,month:`${month}`}

				return `${year}`
			},
			getList() {
				// 
				console.log('任务总数')
				var taskSumDataArray=[]
				this.$u.post('/fieldSupervisor/findTaskGraphics').then(resp => {
					// console.log('请求')
					// console.log(resp)
					resp=resp.reverse()
					this.taskSumArray=resp
					// taskSumDataArray
					resp.forEach((item,index)=>{
						console.log('循环11')
						console.log(item.data)
						taskSumDataArray.push(item.data)
						
					})
					
					// for(var i=0 ;i<resp.length-1)
					this.taskSumDataArray=taskSumDataArray
					this.ec.option.series[1].data=taskSumDataArray
					console.log('数据')
					console.log(taskSumDataArray)
					// console.log(this.ec.option.series[1].data)
					// console.log(this.taskSumDataArray)
				})
			},
			

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
	.taskSum {
		border-top: 1px solid #EEEEEE;
		padding-top: 89px;

	
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
