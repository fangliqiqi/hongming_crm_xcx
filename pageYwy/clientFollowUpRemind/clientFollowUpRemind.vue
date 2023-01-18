<template>
	<view class="clientFollowUpRemind">
		<!-- 客户跟进提醒 -->
		<view class="child" v-for="(item,index) in dataArray" @click="skip(item)">
			<text class="name">{{item.map.companyName||''}}{{item.map.text?','+ item.map.text:''}}</text>
			<text class="time">{{item.map.time?'下次跟进时间'+ item.map.time:''}}</text>
		</view>
		<view v-if="tatol==0" class="none">
		抱歉暂无任何消息
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				reload: true,
				loading: false,
				page: 1,
				pageSize: 10,
				tatol: 0,
				dataArray: [],
				lenght:false,
			}
		},
	
		onLoad(option) {
			// const item = JSON.parse(decodeURIComponent(option.item));
			// this.dataArray = item
			// this.lenght=item.length==0?true:false
		},
		onShow() {
			// this.getList()
			var that = this
			this.$nextTick(function() {
				if (that.reload) {
					that.page = 1
					that.pageSize = 10
					that.dataArray = []
					that.getList()
					// that.getPageInfo()
		
					that.loading = false;
				} else {
					that.reload = true
				}
			})
		},
		methods:{
			skip(item){
				// pageYwzg/executive/homePage/myClient/myClient
				 // uni.navigateTo({
				 //     url: "/pageYwy/salesman/homePage/client/client?companyId=" +
				 //      encodeURIComponent(JSON.stringify(item.companyId)),//跳转页面的路径+传值
				 //    });
				 console.info('跳转啦')
				  console.info(item)
					uni.navigateTo({
					    url: "/pageYwy/myClient/myClient?companyId=" +item.companyId,//跳转页面的路径+传值
					   });
			},
			getList() {
				if (this.dataArray.length == 0) {
					this.page = 1
				} else {
					this.page = this.dataArray.length == this.tatol ? this.page : ++this.page;
				}
				let data = {
					page: this.page,
					pageSize: 10
				}
				var params = Object.keys(data).map(function(key) {
					// body...
					return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
				}).join("&");
				this.$u.get('/messageReceiving/findFollowMessage?1=1&' + params).then(resp => {
			
					this.tatol = resp.rest.totalRows
					this.dataArray = (this.page == 1 ? [] : this.dataArray).concat(resp.rest.rows)
					if (typeof cb == 'function') {
						cb()
					}
					console.info('异常订单页面')
					console.info(resp)
					console.info(this.dataArray)
					console.info(this.tatol)
				}).catch(() => {
					this.loading = false;
				})
			},
		},onReachBottom() {
			let that = this;
			let loading = this.loading;
			let page = this.page || 1;
			let pageSize = this.pageSize || 10;
			let tatol = this.tatol || 0;
			if (!loading) {
				// that.loading = true;
				if (tatol / pageSize > page) {
					this.getList(function() {
						that.loading = false;
						that.page = page + 1;
					})
				}
			}
		},
		}
</script>

<style lang="scss">
	.clientFollowUpRemind{
		border-top: 1rpx solid #EEEEEE;
		background-color: #FFFFFF;
		width: 100%;
		.none{
			padding: 20px;
			text-align: center;
		}
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
