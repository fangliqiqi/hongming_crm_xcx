<template>
	<view class="auditDefeatedRemind">
		<!-- 业务员-审核失败提醒 -->
		
		<view class="child" v-if="dataArray.length!=0" v-for="(item,index) in dataArray" >
 			<!-- <navigator :url="`/pageYwzg/executive/homePage/toAuditRemind/particulars/particulars?item=`+ encodeURIComponent(JSON.stringify(item))"  hover-class="navigator-hover"> -->
			<text class="title">{{item.map.projectName}}</text>
			<view class="detail">
				<!-- <view class="decimal_data">{{item.companyName||''}}{{item.name||''}}{{item.reviewer?'审核人：' + item.reviewer +'审核不通过':''}}</view> -->
				<view class="decimal_data">{{item.map.companyName||''}}{{item.map.name?':'+item.map.name:''}}</view>
				<view class="decimal_data">{{item.map.reviewer?'审核人：' + item.map.reviewer +'审核不通过':''}}</view>
				<view class="decimal_data">审核状态:不通过</view>
			<!-- 	<view class="decimal_btn">
					<text class="name">查看详情</text>
					<u-icon name="arrow-right" color="#4d84e4" size="25"></u-icon></view>
			</view> -->
			
			<view class="decimal_time">
				{{item.map.time||''}}
			</view>
			<!-- </navigator> -->
		</view>
		</view>
		
		<view v-if="dataArray.length==0" class="none">抱歉暂无消息</view>
		
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
			// console.info('审核失败提醒')
			// console.info(this.dataArray)
		// 	this.getList()
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
		methods:{getList() {
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
				this.$u.get('/messageReceiving/findAuditFailureMessage?1=1&' + params).then(resp => {
			
					this.tatol = resp.rest.totalRows
					this.dataArray = (this.page == 1 ? [] : this.dataArray).concat(resp.rest.rows)
					if (typeof cb == 'function') {
						cb()
					}
					console.info('审核失败提醒')
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
	.auditDefeatedRemind{
		border-top: 0.5px solid #EEEEEE;
		height: 100vh;
		background-color: #F5F6F7;
		.none{
			padding: 20px;
			text-align: center;
		}
		.child{
			border-bottom: 0.5px solid #EEEEEE;
			display: flex;
			flex-direction: column;
			padding-top: 19px;
			// padding-bottom: 19px;
			background-color: #FFFFFF;
			.title{
				// width: 100%;
				// font-size: 16px;
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3A3B3D;
				margin-bottom: 10px;
				 white-space :nowrap;
				text-overflow:ellipsis;
				overflow: hidden;
			}
			.detail{
				display: flex;
				flex-direction: column;
				padding-bottom: 24px;
				border-bottom: 0.5px solid #EEEEEE;
				margin-left: 16px;
				margin-right: 16px;
				// justify-content: space-between;
				.decimal_data{
					line-height: 24px;
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D;
				}
				.decimal_time{
					margin-top: 11px;
					font-size: 14px;
					font-family: DINPro;
					font-weight: 400;
					color: #6E7073;
				}
				// .decimal_btn{
				// 	display: flex;
				// 	.name{
				// 	font-size: 12px;
				// 	font-family: PingFang SC;
				// 	font-weight: 500;
				// 	color: #4d84e4;
				// 	}
				// }
			}
		}
	.child:last-child{
		border: 0px;
	}
	}
</style>
