import Vue from 'vue'
import Vuex from 'vuex'
import {getAdminInfo} from '@/api/getData'

Vue.use(Vuex)

const state = {
	adminInfo: {
		avatar: 'default.jpg'
	},
	taskInfo:{

	},
	indexPath: '/taskList',
	isUpdate: false,
	isAdd:true,
	currentItem: {},
	infoTypes: [{
			value: '1',
			label: '通知',
		}, {
			value: '2',
			label: '通报'
		}, {
			value: '3',
			label: '情报'
		}
	],
	relInfos:[{
		value: '1',
		label: '情报1',
	}, {
		value: '2',
		label: '情报2'
	}],
	fields: [{
		value: '001',
		label: '维权律师'
	},{
		value: '002',
		label: '涉黑涉诉'
	},{
		value: '003',
		label: '参战参核退役老兵维权'
	},],
	intellOrigins: [{
		value: '001',
		label: '微信'
	},{
		value: '002',
		label: '邮箱'
	},{
		value: '003',
		label: '支队发现'
	},],
	relPersons: [{
		value: '1',
		label: '重点人1',
	}, {
		value: '2',
		label: '重点人2'
	}],
	relOrgs: [{
		value: '1',
		label: '组织1',
	}, {
		value: '2',
		label: '组织2'
	}],
	sendDep: [{
		value: '001',
		label: '拉萨'
	},{
		value: '002',
		label: '山南'
	},{
		value: '003',
		label: '阿里'
	},],



}

const mutations = {
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	},
	setIndexPath( state, indexPath ){
		state.indexPath = indexPath
	},
	setTaskInfo( state, taskInfo ){
		state.taskInfo = taskInfo
	},
	setIsUpdate( state, isUpdate ){
		state.isUpdate = isUpdate
	},
	setIsAdd( state, isAdd ){
		state.isAdd = isAdd
	},
	saveCurrentItem( state, item ) {
		state.currentItem = item
	},
}

const actions = {
	async getAdminData({commit}){
		try{
			const res = await getAdminInfo()
			if (res.status == 1) {
				commit('saveAdminInfo', res.data);
			}else{
				throw new Error(res)
			}
		}catch(err){
			console.log('您尚未登陆或者session失效')
		}
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})