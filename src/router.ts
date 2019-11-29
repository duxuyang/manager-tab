import Vue from 'vue';
import Router from 'vue-router';
import login from './views/login/login.vue';


const Home = () => import(/* webpackChunkName: 'home' */ './views/home.vue');
const Main = () => import(/* webpackChunkName: 'main' */ './components/Main.vue');
const UserList = () => import(/* webpackChunkName: 'userList' */ './views/userManager/userList.vue');
const UserInfo = () => import(/* webpackChunkName: 'userInfo' */ './views/userManager/userInfo.vue');
Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				title: '主页',
			},
			children: [{
					path: 'userManager',
					name: 'userManager',
					component: Main,
					meta: {
						title: '用户管理',
					},
					children: [{
							path: 'userList',
							name: 'userList',
							component: UserList,
							meta: {
								title: '用户列表',
							},
						}, {
							path: 'userInfo',
							name: 'userInfo',
							component: UserInfo,
							meta: {
								title: '用户信息',
							},
						},
					],
				},
			],
		}, {
			path: '/login',
			name: 'login',
			component: login,
		},
	],
});
