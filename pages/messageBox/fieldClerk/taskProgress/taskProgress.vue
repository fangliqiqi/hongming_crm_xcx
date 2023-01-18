<template>
	<view class="message">
		<!-- 外勤办事员---任务进度提醒 -->
		<view class="child" v-for="(item,index) in fieldClerkTaskProgress">
			<text class="title">{{item.companyName}}的{{item.projectName}}任务进度为{{item.percentage||0}}%</text>
			<view class="detail">
				<view class="decimal_data">{{item.deadline}}</view>
				<!-- <view class="decimal_data">{{parseTime(item.deadline, "{y}-{m}-{d}")}}</view> -->
				<navigator :url="`/pageWq/fieldClerk/missionDetails/missionDetails?item=`+ encodeURIComponent(JSON.stringify(item))"  hover-class="navigator-hover">
				<view class="decimal_btn" >查看详情 <u-icon name="arrow-right" color="#4d84e4" size="28"></u-icon></view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		  props:['fieldClerkTaskProgress'],
			data() {
				return {
					tpSize: 0, //任务进度提醒数
					EWarningNumber: 0, //预警任务数
					clientNumber: 0, //客户数
					taskNumber: 0, //任务数
					deadline: new Date().toISOString().slice(0, 10), //消息展示时间
				}
				},
				onLoad(option) {
					this.getPageInfo();
				},
				methods:{
					previousPage(){
						uni.navigateBack()
					},
					getPageInfo() {
				},
				
				},
				}
</script>

<style lang="scss">
	.message{
		border-top: 0.5px solid #EEEEEE;
		background-color: #FFFFFF;
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
					font-size: 12px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #4d84e4;
				}
			}
		}
	}
</style>
