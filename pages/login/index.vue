<template>
	<view class="bgfff login_cl">
		<view class="top">
			<image src="@/static/image/login.png" mode="widthFix" style="width: 64px;height: 64px;" />
		</view>
		<view class="content">
			<view class="alternative">
				<view class="password" :isChecked='isChecked' @click="passwordClick" :class="passwordState?'color':''">
					密码登录</view>

				<!-- <view class="line"></view>
				<view class="issue" :isCheck='isCheck' @click="codeClick">验证码登陆</view> -->
			</view>
			<!-- 密码登录 -->
			<u-form :model="loginForm" v-if="passwordState">
				<u-form-item prop='userName'>
					<u-input v-model="loginForm.userName" type="text" placeholder="请输入您的手机号/账号" />
				</u-form-item>
				<u-form-item prop="password">
					<u-input v-model="loginForm.password" type="password" :password-icon="false"
						placeholder="请输入您的密码" />
					<!-- <input type="password" v-model="loginForm.password" placeholder="请输入您的密码" /> -->
				</u-form-item>
				<u-form-item prop="piccode">
					<view class="yzm">
						<u-input v-model="loginForm.piccode" @blur="toUp" type="text" style="display: inline-block;"
							placeholder="请输入验证码" @keyup.enter.native="handleLogin('loginForm')"
							:password-icon="false" />
						<view class="yzm_btn">
							<!-- <button @tap="submit('loginForm')" class="getCaptcha">获取验证码</button> -->
							<image class="imageBox_img" :src="picUrl ? picUrl : errorImg" @click="pictureVerify">
							</image>
						</view>
					</view>

				</u-form-item>
				<view  class="btn">
					<button @tap="submit('loginForm')" class="getCaptcha">登录</button>
				</view>
			</u-form>

			<!-- 验证码登录 -->
			<u-form :model="loginForm" v-if="codeState">
				<u-form-item prop='userName'>
					<u-input v-model="loginForm.userName" type="text" placeholder="请输入您的手机号/账号" />
				</u-form-item>
				<u-form-item prop="password">
					<view class="yzm">
						<u-input v-model="loginForm.password" type="password" :password-icon="false"
							style="display: inline-block;" placeholder="请输入短信验证码" />
						<view class="yzm_btn">
							<button @tap="submit('loginForm')" class="getCaptcha">获取验证码</button>
						</view>
					</view>

				</u-form-item>
				<u-form-item class="btn">
					<button @tap="submit('loginForm')" class="getCaptcha">登录</button>
				</u-form-item>
			</u-form>
		</view>
		<view class="buttom">
			<!-- 	<view class="loginType" @click="appLoginWx">
				<view class="wechat item">
					<view class="icon">
						<u-icon size="50" name="weixin-fill" color="#A1A2A6"></u-icon>
					</view>
					微信登录
				</view>
			</view> -->
			<!-- <button class="sys_btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">小程序登录授权</button> -->
			<view class="hint">
				登录即代表同意用户服务协议/隐私政策
			</view>
		</view>
	</view>
</template>

