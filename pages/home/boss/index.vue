<template>
	<view class="bossHomePage">
		<view class="title bgfff">
				<view>
					<image src="@/static/image/news.png" mode="widthFix" style="width: 46px;height: 31px;" />
				</view>
				<view style="    position: absolute;
		left: 61px;
		width: 3px;
		height: 31PX;
		transform: rotate(10deg);
		background: #FFF;">
				</view>
				<view class="news">
					<u-notice-bar type="primary" :more-icon="true" :list="informationList">
					</u-notice-bar>
				</view>
			</view>
			<view class="slideshow">
				<view class="slideshow_content">
					<view class="slideshow_content_box" >
						<view class="content_top">
							<view class="content_top_title">
								<!-- <view class="name">待办事项</view> -->
								<image src="@/static/image/daibanshixiang.png" class="image"></image>
								<view class="icon">{{bossByValue.agentNumber||0}}</view>
							</view>
							<view class="content_top_link" @click="lookAll">查看所有</view>
						</view>
						<view class="content_box">
							<view class="content_box_child" v-for="(ite,inde) in bossDotList" :class="judge==inde?'show':''">
								<!-- <view class="content_box_childBox" v-for="(item,index) in bossByValue.agentList"> -->
								<view class="content_box_childBox" v-for="(item,index) in ite" >
							<view class="child_font">{{item.line||''}}{{item.type?item.type +'申请特殊审批':''}}</view>
							<view class="child_name">---{{item.name||''}}</view>
							</view>
						</view>
						</view>
					</view>
					<view class="slideshow_content_list">
						<!-- <view class="list_icon" v-for="(item,index) in bossByValue.agentList"></view> -->
						<view class="list_icon" v-for="(item,index) in bossDotList" :class="judge==index?'bag':''" @click="judge=index"></view>
					</view>
				</view>
			</view>
			<!-- <view class="dataOverview">
				<view class="dataOverviewTitle">数据总览</view>
			</view> -->
			<view class="dataScreening">
				<text class="h1">
					数据总览
				</text>
				<view class="content">
					<u-row gutter="8">
						<u-col span="6">
							<!-- <navigator url="/boss/homePage/clientNumber/clientNumbe" hover-class="none"> -->
								<view class="child" @click="clientNumber"
									style="background: linear-gradient(90deg, #FFFFFF, #FAFCFC, #EDFDFD) !important;">
									<view class="name">
										<text class="figure">{{bossByValue.clientNumber||0}}</text>
										<text class="writing">客户数(个)</text>
									</view>
									<view class="icon">
										<image src="@/static/image/icon11.png" />
									</view>
								</view>
							<!-- </navigator> -->
						</u-col>
						<u-col span="6">
							<navigator url="/pageBoss/boss/homePage/orderQuantity/orderQuantity" hover-class="none">
								<view class="child" style="background: linear-gradient(90deg, #FFFFFF, #FCFAFC, #FDF4FD) !important;"
									>
									<view class="name">
										<text class="figure">{{bossByValue.orderNumber||0}}</text>
										<text class="writing">订单数(个)</text>
									</view>
									<view class="icon">
										<image src="@/static/image/icon12.png" />
									</view>
								</view>
							</navigator>
						</u-col>
						<u-col span="6">
							<navigator url="/pageBoss/boss/homePage/income/income" hover-class="none">
								<view class="child"
									style="background: linear-gradient(90deg, #FFFFFF, #FBFDFE, #EDF6FC) !important;">
									<view class="name">
										<text class="figure">{{bossByValue.incomeNumber||0}}</text>
										<text class="writing">收入额(元)</text>
									</view>
									<view class="icon">
										<image src="@/static/image/icon9.png" />
									</view>
								</view>
							</navigator>
						</u-col>
						<u-col span="6">
							<navigator url="/pageBoss/boss/homePage/expenditure/expenditure" hover-class="none">
							<view class="child" style="background: linear-gradient(90deg,  #FFFFFF, #FEFEFB, #FCFCF5) !important;">
								<view class="name">
									<text class="figure">{{bossByValue.expenditureNumber||0}}</text>
									<text class="writing">支出(元)</text>
								</view>
								<view class="icon">
									<image src="../../../static/image/icon13.png" />
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
		props:['bossByValue','bossDotList'],
		data() {
			return {
				informationList: ['六安新获得一条商机', '整体评分达99！'],
				judge:0,
				}
				},
				onLoad() {
					// this.getList();
				},
				methods:{
					// getList(){
					// },
					clientNumber(){
						 uni.navigateTo({
						     url: "/pageBoss/boss/homePage/clientNumber/clientNumber",
						    });
					},
					lookAll(){
						var byValue = this.bossByValue.agentList
								uni.switchTab({
							 url:"/pages/messageBox/messageBox"
						    });
						},
						switchover(index){
							console.info('切换')
							console.info(index)
						}
				},
				onReachBottom(){
					// this.getList()
				}
				}
</script>

<style lang="scss" >
	.bossHomePage{
		
		.title {
			padding: 10px 16px 10px 16px;
			display: flex;
			position: relative;
		
			.news {
				width: calc(100% - 34px);
		
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
		.slideshow{
			padding-left: 18px;
			padding-right: 18px;
			padding-top: 14px;
			// height: 204px;
			.slideshow_content{
				width: 100%;
				height: 100%;
				background: #4A6FE1;
				border-radius: 5px;
				position: relative;
				.slideshow_content_list{
					// position: absolute;
					bottom: 0px;
					width: 100%;
					height: 24px;
					background: #4061C2;
					border-radius: 0px 0px 5px 5px;
					padding-left: 20px;
					    padding-right: 20px;
					
					display: flex;
					justify-content: flex-end;
					align-items: center;
					.list_icon{
						width: 8px;
						height: 8px;
						border-radius: 50%;
						background-color: #899ed9;
						margin-left: 5px;
					}
					.bag{
						width: 24px;
						height: 8px;
						background: #FFFFFF;
						border-radius: 4px;
					}
				}
				.slideshow_content_box{
					
					padding-left: 20px;
					padding-right: 20px;
					.content_top{
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;
						padding-top: 17.5px;
						padding-bottom: 17.5px;
						border-bottom: 0.5px dashed  #f5f6f7 ;
						.content_top_title{
							display: flex;
							flex-direction: row;
							.image{
								width: 71px;
								height: 16.5px;
							}
							.icon{
								width: 17px;
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
						.content_top_link{
							width:68px;
							height: 22px;
							line-height: 22px;
							text-align: center;
							background: #FFFFFF;
							border-radius: 11px;
							font-size: 12px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #3978E7;
						}
					}
				.content_box{
					display: flex;
					height: 130px;
				.content_box_child{
					width: 100%;
					display:none;
					padding-top: 12px;
					padding-bottom: 12px;
					height: 128px;
					overflow: hidden;
					.content_box_childBox{
						display: flex;
						padding-left: 10px;
						position: relative;
						padding-top: 8px;
						padding-bottom: 8px;
						// justify-content: space-between;
						&::before{
							content: '';
							position: absolute;
							top: 15px;
							left: 0px;
							width: 0;
							    height: 0;
							    border-left: 5px solid #ECCC91;
							    border-top: 3px solid transparent;
							    border-bottom: 3px solid transparent;
						}
					
					.child_font{
						font-size: 14px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						max-width: 200px;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					.child_name{
						font-size: 12px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #f5f6f7;
						margin-left: 10px;
					}
					}
				}
				.show{
					display: block;
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