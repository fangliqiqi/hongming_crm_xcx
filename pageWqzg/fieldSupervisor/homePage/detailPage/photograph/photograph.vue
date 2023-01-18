<template>
	<view class="photograph">
		<!-- 照片显示 -->
		<view class="content">
			<view class="contentTitle">
				{{contentObj.label}}
			</view>
			<view class="contentReminder">
				提示：文件可上传jpg、png、jpeg、doc、docx、xls、xlsx、 pdf类型文件，每次上传不超过5M
			</view>
			<view class="contentImg" v-for="(item,index) in dataArr">
				<image :src="item.url" class="img"></image>
			</view>
		</view>
	</view>
</template>

<script>
		import config from '@/common/config.js'
	export default {
		data() {
			return {
				contentObj:{},//接受传值
				dataArr:[],
				}
				},
				onLoad(option) {
					const contentObj = JSON.parse(decodeURIComponent(option.contentObj));
					this.contentObj = contentObj
					console.log('子界面'); 
					console.log(contentObj); //打印出上个页面传递的参数。
					// console.log(this.value); //打印出上个页面传递的参数。
					// this.getList()
				},
				onShow() {
					this.getList()
				},
				methods:{
					getList(){
						this.$u.get('/fieldSupervisor/findPictureEcho', {
							id: this.contentObj.id,
							label:this.contentObj.label
						}).then(resp => {
							// this.dataArr=resp
							this.dataArr=resp.map(item=>{
								item.url =config.authUrl + item.url;
								return item;
							})
							console.info('请求返回数据')
							console.info(resp)
						})
						},
						
				}
				}
</script>

<style lang="scss">
	.photograph{
		background-color: #FFFFFF;
		height: 100vh;
		position: relative;
		padding-bottom: 0px;

		.content{
			padding-left: 16px;
			padding-right: 22.5px;
			padding-top: 22px;
			.contentTitle{
				font-size: 18px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3A3B3D;
				margin-bottom: 12px;
			}
			.contentReminder{
				font-size: 12px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #6E7073;
				line-height: 21px;
				margin-bottom: 26px;
			}
			.contentImg{
				width: 160px;
				height: 82px;
				padding-left: 15px;
				padding-right: 15px;
				background-color: #42413F;
				.img{
					width: 100%;
					height: 100%;
					
				}
			}
		}
	}
</style>
