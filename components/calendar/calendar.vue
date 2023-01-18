<template>
	<view class="calendar_cl" :style="'height:'+(usableHeight-148)+'px'">
		<view class="calendar">
			<view class="week">
				<view v-for="item in calendar.weekArr">{{item}}</view>
			</view>
			<view class="selectDate">
				<view class="icon-year" @click.stop="prevYear">
					<image
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAhCAYAAADOHBvaAAACoklEQVRYR8WWy2vUUBSHfyeta9EkK1eW3FQQFEEQQdy4FRSV4oNirYpCaSmlRdG94gvxgYr4xidaUAT/ge4EQRciJlMRi6skFXFTR5orM5NJbnszmTPTxdxdcr9zvhxy7oPQoUEd8mJpYtPdhjI+4Y8XFhaQw7UvtsQEiM4D+IagvBb4Ppcrb8C1J7bEOIguVEUSPxHPb8bs9IwmLuBaF1vuGAiXUinJ7Qj8j7q0mGtNbDmjIONyKsX8DoTTH3Rpc44vtsUIQFdSqcQuRN57TcrkeGJTDMOgq6lkXu7BrD+pSbkcwFhOpjsEA9czSdyHoPRSlzK5JLC4YkscB9HNVCKxD6H3PKd7eZwS2FhsiWMgupVJ5QGE/tMcKY9bFJgvttyjINxO2TjuR1R6nLNkeFzOzqKLbWcQMO5mUgwg8h7q3cvkGuylC8W2GADofsbKQQS+8pzMcLmCDTwT2z0C6PaU7j2CoJRVXp/gcgXSylQmNt01MPAl2SDeIPR25sZyObZ4ee9qLJNTIKxKYk4j8M5o8VyOLa6AK3rXoUu+U+SnEHhntRxcjvWP03/obIA03qbymE4i+noup6t5HKur65DVsxHofp3J5QlEfuXQXzi4HGsd1yFTbALRZCqXcgKhf1HLweUWBRbv1SvFbnTRqzRGYhyhV7sEqIPLKTHNj0Xb6QOMF4p8DKFXuwyog8slMc3FFdBy94LwLPPIUQR+7VKgDi7HOo/riS2xH0RPFPkIAv+aLudxvIrThnP6YRiPUlmMYUSecklIZszmXGviSl7TPQgDDzJ5PISodEOrvAnXurhisMUhgO4psq0IvCm94Rpz7YmrcucwYNyBlDP493c9fv/4pYkLuPbF1aTuFpTnPjeU1r8kh1uaOLdE3suOif8DGUpMMUYwU/AAAAAASUVORK5CYII="
						mode="widthFix"></image>
				</view>
				<view class="icon-month" @click.stop="prevMonth">
					<image
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAhCAYAAADZPosTAAACQklEQVRIS63Vy2vUUBTA4d9J61o0ycqVZZIKgiIIIogbt4KiUnxQrFVRKC2ltCi6V3whPlAR3/hEC4rgP9CdIOhCxGQqYnGVpCJu6khzZWY6STqdmaSZ3t0N93zcwz3nRFjiJUvs0R6o29so8Yk/jl+7WH7QsMYQOQ98wyuthe8zZTQfaFijiFyo3Erxk3B2M9OTU/lAwx5BuBRhorbjuR/zpWwUhhHtcoQxuwN/8kPyYbOnbFpDIFciTLGLwHlfXyXZQN0aRJOrUfCs2sO0O96o5NJB3R5A43ocHPbgFV82q9/WoGEdR+RmFKzYh+88b9UMzUHDOobIrRhTB/Ddp2md1Rg07KMIt6PgMOwlKD5OwxrXoVnoB+1ujNFH4DzMgi0ETasP5H4crPrx3MQ+nY1TNrss6HQSr3kErxjfNN2qnIhB3V6Dxpe5wn2D7+zMaMw7FoPLu1ezTE0grJo7cRrPObNYdP4rr+heR4d6l0BP4TlnF4MuLBuzsAGlvY3QUE4SfD2XFW1Sh10bofN1jKoTBG55mKau5p2iW5sQGY9Qpcbw3YtpYuteXmntpkNeJXp5FN+pDtcmK33amIUe0F4k0BF8pzpkG6x0sBxk2HsRnsXxahjPrQ7bupUNrKDWfkSeJNAhPPdafrAcqRd60bRHERIySOAkhm+e36huH0TjQYyGAwTFG7V99pSTuZnWIZB7iU9b8ZyJ8j4fWI40C4dBu4NSU/z7u57fP361B1ZQewulmc81rH2wrbJpVsl13/8DgqqmIhiYaloAAAAASUVORK5CYII="
						mode="widthFix"></image>
				</view>
				<view class="date-wrap">
					{{calendar.year}}年{{calendar.month}}月
				</view>
				<view class="icon-month" @click.stop="nextMonth">
					<image
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAhCAYAAADZPosTAAACPUlEQVRIS63U34sNYRzH8ffzbHa5kJiZK61kz4zaG0q5279AIj+iJTo2srVs68eKeyI/EhERSihFlFs3SlJKeyHtPKd15cbMiGvHPJqzmefM7vkxM525O9P5vp7nO8/3+Qh6/Igee2TB5Z5NPxuI/LdlF2oC1y7F6f8CrEPraUJ1uQxqwFVDg8i+DwhWNyCtTxOqK0XRbMuOuxEt3hiUk4T+tSLo4kOxhzZB32uDxlOEtet50danbHmbEbxMUfQkgbqRB20/Npa7AylepEisjxOpm93QznPoVHaDfG5QJoj8W53Q7oNte3sRPEsRrccJ1Z12aHcwqbTdUYR40oQeJVR3W6H5wKTSquxHyscG5Qihf28hmh9soN5BJI8MEo8R1B40o8XApNJxqyCaEF0lUOkixcEGWhkDed/srO4RzKnkdzmwcVDeKwTbGmish4nU1/Kg450Dzs+HCN/5I0b4PfutHGh5Z5FcSLE6W/jlz/xvv1jL1vozSH0xxUS8laD2udwpW+40UlxKMerbCec+lZtD2z2FEPMJnnwzrXcSqY/lbortnUBwNS3+q3fxU5kUWqB2/oa2N4WgKbHjPQQ1kz4tttgedNxJECaptR4lVCZ1WvXbdrAd9xgIk9Ba7yNUT9sYmdeLd2h5E0hMMsccIPJNynRRs6BVGUfK22lNrKtE5uIX26HjjQDvTJE+RKAe5kFaD/aKNStZMjCDEINoDhP6TWmSn822nKADy4b5Mfs+P5H9Z7G7nGOVnoP/AH9+pSKTyVj+AAAAAElFTkSuQmCC"
						mode="widthFix"></image>
				</view>
				<view class="icon-year" @click.stop="nextYear">
					<image
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAhCAYAAADOHBvaAAACtUlEQVRYR8WWz2vUQBTHvzPFVg8imuQkFbGbEXpRELz1LxBR/IFSRVmLYqFa6o+K3hXFH4iiKIoKooKgKHj1IogIgvQg0sxST15MInp2zdhddzPpziR5Wwrd4+bz3md+vjcMi/Rji+TFXPFy4aIXGxAHbwsHROUKkmTEa5fC6/0CYB2UmkQkL9vjqFzxWmrxqoF+8J4PYFjdDFHqNCJ5xQinciV7OHepPX8jFHuj5TiJKLhm5KBytKVuUe7AJqDntZYnE4hq140cVC5Hbj/VjtgMhpepHGocobxh5KByFnn+dXL8HeDsRRqTqOOI5U1TTuQ6AovvsVfZDfDnWo4xxMEtc8+JXCawvIC4Yi8YnqUxSo0iknfMPSdyrcBycQN0/WEw9iQjP4pI3jXlRA7oqFxFd8+p7Afnj7UcRxAF98w9p3G0GbezO+IgOB5pWTKCsPbActpLue7EDYPnVwGWkakqQpkZTGsYJVz34qa8MgLw+3qmdYFwRlpOey43P3HzwIlXYNjWlCVqELH8aj0iOdz8xJ44B+B8U6TwHX/YEH5PfzNnnM91L3bEWXBcSKV1bMGvYMpywAq57sTO+jPg6mIqZclWhLXPprSco4sdfxKcXUqlqG9HNPPJlNI4mtj1T4Gx/y+Sxp4qtROx/GipXDSOVLlccQIMV1PJX7ULP6XuWu0PVK7FF8/YFRNgyLxAkj0Ia7pbaSmNyyxRvtjzxwGmXx5KDSOSuku1k1C5jn2xiz3/GMD0i0OpfYjkU/OeEjlLZTHFjhgDh35pJDiAONBdqZ2EylnLWWdbdCqj4Px2yiaqitjSAKhcjrTxt56xJ4YAvNOsOoRQPrSUQRpXIJ0rXrFmJZb0TYGxfigcRhRkuk8mC5UjixtgI2nfskH8mH5fGEflSEtdMsKF/kwrmQttnc33D2mZSjGYZfPLAAAAAElFTkSuQmCC"
						mode="widthFix"></image>
				</view>
			</view>
			<view class="date">
				<view :style="'width:calc(100% *'+ calendar.firstDay +' / 7) ;'"></view>
				<view v-for="item in calendar.dateArr">
					<!-- 	<view v-if="calendar.year==checked.year&&checked.month==calendar.month&&checked.day==item.day"
						class="on" @click.stop="checkTap(calendar,item)">
						<view class="day">{{item.day}}</view>
					</view> -->
					<!--  -->

					<!-- <view v-if="calendarList[1].year==rangeChecked.year&&rangeChecked.month==calendarList[1].month&&rangeChecked.day==item.day" -->
					<view
						v-if="calendarList[1].year==rangeChecked.year&&rangeChecked.month==calendarList[1].month&&rangeChecked.day==item.day"
						class="on" @click.stop="checkTap(calendar,item)">
						<view class="day">{{item.day}}</view>
						<view class="name">结束</view>
					</view>
					<view
						v-if="calendarList[0].year==rangeChecked.year&&rangeChecked.month==calendarList[0].month&&calendarList[0].days==item.day"
						class="on" @click.stop="checkTap(calendar,item)">
						<view class="day">{{item.day}}</view>
						<view class="name">开始</view>
					</view>



					<!--  -->
					<view
						v-else-if="(calendar.year==startDate.year&&calendar.month==startDate.month&&startDate.day>item.day)||(calendar.year<startDate.year||calendar.month<startDate.month)"
						class="before">
						<view class="day">{{item.day}}</view>
					</view>
					<view
						v-else-if="(calendar.year==endDate.year&&calendar.month==endDate.month&&endDate.day<item.day)||(calendar.year>endDate.year||calendar.month>endDate.month)"
						class="after">
						<view class="day">{{item.day}}</view>
					</view>
					<view
						v-else-if="calendar.year==calendar.curYear&&calendar.curMonth==calendar.month&&calendar.curDay==item.day"
						class="cur" @click.stop="checkTap(calendar,item)">
						<view class="day">{{item.day}}</view>
					</view>
					<view v-else @click.stop="checkTap(calendar,item)"
						:class="(calendarList[1].year==rangeChecked.year&&rangeChecked.month==calendarList[1].month&&rangeChecked.day==item.day)?'none':''">
						<!-- <view v-else-if="calendarList.length==2" @click.stop="checkTap(calendar,item)"> -->
						<view class="day">{{item.day}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "calendar",
		props: {
			judge:{
				type: String,
				default: ''
			},
			modePrice: {
				type: String,
				default: ''
			},
			date: {
				type: String,
				default: ''
			},
			start: {
				type: String,
				default: ''
			},
			end: {
				type: String,
				default: ''
			},
			after: {
				type: Boolean,
				default: false
			},
			emptyJdge:{
				type: Object,
				default: ''
			},
			usableHeight:{
				type: Number,
				default: ''
			}
		},
		data() {
			return {
				timelist: [],
				calendarList: [],
				startTime: null, //开始时间
				endTime: null, //结束时间
				calendar: {
					year: '',
					month: '',
					day: '',
					weekArr: ['日', '一', '二', '三', '四', '五', '六'],
					dateArr: [],
					firstDay: '',
					lastDay: '',
					curYear: '',
					curMonth: '',
					curDay: ''
				},
				// checked:{
				// 	year: '',
				// 	month: '',
				// 	day: '',
				// },
				result: '',
				sign_list: []
			};
		},
		onReady: function() {
			let that = this;
			this.getDate();
			this.$nextTick(function() {
				that.setDate()
			})
		},
		onShow() {
			console.info('获取手机屏幕高度')
			console.info(uni.getSystemInfo)
			 // uni.getSystemInfo
		},
		computed: {
			checked() {
				let date = this.result || this.date || '';
				if (date) {
					let arr = date.split('-');

					return {
						year: arr[0] || '',
						month: arr[1] || '',
						day: arr[2] || '',
						result: date || ''
					}
				} else {
					return {
						year: '',
						month: '',
						day: '',
						result: ''
					}
				}
			},
			rangeChecked() {
				let date = this.result || this.date || '';
				
				if (date) {

					let arr = date.split('-');
					if (this.calendarList.length == 1) {
						return {
							year: arr[0] || '',
							month: arr[1] || '',
							day: arr[2] || '',
							result: date || ''
						}

					} else if (this.calendarList.length == 2) {
						return {
							year: this.calendarList[1].year || '',
							month: this.calendarList[1].month || '',
							day: this.calendarList[1].days || '',
							result: date || ''
						}
					}

				} else {
					return {
						year: '',
						month: '',
						day: '',
						result: ''
					}
				}
			},

			startDate() {
				let date = this.start || '';
				if (date) {
					let arr = date.split('-');
					return {
						year: arr[0] || '',
						month: arr[1] || '',
						day: arr[2] || ''
					}
				} else if (this.after) {
					let temp = this.calendar;
					return {
						year: temp.curYear || '',
						month: temp.curMonth || '',
						day: temp.curDay || '',
					}
				} else {
					return null
				}
			},
			endDate() {
				let date = this.end || '';
				if (date) {
					let arr = date.split('-');
					return {
						year: arr[0] || '',
						month: arr[1] || '',
						day: arr[2] || ''
					}
				} else {
					return null
				}
			}
		},
		methods: {
			getDate: function() { //获取当月日期
				var mydate = new Date();
				var year = mydate.getFullYear();
				var month = mydate.getMonth();
				var day = mydate.getDate();
				var months = month + 1;
				this.calendar.year = year;
				this.calendar.month = months;
				this.calendar.day = day;
				this.calendar.curYear = year;
				this.calendar.curMonth = months;
				this.calendar.curDay = day;
				var fist = new Date(year, month, 1);
				this.calendar.firstDay = fist.getDay();
				var last = new Date(year, months, 0);
				this.calendar.lastDay = last.getDate();
				console.info(this.calendar);
			},
			setDate: function() {
				let years = this.calendar.year || '',
					months = this.calendar.month || '',
					dateArr = []
				for (var i = 1; i < this.calendar.lastDay + 1; i++) {
					let item = {
						day: i,
						sign: false
					}
					let sign_list = this.sign_list;
					if (sign_list.length > 0)
						item.sign = sign_list.filter(item => {
							let arr = item.split('-') || [];
							return arr.length == 3 && arr[0] == years && arr[1] == months && arr[2] == i
						}).length > 0
					dateArr.push(item);
				}
				this.calendar.dateArr = dateArr
			},
			prevMonth: function() { //上一月
				var months = "";
				var years = "";
				if (this.calendar.month == 1) {
					years = this.calendar.year - 1
					this.calendar.month = 12;
					months = this.calendar.month;
				} else {
					years = this.calendar.year;
					months = this.calendar.month - 1;
				}

				var first = new Date(years, months - 1, 1);
				this.calendar.firstDay = first.getDay();
				var last = new Date(years, months, 0);
				this.calendar.lastDay = last.getDate();

				this.calendar.month = months;
				this.calendar.year = years;
				this.calendar.dateArr = [];
				for (var i = 1; i < this.calendar.lastDay + 1; i++) {
					let item = {
						day: i,
						sign: false
					}
					let sign_list = this.sign_list;
					if (sign_list.length > 0)
						item.sign = sign_list.filter(item => {
							let arr = item.split('-') || [];
							return arr.length == 3 && arr[0] == years && arr[1] == months && arr[2] == i
						}).length > 0
					this.calendar.dateArr.push(item);
				}
			},
			nextMonth: function() { //下一月
				var months = "";
				var years = "";
				if (this.calendar.month == 12) {
					this.calendar.month = 0;
					months = this.calendar.month;
					years = this.calendar.year + 1;
				} else {
					months = this.calendar.month + 1;
					years = this.calendar.year;
				}
				var months = this.calendar.month + 1;
				var first = new Date(years, months - 1, 1);
				this.calendar.firstDay = first.getDay();
				var last = new Date(years, months, 0);
				this.calendar.lastDay = last.getDate();
				this.calendar.month = months;
				this.calendar.year = years;

				this.calendar.dateArr = [];
				for (var i = 1; i < this.calendar.lastDay + 1; i++) {
					let item = {
						day: i,
						sign: false
					}
					let sign_list = this.sign_list;
					if (sign_list.length > 0)
						item.sign = sign_list.filter(item => {
							let arr = item.split('-') || [];
							return arr.length == 3 && arr[0] == years && arr[1] == months && arr[2] == i
						}).length > 0
					this.calendar.dateArr.push(item);
				}
			},
			prevYear() {
				var months = this.calendar.month;
				var years = years = this.calendar.year - 1;
				var first = new Date(years, months - 1, 1);
				this.calendar.firstDay = first.getDay();
				var last = new Date(years, months, 0);
				this.calendar.lastDay = last.getDate();
				this.calendar.year = years;
				this.calendar.dateArr = [];
				for (var i = 1; i < this.calendar.lastDay + 1; i++) {
					let item = {
						day: i,
						sign: false
					}
					let sign_list = this.sign_list;
					if (sign_list.length > 0)
						item.sign = sign_list.filter(item => {
							let arr = item.split('-') || [];
							return arr.length == 3 && arr[0] == years && arr[1] == months && arr[2] == i
						}).length > 0
					this.calendar.dateArr.push(item);
				}

			},
			nextYear() {
				var years = years = this.calendar.year + 1;
				var months = this.calendar.month;
				var first = new Date(years, months - 1, 1);
				this.calendar.firstDay = first.getDay();
				var last = new Date(years, months, 0);
				this.calendar.lastDay = last.getDate();
				this.calendar.year = years;
				this.calendar.dateArr = [];
				for (var i = 1; i < this.calendar.lastDay + 1; i++) {
					let item = {
						day: i,
						sign: false
					}
					let sign_list = this.sign_list;
					if (sign_list.length > 0)
						item.sign = sign_list.filter(item => {
							let arr = item.split('-') || [];
							return arr.length == 3 && arr[0] == years && arr[1] == months && arr[2] == i
						}).length > 0
					this.calendar.dateArr.push(item);
				}
			},
			checkTap(calendar, days) {
				console.info('判断条件')
				console.info(this.judge)
				console.info(this.start)
				var tath = this

				calendar.days = days.day
				var timeData = this.timelist[0]
				var result = ''
				result = calendar.year + '-' + calendar.month + '-' + days.day;
				// timelist
				this.result = result
				if (this.timelist.length == 0) {
					// let arr = date.split('-');
					this.timelist[0] = result.split('-')
				} else if (this.timelist.length == 1) {
					if (Number(timeData[0]) == calendar.curYear) {
						if (Number(timeData[1]) == calendar.month) {
							if (Number(timeData[2]) > calendar.days) {
								this.timelist[1] = this.timelist[0]
								this.timelist[0] = result.split('-')
							} else if (Number(timeData[2]) < calendar.days) {
								this.timelist[1] = result.split('-')
							} else if (Number(timeData[2]) == calendar.days) {
								this.timelist[1] = result.split('-')
							}
						} else if (Number(timeData[1]) > calendar.month) {
							this.timelist[1] = this.timelist[0]
							this.timelist[0] = result.split('-')
						} else if (Number(timeData[1]) < calendar.month) {
							this.timelist[1] = result.split('-')
						}
					} else if (Number(timeData[0]) > calendar.curYear) {
						this.timelist[1] = this.timelist[0]
						this.timelist[0] = result.split('-')
					} else if (Number(timeData[0]) < calendar.curYear) {
						this.timelist[1] = result.split('-')
					}
				} else if (this.timelist.length == 2) {
					this.timelist = []
					this.timelist[0] = result.split('-')
				}
				let that = this;
				this.$nextTick(function() {
					// that.$emit('change', this.checked)
					if (that.modePrice == 'data') {
						that.$emit('change', that.checked)
					} else if (that.modePrice == 'range') {
						that.$emit('change', that.rangeChecked)
					}
					var tath = this
					var grabble = []
					tath.calendarList = []
					this.timelist.forEach((item, index) => {
						var itemData = {
							year: Number(item[0]),
							month: Number(item[1]),
							days: Number(item[2]),
							day: 28
						}
						tath.calendarList.push(itemData)
						item = item[0] + '-' + item[1] + '-' + item[2];
						grabble.push(item)

					})
					this.$emit("send", grabble)
				})
			}
		},
	  watch:{ 
		    
			  emptyJdge:{
			  handler (n,o) {
				  this.calendarList=[]
				  this.timelist=[]
			  },
			  deep: true 
	        },
			}
	}
