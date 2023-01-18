<template>
	<view class="myClient">
		<!-- 我的客户 -->
		<view class="seek">
			<!-- <view class="seek_box">
				<u-icon name="search" color="#C1C2C7" size="32"></u-icon>
				<input  placeholder='搜索' class="input"  @input="onKeyInput"/>
			</view> -->
		</view>
		<view class="content">
			<view class="content_child"  >
				<text class="child_title" @click="skip(contentObj)">{{contentObj.companyName||''}}</text>
				<view class="child_content">
					<view class="left">
						<view class="left_icon">
							<image src="@/static/image/linkman_icon.png" mode="widthFix"
								style="width: 16px;height: 16px;" />
							<text class="price">{{contentObj.contactPerson||''}}</text>
						</view>
						<view class="left_phone">
							<image src="@/static/image/phone_icon.png" mode="widthFix"
								style="width: 15px;height: 14px;" />
							<text class="price">{{contentObj.phone||''}}</text>
						</view>
					</view>
					<view class="right">
						<view class="right_phone" @click="ringUp(contentObj.phone||'')">
							<image src="@/static/image/phone.png" mode="widthFix"
								style="width: 36px;height: 36px;" />
							<text class="name">联系</text>
						</view>

						<view class="right_followUp" @click="followUp(contentObj)">
							<image src="@/static/image/followUp.png" mode="widthFix"
								style="width: 36px;height: 36px;" />
							<text class="name">跟进</text>
						</view>

					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contentList: [],
				grabble: '',//搜索
				page:1,
				pageSize:0,
				firmId:null,
				contentObj:{}
			}
		},
		onLoad(option) {
			let companyId = option.companyId;
			this.firmId=companyId
		},
		onShow() {
			this.getList();
		},
		methods: {
			skip(item){
				 uni.navigateTo({
				     url: "/pageYwzg/executive/homePage/myClient/orderForm/orderForm?companyId=" +
				      encodeURIComponent(JSON.stringify(item.companyId)),//跳转页面的路径+传值
				    });
			},
			getList() {
				this.$u.get('/salesman/clientDetailsById',{id:this.firmId}).then(resp => {
					console.info(resp)
					if(resp){
					this.contentObj=resp;
					}else{
					uni.navigateBack({
						delta:1
					})	
					}
					
					
				})
			},
			followUp(item) {
				var item = item
				uni.navigateTo({
					url: "/pageYwy/myClient/followUp/followUp?item=" + encodeURIComponent(JSON
						.stringify(item)),
				});
			},
			// 拨打电话
			ringUp(phone){
				uni.makePhoneCall({
				    phoneNumber: phone //仅为示例
				});
				}
		},
		onReachBottom() {
			if (this.contentList.length!=this.pageSize){
				this.getList()
			}
		}
	}
</script>

<style lang="scss">
	.myClient {
		width: 100%;
		.seek {
			background: #fff;
			padding-left: 16px;
			padding-right: 16px;
			padding-top: 13px;
			padding-bottom: 6.5px;
			border-bottom: 0.5px solid #EDEDED;
			.seek_box {
				height: 36px;
				background: #F8F9FB;
				border-radius: 18px;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding-left: 16px;
				padding-right: 16px;
				.input {
					font-size: 12px;
					width: 100%;
					font-family: PingFang SC;
					font-weight: 500;
					color: #808080;
					margin-left: 8px;

				}
			}
		}
		.content {
			background-color: #FFFFFF;
			padding-left: 16px;
			padding-right: 16px;

			.content_child {
				border-bottom: 0.5px solid #EDEDED;
				padding-top: 20.5px;
				padding-bottom: 22.5px;

				.child_title {
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: bold;
					color: #3A3B3D;
				}

				.child_content {
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					.left {
						padding-top: 15.5px;

						.left_icon {
							display: flex;
							flex-direction: row;
							align-items: center;
							margin-bottom: 8.5px;

							.price {
								margin-left: 7.5px;
							}
						}

						.left_phone {
							display: flex;
							flex-direction: row;
							align-items: center;

							.price {
								margin-left: 7.5px;
							}
						}
					}

					.right {
						display: flex;
						flex-direction: row;

						.right_phone {
							display: flex;
							flex-direction: column;
							align-items: center;

							.name {
								font-size: 12px;
								font-family: PingFang SC;
								font-weight: 500;
								color: #565759;
								margin-top: 4.5px;
							}
						}

						.right_followUp {
							display: flex;
							flex-direction: column;
							align-items: center;
							margin-left: 17px;

							.name {
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

			.content_child:last-child {
				border-bottom: 0px;
			}
		}
	}
</style>
