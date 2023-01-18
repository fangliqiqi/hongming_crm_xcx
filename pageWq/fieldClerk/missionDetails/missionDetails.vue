<template>
	<view class="missionDetails">
		<!--外勤办事员-任务详情 -->
		<view class="title">
			<view class="title_title">
				<image src="@/static/image/rw.png" mode="widthFix" style="width: 19.5px;height: 16px;" />
				<text class="name">{{title}}</text>
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
				<view class="child" v-for="(item,index) in stepArray">
					<view class="child_icon">
						<!-- <view class='icon color' v-if="completionStatus==20">
							<icon type="success_no_circle" color="#fff" size="12"></icon>
						</view> -->
						<view class='icon color' :class="{color:item.completionStatus==20}" >
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
						<view class="label" v-if="item.label&&item.label.length>0">
							<view class="label_child" v-for="(items,indexs) in item.label" @click="labrl(items,item)">
								{{items}}
							</view>
						</view>
						<view class="child_content_btnBox">
							<view @click="stepComplete(item)" class="child_content_btnBox_btn"
								v-if="item.completionStatus==10">完成</view>
							<view class="child_content_btnBox_btnY" v-if="item.completionStatus==20">已完成<view>
									<!-- <u-button type="default" @click="stepComplete(item)" class="child_content_btnBox_btn">1完成</u-button> -->
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="accomplish">
					<!-- <view class='icon color' v-if="status==20">
						<icon type="success_no_circle" color="#fff" size="12"></icon>
					</view> -->
					<view class="icon" :class="status == 20?'color' : 'icon'">{{stepArray.length+1}}</view>
					<view class="name">完成</view>
				</view>

				</view>
				</view>
				<view class="bottom">
					<!-- 跟进记录 -->
					<view class="gJJLBtn"  @click="particulars">
						<!-- 查看跟进记录 -->
						<image class="headimgsize" src="@/static/image/record.png"></image>
						<text class="name">查看跟进记录</text>
					</view>
					<button class="btn" type="default" @click="show=true">
						完成
					</button>
				</view>
				<view style="background-color: #0057FF;" v-if="show">
					<u-popup v-model="show" mode="center" width="300px" height="185px" border-radius="6" closeable>
						<view
							style="color: #2A2B3C;font-size: 18px;font-weight: bold;text-align: center;padding-top:35px;height: 70px;">
							提示</view>
						<view
							style="color: #2A2B3C;font-size: 18px;text-align: center;font-weight: 500;margin-bottom: 35px;">
							确认完成？</view>
						<view style="border-top:1px solid #EEEEEE;text-align: center;display: flex;height: 56px;">
							<text class="checked" style="border-right:1px solid #EEEEEE" @click="show=false">否</text>
							<text class="checked" @click="complete">是</text>
						</view>
					</u-popup>
				</view>
				<!--延迟原因  -->
				<view class="popup_overlay" v-if="delay">
					<view class="popup_content">
						<view class="popup_title">延迟原因</view>
						<view class="popup_textarea_item">
							<textarea class="popup_textarea" placeholder='请填写延迟原因' v-model="delayCause">
					</textarea>

						</view>
						<view class="btn_box">
							<view class="popup_button popup_button_on " @click="delay=false"
								type="default">取消</view>
							<view class="popup_button" type="default" @click="stepComplete(atPresentItem)">确认</view>
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
				atPresentItem: null, //点击完成步骤当前的步骤
				value: {},
				title: "",
				stepArray: [],
				status: '',
				isJoin: false,
				accomplishJudge: false, //判断完成步骤
				accomplishStepId: '', //点击完成步骤当前的id
				show: false,
				delay: false, // 默认隐藏
				delayCause: null, // 延迟原因内容
				noticeJudge: false, //须知

			}
		},

		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.value = item

		},
		onShow() {
			this.getList()
		},
		onUnload() {
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.emit('acceptDataFromOpenedPage', {
				data: 'test'
			});
		},
		methods: {
			// 查看跟进记录
			particulars(){
				
				var dataObj=this.value
				// uni.navigateTo({
				// 	url: "/pageWq/fieldClerk/missionDetails/lookOrFllow/lookOrFllow?item=" + encodeURIComponent(JSON.stringify(dataObj)),
				// });
				// dataObj.companyId=this.value.projectId
				console.info('查看跟进记录')
				console.info(dataObj)
				uni.navigateTo({
					url: "/pageWqzg/fieldSupervisor/homePage/myClient/followUp/lookOrFllow/lookOrFllow?item=" +
						encodeURIComponent(JSON.stringify(dataObj)),
				});
				console.info('跳转')
			},
			// 须知
			notice() {
				this.noticeJudge = true
			},
			previousPage() {
				uni.navigateBack()
			},
			getList() {
				this.title = this.value.projectName
				this.$u.get('/fieldClerk/queryProcedureList', {
					id: this.value.projectId,
				}).then(resp => {
					this.stepArray = resp.step.map(item=>{
						try{
							item.label = (item.label.split(",")||[]).filter(ite=>{return ite!=''&&ite!=undefined});
						}catch(e){
							item.label = []
						}
						
						return item;
					})
					this.status = resp.status
				})
			},
			//步骤完成
			stepComplete(item) {
				this.atPresentItem = item
				if (item) {
					this.accomplishStepId = item.id
				}
				if (item.imgeIds == ""&&item.label.length>0) {
					uni.showToast({
								title: '此步骤未上传步骤图片，不可以点击完成！',
								icon: 'none',
					})
				} else {
					this.$u.get('/fieldClerk/completeStep', {
						id: this.accomplishStepId,
						remark: this.delayCause
					}).then(response => {
						if (response.code == 444) {
							this.delay = true
							uni.showToast({
								title:'请填写延迟原因',
								icon: 'none',
							})
						} else {
							this.getList()
							this.delay = false
							uni.showToast({
								title:'本步骤已完成',
								icon: 'none',
							})
						}
					}).catch(response => {
							console.info('步骤完成-定时器')
							uni.showToast({
								title: '执行步骤附件未上传完整,不可完成',
								icon: 'none',
							})
						})
					// }
				}
			},
			// 项目完成
			complete() {
				let that = this;
				if(this.stepArray.some(item=>{
					return item.completionStatus == 10;
				})){
					setTimeout(function(){
						console.info('项目未完成-定时器')
						uni.showToast({
							title: '有项目步骤未完成，不可以点击！',
							icon: 'none',
							success() {
								that.show = false
							}
						})
					}, 100);
				}else{
					this.$u.get('/fieldClerk/completeProduct', {
						id: this.value.projectId
					}).then(response => {
						setTimeout(function(){ 
							console.info('项目完成-定时器')
						uni.showToast({
														title:'项目已完成',
						                                icon: 'none',
									 				})
													}, 100);
						uni.navigateBack()
						this.show = false
						// if (response.code == 200) {
						// 	this.show = false
						// }
					})
				}
			},
			showDiv() { // 显示输入弹出框
				this.userFeedbackHidden = false;
			},
			labrl(label, father) {
				console.info('点击上传去')
				father.labelChild = label
				uni.navigateTo({
					url: "/pageWq/fieldClerk/missionDetails/label/label?byValue=" + encodeURIComponent(JSON
						.stringify(father)), //跳转页面的路径+传值
				});
			},
		},
		onReachBottom() {
			this.getList()
		}

	}
