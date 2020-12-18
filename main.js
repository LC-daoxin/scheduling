import Vue from 'vue'
import App from './App'
import store from '@/store/index';
// 引入uview-ui
import uView from 'uview-ui';
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
