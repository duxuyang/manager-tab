<template>
    <div>
        <el-row class="container">
            <el-col :span="24" class="container">
                <!-- :router=true 路由根据index跳转 -->
                <el-menu :router="true" :default-active="$route.permissionName"  class="el-menu-vertical-demo container" @open="handleOpen" @close="handleClose">
                    <el-submenu  v-for="(navItem, navIndex) in navList" :key="navIndex" :index="navItem.permissionName">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{navItem.permissionName}}</span>
                        </template>
                        <el-menu-item v-for="(item, index) in navItem.subMenuList" :key="index" :index="item.uri" @click="addTab(item)">{{item.permissionName}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator';
	import { tabs } from './tabs';
	@Component({})
	export default class Left extends Vue {
		private navList: any[] = tabs;

		private handleOpen(index: any, keyPath: any) {
			// console.log(index + ' == ' + keyPath);
		}
		private handleClose(index: any, keyPath: any) {
			// console.log(index + '==' + keyPath);
		}
		private addTab(tab: any) {
			// this.$store.dispatch('nav_add_tab', {url: tab.uri, title: tab.permissionName});
		}
	}
</script>

<style scoped>

</style>