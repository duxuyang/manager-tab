<template>
	<div id="userInfo">
		用户信息
		<el-input v-model="input" placeholder="请输入内容"></el-input>
	</div>
</template>

<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator';
	@Component
	export default class UserInfo extends Vue {
		public input: string = '';
		public mm() {
			console.log('112');
		}
		public mounted() {
			// console.log("销毁info");
		}
		public destroyed() {
			console.log('销毁info');
		}
	}

</script>

<style scoped lang="scss">

#userInfo{
	width:200px;
	height: 200px;
}



</style>