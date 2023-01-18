<template>
	<view class="particulars">
		<!-- 待审核提醒-详情 -->
	<!-- 	<view class="head" @click="previousPage">
			<u-icon name="arrow-left" color="#000000" size="42"></u-icon>
			<text class="head_title">详情</text>
		</view> -->
		<view class="content">
			<view class="reason">
				<view class="title">申请理由</view>
				<view class="font">{{contentObj.reason}}</view>
			</view>
			<view class="reason">
				<view class="title">申请人</view>
				<view class="font">{{contentObj.applicant}}</view>
			</view>
		</view>
	<view class="bottom">
		<view class="bottom_box">
			<button class="reject" @click="reject()">驳回</button>
			<button class="pass" @click="pass">通过</button>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataObj:{},
				contentObj:{}

	
			}
		},
	
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.dataObj = item
			this.getList()
		},
		methods: {
			previousPage() {
				uni.navigateBack()
			},
			getList() {
				var id=this.dataObj.orderId
				this.$u.get('/salespersonSupervisor/findSpecialApprovalDetails',{id:id}).then(resp => {
					this.contentObj=resp
					})
			},
			pass(){
				// status 20通过 30不通过
				var id=this.dataObj.orderId
				
				this.$u.post('/salespersonSupervisor/review',{id:id,status:20}).then(resp => {
					uni.navigateBack();
					})
			},
				reject(){
					
					var contentObj=this.contentObj
					uni.navigateTo({
					                url: "/pageYwzg/executive/homePage/toAuditRemind/particulars/reject/reject?item=" + encodeURIComponent(JSON.stringify(contentObj)),
					            });
					}
		},
		onReachBottom(){
			this.getList()
		}
		}
</script>

<style lang="scss">
	.particulars{
		position: relative;
		height: 100vh;
		padding-top: 10.5px;
				width: 100%;
		.content{
			background-color: #FFFFFF;
			padding-left: 18px;
			padding-right: 18px;
			padding-top: 18px;
			// margin: 10.5px 12px;
			margin-left: 12px;
			margin-right: 12px;
			padding-bottom: 10.5px;
			.reason{
				padding-bottom: 19px;
				.title{
					font-size: 15px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #6E7073;
					margin-bottom: 6px;
				}
				.font{
					font-size: 18px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D;
					line-height: 25px
				}
			}
		}
	.bottom{
		width: 100%;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 0px;
		padding:10.5px 15.5px 44.5px;
		.bottom_box{
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 45px;
			// background: #3978E7;
			border-radius:22.5px;
			border: 1px solid #3978E7;
			justify-content: space-between;
			.reject{
				width: 50%;
				line-height: 45px;
				border-radius: 22.5px 0px 0px 22.5px ;
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3978E7;
			}
			.pass{
				width: 50%;
				line-height: 45px;
				border-radius:0px 22.5px 22.5px 0px;
				background: #3978E7;
				color: #FFFFFF;
				font-family: PingFang SC;
				font-weight: 500;
			}
		}
	}
	}
</style>
