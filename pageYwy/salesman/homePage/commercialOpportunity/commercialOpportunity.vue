<template>
	<view class="commercialOpportunity">
		<!-- 业务员-商机 -->
		<view class="seek">
			<view class="seek_box">
				<u-icon name="search" color="#C1C2C7" size="32"></u-icon>
				<input  placeholder='搜索' class="input" @input="onKeyInput"/>
			</view>
		</view>
		<view class="content">
			<view class="content_child" v-for="(item,index) in contentList">
				<text class="child_title">{{item.companyName}}</text>
				<view class="child_content">
					<view class="left">
						<view class="left_icon">
							<image src="@/static/image/linkman_icon.png" mode="widthFix" style="width: 16px;height: 16px;" /> 
							<text class="price">{{item.contactPerson}}</text>
						</view>
						<view class="left_phone">
							<image src="@/static/image/phone_icon.png" mode="widthFix" style="width: 15px;height: 14px;" /> 
							<text class="price">{{item.phone}}</text>
						</view>
					</view>
					<view class="right">
						<view class="right_phone" @click="ringUp(item.phone)">
							<image src="@/static/image/phone.png" mode="widthFix" style="width: 36px;height: 36px;" /> 
							<text class="name">联系</text>
						</view>
					</view>
								
				</view>
			</view>
		</view>
		<view class="content" v-if="contentList.length==0">暂无数据</view>
	</view>
</template>

<script>
	export default {
	data (){
		return{
			contentList:[],
			grabble: null, //搜索字段
			page:1,
			pageSize:0,
		}
	},
	onLoad() {
			this.getList();
		},
		methods: {
			onKeyInput(event) {
				this.grabble = event.target.value
				this.$u.post('/salesman/findClientBusiness', {
					blurryKeyword: this.grabble
				}).then(resp => {
					this.contentList=resp.rows
				})
			},
	getList (){
		this.page = this.contentList.length == this.pageSize ? this.page:++this.page;
		let data = {
			page:this.page,
			pageSize: 10
		}
		var params = Object.keys(data).map(function(key) {
			// body...
			return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
		}).join("&");
					this.$u.post('/salesman/findClientBusiness?1=1&'+params).then(resp => {
						// this.contentList=resp.rows
						this.pageSize=resp.totalRows
						if(this.contentList.length==0){
							this.contentList=resp.rows
						}else if (this.contentList.length!=this.pageSize){
							this.contentList=this.contentList.concat(resp.rows)
						}
						})
				},
				// 拨打电话
				ringUp(phone){
			
					uni.makePhoneCall({
					    phoneNumber: phone //仅为示例
					});
					}
			},
			onReachBottom(){
				// this.getList()
				if (this.contentList.length!=this.pageSize){
					this.getList()
				}
			},
			
	}
</script>

<style lang="scss">
	.commercialOpportunity{
		width: 100%;
		.seek{
			background: #fff;
			padding-left: 16px;
			padding-right: 16px;
			padding-top: 13px;
			padding-bottom: 6.5px;
			border-bottom: 0.5px solid #EDEDED;
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
			background-color: #FFFFFF;
			padding-left: 16px;
			padding-right: 16px;
			.content_child{
				border-bottom: 0.5px solid #EDEDED;
				padding-top: 20.5px;
				padding-bottom: 22.5px;
				
				.child_title{
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: bold;
					color: #3A3B3D;
				}
				.child_content{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					.left{
						padding-top: 15.5px;
						.left_icon{
							display: flex;
							flex-direction: row;
							align-items: center;
							margin-bottom: 8.5px;
							.price{
								margin-left: 7.5px;
							}
						}
						.left_phone{
							display: flex;
							flex-direction: row;
							align-items: center;
							.price{
								margin-left: 7.5px;
							}
						}
					}
					.right{
						display: flex;
						flex-direction: row;
						.right_phone{
							display: flex;
							flex-direction: column;
							align-items: center;
							.name{
								font-size: 12px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #565759;
								margin-top: 4.5px;
							}
						}
						.right_followUp{
							display: flex;
							flex-direction: column;
							align-items: center;
							margin-left: 17px;
							.name{
								font-size: 12px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #565759;
								margin-top: 4.5px;
							}
						}
					}
				}
			}
			.content_child:last-child{
				border-bottom: 0px;
			}
		}
	}
</style>
