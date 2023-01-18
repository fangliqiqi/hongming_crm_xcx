<template>
	<view class="turnDown">
		<!-- 驳回 -->
		<view class="head" @click="previousPage">
			<u-icon name="arrow-left" color="#000000" size="42"></u-icon>
			<text class="head_title">确定驳回</text>
		</view>
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
		  
			data() {
				return {
					text:'',
					byValue:{}
					}
					},
					onLoad(option) {
						const byValue = JSON.parse(decodeURIComponent(option.byValue));
						this.byValue = byValue
						console.log('详情');
						console.log(byValue); //打印出上个页面传递的参数。
						console.log(this.byValue); //打印出上个页面传递的参数。
					},
					methods:{
						previousPage(){
							uni.navigateBack()
						},
						button() {
							console.log('提交'); 
							console.log(this.byValue.id); 
							var id=this.byValue.id
							var text=this.text
							// status 20通过 30不通过
							this.$u.post('/boss/auditHPOrderTaxation',{id:id,status:30,remark:text}).then(resp => {
								uni.navigateBack();
	})
								}
					}
					}
</script>

<style lang="scss">
	.turnDown{
		height: 100vh;
		background-color: #FFFFFF;
		.head{
			background-color: #FFFFFF;
			width: 100%;
			padding-left: 14px;
			text-align: left;
			padding-top: 52px;
			padding-bottom: 13px;
			display: flex;
			flex-direction: row;
			.arrow-left{
				
			}
			.head_title{
				font-family: PingFang SC;
				font-weight: bold;
				color: #000000;
				font-size: 18px;
				margin-left: 10px;
			}
		}
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
