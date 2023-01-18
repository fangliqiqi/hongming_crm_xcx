<template>
	<view class="lookOrFllow">
		<!-- 查看跟进记录 -->
		<view class="content">
			<view class="child" v-for="(item,index) in contentArray">
				<view class="title">
					<image src="@/static/image/circle.png" mode="widthFix" style="width: 9px;height: 9px;" /> 
					<text class="ask">跟进时间:</text>
					<text class="answer">{{item.createDate}}</text>
				</view>
				<view class="child_content">
					<view class="content_this">
						<view class="icon">
							{{item.type}}
						</view>
						<view class="title">
							{{item.theContent}}
						</view>
						<view class="imgBox" v-if="item.recordImgParamList.lenght!=0">
							<view class="imgBoxChild" v-for="(item,index) in item.recordImgParamList">
								<image class="imgBoxChildImg" :src="item.url"></image>
							</view>
						</view>
					</view>
					<view class="content_det">
					<view class="child">
						<view class="ask">下次跟进时间：</view>
						<text class="answer">{{item.nextDate}}</text>
					</view>
					<view class="child">
						<view class="ask">下次跟进内容：</view>
						<text class="answer">{{item.nextContent}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/common/config.js'
	export default {
		data() {
			return {
				dataObj: {},
				contentArray:[]
				}
				},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.dataObj = item
			console.log('跟进');
			console.log(item); //打印出上个页面传递的参数。
			console.log(this.dataObj); //打印出上个页面传递的参数。
			this.getList()
		},
		methods:{
			getList(){
				var companyId=this.dataObj.companyId
				this.$u.get('/crmFollowRecord/queryListToMany',{id:companyId,classify:20}).then(resp => {
					this.contentArray=resp
					// this.contentArray=resp.imgfiles.map(item=>{
					// 	item.url =config.authUrl + item.url;
					// 	return item;
					// })
					console.info('请求数据')
					console.info(this.contentArray)
					this.contentArray.forEach((item,index)=>{
						if(item.recordImgParamList!=[]||item.recordImgParamList.length!=0){
							console.info('有图片啦')
							console.info(item.recordImgParamList)
							item.recordImgParamList=item.recordImgParamList.map(item=>{
								item.url =config.authUrl + item.url;
								return item;
							})
						}else{
								console.info('没有啦')
						}
						if(item.type==10){
							item.type='电话跟进'
						}else if(item.type==20){
							item.type='微信沟通'
						}
						else if(item.type==30){
							item.type='现场跟进'
						}else{
							item.type='其他'
						}
					})
					})
			}
		},
		onReachBottom(){
			this.getList()
		}
		}
</script>

<style lang="scss">
	.lookOrFllow{
		background-color: #FFFFFF;
		.content{
			background-color: #f5f6f7;
			padding-top: 29px;
			padding-left: 18px;
			padding-right: 18px;
			.child{
				.title{
					.ask{
						font-size: 14px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #A1A2A6;
						margin-left: 11px;
					}
					.answer{
						font-size: 14px;
						font-family: DINPro;
						font-weight: 400;
						color: #A1A2A6;
						margin-left: 11px;
					}
				}
				.child_content{
					margin-left: 4px;
					padding-left: 15px;
					padding-right: 15px;
					padding-top: 13px;
					padding-bottom: 26px;
					border-left: 0.5px dashed #E1E1E1;
					// height: 200px;
					.content_this{
						background-color: #FFFFFF;
						padding: 20px 17px;
						.icon{
							width: 69px;
							height: 19px;
							font-size: 12px;
							line-height: 19px;
							text-align: center;
							font-family: PingFang SC;
							font-weight: bold;
							font-style: italic;
							color: #FFFFFF;
							background-image: url(../../../../../../static/image/title_bg.png);
							background-size: 100%;
							}
							.title{
								margin-top: 8px;
								margin-bottom: 11px;
								font-size: 15px;
								font-family: PingFang SC;
								font-weight: bold;
								color: #3A3B3D;
								line-height: 23px;
							}
							.imgBox{
								width: 100%;
								// background-color: #f4f5f6;
								display: flex;
								flex-direction: row;
								flex-wrap: wrap;
								.imgBoxChild{
									width: 130px;
									height: 82px;
									background: #f4f5f6;
									margin-right: 10px;
									.imgBoxChildImg{
										width: 100%;
										height: 100%;
										
									}
								}
							}
					}
				.content_det{
					padding: 15px 16px;
					padding-bottom: 8px;
					background: linear-gradient(90deg, #EFFAF7, #FFFFFF);
					border-radius: 0px 0px 6px 6px;
					
					.child{
						display: flex;
						flex-direction: row;
						margin-bottom: 7px;
					.ask{
						font-size: 14px;
						font-family: PingFang SC;
						font-weight: 500;
						color: #565759;
						line-height: 20px;
						}
						.answer{
							font-size: 14px;
							font-family: DINPro;
							font-weight: 400;
							color: #565759;
							line-height: 20px;
							}
							}
				}
				}
			}
			.child:last-child{
				.child_content{
					border-left: 0px;
				}
			}
		}
	}
</style>
