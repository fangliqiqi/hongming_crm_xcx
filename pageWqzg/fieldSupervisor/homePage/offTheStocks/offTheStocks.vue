<template>
	<view class="offTheStocks">
		<!-- 已完成的任务 -->
		<view class="seek">
			<view class="seek_box">
				<u-icon name="search" color="#C1C2C7" size="32"></u-icon>
				<input  placeholder='请输入搜索内容' class="input" @input="onKeyInput"/>
			</view>
		</view>
		<view class="content">
			
			<view class="content_child" v-for="(item,index) in contentList">
				<navigator :url="`/pages/fieldSupervisor/homePage/detailPage/detailPage?item=`+ encodeURIComponent(JSON.stringify(item))"  hover-class="navigator-hover">
				<view class="child_title">
					<view class="title_icon">
						<image src="@/static/image/rw.png" mode="widthFix" style="width: 19.5px;height: 16px;" /> 
					</view>
					<view class="title_title">
						{{item.projectName}}
					</view>
				</view>
				
				<view class="child_content">
					<view class="content_left">
						<view class="name">
							<text class="name_key">客户名称：</text>
							<text class="name_price">{{item.companyName}}</text>
						</view>
						<view class="name">
							<text class="name_key">联系方式：</text>
							<text class="name_price">{{item.phone}}</text>
						</view>
						<view class="name">
							<text class="name_key">项目预计完成时间：</text>
							<text class="name_price">{{item.expectedDate}}</text>
						</view>
					</view>
					<view class="content_right">
						<text>100%</text>
						<text>完成度</text>
					</view>
				</view>
			</navigator>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data (){
			return {
				grabble: '',//搜索
				contentList:[],
				reload: true,
				loading: false,
				page: 1,
				pageSize: 10,
				tatol: 0,
				
			}
		},

		onShow() {
			this.keyword = ''
			let that = this;
			this.$nextTick(function() {
				console.info('点击页面')
				console.info(that.reload )
				if (that.reload) {
					this.page = 1
					this.pageSize = 10				
					that.getList()
					// that.getPageInfo()
					this.loading = false;
					// that.reload = false
				} else {
					that.reload = true
				}
			})
		},
		methods:{
			onKeyInput(event) {
				 this.grabble = event.target.value
				this.$u.post('/fieldSupervisor/findTaskProgressPage',{blurryKeyword:this.grabble}).then(resp => {
						this.contentList=resp.rows
				})
			},
			getList (){
				if (this.contentList.length == 0) {
					this.page = 1
				} else {
					this.page = this.contentList.length == this.tatol ? this.page : ++this.page;
				}
				let data = {
					page: this.page,
					pageSize: 10
				}
				var params = Object.keys(data).map(function(key) {
					// body...
					return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
				}).join("&");
				this.$u.post('/fieldSupervisor/findTaskProgressPage?1=1&' + params).then(resp => {
					// this.contentList=resp.rows
					this.tatol = resp.totalRows
						this.contentList = (this.page == 1 ? [] : this.contentList)
							.concat(resp.rows)
						if (typeof cb == 'function') {
							cb()
						}
					}).catch(() => {
						this.loading = false;
					})
			}
		},
		// onReachBottom(){
		// 	this.getList()
		// }
		onReachBottom() {
			let that = this;
			let loading = this.loading;
			let page = this.page || 1;
			let pageSize = this.pageSize || 10;
			let tatol = this.tatol || 0;
			if (!loading) {
				that.loading = true;
				if (tatol / pageSize > page) {
					this.getList(function() {
						that.loading = false;
						that.page = page + 1;
					})
				}
			}
		}
		}
</script>

<style lang="scss">
	.offTheStocks{
		position: relative;
		padding-top: 56px;
		
	.seek{
		background: #fff;
		padding-left: 16px;
		width: 100%;
		padding-right: 16px;
		padding-top: 13px;
		padding-bottom: 6.5px;
		position: fixed;
		top: 0px;
		box-shadow: 0px 0px 5px #EDEDED;
		.seek_box{
			height: 36px;
			background: #F8F9FB;
			border-radius: 18px;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-left: 16px;
			padding-right: 16px;
			.input{
				font-size: 12px;
				font-family: PingFang SC;
				font-weight: 500;
				color: #808080;
				margin-left: 8px;
				
			}
		}
	}
	.content{
		padding-left: 12px;
		padding-right: 12px;
		padding-top: 4px;
		.content_child{
			margin-top: 10px;
			background-color: #FFFFFF;
			.child_title{
				padding-top: 15px;
				padding-bottom: 15px;
				padding-left: 18px;
				padding-right: 18px;
				display: flex;
				flex-direction: row;
				align-items: center;
				border-bottom: 1px solid #E6E7EB;
				.title_icon{
					width: 19.5px;
					height: 16px;
				}
				.title_title{
					margin-left: 9px;
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: bold;
					color: #3A3B3D;
				}
				}
		}
			.child_content{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding-left: 18px;
				padding-right: 18px;
				padding-top: 20px;
				padding-bottom: 20px;
				.content_left{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.name{
						.name_key{
							font-size: 13px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #6E7073;
						}
						.name_price{
							font-size: 13px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #3A3B3D;
							margin-left: 6px;
						}
					}
				}
				.content_right{
					width: 69px;
					height: 69px;
					border: 5px solid #66C18F;
					border-radius: 50%;
					display: flex;
					flex-direction: column;
					text-align: center;
					justify-content: center;
				}
			}
	}
	}
</style>
