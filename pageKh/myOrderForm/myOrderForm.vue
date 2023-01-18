<template>
	<view class="myOrderForm">
		<!-- 我的订单 -->
		<view class="client_content">
			<view class="content">

				<view class="child" v-for="(item,index) in myOrderFormList" :key="index">
					<view class="top">
						<view class="number">
							<text class="ask">订单编号：</text>
							<view class="answer">{{item.orderNo||''}}</view>
						</view>
					</view>
					<view class="centen">
						<view class="centen_child" v-for="(items,idx) in item.wxMarketBusirSerpricetList"
							:key="items.id" @click="theOrderDetailsSkip(idx,index)"   >
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
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				reload: true,
				loading: false,
				page: 1,
				pageSize: 10,
				tatol: 0,
				myOrderFormList: [], //数据列表
				companyId:uni.getStorageSync('companyData').id,
				keyword: ''
			}
		},
		onShow() {
			this.keyword = ''
			// this.getList()
			let that = this;
			this.$nextTick(function() {

				if (that.reload) {
					this.page = 1
					this.pageSize = 10
					this.myOrderFormList = []
					// uni.setNavigationBarTitle({
					// 	title: '待办事项'
					// })
					that.getList()
					// that.getPageInfo()
					this.loading = false;
					// that.reload = false
				} else {
					that.reload = true
				}
			})
		},
		methods: {
			reloadFun(val) {
				this.reload = val
			},
			getList() {
				let keyword = this.keyword || '';

				if (this.myOrderFormList.length == 0) {
					this.page = 1
				} else {
					this.page = this.myOrderFormList.length == this.tatol ? this.page : ++this.page;
				}
				let data = {
					page: this.page,
					pageSize: 10
				}
				var params = Object.keys(data).map(function(key) {
					// body...
					return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
				}).join("&");

				this.$u.post('/client/findOrderList?1=1&' + params,{companyId:this.companyId}).then(response => {
					this.tatol = response.totalRows
					this.myOrderFormList = (this.page == 1 ? [] : this.myOrderFormList)
						.concat(response.rows)
					if (typeof cb == 'function') {
						cb()
					}
				}).catch(() => {
					this.loading = false;
				})
			},
			theOrderDetailsSkip(idx, index) {
				var that=this
				var item = {
					idx: idx,
					list: that.myOrderFormList[index].wxMarketBusirSerpricetList
				}
				uni.navigateTo({
					url: "/pageKh/theOrderDetails/theOrderDetails?item=" +
						encodeURIComponent(JSON.stringify(item)), //跳转页面的路径+传值
						events:{
							acceptDataFromOpenedPage: (data)=> {
								  that.reload=false
								  // that.$emit('reload',false)
							},
						}
				});
			},
			//拨打电话
			ringUp(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			}
			
		},
		onReachBottom() {
			let that = this;
			let loading = this.loading;
			let page = this.page || 1;
			let pageSize = this.pageSize || 10;
			let tatol = this.tatol || 0;
			if (!loading) {
				// that.loading = true;
				if (tatol / pageSize > page) {
					this.getList(function() {
						that.loading = false;
						that.page = page + 1;
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myOrderForm {
		.client_content {
			background-color: #F5F6F7;
			border-top: 0.5px solid #E6E7EB;

			.content {
				width: 100%;
				overflow-x: hidden;
				overflow-y: scroll;

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

	}
</style>
