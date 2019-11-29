<template>
    <div id="topNav" class="top-nav">
        <el-button size="small" type="danger" @click="exitLogin" plain>退出登录</el-button>
    </div>
</template>

<script lang="ts">
	import {
		Component,
		Prop,
		Vue,
	} from 'vue-property-decorator';

	@Component({
		mounted() {
			console.log('header.vue');
		},
	})
	export default class TopNav extends Vue {
		private exitLogin() {
			localStorage.token = '';
			this.$router.push({ path: '/login' });
			this.$store.dispatch('nav_del_tab');
		}
	}
</script>
<style scoped lang="scss">
.top-nav{
	display: flex;
	justify-content: flex-end;
	margin-top: 10px;
}
</style>