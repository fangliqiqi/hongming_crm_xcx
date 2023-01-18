<template>
	<view class="followUp">
		<!-- 跟进 -->
		<view class="content_on">
			<text class="title">
				跟进方式
			</text>
			<view>
				<picker @change="bindPickerChange" :range="array" class="select">
					<label v-if="formObj.typeName==null" class="none">请选择跟进方式</label>
					<label class="" v-else>{{formObj.typeName||''}}</label>
					<label class="icon">
						<u-icon name="arrow-right" color="#A7A8AC" size="25"></u-icon>
					</label>
				</picker>
			</view>
		</view>
		<view class="content_tow">
			<text class="title">
				本次跟进内容
			</text>
			<input class="uni-input"  placeholder="请输入本次跟进内容" placeholder-style='color:#D2D3D6;' v-model="formObj.theContent">
		</view>
		<view class="content_three">
			<text class="title">
				添加跟进附件
			</text>
			<view class="hint">提示：文件可上传jpg、png、jpeg、 pdf类型文件，每次上传不超过5M。</view>
			<view class="threeImgBox">
				<view class="uploading" v-if="changeimg!=''">
					<image class="headimgsize" :src="changeimg" mode=""></image>
				</view>
				<view class="uploading" @click="changeImg">
					<image class="headimgsize" src="@/static/image/uploading.png" mode=""></image>
					<button  class="button">点击上传</button>
				</view>
			</view>

		</view>
		<view class="nextTime">
			<text class="title">
				下次跟进时间
			</text>
			<view class="inpue" @click="onShowDatePicker('datetime')" >
				<label v-if="formObj.nextDate==null" class="none">请选择下次跟进时间</label>
				<label class="datetime" v-else>{{formObj.nextDate||''}}</label>
				<label class="icon">
					<u-icon name="arrow-right" color="#A7A8AC" size="25"></u-icon>
				</label>
				</view>
		</view>
		<view class="nextTime_content">
			<text class="title">
				下次跟进内容
			</text>
			<input class="uni-input"  placeholder="请输入下次跟进内容" placeholder-style='color:#D2D3D6;' v-model="formObj.nextContent" >
		</view>
		<view class="bottom" >
			<view class="record" @click="record">
				<image class="headimgsize" src="@/static/image/record.png"></image>
				<text class="name">查看跟进记录</text>
			</view>
			<view class="confirm" @click="submit">
				确定
			</view>
		</view>
		<u-picker  v-model="showPicker" mode="time" :params="params" :default-time="currentTime" @confirm='confirm' @cancel='cancel' show-time-tag='true'></u-picker>
	</view>
</template>

