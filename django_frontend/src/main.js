import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ElementUI from 'element-ui'

import * as mUtils from './config/mUtils'

// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.mUtils = mUtils

router.beforeEach((to, from, next) => {
	
	let path = to.path.slice(1).toLowerCase()
	if( path.indexOf('task') != -1 ){
		store.commit('setIndexPath', '/taskList')
	}else{
		store.commit('setIndexPath', '/infoList')
	}
	next()
})

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
