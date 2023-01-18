<template>
	<view class="mine">

		<view class="mine_box">
			<!-- <view class="mine_box_Bg">
				<image src="@/static/image/bg.png" class="image"></image>
			</view> -->
			<u-navbar :is-back="false" title="我的" :background="{background: 'transparent' }" :border-bottom="false"
				style="background-color: #FFFFFF;"></u-navbar>

			<view class="top" v-if="dataObj==null">
				<navigator url="/pages/login/index" hover-class="none">
					<view class="img">
						<image src="@/static/image/login.png" mode="widthFix" />
					</view>
				</navigator>
				<view class="message">
					<view class="message_top">
						<view class="name">未登录</view>

					</view>
					<view class="set_font">点击头像登录</view>

				</view>
			</view>
			<view class="top" v-else>
				<view class="img">
					<image src="@/static/image/login.png" mode="widthFix" />
				</view>
				<view class="message" v-if="roleCodes">
					<view class="message_top">
						<view class="name">{{dataObj.name}}</view>
						<view class="tag">{{dataObj.roleNames[0]}}</view>
					</view>
					<navigator url="/pageSet/accountSet/accountSet" hover-class="none">
						<view class="set">账户设置</view>
					</navigator>

				</view>
				<view class="message client" v-if="roleCodes==undefined||roleCodes==''">
					<view class="message_left">
						<view class="message_top">
							<view class="name">{{dataObj.name}}</view>
							<view class="tag" v-if="dataObj.roleNames[0]">{{dataObj.roleNames[0]}}</view>
						</view>
						<view class="companyName">{{companyName||''}}</view>
					</view>

					<view class="message_right">
						<navigator url="/pageSet/accountSet/accountSet" hover-class="none">
							<view class="set">账户设置</view>
						</navigator>
					</view>

				</view>
				<!--  -->
			</view>
			<view class="mine_box_content" :style="'height:'+(contentHeight-126)+'px'">
				<view class="dataSumUp" v-if="roleCodes==undefined||roleCodes==''">
					<view class="dataSumUpBox">
						<text class="h1">
							数据总览
						</text>
						<view class="dataSumUpBoxContent">
							<u-row gutter="8">
								<u-col span="6">
									<view class="child"
										style="background: linear-gradient(90deg, #FFFFFF, #FAFCFC, #EDFDFD) !important;"
										@click="myBalance">
										<view class="name">
											<text class="figure">{{myData.money||0}}</text>
											<text class="writing">我的余额(元)</text>
										</view>
										<view class="icon">
											<image src="@/static/image/icon16.png" />
										</view>
									</view>
								</u-col>
								<u-col span="6">
									<view class="child"
										style="background: linear-gradient(90deg, #FFFFFF, #FCFAFC, #FDF4FD) !important;">
										<view class="name">
											<text class="figure">0</text>
											<text class="writing">我的积分</text>
										</view>
										<view class="icon">
											<image src="@/static/image/icon14.png" />
										</view>
									</view>
								</u-col>
								<u-col span="6">
									<view class="child"
										style="background: linear-gradient(90deg,  #FFFFFF, #FBFDFE, #EDF6FC) !important;"
										@click="myOrderForm">
										<view class="name">
											<text class="figure">{{myData.orderNum||0}}</text>
											<text class="writing">我的订单(个)</text>
										</view>
										<view class="icon">
											<image src="@/static/image/icon1.png" />
										</view>
									</view>
								</u-col>

								<u-col span="6">
									<view class="child"
										style="background: linear-gradient(90deg,  #FFFFFF, #FEFEFB, #FCFCF5) !important;"
										@click="toContract">
										<view class="name">
											<text class="figure">{{myData.contractNum||0}}</text>
											<text class="writing">我的合同(个)</text>
										</view>
										<view class="icon">
											<image src="@/static/image/icon15.png" />
										</view>
									</view>
								</u-col>

							</u-row>
						</view>
					</view>
				</view>
				<view class="content" v-if="roleCodes==undefined||roleCodes==''">
					<view class="content_box">
						<view class="content_box_child" @click="costDetails">
							<image class="box_child_image" src="@/static/image/costDetails.png"></image>
							<view class="box_child_name">费用详情</view>
							<image class="box_child_Rimage" src="@/static/image/jiantou.png"></image>
						</view>
						<view class="content_box_child" @click="voucherCenter">
							<image class="box_child_image" src="@/static/image/money.png"></image>
							<view class="box_child_name">充值中心</view>
							<image class="box_child_Rimage" src="@/static/image/jiantou.png"></image>
						</view>
					</view>
				</view>
				<view class="content">
					<view class="content_box">
						<!-- <view @click="information">模板订阅消息</view> -->
						<!-- :range="identityArray" -->
						<picker @change="cutIdentityChange" class="select" v-if="identity" mode='selector'
							:range="identityArray">
							<view class="content_box_child">
								<image class="box_child_image" src="@/static/image/cuTidentity.png"></image>
								<view class="box_child_name">切换身份</view>
								<image class="box_child_Rimage" src="@/static/image/jiantou.png"></image>
							</view>
						</picker>

						<picker @change="cutEnterpriseChange" :range="enterpriseArray"
							v-if="enterprise&&companyName!=''">
							<view class="content_box_child">
								<image class="box_child_image" src="@/static/image/cuTenterprise.png" style="width: 20px;
							height: 17px;"></image>
								<view class="box_child_name">切换企业</view>
								<image class="box_child_Rimage" src="@/static/image/jiantou.png"></image>
							</view>
						</picker>
						<view class="content_box_child" @click="aboutUs">
							<image class="box_child_image" src="@/static/image/guanyuwomen.png"></image>
							<view class="box_child_name">关于我们</view>
							<image class="box_child_Rimage" src="@/static/image/jiantou.png"></image>
						</view>
						<view class="content_box_child" @click="helpCenter()">
							<image class="box_child_image" src="@/static/image/bangzhu.png"></image>
							<view class="box_child_name">帮助中心</view>
							<image class="box_child_Rimage" src="@/static/image/jiantou.png"></image>
						</view>
						<!--  -->
					
						
						<view class="content_box_child" @click="toContractNotKH()" v-if="roleCodes!=''&&roleCodes!=null">
							<image class="box_child_image" src="@/static/image/bangzhu.png"></image>
							<view class="box_child_name">我的合同</view>
							<image class="box_child_Rimage" src="@/static/image/jiantou.png"></image>
						</view>
						<!--  -->
					</view>
				</view>
				<!-- <button type="primary" style="margin-top:200rpx;width: 80%;" @click="toContract">我的合同</button> -->
			</view>


		</view>
		<!-- <u-tabbar v-model="current" :list="list" :mid-button="false"></u-tabbar> -->
		<u-tabbar v-model="current" show="true" bg-color="#ffffff" border-top="true" :list="vuex_tabbar"
			:mid-button="false" inactive-color="#909399" activeColor="#5098FF" :hide-tab-bar="true"></u-tabbar>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				list: [],
				current: 0,
				companyName: '', //公司名称
				dataObj: null,
				roleCodes: '', //登录角色值
				identityArray: [ 'CRM用户','企业老板'],
				enterpriseArray: [], //企业
				enterpriseIdArray: [], //企业idArr
				identity: false, //切换身份的判断值
				enterprise: false, //切换企业的判断值
				selector: '客户',
				myData: {}, //我的数据
				contentHeight: '', //可用内容高度
			}
		},
		onShow() {
			var tath = this
			uni.getSystemInfo({
				success: function(res) {
					tath.contentHeight = res.windowHeight - res.statusBarHeight - 48
				}
			})
			if (uni.getStorageSync('types') != undefined && uni.getStorageSync('types').length > 1) {
				this.identity = true
			}else{
				this.identity = false}
			if (uni.getStorageSync('companyList') != undefined && uni.getStorageSync('companyList').length > 1) {
				this.enterprise = true
			
			}else{
				this.enterprise = false}
			console.info('退出登录后')
			console.info(uni.getStorageSync('companyList'))
			console.info(this.enterprise)
			console.info(this.identity)
			this.getList();
			this.acquireCompany();
			

			// })

			var roleCodes = this.$store.state.vuex_user.roleCodes; //登录角色值
			if (roleCodes != undefined && roleCodes.length > 0) {
				this.roleCodes = roleCodes[0]
			} else {
				this.roleCodes = ''
			}
			console.info('pandiua-----------')
			console.info(this.roleCodes)

		},
		onLoad() {
			// this.getList();
			this.companyName = uni.getStorageSync('companyData') ? uni.getStorageSync('companyData').companyName : ''
		},
		computed: {
			...mapState(['vuex_tabbar'])

		},
		methods: {
			// 获取所有公司
			acquireCompany() {
				var enterpriseArray = []
				var enterpriseIdArray = []
				var companyList = uni.getStorageSync('companyList')
				if (companyList.length > 0) {
					companyList.forEach((item, index) => {
						enterpriseArray.push(item.companyName)
						enterpriseIdArray.push(item.id)
					})
					this.enterpriseArray = enterpriseArray
					this.enterpriseIdArray = enterpriseIdArray
				}

			},
			// 我的订单
			myOrderForm() {
				uni.navigateTo({
					url: "/pageKh/myOrderForm/myOrderForm"
				});
			},
			// 费用详情
			costDetails() {
				uni.navigateTo({
					url: "/pages/mine/costDetails/costDetails"
				});
			},
			// 我的余额
			myBalance() {
				uni.navigateTo({
					url: "/pages/mine/myBalance/myBalance"
				});
			},
			// 充值中心
			voucherCenter() {
				uni.switchTab({
					url: "/pages/missionBox/missionBox", //跳转页面的路径
				});
			},
			// 关于我们
			aboutUs() {
				uni.navigateTo({
					url: "/pages/mine/aboutUs/aboutUs"
				});
			},
			// 帮助中心
			helpCenter() {
				uni.navigateTo({
					url: "/pages/mine/helpCenter/helpCenter"
				});
			},
			tabbarChange(index) {
				this.current = index;
			},
			getList() {
				this.myData={}
				this.dataObj = this.$store.state.vuex_user || null
console.info('客户')
console.info(this.myData)
				var companyId = uni.getStorageSync('companyData') ? uni.getStorageSync('companyData').id : ''
				// 客户我的数据
				if (companyId) {
					this.$u.post('/client/personalCenter', {
						companyId: companyId
					}).then(response => {
						console.info('客户-我的数据')
						console.info(response)
						this.myData = response
					})
				}
				console.info('客户-我的数据--')
				console.info(this.myData)

			},
			// 跳转到合同-非客户
			toContractNotKH(){
				uni.navigateTo({
					url: '/pages/mine/contractNotKH/contractNotKH',
				})
			},
			// 跳转到合同--客户
			toContract() {
				uni.navigateTo({
					url: '/pageKh/hetong/contractList/contractList',
				})
			},
			// 消息订阅
			information() {
				uni.requestSubscribeMessage({
					// tmplIds: [''],
					tmplIds: ['37sLCYEIk_hyCaIJSi_PyrLDMTeskWQQj5fCk0fJ_3Q',
						'm7DvAKj6w64jLUaWdyoPtt4UajuUW645XORduQAXjYc',
						'Jvy4G8eDQ2LgsSqu9FFNyGFAZOCnD0oFuxsXeOJQPm4'
					],
					success(res) {
						// setTimeout(function() {
						// 	uni.showToast({
						// 		title: '已成功订阅消息'

						// 	})
						// });
					}
				})
				if (uni.setStorageSync('crmOpenId') == undefined) {
					var tath = this
					uni.login({
						provider: 'weixin',
						success: function(loginRes) {
							tath.$u.post('/client/getOpenId', {
								code: loginRes.code
							}).then(resp => {
								tath.crmOpenId = resp
								console.log('授权--成功');
								console.log(tath.crmOpenId);
								uni.setStorageSync('crmOpenId', resp);
								uni.requestSubscribeMessage({
									// tmplIds: [''],
									tmplIds: ['37sLCYEIk_hyCaIJSi_PyrLDMTeskWQQj5fCk0fJ_3Q',
										'm7DvAKj6w64jLUaWdyoPtt4UajuUW645XORduQAXjYc',
										'Jvy4G8eDQ2LgsSqu9FFNyGFAZOCnD0oFuxsXeOJQPm4'
									],
									success(res) {
										setTimeout(function() {
											uni.showToast({
												title: '已成功订阅消息'

											})
										});
									}
								})
							})
						}
					});

				} else {
					console.info('有crmOpenId')
					// console.info(res)

				}

			},
			cutIdentityChange(e) {
				//切换身份
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				// this.index = e.target.value //将数组改变索引赋给定义的index变量
				// this.formObj.type = this.array[this.index]

				var type = ''
				var typeName = ''
				if (e.target.value == 0) {
					type = 10
					typeName = 'CRM用户'
				} else if (e.target.value == 1) {
					type = 20
					typeName = '企业老板'

				}
				this.acquireCompany();
				var userId = uni.getStorageSync('lifeData').vuex_user.userId
				var roleCodes = ''
				if (this.$store.state.vuex_user.roleCodes.length > 0) {
					roleCodes = this.$store.state.vuex_user.roleCodes[0]
				} else {
					roleCodes == ''
				}
				var role = '' //判断当前登录角色是客户==20还是内部人员==10
				if (roleCodes == '') {
					role = 20
				} else {
					role = 10
				}
				if (role == type) {
					setTimeout(function() {
						uni.showToast({
							title: '当前角色已是' + typeName + '请选择其它角色',
							icon: 'none',
						})
					});
				} else {

					this.$u.post('/guns-cloud-auth/auth/switchIdentity', {
						userId: userId,
						type: type
					}).then(resp => {
						this.$u.post('/api/sso/login', {
							code: resp.code
						}).then(res => {
							this.$u.vuex('vuex_token', res.token)
							this.$u.get('/guns-cloud-system/system/getUserInfo').then(resp => {
								uni.setStorage({
									key: 'companyList',
									data: resp.companyList
								})
								uni.setStorage({
									key: 'companyData',
									data: resp.companyList[0]
								})

								uni.setStorage({
									key: 'crmOpenId',
									data: resp.crmOpenId
								})
								if (resp.roleCodes.length > 0) {
									this.roleCodes = resp.roleCodes[0]

								} else {
									this.roleCodes = ''
								}
								this.$store.commit('SetTabbar', this.roleCodes)
								this.$u.vuex('vuex_user', resp)
								this.getList()

								this.acquireCompany();
								if (uni.getStorageSync('companyList') != undefined && uni
									.getStorageSync('companyList').length > 1) {
									this.enterprise = true

								}
								this.companyName = uni.getStorageSync('companyData') ? uni
									.getStorageSync('companyData').companyName : ''
								setTimeout(function() {
									uni.showToast({
										title: '角色已更改',
										// icon: 'none',
									})
								});
								this.information()
							}).catch(resp => {
								setTimeout(function() {
									uni.showToast({
										title: '抱歉角色更改失败',
										icon: 'none',
									})
								});
							})
						})
					})
				}
			},
			cutEnterpriseChange(e) { //切换企业
				var companyList = {
					companyName: this.enterpriseArray[e.target.value],
					id: this.enterpriseIdArray[e.target.value]
				}
				uni.setStorage({
					key: 'companyData',
					data: companyList
				})
				this.getList()
				this.companyName = uni.getStorageSync('companyData') ? uni.getStorageSync('companyData').companyName : ''
			},
		},
		onReachBottom() {
			// this.getList()
		},
	}
