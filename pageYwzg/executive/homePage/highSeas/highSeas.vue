<template>
	<view class="highSeas">
		<!-- 公海 -->
		<view class="content">
			<view class="child" v-for="(item,index) in contentArray">
				<view class="title">{{item.msg}}</view>
				<view class="time">{{item.sendDate}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['highSeasByValue'],
		data() {
			return {
				contentArray:[],
				page:1,
				pageSize:0,
				}
				},
				onShow() {
					this.page=1
					this.pageSize=0
					this.contentArray=[]
					this.getList()
					
					
				},
				methods:{
					getList(){
						this.page = this.contentArray.length == this.pageSize ? this.page:++this.page;
						let data = {
							page:this.page,
							pageSize: 10
						}
						var params = Object.keys(data).map(function(key) {
							return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
						}).join("&");
						this.$u.post('/messageReceiving/queryMongoDBHighSeasListPage?1=1&'+params).then(resp => {
							this.pageSize=resp.totalRows
							if(this.contentArray.length==0){
								this.contentArray=resp.rows
							}else if (this.contentArray.length!=this.pageSize){
								this.contentArray=this.contentArray.concat(resp.rows)
							}
							})
						}
				},
				onReachBottom(){
					if (this.contentArray.length!=this.pageSize){
						this.getList()
					}
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
