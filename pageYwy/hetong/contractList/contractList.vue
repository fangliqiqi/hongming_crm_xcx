<template>
	<view class="page" :class="isShow?'overhide':''" >
		<view class="list" v-for="(item,index) in contractList" :key='item.id' >
			<view class="item-top">合同编号:{{item.controlNo}}</view>
			<view class="item_main">
				<view class="left_img" @click="toDetail(item)">
					<image src="../../../static/image/pdf-1.png" mode="widthFix"></image>
				</view>
				<!-- <view class="left_btn" @click="toSign(item)" v-if="item.state==1"> -->
				<view class="left_btn" @click="toSign(item)">
					<text>待签署</text>
				</view>
				<view class="left_btn" v-if="item.state==2" @click="toDetail(item)">
					<text>预览</text>
				</view>
			</view>
		</view>
					
	</view>
</template>

<script>

	export default {
		data() {
			return {
				contractList:[],
				page:1,
				pageSize:0,
				isShow:false,
				contractNo:'',
				contractId:null,
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.page=1;
			this.pageSize=0;
			this.contractList = [];
			this.getcontractList()
		},
		methods:{
			
			getcontractList(){
				this.page = this.contractList.length == this.pageSize ? this.page:++this.page;
				let data = {
					page:this.page,
					pageSize: 10
				}
				var params = Object.keys(data).map(function(key) {
					return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
				}).join("&");
				this.$u.post('/marketCompanyContract/queryListPage?'+params,).then(resp => {
					this.pageSize = resp.totalRows
					if(this.contractList.length==0){
						this.contractList=resp.rows
					}else if (this.contractList.length!=this.pageSize){
						this.contractList=this.contractList.concat(resp.rows)
					}
				})
			},
			// 跳转到合同详情
			toDetail(e){
				console.log(e)
				let item = e;
				uni.navigateTo({
					url:'/pageYwy/hetong/contract/contract?id='+item.id
				})
			},
			
		// 点击遮罩层 关闭
		Domask(){
			this.isShow = false;
		},
		// 签字
		toSign(e){
			console.log(e)
			uni.navigateTo({
				url:'/pageYwy/hetong/contractSign/contractSign?id='+e.id+'&no='+ e.controlNo
			})
		},
		
		
		onReachBottom() {
			if (this.contractList.length!=this.pageSize){
				this.getcontractList()
			}
		}
		
		}
	}
</script>

<style lang="scss">
	page{
		background: #f5f6f7;
	}
	.page{
		padding:10rpx 24rpx 50rpx 24rpx;
	}
	.list{
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}
	.item-top{
		width: 100%;
		height: 92rpx;
		line-height: 92rpx;
		padding: 0 36rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #3A3B3D;
		border-bottom: 1rpx solid #E6E7EB;
	}
	.item_main{
		width: 100%;
		padding: 35rpx 36rpx 42rpx;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	.left_img{
		width: 320rpx;
		height: 164rpx;
		background: #F7F8FA;
		// border: 1px solid #EEEEEE;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.left_img image{
		width: 82rpx;
	}
	.left_btn{
		width: 182rpx;
		height: 72rpx;
		background: #ECF2FC;
		border: 1rpx solid #D9E4F8;
		border-radius: 5rpx;
		text-align: center;
		line-height: 72rpx;
	}
	.left_btn text{
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #3978E7;
	}
	.warp{
		position: absolute;
		top:35%;
		left: 0;
		right: 0;
	}
	.overhide{
		overflow: hidden;
		height: 100vh;
	}
</style>
