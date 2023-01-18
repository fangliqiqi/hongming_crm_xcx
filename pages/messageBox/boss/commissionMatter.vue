<template>
	<view class="commissionMatter">
		<!-- 查看所有 -->
		<view class="child" v-for="(item,index) in bossCommissionMatterByValue">
			<text class="title">{{item.line}}{{item.type}}申请特殊审批</text>
			<view class="detail">
				<view class="decimal_data">
					<text class="ask">申请人:</text>
					<text class="reply">{{item.name}}</text>
				</view>
				<view class="decimal_btn">
					<view class="btn_font" @click="particulars(item)">查看详情 </view>
					
				<u-icon name="arrow-right" color="#4d84e4" size="28"></u-icon></view>
			</view>
		</view>
		<view v-if="bossByValue==0" class="child">暂无数据</view>
	</view>
</template>

<script>
	export default {
		  props:['bossCommissionMatterByValue','bossByValue'],
			data() {
				return {
					// num:bossCommissionMatterByValue.lenght
				}
				},
				onLoad(option) {
					// this.getList();
				},
				onShow(){
					// this.getList();
					
				},
				methods:{
					// getList(){
					// },
					particulars(item){
						var byValue=item
						uni.navigateTo({
						     url: "/pages/boss/homePage/commissionMatter/particulars/particulars?byValue=" +
      encodeURIComponent(JSON.stringify(byValue)),//跳转页面的路径+传值
						    });
					}
	
					},
					onReachBottom() {
						this.getList()
					}
				}
</script>

<style lang="scss">
	.commissionMatter{
		background-color: #FFFFFF;
border-top: 0.5px solid #EEEEEE;
		.child{
			border-bottom: 0.5px solid #EEEEEE;
			display: flex;
			flex-direction: column;
			padding-top: 19px;
			padding-bottom: 19px;
			padding-left: 16px;
			padding-right: 16px;
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
					.ask{
					font-size: 14px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #6E7073;
					}
					.reply{
						font-size: 14px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #6E7073;
						margin-left: 10px;
						}
				}
				.decimal_btn{
					display: flex;
					flex-direction: row;
					.btn_font{
						font-size: 12px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #4d84e4;
					}
				}
			}
		}
			
		}
</style>
