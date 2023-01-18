<template>
	<view class="client" :style="{height: ((sysInfo.safeArea.height >sysInfo.windowHeight?sysInfo.windowHeight:sysInfo.safeArea.height)-2)+'px'}">
		<u-navbar :is-back="false" title="首页" :background="{ background: 'transparent' }" :border-bottom="false"  title-color="#ffffff" :is-fixed="false"></u-navbar>
		<!-- 客户首页 -->
		<!-- <view class="client_title">首页</view> -->
		<view class="client_head">
			<view class="head_box" @click="information">
				<view class="news">
					<u-icon name="volume-fill" color="#3978E7" size="38"></u-icon>
					<u-notice-bar :volume-icon='false' :more-icon='false' type="primary" :list="informationList"
						bg-color='transparent' color='#303133' style="width: calc(100% - 100rpx);" :duration="3500"></u-notice-bar>
					<u-icon name="arrow-right" color="#999999" size="26"></u-icon>
				</view>
				<view class="head_box_money">{{balance||0}}</view>
				<view class="head_box_font">账户余额(元)</view>
			</view>
		</view>

		<view class="client_content" :style="{height:'calc(100% - 170px - '+sysInfo.statusBarHeight+'px - 48px)'}">
			<view class="content_title" @click="information">
				<view class="title">执行订单</view>
			</view>
			<view class="content" v-if="clientList.length>0">

				<view class="child" v-for="(item,index) in clientList" :key="index" @click="information">
					<view class="top" @click="information">
						<view class="number">
							<text class="ask">订单编号：</text>
							<view class="answer">{{item.orderNo||''}}</view>
						</view>
					</view>
					<view class="centen">
						<view class="centen_child" v-for="(items,idx) in item.wxMarketBusirSerpricetList"
							:key="items.id" @click="theOrderDetailsSkip(idx,index)">
							<view class="icon">{{idx+1}}</view>
							<view class="child_content">
								<view class="content_top">
									<text class="title">{{items.serpriceName||''}}</text>
									<view class="label" v-if="items.projectProcess">{{items.projectProcess||''}}</view>
								</view>
								<view class="content_bottom">
									<text class="ask">项目预计完成时间：</text>
									<text class='time'>{{items.completeTime}}</text>
								</view>
							</view>

						</view>
					</view>
					<view class="show">
						<view class="show_box">
							<view class="show_child">
								<text class="chlid_top">订单金额(元)</text>
								<text class='child_price'>{{item.orderAmount||0}}</text>
							</view>
							<view class="show_child">
								<text class="chlid_top">已收金额(元)</text>
								<text class='child_price'>{{item.amountReceived||0}}</text>
							</view>
							<view class="show_child">
								<text class="chlid_top">未收金额(元)</text>
								<text class='child_price' style="color:#EF5465">{{item.uncollectedAmount||0}}</text>
							</view>
						</view>
					</view>
					<view class="placeAn">
						<view class="placeAnOrder">
							<text class="placeAnOrder_ask">下单时间：</text>
							<text class='placeAnOrder_time'>{{item.placeOrderDate||''}}</text>
						</view>
						<view class="line"></view>
						<view class="placeAnOrder">
							<text class="placeAnOrder_ask">客户经理：</text>
							<text class='placeAnOrder_time'>{{item.mobilePhone||''}}</text>
						</view>
						<view class="phone" @click="ringUp(item.mobilePhone)">
							<image src="/static/image/phone.png" class="phone_image"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="contentNone" v-if="clientList.length==0">抱歉暂无数据</view>
			<view class="suspension">
				<image class="suspension_img" src="@/static/image/suspension.png" @click="pictureVerify">
				</image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: ['clientList', 'balance', 'menuInfo', 'sysInfo'],
		data() {
			return {
				// statusBarHeight:0,//状态栏的高度
				// windowHeight:0,//可使用窗口高度
				informationList: ['订单跟进提醒！'],
				salesmanOrderFormByValue: [{
					wxMarketBusirSerpricetList: [{
						serpriceName: '11'
					}]
				}, {
					wxMarketBusirSerpricetList: [{
						serpriceName: '11'
					}]
				}],

			}
		},
		onShow() {
			// uni.getSystemInfo({
			//         success: (res)=> {
			// 			this.statusBarHeight=res.statusBarHeight
			// 			this.windowHeight=res.windowHeight
			// 			console.info('屏幕高度111')
			// 			console.info(res)
			// 			console.info(this.statusBarHeight)
			// 			console.info(this.windowHeight)

			//         }
			//     });
		},
		methods: {
			// 消息订阅
			information() {
				if (uni.getStorageSync('crmOpenId') == undefined) {
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
									success(res) {

										// 							setTimeout(function() {
										// 								uni.showToast({
										// 									title: '已成功订阅消息'

										// 								})
										// 							});
									}
								})
							})
						}
					});

				}
				uni.requestSubscribeMessage({
					tmplIds: ['37sLCYEIk_hyCaIJSi_PyrLDMTeskWQQj5fCk0fJ_3Q',
						'm7DvAKj6w64jLUaWdyoPtt4UajuUW645XORduQAXjYc',
						'Jvy4G8eDQ2LgsSqu9FFNyGFAZOCnD0oFuxsXeOJQPm4'
					],
					success(res) {
						// console.info('订阅消息')
						// console.info(res)
						// console.info(res)
						// // console.info(res.37sLCYEIk_hyCaIJSi_PyrLDMTeskWQQj5fCk0fJ_3Q)
						// setTimeout(function() {
						// 	uni.showToast({
						// 		title: '已成功订阅消息'

						// 	})
						// });
					}
				})

			},
			theOrderDetailsSkip(idx, index) {
				var item = {
					idx: idx,
					list: this.clientList[index].wxMarketBusirSerpricetList
				}
				uni.navigateTo({
					url: "/pageKh/theOrderDetails/theOrderDetails?item=" +
						encodeURIComponent(JSON.stringify(item)) //跳转页面的路径+传值
				});
			},
			//拨打电话
			ringUp(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			}
		}
	}
