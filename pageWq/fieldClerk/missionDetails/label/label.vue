<template>
	<view class="followUp">
		<!-- 上传label附件 -->
		<view class="content_three">
			<text class="title">
				添加跟进附件
			</text>
			<view class="hint">提示：文件可上传jpg、png、jpeg类型文件，每次上传不超过5M。</view>
			<view class="threeComtent" >
				<view class="three_imageBox" v-for="(item,index) in someimgList" >
					<image class="imageBox_img" :src="item.url" ></image>
					<view class="shade" @click="deleteImg(item,index)">
						<u-icon name="close" color="rgba(0,0,0,0.4)"></u-icon>
					</view>
				</view>
				<!-- <view class="three_imageBox" v-if="changeimg!=''">
					<image class="imageBox_img" :src=" changeimg" mode="" ></image>
				</view> -->
				<view class="uploading" @click="changeImg">
					<image class="headimgsize 111" src="@/static/image/uploading.png" mode="" ></image>
					<view  class="button">点击上传</view>
				</view>
			</view>
			 <view class="content_tow">
			 	<text class="title">
			 		任务备注
			 	</text>
			 	<u-input class="uni-input"  placeholder="请输入任务备注" 
			 		v-model="dataObj.remarks"  />
			 </view>
		</view>
		<view class="bottom">
			
			<view class="confirm" @click="submit">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/common/config.js'
	export default {
		components: {
		},
		data() {
			return {
				dataObj: {
					remarks:''
				},
				
				array: ['电话跟进', '微信沟通', '现场跟进', '其他'],
				// untype: '',
				imageId:'',
				changeimg: '',
				// 
				showPicker: false,
				type: 'rangetime',
				value: '',
				imgIdList:[],
				someimgList:[],//已经上传的图片列表
				formObj: {
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
			const byValue = JSON.parse(decodeURIComponent(option.byValue));
			this.dataObj = byValue
			this.formObj.companyId = this.dataObj.companyId
			console.info('传值')
			console.info(byValue)
			this.getList()
		},
		methods: {
			// 删除图片
			deleteImg(item,index){
				this.imgIdList.splice(index,1)
				this.someimgList.splice(index,1)
			},
			getList(){				
				this.$u.get('/fieldClerk/findPictureEcho', {id:this.dataObj.id,label:this.dataObj.labelChild}).then(resp => {
					resp.forEach((item, index) => {
						item.url=config.authUrl + item.url;
						this.imgIdList.push(item.id)
					})
					
					// })
					
						// 
					this.someimgList=resp
				})
			},
			previousPage(){
				uni.navigateBack()
			},
			changeImg() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						var changeimg = tempFilePaths[0]
						this.changeimg = tempFilePaths[0]
						this.someimgList.push({url:changeimg})
						var token=this.$store.state.vuex_token
						var label=this.dataObj.labelChild
						let data = {
							type: 50,
							file: tempFilePaths,
							label:label
						}
						var params = Object.keys(data).map(function (key) {
						        // body...
						        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
						    }).join("&");
						
						uni.uploadFile({
							url: config.baseUrl+'/crmRecordImg/upload?1=1&'+params, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',					
							formData: {
								
							},
							header:{
								Authorization:token,
								"ContentType": "multipart/form-data"
							},
							success: (res) => {
								this.imgIdList.push(JSON.parse(res.data).data.id)
								this.imageId=JSON.parse(res.data).data.id
								var res = JSON.parse(res.data)
								if (res.status) {
									app.getUserData() //这里调用用户信息接口更新数据存进vuex
		
									setTimeout(function(){
										uni.showToast({
												title: res.msg,
												icon: 'none',
										})
									}, 2000);
								} else {
							
									setTimeout(function() {
										uni.showToast({
											title: res.msg,
											icon: 'none'
										})
									}, 2000);
									
								}
							}
						});
					}
				});
			},
		
			
			
			submit() {
				var imgeIds=this.imgIdList.toString()
				console.info('提交图片')
				console.info(this.imgIdList)
				console.info(this.imageId)
				console.info(this.imageId)
				console.info(imgeIds)
				var formObj = {imgeIds:imgeIds,id:this.dataObj.id,serpriceId:this.dataObj.serpriceId,busirId:this.dataObj.busirId,remarks:this.dataObj.remarks||''}
				this.$u.post('/fieldClerk/addPictureEcho', formObj).then(resp => {
					console.info('上传图片成功')
					setTimeout(function(){
						console.info('上传图片成功-定时器')
						this.dataObj={}
						uni.showToast({
							title: '上传图片成功',
							icon: 'none',
						})
						uni.navigateBack()
					},200)
					
				}).catch(resp => {
					console.info('上传图片失败！')
							setTimeout(function(){
								console.info('上传失败-定时器')
								uni.showToast({
									title: '上传图片失败',
									icon: 'none',
								})
								
							},200);
							})
			}
		}
	}
</script>

<style lang="scss">
	.followUp {
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

		.content_tow {
			background-color: #FFFFFF;
			padding-left: 16px;
			padding-right: 16px;
			padding-top: 30px;
border-bottom: 1px solid #EEEEEE;
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
			.threeComtent{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.threeComtentImgBox{
					.threeComtentImgBox_child{
						
					}
				}
			.three_imageBox{
				width: 160px;
				height: 82px;
				background-color: #8F8F94;
				margin-right: 10px;
				margin-bottom: 10px;
				position: relative;
				.imageBox_img{
					width: 100%;
					height: 100%;
				}
				.shade{
					position: absolute;
					top: -8px;
					right: -7px;
					// width: 100%;
					// height: 100%;
					font-size: 26rpx;
					// background-color: rgba(0,0,0,0.4);
				}
			}
			
			.uploading {
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
					text-align: center;
				}
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
</style>
