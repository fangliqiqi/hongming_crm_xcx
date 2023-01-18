<template>
	<view class="clientFollowUpRemind">
		<!-- 客户跟进提醒 -->
		<view class="child" v-for="(item,index) in dataArray" @click="skip(item)">
			<text class="name">{{item.companyName||''}}{{item.text?','+ item.text:''}}</text>
			<text class="time">{{item.time?'下次跟进时间'+ item.time:''}}</text>
		</view>
		<view v-if="lenght">
		抱歉暂无任何消息
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataArray: [],
				lenght:false,
			}
		},
	
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.dataArray = item
			this.lenght=item.length==0?true:false
		},
		methods:{
			skip(item){
				// pageYwzg/executive/homePage/myClient/myClient
				 // uni.navigateTo({
				 //     url: "/pageYwy/salesman/homePage/client/client?companyId=" +
				 //      encodeURIComponent(JSON.stringify(item.companyId)),//跳转页面的路径+传值
				 //    });
				 console.info('跳转啦-业务主管')
				  console.info(item)
					uni.navigateTo({
					    url: "/pageYwzg/executive/homePage/clientFollowUpRemind/myClient/myClient?companyId=" +item.companyId,//跳转页面的路径+传值
					   });
			}
		}
		}
</script>

<style lang="scss">
	.clientFollowUpRemind{
		border-top: 0.5px solid #EEEEEE;
		background-color: #FFFFFF;
		width: 100%;
		.child{
			display: flex;
			flex-direction: column;
			border-bottom: 0.5px solid #EEEEEE;
			padding-top: 23px;
			padding-bottom: 24.5px;
			margin-left: 16px;
			margin-right: 16px;
			.name{
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3A3B3D;
				margin-bottom: 16px;
			}
			.time{
				font-size: 14px;
				font-family: DINPro;
				font-weight: 400;
				color: #6E7073;
			}
		}
		.child:last-child{
			border: 0px;
		}
	}
</style>