<script>
	import config from '@/common/config.js'
	export default {
		components: {
		},
		data() {
			return {
				params: {
									year: true,
									month: true,
									day: true,
									hour: true,
									minute: true,
									second: true,
								},
				dataObj: {},
				array: ['电话跟进', '微信沟通', '现场跟进', '其他'],
				// untype: '',
				image: '../../../static/image/icon5.png',
				changeimg: '',
				// 
				showPicker: false,
				type: 'rangetime',
				value: '',
				data:null,
				currentTime:new Date().toISOString().slice(0, 10) + ' ' + new Date().getHours()+':' + new Date().getMinutes()+':' + new Date().getSeconds(),
				formObj:{
					classify:20,
					typeName:null,
					type:null,//进方式
					theContent:'',//本次跟进内容
					nextDate:null,//下次跟进时间
					nextContent:null,//下次跟进内容
					companyId:null,//公司id
					imageIds:null,//上传图片的id
				}


			}
		},

		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.dataObj = item
			this.formObj.companyId=this.dataObj.companyId
			var date = new Date()
			var year = date.getFullYear()
			var month = date.getMonth() + 1
			var day = date.getDate()
			this.data=year +'-'+month+'-'+day
			console.info('当前日期')
			console.info(this.data)
			console.info(year)
			console.info(month)
			console.info(day)
			// this.getList()
		},
		
		methods: {
		
			confirm(e){
				
				this.formObj.nextDate= e.year + '-' + e.month  + '-' +e.day + ' ' + e.hour +':'+e.minute+':'+e.second
				this.currentTime=this.formObj.nextDate
			},
			cancel(){
			},
			previousPage() {
				uni.navigateBack()
			},
			bindPickerChange(e) { //改变的事件名
				//console.log('picker发送选择改变，携带值为', e.target.value)   用于输出改变索引值
				this.index = e.target.value //将数组改变索引赋给定义的index变量
				this.formObj.typeName= this.array[this.index]
			},
			changeImg() {
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						var changeimg=tempFilePaths[0]
						this.changeimg = tempFilePaths[0]
						let data = {
							type: 20,
							file: changeimg,
						}
						var params = Object.keys(data).map(function (key) {
						        // body...
						        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
						    }).join("&");
						uni.uploadFile({
								url: config.baseUrl+'/crmRecordImg/upload?1=1&'+params, //仅为示例，非真实的接口地址
						    // url: 'http://192.168.1.181:9003/crmRecordImg/upload?1=1&'+params, //仅为示例，非真实的接口地址
						  filePath:  tempFilePaths[0],
							  name: 'file',
						      formData: {
						       type: 20,
						       file: tempFilePaths,
						      },
							  header:{
								  Authorization:this.$store.state.vuex_token
								  },
						    success: (res) => {
								console.info('上传图片后')
								console.info(this.changeimg)
						        console.log(JSON.parse(res.data).data.id)
								this.formObj.imageIds=JSON.parse(res.data).data.id
						        var res = JSON.parse(res.data)
						        if (res.status) {
						            app.getUserData() //这里调用用户信息接口更新数据存进vuex
						            setTimeout(function() {
						            	uni.showToast({
						            			title: res.msg,
						            			icon: 'none',
						            	})
						            }, 2000);
						        }else {
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
				// this.type = type;
				this.showPicker = true;
				// this.value = this[type];
				
			},
			record(){
				console.info('查看跟进记录' )
				var dataObj=this.dataObj
				uni.navigateTo({
					                url: "/pageYwzg/executive/homePage/myClient/followUp/lookOrFllow/lookOrFllow?item=" + encodeURIComponent(JSON.stringify(dataObj)),
					            });
			},
			submit(){
				console.info('提交') 
				console.info(this.formObj)
				var formObj=this.formObj
				if(formObj.typeName=='电话跟进' ){
					formObj.type=10
				}else if(formObj.typeName=='微信沟通' ){
					formObj.type=20
				}
				else if(formObj.typeName=='现场跟进' ){
					formObj.type=30
				}
				else if(formObj.typeName=='其他' ){
					formObj.type=40
				}
				// var formObj=formObj
				// 备注: 跟进记录按照classify区分跟进分类( 10 商机, 20 客户, 30 客服)
				this.$u.post('/crmFollowRecord/add',formObj).then(resp => {
					
					setTimeout(function() {
						uni.showToast({
							title: '提交跟进记录完成',
							// icon: 'none',
						})
						
					}, 1000);
					uni.navigateBack()
					}).catch((resp) => {
						setTimeout(function() {
					uni.showToast({
						title: '请填写完成信息',
						icon: 'none',
					})
					}, 1000);
				})
			}
		}
	}
</script>

<style lang="scss">
	.followUp {
		border-top: 0.5px solid #EEEEEE;
		padding-bottom: 110px;
		width: 100%;
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
			.threeImgBox{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
			.uploading {
				margin-left: 10px;
				margin-bottom: 10px;
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
					border: 0px solid transparent;
					background-color: transparent;
					
				}
				.button::after {
					border: 0px solid transparent;
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
			.inpue{
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
				.datetime{
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
		.bottom{
			padding-left: 15.5px;
			padding-right: 15.5px;
			padding-top: 15.5px;
			padding-bottom: 45px;
			width: 100%;
			background-color: #FFFFFF;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			position: fixed;
			bottom: 0px;
			.record{
				display: flex;
				flex-direction: row;
				align-items: center;
				.headimgsize{
					width: 18px;
					height: 18px;
					margin-right: 5.5px;
				}
				.name{
					font-size: 14px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #565759;
				}
				}
			.confirm{
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
