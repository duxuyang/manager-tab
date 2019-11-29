import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './model/vuex';
import Component from 'vue-class-component';
import '@/common/element-com';


// 复制到粘贴板插件
import VueClipboard from 'vue-clipboard2';
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

Vue.config.productionTip = false;

// 全局路由守卫
router.beforeEach((to, from, next) => {
	// 逻辑操作
	next();
});
router.beforeEach((to, from, next) => {
	if (to.path !== '/' && to.path !== '/login') {
		 store.dispatch('nav_add_tab', {url: to.path, title: to.meta.title, query: to.query});
	}
	next();
});


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

Component.registerHooks([
	'beforeRouteEnter', // 进入路由之前
	'beforeRouteLeave', // 离开路由之前
	'beforeRouteUpdate',
]);
