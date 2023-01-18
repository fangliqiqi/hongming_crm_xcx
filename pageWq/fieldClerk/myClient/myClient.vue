 <template>
	<view class="myClient">
		<!-- 我的客户 -->
		<view class="seek">
			<view class="seek_box">
				<u-icon name="search" color="#C1C2C7" size="32"></u-icon>
				<input  placeholder='搜索' class="input"  @input="onKeyInput"/>
			</view>
		</view>
		<view class="content">
			<view class="content_child" v-for="(item,index) in contentList">
				<text class="child_title" @click="item(item)">{{item.companyName}}</text>
				<view class="child_content">
					<view class="left">
						<view class="left_icon">
							<image src="@/static/image/linkman_icon.png" mode="widthFix"
								style="width: 16px;height: 16px;" />
							<text class="price">{{item.contactPerson}}</text>
						</view>
						<view class="left_phone">
							<image src="@/static/image/phone_icon.png" mode="widthFix"
								style="width: 15px;height: 14px;" />
							<text class="price">{{item.phone}}</text>
						</view>
					</view>
					<view class="right">
						
					<!-- 	<view class="right_phone" @click="ringUp(item.phone)">
							<image src="@/static/image/phone.png" mode="widthFix" style="width: 36px;height: 36px;" />
							<text class="name">联系</text>
						</view> -->

						<view class="right_followUp" @click="followUp(item)">
							<image src="@/static/image/followUp.png" mode="widthFix"
								style="width: 36px;height: 36px;" />
							<text class="name">跟进</text>
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
		data() {
			return {
				reload:true,
				loading:false,
				page:1,
				pageSize:10,
				tatol:0,
				contentList: [],
					grabble: '',//搜索
			}
		},
		onShow() {
			// this.getList()
					this.keyword = ''
					let that = this;
					this.$nextTick(function() {
						if (that.reload) {
							this.page = 1
							this.pageSize = 10	
							this.dataArray =[]					
							this.getList()
							// that.getPageInfo()
							
							this.loading = false;
						} else {
							that.reload = true
						}
					})
		},
		methods: {
			item(item){
				var that=this
				console.info('跳转')
				console.info(item)
				 uni.navigateTo({
				     url: "/pageWq/fieldClerk/myClient/orderForm/orderForm?byValue=" +
				      encodeURIComponent(JSON.stringify(item)),//跳转页面的路径+传值
					  events:{
					  							acceptDataFromOpenedPage: (data)=> {
					  								console.log('回来的时候')
					  							      console.log(data)
					  								  that.$emit('reload',false)
					  							},
					  						}
				    });
				
			},
			onKeyInput(event) {
				    this.grabble = event.target.value
				this.$u.post('/fieldClerk/clientDetails',{blurryKeyword:this.grabble}).then(resp => {
					this.contentList = resp.rows
				})
			},
			getList() {
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
				this.$u.post('/fieldClerk/clientDetails?1=1&' + params).then(response => {
					// this.contentList = response.rows
				this.tatol = response.totalRows
					this.contentList = (this.page == 1 ? [] : this.contentList)
						.concat(response.rows)
					if (typeof cb == 'function') {
						cb()
					}
				}).catch(() => {
					this.loading = false;
				})

			},
			// 拨打电话
			ringUp(phone){
				uni.makePhoneCall({
				    phoneNumber: phone //仅为示例
				});
				},
			followUp(item) {
				var item = item
				uni.navigateTo({
					url: "/pageYwzg/executive/homePage/myClient/followUp/followUp?item=" + encodeURIComponent(JSON
						.stringify(item)),
				});
			}

		},
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
		},
	}
</script>

<style lang="scss">
	.myClient {
		position: relative;
		padding-top: 56px;
		.seek {
			width: 100%;
			background: #fff;
			padding-left: 16px;
			padding-right: 16px;
			padding-top: 13px;
			padding-bottom: 6.5px;
			border-bottom: 0.5px solid #EDEDED;
			position: fixed;
			top: 0px;
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
