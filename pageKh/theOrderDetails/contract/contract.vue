<template>
	<view class="contract">
		<view style="width: 100%;" v-if="state!=null&&path!=''">
			<web-view v-if="iOS" :src='pdfurl'>
			</web-view>
		</view>
		<view class="electronic" v-else>
			<!-- 签约时间 -->
			<view class="nextTime">
				<text class="title">
					签约时间
				</text>
				<view class="inpue">
					<!-- <label v-if="formObj.timeOfContract==null" class="none">请选择签约时间</label> -->
					<label class="datetime">{{contractDetail.signingDate||''}}</label>
					<label class="icon">
						<u-icon name="arrow-right" color="#A7A8AC" size="25"></u-icon>
					</label>
				</view>

			</view>
			<!-- 合同生效期 -->
			<view class="nextTime">
				<text class="title">
					合同生效期
				</text>
				<view class="inpue">
					<label class="datetime">{{contractDetail.validity||''}}</label>
					<label class="icon">
						<u-icon name="arrow-right" color="#A7A8AC" size="25"></u-icon>
					</label>
				</view>
			</view>
			<!-- 合同金额 -->
			<view class="content_tow">
				<text class="title">
					合同金额
				</text>
				<input class="uni-input" focus placeholder="请输入合同金额" placeholder-style='color:#D2D3D6;'
					v-model="contractDetail.money" disabled>
			</view>
			<!-- 服务时间 -->
			<view class="nextTime">
				<text class="title">
					服务时间
				</text>
				<view class="inpue">
					<!-- <label v-if="formObj.nextDate==null" class="none">请选择服务时间</label> -->
					<label class="datetime">{{contractDetail.servicePeriodStart+'至'+contractDetail.servicePeriodEnd||''}}</label>
					<label class="icon">
						<u-icon name="arrow-right" color="#A7A8AC" size="25"></u-icon>
					</label>
				</view>
			</view>
			<!-- 合同附件 -->
			<view class="content_three">
				<text class="title">
					合同附件
				</text>
				<view class="uploading">
					<image class="headimgsize" :src="contractDetail.marketCompbusiImgfileResults[0].url" ></image>
					<!-- <image class="headimgsize" :src=" changeimg" mode="" v-else></image>
						<!-- type="primary" -->
					<!-- <button  class="button">点击上传</button> -->
				</view>

			</view>


			<!-- <view class="bottom">
					<view class="record" @click="record">
						<image class="headimgsize" src="@/static/image/record.png"></image>
						<text class="name">查看跟进记录</text>
					</view>
					<view class="confirm" @click="submit">
						确定
					</view>
				</view> -->
		</view>
	</view>
</template>

