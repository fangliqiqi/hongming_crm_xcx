<template>
	<view class="myBalance">
		<!-- 我的余额 -->
		<view class="myBalance_content">
			<view class="content_child">
				<view class="child_name">冻结余额</view>
				<view class="child_money">{{dataObj.freezeBalance||0}}元</view>
			</view>
			<view class="content_child">
				<view class="child_name">可以余额</view>
				<view class="child_money">{{dataObj.availableBalance||0}}元</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data (){
			return{
				companyId:uni.getStorageSync('companyData').id,
				dataObj:{},
			}
		},
		onShow() {
			this.getList() 
		},
		methods:{
			getList() {
			this.$u.post('/client/findMyBalance',{companyId:this.companyId} ).then(response => {
				this.dataObj=response
				})
				},
		}
	}
</script>

<style lang="scss" scoped>
	.myBalance{
		height: 100vh;
		background-color: #f7f8fa;
		border-top: 0.5px solid #E6E7EB;
			.myBalance_content{
				background-color: #FFFFFF;
				padding-left: 20px;
				padding-right: 20px;
				.content_child{
					width: 100%;
					border-bottom: 0.5px solid #E6E7EB;
					display: flex;
					justify-content: space-between;
					height: 55.5px;
					line-height: 55.5px;
					.child_name{
						font-size: 16px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #3A3B3D;
					}
					.child_money{
						font-size: 16px;
						font-family: PingFang SC;
						font-weight: bold;
						color: #303133;
					}
				}
				.content_child:last-child{
					border-bottom: 0px;
				}
			}
		
	}
</style>
