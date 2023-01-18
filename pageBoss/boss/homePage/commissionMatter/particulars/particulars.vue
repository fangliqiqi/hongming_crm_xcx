<template>
	<view class="particulars">
		<!-- 详情 -->
		<view class="head" @click="previousPage">
			<u-icon name="arrow-left" color="#000000" size="42"></u-icon>
			<text class="head_title">详情</text>
		</view>
		<view class="content">
		<view class="contentOn">
			<view class="contentOnAsk">申请理由</view>
			<view class="contentOnReply">{{messageList.reason}}</view>
			<view class="contentOnAsk">申请人</view>
			<view class="contentOnReply">{{messageList.applicant}}</view>
		</view>
		</view>
		<view class="flow">
			<view class="flow_content">
				<view class="flow_content_title">流程</view>
				<view class="flow_content_child" v-for="(item,index) in messageList.flow">
					<view class="box">
					<view class="child_left">
						{{item.auditName}}
					<view class="child_left_icon not"  v-if="item.status==10">
						
						<!-- <icon type="success_no_circle" size="9" color='#fff'/> -->
					</view>
					<view class="child_left_icon"  v-else-if="item.status==20">
						<icon type="success_no_circle" size="9" color='#fff'/>
					</view>
					<view class="child_left_icon"  v-else-if="item.status==30">
						<icon type="success_no_circle" size="9" color='#fff'/>
					</view>
					<view class="child_left_icon  none"  v-else>
						<!-- ... -->
						<icon type="icon-more" size="9" color='#fff'/>
						<!-- <u-icon name="more" color="#000000" size="42"></u-icon> -->
					</view>
					</view>
					<view class="child_right">
						<view class="child_right_ask">审批{{item.templateName}}-{{item.auditName}}</view>
						<view class="child_right_state">
							<text class="state_ask">审批状态:</text>
							<text class="state_price" v-if="item.status==10">审批中</text>
							<text class="state_price" v-if="item.status==20">通过</text>
							<text class="state_price" v-if="item.status==30">审批失败</text>
							<text class="state_price" v-else>待审核</text>
							</view>
					</view>
				</view>
				<view class="link" :style="item.status==20? 'border-left:3px solid #E1E1E1':''"></view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="reject" @click="turnDown">驳回</view>
			<view class="pass" @click="pass">通过</view>
		</view>
	</view>
</template>

<script>
	export default {
		  
			data() {
				return {
					byValue:{},
					messageList:[],
					
				}
				},
				
				onLoad(option) {
					const byValue = JSON.parse(decodeURIComponent(option.byValue));
					this.byValue = byValue
					this.getList()
					console.info('详情')
					console.info(byValue)
				},
				methods:{
					getList(){
						var id=this.byValue.id
						this.$u.get('/boss/selectAuditRecord',{id:id}).then(resp => {
							
							this.messageList=resp
											
							})
					},
					previousPage(){
						uni.navigateBack()
					},
					turnDown(){
						console.info('点击跳转')
						console.info(this.byValue)
						var byValue=this.byValue
						uni.navigateTo({
						     url: "/pages/boss/homePage/commissionMatter/particulars/turnDown/turnDown?byValue=" +
						encodeURIComponent(JSON.stringify(byValue)),//跳转页面的路径+传值
						    });
					},
					pass(){
						var id=this.byValue.id
						this.$u.post('/boss/auditHPOrderTaxation',{id:id,status:20}).then(resp => {
							uni.navigateBack();
							})
						}
				},
				onReachBottom() {
					this.getList()
				}
				}
</script>

<style lang="scss">
	.particulars{
		position: relative;
		height: 100vh;
		.head{
			background-color: #FFFFFF;
			width: 100%;
			padding-left: 14px;
			text-align: left;
			padding-top: 52px;
			padding-bottom: 13px;
			display: flex;
			flex-direction: row;
			.arrow-left{
				
			}
			.head_title{
				font-family: PingFang SC;
				font-weight: bold;
				color: #000000;
				font-size: 18px;
				margin-left: 3px;
			}
		}
	
	.content{
		width: 100%;
		padding-top: 10px;
		padding-left: 12px;
		padding-right: 12px;
	.contentOn{
		width: 100%;
		background-color: #FFFFFF;
		padding-left: 18px;
		padding-right: 14.5px;
		padding-bottom: 24px;
		margin-bottom: 10px;
		.contentOnAsk{
			font-size: 15px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #6E7073;
			padding-top: 20px;
			padding-bottom: 6px;
		}
		.contentOnReply{
			width: 100%;
			font-size: 18px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #3A3B3D;
			line-height: 25px;
		}
	}
	}
	.flow{
		width: 100%;
		padding-left: 12px;
		padding-right: 12px;
		.flow_content{
			idth: 100%;
			padding-left: 18px;
			padding-right: 14.5px;
			background-color: #FFFFFF;
			padding-top: 20px;
			padding-bottom: 26px;
			.flow_content_title{
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3A3B3D;
				margin-bottom: 26.5px;
				}
				.flow_content_child{
					.box{
					display: flex;
					flex-direction: row;
					align-items: center;
					.child_left{
						width: 41px;
						height: 41px;
						background: #F1F8FF;
						border-radius: 3px;
						font-size: 14px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #738DBB;
						position: relative;
						margin-right: 17.5px;
						.child_left_icon{
							width:15px;
							height: 15px;
							background: #2DD199;
							border-radius: 50%;
							position: absolute;
							right: -3px;
							bottom: 0px;
							display: flex;
							align-items: center;
							justify-content:space-around;
						}
					.not{
						width: 16px;
						height: 16px;
						line-height: 16px;
						border-radius: 50%;
						background-color: #F3A35F;
						border: 2px solid #fff;
						
					}
					.none{
						background-color: #E1E1E1;
					}
					}
					.child_right{
						.child_right_ask{
							font-size:17px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #3A3B3D;
							line-height: 1;
							margin-bottom: 8px;
						}
						.child_right_state{
							.state_ask{
								font-size: 15px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #6E7073;
								
								}
								.state_price{
									font-size: 15px;
									font-family: PingFang SC;
									font-weight: 500;
									color: #6E7073;
									margin-left: 10px;
									}
							}
					}
					
					}
					.link{
						height: 35px;
						width: 100%;
						border-left: 3px dashed #E1E1E1;
						margin-left: 17.5px;
						// margin-top: 5px;
						// margin-bottom: 5px;
					}
					}
		}
	.flow_content_child:last-child{
		.link{
			height: 0px;
		}
	}
	}
	.bottom{
		width: 100%;
		padding-top: 10.5px;
		padding-bottom: 44.5px;
		padding-left: 10.5px;
		padding-right: 10.5px;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		position: absolute;
		bottom: 0px;
		left: 0px;
		.reject{
			width: 50%;
			height: 45px;
			line-height: 45px;
			text-align: center;
			background: #FFFFFF;
			border: 0.5px solid #3978E7;
			border-radius: 25.5px 0px 0px 25.5px;
			font-size: 16px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #3978E7;
		}
		.pass{
			width: 50%;
			height: 45px;
			line-height: 45px;
			text-align: center;
			background: #3978E7;
			border-radius: 0px 25.5px 25.5px 0px;
			font-size: 16px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
	}
</style>
