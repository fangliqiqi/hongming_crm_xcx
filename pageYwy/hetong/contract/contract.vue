<template>
	<view>
		<view style="width: 100%;">
			<web-view 
					 v-if="iOS"
					:src='pdfurl'>
			</web-view>
		</view>
	</view>
</template>

<script>
	import config from '@/common/config.js'
	export default {
		data() {
			return {
				pdfurl:null,
				id:null,//合同id
				state:null,
				iOS:true
			};
		},
		onLoad(option) {
			// console.log(option)
			this.id = option.id;
			if(option.state){
				this.state = option.state;
			}
			
			this.getContract()
		},
		onShow() {
			
		},
		methods:{
			
			getSys(url){
				// 判断操作系统
				uni.getSystemInfo({
					success: (res) => {
						console.log(res)
						if (res.system.includes('iOS')) {
							this.iOS = true;
							// iOS 可直接查看
							this.pdfurl = url;
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
			
			getContract(){
				let id = this.id
				// let url = 'https://www.hmtcrm.com/profile/crm/contract/2021-05-14/HM-CS202105140004/2021/05/14/141c8a04-6e6b-4b7c-bd94-009a6ef528ea.pdf'
				// this.getSys(url)
					
				this.$u.post('/marketCompanyContract/queryDetail?id='+ id).then(res => {
					let url = config.authUrl + res.path;
					// let url = 'https://www.hmtcrm.com' + res.path;
					// this.pdf = config.authUrl + res.path;
					// this.pdf = 'https://www.hmtcrm.com' + res.path;
					this.getSys(url)
				})
		}
		
	}
}
</script>

<style lang="scss">
	
	

</style>
