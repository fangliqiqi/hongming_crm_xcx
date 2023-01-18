<template>
	<view class="alterPhone">
		<!-- 更换手机号 -->
		<view class="head" @click="previousPage">
			<u-icon name="arrow-left" color="#000000" size="42"></u-icon>
			<text class="head_title">换绑手机号</text>
		</view>
		<view class="alterPhone_content">
			<view class="title">
				原手机号校验
			</view>
			<u-form-item class='content_input'>
				<u-input v-model="phone" class="input" placeholder="请输入原手机号" />
			</u-form-item>
			<u-form-item prop="password" class="yzm">
				<u-input v-model="verification" type="text" :password-icon="false" style="display: inline-block;"
					placeholder="请输入短信验证码" />
				<view class="yzm_btn">
					<button @tap="getCode()" class="getCaptcha">获取验证码</button>
				</view>
			</u-form-item>
			<view class='alterPhone_contentBtn' @click="submit">
				下一步，填写新手机号
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: this.$store.state.vuex_user.phone, //手机号
				verification: null, //验证码
			}
		},
		methods: {
			previousPage() {
				uni.navigateBack()
			},
			// 获取验证码

			getCode() {
				console.log('点击获取验证码');
				console.info(this.$store.state.vuex_user)

				this.$u.post('/sms/sendChangePhoneMessage', {
					phoneNumbers: this.phone
				}).then(resp => {
					console.log('获取验证码');
					console.log(resp);
					setTimeout(function(){
						uni.showToast({
							title: '已发送验证码',
							icon: 'none',
						})
					}, 2000);

				}).catch(resp => {
					uni.showToast({
						title: '发送验证码失败!!!!',
						icon: 'none',
					})
				})

			},
			// 提交
			submit() {
				console.log('提交返回');
				console.log(this.verification);
				if(this.verification==null){
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
					})
				}else{
					this.$u.get('/entUser/checkCellPhone', {
						phone: this.phone,
						vCode: this.verification
					}).then(resp => {
					
						uni.navigateTo({
							url: "/pageSet/accountSet/alterPhone/tow",
						});
					}).catch(resp => {
						uni.showToast({
							title: resp.data.message,
							icon: 'none',
						})
					})
				}
				
				

			}
		},
	}
</script>

<style lang="scss">
	.alterPhone {
		.u-border-bottom:after{
			    border-bottom-width: 0px;
		}
		border-top: 0.5px solid #EDEDED;
		background: #FFFFFF;
		width: 100%;
		height: 100vh;
		padding-top: 49px;
		// padding-left: 28px;
		// padding-right: 28px;
		padding-top: 89px;
.content_input{
	display: flex;
	    border-bottom: 1px solid #E6E7EB;
}
		.head {
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

			.arrow-left {}

			.head_title {
				font-family: PingFang SC;
				font-weight: bold;
				color: #000000;
				font-size: 18px;
				margin-left: 3px;
			}
		}

		.alterPhone_content {
			padding-left: 28px;
			padding-right: 28px;
			padding-top: 44px;

			.title {
				font-size: 21px;
				font-family: PingFang SC;
				font-weight: bold;
				color: #303133;
				margin-bottom: 34px;
				// 	margin-left: 28px;
				// 	margin-right: 28px;
				// 	margin-top: 44px;
			}

			.yzm {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-bottom: 41px;
border-bottom: 1px solid #E6E7EB;
				.yzm_btn {
					// width: 80px;
					width: 124px;
					display: inline-block;
					    position: fixed;
						right: 28px;

					.getCaptcha {
						font-size: 16px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #3978E7;
					}
				}

			}

			.alterPhone_contentBtn {
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
