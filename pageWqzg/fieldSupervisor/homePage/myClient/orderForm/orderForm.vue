<template>
	<view class="orderForm">
		<!-- 外勤主管-订单 -->
		<view class="seek">
			<view class="seek_box">
				<u-icon name="search" color="#C1C2C7" size="32"></u-icon>
				<input  placeholder='请输入搜索内容' class="input" @input="onKeyInput" />
			</view>
		</view>
		<!-- v-if="salesmanOrderFormByValue.lenght>0" -->
		<view class="content" >
			<view class="child" v-for="(item,index) in salesmanOrderFormByValue" :key="index">
				<view class="top">
					<view class="title">
						<view class="icon">
							客户
						</view>
						<view class="name">
							{{item.companyName}}
						</view>
					</view>
					<view class="number">
						<text class="ask">订单编号：</text>
						<view class="answer">{{item.orderNo}}</view>
					</view>
				</view>
				<view class="centen">
					<view class="centen_child" v-for="(items,idx) in item.wxMarketBusirSerpricetList" :key="items.id"  @click="particulars(idx,index)">
						<view class="icon">{{idx+1}}</view>
						<view class="child_content">
							<view class="content_top">
								<text class="title">{{items.serpriceName}}</text>
								<view class="label">{{items.projectProcess}}</view>
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
							<text class='child_price'>{{item.orderAmount}}</text>
						</view>
						<view class="show_child">
							<text class="chlid_top">已收金额(元)</text>
							<text class='child_price'>{{item.amountReceived}}</text>
						</view>
						<view class="show_child">
							<text class="chlid_top">未收金额(元)</text>
							<text class='child_price' style="color:#EF5465">{{item.uncollectedAmount}}</text>
						</view>
					</view>
				</view>
				<view class="placeAnOrder">
					<text class="placeAnOrder_ask">下单时间：</text>
					<text class='placeAnOrder_time'>{{item.placeOrderDate}}</text>
				</view>
			</view>
		</view>
		<!-- <view v-else>
			暂无
		</view> -->
	</view>
</template>
<script>
	export default {
		// props:['salesmanOrderFormByValue'],
		data() {
			return {
				grabble: null,//搜索
				receive:null,//父元素传值
				salesmanOrderFormByValue:[]
				// salesmanOrderFormByValue:this.salesmanOrderFormByValue

			}
		},
		onLoad(option) {
			 const item = JSON.parse(decodeURIComponent(option.item));
			   this.receive = item
			   console.info('任务详情外勤主管——')
			   console.info(this.receive)
			   var event={
				   target:{
					    value:item.companyName
				   }
			   }
				  
			   
			   // var event.target.value=item.companyName
			   // console.info(event.target.value)
			   // this.onKeyInput()
			   this.getList()
		},
		methods: {
getList(){
	this.$u.get('/salesman/findOrderListById',{id:this.receive.companyId}).then(resp => {
			console.info('TZ请求')
			console.info(resp)
		this.salesmanOrderFormByValue = resp.records
		console.info(this.salesmanOrderFormByValue)
	})
},
			onKeyInput(event) {
				if( event.target.value){
				    this.grabble = event.target.value
					this.$u.post('/salesman/findOrderList',{blurryKeyword: this.grabble,id:this.receive.companyId}).then(resp => {
							console.info(this.salesmanOrderFormByValue)
						this.salesmanOrderFormByValue = resp.rows
					})
					}else{
						this.getList()
					}
					
			
			},
			particulars(idx,index) {
				var list=this.salesmanOrderFormByValue[index].wxMarketBusirSerpricetList
				console.info(list)
				var idx = idx
				var obj={idx,list}
				uni.navigateTo({
					url: "/pageYwy/salesman/orderForm/taskDetails/taskDetails?item=" +
						encodeURIComponent(JSON.stringify(obj)),
				});
			}
		},
		onReachBottom() {
			// this.getList()
		}
	}
</script>
<style lang="scss">
	.orderForm {
		width: 100%;
		.seek {
			background: #fff;
			padding-left: 16px;
			padding-right: 16px;
			padding-top: 13px;
			padding-bottom: 6.5px;

			// border-bottom: 0.5px solid #EDEDED;
			.seek_box {
				height: 36px;
				background: #F8F9FB;
				border-radius: 18px;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding-left: 16px;
				padding-right: 16px;

				.input {
					font-size: 12px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #808080;
					margin-left: 8px;

				}
			}
		}

		.content {
			padding-top: 14px;
			padding-left: 12px;
			padding-right: 12px;

			.child {
				background-color: #FFFFFF;
				margin-bottom: 10px;

				.top {
					padding-bottom: 12px;
					border-bottom: 0.5px solid #E6E7EB;

					.title {
						display: flex;
						flex-direction: row;
						padding-left: 16px;
						padding-right: 16px;
						padding-top: 20px;

						.icon {
							height: 18px;
							line-height: 18px;
							background: #3978E7;
							border-radius: 9px;
							margin-right: 9px;
							font-size: 11px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							padding-left: 5px;
							padding-right: 5px;
						}

						.name {
							font-size: 16px;
							font-family: PingFang SC;
							font-weight: bold;
							color: #203783;
						}
					}

					.number {
						display: flex;
						flex-direction: row;
						padding-left: 56px;
						margin-top: 10px;

						.ask {
							font-size: 13px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #99A3C2;
						}

						.answer {
							font-size: 13px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #99A3C2;
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
						padding-left: 21.5px;
						padding-right: 21.5px;
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
									width: 60px;
									height: 19px;
									line-height: 19px;
									background: #F7F7F7;
									border-radius: 3px;
									padding-left: 7.5px;
									padding-right: 7.5px;
									font-size: 11px;
									font-family: PingFang SC;
									font-weight: 500;
									text-align: center;
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

				.placeAnOrder {
					display: flex;
					flex-direction: row;
					padding-left: 38px;
					padding-right: 38px;
					padding-top: 13px;
					padding-bottom: 17px;

					.placeAnOrder_ask {
						font-size: 13px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #6E7073;
					}

					.placeAnOrder_time {
						font-size: 13px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #6E7073;
					}
				}
			}
		}
	}
</style>
