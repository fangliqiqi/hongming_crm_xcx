<template>
	<view class="fieldSupervisorHomePage">
		<view>
			<view class="title bgfff">
				<view style="display: flex;">
					<image src="@/static/image/news.png" mode="widthFix" style="width: 92rpx; height: 62rpx;" />
				</view>
				<view style="    position: absolute;
		left: 61px;
		width: 3px;
		height: 34PX;
		transform: rotate(10deg);
		background: #FFF;">
				</view>
				<view class="news">
					<u-notice-bar type="primary" :more-icon="true" :list="informationList">
					</u-notice-bar>
				</view>
			</view>
		</view>
			<view class="business bgfff" @click="information">
				<view style="margin-right:13px">
					<image src="@/static/image/message.png" mode="widthFix" style="width: 42px;height: 42px;" />
				</view>
				<view class="message">
					<view style="display: flex;flex-direction: row;justify-content: space-between;" class="">
						<view lass="h2" class="name">
							<view class="font">消息提醒</view>
							<view class="order">{{fieldSupervisorMessageByValue.totalRows||""}}</view>
						</view>
						<text class="time">
							{{fieldSupervisorMessageByValue.rows[0].readDate||''}}
						</text>
					</view>
					<view class="message_font">
						{{fieldSupervisorMessageByValue.rows[0].msg||''}}
					</view>
				</view>
			</view>
		<view class="dataScreening bgfff">
			<text class="h1">
				数据总览
			</text>
			<view class="content">
				<u-row gutter="8">
					<u-col span="6">
							<view class="child" @click="traskSum">
								<view class="name">
									<text class="figure">{{fieldSupervisorByValue.totalNumber||0}}</text>
									<text class="writing">任务总数(个)</text>
								</view>
								<view class="icon">
									<image src="@/static/image/icon1.png" />
								</view>
							</view>
					</u-col>
					<u-col span="6">
						<view class="child" style="background: linear-gradient(90deg, #FAFCFC, #EDFDFD) !important;">
							<view class="name">
								<text class="figure">{{fieldSupervisorByValue.awaitAssignedNumber||0}}</text>
								<text class="writing">待分配任务数(个)</text>
							</view>
							<view class="icon">
								<image src="@/static/image/icon2.png" />
							</view>
						</view>
					</u-col>
					<u-col span="6">
						<navigator url="/pageWqzg/fieldSupervisor/homePage/warningTasks/warningTasks" hover-class="none">
							<view class="child"
								style="background: linear-gradient(90deg, #FCFBFE, #F8F5FC) !important;">
								<view class="name">
									<text class="figure">{{fieldSupervisorByValue.earlyWarningMissionNumber||0}}</text>
									<text class="writing">预警任务(个)</text>
								</view>
								<view class="icon">
									<image src="@/static/image/icon3.png" />
								</view>
							</view>
						</navigator>
					</u-col>
					<u-col span="6">
						<navigator url="/pageWqzg/fieldSupervisor/homePage/offTheStocks/offTheStocks" hover-class="none">
							<view class="child"
								style="background: linear-gradient(90deg, #FFFFFF, #FEFEFB, #FCFCF5) !important;">
								<view class="name">
									<text class="figure">{{fieldSupervisorByValue.completeNumber||0}}</text>
									<text class="writing">已完成的任务(个)</text>
								</view>
								<view class="icon">
									<image src="@/static/image/icon4.png" />
								</view>
							</view>
						</navigator>
					</u-col>
					<u-col span="6">
						<navigator url="/pageWqzg/fieldSupervisor/homePage/clientSum/clientSum" hover-class="none">
							<view class="child"
								style="background: linear-gradient(90deg, #FFFFFF, #FAFCFC, #EDFDFD) !important;">
								<view class="name">
									<text class="figure">{{fieldSupervisorByValue.customersNumber||0}}</text>
									<text class="writing">客户总数(个)</text>
								</view>
								<view class="icon">
									<image src="@/static/image/icon5.png" />
								</view>
							</view>
						</navigator>
					</u-col>
					<u-col span="6">
						<navigator url="/pageWqzg/fieldSupervisor/homePage/myClient/myClient" hover-class="none">
							<view class="child"
								style="background: linear-gradient(90deg, #FFFFFF, #FAFCFC, #EDFDFD) !important;">
								<view class="name">
									<text class="figure">{{fieldSupervisorByValue.myCustomersNumber||0}}</text>
									<text class="writing">我的客户数(个)</text>
								</view>
								<view class="icon">
									<image src="@/static/image/icon6.png"/>
								</view>
							</view>
						</navigator>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props:['fieldSupervisorByValue','fieldSupervisorMessageByValue','informationList'],
		components: {
		    },
		data() {
			return {
				// list: ['六安新获得一条商机', '整体评分达99！'],
				dataObject:{},
			}
		},
		onLoad() {
			this.getList();
			this.message();
		},
		methods: {
			information() {
				uni.switchTab ({
				     url: "/pages/messageBox/messageBox",//跳转页面的路径
				    });
			},
		getList(){
			// this.$u.post('/fieldSupervisor/homePage').then(resp => {
				
			// 	this.dataObject=resp
			// 	console.log('请求')
			// 	console.log(this.dataObject)
			// 	})
				
		},
		traskSum(){
			uni.switchTab({
			 url: "/pages/missionBox/missionBox",//跳转页面的路径
			});
		},
		message() {
			// uni.request({
			//     url: 'http://192.168.1.181:9003/fieldSupervisor/homePage', //仅为示例，并非真实接口地址。
			//     data: {
			//         // text: 'uni.request'
			//     },
			//     // header: {
			//     //     'custom-header': 'hello' //自定义请求头信息
			//     // },
			// 	method:'POST',
			//     success: (res) => {
			//         console.log(res.data);
			//         // this.text = 'request success';
			//     }
			// });
		}
		},
		onReachBottom(){
			this.getList()
			this.message();
		}


	}
