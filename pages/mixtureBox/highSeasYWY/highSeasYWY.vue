<template>
	<view class="highSeas">
		<!-- 业务员-公海 -->
		111
		<view class="content" v-if="highSeasYWYByValue.length>0&&highSeasYWYByValue!=[]">
			<view class="child" v-for="(item,index) in highSeasYWYByValue">
				<view class="child_left">
					<view class="clienteleName">{{item.clienteleName||''}}</view>
					<view class="yixiang">
						<text class="ask">意向等级</text>
						<text class="answer">{{item.sourceTypeLv||''}}</text>
					</view>
					<view class="yixiang">
						<text class="ask">业务描述</text>
						<text class="answer">{{item.categoryText||'暂无'}}</text>
					</view>
				</view>
				<view class='child_right' @click="rob(item)">
					抢单
				</view>
			</view>
		</view>
		<view class='content_else' v-if="ighSeasYWYByValue.length==0">暂无数据</view>
	</view>
</template>

<script>
	export default {
		props: ['highSeasYWYByValue'],
		data() {
			return {
				contentArray: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList() {
				this.$u.post('/messageReceiving/queryMongoDBHighSeasListPage').then(resp => {
					this.contentArray = resp.rows

				})
			},
			rob(item) {
				console.info('抢单')
				console.info(item)
				this.$u.get('/publicResoBusinessOpportunity/vieForCommercial', {
					id: item.id
				}).then(resp => {
					// this.contentArray = resp.rows
					console.info('抢单亲求')
					console.info(resp)
					console.info(code)
					this.getList()
					setTimeout(function() {
						uni.showToast({
							title: '抢单成功'
							// icon: 'none',
						})
					}, 2000);

				})
			}
		},
		onReachBottom() {
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	.highSeas {
		border-top: 0.5px solid #EEEEEE;
		padding-left: 16px;
		padding-right: 16px;
		background-color: #FFFFFF;
.content_else{
	height: 100px;
}
		.content {
			.child {
				border-bottom: 0.5px solid #EEEEEE;
				padding-top: 19px;
				padding-bottom: 20.5px;
				display: flex;
				justify-content: space-between;

				.child_left {
					.clienteleName {
						color: #000;
						font-size: 16px;
						font-family: PingFang SC;
						font-weight: 600;
						line-height: 25px;
					}

					.yixiang {
						.ask {
							color: #000;
							font-size: 16px;
							font-family: PingFang SC;
							font-weight: 500;
							line-height: 25px;
						}

						.answer {
							color: #000;
							font-size: 16px;
							font-family: PingFang SC;
							font-weight: 500;
							line-height: 25px;
							margin-left: 10px;
						}
					}
				}

				.child_right {
					width: 60px;
					height: 25px;
					border-radius: 12.5px;
					border: 1px solid #72c6c6;
					color: #72c6c6;
					text-align: center;
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: 600;

				}

				.title {
					width: 100%;
					font-size: 16px;
					font-family: PingFang SC;
					font-weight: 500;
					color: #3A3B3D;
					margin-bottom: 11px;
				}

				.time {
					width: 100%;
					font-size: 14px;
					font-family: DINPro;
					font-weight: 400;
					color: #6E7073;
				}
			}

			.child:last-child {
				border-bottom: 0px;
			}
		}
	}
</style>
