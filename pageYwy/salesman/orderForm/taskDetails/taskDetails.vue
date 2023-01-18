<template>
	<view class="taskDetails">
		<!-- 业务员——任务详情 -->

		<view class="hear">
			<view class="hear_content">
				<!-- @click="judgeId=item.id" -->
				<view class="cut" v-for="(item,index) in list" @click="judge(item.id)"
					:class="judgeId==item.id?'queen':'cut'">{{item.serpriceName}}</view>
				<!-- <view class="cut" @click="judgeId=true" :class="judgeId==true?'queen':'cut'">记账报税</view> -->
			</view>
		</view>
		<!-- 工商注册 -->
		<view class="content">
			<view class="content_box">
				<view class="box_title">项目进度</view>
				<!-- 订单创建 -->
				<view class='box_child'>
					<view class="childTitle">
						<view class="titleIcon" :class="dataList[0].enable==10?'titleIcon':'color'">
							<icon type="success_no_circle" size="10" color='#fff' />
						</view>
						<view class="titleFont">
							{{dataList[0].roamName||''}}
						</view>
					</view>
					<view class="childContent">
						<text class="ask">执行人：</text>
						<text class="reply">{{dataList[0].userName||''}}</text>
						<view class="link"></view>
					</view>
				</view>
				<!-- 资料收集 -->
				<view class='box_child  dataGather ' v-if="dataList.length>=2">
					<view class="childTitle">
						<view class="titleIcon" :class="dataList[1].enable==10?'titleIcon':'color'">
							<icon type="success_no_circle" size="10" color='#fff' />
						</view>
						<view class="titleFont">
							{{dataList[1].roamName||''}}
						</view>
						<view class='notice'>
							<view class="noticeIcon">
								!
							</view>
							<view class="noticeName" @click="notice">
								须知
							</view>
						</view>
					</view>
					<view class="childContent">
						<view class="askBox">
							<text class="ask">执行人：</text>
							<text class="reply">{{dataList[1].userName||''}}</text>
						</view>
						<view class="btnBox" v-if="dataList[1].enable==20" @click="datum">
							<view class="data" @click="datum">资料</view>
							<view class="contract" @click="contract">合同</view>
						</view>
						<!-- <view class="btnBox" v-else-if="dataList[1].enable==10">
							<view class="data" @click='hint'>资料</view>
							<view class="contract" @click='hint'>合同</view>
						</view> -->
						<view class="btnBox" v-else>
							<view class="data" @click="datum">资料</view>
							<view class="contract" @click="contract">合同</view>
						</view>
						<view class="link"></view>
					</view>
				</view>
				<!-- 订单审核 -->
				<view class='box_child orderReview' v-if="dataList.length>=3">
					<view class="childTitle">
						<view class="titleIcon" :class="dataList[2].enable==10?'titleIcon':'color'">
							<icon type="success_no_circle" size="10" color='#fff' />
						</view>
						<view class="titleFont">
							{{dataList[2].roamName}}
						</view>
					</view>
					<view class="childContent">
						<view class='nzAudit'>
							<text class="ask">内帐审核-{{dataList[2].wxAuditDetailsResult.nzName}}:</text>
							<view class='reply' v-if="dataList[2].wxAuditDetailsResult.nzStatus==20">通过</view>
							<view class='no' v-if="dataList[2].wxAuditDetailsResult.nzStatus==30">不通过</view>
						</view>
						<view class='nzAudit ddAudit'>
							<text class="ask">调度审核-{{dataList[2].wxAuditDetailsResult.ddName}}:</text>
							<view class='reply' v-if="dataList[2].wxAuditDetailsResult.ddStatus==20">通过</view>
							<view class='no' v-if="dataList[2].wxAuditDetailsResult.ddStatus==30">不通过</view>
						</view>
						<view class="link"></view>
					</view>
				</view>
				<!-- 业务执行 -->
				<view class='box_child businessExecute' v-if="dataList.length>=4">
					<view class="childTitle">
						<view class="titleIcon" :class="dataList[3].enable==10?'titleIcon':'color'">
							<!-- <icon type="success_no_circle" size="10" color='#fff' /> -->
							4
						</view>
						<view class="titleFont">
							{{dataList[3].roamName}}
						</view>
					</view>
					<view class="childContent">
						<view class="childContentBox">
							<view class="boxChild" v-for="(item,index) in dataList[3].crmIntermExecutorList">
								<view class="childNumber">STEP{{index+1}}</view>
								<view class="childList">
									<view class="listTitle">
										<view class="titleIcon"></view>
										<view class="titleName">{{item.performName}}</view>
									</view>
									<view class="listExecute">
										<text class="executeAsk">执行人：</text>
										<text class="executeName">{{item.execUserName}}</text>
									</view>
								</view>
							</view>

						</view>
						<view class="link"></view>
					</view>
				</view>
				<!-- 完成 -->
				<view class='box_child accomplish' v-if="dataList.length>=4">
					<view class="childTitle">
						<view class="titleIcon">
							5
						</view>
						<view class="titleFont">
							完成
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class='noticeBOX' v-if="noticeJudge" @click="noticeJudge=false">
			<view class="noticeBOX_content">
				<image class="headimgsize" src="@/static/image/notice-bg.png" mode=""></image>
				<view class="contentBox">
					<view class="title">资料收集须知</view>
					<view class="askFor">
						<view class='askForTitle'>一、项目要求</view>
						<view class="askForContent">
							<text class="font">1-房东身份证；</text>
							<text class="font">2-法人身份证；</text>
						</view>
					</view>
					<view class="remark">
						<text class="remarkChild">备注</text>
						<text class="remarkChild">省级/宣城/宿州/国外（需要提供本人并且和提供手机号码绑定的银行卡号码）；</text>
						<text class="remarkChild">宣城/阜阳财务人员需要另外提供（设立公司最 少要3为人员）</text>
					</view>
					<view class="noticeBOX_btn" @click="noticeJudge=false">知道了</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				idx: '', //传参接受的下标
				list: [], //传参接受的数据
				dataList: [],
				byValue: {},
				judgeId: '',
				noticeJudge: false, //须知

			}
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.idx = item.idx
			this.list = item.list
			this.judgeId = this.list[this.idx].id
			this.getList()
		},
		onUnload() {
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.emit('acceptDataFromOpenedPage', {
				data: 'test'
			});
		},
		onPullDownRefresh() {
			this.getList();
		},
		methods: {
			hint() {
				setTimeout(function() {
					uni.showToast({
						title: '本步骤已完成不可以更改了',
						icon: 'none',
					})

				}, 1000);
			},
			getList() {

				var id = this.list[this.idx].id
				this.$u.get('/salesman/findOrderDetails', {
					id: id
				}).then(resp => {
					this.dataList = resp
					uni.stopPullDownRefresh()
				})

			},
			datum() {
				console.info(this.dataList)
				var byValue = this.dataList[1]
				uni.navigateTo({
					url: "/pageYwy/salesman/orderForm/taskDetails/dataCollection/dataCollection?byValue=" +
						encodeURIComponent(JSON.stringify(byValue)),
				});
			},
			// 合同
			contract() {
				uni.navigateTo({
					url: "/pageYwy/salesman/orderForm/taskDetails/contractData/contractData"
				});
			},
			// 须知
			notice() {
				this.noticeJudge = true
			},
			judge(id) {
				console.info('切换')
				console.info(id)
				var id = id;
				this.judgeId = id
				this.$u.get('/salesman/findOrderDetails', {
					id: id
				}).then(resp => {
					this.dataList = resp
				})
			}

		},
		onReachBottom() {
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	.taskDetails {
		position: relative;
		background-color: #FFFFFF;
		padding-bottom: 30px;
		width: 100%;

		.color {
			background-color: #E1E1E1 !important;
		}

		.hear {
			height: 52px;
			overflow: hidden;

			.hear_content {
				// background-color: #FFFFFF;
				border-top: 0.5px solid #EEEEEE;
				width: 100%;
				height: 60px;
				// display: flex;
				// overflow:auto;
				// flex-direction: row;
				//  flex-wrap: nowrap;
				// justify-content: space-evenly;
				display: -webkit-box;
				overflow: auto;
				display: -webkit-inline-box;
				justify-content: center;

				.cut {
					// width: 50%;
					height: 51px;
					line-height: 51px;
					text-align: center;
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #6E7073;
					padding: 0 12px;
					min-width: auto;
				}

				.queen {
					color: #303133 !important;
					position: relative;

					&:before {
						content: '';
						display: inline-block;
						width: 30px;
						height: 2px;
						background: #3978E7;
						border-radius: 0.5px;
						position: absolute;
						bottom: 0px;
						left: calc(50% - 15px);
					}
				}
			}
		}

		.content {
			padding: 11px 12px;
			background-color: #f5f6f7;

			.content_box {
				background-color: #FFFFFF;
				padding-left: 18px;
				padding-right: 18px;
				padding-top: 22px;
				padding-bottom: 25px;

				.box_title {
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D;
					margin-bottom: 22px;
				}

				.box_child {
					.childTitle {
						display: flex;
						flex-direction: row;
						align-items: center;

						.titleIcon {
							width: 18px;
							height: 18px;
							background: #2DD199;
							border-radius: 50%;
							text-align: center;
							line-height: 19px;

						}

						.titleFont {
							font-size: 17px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #3A3B3D;
							margin-left: 11px;
						}
					}

					.childContent {
						border-left: 1px solid #EEEEEE;
						padding-top: 5px;
						padding-left: 20px;
						padding-bottom: 20px;
						;
						margin-left: 9px;

						// border-bottom: 1px solid #EEEEEE;
						.ask {
							font-size: 15px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #6E7073;
						}

						.reply {
							font-size: 15px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #6E7073;

						}

						.link {
							margin-top: 20px;
							width: 100%;
							height: 0.5px;
							background-color: #EEEEEE;
						}
					}
				}

				// 资料收集
				.dataGather {
					.childTitle {
						position: relative;

						.notice {
							position: absolute;
							right: 0px;
							display: flex;
							flex-direction: row;
							align-items: center;

							.noticeIcon {
								width: 12.5px;
								height: 12.5px;
								border-radius: 50%;
								border: 0.5px solid #A1A2A6;
								font-size: 9px;
								line-height: 10px;
								text-align: center;
							}

							.noticeName {
								margin-left: 5.5px;
								font-size: 13px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #A1A2A6;
							}
						}
					}

					.childContent {
						.askBox {
							.ask {
								font-size: 15px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #6E7073;
							}

							.reply {
								font-size: 15px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #6E7073;

							}

						}

						.btnBox {
							display: flex;
							flex-direction: row;
							margin-top: 20px;

							.data,
							.contract {
								width: 112px;
								height: 36px;
								line-height: 36px;
								background: #ECF2FC;
								border: 0.5px solid #D9E4F8;
								border-radius: 2.5px;
								margin-right: 12px;
								font-size: 12px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #3974DC;
								text-align: center;
							}
						}
					}

				}

				// 订单审核
				.orderReview {
					.childContent {
						.nzAudit {
							display: flex;
							flex-direction: row;
							align-items: center;
							margin-bottom: 10px;

							.ask {
								font-size: 15px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #6E7073;
							}

							.reply {
								width: 32.5px;
								height: 19px;
								line-height: 19px;
								background: #EDF9F5;
								border-radius: 3px;
								font-size: 11px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #2DD199;
								text-align: center;
								margin-left: 13px;

							}

							.no {
								width: 49px;
								height: 19px;
								line-height: 19px;
								background: #FAEEF0;
								border-radius: 3px;
								text-align: center;
								font-size: 11px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #EF5465;
								margin-left: 13px;
							}
						}
					}
				}

				// 业务执行
				.businessExecute {
					.childTitle {
						.titleIcon {
							font-size: 14px;
							line-height: 18px;
							font-family: DINPro;
							font-weight: 400;
							color: #FFFFFF;
						}
					}

					.childContent {
						padding-top: 9px;

						.childContentBox {
							background: #F7F7F7;
							width: 100%;
							padding: 23px 17.5px;

							.boxChild {
								display: flex;
								flex-direction: row;

								.childNumber {
									font-size: 14px;
									font-family: DINPro;
									font-weight: 500;
									color: #565759;
									margin-right: 13px;
									line-height: 1;
								}

								.childList {

									.listTitle {
										display: flex;
										flex-direction: row;
										align-items: center;

										.titleIcon {
											width: 4px;
											height: 4px;
											background: #A1A2A6;
											border-radius: 50%;
										}

										.titleName {
											font-size: 14px;
											font-family: PingFang SC;
											font-weight: 500;
											color: #565759;
											margin-left: 11px;
											line-height: 1;
										}

									}

									.listExecute {
										margin-left: 1px;
										margin-top: 3px;
										padding-left: 12px;
										border-left: 0.5px solid #EEEEEE;
										padding-bottom: 21px;

										.executeAsk {
											font-size: 12px;
											font-family: PingFang SC;
											font-weight: 500;
											color: #A1A2A6;
										}

										.executeName {
											font-size: 12px;
											font-family: PingFang SC;
											font-weight: 500;
											color: #A1A2A6;
											margin-left: 10px;
										}

									}
								}
							}

							.boxChild:last-child {
								.childList {
									.listExecute {
										padding-bottom: 0px;
										border-left: 0px;
									}
								}
							}
						}
					}
				}

				// 完成
				.accomplish {
					.childTitle {

						.titleIcon {
							font-size: 14px;
							line-height: 18px;
							font-family: DINPro;
							font-weight: 400;
							color: #FFFFFF;
							background: #E1E1E1;
						}

					}
				}
			}
		}

		.noticeBOX {
			position: fixed;
			top: 0%;
			left: 0%;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .4);
			padding-top: 150px;
			z-index: 1000;

			.noticeBOX_content {
				width: 300px;
				height: 416px;
				// background: #fff;
				margin: auto;
				border-radius: 0px 28px 0px 0px;
				position: relative;
				// padding-top: 50px;
				// padding-left: 25px;
				// padding-right: 25px;
				background-color: #FFFFFF;
				// background-image: url(../../../../static/image/notice-bg.png);
				background-repeat: no-repeat;
				background-position: 0 -16px;
				background-size: 100% 152px;

				// padding-top: 16px;
				.headimgsize {
					position: absolute;
					width: 100%;
					height: 152px;
					top: -16px;
					right: 0px;
				}

				.contentBox {
					width: 100%;
					height: 432px;
					padding-top: 50px;
					padding-left: 25px;
					padding-right: 25px;
					// background-color: #FFFFFF;

					.title {
						width: 120px;
						font-size: 28px;
						font-family: PingFang SC;
						font-weight: bold;
						color: #303133;
						margin-bottom: 9px;
					}

					.askFor {
						.askForTitle {
							font-size: 16px;
							font-family: PingFang SC;
							font-weight: bold;
							color: #303133;
							margin-bottom: 10px;
						}

						.askForContent {
							display: flex;
							flex-direction: column;

							.font {
								font-size: 13px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #6E7073;
								line-height: 22px;
							}
						}
					}

					.remark {
						display: flex;
						flex-direction: column;
						margin-top: 5px;

						.remarkChild {
							font-size: 12px;
							font-family: PingFang SC;
							font-weight: 400;
							color: #F66C3E;
							line-height: 20px;
							margin-bottom: 4px;
						}
					}

					.noticeBOX_btn {
						margin-top: 20px;
						width: 100%;
						height: 45px;
						line-height: 45px;
						text-align: center;
						background: #3978E7;
						border-radius: 22.5px;
						font-size: 16px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
