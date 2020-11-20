import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
		vuex_version: '1.0.1',
		// 自定义tabbar数据
		vuex_tabbar: [{
				pagePath: '/pages/tabbar/home/home',
				iconPath: "/static/image/home.png",
				selectedIconPath: "/static/image/home_fill.png",
				text: '首页',
				isDot: false,
				customIcon: false,
			},
			{
				pagePath: '/pages/tabbar/workbench/workbench',
				iconPath: "/static/image/form.png",
				selectedIconPath: "/static/image/form_fill.png",
				text: '工作台',
				isDot: false,
				customIcon: false,
			},
			{
				pagePath: '',
				iconPath: "/static/image/scan.png",
				selectedIconPath: "/static/image/scan.png",
				text: '',
				midButton: true,
				isDot: false,
				customIcon: false,
			},
			{
				pagePath: '/pages/tabbar/notice/notice',
				iconPath: "/static/image/notice.png",
				selectedIconPath: "/static/image/notice_fill.png",
				text: '通知',
				count: 23,
				isDot: false,
				customIcon: false,
			},
			{
				pagePath: '/pages/tabbar/mine/mine',
				iconPath: "/static/image/my.png",
				selectedIconPath: "/static/image/my_fill.png",
				text: '我的',
				isDot: false,
				customIcon: false,
			},
		]
	},
	mutations: {
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