</script>
<style scoped>
.content {
    width: 100%;
}
</style>
<style lang="scss" >
	.fieldSupervisorHomePage{
		.title {
			padding: 10px 16px 10px 16px;
			display: flex;
			position: relative;
		
			.news {
				width: 100%;
		
				.u-type-primary-light-bg {
					height: 31px;
					padding: 6px 12px !important;
					background: linear-gradient(90deg, #E3EDFC, #FAFCFF);
		
					.u-type-primary {
						color: #303133;
					}
		
					.uicon-volume-fill {
						display: none;
					}
				}
		
			}
		}
		.business {
					display: flex;
					flex-direction: row;
					padding: 26px 16px 21px 16px;
		border-top: 0.5px solid #F5F6F7;
					.message {
						display: flex;
						flex-direction: column;
						width: 100%;
		
						.message_font {
							font-size: 13px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #565759;
							margin-top: 7px;
						}
		
						.name {
							display: flex;
							flex-direction: row;
							align-items: center;
		
							.font {
								font-size: 16px;
								font-family: PingFang SC;
								font-weight: bold;
								color: #3A3B3D;
							}
		
							.order {
		
								min-width: 17px;
								width: auto;
								height: 14px;
								padding: 0 5px;
								height: 14px;
								background: linear-gradient(0deg, #E7312C, #F75F4B);
								border-radius: 7px 7px 7px 0px;
								font-size: 11px;
								font-family: DINPro;
								font-weight: 400;
								color: #FFFFFF;
								text-align: center;
								line-height: 14px;
								margin-left: 7px;
							}
						}
		
						.time {
							// height: 17px;
							font-size: 12px;
							font-family: DINPro;
							font-weight: 400;
							color: #A1A2A6;
						}
		
					}
				}
		.dataScreening {
			padding: 29px 16px 22px 16px;
			margin-top: 10px;
		
			.h1 {
				font-size: 18px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #303133;
		
			}
		
			.content {
				margin-top: 16px;
					.child {
						width: 100%;
						height: 78px;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						padding-top: 13px;
						padding-left: 21px;
						padding-right: 16px;
						background: linear-gradient(90deg, #FFFFFF, #FAFCFC, #EDFDFD);
						border-radius: 3px;
						margin-bottom: 4px;
		
						.name {
							padding-top: 6px;
							display: flex;
							flex-direction: column;
							.figure {
								font-size: 21px;
								font-family: DINPro;
								font-weight: 500;
								color: #3A3B3D;
							}
							.writing {
								font-size: 12px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #87898C;
							}
						}
						.icon {
							width: 28px;
							height: 28px;
							image {
								width: 100%;
								height: 100%;
							}
						}
		
					}
				}
		}
	}
</style>

