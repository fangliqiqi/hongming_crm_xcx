<template>
	<view class="detailPage">
		<!-- 任务详情 -->

		<view class="title">
			<view class="title_title">
				<image src="@/static/image/rw.png" mode="widthFix" style="width: 19.5px;height: 16px;" />
				<text class="name">{{value.title}}</text>
			</view>
			<view class="remind">
				<icon type="warn" size="15" color="#A1A2A6" />
				<text class='font' @click="notice">
					项目须知
				</text>
			</view>
		</view>
		<view class="content">
			<view class="content_box">
				<view class="box_title">
					项目步骤
				</view>
				<view class="child" v-for="(item,index) in stepArray" :key='index'>
					<view class="child_icon">
						<view class='icon color' v-if="item.completionStatus==20">
							<!-- <u-icon name="success_no_circle" color="#C1C2C7" size="32"></u-icon> -->
							<icon type="success_no_circle" color="#fff" size="12"></icon>
						</view>
						<view class='icon ' v-else>
							{{index + 1}}
						</view>
						<view class="link"></view>
					</view>
					<view class="child_content">
						<text class="name">
							{{item.performName}}
						</text>
						<view class="font">
							<text class="ask">
								执行人:
							</text>
							<text class="ask">
								{{item.execUserName}}
							</text>
						</view>
						<view class="label">
							<view class="label_child" v-for="(ite,inde) in item.label" v-if="item.label!=''"
								@click="labrl(ite,item.performName)" :key='inde'>
								{{ite}}
							</view>
						</view>
					</view>
				</view>
				<view class="accomplish">
					<view class='icon color' v-if="status==20">
						<!-- <u-icon name="success_no_circle" color="#C1C2C7" size="32"></u-icon> -->
						<icon type="success_no_circle" color="#fff" size="12"></icon>
					</view>
					<view class="icon" :class="[stepArray[stepArray.length-1].completionStatus == 20 ? 'color' : 'icon']" v-else>{{stepArray.length+1}}</view>
					<view class="name">完成</view>
				</view>

			</view>
		</view>
		<view class="bottom">
			<button class="btn" type="default" @click="hideDiv()" v-if="status!=30">
				<!-- <button class="btn" type="default" @tap="noTitlemodalTap"> -->
				驳回
			</button>
			<button class="btn btn_color" type="default" v-if="status==30">
				驳回
			</button>
		</view>
		<!--  -->
		<view class="popup_overlay" v-if="userFeedbackHidden">
			<view class="popup_content">
				<view class="popup_title">驳回原因</view>
				<view class="popup_textarea_item">
					<textarea class="popup_textarea" placeholder='请填写驳回原因' v-model="feedbackContent">
					</textarea>

				</view>
				<view class="btn_box">
					<button class="popup_button popup_button_on" @click="cancelUp">取消</button>
					<!-- <view class="cancelUp" @click="cancelUp">取消</view> -->
					<button class="popup_button" @click="submitFeedback">确认</button>
				</view>
			</view>
		</view>
		<!-- 须知 -->
		<view class='noticeBOX' v-if="noticeJudge" @click="noticeJudge=false">
			<view class="noticeBOX_content">
				<image class="headimgsize" src="@/static/image/notice-bg.png" mode=""></image>
				<view class="contentBox">
					<view class="contentTitle">资料收集须知</view>
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
				value: {},
				title: "",
				stepArray: [],
				status: '',
				isJoin: false,
				userFeedbackHidden: false, // 默认隐藏
				feedbackContent: '', // 用户反馈内容
				noticeJudge: false, //须知

			}
		},

		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.value = item
			if (item.projectName) {
				this.value.title = item.projectName
			}
			this.getList()
		},

		methods: {
			// 须知
			notice() {
				this.noticeJudge = true
			},
			cancelUp(){
				console.info('取消驳回')
				this.userFeedbackHidden = false
			},
			getList() {
				this.title = this.value.projectName
				this.$u.get('/fieldSupervisor/queryProcedureList', {
					id: this.value.projectId,
				}).then(resp => {
					this.stepArray = resp.step
					this.status = resp.status

					this.stepArray.forEach((item, index) => {
						var label = []
						item.label = item.label.split(",");
					})
				})
			},

			// modalTap (e) {
			// 			uni.showModal({
			// 				title: '弹窗标题',
			// 				content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
			// 				showCancel: false,
			// 				confirmText: '确定'
			// 			});
			// 		},
			// noTitlemodalTap(e) {
			// 	uni.showModal({
			// 		title: '驳回原因',
			// 		content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
			// 		confirmText: '确定',
			// 		cancelText: '取消'
			// 	});
			// },

			hideDiv() { // 隐藏输入弹出框
				if(this.status==30){
					setTimeout(function() {
						uni.showToast({
							title: '驳回已提交，不可重复驳回',
							icon: 'none',
						})
					}, 2000);
				}else{
					this.feedbackContent = '';
					this.userFeedbackHidden = true;
				}
				
			},
			submitFeedback() {
				if(this.feedbackContent!=''){
				this.$u.get('/fieldSupervisor/auditTurnDown', {
					id: this.value.projectId,
					remark: this.feedbackContent
				}).then(resp => {
					console.info('提交后')
					console.info(resp.code)
					// if (resp.code == 200) {
					// 	this.userFeedbackHidden = false
					// }
					setTimeout(function() {
						uni.showToast({
							title: '驳回成功',
							// icon: 'none',
						})
					});
					this.getList()
					this.userFeedbackHidden = false
				}).catch(resp => {
					console.info('提交后--失败')
				setTimeout(function() {
					uni.showToast({
						title: '失败',
						icon: 'none',
					})
				});
					})
					}else{
						setTimeout(function() {
							uni.showToast({
								title: '请填写驳回原因',
								icon: 'none',
							})
						});
						}
			},

			labrl(label, headName) {
				var contentObj = {
					id: this.value.projectId,
					label: label,
					headName: headName
				}
				uni.navigateTo({
					url: "/pageWqzg/fieldSupervisor/homePage/detailPage/photograph/photograph?contentObj=" +
						encodeURIComponent(JSON.stringify(contentObj)), //跳转页面的路径+传值
				});
			},
			previousPage() {
				uni.navigateBack()
			},
		},
		onReachBottom() {
			this.getList()
		}

	}
