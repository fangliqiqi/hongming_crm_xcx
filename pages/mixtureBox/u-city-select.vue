<template>
	<u-popup v-model="value" mode="bottom" :popup="false" :mask="true" :closeable="true" :safe-area-inset-bottom="true"
	 close-icon-color="#ffffff" :z-index="uZIndex" :maskCloseAble="maskCloseAble" @close="close">
		<u-tabs v-if="value" :list="genTabsList" :is-scroll="true" :current="tabsIndex" @change="tabsChange" ref="tabs"></u-tabs>
		<view class="area-box">
			<view class="u-flex" :class="{ 'change':isChange }">
				
				
				
				<view class="area-item" >
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group>
								<u-cell-item v-for="(item,index) in list" :title="item.label" :arrow="false" :index="index" :key="index"
								 @click="(idx)=>provinceChange(idx,item.label)">
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>
				<view class="area-item" v-for="(items,idnex) in conlist">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="items.checked>=0">
								<u-cell-item v-for="(item,index) in items.list" :title="item.label" :arrow="false" :index="index" :key="index"
								 @click="(idx)=>cityChange(idx,idnex,item)">
									<u-icon v-if="isChooseC&&city===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view>

				<!-- <view class="area-item">
					<view class="u-padding-10 u-bg-gray" style="height: 100%;">
						<scroll-view :scroll-y="true" style="height: 100%">
							<u-cell-group v-if="isChooseC">
								<u-cell-item v-for="(item,index) in areas" :title="item.label" :arrow="false" :index="index" :key="index"
								 @click="areaChange">
									<u-icon v-if="isChooseA&&area===index" slot="right-icon" size="34" name="checkbox-mark"></u-icon>
								</u-cell-item>
							</u-cell-group>
						</scroll-view>
					</view>
				</view> -->
			</view>
		</view>
	</u-popup>
</template>

<script>
	import provinces from "uview-ui/libs/util/province.js";
	import citys from "uview-ui/libs/util/city.js";
	import areas from "uview-ui/libs/util/area.js";
	/**
	 * city-select ????????????????????????
	 * @property {String Number} z-index ????????????z-index????????????1075???
	 * @property {Boolean} mask-close-able ????????????????????????????????????Picker?????????true???
	 * @property {String} default-region ????????????????????????????????????
	 * @property {String} default-code ????????????????????????????????????
	 */
	export default {
		name: 'u-city-select',
		props: {
			// ????????????????????????????????????????????????
			value: {
				type: Boolean,
				default: false
			},
			// ????????????????????????????????????["?????????", "????????????", "????????????"]
			defaultRegion: {
				type: Array,
				default () {
					return [];
				}
			},
			// ??????????????????????????????defaultRegion???areaCode???????????????areaCode?????????????????????["13", "1303", "130304"]
			areaCode: {
				type: Array,
				default () {
					return [];
				}
			},
			// ????????????????????????????????????Picker
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// ?????????z-index???
			zIndex: {
				type: [String, Number],
				default: 0
			},
			list:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data() {
			return {
				cityValue: "",
				isChooseP: false, //????????????????????????
				province: 0, //????????????
				provinces: provinces,
				isChooseC: false, //????????????????????????
				city: 0, //????????????
				citys: citys[0],
				isChooseA: false, //????????????????????????
				area: 0, //????????????
				areas: areas[0][0],
				tabsIndex: 0,
				conlist:[]
			}
		},
		mounted() {
			this.init();
		},
		computed: {
			isChange() {
				return this.tabsIndex > 1;
			},
			genTabsList() {
				let tabsList = [{
					name: "?????????"
				}];
				console.info(this.conlist)
					if(this.conlist.length>0){
						this.conlist.forEach((item,index)=>{
							tabsList[index]={
						name: item.label|| "?????????"
					};
					})
					tabsList[this.conlist.length]= {
						name: "?????????"
					};
				}
				return tabsList;
			},
			uZIndex() {
				// ?????????????????????z-index??????????????????
				return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
			}
		},
		methods: {
			init() {
				if (this.areaCode.length == 3) {
					this.setProvince("", this.areaCode[0]);
					this.setCity("", this.areaCode[1]);
					this.setArea("", this.areaCode[2]);
				} else if (this.defaultRegion.length == 3) {
					this.setProvince(this.defaultRegion[0], "");
					this.setCity(this.defaultRegion[1], "");
					this.setArea(this.defaultRegion[2], "");
				};
			},
			setProvince(label = "", value = "") {
				this.provinces.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.provinceChange(k);
					}
				})
			},
			setCity(label = "", value = "") {
				this.citys.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.cityChange(k);
					}
				})
			},
			setArea(label = "", value = "") {
				this.areas.map((v, k) => {
					if (value ? v.value == value : v.label == label) {
						this.isChooseA = true;
						this.area = k;
					}
				})
			},
			close() {
				this.$emit('input', false);
			},
			tabsChange(index) {
				this.tabsIndex = index;
			},
			provinceChange(index,label) {
				this.province = index;
				let list = this.list||[];
				if(list[index].children&&list[index].children.length>0){
					let arr = [{checked:index,label:label,list:[]}];
					arr[0].list=list[index].children
					this.conlist=arr
				}
				console.info(this.conlist)
				this.tabsIndex = 1;
			},
			cityChange(index,idx,items) {
				console.info(arguments)
				let list = this.conlist;
				if(list[idx].list[index].children&&list[idx].list[index].children.length>0){
					let arr =list.filter((item,i)=>{
						return idx>=i;
					})
					arr.push({checked:index,label:items.label,list:list[idx].list[index].children})
					this.conlist=arr
				}else if(items.deptId==99999999){
					this.$emit('confirm', items);
					this.close();
				}
				this.tabsIndex = idx+2;
			},
			areaChange(index) {
				this.isChooseA = true;
				this.area = index;
				let result = {};
				result.province = this.provinces[this.province];
				result.city = this.citys[this.city];
				result.area = this.areas[this.area];
				this.$emit('city-change', result);
				this.close();
			}
		}

	}
</script>
<style lang="scss">
	.area-box {
		width: 100%;
		overflow: hidden;
		height: 800rpx;

		>view {
			width: 150%;
			transition: transform 0.3s ease-in-out 0s;
			transform: translateX(0);

			&.change {
				transform: translateX(-33.3333333%);
			}
		}

		.area-item {
			width: 33.3333333%;
			height: 800rpx;
		}
	}
</style>
