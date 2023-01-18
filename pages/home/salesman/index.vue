<template>
	<view class="salesmanHomePage">
		<!-- 业务员首页 -->
		<view>
			<view class="title bgfff">
				<view>
					<image src="@/static/image/news.png" mode="widthFix" style="width: 46px;height: 31px;" />
				</view>
				<view style="position: absolute;
		left: 61px;
		width: 3px;
		height: 30px;
		transform: rotate(10deg);
		background: #FFF;">
				</view>
				<view class="news">
					<u-notice-bar type="primary"  :list="ywyInformationList" color='#303133' :volume-icon='false' :more-icon='false' style="width: calc(100vw - 88px);">
					</u-notice-bar>
					<u-icon name="arrow-right" color="#999999" size="26"></u-icon>
				</view>
			</view>
		</view>
		<navigator :url="`/pageYwy/clientFollowUpRemind/clientFollowUpRemind?item=`+ encodeURIComponent(JSON.stringify(salesmanByValueList.followUp))"  hover-class="navigator-hover">
			<view class="business bgfff">

				<view style="margin-right:13px">
					<image src="@/static/image/remind.png" mode="widthFix" style="width: 42px;height: 42px;" />
				</view>
				<view class="message">
					<view style="display: flex;flex-direction: row;justify-content: space-between;" class="">
						<view lass="h2" class="name">
							<view class="font">客户跟进提醒</view>
							<view class="order" v-if="salesmanByValueList.followNumber>0">{{salesmanByValueList.followNumber||''}}</view>
						</view>
						<text class="time">
							{{salesmanByValueList.followUp.time||""}}
						</text>
					</view>
					<view class="message_font">
						{{salesmanByValueList.followUp.companyName?salesmanByValueList.followUp.companyName+'客户跟进提醒':""}}
					</view>
				</view>
			</view>
			</navigator>
			<navigator :url="`/pageYwy/salesman/homePage/auditDefeatedRemind/auditDefeatedRemind?item=`+ encodeURIComponent(JSON.stringify(salesmanByValueList.auditFailure))"  hover-class="navigator-hover">
			
			<view class="business bgfff">
				<view style="margin-right:13px">
					<image src="@/static/image/daishenhe.png" mode="widthFix" style="width:42px;height: 42px;" />
				</view>
				<view class="message">
					<view style="display: flex;flex-direction: row;justify-content: space-between;" class="">
						<view lass="h2" class="name">
							<view class="font">审核失败提醒</view>
							<view class="order" v-if="salesmanByValueList.auditFailureNumber>0">{{salesmanByValueList.auditFailureNumber||""}}</view>
						</view>
						<text class="time">
							{{salesmanByValueList.auditFailure[0].map.time||""}}
						</text>
			
					</view>
					<view class="message_font">
						{{salesmanByValueList.auditFailure[0].map.companyName?salesmanByValueList.auditFailure[0].map.companyName:""}}{{salesmanByValueList.auditFailure[0].map.name?salesmanByValueList.auditFailure[0].map.name + '审核失败':""}}
					</view>
				</view>
			</view>
			</navigator>
			<navigator :url="`/pageYwzg/executive/homePage/abnormalOrders/abnormalOrders?item=`+ encodeURIComponent(JSON.stringify(salesmanByValueList.abnormalOrder))"  hover-class="navigator-hover">
			<view class="business bgfff">
				<view style="margin-right:13px">
					<image src="@/static/image/yichangdingdan.png" mode="widthFix" style="width:84rpx;height:84rpx;" />
				</view>
				<view class="message">
					<view style="display: flex;flex-direction: row;justify-content: space-between;" class="">
						<view lass="h2" class="name">
							<view class="font">异常订单提醒</view>
							<view class="order"  v-if="salesmanByValueList.abnormalOrderNumber>0">{{salesmanByValueList.abnormalOrderNumber||""}}</view>
						</view>
						<text class="time">
						{{salesmanByValueList.abnormalOrder[0].map.time||""}}
						</text>
			
					</view>
					<view class="message_font">
						{{salesmanByValueList.abnormalOrder[0].map.companyName?salesmanByValueList.abnormalOrder[0].map.companyName:""}}{{salesmanByValueList.abnormalOrder[0].map.orderNumber?salesmanByValueList.abnormalOrder[0].map.orderNumber + '异常订单提醒':""}}
					</view>
				</view>
			</view>
			</navigator>
			<navigator :url="`/pageYwzg/executive/homePage/renewClientRemind/renewClientRemind?item=`+ encodeURIComponent(JSON.stringify(salesmanByValueList.renewCustomer))"  hover-class="navigator-hover">
			<view class="business bgfff">
				<view style="margin-right:13px">
					<image src="@/static/image/xuqian.png" mode="widthFix" style="width:84rpx;height:84rpx;" />
				</view>
				<view class="message">
					<view style="display: flex;flex-direction: row;justify-content: space-between;" class="">
						<view lass="h2" class="name">
							<view class="font">续签客户提醒</view>
							<view class="order" v-if="salesmanByValueList.renewCustomerNumber>0">{{salesmanByValueList.renewCustomerNumber||""}}</view>
						</view>
						<text class="time">
							<!-- {{salesmanByValueList.renewCustomer[0].time||""}} -->
						</text>
			
					</view>
					<view class="message_font">
						{{salesmanByValueList.renewCustomer[0].map.companyName?salesmanByValueList.renewCustomer[0].map.companyName:""}}
						{{salesmanByValueList.renewCustomer[0].map.projectName?salesmanByValueList.renewCustomer[0].map.projectName:''}}
						{{salesmanByValueList.renewCustomer[0].map.time?'于' + salesmanByValueList.renewCustomer[0].map.time +'到期':''}}
						<!-- {{salesmanByValueList.renewCustomer[0].projectName?salesmanByValueList.renewCustomer[0].projectName +'续签提醒':""}} -->
					</view>
				</view>
			</view>
		</navigator>
		<navigator :url="`/pageYwzg/executive/homePage/highSeas/highSeas?item=`+ encodeURIComponent(JSON.stringify(highSeasByValue))"  hover-class="navigator-hover">
		
		<view class="business bgfff">
			<view style="margin-right:13px">
				<image src="@/static/image/gonghaixiaoxi.png" mode="widthFix" style="width:84rpx;height:84rpx;" />
			</view>
			<view class="message">
				<view style="display: flex;flex-direction: row;justify-content: space-between;" class="">
					<view lass="h2" class="name">
						<view class="font">公海消息提醒</view>
						<view class="order" v-if="highSeasByValue.length!=0">{{highSeasByValue.length||""}}</view>
					</view>
					<text class="time">
					{{highSeasByValue[0].readDate||""}}
					</text>
		
				</view>
				<view class="message_font">
					{{highSeasByValue[0].msg||""}}
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
						<navigator url="/pageYwy/salesman/homePage/commercialOpportunity/commercialOpportunity" hover-class="none">
							<view class="child"
								style="background: linear-gradient(90deg, #FFFFFF, #FCFAFC, #FDF4FD) !important;">
								<view class="name">
									<text class="figure">{{salesmanByValue.businessNumber||0}}</text>
									<text class="writing">商机个数(个)</text>
								</view>
								<view class="icon">
									<image src="@/static/image/icon10.png" />
								</view>
							</view>
						</navigator>
					</u-col>
					<u-col span="6">
						<navigator url="/pageYwy/salesman/homePage/client/client" hover-class="none">
							<view class="child"
								style="background: linear-gradient(90deg, #FFFFFF, #FAFCFC, #EDFDFD) !important;">
								<view class="name">
									<text class="figure">{{salesmanByValue.clientNumber||0}}</text>
									<text class="writing">客户数(个)</text>
								</view>
								<view class="icon">
									<image src="@/static/image/icon5.png" />
								</view>
							</view>
						</navigator>
					</u-col>
					<u-col span="6">
