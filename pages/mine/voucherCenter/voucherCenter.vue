<template>
	<view class="voucherCenter">
		<!-- 充值中心 -->
		<view class="voucherCenter_title">
			<text class="voucherCenter_title_t">充值金额</text>
			<text class="voucherCenter_title_rear">(元)</text>
		</view>
		<view class="voucherCenter_money" v-if="money!=''">
			{{money||''}}

		</view>
		<view class='voucherCenter_money hint' v-else>请选择充值金额</view>
		<view class="voucherCenter_select">选择充值金额</view>
		<view class='voucherCenter_content'>
			<u-row gutter="20">
				<u-col span="4" v-for="(item,index) in selectList" @click="select(item)">
					<view class="content_child" :class="money==item?'childHover':''">
						{{item||0}}<text class="hit" :class="money==item?'hitHover':''">元</text>
					</view>
				</u-col>
				<u-col span="4" v-if="judge==false" @click="judge=true,money=''">
					<view class="content_child" v-if="judge==false" @click="judge=true,money=''">
						<view class="child_rest">自定义</view>
					</view>
				</u-col>
				<!--  -->
				<!-- <u-col span="4" v-if="judge">
					<view class="content_child childHover" v-if="judge">
						<u-field focus v-model="money" placeholder="请输入金额" class="input" @blur='judge=false'>
						</u-field>
					</view>
				</u-col> -->
				<u-col span="4" v-if="judge">
					<view class="content_child childHover" v-if="judge">
						<u-input v-model="money" height='146' clearable='true' placeholder="请输入金额" focus='true' input-align='center' type="number"  :border="border" class="input" @blur='judge=false'   />
					</view>
				</u-col>
			</u-row>
		</view>
		<view class='submit' @click="submitTopUp" :class="money?'submitHover':''">确定</view>
	</view>
</template>

<script>
	export default {
		props: ['crmOpenId','moneyS'],
		data() {
			return {
				importMoney: '', //自定义的金额
				judge: false, //判断值
				selectList: ['500', '2400', '3000', '4000', '5000'],
				money:'', //充值金额
				companyId: '', //公司id

			}
		},
		onShow() {
		},
		methods: {


			select(item) {
				this.money = item
				this.judge = false
			},

			submitTopUp() {
				this.companyId = uni.getStorageSync('companyData').id
				var model = ''
				uni.getSystemInfo({
					success: function(response) {
						model = response.platform
					},
				})
				var openId = this.crmOpenId
				if(this.companyId==undefined||this.companyId==''){
					setTimeout(function() {
						uni.showToast({
							title: '请先完成登录',
							icon: 'none',
						})
					});
				}
				var form = {
					companyId: this.companyId,
					money: this.money,
					giftMoney: '',
					type:model
				// 	type: 'IOS'
				}
				var payStatus = '' //支付状态10-成功,20-失败
				this.$u.post("/client/recharge", form).then(resp => {
					uni.requestPayment({
						appId: resp.appId,
						nonceStr: resp.nonceStr,
						orderNo: resp.orderNo,
						package: resp.package,
						paySign: resp.paySign,
						signType: resp.signType,
						timeStamp: resp.timeStamp,
						success: (res) => {
							payStatus = 10
						},
						fail: (err) => {
							payStatus = 20
						},
						complete: (err) => {
							this.$u.post("/client/rechargeCallback", {
								id: resp.orderNo,
								payStatus: payStatus,
								companyId: this.companyId
							}).then(resp => {
								this.money = ''
								setTimeout(function() {
									uni.showToast({
										title: '充值成功',
										// icon: 'none',
									})
								});
							}).catch(resp => {
								setTimeout(function() {
									uni.showToast({
										title: '抱歉充值失败',
										icon: 'none',
									})
								});
							})
						}

					});
				})
			}
		},
		watch:{
			moneyS:{
			  handler (n,o) {
				this.money=''
			  },
			  deep: true 
			},
		}
	
	}
</script>

<style scoped lang="scss">
	.voucherCenter {
		border-top: 0.5px solid #E6E7EB;
		padding-left: 16px;
		padding-right: 16px;
		padding-top: 36px;
		padding-bottom: 50px;
		background-color: #fff;
		// position: relative;
		height: calc(100vh - 169rpx);

		.voucherCenter_title {
			.voucherCenter_title_t {
				font-size: 18px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3A3B3D;
			}

			.voucherCenter_title_rear {
				font-size: 12px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3A3B3D;
			}
		}

		.voucherCenter_money {
			border-bottom: 1px solid #E6E7EB;
			font-size: 44px;
			font-family: DINPro;
			font-weight: 500;
			color: #303133;
			height: 69px;
			line-height: 69px;
			margin-top: 5px;

		}

		.hint {
			font-size: 16px;
			color: #E6E7EB;

		}

		.voucherCenter_select {
			font-size: 14px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #3A3B3D;
			height: 43px;
			line-height: 43px;
			margin-top: 14.5px;
		}

		.voucherCenter_content {
			display: flex;
			flex-wrap: wrap;

			.content_child {
				display: flex;
				    justify-content: center;
				    align-items: center;
				// width: 108px;
				height: 73px;
				line-height: 73px;
				background: #F7F7F7;
				border-radius: 1px;
				margin-bottom: 10px;
				font-size: 24px;
				font-family: DINPro;
				font-weight: 500;
				color: #3A3B3D;

				.hit {
					font-size: 12px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D
				}

				.child_rest {
					font-size: 12px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D
				}
			}

			.content_child:nth-child(2),
			.content_child:nth-child(5),
			.content_child:nth-child(8) {
				margin-left: 9.5px;
				margin-right: 9.5px;
			}

			.childHover {
				background-color: #ECF2FC;
				color: #427ee8;

				.hitHover {
					color: #427ee8;
				}
			}

		}

		.submit {
			position: fixed;

			bottom: 130px;
			width: calc(100% - 32px);
			height: 45px;
			line-height: 45px;
			text-align: center;
			background-color: #e6e7eb;
			border-radius: 22.5px;
			font-size: 15px;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}

		.submitHover {
			background: #3978E7;
		}
	}
</style>
<style lang='scss'>
	
	.voucherCenter {
		.content_child {
			.input {
				color: red;
				height: 73px;
				
				/* .u-border-bottom{
					height: 73px !important;
					.u-field-inner{
						height: 100%;
					}
				} */
				.fild-body {
					height: 73px;
				}
			}
		}

		.input {
			color: pink;

			.u-field {

				padding: 0px;
				height: 100%;
			}

			.u-field-inner {
				height: 100%;

				.u-label {
					flex: 0 !important;
				}

				.fild-body {
					height: 100%;
					width: 100%;

					.u-flex {
						width: 100%;
						height: 100%;

						>input {
							width: 100%;
							height: 100%;
							text-align: center;
						}
					}
				}

			}
		}
	}
.voucherCenter {
		.content_child {
			display: flex;
			align-items: center;
			}
			}
</style>
