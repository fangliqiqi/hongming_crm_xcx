<template>
	<view class="renewClientRemind">
		<!-- 续签客户提醒 -->
		<view class="child" v-for="(item,index) in dataArray">
			<!-- <text class="name">{{item.projectName}}</text>
			<text class="time">{{item.time}}</text> -->
			<text
				class="name">{{item.map.companyName?item.map.companyName:""}}{{item.map.projectName?item.map.projectName:''}}{{item.map.time?'于' + item.map.time +'到期':''}}</text>
		<view class="childName">{{item.map.createName||''}}</view>
		
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


			}
		},

		onLoad(option) {
		// 	const item = JSON.parse(decodeURIComponent(option.item));
		// 	this.dataArray = item
		// 	console.log('续签客户提醒');
		// 	console.log(item); //打印出上个页面传递的参数。
		// 	console.log(this.dataArray); //打印出上个页面传递的参数。
		// that.getList()
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
		methods: {
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
				this.$u.get('/messageReceiving/findRenewCustomerMessage?1=1&' + params).then(resp => {
		
					this.tatol = resp.rest.totalRows
					this.dataArray = (this.page == 1 ? [] : this.dataArray).concat(resp.rest.rows)
					if (typeof cb == 'function') {
						cb()
					}
				}).catch(() => {
					this.loading = false;
				})
			},
		
		},
		onReachBottom() {
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
	.renewClientRemind {
		border-top: 0px solid #EEEEEE;
		background-color: #FFFFFF;
		width: 100%;
.none{
			padding: 20px;
			text-align: center;
		}
		.child {
			display: flex;
			flex-direction: column;
			border-bottom: 0.5px solid #EEEEEE;
			padding-top: 23px;
			padding-bottom: 24.5px;
			margin-left: 16px;
			margin-right: 16px;

			.name {
				font-size: 16px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #3A3B3D;
				margin-bottom: 16px;
			}
.childName{
	text-align: right;
	font-size: 14px;
	font-family: DINPro;
	font-weight: 400;
	color: #6E7073;
}
			.time {
				font-size: 14px;
				font-family: DINPro;
				font-weight: 400;
				color: #6E7073;
			}
		}

		.child:last-child {
			border: 0px;
		}
	}
</style>
