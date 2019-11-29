<template>
	<div>
		用户列表
		<el-input v-model="input" placeholder="请输入内容"></el-input>
	</div>
</template>

<script lang="ts">
	import { Component, Vue, Watch } from 'vue-property-decorator';
	import SearchInput from '@/components/search-input/index.vue';
	@Component({
		components: {
			SearchInput,
		},
	})
	export default class UserList extends Vue {
		public input: string = '';
		public mounted() {
			// console.log(this);
		}
		public destroyed() {
			console.log('销毁list');
		}
	}
</script>

<style scoped lang="scss">

</style>