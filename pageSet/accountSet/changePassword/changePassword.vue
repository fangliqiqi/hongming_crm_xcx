<template>
	<view class="changePassword">
		<!-- 更改密码 -->
		<u-steps :list="numList" :current="current" mode="number" active-color='#2fd19a' v-if="current!=2"></u-steps>
		<view class="changePassword_content" v-if="current==0">
			<!-- <view class="title">
				填写新手机号
			</view> -->
			<u-form-item  class='content_input'>
				<u-input v-model="phone"  type="text" class="input" :password-icon="false"
					placeholder="请输入手机号码" />
			</u-form-item>
			<u-form-item prop="password" class="yzm" >
				<u-input v-model="verification" type="text" :password-icon="false" style="display: inline-block;"
					placeholder="请输入验证码" />
				<view class="yzm_btn">
					<!-- <button @tap="getCode" class="getCaptcha">获取验证码</button> -->
					<u-toast ref="uToast"></u-toast>
							<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
							@change="codeChange"></u-verification-code>
							<u-button @click="getCode" >{{tips}}</u-button>
				</view>
			</u-form-item>
			<view class="hint">
				短信验证码有效事件为5分钟
			</view>
			
			<view class='changePassword_contentBtn contentBtnColor' v-if="phone&&verification"  @click="cellSubmit">
				下一步
			</view>
			<view class='changePassword_contentBtn'  v-else>
				下一步
			</view>
			<view class="none" @click="noneNote">
				没收到短信验证码？
			</view>
		</view>
		<view class="changePassword_content" v-if="current==1">
<!-- 设置密码 -->
			<u-form-item  class='content_input'>
				<u-input v-model="newPassword"  type="password"  class="input" :password-icon="false"
					placeholder="请输入新密码" />
			</u-form-item>
			<u-form-item prop="password" class="content_input" >
					<u-input v-model="repeatPassword"  type="password"  class="input" :password-icon="false"
						placeholder="请再次输入输入新密码" />
			</u-form-item>
			<view class='changePassword_contentBtn' :class="phone&&verification?'contentBtnColor':''" @click="passwordSubmit" style="margin-top:97px;">
				确定
			</view>
		</view>
		<view class="changePassword_content" v-if="current==2">
		<!-- 设置完成-->
		<view class="accomplish">
			<view class="img">
				<image src="@/static/image/wancheng.png"></image>
			</view>
			<view class="title">
				更改完成
			</view>
			<view class="btn" @click="accomplishBtn">返回首页</view>
		</view>
				</view>
	</view>
</template>

<script>
	import {
		encrypt,
		decrypt
	} from '@/utils/jsencrypt';
	export default {
		data() {
			return {
				tips:'获取验证码',
				current:0,
				seconds: 60,
				newPassword:'',//新密码
				repeatPassword:'',//确认新密码
				numList: [{
									name: '验证身份'
								}, {
									name: '设置密码'
								}, {
									name: '完成'
								},],
				phone:null,//手机号
				verification:null,//验证码
			}
		},
		onShow() {
			this.phone=this.$store.state.vuex_user.phone||''

		},
		methods:{
			codeChange(text) {
							this.tips = text;
						},
			// 没有收到验证码
			noneNote(){
				console.log('没有收到验证码');
			},
			
			// 获取验证码
			getCode(){
				// this.$u.post('/sms/sendChangePhoneMessage',{phoneNumbers:this.phone}).then(resp => {
				// })
				if(this.$refs.uCode.canGetCode) {
									// 模拟向后端请求验证码
									uni.showLoading({
										title: '正在获取验证码'
									})
									this.$u.post('/sms/sendChangePhoneMessage',{phoneNumbers:this.phone}).then(resp => {
										setTimeout(() => {
											uni.hideLoading();
											this.$u.toast('验证码已发送');
											this.$refs.uCode.start();
										}, 2000);
									})
									
								} else {
									this.$u.toast('倒计时结束后再发送');
								}
							},
							
							
				end() {
					this.$u.toast('倒计时结束');
				},
				start() {
					this.$u.toast('倒计时开始');
				},
				// 手机号验证-提交
				cellSubmit() {
					this.$u.get('/entUser/checkCellPhone', {
						phone: this.phone,
						vCode: this.verification
					}).then(resp => {
						this.current=1
						// uni.navigateTo({
						// 	url: "/pageSet/accountSet/alterPhone/tow",
						// });
					}).catch(resp => {
						uni.showToast({
							title: resp.data.message,
							icon: 'none',
						})
					})
				
				},
				// 返回首页
				accomplishBtn(){
					uni.switchTab ({
									     url: "/pages/home/index",//跳转页面的路径
									    });
				},
				// 设置密码
				passwordSubmit(){
					var newPassword=encrypt(this.newPassword)
					var repeatPassword=encrypt(this.repeatPassword)
					this.$u.post('/entUser/updatePasswordNotOldPassword', {newPassword:newPassword,repeatPassword:repeatPassword}).then(resp => {
						this.current=2
					})
					// console.log(resp);
				},
				// 提交
				submit(){
					this.$u.get('/entUser/updateCellPhone',{phone:this.phone,vCode:this.verification}).then(resp => {
						setTimeout(function() {
							uni.showToast({
								title:'更改成功',
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
	.changePassword{
		border-top: 0.5px solid #EDEDED;
		background: #FFFFFF;
		width: 100%;
		height: 100vh;
		padding-top: 23.5px;
		.u-border-bottom{
			width: 100%;
		}
		.accomplish{
			    // display: flex;
			    // align-items: center;
			    // flex-wrap: wrap;
			    // justify-content: center;
			.img{
				width: 61px;
				height: 61px;
				margin: 0 auto;
				margin-bottom: 17px;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.title{
				font-size: 18px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3A3B3D;
				text-align: center;
			}
			.btn{
				width: 100%;
				height: 90rpx;
				line-height: 90rpx;
				background: #ECF2FC;
				border-radius: 45rpx;
				font-size: 15px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3978E7;
				text-align: center;
			}
		}
		.u-border-bottom:after{
			    border-bottom-width: 0px;
		}
		.content_input{
			display: flex;
			    border-bottom: 1px solid #E6E7EB;
				padding-top: 19px;
		}
		.hint{
			font-size: 13px;
			line-height: 42px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #A1A2A6;
		}
		.none{
			font-size: 13px;
			line-height: 32px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #F3A35F;
			text-align: center;
		}
		.changePassword_content{
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
			// margin-bottom: 41px;
			padding-top: 19px;
			border-bottom: 1px solid #E6E7EB;
			// border-bottom: 0.5px solid #E6E7EB;
			.yzm_btn{
				// width: 80px;
				width: 124px;
				display: inline-block;
				    position: fixed;
					right: 28px;
			.getCaptcha{
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				
				color: #3978E7;
				background-color: #fff !important;
				
			}
			button::after{
				border: 0px;
			}
			}
			.u-btn{
				color: #3978E7 !important;
			}
		}
		.changePassword_contentBtn{
			height: 45px;
			line-height: 45px;
			text-align: center;
			border-radius: 22.5px;
			font-size: 15px;
			font-family: PingFang SC;
			font-weight: 500;
			background-color: #E6E7EB !important;
			color: #FFFFFF;
			margin-top: 55px;
		}
		.contentBtnColor{
			color: #FFFFFF;
			background-color:#3978E7 !important;
		}
		}
	}
</style>
