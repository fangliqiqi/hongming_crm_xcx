<template>
	<view class="contractList">
		<view class="seek">
			<view class="seek-search">
				<u-icon name="search" color="#3A3B3D" size="32"></u-icon>
				<u-input v-model="searchForm.keyword" @input="confirm" :type="type" :border="border"
					placeholder="请输入客户名称或合同编号" height='90' class="search-input" />
			</view>
		</view>
		<u-dropdown class="seek-select" menu-icon="arrow-down-fill" menu-icon-size='14' inactive-color='#3A3B3D'
			active-color='#3978E7' border-radius='20' @open="open" @close="close" ref="uDropdown">
			<u-dropdown-item :title="categoryTitle">
				<view class="slot-content">
					<view class="content-child" v-for='(item,index) in options1' @click="hTConditionO(item,index)"
						:class="hTCondition==index?'condition':''">{{item.label}}</view>
				</view>


				<view class="slot-bottom">
					<view class="bottom-empty" @click="empty">清空</view>
					<view class="bottom-confirm" @click="confirm">确定</view>
				</view>
			</u-dropdown-item>
			<u-dropdown-item v-model="value2" title="签约时间" :options="options2">
				<calendar :judge='judge' :usableHeight='usableHeight' :modePrice='modePrice' :emptyJdge='emptyJdge' @send="getSonValue"></calendar>
				<view class="slot-bottom">
					<view class="bottom-empty" @click="empty">清空</view>
					<view class="bottom-confirm" @click="confirm">确定</view>
				</view>
			</u-dropdown-item>
			<u-dropdown-item :title="stateTitle">
				<view class="slot-content more">
					<view class="content-child" v-for='(item,index) in options3' @click="hTStateO(item,index)"
						:class="hTState==index?'condition':''">{{item.label}}</view>
				</view>


				<view class="slot-bottom">
					<view class="bottom-empty" @click="empty">清空</view>
					<!-- <view class="bottom-confirm" @click="getcontractList(),contractList=[]">确定</view> -->
					<view class="bottom-confirm" @click="confirm">确定</view>
				</view>

			</u-dropdown-item>
		</u-dropdown>
		<view class="contractList_contyent">
			<view class="overhide">
				<view class="list" v-for="(item,index) in contractList" :key='item.id'>
					<view class="item-top">
						<view class="item-top-number">合同编号:{{item.controlNo}}</view>
						<view class="item-top-btn" @click="toSign(item)" v-if="item.state==1"><text>待签署</text></view>
						<view class="item-top-btn look" v-if="item.state==2" @click="toDetail(item)">
							<text>预览</text>
						</view>
						<view class="item-top-btn look" v-if="item.path==''" @click="toDetail(item)">
							<text>预览</text>
						</view>
					</view>
					<view class="item_main">
						<view class="left_img" @click="toDetail(item)">
							<image src="@/static/image/pdf-1.png" mode="widthFix"></image>
						</view>
						<view class="right">
							<view class="right_com">张云雷有限公司</view>
							<view class="right_time">创建时间：{{item.createDate}}</view>
						</view>
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	import calendar from '@/components/calendar/calendar.vue'; //外勤主管消息提醒
	export default {
		components: {
			calendar
		},
		data() {

			return {
				usableHeight:0,//可用屏高度
				emptyJdge: {
					name: 1
				},
				orderId: '',
				dropdown: false,
				judge: 'true',
				modePrice: 'range',
				start: '', //签约时间-开始时间
				searchForm: {
					category: '', //合同类别
					state: '', //合同状态
					signBeginTime: '',
					signEndTime: '',
					keyword: '',
				}, //筛选
				categoryTitle: '合同类别',
				stateTitle: '合同状态',
				hTCondition: null, //筛选合同判断选中
				hTState: null, //筛选合同状态判断选中
				show: false,
				contractList: [],
				reload: true,
				loading: false,
				page: 1,
				pageSize: 10,
				tatol: 0,
				contractNo: '',
				contractId: null,
				companyId: '',
				search: '', //搜所条件
				value1: 1,
				value2: 2,
				options1: [{
						label: '新签',
						value: 1,
					},
					{
						label: '续费',
						value: 2,
					}
				],
				options2: [{
						label: '待签字',
						value: 1,
					},
					{
						label: '完成',
						value: 2,
					}, {
						label: '作废',
						value: 3,
					},
					{
						label: '创建中',
						value: 4,
					},
					{
						label: '执行中',
						value: 5,
					},

				],
				options3: [{
						label: '待签字',
						value: 1,
					},
					{
						label: '已完成',
						value: 2,
					}, {
						label: '作废',
						value: 3,
					}

				],
			};
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.orderId = item.orderId
			this.searchForm.orderId = item.orderId
		},
		onShow() {
			var tath=this
			uni.getSystemInfo({
				success: function(res) {
					tath.usableHeight=res.windowHeight-85
					console.info('111111')
					console.info(tath.usableHeight)
				},
			})
			tath.start = new Date().toISOString().slice(0, 10),
				// this.judge=0
				tath.companyId = uni.getStorageSync('companyData').id
			tath.$nextTick(function() {
				if (tath.reload) {
					tath.page = 1
					tath.pageSize = 10
					tath.contractList = []
					tath.getcontractList()

					tath.loading = false;
				} else {
					tath.reload = true
				}
			})
		},
		methods: {
			open(index) {
				// 展开某个下来菜单时，先关闭原来的其他菜单的高亮
				// 同时内部会自动给当前展开项进行高亮
				this.$refs.uDropdown.highlight();
			},
			close(index) {
				// 关闭的时候，给当前项加上高亮
				// 当然，您也可以通过监听dropdown-item的@change事件进行处理
				this.$refs.uDropdown.highlight(index);
			},
			// 确定按钮
			confirm() {
				this.contractList = []
				this.getcontractList()
				this.$refs.uDropdown.close();
			},

			getSonValue(res) {
				this.searchForm.signBeginTime = res[0] || ''
				this.searchForm.signEndTime = res[1] || ''
			},
			hTConditionO(item, index) {
				this.hTCondition = index
				this.searchForm.category = item.label
			},
			hTStateO(item, index) {
				this.hTState = index
				this.searchForm.state = item.label
			},
			// 清空
			empty() {
				this.hTState = null
				this.hTCondition = null
				this.judge = 'false'
				this.emptyJdge.name += 1
				this.searchForm = {
					category: '', //合同类别
					state: '', //合同状态
					signBeginTime: '',
					signEndTime: '',
					keyword: '',
					orderId: this.orderId
				}
			},

			getcontractList() {
				var companyId = this.companyId
				if (this.searchForm.category == '新签') {
					this.searchForm.category = 10
				} else if (this.searchForm.category == '续费') {
					this.searchForm.category = 20
				}
				if (this.searchForm.state == '待签字') {
					this.searchForm.state = 1
				} else if (this.searchForm.state == '已完成') {
					this.searchForm.state = 2
				} else if (this.searchForm.state == '作废') {
					this.searchForm.state = 3
				}
				if (this.contractList.length == 0) {
					this.page = 1
				} else {
					this.page = this.contractList.length == this.tatol ? this.page : ++this.page;
				}
				let data = {
					page: this.page,
					pageSize: 10
				}
				var params = Object.keys(data).map(function(key) {
					// body...
					return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
				}).join("&");
				this.searchForm.companyId = companyId
				this.$u.post('/client/queryContractList?' + params, this.searchForm).then(resp => {
					this.pageSize = resp.total
					if (this.contractList.length == 0) {
						this.contractList = resp.records
					} else if (this.contractList.length != this.pageSize) {
						// this.contractList = this.contractList.concat(resp.records)
						this.contractList = (this.page == 1 ? [] : this.contractList).concat(response.rows)
					}
				})
			},
			// 跳转到合同详情
			toDetail(e) {
				let item = e;
				uni.navigateTo({
					url: "/pageKh/hetong/contract/contract?item=" +
						encodeURIComponent(JSON.stringify(item)),
				})
			},
			// 签字
			toSign(e) {
				console.log(e)
				uni.navigateTo({
					url: '/pageKh/hetong/contractSign/contractSign?id=' + e.id + '&no=' + e.controlNo
				})
			},


			onReachBottom() {
				if (this.contractList.length != this.pageSize) {
					this.getcontractList()
				}
			}

		},
	}