</script>

<style lang="scss" scoped>
	.calendar_cl {
		width: 100%;
		background-color: #FFFFFF;
		.calendar {
			display: flex;
			flex-direction: column;
			width: 100%;
			max-width: 100%;
			z-index: 1000;
			background: #fff;
			// border-radius: 16rpx;
			align-items: center;

			&>view {
				max-width: 100%;
				width: 100%;
			}

			.iconfont {
				width: 50rpx;
				height: 50rpx;
			}

			.selectDate {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				margin-top: 32upx;
				border-radius: 16upx;
				height: 74upx;

				.date-wrap {
					font-size: 30upx;
					font-weight: bold;
					color: #001526;
					margin-left: 20upx;
					margin-right: 20upx;
				}

				.icon-year {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					opacity: 0.4;

					image {
						width: 30upx;
						height: 33upx;
						margin-left: 18upx;
						margin-right: 18upx;
					}
				}

				.icon-month {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;

					image {
						width: 20upx;
						height: 33upx;
						margin-left: 18upx;
						margin-right: 18upx;
					}
				}
			}



			.week {
				display: flex;
				flex-direction: row;
				border-bottom: 1upx #EDEDED solid;
				margin-top: 20upx;

				&>view {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: calc(100% / 7);
					height: 90upx;
					justify-content: center;
					font-size: 24upx;
					font-weight: 500;
					color: #001526;

					&:first-child {
						// color: #8C2246;
					}

					&:last-child {
						// color: #8C2246;
					}
				}
			}

			.date {
				width: 100%;
				margin-bottom: 32rpx;

				&>view {
					float: left;
					width: calc(100% / 7);
					height: 122upx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					&>view {
						height: 86upx;
						width: 86upx;
						border-radius: 50%;
						font-size: 28rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						font-size: 30upx;
						font-weight: bold;
						color: #B2B2B2;
						transition: all 0.4s;

						&>image {
							min-height: 60rpx;
						}

						.day {
							font-size: 30upx;
							font-weight: bold;
							color: #001526;
							transition: all 0.4s;
						}

						&.before {
							.day {
								color: #B2B2B2 !important;
							}
						}

						&.after {
							.day {
								color: #B2B2B2 !important;
							}
						}

						&.cur {
							border: 2upx #363B40 solid;
						}

						&.on {
							background: #3978E7 !important;

							.day {
								color: #FFFFFF !important;
							}

							.name {
								font-size: 9px !important;
								color: #FFFFFF !important;
							}
						}

					}
				}
			}

			.none {
				display: none !important;
			}

		}
	}
</style>
<style lang="scss">
	// .alendar_cl{
		.calendar_cl{
			// height: 300px;
			// max-height: 491px;
			overflow: auto;
		}
	// }
</style>