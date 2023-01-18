<template>
	<view class="alterPhoneTow">
		<!-- 更换手机号 -->
		<view class="head" @click="previousPage">
			<u-icon name="arrow-left" color="#000000" size="42"></u-icon>
			<text class="head_title">换绑手机号</text>
		</view>
		<view class="alterPhoneTow_content">
			<view class="title">
				填写新手机号
			</view>
			<u-form-item  class='content_input'>
				<u-input v-model="phone"  type="text" class="input" :password-icon="false"
					placeholder="请输入新手机号" />
			</u-form-item>
			<u-form-item prop="password" class="yzm" >
				<u-input v-model="verification" type="text" :password-icon="false" style="display: inline-block;"
					placeholder="请输入短信验证码" />
				<view class="yzm_btn">
					<button @tap="getCode" class="getCaptcha">获取验证码</button>
				</view>
			</u-form-item>
			<view class='alterPhoneTow_contentBtn' @click="submit">
				立即验证
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:null,//手机号
				verification:null,//验证码
			}
		},
		methods:{
			previousPage(){
				uni.navigateBack()
			},
			// 获取验证码
			getCode(){
				console.log('点击获取验证码');
				console.info(this.$store.state.vuex_user)
				
				this.$u.post('/sms/sendChangePhoneMessage',{phoneNumbers:this.phone}).then(resp => {
					console.log('获取验证码');
					console.log(resp);
				
				})
				
				},
				// 提交
				submit(){
					console.log('提交');
					this.$u.get('/entUser/updateCellPhone',{phone:this.phone,vCode:this.verification}).then(resp => {
						console.log('提交返回');
						console.log(resp);
						console.log(resp);
						setTimeout(function(){
							uni.showToast({
								title: '更改成功',
								// icon: 'none',
							})
						}, 2000);
						 uni.navigateTo({
						     url: "/pageSet/accountSet/accountSet",
						    });
					}).catch(resp =>{
								uni.showToast({			
																// title:resp.data.message,
																title:resp.data.message,
								                                icon: 'none',
											 				})
							})
				}
			},
			}
</script>

<style lang="scss">
	.alterPhoneTow{
		border-top: 0.5px solid #EDEDED;
		background: #FFFFFF;
		width: 100%;
		height: 100vh;
		padding-top: 49px;
		// padding-left: 28px;
		// padding-right: 28px;
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
		.alterPhoneTow_content{
			padding-left: 28px;
			padding-right: 28px;
			padding-top: 44px;
		.title{
		font-size: 21px;
		font-family: PingFang SC;
		font-weight: bold;
		color: #303133;
		margin-bottom: 34px;
		// 	margin-left: 28px;
		// 	margin-right: 28px;
		// 	margin-top: 44px;
		}
		.yzm{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-bottom: 41px;
			.yzm_btn{
				width: 124px;
				display: inline-block;
				    position: absolute;
			.getCaptcha{
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3978E7;
			}
			}
			
		}
		.alterPhoneTow_contentBtn{
			height: 45px;
			line-height: 45px;
			text-align: center;
			background: #3978E7;
			border-radius: 22.5px;
			font-size: 15px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
		}
	}
</style>
