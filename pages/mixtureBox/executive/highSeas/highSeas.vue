<template>
	<view class="highSeas">
		<!-- 公海 -->
		<view class="content">
			<view class="child" v-for="(item,index) in executiveHighSeasByValue">
				<view class="title">{{item.msg}}</view>
				<view class="time">{{item.sendDate}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['executiveHighSeasByValue'],
		data() {
			return {
				contentArray:[]
				}
				},
				onLoad(){
					this.getList()
				},
				methods:{
					getList(){
						this.$u.post('/messageReceiving/queryMongoDBHighSeasListPage').then(resp => {
							this.contentArray=resp.rows
							
							})
						}
				},
				onReachBottom(){
					this.getList()
				}
				}
</script>

<style lang="scss">
	.highSeas{
		border-top: 0.5px solid #EEEEEE;
		padding-left: 16px;
		padding-right: 16px;
		background-color: #FFFFFF;
		.content{
			.child{
				border-bottom: 0.5px solid #EEEEEE;
				padding-top: 19px;
				padding-bottom: 20.5px;
				.title{
					width: 100%;
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D;
					margin-bottom: 11px;
				}
				.time{
					width: 100%;
					font-size: 14px;
					font-family: DINPro;
					font-weight: 400;
					color: #6E7073;
				}
			}
		   .child:last-child{
			   border-bottom: 0px;
		   }
		}
	}
</style>
