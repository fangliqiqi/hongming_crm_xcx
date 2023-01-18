<template>
	<view class="lookOrFllow">
		<!-- 查看跟进记录 -->
		<view class="content" v-if="contentArray.length!=0">
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
						
					</view>
					<view class="imgBox">
						<view class="imgBoxChild" v-for="(items,indexs) in item.recordImgParamList">
							<image :src="items.url" class="imgBoxChildImg"></image>
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
		<view class="content" v-else style="padding-bottom: 29px;
			text-align: center;	">暂无跟进记录</view>
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
					this.contentArray.forEach((item,index)=>{
						// item.url =config.authUrl + item.url;
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
						item.recordImgParamList=item.recordImgParamList.map(ite=>{

							ite.url =config.authUrl + ite.url;
								return ite;
					})
				
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
						padding: 20px 17px 0 17px;
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
								// margin-bottom: 11px;
								font-size: 15px;
								font-family: PingFang SC;
								font-weight: bold;
								color: #3A3B3D;
								line-height: 23px;
							}
							
					}
					.imgBox{
						width: 100%;
						// height: 50px;
						padding-top: 14px;
						padding-bottom: 18px;
						padding-left: 16px;
						padding-right: 16px;
						// background-color: #f4f5f6;
						background-color: #FFFFFF;
						.imgBoxChild{
							width: 144px;
							height: 73.5px;
							background-color: #F3F4F6;
							.imgBoxChildImg{
							width: 100%;
							height: 100%;
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
