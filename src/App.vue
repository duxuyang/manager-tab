<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
	import { Component, Vue} from 'vue-property-decorator';
	@Component
	export default  class App extends Vue {
	private mounted() {
		this.init();
	}
	private init() {
		// 入口，没有token就需要取登陆
		const token = localStorage.getItem('token');
		if (!token) {
		this.$router.push({ path: '/login' });
		}
	}
	}
</script>
<style lang="scss">

/* Global scss */

body {
    padding: 0;
    margin: 0;
    height: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    color: #333333;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}

html {
    height: 100%;
}

#app {
    height: 100%;
}
img {
    border: none;
}
ol, ul, li {
    list-style: none;
}

*,
*:before,
*:after {
    box-sizing: border-box;
}

a,
a:focus,
a:hover {
    color: inherit;
    outline: none;
    text-decoration: none;
}

div:focus {
    outline: none;
}

.clearfix:after {
    content: ".";
    display: block;
    height:0;
    clear:both;
    visibility: hidden;
}
.clearfix { 
    *zoom:1;
}

.main-content {
    input {
        height: 40px;
        vertical-align: middle;
    }
    label {
        height: 40px;
        line-height: 40px;
        display: inline-block;
    }
    .el-row {
        margin-bottom: 20px;
    }
    .el-col-3 {
        text-align: right;
    }
}
.el-table thead th{
    color: #333333;
}
.el-pagination{
    display: flex;
    justify-content: center;
}
</style>
