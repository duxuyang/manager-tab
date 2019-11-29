import Vue from 'vue';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import router from '@/router';
import { getBaseUrl } from '@/common/utils';


const config = {
	baseURL: getBaseUrl(),
	timeout: 50000,
};
const instance = axios.create(config);
export const setHeader = () => {
	const tokenData = localStorage.getItem('token');
	if (tokenData) {
		const headers = {
			Authorization: 'Bearer ' + localStorage.getItem('token'),
			token: '123456 ' + tokenData,
		};
		return headers;
	}
};
instance.interceptors.request.use((config: AxiosRequestConfig) => {
	config.baseURL = getBaseUrl();
	// 自定义headers
	config.headers = config.headers || {};
	config.headers = {
		...setHeader(),
		...config.headers,
	};
	const time = new Date().getTime();
	if (config.params) {
		config.params.timer = time;
	} else {
		if (config.url && config.url.indexOf('?') === -1) {
		config.url += '?timer=' + time;
		} else {
		config.url += '&timer=' + time;
		}
	}
	return config;
	}, (error) => {
	return Promise.reject(error);
});


instance.interceptors.response.use((res: AxiosResponse) => {
	if (Object.prototype.toString.call(res.data) === '[object Object]') {
		if (res.data.code === 0 || res.data.resCode === 200) {
		const result = res.data;
		return Promise.resolve(result);
		}
	}
	// 获取验证码
	if (Object.prototype.toString.call(res.data) === '[object String]') {
		const result = res.data;
		return Promise.resolve(result);
	}
	const error = res.data || {};
	if (error.code === 501001) {
		localStorage.token = '';
		Vue.prototype.$message({
			message: 'token过期，请重新登陆',
			type: 'error',
		});
		router.push({ path: '/login' });
	} else if (error.code === 501217) {
		return Promise.resolve(error);
	} else {
		error.msg = error.msg || '接口调用失败';
		Vue.prototype.$message({
			message: error.msg,
			type: 'error',
		});
		return Promise.reject(error);
	}
	return res;
	}, (err: any) => {
		const error = err || {};
		error.msg = error.msg || '接口调用失败';
		return Promise.reject(error);
});

export default instance as any;




