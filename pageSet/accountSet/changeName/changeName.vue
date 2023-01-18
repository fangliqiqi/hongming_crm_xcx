<template>
	<view class='changeName'>
		<!--设置- 更改昵称 -->
		<view class="head" @click="previousPage">
			<u-icon name="arrow-left" color="#000000" size="42"></u-icon>
			<text class="head_title">更改昵称</text>
		</view>
		<view class="changeName_content">
			<u-form-item prop="password" class='content_input'>
				<u-input v-model="nickName" type="text" :password-icon="false" class="input"
					placeholder="请输入新昵称" />
			</u-form-item>
			<!-- <view class='content_input'>
				<input class="input"  type="text"  placeholder="请输入新昵称" v-model="nickName" :password-icon="false"/>

			</view> -->
			
			<view class="button" @click="save">保存</view>
		</view>
		
	</view>
</template>

<script>
		export default {
			data() {
				return{
					value:'',
					nickName:null,
				}
			},
			methods: {
				previousPage(){
					uni.navigateBack()
				},
				save(){
					var nickName=this.nickName
					console.log('昵称'+ nickName);
					this.$u.get('/entUser/updateNickname',{nickName:nickName}).then(resp => {
						setTimeout(function(){
							uni.showToast({
								title: '更改昵称成功',
							})
						}, 2000);
						uni.navigateBack()
					})
				}
			}
			}
</script>

<style lang="scss">
	.changeName{
		width: 100%;
		height: 100vh;
		background-color: #FFFFFF;
		
		border-top: 0.5px solid #E6E7EB;
		padding-top: 13px;
		padding-top: 89px;
		.head{
			background-color: #FFFFFF;
			width: 100%;
			padding-left: 14px;
			text-align: left;
			padding-top: 52px;
			padding-bottom: 13px;
			display: flex;
			flex-direction: row;
			border-bottom: 0.5px solid #f6f6f6;
			position: fixed;
			top: 0px;
			z-index: 99;
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
		.changeName_content{
			padding-left: 28px;
			padding-right: 28px;
			padding-top: 12px;
			.content_input{
				width: 100%;
				
				.input{
					width: 100%;
					border-bottom: 1px solid #E6E7EB;
					font-size: 14px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D;
					// height: 48px;
					// line-height: 48px;
					
				}
				.icon{
					
				}
		}
		.button{margin-top: 93px;
			width: 100%;
			height: 45px;
			background: #3978E7;
			border-radius: 22.5px;
			line-height: 45px;
			text-align: center;
			font-size: 15px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			}
	}
	}
</style>