</script>
<style lang="scss" scoped>
	.client {
		.u-icon__icon {
			color: pink !important;
		}
	}
</style>
<style lang="scss" scoped>
	.client {
		position: relative;
		z-index: 10;
		box-sizing: border-box;
		max-height: calc(100vh - env(safe-area-inset-bottom));
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		// height: 100vh;
		// padding-top: 152px;
		.contentNone {
			// margin: auto;
			text-align: center;
			padding-left: 12.5px;
			padding-right: 12.5px;
			padding-top: 30px;
			padding-bottom: 30px;
			background-color: #FFFFFF;
		}

		.client_title {
			padding-left: 16px;
			height: 40px;
			line-height: 40px;
			font-size: 18px;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
		}

		.client_head {
			width: 100%;
			padding-left: 25rpx;
			padding-right: 25rpx;
			.head_box {
				width: 100%;
				height: 338rpx;
				background-color: #ffffff;
				opacity: 0.91;
				border-radius: 18rpx;
				box-shadow: 0rpx 4rpx 6rpx -2rpx #EDEDED;
				padding-top: 15px;
				text-align: center;

				.news {
					display: flex;
					justify-content: space-between;
					padding-left: 46rpx;
					padding-right: 49rpx;

				}

				.head_box_money {
					font-size: 98rpx;
					font-family: DINPro;
					font-weight: 500;
					color: #303133;
				}

				.head_box_font {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #EF5465;
				}
			}
		}

		.client_content {
			background-color: #F5F6F7;
			box-sizing: border-box;
			.content_title {
				padding-top: 87rpx;
				padding-right: 25rpx;
				padding-left: 25rpx;
				background-color: #ffffff;
				padding-bottom: 4rpx;

				.title {
					font-size: 40rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #303133;
					padding-left: 18rpx;
					height: 42rpx;
					line-height: 40rpx;

					border-left: 7rpx solid #3978E7;
				}
			}

			.content {
				width: 100%;
				overflow-x: hidden;
				overflow-y: scroll;
				height: calc(100% - 67px);
				background-color: #F5F6F7;
				.child {
					margin-bottom: 10px;
					padding-right: 12.5px;
					padding-left: 12.5px;
					background-color: #ffffff;

					.top {
						padding-left: 12.5px;
						height: 63px;
						line-height: 63px;
						border-bottom: 0.5px solid #E6E7EB;

						.number {
							display: flex;
							flex-direction: row;
							// padding-left: 56px;
							// margin-top: 10px;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;

							.ask {

								font-size: 16px;
								font-family: PingFang SC;
								font-weight: bold;
								color: #203783;
							}

							.answer {
								font-size: 16px;
								font-family: PingFang SC;
								font-weight: bold;
								color: #203783;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;

							}
						}
					}

					.centen {
						padding-top: 4px;
						padding-bottom: 6.5px;

						.centen_child {
							display: flex;
							flex-direction: row;
							align-items: center;
							// padding-top: 17px;
							padding-left: 13.5px;
							padding-right: 19.5px;
							padding-top: 9px;
							padding-bottom: 9px;

							// margin-top: 6px;
							// margin-bottom: 16px;
							.icon {
								width: 18px;
								height: 18px;
								line-height: 16px;
								text-align: center;
								border: 1px solid #f16978;
								border-radius: 50%;
								font-size: 13px;
								font-family: DINPro;
								font-weight: 400;
								color: #f16978;
								margin-right: 15px;
							}

							.child_content {

								.content_top {
									display: flex;
									flex-direction: row;
									align-items: center;
									margin-bottom: 6px;

									.title {
										font-size: 16px;
										font-family: PingFang SC;
										font-weight: bold;
										color: #3A3B3D;
									}

									.label {
										// width: 60px;
										height: 19px;
										line-height: 19px;
										background: #F7F7F7;
										border-radius: 3px;
										padding-left: 7.5px;
										padding-right: 7.5px;
										font-size: 11px;
										font-family: PingFang SC;
										font-weight: 500;
										color: #ADAEB3;
										margin-left: 11px;
									}
								}

								.content_bottom {
									display: flex;
									flex-direction: row;

									// padding-bottom: 16px;
									.ask {
										font-size: 13px;
										font-family: PingFang SC;
										font-weight: 400;
										color: #6E7073;
									}

									.time {
										font-size: 13px;
										font-family: DINPro;
										font-weight: 300;
										color: #6E7073;
									}
								}
							}

						}
					}

					.show {
						padding-left: 16.5px;
						padding-right: 16.5px;

						.show_box {
							padding-left: 21.5px;
							padding-right: 20.5px;
							width: 100%;
							background: linear-gradient(0deg, #F5FFFA, #FAFCFB);
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							padding-top: 12px;
							padding-bottom: 11px;

							.show_child {
								display: flex;
								flex-direction: column;

								.chlid_top {
									font-size: 12px;
									font-family: PingFang SC;
									font-weight: 500;
									color: #A1A2A6;
									margin-bottom: 4px;
								}

								.child_price {
									font-size: 18px;
									font-family: DINPro;
									font-weight: 500;
									color: #565759;
								}
							}
						}
					}

					.placeAn {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding-left: 34.5px;
						padding-right: 16.5px;
						padding-top: 10px;
						padding-bottom: 14px;

						.placeAnOrder {
							display: flex;
							flex-direction: column;
							// flex-direction: row;
							// padding-left: 38px;
							// padding-right: 38px;
							// padding-top: 13px;
							// padding-bottom: 17px;

							.placeAnOrder_ask {
								font-size: 13px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #6E7073;
								line-height: 21px;
							}

							.placeAnOrder_time {
								font-size: 13px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #6E7073;
								line-height: 21px;
							}
						}

						.line {
							width: 0.5px;
							height: 32.5px;
							background: #E6E7EB;
						}

						.phone {
							.phone_image {
								width: 36px;
								height: 36px;
							}
						}
					}
				}
			}

		}

		.suspension {
			position: fixed;
			bottom: 100px;
			right: 12.5px;
			width: 64.5px;
			height: 64.5px;

			.suspension_img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
