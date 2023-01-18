<template>
	<view class="accountSet">
		<!-- 账户设置 -->
		<view class="head" @click="previousPage">
			<u-icon name="arrow-left" color="#000000" size="42"></u-icon>
			<text class="head_title">账户设置</text>
		</view>
		<view class="content">
			<navigator url="/pageSet/accountSet/alterPhone/alterPhone" over-class="none"
				v-if="roleCodes!=undefined&&roleCodes!=''">
				<view class="child">
					<text class="name">换绑手机</text>
					<u-icon name="arrow-right" color="#C1C2C7" size="32"></u-icon>
				</view>
			</navigator>
			<navigator url="/pageSet/accountSet/changePassword/changePassword" over-class="none">
				<view class="child">
					<text class="name">更换密码</text>
					<u-icon name="arrow-right" color="#C1C2C7" size="32"></u-icon>
				</view>
			</navigator>
			<navigator url="/pageSet/accountSet/changeName/changeName" over-class="none">
				<view class="child">
					<text class="name">更改昵称</text>
					<u-icon name="arrow-right" color="#C1C2C7" size="32"></u-icon>
				</view>
			</navigator>
			<view class='child' @click="logOut">
				<text class="name">退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				roleCodes: '', //登录角色值
			}
		},
		onShow() {
			var roleCodes = this.$store.state.vuex_user.roleCodes; //登录角色值
			if (roleCodes != undefined && roleCodes.length > 0) {
				this.roleCodes = roleCodes[0]
			} else {
				this.roleCodes = ''
			}
			console.info('判断登录')
			console.info(this.roleCodes)
		},


		methods: {
			previousPage() {
				uni.navigateBack()
			},
			// async
			logOut() {
				// wx.showLoading({ title: '退出登陆中' })
				// const token = this.$store.state.vuex_token
				// console.info('退出登录1111' + token)
				uni.showModal({
					content: '是否要退出登录',
					success: (res) => {
						if (res.confirm) {
							this.$u.post('/guns-cloud-auth/sso/logoutCrmApplet').then(resp => {
								uni.setStorageSync('companyData', {});
								uni.setStorageSync('companyList', []);
								uni.setStorageSync('types', []);
								uni.setStorageSync('crmOpenId', '');
								this.$u.vuex('vuex_token', '')
								this.$u.vuex('vuex_user', '')
								
								// uni.getStorageSync('companyData')
								uni.navigateBack({
									delta: 1
								})
								uni.showToast({
									title: "退出登录成功",
									icon: 'none'
								})
							})
							// 

						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.accountSet {
		border-top: 0.5px solid #EDEDED;
		// padding-left: 18px;
		// padding-right: 18px;
		background-color: #FFFFFF;
		padding-top: 89px;

		.head {
			background-color: #FFFFFF;
			width: 100%;
			// padding-left: 14px;
			text-align: left;
			padding-top: 52px;
			padding-bottom: 13px;
			display: flex;
			flex-direction: row;
			border-bottom: 0px solid #f6f6f6;
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

		.content {
			margin-left: 16px;
			margin-right: 16px;

			.child {
				border-bottom: 0.5px solid #EDEDED;
				padding-top: 20px;
				padding-bottom: 20px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.name {
					font-size: 16;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D;
				}
			}
		}
	}
</style>
