<template>
	<view class="toAuditRemind" >
		<!-- 待审核提醒 -->
		<view class="child" v-if="dataArray.lenght!= 0" v-for="(item,index) in dataArray" >
			<navigator :url="`/pageYwzg/executive/homePage/toAuditRemind/particulars/particulars?item=`+ encodeURIComponent(JSON.stringify(item))"  hover-class="navigator-hover">
			<text class="title">{{item.companyName?(item.companyName+'-'):''}}{{item.projectName}}</text>
			<view class="detail">
				<view class="decimal_data">申请人：{{item.applicant}}</view>
				<view class="decimal_btn">
					<text class="name">查看详情</text>
					<u-icon name="arrow-right" color="#4d84e4" size="25"></u-icon></view>
			</view>
			</navigator>
		</view>
		<view v-if="dataArray.length==0" class="child">抱歉暂无消息</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				dataArray:[],

	
			}
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.dataArray = item
		}
		}
</script>

<style lang="scss">
	.toAuditRemind{
		border-top: 0.5px solid #EEEEEE;
		background-color: #FFFFFF;
		width: 100%;
		.child{
			border-bottom: 0.5px solid #EEEEEE;
			display: flex;
			flex-direction: column;
			padding-top: 19px;
			padding-bottom: 19px;
			margin-left: 16px;
			margin-right: 16px;
			.title{
				// width: 100%;
				// font-size: 16px;
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3A3B3D;
				
				margin-bottom: 10px;
				 white-space :nowrap;
				text-overflow:ellipsis;
				overflow: hidden;
			}
			.detail{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.decimal_data{
					font-size: 14px;
					font-family: DINPro;
					font-weight: 400;
					color: #6E7073;
				}
				.decimal_btn{
					display: flex;
					.name{
					font-size: 12px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #4d84e4;
					}
				}
			}
		}
	.child:last-child{
		border: 0px;
	}
	}
</style>