<!-- 						<navigator url="/pageYwzg/executive/homePage/thisMonth/thisMonth" hover-class="none">
 -->							<view class="child"
								style="background: linear-gradient(90deg, #FFFFFF, #FBFDFE, #EDF6FC) !important;">
								<view class="name">
									<text class="figure">{{salesmanByValue.turnover||0}}</text>
									<text class="writing">本月成交额(元)</text>
								</view>
								<view class="icon">
									<image src="@/static/image/icon9.png" />
								</view>
							</view>
						<!-- </navigator> -->
					</u-col>
					<u-col span="6">
						<view class="child" style="background: linear-gradient(90deg,  #FFFFFF, #FEFEFB, #FCFCF5) !important;">
							<view class="name">
								<text class="figure">{{salesmanByValue.awaitAssignedNumber||0}}</text>
								<text class="writing">本月任务进度(%)</text>
							</view>
							<view class="icon">
								<image src="@/static/image/icon8.png" />
							</view>
						</view>
						</u-col>
 				</u-row>
			</view>
		</view>
	<!-- </view> -->
	</view>
</template>

<script>
	export default {
		props:['salesmanByValue','salesmanByValueList','highSeasByValue','ywyInformationList'],
		data() {
			return {
				// informationList: ['六安新获得一条商机', '整体评分达99！'],
				// dataObject:{}
			}
		},
		
		onLoad() {

		},
		methods: {
			previousPage() {
				uni.navigateBack()
			},
		getList(){
		},
		message() {

		}
		},
		onReachBottom(){

		},
		watch:{
					salesmanByValue:{
					  handler (n,o) {
						console.info('改变了')
						console.info(this.salesmanByValue)
					  },
					  deep: true 
					},
				}


	}
</script>

<style lang="scss" scoped>
	
	.salesmanHomePage{
		padding-bottom: 80px;
		.title {
			padding: 10px 16px 10px 16px;
			display: flex;
			position: relative;
		
			.news {
				width: 100%;
				display: flex;
				justify-content: space-between;
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
		border-top: 1rpx solid #F5F6F7;
					.message {
						display: flex;
						flex-direction: column;
						width: 100%;
		
						.message_font {
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #565759;
							margin-top: 14rpx;
						}
		
						.name {
							display: flex;
							flex-direction: row;
							align-items: center;
		
							.font {
								font-size: 32rpx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #3A3B3D;
							}
		
							.order {
		
								min-width: 34rpx;
								width: auto;
								height: 28rpx;
								padding: 0 10rpx;
								height:28rpx;
								background: linear-gradient(0deg, #E7312C, #F75F4B);
								border-radius: 14rpx 14rpx 14rpx 0rpx;
								font-size: 22rpx;
								font-family: DINPro;
								font-weight: 400;
								color: #FFFFFF;
								text-align: center;
								line-height: 28rpx;
								margin-left: 14rpx;
							}
						}
		
						.time {
							// height: 17px;
							font-size: 24rpx;
							font-family: DINPro;
							font-weight: 400;
							color: #A1A2A6;
						}
		
					}
				}
		.dataScreening {
			padding: 29px 16px 22px 16px;
			margin-top: 20rpx;
		
			.h1 {
				font-size: 36rpx;
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

