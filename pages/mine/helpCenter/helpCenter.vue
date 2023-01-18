<template>
	<view class='helpCenter'>
		<!-- 关于我们 -->
		<view class='helpCenter_content'>
		<view class="helpCenter_child">
			<view class="child_name">修改登录密码</view>
			<image class="child_Rimage" src="@/static/image/jiantou.png" ></image>
		</view>
		<view class="helpCenter_child">
			<view class="child_name">怎么联系客服？</view>
			<image class="child_Rimage" src="@/static/image/jiantou.png" ></image>
		</view>
		<view class="helpCenter_child">
			<view class="child_name">找不到服务的订单？</view>
			<image class="child_Rimage" src="@/static/image/jiantou.png" ></image>
		</view>
		<view class="helpCenter_child">
			<view class="child_name">忘记登录密码怎么办？</view>
			<image class="child_Rimage" src="@/static/image/jiantou.png" ></image>
		</view>
	</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.helpCenter{
		border-top: 0.5px solid #EEEEEE;
		height: 100vh;
		background-color: #f7f8fa;
		.helpCenter_content{
			background-color: #FFFFFF;
			padding: 0 20px;
		.helpCenter_child{
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
		.helpCenter_child:last-child{
			border-bottom: 0px;
		}
		}
	}
</style>