</script>

<style lang="scss" scoped>
	.mine {
		font-size: 28rpx;
		height: 100vh !important;

		.mine_box_Bg {
			position: fixed;
			top: 0px;
			width: 100%;

			// background: url(../../static/image/bg.png) no-repeat ;
			.image {
				width: 100%;

			}
		}

		.mine_box {
			// position: relative;
			// background-color: #FFFFFF;
			background: url(../../static/image/bg.png) no-repeat 120px 0px;

			.top {
				z-index: 3;
				display: flex;
				flex-direction: row;
				padding-top: 30px;
				padding-bottom: 20pt;
				padding-left: 18px;
				padding-right: 18px;

				// background-color: #FFFFFF;
				.img {
					width: 69px;
					height: 69px;
					border-radius: 34.5px;

					image {
						width: 100%;
						height: 100%;
						border-radius: 34.5px;
					}
				}

				.message {
					padding-left: 13px;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					.message_top {
						display: flex;
						flex-direction: row;
						align-items: center;

						.name {
							font-size: 22px;
							font-family: PingFang SC;
							font-weight: bold;
							color: #3A3B3D;
							max-width: 100px;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}

						.tag {
							// width: 66px;
							padding: 0 12px;
							height: 21.5px;
							background: linear-gradient(90deg, #5B393A, #2F1C1C);
							border-radius: 4px;
							font-size: 13px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #F5D487;
							display: flex;
							flex-direction: row;
							// align-items: center;
							justify-content: center;
							line-height: 21.5px;
							margin-left: 12px;
						}
					}

					.set {
						width: 69px;
						height: 19px;
						border: 0.5px solid #677C9C;
						border-radius: 9.5px;
						font-size: 12px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #677C9C;
						line-height: 19px;
						display: flex;
						justify-content: center;
						align-items: center;

						&:after {
							content: '';
							display: inline-block;
							width: 0px;
							height: 0px;
							border-left: 5px solid #677C9C;
							;
							border-top: 3px solid transparent;
							border-bottom: 3px solid transparent;
							margin-left: 5px;
						}
					}

					.set_font {
						font-size: 14px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #677C9C;
					}

				}

				.client {
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					width: calc(100% - 70px);

					.message_left {
						.message_top {
							.name {
								// max-width: 100px;
							}
						}

						.companyName {
							font-size: 14px;
							font-family: PingFang SC;
							font-weight: 500;
							font-style: italic;
							color: #565759;
							margin-top: 5.5px;
						}
					}

					.message_right {}
				}
			}

			.mine_box_content::-webkit-scrollbar {
				display: none;
			}

			.mine_box_content {
				width: 100%;
				overflow-x: hidden;
				overflow-y: scroll;

				.dataSumUp {
					padding-top: 10pt;
					background-color: #f5f6f7;

					.dataSumUpBox {
						background-color: #FFFFFF;
						padding: 29px 16px 22px 16px;
						// margin-top: 10px;

						.h1 {
							font-size: 18px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #303133;

						}

						.dataSumUpBoxContent {
							margin-top: 16px;

							.child {
								width: 100%;
								height: 78px;
								display: flex;
								flex-direction: row;
								justify-content: space-between;
								padding-top: 13px;
								padding-left: 21px;
								padding-right: 16px;
								background: linear-gradient(90deg, #FFFFFF, #FAFCFC, #EDFDFD);
								border-radius: 3px;
								margin-bottom: 4px;

								.name {
									padding-top: 6px;
									display: flex;
									flex-direction: column;

									.figure {
										font-size: 21px;
										font-family: DINPro;
										font-weight: 500;
										color: #3A3B3D;
									}

									.writing {
										font-size: 12px;
										font-family: PingFang SC;
										font-weight: 500;
										color: #87898C;
									}
								}

								.icon {
									width: 28px;
									height: 28px;

									image {
										width: 100%;
										height: 100%;
									}
								}

							}
						}

						// }

					}
				}

				.content {
					padding-top: 10pt;

					background-color: #f5f6f7;

					.content_box {
						background-color: #FFFFFF;
						padding-left: 24px;
						padding-right: 24px;
						padding-top: 17px;
						padding-bottom: 13pt;

						// margin-top: 10pt;
						.content_box_child {
							width: 100%;
							display: flex;
							height: 50px;
							display: flex;
							align-items: center;
							position: relative;

							.box_child_image {
								width: 18px;
								height: 18px;
								margin-right: 11px;
								// display: inline-block;
							}

							.box_child_name {
								font-size: 16px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #3A3B3D;
								display: inline-block;
								width: calc(100vw - 90px);

							}

							.box_child_Rimage {
								width: 8px;
								height: 14.5px;
								position: absolute;
								right: 0px;
								// display: inline-block;
							}
						}
					}
				}
			}
		}
	}
</style>
<style lang='scss'>
	.mine {
		.mine_box {
			.u-navbar-inner {
				.u-navbar-content-title {
					left: 0px !important;

					.u-title {
						text-align: left !important;
						padding-left: 18px !important;
						font-size: 18px !important;
						font-family: PingFang SC !important;
						font-weight: bold !important;
						color: #000000 !important;
					}
				}
			}
		}

	}
</style>
