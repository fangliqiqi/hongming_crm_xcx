<template>
	<view class="costDetails">
		<!-- 费用详情 -->
		<view class="u-tabs-box">
			<u-tabs-swiper activeColor="#3978E7" :bold="true" inactiveColor="#6E7073" ref="tabs" :list="list"
				height='102' :current="current" @change="change" :is-scroll="false" swiperWidth="750" bg-color='#fff'>
			</u-tabs-swiper>
		</view>

		<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
			style=" min-height: calc(100vh - 68px);">
			<swiper-item>
				<scroll-view scroll-y style="height: 100%; width: 100%;">
					<view class="swiper_child" v-for="(item,index) in list[swiperCurrent].child">
						<view class="child_title">订单编号：{{item.dd}}</view>
						<view class="child_content">
							<view class="child_content_son">
								<image src="@/static/image/unTopUp.png" class="son-image"></image>
								<view class="son_price">充值金额：{{item.dd}}元</view>
							</view>
							<view class="child_content_son">
								<image src="@/static/image/pay.png" class="son-image"></image>
								<view class="son_price">支付方式：{{item.dd}}</view>
							</view>
							<view class="child_content_son">
								<image src="@/static/image/time.png" class="son-image"></image>
								<view class="son_price">充值时间：{{item.dd}}</view>
							</view>
						</view>
					</view>

				</scroll-view>
			</swiper-item>
			<!--  -->
			<swiper-item>
				<scroll-view scroll-y style="height: 100%;width: 100%;">
					<view class="swiper_child" v-for="(item,index) in list[swiperCurrent].child">
						<view class="child_title">订单编号：{{item.dd}}</view>
						<view class="child_contentB">
							<view class="child_content_sonB" v-for="(ite,ind) in item.child">
								<!-- {{ite.name}} -->
								<view class="sonB_icon">{{ind+1}}</view>
								<view class="sonB_content">
									<view class="sonB_content_title">
										<view class="sonB_content_title_name">{{ite.name}}</view>
										<view class="sonB_content_title_lab">扣费金额：99元</view>
									</view>
									<view class="sonB_content_time">服务时间：{{ite.time}}</view>
									<view class="sonB_content_time">扣费时间：{{ite.time}}</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>


		</swiper>

		<view class="wrap">
			<u-icon name='arrow-up' color='#fff' size="28px"></u-icon>
			<u-back-top class="wrap" scroll-top="scrollTop">
			</u-back-top>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				companyId:uni.getStorageSync('companyData').id,
				dataList:[],
				list: [{
					name: '充值记录',
					child: [{
						dd: '1234567',
						qian: '3000'
					}, {
						dd: '1234567',
						qian: '3000'
					}]

				}, {
					name: '消费记录',
					child: [{
						dd: '999999',
						qian: '3000',
						child: [{
							name: '张云雷',
							time: '2021-5-24'
						}, {
							name: '张云雷',
							time: '2021-5-24'
						}]
					}, {
						dd: '9999999999999999',
						qian: '3000'
					}]
				}],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的

				tabsHeight: 0,
				dx: 0,
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShow() {
			this.getList()
		},
		methods: {
			getList(){
				this.$u.post('/client/findBillList' ,{companyId:this.companyId}).then(response => {
					console.info('账单')
					console.info(response)
					})
			},
			// tab栏切换
			change(index) {
				console.info('切换')
				console.info(index)
				this.swiperCurrent = index;

			},
			transition({
				detail: {
					dx
				}
			}) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({
				detail: {
					current
				}
			}) {
				this.$refs.tabs.setFinishCurrent(current);
			}

		},
		// http配置请求
		onLoad(option) {
			//根据选项卡状态跳转对应下标
			this.current = option.type
			this.swiperCurrent = option.type
		}
	}
</script>

<style lang="scss" scoped>
	.u-tabs-box{
		    // position: fixed;
		    top: 0px;
		    width: 100%;
		    z-index: 9999999999;
	}
	.costDetails {
		// position: relative;
		// padding-top: 51px;
		// padding-bottom: 68px;

		.swiper-box {
			background-color: #f5f6f7;
			padding-top: 10px;
			padding-left: 11.5px;
			padding-right: 11.5px;

			.swiper_child {
				background-color: #FFFFFF;
				margin-bottom: 10px;

				.child_title {
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: bold;
					color: #3A3B3D;
					height: 46px;
					line-height: 46px;
					border-bottom: 0.5px solid #E6E7EB;
					padding-left: 18px;
				}

				.child_content {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					padding-left: 16.5px;
					padding-right: 15px;
					padding-top: 13.5px;
					padding-bottom: 13px;

					.child_content_son {
						display: flex;
						align-items: center;
						height: 29.5px;

						// line-height: 29.5px;
						.son-image {
							width: 15px;
							height: 15px;
							margin-right: 2.5px;
						}

						.son_price {
							font-size: 13px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #3A3B3D;
						}
					}

					
				}
				.child_contentB{
					padding-left: 18px;
					padding-right: 18px;
					padding-top: 0px;
					padding-bottom: 0px;
					.child_content_sonB {
						width: 100%;
						display: flex;
						border-bottom: 0.5px solid #E6E7EB;
						padding-top: 17.5px;
						padding-bottom: 13px;
						.sonB_icon {
							width: 18px;
							height: 18px;
							margin-top: 12px;
							border: 1px solid #f37b88;
							border-radius: 9px;
							font-size: 13px;
							font-family: DINPro;
							font-weight: 400;
							color: #f37b88;
							text-align: center;
							line-height: 16px;
							margin-right: 14.5px;
						}
					
						.sonB_content {
							.sonB_content_title {
								display: flex;
								margin-bottom: 4.5px;
								.sonB_content_title_name {
									font-size: 16px;
									font-family: PingFang SC;
									font-weight: bold;
									color: #3A3B3D;
									margin-right: 18.5px;
								}
								
					
								.sonB_content_title_lab {
									height: 19px;
									line-height: 19px;
									background: #FDF6F0;
									border-radius: 3px;
									font-size: 11px;
									font-family: PingFang SC;
									font-weight: 500;
									color: #F3A35F;
									padding-left: 7.5px;
									padding-right: 7.5px;
								}
							}
							.sonB_content_time{
								font-size:13px;
								font-family: PingFang SC;
								font-weight: 400;
								color: #6E7073;
								height: 22px;
								line-height: 22px;
							}
						}
					}
					.child_content_sonB:last-child{
						border-bottom: 0px;
					}				
				}
			}
		}

		.wrap {
			width: 40px;
			height: 40px;
			line-height: 43px;
			border-radius: 50%;
			border: 0.5px solid #6E7073;
			background-color: #6E7073;
			text-align: center;
			opacity: 0.2;
			position: fixed;
			right: 20px;
			bottom: 100px;

			.child_Rimage {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
