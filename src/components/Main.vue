<template>
    <div class="main">
        <el-tabs type="card" v-model="navCurTabTitle" closable @tab-remove="removeTab" @tab-click="handleClick">
			<el-tab-pane
				v-for="(item) in navPageBars"
				:key="item.title"
				:label="item.title"
				:name="item.url"
				:index="item.url"
			>
				{{item.content}}
			</el-tab-pane>
		</el-tabs>
		<keep-alive :include="needKeepAlive"  v-if="updateRouterView">
			<router-view/>
		</keep-alive>		
		<!-- <keep-alive>
        	<router-view v-if='$route.meta.keepAlive'/>
		</keep-alive>
		<router-view  v-if='!$route.meta.keepAlive'></router-view> -->
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
@Component({
		async mounted() {
			// const tabs = this.$store.getters.navPageTabs;
			// this.login();
		},
	})

	export default class Main extends Vue {
 		public taburl = '';
 		get navPageBars() {
			return this.$store.getters.navPageTabs;
		}
		get navCurTabTitle() {
			const curTab = this.$store.getters.navCurTab;
			const url = curTab && curTab.url;
			this.taburl = url;
			return url;
		}
		set navCurTabTitle(item) {
			if (item !== this.taburl) {
				this.taburl = item;
				this.$store.dispatch('nav_cur_tab', item);
			}
		}
		get needKeepAlive() {
 			return this.$store.getters.currentNeedKeepAlive || [];
		}
		get updateRouterView() {
			return this.$store.getters.getReloadState;
		}
		private removeTab(url: string) {
			this.$store.dispatch('nav_delete_tab', url);
		}
		private handleClick() {
			const curTab = this.$store.getters.navCurTab;
			this.$router.push({ path: curTab.url, query: curTab.query });
		}
	}
</script>