</script>

<style lang="scss">
	page {
		background: #f5f6f7;
	}

	.contractList {
		.seek {
			padding-left: 32rpx;
			padding-right: 32rpx;
			height: 90rpx;
			background-color: #FFFFFF;

			.seek-search {
				width: 100%;
				height: 90rpx;
				background: #F5F6F7;
				border-radius: 45rpx;
				padding-left: 42rpx;
				padding-right: 42rpx;
				display: flex;

				.search-input {
					padding-left: 20rpx;
					width: calc(100% - 40rpx);
				}
			}

		}

		.seek-select {
			background-color: #FFFFFF;

			.slot-content {
				background-color: #FFFFFF;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				border-top: 1rpx solid #F2F2F2;
				padding-bottom: 40rpx;
				padding-top: 30rpx;

				.content-child {
					width: 154rpx;
					height: 62rpx;
					line-height: 62rpx;
					// background: #ECF2FC;
					background-color: #F5F6F7;
					border-radius: 31rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					// color: #3978E7;
					color: #363B40;
					margin: 0 25rpx;
					text-align: center;
				}

				.condition {
					color: #3978E7;
					background: #ECF2FC;
				}
			}

			.more {
				justify-content: end;
				padding-bottom: 25rpx;
				padding-left: 32rpx;

				.content-child {
					margin-left: 17rpx;
					margin-right: 0px;
					margin-bottom: 25rpx;
				}
			}

			.slot-bottom {
				width: 100%;
				height: 132rpx;
				padding-right: 50rpx;
				background-color: #FFFFFF;
				border-top: 1rpx solid #F2F2F2;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.bottom-empty {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #6E7073;
					text-align: center;
					width: calc(100% - 540rpx);
				}

				.bottom-confirm {
					width: 480rpx;
					height: 72rpx;
					line-height: 72rpx;
					background: #3978E7;
					border-radius: 36rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					text-align: center;
				}
			}

			.u-dropdown {
				.u-dropdown__menu {
					background-color: #FFFFFF;
				}
			}
		}

		.contractList_contyent {
			padding-top: 20rpx;
			background-color: #f5f6f7;

			.overhide {
				padding-left: 32rpx;
				padding-right: 32rpx;
				background-color: #FFFFFF;
			}

			.list {
				width: 100%;

				border-bottom: 1rpx solid #E6E7EB;
				padding-top: 20rpx;

				.item-top {
					position: relative;

					.item-top-number {
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 14px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #6E7073;
					}

					.item-top-btn {
						position: absolute;
						bottom: 0rpx;
						right: 0rpx;
						width: 128rpx;
						height: 50rpx;
						background: #FAEEF0;
						border: 1rpx solid #F7DEE0;
						border-radius: 5rpx;
						text-align: center;
					}

					.item-top-btn text {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #EF5465;
					}

					.look {
						background: #ECF2FC;
						border: 1rpx solid #D9E4F8;

						text {
							color: #3978E7;
						}
					}

				}

				.item_main {
					width: 100%;
					padding-bottom: 42rpx;
					display: flex;

					.left_img {
						width: 140rpx;
						height: 140rpx;
						border-radius: 12rpx;
						background: #F7F8FA;
						display: flex;
						justify-content: center;
						align-items: center;

						image {
							width: 82rpx;
						}
					}


					.right {
						padding-left: 29rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-evenly;

						.right_com {
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #3A3B3D;
						}

						.right_time {
							font-size: 28rpx;
							font-family: DINPro;
							font-weight: 400;
							color: #6E7073;
						}
					}
				}
			}

			.list:last-child {
				border-bottom: 0px;
			}
		}
	}


	// 
	.u-drawer {
		margin-top: 86px !important;
		border-top: 1rpx solid #E6E7EB;
		height: 300px;
	}

	.u-mask {
		margin-top: 87px !important;
		height: calc(100% - 87px);
	}
</style>
