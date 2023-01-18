<template>
	<view class="reject">
		<!-- 驳回 -->
		 <view class="inp">
			 <textarea  v-model="text" placeholder="请输入驳回原因"/>
		 </view>
		 <view class="bottom">
			 <button class="btn" @click="button">确认驳回</button>
		 </view>
	</view>
</template>

<script>
	export default {
		data (){
			return {
				text:'',
				dataObj:{}
			}
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.dataObj = item
			console.log('详情');
			console.log(item); //打印出上个页面传递的参数。
			console.log(this.dataObj); //打印出上个页面传递的参数。
		},
		methods:{
			button() {
				
				// console.log(this.dataObj.orderId); 
				var id=this.dataObj.orderId
				var text=this.text
				// status 20通过 30不通过
				this.$u.post('/salespersonSupervisor/review',{id:id,status:30,remark:text}).then(resp => {
					uni.navigateBack();
		
					})
					},
					
					
		},
		onReachBottom(){
		}
		}
</script>

<style lang="scss">
	.reject{
		background-color: #FFFFFF;
		height: 100vh;
		position: relative;
		.inp{
		padding-left: 16px;
		padding-right: 16px;
		padding-top: 17px;
		}
		.bottom{
			box-shadow: 0px -20px 30px 0px rgba(42, 55, 134, 0.03);
			position: absolute;
			bottom: 0px;
			width: 100%;
			padding-left: 15.5px;
			padding-right: 15.5px;
			padding-top: 10.5px;
			padding-bottom: 44.5px;
			.btn{
				width: 100%;
				height: 45px;
				background: #3978E7;
				border-radius:22.5px;
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 45px;
				text-align: center;
			}
			}
	}
</style>