</script>

<style lang="scss">
	.missionDetails {
		// height: 100vh;
		// background-color: pink;
		border-top: 0.5px solid #EDEDED;
		position: relative;
		padding-bottom: 105px;
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
			padding-bottom: 52.5px;
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

						.color {
							background-color: #2DD199;

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
						width: 285px;

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
							// padding-bottom: 22px;
							// width: 100%;
							// border-bottom: 0.5px solid #EEEEEE;

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
								margin-bottom: 10px;
							}
						}

						.child_content_btnBox {
							padding-bottom: 22px;
							width: 100%;
							border-bottom: 0.5px solid #EEEEEE;

							.child_content_btnBox_btn {
								width: 60px;
								padding-left: 0px;
								padding-right: 0px;
								padding: 0 5px;
								border-radius: 5px;
								height: 30px;
								line-height: 30px;
								text-align: center;
								border: 0.5px solid #3978E7;
								background: #3978E7;
								font-size: 16px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #FFFFFF;

							}

							.child_content_btnBox_btnY {
								width: 60px;
								height: 30px;
								line-height: 30px;
								padding: 0 5px;
								border-radius: 5px;
								text-align: center;
								border: 0.5px solid #E1E1E1;
								background: #E1E1E1;
								font-size: 16px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #FFFFFF;
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
			display: flex;
			justify-content: space-between;

			.btn {
				width: 50%;
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
				margin-right: 0px;
				margin-left: 0px;
			}
			.gJJLBtn{
				width: 50%;
				line-height: 45px;
				text-align: center;
				background: transparent;
				border: 1px solid transparent;
				border-radius: 22.5px;
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				// color: #FFFFFF;
				.headimgsize {
					width: 18px;
					height: 18px;
					margin-right: 5.5px;
				}
				
				.name {
					font-size: 14px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #565759;
				}
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
			height: 240upx;
			width: 100%;


		}

		.popup_textarea {
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
				text-align: center;
				border-radius: 0px;
				line-height: 57px;
				// background-color: #4399FC;
			}

			.popup_button_on {
				color: #6E7073;
				border-right: 0.5px solid #EEEEEE;

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
<style lang='scss' scoped>
	.checkedFather {
		border-top: 1px solid #EEEEEE;
		text-align: center;
		display: flex;
		height: 56px;
	}

	.checked {
		text-align: center;
		flex: 1;
		height: 100%;
		padding-top: 14px;
		color: #6E7073;
		font-size: 18px;
	}
</style>
