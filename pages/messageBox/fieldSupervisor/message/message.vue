<template>
	<view class="fieldSupervisorMessage">
		<view class="child" v-for="(item,index) in fieldSupervisorMessageByValue" >
			<text class="title">{{item.msg}}</text>
			<view class="detail">
				<view class="decimal_data">{{item.sendDate}}</view>
				<view class="decimal_btn" v-if="item.projectId!=''" @click="particulars(item)">查看详情<u-icon name="arrow-right" color="#4d84e4" size="28"></u-icon></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		  name:'fieldSupervisorMessage',
		  props:['fieldSupervisorMessageByValue'],
			data() {
				return {
					messageList:[{title:'工商注册特殊价格申请待审批',data:'2021-05-06'},
					{title:'工商注册特殊价格申请待审批工商注册特殊价格申请待审批',data:'2021-05-06'},
					{title:'工商注册特殊价格申请待审批',data:'2021-05-06'}]
				}
				},
				methods:{
					previousPage(){
						uni.navigateBack()
					},
					// 详情
					particulars(item){
						console.info('详情')
						var contentObj = item
						    uni.navigateTo({
						     // url: "/pages/fieldSupervisor/homePage/detailPage/detailPage?item=" +
						     //  encodeURIComponent(JSON.stringify(contentObj)),//跳转页面的路径+传值
							 url: "/pageWqzg/fieldSupervisor/homePage/detailPage/detailPage?item=" +
							  encodeURIComponent(JSON.stringify(contentObj)),//跳转页面的路径+传值
						    });
					}
					}
					
				}
</script>

<style lang="scss">
	.fieldSupervisorMessage{
		background-color: #FFFFFF;
		position: relative;
		padding-bottom: 0px;
		border-top: 0.5px solid #EEEEEE;
		.child{
			padding-left: 16px;
			padding-right: 16px;
			border-bottom: 0.5px solid #EEEEEE;
			display: flex;
			flex-direction: column;
			padding-top: 19px;
			padding-bottom: 19px;
			
			.title{
				// width: 100%;
				// font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3A3B3D;
				margin-bottom: 10px;
				//  white-space :nowrap;
				// text-overflow:ellipsis;
				// overflow: hidden;
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
