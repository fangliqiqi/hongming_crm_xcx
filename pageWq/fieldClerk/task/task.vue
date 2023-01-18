<template>
	<view class="task">
		<!-- 外勤办事员消息提醒点击----任务 -->
		<view class="seek">
			<view class="seek_box">
				<u-icon name="search" color="#C1C2C7" size="32"></u-icon>
				<input :value="input" placeholder='请输入搜索内容' class="input"  @input="onKeyInput"/>
			</view>
		</view>
		<view class="content">

			<view class="content_child" v-for="(item,index) in dataArray">
				<navigator
					:url="`/pageWq/fieldClerk/missionDetails/missionDetails?item=`+ encodeURIComponent(JSON.stringify(item))"
					hover-class="navigator-hover">
					<view class="child_title">
						<view class="title_icon">
							<image src="@/static/image/rw.png" mode="widthFix"
								style="width: 19.5px;height: 16px;" />
						</view>
						<view class="title_title">
							{{item.projectName||''}}
						</view>
					<!-- 	<view class="title_hint">
							<image src="@/static/image/yujing.png" mode="widthFix"
								style="width: 10.5px;height: 10.5px;" />
							<text class="font">预警</text>
						</view> -->
					</view>
					<view class="child_content">
						<view class="content_left">
							<view class="name">
								<text class="name_key">客户名称：</text>
								<text class="name_price">{{item.companyName||''}}</text>
							</view>
							<view class="name">
								<text class="name_key">联系方式：</text>
								<text class="name_price">{{item.phone||''}}</text>
							</view>
							<view class="name">
								<text class="name_key">项目预计完成时间：</text>
								<!-- <text class="name_price">{{parseTime(item.expectedDate, "{y}-{m}-{d}")}}</text> -->
								<text class="name_price">{{item.expectedDate||''}}</text>
							</view>
						</view>
						<view class="content_right">
							<u-circle-progress active-color="#66C18F" :percent="item.percentage" width='140' border-width='8'>
									<view class="u-progress-content">
										<view class="u-progress-dot percent">{{item.percentage?item.percentage+'%':'0'+'%'}}</view>
										<text class='u-progress-info font'>
											完成度
											</text>
									</view>
								</u-circle-progress>
						</view>

					</view>
</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	// import cmdCircle from "@/components/cmd-circle/cmd-circle.vue"

	export default {
		// props: ['fieldClerkMissionArr'],
		components: {
			// cmdCircle
		},
		data() {
			return {
				grabble: '',//搜索
				input: '',
				// contentList: [],
				price:{},
				dataArray:[],
				newDate: new Date().toISOString().slice(0, 10)
			}

		},
		onLoad(option) {
		   const price = JSON.parse(decodeURIComponent(option.price));
		   this.price = price
		  },
		  onShow() {
		  	this.getList()
		  },
		methods: {
			// 搜索
			onKeyInput(event) {
				    this.grabble = event.target.value
				this.$u.post('/fieldClerk/clientDetails',{blurryKeyword:this.grabble}).then(resp => {
					this.dataArray = resp.rows
				})
			},
			previousPage(){
				uni.navigateBack()
			},
			getList(){
				console.info('张云雷任务预警')
				this.$u.post('/fieldClerk/findTaskProgressPage',{projectId:this.price.projectId}).then(resp => {
					this.dataArray=resp.rows
					})
			},
			
		},


	}
</script>

<style lang="scss" lang="scss">
	.task {
		height: 100vh;
		background: #F5F6F7;
		.nav {
			margin-top: 50px;
			display: flex;
			flex-direction: row;

			.nav_icon {
				width: 40px;
				height: 40px;
				border-left: 4px solid pink;
				border-top: 4px solid pink;
			}

			.nav_title {
				font-size: 18px;
				font-family: PingFang SC;
				font-weight: bold;
				color: #000000;
			}
		}

		.seek {
			background: #fff;
			padding-left: 16px;
			padding-right: 16px;
			padding-top: 13px;
			padding-bottom: 6.5px;

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
			padding-left: 12px;
			padding-right: 12px;
			padding-top: 4px;

			.content_child {
				margin-top: 10px;
				background-color: #FFFFFF;

				.child_title {
					padding-top: 15px;
					padding-bottom: 15px;
					padding-left: 18px;
					padding-right: 18px;
					display: flex;
					flex-direction: row;
					align-items: center;
					border-bottom: 1px solid #E6E7EB;

					.title_icon {
						width: 19.5px;
						height: 16px;
					}

					.title_title {
						margin-left: 9px;
						font-size: 16px;
						font-family: PingFang SC;
						font-weight: bold;
						color: #3A3B3D;
					}

					.title_hint {
						height: 19px;
						background: #FAEBED;
						border-radius: 9.5px;
						padding-left: 8px;
						padding-right: 8px;
						display: flex;
						flex-direction: row;
						align-items: center;
						margin-left: 12.5px;

						.font {
							font-size: 11px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #EF5465;
							margin-left: 5px;
						}
					}
				}
			}

			.child_content {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding-left: 13px;
				padding-right: 13px;
				padding-top: 20px;
				padding-bottom: 20px;

				.content_left {
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.name {
						.name_key {
							font-size: 13px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #6E7073;
						}

						.name_price {
							font-size: 13px;
							font-family: PingFang SC;
							font-weight: 500;
							color: #3A3B3D;
							// margin-left: 6px;
						}
					}
				}

				.content_right {
					// width: 69px;
					// height: 69px;
					// border: 5px solid #66C18F;
					// border-radius: 50%;
					display: flex;
					flex-direction: column;
					text-align: center;
					justify-content: center;
					position: relative;

					.percent {
												font-size: 13px;
												font-family: DINPro;
												font-weight: 500;
												color: #3A3B3D;
											}
					
											.font {
												
												font-size: 10px !important;
												font-family: PingFang SC !important;
												font-weight: 500 !important;
												color: #A1A2A6 !important;
											}
				}

			}
		}
	}
</style>
