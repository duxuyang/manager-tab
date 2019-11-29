<template>
	<div class="login-container">
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

			<div class="title-container">
				<h3 class="title">登 录</h3>
			</div>
			<el-form-item prop="email">
				<el-input
					v-model="loginForm.email"
					placeholder="邮箱"
					name="email"
					type="text"
					tabindex="1"
					auto-complete="on"
				/>
			</el-form-item>

			<el-form-item prop="password">
				<el-input
					v-model="loginForm.password"
					placeholder="密码"
					name="password"
					type="password"
					tabindex="2"
					auto-complete="on"
				/>
			</el-form-item>
			<el-form-item>
				<el-col :span="15">
					<el-input
						v-model="loginForm.imgCode"
						placeholder="验证码"
						name="imgCode"
						type="text"
						tabindex="3"
						auto-complete="on"
						@keyup.enter.native="handleLogin"
					/>
				</el-col>
				<el-col :span="9">
					<img class="code-msg" @click="userCodeImg" :src="codeImgUrl">
				</el-col>
			</el-form-item>
			<el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

		</el-form>
	</div>
</template>

<script lang="ts">
	import { Component, Vue} from 'vue-property-decorator';
	import { Logins } from '@/model/api/login';
	import { getBaseUrl } from '@/common/utils';
	interface UserData {
		email: string;
		password: string;
		imgCode: string;
	}
	@Component
	export default class Login extends Vue {
		private loading: boolean = false;
		private imgCodeKey: string = ''; // 随机数
		private codeImgUrl: string = ''; // 随机数图片
		private loginForm: UserData = {
			email: 'admin@shopshops.com',
			password: '123456',
			imgCode: '1111',
		};
		private loginRules: any = {
		email: [
			{required: true, trigger: 'blur', validator: '请输入邮箱地址' },
			{type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
			  ],
			password: [{ required: true, trigger: 'blur', validator: '密码必填' }],
		};
		private created() {
			 this.userCodeImg();
		}
		private userCodeImg() {
			const imgCodeKey = new Date().getTime() + '';
			const url = `${getBaseUrl()}/admin/get-code-img?imgCodeKey=${imgCodeKey}`;
			this.imgCodeKey = imgCodeKey;
			this.codeImgUrl = url;
		}
		private handleLogin(): void {
			(this.$refs.loginForm as any).validate((valid: any) => {
				if (valid) {
					this.loading = true;
					this.login();
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
		private async login() {
			const params = {
				...this.loginForm,
				imgCodeKey: this.imgCodeKey,
			};
			try {
				const {code, result} = await Logins.userLogin(params);
				if (result.token) {
					localStorage.setItem('token', result.token);
					this.$router.push({ path: '/' });
				}
				this.loading = false;
			} catch (e) {
				this.loading = false;
			}
		}
	}
</script>

<style scoped lang="scss">
@import './login.scss';
</style>