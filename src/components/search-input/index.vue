<template>
	<div>
		
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
	@Component
	export default class SearchInput extends Vue {
		 @Prop() public searchData!: any[];


	}
</script>

<style scoped>

</style>