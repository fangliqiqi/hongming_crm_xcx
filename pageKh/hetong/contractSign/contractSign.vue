<template>
	<view class="page">
		<signature @success='toSignature' @tap.stop  :contractNo='contractNo'></signature>	
	</view>
</template>

<script>
	import signature from '@/components/signature.vue'
	import config from '@/common/config.js'
	export default {
		components:{
			signature
		},
		data() {
			return {
				contractNo:null,
				contractId:null,
			};
		},
		onLoad(options) {
			console.log(options)
			this.contractNo = options.no
			this.contractId = options.id
		},
		methods:{
			// 签字 提交
			toSignature(e){
				console.log(e)
				var headerToken = this.$store.state.vuex_token;
				let that = this;
				let id = that.contractId
				
				uni.uploadFile({
					url: config.contractUrl+'/electronicContract/autograph', 
					name: 'file',
					filePath: e,
					formData:{
						id:id
					},
					header: {
						Authorization: headerToken,
						"ContentType": "multipart/form-data"
					},
					success: (res) => {
						console.info('成功了')
						uni.showToast({
							title:'签字成功'
						})
						setTimeout(function(){
							uni.navigateBack({
								delta:1
							})
						},1000)
					},
					fail:(req)=>{
						console.log('失败了')
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f6f7;
	}
	.page{
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 20%;
	}
</style>
