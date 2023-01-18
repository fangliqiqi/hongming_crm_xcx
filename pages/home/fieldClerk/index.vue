<template>
	<view class="fieldClerkHomePage">
		<!-- 外勤办事员-首页 -->
		<view class="title bgfff">
			<view style="display: flex;">
				<image src="@/static/image/news.png" mode="widthFix" style="width: 92rpx; height: 62rpx;"/>
			</view>
			<view style="    position: absolute;
    left: 61px;
    width: 3px;
    height: 37PX;
    transform: rotate(10deg);
    background: #FFF;"></view>

			<view class="news">
				<!-- :duration="1500" :speed="200" -->
				<u-notice-bar type="primary"  :more-icon="true" :duration="3000" :speed="300" :list="informationList">

				</u-notice-bar>
			</view>

		</view>

		<view class="business bgfff" @click="taskClick">

			<view style="margin-right:13px">
				<image src="@/static/image/remind.png" mode="widthFix" style="width: 42px;height: 42px;" />
			</view>
			<view class="message">
				<view style="display: flex;flex-direction: row;justify-content: space-between;">
					<view lass="h2" class="name">
						<view class="font">任务进度提醒</view>
						<view class="order">{{fieldClerkByValue.tpSize||0}}</view>
					</view>
					<text class="time">
						{{fieldClerkByValue.taskProgress[0].deadline||''}}
					</text>

				</view>
				<view class="message_font" v-if="fieldClerkByValue.taskProgress.length!=0">
					{{fieldClerkByValue.taskProgress[0].companyName||''}}{{fieldClerkByValue.taskProgress[0].projectName?fieldClerkByValue.taskProgress[0].projectName+'的任务进度为'+(fieldClerkByValue.taskProgress[0].percentage>=0?fieldClerkByValue.taskProgress[0].percentage:0)+'%':''}}
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
							<!-- <navigator url="/pageWq/fieldClerk/taskNumber/taskNumber" hover-class="none"> -->
								<!-- @click="taskNumber" -->
						<view class="child" @click="taskNumber" >
							<view class="name">
								<text class="figure">{{fieldClerkByValue.taskNumber||0}}</text>
								<text class="writing">任务数(个)</text>
							</view>
							<view class="icon">
								<image src="@/static/image/icon1.png" />
							</view>
						</view>
						<!-- </navigator> -->
					</u-col>
					<u-col span="6">
						<navigator url="/pageWq/fieldClerk/myClient/myClient" hover-class="none">
							<view class="child"
								style="background: linear-gradient(90deg, #FAFCFC, #EDFDFD) !important;">
								<view class="name">
									<text class="figure">{{fieldClerkByValue.clientNumber||0}}</text>
									<text class="writing">客户数(个)</text>
								</view>
								<view class="icon">
									<image src="@/static/image/icon2.png" />
								</view>
							</view>
						</navigator>
					</u-col>
					<u-col span="6">
						<!-- <navigator url="/pageWq/fieldClerk/taskEarlyWarning/taskEarlyWarning" hover-class="none"> -->
							<view class="child"
								style="background: linear-gradient(90deg, #FCFBFE, #F8F5FC) !important;" @click="taskData">
								<view class="name">
									<text class="figure">{{fieldClerkByValue.EWarningNumber||0}}</text>
									<text class="writing">预警任务(个)</text>
								</view>
								<view class="icon">
									<image src="@/static/image/icon3.png" />
								</view>
							</view>
						<!-- </navigator> -->
					</u-col>


				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['fieldClerkByValue','informationList'],
		data() {
			return {
				// informationList: ['既见君子', '云胡不喜'],
				taskProgress: [], //任务进度提醒数据
				deadline: new Date().toISOString().slice(0, 10), //消息展示时间

			};
		},
		onLoad(option) {
			this.getPageInfo();
		},
		methods: {
			getPageInfo() {
				
			},
			taskClick() {
				this.$u.route({
					type: 'reLaunch',
					url: "/pages/messageBox/messageBox"
				})
				// highSeas/highSeas
				// uni.navigateTo({
				//      url: "/pageWq/highSeas/highSeas",//跳转页面的路径+传值
				//     });
				// uni.navigateTo({
				//      url: "/pageWq/highSeas/highSeas?item=" +
				//       encodeURIComponent(JSON.stringify(contentObj)),//跳转页面的路径+传值
				//     });
			},
			// 点击任务
			taskNumber(){
				console.info('任务')
				// console.info(this.fieldClerkByValueArray)
				
				 uni.switchTab({
					 url: "/pages/missionBox/missionBox"
					 				});
				},
			// 点击任务预警
			taskData() {
				// var fieldClerkByValueArray=this.fieldClerkByValueArray
				uni.navigateTo({
					 url: "/pageWq/fieldClerk/taskNumber/taskNumber"
				});
			}
		},
		onReachBottom() {
			this.getPageInfo()
		}
	}
</script>

<style lang="scss" >
	.fieldClerkHomePage{
		.title {
			padding: 10px 16px 10px 16px;
			display: flex;
			position: relative;
		
			.news {
				width: 100%;
		padding-right: 58rpx;
				.u-type-primary-light-bg {
					height: 31px !important;
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