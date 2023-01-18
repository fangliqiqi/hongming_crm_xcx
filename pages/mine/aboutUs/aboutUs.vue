<template>
	<view class='aboutUs'>
		<!-- 关于我们 -->
		<view class='aboutUs_content'>
		<view class="aboutUs_child">
			<view class="child_name" @click="agreement">协议</view>
			<image class="child_Rimage" src="@/static/image/jiantou.png" ></image>
		</view>
		<view class="aboutUs_child">
			<view class="child_name">版本号</view>
			<image class="child_Rimage" src="@/static/image/jiantou.png" ></image>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				}
				},
				methods:{
					// 协议
					agreement(){
						console.info('协议')
						uni.navigateTo({
						url: "/pages/mine/aboutUs/agreement/agreement"
						    });
					}
				}
				}
</script>

<style lang="scss" scoped>
	.aboutUs{
		border-top: 0.5px solid #EEEEEE;
		height: 100vh;
		background-color: #f7f8fa;
		.aboutUs_content{
			background-color: #FFFFFF;
			padding: 0 20px;
		.aboutUs_child{
			width: 100%;
			border-bottom: 0.5px solid #EEEEEE;
			height: 56px;
			display: flex;
			align-items: center;
			position: relative;
			
			
			.child_name{
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3A3B3D;
			
			}
			.child_Rimage{
				width: 8px;
				height: 14.5px;
				position: absolute;
				right: 0px;
			}
		}
		.aboutUs_child:last-child{
			border-bottom: 0px;
		}
		}
	}
</style>
