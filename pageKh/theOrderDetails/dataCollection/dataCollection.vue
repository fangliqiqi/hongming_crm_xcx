<template>
	<view class="dataCollection">
		<!-- 资料收集 -->
		<view class="content_three">
			<text class="title">
				资料
			</text>
			<view class="hint">提示：文件可上传jpg、png、jpeg类型文件，每次上传不超过5M。</view>
			<view class="uploadingImg">
			 <rich-text :nodes="richText" class="richText"></rich-text>
			 <view v-if="richText==''">暂无数据</view>			
			</view>
		</view>
	</view>
</template>

<script>
	// import lFile from '../../../../uni_modules/l-file/components/l-file/l-file.vue'
	import config from '@/common/config.js'
	export default {
		 // components:{lFile},
		data(){
			return {
				byValue:{},//接受传值
				changeimgList: [],
				changeimg:'',
				imageId:null,
				someimgList:[],//已经上传的图片列表
				richText:'',//资料
			}
			},
			onLoad(option) {
				const byValue = JSON.parse(decodeURIComponent(option.byValue));
				this.byValue=byValue
				console.info('内容')
				console.info(byValue)
				this.getList()
			},
		methods:{
			
			 onUpload() { 
				 var token=this.$store.state.vuex_token
				 var companyId=this.byValue.companyId
				 var busirecordId=this.byValue.projectId
				 console.info('点击上传图片')
				  console.info(this.$u)
				uni.chooseImage({
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						var changeimg = tempFilePaths[0]
						this.changeimg = tempFilePaths[0]
						var token=this.$store.state.vuex_token
						// var label=this.dataObj.labelChild
						let data = {
							type: 50,
							companyId:this.byValue.companyId,
							busirecordId:this.byValue.orderId,
							// label:label
						}
						var params = Object.keys(data).map(function (key) {
						        // body...
						        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
						    }).join("&");
						console.info('上传数据请求')
						console.info(this.byValue)
						uni.uploadFile({
							url: config.baseUrl+'/marketCompbusiImgfile/upload?1=1&'+params, //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',					
							formData: {
								
							},
							header:{
								Authorization:token,
								"ContentType": "multipart/form-data",
								
							},
							success: (res) => {
								this.changeimgList.push(JSON.parse(res.data).data.id)
								this.imageId=JSON.parse(res.data).data.id
								var res = JSON.parse(res.data)
								console.info('上传后')
								console.info(this.changeimgList)
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
								console.info('上传后222')
								console.info(this.changeimgList)
							}
						});
					}
				});
			 			},
			 			onSuccess(res) {
							this.changeimgList.push(res.data.data)
			 				// uni.showToast({
			 				// 	// title: JSON.stringify(res),
			 				// 	// icon: 'none',
								// title:'添加成功'
								
			 				// })
			 			},
			getList() {
				var id=this.byValue.projectId
				// 		this.$u.get('/marketCompanyEssential/selectFileByProjectId', {
				// 	id: id
				// }).then(resp => {
					this.$u.get('/marketCompanyEssential/projectRichText', {
						projectId: id
					}).then(resp => {
					// var changeimgList=[]
					// resp.imgfiles.forEach((item,index)=>{
					// 	changeimgList.push(item.id)
					// })
					
					// this.changeimgList=changeimgList
					// this.someimgList=resp.imgfiles.map(item=>{
					// 	item.url =config.authUrl + item.url;
					// 	return item;
					// })
					let deschtml = resp.richText.replace(/\<img/g,'<img style="max-width:100%;height:auto;display:block"');

					this.richText=deschtml

					console.info('资料')
					console.info(resp.richText)
					})
			},
			
			cancel(){
				uni.navigateBack()
			},
			confirm(){
				var fileIds=null
				var fileIds=null
				var data=[]
				console.info('changeimgLis图片'+ this.changeimgList)
				console.info(this.changeimgList)
				this.changeimgList=this.changeimgList.join(',')
				console.info('imgLis图片'+ this.changeimgList)
				if(data!=[]){
					fileIds=data.join(',')
				}
				var id=this.byValue.projectId
				this.$u.post('/marketCompanyEssential/productUpdate', {
					id: id,
					fileIds:this.changeimgList
				}).then(resp => {
					setTimeout(function(){
						uni.showToast({
							title: '上传图片成功',
							icon: 'none',
						})
						
					}, 1000);
					uni.navigateBack()
					}).catch(resp => {
							uni.showToast({
								title: '上传图片失败',
								icon: 'none',
							})
						})
			}
		},
		onReachBottom() {
			this.getList()
		}
		}
</script>

<style lang="scss">
	rich-text{
	  max-width: 100%;
	  max-height: 100%;
	  vertical-align: middle;
	  height: auto!important;
	  width: auto!important;
	  img{
		 max-width: 100%;
		 max-height: 100%;
		 vertical-align: middle;
		 height: auto!important;
		 width: auto!important; 
	  }
	}
	.dataCollection{
		position: relative;
		height: 100vh;
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
		.uploadingImg{
			// display: flex;
			// flex-direction: row;
			// justify-content: space-between;
			// flex-wrap: wrap;
			.richText{
				width: 100%;
			}
			image{
				max-width: 100%;
			}
		.show{
			display: flex;
			flex-direction: row;
			padding-bottom: 22px;
			.headimgsize{
				width: 160px;
				height: 82px;
				background: #F7F8FA;
				border: 0.5px solid #EEEEEE;
			}
		}
		.three_imageBox{
			width: 160px;
			height: 82px;
			background-color: #8F8F94;
			margin-right: 10px;
			margin-bottom: 10px;
			.imageBox_img{
				width: 100%;
				height: 100%;
			}
		}
			
		}
			.uploading {
				display: flex;
				flex-direction: column;
				align-items: center;
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
		
		.bottom{
			width: 100%;
			position: absolute;
			bottom: 0px;
			background-color: #FFFFFF;
			padding-top: 10.5px;
			padding-bottom: 34.5px;
			padding-left: 15.5px;
			padding-right: 15.5px;
			display: flex;
			flex-direction: row;
			.cancel{
				width: 50%;
				height: 45px;
				line-height: 45px;
				text-align: center;
				background: #FFFFFF;
				border: 1px solid #3978E7;
				border-radius: 22.5px 0px 0px 22.5px;
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3978E7;
				}
				.confirm{
					width: 50%;
					height: 45px;
					line-height: 45px;
					background: #3978E7;
					text-align: center;
					border-radius: 0px 22.5px 22.5px 0px;
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
				}
			}
	}
</style>
