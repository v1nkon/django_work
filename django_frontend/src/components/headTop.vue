<template>
    <div class="header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: indexPath }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta.pathName" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!--<span class="back-icon" @click="backRoute"><i class="el-icon-back"></i></span>-->
    </div>
</template>

<script>
	import {signout} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import { mapState } from 'vuex'

    export default {
    	data(){
    		return {
				baseImgPath,
				path: '/taskList',
				lock:true
    		}
		},
		beforeRouteEnter(to, from, next) {
			next( vm => {
				// Object.assign(vm.auth, to.meta[0])
				// vm.setUpdate(false)
				// vm.setGap(Date.now())
				console.log( from )
			} )
		},
    	created(){
    		// if (!this.adminInfo.id) {
    		// 	this.getAdminData()
    		// }
    	},
    	computed: {
			...mapState(['indexPath'])
    		// ...mapState(['adminInfo']),
    	},
		methods: {
			// ...mapActions(['getAdminData']),
			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/manage');
				}else if(command == 'singout'){
					const res = await signout()
					if (res.status == 1) {
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
	                    this.$router.push('/');
					}else{
						this.$message({
	                        type: 'error',
	                        message: res.message
	                    });
					}
				}
			},
			backRoute() {
				this.$router.back(-1)
			},
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		border-bottom:2px solid  #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
		margin-bottom: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown{
		float: right;
		span{
			margin-top: 5px;
    		float: left;
    		margin-right: 15px;
		}
		img{
			float: right;
		}
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
	.back-icon{
		margin-right: 10px;
		cursor: pointer;
		i{
			font-size: 20px;
		}
	}
</style>