<script>
	import {
		encrypt,
		decrypt
	} from '@/utils/jsencrypt';
	import config from '@/common/config.js';
	export default {
		data() {
			const validatePic = (rule, value, callback) => {
				console.info(arguments)
				if (!this.loginForm.piccode) {
					callback(new Error('请输入图形验证码'))
					console.info('请输入图形验证码')
				} else if (this.loginForm.piccode.length == this.upCode.length) {
					if (!this.toUp(this.loginForm.piccode, this.upCode)) {
						// this.getCode()
						callback(new Error('验证码输入错误'))
						console.info('验证码输入错误')
					} else {
						callback()
					}
				} else {
					console.info('验证码输入错误')
					callback(new Error('验证码输入错误'))
				}
			}
			return {
				piccode: '',
				picUrl: null, //图片验证码
				// errorImg: require('../../static/image/error.png'),
				loginForm: {
					userName: '',
					password: '',
					piccode: null,
				},
				tel: '',
				password: '',
				isChecked: true,
				isCheck: false,
				passwordState: true,
				clientState: false, //客户登录
				codeState: false,
				passwordColor: `#303133`,
				issueColor: `#B6B8BF`,
				piccode: [{
						required: true,
						message: '请输入验证码'
					},
					{
						validator: validatePic,
						trigger: ['blur', 'change']
					}
				]
			}
		},
		onLoad() {
			let token = this.$store.state.vuex_token;
			let userInfo = this.$store.state.vuex_user;
			this.pictureVerify() //图片验证码
			if (token && userInfo && userInfo.userId) {
				this.toPage()
			}
		},
		computed: {

		},
		methods: {
			handleLogin() {
				console.info('点击啦')
			},
			appLoginWx() {
				console.info('微信登录')
				// #ifdef MP-WEIXIN
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.info('授权')
						console.info(res)
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (res2) => {

									uni.getUserInfo({
										provider: 'weixin',
										success: (info) => { //这里请求接口
											console.log('这里请求接口');
											console.log(res2);
											console.log(info);

										},
										fail: () => {
											uni.showToast({
												title: "微信登录授权失败",
												icon: "none"
											});
										}
									})

								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							})

						} else {
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon: "none"
							});
						}
					}
				});
				//#endif
			},
			// 密码登录
			passwordClick() {
				this.passwordState = true;
				this.codeState = false;
				this.clientState = false;
				this.passwordColor = `#303133`;
				this.issueColor = `#B6B8BF`;
			},
			// 图片验证码
			pictureVerify() {
				console.info('图片验证码')
				this.$u.get('/api/sms/getVerifyCodeFactory').then(resp => {
					console.info('图片验证码-请求')
					console.info(resp)
					console.info(resp.base64Image)
					this.picUrl = resp.base64Image
					this.picCode = resp.verifyCode || '',
						this.upCode = this.picCode.toUpperCase()
				})
			},

			toUp(value, upVal) {
				upVal = upVal || ''
				if (value) {
					let upCode = value.toUpperCase()
					if (upVal != upCode) {
						return false
					} else {
						return true
					}
				} else {
					return false
				}
			},
			// 验证码登录
			codeClick() {
				this.passwordState = false;
				this.clientState = false;
				this.codeState = true;
				this.passwordColor = `#B6B8BF`;
				this.issueColor = `#303133`;
			},
			// 客户登录
			clientClick() {
				this.passwordState = false;
				this.codeState = false;
				this.clientState = true
			},
			// 消息订阅
			information() {
				console.info('消息订阅')
				//
				if (uni.setStorageSync('crmOpenId') == undefined) {
					var tath = this
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							tath.$u.post('/client/getOpenId', {
								code: loginRes.code
							}).then(resp => {
								tath.crmOpenId = resp
								uni.setStorageSync('crmOpenId', resp);
								uni.requestSubscribeMessage({
									tmplIds: ['37sLCYEIk_hyCaIJSi_PyrLDMTeskWQQj5fCk0fJ_3Q',
										'm7DvAKj6w64jLUaWdyoPtt4UajuUW645XORduQAXjYc',
										'Jvy4G8eDQ2LgsSqu9FFNyGFAZOCnD0oFuxsXeOJQPm4'
									],
									success(res) {}
								})
							})
						}
					});
				}
				// 
				uni.requestSubscribeMessage({
					// tmplIds: [''],
					tmplIds: ['37sLCYEIk_hyCaIJSi_PyrLDMTeskWQQj5fCk0fJ_3Q',
						'm7DvAKj6w64jLUaWdyoPtt4UajuUW645XORduQAXjYc'
					],
					success(res) {
						// tath.$u.post('/client/sendWx').then(resp => {
						//  console.info('订阅消息--请求')
						//  console.info(resp)
						// })
					},
					fail(res) {}
				})
			},
			// 客户登录提交按钮
			clientSubmit() {
				// console.info('客户登录')
				// console.info(this.$u.http.interceptor)
				if (this.loginForm.piccode == null) {
					setTimeout(function() {
						uni.showToast({
							title: '请输入验证码',
							icon: 'none',
						})
					});
				} else if (this.loginForm.piccode.toUpperCase() != this.picCode.toUpperCase()) {
					setTimeout(function() {
						uni.showToast({
							title: '验证码输入错误，请输入正确验证码',
							icon: 'none',
						})
					});
				} else {
					uni.request({
						url: '/guns-cloud-auth/auth/accessCodeClient', //仅为示例，并非真实接口地址。
						data: {
							account: this.loginForm.userName,
							password: encrypt(this.loginForm.password),
							isSave: false,
							piccode: this.loginForm.piccode
						},
						method: 'POST',
						header: {
							// 'custom-header': 'hello' //自定义请求头信息
							'X-Auth-AppId': '40'
						},
						success: (response) => {
							console.log('客户登录请求');
							console.log(response);
							// this.text = 'request success';

							if (response.data.code != 200) {
								console.log('登录值不是200');
								console.log(response.data.message);
								setTimeout(function() {
									uni.showToast({
										title: response.data.message || '登录值不是200',
										icon: 'none',
									})
								});
							} else {
								let code = response.data.data.code
								this.$u.post('/api/sso/login', {
									code: code
								}).then(res => {
									this.$u.vuex('vuex_token', res.token)
									this.$u.get('/guns-cloud-system/system/getUserInfo').then(resp => {
										this.$u.vuex('vuex_user', resp)
										this.toPage()
									}).catch(resp => {
										console.info('登录失败')
										console.info(res)
									})

								})
							}
						},
						fail: (response) => {
							console.log('客户登录请求--失败-完了');
							console.log(response);
						}
					})

				}
			},
			submit() {
				if (this.loginForm.piccode == null) {
					setTimeout(function() {
						uni.showToast({
							title: '请输入验证码',
							icon: 'none',
						})
					});
				} else if (this.loginForm.piccode.toUpperCase() != this.picCode.toUpperCase()) {
					setTimeout(function() {
						uni.showToast({
							title: '验证码输入错误，请输入正确验证码',
							icon: 'none',
						})
					});
				} else {
					// this.$u.post('/api/auth/accessCode', {
					this.$u.post('/guns-cloud-auth/auth/accessCodeClient', {
						account: this.loginForm.userName,
						password: encrypt(this.loginForm.password),
						isSave: false,
						piccode: this.loginForm.piccode
					}).then(response => {
						let code = response.code
						this.$u.post('/api/sso/login', {
							code: code
						}).then(res => {
							this.$u.vuex('vuex_token', res.token)
							this.$u.get('/guns-cloud-system/system/getUserInfo').then(resp => {
								uni.setStorage({
									key: 'companyData',
									data: resp.companyList[0]
								})
								uni.setStorage({
									key: 'companyList',
									data: resp.companyList
								})
								uni.setStorage({
									key: 'types',
									data: resp.types
								})
								uni.setStorage({
									key: 'crmOpenId',
									data: resp.crmOpenId
								})
								this.$u.vuex('vuex_user', resp)
								this.toPage()

								// 消息订阅
								// this.information()
							}).catch(resp => {
								setTimeout(function() {
									uni.showToast({
										title: '接口请求失败',
										icon: 'none',
									})
								});
							})
						})
					}).catch(res => {
						setTimeout(function() {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
							})
						});
					})
				}
			},
			toPage() {
				var roleCodes = this.$store.state.vuex_user.roleCodes[0];
				this.$store.commit('SetTabbar', roleCodes)
				this.$u.route({
					type: 'reLaunch',
					url: 'pages/home/index'
				})
			}
		},
	};
