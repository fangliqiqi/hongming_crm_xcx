<template>
	<view class="contractData">
		<!-- 合同资料收集 -->
		<!-- 签约时间 -->
		<view class="nextTime">
			<text class="title">
				签约时间
			</text>
			<view class="inpue" @click="onContract('datetime')">
				<label v-if="formObj.timeOfContract==null" class="none">请选择签约时间</label>
				<label class="datetime" v-else>{{formObj.timeOfContract}}</label>
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
			<view class="inpue" @click="onContractEffect('datetime')">
				<label v-if="formObj.ontractEffectcData==null" class="none">请选择下合同生效期</label>
				<label class="datetime" v-else>{{formObj.ontractEffectcData}}</label>
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
				v-model="formObj.theContent">
		</view>
		<!-- 服务时间 -->
		<view class="nextTime">
			<text class="title">
				服务时间
			</text>
			<view class="inpue" @click="onShowDatePicker('datetime')">
				<label v-if="formObj.nextDate==null" class="none">请选择服务时间</label>
				<label class="datetime" v-else>{{formObj.nextDate}}</label>
				<label class="icon">
					<u-icon name="arrow-right" color="#A7A8AC" size="25"></u-icon>
				</label>
			</view>
		</view>
	<!-- 添加合同附件 -->
		<view class="content_three">
			<text class="title">
				添加合同附件
			</text>
			<view class="hint">提示：文件可上传jpg、png、jpeg、doc、docx、xls、xlsx、 pdf类型文件，每次上传不超过5M。</view>
			<view class="uploading">
				<image class="headimgsize" src="@/static/image/uploading.png" mode="" v-if="changeimg==''"></image>
				<image class="headimgsize" :src=" changeimg" mode="" v-else></image>
				<!-- type="primary" -->
				<button @click="changeImg" class="button">点击上传</button>
			</view>

		</view>


		<view class="bottom">
			<view class="record" @click="record">
				<image class="headimgsize" src="@/static/image/record.png"></image>
				<text class="name">查看跟进记录</text>
			</view>
			<view class="confirm" @click="submit">
				确定
			</view>
		</view>
		<u-calendar v-model="showPicker" mode="date" @change="onSelected" :safe-area-inset-bottom="true"></u-calendar>
		<u-calendar v-model="showContractEffect" mode="date" @change="onSelectedContractEffect" :safe-area-inset-bottom="true"></u-calendar>
		<u-calendar v-model="showContract" mode="date" @change="onSelectedContract" :safe-area-inset-bottom="true"></u-calendar>
	</view>
</template>

<script>
	import config from '@/common/config.js'
	export default {
		components: {
		},
		data() {
			return {
				dataObj: {},
				array: ['电话跟进', '微信沟通', '现场跟进', '其他'],
				// untype: '',
				image: '../../../static/image/icon5.png',
				changeimg: '',
				// 
				showPicker: false,
				showContract:false,//签约
				showContractEffect:false,//合同生效期
				type: 'rangetime',
				value: '',
				formObj: {
					timeOfContract:null,//签约时间
					ontractEffectcData:null,//合同生效日期
					classify: 20,
					type: null, //进方式
					theContent: '', //本次跟进内容
					nextDate: null, //下次跟进时间
					
					nextContent: null, //下次跟进内容
					companyId: null, //公司id
				}


			}
		},

		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.dataObj = item
			console.log('跟进');
			console.log(item); //打印出上个页面传递的参数。
			console.log(this.dataObj); //打印出上个页面传递的参数。
			this.formObj.companyId = this.dataObj.companyId
			// this.getList()
		},
		methods: {
			bindPickerChange(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index = e.target.value //将数组改变索引赋给定义的index变量
				this.formObj.type = this.array[this.index]
			},
			changeImg() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						var changeimg = tempFilePaths[0]
						this.changeimg = tempFilePaths[0]
						console.info('上传图片')
						console.info(this.changeimg)
						// console.info(chooseImageRes)
						// this.$u.post('/crmRecordImg/upload',{type:20,file:this.changeimg}).then(resp => {
						// 	})
						uni.uploadFile({
							url: 'http://192.168.1.181:9003/crmRecordImg/upload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								type: 20,
								file: tempFilePaths,
							},
							success: (res) => {
								console.info('上传图片后')
								console.info(this.changeimg)
								console.log(JSON.parse(res.data))
								var res = JSON.parse(res.data)
								if (res.status) {
									app.getUserData() //这里调用用户信息接口更新数据存进vuex
								
									setTimeout(function() {
										uni.showToast({
												title: res.msg,
												icon: 'none',
										})
									}, 2000);
								} else {
									setTimeout(function() {
										uni.showToast({
												title: res.msg,
												icon: 'none',
										})
									}, 2000);
								}
							}
						});
					}
				});
			},
			
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onContract(type) { //签约时间
					this.type = type;
					this.showContract = true;
					this.value = this[type];
			},
			onSelectedContract(e) { //签约时间选择
				this.showContract = false;
				if (e) {
					this.formObj.timeOfContract = e.result;
				}
			},
			onContractEffect(type) { //合同生效期
					this.type = type;
					this.showContractEffect = true;
					this.value = this[type];
			},
			onSelectedContractEffect(e) { //合同生效期选择
				this.showContractEffect = false;
				if (e) {
					this.formObj.ontractEffectcData = e.result;
				}
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this.formObj.nextDate = e.result;
				}
			},
			record() {
				var dataObj = this.dataObj
				uni.navigateTo({
					url: "/pageYwzg/executive/homePage/myClient/followUp/lookOrFllow/lookOrFllow?item=" +
						encodeURIComponent(JSON.stringify(dataObj)),
				});
			},
			submit() {
				var formObj = this.formObj
				if (formObj.type == '电话跟进') {
					formObj.type = 10
				} else if (formObj.type == '微信沟通') {
					formObj.type = 20
				} else if (formObj.type == '现场跟进') {
					formObj.type = 30
				} else if(formObj.type=='其他' ){
					formObj.type = 40
				}
				
				// 备注: 跟进记录按照classify区分跟进分类( 10 商机, 20 客户, 30 客服)
				this.$u.post('/crmFollowRecord/add', formObj).then(resp => {
					uni.navigateBack()
				}).catch(err => {
					uni.showToast({
						title: '请填写完成信息',
						icon: 'none',
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.contractData {
		border-top: 0.5px solid #EEEEEE;

		.content_on {
			background-color: #FFFFFF;
			padding-left: 16px;
			padding-right: 16px;
			padding-top: 30px;

			.title {
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3A3B3D;
				// 	padding-bottom: 5px;
			}

			.select {
				padding-top: 12px;
				padding-bottom: 7px;
				border-bottom: 1px solid #EEEEEE;
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
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
			}

		}

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
				.button::after{
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
</style>
