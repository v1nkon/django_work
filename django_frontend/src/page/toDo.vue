<template>
	<div class="manage_page fillcontain">
		<el-row>
			<el-col>
				<main-header></main-header>
			</el-col>
		</el-row>
		<el-row style="height: calc(100% - 80px);">
	  		<el-col style="min-height: 100%; background-color: #1f2023;width:180px;">
				<el-menu :default-active="defaultActive" background-color="#1f2023" text-color="#fff" style="min-height: 100%;border:0;" theme="dark" router>
					<!--<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>-->
					<!--<el-submenu index="2">
						<template slot="title"><i class="el-icon-date"></i>我的待办</template>
						<el-menu-item index="myTask">我的任务</el-menu-item>
						<el-menu-item index="myInfo">我的情报</el-menu-item>
						<el-menu-item index="myReport">我的报告</el-menu-item>
					</el-submenu>-->
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-document"></i>任务中心</template>
						<el-menu-item index="taskList">任务列表</el-menu-item>
						<el-menu-item index="addTask">添加任务</el-menu-item>
						<el-menu-item index="taskStat">统计</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>情报中心</template>
						<el-menu-item index="infoList">情报列表</el-menu-item>
						<el-menu-item index="addInfo">添加情报</el-menu-item>
						<el-menu-item index="infoStat">统计</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col style="height: 100%;overflow: auto;width: calc(100% - 180px);">
				<keep-alive>
				    <router-view v-if="$route.meta.keepAlive"></router-view>
				</keep-alive>
				<router-view v-if="!$route.meta.keepAlive"></router-view>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
	import mainHeader from '@/components/mainHeader'
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
		components: {
			mainHeader
		}
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
		
	}
	.el-submenu .el-menu-item {
		min-width: 180px;
	}
</style>
