<template>
	<view class="executiveHomePage">
		<!-- 业务主管 -->
		<view>
			<view class="title bgfff">
				<view style="display: flex;">
					<image src="@/static/image/news.png" mode="widthFix" style="width: 92rpx; height: 62rpx;" />
				</view>
				<view style="position: absolute;
		left: 61px;
		width: 3px;
		height: 35PX;
		transform: rotate(10deg);
		background: #FFF;">
				</view>
				<view class="news">
					<!-- :speed="200" -->
					<u-notice-bar type="primary" :is-circular="true" :more-icon="true" :speed="200"  :list="informationList">
					</u-notice-bar>
				</view>
			</view>
		</view>
		<navigator
			:url="`/pageYwzg/executive/homePage/clientFollowUpRemind/clientFollowUpRemind?item=`+ encodeURIComponent(JSON.stringify(executiveByObj.followUp))"
			hover-class="navigator-hover">
			<view class="business bgfff">

				<view style="margin-right:13px">
					<image src="@/static/image/remind.png" mode="widthFix" style="width: 42px;height: 42px;" />
				</view>
				<view class="message">
					<view style="display: flex;flex-direction: row;justify-content: space-between;" class="">
						<view lass="h2" class="name">
							<view class="font">客户跟进提醒</view>
							<view class="order" v-if="executiveByObj.followNumber>0">{{executiveByObj.followNumber}}
							</view>
						</view>
						<text class="time">
							{{executiveByObj.followUp[0].time||""}}
						</text>

					</view>
					<view class="message_font">
						{{executiveByObj.followUp[0].companyName?executiveByObj.followUp[0].companyName +'客户跟进提醒':""}}
					</view>
				</view>

			</view>
		</navigator>
		<navigator
			:url="`/pageYwzg/executive/homePage/toAuditRemind/toAuditRemind?item=`+ encodeURIComponent(JSON.stringify(executiveByValue.auditFailure))"
			hover-class="navigator-hover">
			<view class="business bgfff">
				<view style="margin-right:13px">
					<image src="../../../static/image/daishenhe.png" mode="widthFix"
						style="width: 42px;height: 42px;" />
				</view>
				<view class="message">
					<view style="display: flex;flex-direction: row;justify-content: space-between;" class="">
						<view lass="h2" class="name">
							<view class="font">待审核提醒</view>
							<view class="order" v-if="executiveByValue.auditFailureNumber>0">
								{{executiveByValue.auditFailureNumber}}
							</view>
						</view>
						<text class="time">
							{{executiveByValue.auditFailure[0].time||""}}
						</text>

					</view>
					<view class="message_font">
						{{executiveByValue.auditFailure[0].orderNumber? '订单编号' + executiveByValue.auditFailure[0].orderNumber :''}}{{executiveByValue.auditFailure[0].applicant? '申请人' + executiveByValue.auditFailure[0].applicant :''}}
					</view>
				</view>
			</view>
		</navigator>
		<navigator
			:url="`/pageYwzg/executive/homePage/abnormalOrders/abnormalOrders?item=`+ encodeURIComponent(JSON.stringify(executiveByObj.abnormalOrder))"
			hover-class="navigator-hover">
			<view class="business bgfff">
				<view style="margin-right:13px">
					<image src="@/static/image/yichangdingdan.png" mode="widthFix"
						style="width: 42px;height: 42px;" />
				</view>
				<view class="message">
					<view style="display: flex;flex-direction: row;justify-content: space-between;" class="">
						<view lass="h2" class="name">
							<view class="font">异常订单提醒</view>
							<view class="order" v-if="executiveByObj.abnormalOrderNumber>0">
								{{executiveByObj.abnormalOrderNumber}}
							</view>
						</view>
						<text class="time">
							{{executiveByObj.abnormalOrder[0].time||''}}
							
						</text>
					</view>
					<view class="message_font">
						{{executiveByObj.abnormalOrder[0].companyName?executiveByObj.abnormalOrder[0].companyName:''}}{{executiveByObj.abnormalOrder[0].orderNumber?executiveByObj.abnormalOrder[0].orderNumber+'订单异常':''}}
						
					</view>
				</view>
			</view>
		</navigator>
		<navigator
			:url="`/pageYwzg/executive/homePage/renewClientRemind/renewClientRemind?item=`+ encodeURIComponent(JSON.stringify(executiveByObj.renewCustomer))"
			hover-class="navigator-hover">
			<view class="business bgfff">
				<view style="margin-right:13px">
					<image src="@/static/image/xuqian.png" mode="widthFix" style="width: 42px;height: 42px;" />
				</view>
				<view class="message">
					<view style="display: flex;flex-direction: row;justify-content: space-between;" class="">
						<view lass="h2" class="name">
							<view class="font">续签客户提醒</view>
							<view class="order" v-if="executiveByObj.renewCustomerNumber>0">
								{{executiveByObj.renewCustomerNumber}}
							</view>
						</view>
						<text class="time">
						{{executiveByObj.renewCustomer[0].map.time||''}}
						</text>

					</view>
					<view class="message_font">
						{{executiveByObj.renewCustomer[0].map.companyName?executiveByObj.renewCustomer[0].map.companyName:''}}{{executiveByObj.renewCustomer[0].map.projectName?executiveByObj.renewCustomer[0].map  .projectName+'续签客户':''}}
						
					</view>
				</view>
			</view>
		</navigator>
		<navigator :url="`/pageYwzg/executive/homePage/highSeas/highSeas?item=`+ encodeURIComponent(JSON.stringify(ZGhighSeasByValue))"  hover-class="navigator-hover">
		
		<view class="business bgfff">
			<view style="margin-right:13px">
				<image src="@/static/image/gonghaixiaoxi.png" mode="widthFix" style="width: 42px;height: 42px;" />
			</view>
			<view class="message">
				<view style="display: flex;flex-direction: row;justify-content: space-between;" class="">
					<view lass="h2" class="name">
						<view class="font">公海消息提醒</view>
						<view class="order" v-if="ZGhighSeasByValue.length!=0">{{ZGhighSeasByValue.length||""}}</view>
					</view>
					<text class="time">
					{{ZGhighSeasByValue[0].readDate||""}}
					</text>
		
				</view>
				<view class="message_font">
					{{ZGhighSeasByValue[0].msg||""}}
				</view>
			</view>
		</view>
		</navigator>
		<view class="dataScreening bgfff">
			<text class="h1">
				数据总览
			</text>
			<view class="content">
				<u-row gutter="8">
					<u-col span="6">
						<navigator url="/pageYwzg/executive/homePage/newCustomer/newCustomer" hover-class="none">
							<view class="child">
								<view class="name">
									<text class="figure">{{executiveByValue.addClientNumber||0}}</text>
									<text class="writing">新增客户(个)</text>
								</view>
								<view class="icon">
									<image src="@/static/image/icon7.png" />
								</view>
							</view>
						</navigator>
					</u-col>
					<u-col span="6">
						<view class="child"
							style="background: linear-gradient(90deg,  #FFFFFF, #FEFEFB, #FCFCF5) !important;">
							<view class="name">
								<text class="figure">{{executiveByValue.awaitAssignedNumber||0}}</text>
								<text class="writing">部门任务进度(%)</text>
							</view>
							<view class="icon">
								<image src="@/static/image/icon8.png" />
							</view>
						</view>
					</u-col>
					<u-col span="6">
						<navigator url="/pageYwzg/executive/homePage/thisMonth/thisMonth" hover-class="none">
							<view class="child"
								style="background: linear-gradient(90deg, #FFFFFF, #FBFDFE, #EDF6FC) !important;">
								<view class="name">
									<text class="figure">{{executiveByValue.turnover||0}}</text>
									<text class="writing">本月成交额(个)</text>
								</view>
								<view class="icon">
									<image src="@/static/image/icon9.png" />
								</view>
							</view>
						</navigator>
					</u-col>
					<u-col span="6">
						<view class="child"
							style="background: linear-gradient(90deg, #FFFFFF, #FCFAFC, #FDF4FD) !important;">
							<view class="name">
								<text class="figure">{{executiveByValue.myTurnoverNumber||0}}</text>
								<text class="writing">我的成交额(元)</text>
							</view>
							<view class="icon">
								<image src="@/static/image/icon10.png" />
							</view>
						</view>
					</u-col>
					<u-col span="6">
						<navigator url="/pageYwzg/executive/homePage/clientSum/clientSum" hover-class="none">
							<view class="child"
								style="background: linear-gradient(90deg, #FFFFFF, #FAFCFC, #EDFDFD) !important;">
								<view class="name">
									<text class="figure">{{executiveByValue.clientNumber||0}}</text>
									<text class="writing">客户总数(个)</text>
								</view>
								<view class="icon">
									<image src="@/static/image/icon5.png" />
								</view>
							</view>
						</navigator>
					</u-col>
					<u-col span="6">
						<navigator url="/pageYwzg/executive/homePage/myClient/myClient" hover-class="none">
							<view class="child"
								style="background: linear-gradient(90deg, #FFFFFF, #FAFCFC, #EDFDFD) !important;">
								<view class="name">
									<text class="figure">{{executiveByValue.myCustomersNumber||0}}</text>
									<text class="writing">我的客户数(个)</text>
								</view>
								<view class="icon">
									<image src="../../../static/image/icon6.png" />
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
		props: ['executiveByValue','executiveByObj','ZGhighSeasByValue','informationList'],
		data() {
			return {
				// informationList: ['六安新获得一条商机', '整体评分达99！'],
			}
		},
	}
</script>
<style lang="scss" >
	.u-notice-box{
		display: flow-root !important;
	}
	.executiveHomePage{
		padding-bottom: 80px;
		
		.row-notice--u-notice-box{
			display: flow-root !important;
		}
		
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
					.u-direction-row{
						color: pink;
						.u-notice-box{
							color: pink;
							display: flow-root !important;
						}
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