</script>

<style lang="scss" scoped>
	.detailPage {
		// height: 100vh;
		// background-color: pink;
		border-top: 0.5px solid #EDEDED;
		position: relative;
		// padding-bottom: 34px;
		background-color: #FFFFFF;
		position: relative;
		.color {
			background: #2DD199 !important;
		}

		.title {
			height: 65px;
			background-color: #FFFFFF;
			padding-left: 30px;
			padding-right: 30px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.title_title {
				display: flex;
				flex-direction: row;
				align-items: center;

				.name {
					font-size: 18;
					font-family: PingFang SC;
					font-weight: bold;
					color: #3A3B3D;
					margin-left: 10px;
				}
			}

			.remind {
				display: flex;
				flex-direction: row;
				align-items: center;

				.font {
					font-size: 13px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #A1A2A6;
					margin-left: 5px;
				}
			}
		}

		.content {
			padding-left: 12px;
			padding-right: 12px;
			padding-top: 10.5px;
			// padding-bottom: 52.5px;
			padding-bottom: 110px;
			background-color: #f4f5f7;

			.content_box {
				width: 100%;
				background-color: #FFFFFF;
				padding-left: 18px;
				padding-right: 18px;
				padding-top: 22.5px;
				padding-bottom: 26px;

				.box_title {
					font-size: 16;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D;
					margin-bottom: 25px;

				}

				.child {
					display: flex;
					flex-direction: row;

					// justify-content: space-between;
					.child_icon {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						margin-right: 11px;

						.icon {
							width: 18px;
							height: 18px;
							font-size: 14px;
							font-family: DINPro;
							font-weight: 400;
							color: #FFFFFF;
							background: #E1E1E1;
							border-radius: 50%;
							text-align: center;
						}

						.link {
							margin-top: 3px;
							margin-bottom: 3px;
							width: 1px;
							height: 122px;
							background: #E1E1E1;
						}
					}

					.child_content {
						width: 100%;

						.name {
							font-size: 17px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #3A3B3D;
						}

						.font {
							margin-top: 5px;
							margin-bottom: 22px;

							.ask {
								font-size: 15;
								font-family: PingFang SC;
								font-weight: 500;
								color: #6E7073;
								margin-right: 5px;
							}
						}

						.label {
							display: flex;
							flex-direction: row;
							padding-bottom: 22px;
							width: 100%;
							border-bottom: 0.5px solid #EEEEEE;

							.label_child {
								width: 112px;
								height: 36px;
								line-height: 36px;
								text-align: center;
								background: #ECF2FC;
								border: 0.5px solid #D9E4F8;
								border-radius: 2.5px;
								margin-right: 12px;
								font-size: 12px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #3974DC;
							}
						}
					}
				}

				.accomplish {
					display: flex;
					flex-direction: row;

					.icon {
						width: 18px;
						height: 18px;
						font-size: 14px;
						font-family: DINPro;
						font-weight: 400;
						color: #FFFFFF;
						background: #E1E1E1;
						border-radius: 50%;
						text-align: center;
						margin-right: 11px
					}

					.name {
						font-size: 17px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #3A3B3D;
					}
				}

			}
		}

		.bottom {
			width: 100%;
			background-color: #FFFFFF;
			// position: absolute;
			// bottom: 34px;
			padding-left: 12px;
			padding-right: 12px;
			padding-top: 8px;
			padding-bottom: 47px;
			position: fixed;
			bottom: 0px;
.btn_color{
	background-color: #a1a2a6 !important;
	border: 0.5px solid #a1a2a6 !important;
	}
			.btn {
				width: 100%;
				height: 45px;
				line-height: 45px;
				text-align: center;
				background: #3978E7;
				border: 1px solid #3978E7;
				border-radius: 22.5px;
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}

		.popup_overlay {

			position: fixed;
			top: 0%;
			left: 0%;
			width: 100%;
			height: 100%;
			// background-color: black;
			background: rgba(0, 0, 0, 0.5);
			z-index: 1001;
			// -moz-opacity: 0.8;
			// opacity: .80;
			filter: alpha(opacity=88);
		}

		.popup_content {
			position: fixed;
			top: 50%;
			left: 50%;
			width: 520upx;
			height: 250px;
			margin-left: -270upx;
			margin-top: -270upx;

			background-color: white;
			z-index: 1002;
			overflow: auto;
			border-radius: 6px;
		}

		.popup_title {
			padding-top: 20upx;
			width: 100%;
			height: 55px;
			line-height: 55px;
			border-bottom: 0.5px solid #EEEEEE;
			text-align: center;
			font-size: 32upx;
		}

		.popup_textarea_item {
			padding: 16px 18px;
			height: 280upx;
			width: 100%;


		}

		.popup_textarea {
			// width: 410upx;
			width: 100%;
			height: 100%;
			font-size: 26upx;
			margin-left: 20upx;
		}

		.btn_box {
			display: flex;
			flex-direction: row;
			position: absolute;
			bottom: 0px;
			height: 57px;
			line-height: 57px;
			width: 100%;
			border-top: 0.5px solid #EEEEEE;

			.popup_button {
				color: #3978E7;
				width: 50%;
				height: 100%;
				border-radius: 0px;
				line-height: 57px;
				// background-color: #4399FC;
			}

			.popup_button_on {
				color: #6E7073;
				width: 50%;
				height: 100%;
				border-right: 0.5px solid #EEEEEE;

			}
		}

		.noticeBOX {
			    position: fixed;
			    top: 0%;
			    left: 0%;
			    width: 100%;
			    height: 100%;
			    background: rgba(0, 0, 0, 0.4);
			    padding-top: 120px;
			    z-index: 1001;

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

					.contentTitle {
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