<script>
	import config from '@/common/config.js'
	export default {
		data() {
			return {
				pdfurl: null,
				id: null, //合同id
				state: null,
				iOS: true,
				path: '',
				// compayBusirId: '', //订单id
				contractDetail: {}, //合同详情
				formObj: {
					timeOfContract: null, //签约时间
					ontractEffectcData: null, //合同生效日期
					classify: 20,
					type: null, //进方式
					theContent: '', //本次跟进内容
					nextDate: null, //下次跟进时间
					nextContent: null, //下次跟进内容
					companyId: null, //公司id
				}
			};
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));

			this.id = item.id;
			// this.compayBusirId = uni.getStorageSync('lifeData').id
			if (item.state) {
				this.state = item.state;
			}
			if (item.path) {
				this.path = item.path
			}
			if (item.state != null && item.path != '') {
				this.getContract()
			} else {
				this.getContractZ()
			}

		},
		onShow() {

		},
		methods: {
			getContractZ() {
				// url: config.contractUrl+'/electronicContract/autograph',
				this.$u.get('/salesman/getContractByOrderId', {
					id: this.id
				}).then(resp => {					
					resp[0].marketCompbusiImgfileResults[0].url=config.authUrl+resp[0].marketCompbusiImgfileResults[0].url
					this.contractDetail = resp[0]
				})
			},
			getSys(url) {
				// 判断操作系统
				uni.getSystemInfo({
					success: (res) => {
						if (res.system.includes('iOS')) {
							this.iOS = true;
							// iOS 可直接查看
							this.pdfurl = url;
							console.info('iOS 可直接查看')
							console.info(this.pdfurl)
						} else {
							this.iOS = false;
							// Android 需要下载后再打开
							uni.downloadFile({
								url: url,
								success: (res) => {
									const path = res.tempFilePath;
									uni.openDocument({
										filePath: path,
										fileType: 'pdf',
										success: (res) => {
											console.info('Android 需要下载后再打开')
											console.info(res)
											uni.navigateBack({
												delta: 1
											});
										},
										fail: (err) => {
											uni.showToast({
												title: '打开文件失败',
												icon: 'none',
												duration: 2000
											});
										}
									});
								},
								fail: (err) => {
									console.log(err);
									uni.showToast({
										title: '下载文件失败',
										icon: 'none',
										duration: 2000
									});
								}
							});
						}
					}
				});
			},

			getContract() {
				let id = this.id
				// let url = 'https://www.hmtcrm.com/profile/crm/contract/2021-05-14/HM-CS202105140004/2021/05/14/141c8a04-6e6b-4b7c-bd94-009a6ef528ea.pdf'
				// this.getSys(url)

				// this.$u.post('/marketCompanyContract/queryDetail?id='+ id).then(res => {
				this.$u.post('/electronicContract/queryDetail?id=' + id).then(res => {
					console.info('查看详情')
					console.info(res)
					console.info(config.authUrl)
					let url = config.authUrl + res.data.path;
					// let url = 'https://www.hmtcrm.com' + res.path;
					// this.pdf = config.authUrl + res.path;
					// this.pdf = 'https://www.hmtcrm.com' + res.path;
					this.getSys(url)
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.contract {
		.electronic {
			width: 100%;
			height: 300px;
			background-color: pink !important;

			.nextTime {
				background-color: #FFFFFF;
				padding-left: 16px;
				padding-right: 16px;
				padding-top: 30px;

				.title {
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D;
				}

				.inpue {
					padding-top: 15px;
					height: 41px;
					padding-bottom: 7px;
					border-bottom: 1px solid #EEEEEE;
					position: relative;

					.none {
						font-size: 14px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #D2D3D6;
					}

					.icon {
						position: absolute;
						right: 0px;
					}

					.datetime {}
				}
			}

			.content_tow {
				background-color: #FFFFFF;
				padding-left: 16px;
				padding-right: 16px;
				padding-top: 30px;

				.title {
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D;
				}

				.uni-input {
					height: 43px;
					border-bottom: 1px solid #EEEEEE;
				}
			}

			.content_three {
				background-color: #FFFFFF;
				padding-left: 16px;
				padding-right: 16px;
				padding-top: 30px;
				margin-bottom: 10px;
				padding-bottom: 25px;

				.title {
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D;
				}

				.hint {
					font-size: 12px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #6E7073;
					line-height: 20.5px;
					padding-bottom: 26px;
				}

				.uploading {
					width: 160px;

					.headimgsize {
						width: 160px;
						height: 82px;
					}

					.button {
						width: 100%;
						font-size: 13px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #6E7073;
						line-height: 20px;
						background-color: transparent;
					}

					.button::after {
						border: 0px;
					}
				}
			}


			.nextTime_content {
				background-color: #FFFFFF;
				padding-left: 16px;
				padding-right: 16px;
				padding-top: 30px;
				padding-bottom: 26px;
				margin-bottom: 10px;

				.title {
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D;
				}

				.uni-input {
					height: 43px;
					border-bottom: 1px solid #EEEEEE;
				}
			}

			.bottom {
				padding-left: 15.5px;
				padding-right: 15.5px;
				padding-top: 15.5px;
				padding-bottom: 45px;
				width: 100%;
				background-color: #FFFFFF;
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.record {
					display: flex;
					flex-direction: row;
					align-items: center;

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

				.confirm {
					width: 197px;
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
</style>