</script>

<style lang="scss" >
	.login_cl {
		font-size: 28rpx;
		height: 100vh !important;
position: relative;
		.u-form-item {
			padding-top: 31px !important;
		}

		.top {
			padding: 93px 32px 42px 32px;
			background: url(../../static/image/login-bg.png) no-repeat 120px 0px;
			background-size: 255.5px 255.5px;
		}

		.content {
			padding: 0px 32px 0 32px;
			display: flex;
			flex-direction: column;
			color: $u-tips-color;
			display: flex;
			justify-content: end;

			.alternative {
				display: flex;
				flex-direction: row;
				margin-bottom: 20px;
			}

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.btn {
				border: none;
				margin-top: 66px;
				.getCaptcha {
					background-color: #3978E7;
					color: #FFFFFF;
					border: none;
					border-radius: 22.5px;
					font-size: 16px;
					// padding: 14px 0;
					height: 45px;

					&::after {
						border: none;
					}
				}
			}

			.password {
				font-size: 18px;
				font-family: PingFang SC;
				font-weight: bold;
				color: #B6B8BF;
			}

			.color {
				color: #303133;
			}

			.issue {
				font-size: 18px;
				font-family: PingFang SC;
				font-weight: bold;
				color: #B6B8BF;
			}

			.line {
				border-right: 1.5px solid #CCCCCC;
				height: 18px;
				margin-left: 20px;
				margin-right: 20px;
			}
		}

		.buttom {
			// padding-top: 300px;
position: absolute;
text-align: center;
width: 100%;
bottom: 40px;
			.loginType {
				margin-top: 228rpx;
				margin-bottom: 150rpx;
				display: flex;
				justify-content: center;

				.icon {
					margin-right: 8.5px;
				}

				.item {
					display: flex;
					flex-direction: row;
					align-items: center;
					color: $u-content-color;
					font-size: 16px;
					border: 1rpx solid #E6E7EB;
					border-radius: 22.5px;
					padding: 7px 31px 6.5px 27.5px;
				}
			}

			.hint {
				text-align: center;
				font-size: 14px;
				color: #C3C4C7;
			}

			.link {
				color: $u-type-warning;
			}
		}

		.yzm {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			// margin-bottom: 41px;

			.yzm_btn {
				width: 200upx;
				height: 80upx;
				display: inline-block;

				.imageBox_img {
					width: 100%;
					height: 100%;
				}

				.getCaptcha {
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3978E7;
				}
			}
		}
	}
</style>
