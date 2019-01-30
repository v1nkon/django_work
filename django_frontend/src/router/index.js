import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const toDo = r => require.ensure([], () => r(require('@/page/toDo')), 'toDo');

const home = r => require.ensure([], () => r(require('@/page/home')), 'home');

const myInfo = r => require.ensure([], () => r(require('@/page/myInfo')), 'myInfo');
const myReport = r => require.ensure([], () => r(require('@/page/myReport')), 'myReport');
const myTask = r => require.ensure([], () => r(require('@/page/myTask')), 'myTask');

const taskList = r => require.ensure([], () => r(require('@/page/taskList')), 'taskList');
const addTask = r => require.ensure([], () => r(require('@/page/addTask')), 'addTask');
const taskStat = r => require.ensure([], () => r(require('@/page/taskStat')), 'taskStat');
const taskDetail = r => require.ensure([], () => r(require('@/page/taskDetail')), 'taskDetail');


const infoList = r => require.ensure([], () => r(require('@/page/infoList')), 'infoList');
const addInfo = r => require.ensure([], () => r(require('@/page/addInfo')), 'addInfo');
const infoStat = r => require.ensure([], () => r(require('@/page/infoStat')), 'infoStat');
const infoDetail = r => require.ensure([], () => r(require('@/page/infoDetail')), 'infoDetail');

const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');

const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/toDo',
		component: toDo,
		name: '我的',
		children: [
			// {
			// 	path: '',
			// 	component: home,
			// 	meta: [],
			// },
			{
				path: '/myTask',
				component: myTask,
				meta:{
					keepAlive:true,
					pathName:['我的待办', '我的任务'],

				}
			},{
				path: '/myInfo',
				component: myInfo,
				meta:{
					keepAlive:true,
					pathName:['我的待办', '我的情报'],
				}
			},{
				path: '/myReport',
				component: myReport,
				meta: {
					keepAlive:true,
					pathName:['我的待办', '我的报告'],
				}
			},

			{
				name:'taskList',
				path: '/taskList',
				component: taskList,
				meta: {
					keepAlive:true,
					pathName:['任务中心', '任务列表']},
			},{
				path: '/addTask',
				component: addTask,
				meta: {
					keepAlive:false,
					pathName:['任务中心', '添加任务']},
			},{
				path: '/taskStat',
				component: taskStat,
				meta: {pathName:['任务中心', '统计']},
			},{
				name:'taskDetail',
				path: '/taskDetail',
				component: taskDetail,
				meta: {pathName:['任务中心', '任务详情']},
			},

			{
				path: '/infoList',
				component: infoList,
				meta: {pathName:['情报中心', '情报列表']},
			},{
				path: '/addInfo',
				component: addInfo,
				meta: {pathName:['情报中心', '添加情报']},
			},{
				path: '/infoStat',
				component: infoStat,
				meta: {pathName:['情报中心', '统计']},
			},
			{
				name:'infoDetail',
				path: '/infoDetail',
				component: infoDetail,
				meta: {pathName:['任务中心', '情报详情']},
			},

		]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
