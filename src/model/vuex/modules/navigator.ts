import router from '@/router';

interface PageTab {
	url?: string;
	title?: string;
	query?: any;
}
interface State {
	navPageTabs: PageTab[];
	navCurTab: PageTab;
	navCurTabTitle?: any;
	needKeepAlive: any[];
	isReload: boolean;
}
const types = {
	NAV_ADD_TAB: 'nav_add_tab',
	NAV_DELETE_TAB: 'nav_delete_tab',
	NAV_CUR_TAB: 'nav_cur_tab',
	NAV_DEL_TAB: 'nav_del_tab',
	NEED_KEEP_ALIVE: 'needKeepAlive',
	IS_RELOAD: 'isReload',
};

const state: State = {
	navPageTabs: [],
	navCurTab: {},
	needKeepAlive: [],
	isReload: true,
};

const getters = {
	navPageTabs: () => state.navPageTabs,
	navCurTab: () => state.navCurTab,
	currentNeedKeepAlive : (state: State) => state.needKeepAlive,
	getReloadState: (state: State) => state.isReload,
};


const actions = {
	[types.NAV_ADD_TAB](context: any, res: PageTab) {
		context.commit(types.NAV_ADD_TAB, res);
	},
	[types.NAV_DELETE_TAB](context: any, res: string) {
		context.commit(types.NAV_DELETE_TAB, res);
	},
	[types.NAV_CUR_TAB](context: any, res: number) {
		context.commit(types.NAV_CUR_TAB, res);
	},
	[types.NAV_DEL_TAB](context: any) {
		context.commit(types.NAV_DEL_TAB);
	},
	[types.IS_RELOAD](context: any): void {
		context.commit(types.IS_RELOAD, false);
		setTimeout(() => {
			context.commit(types.IS_RELOAD, true);
		}, 100);
	},
};

const mutations = {
	[types.NAV_ADD_TAB](vstate: State, res: PageTab) {
		const tabs = vstate.navPageTabs;
		let hasOpen: boolean = false;
		let componentName: string = (res.url as string).split('/')[2];
		componentName = componentName.replace(componentName[0], componentName[0].toUpperCase());
		for (const item in tabs) {
			if (tabs[item].url === res.url) {
				if (res.query.id) {
					if (res.query.id !== tabs[item].query.id) {
						(this as any).dispatch('isReload');
					}
				}
				vstate.navCurTab = res;
				vstate.navPageTabs[item] = res;
				hasOpen = true;
				break;
			}
		}
		if (!hasOpen) {
			vstate.navPageTabs.push(res);
			vstate.navCurTab = res;
			vstate.needKeepAlive.push(componentName);
		}
	},
	[types.NAV_DELETE_TAB](vstate: State, res: string) {
		const tabs = vstate.navPageTabs;
		let delIndex: number = -1;
		let componentName: string = res.split('/')[2];
		componentName = componentName.replace(componentName[0], componentName[0].toUpperCase());
		tabs.forEach((item: PageTab, index: number) => {
			if (item.url === res) {
				delIndex = index;
				vstate.needKeepAlive = vstate.needKeepAlive.filter((item: any) => item !== componentName);
			}
		});
		if (delIndex > -1) {
			vstate.navPageTabs.splice(delIndex, 1);
			let url: string = '';
			let queryParam: any = {};
			if (vstate.navPageTabs && vstate.navPageTabs.length > 0) {
				const lastIndex = delIndex - 1 >= 0 ? delIndex - 1 : delIndex;
				url = vstate.navPageTabs[lastIndex].url || '';
				queryParam = vstate.navPageTabs[lastIndex].query;
				vstate.navCurTabTitle = url;
			} else {
				url = '/';
			}
			const params = {
				path: url,
				query: queryParam,
			};
			router.push(params);
		}
	},
	[types.NAV_CUR_TAB](vstate: State, res: string) {
		const title = res;
		let curTab: PageTab = {};
		for (const item of state.navPageTabs) {
			if (item.url === title) {
				curTab = item;
				break;
			}
		}
		vstate.navCurTab = curTab;
	},
	[types.NAV_DEL_TAB](vstate: State) {
		vstate.navPageTabs = [];
		vstate.navCurTab = {};
	},
	[types.IS_RELOAD](state: State, res: any): void {
		state.isReload = res;
	},
};

export default {
	state,
	actions,
	mutations,
	getters,
};
