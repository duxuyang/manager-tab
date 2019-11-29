import http from '@/model/api/request';

interface TokenParams {
	email: string;
	password: string;
	imgCodeKey: string;
	imgCode: string;
}


export const Logins = {
	/**
	 * 获取token
	 */
	userLogin(params: TokenParams) {
		return http.post('/admin/login', params);
	},
	/**
	 * 根据token获取登录用户id等信息
	 */
	getUserInfo: () => {
		return http.get('/admin/get-admin-user');
	},
	/* 获取验证码
	 * @param imgCodeKey 前端生成
	 */
	userCodeImg(params: object) {
		return http.get('/admin/get-code-img', { params });
	},


};


