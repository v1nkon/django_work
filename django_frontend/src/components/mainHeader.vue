<template>
    <div class="main-header_container">

		<el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/myTask' }"><span class="title" style="font-family: '华文隶书';cursor: pointer"><i class="el-icon-menu" style="margin-right:10px;"></i>网安情报综合平台</span></el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown class="dropdown-avatar" @command="handleCommand" menu-align='start'>
			<!-- <img :src="avatar" class="avator"> -->
			<div class="dropdown-avatar-ct clear">
				<span class="avatar-box">{{realName.slice(0, 1)}}</span>
				<span v-html="realName"> </span>

			</div>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
				<el-dropdown-item command="singout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
	import avatar from '@/img/default.jpg'
	import {mapActions, mapState, mapMutations, mapGetters} from 'vuex'

    export default {
    	data(){
    		return {
                avatar,
                realName:'vinkon'
    		}
    	},
    	created(){
    		// if (!this.adminInfo.id) {
    		// 	this.getAdminData()
    		// }
		},
		mounted () {
			console.log(this.$route.name)
		},
    	computed: {
			// ...mapState(['adminInfo', 'isLogOut']),
			// ...mapState({
            // 	realName : state => state.menus.userInfo.realName
			// }),
			// ...mapGetters([''])
    	},
		methods: {
			async handleCommand(command) {
				if (command == 'home') {

					this.$router.push('/manage');

				}else if ( command == 'userInfo'){
					this.$router.push('/userInfo')
				}else if(command == 'singout'){

					console.log('signout')
					
					const res = await signout()
					if (res.status == 200) {
						this.clearAdminInfo();
						this.setMenusHasFinished(false);
						this.setIsLogOut(true);
						this.$message({
	                        type: 'success',
	                        message: '退出成功'
	                    });
	                    this.$router.push('/login');
					}else{
						this.$message({
	                        type: 'error',
	                        message: res.message
	                    });
					}
				}
			},
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.main-header_container {
		background-color: #1f2023;
		height: 80px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
		box-shadow: 0 3px 4px 1px #1f2023;
  		position: relative;
  		z-index: 1;
		.title{
			font-size: 25px;
			font-weight: bold;
			color: #fFF;
		}
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
			color: #fff;
		}
		img{
			float: right;
		}
	}
	.el-dropdown-menu__item{
        text-align: center;
	}
	.dropdown-avatar-ct {
		cursor: pointer;
	}
	.dropdown-avatar-ct > span {
		line-height: 40px;
		height: 40px;
	}
	.el-dropdown span.avatar-box {
		float: right;
		width: 40px;
		text-align: center;
		color: #fff;
		font-size: 28px;
		border-radius: 4px;
		background-color: #62ACF9;
		
	}
</style>
