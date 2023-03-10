import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {};

try{
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
}catch(e){
	
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_token'];

// 保存变量到本地存储中
const saveLifeData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {name: '明月'},
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
		vuex_version: '1.0.1',
		vuex_demo: '绛紫',
		companyData:'',
		// 自定义tabbar数据
		vuex_tabbar: [{
						pagePath: "/pages/home/index",
						iconPath: "/static/image/unHomePage.png",
						selectedIconPath: "/static/image/homePage.png",
						text: '首页',
						isDot: false,
						customIcon: false,
					}, {
						pagePath: "/pages/messageBox/messageBox",
						iconPath: "/static/image/unInformation.png",
						selectedIconPath: "/static/image/information.png",
						text: '消息提醒',
						isDot: false,
						customIcon: false,
					},
					{
						pagePath: "/pages/missionBox/missionBox",
						iconPath: "/static/image/unTask.png",
						selectedIconPath: "/static/image/task.png",
						text: '任务',
						isDot: false,
						customIcon: false,
					},
					{
						pagePath: "/pages/mine/mine",
						iconPath: "/static/image/unMine.png",
						selectedIconPath: "/static/image/mine.png",
						text: '我的',
						isDot: false,
						customIcon: false,
					}
				]
	},
	mutations: {
		SetTabbar(state, roleCodes){
			 
			if (roleCodes == 'fieldClerk') {
				// 外勤办事员
				state.vuex_tabbar = [{
						// pagePath: "/pages/fieldClerk/homePage/homePage",
						pagePath: "/pages/home/index",
						iconPath: "/static/image/unHomePage.png",
						selectedIconPath: "/static/image/homePage.png",
						text: '首页',
						isDot: false,
						customIcon: false,
					}, {
						pagePath: "/pages/messageBox/messageBox",
						iconPath: "/static/image/unTaskProgress.png",
						selectedIconPath: "/static/image/taskProgress.png",
						text: '任务进度提醒',
						isDot: false,
						customIcon: false,
					},
					{
						pagePath: "/pages/missionBox/missionBox",
						iconPath: "/static/image/unTask.png",
						selectedIconPath: "/static/image/task.png",
						text: '任务',
						isDot: false,
						customIcon: false,
					},
					{
						pagePath: "/pages/mine/mine",
						iconPath: "/static/image/unMine.png",
						selectedIconPath: "/static/image/mine.png",
						text: '我的',
						isDot: false,
						customIcon: false,
					}
				]
			} else if (roleCodes == 'fieldSupervisor') {
				// 外勤主管
				state.vuex_tabbar = [{
						pagePath: "/pages/home/index",
						iconPath: "/static/image/unHomePage.png",
						selectedIconPath: "/static/image/homePage.png",
						text: '首页',
						isDot: false,
						customIcon: false,
					}, {
						pagePath: "/pages/messageBox/messageBox",
						iconPath: "/static/image/unInformation.png",
						selectedIconPath: "/static/image/information.png",
						text: '消息提醒',
						isDot: false,
						customIcon: false,
					},
					{
						pagePath: "/pages/missionBox/missionBox",
						iconPath: "/static/image/unTask.png",
						selectedIconPath: "/static/image/task.png",
						text: '任务',
						isDot: false,
						customIcon: false,
					},
					{
						pagePath: "/pages/mine/mine",
						iconPath: "/static/image/unMine.png",
						selectedIconPath: "/static/image/mine.png",
						text: '我的',
						isDot: false,
						customIcon: false,
					}
				]
			} else if (roleCodes == 'accountExecutiveSupervisor') {
				// 业务主管
				state.vuex_tabbar = [{
						pagePath: "/pages/home/index",
						iconPath: "/static/image/unHomePage.png",
						selectedIconPath: "/static/image/homePage.png",
						text: '首页',
						isDot: false,
						customIcon: false,
					},
					{
						pagePath: "/pages/mixtureBox/mixtureBox",
						iconPath: "/static/image/unHighSeas.png",
						selectedIconPath: "/static/image/highSeas.png",
						text: '公海',
						isDot: false,
						customIcon: false,
					},
					{
						pagePath: "/pages/mine/mine",
						iconPath: "/static/image/unMine.png",
						selectedIconPath: "/static/image/mine.png",
						text: '我的',
						isDot: false,
						customIcon: false,
					}
				]
			
			} else if (roleCodes == 'accountExecutive') {
				// 业务员
				state.vuex_tabbar = [{
						pagePath: "/pages/home/index",
						iconPath: "/static/image/unHomePage.png",
						selectedIconPath: "/static/image/homePage.png",
						text: '首页',
						isDot: false,
						customIcon: false,
					}, {
						pagePath: "/pages/messageBox/messageBox",
						iconPath: "/static/image/unTask.png",
						selectedIconPath: "/static/image/task.png",
						text: '订单',
						isDot: false,
						customIcon: false,
					},
					{
						pagePath: "/pages/mixtureBox/mixtureBox",
						iconPath: "/static/image/unHighSeas.png",
						selectedIconPath: "/static/image/highSeas.png",
						text: '公海',
						isDot: false,
						customIcon: false,
					},
					{
						pagePath: "/pages/mine/mine",
						iconPath: "/static/image/unMine.png",
						selectedIconPath: "/static/image/mine.png",
						text: '我的',
						isDot: false,
						customIcon: false,
					}
				]
			} else if (roleCodes == 'boss'|| roleCodes == 'bossManager') {
				// boss
				state.vuex_tabbar = [{
						pagePath: "/pages/home/index",
						iconPath: "/static/image/unHomePage.png",
						selectedIconPath: "/static/image/homePage.png",
						text: '首页',
						isDot: false,
						customIcon: false,
					}, {
						pagePath: "/pages/messageBox/messageBox",
						iconPath: "/static/image/unTask.png",
						selectedIconPath: "/static/image/task.png",
						text: '待办事项',
						isDot: false,
						customIcon: false,
					},
			
					{
						pagePath: "/pages/mine/mine",
						iconPath: "/static/image/unMine.png",
						selectedIconPath: "/static/image/mine.png",
						text: '我的',
						isDot: false,
						customIcon: false,
					}
				]
			}else{
				// 客户
				state.vuex_tabbar = [
					{
						pagePath: "/pages/home/index",
						iconPath: "/static/image/unHomePage.png",
						selectedIconPath: "/static/image/homePage.png",
						text: '首页',
						isDot: false,
						customIcon: false,
					},
					{
						pagePath: "/pages/missionBox/missionBox",
						iconPath: "/static/image/unTopUp.png",
						selectedIconPath: "/static/image/topUp.png",
						text: '充值',
						isDot: false,
						customIcon: false,
					},
							
					{
						pagePath: "/pages/mine/mine",
						iconPath: "/static/image/unMine.png",
						selectedIconPath: "/static/image/mine.png",
						text: '我的',
						isDot: false,
						customIcon: false,
					}
				]
			}
			
		},
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(len >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store
