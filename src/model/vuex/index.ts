import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const vuexfiles = require.context('./modules', false, /\.ts$/);
const modules: any = {};
vuexfiles.keys().forEach( (key: any) => {
	modules[key.replace(/(\.\/|\.ts)/g, '')] = vuexfiles(key).default;
});
export default new Vuex.Store({
	modules,
});
