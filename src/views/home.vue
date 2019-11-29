<template>
	<div class="home">
		<!-- <img alt="Vue logo" src="../assets/logo.png">
         <el-button type="primary">主要按钮</el-button> -->
		<!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
        <el-container>
            <el-header style="background: #409EFF; color: #fff; borderBottom: 1px solid #f4f4f4"><TopNav /></el-header>
            <el-container>
                <el-aside width="200px"><LeftNav /></el-aside>
                <el-container>
                    <el-main>
                        <router-view v-if="routePath"></router-view>
						<div class="home_blank" v-else>
							欢迎来到后台管理系统！
						</div>
                    </el-main>
                    <!-- <el-footer>Footer</el-footer> -->
                </el-container>
            </el-container>
        </el-container>
	</div>
</template>

<script lang="ts">
import {
		Component,
		Vue,
		Watch,
	} from 'vue-property-decorator';
import TopNav from '@/components/topNav/topNav.vue';
import LeftNav from '@/components/leftNav/leftNav.vue';
import Main from '@/components/Main.vue';
import {AxiosResponse} from 'axios';
import http from '@/model/api/request';
interface Person {
		firstName: string;
		lastName: string;
	}
@Component({
	components: {
		TopNav, LeftNav,
	},
})
class Home extends Vue {
	private routePath: boolean = false;
	@Watch('$route.path', { immediate: true })
	private changeRoute(newPath: string, oldPath: string) {
		const routePath = newPath !== '/';
		this.routePath = routePath;
	}
}
export default Home;
</script>
<style lang="scss" scoped>
.home{
	&_blank{
		margin-top: 200px;
		text-align: center;
		font-size: 20px;
	}
}
</style>